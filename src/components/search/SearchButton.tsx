"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import SearchDialog from "./SearchDialog";

/** 헤더 검색 버튼 — 클릭 또는 ⌘K/Ctrl+K로 통합 검색 열기 */
export default function SearchButton({ locale }: { locale: string }) {
	const t = useTranslations("search");
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			// 수식키 조합이라 WCAG 2.1.4(문자 단축키) 비해당
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				setOpen(true);
			}
		};
		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, []);

	return (
		<>
			<button
				type="button"
				className="header-icon-btn"
				aria-label={t("openSearch")}
				onClick={() => setOpen(true)}
			>
				<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
					<circle cx="11" cy="11" r="8" />
					<line x1="21" y1="21" x2="16.65" y2="16.65" />
				</svg>
			</button>
			{open && <SearchDialog locale={locale} onClose={() => setOpen(false)} />}
		</>
	);
}
