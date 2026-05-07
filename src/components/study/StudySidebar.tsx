"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLearningStore } from "@/lib/store/learningStore";
import type { DomainGroup } from "@/lib/content/types";

interface Props {
  locale: string;
  exam: "cpacc" | "was";
  activeUnitId?: string;
  domains: DomainGroup[];
}

export default function StudySidebar({ locale, exam, activeUnitId, domains }: Props) {
  const router = useRouter();
  const { isCompleted } = useLearningStore();
  const isKo = locale === "ko";

  const allUnits = domains.flatMap((d) => d.units);
  const totalUnits = allUnits.length;
  const completedCount = allUnits.filter((u) => isCompleted(exam, u.id)).length;

  return (
    <aside className="sidebar" aria-label={isKo ? "학습 목차" : "Study contents"}>
      <div className="sidebar__cert-switch" role="group" aria-label={isKo ? "자격증 선택" : "Select certification"}>
        <button
          type="button"
          aria-pressed={exam === "cpacc"}
          onClick={() => router.push(`/${locale}/cpacc/study`)}
        >
          CPACC
        </button>
        <button
          type="button"
          aria-pressed={exam === "was"}
          onClick={() => router.push(`/${locale}/was/study`)}
        >
          WAS
        </button>
      </div>

      <div className="sidebar__progress">
        <div className="sidebar__progress-row">
          <span style={{ color: "var(--fg-muted)", fontWeight: 600 }}>
            {isKo ? "전체 진행" : "Progress"}
          </span>
          <span className="sidebar__progress-num">{completedCount} / {totalUnits}</span>
        </div>
        <div className="progress-track" aria-hidden="true">
          <div
            className="progress-fill"
            style={{ width: `${totalUnits > 0 ? (completedCount / totalUnits) * 100 : 0}%` }}
          />
        </div>
      </div>

      {domains.map((domain) => (
        <div key={domain.domain}>
          <div className="sidebar__group">
            Domain 0{domain.domain} · {isKo ? domain.title.ko : domain.title.en}
          </div>
          <ul className="sidebar__list">
            {domain.units.map((unit, idx) => {
              const done = isCompleted(exam, unit.id);
              const active = unit.id === activeUnitId;
              const label = isKo ? unit.title.ko : unit.title.en;
              const num = `${domain.domain}.${idx + 1}`;

              if (!unit.available) {
                return (
                  <li key={unit.id}>
                    <span className="sidebar__item" style={{ opacity: 0.4, cursor: "default" }}>
                      <span className="sidebar__item-num">{num}</span>
                      <span>{label}</span>
                    </span>
                  </li>
                );
              }

              return (
                <li key={unit.id}>
                  <Link
                    href={`/${locale}/${exam}/study/${unit.id}`}
                    className={`sidebar__item${active ? " is-active" : ""}`}
                    aria-current={active ? "true" : undefined}
                  >
                    <span className="sidebar__item-num">{num}</span>
                    <span style={{ flex: 1 }}>{label}</span>
                    <span
                      className={`sidebar__item-status${done ? " is-done" : ""}`}
                      aria-label={done ? (isKo ? "완료" : "Done") : (isKo ? "미시작" : "Not started")}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </aside>
  );
}
