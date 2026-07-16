import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { glossaryTerms } from "@/lib/content/glossary";
import DictionaryTabs from "@/components/dictionary/DictionaryTabs";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "dictionary" });
	return { title: t("title"), robots: { index: false } };
}

/**
 * 나의 사전 — 서버에서 용어집 데이터를 주입 (클라이언트가 glossary 모듈을
 * 직접 import하면 용어집 전체가 번들에 포함되므로 금지).
 * 비로그인도 사용 가능(localStorage), 로그인 시 DB 동기화.
 */
export default async function DictionaryPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations({ locale, namespace: "dictionary" });

	return (
		<div>
			<h1 style={{ fontSize: "var(--fs-xl)", fontWeight: 700, color: "var(--fg)" }}>
				{t("title")}
			</h1>
			<p style={{ marginTop: "var(--space-1)", fontSize: "var(--fs-sm)", color: "var(--fg-muted)" }}>
				{t("description")}
			</p>

			<div style={{ marginTop: "var(--space-8)" }}>
				<DictionaryTabs locale={locale} terms={glossaryTerms} />
			</div>
		</div>
	);
}
