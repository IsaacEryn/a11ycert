import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { glossaryTerms } from "@/lib/content/glossary";
import GlossaryClient from "@/components/glossary/GlossaryClient";
import { localeAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return locale === "ko"
    ? {
        title: "접근성 용어집",
        description: "CPACC·WAS 핵심 접근성 용어를 한국어·영어로 확인하세요.",
        alternates: localeAlternates(locale, "/glossary"),
      }
    : {
        title: "Accessibility Glossary",
        description: "Key CPACC & WAS accessibility terms in Korean and English.",
        alternates: localeAlternates(locale, "/glossary"),
      };
}

export default async function GlossaryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="container" style={{ maxWidth: 960, paddingTop: "var(--space-8)", paddingBottom: "var(--space-16)" }}>
      {/* useSearchParams 사용 컴포넌트는 Suspense 경계 필수 (CSR bailout) */}
      <Suspense>
        <GlossaryClient terms={glossaryTerms} locale={locale} />
      </Suspense>
    </div>
  );
}
