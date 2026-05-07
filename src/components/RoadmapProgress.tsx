"use client";

import Link from "next/link";
import type { DomainGroup } from "@/lib/content/types";
import { useLearningStore } from "@/lib/store/learningStore";
import StudySidebar from "@/components/study/StudySidebar";

interface Props {
  locale: string;
  exam: "cpacc" | "was";
  domains: DomainGroup[];
}

export default function RoadmapProgress({ locale, exam, domains }: Props) {
  const { isCompleted } = useLearningStore();
  const isKo = locale === "ko";

  const allUnits = domains.flatMap((d) => d.units);
  const totalUnits = allUnits.length;
  const completedCount = allUnits.filter((u) => isCompleted(exam, u.id)).length;
  const firstUnit = allUnits.find((u) => u.available);

  return (
    <div className="container">
      <div className="app-layout">
        <StudySidebar locale={locale} exam={exam} domains={domains} />

        <div>
          {/* Welcome card */}
          <div className="bilingual-card" style={{ textAlign: "center", padding: "var(--space-12) var(--space-8)" }}>
            <div className="bilingual-card__num" style={{ justifyContent: "center", display: "flex", marginBottom: "var(--space-3)" }}>
              {exam.toUpperCase()} · {isKo ? "학습 로드맵" : "STUDY ROADMAP"}
            </div>
            <h1 style={{ fontSize: "var(--fs-2xl)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "var(--space-3)" }}>
              {isKo ? "어디서부터 시작할까요?" : "Where would you like to start?"}
            </h1>
            <p style={{ color: "var(--fg-muted)", marginBottom: "var(--space-6)", maxWidth: "40ch", margin: "0 auto var(--space-6)" }}>
              {isKo
                ? `총 ${totalUnits}개 학습 단원 · 완료 ${completedCount}개. 왼쪽 목차에서 단원을 선택하세요.`
                : `${totalUnits} study units · ${completedCount} completed. Select a unit from the sidebar.`}
            </p>

            {completedCount > 0 && (
              <div style={{ marginBottom: "var(--space-6)" }}>
                <div className="progress-track" style={{ maxWidth: 320, margin: "0 auto var(--space-2)" }} aria-hidden="true">
                  <div className="progress-fill" style={{ width: `${(completedCount / totalUnits) * 100}%` }} />
                </div>
                <p style={{ fontSize: "var(--fs-xs)", color: "var(--fg-subtle)" }}>
                  {Math.round((completedCount / totalUnits) * 100)}% {isKo ? "완료" : "complete"}
                </p>
              </div>
            )}

            {firstUnit && (
              <div style={{ display: "flex", gap: "var(--space-3)", justifyContent: "center", flexWrap: "wrap" }}>
                {completedCount === 0 ? (
                  <Link className="btn btn--primary btn--lg" href={`/${locale}/${exam}/study/${firstUnit.id}`}>
                    {isKo ? "첫 단원 시작" : "Start First Unit"}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </Link>
                ) : (
                  <>
                    <Link className="btn btn--primary btn--lg" href={`/${locale}/${exam}/study/${firstUnit.id}`}>
                      {isKo ? "계속 학습" : "Continue"}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </Link>
                    <Link className="btn btn--lg" href={`/${locale}/${exam}/quiz`}>
                      {isKo ? "모의 퀴즈" : "Mock Quiz"}
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Domain summary cards */}
          <div style={{ marginTop: "var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
            {domains.map((domain) => {
              const domainUnits = domain.units.filter((u) => u.available);
              const domainDone = domainUnits.filter((u) => isCompleted(exam, u.id)).length;
              return (
                <div key={domain.domain} style={{ background: "var(--bg-elev)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "var(--space-4)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-2)" }}>
                    <h2 style={{ fontSize: "var(--fs-base)", fontWeight: 700 }}>
                      {isKo ? domain.title.ko : domain.title.en}
                    </h2>
                    <span style={{ fontSize: "var(--fs-xs)", color: "var(--fg-muted)", fontWeight: 600 }}>
                      {domainDone} / {domainUnits.length}
                    </span>
                  </div>
                  <div className="progress-track" aria-hidden="true">
                    <div className="progress-fill" style={{ width: `${domainUnits.length > 0 ? (domainDone / domainUnits.length) * 100 : 0}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
