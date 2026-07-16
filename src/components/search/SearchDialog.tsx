"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { getChoseong } from "@/lib/glossary-utils";
import type { SearchEntry } from "@/lib/search-index";

const FOCUSABLE =
	'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** 문자열 전체의 초성 시퀀스 (한글 음절만 변환, 그 외 문자는 그대로) */
function toChoseong(text: string): string {
	return [...text].map((ch) => getChoseong(ch) ?? ch).join("");
}

const JAMO_ONLY = /^[ㄱ-ㅎ\s]+$/;

/**
 * 통합 검색 다이얼로그 — 단원 제목·요약·소제목 + 용어(표제어·aliases).
 * 인덱스는 열릴 때 동적 import (콘텐츠가 초기 번들에 포함되지 않도록).
 */
export default function SearchDialog({ locale, onClose }: { locale: string; onClose: () => void }) {
	const t = useTranslations("search");
	const router = useRouter();
	const [query, setQuery] = useState("");
	const [index, setIndex] = useState<SearchEntry[] | null>(null);
	const [active, setActive] = useState(0);

	const dialogRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const previousFocusRef = useRef<HTMLElement | null>(null);

	// 인덱스 지연 로드 — 열릴 때 1회
	useEffect(() => {
		let cancelled = false;
		void import("@/lib/search-index").then(({ buildSearchIndex }) => {
			if (!cancelled) setIndex(buildSearchIndex());
		});
		return () => {
			cancelled = true;
		};
	}, []);

	// 포커스 트랩 + ESC (ReportModal 패턴)
	useEffect(() => {
		previousFocusRef.current = document.activeElement as HTMLElement;
		requestAnimationFrame(() => inputRef.current?.focus());

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose();
				return;
			}
			if (e.key !== "Tab") return;
			const elements = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []);
			if (elements.length === 0) return;
			const first = elements[0];
			const last = elements[elements.length - 1];
			if (e.shiftKey) {
				if (document.activeElement === first) {
					e.preventDefault();
					last.focus();
				}
			} else if (document.activeElement === last) {
				e.preventDefault();
				first.focus();
			}
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			previousFocusRef.current?.focus();
		};
	}, [onClose]);

	const results = useMemo(() => {
		if (!index) return [];
		const q = query.trim().toLowerCase();
		if (!q) return [];
		const jamoQuery = JAMO_ONLY.test(q) ? q.replace(/\s/g, "") : null;

		const matches = index.filter((e) => {
			const titleKo = e.title.ko.toLowerCase();
			const titleEn = e.title.en.toLowerCase();
			if (titleKo.includes(q) || titleEn.includes(q) || e.haystack.includes(q)) return true;
			// 초성 검색 — 자모만 입력된 경우 제목의 초성 시퀀스와 대조
			if (jamoQuery) return toChoseong(e.title.ko).includes(jamoQuery);
			return false;
		});
		// 제목 매치 우선 정렬
		matches.sort((a, b) => {
			const aTitle = a.title.ko.toLowerCase().includes(q) || a.title.en.toLowerCase().includes(q) ? 0 : 1;
			const bTitle = b.title.ko.toLowerCase().includes(q) || b.title.en.toLowerCase().includes(q) ? 0 : 1;
			return aTitle - bTitle;
		});
		return matches.slice(0, 12);
	}, [index, query]);

	// 결과 변경 시 활성 항목 리셋
	useEffect(() => {
		void Promise.resolve().then(() => setActive(0));
	}, [query]);

	const select = useCallback(
		(entry: SearchEntry) => {
			onClose();
			router.push(`/${locale}${entry.href}`);
		},
		[onClose, router, locale]
	);

	const handleInputKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "ArrowDown") {
			e.preventDefault();
			setActive((i) => Math.min(i + 1, results.length - 1));
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setActive((i) => Math.max(i - 1, 0));
		} else if (e.key === "Enter" && results[active]) {
			e.preventDefault();
			select(results[active]);
		}
	};

	return (
		<div
			className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 pt-[12vh]"
			onClick={(e) => {
				if (e.target === e.currentTarget) onClose();
			}}
			role="presentation"
		>
			<div
				ref={dialogRef}
				role="dialog"
				aria-modal="true"
				aria-label={t("dialogLabel")}
				className="w-full max-w-lg rounded-xl shadow-xl overflow-hidden"
				style={{ background: "var(--bg-elev)", color: "var(--fg)", border: "1px solid var(--border)" }}
			>
				<input
					ref={inputRef}
					type="search"
					role="combobox"
					aria-expanded={results.length > 0}
					aria-controls="search-results"
					aria-activedescendant={results[active] ? `search-opt-${results[active].type}-${results[active].id}` : undefined}
					aria-label={t("inputLabel")}
					placeholder={t("placeholder")}
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onKeyDown={handleInputKeyDown}
					style={{
						width: "100%",
						padding: "var(--space-4)",
						fontSize: "var(--fs-base)",
						background: "transparent",
						color: "var(--fg)",
						border: "none",
						borderBottom: "1px solid var(--divider)",
						outline: "none",
					}}
				/>

				{/* 결과 없음 안내 — listbox 밖, aria-live로 전달 */}
				{query.trim() && index && results.length === 0 && (
					<p role="status" style={{ margin: 0, padding: "var(--space-3) var(--space-4)", fontSize: "var(--fs-sm)", color: "var(--fg-subtle)" }}>
						{t("noResults")}
					</p>
				)}
				<ul
					id="search-results"
					role="listbox"
					aria-label={t("resultsLabel")}
					style={{ listStyle: "none", margin: 0, padding: "var(--space-2)", maxHeight: "50vh", overflowY: "auto" }}
				>
					{results.map((e, i) => (
						<li key={`${e.type}-${e.id}`}>
							<button
								id={`search-opt-${e.type}-${e.id}`}
								role="option"
								aria-selected={i === active}
								type="button"
								onClick={() => select(e)}
								onMouseEnter={() => setActive(i)}
								style={{
									display: "flex",
									alignItems: "center",
									gap: "var(--space-3)",
									width: "100%",
									textAlign: "left",
									padding: "var(--space-3) var(--space-4)",
									border: "none",
									borderRadius: "var(--radius)",
									background: i === active ? "var(--accent-soft)" : "transparent",
									color: i === active ? "var(--accent-soft-fg)" : "var(--fg)",
									cursor: "pointer",
									fontSize: "var(--fs-sm)",
								}}
							>
								<span className="tag" style={{ fontSize: 10, padding: "2px 8px", flexShrink: 0 }}>
									{e.type === "unit" ? (e.cert?.toUpperCase() ?? "") : t("termTag")}
								</span>
								<span style={{ minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
									{locale === "ko" ? e.title.ko : e.title.en}
									<span style={{ marginLeft: 8, color: "var(--fg-subtle)", fontSize: "var(--fs-xs)" }}>
										{locale === "ko" ? e.title.en : e.title.ko}
									</span>
								</span>
							</button>
						</li>
					))}
				</ul>

				<div style={{ padding: "6px var(--space-4)", borderTop: "1px solid var(--divider)", fontSize: "var(--fs-xs)", color: "var(--fg-subtle)", display: "flex", gap: "var(--space-4)" }}>
					<span><span className="kbd">↑↓</span> {t("hintNavigate")}</span>
					<span><span className="kbd">Enter</span> {t("hintOpen")}</span>
					<span><span className="kbd">Esc</span> {t("hintClose")}</span>
				</div>
			</div>
		</div>
	);
}
