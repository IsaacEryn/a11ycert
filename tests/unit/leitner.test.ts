import { describe, it, expect } from "vitest";
import { gradeCard, isDue, MAX_BOX, LEITNER_INTERVALS_DAYS } from "@/lib/srs/leitner";

const NOW = new Date("2026-07-16T00:00:00Z");

describe("gradeCard", () => {
	it("미학습 카드에 good → 박스 2, 1일 후 due", () => {
		const next = gradeCard(undefined, "good", NOW);
		expect(next.box).toBe(2);
		expect(new Date(next.due).getTime() - NOW.getTime()).toBe(1 * 86400_000);
	});

	it("again은 어떤 박스에서도 박스 1로 강등, 즉시 due", () => {
		const next = gradeCard({ box: 5, due: NOW.toISOString() }, "again", NOW);
		expect(next.box).toBe(1);
		expect(isDue(next, NOW)).toBe(true);
	});

	it("good 반복 시 박스 상한은 MAX_BOX", () => {
		let state = gradeCard(undefined, "good", NOW);
		for (let i = 0; i < 10; i++) state = gradeCard(state, "good", NOW);
		expect(state.box).toBe(MAX_BOX);
	});

	it("박스별 간격은 LEITNER_INTERVALS_DAYS를 따른다", () => {
		const fromBox2 = gradeCard({ box: 2, due: NOW.toISOString() }, "good", NOW); // → 박스 3
		expect(new Date(fromBox2.due).getTime() - NOW.getTime()).toBe(
			LEITNER_INTERVALS_DAYS[2] * 86400_000
		);
	});
});

describe("isDue", () => {
	it("미학습 카드는 항상 due", () => {
		expect(isDue(undefined, NOW)).toBe(true);
	});

	it("due 시각이 지나면 true, 미래면 false", () => {
		expect(isDue({ box: 2, due: "2026-07-15T00:00:00Z" }, NOW)).toBe(true);
		expect(isDue({ box: 2, due: "2026-07-17T00:00:00Z" }, NOW)).toBe(false);
	});
});
