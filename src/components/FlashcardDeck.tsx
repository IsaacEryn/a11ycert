"use client";

import { useState, useCallback } from "react";
import type { StudyUnit } from "@/lib/content/types";
import FlashcardCard from "@/components/FlashcardCard";
import LanguageModeToggle from "@/components/LanguageModeToggle";

interface FlashcardDeckProps {
	units: StudyUnit[];
	locale: string;
	exam: "cpacc" | "was";
}

type DomainFilter = "all" | 1 | 2 | 3;

export default function FlashcardDeck({ units, locale, exam }: FlashcardDeckProps) {
	const [domainFilter, setDomainFilter] = useState<DomainFilter>("all");
	const [index, setIndex] = useState(0);
	const [isFlipped, setIsFlipped] = useState(false);
	const isKo = locale === "ko";
	const accentColor = exam === "was" ? "violet" : "blue";

	const filteredUnits = domainFilter === "all" ? units : units.filter((u) => u.domain === domainFilter);
	const questions = filteredUnits.flatMap((u) => u.questions);
	const safeIndex = Math.min(index, Math.max(0, questions.length - 1));
	const q = questions[safeIndex];

	const goTo = useCallback(
		(i: number) => {
			setIndex(i);
			setIsFlipped(false);
		},
		[]
	);

	const handleFilterChange = (f: DomainFilter) => {
		setDomainFilter(f);
		setIndex(0);
		setIsFlipped(false);
	};

	const filterOptions: { value: DomainFilter; label: string }[] = [
		{ value: "all", label: isKo ? "전체" : "All" },
		{ value: 1, label: isKo ? "도메인 1" : "Domain 1" },
		{ value: 2, label: isKo ? "도메인 2" : "Domain 2" },
		{ value: 3, label: isKo ? "도메인 3" : "Domain 3" },
	];

	const accentActiveClass =
		accentColor === "violet"
			? "bg-violet-600 text-white"
			: "bg-blue-600 text-white";

	return (
		<div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
			{/* 헤더 */}
			<div className="mb-6 flex flex-wrap items-center justify-between gap-3">
				<div>
					<p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
						{exam.toUpperCase()}
					</p>
					<h1 className="mt-1 text-2xl font-bold text-gray-900">
						{isKo ? "플래시카드" : "Flashcards"}
					</h1>
				</div>
				<LanguageModeToggle />
			</div>

			{/* 도메인 필터 */}
			<fieldset className="mb-6">
				<legend className="sr-only">{isKo ? "도메인 필터" : "Domain filter"}</legend>
				<div className="flex flex-wrap gap-2">
					{filterOptions.map((opt) => (
						<label key={String(opt.value)} className="cursor-pointer">
							<input
								type="radio"
								name="domain-filter"
								value={String(opt.value)}
								checked={domainFilter === opt.value}
								onChange={() => handleFilterChange(opt.value)}
								className="sr-only"
							/>
							<span
								className={`inline-block rounded-lg border px-3 py-1 text-xs font-medium transition-colors ${
									domainFilter === opt.value
										? `${accentActiveClass} border-transparent`
										: "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
								}`}
							>
								{opt.label}
							</span>
						</label>
					))}
				</div>
			</fieldset>

			{questions.length === 0 ? (
				<div className="rounded-xl border border-dashed border-gray-200 px-6 py-12 text-center text-sm text-gray-400">
					{isKo ? "이 도메인에 문제가 없습니다." : "No questions in this domain."}
				</div>
			) : (
				<>
					{/* 카드 위치 표시 */}
					<p className="mb-3 text-xs text-gray-500 text-center">
						{safeIndex + 1} / {questions.length}
					</p>

					<FlashcardCard
						question={q}
						index={safeIndex}
						total={questions.length}
						isFlipped={isFlipped}
						onFlip={() => setIsFlipped((f) => !f)}
						onPrev={() => goTo(safeIndex - 1)}
						onNext={() => goTo(safeIndex + 1)}
						locale={locale}
						accentColor={accentColor}
					/>

					{/* 키보드 안내 */}
					<p className="mt-4 text-center text-xs text-gray-500" aria-hidden="true">
						{isKo
							? "Space / Enter: 뒤집기 · ← →: 카드 이동"
							: "Space / Enter: flip · ← →: navigate"}
					</p>
				</>
			)}
		</div>
	);
}
