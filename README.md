# A11yCert

IAAP CPACC & WAS 자격증 시험 준비를 위한 한국어·영어 이중 언어 학습 플랫폼.

**[a11ycert.com](https://a11ycert.com)** — Korean / English bilingual study platform for IAAP CPACC & WAS certification exams.

---

## Features

- 한국어·영어 이중 언어 학습 카드
- 플래시카드 (핵심 용어 암기)
- 모의 퀴즈 (CPACC 100문항 / WAS 75문항) + 오답노트
- 한영 용어집 (500개 이상)
- SNS 로그인 (Google, GitHub) — Supabase Auth
- 학습 페이지별 댓글·학습 메모, 커뮤니티 게시판, 정보 수정 제보
- 학습 진도 저장 — 비로그인은 localStorage, 로그인 시 Supabase DB 동기화

---

## Tech Stack

- **Next.js 16** — App Router (SSR + API Routes)
- **next-intl** — `/ko` / `/en` i18n routing
- **Tailwind CSS v4**
- **Supabase** — Auth (SNS 로그인) + PostgreSQL (RLS)
- **Zustand** — client-side state (비로그인 fallback)
- **Vercel** — hosting & auto deploy

---

## License

MIT
