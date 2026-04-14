import { useTranslations } from "next-intl";
import Link from "next/link";

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations("common.nav");

  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div>
            <p className="text-sm font-semibold text-gray-800">A11yCert</p>
            <p className="mt-1 text-xs text-gray-500 max-w-xs">
              {locale === "ko"
                ? "IAAP 공식 자료(BoK)에 기반한 비공식 학습 플랫폼입니다."
                : "Unofficial study platform based on IAAP official Body of Knowledge."}
            </p>
          </div>

          <nav aria-label="하단 메뉴">
            <ul className="flex flex-wrap gap-x-4 gap-y-2" role="list">
              {[
                { href: `/${locale}/about`,   label: t("about") },
                { href: `/${locale}/privacy`, label: t("privacy") },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-xs text-gray-500 hover:text-gray-800 no-underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-6 text-xs text-gray-400">
          © {new Date().getFullYear()} A11yCert.{" "}
          {locale === "ko"
            ? "IAAP와 무관한 독립 운영 사이트입니다."
            : "Independent site, not affiliated with IAAP."}
        </p>
      </div>
    </footer>
  );
}
