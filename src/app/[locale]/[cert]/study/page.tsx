import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CERTS, isCert, getCertContent } from "@/lib/content";
import { localeAlternates } from "@/lib/seo";
import RoadmapProgress from "@/components/RoadmapProgress";

export function generateStaticParams() {
	return CERTS.map((cert) => ({ cert }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string; cert: string }>;
}): Promise<Metadata> {
	const { locale, cert } = await params;
	if (!isCert(cert)) return {};
	const certName = cert.toUpperCase();
	return locale === "ko"
		? {
				title: `${certName} 학습 로드맵`,
				description: `${certName} 시험 도메인별 학습 단위 목차. 각 단위를 클릭해 학습 내용과 퀴즈를 시작하세요.`,
				alternates: localeAlternates(locale, `/${cert}/study`),
			}
		: {
				title: `${certName} Study Roadmap`,
				description: `${certName} exam study units by domain. Click a unit to start studying and take the quiz.`,
				alternates: localeAlternates(locale, `/${cert}/study`),
			};
}

export default async function CertStudyPage({
	params,
}: {
	params: Promise<{ locale: string; cert: string }>;
}) {
	const { locale, cert } = await params;
	if (!isCert(cert)) notFound();
	setRequestLocale(locale);
	const { domains } = getCertContent(cert);
	return <RoadmapProgress locale={locale} exam={cert} domains={domains} />;
}
