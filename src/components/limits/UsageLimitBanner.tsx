"use client";

import { LIMITS_CONFIG } from "@/lib/limits/config";
import { useTranslations } from "next-intl";

interface UsageLimitBannerProps {
	type: "quiz" | "page";
	remaining: number;
	limit: number;
}

/**
 * 제한에 도달했을 때 표시하는 배너
 * LIMITS_CONFIG.enabled가 false이면 렌더링하지 않음
 */
export default function UsageLimitBanner({
	type,
	remaining,
	limit,
	}: UsageLimitBannerProps) {
	const t = useTranslations("limits");
	if (!LIMITS_CONFIG.enabled) return null;
	if (remaining > 0) return null;

	const typeLabel =
		type === "quiz" ? (t("quizAttempts")) : t("studyPages");

	return (
		<div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm" role="alert">
			<p className="font-medium text-amber-800">
				{t("limitReached", { typeLabel, limit })}
			</p>
			<p className="mt-1 text-amber-700">
				{t("upgradeToPremiumFor")}
			</p>
		</div>
	);
}
