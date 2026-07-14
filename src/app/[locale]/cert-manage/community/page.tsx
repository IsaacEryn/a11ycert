import { setRequestLocale } from "next-intl/server";
import CommunityModerationClient from "@/components/admin/CommunityModerationClient";

export default async function AdminCommunityPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setRequestLocale(locale);
	return <CommunityModerationClient locale={locale} />;
}
