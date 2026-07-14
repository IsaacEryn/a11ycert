import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

interface DashboardStats {
	total_users: number;
	users_today: number;
	users_7d: number;
	total_attempts: number;
	attempts_7d: number;
	pending_reports: number;
	total_posts: number;
	recent_users: { id: string; nickname: string; created_at: string; provider: string | null }[];
}

export default async function AdminDashboardPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations({ locale, namespace: "admin" });

	const supabase = await createClient();
	const { data, error } = await supabase.rpc("get_admin_dashboard_stats");
	if (error) console.error("[cert-manage dashboard]", error.message);
	const stats = (data ?? null) as DashboardStats | null;

	const cards = stats
		? [
				{ label: t("dashboard.totalUsers"), value: stats.total_users },
				{ label: t("dashboard.usersToday"), value: stats.users_today },
				{ label: t("dashboard.users7d"), value: stats.users_7d },
				{ label: t("dashboard.totalAttempts"), value: stats.total_attempts },
				{ label: t("dashboard.attempts7d"), value: stats.attempts_7d },
				{ label: t("dashboard.totalPosts"), value: stats.total_posts },
			]
		: [];

	return (
		<section aria-labelledby="admin-dashboard-title">
			<h2 id="admin-dashboard-title" style={{ fontSize: "var(--fs-lg)", fontWeight: 700 }}>
				{t("nav.dashboard")}
			</h2>

			{!stats ? (
				<p style={{ marginTop: "var(--space-3)", fontSize: "var(--fs-sm)", color: "var(--fg-muted)" }}>
					{t("loadError")}
				</p>
			) : (
				<>
					{/* 미처리 제보 알림 */}
					{stats.pending_reports > 0 && (
						<p
							style={{
								marginTop: "var(--space-4)",
								padding: "var(--space-3) var(--space-4)",
								borderRadius: "var(--radius)",
								background: "var(--warning-soft)",
								color: "var(--warning)",
								fontSize: "var(--fs-sm)",
								fontWeight: 600,
							}}
						>
							{t("dashboard.pendingReports")}: {stats.pending_reports}{" "}
							<Link href={`/${locale}/cert-manage/reports`} style={{ color: "inherit", textDecoration: "underline" }}>
								{t("dashboard.goReports")}
							</Link>
						</p>
					)}

					{/* 통계 카드 */}
					<dl
						className="grid grid-cols-2 gap-3 sm:grid-cols-3"
						style={{ marginTop: "var(--space-5)" }}
					>
						{cards.map(({ label, value }) => (
							<div
								key={label}
								style={{
									border: "1px solid var(--border)",
									borderRadius: "var(--radius)",
									padding: "var(--space-4)",
								}}
							>
								<dt style={{ fontSize: "var(--fs-xs)", color: "var(--fg-subtle)" }}>{label}</dt>
								<dd style={{ fontSize: "var(--fs-2xl)", fontWeight: 700, marginTop: 4 }}>{value}</dd>
							</div>
						))}
					</dl>

					{/* 최근 가입 */}
					<h3 style={{ marginTop: "var(--space-7)", fontSize: "var(--fs-md)", fontWeight: 700 }}>
						{t("dashboard.recentUsers")}
					</h3>
					{stats.recent_users.length === 0 ? (
						<p style={{ marginTop: "var(--space-2)", fontSize: "var(--fs-sm)", color: "var(--fg-muted)" }}>
							{t("empty")}
						</p>
					) : (
						<ul style={{ marginTop: "var(--space-3)", display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
							{stats.recent_users.map((u) => (
								<li
									key={u.id}
									style={{
										display: "flex",
										justifyContent: "space-between",
										gap: "var(--space-3)",
										fontSize: "var(--fs-sm)",
										borderBottom: "1px solid var(--divider)",
										paddingBottom: "var(--space-2)",
									}}
								>
									<span style={{ fontWeight: 500 }}>{u.nickname || "—"}</span>
									<span style={{ color: "var(--fg-subtle)", fontSize: "var(--fs-xs)" }}>
										{u.provider ?? ""} · {new Date(u.created_at).toLocaleDateString(locale === "ko" ? "ko-KR" : "en-US")}
									</span>
								</li>
							))}
						</ul>
					)}
				</>
			)}
		</section>
	);
}
