# Handoff: A11yCert 웹사이트 리디자인

## Overview
이 패키지는 **www.a11ycert.com** (IAAP CPACC/WAS 자격증 한국어 학습 플랫폼)의 전체 리디자인 결과물입니다. 기존 사이트의 정보 구조는 유지하되, 시각 디자인·타이포그래피·접근성 모드·모바일 반응형을 새롭게 구성했습니다.

기존 운영 코드베이스(가정: Next.js + i18n)에 이 디자인을 적용하는 것이 작업 목표입니다.

## About the Design Files
`reference/` 폴더의 파일들은 **HTML로 만든 디자인 레퍼런스**입니다. 의도된 룩 앤 필과 인터랙션을 보여주는 프로토타입이며, 운영 코드에 그대로 복붙하기 위한 프로덕션 코드가 아닙니다.

작업 목표는 이 HTML 디자인을 **기존 코드베이스의 환경(React/Next.js, 컴포넌트 라이브러리, i18n, 라우팅 등)에 맞춰 재구현**하는 것입니다. 이미 사용 중인 패턴(컴포넌트 분할 방식, 스타일링 라이브러리, 상태 관리)을 따라가세요. 스타일링이 정해지지 않았다면 CSS Variables + Tailwind 또는 CSS Modules 중 프로젝트에 맞는 것을 선택하면 됩니다.

## Fidelity
**High-fidelity** — 색상, 타이포그래피, 간격, 그림자, 인터랙션 모두 최종값입니다. 픽셀 단위로 동일하게 재현하세요. 디자인 토큰이 모두 명시되어 있으니 그대로 옮겨 쓰면 됩니다.

## 사이트맵 / 페이지

| 경로 | 레퍼런스 | 설명 |
|---|---|---|
| `/ko` | `index.html` | 홈 — 자격증 비교 중심 랜딩 |
| `/ko/cpacc` | `cpacc.html` | CPACC 개요 + 도메인 |
| `/ko/was` | `was.html` | WAS 개요 + 도메인 |
| `/ko/{cert}/study` | `study.html` | 학습 페이지 (사이드바 + 이중언어 카드) |
| `/ko/{cert}/quiz` | `quiz.html` | 모의 퀴즈 (즉시 채점 + 오답 노트) |
| `/ko/{cert}/flashcards` | `flashcards.html` | 플래시카드 (간격 반복) |
| `/ko/glossary` | `glossary.html` | 용어집 (검색 + 필터) |

영문 라우트(`/en/...`)는 `lang` prop만 바꿔 동일한 컴포넌트로 렌더하세요.

## Design Tokens
`reference/styles/tokens.css`에 모든 토큰이 CSS 변수로 정의되어 있습니다. **세 테마(라이트/다크/고대비)** 모두 동일한 변수 이름으로 노출됩니다.

### Color Tokens (이름 — 라이트 / 다크 / 고대비)
| Token | Light | Dark | High Contrast |
|---|---|---|---|
| `--bg` | `#F7F8FB` | `#0B1020` | `#000000` |
| `--bg-elev` | `#FFFFFF` | `#131A30` | `#000000` |
| `--bg-muted` | `#F2F4F8` | `#19223D` | `#0A0A0A` |
| `--fg` | `#0F172A` | `#E6EAF3` | `#FFFFFF` |
| `--fg-muted` | `#475569` | `#A6B0C5` | `#FFFFFF` |
| `--fg-subtle` | `#64748B` | `#7C8AAA` | `#E0E0E0` |
| `--border` | `#E2E8F0` | `#283455` | `#FFFFFF` |
| `--accent` | `#1E4FD8` | `#8AB4FF` | `#FFE600` |
| `--accent-soft` | `#E6EEFF` | `#1B2A55` | `#000000` |
| `--success` | `#0F7A53` | `#5DD9A4` | `#00FF88` |
| `--danger` | `#B42318` | `#FF8A80` | `#FF6B6B` |
| `--warning` | `#B45309` | `#F5B86E` | `#FFE600` |
| `--highlight-bg` | `#FFF1B8` | `#4A3F0F` | `#FFE600` |

전체 목록은 `tokens.css` 참조. 모든 색은 본문 텍스트 기준 WCAG AA 이상 대비를 만족하도록 선택되었습니다(고대비는 AAA).

