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
		<form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
			<div>
				<label
					htmlFor="nickname"
					style={{ display: "block", fontSize: "var(--fs-xs)", fontWeight: 500, color: "var(--fg-muted)", marginBottom: "var(--space-1)" }}
				>
					{isKo ? "닉네임" : "Nickname"}
				</label>
				<div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
					<input
						id="nickname"
						type="text"
						value={nickname}
						onChange={(e) => setNickname(e.target.value)}
						maxLength={20}
						style={{
							flex: 1,
							borderRadius: "var(--radius)",
							border: "1px solid var(--border)",
							padding: "var(--space-2) var(--space-3)",
							fontSize: "var(--fs-sm)",
							color: "var(--fg)",
							background: "var(--bg)",
							outline: "none",
						}}
						placeholder={isKo ? "닉네임 입력" : "Enter nickname"}
						aria-describedby="nickname-status"
						onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
						onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
					/>
					<button
						type="submit"
						disabled={saving || !nickname.trim()}
						style={{
							borderRadius: "var(--radius)",
							background: "var(--accent)",
							padding: "var(--space-2) var(--space-4)",
							fontSize: "var(--fs-sm)",
							fontWeight: 500,
							color: "var(--fg-on-accent)",
							border: "none",
							cursor: saving || !nickname.trim() ? "not-allowed" : "pointer",
							opacity: saving || !nickname.trim() ? 0.5 : 1,
							transition: "opacity var(--dur-fast)",
						}}
					>
						{saving
							? isKo ? "저장 중..." : "Saving..."
							: isKo ? "저장" : "Save"}
					</button>
				</div>
			</div>

			{/* 저장 상태 메시지 — aria-live로 스크린리더에 자동 전달 */}
			<div id="nickname-status" aria-live="polite" aria-atomic="true" style={{ fontSize: "var(--fs-xs)", minHeight: "1.2em" }}>
				{saved && (
					<span style={{ color: "var(--success)" }}>
						{isKo ? "닉네임이 저장되었습니다." : "Nickname saved successfully."}
					</span>
				)}
				{saveError && (
					<span style={{ color: "var(--danger)" }} role="alert">
						{saveError}
					</span>
				)}
			</div>
		</form>
	);
}
