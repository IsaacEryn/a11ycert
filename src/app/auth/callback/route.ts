import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * OAuth 콜백 처리 (canonical — AuthProvider가 이 경로로 리다이렉트)
 *
 * OAuth Provider → Supabase → /auth/callback?code=xxx&next=/...
 * code를 세션으로 교환하고 `next` 파라미터로 리다이렉트합니다.
 * 세션 쿠키는 리다이렉트 응답에 직접 기록합니다.
 */
export async function GET(request: NextRequest) {
	const { searchParams, origin } = request.nextUrl;

	const code = searchParams.get("code");
	const nextRaw = searchParams.get("next") ?? "/";

	// 오픈 리다이렉트 방지: 반드시 내부 경로(/)로만 허용
	const next = nextRaw.startsWith("/") && !nextRaw.startsWith("//") ? nextRaw : "/";

	if (!code) {
		return NextResponse.redirect(`${origin}/?auth_error=true`);
	}

	const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
	if (!url || !key) {
		console.error("[Auth Callback] Supabase 환경 변수 미설정");
		return NextResponse.redirect(`${origin}/?auth_error=true`);
	}

	const response = NextResponse.redirect(`${origin}${next}`);

	const supabase = createServerClient(url, key, {
		cookies: {
			getAll() {
				return request.cookies.getAll();
			},
			setAll(cookies) {
				cookies.forEach(({ name, value, options }) => {
					response.cookies.set(name, value, options);
				});
			},
		},
	});

	const { error } = await supabase.auth.exchangeCodeForSession(code);

	if (error) {
		console.error("[Auth Callback] exchangeCodeForSession error:", error.message);
		return NextResponse.redirect(`${origin}/?auth_error=true`);
	}

	return response;
}
