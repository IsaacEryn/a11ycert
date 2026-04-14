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
	const [confirmingDelete, setConfirmingDelete] = useState(false);
	const auth = useOptionalAuth();
	const isKo = locale === "ko";
	const debounceRef = useRef<NodeJS.Timeout | null>(null);
	const supabaseRef = useRef(createClient());
	const supabase = supabaseRef.current;

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

		await supabase
			.from("study_notes")
			.delete()
			.eq("user_id", auth.user.id)
			.eq("page_path", pagePath);

		setContent("");
		setSavedContent("");
		setLastSaved(null);
		setConfirmingDelete(false);
	};

	if (!auth?.user) {
		return (
			<div className="mt-8 rounded-lg border border-dashed border-gray-200 px-4 py-3 text-sm text-gray-400">
				<span aria-hidden="true">📝</span>{" "}
				{isKo ? "로그인하면 학습 메모를 작성할 수 있습니다." : "Sign in to take study notes."}
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
					{/* 저장 상태 — aria-live로 스크린리더에 자동 전달 */}
					<span aria-live="polite" aria-atomic="true">
						{isSaving
							? isKo ? "저장 중..." : "Saving..."
							: lastSaved
								? isKo ? "자동 저장됨" : "Saved"
								: ""}
					</span>

					{/* 삭제 버튼 — confirm() 대신 인라인 확인 */}
					{content && !confirmingDelete && (
						<button
							onClick={() => setConfirmingDelete(true)}
							className="text-red-400 hover:text-red-600 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 rounded"
							aria-label={isKo ? "메모 삭제" : "Delete note"}
						>
							{isKo ? "삭제" : "Delete"}
						</button>
					)}
					{confirmingDelete && (
						<span className="flex items-center gap-1.5" role="group" aria-label={isKo ? "삭제 확인" : "Confirm deletion"}>
							<span className="text-red-600">{isKo ? "삭제할까요?" : "Delete?"}</span>
							<button
								onClick={handleDelete}
								className="text-red-600 font-medium hover:text-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 rounded"
								aria-label={isKo ? "메모 삭제 확인" : "Confirm delete note"}
							>
								{isKo ? "확인" : "Yes"}
							</button>
							<button
								onClick={() => setConfirmingDelete(false)}
								className="text-gray-400 hover:text-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400 rounded"
								aria-label={isKo ? "삭제 취소" : "Cancel delete"}
							>
								{isKo ? "취소" : "No"}
							</button>
						</span>
					)}
				</div>
			</div>
			<label htmlFor="study-note-textarea" className="sr-only">
				{isKo ? "학습 메모" : "Study notes"}
			</label>
			<textarea
				id="study-note-textarea"
				value={content}
				onChange={(e) => handleChange(e.target.value)}
				placeholder={
					isKo
						? "이 단원에서 기억할 내용을 메모하세요... (자동 저장)"
						: "Take notes for this unit... (auto-saved)"
				}
				className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-y min-h-[100px]"
			/>
		</section>
	);
}
