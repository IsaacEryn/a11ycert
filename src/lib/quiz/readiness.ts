import { MOCK_EXAM_PRESETS } from "@/lib/quiz/mock-exam";
import type { Cert } from "@/lib/content/certs";

/** 준비도 계산 입력 — quiz_attempts(DB)와 LocalAttempt(스토어) 공통 최소 형태 */
export interface AttemptLike {
	total: number;
	correct: number;
	domainStats: Record<string, { total: number; correct: number }>;
	createdAt: string;
}

export interface Readiness {
	/** 0~100 종합 점수, 데이터 부족 시 null */
	score: number | null;
	/** 도메인별 숙련도 0~100 (표본 없으면 null) */
	byDomain: Record<"1" | "2" | "3", number | null>;
	/** 판정에 사용된 시도 수 */
	sampleSize: number;
}

/** 종합 점수를 내기 위한 최소 시도 수 — 미만이면 '데이터 부족' */
export const MIN_ATTEMPTS_FOR_SCORE = 3;

/** 최근 시도에 더 큰 가중치 (최신 → 과거 순 지수 감쇠) */
const RECENCY_DECAY = 0.85;

/**
 * 시도 이력에서 도메인 숙련도와 실제 시험 배분 가중 종합 준비도를 계산.
 * 순수 함수 — 최근 시도일수록 가중치가 높다.
 */
export function computeReadiness(cert: Cert, attempts: AttemptLike[]): Readiness {
	const sorted = [...attempts].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
	const recent = sorted.slice(0, 20);

	// 도메인별 가중 정답률
	const acc: Record<string, { weighted: number; weight: number }> = {};
	recent.forEach((a, i) => {
		const w = Math.pow(RECENCY_DECAY, i);
		for (const [d, s] of Object.entries(a.domainStats ?? {})) {
			if (!s || s.total === 0) continue;
			acc[d] ??= { weighted: 0, weight: 0 };
			acc[d].weighted += (s.correct / s.total) * w * s.total;
			acc[d].weight += w * s.total;
		}
	});

	const byDomain = { "1": null, "2": null, "3": null } as Readiness["byDomain"];
	for (const d of ["1", "2", "3"] as const) {
		const a = acc[d];
		byDomain[d] = a && a.weight > 0 ? Math.round((a.weighted / a.weight) * 100) : null;
	}

	// 실제 시험 도메인 배분으로 가중 종합 (데이터 없는 도메인은 배분에서 제외 후 재정규화)
	let score: number | null = null;
	if (recent.length >= MIN_ATTEMPTS_FOR_SCORE) {
		const dist = MOCK_EXAM_PRESETS[cert].full.distribution;
		let sum = 0;
		let weightSum = 0;
		for (const d of [1, 2, 3] as const) {
			const v = byDomain[String(d) as "1" | "2" | "3"];
			if (v === null) continue;
			sum += v * dist[d];
			weightSum += dist[d];
		}
		score = weightSum > 0 ? Math.round(sum / weightSum) : null;
	}

	return { score, byDomain, sampleSize: recent.length };
}

/** 최근 시도 정답률 시계열 (오래된 → 최신, 추이 막대용) */
export function accuracyTrend(attempts: AttemptLike[], limit = 12): { pct: number; createdAt: string }[] {
	return [...attempts]
		.sort((a, b) => a.createdAt.localeCompare(b.createdAt))
		.slice(-limit)
		.map((a) => ({
			pct: a.total > 0 ? Math.round((a.correct / a.total) * 100) : 0,
			createdAt: a.createdAt,
		}));
}
