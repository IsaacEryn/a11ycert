import { useTranslations } from "next-intl";
interface Props {
  locale: string;
  isKo: boolean;
}

const steps = [
  {
    title: { ko: "기본 개념 학습", en: "Learn Core Concepts" },
    desc: { ko: "자격증 개요와 핵심 영역을 이중 언어 카드로 훑습니다.", en: "Survey cert overview and key domains with bilingual study cards." },
  },
  {
    title: { ko: "용어 암기", en: "Memorize Key Terms" },
    desc: { ko: "플래시카드로 출제 빈도가 높은 용어를 반복합니다.", en: "Use flashcards to repeatedly review high-frequency exam vocabulary." },
  },
  {
    title: { ko: "영역별 퀴즈", en: "Domain-by-Domain Quiz" },
    desc: { ko: "영역마다 25문항 단위로 풀고 약점을 보강합니다.", en: "Work through each domain in 25-question blocks and fill gaps." },
  },
  {
    title: { ko: "실전 모의시험", en: "Full Mock Exam" },
    desc: { ko: "실제 시험과 동일한 시간·환경으로 마무리 점검.", en: "Final check under real exam conditions with full timer." },
  },
];

export default function HomePath({ isKo }: Props) {
  const t = useTranslations("homeUi");
  const lang = (isKo ? "ko" : "en") as "ko" | "en";
  return (
    <section className="section section--alt" aria-labelledby="path-title">
      <div className="container">
        <div className="section__head">
          <div>
            <h2 id="path-title" className="section__title">
              {t("4StepsToPassing")}
            </h2>
            <p className="section__sub">
              {t("basedOn6Weeks")}
            </p>
          </div>
        </div>

        <ol className="path" aria-label={t("studyPath")}>
          {steps.map((step, i) => (
            <li key={i} className="path__step">
              <span className="path__num">{i + 1}</span>
              <span className="path__title">{step.title[lang]}</span>
              <span className="path__desc">{step.desc[lang]}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
