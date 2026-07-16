import { describe, it, expect } from "vitest";
import { computeReadiness, accuracyTrend, MIN_ATTEMPTS_FOR_SCORE, type AttemptLike } from "@/lib/quiz/readiness";

function attempt(correct: number, total: number, day: number, domain = "1"): AttemptLike {
	return {
		total,
		correct,
		domainStats: { [domain]: { total, correct } },
		createdAt: `2026-07-${String(day).padStart(2, "0")}T00:00:00Z`,
	};
}

describe("computeReadiness", () => {
	it("최소 시도 수 미만이면 종합 점수는 null (도메인 값은 계산)", () => {
		const r = computeReadiness("cpacc", [attempt(8, 10, 1)]);
		expect(r.score).toBeNull();
		expect(r.byDomain["1"]).toBe(80);
		expect(r.sampleSize).toBe(1);
	});

	it("전 도메인 만점이면 100", () => {
		const attempts: AttemptLike[] = [1, 2, 3].map((day) => ({
			total: 30,
			correct: 30,
			domainStats: {
				"1": { total: 10, correct: 10 },
				"2": { total: 10, correct: 10 },
				"3": { total: 10, correct: 10 },
			},
			createdAt: `2026-07-0${day}T00:00:00Z`,
		}));
		const r = computeReadiness("cpacc", attempts);
		expect(r.score).toBe(100);
	});

	it("최근 시도가 과거보다 크게 반영된다", () => {
		// 과거 0점 → 최근 100점: 단순 평균(50)보다 높아야 함
		const attempts = [
			attempt(0, 10, 1),
			attempt(10, 10, 2),
			attempt(10, 10, 3),
		];
		const r = computeReadiness("cpacc", attempts);
		expect(r.byDomain["1"]!).toBeGreaterThan(60);
	});

	it("데이터 없는 도메인은 배분에서 제외하고 재정규화한다", () => {
		const attempts = Array.from({ length: MIN_ATTEMPTS_FOR_SCORE }, (_, i) => attempt(9, 10, i + 1, "1"));
		const r = computeReadiness("was", attempts);
		expect(r.byDomain["2"]).toBeNull();
		expect(r.score).toBe(90); // D1만으로 정규화
	});
});

describe("accuracyTrend", () => {
	it("오래된 → 최신 순으로 정답률을 반환한다", () => {
		const trend = accuracyTrend([attempt(5, 10, 3), attempt(10, 10, 1)]);
		expect(trend.map((t) => t.pct)).toEqual([100, 50]);
	});

	it("limit 개수만 남긴다 (최신 우선)", () => {
		const attempts = Array.from({ length: 15 }, (_, i) => attempt(i, 20, i + 1));
		const trend = accuracyTrend(attempts, 12);
		expect(trend).toHaveLength(12);
		expect(trend[trend.length - 1].createdAt).toContain("07-15");
	});
});
