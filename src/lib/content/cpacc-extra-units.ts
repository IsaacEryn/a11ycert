import type { StudyUnit } from "./types";

/**
 * CPACC 신규 단원 확장 지점 — 기존 cpacc-units.ts(1200줄+) 비대화 방지.
 * content/index.ts의 withExtraUnits가 도메인별로 병합 후 order 정렬.
 * 작성 예정 (IAAP BoK 커버리지 공백 기준, 계획 Batch 3):
 *  - cpacc-1-6 장애 인구통계와 고령화
 *  - cpacc-1-7 보조기술과 적응 전략 총람
 *  - cpacc-2-4 UDL·사용성·UCD와의 관계
 *  - cpacc-2-5 접근성의 혜택과 비즈니스 사례
 *  - cpacc-3-4 조달과 VPAT/ACR 실무
 * 미완성 단원은 available: false로 머지 가능.
 */
export const cpaccExtraUnits: StudyUnit[] = [];
