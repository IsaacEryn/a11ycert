"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

/** [locale] 하위 전체의 404 화면 — notFound() 호출과 미존재 경로 모두 처리 */
export default function LocaleNotFound() {
	const params = useParams();
	const locale = (params?.locale as string) || "ko";
	const t = useTranslations("notFound");

	return (
		<div className="container" style={{ padding: "var(--space-16) var(--space-4)", textAlign: "center" }}>
			<p style={{ fontSize: "var(--fs-3xl)", fontWeight: 800, color: "var(--accent)", letterSpacing: "-0.03em" }} aria-hidden="true">
				404
			</p>
			<h1 style={{ marginTop: "var(--space-2)", fontSize: "var(--fs-xl)", fontWeight: 700 }}>
				{t("pageNotFound")}
			</h1>
			<p style={{ marginTop: "var(--space-3)", color: "var(--fg-muted)", fontSize: "var(--fs-sm)" }}>
				{t("thePageMayHave")}
			</p>
			<div style={{ marginTop: "var(--space-6)", display: "flex", gap: "var(--space-3)", justifyContent: "center", flexWrap: "wrap" }}>
				<Link className="btn btn--primary" href={`/${locale}`}>
					{t("goHome")}
				</Link>
				<Link className="btn" href={`/${locale}/cpacc/study`}>
					{t("cpaccStudy")}
				</Link>
				<Link className="btn" href={`/${locale}/glossary`}>
					{t("glossary")}
				</Link>
			</div>
		</div>
	);
}
