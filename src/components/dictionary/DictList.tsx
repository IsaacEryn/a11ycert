"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import AddWordDialog from "./AddWordDialog";
import { pickText, type DictEntryView } from "./dict-utils";

type SourceFilter = "all" | "glossary" | "custom";

/** 나의 사전 — 단어 목록 탭 (검색·출처 필터·삭제·직접 등록) */
export default function DictList({
	locale,
	entries,
	onRemove,
}: {
	locale: string;
	entries: DictEntryView[];
	onRemove: (entryId: string) => void;
}) {
	const t = useTranslations("dictionary");
	const [query, setQuery] = useState("");
	const [filter, setFilter] = useState<SourceFilter>("all");
	const [addOpen, setAddOpen] = useState(false);

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		return entries.filter((e) => {
			if (filter !== "all" && e.source !== filter) return false;
			if (!q) return true;
			return (
				e.word.ko.toLowerCase().includes(q) ||
				e.word.en.toLowerCase().includes(q) ||
				e.meaning.ko.toLowerCase().includes(q) ||
				e.meaning.en.toLowerCase().includes(q)
			);
		});
	}, [entries, query, filter]);

	const filterOptions: { value: SourceFilter; label: string }[] = [
		{ value: "all", label: t("filterAll") },
		{ value: "glossary", label: t("filterGlossary") },
		{ value: "custom", label: t("filterCustom") },
	];

	if (entries.length === 0) {
		return (
			<div style={{ textAlign: "center", padding: "var(--space-10) var(--space-4)", color: "var(--fg-muted)", fontSize: "var(--fs-sm)" }}>
				<p>{t("empty")}</p>
				<div style={{ marginTop: "var(--space-4)", display: "flex", gap: "var(--space-2)", justifyContent: "center", flexWrap: "wrap" }}>
					<Link href={`/${locale}/glossary`} className="btn btn--sm">{t("goGlossary")}</Link>
					<button type="button" className="btn btn--sm btn--primary" onClick={() => setAddOpen(true)}>{t("addButton")}</button>
				</div>
				{addOpen && <AddWordDialog onClose={() => setAddOpen(false)} />}
			</div>
		);
	}

	return (
		<div>
			<div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)", alignItems: "center" }}>
				<input
					type="search"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder={t("searchPlaceholder")}
					aria-label={t("searchLabel")}
					style={{
						flex: "1 1 180px",
						maxWidth: 280,
						padding: "8px 12px",
						fontSize: "var(--fs-sm)",
						border: "1px solid var(--border)",
						borderRadius: "var(--radius)",
						background: "var(--bg)",
						color: "var(--fg)",
					}}
				/>
				<div role="group" aria-label={t("filterLabel")} className="glossary-filter" style={{ marginTop: 0 }}>
					{filterOptions.map((opt) => (
						<button
							key={opt.value}
							type="button"
							aria-pressed={filter === opt.value}
							onClick={() => setFilter(opt.value)}
						>
							{opt.label}
						</button>
					))}
				</div>
				<button type="button" className="btn btn--sm btn--primary" onClick={() => setAddOpen(true)} style={{ marginLeft: "auto" }}>
					{t("addButton")}
				</button>
			</div>

			<p style={{ marginTop: "var(--space-3)", fontSize: "var(--fs-xs)", color: "var(--fg-subtle)" }} role="status">
				{t("count", { count: filtered.length })}
			</p>

			<ul style={{ listStyle: "none", margin: "var(--space-2) 0 0", padding: 0, display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
				{filtered.map((e) => {
					const displayWord = pickText(e.word, locale);
					return (
						<li
							key={e.id}
							style={{
								display: "flex",
								gap: "var(--space-4)",
								alignItems: "flex-start",
								padding: "var(--space-3) var(--space-4)",
								border: "1px solid var(--border)",
								borderRadius: "var(--radius)",
								background: "var(--bg-elev)",
							}}
						>
							<div style={{ flex: 1, minWidth: 0 }}>
								<div style={{ fontWeight: 700, fontSize: "var(--fs-base)" }}>
									{e.word.ko && <span lang="ko">{e.word.ko}</span>}
									{e.word.ko && e.word.en && <span aria-hidden="true"> · </span>}
									{e.word.en && <span lang="en" style={{ color: e.word.ko ? "var(--fg-muted)" : undefined, fontStyle: e.word.ko ? "italic" : undefined }}>{e.word.en}</span>}
								</div>
								{(e.meaning.ko || e.meaning.en) && (
									<div style={{ marginTop: 2, fontSize: "var(--fs-sm)", color: "var(--fg-muted)", lineHeight: 1.6 }}>
										{e.meaning.ko && <p lang="ko" style={{ margin: 0 }}>{e.meaning.ko}</p>}
										{e.meaning.en && <p lang="en" style={{ margin: 0, fontSize: "var(--fs-xs)", color: "var(--fg-subtle)" }}>{e.meaning.en}</p>}
									</div>
								)}
							</div>
							<div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center", flexShrink: 0 }}>
								<span className="tag" style={{ fontSize: 10, padding: "2px 8px" }}>
									{e.source === "glossary" ? t("filterGlossary") : t("filterCustom")}
								</span>
								{e.source === "glossary" && (
									<Link
										href={`/${locale}/glossary#${e.id}`}
										className="btn btn--sm"
										aria-label={`${t("viewInGlossary")}: ${displayWord}`}
									>
										{t("viewInGlossary")}
									</Link>
								)}
								<button
									type="button"
									className="btn btn--sm"
									style={{ color: "var(--danger)" }}
									aria-label={t("deleteWord", { word: displayWord })}
									onClick={() => onRemove(e.id)}
								>
									{t("delete")}
								</button>
							</div>
						</li>
					);
				})}
			</ul>

			{addOpen && <AddWordDialog onClose={() => setAddOpen(false)} />}
		</div>
	);
}
