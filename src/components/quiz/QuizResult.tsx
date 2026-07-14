"use client";

import Link from "next/link";
import type { QuizQuestion } from "@/lib/content/types";
import BilingualText from "@/components/BilingualText";
import ReportButton from "@/components/report/ReportButton";
import AdSlot from "@/components/ads/AdSlot";
import type { OptionKey } from "./useQuizSession";

interface QuizResultProps {
	questions: QuizQuestion[];
	answers: Record<number, OptionKey>;
	correctCount: number;
	locale: string;
	exam: "cpacc" | "was";
	onRetry: () => void;
	summaryRef?: React.Ref<HTMLDivElement>;
}

/** 퀴즈 결과 화면 — 점수 + 문항별 정오 + 다시 풀기/오답노트 링크 */
export default function QuizResult({
	questions,
	answers,
	correctCount,
	locale,
	exam,
	onRetry,
	summaryRef,
}: QuizResultProps) {
	const isKo = locale === "ko";
	const wrongAnswersLink = `/${locale}/${exam}/wrong-answers`;

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
					onClick={onRetry}
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

			{/* 광고는 결과 화면에서만 — 풀이 중 금지 (PROJECT_SPEC §5) */}
			<AdSlot slotKey="quizResult" />
		</div>
	);
}
