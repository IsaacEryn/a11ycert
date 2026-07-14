"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useOptionalAuth } from "@/lib/auth/AuthProvider";

export default function MypageNav({ locale }: { locale: string }) {
	const t = useTranslations("mypage");
	const pathname = usePathname();
	const auth = useOptionalAuth();
	const base = `/${locale}/mypage`;

	if (!auth?.user) return null;

	const items = [
		{ href: base, label: t("nav.home") },
		{ href: `${base}/exam-room`, label: t("nav.examRoom") },
		{ href: `${base}/dictionary`, label: t("nav.dictionary") },
		{ href: `${base}/stats`, label: t("nav.stats") },
		{ href: `${base}/activity`, label: t("nav.activity") },
		{ href: `${base}/settings`, label: t("nav.settings") },
	];

	function isActive(href: string) {
		if (href === base) return pathname === base;
		return pathname === href || pathname.startsWith(href + "/");
	}

	return (
		<nav aria-label={t("navLabel")} style={{ marginBottom: "var(--space-6)", overflowX: "auto" }}>
			<ul style={{ display: "flex", gap: 2, listStyle: "none", margin: 0, padding: 0, borderBottom: "1px solid var(--divider)" }}>
				{items.map(({ href, label }) => {
					const active = isActive(href);
					return (
						<li key={href}>
							<Link
								href={href}
								aria-current={active ? "page" : undefined}
								style={{
									display: "block",
									padding: "8px 14px",
									fontSize: "var(--fs-sm)",
									textDecoration: "none",
									whiteSpace: "nowrap",
									fontWeight: active ? 600 : 400,
									color: active ? "var(--accent)" : "var(--fg-muted)",
									borderBottom: active ? "2px solid var(--accent)" : "2px solid transparent",
									marginBottom: -1,
								}}
							>
								{label}
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
