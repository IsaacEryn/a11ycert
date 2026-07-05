import type { Metadata } from "next";

export const SITE_URL = "https://a11ycert.com";

/**
 * ko/en hreflang + canonical 생성 헬퍼
 * @param locale 현재 페이지 로케일
 * @param path 로케일 뒤의 경로 (예: "/cpacc/study/cpacc-1-1", 홈은 "")
 */
export function localeAlternates(locale: string, path: string): Metadata["alternates"] {
	return {
		canonical: `/${locale}${path}`,
		languages: {
			ko: `/ko${path}`,
			en: `/en${path}`,
			"x-default": `/ko${path}`,
		},
	};
}
