"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { ko, enUS } from "date-fns/locale";

interface BoardPost {
	id: string;
	category: string;
	title: string;
	view_count: number;
	reply_count: number;
	created_at: string;
	profiles: { nickname: string } | null;
}

const CATEGORIES = ["all", "report", "discussion", "question", "tip"] as const;

export default function CommunityPage() {
	const params = useParams();
	const locale = (params?.locale as string) || "ko";
	const isKo = locale === "ko";
	const [posts, setPosts] = useState<BoardPost[]>([]);
	const [category, setCategory] = useState<string>("all");
	const [isLoading, setIsLoading] = useState(true);
	const panelRef = useRef<HTMLDivElement>(null);

	const categoryLabels: Record<string, string> = {
		all: isKo ? "전체" : "All",
		report: isKo ? "제보·수정요청" : "Reports",
		discussion: isKo ? "자유토론" : "Discussion",
		question: isKo ? "질문" : "Questions",
		tip: isKo ? "팁" : "Tips",
	};

	const fetchPosts = useCallback(async () => {
		setIsLoading(true);
		const supabase = createClient();

		let query = supabase
			.from("board_posts")
			.select("id, category, title, view_count, reply_count, created_at, profiles(nickname)")
			.eq("is_deleted", false)
			.order("is_pinned", { ascending: false })
			.order("created_at", { ascending: false })
			.limit(50);

		if (category !== "all") {
			query = query.eq("category", category);
		}

		const { data } = await query;
		setPosts((data as BoardPost[]) || []);
		setIsLoading(false);
	}, [category]);

	useEffect(() => {
		fetchPosts();
	}, [fetchPosts]);

	const handleCategoryChange = (cat: string) => {
		setCategory(cat);
		// 탭 전환 후 패널로 포커스 이동
		requestAnimationFrame(() => panelRef.current?.focus());
	};

	const getCategoryBadge = (cat: string) => {
		const colors: Record<string, string> = {
			report: "bg-orange-100 text-orange-700",
			discussion: "bg-blue-100 text-blue-700",
			question: "bg-green-100 text-green-700",
			tip: "bg-purple-100 text-purple-700",
		};
		return colors[cat] || "bg-gray-100 text-gray-700";
	};

	return (
		<div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold text-gray-900">{isKo ? "커뮤니티" : "Community"}</h1>
				<Link
					href={`/${locale}/community/write`}
					className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white no-underline hover:bg-blue-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
				>
					{isKo ? "글 작성" : "New Post"}
				</Link>
			</div>

			{/* 카테고리 필터 탭 */}
			<div
				className="mt-6 flex flex-wrap gap-2"
				role="tablist"
				aria-label={isKo ? "카테고리 필터" : "Category filter"}
			>
				{CATEGORIES.map((cat) => (
					<button
						key={cat}
						id={`tab-${cat}`}
						role="tab"
						aria-selected={category === cat}
						aria-controls="posts-panel"
						onClick={() => handleCategoryChange(cat)}
						className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
							category === cat
								? "bg-gray-900 text-white"
								: "bg-gray-100 text-gray-600 hover:bg-gray-200"
						}`}
					>
						{categoryLabels[cat]}
					</button>
				))}
			</div>

			{/* 게시글 목록 탭 패널 */}
			<div
				id="posts-panel"
				ref={panelRef}
				role="tabpanel"
				aria-labelledby={`tab-${category}`}
				tabIndex={-1}
				className="focus-visible:outline-none"
			>
				{isLoading ? (
					<p className="mt-8 text-sm text-gray-400" aria-live="polite">
						{isKo ? "불러오는 중..." : "Loading..."}
					</p>
				) : posts.length === 0 ? (
					<p className="mt-8 text-sm text-gray-400">
						{isKo ? "아직 게시글이 없습니다." : "No posts yet."}
					</p>
				) : (
					<ul className="mt-6 divide-y divide-gray-100" role="list">
						{posts.map((post) => (
							<li key={post.id}>
								<Link
									href={`/${locale}/community/${post.id}`}
									className="flex items-start gap-3 py-3 no-underline hover:bg-gray-50 -mx-2 px-2 rounded-lg transition-colors"
								>
									<div className="flex-1 min-w-0">
										<div className="flex items-center gap-2">
											<span
												className={`inline-block rounded px-1.5 py-0.5 text-[10px] font-medium ${getCategoryBadge(post.category)}`}
												aria-label={categoryLabels[post.category]}
											>
												{categoryLabels[post.category]}
											</span>
											<span className="text-sm font-medium text-gray-900 truncate">
												{post.title}
											</span>
										</div>
										<div className="mt-1 flex items-center gap-3 text-xs text-gray-400">
											<span>{post.profiles?.nickname || (isKo ? "익명" : "Anonymous")}</span>
											<span>
												<time dateTime={post.created_at}>
													{formatDistanceToNow(new Date(post.created_at), {
														addSuffix: true,
														locale: isKo ? ko : enUS,
													})}
												</time>
											</span>
											{post.reply_count > 0 && (
												<span>
													{isKo ? `댓글 ${post.reply_count}` : `${post.reply_count} replies`}
												</span>
											)}
										</div>
									</div>
								</Link>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}
