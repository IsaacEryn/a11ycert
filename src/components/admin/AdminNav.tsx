"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

interface AdminNavProps {
	locale: string;
	/** 미처리 제보 수 (Phase 3에서 배선) */
	pendingReports?: number;
}

export default function AdminNav({ locale, pendingReports = 0 }: AdminNavProps) {
	const t = useTranslations("admin");
	const pathname = usePathname();
	const base = `/${locale}/cert-manage`;

	const items: { href: string; label: string; badge?: number }[] = [
		{ href: base, label: t("nav.dashboard") },
		{ href: `${base}/reports`, label: t("nav.reports"), badge: pendingReports },
		{ href: `${base}/users`, label: t("nav.users") },
		{ href: `${base}/questions`, label: t("nav.questions") },
		{ href: `${base}/community`, label: t("nav.community") },
		{ href: `${base}/logs`, label: t("nav.logs") },
	];

	function isActive(href: string) {
		if (href === base) return pathname === base;
		return pathname === href || pathname.startsWith(href + "/");
	}

	return (
		<nav aria-label={t("navLabel")}>
			<ul style={{ display: "flex", flexDirection: "column", gap: 2, listStyle: "none", margin: 0, padding: 0 }}>
				{items.map(({ href, label, badge }) => {
					const active = isActive(href);
					return (
						<li key={href}>
							<Link
								href={href}
								aria-current={active ? "page" : undefined}
								aria-label={badge ? `${label}, ${t("pendingBadge", { count: badge })}` : undefined}
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
									gap: "var(--space-2)",
									padding: "8px 12px",
									borderRadius: "var(--radius)",
									fontSize: "var(--fs-sm)",
									textDecoration: "none",
									fontWeight: active ? 600 : 400,
									color: active ? "var(--accent)" : "var(--fg-muted)",
									background: active ? "var(--accent-soft)" : "none",
								}}
							>
								<span>{label}</span>
								{badge != null && badge > 0 && (
									<span
										aria-hidden="true"
										style={{
											fontSize: "var(--fs-xs)",
											fontWeight: 700,
											background: "var(--danger)",
											color: "#fff",
											borderRadius: 999,
											padding: "0 7px",
											lineHeight: "18px",
											minWidth: 18,
											textAlign: "center",
										}}
									>
										{badge}
									</span>
								)}
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
