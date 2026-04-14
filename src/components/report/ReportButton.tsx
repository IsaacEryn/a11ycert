"use client";

import { useState } from "react";
import ReportModal from "./ReportModal";

interface ReportButtonProps {
	locale: string;
	targetType: "quiz" | "content" | "glossary";
	targetId?: string;
}

export default function ReportButton({ locale, targetType, targetId }: ReportButtonProps) {
	const [isOpen, setIsOpen] = useState(false);
	const isKo = locale === "ko";

	return (
		<>
			<button
				onClick={() => setIsOpen(true)}
				className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-gray-400 hover:text-orange-600 hover:bg-orange-50 transition-colors"
				aria-label={
					isKo ? "정보 수정 요청 또는 오류 제보" : "Report an issue or suggest a correction"
				}
			>
				<svg
					aria-hidden="true"
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
					<line x1="4" y1="22" x2="4" y2="15" />
				</svg>
				<span>{isKo ? "제보" : "Report"}</span>
			</button>

			{isOpen && (
				<ReportModal
					locale={locale}
					targetType={targetType}
					targetId={targetId}
					onClose={() => setIsOpen(false)}
				/>
			)}
		</>
	);
}
