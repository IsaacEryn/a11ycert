"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { useOptionalAuth } from "@/lib/auth/AuthProvider";

interface ReportModalProps {
  locale: string;
  targetType: "quiz" | "content" | "glossary";
  targetId?: string;
  onClose: () => void;
}

export default function ReportModal({ locale, targetType, targetId, onClose }: ReportModalProps) {
  const [type, setType] = useState<"correction" | "error" | "suggestion">("error");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const auth = useOptionalAuth();
  const isKo = locale === "ko";
  const dialogRef = useRef<HTMLDivElement>(null);

  // 포커스 트랩 + ESC 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    dialogRef.current?.focus();
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth?.user) return;

    setIsSubmitting(true);
    const supabase = createClient();

    // 1. 제보 생성
    const { data: report } = await supabase
      .from("reports")
      .insert({
        user_id: auth.user.id,
        type,
        target_type: targetType,
        target_id: targetId || null,
        title,
        content,
      })
      .select("id")
      .single();

    // 2. 게시판에 자동 등록
    if (report) {
      const categoryLabel = type === "correction" ? "수정 요청" : type === "error" ? "오류 제보" : "제안";
      const { data: post } = await supabase
        .from("board_posts")
        .insert({
          user_id: auth.user.id,
          category: "report",
          title: `[${categoryLabel}] ${title}`,
          content,
          report_id: report.id,
        })
        .select("id")
        .single();

      // 3. 상호 참조 업데이트
      if (post) {
        await supabase
          .from("reports")
          .update({ board_post_id: post.id })
          .eq("id", report.id);
      }
    }

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const typeOptions = [
    { value: "error" as const, label: isKo ? "오류 제보" : "Report Error" },
    { value: "correction" as const, label: isKo ? "수정 요청" : "Correction Request" },
    { value: "suggestion" as const, label: isKo ? "제안" : "Suggestion" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="report-title"
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
        tabIndex={-1}
      >
        {submitted ? (
          <div className="text-center py-4">
            <p className="text-lg font-semibold text-green-600">
              {isKo ? "제보가 접수되었습니다!" : "Report submitted!"}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              {isKo ? "커뮤니티 게시판에서 토론에 참여할 수 있습니다." : "You can join the discussion in the community board."}
            </p>
            <button
              onClick={onClose}
              className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              {isKo ? "닫기" : "Close"}
            </button>
          </div>
        ) : !auth?.user ? (
          <div className="text-center py-4">
            <p className="text-sm text-gray-500">
              {isKo ? "제보하려면 로그인이 필요합니다." : "Please sign in to submit a report."}
            </p>
            <button onClick={onClose} className="mt-4 text-sm text-blue-600 hover:underline">
              {isKo ? "닫기" : "Close"}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 id="report-title" className="text-base font-semibold text-gray-900">
              {isKo ? "정보 수정 요청 / 오류 제보" : "Report Issue"}
            </h2>

            {/* 유형 선택 */}
            <fieldset className="mt-4">
              <legend className="text-xs font-medium text-gray-600">
                {isKo ? "유형" : "Type"}
              </legend>
              <div className="mt-1.5 flex gap-2">
                {typeOptions.map(({ value, label }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setType(value)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                      type === value
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* 제목 */}
            <label className="mt-4 block">
              <span className="text-xs font-medium text-gray-600">
                {isKo ? "제목" : "Title"}
              </span>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                maxLength={100}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </label>

            {/* 내용 */}
            <label className="mt-3 block">
              <span className="text-xs font-medium text-gray-600">
                {isKo ? "내용" : "Details"}
              </span>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                maxLength={2000}
                rows={4}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
              />
            </label>

            {/* 버튼 */}
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg px-4 py-2 text-sm text-gray-500 hover:text-gray-700"
              >
                {isKo ? "취소" : "Cancel"}
              </button>
              <button
                type="submit"
                disabled={!title.trim() || !content.trim() || isSubmitting}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {isSubmitting ? (isKo ? "제출 중..." : "Submitting...") : (isKo ? "제보하기" : "Submit")}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
