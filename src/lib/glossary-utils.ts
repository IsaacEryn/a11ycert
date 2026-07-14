import type { GlossaryTerm } from "@/lib/content/glossary";

/** 용어집 정렬 모드 — ko: 가나다(초성 그룹), en: 알파벳 */
export type GlossarySortMode = "ko" | "en";

/** 초성 그룹 목록 (쌍자음은 기본 자음에 병합) + 라틴/숫자 시작 용어용 '#' */
export const KO_INDEX = ["ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ", "#"] as const;
export const EN_INDEX = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// U+AC00 기준 초성 19개 (쌍자음 포함)
const CHOSEONG = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
// 쌍자음 → 기본 자음 병합 (ㄲ→ㄱ 등)
const DOUBLE_TO_BASE: Record<string, string> = { "ㄲ": "ㄱ", "ㄸ": "ㄷ", "ㅃ": "ㅂ", "ㅆ": "ㅅ", "ㅉ": "ㅈ" };

/** 한글 음절의 초성 반환 (한글 아니면 null) */
export function getChoseong(char: string): string | null {
	const code = char.charCodeAt(0);
	if (code < 0xac00 || code > 0xd7a3) return null;
	const cho = CHOSEONG[Math.floor((code - 0xac00) / 588)];
	return DOUBLE_TO_BASE[cho] ?? cho;
}

/** 정렬 모드에 따른 그룹 키 (점프 인덱스·글자 헤더용) */
export function getGroupKey(term: GlossaryTerm, mode: GlossarySortMode): string {
	if (mode === "ko") {
		const cho = getChoseong(term.term.ko.trim().charAt(0));
		return cho ?? "#"; // 라틴/숫자로 시작하는 한글명(예: "ADA")은 '#' 버킷
	}
	const first = term.term.en.trim().charAt(0).toUpperCase();
	return /[A-Z]/.test(first) ? first : "#";
}

/** 그룹 키 정렬 순서 (인덱스 배열 기준, 없는 키는 뒤로) */
export function compareGroupKeys(a: string, b: string, mode: GlossarySortMode): number {
	const index: readonly string[] = mode === "ko" ? KO_INDEX : [...EN_INDEX, "#"];
	const ia = index.indexOf(a);
	const ib = index.indexOf(b);
	return (ia === -1 ? index.length : ia) - (ib === -1 ? index.length : ib);
}

/** 용어 정렬 (그룹 내부 포함 일관 정렬) */
export function sortTerms(terms: GlossaryTerm[], mode: GlossarySortMode): GlossaryTerm[] {
	return [...terms].sort((a, b) =>
		mode === "ko"
			? a.term.ko.localeCompare(b.term.ko, "ko")
			: a.term.en.localeCompare(b.term.en, "en")
	);
}

/** 정렬·그룹핑 결과: [그룹키, 용어들][] */
export function groupTerms(
	terms: GlossaryTerm[],
	mode: GlossarySortMode
): [string, GlossaryTerm[]][] {
	const sorted = sortTerms(terms, mode);
	const map = new Map<string, GlossaryTerm[]>();
	for (const term of sorted) {
		const key = getGroupKey(term, mode);
		if (!map.has(key)) map.set(key, []);
		map.get(key)!.push(term);
	}
	return Array.from(map.entries()).sort(([a], [b]) => compareGroupKeys(a, b, mode));
}
