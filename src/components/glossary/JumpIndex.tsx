"use client";

import { useTranslations } from "next-intl";

interface JumpIndexProps {
	/** 전체 인덱스 글자 (ko: ㄱ~ㅎ+#, en: A~Z) */
	letters: readonly string[];
	/** 현재 결과에 존재하는 그룹 키 */
	activeLetters: Set<string>;
}

/** 글자 점프 내비게이션 — 클릭 시 해당 글자 헤더로 스크롤 + 포커스 이동 */
export default function JumpIndex({ letters, activeLetters }: JumpIndexProps) {
	const t = useTranslations("glossary");

	const jump = (letter: string) => {
		const el = document.getElementById(`glossary-letter-${letter}`);
		if (!el) return;
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
		el.focus({ preventScroll: true });
	};

	return (
		<nav aria-label={t("jumpIndexLabel")} className="glossary-jump">
			{letters.map((letter) => {
				const enabled = activeLetters.has(letter);
				return (
					<button
						key={letter}
						type="button"
						disabled={!enabled}
						onClick={() => jump(letter)}
						aria-label={t("jumpTo", { letter })}
					>
						{letter}
					</button>
				);
			})}
		</nav>
	);
}
