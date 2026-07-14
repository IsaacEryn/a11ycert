/**
 * Leitner 5박스 간격반복(SRS)
 * - "다시(again)": 박스 1로 강등, 즉시 재출제
 * - "알았음(good)": 박스 +1 (최대 5), 박스별 간격 후 재출제
 */

export type SrsGrade = "again" | "good";

export interface SrsCardState {
	box: number; // 1~5
	due: string; // ISO timestamp
}

/** 박스별 재출제 간격 (일). box 1 = 즉시(0일) */
export const LEITNER_INTERVALS_DAYS = [0, 1, 3, 7, 21] as const;

export const MAX_BOX = 5;

function addDays(date: Date, days: number): Date {
	const out = new Date(date);
	out.setDate(out.getDate() + days);
	return out;
}

/** 평가 결과로 다음 카드 상태 계산 */
export function gradeCard(
	prev: SrsCardState | undefined,
	grade: SrsGrade,
	now: Date = new Date()
): SrsCardState {
	// 미학습 카드는 박스 1에서 시작하는 것으로 간주 → 첫 "알았음"은 박스 2 (1일 후)
	const nextBox = grade === "again" ? 1 : Math.min((prev?.box ?? 1) + 1, MAX_BOX);
	const intervalDays = LEITNER_INTERVALS_DAYS[nextBox - 1];
	return { box: nextBox, due: addDays(now, intervalDays).toISOString() };
}

/** 복습 대상 여부 — 미학습 카드는 항상 due */
export function isDue(state: SrsCardState | undefined, now: Date = new Date()): boolean {
	if (!state) return true;
	return new Date(state.due) <= now;
}
