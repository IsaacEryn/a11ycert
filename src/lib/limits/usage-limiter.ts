import { createClient } from "@/lib/supabase/client";
import { LIMITS_CONFIG } from "./config";

export interface LimitCheckResult {
	allowed: boolean;
	remaining: number;
	limit: number;
}

const UNLIMITED: LimitCheckResult = { allowed: true, remaining: Infinity, limit: Infinity };

async function getTierLimit(
	userId: string,
	kind: "dailyQuizLimit" | "dailyPageLimit"
): Promise<number> {
	const supabase = createClient();
	const { data: profile } = await supabase
		.from("profiles")
		.select("tier")
		.eq("id", userId)
		.single();

	return profile?.tier === "premium"
		? LIMITS_CONFIG.premium[kind]
		: LIMITS_CONFIG.free[kind];
}

/**
 * 퀴즈 세션 1회 사용 — consume_daily_quiz RPC로 한도 검사 + 카운트 증가를
 * 원자적으로 처리 (읽기-수정-쓰기 레이스 없음).
 * LIMITS_CONFIG.enabled가 false이면 항상 허용.
 */
export async function consumeQuizUsage(userId: string): Promise<LimitCheckResult> {
	if (!LIMITS_CONFIG.enabled) return UNLIMITED;

	const limit = await getTierLimit(userId, "dailyQuizLimit");
	if (!Number.isFinite(limit)) return UNLIMITED;

	const supabase = createClient();
	const { data: allowed, error } = await supabase.rpc("consume_daily_quiz", {
		p_user_id: userId,
		p_limit: limit,
	});

	if (error) {
		// RPC 실패 시 사용자를 막지 않음 (fail-open)
		console.error("[consumeQuizUsage]", error.message);
		return { allowed: true, remaining: 0, limit };
	}

	const { data: profile } = await supabase
		.from("profiles")
		.select("daily_quiz_count")
		.eq("id", userId)
		.single();
	const count = profile?.daily_quiz_count ?? 0;

	return { allowed: allowed === true, remaining: Math.max(0, limit - count), limit };
}

/**
 * 하루 학습 페이지 접근 수 확인 (읽기 전용 — 표시용)
 */
export async function checkPageLimit(userId: string): Promise<LimitCheckResult> {
	if (!LIMITS_CONFIG.enabled) return UNLIMITED;

	const supabase = createClient();
	const { data: profile } = await supabase
		.from("profiles")
		.select("tier, daily_page_count, daily_page_reset_at")
		.eq("id", userId)
		.single();

	if (!profile) return UNLIMITED;

	const limit =
		profile.tier === "premium"
			? LIMITS_CONFIG.premium.dailyPageLimit
			: LIMITS_CONFIG.free.dailyPageLimit;

	const now = new Date();
	const resetAt = profile.daily_page_reset_at ? new Date(profile.daily_page_reset_at) : null;
	const needsReset = !resetAt || resetAt.toDateString() !== now.toDateString();

	const currentCount = needsReset ? 0 : profile.daily_page_count;
	const remaining = Math.max(0, limit - currentCount);

	return { allowed: currentCount < limit, remaining, limit };
}
