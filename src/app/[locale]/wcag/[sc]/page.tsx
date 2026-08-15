import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  wcagCriteria,
  getCriterion,
  principleOf,
  understandingUrl,
} from "@/lib/content/wcag-criteria";
import { getCertContent } from "@/lib/content";
import { isCert } from "@/lib/content/certs";
import { localeAlternates } from "@/lib/seo";

export function generateStaticParams() {
  const locales = ["ko", "en"];
  return locales.flatMap((locale) => wcagCriteria.map((c) => ({ locale, sc: c.id })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; sc: string }>;
}): Promise<Metadata> {
  const { locale, sc } = await params;
  const c = getCriterion(sc);
  if (!c) return {};
  const isKo = locale === "ko";
  return {
    title: `WCAG ${c.num} ${isKo ? c.title.ko : c.title.en} (${c.level})`,
    description: isKo ? c.summary.ko : c.summary.en,
    alternates: localeAlternates(locale, `/wcag/${sc}`),
  };
}

/** unitId 접두사로 소속 자격증을 판별해 학습 단원 경로를 만든다 */
function unitLink(locale: string, unitId: string): { href: string; title: string } | null {
  const cert = unitId.split("-")[0];
  if (!isCert(cert)) return null;
  const unit = getCertContent(cert).getUnit(unitId);
  if (!unit) return null;
  return {
    href: `/${locale}/${cert}/study/${unitId}`,
    title: locale === "ko" ? unit.title.ko : unit.title.en,
  };
}

export default async function WcagCriterionPage({
  params,
}: {
  params: Promise<{ locale: string; sc: string }>;
}) {
  const { locale, sc } = await params;
  const criterion = getCriterion(sc);
  if (!criterion) notFound();
  setRequestLocale(locale);

  const isKo = locale === "ko";
  const t = await getTranslations("wcag");

  const idx = wcagCriteria.findIndex((c) => c.id === sc);
  const prev = idx > 0 ? wcagCriteria[idx - 1] : null;
  const next = idx < wcagCriteria.length - 1 ? wcagCriteria[idx + 1] : null;

  const relatedLinks = criterion.relatedUnits
    .map((id) => unitLink(locale, id))
    .filter((u): u is { href: string; title: string } => u !== null);

  return (
    <div
      className="container"
      style={{ maxWidth: 760, paddingTop: "var(--space-8)", paddingBottom: "var(--space-16)" }}
    >
      <nav aria-label={t("breadcrumbLabel")} style={{ marginBottom: "var(--space-4)" }}>
        <Link href={`/${locale}/wcag`} style={{ fontSize: "var(--fs-sm)" }}>
          {t("title")}
        </Link>
      </nav>

      <header>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-2)",
            flexWrap: "wrap",
            marginBottom: "var(--space-2)",
          }}
        >
          <span className="tag">{t(`principle${principleOf(criterion)}`)}</span>
          <span className="tag">{t("levelTag", { level: criterion.level })}</span>
        </div>
        <h1 style={{ margin: 0 }}>
          <span style={{ fontVariantNumeric: "tabular-nums" }}>{criterion.num}</span>{" "}
          {isKo ? criterion.title.ko : criterion.title.en}
        </h1>
        <p lang={isKo ? "en" : "ko"} style={{ color: "var(--fg-muted)", marginTop: "var(--space-1)" }}>
          {isKo ? criterion.title.en : criterion.title.ko}
        </p>
      </header>

      <section style={{ marginTop: "var(--space-6)" }}>
        <h2 style={{ fontSize: "var(--fs-lg)" }}>{t("summaryHeading")}</h2>
        <p>{isKo ? criterion.summary.ko : criterion.summary.en}</p>
      </section>

      <section style={{ marginTop: "var(--space-6)" }}>
        <h2 style={{ fontSize: "var(--fs-lg)" }}>{t("failuresHeading")}</h2>
        <ul>
          {criterion.commonFailures.map((f, i) => (
            <li key={i} style={{ marginBottom: "var(--space-2)" }}>
              {isKo ? f.ko : f.en}
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: "var(--space-6)" }}>
        <h2 style={{ fontSize: "var(--fs-lg)" }}>{t("kwcagHeading")}</h2>
        {criterion.kwcag?.length ? (
          <ul>
            {criterion.kwcag.map((k) => (
              <li key={k.num}>
                <strong style={{ fontVariantNumeric: "tabular-nums" }}>{k.num}</strong>{" "}
                {isKo ? k.name.ko : k.name.en}
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: "var(--fg-muted)" }}>{t("kwcagNone")}</p>
        )}
      </section>

      {relatedLinks.length > 0 && (
        <section style={{ marginTop: "var(--space-6)" }}>
          <h2 style={{ fontSize: "var(--fs-lg)" }}>{t("relatedHeading")}</h2>
          <ul>
            {relatedLinks.map((u) => (
              <li key={u.href}>
                <Link href={u.href}>{u.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <p style={{ marginTop: "var(--space-6)" }}>
        <a href={understandingUrl(criterion)} target="_blank" rel="noopener noreferrer">
          {t("understandingLink", { num: criterion.num })}
        </a>
      </p>

      <nav
        aria-label={t("adjacentLabel")}
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "var(--space-4)",
          marginTop: "var(--space-8)",
          paddingTop: "var(--space-4)",
          borderTop: "1px solid var(--divider)",
        }}
      >
        {prev ? (
          <Link href={`/${locale}/wcag/${prev.id}`}>
            ← {prev.num} {isKo ? prev.title.ko : prev.title.en}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/${locale}/wcag/${next.id}`} style={{ textAlign: "right" }}>
            {next.num} {isKo ? next.title.ko : next.title.en} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
