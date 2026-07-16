import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "offline" });
	return { title: t("title"), robots: { index: false } };
}

/** 오프라인 폴백 — 서비스워커가 네트워크 실패 시 이 페이지를 보여준다 */
export default async function OfflinePage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations({ locale, namespace: "offline" });

	return (
		<div className="container" style={{ padding: "var(--space-16) var(--space-4)", textAlign: "center", maxWidth: 560 }}>
			<p style={{ fontSize: "var(--fs-3xl)" }} aria-hidden="true">📡</p>
			<h1 style={{ fontSize: "var(--fs-xl)", fontWeight: 700, marginTop: "var(--space-4)" }}>{t("title")}</h1>
			<p style={{ marginTop: "var(--space-3)", fontSize: "var(--fs-sm)", color: "var(--fg-muted)", lineHeight: 1.7 }}>
				{t("body")}
			</p>
		</div>
	);
}
