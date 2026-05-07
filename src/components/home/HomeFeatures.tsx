interface Props {
  locale: string;
  isKo: boolean;
}

const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    title: { ko: "이중 언어 학습 카드", en: "Bilingual Study Cards" },
    desc: {
      ko: "한국어 해설과 IAAP 영문 원문을 한 카드에 나란히. 시험 출제 표현을 자연스럽게 익힙니다.",
      en: "Korean explanations and IAAP original text side by side. Naturally internalize exam vocabulary.",
    },
    bullets: {
      ko: ["토글로 한/영 전환", "핵심 용어 호버 팝오버"],
      en: ["Toggle KO/EN view", "Hover popover for key terms"],
    },
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
    title: { ko: "실전형 모의 퀴즈", en: "Real-Format Mock Quiz" },
    desc: {
      ko: "실제 시험과 동일한 4지선다 형식. 즉시 채점과 영역별 정답률 분석으로 약점을 파악합니다.",
      en: "Same 4-choice format as the real exam. Instant scoring and domain-level analysis to find weak spots.",
    },
    bullets: {
      ko: ["즉시 채점 + 해설", "자동 오답 노트"],
      en: ["Instant scoring + explanation", "Auto wrong-answer notes"],
    },
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    title: { ko: "간격 반복 플래시카드", en: "Spaced Repetition Flashcards" },
    desc: {
      ko: "기억 곡선에 맞춰 카드가 다시 등장합니다. 하루 10분으로 핵심 200+ 용어를 장기 기억에 정착시키세요.",
      en: "Cards reappear on the memory curve. 10 minutes a day locks 200+ key terms into long-term memory.",
    },
    bullets: {
      ko: ["다음 복습일 자동 계산", "즐겨찾기 + 형광펜"],
      en: ["Auto-calculates next review date", "Bookmarks + highlighter"],
    },
  },
];

export default function HomeFeatures({ locale, isKo }: Props) {
  const lang = isKo ? "ko" : "en";
  return (
    <section className="section" aria-labelledby="features-title">
      <div className="container">
        <div className="section__head">
          <div>
            <h2 id="features-title" className="section__title">
              {isKo ? "학습은 이렇게 진행됩니다" : "How the Learning Works"}
            </h2>
            <p className="section__sub">
              {isKo
                ? "암기보다 이해, 한국어 해설과 영어 원문을 항상 함께 봅니다."
                : "Understanding over memorisation — Korean and English always side by side."}
            </p>
          </div>
        </div>

        <div className="features">
          {features.map((f) => (
            <div key={f.title.ko} className="feature">
              <div className="feature__icon">{f.icon}</div>
              <h3 className="feature__title">{f.title[lang]}</h3>
              <p className="feature__desc">{f.desc[lang]}</p>
              <div style={{ height: 1, background: "var(--divider)", margin: "var(--space-2) 0" }} />
              {f.bullets[lang].map((b) => (
                <div key={b} className="feature__bullet">
                  <span className="feature__bullet-mark" aria-hidden="true">→</span>
                  {b}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
