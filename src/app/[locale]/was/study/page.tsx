import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { wasDomains } from "@/lib/content/was-units";
import RoadmapProgress from "@/components/RoadmapProgress";

export const metadata: Metadata = {
  title: "WAS 학습 로드맵",
  description: "WAS 시험 도메인별 학습 단위 목차. 각 단위를 클릭해 학습 내용과 퀴즈를 시작하세요.",
};

export default async function WasStudyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <RoadmapProgress locale={locale} exam="was" domains={wasDomains} />;
}
