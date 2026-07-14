"use client";

import { useCallback, useMemo, useState } from "react";
import type { QuizQuestion } from "@/lib/content/types";
import { useLearningStore } from "@/lib/store/learningStore";
import { useOptionalAuth } from "@/lib/auth/AuthProvider";
import {
	syncWrongAnswerToDB,
	removeWrongAnswerFromDB,
	syncSavedQuestionToDB,
	removeSavedQuestionFromDB,
} from "@/lib/store/learning-sync";

export type OptionKey = "a" | "b" | "c" | "d";

export const OPTION_KEYS: readonly OptionKey[] = ["a", "b", "c", "d"] as const;

interface UseQuizSessionOptions {
	/** 문항 순서 셔플 (모의시험용) — 마운트 시 1회 고정 */
	shuffle?: boolean;
	/** 오답노트 자동 기록 (기본 true) */
	recordWrongAnswers?: boolean;
}

function shuffled<T>(arr: T[]): T[] {
	// Fisher-Yates
	const out = [...arr];
	for (let i = out.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[out[i], out[j]] = [out[j], out[i]];
	}
	return out;
}

/**
 * 퀴즈 진행 상태 훅 — 답 선택·채점·오답노트 기록·문항 저장을 담당.
 * QuizEngine(단원 퀴즈)·QuizPageClient(모의 퀴즈)·모의시험이 공유.
 */
export function useQuizSession(
	sourceQuestions: QuizQuestion[],
	exam: "cpacc" | "was",
	options: UseQuizSessionOptions = {}
) {
	const { shuffle = false, recordWrongAnswers = true } = options;

	// eslint-disable-next-line react-hooks/exhaustive-deps -- 셔플은 마운트 시 1회만
	const questions = useMemo(
		() => (shuffle ? shuffled(sourceQuestions) : sourceQuestions),
		[sourceQuestions, shuffle]
	);

	const [answers, setAnswers] = useState<Record<number, OptionKey>>({});

	const { saveQuestion, unsaveQuestion, addWrongAnswer, removeWrongAnswer, isSaved, languageMode } =
		useLearningStore();
	const auth = useOptionalAuth();
	const userId = auth?.user?.id ?? null;

	const answerQuestion = useCallback(
		(idx: number, key: OptionKey) => {
			const q = questions[idx];
			if (!q) return;
			setAnswers((prev) => {
				if (prev[idx] != null) return prev;
				return { ...prev, [idx]: key };
			});
			if (!recordWrongAnswers) return;
			if (key !== q.answer) {
				addWrongAnswer(exam, q.id);
				if (userId) syncWrongAnswerToDB(userId, q.id, key);
			} else {
				removeWrongAnswer(exam, q.id);
				if (userId) removeWrongAnswerFromDB(userId, q.id);
			}
		},
		[questions, exam, userId, recordWrongAnswers, addWrongAnswer, removeWrongAnswer]
	);

	const reset = useCallback(() => setAnswers({}), []);

	const toggleSave = useCallback(
		(questionId: string) => {
			if (isSaved(exam, questionId)) {
				unsaveQuestion(exam, questionId);
				if (userId) removeSavedQuestionFromDB(userId, questionId);
			} else {
				saveQuestion(exam, questionId);
				if (userId) syncSavedQuestionToDB(userId, questionId);
			}
		},
		[exam, userId, isSaved, saveQuestion, unsaveQuestion]
	);

	const isQuestionSaved = useCallback(
		(questionId: string) => isSaved(exam, questionId),
		[exam, isSaved]
	);

	const answeredCount = Object.keys(answers).length;
	const allAnswered = questions.length > 0 && questions.every((_, i) => answers[i] != null);
	const correctCount = questions.filter((q, i) => answers[i] === q.answer).length;

	return {
		questions,
		answers,
		answerQuestion,
		reset,
		toggleSave,
		isQuestionSaved,
		languageMode,
		answeredCount,
		allAnswered,
		correctCount,
	};
}
