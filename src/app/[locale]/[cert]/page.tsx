import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { localeAlternates } from "@/lib/seo";
import { CERTS, isCert, type Cert } from "@/lib/content";
import { certOverviews } from "@/lib/content/cert-overview";

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
  const overview = certOverviews[cert];
  const lang = locale === "ko" ? "ko" : "en";
  return {
    title: overview.metaTitle[lang],
    description: overview.metaDescription[lang],
    alternates: localeAlternates(locale, `/${cert}`),
  };
}

export default async function CertOverviewPage({
  params,
}: {
  params: Promise<{ locale: string; cert: string }>;
}) {
  const { locale, cert } = await params;
  if (!isCert(cert)) notFound();
  setRequestLocale(locale);
  return <CertOverviewContent locale={locale} cert={cert} />;
}

function CertOverviewContent({ locale, cert }: { locale: string; cert: Cert }) {
  const t = useTranslations(cert);
  const tExam = useTranslations("common.exam");
  const tCert = useTranslations("cert");
  const tMockExam = useTranslations("mockExam");
  const tGuide = useTranslations("examGuide");
  const lang = locale === "ko" ? "ko" : "en";
  const overview = certOverviews[cert];
  const certName = cert.toUpperCase();

  const examFacts = [
    { label: tExam("questions"), value: t("examInfo.questions") },
    { label: tExam("timeLimit"), value: t("examInfo.time") },
    { label: tExam("passingScore"), value: t("examInfo.passing") },
    { label: tCert("format"), value: t("examInfo.format") },
  ];

  return (
    <>
      <section className="overview-hero">
        <div className="container">
          <nav className="overview-hero__crumbs" aria-label={tCert("breadcrumbLabel")}>
            <Link href={`/${locale}`}>{tCert("home")}</Link>
            <span aria-hidden="true">/</span>
            <span>{certName}</span>
          </nav>

          <div className="overview-hero__head">
            <div>
              <div className="overview-hero__id">CERT · {overview.certNo} · {certName}</div>
              <h1 className="overview-hero__title">{t("title")}</h1>
              <p className="overview-hero__title-en">{t("overview")}</p>
              <p className="overview-hero__lede">{overview.lede[lang]}</p>
              <div className="overview-hero__cta">
                <Link className="btn btn--primary" href={`/${locale}/${cert}/study`}>
                  {tCert("startLearning")}
                </Link>
                <Link className="btn" href={`/${locale}/${cert}/quiz`}>
                  {tCert("mockQuiz")}
                </Link>
                <Link className="btn" href={`/${locale}/${cert}/mock-exam`}>
                  {tMockExam("title")}
                </Link>
                <Link className="btn btn--ghost" href={`/${locale}/${cert}/flashcards`}>
                  {tCert("flashcards")}
                </Link>
              </div>
            </div>

            <dl className="overview-hero__facts" aria-label={tCert("examInfoLabel")}>
              {examFacts.map(({ label, value }) => (
                <div key={label} className="overview-hero__fact">
                  <dt className="overview-hero__fact-label">{label}</dt>
                  <dd className="overview-hero__fact-value">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="domains" aria-labelledby={`${cert}-domains-title`}>
        <div className="container">
          <div className="section__head">
            <div>
              <h2 id={`${cert}-domains-title`} className="section__title">
                {tCert("examDomains")}
              </h2>
              <p className="section__sub">{overview.totalQuestionsLabel[lang]}</p>
            </div>
          </div>

          {overview.domains.map((d, i) => (
            <div key={d.domainNum} className="domain">
              <div>
                <div className="domain__num">DOMAIN · {d.domainNum}</div>
                <h3 className="domain__title">{t(`domains.${i + 1}.title`)}</h3>
                <p className="domain__title-en">{t(`domains.${i + 1}.en`)}</p>
                <div className="domain__weight">
                  <span>{t(`domains.${i + 1}.weight`)}</span>
                  <div className="domain__weight-bar" aria-hidden="true">
                    <span style={{ width: `${d.weightPct}%` }} />
                  </div>
                </div>
                <div className="domain__cta">
                  <Link className="btn btn--sm" href={`/${locale}/${cert}/study`}>
                    {tCert("study")}
                  </Link>
                  <Link className="btn btn--sm btn--ghost" href={`/${locale}/${cert}/quiz`}>
                    {tCert("quiz")}
                  </Link>
                </div>
              </div>

              <ul className="domain__topics">
                {d.topics.map((topic) => (
                  <li key={topic.mark} className="domain__topic">
                    <span className="domain__topic-mark">{topic.mark}</span>
                    <div>
                      <strong>{topic.title[lang]}</strong>
                      <br />
                      <span style={{ color: "var(--fg-muted)" }}>{topic.sub[lang]}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 시험 신청·응시 안내 — 절차·비용은 진부화 위험이 있어 공식 링크 병기 */}
      <section className="section" aria-labelledby={`${cert}-exam-guide`}>
        <div className="container" style={{ maxWidth: 880 }}>
          <div className="section__head">
            <div>
              <h2 id={`${cert}-exam-guide`} className="section__title">{tGuide("title")}</h2>
              <p className="section__sub">{tGuide("subtitle")}</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2" style={{ marginTop: "var(--space-4)" }}>
            <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "var(--space-5)" }}>
              <h3 style={{ fontSize: "var(--fs-md)", fontWeight: 700 }}>{tGuide("stepsTitle")}</h3>
              <ol style={{ marginTop: "var(--space-3)", paddingLeft: "1.2em", display: "flex", flexDirection: "column", gap: "var(--space-2)", fontSize: "var(--fs-sm)", color: "var(--fg-muted)", lineHeight: 1.7 }}>
                <li>{tGuide("steps.1")}</li>
                <li>{cert === "cpacc" ? tGuide("steps.2cpacc") : tGuide("steps.2was")}</li>
                <li>{tGuide("steps.3")}</li>
                <li>{tGuide("steps.4")}</li>
              </ol>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "var(--space-5)" }}>
                <h3 style={{ fontSize: "var(--fs-md)", fontWeight: 700 }}>{tGuide("feesTitle")}</h3>
                <p style={{ marginTop: "var(--space-2)", fontSize: "var(--fs-sm)", fontWeight: 600 }}>
                  {cert === "cpacc" ? tGuide("feesCpacc") : tGuide("feesWas")}
                </p>
                <p style={{ marginTop: "var(--space-1)", fontSize: "var(--fs-xs)", color: "var(--fg-subtle)" }}>{tGuide("feesNote")}</p>
              </div>
              <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "var(--space-5)" }}>
                <h3 style={{ fontSize: "var(--fs-md)", fontWeight: 700 }}>{tGuide("validityTitle")}</h3>
                <p style={{ marginTop: "var(--space-2)", fontSize: "var(--fs-sm)", color: "var(--fg-muted)", lineHeight: 1.7 }}>{tGuide("validity")}</p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "var(--space-4)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "var(--space-5)" }}>
            <h3 style={{ fontSize: "var(--fs-md)", fontWeight: 700 }}>{tGuide("tipsTitle")}</h3>
            <ul style={{ marginTop: "var(--space-3)", paddingLeft: "1.2em", display: "flex", flexDirection: "column", gap: "var(--space-2)", fontSize: "var(--fs-sm)", color: "var(--fg-muted)", lineHeight: 1.7 }}>
              <li>{tGuide("tips.1")}</li>
              <li>{tGuide("tips.2")}</li>
              <li>{tGuide("tips.3")}</li>
            </ul>
            <div style={{ marginTop: "var(--space-4)", display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
              <a className="btn btn--sm" href={cert === "cpacc" ? "https://www.accessibilityassociation.org/cpacc" : "https://www.accessibilityassociation.org/s/wascertification"} target="_blank" rel="noopener noreferrer">
                {tGuide("officialLink")}
                <span className="sr-only">({tCert("externalLink")})</span>
              </a>
              <a className="btn btn--sm" href="https://www.accessibilityassociation.org/sfsites/c/resource/CertHandbookV2" target="_blank" rel="noopener noreferrer">
                {tGuide("handbookLink")}
                <span className="sr-only">({tCert("externalLink")})</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
