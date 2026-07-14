"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import DictionaryTabs from "@/components/dictionary/DictionaryTabs";

/**
 * 나의 사전 — 마이페이지 하위지만 비로그인도 사용 가능(localStorage).
 * 로그인 시 DB 동기화로 기기 간 공유.
 */
export default function DictionaryPage() {
	const t = useTranslations("dictionary");
	const params = useParams();
	const locale = params.locale as string;

	return (
		<div>
			<h1 style={{ fontSize: "var(--fs-xl)", fontWeight: 700, color: "var(--fg)" }}>
				{t("title")}
			</h1>
			<p style={{ marginTop: "var(--space-1)", fontSize: "var(--fs-sm)", color: "var(--fg-muted)" }}>
				{t("description")}
			</p>

			<div style={{ marginTop: "var(--space-8)" }}>
				<DictionaryTabs locale={locale} />
			</div>
		</div>
	);
}
