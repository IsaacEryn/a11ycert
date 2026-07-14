import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

/**
 * Supabase 무료 티어 일시정지(7일 미사용) 방지용 keep-alive.
 * Vercel Cron(1일 1회) + GitHub Actions(백업)가 호출.
 * 실제 DB read가 도달해야 활동으로 집계되므로 가벼운 SELECT 1건 수행.
 */
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");

  if (!secret || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = await createClient();
  const { error } = await supabase.from("quiz_questions").select("id").limit(1);

  if (error) {
    console.error("[GET /api/cron/keep-alive]", error.message);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, ts: new Date().toISOString() });
}
