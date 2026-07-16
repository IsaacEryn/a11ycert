import { setRequestLocale } from "next-intl/server";
import { CERTS, getCertContent } from "@/lib/content";
import MypageHomeClient, { type CertHomeData } from "@/components/mypage/MypageHomeClient";

/**
 * 마이페이지 홈 — 서버에서 콘텐츠 파생 데이터(단원 수·문항 id 목록)만 계산해
 * 클라이언트에 전달한다. 클라이언트가 콘텐츠 모듈을 직접 import하면
 * 전체 학습 콘텐츠가 번들에 포함되므로 금지.
 */
export default async function MyPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setRequestLocale(locale);

	const certData: CertHomeData[] = CERTS.map((cert) => {
		const units = getCertContent(cert).units.filter((u) => u.available);
		return {
			cert,
			totalUnits: units.length,
			questionIds: units.flatMap((u) => u.questions.map((q) => q.id)),
		};
	});

	return <MypageHomeClient locale={locale} certData={certData} />;
}
