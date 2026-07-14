import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import ActivityClient from "@/components/mypage/ActivityClient";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "mypage" });
	return { title: t("nav.activity"), robots: { index: false } };
}

export default async function ActivityPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations({ locale, namespace: "mypage" });

	return (
		<div>
			<h1 style={{ fontSize: "var(--fs-xl)", fontWeight: 700, color: "var(--fg)" }}>{t("nav.activity")}</h1>
			<ActivityClient locale={locale} />
		</div>
	);
}
