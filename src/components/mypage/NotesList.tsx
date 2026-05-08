"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth/AuthProvider";

interface Note {
	id: string;
	page_path: string;
	unit_id: string;
	content: string;
	updated_at: string;
}

interface Props {
	locale: string;
}

export default function NotesList({ locale }: Props) {
	const { user } = useAuth();
	const [notes, setNotes] = useState<Note[]>([]);
	const [loading, setLoading] = useState(true);
	const isKo = locale === "ko";
	const supabaseRef = useRef(createClient());
	const supabase = supabaseRef.current;

	useEffect(() => {
		if (!user) {
			setLoading(false);
			return;
		}

		supabase
			.from("study_notes")
			.select("id, page_path, unit_id, content, updated_at")
			.eq("user_id", user.id)
			.order("updated_at", { ascending: false })
			.then((result: { data: Note[] | null }) => {
				setNotes(result.data ?? []);
				setLoading(false);
			});
	}, [user, supabase]);

	if (!user) {
		return (
			<p style={{ fontSize: "var(--fs-sm)", color: "var(--fg-muted)" }}>
				{isKo ? "로그인 후 메모를 확인할 수 있습니다." : "Sign in to view your notes."}
			</p>
		);
	}

	if (loading) {
		return <p style={{ fontSize: "var(--fs-sm)", color: "var(--fg-subtle)" }}>{isKo ? "불러오는 중..." : "Loading..."}</p>;
	}

	if (notes.length === 0) {
		return (
			<div style={{
				borderRadius: "var(--radius-lg)",
				border: "1px dashed var(--border)",
				padding: "var(--space-10) var(--space-6)",
				textAlign: "center",
				fontSize: "var(--fs-sm)",
				color: "var(--fg-subtle)",
			}}>
				{isKo ? "아직 작성한 메모가 없습니다." : "No study notes yet."}
			</div>
		);
	}

	return (
		<ul style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", listStyle: "none", margin: 0, padding: 0 }} role="list">
			{notes.map((note) => {
				const exam = note.unit_id.startsWith("cpacc") ? "cpacc" : "was";
				const href = `/${locale}/${exam}/study/${note.unit_id}`;
				const dateStr = new Date(note.updated_at).toLocaleDateString(
					locale === "ko" ? "ko-KR" : "en-US",
					{ year: "numeric", month: "short", day: "numeric" }
				);

				return (
					<li key={note.id} style={{
						borderRadius: "var(--radius-lg)",
						border: "1px solid var(--border)",
						padding: "var(--space-3) var(--space-4)",
					}}>
						<div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "var(--space-3)" }}>
							<div style={{ flex: 1, minWidth: 0 }}>
								<Link
									href={href}
									style={{ fontSize: "var(--fs-xs)", fontWeight: 500, color: "var(--accent)", textDecoration: "none" }}
									onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
									onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
								>
									{note.unit_id} →
								</Link>
								<p style={{
									marginTop: "var(--space-1)",
									fontSize: "var(--fs-sm)",
									color: "var(--fg-muted)",
									whiteSpace: "pre-wrap",
									overflow: "hidden",
									display: "-webkit-box",
									WebkitLineClamp: 3,
									WebkitBoxOrient: "vertical",
								}}>
									{note.content}
								</p>
							</div>
							<span style={{ flexShrink: 0, fontSize: "var(--fs-xs)", color: "var(--fg-subtle)" }}>{dateStr}</span>
						</div>
					</li>
				);
			})}
		</ul>
	);
}
