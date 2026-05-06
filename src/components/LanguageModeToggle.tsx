"use client";

import { useLearningStore, type LanguageMode } from "@/lib/store/learningStore";

const MODES: { value: LanguageMode; label: string; ariaLabel: string }[] = [
	{ value: "ko-only", label: "한국어", ariaLabel: "한국어만 표시" },
	{ value: "parallel", label: "병렬",   ariaLabel: "한국어·영어 병렬 표시" },
	{ value: "en-only",  label: "EN",     ariaLabel: "영어만 표시" },
];

export default function LanguageModeToggle() {
	const { languageMode, setLanguageMode } = useLearningStore();

	return (
		<div
			role="group"
			aria-label="언어 표시 모드"
			className="inline-flex overflow-hidden rounded-lg border border-gray-200 text-xs"
		>
			{MODES.map((mode, i) => {
				const isActive = languageMode === mode.value;
				return (
					<button
						key={mode.value}
						onClick={() => setLanguageMode(mode.value)}
						aria-pressed={isActive}
						aria-label={mode.ariaLabel}
						className={[
							"px-2.5 py-1 font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
							i > 0 ? "border-l border-gray-200" : "",
							isActive
								? "bg-blue-600 text-white focus-visible:outline-white"
								: "bg-white text-gray-600 hover:bg-gray-50 focus-visible:outline-blue-600",
						].join(" ")}
					>
						{mode.label}
					</button>
				);
			})}
		</div>
	);
}