### Typography
- 본문: **Pretendard Variable** (CDN: `cdn.jsdelivr.net/gh/orioncactus/pretendard`)
- 보조 (장식적 영문): **Noto Serif KR**
- 코드/숫자: **JetBrains Mono**
- 사용자 글자 크기 4단계: `[data-fs="s|m|l|xl"]` → `--fs-scale: 0.92 / 1.00 / 1.12 / 1.28`
- 스케일: `--fs-xs(12) / sm(13) / base(15) / md(17) / lg(20) / xl(24) / 2xl(32) / 3xl(44) / 4xl(60)` × `--fs-scale`

### Spacing / Radius / Shadow
- Spacing: `--space-1`(4) ~ `--space-16`(80)
- Radius: `--radius-sm`(6), `--radius`(10), `--radius-lg`(16), `--radius-xl`(24)
- Shadow: `--shadow-sm`, `--shadow`, `--shadow-lg` (다크/고대비에서 자동으로 강해지거나 제거됨)
- Easing: `cubic-bezier(0.2, 0.7, 0.2, 1)`, durations 120/200/360ms

## 핵심 기능

### 1. 모드 시스템 (테마 + 글자 크기 + 모션)
`reference/scripts/prefs.js` 참조.
- **저장 키**: `localStorage["a11ycert.prefs.v1"]` = `{ theme, fs, motion }`
- **DOM 적용**: `<html>`에 `data-theme`, `data-fs`, `data-motion` 속성
- **초기값**: 시스템 `prefers-color-scheme`, `prefers-contrast`, `prefers-reduced-motion`을 우선 반영
- **이벤트**: `document.dispatchEvent(new CustomEvent("a11ycert:prefs", { detail }))`

React/Next로 옮길 때:
```tsx
// app/providers.tsx
'use client';
const PrefsContext = createContext(...);
// 1) localStorage에서 초기값 로드 (SSR mismatch 방지를 위해 useEffect)
// 2) <html data-theme={theme} data-fs={fs} data-motion={motion}>
// 3) tokens.css는 글로벌로 import
```
SSR 깜빡임을 막으려면 `<head>`에 차단형 스크립트로 `data-*` 속성을 미리 셋팅하는 패턴 권장 (next-themes와 동일 방식).

### 2. 키보드 단축키
- 학습 페이지: `←/→` 단원 이동, `L` 한/영 토글, `B` 북마크
- 퀴즈: `1~4` 선택, `Enter` 확정, `→` 다음 문항
- 플래시카드: `Space` 뒤집기, `1~4` 평가

### 3. 접근성 가드
- 본문 바로가기 (`.skip-link`) — 첫 번째 포커스
- `:focus-visible` 링 — 키보드 사용자에게만 표시
- 모든 인터랙티브 요소에 `aria-label` / `aria-pressed` / `aria-current`
- 고대비 모드에서는 모든 보더가 2px, 그림자 제거, 모든 활성 상태가 노랑/검정 반전
- `prefers-reduced-motion: reduce`이면 transition/animation 0.01ms

## Components

각 페이지에 등장하는 컴포넌트와 위치, 변형을 정리합니다. 이름은 그대로 사용해도 좋고, 기존 컨벤션에 맞춰 변경해도 됩니다.

### Shell (`scripts/shell.js`, `styles/shell.css`)
- **`<AppHeader>`** — 좌: 브랜드, 중앙: 7-item 네비, 우: 언어토글 / 모드 메뉴 / 모바일 햄버거 (980px↓)
- **`<ModeMenu>`** — 드롭다운, 테마 3-segment + 글자 크기 4-segment + 모션 2-segment
- **`<MobileSheet>`** — 720px 이하 햄버거 클릭 시 바텀시트, 메뉴 + 모드 컨트롤 동거
- **`<AppFooter>`** — 4열(브랜드/CPACC/WAS/사이트), 720px↓ 2열, 440px↓ 1열

### Buttons / Tags
- `.btn`, `.btn--primary`, `.btn--ghost`, `.btn--lg`, `.btn--sm` — 6가지 조합
- `.tag`, `.tag--accent` / `--success` / `--warning` — 인라인 라벨

