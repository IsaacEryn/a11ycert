"use client";

import { useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { useOptionalAuth } from "@/lib/auth/AuthProvider";
import { isReservedNickname } from "@/lib/nickname";

function isValidHttpUrl(value: string): boolean {
	try {
		const url = new URL(value);
		return url.protocol === "http:" || url.protocol === "https:";
	} catch {
		return false;
	}
}

export default function SettingsClient({ locale }: { locale: string }) {
	const t = useTranslations("mypage.settings");
	const auth = useOptionalAuth();
	const router = useRouter();
	const pathname = usePathname();
	const supabaseRef = useRef(createClient());
	const supabase = supabaseRef.current;

	const profile = auth?.profile ?? null;

	const [nickname, setNickname] = useState(profile?.nickname ?? "");
	const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url ?? "");
	const [saving, setSaving] = useState(false);
	const [status, setStatus] = useState<{ tone: "success" | "danger"; text: string } | null>(null);

	const [deleteConfirm, setDeleteConfirm] = useState("");
	const [deleting, setDeleting] = useState(false);
	const [deleteError, setDeleteError] = useState<string | null>(null);

	if (!auth || auth.isLoading) return null;
	if (!auth.user || !profile) return null;

	const avatarTrimmed = avatarUrl.trim();
	const avatarInvalid = avatarTrimmed !== "" && !isValidHttpUrl(avatarTrimmed);

	const handleSave = async (e: React.FormEvent) => {
		e.preventDefault();
		if (saving || !nickname.trim() || avatarInvalid) return;

		// 관리자 사칭 닉네임 차단 — 실제 관리자는 예외 (최종 차단은 DB 트리거)
		if (profile.role !== "admin" && isReservedNickname(nickname)) {
			setStatus({ tone: "danger", text: t("nicknameReserved") });
			return;
		}

		setSaving(true);
		setStatus(null);
		const { error } = await supabase
			.from("profiles")
			.update({
				nickname: nickname.trim(),
				avatar_url: avatarTrimmed === "" ? null : avatarTrimmed,
			})
			.eq("id", profile.id);

		if (error) {
			setStatus({
				tone: "danger",
				text: error.message.includes("reserved_nickname") ? t("nicknameReserved") : t("saveError"),
			});
		} else {
			await auth.refreshProfile();
			setStatus({ tone: "success", text: t("saved") });
		}
		setSaving(false);
	};

	const switchLocale = (target: "ko" | "en") => {
		if (target === locale) return;
		document.cookie = `NEXT_LOCALE=${target}; path=/; max-age=31536000; SameSite=Lax`;
		router.push(pathname.replace(`/${locale}`, `/${target}`));
	};

	const handleDelete = async (e: React.FormEvent) => {
		e.preventDefault();
		if (deleting) return;
		if (deleteConfirm.trim() !== profile.nickname) {
			setDeleteError(t("deleteMismatch"));
			return;
		}
		setDeleting(true);
		setDeleteError(null);

		const res = await fetch("/api/account/delete", { method: "POST" });
		if (!res.ok) {
			const body = await res.json().catch(() => ({}));
			setDeleteError(t("deleteError", { message: body.error ?? res.status }));
			setDeleting(false);
			return;
		}

		await auth.signOut();
		router.push(`/${locale}`);
	};

	const inputStyle: React.CSSProperties = {
		width: "100%",
		borderRadius: "var(--radius)",
		border: "1px solid var(--border)",
		padding: "var(--space-2) var(--space-3)",
		fontSize: "var(--fs-sm)",
		color: "var(--fg)",
		background: "var(--bg)",
	};

	const sectionStyle: React.CSSProperties = {
		marginTop: "var(--space-6)",
		border: "1px solid var(--border)",
		borderRadius: "var(--radius-lg)",
		padding: "var(--space-5)",
	};

	const initial = (nickname || auth.user.email || "U").charAt(0).toUpperCase();

	return (
		<div>
			{/* 프로필 */}
			<section aria-labelledby="settings-profile" style={sectionStyle}>
				<h2 id="settings-profile" style={{ fontSize: "var(--fs-sm)", fontWeight: 600, color: "var(--fg-muted)" }}>
					{t("profileSection")}
				</h2>
				<form onSubmit={handleSave} style={{ marginTop: "var(--space-4)", display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
					<div>
						<label htmlFor="settings-nickname" style={{ display: "block", fontSize: "var(--fs-xs)", fontWeight: 500, color: "var(--fg-muted)", marginBottom: "var(--space-1)" }}>
							{t("nickname")}
						</label>
						<input
							id="settings-nickname"
							type="text"
							value={nickname}
							onChange={(e) => setNickname(e.target.value)}
							maxLength={20}
							placeholder={t("nicknamePlaceholder")}
							style={inputStyle}
						/>
					</div>

					<div>
						<label htmlFor="settings-avatar" style={{ display: "block", fontSize: "var(--fs-xs)", fontWeight: 500, color: "var(--fg-muted)", marginBottom: "var(--space-1)" }}>
							{t("avatarUrl")}
						</label>
						<div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
							{avatarTrimmed && !avatarInvalid ? (
								<img
									src={avatarTrimmed}
									alt={t("avatarPreviewAlt")}
									style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
									referrerPolicy="no-referrer"
								/>
							) : (
								<span style={{
									flexShrink: 0, width: 40, height: 40, borderRadius: "50%",
									background: "var(--accent-soft)", color: "var(--accent-soft-fg)",
									display: "flex", alignItems: "center", justifyContent: "center",
									fontSize: "var(--fs-sm)", fontWeight: 700,
								}} aria-hidden="true">
									{initial}
								</span>
							)}
							<input
								id="settings-avatar"
								type="url"
								value={avatarUrl}
								onChange={(e) => setAvatarUrl(e.target.value)}
								placeholder={t("avatarUrlPlaceholder")}
								aria-invalid={avatarInvalid}
								aria-describedby={avatarInvalid ? "settings-avatar-error" : undefined}
								style={{ ...inputStyle, flex: 1 }}
							/>
						</div>
						{avatarInvalid && (
							<p id="settings-avatar-error" role="alert" style={{ marginTop: "var(--space-1)", fontSize: "var(--fs-xs)", color: "var(--danger)" }}>
								{t("avatarUrlInvalid")}
							</p>
						)}
					</div>

					<div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
						<button type="submit" className="btn btn--primary btn--sm" disabled={saving || !nickname.trim() || avatarInvalid}>
							{saving ? t("saving") : t("save")}
						</button>
						<span aria-live="polite" style={{ fontSize: "var(--fs-xs)", color: status?.tone === "success" ? "var(--success)" : "var(--danger)" }}>
							{status?.text}
						</span>
					</div>
				</form>
			</section>

			{/* 기본 언어 */}
			<section aria-labelledby="settings-language" style={sectionStyle}>
				<h2 id="settings-language" style={{ fontSize: "var(--fs-sm)", fontWeight: 600, color: "var(--fg-muted)" }}>
					{t("languageSection")}
				</h2>
				<p style={{ marginTop: "var(--space-1)", fontSize: "var(--fs-xs)", color: "var(--fg-subtle)" }}>
					{t("languageDesc")}
				</p>
				<div role="group" aria-label={t("languageSection")} className="lang-toggle" style={{ marginTop: "var(--space-3)", width: "fit-content" }}>
					<button aria-pressed={locale === "ko"} onClick={() => switchLocale("ko")}>
						{t("korean")}
					</button>
					<button aria-pressed={locale === "en"} onClick={() => switchLocale("en")}>
						{t("english")}
					</button>
				</div>
			</section>

			{/* 위험 구역 */}
			<section aria-labelledby="settings-danger" style={{ ...sectionStyle, borderColor: "var(--danger-soft)" }}>
				<h2 id="settings-danger" style={{ fontSize: "var(--fs-sm)", fontWeight: 600, color: "var(--danger)" }}>
					{t("dangerSection")}
				</h2>
				<h3 style={{ marginTop: "var(--space-3)", fontSize: "var(--fs-sm)", fontWeight: 600 }}>{t("deleteTitle")}</h3>
				<p style={{ marginTop: "var(--space-1)", fontSize: "var(--fs-xs)", color: "var(--fg-muted)" }}>
					{t("deleteWarning")}
				</p>
				<form onSubmit={handleDelete} style={{ marginTop: "var(--space-3)", display: "flex", flexDirection: "column", gap: "var(--space-2)", maxWidth: 360 }}>
					<label htmlFor="settings-delete-confirm" style={{ fontSize: "var(--fs-xs)", color: "var(--fg-muted)" }}>
						{t("deleteConfirmLabel", { nickname: profile.nickname })}
					</label>
					<input
						id="settings-delete-confirm"
						type="text"
						value={deleteConfirm}
						onChange={(e) => setDeleteConfirm(e.target.value)}
						autoComplete="off"
						style={inputStyle}
					/>
					{deleteError && (
						<p role="alert" style={{ fontSize: "var(--fs-xs)", color: "var(--danger)" }}>
							{deleteError}
						</p>
					)}
					<button
						type="submit"
						disabled={deleting || deleteConfirm.trim() !== profile.nickname}
						style={{
							alignSelf: "flex-start",
							fontSize: "var(--fs-sm)",
							fontWeight: 600,
							color: "#fff",
							background: "var(--danger)",
							border: "none",
							borderRadius: "var(--radius)",
							padding: "var(--space-2) var(--space-4)",
							cursor: deleting || deleteConfirm.trim() !== profile.nickname ? "not-allowed" : "pointer",
							opacity: deleting || deleteConfirm.trim() !== profile.nickname ? 0.5 : 1,
						}}
					>
						{deleting ? t("deleting") : t("deleteButton")}
					</button>
				</form>
			</section>
		</div>
	);
}
