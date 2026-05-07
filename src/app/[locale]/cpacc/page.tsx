import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CPACC 시험 준비",
  description:
    "IAAP CPACC(Certified Professional in Accessibility Core Competencies) 자격증 시험 정보, 도메인별 학습 가이드, 모의 퀴즈, 플래시카드를 한국어로 제공합니다.",
};

export default async function CpaccPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CpaccContent locale={locale} />;
}

const domains = [
  {
    domainNum: "01",
    weightPct: 40,
    topics: [
      { mark: "01", title: "장애의 정의와 모델", sub: "의료적·사회적·인권 기반 모델 비교" },
      { mark: "02", title: "시각·청각·운동 장애", sub: "유형별 특성과 영향" },
      { mark: "03", title: "인지·학습·심리 장애", sub: "디지털 환경에서의 어려움" },
      { mark: "04", title: "스크린 리더와 입력 보조 기술", sub: "JAWS, NVDA, VoiceOver, 스위치 컨트롤" },
      { mark: "05", title: "인구 통계와 노화", sub: "접근성의 비즈니스 가치" },
      { mark: "06", title: "유니버설 디자인", sub: "7가지 원칙과 적용" },
    ],
  },
  {
    domainNum: "02",
    weightPct: 40,
    topics: [
      { mark: "07", title: "WCAG 2.x", sub: "POUR 원칙, A/AA/AAA" },
      { mark: "08", title: "ADA · Section 508 · EN 301 549", sub: "국가별 접근성 법률" },
      { mark: "09", title: "유엔 장애인권리협약(CRPD)", sub: "국제 인권 프레임워크" },
      { mark: "10", title: "조직 차원의 접근성", sub: "정책, 거버넌스, 성숙도 모델" },
      { mark: "11", title: "접근성 사업 사례", sub: "ROI와 위험 관리" },
      { mark: "12", title: "VPAT · 적합성 보고서", sub: "평가 문서 작성 기초" },
    ],
  },
  {
    domainNum: "03",
    weightPct: 20,
    topics: [
      { mark: "13", title: "디지털 콘텐츠 접근성", sub: "웹·모바일·문서" },
      { mark: "14", title: "건축 환경 접근성", sub: "물리적 공간 설계" },
      { mark: "15", title: "제품 · 서비스 접근성", sub: "하드웨어와 고객 서비스" },
      { mark: "16", title: "접근성 사용자 테스트", sub: "참여형 평가 방법" },
    ],
  },
];

function CpaccContent({ locale }: { locale: string }) {
  const t = useTranslations("cpacc");
  const tExam = useTranslations("common.exam");
  const isKo = locale === "ko";

  const examFacts = [
    { label: tExam("questions"), value: t("examInfo.questions") },
    { label: tExam("timeLimit"), value: t("examInfo.time") },
    { label: tExam("passingScore"), value: t("examInfo.passing") },
    { label: isKo ? "형식" : "Format", value: t("examInfo.format") },
  ];

  return (
    <>
      <section className="overview-hero">
        <div className="container">
          <nav className="overview-hero__crumbs" aria-label={isKo ? "경로" : "Breadcrumb"}>
            <Link href={`/${locale}`}>{isKo ? "홈" : "Home"}</Link>
            <span aria-hidden="true">/</span>
            <span>CPACC</span>
          </nav>

          <div className="overview-hero__head">
            <div>
              <div className="overview-hero__id">CERT · 01 · CPACC</div>
              <h1 className="overview-hero__title">{t("title")}</h1>
              <p className="overview-hero__title-en">{t("overview")}</p>
              <p className="overview-hero__lede">
                {isKo
                  ? "접근성 핵심 역량 전문가 자격증. 장애 인식, 보조기술, WCAG·법률 표준, 보편적 설계 전략을 폭넓게 다루는 IAAP 공인 기초 자격증입니다."
                  : "IAAP entry-level certification covering disability awareness, assistive technologies, WCAG standards, accessibility law, and universal design strategy."}
              </p>
              <div className="overview-hero__cta">
                <Link className="btn btn--primary" href={`/${locale}/cpacc/study`}>
                  {isKo ? "학습 시작" : "Start Learning"}
                </Link>
                <Link className="btn" href={`/${locale}/cpacc/quiz`}>
                  {isKo ? "모의 퀴즈" : "Mock Quiz"}
                </Link>
                <Link className="btn btn--ghost" href={`/${locale}/cpacc/flashcards`}>
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

      <section className="domains" aria-labelledby="cpacc-domains-title">
        <div className="container">
          <div className="section__head">
            <div>
              <h2 id="cpacc-domains-title" className="section__title">
                {isKo ? "시험 도메인" : "Exam Domains"}
              </h2>
              <p className="section__sub">
                {isKo ? "3개 도메인, 총 100문항" : "3 domains · 100 questions total"}
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
                  <Link className="btn btn--sm" href={`/${locale}/cpacc/study`}>
                    {isKo ? "학습" : "Study"}
                  </Link>
                  <Link className="btn btn--sm btn--ghost" href={`/${locale}/cpacc/quiz`}>
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
    </>
  );
}
