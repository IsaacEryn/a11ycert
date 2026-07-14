import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CERTS, isCert, getCertQuestions } from "@/lib/content";
import { localeAlternates } from "@/lib/seo";
import QuizPageClient from "@/components/quiz/QuizPageClient";

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
        title: `${certName} 모의 퀴즈`,
        description: `${certName} 전 도메인 모의 퀴즈. 실전과 동일한 4지선다 형식으로 학습합니다.`,
        alternates: localeAlternates(locale, `/${cert}/quiz`),
      }
    : {
        title: `${certName} Mock Quiz`,
        description: `${certName} mock quiz across all domains, in the same multiple-choice format as the real exam.`,
        alternates: localeAlternates(locale, `/${cert}/quiz`),
      };
}

export default async function CertQuizPage({
  params,
}: {
  params: Promise<{ locale: string; cert: string }>;
}) {
  const { locale, cert } = await params;
  if (!isCert(cert)) notFound();
  setRequestLocale(locale);

  return <QuizPageClient questions={getCertQuestions(cert)} locale={locale} exam={cert} />;
}
