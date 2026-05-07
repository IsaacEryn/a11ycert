import Link from "next/link";

interface Props {
  locale: string;
  isKo: boolean;
}

export default function HomeCtaStrip({ locale, isKo }: Props) {
  return (
    <div className="cta-strip">
      <div>
        <h2 id="cta-title" className="cta-strip__title">
          {isKo ? "바로 학습을 시작해 볼까요?" : "Ready to start studying?"}
        </h2>
        <p className="cta-strip__sub">
          {isKo ? "계정 등록 없이, 한 번의 클릭으로 시작합니다." : "No account needed — start with a single click."}
        </p>
      </div>
      <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap" }}>
        <Link className="btn btn--primary btn--lg" href={`/${locale}/cpacc`}>
          {isKo ? "CPACC 시작" : "Start CPACC"}
        </Link>
        <Link className="btn btn--lg" href={`/${locale}/was`}>
          {isKo ? "WAS 시작" : "Start WAS"}
        </Link>
      </div>
    </div>
  );
}
