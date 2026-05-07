import Link from "next/link";

interface Props {
  locale: string;
  isKo: boolean;
}

export default function HomeHero({ locale, isKo }: Props) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container">
        <div className="hero__grid">
          <div>
            <span className="hero__eyebrow">
              <span className="dot" aria-hidden="true">A</span>
              {isKo ? "IAAP 공인 자격증 한국어 학습" : "IAAP Certification Korean Study Platform"}
            </span>

            <h1 id="hero-title" className="hero__title">
              {isKo ? (
                <>웹 접근성 자격증,<br /><em>한국어로</em> 준비하세요</>
              ) : (
                <>Web Accessibility Certs,<br />Prepared <em>in Korean</em></>
              )}
            </h1>

            <p className="hero__lede">
              {isKo
                ? "CPACC와 WAS 시험 범위를 한국어 해설과 영어 원문으로 동시에 학습합니다. 핵심 용어 플래시카드, 실전형 모의 퀴즈, 자동 오답 노트까지 — 모두 무료."
                : "Study CPACC and WAS exam content with Korean explanations and English originals side by side. Flashcards, mock quizzes, and automatic wrong-answer notes — all free."}
            </p>

            <div className="hero__cta">
              <Link className="btn btn--primary btn--lg" href={`/${locale}/cpacc`}>
                {isKo ? "CPACC 시작하기" : "Start CPACC"}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <Link className="btn btn--lg" href={`/${locale}/was`}>
                {isKo ? "WAS 시작하기" : "Start WAS"}
              </Link>
            </div>

            <dl className="hero__stats">
              <div>
                <dd className="hero__stat-num">
                  175
                  <span style={{ fontSize: "0.55em", color: "var(--fg-muted)", fontWeight: 600, marginLeft: 2 }}>
                    {isKo ? "문항" : "Qs"}
                  </span>
                </dd>
                <dt className="hero__stat-label">{isKo ? "실전형 학습 문항" : "Practice questions"}</dt>
              </div>
              <div>
                <dd className="hero__stat-num">
                  2
                  <span style={{ fontSize: "0.55em", color: "var(--fg-muted)", fontWeight: 600, marginLeft: 6 }}>
                    {isKo ? "자격증" : "certs"}
                  </span>
                </dd>
                <dt className="hero__stat-label">{isKo ? "CPACC · WAS 과정" : "CPACC · WAS courses"}</dt>
              </div>
              <div>
                <dd className="hero__stat-num" style={{ color: "var(--success)" }}>
                  {isKo ? "무료" : "Free"}
                </dd>
                <dt className="hero__stat-label">{isKo ? "계정 없이 이용" : "No account needed"}</dt>
              </div>
            </dl>
          </div>

          {/* Showcase (decorative) */}
          <div className="showcase" aria-hidden="true">
            <div className="showcase__card showcase__card--badge">
              <span style={{ display: "inline-grid", placeItems: "center", width: 28, height: 28, borderRadius: "50%", background: "var(--success-soft)", color: "var(--success)" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <div>
                <div style={{ fontSize: "var(--fs-xs)", color: "var(--fg-subtle)", fontWeight: 500 }}>{isKo ? "정답 +1점" : "Correct +1"}</div>
                <div style={{ fontSize: "var(--fs-sm)" }}>{isKo ? "진행 12 / 100" : "12 / 100 done"}</div>
              </div>
            </div>

            <div className="showcase__card showcase__card--main">
              <div className="qcard__head">
                <span className="qcard__qnum">{isKo ? "문항 12" : "Q.12"}</span>
                <span className="qcard__cert">CPACC · POUR</span>
              </div>
              <div>
                <div className="qcard__q">{isKo ? "WCAG 2.2의 네 가지 핵심 원칙(POUR)에 포함되지 않는 것은?" : "Which is NOT one of WCAG 2.2's four POUR principles?"}</div>
                <div className="qcard__q-en">Which of the following is NOT one of WCAG 2.2's four principles (POUR)?</div>
              </div>
              <div className="qcard__opts">
                <div className="qcard__opt"><span className="qcard__opt-letter">A</span>{isKo ? "인식 가능 (Perceivable)" : "Perceivable"}</div>
                <div className="qcard__opt"><span className="qcard__opt-letter">B</span>{isKo ? "운용 가능 (Operable)" : "Operable"}</div>
                <div className="qcard__opt qcard__opt--correct"><span className="qcard__opt-letter">C</span>{isKo ? "예측 가능 (Predictable)" : "Predictable"}</div>
                <div className="qcard__opt"><span className="qcard__opt-letter">D</span>{isKo ? "견고함 (Robust)" : "Robust"}</div>
              </div>
            </div>

            <div className="showcase__card showcase__card--mini">
              <div style={{ fontSize: "var(--fs-xs)", color: "var(--fg-subtle)", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 6 }}>
                {isKo ? "오늘의 진행" : "Today"}
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 8 }}>
                <span style={{ fontSize: "var(--fs-2xl)", fontWeight: 700, letterSpacing: "-0.02em" }}>68</span>
                <span style={{ color: "var(--fg-muted)", fontWeight: 600 }}>%</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: "68%" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: "var(--fs-xs)", color: "var(--fg-subtle)" }}>
                <span>{isKo ? "34/50 카드" : "34/50 cards"}</span>
                <span>{isKo ? "+3 연속 정답" : "+3 streak"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
