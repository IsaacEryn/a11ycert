"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth/AuthProvider";
import { useLearningStore } from "@/lib/store/learningStore";
import { getQuizzesByIds } from "@/lib/quiz/quiz-service";
import type { QuizQuestion } from "@/lib/content/types";

interface Props {
	locale: string;
}

export default function WrongAnswerList({ locale }: Props) {
	const { user } = useAuth();
	const { getWrongNotes } = useLearningStore();
	const localWrong = useMemo(
		() => [...getWrongNotes("cpacc"), ...getWrongNotes("was")],
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);
	const [questions, setQuestions] = useState<QuizQuestion[]>([]);
	const [loading, setLoading] = useState(true);
	const isKo = locale === "ko";
	const supabaseRef = useRef(createClient());
	const supabase = supabaseRef.current;

	useEffect(() => {
		async function load() {
			let ids: string[] = [];

			if (user) {
				const { data } = await supabase
					.from("wrong_answers")
					.select("question_id")
					.eq("user_id", user.id)
					.order("last_attempted_at", { ascending: false });

				ids = data?.map((r: { question_id: string }) => r.question_id) ?? [];
				if (ids.length === 0) ids = localWrong;
			} else {
				ids = localWrong;
			}

			const qs = await getQuizzesByIds(ids);
			setQuestions(qs);
			setLoading(false);
		}

		load();
	}, [user, localWrong, supabase]); // localWrong is stable via useMemo([])

	if (loading) {
		return <p style={{ fontSize: "var(--fs-sm)", color: "var(--fg-subtle)" }}>{isKo ? "불러오는 중..." : "Loading..."}</p>;
	}

	if (questions.length === 0) {
		return (
			<div style={{
				borderRadius: "var(--radius-lg)",
				border: "1px dashed var(--border)",
				padding: "var(--space-10) var(--space-6)",
				textAlign: "center",
				fontSize: "var(--fs-sm)",
				color: "var(--fg-subtle)",
			}}>
				{isKo ? "아직 오답이 없습니다." : "No wrong answers yet."}
				<div style={{ marginTop: "var(--space-3)" }}>
					<Link
						href={`/${locale}/cpacc/study`}
						style={{ color: "var(--accent)", textDecoration: "none", fontSize: "var(--fs-xs)" }}
					>
						{isKo ? "학습 시작하기 →" : "Start studying →"}
					</Link>
				</div>
			</div>
		);
	}

	return (
		<ul style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", listStyle: "none", margin: 0, padding: 0 }} role="list">
			{questions.map((q) => (
				<li key={q.id} style={{
					borderRadius: "var(--radius-lg)",
					border: "1px solid var(--danger-soft)",
					background: "var(--danger-soft)",
					padding: "var(--space-3) var(--space-4)",
				}}>
					<p style={{ fontSize: "var(--fs-sm)", fontWeight: 500, color: "var(--fg)" }}>
						{isKo ? q.question.ko : q.question.en}
					</p>
					<div style={{ marginTop: "var(--space-2)", fontSize: "var(--fs-xs)", color: "var(--fg-muted)" }}>
						<span style={{ fontWeight: 500, color: "var(--success)" }}>{isKo ? "정답: " : "Answer: "}</span>
						{isKo ? q.options[q.answer].ko : q.options[q.answer].en}
					</div>
					<p style={{ marginTop: "var(--space-1)", fontSize: "var(--fs-xs)", color: "var(--fg-muted)", lineHeight: 1.6 }}>
						{isKo ? q.explanation.ko : q.explanation.en}
					</p>
				</li>
			))}
		</ul>
	);
}
