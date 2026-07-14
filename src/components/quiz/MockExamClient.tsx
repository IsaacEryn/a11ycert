"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import type { QuizQuestion } from "@/lib/content/types";
import type { Cert } from "@/lib/content";
import { buildMockExam, computeDomainStats, MOCK_EXAM_PRESETS } from "@/lib/quiz/mock-exam";
import { useLearningStore, type LocalAttempt } from "@/lib/store/learningStore";
import { useOptionalAuth } from "@/lib/auth/AuthProvider";
import { syncAttemptToDB, syncWrongAnswerToDB } from "@/lib/store/learning-sync";
import BilingualText from "@/components/BilingualText";
import { OPTION_KEYS, type OptionKey } from "./useQuizSession";

interface Props {
	pool: QuizQuestion[];
	locale: string;
	cert: Cert;
}

type Stage = "intro" | "exam" | "result";

/** aria-live로 알릴 잔여 시간 임계값 (초) */
const ANNOUNCE_THRESHOLDS = [600, 300, 60];

function formatClock(totalSeconds: number): string {
	const m = Math.floor(totalSeconds / 60);
	const s = totalSeconds % 60;
	return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function MockExamClient({ pool, locale, cert }: Props) {
	const t = useTranslations("mockExam");
	const preset = MOCK_EXAM_PRESETS[cert];

	const [stage, setStage] = useState<Stage>("intro");
	const [timerEnabled, setTimerEnabled] = useState(true);
	const [timerVisible, setTimerVisible] = useState(true);
	const [questions, setQuestions] = useState<QuizQuestion[]>([]);
	const [current, setCurrent] = useState(0);
	const [answers, setAnswers] = useState<Record<number, OptionKey>>({});
	const [remaining, setRemaining] = useState(preset.timeLimitMinutes * 60);
	const [liveMessage, setLiveMessage] = useState("");
	const [timeUp, setTimeUp] = useState(false);

	const startedAtRef = useRef<number | null>(null);
	const announcedRef = useRef<Set<number>>(new Set());
	const resultHeadingRef = useRef<HTMLHeadingElement>(null);
	const questionHeadingRef = useRef<HTMLHeadingElement>(null);
	const submittedRef = useRef(false);

	const { addWrongAnswer, removeWrongAnswer, recordAttempt, languageMode } = useLearningStore();
	const auth = useOptionalAuth();
	const userId = auth?.user?.id ?? null;

	const correctCount = useMemo(
		() => questions.filter((q, i) => answers[i] === q.answer).length,
		[questions, answers]
	);
	const unansweredCount = questions.length - Object.keys(answers).length;

	const submit = useCallback(
		(reason: "manual" | "timeout") => {
			if (submittedRef.current) return;
			submittedRef.current = true;

			const durationSeconds = startedAtRef.current
				? Math.round((Date.now() - startedAtRef.current) / 1000)
				: null;
			const domainStats = computeDomainStats(questions, answers);
			const correct = questions.filter((q, i) => answers[i] === q.answer).length;

			// 오답노트 반영
			questions.forEach((q, i) => {
				const picked = answers[i];
				if (!picked) return;
				if (picked !== q.answer) {
					addWrongAnswer(cert, q.id);
					if (userId) syncWrongAnswerToDB(userId, q.id, picked);
				} else {
					removeWrongAnswer(cert, q.id);
				}
			});

			const attempt: LocalAttempt = {
				id: crypto.randomUUID(),
				mode: "mock",
				total: questions.length,
				correct,
				durationSeconds,
				domainStats,
				createdAt: new Date().toISOString(),
			};
			recordAttempt(cert, attempt);
			if (userId) {
				syncAttemptToDB(userId, cert, {
					mode: "mock",
					total: questions.length,
					correct,
					durationSeconds,
					domainStats,
					answers: questions.map((q, i) => ({
						qid: q.id,
						picked: answers[i] ?? "",
						correct: answers[i] === q.answer,
					})),
				});
			}

			if (reason === "timeout") setTimeUp(true);
			setStage("result");
		},
		[questions, answers, cert, userId, addWrongAnswer, removeWrongAnswer, recordAttempt]
	);

	// 단계 전환 시 새 화면의 헤딩으로 포커스 이동 (렌더 커밋 후)
	useEffect(() => {
		if (stage === "result") resultHeadingRef.current?.focus();
		else if (stage === "exam") questionHeadingRef.current?.focus();
	}, [stage]);

	// 타이머
	useEffect(() => {
		if (stage !== "exam" || !timerEnabled) return;
		const interval = setInterval(() => {
			setRemaining((prev) => {
				const next = prev - 1;
				for (const threshold of ANNOUNCE_THRESHOLDS) {
					if (next === threshold && !announcedRef.current.has(threshold)) {
						announcedRef.current.add(threshold);
						setLiveMessage(t("timeAlert", { minutes: Math.round(threshold / 60) }));
					}
				}
				if (next <= 0) {
					clearInterval(interval);
					setLiveMessage(t("timeUp"));
					submit("timeout");
					return 0;
				}
				return next;
			});
		}, 1000);
		return () => clearInterval(interval);
	}, [stage, timerEnabled, submit, t]);

	const start = () => {
		const exam = buildMockExam(cert, pool);
		if (exam.length === 0) return;
		setQuestions(exam);
		setAnswers({});
		setCurrent(0);
		setRemaining(preset.timeLimitMinutes * 60);
		setTimeUp(false);
		announcedRef.current = new Set();
		submittedRef.current = false;
		startedAtRef.current = Date.now();
		setStage("exam");
	};

	const handleSubmitClick = () => {
		if (unansweredCount > 0 && !window.confirm(t("confirmSubmit", { count: unansweredCount }))) {
			return;
		}
		submit("manual");
	};

	const goTo = (idx: number) => {
		setCurrent(Math.max(0, Math.min(questions.length - 1, idx)));
		requestAnimationFrame(() => questionHeadingRef.current?.focus());
	};

	// ── 시작 화면 ──────────────────────────────────────────────────────────
	if (stage === "intro") {
		return (
			<div className="quiz-shell">
				<div className="container">
					<div className="quiz-card" style={{ maxWidth: 640, margin: "0 auto" }}>
						<h1 className="quiz-q" style={{ fontSize: "var(--fs-xl)" }}>
							{t("introTitle", { cert: cert.toUpperCase() })}
						</h1>
						<p style={{ color: "var(--fg-muted)", fontSize: "var(--fs-sm)", marginTop: "var(--space-3)" }}>
							{t("introDesc")}
						</p>
						<ul style={{ marginTop: "var(--space-4)", fontSize: "var(--fs-sm)", color: "var(--fg-muted)", display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
							<li>· {t("questionCount", { count: Math.min(preset.totalQuestions, pool.length) })}</li>
							<li>· {t("timeLimit", { minutes: preset.timeLimitMinutes })}</li>
							<li>· {t("domainWeights")}</li>
						</ul>

						{/* 타이머 사용 여부 (WCAG 2.2.1 Timing Adjustable) */}
						<div
							role="group"
							aria-label={t("remaining")}
							className="lang-toggle"
							style={{ marginTop: "var(--space-5)", width: "fit-content" }}
						>
							<button aria-pressed={timerEnabled} onClick={() => setTimerEnabled(true)}>
								{t("timerOn")}
							</button>
							<button aria-pressed={!timerEnabled} onClick={() => setTimerEnabled(false)}>
								{t("timerOff")}
							</button>
						</div>

						<div style={{ marginTop: "var(--space-5)" }}>
							{pool.length === 0 ? (
								<p style={{ color: "var(--fg-muted)", fontSize: "var(--fs-sm)" }}>
									{t("notEnoughQuestions")}
								</p>
							) : (
								<button className="btn btn--primary" onClick={start}>
									{t("start")}
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}

	// ── 결과 화면 ──────────────────────────────────────────────────────────
	if (stage === "result") {
		const domainStats = computeDomainStats(questions, answers);
		const pct = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
		const durationSeconds = startedAtRef.current
			? Math.round((Date.now() - startedAtRef.current) / 1000)
			: null;

		return (
			<div className="quiz-shell">
				<div className="container" style={{ maxWidth: 720 }}>
					<div className="quiz-card">
						<h1
							ref={resultHeadingRef}
							tabIndex={-1}
							className="quiz-q"
							style={{ fontSize: "var(--fs-xl)", outline: "none" }}
						>
							{t("resultTitle")}
						</h1>
						{timeUp && (
							<p role="status" style={{ color: "var(--danger)", fontSize: "var(--fs-sm)", marginTop: "var(--space-2)" }}>
								{t("timeUp")}
							</p>
						)}
						<p style={{ margin: "var(--space-4) 0 0", fontSize: "var(--fs-3xl)", fontWeight: 700 }}>
							{correctCount}
							<span style={{ fontSize: "var(--fs-lg)", color: "var(--fg-muted)", fontWeight: 500 }}>
								{" "}/ {questions.length}
							</span>
						</p>
						<p style={{ color: "var(--fg-muted)", fontSize: "var(--fs-sm)", marginTop: "var(--space-1)" }}>
							{t("accuracy", { pct })}
							{durationSeconds != null && <> · {t("duration")} {formatClock(durationSeconds)}</>}
						</p>

						{/* 도메인별 정답률 — 색상 단독 전달 금지: 수치 텍스트 병기 */}
						<h2 style={{ fontSize: "var(--fs-md)", fontWeight: 700, marginTop: "var(--space-6)" }}>
							{t("domainBreakdown")}
						</h2>
						<ul style={{ marginTop: "var(--space-3)", display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
							{Object.entries(domainStats).map(([domain, s]) => {
								const dPct = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0;
								return (
									<li key={domain}>
										<div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--fs-sm)" }}>
											<span>{t("domainLabel", { domain })}</span>
											<span style={{ color: "var(--fg-muted)" }}>
												{s.correct}/{s.total} ({dPct}%)
											</span>
										</div>
										<div className="progress-track" style={{ marginTop: 4 }}>
											<div className="progress-fill" style={{ width: `${dPct}%` }} />
										</div>
									</li>
								);
							})}
						</ul>

						<div style={{ marginTop: "var(--space-6)", display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
							<button className="btn" onClick={() => setStage("intro")}>
								{t("retake")}
							</button>
							<Link className="btn btn--primary" href={`/${locale}/mypage/stats`}>
								{t("toStats")}
							</Link>
						</div>
					</div>

					{/* 문항 리뷰 */}
					<section aria-labelledby="mock-review" style={{ marginTop: "var(--space-6)" }}>
						<h2 id="mock-review" style={{ fontSize: "var(--fs-md)", fontWeight: 700, marginBottom: "var(--space-3)" }}>
							{t("reviewTitle")}
						</h2>
						<ul style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
							{questions.map((q, i) => {
								const picked = answers[i];
								const correct = picked === q.answer;
								return (
									<li
										key={q.id}
										className="quiz-card"
										style={{
											borderColor: correct ? "var(--success-soft)" : "var(--danger-soft)",
											padding: "var(--space-4)",
										}}
									>
										<p style={{ fontSize: "var(--fs-sm)", fontWeight: 600 }}>
											{i + 1}. <BilingualText field={q.question} variant="body" as="span" />
										</p>
										<p style={{ fontSize: "var(--fs-sm)", marginTop: "var(--space-2)", color: correct ? "var(--success)" : "var(--danger)" }}>
											{picked ? (
												<>
													{picked.toUpperCase()}. <BilingualText field={q.options[picked]} variant="label" as="span" />
													{correct ? " ✓" : " ✗"}
												</>
											) : (
												"—"
											)}
										</p>
										{!correct && (
											<p style={{ fontSize: "var(--fs-sm)", marginTop: "var(--space-1)", color: "var(--fg-muted)" }}>
												{q.answer.toUpperCase()}. <BilingualText field={q.options[q.answer]} variant="label" as="span" />
											</p>
										)}
										<div style={{ fontSize: "var(--fs-sm)", marginTop: "var(--space-2)", color: "var(--fg-muted)" }}>
											<BilingualText field={q.explanation} variant="body" as="p" />
										</div>
									</li>
								);
							})}
						</ul>
					</section>
				</div>
			</div>
		);
	}

	// ── 시험 진행 화면 ──────────────────────────────────────────────────────
	const q = questions[current];
	const selected = answers[current] ?? null;

	return (
		<div className="quiz-shell">
			<div className="container" style={{ maxWidth: 720 }}>
				{/* 잔여 시간 알림 (10/5/1분 시점만 갱신 — 매초 낭독 방지) */}
				<div aria-live="polite" role="status" className="sr-only">
					{liveMessage}
				</div>

				{/* Toolbar */}
				<div className="quiz-toolbar">
					<div className="quiz-toolbar__progress">
						<span className="quiz-toolbar__step">
							{t("question", { current: current + 1, total: questions.length })}
						</span>
						<div className="progress-track">
							<div
								className="progress-fill"
								style={{ width: `${((current + 1) / questions.length) * 100}%` }}
								role="progressbar"
								aria-valuenow={current + 1}
								aria-valuemin={1}
								aria-valuemax={questions.length}
								aria-label={t("question", { current: current + 1, total: questions.length })}
							/>
						</div>
					</div>
					{timerEnabled && (
						<div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center" }}>
							{timerVisible && (
								<span style={{ fontVariantNumeric: "tabular-nums", fontWeight: 600, fontSize: "var(--fs-sm)", color: remaining <= 60 ? "var(--danger)" : "var(--fg)" }}>
									<span className="sr-only">{t("remaining")} </span>
									{formatClock(remaining)}
								</span>
							)}
							<button className="btn btn--sm" onClick={() => setTimerVisible((v) => !v)}>
								{timerVisible ? t("timerHide") : t("timerShow")}
							</button>
							<button className="btn btn--sm" onClick={() => setRemaining((r) => r + 600)}>
								{t("extend")}
							</button>
						</div>
					)}
				</div>

				{/* Question */}
				<div className="quiz-card">
					<h2
						ref={questionHeadingRef}
						tabIndex={-1}
						className="quiz-q"
						style={{ outline: "none" }}
					>
						<BilingualText field={q.question} variant="heading" as="span" />
					</h2>

					<fieldset className="quiz-options" style={{ border: "none", padding: 0, margin: 0 }}>
						<legend className="sr-only">{t("selectAnswer")}</legend>
						{OPTION_KEYS.map((key) => {
							const srText = languageMode === "en-only" ? q.options[key].en : q.options[key].ko;
							return (
								<button
									key={key}
									type="button"
									className={`quiz-option${key === selected ? " is-selected" : ""}`}
									onClick={() => setAnswers((prev) => ({ ...prev, [current]: key }))}
									aria-pressed={key === selected}
									aria-label={`${key.toUpperCase()}. ${srText}`}
								>
									<span className="quiz-option__letter">{key.toUpperCase()}</span>
									<span className="quiz-option__text">
										<BilingualText field={q.options[key]} variant="option" as="span" aria-hidden="true" />
									</span>
								</button>
							);
						})}
					</fieldset>

					<div className="quiz-foot">
						<div style={{ fontSize: "var(--fs-xs)", color: "var(--fg-muted)" }}>
							{unansweredCount > 0 && t("unanswered", { count: unansweredCount })}
						</div>
						<div style={{ display: "flex", gap: "var(--space-2)" }}>
							<button className="btn" onClick={() => goTo(current - 1)} disabled={current === 0}>
								{t("prev")}
							</button>
							{current < questions.length - 1 ? (
								<button className="btn btn--primary" onClick={() => goTo(current + 1)}>
									{t("next")}
								</button>
							) : (
								<button className="btn btn--primary" onClick={handleSubmitClick}>
									{t("submit")}
								</button>
							)}
						</div>
					</div>
				</div>

				{/* 조기 제출 */}
				{current < questions.length - 1 && (
					<div style={{ marginTop: "var(--space-4)", textAlign: "right" }}>
						<button className="btn btn--sm btn--ghost" onClick={handleSubmitClick}>
							{t("submit")}
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
