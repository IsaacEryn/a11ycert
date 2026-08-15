"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
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
	const t = useTranslations("community");
	const [posts, setPosts] = useState<BoardPost[]>([]);
	const [category, setCategory] = useState<string>("all");
	const [isLoading, setIsLoading] = useState(true);
	const panelRef = useRef<HTMLDivElement>(null);

	const categoryLabels: Record<string, string> = {
		all: t("all"),
		report: t("reports"),
		discussion: t("discussion"),
		question: t("questions"),
		tip: t("tips"),
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
		void Promise.resolve().then(fetchPosts);
	}, [fetchPosts]);

	const handleCategoryChange = (cat: string) => {
		setCategory(cat);
		// 탭 전환 후 패널로 포커스 이동
		requestAnimationFrame(() => panelRef.current?.focus());
	};

	const getCategoryBadge = (cat: string) => {
		const variants: Record<string, string> = {
			report: "tag tag--warning",
			discussion: "tag tag--accent",
			question: "tag tag--success",
			tip: "tag tag--accent",
		};
		return variants[cat] || "tag";
	};

	return (
		<div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
			<div className="flex items-center justify-between gap-3">
				<h1 className="text-2xl font-bold">{t("title")}</h1>
				<Link
					href={`/${locale}/community/write`}
					className="btn btn--primary"
				>
					{t("newPost")}
				</Link>
			</div>

			{/* 카테고리 필터 탭 */}
			<div
				className="mt-6 flex flex-wrap gap-2"
				role="tablist"
				aria-label={t("categoryFilter")}
			>
				{CATEGORIES.map((cat) => (
					<button
						key={cat}
						id={`tab-${cat}`}
						role="tab"
						aria-selected={category === cat}
						aria-controls="posts-panel"
						onClick={() => handleCategoryChange(cat)}
						className="rounded-full border px-3 py-1.5 text-xs font-medium transition-colors"
						style={
							category === cat
								? { background: "var(--accent)", color: "var(--fg-on-accent)", borderColor: "var(--accent)" }
								: { background: "var(--bg-muted)", color: "var(--fg-muted)", borderColor: "var(--border)" }
						}
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
					<div className="mt-6" aria-live="polite" aria-busy="true">
						<span className="sr-only">{t("loading")}</span>
						<ul className="motion-safe:animate-pulse" aria-hidden="true">
							{[0, 1, 2, 3, 4].map((i) => (
								<li key={i} className="border-t py-4 first:border-t-0" style={{ borderColor: "var(--divider)" }}>
									<div className="h-3 w-16 rounded" style={{ background: "var(--bg-muted)" }} />
									<div className="mt-2 h-4 w-3/4 rounded" style={{ background: "var(--bg-muted)" }} />
								</li>
							))}
						</ul>
					</div>
				) : posts.length === 0 ? (
					<p className="mt-8 text-sm" style={{ color: "var(--fg-subtle)" }}>
						{t("noPostsYet")}
					</p>
				) : (
					<ul className="mt-6" role="list">
						{posts.map((post) => (
							<li key={post.id} className="border-t first:border-t-0" style={{ borderColor: "var(--divider)" }}>
								<Link
									href={`/${locale}/community/${post.id}`}
									className="community-row flex items-start gap-3 py-3 no-underline -mx-2 px-2 rounded-lg transition-colors"
								>
									<div className="flex-1 min-w-0">
										<div className="flex items-center gap-2">
											<span
												className={getCategoryBadge(post.category)}
												style={{ fontSize: "10px", padding: "2px 8px" }}
												aria-label={categoryLabels[post.category]}
											>
												{categoryLabels[post.category]}
											</span>
											<span className="text-sm font-medium truncate" style={{ color: "var(--fg)" }}>
												{post.title}
											</span>
										</div>
										<div className="mt-1 flex items-center gap-3 text-xs" style={{ color: "var(--fg-subtle)" }}>
											<span>{post.profiles?.nickname || (t("anonymous"))}</span>
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
													{t("replyCount", { count: post.reply_count })}
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
