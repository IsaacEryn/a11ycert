import { describe, it, expect } from "vitest";
import { buildMockExam, computeDomainStats, MOCK_EXAM_PRESETS } from "@/lib/quiz/mock-exam";
import type { QuizQuestion } from "@/lib/content/types";

function makePool(counts: Record<1 | 2 | 3, number>): QuizQuestion[] {
	const pool: QuizQuestion[] = [];
	for (const d of [1, 2, 3] as const) {
		for (let i = 0; i < counts[d]; i++) {
			pool.push({
				id: `q-${d}-${i}`,
				question: { ko: "q", en: "q" },
				options: {
					a: { ko: "a", en: "a" },
					b: { ko: "b", en: "b" },
					c: { ko: "c", en: "c" },
					d: { ko: "d", en: "d" },
				},
				answer: "a",
				explanation: { ko: "e", en: "e" },
				domain: d,
			});
		}
	}
	return pool;
}

describe("buildMockExam", () => {
	it("풀이 충분하면 프리셋 문항 수를 정확히 뽑는다 (cpacc full=100)", () => {
		const pool = makePool({ 1: 60, 2: 60, 3: 60 });
		const exam = buildMockExam("cpacc", pool, "full");
		expect(exam).toHaveLength(MOCK_EXAM_PRESETS.cpacc.full.totalQuestions);
	});

	it("도메인 배분이 프리셋 비율에 근사한다 (±1, 반올림 허용)", () => {
		const pool = makePool({ 1: 100, 2: 100, 3: 100 });
		const exam = buildMockExam("was", pool, "full"); // 75문항, 40/30/30
		const byDomain = { 1: 0, 2: 0, 3: 0 } as Record<number, number>;
		exam.forEach((q) => { byDomain[q.domain ?? 1] += 1; });
		expect(byDomain[1]).toBeGreaterThanOrEqual(29);
		expect(byDomain[1]).toBeLessThanOrEqual(31);
		expect(exam).toHaveLength(75);
	});

	it("특정 도메인 풀 부족 시 다른 도메인에서 보충해 총량 유지", () => {
		const pool = makePool({ 1: 5, 2: 40, 3: 40 });
		const exam = buildMockExam("cpacc", pool, "mini"); // 30문항 요구
		expect(exam).toHaveLength(30);
	});

	it("전체 풀이 부족하면 가용 전체를 반환하고 중복이 없다", () => {
		const pool = makePool({ 1: 4, 2: 3, 3: 2 });
		const exam = buildMockExam("cpacc", pool, "full");
		expect(exam).toHaveLength(9);
		expect(new Set(exam.map((q) => q.id)).size).toBe(9);
	});
});

describe("computeDomainStats", () => {
	it("도메인별 정답 수를 집계한다", () => {
		const pool = makePool({ 1: 2, 2: 1, 3: 0 });
		const stats = computeDomainStats(pool, { 0: "a", 1: "b", 2: "a" });
		expect(stats["1"]).toEqual({ total: 2, correct: 1 });
		expect(stats["2"]).toEqual({ total: 1, correct: 1 });
	});
});
