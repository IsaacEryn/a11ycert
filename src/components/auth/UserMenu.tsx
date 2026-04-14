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

	// 외부 클릭 시 닫기
	useEffect(() => {
		function handleClickOutside(e: PointerEvent) {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				setOpen(false);
			}
		}
		document.addEventListener("pointerdown", handleClickOutside);
		return () => document.removeEventListener("pointerdown", handleClickOutside);
	}, []);

	// 메뉴 열릴 때 첫 번째 menuitem으로 포커스 이동
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

	// 화살표 키 탐색
	const handleMenuKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (!open) return;

			const items = Array.from(
				menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []
			);
			const current = document.activeElement as HTMLElement;
			const idx = items.indexOf(current);

			if (e.key === "ArrowDown") {
				e.preventDefault();
				items[(idx + 1) % items.length]?.focus();
			} else if (e.key === "ArrowUp") {
				e.preventDefault();
				items[(idx - 1 + items.length) % items.length]?.focus();
			} else if (e.key === "Home") {
				e.preventDefault();
				items[0]?.focus();
			} else if (e.key === "End") {
				e.preventDefault();
				items[items.length - 1]?.focus();
			} else if (e.key === "Escape") {
				closeMenu();
			} else if (e.key === "Tab") {
				// Tab으로 메뉴 벗어날 때 닫기
				setOpen(false);
			}
		},
		[open, closeMenu]
	);

	if (!auth || auth.isLoading || !auth.user) return null;

	const displayName = auth.profile?.nickname || auth.user.email?.split("@")[0] || "User";
	const avatarUrl = auth.profile?.avatar_url;
	const initial = displayName.charAt(0).toUpperCase();

	return (
		<div className="relative" ref={menuRef} onKeyDown={handleMenuKeyDown}>
			<button
				ref={triggerRef}
				onClick={() => setOpen((v) => !v)}
				className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
				aria-haspopup="menu"
				aria-expanded={open}
				aria-label={isKo ? "사용자 메뉴 열기" : "Open user menu"}
			>
				{avatarUrl ? (
					<img
						src={avatarUrl}
						alt=""
						className="h-6 w-6 rounded-full object-cover"
						referrerPolicy="no-referrer"
					/>
				) : (
					<span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
						{initial}
					</span>
				)}
				<span className="hidden text-xs font-medium text-gray-700 sm:inline max-w-[80px] truncate">
					{displayName}
				</span>
				<svg
					aria-hidden="true"
					className={`h-3 w-3 text-gray-400 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
				</svg>
			</button>

			{open && (
				<div
					className="absolute right-0 top-full mt-1 w-48 rounded-lg border border-gray-200 bg-white py-1 shadow-lg z-50"
					role="menu"
					aria-label={isKo ? "사용자 메뉴" : "User menu"}
				>
					{/* 사용자 정보 (포커스 불가, 표시 전용) */}
					<div className="border-b border-gray-100 px-4 py-2" aria-hidden="true">
						<p className="text-sm font-medium text-gray-900 truncate">{displayName}</p>
						<p className="text-xs text-gray-500 truncate">{auth.user.email}</p>
					</div>

					<Link
						href={`/${locale}/mypage`}
						className="block px-4 py-2 text-sm text-gray-700 no-underline hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:bg-blue-50 focus-visible:text-blue-700"
						role="menuitem"
						onClick={() => setOpen(false)}
					>
						{isKo ? "나의 정보" : "My Profile"}
					</Link>

					<Link
						href={`/${locale}/mypage/exam-room`}
						className="block px-4 py-2 text-sm text-gray-700 no-underline hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:bg-blue-50 focus-visible:text-blue-700"
						role="menuitem"
						onClick={() => setOpen(false)}
					>
						{isKo ? "나의 시험장" : "My Exam Room"}
					</Link>

					<div className="border-t border-gray-100 mt-1 pt-1">
						<button
							onClick={async () => {
								await auth.signOut();
								setOpen(false);
							}}
							className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors focus-visible:outline-none focus-visible:bg-red-50"
							role="menuitem"
						>
							{isKo ? "로그아웃" : "Sign Out"}
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
