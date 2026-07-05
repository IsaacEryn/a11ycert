import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			// 개인 영역·API는 크롤링 제외
			disallow: ["/api/", "/ko/mypage", "/en/mypage", "/auth/"],
		},
		sitemap: `${SITE_URL}/sitemap.xml`,
	};
}
