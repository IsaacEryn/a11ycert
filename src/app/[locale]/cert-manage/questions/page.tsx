import { setRequestLocale } from "next-intl/server";
import QuestionsClient from "@/components/admin/QuestionsClient";

export default async function AdminQuestionsPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setRequestLocale(locale);
	return <QuestionsClient />;
}
