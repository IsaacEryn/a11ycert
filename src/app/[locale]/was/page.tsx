import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WAS 시험 준비",
  description:
    "IAAP WAS(Web Accessibility Specialist) 자격증 시험 정보, 도메인별 학습 가이드, 모의 퀴즈, 플래시카드를 한국어로 제공합니다.",
};

export default async function WasPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <WasContent locale={locale} />;
}

const domains = [
  {
    domainNum: "01",
    weightPct: 40,
    topics: [
      { mark: "01", title: "의미론적 HTML", sub: "랜드마크, 헤딩, 폼" },
      { mark: "02", title: "대체 텍스트와 미디어", sub: "alt, caption, transcript" },
      { mark: "03", title: "색상과 대비", sub: "4.5:1, 3:1 비대비 요건" },
      { mark: "04", title: "키보드 접근성", sub: "포커스 순서, 트랩" },
      { mark: "05", title: "ARIA 1.x", sub: "역할·속성·상태, 5가지 규칙" },
      { mark: "06", title: "반응형·줌·텍스트 간격", sub: "200% 확대 요건" },
    ],
  },
  {
    domainNum: "02",
    weightPct: 30,
    topics: [
      { mark: "07", title: "자동 검사 도구", sub: "axe, WAVE, Lighthouse 한계" },
      { mark: "08", title: "수동 검수 절차", sub: "키보드·확대·색상 점검" },
      { mark: "09", title: "스크린 리더 검수", sub: "NVDA, JAWS, VoiceOver" },
      { mark: "10", title: "모바일 앱 검수", sub: "TalkBack, VoiceOver iOS" },
      { mark: "11", title: "WCAG 적합성 판정", sub: "충족·실패·해당없음" },
      { mark: "12", title: "결함 보고서 작성", sub: "우선순위와 권고안" },
    ],
  },
  {
    domainNum: "03",
    weightPct: 30,
    topics: [
      { mark: "13", title: "테스트 범위 결정", sub: "샘플링 전략" },
      { mark: "14", title: "WCAG-EM 평가 방법론", sub: "5단계 절차" },
      { mark: "15", title: "장애인 사용자 테스트", sub: "참여형 검증" },
      { mark: "16", title: "지속적 통합과 회귀", sub: "CI 파이프라인 통합" },
    ],
  },
];

function WasContent({ locale }: { locale: string }) {
  const t = useTranslations("was");
  const tExam = useTranslations("common.exam");
  const isKo = locale === "ko";

  const examFacts = [
    { label: tExam("questions"), value: t("examInfo.questions") },
    { label: tExam("timeLimit"), value: t("examInfo.time") },
    { label: tExam("passingScore"), value: t("examInfo.passing") },
    { label: isKo ? "형식" : "Format", value: t("examInfo.format") },
  ];

  return (
    <main>
      <section className="overview-hero">
        <div className="container">
          <nav className="overview-hero__crumbs" aria-label={isKo ? "경로" : "Breadcrumb"}>
            <Link href={`/${locale}`}>{isKo ? "홈" : "Home"}</Link>
            <span aria-hidden="true">/</span>
            <span>WAS</span>
          </nav>

          <div className="overview-hero__head">
            <div>
              <div className="overview-hero__id">CERT · 02 · WAS</div>
              <h1 className="overview-hero__title">{t("title")}</h1>
              <p className="overview-hero__title-en">{t("overview")}</p>
              <p className="overview-hero__lede">
                {isKo
                  ? "웹 개발자·QA 대상 기술 자격증. WCAG 적용, ARIA, 코드 검증, 보조기술 기반 실제 검수 능력을 평가하는 IAAP 전문가 자격증입니다."
                  : "Technical IAAP certification for web developers and QA professionals. Tests WCAG application, ARIA, code validation, and real-world audit skills."}
              </p>
              <div className="overview-hero__cta">
                <Link className="btn btn--primary" href={`/${locale}/was/study`}>
                  {isKo ? "학습 시작" : "Start Learning"}
                </Link>
                <Link className="btn" href={`/${locale}/was/quiz`}>
                  {isKo ? "모의 퀴즈" : "Mock Quiz"}
                </Link>
                <Link className="btn btn--ghost" href={`/${locale}/was/flashcards`}>
                  {isKo ? "플래시카드" : "Flashcards"}
                </Link>
              </div>
            </div>

            <dl className="overview-hero__facts" aria-label={isKo ? "시험 정보" : "Exam Information"}>
              {examFacts.map(({ label, value }) => (
                <div key={label} className="overview-hero__fact">
                  <dt className="overview-hero__fact-label">{label}</dt>
                  <dd className="overview-hero__fact-value">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="domains" aria-labelledby="was-domains-title">
        <div className="container">
          <div className="section__head">
            <div>
              <h2 id="was-domains-title" className="section__title">
                {isKo ? "시험 도메인" : "Exam Domains"}
              </h2>
              <p className="section__sub">
                {isKo ? "3개 도메인, 총 75문항" : "3 domains · 75 questions total"}
              </p>
            </div>
          </div>

          {domains.map((d, i) => (
            <div key={d.domainNum} className="domain">
              <div>
                <div className="domain__num">DOMAIN · {d.domainNum}</div>
                <h3 className="domain__title">{t(`domains.${i + 1}.title`)}</h3>
                <p className="domain__title-en">{t(`domains.${i + 1}.en`)}</p>
                <div className="domain__weight">
                  <span>{t(`domains.${i + 1}.weight`)}</span>
                  <div className="domain__weight-bar" aria-hidden="true">
                    <span style={{ width: `${d.weightPct}%` }} />
                  </div>
                </div>
                <div className="domain__cta">
                  <Link className="btn btn--sm" href={`/${locale}/was/study`}>
                    {isKo ? "학습" : "Study"}
                  </Link>
                  <Link className="btn btn--sm btn--ghost" href={`/${locale}/was/quiz`}>
                    {isKo ? "퀴즈" : "Quiz"}
                  </Link>
                </div>
              </div>

              <ul className="domain__topics">
                {d.topics.map((topic) => (
                  <li key={topic.mark} className="domain__topic">
                    <span className="domain__topic-mark">{topic.mark}</span>
                    <div>
                      <strong>{topic.title}</strong>
                      <br />
                      <span style={{ color: "var(--fg-muted)" }}>{topic.sub}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
