"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useLearningStore } from "@/lib/store/learningStore";

/**
 * 이어서 학습 버튼 — 마지막 방문 단원으로 복귀.
 * persist 복원 전 SSR과의 hydration 불일치를 피하기 위해 마운트 후에만 렌더.
 * 기록이 없으면 아무것도 렌더하지 않는다.
 */
export default function ContinueStudying({ locale }: { locale: string }) {
	const t = useTranslations("study");
	const lastVisited = useLearningStore((s) => s.lastVisited);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		void Promise.resolve().then(() => setMounted(true));
	}, []);

	if (!mounted || !lastVisited) return null;

	const title = locale === "ko" ? lastVisited.title.ko : lastVisited.title.en;

	return (
		<Link
			className="btn"
			href={`/${locale}/${lastVisited.cert}/study/${lastVisited.unitId}`}
			style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-2)" }}
		>
			<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
				<polygon points="5 3 19 12 5 21 5 3" />
			</svg>
			{t("continueStudying", { cert: lastVisited.cert.toUpperCase(), title })}
		</Link>
	);
}
