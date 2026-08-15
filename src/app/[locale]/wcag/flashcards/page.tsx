import { setRequestLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import type { Metadata } from "next";
import { wcagCriteria } from "@/lib/content/wcag-criteria";
import WcagFlashcards from "@/components/wcag/WcagFlashcards";
import { localeAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return locale === "ko"
    ? {
        title: "WCAG 성공기준 플래시카드",
        description: "WCAG 2.2 Level A·AA 성공기준 55개를 간격 반복으로 외워보세요.",
        alternates: localeAlternates(locale, "/wcag/flashcards"),
      }
    : {
        title: "WCAG Success Criteria Flashcards",
        description:
          "Memorize all 55 WCAG 2.2 Level A and AA success criteria with spaced repetition.",
        alternates: localeAlternates(locale, "/wcag/flashcards"),
      };
}

export default async function WcagFlashcardsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("wcag");

  return (
    <div
      className="container"
      style={{ maxWidth: 960, paddingTop: "var(--space-8)", paddingBottom: "var(--space-16)" }}
    >
      <nav aria-label={t("breadcrumbLabel")} style={{ marginBottom: "var(--space-4)" }}>
        <Link href={`/${locale}/wcag`} style={{ fontSize: "var(--fs-sm)" }}>
          ← {t("title")}
        </Link>
      </nav>
      <h1 style={{ textAlign: "center" }}>{t("deckTitle")}</h1>
      <p
        style={{
          textAlign: "center",
          color: "var(--fg-muted)",
          fontSize: "var(--fs-sm)",
          marginTop: "var(--space-2)",
        }}
      >
        {t("deckDescription")}
      </p>
      <WcagFlashcards criteria={wcagCriteria} locale={locale} />
    </div>
  );
}
