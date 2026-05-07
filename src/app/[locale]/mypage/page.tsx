"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth/AuthProvider";
import ProfileEditor from "@/components/mypage/ProfileEditor";

export default function MyPage() {
	const { user, profile, isLoading, signOut } = useAuth();
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

	const providerLabel =
		{ google: "Google", github: "GitHub", kakao: "Kakao" }[profile?.provider ?? ""] ??
		(isKo ? "소셜 로그인" : "Social Login");

	const joinedAt = profile?.created_at
		? new Date(profile.created_at).toLocaleDateString(isKo ? "ko-KR" : "en-US", {
				year: "numeric", month: "long", day: "numeric",
		  })
		: "";

	const initial = (profile?.nickname || user.email || "U").charAt(0).toUpperCase();

	return (
		<div style={{ maxWidth: 672, margin: "0 auto", padding: "var(--space-10) var(--space-4)" }}>
			<h1 style={{ fontSize: "var(--fs-xl)", fontWeight: 700, color: "var(--fg)" }}>
				{isKo ? "나의 정보" : "My Profile"}
			</h1>

			{/* 프로필 카드 */}
			<section
				aria-labelledby="profile-info"
				style={{ marginTop: "var(--space-6)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", padding: "var(--space-6)" }}
			>
				<h2 id="profile-info" style={{ fontSize: "var(--fs-sm)", fontWeight: 600, color: "var(--fg-muted)" }}>
					{isKo ? "계정 정보" : "Account Information"}
				</h2>

				<div style={{ marginTop: "var(--space-4)", display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
					{profile?.avatar_url ? (
						<img
							src={profile.avatar_url}
							alt=""
							style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
							referrerPolicy="no-referrer"
						/>
					) : (
						<span style={{
							flexShrink: 0, width: 56, height: 56, borderRadius: "50%",
							background: "var(--accent-soft)", color: "var(--accent-soft-fg)",
							display: "flex", alignItems: "center", justifyContent: "center",
							fontSize: "var(--fs-xl)", fontWeight: 700,
						}}>
							{initial}
						</span>
					)}
					<div>
						<p style={{ fontWeight: 600, color: "var(--fg)" }}>
							{profile?.nickname || (isKo ? "닉네임 없음" : "No nickname")}
						</p>
						<p style={{ fontSize: "var(--fs-sm)", color: "var(--fg-muted)", marginTop: 2 }}>{user.email}</p>
						<p style={{ fontSize: "var(--fs-xs)", color: "var(--fg-subtle)", marginTop: 2 }}>
							{providerLabel}{joinedAt ? ` · ${isKo ? "가입일" : "Joined"} ${joinedAt}` : ""}
						</p>
					</div>
				</div>

				<div style={{ marginTop: "var(--space-5)" }}>
					<p style={{ fontSize: "var(--fs-xs)", fontWeight: 500, color: "var(--fg-muted)", marginBottom: "var(--space-2)" }}>
						{isKo ? "닉네임 변경" : "Change Nickname"}
					</p>
					<ProfileEditor locale={locale} />
				</div>
			</section>

			{/* 나의 시험장 바로가기 */}
			<section aria-labelledby="exam-room-link" style={{ marginTop: "var(--space-6)" }}>
				<h2 id="exam-room-link" style={{ fontSize: "var(--fs-sm)", fontWeight: 600, color: "var(--fg-muted)", marginBottom: "var(--space-3)" }}>
					{isKo ? "학습 현황" : "Study Status"}
				</h2>
				<Link
					href={`/${locale}/mypage/exam-room`}
					style={{
						display: "flex", alignItems: "center", justifyContent: "space-between",
						borderRadius: "var(--radius-lg)", border: "1px solid var(--border)",
						padding: "var(--space-4) var(--space-5)", textDecoration: "none",
						transition: "border-color var(--dur-fast), background var(--dur-fast)",
					}}
					onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.background = "var(--accent-soft)"; }}
					onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = ""; }}
				>
					<div>
						<p style={{ fontSize: "var(--fs-sm)", fontWeight: 500, color: "var(--fg)" }}>
							{isKo ? "오답노트 · 저장한 문제 · 학습 메모" : "Wrong Answers · Saved Questions · Notes"}
						</p>
						<p style={{ fontSize: "var(--fs-xs)", color: "var(--fg-subtle)", marginTop: 2 }}>
							{isKo ? "나의 시험장에서 모아보기" : "View in My Exam Room"}
						</p>
					</div>
					<span aria-hidden="true" style={{ color: "var(--fg-subtle)", fontSize: "var(--fs-md)" }}>→</span>
				</Link>
			</section>

			{/* 로그아웃 */}
			<div style={{ marginTop: "var(--space-8)", paddingTop: "var(--space-6)", borderTop: "1px solid var(--divider)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
				<Link
					href={`/${locale}`}
					style={{ fontSize: "var(--fs-sm)", color: "var(--fg-subtle)", textDecoration: "none" }}
				>
					← {isKo ? "홈으로" : "Back to Home"}
				</Link>
				<button
					onClick={async () => { await signOut(); router.push(`/${locale}`); }}
					style={{
						display: "flex", alignItems: "center", gap: "var(--space-2)",
						fontSize: "var(--fs-sm)", fontWeight: 500, color: "var(--danger)",
						background: "none", border: "1px solid var(--danger)", borderRadius: "var(--radius)",
						padding: "var(--space-2) var(--space-4)", cursor: "pointer",
						transition: "background var(--dur-fast)",
					}}
					onMouseEnter={(e) => { e.currentTarget.style.background = "var(--danger-soft)"; }}
					onMouseLeave={(e) => { e.currentTarget.style.background = "none"; }}
				>
					<svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
					</svg>
					{isKo ? "로그아웃" : "Sign Out"}
				</button>
			</div>
		</div>
	);
}
