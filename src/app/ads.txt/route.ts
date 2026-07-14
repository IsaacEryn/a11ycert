import { ADSENSE_ID } from "@/lib/ads";

/** AdSense 필수 파일 — NEXT_PUBLIC_ADSENSE_ID 설정 시에만 내용 제공 */
export function GET() {
	if (!ADSENSE_ID) {
		return new Response("Not Found", { status: 404 });
	}
	// ca-pub-XXXX → pub-XXXX (ads.txt 표기 형식)
	const publisherId = ADSENSE_ID.replace(/^ca-/, "");
	return new Response(`google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`, {
		headers: { "Content-Type": "text/plain" },
	});
}
