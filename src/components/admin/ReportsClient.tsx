"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { StateBadge, th, td } from "./adminUi";

type ReportStatus = "open" | "in_review" | "resolved" | "rejected";

interface ReportRow {
	id: string;
	type: string;
	target_type: string;
	target_id: string | null;
	title: string;
	content: string;
	status: ReportStatus;
	created_at: string;
	profiles: { nickname: string } | null;
}

const STATUSES: ReportStatus[] = ["open", "in_review", "resolved", "rejected"];
const STATUS_TONE: Record<ReportStatus, "warn" | "info" | "success" | "muted"> = {
	open: "warn",
	in_review: "info",
	resolved: "success",
	rejected: "muted",
};

export default function ReportsClient({ locale }: { locale: string }) {
	const t = useTranslations("admin");
	const [reports, setReports] = useState<ReportRow[] | null>(null);
	const [filter, setFilter] = useState<ReportStatus | "all">("all");
	const [error, setError] = useState<string | null>(null);

	const fetchReports = useCallback(async () => {
		const supabase = createClient();
		let query = supabase
			.from("reports")
			.select("id, type, target_type, target_id, title, content, status, created_at, profiles:user_id(nickname)")
			.order("created_at", { ascending: false })
			.limit(100);
		if (filter !== "all") query = query.eq("status", filter);
		const { data, error } = await query;
		if (error) {
			setError(error.message);
			setReports([]);
			return;
		}
		setError(null);
		setReports((data as unknown as ReportRow[]) ?? []);
	}, [filter]);

	useEffect(() => {
		// 마이크로태스크로 지연 — effect 본문 동기 setState 방지 (react-hooks/set-state-in-effect)
		void Promise.resolve().then(fetchReports);
	}, [fetchReports]);

	const changeStatus = async (report: ReportRow, status: ReportStatus) => {
		const res = await fetch(`/api/admin/reports/${report.id}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ status }),
		});
		if (!res.ok) {
			const body = await res.json().catch(() => ({}));
			setError(t("actionError", { message: body.error ?? res.status }));
			return;
		}
		setError(null);
		await fetchReports();
	};

	return (
		<section aria-labelledby="admin-reports-title">
			<h2 id="admin-reports-title" style={{ fontSize: "var(--fs-lg)", fontWeight: 700 }}>
				{t("nav.reports")}
			</h2>

			{/* 상태 필터 */}
			<div
				role="group"
				aria-label={t("reports.statusFilterLabel")}
				className="glossary-filter"
				style={{ marginTop: "var(--space-4)" }}
			>
				{(["all", ...STATUSES] as const).map((s) => (
					<button key={s} type="button" aria-pressed={filter === s} onClick={() => setFilter(s)}>
						{s === "all" ? t("reports.all") : t(`reports.${s}`)}
					</button>
				))}
			</div>

			{error && (
				<p role="alert" style={{ marginTop: "var(--space-3)", color: "var(--danger)", fontSize: "var(--fs-sm)" }}>
					{error}
				</p>
			)}

			{reports === null ? (
				<p style={{ marginTop: "var(--space-4)", fontSize: "var(--fs-sm)", color: "var(--fg-muted)" }}>{t("loading")}</p>
			) : reports.length === 0 ? (
				<p style={{ marginTop: "var(--space-4)", fontSize: "var(--fs-sm)", color: "var(--fg-muted)" }}>{t("empty")}</p>
			) : (
				<div style={{ overflowX: "auto", marginTop: "var(--space-4)" }}>
					<table style={{ width: "100%", borderCollapse: "collapse" }}>
						<thead>
							<tr>
								<th scope="col" style={th}>{t("reports.colTitle")}</th>
								<th scope="col" style={th}>{t("reports.colReporter")}</th>
								<th scope="col" style={th}>{t("reports.colType")}</th>
								<th scope="col" style={th}>{t("reports.colTarget")}</th>
								<th scope="col" style={th}>{t("reports.colDate")}</th>
								<th scope="col" style={th}>{t("reports.colStatus")}</th>
							</tr>
						</thead>
						<tbody>
							{reports.map((r) => (
								<tr key={r.id}>
									<td style={td}>
										<span style={{ fontWeight: 500 }}>{r.title}</span>
										<p style={{ marginTop: 2, fontSize: "var(--fs-xs)", color: "var(--fg-subtle)", whiteSpace: "pre-wrap" }}>
											{r.content.slice(0, 120)}
											{r.content.length > 120 ? "…" : ""}
										</p>
									</td>
									<td style={td}>{r.profiles?.nickname ?? "—"}</td>
									<td style={td}>{r.type}</td>
									<td style={td}>
										<span style={{ fontSize: "var(--fs-xs)", color: "var(--fg-muted)" }}>
											{r.target_type}
											{r.target_id ? ` · ${r.target_id}` : ""}
										</span>
									</td>
									<td style={{ ...td, whiteSpace: "nowrap" }}>
										{new Date(r.created_at).toLocaleDateString(locale === "ko" ? "ko-KR" : "en-US")}
									</td>
									<td style={td}>
										<div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-start" }}>
											<StateBadge tone={STATUS_TONE[r.status]}>{t(`reports.${r.status}`)}</StateBadge>
											<select
												aria-label={t("reports.statusSelectLabel", { title: r.title })}
												value={r.status}
												onChange={(e) => changeStatus(r, e.target.value as ReportStatus)}
												style={{
													fontSize: "var(--fs-xs)",
													padding: "2px 4px",
													borderRadius: "var(--radius)",
													border: "1px solid var(--border)",
													background: "var(--bg-elev)",
													color: "var(--fg)",
												}}
											>
												{STATUSES.map((s) => (
													<option key={s} value={s}>
														{t(`reports.${s}`)}
													</option>
												))}
											</select>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</section>
	);
}
