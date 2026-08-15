import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { wcagCriteria } from "@/lib/content/wcag-criteria";
import WcagIndexClient from "@/components/wcag/WcagIndexClient";
import { localeAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return locale === "ko"
    ? {
        title: "WCAG 2.2 성공기준 55개",
        description:
          "WCAG 2.2 Level A·AA 성공기준 55개를 번호로 찾아보세요. 요약, 흔한 실패 사례, KWCAG 2.2 매핑, 관련 학습 단원을 함께 제공합니다.",
        alternates: localeAlternates(locale, "/wcag"),
      }
    : {
        title: "WCAG 2.2 Success Criteria (55)",
        description:
          "Browse all 55 WCAG 2.2 Level A and AA success criteria by number, with summaries, common failures, KWCAG 2.2 mappings, and related study units.",
        alternates: localeAlternates(locale, "/wcag"),
      };
}

export default async function WcagIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div
      className="container"
      style={{ maxWidth: 960, paddingTop: "var(--space-8)", paddingBottom: "var(--space-16)" }}
    >
      {/* useSearchParams 사용 컴포넌트는 Suspense 경계 필수 (CSR bailout) */}
      <Suspense>
        <WcagIndexClient criteria={wcagCriteria} locale={locale} />
      </Suspense>
    </div>
  );
}
