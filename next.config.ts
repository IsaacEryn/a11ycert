import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",       // 정적 내보내기 (GitHub Pages 필수)
  trailingSlash: true,    // GitHub Pages 경로 호환
  basePath: isProd ? "/a11ycert" : "",  // GitHub Pages 서브경로
  images: {
    unoptimized: true,    // 정적 내보내기 시 이미지 최적화 비활성화
  },
};

export default withNextIntl(nextConfig);
