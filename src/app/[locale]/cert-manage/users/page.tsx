import { setRequestLocale } from "next-intl/server";
import UsersClient from "@/components/admin/UsersClient";

export default async function AdminUsersPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setRequestLocale(locale);
	return <UsersClient locale={locale} />;
}
