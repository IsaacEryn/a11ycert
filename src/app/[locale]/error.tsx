"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";

export default function LocaleError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	const params = useParams();
	const locale = (params?.locale as string) || "ko";
	const isKo = locale === "ko";

	useEffect(() => {
		console.error("[LocaleError]", error);
	}, [error]);

	return (
		<div className="container" style={{ padding: "var(--space-12) var(--space-4)", textAlign: "center" }}>
			<h1 style={{ fontSize: "var(--fs-xl)", fontWeight: 700 }}>
				{isKo ? "문제가 발생했습니다" : "Something went wrong"}
			</h1>
			<p style={{ marginTop: "var(--space-3)", color: "var(--fg-muted)" }}>
				{isKo
					? "일시적인 오류일 수 있습니다. 다시 시도해주세요."
					: "This may be a temporary issue. Please try again."}
			</p>
			<div style={{ marginTop: "var(--space-6)", display: "flex", gap: "var(--space-3)", justifyContent: "center" }}>
				<button className="btn btn--primary" onClick={reset}>
					{isKo ? "다시 시도" : "Try again"}
				</button>
				<a className="btn" href={`/${locale}`}>
					{isKo ? "홈으로" : "Go home"}
				</a>
			</div>
		</div>
	);
}
