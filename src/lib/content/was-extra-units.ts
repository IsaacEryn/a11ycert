import type { StudyUnit } from "./types";

/**
 * WAS 신규 단원 확장 지점 — 기존 was-units.ts 비대화 방지.
 * content/index.ts의 withExtraUnits가 도메인별로 병합 후 order 정렬.
 * 작성 예정 (계획 Batch 6):
 *  - was-1-7 폼과 오류 처리 심화
 *  - was-1-8 문서 구조 (헤딩·랜드마크·표)
 *  - was-1-9 커스텀 위젯과 동적 콘텐츠 (APG 패턴, aria-live, SPA 포커스)
 * 미완성 단원은 available: false로 머지 가능.
 */
export const wasExtraUnits: StudyUnit[] = [];
