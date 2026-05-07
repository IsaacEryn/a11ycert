import Link from "next/link";

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const isKo = locale === "ko";

  const cpaccLinks = [
    { href: `/${locale}/cpacc`, label: isKo ? "개요" : "Overview" },
    { href: `/${locale}/cpacc/study`, label: isKo ? "학습" : "Study" },
    { href: `/${locale}/cpacc/quiz`, label: isKo ? "모의퀴즈" : "Quiz" },
    { href: `/${locale}/cpacc/flashcards`, label: isKo ? "플래시카드" : "Flashcards" },
  ];

  const wasLinks = [
    { href: `/${locale}/was`, label: isKo ? "개요" : "Overview" },
    { href: `/${locale}/was/study`, label: isKo ? "학습" : "Study" },
    { href: `/${locale}/was/quiz`, label: isKo ? "모의퀴즈" : "Quiz" },
    { href: `/${locale}/was/flashcards`, label: isKo ? "플래시카드" : "Flashcards" },
  ];

  const siteLinks = [
    { href: `/${locale}/glossary`, label: isKo ? "용어집" : "Glossary" },
    { href: `/${locale}/about`, label: isKo ? "소개" : "About" },
    { href: `/${locale}/privacy`, label: isKo ? "개인정보처리방침" : "Privacy" },
  ];

  return (
    <footer className="app-footer">
      <div className="container">
        <div className="app-footer__grid">
          {/* Brand col */}
          <div className="app-footer__col">
            <Link
              href={`/${locale}`}
              className="brand"
              aria-label={isKo ? "A11yCert 홈으로 이동" : "Go to A11yCert home"}
            >
              <span className="brand__mark" aria-hidden="true">A11Y</span>
              <span>Cert</span>
            </Link>
            <p style={{ marginTop: "var(--space-3)", fontSize: "var(--fs-sm)", color: "var(--fg-muted)", lineHeight: 1.6, maxWidth: "24ch" }}>
              {isKo
                ? "IAAP BoK 기반 비공식 한국어 학습 플랫폼"
                : "Unofficial study platform based on IAAP Body of Knowledge."}
            </p>
          </div>

          {/* CPACC col */}
          <nav aria-label={isKo ? "CPACC 메뉴" : "CPACC navigation"} className="app-footer__col">
            <h4>CPACC</h4>
            <ul>
              {cpaccLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* WAS col */}
          <nav aria-label={isKo ? "WAS 메뉴" : "WAS navigation"} className="app-footer__col">
            <h4>WAS</h4>
            <ul>
              {wasLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Site col */}
          <nav aria-label={isKo ? "사이트 메뉴" : "Site menu"} className="app-footer__col">
            <h4>{isKo ? "사이트" : "Site"}</h4>
            <ul>
              {siteLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="app-footer__bottom">
          <span>
            © {new Date().getFullYear()} A11yCert.{" "}
            {isKo ? "IAAP와 무관한 독립 운영 사이트." : "Independent site, not affiliated with IAAP."}
          </span>
          <span>
            {isKo ? "오류 제보: GitHub Issues" : "Report issues via GitHub Issues"}
          </span>
        </div>
      </div>
    </footer>
  );
}
