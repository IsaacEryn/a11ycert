"use client";

import Link from "next/link";
import type { StudyUnit } from "@/lib/content/types";

interface Props {
  unit: StudyUnit;
  locale: string;
  prevUnit?: { id: string; title: { ko: string; en: string } } | null;
  nextUnit?: { id: string; title: { ko: string; en: string } } | null;
  exam: "cpacc" | "was";
}

export default function StudyUnitContent({ unit, locale, prevUnit, nextUnit, exam }: Props) {
  const isKo = locale === "ko";
  const unitNum = `${unit.domain}.${unit.order}`;

  return (
    <article className="bilingual-card" aria-labelledby="card-title">
      <div className="bilingual-card__head">
        <div>
          <div className="bilingual-card__num">UNIT · {unitNum}</div>
          <h1 className="bilingual-card__title" id="card-title">
            {unit.title.ko}
          </h1>
          <div className="bilingual-card__title-en">{unit.title.en}</div>
        </div>
      </div>

      {/* 문단 쌍(pair) 정렬 — 한글 문단과 대응 영어 문단이 같은 행에서 시작 */}
      <div className="bilingual-card__pairs">
        {/* 컬럼 헤더 */}
        <div className="bilingual-pair">
          <h4 className="bilingual-card__col-head">
            한국어 해설 <span className="lang-pill">KO</span>
          </h4>
          <h4 className="bilingual-card__col-head">
            Original Text <span className="lang-pill">EN</span>
          </h4>
        </div>

        {/* Summary */}
        <div className="bilingual-pair">
          <p lang="ko" style={{ borderLeft: "3px solid var(--accent)", paddingLeft: "var(--space-3)", color: "var(--fg-muted)" }}>
            {unit.summary.ko}
          </p>
          <p lang="en" style={{ borderLeft: "3px solid var(--border-strong)", paddingLeft: "var(--space-3)" }}>
            {unit.summary.en}
          </p>
        </div>

        {/* Objectives — 블록 단위 쌍 */}
        {(unit.objectives.ko.length > 0 || unit.objectives.en.length > 0) && (
          <div className="bilingual-pair">
            <div lang="ko">
              <p className="bilingual-card__label">{isKo ? "학습 목표" : "Objectives"}</p>
              {unit.objectives.ko.map((obj, i) => (
                <p key={i} style={{ display: "flex", gap: 8 }}>
                  <span aria-hidden="true" style={{ color: "var(--accent)", flexShrink: 0 }}>•</span>
                  {obj}
                </p>
              ))}
            </div>
            <div lang="en">
              <p className="bilingual-card__label">Learning Objectives</p>
              {unit.objectives.en.map((obj, i) => (
                <p key={i} style={{ display: "flex", gap: 8 }}>
                  <span aria-hidden="true" style={{ color: "var(--fg-subtle)", flexShrink: 0 }}>•</span>
                  {obj}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Content — 문단별 쌍 (ko/en 배열 길이는 validate-content가 일치 보장) */}
        {unit.content.ko.map((para, i) => (
          <div className="bilingual-pair" key={i}>
            <p lang="ko">{para}</p>
            <p lang="en">{unit.content.en[i] ?? ""}</p>
          </div>
        ))}
      </div>

      <div className="bilingual-card__nav">
        {prevUnit ? (
          <Link className="btn" href={`/${locale}/${exam}/study/${prevUnit.id}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            {isKo ? prevUnit.title.ko : prevUnit.title.en}
          </Link>
        ) : (
          <span />
        )}

        <div className="bilingual-card__nav-help">
          <span>
            <span className="kbd">←</span> <span className="kbd">→</span> {isKo ? "이동" : "Navigate"}
          </span>
        </div>

        {nextUnit ? (
          <Link className="btn btn--primary" href={`/${locale}/${exam}/study/${nextUnit.id}`}>
            {isKo ? nextUnit.title.ko : nextUnit.title.en}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        ) : (
          <span />
        )}
      </div>
    </article>
  );
}
