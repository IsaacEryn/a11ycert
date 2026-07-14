import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import SettingsClient from "@/components/mypage/SettingsClient";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "mypage" });
	return { title: t("nav.settings"), robots: { index: false } };
}

export default async function SettingsPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations({ locale, namespace: "mypage" });

	return (
		<div>
			<h1 style={{ fontSize: "var(--fs-xl)", fontWeight: 700, color: "var(--fg)" }}>{t("nav.settings")}</h1>
			<SettingsClient locale={locale} />
		</div>
	);
}
