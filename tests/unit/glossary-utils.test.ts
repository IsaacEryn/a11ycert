import { describe, it, expect } from "vitest";
import { getChoseong, getGroupKey, sortTerms } from "@/lib/glossary-utils";
import type { GlossaryTerm } from "@/lib/content/glossary";

const term = (ko: string, en: string): GlossaryTerm => ({
	id: en.toLowerCase().replace(/\s+/g, "-"),
	term: { ko, en },
	definition: { ko: "d", en: "d" },
	certs: ["cpacc"],
});

describe("getChoseong", () => {
	it("한글 첫 글자의 초성을 반환한다", () => {
		expect(getChoseong("가나다")).toBe("ㄱ");
		expect(getChoseong("접근성")).toBe("ㅈ");
	});

	it("쌍자음은 기본 자음으로 병합한다", () => {
		expect(getChoseong("까치")).toBe("ㄱ");
		expect(getChoseong("따옴표")).toBe("ㄷ");
	});
});

describe("getGroupKey", () => {
	it("ko 모드: 초성, 라틴/숫자는 # 버킷", () => {
		expect(getGroupKey(term("마라케시", "Marrakesh"), "ko")).toBe("ㅁ");
		expect(getGroupKey(term("WCAG", "WCAG"), "ko")).toBe("#");
	});

	it("en 모드: 영문 대문자 첫 글자", () => {
		expect(getGroupKey(term("용어", "Braille"), "en")).toBe("B");
	});
});

describe("sortTerms", () => {
	it("로케일 기준으로 정렬한다", () => {
		const sorted = sortTerms([term("나비", "B"), term("가위", "A")], "ko");
		expect(sorted.map((t) => t.term.ko)).toEqual(["가위", "나비"]);
	});
});
