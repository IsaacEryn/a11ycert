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
			<div className="flex border-b border-gray-200" role="tablist">
				{tabs.map(({ key, label }) => (
					<button
						key={key}
						role="tab"
						aria-selected={tab === key}
						onClick={() => setTab(key)}
						className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
							tab === key
								? "border-blue-500 text-blue-600"
								: "border-transparent text-gray-500 hover:text-gray-700"
						}`}
					>
						{label}
					</button>
				))}
			</div>

			{/* Tab Content */}
			<div role="tabpanel" className="mt-6">
				{tab === "wrong" && <WrongAnswerList locale={locale} />}
				{tab === "saved" && <SavedQuizList locale={locale} />}
				{tab === "notes" && <NotesList locale={locale} />}
			</div>
		</div>
	);
}
