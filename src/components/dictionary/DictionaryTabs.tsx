"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useLearningStore } from "@/lib/store/learningStore";
import { useOptionalAuth } from "@/lib/auth/AuthProvider";
import { createClient } from "@/lib/supabase/client";
import { removeDictEntryFromDB, syncDictSrsToDB } from "@/lib/store/learning-sync";
import type { SrsGrade } from "@/lib/srs/leitner";
import { resolveLocalEntries, resolveDbEntries, type DictEntryView } from "./dict-utils";
import DictList from "./DictList";
import DictFlashcards from "./DictFlashcards";
import DictQuiz from "./DictQuiz";

type Tab = "list" | "flashcards" | "quiz";
const TAB_KEYS: Tab[] = ["list", "flashcards", "quiz"];

/** 나의 사전 탭 컨테이너 — 엔트리 로딩(로그인=DB, 비로그인=로컬)과 삭제·채점 콜백을 소유 */
export default function DictionaryTabs({ locale }: { locale: string }) {
	const t = useTranslations("dictionary");
	const auth = useOptionalAuth();
	const userId = auth?.user?.id ?? null;
	const supabaseRef = useRef(createClient());

	const dictionary = useLearningStore((s) => s.dictionary);
	const getDictionary = useLearningStore((s) => s.getDictionary);
	const removeDictEntry = useLearningStore((s) => s.removeDictEntry);
	const gradeDictEntry = useLearningStore((s) => s.gradeDictEntry);

	const localEntries = useMemo(
		() => resolveLocalEntries(getDictionary()),
		// dictionary 상태가 바뀔 때마다 재계산
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[dictionary]
	);

	const [dbEntries, setDbEntries] = useState<DictEntryView[] | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!userId) {
			setDbEntries(null);
			return;
		}
		let cancelled = false;
		const fetchEntries = async () => {
			setLoading(true);
			const { data, error } = await supabaseRef.current
				.from("dictionary_entries")
				.select("entry_id, source, word_ko, word_en, meaning_ko, meaning_en, box, due_at, created_at")
				.order("created_at", { ascending: false });
			if (cancelled) return;
			if (!error && data) setDbEntries(resolveDbEntries(data));
			setLoading(false);
		};
		void Promise.resolve().then(fetchEntries);
		return () => {
			cancelled = true;
		};
	}, [userId]);

	// 로그인: DB가 소스(비어 있으면 로컬 fallback — 이관 직후 반영 지연 대비), 비로그인: 로컬
	const entries = useMemo(() => {
		if (userId && dbEntries && dbEntries.length > 0) {
			// 로컬에서 방금 추가/채점한 항목이 DB 조회 스냅샷보다 최신일 수 있어 로컬 우선 병합
			const localById = new Map(localEntries.map((e) => [e.id, e]));
			const merged = dbEntries.map((e) => localById.get(e.id) ?? e);
			const dbIds = new Set(dbEntries.map((e) => e.id));
			return [...localEntries.filter((e) => !dbIds.has(e.id)), ...merged];
		}
		return localEntries;
	}, [userId, dbEntries, localEntries]);

	const handleRemove = useCallback(
		(entryId: string) => {
			removeDictEntry(entryId);
			setDbEntries((prev) => prev?.filter((e) => e.id !== entryId) ?? prev);
			if (userId) removeDictEntryFromDB(userId, entryId);
		},
		[removeDictEntry, userId]
	);

	const handleGrade = useCallback(
		(entryId: string, grade: SrsGrade) => {
			const next = gradeDictEntry(entryId, grade);
			setDbEntries((prev) =>
				prev?.map((e) => (e.id === entryId ? { ...e, srs: next } : e)) ?? prev
			);
			if (userId) syncDictSrsToDB(userId, entryId, next.box, next.due);
			return next;
		},
		[gradeDictEntry, userId]
	);

	const [tab, setTab] = useState<Tab>("list");
	const tabRefs = useRef<Record<Tab, HTMLButtonElement | null>>({ list: null, flashcards: null, quiz: null });
	const userSwitchedTab = useRef(false);

	useEffect(() => {
		if (userSwitchedTab.current) tabRefs.current[tab]?.focus();
	}, [tab]);

	const switchTab = (next: Tab) => {
		userSwitchedTab.current = true;
		setTab(next);
	};

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			const idx = TAB_KEYS.indexOf(tab);
			if (e.key === "ArrowRight") {
				e.preventDefault();
				switchTab(TAB_KEYS[(idx + 1) % TAB_KEYS.length]);
			} else if (e.key === "ArrowLeft") {
				e.preventDefault();
				switchTab(TAB_KEYS[(idx - 1 + TAB_KEYS.length) % TAB_KEYS.length]);
			} else if (e.key === "Home") {
				e.preventDefault();
				switchTab(TAB_KEYS[0]);
			} else if (e.key === "End") {
				e.preventDefault();
				switchTab(TAB_KEYS[TAB_KEYS.length - 1]);
			}
		},
		[tab]
	);

	const tabs: { key: Tab; label: string }[] = [
		{ key: "list", label: t("tabList") },
		{ key: "flashcards", label: t("tabFlashcards") },
		{ key: "quiz", label: t("tabQuiz") },
	];

	return (
		<div>
			<div
				style={{ display: "flex", borderBottom: "1px solid var(--border)" }}
				role="tablist"
				aria-label={t("tabsLabel")}
				aria-orientation="horizontal"
				onKeyDown={handleKeyDown}
			>
				{tabs.map(({ key, label }) => (
					<button
						key={key}
						ref={(el) => { tabRefs.current[key] = el; }}
						role="tab"
						aria-selected={tab === key}
						aria-controls={`dict-tabpanel-${key}`}
						id={`dict-tab-${key}`}
						tabIndex={tab === key ? 0 : -1}
						onClick={() => switchTab(key)}
						style={{
							padding: "10px 16px",
							fontSize: "var(--fs-sm)",
							fontWeight: 500,
							border: "none",
							borderBottom: tab === key ? "2px solid var(--accent)" : "2px solid transparent",
							background: "none",
							cursor: "pointer",
							color: tab === key ? "var(--accent)" : "var(--fg-subtle)",
							transition: "color var(--dur-fast), border-color var(--dur-fast)",
							marginBottom: -1,
						}}
					>
						{label}
					</button>
				))}
			</div>

			<div
				role="tabpanel"
				id={`dict-tabpanel-${tab}`}
				aria-labelledby={`dict-tab-${tab}`}
				tabIndex={0}
				style={{ marginTop: "var(--space-6)" }}
			>
				{loading && entries.length === 0 ? (
					<p style={{ fontSize: "var(--fs-sm)", color: "var(--fg-subtle)", textAlign: "center", padding: "var(--space-8)" }}>
						{t("loading")}
					</p>
				) : (
					<>
						{tab === "list" && <DictList locale={locale} entries={entries} onRemove={handleRemove} />}
						{tab === "flashcards" && <DictFlashcards entries={entries} onGrade={handleGrade} />}
						{tab === "quiz" && <DictQuiz locale={locale} entries={entries} onGrade={handleGrade} />}
					</>
				)}
			</div>
		</div>
	);
}
