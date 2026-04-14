"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { useOptionalAuth } from "@/lib/auth/AuthProvider";

interface StudyNoteEditorProps {
	pagePath: string;
	unitId: string;
	locale: string;
}

export default function StudyNoteEditor({ pagePath, unitId, locale }: StudyNoteEditorProps) {
	const [content, setContent] = useState("");
	const [savedContent, setSavedContent] = useState("");
	const [isSaving, setIsSaving] = useState(false);
	const [lastSaved, setLastSaved] = useState<Date | null>(null);
	const auth = useOptionalAuth();
	const isKo = locale === "ko";
	const debounceRef = useRef<NodeJS.Timeout | null>(null);
	const supabase = createClient();

	// 기존 메모 로드
	const loadNote = useCallback(async () => {
		if (!auth?.user) return;

		const { data } = await supabase
			.from("study_notes")
			.select("content")
			.eq("user_id", auth.user.id)
			.eq("page_path", pagePath)
			.single();

		if (data) {
			setContent(data.content);
			setSavedContent(data.content);
		}
	}, [auth?.user, supabase, pagePath]);

	useEffect(() => {
		loadNote();
	}, [loadNote]);

	// 자동 저장 (디바운스 1초)
	const saveNote = useCallback(
		async (text: string) => {
			if (!auth?.user || text === savedContent) return;

			setIsSaving(true);
			await supabase.from("study_notes").upsert(
				{
					user_id: auth.user.id,
					page_path: pagePath,
					unit_id: unitId,
					content: text,
				},
				{ onConflict: "user_id,page_path" }
			);

			setSavedContent(text);
			setLastSaved(new Date());
			setIsSaving(false);
		},
		[auth?.user, supabase, pagePath, unitId, savedContent]
	);

	const handleChange = (value: string) => {
		setContent(value);

		if (debounceRef.current) {
			clearTimeout(debounceRef.current);
		}

		debounceRef.current = setTimeout(() => {
			saveNote(value);
		}, 1000);
	};

	const handleDelete = async () => {
		if (!auth?.user) return;
		if (!confirm(isKo ? "메모를 삭제하시겠습니까?" : "Delete this note?")) return;

		await supabase
			.from("study_notes")
			.delete()
			.eq("user_id", auth.user.id)
			.eq("page_path", pagePath);

		setContent("");
		setSavedContent("");
		setLastSaved(null);
	};

	if (!auth?.user) {
		return (
			<div className="mt-8 rounded-lg border border-dashed border-gray-200 px-4 py-3 text-sm text-gray-400">
				{isKo ? "📝 로그인하면 학습 메모를 작성할 수 있습니다." : "📝 Sign in to take study notes."}
			</div>
		);
	}

	return (
		<section aria-labelledby="study-note-heading" className="mt-8">
			<div className="flex items-center justify-between">
				<h2 id="study-note-heading" className="text-base font-semibold text-gray-900">
					{isKo ? "나의 학습 메모" : "My Study Notes"}
				</h2>
				<div className="flex items-center gap-2 text-xs text-gray-400">
					{isSaving && <span>{isKo ? "저장 중..." : "Saving..."}</span>}
					{!isSaving && lastSaved && <span>{isKo ? "자동 저장됨" : "Saved"}</span>}
					{content && (
						<button
							onClick={handleDelete}
							className="text-red-400 hover:text-red-600 transition-colors"
							aria-label={isKo ? "메모 삭제" : "Delete note"}
						>
							{isKo ? "삭제" : "Delete"}
						</button>
					)}
				</div>
			</div>
			<textarea
				value={content}
				onChange={(e) => handleChange(e.target.value)}
				placeholder={
					isKo
						? "이 단원에서 기억할 내용을 메모하세요... (자동 저장)"
						: "Take notes for this unit... (auto-saved)"
				}
				className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-y min-h-[100px]"
				aria-label={isKo ? "학습 메모" : "Study notes"}
			/>
		</section>
	);
}
