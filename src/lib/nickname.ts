/**
 * 관리자 사칭 닉네임 검사 — supabase/migrations/010_nickname_guard.sql의
 * is_reserved_nickname()과 동일한 규칙(토큰·정규화)을 유지할 것.
 * 클라이언트 검사는 안내용이고, 최종 차단은 DB 트리거가 담당한다.
 */
const RESERVED_TOKENS = [
	"관리자",
	"운영자",
	"운영진",
	"어드민",
	"관리인",
	"admin",
	"administrator",
	"moderator",
	"sysop",
	"staff",
	"official",
	"a11ycert",
] as const;

/** 한글·영문·숫자만 남기고 소문자화 — "Ad.min", "관 리 자" 같은 변형도 잡는다 */
function normalize(nickname: string): string {
	return nickname.toLowerCase().replace(/[^a-z0-9가-힣]/g, "");
}

export function isReservedNickname(nickname: string): boolean {
	const normalized = normalize(nickname);
	return RESERVED_TOKENS.some((token) => normalized.includes(token));
}
