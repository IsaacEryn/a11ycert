import { describe, it, expect } from "vitest";
import {
	resolveLocalEntries,
	resolveDbEntries,
	buildDistractors,
	pickText,
	type DictEntryView,
} from "@/components/dictionary/dict-utils";
import type { GlossaryTerm } from "@/lib/content/glossary";

const terms: GlossaryTerm[] = [
	{ id: "t1", term: { ko: "용어1", en: "Term1" }, definition: { ko: "뜻1", en: "Def1" }, certs: ["cpacc"] },
	{ id: "t2", term: { ko: "용어2", en: "Term2" }, definition: { ko: "뜻2", en: "Def2" }, certs: ["was"] },
	{ id: "t3", term: { ko: "용어3", en: "Term3" }, definition: { ko: "뜻3", en: "Def3" }, certs: ["was"] },
	{ id: "t4", term: { ko: "용어4", en: "Term4" }, definition: { ko: "뜻4", en: "Def4" }, certs: ["was"] },
	{ id: "t5", term: { ko: "용어5", en: "Term5" }, definition: { ko: "뜻5", en: "Def5" }, certs: ["was"] },
];

describe("resolveLocalEntries", () => {
	it("용어집 저장 id를 terms에서 해석하고, 삭제된 id는 무시한다", () => {
		const entries = resolveLocalEntries(
			{ saved: ["t1", "삭제된-id"], custom: [], srs: { t1: { box: 3, due: "2026-01-01" } } },
			terms
		);
		expect(entries).toHaveLength(1);
		expect(entries[0]).toMatchObject({ id: "t1", source: "glossary", srs: { box: 3 } });
	});

	it("커스텀 단어가 용어집 항목보다 앞에 온다", () => {
		const entries = resolveLocalEntries(
			{
				saved: ["t1"],
				custom: [{ id: "custom-a", word: { ko: "가", en: "A" }, meaning: { ko: "", en: "" }, createdAt: "2026-01-01" }],
				srs: {},
			},
			terms
		);
		expect(entries.map((e) => e.source)).toEqual(["custom", "glossary"]);
	});
});

describe("resolveDbEntries", () => {
	it("DB 행의 box/due를 srs로 변환한다", () => {
		const entries = resolveDbEntries(
			[{ entry_id: "t2", source: "glossary", word_ko: null, word_en: null, meaning_ko: null, meaning_en: null, box: 4, due_at: "2026-02-02" }],
			terms
		);
		expect(entries[0].srs).toEqual({ box: 4, due: "2026-02-02" });
		expect(entries[0].word).toEqual(terms[1].term);
	});
});

describe("buildDistractors", () => {
	const entry = (id: string, meaningKo: string): DictEntryView => ({
		id, source: "custom", word: { ko: id, en: id }, meaning: { ko: meaningKo, en: "" },
	});

	it("저장 엔트리 뜻이 부족하면 용어집 정의로 보충해 count를 채운다", () => {
		const correct = entry("c", "정답뜻");
		const distractors = buildDistractors(correct, [correct], "ko", 3, terms);
		expect(distractors).toHaveLength(3);
		expect(distractors).not.toContain("정답뜻");
	});

	it("정답 텍스트와 동일한 보기는 제외한다", () => {
		const correct = entry("c", "뜻1"); // t1 정의와 동일
		const distractors = buildDistractors(correct, [correct], "ko", 4, terms);
		expect(distractors).not.toContain("뜻1");
	});
});

describe("pickText", () => {
	it("주 로케일이 비어 있으면 반대 언어로 대체한다", () => {
		expect(pickText({ ko: "", en: "fallback" }, "ko")).toBe("fallback");
		expect(pickText({ ko: "한글", en: "eng" }, "ko")).toBe("한글");
	});
});
