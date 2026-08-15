"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import type { WcagCriterion, WcagLevel } from "@/lib/content/wcag-criteria";

interface Props {
  criteria: WcagCriterion[];
  locale: string;
}

type LevelFilter = "all" | WcagLevel;

const PRINCIPLES = [1, 2, 3, 4] as const;

export default function WcagIndexClient({ criteria, locale }: Props) {
  const t = useTranslations("wcag");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isKo = locale === "ko";

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [level, setLevel] = useState<LevelFilter>(() => {
    const l = searchParams.get("level");
    return l === "A" || l === "AA" ? l : "all";
  });

  // 상태 → URL 미러링 (q는 300ms 디바운스, 기본값이면 파라미터 생략)
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams();
      if (query.trim()) params.set("q", query.trim());
      if (level !== "all") params.set("level", level);
      const qs = params.toString();
      router.replace(`${pathname.split("#")[0]}${qs ? `?${qs}` : ""}`, { scroll: false });
    }, 300);
    return () => clearTimeout(timer);
  }, [query, level, pathname, router]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return criteria.filter((c) => {
      if (level !== "all" && c.level !== level) return false;
      if (!q) return true;
      return (
        c.num.includes(q) ||
        c.title.ko.toLowerCase().includes(q) ||
        c.title.en.toLowerCase().includes(q) ||
        c.summary.ko.toLowerCase().includes(q) ||
        c.summary.en.toLowerCase().includes(q) ||
        (c.kwcag ?? []).some(
          (k) => k.num.includes(q) || k.name.ko.toLowerCase().includes(q)
        )
      );
    });
  }, [criteria, query, level]);

  const grouped = useMemo(
    () =>
      PRINCIPLES.map((p) => ({
        principle: p,
        items: filtered.filter((c) => Number(c.num.split(".")[0]) === p),
      })).filter((g) => g.items.length > 0),
    [filtered]
  );

  const levelOptions: { value: LevelFilter; label: string }[] = [
    { value: "all", label: t("levelAll") },
    { value: "A", label: "A" },
    { value: "AA", label: "AA" },
  ];

  return (
    <>
      <section className="glossary-hero">
        <h1>{t("title")}</h1>
        <p>{t("description")}</p>
        <input
          className="glossary-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("searchPlaceholder")}
          aria-label={t("searchLabel")}
        />
      </section>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--space-3)",
          alignItems: "center",
        }}
      >
        <div role="group" aria-label={t("levelFilterLabel")} className="glossary-filter">
          {levelOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              aria-pressed={level === opt.value}
              onClick={() => setLevel(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <Link
          href={`/${locale}/wcag/flashcards`}
          className="btn btn--sm"
          style={{ marginLeft: "auto" }}
        >
          {t("flashcardsCta")}
        </Link>
      </div>

      <nav aria-label={t("principleNavLabel")} style={{ marginTop: "var(--space-4)" }}>
        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--space-2)",
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
          {grouped.map(({ principle }) => (
            <li key={principle}>
              <a href={`#principle-${principle}`} className="btn btn--sm">
                {t(`principle${principle}`)}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {(query || level !== "all") && t("resultCount", { count: filtered.length })}
      </div>

      {grouped.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "var(--space-12) var(--space-8)",
            color: "var(--fg-muted)",
          }}
        >
          {t("noResults")}
        </div>
      ) : (
        grouped.map(({ principle, items }) => (
          <section key={principle} style={{ marginTop: "var(--space-8)" }}>
            <h2 id={`principle-${principle}`} style={{ fontSize: "var(--fs-lg)" }}>
              {t(`principle${principle}`)}
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: "var(--space-4) 0 0" }}>
              {items.map((c) => (
                <li
                  key={c.id}
                  style={{
                    padding: "var(--space-4) 0",
                    borderTop: "1px solid var(--divider)",
                  }}
                >
                  <Link
                    href={`/${locale}/wcag/${c.id}`}
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "var(--space-3)",
                      flexWrap: "wrap",
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <strong style={{ fontVariantNumeric: "tabular-nums" }}>{c.num}</strong>
                    <span>{isKo ? c.title.ko : c.title.en}</span>
                    <span className="tag">{c.level}</span>
                  </Link>
                  <p
                    style={{
                      margin: "var(--space-2) 0 0",
                      color: "var(--fg-muted)",
                      fontSize: "var(--fs-sm)",
                    }}
                  >
                    {isKo ? c.summary.ko : c.summary.en}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </>
  );
}
