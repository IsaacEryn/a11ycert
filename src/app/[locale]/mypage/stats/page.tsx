import { setRequestLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import type { Metadata } from "next";
import { localeAlternates } from "@/lib/seo";
import StatsClient from "@/components/mypage/StatsClient";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "stats" });
	return {
		title: t("title"),
		description: t("description"),
		alternates: localeAlternates(locale, "/mypage/stats"),
	};
}

export default async function StatsPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations({ locale, namespace: "stats" });
	const isKo = locale === "ko";

	return (
		<div style={{ maxWidth: 768, margin: "0 auto", padding: "var(--space-10) var(--space-4)", width: "100%" }}>
			<nav style={{ marginBottom: "var(--space-6)", fontSize: "var(--fs-xs)", color: "var(--fg-subtle)" }}>
				<ol style={{ display: "flex", alignItems: "center", gap: "var(--space-1)", listStyle: "none", margin: 0, padding: 0 }}>
					<li>
						<Link href={`/${locale}/mypage`} style={{ color: "var(--fg-subtle)", textDecoration: "none" }}>
							{isKo ? "나의 정보" : "My Profile"}
						</Link>
					</li>
					<li aria-hidden="true">/</li>
					<li style={{ color: "var(--fg-muted)" }} aria-current="page">
						{t("title")}
					</li>
				</ol>
			</nav>

			<h1 style={{ fontSize: "var(--fs-xl)", fontWeight: 700, color: "var(--fg)" }}>{t("title")}</h1>
			<p style={{ marginTop: "var(--space-1)", fontSize: "var(--fs-sm)", color: "var(--fg-muted)" }}>
				{t("description")}
			</p>

			<StatsClient locale={locale} />
		</div>
	);
}
