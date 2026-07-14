"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import type { QuizQuestion } from "@/lib/content/types";
import { useLearningStore } from "@/lib/store/learningStore";
import { useOptionalAuth } from "@/lib/auth/AuthProvider";
import { consumeQuizUsage, type LimitCheckResult } from "@/lib/limits/usage-limiter";
import { LIMITS_CONFIG } from "@/lib/limits/config";
import UsageLimitBanner from "@/components/limits/UsageLimitBanner";
import {
  syncWrongAnswerToDB,
  removeWrongAnswerFromDB,
  syncSavedQuestionToDB,
  removeSavedQuestionFromDB,
  syncAttemptToDB,
} from "@/lib/store/learning-sync";
import { computeDomainStats } from "@/lib/quiz/mock-exam";
import BilingualText from "@/components/BilingualText";

interface Props {
  questions: QuizQuestion[];
  locale: string;
  exam: "cpacc" | "was";
}

const OPTS = ["a", "b", "c", "d"] as const;

export default function QuizPageClient({ questions, locale, exam }: Props) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<"a" | "b" | "c" | "d" | null>(null);
  const [answers, setAnswers] = useState<Record<number, "a" | "b" | "c" | "d">>({});
  const [done, setDone] = useState(false);

  const questionRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const { saveQuestion, unsaveQuestion, addWrongAnswer, removeWrongAnswer, isSaved, getWrongNotes, languageMode, recordAttempt } =
    useLearningStore();
  const startedAtRef = useRef<number>(Date.now());
  const auth = useOptionalAuth();
  const userId = auth?.user?.id ?? null;
  const isKo = locale === "ko";

  // 일일 사용량 소비 (LIMITS_CONFIG.enabled가 false이면 항상 허용)
  const [limitState, setLimitState] = useState<LimitCheckResult | null>(null);
  useEffect(() => {
    if (!userId || !LIMITS_CONFIG.enabled) return;
    let cancelled = false;
    consumeQuizUsage(userId).then((result) => {
      if (!cancelled) setLimitState(result);
    });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const total = questions.length;
  const q = questions[current];

  if (total === 0) {
    return (
      <div className="quiz-shell">
        <div className="container">
          <div className="quiz-card" style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
            <p className="quiz-q">{isKo ? "출제 가능한 문항이 없습니다" : "No questions available"}</p>
            <p style={{ color: "var(--fg-muted)", fontSize: "var(--fs-sm)", marginTop: "var(--space-2)" }}>
              {isKo
                ? "학습 단원을 먼저 완료하거나 잠시 후 다시 시도해주세요."
                : "Complete a study unit first, or try again later."}
            </p>
            <div style={{ marginTop: "var(--space-5)" }}>
              <Link className="btn btn--primary" href={`/${locale}/${exam}/study`}>
                {isKo ? "학습 로드맵으로" : "Go to Study Roadmap"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  // 일일 한도 초과 시 퀴즈 대신 안내 배너 표시
  if (limitState && !limitState.allowed) {
    return (
      <div className="quiz-shell">
        <div className="container">
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <UsageLimitBanner
              type="quiz"
              remaining={limitState.remaining}
              limit={limitState.limit}
              locale={locale}
            />
          </div>
        </div>
      </div>
    );
  }

  const answered = selected !== null;
  const correctCount = questions.filter((_, i) => answers[i] === questions[i].answer).length;

  const wrongInSession = questions.filter((_, i) => answers[i] && answers[i] !== questions[i].answer);
  const allWrong = getWrongNotes(exam);
  const savedIds = questions.filter((q) => isSaved(exam, q.id));

  const handleSelect = (key: "a" | "b" | "c" | "d") => {
    if (answered) return;
    setSelected(key);
    setAnswers((prev) => ({ ...prev, [current]: key }));
    if (key !== q.answer) {
      addWrongAnswer(exam, q.id);
      if (userId) syncWrongAnswerToDB(userId, q.id, key);
    } else {
      removeWrongAnswer(exam, q.id);
      if (userId) removeWrongAnswerFromDB(userId, q.id);
    }
  };

  const handleNext = () => {
    if (current < total - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      requestAnimationFrame(() => questionRef.current?.focus());
    } else {
      // 시도 이력 기록 (성취도 분석용)
      const finalAnswers = { ...answers };
      const correct = questions.filter((q, i) => finalAnswers[i] === q.answer).length;
      const attempt = {
        id: crypto.randomUUID(),
        mode: "practice" as const,
        total: questions.length,
        correct,
        durationSeconds: Math.round((Date.now() - startedAtRef.current) / 1000),
        domainStats: computeDomainStats(questions, finalAnswers),
        createdAt: new Date().toISOString(),
      };
      recordAttempt(exam, attempt);
      if (userId) {
        syncAttemptToDB(userId, exam, {
          mode: attempt.mode,
          total: attempt.total,
          correct: attempt.correct,
          durationSeconds: attempt.durationSeconds,
          domainStats: attempt.domainStats,
        });
      }
      setDone(true);
      requestAnimationFrame(() => summaryRef.current?.focus());
    }
  };

  const handleRetry = () => {
    setCurrent(0);
    setSelected(null);
    setAnswers({});
    setDone(false);
    startedAtRef.current = Date.now();
    requestAnimationFrame(() => questionRef.current?.focus());
  };

  const toggleSave = () => {
    if (isSaved(exam, q.id)) {
      unsaveQuestion(exam, q.id);
      if (userId) removeSavedQuestionFromDB(userId, q.id);
    } else {
      saveQuestion(exam, q.id);
      if (userId) syncSavedQuestionToDB(userId, q.id);
    }
  };

  if (done) {
    return (
      <div className="quiz-shell">
        <div className="container">
          <div
            ref={summaryRef}
            tabIndex={-1}
            style={{ maxWidth: 640, margin: "0 auto" }}
            className="quiz-card"
          >
            <div className="quiz-card__top">
              <div className="quiz-card__tags">
                <span className="tag tag--accent">{isKo ? "완료" : "Finished"}</span>
              </div>
            </div>
            <p className="quiz-q">
              {isKo ? "퀴즈 완료" : "Quiz Complete"}
            </p>
            <div style={{ margin: "var(--space-5) 0", fontSize: "var(--fs-3xl)", fontWeight: 700, letterSpacing: "-0.03em" }}>
              {correctCount}
              <span style={{ fontSize: "var(--fs-lg)", color: "var(--fg-muted)", fontWeight: 500 }}>
                {" "}/ {total}
              </span>
            </div>
            <div className="progress-track" style={{ marginBottom: "var(--space-5)" }}>
              <div className="progress-fill" style={{ width: `${(correctCount / total) * 100}%` }} />
            </div>
            <div className="quiz-foot">
              <div className="quiz-foot__keys">
                <span style={{ color: "var(--fg-muted)", fontSize: "var(--fs-sm)" }}>
                  {isKo ? `정답률 ${Math.round((correctCount / total) * 100)}%` : `${Math.round((correctCount / total) * 100)}% accuracy`}
                </span>
              </div>
              <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
                <button className="btn" onClick={handleRetry}>
                  {isKo ? "다시 풀기" : "Retry"}
                </button>
                {correctCount < total && (
                  <Link className="btn btn--primary" href={`/${locale}/${exam}/wrong-answers`}>
                    {isKo ? "오답노트 보기" : "Wrong Answers"}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-shell">
      <div className="container">
        {/* Toolbar */}
        <div className="quiz-toolbar">
          <div className="quiz-toolbar__progress">
            <span className="quiz-toolbar__step">{current + 1} / {total}</span>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${((current + 1) / total) * 100}%` }}
                role="progressbar"
                aria-valuenow={current + 1}
                aria-valuemin={1}
                aria-valuemax={total}
                aria-label={isKo ? `${current + 1}/${total} 문항` : `${current + 1} of ${total}`}
              />
            </div>
          </div>
          <div style={{ display: "flex", gap: "var(--space-3)", alignItems: "center" }}>
            {wrongInSession.length > 0 && (
              <span style={{ fontSize: "var(--fs-xs)", color: "var(--danger)", fontWeight: 600 }}>
                {isKo ? `오답 ${wrongInSession.length}` : `${wrongInSession.length} wrong`}
              </span>
            )}
          </div>
        </div>

        {/* Grid */}
        <div className="quiz-grid">
          {/* Quiz card */}
          <div
            ref={questionRef}
            className="quiz-card"
            tabIndex={-1}
            style={{ outline: "none" }}
          >
            <div className="quiz-card__top">
              <div className="quiz-card__tags">
                <span className="tag">{exam.toUpperCase()}</span>
              </div>
              <button
                className="quiz-card__bookmark"
                type="button"
                onClick={toggleSave}
                aria-pressed={isSaved(exam, q.id)}
                aria-label={isSaved(exam, q.id) ? (isKo ? "저장 취소" : "Unsave") : (isKo ? "저장" : "Save")}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill={isSaved(exam, q.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
                {isSaved(exam, q.id) ? (isKo ? "저장됨" : "Saved") : (isKo ? "저장" : "Save")}
              </button>
            </div>

            <p className="quiz-q">
              <BilingualText field={q.question} variant="heading" as="span" />
            </p>

            <div className="quiz-options">
              {OPTS.map((key) => {
                let cls = "quiz-option";
                if (answered) {
                  if (key === q.answer) cls += " is-correct";
                  else if (key === selected) cls += " is-incorrect";
                } else if (key === selected) {
                  cls += " is-selected";
                }

                const stateLabel = answered
                  ? key === q.answer
                    ? isKo ? " (정답)" : " (Correct)"
                    : key === selected
                      ? isKo ? " (오답)" : " (Wrong)"
                      : ""
                  : "";

                const srText = languageMode === "en-only" ? q.options[key].en : q.options[key].ko;

                return (
                  <button
                    key={key}
                    type="button"
                    className={cls}
                    onClick={() => handleSelect(key)}
                    disabled={answered}
                    aria-label={`${key.toUpperCase()}. ${srText}${stateLabel}`}
                  >
                    <span className="quiz-option__letter">{key.toUpperCase()}</span>
                    <span className="quiz-option__text">
                      <BilingualText field={q.options[key]} variant="option" as="span" aria-hidden="true" />
                    </span>
                    {answered && key === q.answer && (
                      <span className="quiz-option__icon" aria-hidden="true">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                    )}
                    {answered && key === selected && key !== q.answer && (
                      <span className="quiz-option__icon" aria-hidden="true">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {answered && (
              <div className={`quiz-explain${selected !== q.answer ? "" : ""}`} role="alert">
                <div className={`quiz-explain__head${selected !== q.answer ? " is-incorrect" : ""}`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {selected === q.answer
                      ? <polyline points="20 6 9 17 4 12" />
                      : <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                    }
                  </svg>
                  {selected === q.answer
                    ? (isKo ? "정답입니다!" : "Correct!")
                    : (isKo ? "오답입니다." : "Incorrect.")}
                </div>
                <div className="quiz-explain__body">
                  <BilingualText field={q.explanation} variant="body" as="p" />
                </div>
              </div>
            )}

            <div className="quiz-foot">
              <div className="quiz-foot__keys">
                <span className="kbd">A</span><span className="kbd">B</span>
                <span className="kbd">C</span><span className="kbd">D</span>
                <span style={{ marginLeft: 4 }}>{isKo ? "선택" : "select"}</span>
              </div>
              <div style={{ display: "flex", gap: "var(--space-2)" }}>
                {answered && (
                  <button className="btn btn--primary" onClick={handleNext}>
                    {current < total - 1
                      ? (isKo ? "다음 문제" : "Next")
                      : (isKo ? "결과 보기" : "See Results")}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Wrong answers aside */}
          <div>
            <div className="aside-card">
              <div className="aside-card__head">
                <div>
                  <div className="aside-card__title">
                    {isKo ? "이번 세션 오답" : "Session Errors"}
                  </div>
                  <div className="aside-card__sub">
                    {wrongInSession.length > 0
                      ? (isKo ? `${wrongInSession.length}문제` : `${wrongInSession.length} questions`)
                      : (isKo ? "아직 없음" : "None yet")}
                  </div>
                </div>
              </div>
              {wrongInSession.length > 0 && (
                <ul className="wrong-list">
                  {wrongInSession.slice(0, 6).map((q, i) => (
                    <li key={q.id} className="wrong-list__item">
                      <span className="wrong-list__num">{String(i + 1).padStart(2, "0")}</span>
                      <div className="wrong-list__q">
                        <div className="wrong-list__cat">{isKo ? "오답" : "WRONG"}</div>
                        <BilingualText field={q.question} variant="label" as="span" />
                      </div>
                    </li>
                  ))}
                  {wrongInSession.length > 6 && (
                    <li style={{ fontSize: "var(--fs-xs)", color: "var(--fg-subtle)", padding: "var(--space-2) var(--space-3)" }}>
                      +{wrongInSession.length - 6} {isKo ? "더" : "more"}
                    </li>
                  )}
                </ul>
              )}
            </div>

            <div className="aside-card" style={{ marginTop: "var(--space-3)" }}>
              <div className="aside-card__head">
                <div>
                  <div className="aside-card__title">{isKo ? "빠른 이동" : "Quick Links"}</div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
                <Link className="btn btn--sm" href={`/${locale}/${exam}/study`} style={{ justifyContent: "flex-start" }}>
                  {isKo ? "학습 로드맵" : "Study Roadmap"}
                </Link>
                <Link className="btn btn--sm" href={`/${locale}/${exam}/flashcards`} style={{ justifyContent: "flex-start" }}>
                  {isKo ? "플래시카드" : "Flashcards"}
                </Link>
                {allWrong.length > 0 && (
                  <Link className="btn btn--sm" href={`/${locale}/${exam}/wrong-answers`} style={{ justifyContent: "flex-start" }}>
                    {isKo ? `오답노트 (${allWrong.length})` : `Wrong Notes (${allWrong.length})`}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
