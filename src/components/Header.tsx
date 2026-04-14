"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import LanguageToggle from "./LanguageToggle";
import MobileMenuToggle from "./MobileMenuToggle";
import LoginButton from "./auth/LoginButton";
import UserMenu from "./auth/UserMenu";

interface HeaderProps {
	locale: string;
}

type ExamKey = "cpacc" | "was";

export default function Header({ locale }: HeaderProps) {
	const [mobileOpen, setMobileOpen] = useState(false);
	const [openDropdown, setOpenDropdown] = useState<ExamKey | null>(null);
	const [mobileExpanded, setMobileExpanded] = useState<ExamKey | null>(null);
	const pathname = usePathname();
	const t = useTranslations("common.nav");
	const desktopNavRef = useRef<HTMLElement>(null);
	// 드롭다운 열기 버튼 ref (Escape 시 포커스 반환용)
	const dropdownBtnRefs = useRef<Partial<Record<ExamKey, HTMLButtonElement | null>>>({});
	// 드롭다운 첫 링크 ref (열릴 때 포커스 이동용)
	const dropdownFirstLinkRefs = useRef<Partial<Record<ExamKey, HTMLAnchorElement | null>>>({});

	// 외부 클릭 시 드롭다운 닫기
	useEffect(() => {
		function handlePointerDown(e: PointerEvent) {
			if (desktopNavRef.current && !desktopNavRef.current.contains(e.target as Node)) {
				setOpenDropdown(null);
			}
		}
		document.addEventListener("pointerdown", handlePointerDown);
		return () => document.removeEventListener("pointerdown", handlePointerDown);
	}, []);

	// 라우트 변경 시 메뉴 닫기
	useEffect(() => {
		setOpenDropdown(null);
		setMobileOpen(false);
		setMobileExpanded(null);
	}, [pathname]);

	function isActive(href: string) {
		return pathname === href || pathname.startsWith(href + "/");
	}

	const handleDropdownToggle = useCallback(
		(key: ExamKey, fromKeyboard = false) => {
			const next = openDropdown === key ? null : key;
			setOpenDropdown(next);
			// 키보드로 열었을 때만 첫 번째 링크로 포커스 이동
			if (next && fromKeyboard) {
				requestAnimationFrame(() => {
					dropdownFirstLinkRefs.current[key]?.focus();
				});
			}
		},
		[openDropdown]
	);

	const closeDropdown = useCallback(
		(key: ExamKey) => {
			setOpenDropdown(null);
			dropdownBtnRefs.current[key]?.focus();
		},
		[]
	);

	const subItems: Record<ExamKey, { href: string; label: string }[]> = {
		cpacc: [
			{ href: `/${locale}/cpacc/study`, label: t("study") },
			{ href: `/${locale}/cpacc/quiz`, label: t("quiz") },
			{ href: `/${locale}/cpacc/flashcards`, label: t("flashcards") },
			{ href: `/${locale}/cpacc/wrong-answers`, label: t("wrongAnswers") },
		],
		was: [
			{ href: `/${locale}/was/study`, label: t("study") },
			{ href: `/${locale}/was/quiz`, label: t("quiz") },
			{ href: `/${locale}/was/flashcards`, label: t("flashcards") },
			{ href: `/${locale}/was/wrong-answers`, label: t("wrongAnswers") },
		],
	};

	const flatItems = [
		{ href: `/${locale}/glossary`, label: t("glossary") },
		{ href: `/${locale}/community`, label: t("community") },
		{ href: `/${locale}/about`, label: t("about") },
	];

	const chevron = (open: boolean) => (
		<svg
			aria-hidden="true"
			className={`w-3.5 h-3.5 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
		</svg>
	);

	return (
		<header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
			<div className="mx-auto max-w-6xl px-4 sm:px-6">
				<div className="flex h-16 items-center justify-between gap-4">
					{/* 로고 */}
					<Link
						href={`/${locale}`}
						className="flex items-center gap-2 font-bold text-gray-900 text-lg no-underline hover:text-blue-600 transition-colors"
						aria-label={locale === "ko" ? "A11yCert 홈으로 이동" : "Go to A11yCert home"}
					>
						<span aria-hidden="true" className="text-blue-600 text-xl">
							A11Y
						</span>
						<span aria-hidden="true">Cert</span>
					</Link>

					{/* 데스크톱 네비게이션 */}
					<nav aria-label={locale === "ko" ? "주 메뉴" : "Main menu"} className="hidden sm:block" ref={desktopNavRef}>
						<ul className="flex items-center gap-1" role="list">
							{/* CPACC / WAS 드롭다운 */}
							{(["cpacc", "was"] as ExamKey[]).map((key) => (
								<li key={key} className="relative">
									<button
										ref={(el) => { dropdownBtnRefs.current[key] = el; }}
										aria-expanded={openDropdown === key}
										aria-controls={`dropdown-${key}`}
										onClick={() => handleDropdownToggle(key, false)}
										onKeyDown={(e) => {
											if (e.key === "Escape") closeDropdown(key);
											if (e.key === "Enter" || e.key === " ") {
												e.preventDefault();
												handleDropdownToggle(key, true);
											}
										}}
										className={[
											"flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors",
											isActive(`/${locale}/${key}`)
												? "bg-blue-50 text-blue-700"
												: "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
										].join(" ")}
									>
										{t(key)}
										{chevron(openDropdown === key)}
									</button>

									{openDropdown === key && (
										<ul
											id={`dropdown-${key}`}
											role="list"
											className="absolute left-0 top-full mt-1 w-36 rounded-lg border border-gray-200 bg-white py-1 shadow-lg z-50"
											onKeyDown={(e) => {
												if (e.key === "Escape") closeDropdown(key);
											}}
										>
											{/* 개요 링크 */}
											<li>
												<Link
													ref={(el) => { dropdownFirstLinkRefs.current[key] = el; }}
													href={`/${locale}/${key}`}
													className={[
														"block px-4 py-2 text-sm no-underline transition-colors border-b border-gray-100",
														isActive(`/${locale}/${key}`) &&
														!subItems[key].some((i) => isActive(i.href))
															? "bg-blue-50 text-blue-700 font-medium"
															: "text-gray-500 hover:bg-gray-50 hover:text-gray-900",
													].join(" ")}
												>
													{t("overview")}
												</Link>
											</li>
											{subItems[key].map(({ href, label }) => (
												<li key={href}>
													<Link
														href={href}
														aria-current={isActive(href) ? "page" : undefined}
														className={[
															"block px-4 py-2 text-sm no-underline transition-colors",
															isActive(href)
																? "bg-blue-50 text-blue-700 font-medium"
																: "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
														].join(" ")}
													>
														{label}
													</Link>
												</li>
											))}
										</ul>
									)}
								</li>
							))}

							{/* 용어집, 커뮤니티, 소개 */}
							{flatItems.map(({ href, label }) => (
								<li key={href}>
									<Link
										href={href}
										aria-current={isActive(href) ? "page" : undefined}
										className={[
											"px-3 py-2 text-sm font-medium rounded-md transition-colors no-underline",
											isActive(href)
												? "bg-blue-50 text-blue-700"
												: "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
										].join(" ")}
									>
										{label}
									</Link>
								</li>
							))}
						</ul>
					</nav>

					<div className="flex items-center gap-2">
						<LoginButton locale={locale} />
						<UserMenu locale={locale} />
						<LanguageToggle currentLocale={locale} />
						<MobileMenuToggle
							isOpen={mobileOpen}
							onToggle={() => setMobileOpen((v) => !v)}
							label={mobileOpen ? (locale === "ko" ? "메뉴 닫기" : "Close menu") : (locale === "ko" ? "메뉴 열기" : "Open menu")}
						/>
					</div>
				</div>
			</div>

			{/* 모바일 메뉴 */}
			{mobileOpen && (
				<nav
					id="mobile-nav"
					aria-label={locale === "ko" ? "모바일 메뉴" : "Mobile menu"}
					className="border-t border-gray-100 bg-white sm:hidden"
				>
					<ul className="flex flex-col px-4 py-3 gap-1" role="list">
						{/* CPACC / WAS 아코디언 */}
						{(["cpacc", "was"] as ExamKey[]).map((key) => (
							<li key={key}>
								<button
									aria-expanded={mobileExpanded === key}
									aria-controls={`mobile-submenu-${key}`}
									onClick={() => setMobileExpanded(mobileExpanded === key ? null : key)}
									className={[
										"flex w-full items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors",
										isActive(`/${locale}/${key}`)
											? "bg-blue-50 text-blue-700"
											: "text-gray-600 hover:bg-gray-100",
									].join(" ")}
								>
									{t(key)}
									{chevron(mobileExpanded === key)}
								</button>

								{mobileExpanded === key && (
									<ul
										id={`mobile-submenu-${key}`}
										role="list"
										className="mt-1 ml-3 flex flex-col gap-0.5 border-l-2 border-blue-100 pl-3"
									>
										<li>
											<Link
												href={`/${locale}/${key}`}
												className={[
													"block px-3 py-1.5 text-sm no-underline rounded-md transition-colors",
													isActive(`/${locale}/${key}`) &&
													!subItems[key].some((i) => isActive(i.href))
														? "text-blue-700 font-medium"
														: "text-gray-500 hover:text-gray-900 hover:bg-gray-50",
												].join(" ")}
											>
												{t("overview")}
											</Link>
										</li>
										{subItems[key].map(({ href, label }) => (
											<li key={href}>
												<Link
													href={href}
													aria-current={isActive(href) ? "page" : undefined}
													className={[
														"block px-3 py-1.5 text-sm no-underline rounded-md transition-colors",
														isActive(href)
															? "text-blue-700 font-medium"
															: "text-gray-700 hover:text-gray-900 hover:bg-gray-50",
													].join(" ")}
												>
													{label}
												</Link>
											</li>
										))}
									</ul>
								)}
							</li>
						))}

						{/* 용어집, 커뮤니티, 소개 */}
						{flatItems.map(({ href, label }) => (
							<li key={href}>
								<Link
									href={href}
									aria-current={isActive(href) ? "page" : undefined}
									className={[
										"block px-3 py-2 text-sm font-medium rounded-md transition-colors no-underline",
										isActive(href) ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-100",
									].join(" ")}
								>
									{label}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			)}
		</header>
	);
}
