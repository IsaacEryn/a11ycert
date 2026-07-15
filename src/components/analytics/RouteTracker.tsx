"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { GA_ID, trackPageView } from "@/lib/analytics";

/**
 * App Router SPA 전환 page_view 추적.
 * 첫 렌더는 gtag config의 기본 page_view가 담당하므로 건너뛴다.
 * useSearchParams 사용 → 레이아웃에서 <Suspense>로 감쌀 것.
 */
export default function RouteTracker() {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const isFirstRender = useRef(true);

	useEffect(() => {
		if (!GA_ID) return;
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}
		const qs = searchParams.toString();
		trackPageView(qs ? `${pathname}?${qs}` : pathname);
	}, [pathname, searchParams]);

	return null;
}
