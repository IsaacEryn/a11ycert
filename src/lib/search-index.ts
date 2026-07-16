import { CERTS, getCertContent } from "@/lib/content";
import { glossaryTerms } from "@/lib/content/glossary";
import type { Cert } from "@/lib/content/certs";

/**
 * 통합 검색 인덱스 — 단원(제목·요약·섹션 소제목) + 용어(표제어·aliases).
 * 본문 전문은 크기 절제를 위해 제외.
 *
 * 주의: 이 모듈은 콘텐츠 전체를 값 import하므로 클라이언트에서는
 * 반드시 `await import()`(동적)로만 로드할 것 — 정적 import 금지.
 */
export interface SearchEntry {
	type: "unit" | "term";
	id: string;
	cert?: Cert;
	title: { ko: string; en: string };
	/** 부가 검색 대상 텍스트 (요약·소제목·aliases·정의) — 소문자 정규화 */
	haystack: string;
	/** locale 프리픽스 제외 경로 */
	href: string;
}

let cached: SearchEntry[] | null = null;

export function buildSearchIndex(): SearchEntry[] {
	if (cached) return cached;

	const units: SearchEntry[] = CERTS.flatMap((cert) =>
		getCertContent(cert)
			.units.filter((u) => u.available)
			.map((u) => ({
				type: "unit" as const,
				id: u.id,
				cert,
				title: u.title,
				haystack: [
					u.summary.ko,
					u.summary.en,
					...(u.sections?.flatMap((s) => [s.heading.ko, s.heading.en]) ?? []),
				]
					.join(" ")
					.toLowerCase(),
				href: `/${cert}/study/${u.id}`,
			}))
	);

	const terms: SearchEntry[] = glossaryTerms.map((t) => ({
		type: "term" as const,
		id: t.id,
		title: t.term,
		haystack: [t.definition.ko, t.definition.en, ...(t.aliases ?? [])].join(" ").toLowerCase(),
		href: `/glossary#${t.id}`,
	}));

	cached = [...units, ...terms];
	return cached;
}
