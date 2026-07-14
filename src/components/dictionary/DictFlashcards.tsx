"use client";

import { useState, useMemo, useCallback } from "react";
import { useTranslations } from "next-intl";
import { isDue, type SrsCardState, type SrsGrade } from "@/lib/srs/leitner";
import { type DictEntryView } from "./dict-utils";

type Mode = "all" | "review";

/** 나의 사전 — 플래시카드 탭 (Leitner SRS, 앞면 단어 / 뒷면 뜻) */
export default function DictFlashcards({
	entries,
	onGrade,
}: {
	entries: DictEntryView[];
	onGrade: (entryId: string, grade: SrsGrade) => SrsCardState;
}) {
	const t = useTranslations("dictionary");
	const [mode, setMode] = useState<Mode>("all");
	const [index, setIndex] = useState(0);
	const [flipped, setFlipped] = useState(false);
	// 이번 세션에서 "알았음" 처리한 카드 — 복습 큐에서 제외
	const [reviewedGood, setReviewedGood] = useState<Set<string>>(new Set());

	const dueTotal = useMemo(
		() => entries.filter((e) => isDue(e.srs) && !reviewedGood.has(e.id)).length,
		[entries, reviewedGood]
	);

	const deck = useMemo(() => {
		if (mode === "review") return entries.filter((e) => isDue(e.srs) && !reviewedGood.has(e.id));
		return entries;
	}, [entries, mode, reviewedGood]);

	const safeIndex = Math.min(index, Math.max(deck.length - 1, 0));
	const card = deck[safeIndex];

	const goNext = useCallback(() => {
		setFlipped(false);
		setIndex((i) => Math.min(i + 1, Math.max(deck.length - 1, 0)));
	}, [deck.length]);

	const goPrev = useCallback(() => {
		setFlipped(false);
		setIndex((i) => Math.max(i - 1, 0));
	}, []);

	const handleRate = (grade: SrsGrade) => {
		if (!card) return;
		onGrade(card.id, grade);
		if (grade === "good") {
			setReviewedGood((prev) => new Set(prev).add(card.id));
			// 복습 모드에서는 카드가 큐에서 빠지므로 인덱스 유지가 곧 다음 카드
			if (mode === "review") {
				setFlipped(false);
				setIndex((i) => Math.min(i, Math.max(deck.length - 2, 0)));
				return;
			}
		}
		goNext();
	};

	if (entries.length === 0) {
		return (
			<p style={{ textAlign: "center", padding: "var(--space-10) var(--space-4)", color: "var(--fg-muted)", fontSize: "var(--fs-sm)" }}>
				{t("empty")}
			</p>
		);
	}

	return (
		<div>
			<div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)", alignItems: "center", justifyContent: "center" }}>
				<div role="group" aria-label={t("modeLabel")} className="glossary-filter" style={{ marginTop: 0 }}>
					<button
						type="button"
						aria-pressed={mode === "all"}
						onClick={() => { setMode("all"); setIndex(0); setFlipped(false); }}
					>
						{t("modeAll")}
					</button>
					<button
						type="button"
						aria-pressed={mode === "review"}
						onClick={() => { setMode("review"); setIndex(0); setFlipped(false); }}
					>
						{t("modeReview")}
					</button>
				</div>
				<span style={{ fontSize: "var(--fs-xs)", color: "var(--fg-subtle)" }}>{t("dueCount", { count: dueTotal })}</span>
			</div>

			{deck.length === 0 ? (
				<p style={{ textAlign: "center", padding: "var(--space-10) var(--space-4)", color: "var(--fg-muted)", fontSize: "var(--fs-sm)" }}>
					{t("noDue")}
				</p>
			) : card ? (
				<div style={{ marginTop: "var(--space-6)" }}>
					<article aria-label={t("cardProgress", { current: safeIndex + 1, total: deck.length })}>
						<div
							className={`flash-card${flipped ? " is-flipped" : ""}`}
							onClick={() => setFlipped((f) => !f)}
							onKeyDown={(e) => {
								if (e.key === " " || e.key === "Enter") {
									e.preventDefault();
									setFlipped((f) => !f);
								}
							}}
							role="button"
							tabIndex={0}
							aria-pressed={flipped}
							aria-label={flipped ? t("showWordFace") : t("showMeaning")}
						>
							<div className="flash-card__inner" aria-hidden={flipped}>
								<div className="flash-card__face">
									<div className="flash-card__label">{t("wordLabel")}</div>
									<div className="flash-card__term">
										{card.word.ko && <span lang="ko">{card.word.ko}</span>}
										{card.word.ko && card.word.en && <span aria-hidden="true"> · </span>}
										{card.word.en && <span lang="en" style={{ color: card.word.ko ? "var(--fg-muted)" : undefined }}>{card.word.en}</span>}
									</div>
									<div className="flash-card__hint">{t("flipHint")}</div>
								</div>
								<div className="flash-card__face flash-card__face--back" aria-hidden={!flipped}>
									<div className="flash-card__label">{t("meaningLabel")}</div>
									<div className="flash-card__def" style={{ marginTop: 0 }}>
										{card.meaning.ko && <p lang="ko" style={{ margin: 0 }}>{card.meaning.ko}</p>}
										{card.meaning.en && <p lang="en" style={{ margin: "4px 0 0", fontSize: "var(--fs-sm)", color: "var(--fg-muted)" }}>{card.meaning.en}</p>}
										{!card.meaning.ko && !card.meaning.en && <p style={{ margin: 0, color: "var(--fg-subtle)" }}>—</p>}
									</div>
								</div>
							</div>
						</div>

						<div
							className="progress-track"
							style={{ width: "100%", maxWidth: 720, margin: "var(--space-3) auto 0" }}
							role="progressbar"
							aria-valuenow={safeIndex + 1}
							aria-valuemin={1}
							aria-valuemax={deck.length}
							aria-label={t("cardProgress", { current: safeIndex + 1, total: deck.length })}
						>
							<div className="progress-fill" style={{ width: `${((safeIndex + 1) / deck.length) * 100}%` }} />
						</div>

						{flipped ? (
							<div className="flash-rate" style={{ justifyContent: "center" }}>
								<button
									type="button"
									className="flash-rate__again"
									onClick={() => handleRate("again")}
									aria-label={`${t("rateAgain")} — ${t("rateAgainHint")}`}
								>
									{t("rateAgain")}
									<small>{t("rateAgainHint")}</small>
								</button>
								<button
									type="button"
									className="flash-rate__good"
									onClick={() => handleRate("good")}
									aria-label={`${t("rateGood")} — ${t("rateGoodHint")}`}
								>
									{t("rateGood")}
									<small>{t("rateGoodHint")}</small>
								</button>
							</div>
						) : (
							<div style={{ display: "flex", justifyContent: "center", gap: "var(--space-3)", marginTop: "var(--space-4)" }}>
								<button type="button" className="btn" onClick={goPrev} disabled={safeIndex === 0}>
									{t("prevCard")}
								</button>
								<button type="button" className="btn btn--primary" onClick={() => setFlipped(true)} aria-pressed={flipped}>
									{t("showMeaning")}
								</button>
								<button type="button" className="btn" onClick={goNext} disabled={safeIndex === deck.length - 1}>
									{t("nextCard")}
								</button>
							</div>
						)}
					</article>
				</div>
			) : null}
		</div>
	);
}
