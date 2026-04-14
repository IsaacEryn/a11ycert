"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth/AuthProvider";

interface Props {
	locale: string;
}

export default function ProfileEditor({ locale }: Props) {
	const { profile, refreshProfile } = useAuth();
	const [nickname, setNickname] = useState(profile?.nickname ?? "");
	const [saving, setSaving] = useState(false);
	const [saved, setSaved] = useState(false);
	const [saveError, setSaveError] = useState<string | null>(null);
	const isKo = locale === "ko";
	const supabaseRef = useRef(createClient());
	const supabase = supabaseRef.current;

	const handleSave = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!nickname.trim() || saving) return;

		setSaving(true);
		setSaveError(null);
		const { error } = await supabase
			.from("profiles")
			.update({ nickname: nickname.trim() })
			.eq("id", profile?.id);

		if (!error) {
			await refreshProfile();
			setSaved(true);
			setTimeout(() => setSaved(false), 3000);
		} else {
			setSaveError(isKo ? "저장 중 오류가 발생했습니다." : "An error occurred. Please try again.");
		}
		setSaving(false);
	};

	return (
		<form onSubmit={handleSave} className="space-y-3">
			<div>
				<label htmlFor="nickname" className="block text-xs font-medium text-gray-600 mb-1">
					{isKo ? "닉네임" : "Nickname"}
				</label>
				<div className="flex items-center gap-3">
					<input
						id="nickname"
						type="text"
						value={nickname}
						onChange={(e) => setNickname(e.target.value)}
						maxLength={20}
						className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-blue-600"
						placeholder={isKo ? "닉네임 입력" : "Enter nickname"}
						aria-describedby="nickname-status"
					/>
					<button
						type="submit"
						disabled={saving || !nickname.trim()}
						className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
					>
						{saving
							? isKo ? "저장 중..." : "Saving..."
							: isKo ? "저장" : "Save"}
					</button>
				</div>
			</div>

			{/* 저장 상태 메시지 — aria-live로 스크린리더에 자동 전달 */}
			<div id="nickname-status" aria-live="polite" aria-atomic="true" className="text-xs">
				{saved && (
					<span className="text-green-600">
						{isKo ? "닉네임이 저장되었습니다." : "Nickname saved successfully."}
					</span>
				)}
				{saveError && (
					<span className="text-red-600" role="alert">
						{saveError}
					</span>
				)}
			</div>
		</form>
	);
}
