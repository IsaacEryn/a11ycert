"use client";

import { useLearningStore } from "@/lib/store/learningStore";

interface BilingualField {
	ko: string;
	en: string;
}

interface BilingualTextProps {
	field: BilingualField;
	variant?: "body" | "heading" | "option" | "label";
	className?: string;
	as?: keyof React.JSX.IntrinsicElements;
}

const secondaryClass: Record<NonNullable<BilingualTextProps["variant"]>, string> = {
	heading: "text-xs font-medium text-gray-500 mt-0.5",
	body:    "text-xs text-gray-500 mt-0.5 leading-normal",
	option:  "text-xs text-gray-500 mt-0.5",
	label:   "text-[11px] text-gray-500",
};

export default function BilingualText({
	field,
	variant = "body",
	className,
	as: Tag = "span",
}: BilingualTextProps) {
	const { languageMode } = useLearningStore();

	if (languageMode === "en-only") {
		return (
			<Tag lang="en" className={className}>
				{field.en}
			</Tag>
		);
	}

	if (languageMode === "parallel") {
		return (
			<Tag className={`flex flex-col${className ? ` ${className}` : ""}`}>
				<span lang="ko">{field.ko}</span>
				<span lang="en" aria-hidden="true" className={secondaryClass[variant]}>
					{field.en}
				</span>
			</Tag>
		);
	}

	// ko-only (default)
	return (
		<Tag lang="ko" className={className}>
			{field.ko}
		</Tag>
	);
}
