import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // 다음을 제외한 모든 경로에 미들웨어 적용
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
};
