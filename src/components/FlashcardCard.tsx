"use client";

import { useEffect } from "react";
import type { QuizQuestion } from "@/lib/content/types";
import BilingualText from "@/components/BilingualText";

interface FlashcardCardProps {
	question: QuizQuestion;
	index: number;
	total: number;
	isFlipped: boolean;
	onFlip: () => void;
	onPrev: () => void;
	onNext: () => void;
	locale: string;
	accentColor: "blue" | "violet";
}

export default function FlashcardCard({
	question: q,
	index,
	total,
	isFlipped,
	onFlip,
	onPrev,
	onNext,
	locale,
	accentColor,
}: FlashcardCardProps) {
	const isKo = locale === "ko";
	const accent = accentColor === "violet" ? "bg-violet-600 hover:bg-violet-700" : "bg-blue-600 hover:bg-blue-700";
	const accentBorder = accentColor === "violet" ? "border-violet-200" : "border-blue-200";

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (e.key === " " || e.key === "Enter") {
				e.preventDefault();
				onFlip();
			} else if (e.key === "ArrowRight") {
				onNext();
			} else if (e.key === "ArrowLeft") {
				onPrev();
			}
		};
		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, [onFlip, onNext, onPrev]);

	return (
		<article aria-label={`플래시카드 ${index + 1} / ${total}`} className="flex flex-col gap-4">
			{/* 카드 본체 */}
			<div
				className={`min-h-52 rounded-2xl border-2 bg-white px-6 py-8 shadow-sm transition-colors ${
					isFlipped ? accentBorder : "border-gray-200"
				}`}
			>
				{/* aria-live 영역: 뒤집기 상태 변화를 스크린리더에 전달 */}
				<div aria-live="polite" className="flex flex-col gap-4">
					{!isFlipped ? (
						<div>
							<p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
								{isKo ? "문제" : "Question"}
							</p>
							<p className="text-base font-semibold text-gray-900 leading-relaxed">
								<BilingualText field={q.question} variant="heading" as="span" />
							</p>
						</div>
					) : (
						<div className="flex flex-col gap-3">
							<div>
								<p className="mb-1 text-xs font-semibold uppercase tracking-widest text-gray-400">
									{isKo ? "정답" : "Answer"}
								</p>
								<p className="text-base font-semibold text-gray-900">
									<span className="mr-1 font-bold uppercase text-gray-500">{q.answer}.</span>
									<BilingualText field={q.options[q.answer]} variant="heading" as="span" />
								</p>
							</div>
							<hr className="border-gray-200" />
							<div>
								<p className="mb-1 text-xs font-semibold uppercase tracking-widest text-gray-400">
									{isKo ? "해설" : "Explanation"}
								</p>
								<p className="text-sm text-gray-700 leading-relaxed">
									<BilingualText field={q.explanation} variant="body" as="span" />
								</p>
							</div>
						</div>
					)}
				</div>
			</div>

			{/* 컨트롤 */}
			<div className="flex items-center justify-between gap-2">
				<button
					onClick={onPrev}
					disabled={index === 0}
					aria-label={isKo ? "이전 카드" : "Previous card"}
					className="min-w-[44px] min-h-[44px] rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
				>
					←
				</button>

				<button
					onClick={onFlip}
					aria-pressed={isFlipped}
					aria-label={isFlipped ? (isKo ? "카드 앞면 보기" : "Show question") : (isKo ? "정답 보기" : "Reveal answer")}
					className={`min-h-[44px] flex-1 rounded-lg px-5 py-2 text-sm font-medium text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800 ${accent}`}
				>
					{isFlipped ? (isKo ? "앞면" : "Question") : (isKo ? "정답 보기" : "Reveal Answer")}
				</button>

				<button
					onClick={onNext}
					disabled={index === total - 1}
					aria-label={isKo ? "다음 카드" : "Next card"}
					className="min-w-[44px] min-h-[44px] rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
				>
					→
				</button>
			</div>

			{/* 진행 상태 시각 표시 */}
			<div
				className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100"
				role="progressbar"
				aria-valuenow={index + 1}
				aria-valuemin={1}
				aria-valuemax={total}
				aria-label={isKo ? `플래시카드 진행률: ${index + 1}/${total}` : `Flashcard progress: ${index + 1} of ${total}`}
			>
				<div
					className={`h-full rounded-full transition-all ${accentColor === "violet" ? "bg-violet-500" : "bg-blue-500"}`}
					style={{ width: `${((index + 1) / total) * 100}%` }}
				/>
			</div>
		</article>
	);
}
