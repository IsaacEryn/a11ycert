import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { cpaccUnits } from "@/lib/content/cpacc-units";
import FlashcardDeck from "@/components/FlashcardDeck";

export const metadata: Metadata = {
	title: "CPACC 플래시카드",
};

export default async function CpaccFlashcardsPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setRequestLocale(locale);

	return <FlashcardDeck units={cpaccUnits} locale={locale} exam="cpacc" />;
}
