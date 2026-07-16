"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useLearningStore } from "@/lib/store/learningStore";
import { useOptionalAuth } from "@/lib/auth/AuthProvider";
import { syncCompletedUnitToDB } from "@/lib/store/learning-sync";

interface Props {
	unitId: string;
	exam: "cpacc" | "was";
	backHref: string;
}

export default function UnitCompleteButton({ unitId, exam, backHref }: Props) {
	const { markUnitComplete, isCompleted } = useLearningStore();
	const auth = useOptionalAuth();
	const userId = auth?.user?.id ?? null;
	const t = useTranslations("study");
	const done = isCompleted(exam, unitId);

	const handleComplete = () => {
		markUnitComplete(exam, unitId);
		if (userId) syncCompletedUnitToDB(userId, unitId);
	};

	return (
		<div className="flex flex-wrap items-center gap-3">
			{!done ? (
				<button
					onClick={handleComplete}
					className="rounded-lg bg-green-600 px-5 py-2 text-sm font-medium text-white hover:bg-green-700"
				>
					{t("markAsComplete")}
				</button>
			) : (
				<span className="inline-flex items-center gap-1.5 rounded-lg bg-green-50 border border-green-200 px-4 py-2 text-sm font-medium text-green-700">
					<span aria-hidden="true">✓</span>
					{t("completed")}
				</span>
			)}
			<Link href={backHref} className="text-sm text-gray-500 no-underline hover:text-gray-700">
				← {t("backToRoadmap")}
			</Link>
		</div>
	);
}
