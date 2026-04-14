import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import type { Metadata } from "next";
import { cpaccDomains } from "@/lib/content/cpacc-units";
import RoadmapProgress from "@/components/RoadmapProgress";

export const metadata: Metadata = {
	title: "CPACC 학습 로드맵",
	description:
		"CPACC 시험 도메인별 학습 단위 목차. 각 단위를 클릭해 학습 내용과 퀴즈를 시작하세요.",
};

export default async function CpaccStudyPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	setRequestLocale(locale);
	return <RoadmapProgress locale={locale} exam="cpacc" domains={cpaccDomains} />;
}
