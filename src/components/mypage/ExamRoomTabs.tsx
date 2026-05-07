"use client";

import { useState } from "react";
import WrongAnswerList from "./WrongAnswerList";
import SavedQuizList from "./SavedQuizList";
import NotesList from "./NotesList";

type Tab = "wrong" | "saved" | "notes";

interface Props {
	locale: string;
}

export default function ExamRoomTabs({ locale }: Props) {
	const [tab, setTab] = useState<Tab>("wrong");
	const isKo = locale === "ko";

	const tabs: { key: Tab; label: string }[] = [
		{ key: "wrong", label: isKo ? "오답 노트" : "Wrong Answers" },
		{ key: "saved", label: isKo ? "저장한 문제" : "Saved Questions" },
		{ key: "notes", label: isKo ? "학습 메모" : "Study Notes" },
	];

	return (
		<div>
			{/* Tab List */}
			<div
				style={{ display: "flex", borderBottom: "1px solid var(--border)" }}
				role="tablist"
				aria-label={isKo ? "나의 시험장 탭" : "My Exam Room tabs"}
			>
				{tabs.map(({ key, label }) => (
					<button
						key={key}
						role="tab"
						aria-selected={tab === key}
						aria-controls={`tabpanel-${key}`}
						id={`tab-${key}`}
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
				style={{ marginTop: "var(--space-6)" }}
			>
				{tab === "wrong" && <WrongAnswerList locale={locale} />}
				{tab === "saved" && <SavedQuizList locale={locale} />}
				{tab === "notes" && <NotesList locale={locale} />}
			</div>
		</div>
	);
}
