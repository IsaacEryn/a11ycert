"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import AddWordDialog from "./AddWordDialog";

/**
 * "단어장에 추가" 버튼 — 학습 페이지·퀴즈 해설 등 어디서나 배치.
 * 클릭 시점의 텍스트 선택(드래그)을 단어란에 프리필한다.
 */
export default function AddWordButton({ small = false }: { small?: boolean }) {
	const t = useTranslations("dictionary");
	const [open, setOpen] = useState(false);
	const [initialWord, setInitialWord] = useState("");

	const handleOpen = () => {
		const selection = window.getSelection()?.toString().trim() ?? "";
		setInitialWord(selection.length <= 80 ? selection : "");
		setOpen(true);
	};

	return (
		<>
			<button
				type="button"
				className={small ? "btn btn--sm" : "btn"}
				onClick={handleOpen}
			>
				<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
					<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
					<path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
					<line x1="12" y1="7" x2="12" y2="13" />
					<line x1="9" y1="10" x2="15" y2="10" />
				</svg>
				{t("addWord")}
			</button>
			{open && <AddWordDialog initialWord={initialWord} onClose={() => setOpen(false)} />}
		</>
	);
}
