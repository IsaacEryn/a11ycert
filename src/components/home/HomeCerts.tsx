"use client";

import Link from "next/link";
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
  const { getCompletedCount } = useLearningStore();
  const cpaccDone = getCompletedCount("cpacc");
  const wasDone = getCompletedCount("was");

  const lang = isKo ? "ko" : "en";
  const startLabel = isKo ? "학습 시작" : "Start Learning";
  const quizLabel = isKo ? "모의 퀴즈" : "Mock Quiz";
  const flashLabel = isKo ? "플래시카드" : "Flashcards";
  const progressLabel = isKo ? "진행" : "Progress";
  const topicsLabel = isKo ? "주요 영역" : "Key Domains";

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
          <span className="cert-card__level cert-card__level--core">{isKo ? "코어 입문" : "Core"}</span>
        </div>

        <p className="cert-card__desc">
          {isKo
            ? "접근성 분야의 기초 자격증. 장애 인식, 보조 기술, 표준과 법, 모든 분야의 접근성 전략을 폭넓게 다룹니다."
            : "Entry-level certification covering disability awareness, assistive technology, standards, law, and universal accessibility strategy."}
        </p>

        <dl className="cert-card__meta">
          <div className="cert-card__meta-item">
            <dt className="cert-card__meta-label">{isKo ? "문항 수" : "Questions"}</dt>
            <dd className="cert-card__meta-value">100</dd>
          </div>
          <div className="cert-card__meta-item">
            <dt className="cert-card__meta-label">{isKo ? "합격선" : "Passing"}</dt>
            <dd className="cert-card__meta-value">600/800</dd>
          </div>
          <div className="cert-card__meta-item">
            <dt className="cert-card__meta-label">{isKo ? "제한 시간" : "Time"}</dt>
            <dd className="cert-card__meta-value">{isKo ? "2시간" : "2h"}</dd>
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
          <span className="cert-card__level cert-card__level--spec">{isKo ? "웹 전문" : "Specialist"}</span>
        </div>

        <p className="cert-card__desc">
          {isKo
            ? "웹 개발자·QA 대상 기술 자격증. WCAG 적용, ARIA, 코드 검증, 보조 기술을 활용한 실제 검수 능력을 평가합니다."
            : "Technical certification for web developers and QA. Tests WCAG application, ARIA, code validation, and real-world audit skills."}
        </p>

        <dl className="cert-card__meta">
          <div className="cert-card__meta-item">
            <dt className="cert-card__meta-label">{isKo ? "문항 수" : "Questions"}</dt>
            <dd className="cert-card__meta-value">75</dd>
          </div>
          <div className="cert-card__meta-item">
            <dt className="cert-card__meta-label">{isKo ? "합격선" : "Passing"}</dt>
            <dd className="cert-card__meta-value">65%</dd>
          </div>
          <div className="cert-card__meta-item">
            <dt className="cert-card__meta-label">{isKo ? "제한 시간" : "Time"}</dt>
            <dd className="cert-card__meta-value">{isKo ? "90분" : "90m"}</dd>
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
