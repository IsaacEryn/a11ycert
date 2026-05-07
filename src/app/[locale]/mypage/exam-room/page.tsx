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
		<div style={{ maxWidth: 768, margin: "0 auto", padding: "var(--space-10) var(--space-4)" }}>
			{/* Breadcrumb */}
			<nav style={{ marginBottom: "var(--space-6)", fontSize: "var(--fs-xs)", color: "var(--fg-subtle)" }}>
				<ol style={{ display: "flex", alignItems: "center", gap: "var(--space-1)", listStyle: "none", margin: 0, padding: 0 }}>
					<li>
						<Link href={`/${locale}/mypage`} style={{ color: "var(--fg-subtle)", textDecoration: "none" }}
							onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
							onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-subtle)")}
						>
							{isKo ? "나의 정보" : "My Profile"}
						</Link>
					</li>
					<li aria-hidden="true" style={{ color: "var(--fg-subtle)" }}>/</li>
					<li style={{ color: "var(--fg-muted)" }} aria-current="page">
						{isKo ? "나의 시험장" : "My Exam Room"}
					</li>
				</ol>
			</nav>

			<h1 style={{ fontSize: "var(--fs-xl)", fontWeight: 700, color: "var(--fg)" }}>
				{isKo ? "나의 시험장" : "My Exam Room"}
			</h1>
			<p style={{ marginTop: "var(--space-1)", fontSize: "var(--fs-sm)", color: "var(--fg-muted)" }}>
				{isKo
					? "오답 노트, 저장한 문제, 학습 메모를 한 곳에서 관리하세요."
					: "Manage your wrong answers, saved questions, and study notes in one place."}
			</p>

			<div style={{ marginTop: "var(--space-8)" }}>
				<ExamRoomTabs locale={locale} />
			</div>
		</div>
	);
}
