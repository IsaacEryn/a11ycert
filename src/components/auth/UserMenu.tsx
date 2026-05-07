"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useOptionalAuth } from "@/lib/auth/AuthProvider";

interface UserMenuProps {
	locale: string;
}

export default function UserMenu({ locale }: UserMenuProps) {
	const auth = useOptionalAuth();
	const [open, setOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const isKo = locale === "ko";

	useEffect(() => {
		function handleClickOutside(e: PointerEvent) {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				setOpen(false);
			}
		}
		document.addEventListener("pointerdown", handleClickOutside);
		return () => document.removeEventListener("pointerdown", handleClickOutside);
	}, []);

	useEffect(() => {
		if (open) {
			requestAnimationFrame(() => {
				const firstItem = menuRef.current?.querySelector<HTMLElement>('[role="menuitem"]');
				firstItem?.focus();
			});
		}
	}, [open]);

	const closeMenu = useCallback(() => {
		setOpen(false);
		triggerRef.current?.focus();
	}, []);

	const handleMenuKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (!open) return;
			const items = Array.from(
				menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []
			);
			const idx = items.indexOf(document.activeElement as HTMLElement);
			if (e.key === "ArrowDown") { e.preventDefault(); items[(idx + 1) % items.length]?.focus(); }
			else if (e.key === "ArrowUp") { e.preventDefault(); items[(idx - 1 + items.length) % items.length]?.focus(); }
			else if (e.key === "Home") { e.preventDefault(); items[0]?.focus(); }
			else if (e.key === "End") { e.preventDefault(); items[items.length - 1]?.focus(); }
			else if (e.key === "Escape") { closeMenu(); }
			else if (e.key === "Tab") { setOpen(false); }
		},
		[open, closeMenu]
	);

	if (!auth || auth.isLoading || !auth.user) return null;

	const displayName = auth.profile?.nickname || auth.user.email?.split("@")[0] || "User";
	const avatarUrl = auth.profile?.avatar_url;
	const initial = displayName.charAt(0).toUpperCase();

	const menuItemStyle: React.CSSProperties = {
		display: "block",
		padding: "8px 16px",
		fontSize: "var(--fs-sm)",
		color: "var(--fg-muted)",
		textDecoration: "none",
		transition: "background var(--dur-fast)",
		cursor: "pointer",
		width: "100%",
		textAlign: "left",
		background: "none",
		border: "none",
	};

	return (
		<div style={{ position: "relative" }} ref={menuRef} onKeyDown={handleMenuKeyDown}>
			<button
				ref={triggerRef}
				onClick={() => setOpen((v) => !v)}
				style={{
					display: "flex",
					alignItems: "center",
					gap: "var(--space-2)",
					borderRadius: "var(--radius)",
					padding: "var(--space-1) var(--space-2)",
					fontSize: "var(--fs-sm)",
					background: "none",
					border: "none",
					cursor: "pointer",
					color: "var(--fg)",
				}}
				aria-haspopup="menu"
				aria-expanded={open}
				aria-label={isKo ? "사용자 메뉴 열기" : "Open user menu"}
			>
				{avatarUrl ? (
					<img
						src={avatarUrl}
						alt=""
						style={{ width: 26, height: 26, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
						referrerPolicy="no-referrer"
					/>
				) : (
					<span style={{
						flexShrink: 0,
						width: 26,
						height: 26,
						borderRadius: "50%",
						background: "var(--accent-soft)",
						color: "var(--accent-soft-fg)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontSize: "var(--fs-xs)",
						fontWeight: 700,
					}}>
						{initial}
					</span>
				)}
				<span style={{ fontSize: "var(--fs-xs)", fontWeight: 500, color: "var(--fg-muted)", maxWidth: 80, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} className="hidden sm:inline">
					{displayName}
				</span>
				<svg
					aria-hidden="true"
					style={{ width: 12, height: 12, color: "var(--fg-subtle)", transition: `transform var(--dur-fast)`, transform: open ? "rotate(180deg)" : "none", flexShrink: 0 }}
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
				</svg>
			</button>

			{open && (
				<div
					style={{
						position: "absolute",
						right: 0,
						top: "calc(100% + 6px)",
						width: 220,
						borderRadius: "var(--radius)",
						border: "1px solid var(--border)",
						background: "var(--bg-elev)",
						boxShadow: "var(--shadow-lg)",
						zIndex: 200,
						overflow: "hidden",
					}}
					role="menu"
					aria-label={isKo ? "사용자 메뉴" : "User menu"}
				>
					{/* 사용자 정보 헤더 */}
					<div style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }} aria-hidden="true">
						<p style={{ fontSize: "var(--fs-sm)", fontWeight: 600, color: "var(--fg)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
							{displayName}
						</p>
						<p style={{ fontSize: "var(--fs-xs)", color: "var(--fg-subtle)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
							{auth.user.email}
						</p>
					</div>

					{/* 메뉴 항목 */}
					<div style={{ padding: "var(--space-1) 0" }}>
						<Link
							href={`/${locale}/mypage/exam-room`}
							style={menuItemStyle}
							role="menuitem"
							onClick={() => setOpen(false)}
							onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-muted)")}
							onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
						>
							<span style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
								<svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
									<path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/>
								</svg>
								{isKo ? "오답노트 · 저장 문제" : "Wrong Answers · Saved"}
							</span>
						</Link>
						<Link
							href={`/${locale}/mypage`}
							style={menuItemStyle}
							role="menuitem"
							onClick={() => setOpen(false)}
							onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-muted)")}
							onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
						>
							<span style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
								<svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
									<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
								</svg>
								{isKo ? "나의 정보" : "My Profile"}
							</span>
						</Link>
					</div>

					{/* 로그아웃 */}
					<div style={{ borderTop: "1px solid var(--divider)", padding: "var(--space-1) 0" }}>
						<button
							onClick={async () => { await auth.signOut(); setOpen(false); }}
							style={{ ...menuItemStyle, color: "var(--danger)" }}
							role="menuitem"
							onMouseEnter={(e) => (e.currentTarget.style.background = "var(--danger-soft)")}
							onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
						>
							<span style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
								<svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
									<path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
								</svg>
								{isKo ? "로그아웃" : "Sign Out"}
							</span>
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
