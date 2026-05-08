"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ModeMenu from "./ModeMenu";
import MobileSheet from "./MobileSheet";
import UserMenu from "./auth/UserMenu";
import { useLearningStore, type LanguageMode } from "@/lib/store/learningStore";
import { useOptionalAuth } from "@/lib/auth/AuthProvider";
import { usePrefs, type Theme } from "@/lib/prefs/PrefsContext";

interface HeaderProps {
  locale: string;
}

type Cert = "cpacc" | "was";

function certFromPath(pathname: string): Cert {
  if (pathname.includes("/was")) return "was";
  return "cpacc";
}

export default function Header({ locale }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<Cert | null>(null);
  const triggerRefs = useRef<Partial<Record<Cert, HTMLButtonElement>>>({});
  const panelRefs = useRef<Partial<Record<Cert, HTMLDivElement>>>({});
  const pathname = usePathname();
  const router = useRouter();
  const isKo = locale === "ko";
  const cert = certFromPath(pathname);
  const { languageMode, setLanguageMode } = useLearningStore();
  const auth = useOptionalAuth();
  const { theme, setTheme } = usePrefs();

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  // 드롭다운 열릴 때 첫 번째 메뉴 아이템으로 포커스 이동
  useEffect(() => {
    if (openDropdown) {
      requestAnimationFrame(() => {
        const first = panelRefs.current[openDropdown]?.querySelector<HTMLElement>('[role="menuitem"]');
        first?.focus();
      });
    }
  }, [openDropdown]);

  const handleDropdownKeyDown = useCallback((e: React.KeyboardEvent, c: Cert) => {
    const panel = panelRefs.current[c];
    if (!panel) return;
    const items = Array.from(panel.querySelectorAll<HTMLElement>('[role="menuitem"]'));
    const idx = items.indexOf(document.activeElement as HTMLElement);
    if (e.key === "ArrowDown") { e.preventDefault(); items[(idx + 1) % items.length]?.focus(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); items[(idx - 1 + items.length) % items.length]?.focus(); }
    else if (e.key === "Home") { e.preventDefault(); items[0]?.focus(); }
    else if (e.key === "End") { e.preventDefault(); items[items.length - 1]?.focus(); }
    else if (e.key === "Escape") { setOpenDropdown(null); triggerRefs.current[c]?.focus(); }
    else if (e.key === "Tab") { setOpenDropdown(null); }
  }, []);

  function isActive(href: string) {
    if (href === `/${locale}`) return pathname === `/${locale}`;
    if (/\/(cpacc|was)$/.test(href)) return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  }

  function isCertActive(c: "cpacc" | "was") {
    return pathname.includes(`/${c}`);
  }

  function certNavItems(c: "cpacc" | "was") {
    return [
      { href: `/${locale}/${c}`, label: isKo ? "개요" : "Overview" },
      { href: `/${locale}/${c}/study`, label: isKo ? "학습" : "Study" },
      { href: `/${locale}/${c}/quiz`, label: isKo ? "모의퀴즈" : "Quiz" },
      { href: `/${locale}/${c}/flashcards`, label: isKo ? "플래시카드" : "Flashcards" },
    ];
  }

  const mobileNavSections = [
    { label: "CPACC", items: certNavItems("cpacc") },
    { label: "WAS", items: certNavItems("was") },
    { label: isKo ? "기타" : "More", items: [
      { href: `/${locale}/glossary`, label: isKo ? "용어집" : "Glossary" },
      { href: `/${locale}/about`, label: isKo ? "소개" : "About" },
    ]},
  ];

  const otherLocale = locale === "ko" ? "en" : "ko";
  const switchLocalePath = pathname.replace(`/${locale}`, `/${otherLocale}`) || `/${otherLocale}`;

  const langOptions: { mode: LanguageMode; label: string; locale?: string }[] = [
    { mode: "ko-only", label: "KO", locale: "ko" },
    { mode: "parallel", label: isKo ? "병기" : "Dual" },
    { mode: "en-only", label: "EN", locale: "en" },
  ];

  function handleLangClick(opt: typeof langOptions[number]) {
    setLanguageMode(opt.mode);
    if (opt.locale && opt.locale !== locale) {
      router.push(switchLocalePath);
    }
  }

  const themeOptions: { value: Theme; label: string; icon: string }[] = [
    { value: "light", label: isKo ? "라이트" : "Light", icon: "☀" },
    { value: "dark", label: isKo ? "다크" : "Dark", icon: "☾" },
    { value: "hc", label: isKo ? "고대비" : "HC", icon: "◑" },
  ];

  return (
    <>
    <header className="app-header">
      <div className="container">
        <div className="app-header__row">
          {/* Brand */}
          <Link
            href={`/${locale}`}
            className="brand"
            aria-label={isKo ? "A11yCert 홈으로 이동" : "Go to A11yCert home"}
          >
            <span className="brand__mark" aria-hidden="true">A11Y</span>
            <span>Cert</span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label={isKo ? "주 메뉴" : "Main menu"} className="app-nav">
            {(["cpacc", "was"] as const).map((c) => (
              <div key={c} className="nav-dropdown">
                <button
                  ref={(el) => { triggerRefs.current[c] = el ?? undefined; }}
                  className="app-nav__link nav-dropdown__trigger"
                  aria-haspopup="menu"
                  aria-expanded={openDropdown === c}
                  aria-current={isCertActive(c) ? "page" : undefined}
                  onClick={() => setOpenDropdown(openDropdown === c ? null : c)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") { setOpenDropdown(null); }
                    else if (e.key === "ArrowDown" && openDropdown !== c) {
                      e.preventDefault();
                      setOpenDropdown(c);
                    }
                  }}
                >
                  {c.toUpperCase()}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div
                  ref={(el) => { panelRefs.current[c] = el ?? undefined; }}
                  className="nav-dropdown__panel"
                  role="menu"
                  onKeyDown={(e) => handleDropdownKeyDown(e, c)}
                >
                  {certNavItems(c).map(({ href, label }) => (
                    <Link key={href} href={href} className="nav-dropdown__item" role="menuitem" aria-current={isActive(href) ? "page" : undefined}>
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <Link
              href={`/${locale}/glossary`}
              className="app-nav__link"
              aria-current={isActive(`/${locale}/glossary`) ? "page" : undefined}
            >
              {isKo ? "용어집" : "Glossary"}
            </Link>
            <Link
              href={`/${locale}/about`}
              className="app-nav__link"
              aria-current={isActive(`/${locale}/about`) ? "page" : undefined}
            >
              {isKo ? "소개" : "About"}
            </Link>
          </nav>

          <div className="app-header__spacer" />

          {/* Desktop-only controls */}
          <div className="header-desktop">
            <div className="lang-toggle" role="group" aria-label={isKo ? "언어 표시 모드" : "Language display mode"}>
              {langOptions.map((opt) => (
                <button
                  key={opt.mode}
                  aria-pressed={languageMode === opt.mode}
                  onClick={() => handleLangClick(opt)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <ModeMenu locale={locale} />
            {!auth?.user && (
              <button
                onClick={() => auth?.signInWithGoogle()}
                className="btn btn--sm"
                aria-label={isKo ? "Google 계정으로 로그인" : "Sign in with Google"}
              >
                <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google
              </button>
            )}
            <UserMenu locale={locale} />
          </div>

          {/* Mobile trigger */}
          <button
            className="mobile-trigger"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-sheet"
            aria-label={mobileOpen ? (isKo ? "메뉴 닫기" : "Close menu") : (isKo ? "메뉴 열기" : "Open menu")}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {mobileOpen
                ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
              }
            </svg>
          </button>
        </div>
      </div>

    </header>

      {/* Mobile sheet — rendered outside <header> so position:fixed works correctly */}
      <div id="mobile-nav-sheet">
        <MobileSheet
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          title={isKo ? "메뉴" : "Menu"}
        >
          {/* Nav links */}
          <nav aria-label={isKo ? "모바일 메뉴" : "Mobile menu"}>
            {mobileNavSections.map(({ label, items }) => (
              <div key={label} className="mobile-sheet__section" style={{ marginTop: 0, paddingTop: 0, borderTop: "none" }}>
                <p className="mobile-sheet__section-label">{label}</p>
                <div className="mobile-nav">
                  {items.map(({ href, label: itemLabel }) => (
                    <Link
                      key={href}
                      href={href}
                      aria-current={isActive(href) ? "page" : undefined}
                      onClick={() => setMobileOpen(false)}
                    >
                      <span>{itemLabel}</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Language display mode */}
          <div className="mobile-sheet__section">
            <p className="mobile-sheet__section-label">{isKo ? "언어 표시" : "Language"}</p>
            <div className="lang-toggle" style={{ width: "100%" }} role="group" aria-label={isKo ? "언어 표시 모드" : "Language display mode"}>
              {langOptions.map((opt) => (
                <button
                  key={opt.mode}
                  aria-pressed={languageMode === opt.mode}
                  style={{ flex: 1 }}
                  onClick={() => { handleLangClick(opt); setMobileOpen(false); }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Theme */}
          <div className="mobile-sheet__section">
            <p className="mobile-sheet__section-label">{isKo ? "테마" : "Theme"}</p>
            <div className="seg" role="group" aria-label={isKo ? "테마 선택" : "Select theme"} style={{ width: "100%" }}>
              {themeOptions.map((opt) => (
                <button
                  key={opt.value}
                  aria-pressed={theme === opt.value}
                  style={{ flex: 1 }}
                  onClick={() => setTheme(opt.value)}
                >
                  <span aria-hidden="true">{opt.icon}</span> {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Auth */}
          <div className="mobile-sheet__section">
            {auth?.user ? (
              <button
                className="btn"
                style={{ width: "100%" }}
                onClick={async () => { await auth.signOut(); setMobileOpen(false); }}
              >
                {isKo ? "로그아웃" : "Sign Out"}
              </button>
            ) : (
              <button
                className="btn btn--primary"
                style={{ width: "100%" }}
                onClick={() => { auth?.signInWithGoogle(); setMobileOpen(false); }}
              >
                <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                {isKo ? "Google로 로그인" : "Sign in with Google"}
              </button>
            )}
          </div>
        </MobileSheet>
      </div>
    </>
  );
}
