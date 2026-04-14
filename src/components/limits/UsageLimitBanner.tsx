"use client";

import { LIMITS_CONFIG } from "@/lib/limits/config";

interface UsageLimitBannerProps {
	type: "quiz" | "page";
	remaining: number;
	limit: number;
	locale: string;
}

/**
 * 제한에 도달했을 때 표시하는 배너
 * LIMITS_CONFIG.enabled가 false이면 렌더링하지 않음
 */
export default function UsageLimitBanner({
	type,
	remaining,
	limit,
	locale,
}: UsageLimitBannerProps) {
	if (!LIMITS_CONFIG.enabled) return null;
	if (remaining > 0) return null;

	const isKo = locale === "ko";
	const typeLabel =
		type === "quiz" ? (isKo ? "문제 풀이" : "quiz attempts") : isKo ? "학습 페이지" : "study pages";

	return (
		<div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm" role="alert">
			<p className="font-medium text-amber-800">
				{isKo
					? `오늘의 무료 ${typeLabel} 한도(${limit}회)에 도달했습니다.`
					: `You've reached today's free ${typeLabel} limit (${limit}).`}
			</p>
			<p className="mt-1 text-amber-700">
				{isKo
					? "프리미엄으로 업그레이드하면 무제한으로 이용할 수 있습니다."
					: "Upgrade to Premium for unlimited access."}
			</p>
		</div>
	);
}
