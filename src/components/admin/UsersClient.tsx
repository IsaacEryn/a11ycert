"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { useOptionalAuth } from "@/lib/auth/AuthProvider";
import { StateBadge, Pagination, th, td } from "./adminUi";

const PAGE_SIZE = 30;

interface UserRow {
	id: string;
	nickname: string;
	email: string | null;
	avatar_url: string | null;
	provider: string | null;
	tier: string;
	role: "user" | "admin";
	created_at: string;
	post_count: number;
	attempt_count: number;
	total_count: number;
}

export default function UsersClient({ locale }: { locale: string }) {
	const t = useTranslations("admin");
	const auth = useOptionalAuth();
	const myId = auth?.user?.id ?? null;

	const [users, setUsers] = useState<UserRow[] | null>(null);
	const [search, setSearch] = useState("");
	const [submittedSearch, setSubmittedSearch] = useState("");
	const [page, setPage] = useState(1);
	const [error, setError] = useState<string | null>(null);

	const total = users?.[0]?.total_count ?? 0;

	const fetchUsers = useCallback(async () => {
		const supabase = createClient();
		const { data, error } = await supabase.rpc("get_admin_users", {
			p_search: submittedSearch || null,
			p_page: page,
			p_page_size: PAGE_SIZE,
		});
		if (error) {
			setError(error.message);
			setUsers([]);
			return;
		}
		setError(null);
		setUsers((data as UserRow[]) ?? []);
	}, [submittedSearch, page]);

	useEffect(() => {
		void Promise.resolve().then(fetchUsers);
	}, [fetchUsers]);

	const changeRole = async (user: UserRow, role: "user" | "admin") => {
		const roleLabel = role === "admin" ? t("users.roleAdmin") : t("users.roleUser");
		if (!window.confirm(t("users.confirmRoleChange", { nickname: user.nickname || user.email || user.id, role: roleLabel }))) {
			return;
		}
		const res = await fetch(`/api/admin/users/${user.id}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ role }),
		});
		if (!res.ok) {
			const body = await res.json().catch(() => ({}));
			setError(t("actionError", { message: body.error ?? res.status }));
			return;
		}
		setError(null);
		await fetchUsers();
	};

	return (
		<section aria-labelledby="admin-users-title">
			<h2 id="admin-users-title" style={{ fontSize: "var(--fs-lg)", fontWeight: 700 }}>
				{t("nav.users")}
			</h2>

			{/* 검색 */}
			<form
				role="search"
				onSubmit={(e) => {
					e.preventDefault();
					setPage(1);
					setSubmittedSearch(search.trim());
				}}
				style={{ display: "flex", gap: "var(--space-2)", marginTop: "var(--space-4)", maxWidth: 400 }}
			>
				<label htmlFor="admin-user-search" className="sr-only">
					{t("users.searchLabel")}
				</label>
				<input
					id="admin-user-search"
					type="search"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder={t("users.searchPlaceholder")}
					style={{
						flex: 1,
						padding: "6px 10px",
						borderRadius: "var(--radius)",
						border: "1px solid var(--border)",
						background: "var(--bg-elev)",
						color: "var(--fg)",
						fontSize: "var(--fs-sm)",
					}}
				/>
				<button type="submit" className="btn btn--sm">
					{t("users.searchButton")}
				</button>
			</form>

			{error && (
				<p role="alert" style={{ marginTop: "var(--space-3)", color: "var(--danger)", fontSize: "var(--fs-sm)" }}>
					{error}
				</p>
			)}

			{users === null ? (
				<p style={{ marginTop: "var(--space-4)", fontSize: "var(--fs-sm)", color: "var(--fg-muted)" }}>{t("loading")}</p>
			) : users.length === 0 ? (
				<p style={{ marginTop: "var(--space-4)", fontSize: "var(--fs-sm)", color: "var(--fg-muted)" }}>{t("empty")}</p>
			) : (
				<>
					<div style={{ overflowX: "auto", marginTop: "var(--space-4)" }}>
						<table style={{ width: "100%", borderCollapse: "collapse" }}>
							<thead>
								<tr>
									<th scope="col" style={th}>{t("users.colUser")}</th>
									<th scope="col" style={th}>{t("users.colRole")}</th>
									<th scope="col" style={th}>{t("users.colJoined")}</th>
									<th scope="col" style={th}>{t("users.colPosts")}</th>
									<th scope="col" style={th}>{t("users.colAttempts")}</th>
									<th scope="col" style={th}>{t("users.colActions")}</th>
								</tr>
							</thead>
							<tbody>
								{users.map((u) => {
									const isSelf = u.id === myId;
									return (
										<tr key={u.id}>
											<td style={td}>
												<span style={{ fontWeight: 500 }}>{u.nickname || "—"}</span>
												<p style={{ fontSize: "var(--fs-xs)", color: "var(--fg-subtle)", marginTop: 2 }}>
													{u.email ?? ""} {u.provider ? `· ${u.provider}` : ""}
												</p>
											</td>
											<td style={td}>
												<StateBadge tone={u.role === "admin" ? "info" : "muted"}>
													{u.role === "admin" ? t("users.roleAdmin") : t("users.roleUser")}
												</StateBadge>
											</td>
											<td style={{ ...td, whiteSpace: "nowrap" }}>
												{new Date(u.created_at).toLocaleDateString(locale === "ko" ? "ko-KR" : "en-US")}
											</td>
											<td style={td}>{u.post_count}</td>
											<td style={td}>{u.attempt_count}</td>
											<td style={td}>
												{isSelf ? (
													<span style={{ fontSize: "var(--fs-xs)", color: "var(--fg-subtle)" }}>
														{t("users.selfNote")}
													</span>
												) : u.role === "admin" ? (
													<button className="btn btn--sm" onClick={() => changeRole(u, "user")}>
														{t("users.makeUser")}
													</button>
												) : (
													<button className="btn btn--sm" onClick={() => changeRole(u, "admin")}>
														{t("users.makeAdmin")}
													</button>
												)}
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
					<Pagination page={page} pageSize={PAGE_SIZE} total={total} onPageChange={setPage} />
				</>
			)}
		</section>
	);
}
