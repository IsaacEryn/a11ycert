import { setRequestLocale } from "next-intl/server";
import LogsClient from "@/components/admin/LogsClient";

export default async function AdminLogsPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setRequestLocale(locale);
	return <LogsClient locale={locale} />;
}
