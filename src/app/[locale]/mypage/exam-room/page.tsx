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

	if (isLoading) {
		return (
			<div className="mx-auto max-w-3xl px-4 py-16 text-center text-sm text-gray-400">
				{isKo ? "불러오는 중..." : "Loading..."}
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
			{/* Breadcrumb */}
			<nav className="mb-6 text-xs text-gray-400">
				<ol className="flex items-center gap-1" role="list">
					<li>
						<Link href={`/${locale}/mypage`} className="hover:text-blue-600 no-underline">
							{isKo ? "나의 정보" : "My Profile"}
						</Link>
					</li>
					<li aria-hidden="true">/</li>
					<li className="text-gray-600" aria-current="page">
						{isKo ? "나의 시험장" : "My Exam Room"}
					</li>
				</ol>
			</nav>

			<h1 className="text-2xl font-bold text-gray-900">{isKo ? "나의 시험장" : "My Exam Room"}</h1>
			<p className="mt-1 text-sm text-gray-500">
				{isKo
					? "오답 노트, 저장한 문제, 학습 메모를 한 곳에서 관리하세요."
					: "Manage your wrong answers, saved questions, and study notes in one place."}
			</p>

			<div className="mt-8">
				<ExamRoomTabs locale={locale} />
			</div>
		</div>
	);
}
