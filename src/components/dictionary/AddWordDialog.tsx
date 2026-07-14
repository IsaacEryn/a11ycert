"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useLearningStore } from "@/lib/store/learningStore";
import { useOptionalAuth } from "@/lib/auth/AuthProvider";
import { syncDictEntryToDB } from "@/lib/store/learning-sync";

interface AddWordDialogProps {
	/** 열릴 때 단어란에 채울 초기값 (예: 페이지에서 드래그한 텍스트) */
	initialWord?: string;
	onClose: () => void;
}

const FOCUSABLE =
	'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** 나의 사전 단어 등록 다이얼로그 — 비로그인은 로컬 저장, 로그인 시 DB 동시 기록 */
export default function AddWordDialog({ initialWord = "", onClose }: AddWordDialogProps) {
	const t = useTranslations("dictionary");
	const auth = useOptionalAuth();
	const addCustomWord = useLearningStore((s) => s.addCustomWord);

	// 초기 단어가 한글을 포함하면 한국어 칸에, 아니면 영어 칸에 프리필
	const hasKorean = /[가-힣]/.test(initialWord);
	const [wordKo, setWordKo] = useState(hasKorean ? initialWord.trim() : "");
	const [wordEn, setWordEn] = useState(hasKorean ? "" : initialWord.trim());
	const [meaningKo, setMeaningKo] = useState("");
	const [meaningEn, setMeaningEn] = useState("");
	const [saved, setSaved] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const dialogRef = useRef<HTMLDivElement>(null);
	const previousFocusRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		previousFocusRef.current = document.activeElement as HTMLElement;
		requestAnimationFrame(() => {
			const first = dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE);
			first?.focus();
		});

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

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!wordKo.trim() && !wordEn.trim()) {
			setError(t("wordRequired"));
			return;
		}
		const entry = addCustomWord(
			{ ko: wordKo.trim(), en: wordEn.trim() },
			{ ko: meaningKo.trim(), en: meaningEn.trim() }
		);
		const userId = auth?.user?.id;
		if (userId) {
			syncDictEntryToDB(userId, {
				entry_id: entry.id,
				source: "custom",
				word_ko: entry.word.ko || null,
				word_en: entry.word.en || null,
				meaning_ko: entry.meaning.ko || null,
				meaning_en: entry.meaning.en || null,
			});
		}
		setSaved(true);
	};

	const inputStyle: React.CSSProperties = {
		background: "var(--bg)",
		color: "var(--fg)",
		borderColor: "var(--border)",
	};

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
			onClick={(e) => {
				if (e.target === e.currentTarget) onClose();
			}}
			role="presentation"
		>
			<div
				ref={dialogRef}
				role="dialog"
				aria-modal="true"
				aria-labelledby="add-word-title"
				className="w-full max-w-md rounded-xl p-6 shadow-xl"
				style={{ background: "var(--bg-elev)", color: "var(--fg)", border: "1px solid var(--border)" }}
			>
				{saved ? (
					<div className="text-center py-4">
						<p className="text-lg font-semibold" style={{ color: "var(--success)" }} role="status">
							{t("added")}
						</p>
						<button
							onClick={onClose}
							className="mt-4 rounded-lg px-4 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2"
							style={{ background: "var(--accent)", color: "var(--fg-on-accent)" }}
						>
							{t("cancel")}
						</button>
					</div>
				) : (
					<form onSubmit={handleSubmit}>
						<h2 id="add-word-title" className="text-base font-semibold" style={{ color: "var(--fg)" }}>
							{t("dialogTitle")}
						</h2>

						{error && (
							<p id="add-word-error" role="alert" className="mt-3 text-sm" style={{ color: "var(--danger)" }}>
								{error}
							</p>
						)}

						<div className="mt-4 grid grid-cols-2 gap-3">
							<label className="block">
								<span className="text-xs font-medium" style={{ color: "var(--fg-muted)" }}>{t("wordKo")}</span>
								<input
									type="text"
									lang="ko"
									value={wordKo}
									onChange={(e) => setWordKo(e.target.value)}
									maxLength={80}
									aria-describedby={error ? "add-word-error" : undefined}
									className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-1"
									style={inputStyle}
								/>
							</label>
							<label className="block">
								<span className="text-xs font-medium" style={{ color: "var(--fg-muted)" }}>{t("wordEn")}</span>
								<input
									type="text"
									lang="en"
									value={wordEn}
									onChange={(e) => setWordEn(e.target.value)}
									maxLength={80}
									aria-describedby={error ? "add-word-error" : undefined}
									className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-1"
									style={inputStyle}
								/>
							</label>
						</div>

						<label className="mt-3 block">
							<span className="text-xs font-medium" style={{ color: "var(--fg-muted)" }}>{t("meaningKo")}</span>
							<textarea
								lang="ko"
								value={meaningKo}
								onChange={(e) => setMeaningKo(e.target.value)}
								maxLength={500}
								rows={2}
								className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-1 resize-none"
								style={inputStyle}
							/>
						</label>
						<label className="mt-3 block">
							<span className="text-xs font-medium" style={{ color: "var(--fg-muted)" }}>{t("meaningEn")}</span>
							<textarea
								lang="en"
								value={meaningEn}
								onChange={(e) => setMeaningEn(e.target.value)}
								maxLength={500}
								rows={2}
								className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-1 resize-none"
								style={inputStyle}
							/>
						</label>

						<div className="mt-4 flex justify-end gap-2">
							<button
								type="button"
								onClick={onClose}
								className="rounded-lg px-4 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2"
								style={{ color: "var(--fg-muted)" }}
							>
								{t("cancel")}
							</button>
							<button
								type="submit"
								className="rounded-lg px-4 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2"
								style={{ background: "var(--accent)", color: "var(--fg-on-accent)" }}
							>
								{t("save")}
							</button>
						</div>
					</form>
				)}
			</div>
		</div>
	);
}
