"use client";

import type { StudyUnit } from "@/lib/content/types";
import BilingualText from "@/components/BilingualText";
import LanguageModeToggle from "@/components/LanguageModeToggle";

interface StudyUnitContentProps {
	unit: StudyUnit;
	locale: string;
	accentColor: "blue" | "violet";
}

export default function StudyUnitContent({ unit, locale, accentColor }: StudyUnitContentProps) {
	const isKo = locale === "ko";
	const bulletColor = accentColor === "violet" ? "text-violet-500" : "text-blue-500";
	const bannerClass =
		accentColor === "violet"
			? "border-violet-200 bg-violet-50 text-violet-800"
			: "border-blue-200 bg-blue-50 text-blue-800";

	return (
		<>
			{/* 언어 표시 모드 토글 */}
			<div className="mt-4 flex justify-end">
				<LanguageModeToggle />
			</div>

			{/* Summary banner */}
			<div className={`mt-3 rounded-lg border px-4 py-3 text-sm leading-relaxed ${bannerClass}`}>
				<BilingualText field={unit.summary} variant="body" as="span" />
			</div>

			{/* Objectives */}
			<section aria-labelledby="objectives" className="mt-8">
				<h2 id="objectives" className="text-base font-semibold text-gray-900">
					{isKo ? "학습 목표" : "Learning Objectives"}
				</h2>
				<ul className="mt-3 space-y-1.5 text-sm text-gray-700" role="list">
					{unit.objectives.ko.map((_, i) => (
						<li key={i} className="flex items-start gap-2">
							<span className={`mt-0.5 ${bulletColor}`} aria-hidden="true">
								•
							</span>
							<BilingualText
								field={{ ko: unit.objectives.ko[i], en: unit.objectives.en[i] }}
								variant="body"
								as="span"
							/>
						</li>
					))}
				</ul>
			</section>

			{/* Content */}
			<section aria-labelledby="content" className="mt-8">
				<h2 id="content" className="text-base font-semibold text-gray-900">
					{isKo ? "학습 내용" : "Study Content"}
				</h2>
				<div className="mt-3 space-y-4 text-sm text-gray-700 leading-relaxed">
					{unit.content.ko.map((_, i) => (
						<BilingualText
							key={i}
							field={{ ko: unit.content.ko[i], en: unit.content.en[i] }}
							variant="body"
							as="p"
						/>
					))}
				</div>
			</section>
		</>
	);
}
