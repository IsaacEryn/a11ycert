export interface NavItem {
	href: string;
	/** common.nav 네임스페이스의 메시지 키 — 소비처에서 t(labelKey)로 번역 */
	labelKey: string;
}

/** CPACC/WAS 공통 하위 메뉴 — Header 드롭다운·모바일 시트·Footer에서 공유 */
export function certNavItems(locale: string, cert: "cpacc" | "was"): NavItem[] {
	return [
		{ href: `/${locale}/${cert}`, labelKey: "overview" },
		{ href: `/${locale}/${cert}/study`, labelKey: "study" },
		{ href: `/${locale}/${cert}/quiz`, labelKey: "quiz" },
		{ href: `/${locale}/${cert}/mock-exam`, labelKey: "mockExam" },
		{ href: `/${locale}/${cert}/flashcards`, labelKey: "flashcards" },
	];
}

/** 사이트 공통 메뉴 */
export function siteNavItems(locale: string, { includePrivacy = true } = {}): NavItem[] {
	const items = [
		{ href: `/${locale}/glossary`, labelKey: "glossary" },
		{ href: `/${locale}/about`, labelKey: "about" },
	];
	if (includePrivacy) {
		items.push({ href: `/${locale}/privacy`, labelKey: "privacy" });
	}
	return items;
}
