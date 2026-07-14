"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { useOptionalAuth } from "@/lib/auth/AuthProvider";

type Tab = "posts" | "comments" | "reports";

interface MyPost {
	id: string;
	title: string;
	category: string;
	reply_count: number;
	created_at: string;
	is_deleted: boolean;
}

interface MyComment {
	id: string;
	page_path: string;
	content: string;
	created_at: string;
	is_deleted: boolean;
}

interface MyReport {
	id: string;
	title: string;
	type: string;
	status: "open" | "in_review" | "resolved" | "rejected";
	created_at: string;
}

const STATUS_COLOR: Record<MyReport["status"], string> = {
	open: "var(--warning)",
	in_review: "var(--accent)",
	resolved: "var(--success)",
	rejected: "var(--fg-subtle)",
};

export default function ActivityClient({ locale }: { locale: string }) {
	const t = useTranslations("mypage.activity");
	const auth = useOptionalAuth();
	const userId = auth?.user?.id ?? null;

	const [tab, setTab] = useState<Tab>("posts");
	const [posts, setPosts] = useState<MyPost[] | null>(null);
	const [comments, setComments] = useState<MyComment[] | null>(null);
	const [reports, setReports] = useState<MyReport[] | null>(null);

	const fetchData = useCallback(async () => {
		if (!userId) return;
		const supabase = createClient();
		if (tab === "posts" && posts === null) {
			const { data } = await supabase
				.from("board_posts")
				.select("id, title, category, reply_count, created_at, is_deleted")
				.eq("user_id", userId)
				.order("created_at", { ascending: false })
				.limit(50);
			setPosts((data as MyPost[]) ?? []);
		} else if (tab === "comments" && comments === null) {
			const { data } = await supabase
				.from("comments")
				.select("id, page_path, content, created_at, is_deleted")
				.eq("user_id", userId)
				.order("created_at", { ascending: false })
				.limit(50);
			setComments((data as MyComment[]) ?? []);
		} else if (tab === "reports" && reports === null) {
			const { data } = await supabase
				.from("reports")
				.select("id, title, type, status, created_at")
				.eq("user_id", userId)
				.order("created_at", { ascending: false })
				.limit(50);
			setReports((data as MyReport[]) ?? []);
		}
	}, [userId, tab, posts, comments, reports]);

	useEffect(() => {
		void Promise.resolve().then(fetchData);
	}, [fetchData]);

	if (!auth?.isLoading && !userId) {
		return (
			<p style={{ marginTop: "var(--space-4)", fontSize: "var(--fs-sm)", color: "var(--fg-muted)" }}>
				{t("loginRequired")}
			</p>
		);
	}

	const dateStr = (iso: string) => new Date(iso).toLocaleDateString(locale === "ko" ? "ko-KR" : "en-US");

	const listStyle: React.CSSProperties = {
		marginTop: "var(--space-4)",
		display: "flex",
		flexDirection: "column",
		gap: "var(--space-2)",
	};
	const rowStyle: React.CSSProperties = {
		display: "flex",
		justifyContent: "space-between",
		gap: "var(--space-3)",
		fontSize: "var(--fs-sm)",
		borderBottom: "1px solid var(--divider)",
		paddingBottom: "var(--space-2)",
	};

	const emptyMsg = (
		<p style={{ marginTop: "var(--space-4)", fontSize: "var(--fs-sm)", color: "var(--fg-subtle)" }}>{t("empty")}</p>
	);

	return (
		<div>
			<div role="group" aria-label={t("tabPosts")} className="glossary-filter" style={{ marginTop: "var(--space-4)" }}>
				{(["posts", "comments", "reports"] as Tab[]).map((v) => (
					<button key={v} type="button" aria-pressed={tab === v} onClick={() => setTab(v)}>
						{t(v === "posts" ? "tabPosts" : v === "comments" ? "tabComments" : "tabReports")}
					</button>
				))}
			</div>

			{tab === "posts" &&
				(posts === null ? null : posts.length === 0 ? emptyMsg : (
					<ul style={listStyle}>
						{posts.map((p) => (
							<li key={p.id} style={{ ...rowStyle, opacity: p.is_deleted ? 0.5 : 1 }}>
								<span>
									<Link href={`/${locale}/community/${p.id}`} style={{ color: "inherit" }}>
										{p.title}
									</Link>
									<span style={{ marginLeft: 8, fontSize: "var(--fs-xs)", color: "var(--fg-subtle)" }}>
										{p.category} · 💬 {p.reply_count}
									</span>
								</span>
								<span style={{ color: "var(--fg-subtle)", fontSize: "var(--fs-xs)", whiteSpace: "nowrap" }}>{dateStr(p.created_at)}</span>
							</li>
						))}
					</ul>
				))}

			{tab === "comments" &&
				(comments === null ? null : comments.length === 0 ? emptyMsg : (
					<ul style={listStyle}>
						{comments.map((c) => (
							<li key={c.id} style={{ ...rowStyle, opacity: c.is_deleted ? 0.5 : 1 }}>
								<span>
									{c.content.slice(0, 80)}
									{c.content.length > 80 ? "…" : ""}
									<Link href={`/${locale}${c.page_path}`} style={{ display: "block", marginTop: 2, fontSize: "var(--fs-xs)", color: "var(--fg-subtle)" }}>
										{c.page_path}
									</Link>
								</span>
								<span style={{ color: "var(--fg-subtle)", fontSize: "var(--fs-xs)", whiteSpace: "nowrap" }}>{dateStr(c.created_at)}</span>
							</li>
						))}
					</ul>
				))}

			{tab === "reports" &&
				(reports === null ? null : reports.length === 0 ? emptyMsg : (
					<ul style={listStyle}>
						{reports.map((r) => (
							<li key={r.id} style={rowStyle}>
								<span>
									{r.title}
									<span
										style={{
											marginLeft: 8,
											fontSize: "var(--fs-xs)",
											fontWeight: 600,
											color: STATUS_COLOR[r.status],
										}}
									>
										{t(`status.${r.status}`)}
									</span>
								</span>
								<span style={{ color: "var(--fg-subtle)", fontSize: "var(--fs-xs)", whiteSpace: "nowrap" }}>{dateStr(r.created_at)}</span>
							</li>
						))}
					</ul>
				))}
		</div>
	);
}
