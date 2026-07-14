import { setRequestLocale } from "next-intl/server";
import MypageNav from "@/components/mypage/MypageNav";

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
