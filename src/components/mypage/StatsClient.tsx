"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { useOptionalAuth } from "@/lib/auth/AuthProvider";
import { useLearningStore, type LocalAttempt } from "@/lib/store/learningStore";
import { CERTS, type Cert } from "@/lib/content/certs";

interface AttemptRow extends LocalAttempt {
	cert: Cert;
}

function formatDuration(seconds: number | null): string {
	if (seconds == null) return "—";
	const m = Math.floor(seconds / 60);
	const s = seconds % 60;
	return `${m}:${String(s).padStart(2, "0")}`;
}

/** 시도 이력 + 도메인별 누적 정답률 (로그인: DB, 비로그인: localStorage) */
export default function StatsClient({ locale }: { locale: string }) {
	const t = useTranslations("stats");
	const auth = useOptionalAuth();
	const userId = auth?.user?.id ?? null;
	const isAuthLoading = auth?.isLoading ?? false;
	const { getAttempts } = useLearningStore();

	const [dbAttempts, setDbAttempts] = useState<AttemptRow[] | null>(null);

	useEffect(() => {
		if (!userId) {
			setDbAttempts(null);
			return;
		}
		let cancelled = false;
		(async () => {
			const supabase = createClient();
			const { data, error } = await supabase
				.from("quiz_attempts")
				.select("id, cert, mode, total, correct, duration_seconds, domain_stats, created_at")
				.order("created_at", { ascending: false })
				.limit(40);
			if (error) {
				console.error("[StatsClient]", error.message);
				return;
			}
			if (cancelled || !data) return;
			interface DbAttemptRow {
				id: string;
				cert: string;
				mode: "practice" | "mock";
				total: number;
				correct: number;
				duration_seconds: number | null;
				domain_stats: Record<string, { total: number; correct: number }> | null;
				created_at: string;
			}
			setDbAttempts(
				(data as DbAttemptRow[]).map((row) => ({
					id: row.id,
					cert: row.cert as Cert,
					mode: row.mode,
					total: row.total,
					correct: row.correct,
					durationSeconds: row.duration_seconds,
					domainStats: row.domain_stats ?? {},
					createdAt: row.created_at,
				}))
			);
		})();
		return () => {
			cancelled = true;
		};
	}, [userId]);

	const attempts: AttemptRow[] = useMemo(() => {
		if (dbAttempts) return dbAttempts;
		return CERTS.flatMap((cert) => getAttempts(cert).map((a) => ({ ...a, cert })));
	}, [dbAttempts, getAttempts]);

	if (isAuthLoading) return null;

	if (attempts.length === 0) {
		return (
			<p style={{ marginTop: "var(--space-6)", fontSize: "var(--fs-sm)", color: "var(--fg-muted)" }}>
				{t("noAttempts")}
			</p>
		);
	}

	return (
		<div style={{ marginTop: "var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
			{!userId && (
				<p style={{ fontSize: "var(--fs-xs)", color: "var(--fg-subtle)" }}>{t("localOnly")}</p>
			)}

			{CERTS.map((cert) => {
				const certAttempts = attempts.filter((a) => a.cert === cert);
				if (certAttempts.length === 0) return null;

				// 도메인별 누적 집계
				const agg: Record<string, { total: number; correct: number }> = {};
				for (const a of certAttempts) {
					for (const [d, s] of Object.entries(a.domainStats ?? {})) {
						agg[d] ??= { total: 0, correct: 0 };
						agg[d].total += s.total;
						agg[d].correct += s.correct;
					}
				}
				const domains = Object.entries(agg).sort(([a], [b]) => a.localeCompare(b));
				const weakest = domains.reduce<[string, { total: number; correct: number }] | null>(
					(min, cur) => {
						const rate = cur[1].total > 0 ? cur[1].correct / cur[1].total : 1;
						const minRate = min && min[1].total > 0 ? min[1].correct / min[1].total : 1;
						return !min || rate < minRate ? cur : min;
					},
					null
				);

				return (
					<section key={cert} aria-labelledby={`stats-${cert}`}>
						<h2 id={`stats-${cert}`} style={{ fontSize: "var(--fs-lg)", fontWeight: 700 }}>
							{cert.toUpperCase()}
						</h2>

						{/* 도메인별 누적 정답률 */}
						{domains.length > 0 && (
							<div style={{ marginTop: "var(--space-3)" }}>
								<h3 style={{ fontSize: "var(--fs-sm)", fontWeight: 600, color: "var(--fg-muted)" }}>
									{t("domainAccuracy")}
								</h3>
								<ul style={{ marginTop: "var(--space-2)", display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
									{domains.map(([d, s]) => {
										const pct = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0;
										return (
											<li key={d}>
												<div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--fs-sm)" }}>
													<span>Domain {d}</span>
													<span style={{ color: "var(--fg-muted)" }}>
														{s.correct}/{s.total} ({pct}%)
													</span>
												</div>
												<div className="progress-track" style={{ marginTop: 2 }}>
													<div className="progress-fill" style={{ width: `${pct}%` }} />
												</div>
											</li>
										);
									})}
								</ul>
								{weakest && (
									<p style={{ marginTop: "var(--space-3)", fontSize: "var(--fs-sm)", color: "var(--fg-muted)" }}>
										{t("weakest", { domain: `Domain ${weakest[0]}` })}{" "}
										<Link href={`/${locale}/${cert}/study`} style={{ color: "var(--accent)" }}>
											{t("goStudy")}
										</Link>
									</p>
								)}
							</div>
						)}

						{/* 최근 시도 테이블 */}
						<h3 style={{ marginTop: "var(--space-5)", fontSize: "var(--fs-sm)", fontWeight: 600, color: "var(--fg-muted)" }}>
							{t("recentAttempts")}
						</h3>
						<div style={{ overflowX: "auto", marginTop: "var(--space-2)" }}>
							<table
								aria-label={t("attemptsTableLabel", { cert: cert.toUpperCase() })}
								style={{ width: "100%", fontSize: "var(--fs-sm)", borderCollapse: "collapse" }}
							>
								<thead>
									<tr style={{ textAlign: "left", color: "var(--fg-subtle)", fontSize: "var(--fs-xs)" }}>
										<th scope="col" style={{ padding: "var(--space-2)", borderBottom: "1px solid var(--divider)" }}>{t("date")}</th>
										<th scope="col" style={{ padding: "var(--space-2)", borderBottom: "1px solid var(--divider)" }}>{t("mode")}</th>
										<th scope="col" style={{ padding: "var(--space-2)", borderBottom: "1px solid var(--divider)" }}>{t("score")}</th>
										<th scope="col" style={{ padding: "var(--space-2)", borderBottom: "1px solid var(--divider)" }}>{t("durationHeader")}</th>
									</tr>
								</thead>
								<tbody>
									{certAttempts.slice(0, 10).map((a) => (
										<tr key={a.id}>
											<td style={{ padding: "var(--space-2)", borderBottom: "1px solid var(--divider)" }}>
												{new Date(a.createdAt).toLocaleDateString(locale === "ko" ? "ko-KR" : "en-US")}
											</td>
											<td style={{ padding: "var(--space-2)", borderBottom: "1px solid var(--divider)" }}>
												{a.mode === "mock" ? t("modeMock") : t("modePractice")}
											</td>
											<td style={{ padding: "var(--space-2)", borderBottom: "1px solid var(--divider)" }}>
												{a.correct}/{a.total} ({a.total > 0 ? Math.round((a.correct / a.total) * 100) : 0}%)
											</td>
											<td style={{ padding: "var(--space-2)", borderBottom: "1px solid var(--divider)" }}>
												{formatDuration(a.durationSeconds)}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</section>
				);
			})}
		</div>
	);
}
