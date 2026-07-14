"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { StateBadge, Pagination, th, td } from "./adminUi";

const PAGE_SIZE = 30;

type Category = "all" | "account" | "auth" | "content";

interface ActivityLogRow {
	id: number;
	actor_id: string | null;
	actor_email: string | null;
	actor_name: string | null;
	actor_role: string | null;
	category: string;
	action: string;
	target_type: string | null;
	target_id: string | null;
	detail: Record<string, unknown>;
	created_at: string;
	actor_exists: boolean;
	total_count: number;
}

interface AuditRow {
	id: number;
	actor_id: string | null;
	actor_email: string | null;
	action: string;
	target_type: string | null;
	target_id: string | null;
	detail: Record<string, unknown>;
	created_at: string;
	total_count: number;
}

const KNOWN_ACTIONS = [
	"user_signup",
	"user_login",
	"user_deleted",
	"board_post_created",
	"board_reply_created",
	"comment_created",
	"report_created",
] as const;

export default function LogsClient({ locale }: { locale: string }) {
	const t = useTranslations("admin");
	const [tab, setTab] = useState<"activity" | "audit">("activity");

	// activity 필터
	const [category, setCategory] = useState<Category>("all");
	const [action, setAction] = useState<string>("all");
	const [search, setSearch] = useState("");
	const [submittedSearch, setSubmittedSearch] = useState("");
	const [adminOnly, setAdminOnly] = useState(false);
	const [page, setPage] = useState(1);
	const [logs, setLogs] = useState<ActivityLogRow[] | null>(null);

	// audit
	const [auditPage, setAuditPage] = useState(1);
	const [audit, setAudit] = useState<AuditRow[] | null>(null);

	const [expanded, setExpanded] = useState<Set<number>>(new Set());
	const [error, setError] = useState<string | null>(null);

	const fetchActivity = useCallback(async () => {
		const supabase = createClient();
		const { data, error } = await supabase.rpc("get_activity_logs", {
			p_category: category === "all" ? null : category,
			p_action: action === "all" ? null : action,
			p_search: submittedSearch || null,
			p_admin_only: adminOnly,
			p_page: page,
			p_page_size: PAGE_SIZE,
		});
		if (error) return setError(error.message);
		setError(null);
		setLogs((data as ActivityLogRow[]) ?? []);
	}, [category, action, submittedSearch, adminOnly, page]);

	const fetchAudit = useCallback(async () => {
		const supabase = createClient();
		const { data, error } = await supabase.rpc("get_moderation_audit", {
			p_page: auditPage,
			p_page_size: PAGE_SIZE,
		});
		if (error) return setError(error.message);
		setError(null);
		setAudit((data as AuditRow[]) ?? []);
	}, [auditPage]);

	useEffect(() => {
		void Promise.resolve().then(tab === "activity" ? fetchActivity : fetchAudit);
	}, [tab, fetchActivity, fetchAudit]);

	const toggleExpand = (id: number) => {
		setExpanded((prev) => {
			const next = new Set(prev);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			return next;
		});
	};

	const timeStr = (iso: string) =>
		new Date(iso).toLocaleString(locale === "ko" ? "ko-KR" : "en-US", {
			dateStyle: "short",
			timeStyle: "short",
		});

	const actionLabel = (a: string) =>
		(KNOWN_ACTIONS as readonly string[]).includes(a) ? t(`logs.action.${a}`) : a;

	const categories: { value: Category; label: string }[] = [
		{ value: "all", label: t("logs.catAll") },
		{ value: "account", label: t("logs.catAccount") },
		{ value: "auth", label: t("logs.catAuth") },
		{ value: "content", label: t("logs.catContent") },
	];

	return (
		<section aria-labelledby="admin-logs-title">
			<h2 id="admin-logs-title" style={{ fontSize: "var(--fs-lg)", fontWeight: 700 }}>
				{t("nav.logs")}
			</h2>

			{/* 탭: 활동 로그 / 관리자 조치 */}
			<div role="group" aria-label={t("nav.logs")} className="glossary-filter" style={{ marginTop: "var(--space-4)" }}>
				<button type="button" aria-pressed={tab === "activity"} onClick={() => setTab("activity")}>
					{t("logs.tabActivity")}
				</button>
				<button type="button" aria-pressed={tab === "audit"} onClick={() => setTab("audit")}>
					{t("logs.tabAudit")}
				</button>
			</div>

			{error && (
				<p role="alert" style={{ marginTop: "var(--space-3)", color: "var(--danger)", fontSize: "var(--fs-sm)" }}>
					{error}
				</p>
			)}

			{tab === "activity" && (
				<>
					{/* 필터 바 */}
					<div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)", alignItems: "center", marginTop: "var(--space-4)" }}>
						<div role="group" aria-label={t("logs.categoryLabel")} className="glossary-filter">
							{categories.map(({ value, label }) => (
								<button
									key={value}
									type="button"
									aria-pressed={category === value}
									onClick={() => {
										setCategory(value);
										setAction("all");
										setPage(1);
									}}
								>
									{label}
								</button>
							))}
						</div>

						<select
							aria-label={t("logs.colAction")}
							value={action}
							onChange={(e) => {
								setAction(e.target.value);
								setPage(1);
							}}
							style={{
								fontSize: "var(--fs-xs)",
								padding: "4px 8px",
								borderRadius: "var(--radius)",
								border: "1px solid var(--border)",
								background: "var(--bg-elev)",
								color: "var(--fg)",
							}}
						>
							<option value="all">{t("logs.catAll")}</option>
							{KNOWN_ACTIONS.map((a) => (
								<option key={a} value={a}>
									{actionLabel(a)}
								</option>
							))}
						</select>

						<form
							role="search"
							onSubmit={(e) => {
								e.preventDefault();
								setPage(1);
								setSubmittedSearch(search.trim());
							}}
							style={{ display: "flex", gap: "var(--space-1)" }}
						>
							<label htmlFor="admin-log-search" className="sr-only">
								{t("logs.searchLabel")}
							</label>
							<input
								id="admin-log-search"
								type="search"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								placeholder={t("logs.searchPlaceholder")}
								style={{
									padding: "4px 8px",
									borderRadius: "var(--radius)",
									border: "1px solid var(--border)",
									background: "var(--bg-elev)",
									color: "var(--fg)",
									fontSize: "var(--fs-xs)",
									width: 180,
								}}
							/>
						</form>

						<label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "var(--fs-xs)", color: "var(--fg-muted)" }}>
							<input
								type="checkbox"
								checked={adminOnly}
								onChange={(e) => {
									setAdminOnly(e.target.checked);
									setPage(1);
								}}
							/>
							{t("logs.adminOnly")}
						</label>
					</div>

					{logs === null ? (
						<p style={{ marginTop: "var(--space-4)", fontSize: "var(--fs-sm)", color: "var(--fg-muted)" }}>{t("loading")}</p>
					) : logs.length === 0 ? (
						<p style={{ marginTop: "var(--space-4)", fontSize: "var(--fs-sm)", color: "var(--fg-muted)" }}>{t("empty")}</p>
					) : (
						<>
							<div style={{ overflowX: "auto", marginTop: "var(--space-4)" }}>
								<table style={{ width: "100%", borderCollapse: "collapse" }}>
									<thead>
										<tr>
											<th scope="col" style={th}>{t("logs.colWhen")}</th>
											<th scope="col" style={th}>{t("logs.colActor")}</th>
											<th scope="col" style={th}>{t("logs.colAction")}</th>
											<th scope="col" style={th}>{t("logs.colTarget")}</th>
											<th scope="col" style={th}>
												<span className="sr-only">{t("logs.toggleDetail")}</span>
											</th>
										</tr>
									</thead>
									<tbody>
										{logs.map((log) => (
											<LogRowGroup
												key={log.id}
												expanded={expanded.has(log.id)}
												onToggle={() => toggleExpand(log.id)}
												when={timeStr(log.created_at)}
												actor={
													<span>
														{log.actor_name || log.actor_email || "—"}
														{log.actor_email && log.actor_name && (
															<span style={{ display: "block", fontSize: "var(--fs-xs)", color: "var(--fg-subtle)" }}>
																{log.actor_email}
															</span>
														)}
														<span style={{ display: "inline-flex", gap: 4, marginLeft: 4 }}>
															{!log.actor_exists && <StateBadge tone="danger">{t("logs.deletedUser")}</StateBadge>}
															{log.actor_role === "admin" && <StateBadge tone="info">{t("logs.adminUser")}</StateBadge>}
														</span>
													</span>
												}
												action={actionLabel(log.action)}
												target={log.target_type ? `${log.target_type}${log.target_id ? ` · ${log.target_id}` : ""}` : "—"}
												detail={log.detail}
												toggleLabel={t("logs.toggleDetail")}
											/>
										))}
									</tbody>
								</table>
							</div>
							<Pagination page={page} pageSize={PAGE_SIZE} total={logs[0]?.total_count ?? 0} onPageChange={setPage} />
						</>
					)}
				</>
			)}

			{tab === "audit" &&
				(audit === null ? (
					<p style={{ marginTop: "var(--space-4)", fontSize: "var(--fs-sm)", color: "var(--fg-muted)" }}>{t("loading")}</p>
				) : audit.length === 0 ? (
					<p style={{ marginTop: "var(--space-4)", fontSize: "var(--fs-sm)", color: "var(--fg-muted)" }}>{t("empty")}</p>
				) : (
					<>
						<div style={{ overflowX: "auto", marginTop: "var(--space-4)" }}>
							<table style={{ width: "100%", borderCollapse: "collapse" }}>
								<thead>
									<tr>
										<th scope="col" style={th}>{t("logs.colWhen")}</th>
										<th scope="col" style={th}>{t("logs.colActor")}</th>
										<th scope="col" style={th}>{t("logs.colAction")}</th>
										<th scope="col" style={th}>{t("logs.colTarget")}</th>
										<th scope="col" style={th}>
											<span className="sr-only">{t("logs.toggleDetail")}</span>
										</th>
									</tr>
								</thead>
								<tbody>
									{audit.map((row) => (
										<LogRowGroup
											key={`audit-${row.id}`}
											expanded={expanded.has(-row.id)}
											onToggle={() => toggleExpand(-row.id)}
											when={timeStr(row.created_at)}
											actor={<span>{row.actor_email ?? "—"}</span>}
											action={row.action}
											target={row.target_type ? `${row.target_type}${row.target_id ? ` · ${row.target_id}` : ""}` : "—"}
											detail={row.detail}
											toggleLabel={t("logs.toggleDetail")}
										/>
									))}
								</tbody>
							</table>
						</div>
						<Pagination page={auditPage} pageSize={PAGE_SIZE} total={audit[0]?.total_count ?? 0} onPageChange={setAuditPage} />
					</>
				))}
		</section>
	);
}

