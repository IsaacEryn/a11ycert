import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { cpaccDomains } from "@/lib/content/cpacc-units";
import QuizPageClient from "@/components/quiz/QuizPageClient";

export const metadata: Metadata = {
  title: "CPACC 모의 퀴즈",
  description: "CPACC 전 도메인 모의 퀴즈. 실전과 동일한 4지선다 형식으로 학습합니다.",
};

export default async function CpaccQuizPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const questions = cpaccDomains
    .flatMap((d) => d.units)
    .filter((u) => u.available)
    .flatMap((u) => u.questions);

  return <QuizPageClient questions={questions} locale={locale} exam="cpacc" />;
}
