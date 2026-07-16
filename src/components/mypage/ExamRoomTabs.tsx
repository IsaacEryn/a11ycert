"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import WrongAnswerList from "./WrongAnswerList";
import SavedQuizList from "./SavedQuizList";
import NotesList from "./NotesList";

type Tab = "wrong" | "saved" | "notes";

const TAB_KEYS: Tab[] = ["wrong", "saved", "notes"];

interface Props {
	locale: string;
}

export default function ExamRoomTabs({ locale }: Props) {
	const [tab, setTab] = useState<Tab>("wrong");
	const t = useTranslations("examRoom");
	const tabRefs = useRef<Record<Tab, HTMLButtonElement | null>>({
		wrong: null,
		saved: null,
		notes: null,
	});

	const tabs: { key: Tab; label: string }[] = [
		{ key: "wrong", label: t("wrongAnswers") },
		{ key: "saved", label: t("savedQuestions") },
		{ key: "notes", label: t("studyNotes") },
	];

	// Roving tabIndex: 탭 변경 시 해당 버튼으로 포커스 이동
	useEffect(() => {
		tabRefs.current[tab]?.focus();
	}, [tab]);

	const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
		const idx = TAB_KEYS.indexOf(tab);
		if (e.key === "ArrowRight") {
			e.preventDefault();
			setTab(TAB_KEYS[(idx + 1) % TAB_KEYS.length]);
		} else if (e.key === "ArrowLeft") {
			e.preventDefault();
			setTab(TAB_KEYS[(idx - 1 + TAB_KEYS.length) % TAB_KEYS.length]);
		} else if (e.key === "Home") {
			e.preventDefault();
			setTab(TAB_KEYS[0]);
		} else if (e.key === "End") {
			e.preventDefault();
			setTab(TAB_KEYS[TAB_KEYS.length - 1]);
		}
	}, [tab]);

	return (
		<div>
			{/* Tab List */}
			<div
				style={{ display: "flex", borderBottom: "1px solid var(--border)" }}
				role="tablist"
				aria-label={t("myExamRoomTabs")}
				aria-orientation="horizontal"
				onKeyDown={handleKeyDown}
			>
				{tabs.map(({ key, label }) => (
					<button
						key={key}
						ref={(el) => { tabRefs.current[key] = el; }}
						role="tab"
						aria-selected={tab === key}
						aria-controls={`tabpanel-${key}`}
						id={`tab-${key}`}
						tabIndex={tab === key ? 0 : -1}
						onClick={() => setTab(key)}
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

			{/* Tab Content */}
			<div
				role="tabpanel"
				id={`tabpanel-${tab}`}
				aria-labelledby={`tab-${tab}`}
				tabIndex={0}
				style={{ marginTop: "var(--space-6)" }}
			>
				{tab === "wrong" && <WrongAnswerList locale={locale} />}
				{tab === "saved" && <SavedQuizList locale={locale} />}
				{tab === "notes" && <NotesList locale={locale} />}
			</div>
		</div>
	);
}
