/**
 * GA4 설정 — NEXT_PUBLIC_GA_ID(G-XXXXXXXXXX)가 없으면 전체 비활성.
 * Vercel 환경변수 설정 즉시 다음 배포부터 수집이 시작된다.
 */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

declare global {
	interface Window {
		gtag?: (...args: unknown[]) => void;
	}
}

/** SPA 라우트 전환 시 page_view 전송 (RouteTracker에서 호출) */
export function trackPageView(url: string) {
	if (!GA_ID || typeof window.gtag !== "function") return;
	window.gtag("event", "page_view", { page_path: url });
}
