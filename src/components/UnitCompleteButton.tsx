"use client";

import Link from "next/link";
import { useLearningStore } from "@/lib/store/learningStore";

interface Props {
	unitId: string;
	locale: string;
	backHref: string;
}

export default function UnitCompleteButton({ unitId, locale, backHref }: Props) {
	const { markUnitComplete, isCompleted } = useLearningStore();
	const isKo = locale === "ko";
	const done = isCompleted(unitId);

	return (
		<div className="flex flex-wrap items-center gap-3">
			{!done ? (
				<button
					onClick={() => markUnitComplete(unitId)}
					className="rounded-lg bg-green-600 px-5 py-2 text-sm font-medium text-white hover:bg-green-700"
				>
					{isKo ? "학습 완료 표시" : "Mark as Complete"}
				</button>
			) : (
				<span className="inline-flex items-center gap-1.5 rounded-lg bg-green-50 border border-green-200 px-4 py-2 text-sm font-medium text-green-700">
					<span aria-hidden="true">✓</span>
					{isKo ? "학습 완료" : "Completed"}
				</span>
			)}
			<Link href={backHref} className="text-sm text-gray-500 no-underline hover:text-gray-700">
				← {isKo ? "로드맵으로" : "Back to roadmap"}
			</Link>
		</div>
	);
}
