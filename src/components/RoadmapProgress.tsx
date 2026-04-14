"use client";

import Link from "next/link";
import type { DomainGroup } from "@/lib/content/types";
import { useLearningStore } from "@/lib/store/learningStore";

interface Props {
  locale: string;
  exam: "cpacc" | "was";
  domains: DomainGroup[];
}

const ACCENT = {
  cpacc: {
    badge: "bg-blue-100 text-blue-700",
    ring: "border-blue-200 hover:border-blue-400 hover:bg-blue-50",
    check: "text-blue-600",
    num: "bg-blue-100 text-blue-700",
    domain: "text-blue-600",
  },
  was: {
    badge: "bg-violet-100 text-violet-700",
    ring: "border-violet-200 hover:border-violet-400 hover:bg-violet-50",
    check: "text-violet-600",
    num: "bg-violet-100 text-violet-700",
    domain: "text-violet-600",
  },
} as const;

export default function RoadmapProgress({ locale, exam, domains }: Props) {
  const { isCompleted } = useLearningStore();
  const isKo = locale === "ko";
  const c = ACCENT[exam];

  const totalUnits = domains.flatMap((d) => d.units).length;
  const completedCount = domains
    .flatMap((d) => d.units)
    .filter((u) => isCompleted(u.id)).length;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link
            href={`/${locale}/${exam}`}
            className={`text-xs font-semibold uppercase tracking-widest no-underline ${c.domain}`}
          >
            {exam.toUpperCase()}
          </Link>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">
            {isKo ? "학습 로드맵" : "Study Roadmap"}
          </h1>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-xs text-gray-500">{isKo ? "학습 완료" : "Completed"}</p>
          <p className="text-lg font-bold text-gray-900">
            {completedCount}
            <span className="text-sm font-normal text-gray-400"> / {totalUnits}</span>
          </p>
        </div>
      </div>

      {/* Progress bar */}
      {totalUnits > 0 && (
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-blue-500 transition-all"
            style={{ width: `${(completedCount / totalUnits) * 100}%` }}
            role="progressbar"
            aria-valuenow={completedCount}
            aria-valuemin={0}
            aria-valuemax={totalUnits}
            aria-label={isKo ? "전체 학습 진행률" : "Overall study progress"}
          />
        </div>
      )}

      {/* Domain sections */}
      <div className="mt-8 space-y-8">
        {domains.map((domain) => (
          <section key={domain.domain} aria-labelledby={`domain-${domain.domain}`}>
            <div className="flex items-baseline gap-3">
              <h2
                id={`domain-${domain.domain}`}
                className="text-base font-semibold text-gray-900"
              >
                {isKo ? domain.title.ko : domain.title.en}
              </h2>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${c.badge}`}>
                {isKo ? domain.weight.ko : domain.weight.en}
              </span>
            </div>

            <ul className="mt-3 space-y-2" role="list">
              {domain.units.map((unit, idx) => {
                const done = isCompleted(unit.id);
                const title = isKo ? unit.title.ko : unit.title.en;
                const summary = isKo ? unit.summary.ko : unit.summary.en;

                if (!unit.available) {
                  return (
                    <li
                      key={unit.id}
                      className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-400"
                    >
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${c.num} opacity-40`}
                        aria-hidden="true"
                      >
                        {idx + 1}
                      </span>
                      <span className="flex-1">{title}</span>
                      <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-500">
                        {isKo ? "준비 중" : "Coming soon"}
                      </span>
                    </li>
                  );
                }

                return (
                  <li key={unit.id}>
                    <Link
                      href={`/${locale}/${exam}/study/${unit.id}`}
                      className={`flex items-center gap-3 rounded-xl border px-4 py-3 no-underline transition-colors ${c.ring}`}
                    >
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${c.num}`}
                        aria-hidden="true"
                      >
                        {done ? "✓" : idx + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${done ? "text-gray-500" : "text-gray-900"}`}>
                          {title}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-gray-400">{summary}</p>
                      </div>
                      {done && (
                        <span
                          className={`shrink-0 text-xs font-medium ${c.check}`}
                          aria-label={isKo ? "완료" : "Completed"}
                        >
                          {isKo ? "완료" : "Done"}
                        </span>
                      )}
                      <span aria-hidden="true" className="shrink-0 text-gray-300">
                        →
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
