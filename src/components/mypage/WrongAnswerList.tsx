"use client";

import { useState, useEffect } from "react";
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
	const { wrongAnswers: localWrong } = useLearningStore();
	const [questions, setQuestions] = useState<QuizQuestion[]>([]);
	const [loading, setLoading] = useState(true);
	const isKo = locale === "ko";
	const supabase = createClient();

	useEffect(() => {
		async function load() {
			let ids: string[] = [];

			if (user) {
				// DB에서 오답 목록 조회
				const { data } = await supabase
					.from("wrong_answers")
					.select("question_id")
					.eq("user_id", user.id)
					.order("last_attempted_at", { ascending: false });

				ids = data?.map((r: { question_id: string }) => r.question_id) ?? [];
				// DB가 비어있으면 localStorage 데이터 사용
				if (ids.length === 0) ids = localWrong;
			} else {
				ids = localWrong;
			}

			const qs = await getQuizzesByIds(ids);
			setQuestions(qs);
			setLoading(false);
		}

		load();
	}, [user, localWrong, supabase]);

	if (loading) {
		return <p className="text-sm text-gray-400">{isKo ? "불러오는 중..." : "Loading..."}</p>;
	}

	if (questions.length === 0) {
		return (
			<div className="rounded-xl border border-dashed border-gray-200 px-6 py-10 text-center text-sm text-gray-400">
				{isKo ? "아직 오답이 없습니다." : "No wrong answers yet."}
				<div className="mt-3">
					<Link
						href={`/${locale}/cpacc/study`}
						className="text-blue-600 no-underline hover:underline text-xs"
					>
						{isKo ? "학습 시작하기 →" : "Start studying →"}
					</Link>
				</div>
			</div>
		);
	}

	return (
		<ul className="space-y-3" role="list">
			{questions.map((q) => (
				<li key={q.id} className="rounded-xl border border-red-100 bg-red-50 px-4 py-3">
					<p className="text-sm font-medium text-gray-900">
						{isKo ? q.question.ko : q.question.en}
					</p>
					<div className="mt-2 text-xs text-gray-600">
						<span className="font-medium text-green-700">{isKo ? "정답: " : "Answer: "}</span>
						{isKo ? q.options[q.answer].ko : q.options[q.answer].en}
					</div>
					<p className="mt-1 text-xs text-gray-500 leading-relaxed">
						{isKo ? q.explanation.ko : q.explanation.en}
					</p>
				</li>
			))}
		</ul>
	);
}
