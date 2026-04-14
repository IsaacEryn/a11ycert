"use client";

import { useState } from "react";
import Link from "next/link";
import type { StudyUnit, QuizQuestion } from "@/lib/content/types";
import { useLearningStore } from "@/lib/store/learningStore";
import QuizEngine from "@/components/QuizEngine";

interface Props {
  locale: string;
  exam: "cpacc" | "was";
  units: StudyUnit[];
}

type Tab = "wrong" | "saved";

const ACCENT = {
  cpacc: { active: "border-blue-500 text-blue-600", dot: "bg-blue-500" },
  was: { active: "border-violet-500 text-violet-600", dot: "bg-violet-500" },
} as const;

export default function WrongAnswersClient({ locale, exam, units }: Props) {
  const { wrongAnswers, savedQuestions, unsaveQuestion } = useLearningStore();
  const [tab, setTab] = useState<Tab>("wrong");
  const [practiceMode, setPracticeMode] = useState(false);
  const isKo = locale === "ko";
  const c = ACCENT[exam];

  const allQuestions = units.flatMap((u) => u.questions);

  const wrongQs = allQuestions.filter((q) => wrongAnswers.includes(q.id));
  const savedQs = allQuestions.filter((q) => savedQuestions.includes(q.id));

  const currentList: QuizQuestion[] = tab === "wrong" ? wrongQs : savedQs;

  if (practiceMode && currentList.length > 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">
            {tab === "wrong"
              ? isKo ? "오답 연습" : "Wrong Answer Practice"
              : isKo ? "저장 문제 연습" : "Saved Question Practice"}
          </h1>
          <button
            onClick={() => setPracticeMode(false)}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ← {isKo ? "목록으로" : "Back to list"}
          </button>
        </div>
        <QuizEngine questions={currentList} locale={locale} exam={exam} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link
            href={`/${locale}/${exam}`}
            className={`text-xs font-semibold uppercase tracking-widest no-underline ${isKo ? "" : ""} ${exam === "cpacc" ? "text-blue-600" : "text-violet-600"}`}
          >
            {exam.toUpperCase()}
          </Link>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">
            {isKo ? "오답노트" : "My Study Notes"}
          </h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 flex border-b border-gray-200" role="tablist">
        {(["wrong", "saved"] as Tab[]).map((t) => {
          const count = t === "wrong" ? wrongQs.length : savedQs.length;
          const label =
            t === "wrong"
              ? isKo ? "오답 문제" : "Wrong Answers"
              : isKo ? "저장한 문제" : "Saved Questions";
          const isActive = tab === t;
          return (
            <button
              key={t}
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                setTab(t);
                setPracticeMode(false);
              }}
              className={`flex items-center gap-1.5 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? `${c.active} border-b-2`
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {label}
              <span
                className={`rounded-full px-1.5 py-0.5 text-xs font-bold ${
                  isActive ? `${c.dot} text-white` : "bg-gray-200 text-gray-600"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div role="tabpanel" className="mt-6">
        {currentList.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-200 px-6 py-12 text-center text-sm text-gray-400">
            {tab === "wrong"
              ? isKo
                ? "아직 오답이 없습니다. 학습 단위 퀴즈를 풀어보세요."
                : "No wrong answers yet. Try a unit quiz."
              : isKo
              ? "아직 저장한 문제가 없습니다."
              : "No saved questions yet."}
            <div className="mt-4">
              <Link
                href={`/${locale}/${exam}/study`}
                className={`text-sm font-medium no-underline ${exam === "cpacc" ? "text-blue-600 hover:text-blue-700" : "text-violet-600 hover:text-violet-700"}`}
              >
                {isKo ? "학습 로드맵 보기 →" : "Go to Study Roadmap →"}
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs text-gray-500">
                {isKo ? `${currentList.length}문제` : `${currentList.length} questions`}
              </p>
              <button
                onClick={() => setPracticeMode(true)}
                className={`rounded-lg px-4 py-2 text-sm font-medium text-white ${
                  exam === "cpacc" ? "bg-blue-600 hover:bg-blue-700" : "bg-violet-600 hover:bg-violet-700"
                }`}
              >
                {isKo ? "연습 모드 시작" : "Start Practice"}
              </button>
            </div>

            <ul className="space-y-3" role="list">
              {currentList.map((q) => {
                const unitId = q.id.split("-q")[0].replace(exam + "-", exam + "-");
                const unit = units.find((u) => u.questions.some((uq) => uq.id === q.id));

                return (
                  <li
                    key={q.id}
                    className="rounded-xl border border-gray-200 px-4 py-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        {unit && (
                          <Link
                            href={`/${locale}/${exam}/study/${unit.id}`}
                            className="text-xs text-gray-400 no-underline hover:text-blue-600"
                          >
                            {isKo ? unit.title.ko : unit.title.en}
                          </Link>
                        )}
                        <p className="mt-1 text-sm font-medium text-gray-900 leading-relaxed">
                          {isKo ? q.question.ko : q.question.en}
                        </p>
                        <div className="mt-2 text-xs text-gray-500">
                          <span className="font-medium">
                            {isKo ? "정답: " : "Answer: "}
                          </span>
                          {isKo ? q.options[q.answer].ko : q.options[q.answer].en}
                        </div>
                        <p className="mt-1 text-xs text-gray-400 leading-relaxed">
                          {isKo ? q.explanation.ko : q.explanation.en}
                        </p>
                      </div>
                      {tab === "saved" && (
                        <button
                          onClick={() => unsaveQuestion(q.id)}
                          aria-label={isKo ? "저장 취소" : "Remove from saved"}
                          className="shrink-0 rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-500"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
