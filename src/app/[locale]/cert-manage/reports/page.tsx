import { setRequestLocale } from "next-intl/server";
import ReportsClient from "@/components/admin/ReportsClient";

export default async function AdminReportsPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setRequestLocale(locale);
	return <ReportsClient locale={locale} />;
}
