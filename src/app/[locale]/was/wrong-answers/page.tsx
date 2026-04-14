import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { wasUnits } from "@/lib/content/was-units";
import WrongAnswersClient from "@/components/WrongAnswersClient";

export const metadata: Metadata = {
	title: "WAS 오답노트",
	description: "틀린 문제와 저장한 문제를 모아 복습하세요.",
};

export default async function WasWrongAnswersPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setRequestLocale(locale);
	return <WrongAnswersClient locale={locale} exam="was" units={wasUnits} />;
}
