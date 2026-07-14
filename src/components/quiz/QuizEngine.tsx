"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import type { QuizQuestion } from "@/lib/content/types";
import BilingualText from "@/components/BilingualText";
import ReportButton from "@/components/report/ReportButton";
import AddWordButton from "@/components/dictionary/AddWordButton";
import QuestionCard from "./QuestionCard";
import QuizResult from "./QuizResult";
import { useQuizSession, type OptionKey } from "./useQuizSession";

interface QuizEngineProps {
	questions: QuizQuestion[];
	locale: string;
	exam: "cpacc" | "was";
	/** true이면 모든 문제를 한 번에 표시 */
	showAll?: boolean;
}

export default function QuizEngine({ questions, locale, exam, showAll = false }: QuizEngineProps) {
	if (showAll) {
		return <AllAtOnceQuiz questions={questions} locale={locale} exam={exam} />;
	}
	return <SteppedQuiz questions={questions} locale={locale} exam={exam} />;
}

/** 단원 퀴즈: 모든 문제를 한 번에 나열 */
function AllAtOnceQuiz({ questions, locale, exam }: Omit<QuizEngineProps, "showAll">) {
	const session = useQuizSession(questions, exam);
	const [showResults, setShowResults] = useState(false);
	const isKo = locale === "ko";
	const wrongAnswersLink = `/${locale}/${exam}/wrong-answers`;

	return (
		<div className="space-y-6">
			{session.questions.map((q, idx) => {
				const sel = session.answers[idx] ?? null;
				const answered = sel !== null;
				const isCorrect = sel === q.answer;

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
								onClick={() => session.toggleSave(q.id)}
								aria-label={session.isQuestionSaved(q.id) ? (isKo ? "저장 취소" : "Unsave") : (isKo ? "저장" : "Save")}
								aria-pressed={session.isQuestionSaved(q.id)}
								className="rounded px-2 py-0.5 text-xs font-medium transition-colors"
								style={session.isQuestionSaved(q.id)
									? { background: "var(--warning-soft)", color: "var(--warning)" }
									: { background: "var(--bg-muted)", color: "var(--fg-subtle)" }}
							>
								{session.isQuestionSaved(q.id) ? "★" : "☆"}
							</button>
						</div>

						{/* 질문 */}
						<p className="text-sm font-semibold leading-relaxed" style={{ color: "var(--fg)" }}>
							<BilingualText field={q.question} variant="heading" as="span" />
						</p>

						<QuestionCard
							question={q}
							selected={sel}
							onSelect={(key: OptionKey) => session.answerQuestion(idx, key)}
							isKo={isKo}
							languageMode={session.languageMode}
							variant="list"
						/>
					</div>
				);
			})}

			{/* 전체 결과 */}
			{session.allAnswered && !showResults && (
				<div className="flex justify-center pt-2">
					<button
						onClick={() => setShowResults(true)}
						className="rounded-lg px-6 py-2.5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2"
						style={{ background: "var(--accent)", color: "var(--fg-on-accent)" }}
					>
						{isKo ? "결과 보기" : "See Results"}
					</button>
				</div>
			)}

			{showResults && (
				<div className="rounded-xl border p-5" style={{ borderColor: "var(--border)" }}>
					<p className="text-xl font-bold" style={{ color: "var(--fg)" }}>
						{session.correctCount} / {session.questions.length}
						<span className="ml-2 text-sm font-normal" style={{ color: "var(--fg-subtle)" }}>
							{isKo ? "정답" : "correct"}
						</span>
					</p>
					<div className="mt-4 flex flex-wrap gap-3">
						<button
							onClick={() => {
								session.reset();
								setShowResults(false);
							}}
							className="rounded-lg border px-4 py-2 text-sm font-medium"
							style={{ borderColor: "var(--border)", color: "var(--fg-muted)" }}
						>
							{isKo ? "다시 풀기" : "Retry"}
						</button>
						{session.correctCount < session.questions.length && (
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

/** 1문제씩 진행하는 모드 */
function SteppedQuiz({ questions, locale, exam }: Omit<QuizEngineProps, "showAll">) {
	const session = useQuizSession(questions, exam);
	const [current, setCurrent] = useState(0);
	const [phase, setPhase] = useState<"quiz" | "summary">("quiz");

	const questionRef = useRef<HTMLParagraphElement>(null);
	const summaryRef = useRef<HTMLDivElement>(null);

	const isKo = locale === "ko";
	const q = session.questions[current];
	const selected = session.answers[current] ?? null;
	const answered = selected !== null;

	const handleNext = () => {
		if (current < session.questions.length - 1) {
			setCurrent((c) => c + 1);
			requestAnimationFrame(() => questionRef.current?.focus());
		} else {
			setPhase("summary");
			requestAnimationFrame(() => summaryRef.current?.focus());
		}
	};

	const handleRetry = () => {
		setCurrent(0);
		session.reset();
		setPhase("quiz");
		requestAnimationFrame(() => questionRef.current?.focus());
	};

	if (phase === "summary") {
		return (
			<QuizResult
				questions={session.questions}
				answers={session.answers}
				correctCount={session.correctCount}
				locale={locale}
				exam={exam}
				onRetry={handleRetry}
				summaryRef={summaryRef}
			/>
		);
	}

	return (
		<div className="rounded-xl border p-6" style={{ borderColor: "var(--border)" }}>
			{/* Progress */}
			<div className="mb-4 flex items-center justify-between text-xs" style={{ color: "var(--fg-subtle)" }}>
				<span>
					{current + 1} / {session.questions.length}
				</span>
				<button
					onClick={() => session.toggleSave(q.id)}
					aria-label={
						session.isQuestionSaved(q.id)
							? isKo ? "저장 취소" : "Unsave question"
							: isKo ? "문제 저장" : "Save question"
					}
					aria-pressed={session.isQuestionSaved(q.id)}
					className="rounded px-2 py-1 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
					style={session.isQuestionSaved(q.id)
						? { background: "var(--warning-soft)", color: "var(--warning)" }
						: { background: "var(--bg-muted)", color: "var(--fg-subtle)" }}
				>
					<span aria-hidden="true">{session.isQuestionSaved(q.id) ? "★" : "☆"}</span>
					{" "}{session.isQuestionSaved(q.id) ? (isKo ? "저장됨" : "Saved") : isKo ? "저장" : "Save"}
				</button>
			</div>

			{/* Progress bar */}
			<div className="mb-5 h-1.5 w-full overflow-hidden rounded-full" style={{ background: "var(--bg-muted)" }}>
				<div
					className="h-full rounded-full transition-all"
					style={{ background: "var(--accent)", width: `${((current + 1) / session.questions.length) * 100}%` }}
					role="progressbar"
					aria-valuenow={current + 1}
					aria-valuemin={1}
					aria-valuemax={session.questions.length}
					aria-label={isKo ? `퀴즈 진행률: ${current + 1}/${session.questions.length}` : `Quiz progress: ${current + 1} of ${session.questions.length}`}
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

			<QuestionCard
				question={q}
				selected={selected}
				onSelect={(key: OptionKey) => session.answerQuestion(current, key)}
				isKo={isKo}
				languageMode={session.languageMode}
				variant="single"
				explanationAction={
					<div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center" }}>
						<AddWordButton small />
						<ReportButton locale={locale} targetType="quiz" targetId={q.id} />
					</div>
				}
			/>

			{/* Next */}
			{answered && (
				<button
					onClick={handleNext}
					className="mt-4 rounded-lg px-5 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
					style={{ background: "var(--accent)", color: "var(--fg-on-accent)" }}
				>
					{current < session.questions.length - 1
						? isKo ? "다음 문제 →" : "Next →"
						: isKo ? "결과 보기" : "See Results"}
				</button>
			)}
		</div>
	);
}
