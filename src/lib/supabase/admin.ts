import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * service role 클라이언트 — 서버 전용 (RLS 우회).
 * 회원 탈퇴(auth.admin.deleteUser) 등 관리 작업에만 사용.
 * SUPABASE_SERVICE_ROLE_KEY는 절대 클라이언트로 노출 금지.
 */
export function createAdminClient() {
	const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

	if (!url || !key) {
		throw new Error("SUPABASE_SERVICE_ROLE_KEY 또는 NEXT_PUBLIC_SUPABASE_URL 미설정");
	}

	return createClient(url, key, {
		auth: { autoRefreshToken: false, persistSession: false },
	});
}
