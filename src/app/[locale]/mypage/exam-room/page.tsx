"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth/AuthProvider";
import ExamRoomTabs from "@/components/mypage/ExamRoomTabs";

export default function ExamRoomPage() {
	const { user, isLoading } = useAuth();
	const router = useRouter();
	const params = useParams();
	const locale = params.locale as string;
	const isKo = locale === "ko";

	useEffect(() => {
		if (!isLoading && !user) {
			router.push(`/${locale}`);
		}
	}, [isLoading, user, router, locale]);

	if (isLoading || !user) {
		return (
			<div style={{ padding: "var(--space-16) var(--space-4)", textAlign: "center", fontSize: "var(--fs-sm)", color: "var(--fg-subtle)" }}>
				{isKo ? "불러오는 중..." : "Loading..."}
			</div>
		);
	}

	return (
		<div>
			<h1 style={{ fontSize: "var(--fs-xl)", fontWeight: 700, color: "var(--fg)" }}>
				{isKo ? "나의 시험장" : "My Exam Room"}
			</h1>
			<p style={{ marginTop: "var(--space-1)", fontSize: "var(--fs-sm)", color: "var(--fg-muted)" }}>
				{isKo
					? "오답 노트, 저장한 문제, 학습 메모를 한 곳에서 관리하세요."
					: "Manage your wrong answers, saved questions, and study notes in one place."}
			</p>
			<p style={{ marginTop: "var(--space-2)" }}>
				<Link href={`/${locale}/mypage/stats`} className="btn btn--sm">
					{isKo ? "성취도 분석 보기 →" : "View Progress & Stats →"}
				</Link>
			</p>

			<div style={{ marginTop: "var(--space-8)" }}>
				<ExamRoomTabs locale={locale} />
			</div>
		</div>
	);
}
