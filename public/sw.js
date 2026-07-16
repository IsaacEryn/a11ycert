/**
 * A11yCert 서비스워커 — 오프라인 학습 지원.
 *
 * 캐시 전략 (stale 배포 방지가 최우선):
 *  - HTML/페이지: network-first — 온라인에서는 항상 최신, 오프라인에서만 캐시 폴백.
 *  - /_next/static: cache-first — 파일명에 해시가 있어 불변, 재배포 시 새 URL.
 *  - Supabase·API·외부 도메인: 캐시하지 않음.
 *
 * sw.js 내용이 바뀌면 브라우저가 새 SW를 설치한다 (CACHE_VERSION 갱신 시 구캐시 정리).
 */
const CACHE_VERSION = "a11ycert-v1";
const OFFLINE_URL = "/ko/offline";

self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_VERSION).then((cache) => cache.addAll([OFFLINE_URL])).then(() => self.skipWaiting())
	);
});

self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((keys) => Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))))
			.then(() => self.clients.claim())
	);
});

self.addEventListener("fetch", (event) => {
	const req = event.request;
	if (req.method !== "GET") return;

	const url = new URL(req.url);
	// 같은 오리진만 취급 — Supabase·GA·AdSense 등 외부 요청은 관여하지 않음
	if (url.origin !== self.location.origin) return;
	// API·인증 경로는 캐시 금지
	if (url.pathname.startsWith("/api/") || url.pathname.startsWith("/auth/")) return;

	// 불변 정적 자산: cache-first
	if (url.pathname.startsWith("/_next/static/") || /\.(png|svg|woff2?)$/.test(url.pathname)) {
		event.respondWith(
			caches.open(CACHE_VERSION).then(async (cache) => {
				const hit = await cache.match(req);
				if (hit) return hit;
				const res = await fetch(req);
				if (res.ok) cache.put(req, res.clone());
				return res;
			})
		);
		return;
	}

	// 페이지(HTML): network-first, 오프라인이면 캐시 → 오프라인 안내
	if (req.mode === "navigate" || req.headers.get("accept")?.includes("text/html")) {
		event.respondWith(
			fetch(req)
				.then((res) => {
					if (res.ok) {
						const clone = res.clone();
						caches.open(CACHE_VERSION).then((cache) => cache.put(req, clone));
					}
					return res;
				})
				.catch(async () => {
					const cached = await caches.match(req);
					return cached ?? (await caches.match(OFFLINE_URL)) ?? Response.error();
				})
		);
	}
});
