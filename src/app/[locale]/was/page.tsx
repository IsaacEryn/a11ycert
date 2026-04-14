import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WAS 시험 준비",
  description: "IAAP WAS(Web Accessibility Specialist) 자격증 시험 정보, 도메인별 학습 가이드, 모의 퀴즈, 플래시카드를 한국어로 제공합니다.",
};

export default async function WasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <WasContent locale={locale} />;
}

function WasContent({ locale }: { locale: string }) {
  const t = useTranslations("was");
  const tNav = useTranslations("common.nav");
  const tExam = useTranslations("common.exam");

  const examInfoItems = [
    { label: tExam("questions"),    value: t("examInfo.questions") },
    { label: tExam("timeLimit"),    value: t("examInfo.time") },
    { label: tExam("passingScore"), value: t("examInfo.passing") },
    { label: locale === "ko" ? "응시 자격" : "Eligibility", value: locale === "ko" ? "실무 경력 3년 이상 권장" : "3+ years of experience recommended" },
  ];

  const domains = [
    {
      num: "1",
      desc: locale === "ko"
        ? "시맨틱 HTML 마크업, WAI-ARIA 역할·속성·상태, 키보드 탐색과 포커스 관리, 색상 대비 기준, 폼 접근성, 이미지 대체 텍스트, SPA 접근성, 커스텀 위젯 패턴을 학습합니다."
        : "Study semantic HTML, WAI-ARIA roles/properties/states, keyboard navigation and focus management, color contrast requirements, form accessibility, alt text for images, SPA accessibility, and custom widget patterns.",
    },
    {
      num: "2",
      desc: locale === "ko"
        ? "axe, WAVE, Lighthouse 등 자동화 도구와 수동 테스트 방법론, NVDA·JAWS·VoiceOver·TalkBack 등 보조기술을 활용한 스크린리더 테스트, 접근성 감사 프레임워크를 학습합니다."
        : "Study automated tools (axe, WAVE, Lighthouse), manual testing methodologies, screen reader testing with NVDA, JAWS, VoiceOver, TalkBack, and accessibility audit frameworks.",
    },
    {
      num: "3",
      desc: locale === "ko"
        ? "접근성 이슈 수정 전략, ARIA 구현 기법, 개발자 및 QA 엔지니어링 모범 사례, 접근성 설계 패턴을 학습합니다."
        : "Study accessibility remediation strategies, ARIA implementation techniques, developer and QA engineering best practices, and accessible design patterns.",
    },
  ] as const;

  const quickLinks = [
    { href: `/${locale}/was/study`,         label: tNav("study") },
    { href: `/${locale}/was/quiz`,          label: tNav("quiz") },
    { href: `/${locale}/was/flashcards`,    label: tNav("flashcards") },
    { href: `/${locale}/was/wrong-answers`, label: tNav("wrongAnswers") },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">

      {/* 헤더 */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-violet-600">IAAP</p>
        <h1 className="mt-1 text-3xl font-bold text-gray-900">{t("title")}</h1>
        <p className="mt-2 text-gray-500 italic">{t("overview")}</p>
      </div>

      {/* CPACC 선취득 권장 안내 */}
      <div className="mt-6 rounded-lg border border-violet-200 bg-violet-50 px-4 py-3 text-sm text-violet-800">
        {locale === "ko"
          ? "💡 WAS 시험은 CPACC 자격증 취득 후 응시하는 것을 권장합니다."
          : "💡 It is recommended to obtain the CPACC certification before taking the WAS exam."}
      </div>

      {/* 시험 정보 */}
      <section aria-labelledby="was-examinfo" className="mt-8">
        <h2 id="was-examinfo" className="text-lg font-semibold text-gray-900">
          {locale === "ko" ? "시험 정보" : "Exam Information"}
        </h2>
        <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {examInfoItems.map(({ label, value }) => (
            <div key={label} className="rounded-lg bg-gray-50 px-4 py-3">
              <dt className="text-xs text-gray-500">{label}</dt>
              <dd className="mt-1 font-semibold text-gray-900 text-sm">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 도메인 */}
      <section aria-labelledby="was-domains" className="mt-10">
        <h2 id="was-domains" className="text-lg font-semibold text-gray-900">
          {locale === "ko" ? "시험 도메인" : "Exam Domains"}
        </h2>
        <ul className="mt-4 space-y-4" role="list">
          {domains.map(({ num, desc }) => (
            <li key={num} className="rounded-xl border border-gray-200 p-5">
              <div className="flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-700"
                >
                  {num}
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {t(`domains.${num}.title`)}
                    <span className="ml-2 text-xs font-normal text-gray-400">
                      {t(`domains.${num}.en`)}
                    </span>
                  </h3>
                  <p className="mt-1 text-xs font-medium text-violet-600">
                    {t(`domains.${num}.weight`)}
                  </p>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{desc}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* 빠른 시작 */}
      <section aria-labelledby="was-quicklinks" className="mt-10">
        <h2 id="was-quicklinks" className="text-lg font-semibold text-gray-900">
          {locale === "ko" ? "학습 시작" : "Start Studying"}
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2" role="list">
          {quickLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="flex items-center justify-between rounded-xl border border-gray-200 px-5 py-4 text-sm font-medium text-gray-700 no-underline transition-colors hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700"
              >
                {label}
                <span aria-hidden="true" className="text-gray-400">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

    </div>
  );
}