function LogRowGroup({
	expanded,
	onToggle,
	when,
	actor,
	action,
	target,
	detail,
	toggleLabel,
}: {
	expanded: boolean;
	onToggle: () => void;
	when: string;
	actor: React.ReactNode;
	action: string;
	target: string;
	detail: Record<string, unknown>;
	toggleLabel: string;
}) {
	const hasDetail = detail && Object.keys(detail).length > 0;
	return (
		<>
			<tr>
				<td style={{ ...td, whiteSpace: "nowrap", fontSize: "var(--fs-xs)" }}>{when}</td>
				<td style={td}>{actor}</td>
				<td style={{ ...td, whiteSpace: "nowrap" }}>{action}</td>
				<td style={{ ...td, fontSize: "var(--fs-xs)", color: "var(--fg-muted)" }}>{target}</td>
				<td style={{ ...td, whiteSpace: "nowrap" }}>
					{hasDetail && (
						<button
							className="btn btn--sm"
							aria-expanded={expanded}
							onClick={onToggle}
							aria-label={toggleLabel}
						>
							{expanded ? "▲" : "▼"}
						</button>
					)}
				</td>
			</tr>
			{expanded && hasDetail && (
				<tr>
					<td colSpan={5} style={{ ...td, background: "var(--bg-sunk)" }}>
						<pre
							style={{
								margin: 0,
								fontSize: "var(--fs-xs)",
								whiteSpace: "pre-wrap",
								wordBreak: "break-all",
								fontFamily: "monospace",
							}}
						>
							{JSON.stringify(detail, null, 2)}
						</pre>
					</td>
				</tr>
			)}
		</>
	);
}
