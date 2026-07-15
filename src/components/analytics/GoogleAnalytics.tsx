import Script from "next/script";
import { GA_ID } from "@/lib/analytics";

/**
 * GA4 로더 — 초기 page_view는 여기서, 이후 SPA 전환은 RouteTracker가 전송.
 * IP 익명화는 GA4 기본 동작이며, 광고 신호는 수집하지 않도록 명시.
 */
export default function GoogleAnalytics() {
	if (!GA_ID) return null;
	return (
		<>
			<Script
				src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
				strategy="afterInteractive"
			/>
			<Script id="ga4-init" strategy="afterInteractive">
				{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', '${GA_ID}', { allow_google_signals: false });
				`}
			</Script>
		</>
	);
}
