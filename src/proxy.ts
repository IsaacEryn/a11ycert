import createIntlMiddleware from "next-intl/middleware";
import { type NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { updateSession } from "./lib/supabase/middleware";

const intlMiddleware = createIntlMiddleware(routing);

export async function proxy(request: NextRequest) {
  // 1. Supabase 세션 갱신 (JWT 토큰 리프레시)
  const supabaseResponse = await updateSession(request);

  // 2. next-intl 로케일 라우팅 처리
  const intlResponse = intlMiddleware(request);

  // Supabase가 설정한 쿠키를 intl 응답에 병합
  supabaseResponse.cookies.getAll().forEach((cookie) => {
    intlResponse.cookies.set(cookie.name, cookie.value);
  });

  return intlResponse;
}

export const config = {
  matcher: [
    // 다음을 제외한 모든 경로에 미들웨어 적용
    // - _next (Next.js 내부), _vercel, 정적 파일 (확장자 포함)
    // - api 라우트는 미들웨어 적용해야 함 (Supabase 세션 필요)
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
};
