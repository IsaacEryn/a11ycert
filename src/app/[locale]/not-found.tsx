"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

/** [locale] 하위 전체의 404 화면 — notFound() 호출과 미존재 경로 모두 처리 */
export default function LocaleNotFound() {
	const params = useParams();
	const locale = (params?.locale as string) || "ko";
	const isKo = locale === "ko";

	return (
		<div className="container" style={{ padding: "var(--space-16) var(--space-4)", textAlign: "center" }}>
			<p style={{ fontSize: "var(--fs-3xl)", fontWeight: 800, color: "var(--accent)", letterSpacing: "-0.03em" }} aria-hidden="true">
				404
			</p>
			<h1 style={{ marginTop: "var(--space-2)", fontSize: "var(--fs-xl)", fontWeight: 700 }}>
				{isKo ? "페이지를 찾을 수 없습니다" : "Page not found"}
			</h1>
			<p style={{ marginTop: "var(--space-3)", color: "var(--fg-muted)", fontSize: "var(--fs-sm)" }}>
				{isKo
					? "주소가 바뀌었거나 삭제된 페이지일 수 있습니다."
					: "The page may have been moved or no longer exists."}
			</p>
			<div style={{ marginTop: "var(--space-6)", display: "flex", gap: "var(--space-3)", justifyContent: "center", flexWrap: "wrap" }}>
				<Link className="btn btn--primary" href={`/${locale}`}>
					{isKo ? "홈으로" : "Go home"}
				</Link>
				<Link className="btn" href={`/${locale}/cpacc/study`}>
					{isKo ? "CPACC 학습" : "CPACC Study"}
				</Link>
				<Link className="btn" href={`/${locale}/glossary`}>
					{isKo ? "용어집" : "Glossary"}
				</Link>
			</div>
		</div>
	);
}
