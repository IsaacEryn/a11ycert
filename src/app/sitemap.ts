import type { MetadataRoute } from "next";
import { getAllCpaccUnitIds } from "@/lib/content/cpacc-units";
import { getAllWasUnitIds } from "@/lib/content/was-units";
import { SITE_URL } from "@/lib/seo";

const LOCALES = ["ko", "en"] as const;

const STATIC_PATHS = [
	"",
	"/cpacc",
	"/cpacc/study",
	"/cpacc/quiz",
	"/cpacc/flashcards",
	"/was",
	"/was/study",
	"/was/quiz",
	"/was/flashcards",
	"/glossary",
	"/community",
	"/about",
	"/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
	const unitPaths = [
		...getAllCpaccUnitIds().map((id) => `/cpacc/study/${id}`),
		...getAllWasUnitIds().map((id) => `/was/study/${id}`),
	];

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
