"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import type { StudyUnit } from "@/lib/content/types";
import FlashcardCard from "@/components/FlashcardCard";

interface Props {
  units: StudyUnit[];
  locale: string;
  exam: "cpacc" | "was";
}

type DomainFilter = "all" | 1 | 2 | 3;

export default function FlashcardDeck({ units, locale, exam }: Props) {
  const [domainFilter, setDomainFilter] = useState<DomainFilter>("all");
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionDone, setSessionDone] = useState(0);
  const isKo = locale === "ko";

  const filteredUnits = domainFilter === "all" ? units : units.filter((u) => u.domain === domainFilter);
  const questions = filteredUnits.flatMap((u) => u.questions);
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
  };

  const handleRate = (_rating: "again" | "hard" | "good" | "easy") => {
    setSessionDone((n) => n + 1);
    if (safeIndex < questions.length - 1) {
      goTo(safeIndex + 1);
    } else {
      goTo(0);
    }
  };

  const filterOptions: { value: DomainFilter; label: string }[] = [
    { value: "all", label: isKo ? "전체" : "All" },
    { value: 1, label: isKo ? "도메인 1" : "Domain 1" },
    { value: 2, label: isKo ? "도메인 2" : "Domain 2" },
    { value: 3, label: isKo ? "도메인 3" : "Domain 3" },
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
              {isKo ? `${sessionDone}장 완료` : `${sessionDone} done`}
            </span>
          )}
        </div>

        {/* Domain filter */}
        <div
          role="group"
          aria-label={isKo ? "도메인 필터" : "Domain filter"}
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
            {isKo ? "이 도메인에 문제가 없습니다." : "No questions in this domain."}
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
          <span className="kbd">Space</span> {isKo ? "뒤집기" : "flip"} &nbsp;
          <span className="kbd">←</span><span className="kbd">→</span> {isKo ? "이동" : "navigate"}
        </p>
      </div>
    </div>
  );
}
