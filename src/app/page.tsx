import { headers } from "next/headers";
import { redirect } from "next/navigation";

/**
 * 루트(/) 접근 시 Accept-Language 기반 서버 리다이렉트
 * (클라이언트 리다이렉트는 빈 화면 깜빡임 + 크롤러에 빈 페이지 노출)
 */
export default async function RootPage() {
	const headerList = await headers();
	const acceptLanguage = headerList.get("accept-language") ?? "";
	const locale = acceptLanguage.toLowerCase().startsWith("ko") ? "ko" : "en";
	redirect(`/${locale}`);
}