### Home (`styles/home.css`)
- **Hero** — 좌: 제목+CTA+stats(3), 우: 쇼케이스 카드 클러스터(메인 퀴즈카드 + 상단 정답뱃지 + 하단 진행미니카드). 모바일에선 쇼케이스 숨김.
- **CertCard** — CPACC/WAS 카드. id, name, name-en, level pill, desc, 3-fact meta grid(문항/합격선/시간), topics list, 진행도 progress, CTA 3-button row
- **Feature** — 3개 카드 (이중언어 / 퀴즈 / 플래시카드)
- **Path** — 4단계 가로 stepper (모바일 2열→1열, 연결선 모바일에서 숨김)
- **CtaStrip** — 마지막 섹션의 풀-너비 CTA

### Overview (CPACC/WAS, `styles/overview.css`)
- **OverviewHero** — 빵부스러기, 자격증 ID, 제목 한/영, 리드, CTA 3-button + 시험정보 facts panel
- **DomainBlock** — 좌: 도메인 정보 + 비중 progress bar + 학습 CTA / 우: 6 토픽 카드 그리드(2열 → 모바일 1열)

### Study (`styles/learn.css` — `.app-layout`, `.bilingual-card`)
- **Sidebar** — 자격증 segment switcher → 전체 진행 → 도메인별 단원 목록 (단원 번호, 제목, 완료체크 동그라미)
- **StudyToolbar** — 빵부스러기 + 형광펜/북마크 액션
- **BilingualCard** — head(unit번호, 제목 한/영, 출제빈도 태그) → cols(좌 한국어, 우 영어, 핵심 용어 호버 가능 .term, 시험포인트 callout) → nav(이전/단축키 안내/다음)

### Quiz (`styles/learn.css` — `.quiz-*`)
- **QuizToolbar** — 진행도 카운터 + 영역 태그 + 타이머 + 중단
- **QuizCard** — 태그 + 북마크 + Q(한/영) + 4 options(letter+text+text-en) + Explain 패널 + Foot(키 안내 + 이전/다음)
- **Option 상태** — `.is-selected`, `.is-correct`, `.is-incorrect`
- **Aside** — 진행 요약(15-cell 정답 그리드) + 자동 오답 노트 리스트

### Flashcards
- **FlashCard** — 720px × 360px, 3D flip(`rotateY(180deg)`, `transform-style: preserve-3d`)
- **FlashRate** — 4 버튼(다시/어려움/좋음/쉬움), 각각 다음 복습 텀 표시. 모바일 2x2 그리드
- 모션 줄이기 모드에서는 flip transition 제거

### Glossary
- **GlossarySearch** — 큰 검색 인풋 + 검색 버튼
- **GlossaryFilter** — 자격증/카테고리 chip 그룹 (toggle)
- **GlossaryRow** — `[term/term-en | def | cert tags]` 3열 그리드, 모바일 1열

## State Management

### Persistent (localStorage)
- `a11ycert.prefs.v1` — `{theme, fs, motion}` (전역)
- `a11ycert.progress.{cert}` — `{[unitId]: "done" | "in-progress"}` 학습 진행도
- `a11ycert.bookmarks.{cert}` — `string[]` 북마크 단원/문항
- `a11ycert.wrongNotes.{cert}` — `Array<{questionId, answeredAt, selectedOption, correctOption}>`
- `a11ycert.flashSchedule.{cert}` — `{[cardId]: {ease, dueAt, interval}}` (SM-2 간소화)

### Per-page
- Quiz: 현재 시험 세션 (정답률, 남은 시간, 풀이 기록)
- Study: 현재 단원, 사이드바 열림 상태(모바일)
- Flashcards: 오늘 복습 큐, 현재 카드 인덱스, 뒤집힘 여부

## Behavior / Interactions

- **테마 토글** → CSS 변수만 바꾸므로 모든 컴포넌트 자동 업데이트, transition 200ms
- **글자 크기** → `--fs-scale` 변경 → 본문 reflow
- **모션 줄이기** → `[data-motion="reduced"]`가 모든 transition/animation 0.01ms
- **퀴즈 답변 선택** → 즉시 채점, 선택 옵션에 `.is-selected` → 정답이면 `.is-correct` 추가, 오답이면 `.is-incorrect` + 정답 옵션에 `.is-correct` 표시 → Explain 패널 슬라이드 인 → 오답 노트에 자동 추가
- **플래시카드 평가** → SM-2 간소판: 다시(1분), 어려움(10분), 좋음(1일), 쉬움(4일). `dueAt` 갱신 후 다음 카드
- **언어 토글** → 학습/퀴즈 카드의 한/영 컬럼 표시 (3가지: 한만/영만/병행). 기본 병행
- **모바일 햄버거** → 바텀시트, 백드롭 클릭/Esc로 닫힘, body 스크롤 락

