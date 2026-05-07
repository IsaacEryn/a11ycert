"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import type { QuizQuestion } from "@/lib/content/types";
import { useLearningStore } from "@/lib/store/learningStore";
import { useOptionalAuth } from "@/lib/auth/AuthProvider";
import {
	syncWrongAnswerToDB,
	removeWrongAnswerFromDB,
	syncSavedQuestionToDB,
	removeSavedQuestionFromDB,
} from "@/lib/store/learning-sync";
import BilingualText from "@/components/BilingualText";
import ReportButton from "@/components/report/ReportButton";

interface QuizEngineProps {
	questions: QuizQuestion[];
	locale: string;
	exam: "cpacc" | "was";
	/** true이면 모든 문제를 한 번에 표시 */
	showAll?: boolean;
}

type Phase = "quiz" | "summary";

export default function QuizEngine({ questions, locale, exam, showAll = false }: QuizEngineProps) {
	const [current, setCurrent] = useState(0);
	const [selected, setSelected] = useState<"a" | "b" | "c" | "d" | null>(null);
	const [answers, setAnswers] = useState<Record<number, "a" | "b" | "c" | "d">>({});
	const [phase, setPhase] = useState<Phase>("quiz");

	// showAll 모드: 각 문제별 독립 선택 상태
	const [allSelections, setAllSelections] = useState<Record<number, "a" | "b" | "c" | "d" | null>>({});
	const [showAllResults, setShowAllResults] = useState(false);

	const { saveQuestion, unsaveQuestion, addWrongAnswer, removeWrongAnswer, isSaved, languageMode } =
		useLearningStore();
	const auth = useOptionalAuth();
	const userId = auth?.user?.id ?? null;

	const questionRef = useRef<HTMLParagraphElement>(null);
	const summaryRef = useRef<HTMLDivElement>(null);

	const q = questions[current];
	const isKo = locale === "ko";
	const optionKeys = ["a", "b", "c", "d"] as const;

	const handleSelect = (key: "a" | "b" | "c" | "d") => {
		if (selected !== null) return;
		setSelected(key);
		setAnswers((prev) => ({ ...prev, [current]: key }));

		if (key !== q.answer) {
			addWrongAnswer(exam, q.id);
			if (userId) syncWrongAnswerToDB(userId, q.id, key, exam);
		} else {
			removeWrongAnswer(exam, q.id);
			if (userId) removeWrongAnswerFromDB(userId, q.id);
		}
	};

	const handleNext = () => {
		if (current < questions.length - 1) {
			setCurrent((c) => c + 1);
			setSelected(null);
			requestAnimationFrame(() => questionRef.current?.focus());
		} else {
			setPhase("summary");
			requestAnimationFrame(() => summaryRef.current?.focus());
		}
	};

	const toggleSave = () => {
		if (isSaved(exam, q.id)) {
			unsaveQuestion(exam, q.id);
			if (userId) removeSavedQuestionFromDB(userId, q.id);
		} else {
			saveQuestion(exam, q.id);
			if (userId) syncSavedQuestionToDB(userId, q.id);
		}
	};

	const correctCount = questions.filter((_, i) => answers[i] === questions[i].answer).length;
	const wrongAnswersLink = `/${locale}/${exam}/wrong-answers`;

	// showAll 모드 핸들러
	const handleSelectAll = (idx: number, key: "a" | "b" | "c" | "d") => {
		if (allSelections[idx] !== undefined && allSelections[idx] !== null) return;
		setAllSelections((prev) => ({ ...prev, [idx]: key }));

		const q = questions[idx];
		if (key !== q.answer) {
			addWrongAnswer(exam, q.id);
			if (userId) syncWrongAnswerToDB(userId, q.id, key, exam);
		} else {
			removeWrongAnswer(exam, q.id);
			if (userId) removeWrongAnswerFromDB(userId, q.id);
		}
	};

	const allAnswered = questions.every((_, i) => allSelections[i] != null);
	const allCorrectCount = questions.filter((q, i) => allSelections[i] === q.answer).length;

	// ── showAll 모드 렌더링 ──────────────────────────────────────────────
	if (showAll) {
		return (
			<div className="space-y-6">
				{questions.map((q, idx) => {
					const sel = allSelections[idx] ?? null;
					const answered = sel !== null;
					const isCorrect = sel === q.answer;
					const srText = (key: "a" | "b" | "c" | "d") =>
						languageMode === "en-only" ? q.options[key].en : q.options[key].ko;

					return (
						<div
							key={q.id}
							className="rounded-xl border p-5 transition-colors"
							style={answered ? {
								borderColor: isCorrect ? "var(--success-soft)" : "var(--danger-soft)",
								background: isCorrect ? "color-mix(in oklab, var(--success-soft) 40%, transparent)" : "color-mix(in oklab, var(--danger-soft) 40%, transparent)",
							} : { borderColor: "var(--border)" }}
						>
							{/* 문제 번호 + 저장 */}
							<div className="mb-3 flex items-center justify-between">
								<span className="inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold" style={{ background: "var(--accent-soft)", color: "var(--accent-soft-fg)" }}>
									{idx + 1}
								</span>
								<button
									onClick={() => {
										if (isSaved(exam, q.id)) {
											unsaveQuestion(exam, q.id);
											if (userId) removeSavedQuestionFromDB(userId, q.id);
										} else {
											saveQuestion(exam, q.id);
											if (userId) syncSavedQuestionToDB(userId, q.id);
										}
									}}
									aria-label={isSaved(exam, q.id) ? (isKo ? "저장 취소" : "Unsave") : (isKo ? "저장" : "Save")}
									className="rounded px-2 py-0.5 text-xs font-medium transition-colors"
								style={isSaved(exam, q.id)
									? { background: "var(--warning-soft)", color: "var(--warning)" }
									: { background: "var(--bg-muted)", color: "var(--fg-subtle)" }}
								>
									{isSaved(exam, q.id) ? "★" : "☆"}
								</button>
							</div>

							{/* 질문 */}
							<p className="text-sm font-semibold leading-relaxed" style={{ color: "var(--fg)" }}>
								<BilingualText field={q.question} variant="heading" as="span" />
							</p>

							{/* 선택지 */}
							<ul className="mt-3 space-y-2" role="list">
								{optionKeys.map((key) => {
									const btnStyle: React.CSSProperties = answered
										? key === q.answer
											? { borderColor: "var(--success)", background: "var(--success-soft)", color: "var(--success)", fontWeight: 500 }
											: key === sel
												? { borderColor: "var(--danger)", background: "var(--danger-soft)", color: "var(--danger)" }
												: { borderColor: "var(--border)", background: "var(--bg-sunk)", color: "var(--fg-subtle)" }
										: { borderColor: "var(--border)", color: "var(--fg-muted)" };

									const stateLabel = answered
										? key === q.answer ? (isKo ? " (정답)" : " (Correct)") : key === sel ? (isKo ? " (선택한 오답)" : " (Wrong)") : ""
										: "";

									return (
										<li key={key}>
											<button
												className="w-full rounded-lg border px-4 py-2.5 text-left text-sm transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
												style={btnStyle}
												onClick={() => handleSelectAll(idx, key)}
												disabled={answered}
												aria-label={`${key.toUpperCase()}. ${srText(key)}${stateLabel}`}
											>
												<span className="mr-2 font-semibold uppercase" aria-hidden="true">{key}.</span>
												<BilingualText field={q.options[key]} variant="option" as="span" aria-hidden="true" />
												{answered && key === q.answer && <span className="ml-2" aria-hidden="true">✓</span>}
												{answered && key === sel && key !== q.answer && <span className="ml-2" aria-hidden="true">✗</span>}
											</button>
										</li>
									);
								})}
							</ul>

							{/* 해설 */}
							{answered && (
								<div
									className="mt-3 rounded-lg border px-4 py-3 text-sm"
									style={isCorrect
										? { borderColor: "var(--success-soft)", background: "var(--success-soft)", color: "var(--success)" }
										: { borderColor: "var(--danger-soft)", background: "var(--danger-soft)", color: "var(--danger)" }}
								>
									<p className="font-semibold">
										{isCorrect ? (isKo ? "정답입니다!" : "Correct!") : (isKo ? "오답입니다." : "Incorrect.")}
									</p>
									<BilingualText field={q.explanation} variant="body" as="p" className="mt-1 leading-relaxed" />
								</div>
							)}
						</div>
					);
				})}

				{/* 전체 결과 */}
				{allAnswered && !showAllResults && (
					<div className="flex justify-center pt-2">
						<button
							onClick={() => setShowAllResults(true)}
							className="rounded-lg px-6 py-2.5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2"
							style={{ background: "var(--accent)", color: "var(--fg-on-accent)" }}
						>
							{isKo ? "결과 보기" : "See Results"}
						</button>
					</div>
				)}

				{showAllResults && (
					<div className="rounded-xl border p-5" style={{ borderColor: "var(--border)" }}>
						<p className="text-xl font-bold" style={{ color: "var(--fg)" }}>
							{allCorrectCount} / {questions.length}
							<span className="ml-2 text-sm font-normal" style={{ color: "var(--fg-subtle)" }}>
								{isKo ? "정답" : "correct"}
							</span>
						</p>
						<div className="mt-4 flex flex-wrap gap-3">
							<button
								onClick={() => {
									setAllSelections({});
									setShowAllResults(false);
								}}
								className="rounded-lg border px-4 py-2 text-sm font-medium"
								style={{ borderColor: "var(--border)", color: "var(--fg-muted)" }}
							>
								{isKo ? "다시 풀기" : "Retry"}
							</button>
							{allCorrectCount < questions.length && (
								<Link
									href={wrongAnswersLink}
									className="rounded-lg px-4 py-2 text-sm font-medium no-underline"
									style={{ background: "var(--danger)", color: "#fff" }}
								>
									{isKo ? "오답노트 보기" : "View Wrong Answers"}
								</Link>
							)}
						</div>
					</div>
				)}
			</div>
		);
	}

	// ── 기존 1문제씩 모드 ──────────────────────────────────────────────
	if (phase === "summary") {
		return (
			<div
				ref={summaryRef}
				tabIndex={-1}
				className="rounded-xl border p-6 focus-visible:outline-none"
			style={{ borderColor: "var(--border)" }}
			>
				<h3 className="text-base font-semibold" style={{ color: "var(--fg)" }}>
					{isKo ? "퀴즈 완료" : "Quiz Complete"}
				</h3>
				<p className="mt-2 text-2xl font-bold" style={{ color: "var(--fg)" }}>
					{correctCount} / {questions.length}
					<span className="ml-2 text-sm font-normal" style={{ color: "var(--fg-subtle)" }}>
						{isKo ? "정답" : "correct"}
					</span>
				</p>

				{questions.map((q, i) => {
					const userAns = answers[i];
					const correct = userAns === q.answer;
					return (
						<div
							key={q.id}
							className="mt-3 rounded-lg border px-4 py-3 text-sm"
							style={correct
								? { borderColor: "var(--success-soft)", background: "var(--success-soft)" }
								: { borderColor: "var(--danger-soft)", background: "var(--danger-soft)" }}
						>
							<p className="font-medium" style={{ color: "var(--fg)" }}>
								{i + 1}. <BilingualText field={q.question} variant="body" as="span" />
							</p>
							{!correct && userAns && (
								<p className="mt-1" style={{ color: "var(--danger)" }}>
									{isKo ? "내 답: " : "Your answer: "}
									<BilingualText field={q.options[userAns]} variant="label" as="span" />
								</p>
							)}
							<div className="mt-1 flex items-center justify-between">
								<p style={{ color: correct ? "var(--success)" : "var(--fg-muted)" }}>
									{isKo ? "정답: " : "Correct: "}
									<BilingualText field={q.options[q.answer]} variant="label" as="span" />
								</p>
								<ReportButton locale={locale} targetType="quiz" targetId={q.id} />
							</div>
						</div>
					);
				})}

				<div className="mt-6 flex flex-wrap gap-3">
					<button
						onClick={() => {
							setCurrent(0);
							setSelected(null);
							setAnswers({});
							setPhase("quiz");
							requestAnimationFrame(() => questionRef.current?.focus());
						}}
						className="rounded-lg border px-4 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
						style={{ borderColor: "var(--border)", color: "var(--fg-muted)" }}
					>
						{isKo ? "다시 풀기" : "Retry"}
					</button>
					{correctCount < questions.length && (
						<Link
							href={wrongAnswersLink}
							className="rounded-lg px-4 py-2 text-sm font-medium no-underline focus-visible:outline-2 focus-visible:outline-offset-2"
							style={{ background: "var(--danger)", color: "#fff" }}
						>
							{isKo ? "오답노트 보기" : "View Wrong Answers"}
						</Link>
					)}
				</div>
			</div>
		);
	}

	const answered = selected !== null;

	return (
		<div className="rounded-xl border p-6" style={{ borderColor: "var(--border)" }}>
			{/* Progress */}
			<div className="mb-4 flex items-center justify-between text-xs" style={{ color: "var(--fg-subtle)" }}>
				<span>
					{current + 1} / {questions.length}
				</span>
				<button
					onClick={toggleSave}
					aria-label={
						isSaved(exam, q.id)
							? isKo
								? "저장 취소"
								: "Unsave question"
							: isKo
								? "문제 저장"
								: "Save question"
					}
					aria-pressed={isSaved(exam, q.id)}
					className="rounded px-2 py-1 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
					style={isSaved(exam, q.id)
						? { background: "var(--warning-soft)", color: "var(--warning)" }
						: { background: "var(--bg-muted)", color: "var(--fg-subtle)" }}
				>
					<span aria-hidden="true">{isSaved(exam, q.id) ? "★" : "☆"}</span>
					{" "}{isSaved(exam, q.id) ? (isKo ? "저장됨" : "Saved") : isKo ? "저장" : "Save"}
				</button>
			</div>

			{/* Progress bar */}
			<div className="mb-5 h-1.5 w-full overflow-hidden rounded-full" style={{ background: "var(--bg-muted)" }}>
				<div
					className="h-full rounded-full transition-all"
					style={{ background: "var(--accent)", width: `${((current + 1) / questions.length) * 100}%` }}
					role="progressbar"
					aria-valuenow={current + 1}
					aria-valuemin={1}
					aria-valuemax={questions.length}
					aria-label={isKo ? `퀴즈 진행률: ${current + 1}/${questions.length}` : `Quiz progress: ${current + 1} of ${questions.length}`}
				/>
			</div>

			{/* Question */}
			<p
				ref={questionRef}
				tabIndex={-1}
				className="text-sm font-semibold leading-relaxed focus-visible:outline-none"
				style={{ color: "var(--fg)" }}
			>
				<BilingualText field={q.question} variant="heading" as="span" />
			</p>

			{/* Options */}
			<fieldset className="mt-4">
				<legend className="sr-only">
					{isKo ? "답을 선택하세요" : "Select your answer"}
				</legend>
				<ul className="space-y-2" role="list">
					{optionKeys.map((key) => {
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

						return (
							<li key={key}>
								<button
									className="w-full rounded-lg border px-4 py-3 text-left text-sm transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
									style={optStyle}
									onClick={() => handleSelect(key)}
									disabled={answered}
									aria-label={`${key.toUpperCase()}. ${srText}${answerStateLabel}`}
								>
									<span className="mr-2 font-semibold uppercase" aria-hidden="true">{key}.</span>
									<BilingualText field={q.options[key]} variant="option" as="span" aria-hidden="true" />
									{answered && key === q.answer && (
										<span className="ml-2" aria-hidden="true">✓</span>
									)}
									{answered && key === selected && key !== q.answer && (
										<span className="ml-2" aria-hidden="true">✗</span>
									)}
								</button>
							</li>
						);
					})}
				</ul>
			</fieldset>

			{/* Explanation */}
			{answered && (
				<div
					className="mt-4 rounded-lg border px-4 py-3 text-sm"
					style={selected === q.answer
						? { borderColor: "var(--success-soft)", background: "var(--success-soft)", color: "var(--success)" }
						: { borderColor: "var(--danger-soft)", background: "var(--danger-soft)", color: "var(--danger)" }}
					role="alert"
				>
					<p className="font-semibold">
						{selected === q.answer
							? isKo
								? "정답입니다!"
								: "Correct!"
							: isKo
								? "오답입니다."
								: "Incorrect."}
					</p>
					<BilingualText field={q.explanation} variant="body" as="p" className="mt-1 leading-relaxed" />
					{selected !== q.answer && (
						<p className="mt-1 text-xs opacity-75">
							{isKo
								? "오답노트에 자동으로 추가되었습니다."
								: "Added to your wrong answers automatically."}
						</p>
					)}
					<div className="mt-2 flex justify-end">
						<ReportButton locale={locale} targetType="quiz" targetId={q.id} />
					</div>
				</div>
			)}

			{/* Next */}
			{answered && (
				<button
					onClick={handleNext}
					className="mt-4 rounded-lg px-5 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
					style={{ background: "var(--accent)", color: "var(--fg-on-accent)" }}
				>
					{current < questions.length - 1
						? isKo
							? "다음 문제 →"
							: "Next →"
						: isKo
							? "결과 보기"
							: "See Results"}
				</button>
			)}
		</div>
	);
}
