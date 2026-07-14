"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import type { SrsCardState, SrsGrade } from "@/lib/srs/leitner";
import { buildDistractors, pickText, shuffled, type DictEntryView } from "./dict-utils";

interface QuizItem {
	entry: DictEntryView;
	options: string[]; // 정답 포함 최대 4개, 셔플됨
	correctText: string;
}

/** 나의 사전 — 객관식 시험 탭 (단어 → 뜻 4지선다, 채점 결과는 SRS 반영) */
export default function DictQuiz({
	locale,
	entries,
	onGrade,
}: {
	locale: string;
	entries: DictEntryView[];
	onGrade: (entryId: string, grade: SrsGrade) => SrsCardState;
}) {
	const t = useTranslations("dictionary");
	const [round, setRound] = useState(0); // 다시 풀기마다 증가 → 문제 재생성
	const [index, setIndex] = useState(0);
	const [picked, setPicked] = useState<string | null>(null);
	const [correctCount, setCorrectCount] = useState(0);
	const [finished, setFinished] = useState(false);

	// 뜻이 있는 엔트리만 출제 가능
	const quizable = useMemo(
		() => entries.filter((e) => pickText(e.meaning, locale)),
		[entries, locale]
	);

	// 채점이 srs를 갱신해도 문제가 중간에 재셔플되지 않도록, 엔트리 id 집합이
	// 바뀌거나 다시 풀기(round)일 때만 재생성한다.
	const idsKey = quizable.map((e) => e.id).sort().join("|");
	const items = useMemo<QuizItem[]>(() => {
		void round;
		void idsKey;
		return shuffled(quizable).map((entry) => {
			const correctText = pickText(entry.meaning, locale);
			const distractors = buildDistractors(entry, quizable, locale, 3);
			return { entry, options: shuffled([correctText, ...distractors]), correctText };
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [idsKey, locale, round]);

	const item = items[index];

	const headingRef = useRef<HTMLParagraphElement>(null);
	useEffect(() => {
		if (index > 0) headingRef.current?.focus();
	}, [index]);

	if (quizable.length === 0) {
		return (
			<p style={{ textAlign: "center", padding: "var(--space-10) var(--space-4)", color: "var(--fg-muted)", fontSize: "var(--fs-sm)" }}>
				{t("quizNeedMore")}
			</p>
		);
	}

	const restart = () => {
		setRound((r) => r + 1);
		setIndex(0);
		setPicked(null);
		setCorrectCount(0);
		setFinished(false);
	};

	if (finished) {
		return (
			<div style={{ textAlign: "center", padding: "var(--space-10) var(--space-4)" }}>
				<p style={{ fontSize: "var(--fs-xl)", fontWeight: 700 }} role="status">
					{t("quizResult", { correct: correctCount, total: items.length })}
				</p>
				<button type="button" className="btn btn--primary" style={{ marginTop: "var(--space-4)" }} onClick={restart}>
					{t("quizRestart")}
				</button>
			</div>
		);
	}

	if (!item) return null;

	const answered = picked !== null;
	const isCorrect = picked === item.correctText;
	const displayWord = pickText(item.entry.word, locale);

	const handlePick = (option: string) => {
		if (answered) return;
		setPicked(option);
		const correct = option === item.correctText;
		if (correct) setCorrectCount((c) => c + 1);
		onGrade(item.entry.id, correct ? "good" : "again");
	};

	const handleNext = () => {
		if (index < items.length - 1) {
			setIndex((i) => i + 1);
			setPicked(null);
		} else {
			setFinished(true);
		}
	};

	return (
		<div style={{ maxWidth: 640, margin: "0 auto" }}>
			<p style={{ fontSize: "var(--fs-xs)", color: "var(--fg-subtle)" }}>
				{t("quizProgress", { current: index + 1, total: items.length })}
			</p>

			<p
				ref={headingRef}
				tabIndex={-1}
				style={{ marginTop: "var(--space-2)", fontSize: "var(--fs-sm)", color: "var(--fg-muted)" }}
				className="focus-visible:outline-none"
			>
				{t("quizPrompt")}
			</p>
			<p style={{ marginTop: "var(--space-1)", fontSize: "var(--fs-lg)", fontWeight: 700 }}>
				{item.entry.word.ko && <span lang="ko">{item.entry.word.ko}</span>}
				{item.entry.word.ko && item.entry.word.en && <span aria-hidden="true"> · </span>}
				{item.entry.word.en && <span lang="en" style={{ color: item.entry.word.ko ? "var(--fg-muted)" : undefined }}>{item.entry.word.en}</span>}
			</p>

			<fieldset style={{ marginTop: "var(--space-4)", border: "none", margin: 0, padding: 0 }}>
				<legend className="sr-only">{t("quizAnswerLabel")}</legend>
				<ul style={{ listStyle: "none", margin: "var(--space-4) 0 0", padding: 0, display: "flex", flexDirection: "column", gap: "var(--space-2)" }} role="list">
					{item.options.map((option, oi) => {
						const style: React.CSSProperties = answered
							? option === item.correctText
								? { borderColor: "var(--success)", background: "var(--success-soft)", color: "var(--success)", fontWeight: 500 }
								: option === picked
									? { borderColor: "var(--danger)", background: "var(--danger-soft)", color: "var(--danger)" }
									: { borderColor: "var(--border)", background: "var(--bg-sunk)", color: "var(--fg-subtle)" }
							: { borderColor: "var(--border)", color: "var(--fg-muted)" };
						const stateLabel = answered
							? option === item.correctText
								? ` (${t("quizCorrect")})`
								: option === picked
									? ` (${t("quizWrong")})`
									: ""
							: "";
						return (
							<li key={oi}>
								<button
									type="button"
									className="w-full rounded-lg border px-4 py-3 text-left text-sm transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
									style={style}
									onClick={() => handlePick(option)}
									disabled={answered}
									aria-label={`${String.fromCharCode(65 + oi)}. ${option}${stateLabel}`}
								>
									<span className="mr-2 font-semibold" aria-hidden="true">{String.fromCharCode(65 + oi)}.</span>
									<span aria-hidden="true">{option}</span>
									{answered && option === item.correctText && <span className="ml-2" aria-hidden="true">✓</span>}
									{answered && option === picked && option !== item.correctText && <span className="ml-2" aria-hidden="true">✗</span>}
								</button>
							</li>
						);
					})}
				</ul>
			</fieldset>

			{answered && (
				<div
					style={{
						marginTop: "var(--space-4)",
						padding: "var(--space-3) var(--space-4)",
						borderRadius: "var(--radius)",
						border: "1px solid",
						fontSize: "var(--fs-sm)",
						...(isCorrect
							? { borderColor: "var(--success-soft)", background: "var(--success-soft)", color: "var(--success)" }
							: { borderColor: "var(--danger-soft)", background: "var(--danger-soft)", color: "var(--danger)" }),
					}}
					role="alert"
					aria-atomic="true"
				>
					<p style={{ margin: 0, fontWeight: 600 }}>{isCorrect ? t("quizCorrect") : t("quizWrong")}</p>
					{!isCorrect && (
						<p style={{ margin: "4px 0 0" }}>
							<strong>{displayWord}</strong> — {item.correctText}
						</p>
					)}
				</div>
			)}

			{answered && (
				<button
					type="button"
					className="btn btn--primary"
					style={{ marginTop: "var(--space-4)" }}
					onClick={handleNext}
				>
					{index < items.length - 1 ? t("quizNext") : t("quizFinish")}
				</button>
			)}
		</div>
	);
}
