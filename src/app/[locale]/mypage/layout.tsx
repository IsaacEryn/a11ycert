import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import MypageNav from "@/components/mypage/MypageNav";

// 마이페이지 하위는 클라이언트 컴포넌트라 여기서 메타데이터 제공 (개인 영역 — noindex)
export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "mypage" });
	return { title: t("title"), robots: { index: false } };
}

export default async function MypageLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setRequestLocale(locale);

	return (
		<div style={{ maxWidth: 768, margin: "0 auto", padding: "var(--space-10) var(--space-4)", width: "100%" }}>
			<MypageNav locale={locale} />
			{children}
		</div>
	);
}
