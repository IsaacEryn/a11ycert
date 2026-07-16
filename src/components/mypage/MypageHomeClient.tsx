/* eslint-disable @next/next/no-img-element -- 아바타는 임의 외부 호스트 URL이라 next/image 부적합 */
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useAuth } from "@/lib/auth/AuthProvider";
import { useLearningStore } from "@/lib/store/learningStore";
import type { Cert } from "@/lib/content/certs";
import { isDue } from "@/lib/srs/leitner";

/** 서버 페이지가 콘텐츠에서 미리 계산해 내려주는 cert별 경량 데이터 */
export interface CertHomeData {
	cert: Cert;
	totalUnits: number;
	questionIds: string[];
}

export default function MypageHomeClient({
	locale,
	certData,
}: {
	locale: string;
	certData: CertHomeData[];
}) {
	const { user, profile, isLoading, signOut } = useAuth();
	const t = useTranslations("mypage");
	const router = useRouter();
	const isKo = locale === "ko";

	const { getCompletedCount, getWrongNotes, getSrsMap, getAttempts } = useLearningStore();

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

	const providerLabel =
		{ google: "Google", github: "GitHub", kakao: "Kakao" }[profile?.provider ?? ""] ?? t("home.socialLogin");

	const joinedAt = profile?.created_at
		? new Date(profile.created_at).toLocaleDateString(isKo ? "ko-KR" : "en-US", {
				year: "numeric", month: "long", day: "numeric",
			})
		: "";

	const initial = (profile?.nickname || user.email || "U").charAt(0).toUpperCase();

	// cert별 학습 요약 (learningStore — 비로그인/로그인 공통 로컬 상태)
	const now = new Date();
	const certSummaries = certData.map(({ cert, totalUnits, questionIds }) => {
		const srsMap = getSrsMap(cert);
		return {
			cert,
			done: getCompletedCount(cert),
			total: totalUnits,
			wrong: getWrongNotes(cert).length,
			due: questionIds.filter((id) => isDue(srsMap[id], now)).length,
		};
	});

	const recentAttempts = certData
		.flatMap(({ cert }) => getAttempts(cert).map((a) => ({ ...a, cert })))
		.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
		.slice(0, 3);

	const cardStyle: React.CSSProperties = {
		border: "1px solid var(--border)",
		borderRadius: "var(--radius-lg)",
		padding: "var(--space-4)",
	};

	return (
		<div>
			<h1 style={{ fontSize: "var(--fs-xl)", fontWeight: 700, color: "var(--fg)" }}>{t("title")}</h1>

			{/* 프로필 카드 (축소) */}
			<section
				aria-labelledby="profile-info"
				style={{ marginTop: "var(--space-5)", ...cardStyle, display: "flex", alignItems: "center", gap: "var(--space-4)" }}
			>
				<h2 id="profile-info" className="sr-only">{t("home.accountInfo")}</h2>
				{profile?.avatar_url ? (
					<img
						src={profile.avatar_url}
						alt=""
						style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
						referrerPolicy="no-referrer"
					/>
				) : (
					<span style={{
						flexShrink: 0, width: 48, height: 48, borderRadius: "50%",
						background: "var(--accent-soft)", color: "var(--accent-soft-fg)",
						display: "flex", alignItems: "center", justifyContent: "center",
						fontSize: "var(--fs-lg)", fontWeight: 700,
					}}>
						{initial}
					</span>
				)}
				<div style={{ minWidth: 0 }}>
					<p style={{ fontWeight: 600, color: "var(--fg)" }}>
						{profile?.nickname || t("home.noNickname")}
					</p>
					<p style={{ fontSize: "var(--fs-xs)", color: "var(--fg-subtle)", marginTop: 2 }}>
						{user.email} · {providerLabel}
						{joinedAt ? ` · ${t("home.joined")} ${joinedAt}` : ""}
					</p>
				</div>
			</section>

			{/* 학습 요약 카드 */}
			<section aria-labelledby="study-summary" style={{ marginTop: "var(--space-6)" }}>
				<h2 id="study-summary" style={{ fontSize: "var(--fs-sm)", fontWeight: 600, color: "var(--fg-muted)" }}>
					{t("home.studySummary")}
				</h2>
				<div className="grid gap-3 sm:grid-cols-2" style={{ marginTop: "var(--space-3)" }}>
					{certSummaries.map(({ cert, done, total, wrong, due }) => (
						<div key={cert} style={cardStyle}>
							<p style={{ fontWeight: 700, fontSize: "var(--fs-sm)" }}>{cert.toUpperCase()}</p>
							<dl style={{ marginTop: "var(--space-3)", display: "flex", flexDirection: "column", gap: "var(--space-2)", fontSize: "var(--fs-sm)" }}>
								<div style={{ display: "flex", justifyContent: "space-between" }}>
									<dt style={{ color: "var(--fg-muted)" }}>{t("home.progress")}</dt>
									<dd>
										<Link href={`/${locale}/${cert}/study`} style={{ color: "var(--accent)" }}>
											{t("home.progressValue", { done, total })}
										</Link>
									</dd>
								</div>
								<div style={{ display: "flex", justifyContent: "space-between" }}>
									<dt style={{ color: "var(--fg-muted)" }}>{t("home.wrongCount")}</dt>
									<dd>
										<Link href={`/${locale}/${cert}/wrong-answers`} style={{ color: wrong > 0 ? "var(--danger)" : "var(--fg)", fontWeight: 600 }}>
											{wrong}
										</Link>
									</dd>
								</div>
								<div style={{ display: "flex", justifyContent: "space-between" }}>
									<dt style={{ color: "var(--fg-muted)" }}>{t("home.dueCards")}</dt>
									<dd>
										<Link href={`/${locale}/${cert}/flashcards`} style={{ color: "var(--accent)", fontWeight: 600 }}>
											{due}
										</Link>
									</dd>
								</div>
							</dl>
						</div>
					))}
				</div>
			</section>

			{/* 최근 시도 */}
			<section aria-labelledby="recent-attempts" style={{ marginTop: "var(--space-6)" }}>
				<h2 id="recent-attempts" style={{ fontSize: "var(--fs-sm)", fontWeight: 600, color: "var(--fg-muted)" }}>
					{t("home.recentAttempts")}
				</h2>
				{recentAttempts.length === 0 ? (
					<p style={{ marginTop: "var(--space-2)", fontSize: "var(--fs-sm)", color: "var(--fg-subtle)" }}>
						{t("home.noAttempts")}
					</p>
				) : (
					<ul style={{ marginTop: "var(--space-3)", display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
						{recentAttempts.map((a) => (
							<li
								key={a.id}
								style={{ display: "flex", justifyContent: "space-between", gap: "var(--space-3)", fontSize: "var(--fs-sm)", borderBottom: "1px solid var(--divider)", paddingBottom: "var(--space-2)" }}
							>
								<span>
									<strong>{a.cert.toUpperCase()}</strong>{" "}
									{t("home.attemptLine", {
										mode: a.mode === "mock" ? t("home.modeMock") : t("home.modePractice"),
										correct: a.correct,
										total: a.total,
										pct: a.total > 0 ? Math.round((a.correct / a.total) * 100) : 0,
									})}
								</span>
								<span style={{ color: "var(--fg-subtle)", fontSize: "var(--fs-xs)", whiteSpace: "nowrap" }}>
									{new Date(a.createdAt).toLocaleDateString(isKo ? "ko-KR" : "en-US")}
								</span>
							</li>
						))}
					</ul>
				)}
				<div style={{ marginTop: "var(--space-4)", display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
					<Link className="btn btn--sm" href={`/${locale}/mypage/stats`}>{t("home.goStats")}</Link>
					<Link className="btn btn--sm" href={`/${locale}/mypage/exam-room`}>{t("home.goExamRoom")}</Link>
				</div>
			</section>

			{/* 하단 */}
			<div style={{ marginTop: "var(--space-8)", paddingTop: "var(--space-6)", borderTop: "1px solid var(--divider)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
				<Link href={`/${locale}`} style={{ fontSize: "var(--fs-sm)", color: "var(--fg-subtle)", textDecoration: "none" }}>
					← {t("home.backHome")}
				</Link>
				<button
					onClick={async () => { await signOut(); router.push(`/${locale}`); }}
					style={{
						display: "flex", alignItems: "center", gap: "var(--space-2)",
						fontSize: "var(--fs-sm)", fontWeight: 500, color: "var(--danger)",
						background: "none", border: "1px solid var(--danger)", borderRadius: "var(--radius)",
						padding: "var(--space-2) var(--space-4)", cursor: "pointer",
					}}
				>
					{t("home.signOut")}
				</button>
			</div>
		</div>
	);
}
