import Link from "next/link";
import "./globals.css";

/**
 * 전역 404 — 프로덕션에서 모든 404 응답은 이 프리렌더(/_not-found)로 서빙됨.
 * 루트 레이아웃이 pass-through라 여기서 html/body를 직접 렌더 (next-intl 문서 패턴).
 * 클라이언트 내비게이션 중의 notFound()는 [locale]/not-found.tsx가 처리.
 */
export default function GlobalNotFound() {
	return (
		<html lang="ko">
			<body>
				<main
					style={{
						minHeight: "100vh",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						gap: "12px",
						padding: "24px",
						textAlign: "center",
					}}
				>
					<p style={{ fontSize: "3rem", fontWeight: 800, color: "var(--accent, #2563eb)", letterSpacing: "-0.03em", margin: 0 }} aria-hidden="true">
						404
					</p>
					<h1 style={{ fontSize: "1.25rem", fontWeight: 700, margin: 0 }}>
						페이지를 찾을 수 없습니다
						<span style={{ display: "block", fontSize: "0.9rem", fontWeight: 400, color: "var(--fg-muted, #6b7280)", marginTop: 6 }}>
							Page not found
						</span>
					</h1>
					<p style={{ color: "var(--fg-muted, #6b7280)", fontSize: "0.9rem", margin: 0 }}>
						주소가 바뀌었거나 삭제된 페이지일 수 있습니다.
						<span style={{ display: "block" }}>The page may have been moved or no longer exists.</span>
					</p>
					<div style={{ display: "flex", gap: "10px", marginTop: 12, flexWrap: "wrap", justifyContent: "center" }}>
						<Link className="btn btn--primary" href="/ko">
							홈으로
						</Link>
						<Link className="btn" href="/en">
							English Home
						</Link>
					</div>
				</main>
			</body>
		</html>
	);
}
