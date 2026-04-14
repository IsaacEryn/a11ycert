import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * OAuth 콜백 처리
 * Supabase Auth가 OAuth 프로바이더 인증 완료 후 이 경로로 리다이렉트합니다.
 * URL에 포함된 auth code를 세션으로 교환하고, 지정된 페이지로 리다이렉트합니다.
 */
export async function GET(request: Request) {
	const { searchParams, origin } = new URL(request.url);
	const code = searchParams.get("code");
	const next = searchParams.get("next") ?? "/";

	if (code) {
		const supabase = await createClient();
		const { error } = await supabase.auth.exchangeCodeForSession(code);

		if (!error) {
			// 인증 성공 → 지정된 경로로 리다이렉트
			return NextResponse.redirect(`${origin}${next}`);
		}
	}

	// 인증 실패 → 에러 페이지 또는 홈으로 리다이렉트
	return NextResponse.redirect(`${origin}/?auth_error=true`);
}
