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
}

type Phase = "quiz" | "summary";

export default function QuizEngine({ questions, locale, exam }: QuizEngineProps) {
	const [current, setCurrent] = useState(0);
	const [selected, setSelected] = useState<"a" | "b" | "c" | "d" | null>(null);
	const [answers, setAnswers] = useState<Record<number, "a" | "b" | "c" | "d">>({});
	const [phase, setPhase] = useState<Phase>("quiz");

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
			addWrongAnswer(q.id);
			if (userId) syncWrongAnswerToDB(userId, q.id, key, exam);
		} else {
			removeWrongAnswer(q.id);
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
		if (isSaved(q.id)) {
			unsaveQuestion(q.id);
			if (userId) removeSavedQuestionFromDB(userId, q.id);
		} else {
			saveQuestion(q.id);
			if (userId) syncSavedQuestionToDB(userId, q.id);
		}
	};

	const correctCount = questions.filter((_, i) => answers[i] === questions[i].answer).length;
	const wrongAnswersLink = `/${locale}/${exam}/wrong-answers`;

	if (phase === "summary") {
		return (
			<div
				ref={summaryRef}
				tabIndex={-1}
				className="rounded-xl border border-gray-200 p-6 focus-visible:outline-none"
			>
				<h3 className="text-base font-semibold text-gray-900">
					{isKo ? "퀴즈 완료" : "Quiz Complete"}
				</h3>
				<p className="mt-2 text-2xl font-bold text-gray-900">
					{correctCount} / {questions.length}
					<span className="ml-2 text-sm font-normal text-gray-500">
						{isKo ? "정답" : "correct"}
					</span>
				</p>

				{questions.map((q, i) => {
					const userAns = answers[i];
					const correct = userAns === q.answer;
					return (
						<div
							key={q.id}
							className={`mt-3 rounded-lg border px-4 py-3 text-sm ${
								correct ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
							}`}
						>
							<p className="font-medium text-gray-900">
								{i + 1}. <BilingualText field={q.question} variant="body" as="span" />
							</p>
							{!correct && userAns && (
								<p className="mt-1 text-red-700">
									{isKo ? "내 답: " : "Your answer: "}
									<BilingualText field={q.options[userAns]} variant="label" as="span" />
								</p>
							)}
							<div className="mt-1 flex items-center justify-between">
								<p className={correct ? "text-green-700" : "text-gray-700"}>
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
						className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
					>
						{isKo ? "다시 풀기" : "Retry"}
					</button>
					{correctCount < questions.length && (
						<Link
							href={wrongAnswersLink}
							className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white no-underline hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-800"
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
		<div className="rounded-xl border border-gray-200 p-6">
			{/* Progress */}
			<div className="mb-4 flex items-center justify-between text-xs text-gray-500">
				<span>
					{current + 1} / {questions.length}
				</span>
				<button
					onClick={toggleSave}
					aria-label={
						isSaved(q.id)
							? isKo
								? "저장 취소"
								: "Unsave question"
							: isKo
								? "문제 저장"
								: "Save question"
					}
					aria-pressed={isSaved(q.id)}
					className={`rounded px-2 py-1 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
						isSaved(q.id)
							? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
							: "bg-gray-100 text-gray-600 hover:bg-gray-200"
					}`}
				>
					<span aria-hidden="true">{isSaved(q.id) ? "★" : "☆"}</span>
					{" "}{isSaved(q.id) ? (isKo ? "저장됨" : "Saved") : isKo ? "저장" : "Save"}
				</button>
			</div>

			{/* Progress bar */}
			<div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
				<div
					className="h-full rounded-full bg-blue-500 transition-all"
					style={{ width: `${((current + 1) / questions.length) * 100}%` }}
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
				className="text-sm font-semibold text-gray-900 leading-relaxed focus-visible:outline-none"
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
						let style =
							"w-full rounded-lg border px-4 py-3 text-left text-sm transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2";

						if (!answered) {
							style += " border-gray-200 hover:border-blue-400 hover:bg-blue-50 text-gray-700 focus-visible:outline-blue-600";
						} else if (key === q.answer) {
							style += " border-green-400 bg-green-50 text-green-800 font-medium focus-visible:outline-green-600";
						} else if (key === selected) {
							style += " border-red-400 bg-red-50 text-red-800 focus-visible:outline-red-600";
						} else {
							style += " border-gray-200 bg-gray-50 text-gray-400 focus-visible:outline-gray-400";
						}

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
									className={style}
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
					className={`mt-4 rounded-lg border px-4 py-3 text-sm ${
						selected === q.answer
							? "border-green-200 bg-green-50 text-green-800"
							: "border-red-200 bg-red-50 text-red-800"
					}`}
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
					className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
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
