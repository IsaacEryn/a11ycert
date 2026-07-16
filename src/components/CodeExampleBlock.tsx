"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { CodeExample } from "@/lib/content/types";

type TokenType = "plain" | "comment" | "string" | "keyword";

/**
 * 무의존 경량 토크나이저 — 주석·문자열·키워드(태그/속성/예약어) 3종만 구분.
 * 학습용 짧은 스니펫 표시가 목적이라 완전한 파서가 아니어도 충분하다.
 */
function tokenize(code: string, lang: CodeExample["lang"]): { text: string; type: TokenType }[] {
	const patterns: Record<CodeExample["lang"], RegExp> = {
		html: /(<!--[\s\S]*?-->)|("[^"]*"|'[^']*')|(<\/?[a-zA-Z][\w-]*|\/?>|[a-zA-Z-]+(?==))/g,
		css: /(\/\*[\s\S]*?\*\/)|("[^"]*"|'[^']*')|(@[\w-]+|[\w-]+(?=\s*:))/g,
		js: /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("[^"]*"|'[^']*'|`[^`]*`)|(\b(?:const|let|var|function|return|if|else|for|of|in|new|class|import|export|from|async|await|document|window|addEventListener|querySelector(?:All)?)\b)/g,
	};
	const re = patterns[lang];
	const tokens: { text: string; type: TokenType }[] = [];
	let last = 0;
	for (const m of code.matchAll(re)) {
		const idx = m.index ?? 0;
		if (idx > last) tokens.push({ text: code.slice(last, idx), type: "plain" });
		const type: TokenType = m[1] ? "comment" : m[2] ? "string" : "keyword";
		tokens.push({ text: m[0], type });
		last = idx + m[0].length;
	}
	if (last < code.length) tokens.push({ text: code.slice(last), type: "plain" });
	return tokens;
}

/** WAS 학습용 코드 예제 블록 — 캡션 병기 + 복사 버튼, 가로 스크롤 자체 컨테이너 */
export default function CodeExampleBlock({ example, locale }: { example: CodeExample; locale: string }) {
	const t = useTranslations("study");
	const [copied, setCopied] = useState(false);
	const caption = locale === "ko" ? example.caption.ko : example.caption.en;

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(example.code);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {
			/* clipboard 미지원 — 무시 */
		}
	};

	return (
		<figure className="code-example">
			<figcaption className="code-example__caption">
				<span className="code-example__lang" aria-hidden="true">{example.lang.toUpperCase()}</span>
				{caption}
				<button
					type="button"
					className="code-example__copy"
					onClick={copy}
					aria-label={t("copyCode", { caption })}
				>
					{copied ? t("copied") : t("copy")}
				</button>
			</figcaption>
			{/* 가로 스크롤은 pre 자체에서 — 페이지 수평 스크롤 방지 */}
			<pre tabIndex={0} aria-label={caption}>
				<code>
					{tokenize(example.code, example.lang).map((tok, i) =>
						tok.type === "plain" ? (
							tok.text
						) : (
							<span key={i} className={`code-tok--${tok.type}`}>{tok.text}</span>
						)
					)}
				</code>
			</pre>
			<span className="sr-only" role="status" aria-live="polite">
				{copied ? t("copied") : ""}
			</span>
		</figure>
	);
}
