import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * OAuth 콜백 Route Handler
 *
 * OAuth Provider → Supabase → /auth/callback?code=xxx&next=/...
 * 여기서 code를 세션으로 교환하고 `next` 파라미터로 리다이렉트합니다.
 */
export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ locale: string }> }
) {
	const { locale } = await params;
	const { searchParams, origin } = request.nextUrl;

	const code = searchParams.get("code");
	const next = searchParams.get("next") ?? `/${locale}`;

	if (!code) {
		// code 없으면 홈으로 리다이렉트
		return NextResponse.redirect(`${origin}/${locale}`);
	}

	const response = NextResponse.redirect(`${origin}${next}`);

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
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
		}
	);

	const { error } = await supabase.auth.exchangeCodeForSession(code);

	if (error) {
		console.error("[Auth Callback] exchangeCodeForSession error:", error.message);
		return NextResponse.redirect(`${origin}/${locale}?error=auth`);
	}

	return response;
}
