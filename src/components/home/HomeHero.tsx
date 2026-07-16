import Link from "next/link";
import { useTranslations } from "next-intl";
import ContinueStudying from "@/components/ContinueStudying";

interface Props {
  locale: string;
  isKo: boolean;
}

export default function HomeHero({ locale, isKo }: Props) {
  const t = useTranslations("homeUi");
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container">
        <div className="hero__grid">
          <div>
            <span className="hero__eyebrow">
              <span className="dot" aria-hidden="true">A</span>
              {t("iaapCertificationKoreanStudy")}
            </span>

            <h1 id="hero-title" className="hero__title">
              {isKo ? (
                <>웹 접근성 자격증,<br /><em>한국어로</em> 준비하세요</>
              ) : (
                <>Web Accessibility Certs,<br />Prepared <em>in Korean</em></>
              )}
            </h1>

            <p className="hero__lede">
              {t("studyCpaccAndWas")}
            </p>

            <div className="hero__cta">
              <Link className="btn btn--primary btn--lg" href={`/${locale}/cpacc`}>
                {t("startCpacc")}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <Link className="btn btn--lg" href={`/${locale}/was`}>
                {t("startWas")}
              </Link>
            </div>

            {/* 마지막 방문 단원이 있으면 이어서 학습 버튼 노출 (클라이언트) */}
            <div style={{ marginTop: "var(--space-3)" }}>
              <ContinueStudying locale={locale} />
            </div>

            <dl className="hero__stats">
              <div>
                <dt className="hero__stat-label">{t("practiceQuestions")}</dt>
                <dd className="hero__stat-num">
                  222
                  <span style={{ fontSize: "0.55em", color: "var(--fg-muted)", fontWeight: 600, marginLeft: 2 }}>
                    {t("qs")}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="hero__stat-label">{t("cpaccWasCourses")}</dt>
                <dd className="hero__stat-num">
                  2
                  <span style={{ fontSize: "0.55em", color: "var(--fg-muted)", fontWeight: 600, marginLeft: 6 }}>
                    {t("certs")}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="hero__stat-label">{t("noAccountNeeded")}</dt>
                <dd className="hero__stat-num" style={{ color: "var(--success)" }}>
                  {t("free")}
                </dd>
              </div>
            </dl>
          </div>

          {/* Showcase (decorative) — 실제 UI로 오인되지 않도록 예시 라벨 표시 */}
          <div className="showcase" aria-hidden="true">
            <span className="showcase__label">
              {t("previewFindRealQuestions")}
            </span>
            <div className="showcase__card showcase__card--badge">
              <span style={{ display: "inline-grid", placeItems: "center", width: 28, height: 28, borderRadius: "50%", background: "var(--success-soft)", color: "var(--success)" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <div>
                <div style={{ fontSize: "var(--fs-xs)", color: "var(--fg-subtle)", fontWeight: 500 }}>{t("correct1")}</div>
                <div style={{ fontSize: "var(--fs-sm)" }}>{t("12100Done")}</div>
              </div>
            </div>

            <div className="showcase__card showcase__card--main">
              <div className="qcard__head">
                <span className="qcard__qnum">{t("sampleQ")}</span>
                <span className="qcard__cert">CPACC · POUR</span>
              </div>
              <div>
                <div className="qcard__q">{t("whichIsNotOne")}</div>
                <div className="qcard__q-en">Which of the following is NOT one of WCAG 2.2&apos;s four principles (POUR)?</div>
              </div>
              <div className="qcard__opts">
                <div className="qcard__opt"><span className="qcard__opt-letter">A</span>{t("perceivable")}</div>
                <div className="qcard__opt"><span className="qcard__opt-letter">B</span>{t("operable")}</div>
                <div className="qcard__opt qcard__opt--correct"><span className="qcard__opt-letter">C</span>{t("predictable")}</div>
                <div className="qcard__opt"><span className="qcard__opt-letter">D</span>{t("robust")}</div>
              </div>
            </div>

            <div className="showcase__card showcase__card--mini">
              <div style={{ fontSize: "var(--fs-xs)", color: "var(--fg-subtle)", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 6 }}>
                {t("today")}
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 8 }}>
                <span style={{ fontSize: "var(--fs-2xl)", fontWeight: 700, letterSpacing: "-0.02em" }}>68</span>
                <span style={{ color: "var(--fg-muted)", fontWeight: 600 }}>%</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: "68%" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: "var(--fs-xs)", color: "var(--fg-subtle)" }}>
                <span>{t("3450Cards")}</span>
                <span>{t("3Streak")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
