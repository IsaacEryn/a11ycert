"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
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
	const t = useTranslations("errorPage");

	useEffect(() => {
		console.error("[LocaleError]", error);
	}, [error]);

	return (
		<div className="container" style={{ padding: "var(--space-12) var(--space-4)", textAlign: "center" }}>
			<h1 style={{ fontSize: "var(--fs-xl)", fontWeight: 700 }}>
				{t("somethingWentWrong")}
			</h1>
			<p style={{ marginTop: "var(--space-3)", color: "var(--fg-muted)" }}>
				{t("thisMayBeA")}
			</p>
			<div style={{ marginTop: "var(--space-6)", display: "flex", gap: "var(--space-3)", justifyContent: "center" }}>
				<button className="btn btn--primary" onClick={reset}>
					{t("tryAgain")}
				</button>
				<a className="btn" href={`/${locale}`}>
					{t("goHome")}
				</a>
			</div>
		</div>
	);
}
