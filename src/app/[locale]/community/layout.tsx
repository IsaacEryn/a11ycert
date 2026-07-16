import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

// 커뮤니티 페이지들은 클라이언트 컴포넌트라 여기(레이아웃)서 메타데이터 제공
export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "community" });
	return { title: t("title") };
}

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
	return children;
}
