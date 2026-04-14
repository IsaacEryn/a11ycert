/**
 * 프리미엄 제한 설정
 * enabled: false → 모든 사용자 무제한 이용
 * enabled: true → free 등급 사용자에게 일일 제한 적용
 */
export const LIMITS_CONFIG = {
	enabled: false, // true로 변경 시 제한 활성화

	free: {
		dailyQuizLimit: 20, // 하루 20문제
		dailyPageLimit: 5, // 하루 5페이지
	},

	premium: {
		dailyQuizLimit: Infinity,
		dailyPageLimit: Infinity,
	},
} as const;
