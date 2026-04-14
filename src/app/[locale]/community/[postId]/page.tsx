"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useOptionalAuth } from "@/lib/auth/AuthProvider";
import { formatDistanceToNow } from "date-fns";
import { ko, enUS } from "date-fns/locale";

interface Post {
  id: string;
  category: string;
  title: string;
  content: string;
  view_count: number;
  created_at: string;
  profiles: { nickname: string; avatar_url: string | null } | null;
}

interface Reply {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles: { nickname: string; avatar_url: string | null } | null;
}

export default function CommunityPostPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "ko";
  const postId = params?.postId as string;
  const isKo = locale === "ko";
  const auth = useOptionalAuth();

  const [post, setPost] = useState<Post | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [replyContent, setReplyContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const supabase = createClient();

  const fetchPost = useCallback(async () => {
    const { data } = await supabase
      .from("board_posts")
      .select("*, profiles(nickname, avatar_url)")
      .eq("id", postId)
      .single();
    setPost(data as Post);
  }, [supabase, postId]);

  const fetchReplies = useCallback(async () => {
    const { data } = await supabase
      .from("board_replies")
      .select("*, profiles(nickname, avatar_url)")
      .eq("post_id", postId)
      .eq("is_deleted", false)
      .order("created_at", { ascending: true });
    setReplies((data as Reply[]) || []);
  }, [supabase, postId]);

  useEffect(() => {
    fetchPost();
    fetchReplies();
  }, [fetchPost, fetchReplies]);

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth?.user || !replyContent.trim()) return;

    setIsSubmitting(true);
    await supabase.from("board_replies").insert({
      post_id: postId,
      user_id: auth.user.id,
      content: replyContent.trim(),
    });

    // reply_count 증가
    if (post) {
      await supabase
        .from("board_posts")
        .update({ reply_count: post.view_count + 1 })
        .eq("id", postId);
    }

    setReplyContent("");
    setIsSubmitting(false);
    await fetchReplies();
  };

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-sm text-gray-400">{isKo ? "불러오는 중..." : "Loading..."}</p>
      </div>
    );
  }

  const categoryLabels: Record<string, string> = {
    report: isKo ? "제보·수정요청" : "Report",
    discussion: isKo ? "자유토론" : "Discussion",
    question: isKo ? "질문" : "Question",
    tip: isKo ? "팁" : "Tip",
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      {/* Breadcrumb */}
      <nav className="mb-6 text-xs text-gray-400">
        <Link href={`/${locale}/community`} className="hover:text-blue-600 no-underline">
          {isKo ? "커뮤니티" : "Community"}
        </Link>
        <span className="mx-1">/</span>
        <span className="text-gray-600">{post.title}</span>
      </nav>

      {/* Post */}
      <article>
        <div className="flex items-center gap-2 mb-2">
          <span className="rounded px-1.5 py-0.5 text-[10px] font-medium bg-gray-100 text-gray-600">
            {categoryLabels[post.category] || post.category}
          </span>
        </div>
        <h1 className="text-xl font-bold text-gray-900">{post.title}</h1>
        <div className="mt-2 flex items-center gap-3 text-xs text-gray-400">
          <span>{post.profiles?.nickname || (isKo ? "익명" : "Anonymous")}</span>
          <span>
            {formatDistanceToNow(new Date(post.created_at), {
              addSuffix: true,
              locale: isKo ? ko : enUS,
            })}
          </span>
        </div>
        <div className="mt-6 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
          {post.content}
        </div>
      </article>

      {/* Replies */}
      <section className="mt-10 border-t border-gray-200 pt-6">
        <h2 className="text-base font-semibold text-gray-900">
          {isKo ? "댓글" : "Replies"} ({replies.length})
        </h2>

        {replies.length > 0 && (
          <ul className="mt-4 space-y-4" role="list">
            {replies.map((reply) => (
              <li key={reply.id} className="flex gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-500 shrink-0">
                  {(reply.profiles?.nickname || "?").charAt(0).toUpperCase()}
                </span>
                <div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-medium text-gray-900">{reply.profiles?.nickname}</span>
                    <span className="text-gray-400">
                      {formatDistanceToNow(new Date(reply.created_at), {
                        addSuffix: true,
                        locale: isKo ? ko : enUS,
                      })}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-700 whitespace-pre-wrap">{reply.content}</p>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Reply form */}
        {auth?.user ? (
          <form onSubmit={handleReply} className="mt-6 space-y-2">
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder={isKo ? "댓글을 작성해주세요..." : "Write a reply..."}
              rows={3}
              maxLength={2000}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!replyContent.trim() || isSubmitting}
                className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {isSubmitting ? (isKo ? "등록 중..." : "Posting...") : (isKo ? "댓글 등록" : "Post Reply")}
              </button>
            </div>
          </form>
        ) : (
          <p className="mt-6 text-sm text-gray-400">
            {isKo ? "댓글을 작성하려면 로그인이 필요합니다." : "Sign in to reply."}
          </p>
        )}
      </section>
    </div>
  );
}
