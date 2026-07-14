export interface NavItem {
	href: string;
	label: string;
}

/** CPACC/WAS 공통 하위 메뉴 — Header 드롭다운·모바일 시트·Footer에서 공유 */
export function certNavItems(locale: string, cert: "cpacc" | "was"): NavItem[] {
	const isKo = locale === "ko";
	return [
		{ href: `/${locale}/${cert}`, label: isKo ? "개요" : "Overview" },
		{ href: `/${locale}/${cert}/study`, label: isKo ? "학습" : "Study" },
		{ href: `/${locale}/${cert}/quiz`, label: isKo ? "모의퀴즈" : "Quiz" },
		{ href: `/${locale}/${cert}/mock-exam`, label: isKo ? "모의시험" : "Mock Exam" },
		{ href: `/${locale}/${cert}/flashcards`, label: isKo ? "플래시카드" : "Flashcards" },
	];
}

/** 사이트 공통 메뉴 */
export function siteNavItems(locale: string, { includePrivacy = true } = {}): NavItem[] {
	const isKo = locale === "ko";
	const items = [
		{ href: `/${locale}/glossary`, label: isKo ? "용어집" : "Glossary" },
		{ href: `/${locale}/about`, label: isKo ? "소개" : "About" },
	];
	if (includePrivacy) {
		items.push({ href: `/${locale}/privacy`, label: isKo ? "개인정보처리방침" : "Privacy" });
	}
	return items;
}
