import Script from "next/script";
import { ADSENSE_ID } from "@/lib/ads";

/**
 * AdSense 로더 — NEXT_PUBLIC_ADSENSE_ID가 설정된 경우에만 로드.
 * 수동 광고 단위(AdSlot)만 사용하며, 화면을 덮는 자동 광고(전면·앵커)는
 * AdSense 대시보드에서 비활성 상태를 유지해야 한다 (src/lib/ads.ts 참고).
 */
export default function AdSenseScript() {
	if (!ADSENSE_ID) return null;
	return (
		<Script
			async
			src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
			crossOrigin="anonymous"
			strategy="afterInteractive"
		/>
	);
}
