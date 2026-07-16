import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * 쓰기 API 스팸 방지 — 최근 windowSeconds 동안 본인이 작성한 행 수로 판정.
 * 별도 인프라 없이 RLS 하에서 본인 행 count 조회만 사용한다.
 * (조회 실패 시에는 서비스 가용성을 우선해 허용)
 */
export async function checkWriteRateLimit(
	supabase: SupabaseClient,
	table: "board_posts" | "board_replies" | "comments" | "reports",
	userId: string,
	options?: { windowSeconds?: number; max?: number }
): Promise<{ allowed: boolean }> {
	const windowSeconds = options?.windowSeconds ?? 60;
	const max = options?.max ?? 5;
	const since = new Date(Date.now() - windowSeconds * 1000).toISOString();

	const { count, error } = await supabase
		.from(table)
		.select("*", { count: "exact", head: true })
		.eq("user_id", userId)
		.gte("created_at", since);

	if (error) {
		console.error(`[write-rate-limit] ${table} count failed:`, error.message);
		return { allowed: true };
	}
	return { allowed: (count ?? 0) < max };
}

/** 공통 429 응답 본문 */
export const RATE_LIMIT_MESSAGE = "잠시 후 다시 시도해주세요. 짧은 시간에 너무 많이 작성했습니다.";
