"use client";

import { useEffect } from "react";

/** 서비스워커 등록 — 프로덕션에서만, 실패는 조용히 무시 (핵심 기능에 영향 없음) */
export default function SwRegister() {
	useEffect(() => {
		if (process.env.NODE_ENV !== "production") return;
		if (!("serviceWorker" in navigator)) return;
		navigator.serviceWorker.register("/sw.js").catch(() => {});
	}, []);
	return null;
}
