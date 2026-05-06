import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { wasUnits } from "@/lib/content/was-units";
import FlashcardDeck from "@/components/FlashcardDeck";

export const metadata: Metadata = {
	title: "WAS 플래시카드",
};

export default async function WasFlashcardsPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setRequestLocale(locale);

	return <FlashcardDeck units={wasUnits} locale={locale} exam="was" />;
}
