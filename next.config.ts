import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const securityHeaders = [
	// 클릭재킹 방지
	{ key: "X-Frame-Options", value: "DENY" },
	// MIME 스니핑 방지
	{ key: "X-Content-Type-Options", value: "nosniff" },
	// 리퍼러 최소화
	{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
	// 미사용 브라우저 기능 차단
	{ key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
	// HTTPS 강제 (Vercel은 HTTPS 전용이므로 안전)
	{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
	// CSP — Report-Only 운용 기간을 거쳐 enforce 전환 (2026-07).
	// GA4·AdSense의 스크립트/수집/iframe 도메인을 포함한다.
	// (Next.js inline 스크립트·styled-jsx 특성상 'unsafe-inline' 필요)
	{
		key: "Content-Security-Policy",
		value: [
			"default-src 'self'",
			"script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://www.googletagmanager.com https://ep2.adtrafficquality.google",
			"style-src 'self' 'unsafe-inline'",
			"img-src 'self' data: https:",
			"font-src 'self' data:",
			"connect-src 'self' https://*.supabase.co https://*.google-analytics.com https://www.googletagmanager.com https://pagead2.googlesyndication.com https://ep1.adtrafficquality.google",
			// AdSense 광고 iframe — 오버레이가 아닌 인라인 슬롯 내부에서만 렌더됨
			"frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com https://ep2.adtrafficquality.google",
			"frame-ancestors 'none'",
			"base-uri 'self'",
			"form-action 'self'",
		].join("; "),
	},
];

const nextConfig: NextConfig = {
	// Vercel 배포: SSR + API Routes 활성화 (output: 'export' 제거)
	// 이미지 최적화: Vercel에서 자동 지원
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: securityHeaders,
			},
		];
	},
};

export default withNextIntl(nextConfig);
