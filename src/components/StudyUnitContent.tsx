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

      <div className="bilingual-card__cols">
        {/* Korean column */}
        <div className="bilingual-card__col bilingual-card__col--ko">
          <h4>
            한국어 해설 <span className="lang-pill">KO</span>
          </h4>

          {/* Summary */}
          <p style={{ borderLeft: "3px solid var(--accent)", paddingLeft: "var(--space-3)", color: "var(--fg-muted)", marginBottom: "var(--space-4)" }}>
            {unit.summary.ko}
          </p>

          {/* Objectives */}
          {unit.objectives.ko.length > 0 && (
            <>
              <p style={{ fontSize: "var(--fs-xs)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--fg-subtle)", marginBottom: "var(--space-2)" }}>
                {isKo ? "학습 목표" : "Objectives"}
              </p>
              {unit.objectives.ko.map((obj, i) => (
                <p key={i} style={{ display: "flex", gap: 8 }}>
                  <span aria-hidden="true" style={{ color: "var(--accent)", flexShrink: 0 }}>•</span>
                  {obj}
                </p>
              ))}
            </>
          )}

          {/* Content */}
          {unit.content.ko.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* English column */}
        <div className="bilingual-card__col bilingual-card__col--en">
          <h4>
            Original Text <span className="lang-pill">EN</span>
          </h4>

          {/* Summary */}
          <p style={{ borderLeft: "3px solid var(--border-strong)", paddingLeft: "var(--space-3)", marginBottom: "var(--space-4)" }}>
            {unit.summary.en}
          </p>

          {/* Objectives */}
          {unit.objectives.en.length > 0 && (
            <>
              <p style={{ fontSize: "var(--fs-xs)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--fg-subtle)", marginBottom: "var(--space-2)" }}>
                Learning Objectives
              </p>
              {unit.objectives.en.map((obj, i) => (
                <p key={i} style={{ display: "flex", gap: 8 }}>
                  <span aria-hidden="true" style={{ color: "var(--fg-subtle)", flexShrink: 0 }}>•</span>
                  {obj}
                </p>
              ))}
            </>
          )}

          {/* Content */}
          {unit.content.en.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
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
