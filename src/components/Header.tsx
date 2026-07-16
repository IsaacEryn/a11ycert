"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ModeMenu from "./ModeMenu";
import MobileSheet from "./MobileSheet";
import UserMenu from "./auth/UserMenu";
import GoogleLogo from "./auth/GoogleLogo";
import { useLearningStore, type LanguageMode } from "@/lib/store/learningStore";
import { useOptionalAuth } from "@/lib/auth/AuthProvider";
import { usePrefs, type Theme } from "@/lib/prefs/PrefsContext";
import { certNavItems as sharedCertNavItems, siteNavItems } from "@/lib/nav";

interface HeaderProps {
  locale: string;
}

type Cert = "cpacc" | "was";

export default function Header({ locale }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<Cert | null>(null);
  const triggerRefs = useRef<Partial<Record<Cert, HTMLButtonElement>>>({});
  const panelRefs = useRef<Partial<Record<Cert, HTMLDivElement>>>({});
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("header");
  const tNav = useTranslations("common.nav");
  const { languageMode, setLanguageMode } = useLearningStore();
  const auth = useOptionalAuth();
  const { theme, setTheme } = usePrefs();

  useEffect(() => {
    // 라우트 전환 시 열린 메뉴 닫기 — setState 직접 호출 대신 마이크로태스크로 지연
    void Promise.resolve().then(() => {
      setMobileOpen(false);
      setOpenDropdown(null);
    });
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
    return sharedCertNavItems(locale, c);
  }

  const mobileNavSections = [
    { label: "CPACC", items: certNavItems("cpacc") },
    { label: "WAS", items: certNavItems("was") },
    { label: t("more"), items: siteNavItems(locale, { includePrivacy: false }) },
  ];

  const otherLocale = locale === "ko" ? "en" : "ko";
  const switchLocalePath = pathname.replace(`/${locale}`, `/${otherLocale}`) || `/${otherLocale}`;

  const langOptions: { mode: LanguageMode; label: string; locale?: string }[] = [
    { mode: "ko-only", label: "KO", locale: "ko" },
    { mode: "parallel", label: t("dual") },
    { mode: "en-only", label: "EN", locale: "en" },
  ];

  function handleLangClick(opt: typeof langOptions[number]) {
    setLanguageMode(opt.mode);
    if (opt.locale && opt.locale !== locale) {
      router.push(switchLocalePath);
    }
  }

  const themeOptions: { value: Theme; label: string; icon: string }[] = [
    { value: "light", label: t("light"), icon: "☀" },
    { value: "dark", label: t("dark"), icon: "☾" },
    { value: "hc", label: t("hc"), icon: "◑" },
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
            aria-label={t("goToA11ycertHome")}
          >
            <span className="brand__mark" aria-hidden="true">A11Y</span>
            <span>Cert</span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label={t("mainMenu")} className="app-nav">
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
                  {certNavItems(c).map(({ href, labelKey }) => (
                    <Link key={href} href={href} className="nav-dropdown__item" role="menuitem" aria-current={isActive(href) ? "page" : undefined}>
                      {tNav(labelKey)}
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
              {t("glossary")}
            </Link>
            <Link
              href={`/${locale}/about`}
              className="app-nav__link"
              aria-current={isActive(`/${locale}/about`) ? "page" : undefined}
            >
              {t("about")}
            </Link>
          </nav>

          <div className="app-header__spacer" />

          {/* Desktop-only controls */}
          <div className="header-desktop">
            <div className="lang-toggle" role="group" aria-label={t("languageDisplayMode")}>
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
            <ModeMenu />
            {!auth?.user && (
              <button
                onClick={() => auth?.signInWithGoogle()}
                className="btn btn--sm"
                aria-label={t("signInWithGoogle")}
              >
                <GoogleLogo />
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
            aria-label={mobileOpen ? (t("closeMenu")) : (t("openMenu"))}
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
          title={t("menu")}
        >
          {/* Nav links */}
          <nav aria-label={t("mobileMenu")}>
            {mobileNavSections.map(({ label, items }) => (
              <div key={label} className="mobile-sheet__section" style={{ marginTop: 0, paddingTop: 0, borderTop: "none" }}>
                <p className="mobile-sheet__section-label">{label}</p>
                <div className="mobile-nav">
                  {items.map(({ href, labelKey }) => (
                    <Link
                      key={href}
                      href={href}
                      aria-current={isActive(href) ? "page" : undefined}
                      onClick={() => setMobileOpen(false)}
                    >
                      <span>{tNav(labelKey)}</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Language display mode */}
          <div className="mobile-sheet__section">
            <p className="mobile-sheet__section-label">{t("language")}</p>
            <div className="lang-toggle" style={{ width: "100%" }} role="group" aria-label={t("languageDisplayMode")}>
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
            <p className="mobile-sheet__section-label">{t("theme")}</p>
            <div className="seg" role="group" aria-label={t("selectTheme")} style={{ width: "100%" }}>
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
                onClick={async () => { await auth.signOut(); setMobileOpen(false); router.push(`/${locale}`); }}
              >
                {t("signOut")}
              </button>
            ) : (
              <button
                className="btn btn--primary"
                style={{ width: "100%" }}
                onClick={() => { auth?.signInWithGoogle(); setMobileOpen(false); }}
              >
                <GoogleLogo />
                {t("signInWithGoogle2")}
              </button>
            )}
          </div>
        </MobileSheet>
      </div>
    </>
  );
}
