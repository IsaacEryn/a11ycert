"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import type { StudyUnit } from "@/lib/content/types";
import FlashcardCard from "@/components/FlashcardCard";
import { useLearningStore } from "@/lib/store/learningStore";
import { useOptionalAuth } from "@/lib/auth/AuthProvider";
import { syncSrsCardToDB } from "@/lib/store/learning-sync";
import { isDue } from "@/lib/srs/leitner";

interface Props {
  units: StudyUnit[];
  locale: string;
  exam: "cpacc" | "was";
}

type DomainFilter = "all" | 1 | 2 | 3;
type DeckMode = "all" | "review";

export default function FlashcardDeck({ units, locale, exam }: Props) {
  const t = useTranslations("flashcardsSrs");
  // 모의시험 약점 연계 딥링크(?domain=N) — useSearchParams 사용으로 페이지에서 Suspense 필요
  const searchParams = useSearchParams();
  const initialDomain = ((): DomainFilter => {
    const d = searchParams.get("domain");
    return d === "1" || d === "2" || d === "3" ? (Number(d) as 1 | 2 | 3) : "all";
  })();
  const [domainFilter, setDomainFilter] = useState<DomainFilter>(initialDomain);
  const [mode, setMode] = useState<DeckMode>("all");
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionDone, setSessionDone] = useState(0);
  // 복습 세션에서 이미 처리한 카드 (again은 큐 유지, good은 제외)
  const [reviewedGood, setReviewedGood] = useState<Set<string>>(new Set());
  const tf = useTranslations("flashcards");

  const { getSrsMap, gradeFlashcard } = useLearningStore();
  const auth = useOptionalAuth();
  const userId = auth?.user?.id ?? null;

  const filteredUnits = domainFilter === "all" ? units : units.filter((u) => u.domain === domainFilter);
  const allQuestions = useMemo(() => filteredUnits.flatMap((u) => u.questions), [filteredUnits]);

  const srsMap = getSrsMap(exam);
  const dueTotal = useMemo(
    () => allQuestions.filter((q) => isDue(srsMap[q.id])).length,
    [allQuestions, srsMap]
  );

  const questions = useMemo(() => {
    if (mode === "all") return allQuestions;
    // 복습 모드: due 카드 중 이번 세션에서 "알았음" 처리 안 된 것
    return allQuestions.filter((q) => isDue(srsMap[q.id]) && !reviewedGood.has(q.id));
    // srsMap은 gradeFlashcard 시점에 갱신되지만, due 판정은 세션 시작 기준을 유지하기 위해
    // reviewedGood으로만 목록을 줄인다 ("다시"한 카드는 계속 큐에 남음)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, allQuestions, reviewedGood]);

  const safeIndex = Math.min(index, Math.max(0, questions.length - 1));
  const q = questions[safeIndex];

  const goTo = useCallback((i: number) => {
    setIndex(i);
    setIsFlipped(false);
  }, []);

  const handleFilterChange = (f: DomainFilter) => {
    setDomainFilter(f);
    setIndex(0);
    setIsFlipped(false);
    setSessionDone(0);
    setReviewedGood(new Set());
  };

  const handleModeChange = (m: DeckMode) => {
    setMode(m);
    setIndex(0);
    setIsFlipped(false);
    setSessionDone(0);
    setReviewedGood(new Set());
  };

  const handleRate = (rating: "again" | "hard" | "good" | "easy") => {
    if (!q) return;
    const grade = rating === "again" || rating === "hard" ? "again" : "good";
    const next = gradeFlashcard(exam, q.id, grade);
    if (userId) syncSrsCardToDB(userId, exam, q.id, next.box, next.due);

    setSessionDone((n) => n + 1);

    if (mode === "review" && grade === "good") {
      // 목록에서 제거 — 인덱스는 그대로 두면 다음 카드가 그 자리로 옴
      setReviewedGood((prev) => new Set(prev).add(q.id));
      setIsFlipped(false);
      setIndex((i) => Math.min(i, Math.max(0, questions.length - 2)));
      return;
    }

    if (safeIndex < questions.length - 1) {
      goTo(safeIndex + 1);
    } else {
      goTo(0);
    }
  };

  const filterOptions: { value: DomainFilter; label: string }[] = [
    { value: "all", label: tf("all") },
    { value: 1, label: tf("domain1") },
    { value: 2, label: tf("domain2") },
    { value: 3, label: tf("domain3") },
  ];

  return (
    <div className="flash-shell">
      <div className="container" style={{ maxWidth: 800 }}>
        {/* Meta row */}
        <div className="flash-meta">
          <Link href={`/${locale}/${exam}`} style={{ textDecoration: "none", color: "inherit" }}>
            ← {exam.toUpperCase()}
          </Link>
          <span className="flash-meta__step">
            {questions.length > 0 ? `${safeIndex + 1} / ${questions.length}` : "—"}
          </span>
          {sessionDone > 0 && (
            <span style={{ fontSize: "var(--fs-xs)", color: "var(--success)", fontWeight: 600 }}>
              {tf("doneCount", { count: sessionDone })}
            </span>
          )}
        </div>

        {/* Mode toggle (SRS) */}
        <div
          role="group"
          aria-label={t("modeReview")}
          className="glossary-filter"
          style={{ justifyContent: "center", marginBottom: "var(--space-3)" }}
        >
          <button type="button" aria-pressed={mode === "all"} onClick={() => handleModeChange("all")}>
            {t("modeAll")}
          </button>
          <button type="button" aria-pressed={mode === "review"} onClick={() => handleModeChange("review")}>
            {t("modeReview")} ({dueTotal})
          </button>
        </div>

        {/* Domain filter */}
        <div
          role="group"
          aria-label={tf("domainFilter")}
          className="glossary-filter"
          style={{ justifyContent: "center", marginBottom: "var(--space-5)" }}
        >
          {filterOptions.map((opt) => (
            <button
              key={String(opt.value)}
              type="button"
              aria-pressed={domainFilter === opt.value}
              onClick={() => handleFilterChange(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {questions.length === 0 ? (
          <div style={{ textAlign: "center", padding: "var(--space-12) var(--space-8)", color: "var(--fg-muted)" }}>
            {mode === "review"
              ? t("noDue")
              : tf("noQuestionsInThis")}
          </div>
        ) : (
          <FlashcardCard
            question={q}
            index={safeIndex}
            total={questions.length}
            isFlipped={isFlipped}
            onFlip={() => setIsFlipped((f) => !f)}
            onPrev={() => goTo(safeIndex - 1)}
            onNext={() => goTo(safeIndex + 1)}
            onRate={handleRate}
            locale={locale}
          />
        )}

        {/* Keyboard hint */}
        <p style={{ textAlign: "center", fontSize: "var(--fs-xs)", color: "var(--fg-subtle)", marginTop: "var(--space-4)" }} aria-hidden="true">
          <span className="kbd">Space</span> {tf("flip")} &nbsp;
          <span className="kbd">←</span><span className="kbd">→</span> {tf("navigate")}
        </p>
      </div>
    </div>
  );
}
