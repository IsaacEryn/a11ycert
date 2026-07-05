import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "A11yCert — IAAP CPACC & WAS Certification Prep";

// [locale] 하위 전체 페이지의 기본 OG 이미지 (1200x630)
// 텍스트는 라틴 문자만 사용 — Satori 기본 폰트에 한글 글리프가 없음
export default function OpengraphImage() {
	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "flex-start",
					padding: 96,
					background: "linear-gradient(135deg, #0B1020 0%, #1E4FD8 130%)",
					color: "#FFFFFF",
					fontFamily: "sans-serif",
				}}
			>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: 16,
						fontSize: 40,
						fontWeight: 700,
						letterSpacing: "-0.02em",
					}}
				>
					<div
						style={{
							width: 56,
							height: 56,
							borderRadius: 16,
							background: "#FFFFFF",
							color: "#1E4FD8",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							fontSize: 32,
							fontWeight: 800,
						}}
					>
						A
					</div>
					A11yCert
				</div>
				<div
					style={{
						marginTop: 48,
						fontSize: 76,
						fontWeight: 800,
						lineHeight: 1.1,
						letterSpacing: "-0.03em",
					}}
				>
					IAAP CPACC · WAS
				</div>
				<div style={{ marginTop: 16, fontSize: 44, fontWeight: 600, opacity: 0.9 }}>
					Bilingual Certification Prep (KO · EN)
				</div>
				<div style={{ marginTop: 48, fontSize: 28, opacity: 0.7 }}>a11ycert.com</div>
			</div>
		),
		size
	);
}
