import Link from "next/link";
import { useTranslations } from "next-intl";
import { certNavItems, siteNavItems } from "@/lib/nav";

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations("footer");
  const tNav = useTranslations("common.nav");

  const cpaccLinks = certNavItems(locale, "cpacc");
  const wasLinks = certNavItems(locale, "was");
  const siteLinks = siteNavItems(locale);

  return (
    <footer className="app-footer">
      <div className="container">
        <div className="app-footer__grid">
          {/* Brand col */}
          <div className="app-footer__col">
            <Link
              href={`/${locale}`}
              className="brand"
              aria-label={t("goToA11ycertHome")}
            >
              <span className="brand__mark" aria-hidden="true">A11Y</span>
              <span>Cert</span>
            </Link>
            <p style={{ marginTop: "var(--space-3)", fontSize: "var(--fs-sm)", color: "var(--fg-muted)", lineHeight: 1.6, maxWidth: "24ch" }}>
              {t("unofficialStudyPlatformBased")}
            </p>
          </div>

          {/* CPACC col */}
          <nav aria-label={t("cpaccNavigation")} className="app-footer__col">
            <h4>CPACC</h4>
            <ul>
              {cpaccLinks.map(({ href, labelKey }) => (
                <li key={href}>
                  <Link href={href}>{tNav(labelKey)}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* WAS col */}
          <nav aria-label={t("wasNavigation")} className="app-footer__col">
            <h4>WAS</h4>
            <ul>
              {wasLinks.map(({ href, labelKey }) => (
                <li key={href}>
                  <Link href={href}>{tNav(labelKey)}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Site col */}
          <nav aria-label={t("siteMenu")} className="app-footer__col">
            <h4>{t("site")}</h4>
            <ul>
              {siteLinks.map(({ href, labelKey }) => (
                <li key={href}>
                  <Link href={href}>{tNav(labelKey)}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="app-footer__bottom">
          <span>
            © {new Date().getFullYear()} A11yCert.{" "}
            {t("independentSiteNotAffiliated")}
            {" "}
            {t("madeBy")}
            <a
              href="https://www.codeslog.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--accent)", textDecoration: "none" }}
            >
              Isaac
            </a>
          </span>
          <a
            href="mailto:contact@a11ycert.com"
            style={{ color: "var(--fg-muted)", fontSize: "var(--fs-sm)" }}
          >
            {t("reportIssuesContactA11ycert")}
          </a>
        </div>
      </div>
    </footer>
  );
}
