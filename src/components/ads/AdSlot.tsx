"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { ADSENSE_ID, AD_SLOTS, isAdEnabled, type AdSlotKey } from "@/lib/ads";

declare global {
	interface Window {
		adsbygoogle?: unknown[];
	}
}

/**
 * 인라인 디스플레이 광고 슬롯 — 결과·완료 화면과 페이지 하단 전용.
 * 설정이 없으면 null을 반환해 레이아웃에 흔적을 남기지 않고,
 * 활성 시에는 min-height를 예약해 레이아웃 이동(CLS)을 방지한다.
 * 오버레이·전면 형태로는 절대 사용하지 않는다.
 */
export default function AdSlot({ slotKey }: { slotKey: AdSlotKey }) {
	const t = useTranslations("common");
	const pushed = useRef(false);
	const enabled = isAdEnabled(slotKey);

	useEffect(() => {
		if (!enabled || pushed.current) return;
		pushed.current = true;
		try {
			(window.adsbygoogle = window.adsbygoogle || []).push({});
		} catch {
			/* 광고 차단기 등 — 무시 */
		}
	}, [enabled]);

	if (!enabled) return null;

	return (
		<aside
			aria-label={t("adLabel")}
			style={{ margin: "var(--space-6) 0", textAlign: "center" }}
		>
			<span
				style={{
					display: "block",
					fontSize: "10px",
					color: "var(--fg-subtle)",
					textTransform: "uppercase",
					letterSpacing: "0.08em",
					marginBottom: "4px",
				}}
			>
				{t("adLabel")}
			</span>
			<ins
				className="adsbygoogle"
				style={{ display: "block", minHeight: 100 }}
				data-ad-client={ADSENSE_ID}
				data-ad-slot={AD_SLOTS[slotKey]}
				data-ad-format="auto"
				data-full-width-responsive="true"
			/>
		</aside>
	);
}
