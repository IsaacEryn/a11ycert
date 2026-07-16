import { useTranslations } from "next-intl";
import Link from "next/link";

interface Props {
  locale: string;
  isKo: boolean;
}

export default function HomeCtaStrip({ locale }: Props) {
  const t = useTranslations("homeUi");
  return (
    <div className="cta-strip">
      <div>
        <h2 id="cta-title" className="cta-strip__title">
          {t("readyToStartStudying")}
        </h2>
        <p className="cta-strip__sub">
          {t("noAccountNeededStart")}
        </p>
      </div>
      <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap" }}>
        <Link className="btn btn--primary btn--lg" href={`/${locale}/cpacc`}>
          {t("startCpacc2")}
        </Link>
        <Link className="btn btn--lg" href={`/${locale}/was`}>
          {t("startWas2")}
        </Link>
      </div>
    </div>
  );
}
