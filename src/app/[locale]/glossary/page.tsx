import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { glossaryTerms } from "@/lib/content/glossary";
import GlossaryClient from "@/components/glossary/GlossaryClient";

export const metadata: Metadata = {
  title: "접근성 용어집",
  description: "CPACC·WAS 핵심 접근성 용어를 한국어·영어로 확인하세요.",
};

export default async function GlossaryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="container" style={{ maxWidth: 960, paddingTop: "var(--space-8)", paddingBottom: "var(--space-16)" }}>
      <GlossaryClient terms={glossaryTerms} locale={locale} />
    </div>
  );
}
