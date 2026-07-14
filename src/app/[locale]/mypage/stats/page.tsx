import { setRequestLocale, getTranslations } from "next-intl/server";
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

	return (
		<div>
			<h1 style={{ fontSize: "var(--fs-xl)", fontWeight: 700, color: "var(--fg)" }}>{t("title")}</h1>
			<p style={{ marginTop: "var(--space-1)", fontSize: "var(--fs-sm)", color: "var(--fg-muted)" }}>
				{t("description")}
			</p>

			<StatsClient locale={locale} />
		</div>
	);
}
