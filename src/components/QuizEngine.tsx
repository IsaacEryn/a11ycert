"use client";

import { useState } from "react";
import Link from "next/link";
import type { QuizQuestion } from "@/lib/content/types";
import { useLearningStore } from "@/lib/store/learningStore";

interface QuizEngineProps {
  questions: QuizQuestion[];
  locale: string;
  exam: "cpacc" | "was";
}

type Phase = "quiz" | "summary";

export default function QuizEngine({ questions, locale, exam }: QuizEngineProps) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<"a" | "b" | "c" | "d" | null>(null);
  const [answers, setAnswers] = useState<Record<number, "a" | "b" | "c" | "d">>({});
  const [phase, setPhase] = useState<Phase>("quiz");

  const { saveQuestion, unsaveQuestion, addWrongAnswer, removeWrongAnswer, isSaved, isWrong } =
    useLearningStore();

  const q = questions[current];
  const isKo = locale === "ko";
  const optionKeys = ["a", "b", "c", "d"] as const;

  const handleSelect = (key: "a" | "b" | "c" | "d") => {
    if (selected !== null) return; // already answered
    setSelected(key);
    setAnswers((prev) => ({ ...prev, [current]: key }));

    if (key !== q.answer) {
      addWrongAnswer(q.id);
    } else {
      removeWrongAnswer(q.id);
    }
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
    } else {
      setPhase("summary");
    }
  };

  const toggleSave = () => {
    if (isSaved(q.id)) {
      unsaveQuestion(q.id);
    } else {
      saveQuestion(q.id);
    }
  };

  const correctCount = questions.filter((_, i) => answers[i] === questions[i].answer).length;
  const wrongAnswersLink = `/${locale}/${exam}/wrong-answers`;

  if (phase === "summary") {
    return (
      <div className="rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900">
          {isKo ? "퀴즈 완료" : "Quiz Complete"}
        </h3>
        <p className="mt-2 text-2xl font-bold text-gray-900">
          {correctCount} / {questions.length}
          <span className="ml-2 text-sm font-normal text-gray-500">
            {isKo ? "정답" : "correct"}
          </span>
        </p>

        {questions.map((q, i) => {
          const userAns = answers[i];
          const correct = userAns === q.answer;
          return (
            <div
              key={q.id}
              className={`mt-3 rounded-lg border px-4 py-3 text-sm ${
                correct
                  ? "border-green-200 bg-green-50"
                  : "border-red-200 bg-red-50"
              }`}
            >
              <p className="font-medium text-gray-900">
                {i + 1}. {isKo ? q.question.ko : q.question.en}
              </p>
              {!correct && userAns && (
                <p className="mt-1 text-red-700">
                  {isKo ? "내 답: " : "Your answer: "}
                  {isKo ? q.options[userAns].ko : q.options[userAns].en}
                </p>
              )}
              <p className={correct ? "mt-1 text-green-700" : "mt-1 text-gray-700"}>
                {isKo ? "정답: " : "Correct: "}
                {isKo ? q.options[q.answer].ko : q.options[q.answer].en}
              </p>
            </div>
          );
        })}

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => {
              setCurrent(0);
              setSelected(null);
              setAnswers({});
              setPhase("quiz");
            }}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {isKo ? "다시 풀기" : "Retry"}
          </button>
          {correctCount < questions.length && (
            <Link
              href={wrongAnswersLink}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white no-underline hover:bg-red-700"
            >
              {isKo ? "오답노트 보기" : "View Wrong Answers"}
            </Link>
          )}
        </div>
      </div>
    );
  }

  const answered = selected !== null;

  return (
    <div className="rounded-xl border border-gray-200 p-6">
      {/* Progress */}
      <div className="mb-4 flex items-center justify-between text-xs text-gray-500">
        <span>
          {current + 1} / {questions.length}
        </span>
        <button
          onClick={toggleSave}
          aria-label={
            isSaved(q.id)
              ? isKo ? "저장 취소" : "Unsave question"
              : isKo ? "문제 저장" : "Save question"
          }
          className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
            isSaved(q.id)
              ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {isSaved(q.id)
            ? isKo ? "★ 저장됨" : "★ Saved"
            : isKo ? "☆ 저장" : "☆ Save"}
        </button>
      </div>

      {/* Progress bar */}
      <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-blue-500 transition-all"
          style={{ width: `${((current + 1) / questions.length) * 100}%` }}
          role="progressbar"
          aria-valuenow={current + 1}
          aria-valuemin={1}
          aria-valuemax={questions.length}
          aria-label={isKo ? "퀴즈 진행률" : "Quiz progress"}
        />
      </div>

      {/* Question */}
      <p className="text-sm font-semibold text-gray-900 leading-relaxed">
        {isKo ? q.question.ko : q.question.en}
      </p>

      {/* Options */}
      <ul className="mt-4 space-y-2" role="list">
        {optionKeys.map((key) => {
          const text = isKo ? q.options[key].ko : q.options[key].en;
          let style =
            "w-full rounded-lg border px-4 py-3 text-left text-sm transition-colors cursor-pointer";

          if (!answered) {
            style += " border-gray-200 hover:border-blue-400 hover:bg-blue-50 text-gray-700";
          } else if (key === q.answer) {
            style += " border-green-400 bg-green-50 text-green-800 font-medium";
          } else if (key === selected) {
            style += " border-red-400 bg-red-50 text-red-800";
          } else {
            style += " border-gray-200 bg-gray-50 text-gray-400";
          }

          return (
            <li key={key}>
              <button
                className={style}
                onClick={() => handleSelect(key)}
                disabled={answered}
                aria-pressed={selected === key}
              >
                <span className="mr-2 font-semibold uppercase">{key}.</span>
                {text}
                {answered && key === q.answer && (
                  <span className="ml-2" aria-label={isKo ? "정답" : "Correct answer"}>✓</span>
                )}
                {answered && key === selected && key !== q.answer && (
                  <span className="ml-2" aria-label={isKo ? "오답" : "Wrong answer"}>✗</span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Explanation */}
      {answered && (
        <div
          className={`mt-4 rounded-lg border px-4 py-3 text-sm ${
            selected === q.answer
              ? "border-green-200 bg-green-50 text-green-800"
              : "border-red-200 bg-red-50 text-red-800"
          }`}
          role="alert"
        >
          <p className="font-semibold">
            {selected === q.answer
              ? isKo ? "정답입니다!" : "Correct!"
              : isKo ? "오답입니다." : "Incorrect."}
          </p>
          <p className="mt-1 leading-relaxed">
            {isKo ? q.explanation.ko : q.explanation.en}
          </p>
          {selected !== q.answer && (
            <p className="mt-1 text-xs opacity-75">
              {isKo ? "오답노트에 자동으로 추가되었습니다." : "Added to your wrong answers automatically."}
            </p>
          )}
        </div>
      )}

      {/* Next */}
      {answered && (
        <button
          onClick={handleNext}
          className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          {current < questions.length - 1
            ? isKo ? "다음 문제 →" : "Next →"
            : isKo ? "결과 보기" : "See Results"}
        </button>
      )}
    </div>
  );
}
