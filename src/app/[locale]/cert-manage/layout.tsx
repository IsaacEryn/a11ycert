import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import AdminNav from "@/components/admin/AdminNav";

export const metadata: Metadata = {
	// 관리자 콘솔은 검색엔진 노출 금지
	robots: { index: false, follow: false },
};

/**
 * 관리자 가드 레이아웃 — 하위 전 페이지에 1회 적용.
 * 비로그인·비관리자는 redirect가 아닌 notFound()로 경로 존재 자체를 숨긴다.
 * 데이터 접근의 최종 방어선은 RLS/RPC의 is_admin() (005/006 마이그레이션).
 */
export default async function AdminLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setRequestLocale(locale);

	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) notFound();

	const { data: profile } = await supabase
		.from("profiles")
		.select("role")
		.eq("id", user.id)
		.single();
	if (profile?.role !== "admin") notFound();

	const t = await getTranslations({ locale, namespace: "admin" });

	// 미처리 제보 수 배지
	const { count: pendingReports } = await supabase
		.from("reports")
		.select("id", { count: "exact", head: true })
		.in("status", ["open", "in_review"]);

	return (
		<div className="container" style={{ paddingTop: "var(--space-8)", paddingBottom: "var(--space-10)" }}>
			<h1 style={{ fontSize: "var(--fs-xl)", fontWeight: 700 }}>{t("title")}</h1>
			<div
				className="grid items-start gap-8 md:grid-cols-[200px_1fr]"
				style={{ marginTop: "var(--space-6)" }}
			>
				<AdminNav locale={locale} pendingReports={pendingReports ?? 0} />
				<div style={{ minWidth: 0 }}>{children}</div>
			</div>
		</div>
	);
}
