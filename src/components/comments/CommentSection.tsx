"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { useOptionalAuth } from "@/lib/auth/AuthProvider";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

interface Comment {
  id: string;
  user_id: string;
  page_path: string;
  content: string;
  parent_id: string | null;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  profiles: {
    nickname: string;
    avatar_url: string | null;
  } | null;
}

interface CommentSectionProps {
  pagePath: string;
  locale: string;
}

export default function CommentSection({ pagePath, locale }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const auth = useOptionalAuth();
  const isKo = locale === "ko";
  const supabase = createClient();

  const fetchComments = useCallback(async () => {
    const { data } = await supabase
      .from("comments")
      .select("*, profiles(nickname, avatar_url)")
      .eq("page_path", pagePath)
      .order("created_at", { ascending: true });

    setComments((data as Comment[]) || []);
    setIsLoading(false);
  }, [supabase, pagePath]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSubmit = async (content: string, parentId?: string) => {
    if (!auth?.user) return;

    const { error } = await supabase.from("comments").insert({
      user_id: auth.user.id,
      page_path: pagePath,
      content,
      parent_id: parentId || null,
    });

    if (!error) {
      await fetchComments();
    }
  };

  const handleEdit = async (id: string, content: string) => {
    await supabase
      .from("comments")
      .update({ content })
      .eq("id", id);
    await fetchComments();
  };

  const handleDelete = async (id: string) => {
    await supabase
      .from("comments")
      .update({ is_deleted: true })
      .eq("id", id);
    await fetchComments();
  };

  // 최상위 댓글과 대댓글 분리
  const rootComments = comments.filter((c) => !c.parent_id && !c.is_deleted);
  const getReplies = (parentId: string) =>
    comments.filter((c) => c.parent_id === parentId && !c.is_deleted);

  return (
    <section aria-labelledby="comments-heading" className="mt-10 border-t border-gray-200 pt-8">
      <h2 id="comments-heading" className="text-base font-semibold text-gray-900">
        {isKo ? "댓글" : "Comments"}
        {rootComments.length > 0 && (
          <span className="ml-2 text-sm font-normal text-gray-500">
            ({rootComments.length})
          </span>
        )}
      </h2>

      {/* 댓글 목록 */}
      {isLoading ? (
        <p className="mt-4 text-sm text-gray-400">
          {isKo ? "댓글을 불러오는 중..." : "Loading comments..."}
        </p>
      ) : rootComments.length === 0 ? (
        <p className="mt-4 text-sm text-gray-400">
          {isKo ? "아직 댓글이 없습니다. 첫 번째 댓글을 남겨보세요!" : "No comments yet. Be the first to comment!"}
        </p>
      ) : (
        <ul className="mt-4 space-y-4" role="list">
          {rootComments.map((comment) => (
            <li key={comment.id}>
              <CommentItem
                comment={comment}
                locale={locale}
                currentUserId={auth?.user?.id}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onReply={handleSubmit}
                replies={getReplies(comment.id)}
              />
            </li>
          ))}
        </ul>
      )}

      {/* 댓글 작성 */}
      {auth?.user ? (
        <div className="mt-6">
          <CommentForm
            onSubmit={(content) => handleSubmit(content)}
            locale={locale}
            placeholder={isKo ? "댓글을 작성해주세요..." : "Write a comment..."}
          />
        </div>
      ) : (
        <p className="mt-6 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500">
          {isKo
            ? "댓글을 작성하려면 로그인이 필요합니다."
            : "Please sign in to write a comment."}
        </p>
      )}
    </section>
  );
}
