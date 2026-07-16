"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth/AuthProvider";
import ExamRoomTabs from "@/components/mypage/ExamRoomTabs";

export default function ExamRoomPage() {
	const { user, isLoading } = useAuth();
	const router = useRouter();
	const params = useParams();
	const locale = params.locale as string;
	const t = useTranslations("examRoom");

	useEffect(() => {
		if (!isLoading && !user) {
			router.push(`/${locale}`);
		}
	}, [isLoading, user, router, locale]);

	if (isLoading || !user) {
		return (
			<div style={{ padding: "var(--space-16) var(--space-4)", textAlign: "center", fontSize: "var(--fs-sm)", color: "var(--fg-subtle)" }}>
				{t("loading")}
			</div>
		);
	}

	return (
		<div>
			<h1 style={{ fontSize: "var(--fs-xl)", fontWeight: 700, color: "var(--fg)" }}>
				{t("myExamRoom")}
			</h1>
			<p style={{ marginTop: "var(--space-1)", fontSize: "var(--fs-sm)", color: "var(--fg-muted)" }}>
				{t("manageYourWrongAnswers")}
			</p>
			<p style={{ marginTop: "var(--space-2)" }}>
				<Link href={`/${locale}/mypage/stats`} className="btn btn--sm">
					{t("viewProgressStats")}
				</Link>
			</p>

			<div style={{ marginTop: "var(--space-8)" }}>
				<ExamRoomTabs locale={locale} />
			</div>
		</div>
	);
}
