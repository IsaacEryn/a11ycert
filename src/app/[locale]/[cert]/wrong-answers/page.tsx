import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CERTS, isCert, getCertContent } from "@/lib/content";
import { localeAlternates } from "@/lib/seo";
import WrongAnswersClient from "@/components/WrongAnswersClient";

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
				title: `${certName} 오답노트`,
				description: "틀린 문제와 저장한 문제를 모아 복습하세요.",
				alternates: localeAlternates(locale, `/${cert}/wrong-answers`),
			}
		: {
				title: `${certName} Wrong Answers`,
				description: "Review the questions you missed and saved.",
				alternates: localeAlternates(locale, `/${cert}/wrong-answers`),
			};
}

export default async function CertWrongAnswersPage({
	params,
}: {
	params: Promise<{ locale: string; cert: string }>;
}) {
	const { locale, cert } = await params;
	if (!isCert(cert)) notFound();
	setRequestLocale(locale);
	const { units } = getCertContent(cert);
	return <WrongAnswersClient locale={locale} exam={cert} units={units} />;
}
