"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { StateBadge, th, td } from "./adminUi";

interface PostRow {
	id: string;
	title: string;
	category: string;
	is_pinned: boolean;
	is_deleted: boolean;
	view_count: number;
	reply_count: number;
	created_at: string;
	profiles: { nickname: string } | null;
}

interface CommentRow {
	id: string;
	page_path: string;
	content: string;
	is_deleted: boolean;
	created_at: string;
	profiles: { nickname: string } | null;
}

export default function CommunityModerationClient({ locale }: { locale: string }) {
	const t = useTranslations("admin");
	const [tab, setTab] = useState<"posts" | "comments">("posts");
	const [posts, setPosts] = useState<PostRow[] | null>(null);
	const [comments, setComments] = useState<CommentRow[] | null>(null);
	const [error, setError] = useState<string | null>(null);

	const fetchData = useCallback(async () => {
		const supabase = createClient();
		if (tab === "posts") {
			const { data, error } = await supabase
				.from("board_posts")
				.select("id, title, category, is_pinned, is_deleted, view_count, reply_count, created_at, profiles:user_id(nickname)")
				.order("created_at", { ascending: false })
				.limit(100);
			if (error) return setError(error.message);
			setPosts((data as unknown as PostRow[]) ?? []);
		} else {
			const { data, error } = await supabase
				.from("comments")
				.select("id, page_path, content, is_deleted, created_at, profiles:user_id(nickname)")
				.order("created_at", { ascending: false })
				.limit(100);
			if (error) return setError(error.message);
			setComments((data as unknown as CommentRow[]) ?? []);
		}
	}, [tab]);

	useEffect(() => {
		void Promise.resolve().then(fetchData);
	}, [fetchData]);

	const patch = async (url: string, body: Record<string, boolean>) => {
		const res = await fetch(url, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		});
		if (!res.ok) {
			const data = await res.json().catch(() => ({}));
			setError(t("actionError", { message: data.error ?? res.status }));
			return false;
		}
		setError(null);
		return true;
	};

	const togglePost = async (post: PostRow, field: "is_pinned" | "is_deleted") => {
		if (await patch(`/api/admin/board/${post.id}`, { [field]: !post[field] })) {
			await fetchData();
		}
	};

	const toggleComment = async (comment: CommentRow) => {
		if (await patch(`/api/admin/comments/${comment.id}`, { is_deleted: !comment.is_deleted })) {
			await fetchData();
		}
	};

	const dateStr = (iso: string) => new Date(iso).toLocaleDateString(locale === "ko" ? "ko-KR" : "en-US");

	return (
		<section aria-labelledby="admin-community-title">
			<h2 id="admin-community-title" style={{ fontSize: "var(--fs-lg)", fontWeight: 700 }}>
				{t("nav.community")}
			</h2>

			<div role="group" aria-label={t("nav.community")} className="glossary-filter" style={{ marginTop: "var(--space-4)" }}>
				<button type="button" aria-pressed={tab === "posts"} onClick={() => setTab("posts")}>
					{t("community.tabPosts")}
				</button>
				<button type="button" aria-pressed={tab === "comments"} onClick={() => setTab("comments")}>
					{t("community.tabComments")}
				</button>
			</div>

			{error && (
				<p role="alert" style={{ marginTop: "var(--space-3)", color: "var(--danger)", fontSize: "var(--fs-sm)" }}>
					{error}
				</p>
			)}

			{tab === "posts" ? (
				posts === null ? (
					<p style={{ marginTop: "var(--space-4)", fontSize: "var(--fs-sm)", color: "var(--fg-muted)" }}>{t("loading")}</p>
				) : posts.length === 0 ? (
					<p style={{ marginTop: "var(--space-4)", fontSize: "var(--fs-sm)", color: "var(--fg-muted)" }}>{t("empty")}</p>
				) : (
					<div style={{ overflowX: "auto", marginTop: "var(--space-4)" }}>
						<table style={{ width: "100%", borderCollapse: "collapse" }}>
							<thead>
								<tr>
									<th scope="col" style={th}>{t("community.colTitle")}</th>
									<th scope="col" style={th}>{t("community.colAuthor")}</th>
									<th scope="col" style={th}>{t("community.colCategory")}</th>
									<th scope="col" style={th}>{t("community.colDate")}</th>
									<th scope="col" style={th}>{t("community.colState")}</th>
									<th scope="col" style={th}>{t("community.colActions")}</th>
								</tr>
							</thead>
							<tbody>
								{posts.map((p) => (
									<tr key={p.id} style={{ opacity: p.is_deleted ? 0.55 : 1 }}>
										<td style={td}>
											<Link href={`/${locale}/community/${p.id}`} style={{ color: "inherit" }}>
												{p.title}
											</Link>
										</td>
										<td style={td}>{p.profiles?.nickname ?? "—"}</td>
										<td style={td}>{p.category}</td>
										<td style={{ ...td, whiteSpace: "nowrap" }}>{dateStr(p.created_at)}</td>
										<td style={td}>
											<span style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
												{p.is_pinned && <StateBadge tone="info">{t("community.pinned")}</StateBadge>}
												{p.is_deleted && <StateBadge tone="danger">{t("community.hidden")}</StateBadge>}
											</span>
										</td>
										<td style={{ ...td, whiteSpace: "nowrap" }}>
											<span style={{ display: "flex", gap: 4 }}>
												<button className="btn btn--sm" onClick={() => togglePost(p, "is_pinned")}>
													{p.is_pinned ? t("community.unpin") : t("community.pin")}
												</button>
												<button className="btn btn--sm" onClick={() => togglePost(p, "is_deleted")}>
													{p.is_deleted ? t("community.unhide") : t("community.hide")}
												</button>
											</span>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)
			) : comments === null ? (
				<p style={{ marginTop: "var(--space-4)", fontSize: "var(--fs-sm)", color: "var(--fg-muted)" }}>{t("loading")}</p>
			) : comments.length === 0 ? (
				<p style={{ marginTop: "var(--space-4)", fontSize: "var(--fs-sm)", color: "var(--fg-muted)" }}>{t("empty")}</p>
			) : (
				<div style={{ overflowX: "auto", marginTop: "var(--space-4)" }}>
					<table style={{ width: "100%", borderCollapse: "collapse" }}>
						<thead>
							<tr>
								<th scope="col" style={th}>{t("community.colContent")}</th>
								<th scope="col" style={th}>{t("community.colAuthor")}</th>
								<th scope="col" style={th}>{t("community.colPage")}</th>
								<th scope="col" style={th}>{t("community.colDate")}</th>
								<th scope="col" style={th}>{t("community.colActions")}</th>
							</tr>
						</thead>
						<tbody>
							{comments.map((c) => (
								<tr key={c.id} style={{ opacity: c.is_deleted ? 0.55 : 1 }}>
									<td style={td}>
										{c.content.slice(0, 100)}
										{c.content.length > 100 ? "…" : ""}
										{c.is_deleted && (
											<span style={{ marginLeft: 6 }}>
												<StateBadge tone="danger">{t("community.hidden")}</StateBadge>
											</span>
										)}
									</td>
									<td style={td}>{c.profiles?.nickname ?? "—"}</td>
									<td style={td}>
										<Link href={`/${locale}${c.page_path}`} style={{ color: "var(--fg-muted)", fontSize: "var(--fs-xs)" }}>
											{c.page_path}
										</Link>
									</td>
									<td style={{ ...td, whiteSpace: "nowrap" }}>{dateStr(c.created_at)}</td>
									<td style={{ ...td, whiteSpace: "nowrap" }}>
										<button className="btn btn--sm" onClick={() => toggleComment(c)}>
											{c.is_deleted ? t("community.unhide") : t("community.hide")}
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</section>
	);
}
