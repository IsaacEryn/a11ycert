"use client";

import { useState } from "react";
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
	const isKo = locale === "ko";
	const supabase = createClient();

	const handleSave = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!nickname.trim() || saving) return;

		setSaving(true);
		const { error } = await supabase
			.from("profiles")
			.update({ nickname: nickname.trim() })
			.eq("id", profile?.id);

		if (!error) {
			await refreshProfile();
			setSaved(true);
			setTimeout(() => setSaved(false), 2000);
		}
		setSaving(false);
	};

	return (
		<form onSubmit={handleSave} className="flex items-end gap-3">
			<div className="flex-1">
				<label htmlFor="nickname" className="block text-xs font-medium text-gray-600 mb-1">
					{isKo ? "닉네임" : "Nickname"}
				</label>
				<input
					id="nickname"
					type="text"
					value={nickname}
					onChange={(e) => setNickname(e.target.value)}
					maxLength={20}
					className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-blue-600"
					placeholder={isKo ? "닉네임 입력" : "Enter nickname"}
				/>
			</div>
			<button
				type="submit"
				disabled={saving || !nickname.trim()}
				className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
			>
				{saved
					? isKo
						? "저장됨 ✓"
						: "Saved ✓"
					: saving
						? isKo
							? "저장 중..."
							: "Saving..."
						: isKo
							? "저장"
							: "Save"}
			</button>
		</form>
	);
}
