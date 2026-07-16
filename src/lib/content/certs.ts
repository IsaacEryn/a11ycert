/**
 * cert 식별자 — 경량 모듈.
 * 클라이언트 컴포넌트는 반드시 여기서 import할 것:
 * "@/lib/content"(index)를 값으로 import하면 전체 콘텐츠(단원·문항·용어집)가
 * 클라이언트 번들에 포함된다.
 */
export type Cert = "cpacc" | "was";

export const CERTS: readonly Cert[] = ["cpacc", "was"] as const;

export function isCert(value: string): value is Cert {
	return value === "cpacc" || value === "was";
}
