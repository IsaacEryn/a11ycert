"use client";

import type { QuizQuestion } from "@/lib/content/types";
import type { LanguageMode } from "@/lib/store/learningStore";
import BilingualText from "@/components/BilingualText";
import { OPTION_KEYS, type OptionKey } from "./useQuizSession";

interface QuestionCardProps {
	question: QuizQuestion;
	selected: OptionKey | null;
	onSelect: (key: OptionKey) => void;
	isKo: boolean;
	languageMode: LanguageMode;
	/** single: fieldset/legend 시맨틱 + 넉넉한 패딩, list: 여러 문항 나열용 */
	variant: "single" | "list";
	/** 해설 하단에 표시할 액션 (예: 신고 버튼) */
	explanationAction?: React.ReactNode;
}

/** 문항 본문 + 선택지 + 해설 렌더 (fieldset/legend·radio 시맨틱 유지) */
export default function QuestionCard({
	question: q,
	selected,
	onSelect,
	isKo,
	languageMode,
	variant,
	explanationAction,
}: QuestionCardProps) {
	const answered = selected !== null;
	const isCorrect = selected === q.answer;

	const optionList = (
		<ul className={variant === "single" ? "space-y-2" : "mt-3 space-y-2"} role="list">
			{OPTION_KEYS.map((key) => {
				// 스크린리더용 aria-label은 ko-only 또는 en-only에 따라 단일 언어만
				const srText = languageMode === "en-only" ? q.options[key].en : q.options[key].ko;
				const optStyle: React.CSSProperties = answered
					? key === q.answer
						? { borderColor: "var(--success)", background: "var(--success-soft)", color: "var(--success)", fontWeight: 500 }
						: key === selected
							? { borderColor: "var(--danger)", background: "var(--danger-soft)", color: "var(--danger)" }
							: { borderColor: "var(--border)", background: "var(--bg-sunk)", color: "var(--fg-subtle)" }
					: { borderColor: "var(--border)", color: "var(--fg-muted)" };

				const answerStateLabel = answered
					? key === q.answer
						? isKo ? " (정답)" : " (Correct answer)"
						: key === selected
							? isKo ? " (선택한 오답)" : " (Your wrong answer)"
							: ""
					: "";

				const padding = variant === "single" ? "px-4 py-3" : "px-4 py-2.5";

				return (
					<li key={key}>
						<button
							className={`w-full rounded-lg border ${padding} text-left text-sm transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]`}
							style={optStyle}
							onClick={() => onSelect(key)}
							disabled={answered}
							aria-label={`${key.toUpperCase()}. ${srText}${answerStateLabel}`}
						>
							<span className="mr-2 font-semibold uppercase" aria-hidden="true">{key}.</span>
							<BilingualText field={q.options[key]} variant="option" as="span" aria-hidden="true" />
							{answered && key === q.answer && <span className="ml-2" aria-hidden="true">✓</span>}
							{answered && key === selected && key !== q.answer && <span className="ml-2" aria-hidden="true">✗</span>}
						</button>
					</li>
				);
			})}
		</ul>
	);

	return (
		<>
			{variant === "single" ? (
				<fieldset className="mt-4">
					<legend className="sr-only">{isKo ? "답을 선택하세요" : "Select your answer"}</legend>
					{optionList}
				</fieldset>
			) : (
				optionList
			)}

			{/* Explanation */}
			{answered && (
				<div
					className={`${variant === "single" ? "mt-4" : "mt-3"} rounded-lg border px-4 py-3 text-sm`}
					style={isCorrect
						? { borderColor: "var(--success-soft)", background: "var(--success-soft)", color: "var(--success)" }
						: { borderColor: "var(--danger-soft)", background: "var(--danger-soft)", color: "var(--danger)" }}
					role="alert"
					aria-atomic="true"
				>
					<p className="font-semibold">
						{isCorrect ? (isKo ? "정답입니다!" : "Correct!") : (isKo ? "오답입니다." : "Incorrect.")}
					</p>
					<BilingualText field={q.explanation} variant="body" as="p" className="mt-1 leading-relaxed" />
					{variant === "single" && !isCorrect && (
						<p className="mt-1 text-xs opacity-75">
							{isKo ? "오답노트에 자동으로 추가되었습니다." : "Added to your wrong answers automatically."}
						</p>
					)}
					{explanationAction && <div className="mt-2 flex justify-end">{explanationAction}</div>}
				</div>
			)}
		</>
	);
}
