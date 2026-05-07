"use client";

import { useEffect } from "react";
import type { QuizQuestion } from "@/lib/content/types";
import BilingualText from "@/components/BilingualText";

interface Props {
  question: QuizQuestion;
  index: number;
  total: number;
  isFlipped: boolean;
  onFlip: () => void;
  onPrev: () => void;
  onNext: () => void;
  onRate?: (rating: "again" | "hard" | "good" | "easy") => void;
  locale: string;
  accentColor?: "blue" | "violet";
}

export default function FlashcardCard({
  question: q,
  index,
  total,
  isFlipped,
  onFlip,
  onPrev,
  onNext,
  onRate,
  locale,
}: Props) {
  const isKo = locale === "ko";

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        onFlip();
      } else if (e.key === "ArrowRight") {
        onNext();
      } else if (e.key === "ArrowLeft") {
        onPrev();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onFlip, onNext, onPrev]);

  const rateLabels = {
    again: { ko: "다시", en: "Again", hint: { ko: "잘 모름", en: "Forgot" } },
    hard: { ko: "어려움", en: "Hard", hint: { ko: "힘들었음", en: "Difficult" } },
    good: { ko: "알았음", en: "Good", hint: { ko: "정답!", en: "Got it!" } },
    easy: { ko: "쉬움", en: "Easy", hint: { ko: "완벽", en: "Perfect" } },
  } as const;

  return (
    <article aria-label={`${isKo ? "플래시카드" : "Flashcard"} ${index + 1} / ${total}`}>
      <div
        className={`flash-card${isFlipped ? " is-flipped" : ""}`}
        onClick={onFlip}
        role="button"
        tabIndex={0}
        aria-pressed={isFlipped}
        aria-label={isFlipped ? (isKo ? "카드 앞면 보기" : "Show question") : (isKo ? "정답 보기" : "Reveal answer")}
      >
        <div className="flash-card__inner" aria-hidden={isFlipped}>
          {/* Front */}
          <div className="flash-card__face">
            <div className="flash-card__label">{isKo ? "문제" : "QUESTION"}</div>
            <div className="flash-card__term">
              <BilingualText field={q.question} variant="heading" as="span" />
            </div>
            <div className="flash-card__hint">{isKo ? "클릭하여 정답 확인" : "Click to reveal answer"}</div>
          </div>

          {/* Back */}
          <div className="flash-card__face flash-card__face--back" aria-hidden={!isFlipped}>
            <div className="flash-card__label">{isKo ? "정답" : "ANSWER"}</div>
            <div className="flash-card__term">
              <span style={{ fontWeight: 700, color: "var(--fg-subtle)", marginRight: 6 }}>
                {q.answer.toUpperCase()}.
              </span>
              <BilingualText field={q.options[q.answer]} variant="heading" as="span" />
            </div>
            <div className="flash-card__def">
              <BilingualText field={q.explanation} variant="body" as="span" />
            </div>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div
        className="progress-track"
        style={{ width: "100%", maxWidth: 720, margin: "var(--space-3) auto 0" }}
        role="progressbar"
        aria-valuenow={index + 1}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={isKo ? `${index + 1}/${total} 카드` : `Card ${index + 1} of ${total}`}
      >
        <div className="progress-fill" style={{ width: `${((index + 1) / total) * 100}%` }} />
      </div>

      {/* Rate buttons (shown after flip) */}
      {isFlipped && onRate ? (
        <div className="flash-rate" style={{ justifyContent: "center" }}>
          {(["again", "hard", "good", "easy"] as const).map((r) => (
            <button
              key={r}
              type="button"
              className={`flash-rate__${r}`}
              onClick={() => onRate(r)}
              aria-label={`${isKo ? rateLabels[r].ko : rateLabels[r].en} — ${isKo ? rateLabels[r].hint.ko : rateLabels[r].hint.en}`}
            >
              {isKo ? rateLabels[r].ko : rateLabels[r].en}
              <small>{isKo ? rateLabels[r].hint.ko : rateLabels[r].hint.en}</small>
            </button>
          ))}
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center", gap: "var(--space-3)", marginTop: "var(--space-4)" }}>
          <button
            type="button"
            className="btn"
            onClick={onPrev}
            disabled={index === 0}
            aria-label={isKo ? "이전 카드" : "Previous card"}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            {isKo ? "이전" : "Prev"}
          </button>
          <button
            type="button"
            className="btn btn--primary"
            onClick={onFlip}
            aria-pressed={isFlipped}
          >
            {isKo ? "정답 보기" : "Reveal Answer"}
          </button>
          <button
            type="button"
            className="btn"
            onClick={onNext}
            disabled={index === total - 1}
            aria-label={isKo ? "다음 카드" : "Next card"}
          >
            {isKo ? "다음" : "Next"}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      )}
    </article>
  );
}