## Responsive Breakpoints
- ≤ 980px : 데스크톱 네비 → 햄버거, 퀴즈 사이드 패널 본문 아래로
- ≤ 920px : 학습 사이드바 본문 위로, 이중언어 카드 1열
- ≤ 720px : 헤더 컴팩트(브랜드 텍스트 숨김), 플래시 평가 2x2, 푸터 2열
- ≤ 520px : 홈 CTA 풀-너비, 자격증 카드 meta 1열, path 1열
- ≤ 440px : 푸터 1열

## Screenshots
`screenshots/` 폴더에 7개 페이지 × 3 테마(라이트/다크/고대비) = 21장의 데스크톱 캡처가 있습니다. 모바일 동작은 README "Responsive Breakpoints" 섹션을 참고하세요.

```
screenshots/
├── 01-home/{desktop-light, desktop-dark, desktop-contrast}.png
├── 02-cpacc/...
├── 03-was/...
├── 04-study/...
├── 05-quiz/...
├── 06-flashcards/...
└── 07-glossary/...
```

## Files in `reference/`

```
reference/
├── index.html              # 홈
├── cpacc.html              # CPACC 개요
├── was.html                # WAS 개요
├── study.html              # 학습 페이지
├── quiz.html               # 모의 퀴즈
├── flashcards.html         # 플래시카드
├── glossary.html           # 용어집
├── styles/
│   ├── tokens.css          # 디자인 토큰 (3 테마 + 폰트 스케일 + 모션)
│   ├── shell.css           # 헤더 / 모드메뉴 / 모바일시트 / 푸터
│   ├── home.css            # 홈 전용
│   ├── overview.css        # CPACC/WAS 개요
│   └── learn.css           # 학습 + 퀴즈 + 플래시카드 + 용어집
└── scripts/
    ├── prefs.js            # 모드(테마/글자/모션) 저장·적용
    └── shell.js            # 헤더/푸터/모바일시트 빌더 + 모드 메뉴 와이어업
```

## Migration Checklist

1. **토큰 이식**: `tokens.css`의 변수를 그대로 글로벌 CSS로 import (또는 Tailwind config의 `theme.extend.colors`에 매핑)
2. **테마 프로바이더**: `prefs.js`의 로직을 React Context로 변환 (SSR 깜빡임 차단 스크립트 포함)
3. **레이아웃 셸**: `shell.js`의 buildHeader/buildFooter/buildMobileSheet을 `<AppHeader>`, `<AppFooter>`, `<MobileSheet>` 컴포넌트로
4. **페이지 1:1 변환**: 각 HTML 파일을 페이지 컴포넌트로. 정적 마크업은 그대로 옮기되 데이터는 props/CMS/i18n에서 받기
5. **i18n**: 한국어 카피는 `ko.json`, 영어 원문은 `en.json`. 학습 카드의 한/영 동시 표시는 두 언어 키를 동시에 가져와 렌더
6. **상태 훅**: `useProgress(cert)`, `useBookmarks(cert)`, `useWrongNotes(cert)`, `useFlashSchedule(cert)` 등 localStorage 동기화 훅
7. **접근성 회귀 테스트**: axe-core, 키보드만 탐색 시나리오, 스크린 리더(NVDA/VoiceOver) 한 바퀴

## Assets
디자인에 외부 이미지·폰트 외 자체 자산은 없습니다. 모든 아이콘은 인라인 SVG(`currentColor`), 로고는 텍스트 + `A11` 모노그램 박스입니다. 운영 사이트가 별도 로고를 보유하고 있다면 `.brand__mark` 영역만 교체하세요.

## Open Questions for Engineer
- 운영 코드의 i18n 라이브러리(next-intl / i18next / 자체)를 그대로 사용
- 분석/이벤트 추적이 필요한 인터랙션 (테마 변경, 퀴즈 정답률 등) 정의
- 기존 사용자의 진행도 마이그레이션 정책 — localStorage 키가 변경되었으므로 기존 키에서 신 키로 1회 변환 필요 여부
