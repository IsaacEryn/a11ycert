import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Vercel 배포: SSR + API Routes 활성화 (output: 'export' 제거)
  // 이미지 최적화: Vercel에서 자동 지원
};

export default withNextIntl(nextConfig);
