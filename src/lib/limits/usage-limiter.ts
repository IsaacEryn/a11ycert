import { createClient } from "@/lib/supabase/client";
import { LIMITS_CONFIG } from "./config";

interface LimitCheckResult {
  allowed: boolean;
  remaining: number;
  limit: number;
}

/**
 * 하루 퀴즈 풀이 수 확인
 * LIMITS_CONFIG.enabled가 false이면 항상 허용
 */
export async function checkQuizLimit(userId: string): Promise<LimitCheckResult> {
  if (!LIMITS_CONFIG.enabled) {
    return { allowed: true, remaining: Infinity, limit: Infinity };
  }

  const supabase = createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("tier, daily_quiz_count, daily_quiz_reset_at")
    .eq("id", userId)
    .single();

  if (!profile) {
    return { allowed: true, remaining: Infinity, limit: Infinity };
  }

  const limit =
    profile.tier === "premium"
      ? LIMITS_CONFIG.premium.dailyQuizLimit
      : LIMITS_CONFIG.free.dailyQuizLimit;

  // 자정 리셋 확인
  const now = new Date();
  const resetAt = profile.daily_quiz_reset_at
    ? new Date(profile.daily_quiz_reset_at)
    : null;
  const needsReset = !resetAt || resetAt.toDateString() !== now.toDateString();

  const currentCount = needsReset ? 0 : profile.daily_quiz_count;
  const remaining = Math.max(0, limit - currentCount);

  return {
    allowed: currentCount < limit,
    remaining,
    limit,
  };
}

/**
 * 하루 학습 페이지 접근 수 확인
 */
export async function checkPageLimit(userId: string): Promise<LimitCheckResult> {
  if (!LIMITS_CONFIG.enabled) {
    return { allowed: true, remaining: Infinity, limit: Infinity };
  }

  const supabase = createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("tier, daily_page_count, daily_page_reset_at")
    .eq("id", userId)
    .single();

  if (!profile) {
    return { allowed: true, remaining: Infinity, limit: Infinity };
  }

  const limit =
    profile.tier === "premium"
      ? LIMITS_CONFIG.premium.dailyPageLimit
      : LIMITS_CONFIG.free.dailyPageLimit;

  const now = new Date();
  const resetAt = profile.daily_page_reset_at
    ? new Date(profile.daily_page_reset_at)
    : null;
  const needsReset = !resetAt || resetAt.toDateString() !== now.toDateString();

  const currentCount = needsReset ? 0 : profile.daily_page_count;
  const remaining = Math.max(0, limit - currentCount);

  return {
    allowed: currentCount < limit,
    remaining,
    limit,
  };
}

/** 퀴즈 카운트 증가 */
export async function incrementQuizCount(userId: string): Promise<void> {
  if (!LIMITS_CONFIG.enabled) return;

  const supabase = createClient();
  const now = new Date();
  const { data: profile } = await supabase
    .from("profiles")
    .select("daily_quiz_count, daily_quiz_reset_at")
    .eq("id", userId)
    .single();

  const resetAt = profile?.daily_quiz_reset_at
    ? new Date(profile.daily_quiz_reset_at)
    : null;
  const needsReset = !resetAt || resetAt.toDateString() !== now.toDateString();

  await supabase
    .from("profiles")
    .update({
      daily_quiz_count: needsReset ? 1 : (profile?.daily_quiz_count || 0) + 1,
      daily_quiz_reset_at: now.toISOString(),
    })
    .eq("id", userId);
}

/** 페이지 카운트 증가 */
export async function incrementPageCount(userId: string): Promise<void> {
  if (!LIMITS_CONFIG.enabled) return;

  const supabase = createClient();
  const now = new Date();
  const { data: profile } = await supabase
    .from("profiles")
    .select("daily_page_count, daily_page_reset_at")
    .eq("id", userId)
    .single();

  const resetAt = profile?.daily_page_reset_at
    ? new Date(profile.daily_page_reset_at)
    : null;
  const needsReset = !resetAt || resetAt.toDateString() !== now.toDateString();

  await supabase
    .from("profiles")
    .update({
      daily_page_count: needsReset ? 1 : (profile?.daily_page_count || 0) + 1,
      daily_page_reset_at: now.toISOString(),
    })
    .eq("id", userId);
}
