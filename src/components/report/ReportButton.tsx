"use client";

interface ReportButtonProps {
	locale: string;
	targetType: "quiz" | "content" | "glossary";
	targetId?: string;
}

export default function ReportButton({ locale, targetType, targetId }: ReportButtonProps) {
	const isKo = locale === "ko";

	const typeLabel = targetType === "quiz" ? (isKo ? "퀴즈" : "quiz") : targetType === "glossary" ? (isKo ? "용어집" : "glossary") : (isKo ? "콘텐츠" : "content");
	const subject = encodeURIComponent(
		isKo
			? `[오류 제보] ${typeLabel}${targetId ? ` — ${targetId}` : ""}`
			: `[Issue Report] ${typeLabel}${targetId ? ` — ${targetId}` : ""}`
	);
	const body = encodeURIComponent(
		isKo
			? `대상: ${typeLabel}${targetId ? ` (${targetId})` : ""}\n\n오류 내용:\n`
			: `Target: ${typeLabel}${targetId ? ` (${targetId})` : ""}\n\nIssue description:\n`
	);

	return (
		<a
			href={`mailto:contact@a11ycert.com?subject=${subject}&body=${body}`}
			className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs transition-colors"
			style={{ color: "var(--fg-subtle)" }}
			aria-label={isKo ? "이메일로 오류 제보하기" : "Report an issue via email"}
		>
			<svg
				aria-hidden="true"
				width="14"
				height="14"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
				<line x1="4" y1="22" x2="4" y2="15" />
			</svg>
			<span>{isKo ? "제보" : "Report"}</span>
		</a>
	);
}
