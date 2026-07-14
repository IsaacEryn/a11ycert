/**
 * AdSense 설정 단일 지점.
 *
 * 활성화 절차 (AdSense 승인 후):
 *  1. Vercel 환경변수 NEXT_PUBLIC_ADSENSE_ID = "ca-pub-..." 설정
 *  2. AdSense 대시보드에서 디스플레이 광고 단위를 만들고 슬롯 id를 아래 AD_SLOTS에 기입
 *  3. 대시보드의 "자동 광고(Auto ads)"는 반드시 꺼둘 것 —
 *     전면(vignette)·앵커 광고가 화면을 덮어 학습을 방해하므로 사용하지 않는다.
 *
 * 배치 원칙 (PROJECT_SPEC §5): 결과·완료 화면과 페이지 하단만 허용.
 * 퀴즈 풀이 중·플래시카드 학습 중·콘텐츠 상단·팝업/오버레이 금지.
 * NEXT_PUBLIC_ADSENSE_ID 또는 슬롯 id가 비어 있으면 아무것도 렌더링되지 않는다.
 */
export const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID ?? "";

export const AD_SLOTS = {
	/** 퀴즈 결과 화면 하단 */
	quizResult: "",
	/** 모의시험 결과 화면 하단 */
	mockExamResult: "",
	/** 학습 단원 페이지 최하단 (콘텐츠·댓글 아래, Footer 위) */
	studyBottom: "",
} as const;

export type AdSlotKey = keyof typeof AD_SLOTS;

export function isAdEnabled(slotKey: AdSlotKey): boolean {
	return ADSENSE_ID !== "" && AD_SLOTS[slotKey] !== "";
}
