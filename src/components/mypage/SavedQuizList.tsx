"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth/AuthProvider";
import { useLearningStore } from "@/lib/store/learningStore";
import { getQuizzesByIds } from "@/lib/quiz/quiz-service";
import type { QuizQuestion } from "@/lib/content/types";

interface Props {
	locale: string;
}

export default function SavedQuizList({ locale }: Props) {
	const { user } = useAuth();
	const { savedQuestions: localSaved, unsaveQuestion } = useLearningStore();
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
					.from("saved_questions")
					.select("question_id")
					.eq("user_id", user.id)
					.order("created_at", { ascending: false });

				ids = data?.map((r: { question_id: string }) => r.question_id) ?? [];
				if (ids.length === 0) ids = localSaved;
			} else {
				ids = localSaved;
			}

			const qs = await getQuizzesByIds(ids);
			setQuestions(qs);
			setLoading(false);
		}

		load();
	}, [user, localSaved, supabase]);

	const handleRemove = async (questionId: string) => {
		if (user) {
			await supabase
				.from("saved_questions")
				.delete()
				.eq("user_id", user.id)
				.eq("question_id", questionId);
		}
		unsaveQuestion(questionId);
		setQuestions((prev) => prev.filter((q) => q.id !== questionId));
	};

	if (loading) {
		return <p className="text-sm text-gray-400">{isKo ? "불러오는 중..." : "Loading..."}</p>;
	}

	if (questions.length === 0) {
		return (
			<div className="rounded-xl border border-dashed border-gray-200 px-6 py-10 text-center text-sm text-gray-400">
				{isKo ? "저장한 문제가 없습니다." : "No saved questions yet."}
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
				<li key={q.id} className="rounded-xl border border-yellow-100 bg-yellow-50 px-4 py-3">
					<div className="flex items-start justify-between gap-3">
						<div className="flex-1 min-w-0">
							<p className="text-sm font-medium text-gray-900">
								{isKo ? q.question.ko : q.question.en}
							</p>
							<div className="mt-2 text-xs text-gray-600">
								<span className="font-medium text-green-700">{isKo ? "정답: " : "Answer: "}</span>
								{isKo ? q.options[q.answer].ko : q.options[q.answer].en}
							</div>
						</div>
						<button
							onClick={() => handleRemove(q.id)}
							aria-label={isKo ? "저장 취소" : "Remove from saved"}
							className="shrink-0 text-gray-400 hover:text-red-500 transition-colors"
						>
							✕
						</button>
					</div>
				</li>
			))}
		</ul>
	);
}
