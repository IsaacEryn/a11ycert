"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useLearningStore } from "@/lib/store/learningStore";

interface Props {
  locale: string;
  isKo: boolean;
}

const CPACC_TOTAL_UNITS = 11;
const WAS_TOTAL_UNITS = 10;

const cpaccTopics = {
  ko: [
    "장애 인식 · 보조 기술 (40%)",
    "접근성 가이드라인 · 법 · 관리 (40%)",
    "모든 분야 접근성 (디지털·환경·정책) (20%)",
  ],
  en: [
    "Disabilities & Assistive Technologies (40%)",
    "Accessibility Guidelines, Law & Management (40%)",
    "Universal Accessibility (Digital, Physical, Policy) (20%)",
  ],
};

const wasTopics = {
  ko: [
    "WCAG 적용 · 코드 검증 (40%)",
    "접근성 있는 코드 작성 · ARIA (40%)",
    "접근성 테스트 · 검수 절차 (20%)",
  ],
  en: [
    "WCAG Application & Code Validation (40%)",
    "Accessible Code & ARIA (40%)",
    "Accessibility Testing & Audit Process (20%)",
  ],
};

export default function HomeCerts({ locale, isKo }: Props) {
  const t = useTranslations("homeUi");
  const { getCompletedCount } = useLearningStore();
  const cpaccDone = getCompletedCount("cpacc");
  const wasDone = getCompletedCount("was");

  const lang = (isKo ? "ko" : "en") as "ko" | "en";
  const startLabel = t("startLearning");
  const quizLabel = t("mockQuiz");
  const flashLabel = t("flashcards");
  const progressLabel = t("progress");
  const topicsLabel = t("keyDomains");

  return (
    <div className="cert-grid">
      {/* CPACC */}
      <article className="cert-card" aria-labelledby="cert-cpacc-name">
        <div className="cert-card__top">
          <div>
            <div className="cert-card__id">CERT · 01</div>
            <h3 id="cert-cpacc-name" className="cert-card__name">CPACC</h3>
            <div className="cert-card__name-en">Certified Professional in Accessibility Core Competencies</div>
          </div>
          <span className="cert-card__level cert-card__level--core">{t("core")}</span>
        </div>

        <p className="cert-card__desc">
          {t("entryLevelCertificationCovering")}
        </p>

        <dl className="cert-card__meta">
          <div className="cert-card__meta-item">
            <dt className="cert-card__meta-label">{t("questions")}</dt>
            <dd className="cert-card__meta-value">100</dd>
          </div>
          <div className="cert-card__meta-item">
            <dt className="cert-card__meta-label">{t("passing")}</dt>
            <dd className="cert-card__meta-value">600/800</dd>
          </div>
          <div className="cert-card__meta-item">
            <dt className="cert-card__meta-label">{t("time")}</dt>
            <dd className="cert-card__meta-value">{t("2h")}</dd>
          </div>
        </dl>

        <div className="cert-card__topics">
          <div className="cert-card__topics-label">{topicsLabel}</div>
          {cpaccTopics[lang].map((t) => (
            <div key={t} className="cert-card__topic">
              <span className="cert-card__topic-dot" />
              {t}
            </div>
          ))}
        </div>

        {cpaccDone > 0 && (
          <div className="cert-card__progress" role="group" aria-label={`CPACC ${progressLabel}`}>
            <span style={{ fontSize: "var(--fs-xs)", color: "var(--fg-subtle)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              {progressLabel}
            </span>
            <div className="progress-track" aria-hidden="true">
              <div className="progress-fill" style={{ width: `${(cpaccDone / CPACC_TOTAL_UNITS) * 100}%` }} />
            </div>
            <span className="cert-card__progress-num">{cpaccDone} / {CPACC_TOTAL_UNITS}</span>
          </div>
        )}

        <div className="cert-card__cta">
          <Link className="btn btn--primary" href={`/${locale}/cpacc/study`}>{startLabel}</Link>
          <Link className="btn" href={`/${locale}/cpacc/quiz`}>{quizLabel}</Link>
          <Link className="btn btn--ghost" href={`/${locale}/cpacc/flashcards`}>{flashLabel}</Link>
        </div>
      </article>

      {/* WAS */}
      <article className="cert-card" aria-labelledby="cert-was-name">
        <div className="cert-card__top">
          <div>
            <div className="cert-card__id">CERT · 02</div>
            <h3 id="cert-was-name" className="cert-card__name">WAS</h3>
            <div className="cert-card__name-en">Web Accessibility Specialist</div>
          </div>
          <span className="cert-card__level cert-card__level--spec">{t("specialist")}</span>
        </div>

        <p className="cert-card__desc">
          {t("technicalCertificationForWeb")}
        </p>

        <dl className="cert-card__meta">
          <div className="cert-card__meta-item">
            <dt className="cert-card__meta-label">{t("questions")}</dt>
            <dd className="cert-card__meta-value">75</dd>
          </div>
          <div className="cert-card__meta-item">
            <dt className="cert-card__meta-label">{t("passing")}</dt>
            <dd className="cert-card__meta-value">65%</dd>
          </div>
          <div className="cert-card__meta-item">
            <dt className="cert-card__meta-label">{t("time")}</dt>
            <dd className="cert-card__meta-value">{t("90m")}</dd>
          </div>
        </dl>

        <div className="cert-card__topics">
          <div className="cert-card__topics-label">{topicsLabel}</div>
          {wasTopics[lang].map((t) => (
            <div key={t} className="cert-card__topic">
              <span className="cert-card__topic-dot" />
              {t}
            </div>
          ))}
        </div>

        {wasDone > 0 && (
          <div className="cert-card__progress" role="group" aria-label={`WAS ${progressLabel}`}>
            <span style={{ fontSize: "var(--fs-xs)", color: "var(--fg-subtle)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              {progressLabel}
            </span>
            <div className="progress-track" aria-hidden="true">
              <div className="progress-fill" style={{ width: `${(wasDone / WAS_TOTAL_UNITS) * 100}%` }} />
            </div>
            <span className="cert-card__progress-num">{wasDone} / {WAS_TOTAL_UNITS}</span>
          </div>
        )}

        <div className="cert-card__cta">
          <Link className="btn btn--primary" href={`/${locale}/was/study`}>{startLabel}</Link>
          <Link className="btn" href={`/${locale}/was/quiz`}>{quizLabel}</Link>
          <Link className="btn btn--ghost" href={`/${locale}/was/flashcards`}>{flashLabel}</Link>
        </div>
      </article>
    </div>
  );
}
