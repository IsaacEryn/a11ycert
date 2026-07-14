import type { QuizQuestion } from "@/lib/content/types";
import type { Cert } from "@/lib/content";

/**
 * 모의시험 구성 — 미니(짧은 연습)와 실전(실제 시험 규모) 두 프리셋.
 * 실전 규모는 사이트 시험 정보 기준: CPACC 100문항/120분, WAS 75문항/90분.
 * 도메인 배분은 실제 시험 가중치 기준: CPACC 40/40/20, WAS 40/30/30.
 */
export type MockExamMode = "mini" | "full";

export interface MockExamPreset {
	totalQuestions: number;
	timeLimitMinutes: number;
	distribution: Record<1 | 2 | 3, number>; // 도메인별 비중 (합 1)
}

export const MOCK_EXAM_PRESETS: Record<Cert, Record<MockExamMode, MockExamPreset>> = {
	cpacc: {
		mini: {
			totalQuestions: 30,
			timeLimitMinutes: 45,
			distribution: { 1: 0.4, 2: 0.4, 3: 0.2 },
		},
		full: {
			totalQuestions: 100,
			timeLimitMinutes: 120,
			distribution: { 1: 0.4, 2: 0.4, 3: 0.2 },
		},
	},
	was: {
		mini: {
			totalQuestions: 30,
			timeLimitMinutes: 45,
			distribution: { 1: 0.4, 2: 0.3, 3: 0.3 },
		},
		full: {
			totalQuestions: 75,
			timeLimitMinutes: 90,
			distribution: { 1: 0.4, 2: 0.3, 3: 0.3 },
		},
	},
};

function shuffled<T>(arr: T[]): T[] {
	// Fisher-Yates
	const out = [...arr];
	for (let i = out.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[out[i], out[j]] = [out[j], out[i]];
	}
	return out;
}

/**
 * 도메인 가중치 비례로 문항을 추출해 셔플한 모의시험 세트 생성.
 * 도메인 풀이 부족하면 다른 도메인에서 보충하고, 전체 풀이 부족하면 가용 전체 사용.
 */
export function buildMockExam(
	cert: Cert,
	pool: QuizQuestion[],
	mode: MockExamMode = "full"
): QuizQuestion[] {
	const preset = MOCK_EXAM_PRESETS[cert][mode];
	const total = Math.min(preset.totalQuestions, pool.length);

	const byDomain: Record<number, QuizQuestion[]> = { 1: [], 2: [], 3: [] };
	for (const q of pool) {
		byDomain[q.domain ?? 1].push(q);
	}

	const picked: QuizQuestion[] = [];
	const remaining: QuizQuestion[] = [];

	for (const d of [1, 2, 3] as const) {
		const want = Math.round(total * preset.distribution[d]);
		const domainPool = shuffled(byDomain[d]);
		picked.push(...domainPool.slice(0, want));
		remaining.push(...domainPool.slice(want));
	}

	// 반올림/풀 부족으로 모자라면 남은 문항에서 보충, 넘치면 잘라냄
	if (picked.length < total) {
		picked.push(...shuffled(remaining).slice(0, total - picked.length));
	}

	return shuffled(picked.slice(0, total));
}

/** 도메인별 정답률 집계 */
export function computeDomainStats(
	questions: QuizQuestion[],
	answers: Record<number, "a" | "b" | "c" | "d">
): Record<string, { total: number; correct: number }> {
	const stats: Record<string, { total: number; correct: number }> = {};
	questions.forEach((q, i) => {
		const d = String(q.domain ?? 1);
		stats[d] ??= { total: 0, correct: 0 };
		stats[d].total += 1;
		if (answers[i] === q.answer) stats[d].correct += 1;
	});
	return stats;
}
