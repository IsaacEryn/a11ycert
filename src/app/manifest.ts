import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "A11yCert — IAAP 자격증 한국어 학습",
		short_name: "A11yCert",
		description: "IAAP CPACC & WAS 자격증 시험을 한국어와 영어로 준비하는 이중 언어 학습 플랫폼",
		start_url: "/ko",
		display: "standalone",
		background_color: "#0b1220",
		theme_color: "#1E4FD8",
		icons: [
			{ src: "/icon-192.png", sizes: "192x192", type: "image/png" },
			{ src: "/icon-512.png", sizes: "512x512", type: "image/png" },
			{ src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
		],
	};
}
