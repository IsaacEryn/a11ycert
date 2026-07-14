import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CERTS, isCert, getCertQuestions } from "@/lib/content";
import { localeAlternates } from "@/lib/seo";
import MockExamClient from "@/components/quiz/MockExamClient";

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
				title: `${certName} 모의시험`,
				description: `${certName} 실전 대비 타임드 모의시험. 도메인 가중치 비례 출제와 제한 시간으로 실전처럼 연습하세요.`,
				alternates: localeAlternates(locale, `/${cert}/mock-exam`),
			}
		: {
				title: `${certName} Mock Exam`,
				description: `Timed ${certName} mock exam with domain-weighted question selection.`,
				alternates: localeAlternates(locale, `/${cert}/mock-exam`),
			};
}

export default async function CertMockExamPage({
	params,
}: {
	params: Promise<{ locale: string; cert: string }>;
}) {
	const { locale, cert } = await params;
	if (!isCert(cert)) notFound();
	setRequestLocale(locale);

	return <MockExamClient pool={getCertQuestions(cert)} locale={locale} cert={cert} />;
}
