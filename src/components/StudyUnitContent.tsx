"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import type { StudyUnit, UnitReference } from "@/lib/content/types";
import AddWordButton from "@/components/dictionary/AddWordButton";

interface Props {
  unit: StudyUnit;
  locale: string;
  prevUnit?: { id: string; title: { ko: string; en: string } } | null;
  nextUnit?: { id: string; title: { ko: string; en: string } } | null;
  exam: "cpacc" | "was";
}

function ReferencesBlock({ refs, locale }: { refs: UnitReference[]; locale: string }) {
  const t = useTranslations("cert");
  const isKo = locale === "ko";
  return (
    <aside className="bilingual-card__refs" aria-label={t("references")}>
      <span className="bilingual-card__refs-label">{t("references")}</span>
      <ul>
        {refs.map((ref) => (
          <li key={ref.url}>
            <a href={ref.url} target="_blank" rel="noopener noreferrer">
              {isKo ? ref.label.ko : ref.label.en}
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              <span className="sr-only">({t("externalLink")})</span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
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
        {/* 본문 텍스트를 드래그한 뒤 누르면 선택 텍스트가 단어란에 프리필됨 */}
        <AddWordButton small />
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

        {/* Content — sections가 있으면 소제목+문단 쌍, 없으면 문단 쌍
            (ko/en 배열 길이는 validate-content가 일치 보장) */}
        {unit.sections
          ? unit.sections.map((section, si) => (
              <div key={si} style={{ display: "contents" }}>
                <div className="bilingual-pair">
                  <h2 className="bilingual-card__section-head" lang="ko">
                    {section.heading.ko}
                  </h2>
                  <h2 className="bilingual-card__section-head bilingual-card__section-head--en" lang="en">
                    {section.heading.en}
                  </h2>
                </div>
                {section.paragraphs.ko.map((para, i) => (
                  <div className="bilingual-pair" key={i}>
                    <p lang="ko">{para}</p>
                    <p lang="en">{section.paragraphs.en[i] ?? ""}</p>
                  </div>
                ))}
                {section.references && section.references.length > 0 && (
                  <ReferencesBlock refs={section.references} locale={locale} />
                )}
              </div>
            ))
          : unit.content.ko.map((para, i) => (
              <div className="bilingual-pair" key={i}>
                <p lang="ko">{para}</p>
                <p lang="en">{unit.content.en[i] ?? ""}</p>
              </div>
            ))}
      </div>

      {unit.references && unit.references.length > 0 && (
        <ReferencesBlock refs={unit.references} locale={locale} />
      )}

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
