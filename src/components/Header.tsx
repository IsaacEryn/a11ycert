"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import LanguageToggle from "./LanguageToggle";
import MobileMenuToggle from "./MobileMenuToggle";

interface HeaderProps {
  locale: string;
}

export default function Header({ locale }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("common.nav");

  const navItems = [
    { href: `/${locale}/cpacc`, label: t("cpacc") },
    { href: `/${locale}/was`,   label: t("was") },
    { href: `/${locale}/glossary`, label: t("glossary") },
    { href: `/${locale}/study-plan`, label: t("studyPlan") },
    { href: `/${locale}/about`, label: t("about") },
  ] as const;

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">

          {/* 로고 */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 font-bold text-gray-900 text-lg no-underline hover:text-blue-600 transition-colors"
            aria-label="A11yCert 홈으로 이동"
          >
            <span aria-hidden="true" className="text-blue-600 text-xl">A11Y</span>
            <span>Cert</span>
          </Link>

          {/* 데스크톱 네비게이션 */}
          <nav aria-label="주 메뉴" className="hidden sm:block">
            <ul className="flex items-center gap-1" role="list">
              {navItems.map(({ href, label }) => (
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
            <LanguageToggle currentLocale={locale} />
            <MobileMenuToggle
              isOpen={mobileOpen}
              onToggle={() => setMobileOpen((v) => !v)}
              label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"}
            />
          </div>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {mobileOpen && (
        <nav
          id="mobile-nav"
          aria-label="모바일 메뉴"
          className="border-t border-gray-100 bg-white sm:hidden"
        >
          <ul className="flex flex-col px-4 py-3 gap-1" role="list">
            {navItems.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive(href) ? "page" : undefined}
                  onClick={() => setMobileOpen(false)}
                  className={[
                    "block px-3 py-2 text-sm font-medium rounded-md transition-colors no-underline",
                    isActive(href)
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100",
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
