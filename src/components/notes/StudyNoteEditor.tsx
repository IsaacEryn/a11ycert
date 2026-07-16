"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { useOptionalAuth } from "@/lib/auth/AuthProvider";

interface StudyNoteEditorProps {
	pagePath: string;
	unitId: string;
}

export default function StudyNoteEditor({ pagePath, unitId }: StudyNoteEditorProps) {
	const [content, setContent] = useState("");
	const [savedContent, setSavedContent] = useState("");
	const [isSaving, setIsSaving] = useState(false);
	const [lastSaved, setLastSaved] = useState<Date | null>(null);
	const [confirmingDelete, setConfirmingDelete] = useState(false);
	const auth = useOptionalAuth();
	// 옵셔널 체이닝을 의존성 배열에 직접 쓰면 React Compiler가 memo를 보존하지 못함
	const user = auth?.user ?? null;
	const t = useTranslations("notes");
	const debounceRef = useRef<NodeJS.Timeout | null>(null);
	const [supabase] = useState(createClient);

	// 기존 메모 로드
	const loadNote = useCallback(async () => {
		if (!user) return;

		const { data } = await supabase
			.from("study_notes")
			.select("content")
			.eq("user_id", user.id)
			.eq("page_path", pagePath)
			.single();

		if (data) {
			setContent(data.content);
			setSavedContent(data.content);
		}
	}, [user, supabase, pagePath]);

	useEffect(() => {
		void Promise.resolve().then(loadNote);
	}, [loadNote]);

	// 자동 저장 (디바운스 1초)
	const saveNote = useCallback(
		async (text: string) => {
			if (!user || text === savedContent) return;

			setIsSaving(true);
			await supabase.from("study_notes").upsert(
				{
					user_id: user.id,
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
		[user, supabase, pagePath, unitId, savedContent]
	);

	// 디바운스 저장 대기 중(미저장 변경) 새로고침·창 닫기 시 이탈 경고
	useEffect(() => {
		if (content === savedContent) return;
		const handler = (e: BeforeUnloadEvent) => {
			e.preventDefault();
		};
		window.addEventListener("beforeunload", handler);
		return () => window.removeEventListener("beforeunload", handler);
	}, [content, savedContent]);

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
				{t("signInToTake")}
			</div>
		);
	}

	return (
		<section aria-labelledby="study-note-heading" className="mt-8">
			<div className="flex items-center justify-between">
				<h2 id="study-note-heading" className="text-base font-semibold text-gray-900">
					{t("myStudyNotes")}
				</h2>
				<div className="flex items-center gap-2 text-xs text-gray-400">
					{/* 저장 상태 — aria-live로 스크린리더에 자동 전달 */}
					<span aria-live="polite" aria-atomic="true">
						{isSaving
							? t("saving")
							: lastSaved
								? t("saved")
								: ""}
					</span>

					{/* 삭제 버튼 — confirm() 대신 인라인 확인 */}
					{content && !confirmingDelete && (
						<button
							onClick={() => setConfirmingDelete(true)}
							className="text-red-400 hover:text-red-600 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 rounded"
							aria-label={t("deleteNote")}
						>
							{t("delete")}
						</button>
					)}
					{confirmingDelete && (
						<span className="flex items-center gap-1.5" role="group" aria-label={t("confirmDeletion")}>
							<span className="text-red-600">{t("delete2")}</span>
							<button
								onClick={handleDelete}
								className="text-red-600 font-medium hover:text-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 rounded"
								aria-label={t("confirmDeleteNote")}
							>
								{t("yes")}
							</button>
							<button
								onClick={() => setConfirmingDelete(false)}
								className="text-gray-400 hover:text-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400 rounded"
								aria-label={t("cancelDelete")}
							>
								{t("no")}
							</button>
						</span>
					)}
				</div>
			</div>
			<label htmlFor="study-note-textarea" className="sr-only">
				{t("studyNotes")}
			</label>
			<textarea
				id="study-note-textarea"
				value={content}
				onChange={(e) => handleChange(e.target.value)}
				placeholder={
					t("takeNotesForThis")
				}
				className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-y min-h-[100px]"
			/>
		</section>
	);
}
