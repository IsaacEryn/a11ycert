import type { MetadataRoute } from "next";
// 주의: 반드시 병합 콘텐츠(getCertContent) 기준으로 생성할 것 —
// 원본 파일의 getAll*UnitIds()는 extra-units가 빠져 신규 단원이 누락된다.
import { CERTS, getCertContent } from "@/lib/content";
import { SITE_URL } from "@/lib/seo";

const LOCALES = ["ko", "en"] as const;

const STATIC_PATHS = [
	"",
	"/cpacc",
	"/cpacc/study",
	"/cpacc/quiz",
	"/cpacc/mock-exam",
	"/cpacc/flashcards",
	"/was",
	"/was/study",
	"/was/quiz",
	"/was/mock-exam",
	"/was/flashcards",
	"/glossary",
	"/community",
	"/about",
	"/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
	const unitPaths = CERTS.flatMap((cert) =>
		getCertContent(cert)
			.getAllUnitIds()
			.map((id) => `/${cert}/study/${id}`)
	);

	return [...STATIC_PATHS, ...unitPaths].flatMap((path) =>
		LOCALES.map((locale) => ({
			url: `${SITE_URL}/${locale}${path}`,
			changeFrequency: "weekly" as const,
			priority: path === "" ? 1 : path.includes("/study/") ? 0.8 : 0.6,
			alternates: {
				languages: Object.fromEntries(
					LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`])
				),
			},
		}))
	);
}
