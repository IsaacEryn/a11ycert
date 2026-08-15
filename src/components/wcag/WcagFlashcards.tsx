"use client";

import { useState, useMemo, useCallback } from "react";
import { useTranslations } from "next-intl";
import { isDue, type SrsGrade } from "@/lib/srs/leitner";
import { useLearningStore } from "@/lib/store/learningStore";
import { useOptionalAuth } from "@/lib/auth/AuthProvider";
import { syncSrsCardToDB } from "@/lib/store/learning-sync";
import type { WcagCriterion } from "@/lib/content/wcag-criteria";

type Mode = "all" | "review";

/**
 * WCAG 성공기준 덱 — 앞면 번호+제목, 뒷면 요약.
 * Leitner 엔진과 flash-card 스타일은 자격증·사전 덱과 공유한다.
 */
export default function WcagFlashcards({
  criteria,
  locale,
}: {
  criteria: WcagCriterion[];
  locale: string;
}) {
  const t = useTranslations("wcag");
  const td = useTranslations("dictionary");
  const isKo = locale === "ko";

  const gradeFlashcard = useLearningStore((s) => s.gradeFlashcard);
  const srsMap = useLearningStore((s) => s.perCert.wcag?.srs);
  const auth = useOptionalAuth();

  const [mode, setMode] = useState<Mode>("all");
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  // 이번 세션에서 "알았음" 처리한 카드 — 복습 큐에서 제외
  const [reviewedGood, setReviewedGood] = useState<Set<string>>(new Set());

  const dueTotal = useMemo(
    () => criteria.filter((c) => isDue(srsMap?.[c.id]) && !reviewedGood.has(c.id)).length,
    [criteria, srsMap, reviewedGood]
  );

  const deck = useMemo(() => {
    if (mode === "review")
      return criteria.filter((c) => isDue(srsMap?.[c.id]) && !reviewedGood.has(c.id));
    return criteria;
  }, [criteria, srsMap, mode, reviewedGood]);

  const safeIndex = Math.min(index, Math.max(deck.length - 1, 0));
  const card = deck[safeIndex];

  const goNext = useCallback(() => {
    setFlipped(false);
    setIndex((i) => Math.min(i + 1, Math.max(deck.length - 1, 0)));
  }, [deck.length]);

  const goPrev = useCallback(() => {
    setFlipped(false);
    setIndex((i) => Math.max(i - 1, 0));
  }, []);

  const handleRate = (grade: SrsGrade) => {
    if (!card) return;
    const next = gradeFlashcard("wcag", card.id, grade);
    const userId = auth?.user?.id;
    if (userId) {
      void syncSrsCardToDB(userId, "wcag", card.id, next.box, next.due);
    }
    if (grade === "good") {
      setReviewedGood((prev) => new Set(prev).add(card.id));
      // 복습 모드에서는 카드가 큐에서 빠지므로 인덱스 유지가 곧 다음 카드
      if (mode === "review") {
        setFlipped(false);
        setIndex((i) => Math.min(i, Math.max(deck.length - 2, 0)));
        return;
      }
    }
    goNext();
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--space-3)",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          role="group"
          aria-label={td("modeLabel")}
          className="glossary-filter"
          style={{ marginTop: 0 }}
        >
          <button
            type="button"
            aria-pressed={mode === "all"}
            onClick={() => {
              setMode("all");
              setIndex(0);
              setFlipped(false);
            }}
          >
            {td("modeAll")}
          </button>
          <button
            type="button"
            aria-pressed={mode === "review"}
            onClick={() => {
              setMode("review");
              setIndex(0);
              setFlipped(false);
            }}
          >
            {td("modeReview")}
          </button>
        </div>
        <span style={{ fontSize: "var(--fs-xs)", color: "var(--fg-subtle)" }}>
          {td("dueCount", { count: dueTotal })}
        </span>
      </div>

      {deck.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            padding: "var(--space-10) var(--space-4)",
            color: "var(--fg-muted)",
            fontSize: "var(--fs-sm)",
          }}
        >
          {t("deckNoDue")}
        </p>
      ) : card ? (
        <div style={{ marginTop: "var(--space-6)" }}>
          <article aria-label={td("cardProgress", { current: safeIndex + 1, total: deck.length })}>
            <div
              className={`flash-card${flipped ? " is-flipped" : ""}`}
              onClick={() => setFlipped((f) => !f)}
              onKeyDown={(e) => {
                if (e.key === " " || e.key === "Enter") {
                  e.preventDefault();
                  setFlipped((f) => !f);
                }
              }}
              role="button"
              tabIndex={0}
              aria-pressed={flipped}
              aria-label={flipped ? t("deckShowFront") : t("deckShowBack")}
            >
              <div className="flash-card__inner" aria-hidden={flipped}>
                <div className="flash-card__face">
                  <div className="flash-card__label">{t("deckFrontLabel")}</div>
                  <div className="flash-card__term">
                    <span style={{ fontVariantNumeric: "tabular-nums" }}>{card.num}</span>{" "}
                    {isKo ? card.title.ko : card.title.en}
                  </div>
                  <div className="flash-card__hint">{t("deckFlipHint")}</div>
                </div>
                <div className="flash-card__face flash-card__face--back" aria-hidden={!flipped}>
                  <div className="flash-card__label">{t("deckBackLabel")}</div>
                  <div className="flash-card__def" style={{ marginTop: 0 }}>
                    <p style={{ margin: 0 }}>{isKo ? card.summary.ko : card.summary.en}</p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="progress-track"
              style={{ width: "100%", maxWidth: 720, margin: "var(--space-3) auto 0" }}
              role="progressbar"
              aria-valuenow={safeIndex + 1}
              aria-valuemin={1}
              aria-valuemax={deck.length}
              aria-label={td("cardProgress", { current: safeIndex + 1, total: deck.length })}
            >
              <div
                className="progress-fill"
                style={{ width: `${((safeIndex + 1) / deck.length) * 100}%` }}
              />
            </div>

            {flipped ? (
              <div className="flash-rate" style={{ justifyContent: "center" }}>
                <button
                  type="button"
                  className="flash-rate__again"
                  onClick={() => handleRate("again")}
                  aria-label={`${td("rateAgain")} — ${td("rateAgainHint")}`}
                >
                  {td("rateAgain")}
                  <small>{td("rateAgainHint")}</small>
                </button>
                <button
                  type="button"
                  className="flash-rate__good"
                  onClick={() => handleRate("good")}
                  aria-label={`${td("rateGood")} — ${td("rateGoodHint")}`}
                >
                  {td("rateGood")}
                  <small>{td("rateGoodHint")}</small>
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "var(--space-3)",
                  marginTop: "var(--space-4)",
                }}
              >
                <button type="button" className="btn" onClick={goPrev} disabled={safeIndex === 0}>
                  {td("prevCard")}
                </button>
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={() => setFlipped(true)}
                  aria-pressed={flipped}
                >
                  {t("deckShowBack")}
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={goNext}
                  disabled={safeIndex === deck.length - 1}
                >
                  {td("nextCard")}
                </button>
              </div>
            )}
          </article>
        </div>
      ) : null}
    </div>
  );
}
