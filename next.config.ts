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
