import { glossaryTerms } from "@/lib/content/glossary";
import type { DictionaryData } from "@/lib/store/learningStore";
import type { SrsCardState } from "@/lib/srs/leitner";

/** 목록·플래시카드·객관식이 공용으로 쓰는 사전 엔트리 뷰 */
export interface DictEntryView {
	id: string;
	source: "glossary" | "custom";
	word: { ko: string; en: string };
	meaning: { ko: string; en: string };
	srs?: SrsCardState;
	createdAt?: string;
}

const termById = new Map(glossaryTerms.map((t) => [t.id, t]));

/** 로컬 스토어 dictionary → 엔트리 뷰 목록 (용어집 id는 콘텐츠에서 해석) */
export function resolveLocalEntries(dict: DictionaryData): DictEntryView[] {
	const glossaryEntries = dict.saved.flatMap<DictEntryView>((termId) => {
		const term = termById.get(termId);
		if (!term) return []; // 삭제된 용어 id는 조용히 무시
		return [{ id: termId, source: "glossary", word: term.term, meaning: term.definition, srs: dict.srs[termId] }];
	});
	const customEntries = dict.custom.map<DictEntryView>((c) => ({
		id: c.id,
		source: "custom",
		word: c.word,
		meaning: c.meaning,
		srs: dict.srs[c.id],
		createdAt: c.createdAt,
	}));
	return [...customEntries, ...glossaryEntries];
}

/** DB rows → 엔트리 뷰 목록 */
export function resolveDbEntries(
	rows: {
		entry_id: string;
		source: "glossary" | "custom";
		word_ko: string | null;
		word_en: string | null;
		meaning_ko: string | null;
		meaning_en: string | null;
		box: number;
		due_at: string;
		created_at?: string;
	}[]
): DictEntryView[] {
	return rows.flatMap<DictEntryView>((r) => {
		const srs: SrsCardState = { box: r.box, due: r.due_at };
		if (r.source === "glossary") {
			const term = termById.get(r.entry_id);
			if (!term) return [];
			return [{ id: r.entry_id, source: "glossary", word: term.term, meaning: term.definition, srs, createdAt: r.created_at }];
		}
		return [{
			id: r.entry_id,
			source: "custom",
			word: { ko: r.word_ko ?? "", en: r.word_en ?? "" },
			meaning: { ko: r.meaning_ko ?? "", en: r.meaning_en ?? "" },
			srs,
			createdAt: r.created_at,
		}];
	});
}

/** 로케일 기준 표시 문자열 — 해당 언어가 비어 있으면 반대 언어로 대체 */
export function pickText(field: { ko: string; en: string }, locale: string): string {
	const primary = locale === "ko" ? field.ko : field.en;
	const fallback = locale === "ko" ? field.en : field.ko;
	return primary.trim() || fallback.trim();
}

export function shuffled<T>(arr: T[]): T[] {
	const out = [...arr];
	for (let i = out.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[out[i], out[j]] = [out[j], out[i]];
	}
	return out;
}

/** 객관식 오답 보기 풀 — 다른 저장 엔트리의 뜻, 부족하면 용어집 전체 정의로 보충 */
export function buildDistractors(
	correct: DictEntryView,
	entries: DictEntryView[],
	locale: string,
	count: number
): string[] {
	const correctText = pickText(correct.meaning, locale);
	const pool = new Set<string>();
	for (const e of shuffled(entries)) {
		if (e.id === correct.id) continue;
		const text = pickText(e.meaning, locale);
		if (text && text !== correctText) pool.add(text);
		if (pool.size >= count) break;
	}
	if (pool.size < count) {
		for (const term of shuffled(glossaryTerms)) {
			if (term.id === correct.id) continue;
			const text = pickText(term.definition, locale);
			if (text && text !== correctText && !pool.has(text)) pool.add(text);
			if (pool.size >= count) break;
		}
	}
	return [...pool].slice(0, count);
}
