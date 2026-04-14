"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useOptionalAuth } from "@/lib/auth/AuthProvider";

export default function CommunityWritePage() {
  const params = useParams();
  const router = useRouter();
  const locale = (params?.locale as string) || "ko";
  const isKo = locale === "ko";
  const auth = useOptionalAuth();

  const [category, setCategory] = useState("discussion");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: "discussion", label: isKo ? "자유토론" : "Discussion" },
    { value: "question", label: isKo ? "질문" : "Question" },
    { value: "tip", label: isKo ? "팁" : "Tip" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth?.user || isSubmitting) return;

    setIsSubmitting(true);
    const supabase = createClient();

    const { error } = await supabase.from("board_posts").insert({
      user_id: auth.user.id,
      category,
      title,
      content,
    });

    if (!error) {
      router.push(`/${locale}/community`);
    }
    setIsSubmitting(false);
  };

  if (!auth?.user) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-sm text-gray-500">
          {isKo ? "글을 작성하려면 로그인이 필요합니다." : "Please sign in to write a post."}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold text-gray-900">
        {isKo ? "새 글 작성" : "New Post"}
      </h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {/* 카테고리 */}
        <fieldset>
          <legend className="text-sm font-medium text-gray-700">
            {isKo ? "카테고리" : "Category"}
          </legend>
          <div className="mt-2 flex gap-2">
            {categories.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setCategory(value)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  category === value
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
        <label className="block">
          <span className="text-sm font-medium text-gray-700">{isKo ? "제목" : "Title"}</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={200}
            className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </label>

        {/* 내용 */}
        <label className="block">
          <span className="text-sm font-medium text-gray-700">{isKo ? "내용" : "Content"}</span>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            maxLength={5000}
            rows={10}
            className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-y"
          />
        </label>

        {/* 버튼 */}
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg px-5 py-2.5 text-sm text-gray-500 hover:text-gray-700"
          >
            {isKo ? "취소" : "Cancel"}
          </button>
          <button
            type="submit"
            disabled={!title.trim() || !content.trim() || isSubmitting}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? (isKo ? "등록 중..." : "Posting...") : (isKo ? "등록" : "Post")}
          </button>
        </div>
      </form>
    </div>
  );
}
