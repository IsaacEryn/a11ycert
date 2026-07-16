import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CERTS, isCert, getCertContent } from "@/lib/content";
import { localeAlternates } from "@/lib/seo";
import { Suspense } from "react";
import FlashcardDeck from "@/components/FlashcardDeck";

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
	return {
		title: locale === "ko" ? `${certName} 플래시카드` : `${certName} Flashcards`,
		alternates: localeAlternates(locale, `/${cert}/flashcards`),
	};
}

export default async function CertFlashcardsPage({
	params,
}: {
	params: Promise<{ locale: string; cert: string }>;
}) {
	const { locale, cert } = await params;
	if (!isCert(cert)) notFound();
	setRequestLocale(locale);

	const { units } = getCertContent(cert);
	// FlashcardDeck이 useSearchParams(?domain=)를 사용하므로 Suspense 필수 (CSR bailout)
	return (
		<Suspense fallback={null}>
			<FlashcardDeck units={units} locale={locale} exam={cert} />
		</Suspense>
	);
}
