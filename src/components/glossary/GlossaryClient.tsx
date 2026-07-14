"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import type { GlossaryTerm } from "@/lib/content/glossary";
import { groupTerms, KO_INDEX, EN_INDEX, type GlossarySortMode } from "@/lib/glossary-utils";
import Highlight from "./Highlight";
import JumpIndex from "./JumpIndex";

interface Props {
  terms: GlossaryTerm[];
  locale: string;
}

type CertFilter = "all" | "cpacc" | "was";

export default function GlossaryClient({ terms, locale }: Props) {
  const t = useTranslations("glossary");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const defaultSort: GlossarySortMode = locale === "ko" ? "ko" : "en";

  // URL → 초기 상태
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [certFilter, setCertFilter] = useState<CertFilter>(() => {
    const c = searchParams.get("cert");
    return c === "cpacc" || c === "was" ? c : "all";
  });
  const [sortMode, setSortMode] = useState<GlossarySortMode>(() => {
    const s = searchParams.get("sort");
    return s === "ko" || s === "en" ? s : defaultSort;
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // 상태 → URL 미러링 (q는 300ms 디바운스, 기본값이면 파라미터 생략)
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams();
      if (query.trim()) params.set("q", query.trim());
      if (certFilter !== "all") params.set("cert", certFilter);
      if (sortMode !== defaultSort) params.set("sort", sortMode);
      const qs = params.toString();
      // 딥링크 hash 보존 (replace가 hash를 지우지 않도록)
      const hash = window.location.hash;
      router.replace(`${pathname}${qs ? `?${qs}` : ""}${hash}`, { scroll: false });
    }, 300);
    return () => clearTimeout(timer);
  }, [query, certFilter, sortMode, defaultSort, pathname, router]);

  // 딥링크(#term-id) 진입 시 스크롤 + 일시 하이라이트
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const el = document.getElementById(hash);
    if (!el || !el.classList.contains("glossary-row")) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
    el.classList.add("glossary-row--flash");
    flashTimer.current = setTimeout(() => el.classList.remove("glossary-row--flash"), 2000);
    return () => {
      if (flashTimer.current) clearTimeout(flashTimer.current);
    };
     
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return terms.filter((term) => {
      const matchesCert = certFilter === "all" || term.certs.includes(certFilter);
      if (!matchesCert) return false;
      if (!q) return true;
      return (
        term.term.ko.toLowerCase().includes(q) ||
        term.term.en.toLowerCase().includes(q) ||
        term.definition.ko.toLowerCase().includes(q) ||
        term.definition.en.toLowerCase().includes(q) ||
        (term.aliases ?? []).some((a) => a.toLowerCase().includes(q))
      );
    });
  }, [terms, query, certFilter]);

  const grouped = useMemo(() => groupTerms(filtered, sortMode), [filtered, sortMode]);
  const activeLetters = useMemo(() => new Set(grouped.map(([key]) => key)), [grouped]);
  const indexLetters = sortMode === "ko" ? KO_INDEX : [...EN_INDEX, "#"];

  const copyLink = useCallback(
    async (termId: string) => {
      const url = `${window.location.origin}${pathname}#${termId}`;
      try {
        await navigator.clipboard.writeText(url);
        setCopiedId(termId);
        setTimeout(() => setCopiedId((prev) => (prev === termId ? null : prev)), 2000);
      } catch {
        /* clipboard 미지원 — 무시 */
      }
    },
    [pathname]
  );

  const certOptions: { value: CertFilter; label: string }[] = [
    { value: "all", label: t("all") },
    { value: "cpacc", label: "CPACC" },
    { value: "was", label: "WAS" },
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

      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)", alignItems: "center" }}>
        <div role="group" aria-label={t("certFilterLabel")} className="glossary-filter">
          {certOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              aria-pressed={certFilter === opt.value}
              onClick={() => setCertFilter(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div role="group" aria-label={t("sortLabel")} className="glossary-filter">
          {(["ko", "en"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              aria-pressed={sortMode === mode}
              onClick={() => setSortMode(mode)}
            >
              {mode === "ko" ? t("sortKo") : t("sortEn")}
            </button>
          ))}
        </div>
      </div>

      <JumpIndex letters={indexLetters} activeLetters={activeLetters} />

      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {(query || certFilter !== "all") && t("resultCount", { count: filtered.length })}
        {copiedId && t("copied")}
      </div>

      {grouped.length === 0 ? (
        <div style={{ textAlign: "center", padding: "var(--space-12) var(--space-8)", color: "var(--fg-muted)" }}>
          {t("noResults")}
        </div>
      ) : (
        <dl className="glossary-list">
          {grouped.map(([letter, letterTerms]) => (
            <div key={letter}>
              <dt className="glossary-letter" id={`glossary-letter-${letter}`} tabIndex={-1}>
                {letter}
              </dt>
              {letterTerms.map((term) => (
                <dd key={term.id} id={term.id} className="glossary-row">
                  <div className="glossary-row__term">
                    <span lang="ko">
                      <Highlight text={term.term.ko} query={query} />
                    </span>
                    <span className="glossary-row__term-en" lang="en">
                      <Highlight text={term.term.en} query={query} />
                    </span>
                  </div>
                  <div className="glossary-row__def" lang={locale === "ko" ? "ko" : "en"}>
                    <Highlight
                      text={locale === "ko" ? term.definition.ko : term.definition.en}
                      query={query}
                    />
                  </div>
                  <div className="glossary-row__cert">
                    {term.certs.map((c) => (
                      <span key={c} className="tag">{c.toUpperCase()}</span>
                    ))}
                    <button
                      type="button"
                      className="glossary-row__copy"
                      aria-label={t("copyLink", { term: locale === "ko" ? term.term.ko : term.term.en })}
                      onClick={() => copyLink(term.id)}
                    >
                      {copiedId === term.id ? (
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                        </svg>
                      )}
                    </button>
                  </div>
                </dd>
              ))}
            </div>
          ))}
        </dl>
      )}
    </>
  );
}
