"use client";

import { useState, useMemo } from "react";
import type { GlossaryTerm } from "@/lib/content/glossary";

interface Props {
  terms: GlossaryTerm[];
  locale: string;
}

type CertFilter = "all" | "cpacc" | "was";

export default function GlossaryClient({ terms, locale }: Props) {
  const isKo = locale === "ko";
  const [query, setQuery] = useState("");
  const [certFilter, setCertFilter] = useState<CertFilter>("all");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return terms.filter((t) => {
      const matchesCert = certFilter === "all" || t.certs.includes(certFilter);
      if (!matchesCert) return false;
      if (!q) return true;
      return (
        t.term.ko.toLowerCase().includes(q) ||
        t.term.en.toLowerCase().includes(q) ||
        t.definition.ko.toLowerCase().includes(q) ||
        t.definition.en.toLowerCase().includes(q)
      );
    });
  }, [terms, query, certFilter]);

  const grouped = useMemo(() => {
    const map = new Map<string, GlossaryTerm[]>();
    for (const term of filtered) {
      const letter = term.term.en[0].toUpperCase();
      if (!map.has(letter)) map.set(letter, []);
      map.get(letter)!.push(term);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  const certOptions: { value: CertFilter; label: string }[] = [
    { value: "all", label: isKo ? "전체" : "All" },
    { value: "cpacc", label: "CPACC" },
    { value: "was", label: "WAS" },
  ];

  return (
    <>
      <section className="glossary-hero">
        <h1>{isKo ? "용어집" : "Glossary"}</h1>
        <p>{isKo ? "접근성 핵심 용어를 한국어·영어로 확인하세요." : "Key accessibility terms in Korean and English."}</p>
        <input
          className="glossary-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={isKo ? "용어 검색…" : "Search terms…"}
          aria-label={isKo ? "용어 검색" : "Search glossary terms"}
        />
      </section>

      <div
        role="group"
        aria-label={isKo ? "자격증 필터" : "Certification filter"}
        className="glossary-filter"
      >
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

      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {query || certFilter !== "all"
          ? isKo
            ? `${filtered.length}개 용어가 검색되었습니다.`
            : `${filtered.length} term${filtered.length === 1 ? "" : "s"} found.`
          : ""}
      </div>

      {grouped.length === 0 ? (
        <div style={{ textAlign: "center", padding: "var(--space-12) var(--space-8)", color: "var(--fg-muted)" }}>
          {isKo ? "검색 결과가 없습니다." : "No results found."}
        </div>
      ) : (
        <dl className="glossary-list">
          {grouped.map(([letter, letterTerms]) => (
            <div key={letter}>
              <dt className="glossary-letter">{letter}</dt>
              {letterTerms.map((term) => (
                <dd key={term.id} className="glossary-row">
                  <div className="glossary-row__term">
                    <span>{term.term.ko}</span>
                    <span className="glossary-row__term-en">{term.term.en}</span>
                  </div>
                  <div className="glossary-row__def">
                    {isKo ? term.definition.ko : term.definition.en}
                  </div>
                  <div className="glossary-row__cert">
                    {term.certs.map((c) => (
                      <span key={c} className="tag">{c.toUpperCase()}</span>
                    ))}
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
