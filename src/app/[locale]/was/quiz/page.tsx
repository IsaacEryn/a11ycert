import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { wasDomains } from "@/lib/content/was-units";
import QuizPageClient from "@/components/quiz/QuizPageClient";

export const metadata: Metadata = {
  title: "WAS 모의 퀴즈",
  description: "WAS 전 도메인 모의 퀴즈. 실전과 동일한 4지선다 형식으로 학습합니다.",
};

export default async function WasQuizPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const questions = wasDomains
    .flatMap((d) => d.units)
    .filter((u) => u.available)
    .flatMap((u) => u.questions);

  return <QuizPageClient questions={questions} locale={locale} exam="was" />;
}
