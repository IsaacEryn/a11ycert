import type { StudyUnit, DomainGroup } from "./types";

const units: StudyUnit[] = [
  // ── Domain 1 ──────────────────────────────────────────────────────────────
  {
    id: "was-1-1",
    exam: "was",
    domain: 1,
    order: 1,
    available: true,
    title: { ko: "시맨틱 HTML과 접근성", en: "Semantic HTML and Accessibility" },
    summary: {
      ko: "의미론적 HTML 요소를 올바르게 사용하여 스크린리더와 보조기술이 페이지 구조를 정확히 해석할 수 있도록 하는 방법을 학습합니다.",
      en: "Learn to use semantic HTML elements correctly so that screen readers and assistive technologies can accurately interpret page structure.",
    },
    objectives: {
      ko: [
        "HTML5 랜드마크 요소와 그 역할을 설명할 수 있다",
        "올바른 제목 계층 구조(h1~h6)를 적용할 수 있다",
        "인터랙티브 요소 선택의 올바른 기준을 설명할 수 있다",
        "시맨틱 HTML이 보조기술에 미치는 영향을 이해한다",
      ],
      en: [
        "Explain HTML5 landmark elements and their roles",
        "Apply correct heading hierarchy (h1–h6)",
        "Describe correct criteria for choosing interactive elements",
        "Understand how semantic HTML impacts assistive technologies",
      ],
    },
    content: {
      ko: [
        "시맨틱 HTML(Semantic HTML)이란 태그의 시각적 표현이 아닌 의미와 역할에 맞는 HTML 요소를 사용하는 것입니다. 스크린리더는 시맨틱 마크업을 기반으로 페이지 구조를 파악하고 사용자에게 전달합니다.",
        "HTML5 랜드마크 요소는 페이지의 주요 영역을 정의합니다: `<header>`(페이지 헤더), `<nav>`(내비게이션), `<main>`(주요 콘텐츠, 페이지당 하나), `<article>`(독립적인 콘텐츠), `<section>`(주제별 그룹), `<aside>`(부가 정보), `<footer>`(페이지 푸터). 스크린리더 사용자는 랜드마크를 통해 페이지를 빠르게 탐색합니다.",
        "제목 계층 구조: `<h1>`은 페이지당 하나의 주요 제목으로 사용하고, `<h2>`~`<h6>`은 계층 순서대로 사용합니다. 제목 레벨을 건너뛰면 안 됩니다(예: h1 → h3). 제목은 시각적 스타일이 아닌 콘텐츠의 논리적 구조를 나타내야 합니다.",
        "인터랙티브 요소의 올바른 선택: 클릭 시 동작이 실행되면 `<button>`, 다른 페이지나 위치로 이동하면 `<a href>`, 데이터 입력에는 `<input>`, 선택 목록에는 `<select>`를 사용합니다. `<div>`나 `<span>`에 onclick 이벤트를 달면 키보드 접근성과 스크린리더 지원이 기본적으로 제공되지 않습니다.",
        "리스트 요소: 순서 없는 목록에는 `<ul>`, 순서 있는 목록에는 `<ol>`, 설명 목록에는 `<dl>`을 사용합니다. 스크린리더는 '목록, 3개 항목' 처럼 목록 항목 수와 현재 위치를 사용자에게 알려줍니다.",
      ],
      en: [
        "Semantic HTML means using HTML elements according to their meaning and purpose, not just their visual appearance. Screen readers use semantic markup to understand and communicate page structure.",
        "HTML5 landmark elements define major page regions: `<header>`, `<nav>`, `<main>` (one per page), `<article>`, `<section>`, `<aside>`, `<footer>`. Screen reader users navigate pages via these landmarks.",
        "Heading hierarchy: Use `<h1>` as the single main heading per page. Use `<h2>`–`<h6>` in order. Never skip heading levels (e.g., h1 → h3). Headings represent logical content structure, not visual styling.",
        "Choosing interactive elements: Use `<button>` for actions, `<a href>` for navigation, `<input>` for data entry, `<select>` for selection lists. Adding onclick to `<div>` or `<span>` doesn't provide keyboard accessibility or screen reader support by default.",
        "List elements: Use `<ul>` for unordered lists, `<ol>` for ordered lists, `<dl>` for description lists. Screen readers announce the number of items and the user's current position (e.g., 'list, 3 items').",
      ],
    },
    questions: [
      {
        id: "was-1-1-q1",
        question: {
          ko: "페이지 이동(링크)에 가장 적합한 HTML 요소는?",
          en: "Which HTML element is most appropriate for navigation links?",
        },
        options: {
          a: { ko: "`<button>`", en: "`<button>`" },
          b: { ko: "`<div onclick>`", en: "`<div onclick>`" },
          c: { ko: "`<a href>`", en: "`<a href>`" },
          d: { ko: "`<span onclick>`", en: "`<span onclick>`" },
        },
        answer: "c",
        explanation: {
          ko: "`<a href>`는 다른 페이지나 위치로 이동할 때 사용합니다. 기본적으로 키보드 포커스와 스크린리더 지원이 제공됩니다. `<button>`은 동작을 실행할 때 사용합니다.",
          en: "`<a href>` is used for navigating to other pages or locations. It provides built-in keyboard focus and screen reader support. `<button>` is for triggering actions.",
        },
      },
      {
        id: "was-1-1-q2",
        question: {
          ko: "다음 중 잘못된 제목 계층 구조는?",
          en: "Which of the following represents an incorrect heading hierarchy?",
        },
        options: {
          a: { ko: "h1 → h2 → h3", en: "h1 → h2 → h3" },
          b: { ko: "h1 → h2 → h2", en: "h1 → h2 → h2" },
          c: { ko: "h1 → h3 (h2 건너뜀)", en: "h1 → h3 (skipping h2)" },
          d: { ko: "h1 → h2 → h3 → h4", en: "h1 → h2 → h3 → h4" },
        },
        answer: "c",
        explanation: {
          ko: "제목 레벨을 건너뛰면(h1 → h3) 스크린리더 사용자가 페이지 구조를 혼동할 수 있습니다. 항상 순서대로 사용해야 합니다.",
          en: "Skipping heading levels (h1 → h3) confuses screen reader users who rely on heading hierarchy to understand page structure. Always use headings in order.",
        },
      },
      {
        id: "was-1-1-q3",
        question: {
          ko: "스크린리더 사용자가 페이지 주요 영역을 빠르게 탐색할 수 있게 해주는 HTML5 요소들은?",
          en: "Which HTML5 elements allow screen reader users to navigate major page regions quickly?",
        },
        options: {
          a: { ko: "메타 태그(meta)", en: "Meta tags" },
          b: { ko: "랜드마크 요소(header, nav, main 등)", en: "Landmark elements (header, nav, main, etc.)" },
          c: { ko: "인라인 요소(span, em 등)", en: "Inline elements (span, em, etc.)" },
          d: { ko: "스크립트 태그(script)", en: "Script tags" },
        },
        answer: "b",
        explanation: {
          ko: "HTML5 랜드마크 요소(header, nav, main, article, section, aside, footer)는 페이지의 주요 영역을 정의하며, 스크린리더 사용자가 이를 통해 빠르게 탐색할 수 있습니다.",
          en: "HTML5 landmark elements (header, nav, main, article, section, aside, footer) define major page regions and allow screen reader users to navigate them efficiently.",
        },
      },
    ],
  },

  {
    id: "was-1-2",
    exam: "was",
    domain: 1,
    order: 2,
    available: true,
    title: { ko: "WAI-ARIA 역할·속성·상태", en: "WAI-ARIA Roles, Properties, and States" },
    summary: {
      ko: "WAI-ARIA의 역할(Roles), 속성(Properties), 상태(States)를 이해하고, ARIA를 언제, 어떻게 사용해야 하는지 학습합니다.",
      en: "Understand WAI-ARIA Roles, Properties, and States and learn when and how to use ARIA correctly.",
    },
    objectives: {
      ko: [
        "ARIA의 역할, 속성, 상태의 차이를 설명할 수 있다",
        "ARIA 사용의 첫 번째 규칙을 이해한다",
        "주요 aria-* 속성(aria-label, aria-labelledby, aria-live 등)의 용도를 설명할 수 있다",
        "aria-live 영역의 두 가지 값(polite, assertive)의 차이를 설명할 수 있다",
      ],
      en: [
        "Explain the differences between ARIA Roles, Properties, and States",
        "Understand the First Rule of ARIA Use",
        "Describe the purpose of key aria-* attributes",
        "Distinguish between aria-live='polite' and aria-live='assertive'",
      ],
    },
    content: {
      ko: [
        "WAI-ARIA(Web Accessibility Initiative - Accessible Rich Internet Applications)는 시맨틱 HTML만으로 표현하기 어려운 복잡한 UI 패턴의 접근성을 보완하는 W3C 표준입니다.",
        "ARIA의 3가지 핵심 개념: ① 역할(Roles) - 요소의 용도를 정의합니다. 예: role=\"button\", role=\"dialog\", role=\"tablist\", role=\"alert\" ② 속성(Properties) - 요소에 대한 추가 정보를 제공합니다. 예: aria-label=\"닫기\", aria-labelledby=\"title-id\", aria-required=\"true\" ③ 상태(States) - 요소의 현재 상태를 나타냅니다. 예: aria-expanded=\"true\", aria-checked=\"false\", aria-disabled=\"true\"",
        "ARIA 사용의 첫 번째 규칙(First Rule of ARIA Use): '시맨틱 HTML이 동일한 역할을 할 수 있다면 ARIA를 사용하지 않는다.' 예를 들어 `<button>`을 사용할 수 있다면 `<div role=\"button\">`을 사용하지 않아야 합니다.",
        "주요 aria 속성: aria-label(레이블 직접 제공), aria-labelledby(다른 요소의 텍스트를 레이블로 참조), aria-describedby(추가 설명 제공), aria-hidden(보조기술에서 요소 숨기기), aria-required(필수 입력 표시), aria-invalid(유효성 검사 오류 표시).",
        "aria-live 영역: 동적으로 변경되는 콘텐츠(알림, 오류 메시지, 로딩 상태 등)에 사용합니다. aria-live=\"polite\"는 현재 읽기가 끝난 후 알리고, aria-live=\"assertive\"는 현재 읽기를 중단하고 즉시 알립니다. assertive는 중요한 오류나 긴급 알림에만 사용해야 합니다.",
      ],
      en: [
        "WAI-ARIA (Web Accessibility Initiative – Accessible Rich Internet Applications) is a W3C standard that supplements semantic HTML to make complex UI patterns accessible.",
        "Three core ARIA concepts: ① Roles – define the purpose of an element (e.g., role=\"button\", role=\"dialog\") ② Properties – provide additional information about an element (e.g., aria-label, aria-required) ③ States – communicate the current condition of an element (e.g., aria-expanded, aria-checked, aria-disabled).",
        "First Rule of ARIA Use: 'If you can use a native HTML element with the semantics you need, don't use ARIA.' For example, use `<button>` instead of `<div role=\"button\">`.",
        "Key aria attributes: aria-label (provide a label directly), aria-labelledby (reference another element as label), aria-describedby (provide additional description), aria-hidden (hide from assistive tech), aria-required (mark required fields), aria-invalid (mark validation errors).",
        "aria-live regions: Used for dynamically updated content (notifications, errors, loading states). aria-live=\"polite\" announces updates after the current speech finishes. aria-live=\"assertive\" interrupts immediately. Use assertive only for critical errors or urgent alerts.",
      ],
    },
    questions: [
      {
        id: "was-1-2-q1",
        question: {
          ko: "WAI-ARIA 사용의 첫 번째 규칙은?",
          en: "What is the First Rule of ARIA Use?",
        },
        options: {
          a: { ko: "모든 인터랙티브 요소에 ARIA role을 추가한다", en: "Add ARIA roles to all interactive elements" },
          b: { ko: "시맨틱 HTML이 가능한 경우 ARIA를 사용하지 않는다", en: "Do not use ARIA if a native HTML element can provide the same semantics" },
          c: { ko: "ARIA role은 반드시 div에만 사용한다", en: "ARIA roles must only be used on div elements" },
          d: { ko: "aria-label은 모든 요소에 필수다", en: "aria-label is required on all elements" },
        },
        answer: "b",
        explanation: {
          ko: "ARIA의 첫 번째 규칙은 '시맨틱 HTML로 해결 가능하다면 ARIA를 사용하지 말라'입니다. 불필요한 ARIA 사용은 오히려 접근성을 해칠 수 있습니다.",
          en: "The First Rule of ARIA is: if a native HTML element can provide the required semantics, don't use ARIA. Unnecessary ARIA can actually harm accessibility.",
        },
      },
      {
        id: "was-1-2-q2",
        question: {
          ko: "요소의 현재 상태(열림/닫힘, 선택됨/해제됨 등)를 나타내는 ARIA 개념은?",
          en: "Which ARIA concept communicates the current condition of an element (open/closed, checked/unchecked)?",
        },
        options: {
          a: { ko: "Role(역할)", en: "Role" },
          b: { ko: "Property(속성)", en: "Property" },
          c: { ko: "State(상태)", en: "State" },
          d: { ko: "Landmark(랜드마크)", en: "Landmark" },
        },
        answer: "c",
        explanation: {
          ko: "States(상태)는 aria-expanded, aria-checked, aria-disabled처럼 요소의 현재 조건을 나타냅니다. Properties는 요소의 고정된 추가 정보를 제공합니다.",
          en: "ARIA States (aria-expanded, aria-checked, aria-disabled) communicate the current condition of an element. Properties provide fixed additional information.",
        },
      },
      {
        id: "was-1-2-q3",
        question: {
          ko: "동적 알림 영역에서 '현재 읽기가 끝난 후 알린다'는 aria-live 값은?",
          en: "Which aria-live value announces updates after the current speech finishes?",
        },
        options: {
          a: { ko: "assertive", en: "assertive" },
          b: { ko: "polite", en: "polite" },
          c: { ko: "off", en: "off" },
          d: { ko: "urgent", en: "urgent" },
        },
        answer: "b",
        explanation: {
          ko: "aria-live=\"polite\"는 현재 읽기를 방해하지 않고 끝난 후 알립니다. assertive는 현재 읽기를 중단하고 즉시 알리므로, 긴급 오류에만 사용해야 합니다.",
          en: "aria-live=\"polite\" waits until the current speech finishes before announcing the update. assertive interrupts immediately and should only be used for critical alerts.",
        },
      },
    ],
  },

  {
    id: "was-1-3",
    exam: "was",
    domain: 1,
    order: 3,
    available: true,
    title: { ko: "키보드 탐색과 포커스 관리", en: "Keyboard Navigation and Focus Management" },
    summary: {
      ko: "키보드만으로 모든 기능을 사용할 수 있도록 Tab 순서, 포커스 표시, 건너뛰기 링크, 포커스 트랩을 학습합니다.",
      en: "Learn how to ensure all functionality is keyboard accessible through tab order, focus indicators, skip links, and focus traps.",
    },
    objectives: {
      ko: [
        "tabindex 값(0, -1, 양수)의 차이와 사용 기준을 설명할 수 있다",
        "포커스 표시의 WCAG 요구사항을 이해한다",
        "건너뛰기 링크의 목적과 구현 방법을 설명할 수 있다",
        "모달에서의 포커스 트랩 패턴을 이해한다",
      ],
      en: [
        "Explain the differences between tabindex values (0, -1, positive)",
        "Understand WCAG requirements for focus indicators",
        "Describe the purpose and implementation of skip links",
        "Understand the focus trap pattern for modals",
      ],
    },
    content: {
      ko: [
        "키보드 접근성은 마우스를 사용할 수 없는 사용자(지체 장애인, 화면낭독기 사용자, 임시 부상자 등)에게 필수적입니다. 모든 인터랙티브 기능은 키보드로 접근하고 조작할 수 있어야 합니다.",
        "Tab 순서와 tabindex: Tab 키로 포커스 가능한 요소(링크, 버튼, 입력 필드)를 순서대로 이동합니다. tabindex=\"0\"은 자연스러운 DOM 순서대로 포커스됩니다. tabindex=\"-1\"은 탭 순서에서 제외되지만, JavaScript로 focus()를 호출하면 포커스 가능합니다(프로그래밍 포커스). tabindex=\"양수\"는 탭 순서를 강제 조정하므로 사용을 피해야 합니다.",
        "포커스 표시(Focus Indicator): 포커스된 요소는 시각적으로 명확하게 표시되어야 합니다(WCAG 2.4.7). CSS `outline: none`으로 포커스 표시를 완전히 제거하면 WCAG 위반입니다. `:focus-visible` 의사 클래스를 사용하면 키보드 사용 시에만 포커스 표시를 보여주고, 마우스 클릭 시에는 숨길 수 있어 시각 디자인과 접근성을 모두 만족합니다.",
        "건너뛰기 링크(Skip Link): 페이지 첫 번째 요소로 '본문으로 바로가기' 링크를 제공합니다. 키보드 사용자가 매번 긴 내비게이션을 Tab으로 거치지 않고 바로 주요 콘텐츠로 이동할 수 있습니다. 일반적으로 평소에는 화면 밖에 숨겼다가 Tab을 누르면 화면에 나타납니다.",
        "포커스 트랩(Focus Trap): 모달 다이얼로그가 열리면 포커스가 모달 내부에만 머물러야 합니다(모달 마지막 요소에서 Tab → 모달 첫 요소로). 모달이 닫히면 모달을 열었던 요소(예: 모달 열기 버튼)로 포커스를 되돌려야 합니다. SPA에서는 라우트 변경 시 포커스를 새 페이지의 주요 제목으로 이동해야 합니다.",
      ],
      en: [
        "Keyboard accessibility is essential for users who cannot use a mouse — people with motor disabilities, screen reader users, or those with temporary injuries. All interactive functionality must be accessible and operable via keyboard.",
        "Tab order and tabindex: Tab navigates through focusable elements (links, buttons, inputs) in DOM order. tabindex=\"0\" makes an element focusable in natural DOM order. tabindex=\"-1\" removes from tab order but allows programmatic focus via JavaScript's focus() method. Positive tabindex values force a specific tab order and should be avoided.",
        "Focus Indicator: Focused elements must be visually distinguishable (WCAG 2.4.7). Removing focus indicators with `outline: none` violates WCAG. Use `:focus-visible` to show focus indicators only for keyboard users while hiding them for mouse users, satisfying both design and accessibility needs.",
        "Skip Link: Provide a 'Skip to main content' link as the first element on the page. This allows keyboard users to bypass repeated navigation and jump directly to main content. Skip links are typically hidden off-screen and appear on Tab press.",
        "Focus Trap: When a modal dialog opens, focus must be contained within it (Tab from last modal element wraps to first modal element). When the modal closes, focus must return to the element that triggered it (e.g., the button that opened the modal). In SPAs, focus should move to the new page's main heading on route changes.",
      ],
    },
    questions: [
      {
        id: "was-1-3-q1",
        question: {
          ko: "tabindex=\"-1\"의 의미는?",
          en: "What does tabindex=\"-1\" mean?",
        },
        options: {
          a: { ko: "탭 순서에서 제외되고 포커스 자체가 불가능하다", en: "Excluded from tab order and cannot receive focus at all" },
          b: { ko: "탭 순서에서 제외되지만 JavaScript로 포커스 가능하다", en: "Excluded from tab order but can receive focus programmatically via JavaScript" },
          c: { ko: "탭 순서의 첫 번째 요소가 된다", en: "Becomes the first element in the tab order" },
          d: { ko: "탭 순서에서 가장 마지막 요소가 된다", en: "Becomes the last element in the tab order" },
        },
        answer: "b",
        explanation: {
          ko: "tabindex=\"-1\"은 Tab 키 탐색에서는 제외되지만, JavaScript의 element.focus()로 프로그래밍 방식으로 포커스할 수 있습니다. 모달의 첫 번째 요소나 동적으로 추가된 콘텐츠에 포커스를 이동할 때 사용합니다.",
          en: "tabindex=\"-1\" removes an element from the Tab key sequence but allows programmatic focus via JavaScript's element.focus(). It's used to move focus to modal content or dynamically added elements.",
        },
      },
      {
        id: "was-1-3-q2",
        question: {
          ko: "모달 다이얼로그의 포커스 트랩(Focus Trap) 목적은?",
          en: "What is the purpose of a focus trap in a modal dialog?",
        },
        options: {
          a: { ko: "모달 뒤의 콘텐츠도 자유롭게 탐색하게 한다", en: "Allow navigation to content behind the modal" },
          b: { ko: "포커스를 모달 내부에 가두어 사용자가 모달에 집중하게 한다", en: "Contain focus within the modal so users stay focused on its content" },
          c: { ko: "모달이 열릴 때 포커스를 페이지 상단으로 이동시킨다", en: "Move focus to the top of the page when the modal opens" },
          d: { ko: "마우스 클릭을 비활성화한다", en: "Disable mouse clicks" },
        },
        answer: "b",
        explanation: {
          ko: "포커스 트랩은 모달이 열렸을 때 포커스가 모달 밖으로 나가지 않도록 합니다. 모달의 마지막 요소에서 Tab을 누르면 모달의 첫 요소로 돌아와야 합니다.",
          en: "A focus trap keeps keyboard focus within an open modal dialog. Pressing Tab from the last modal element should cycle back to the first modal element.",
        },
      },
      {
        id: "was-1-3-q3",
        question: {
          ko: "키보드 사용 시에만 포커스 표시를 보여주는 CSS 의사 클래스는?",
          en: "Which CSS pseudo-class shows focus indicators only when using a keyboard?",
        },
        options: {
          a: { ko: ":hover", en: ":hover" },
          b: { ko: ":focus", en: ":focus" },
          c: { ko: ":focus-visible", en: ":focus-visible" },
          d: { ko: ":active", en: ":active" },
        },
        answer: "c",
        explanation: {
          ko: ":focus-visible은 키보드 탐색 시에만 포커스 표시를 보여주고, 마우스 클릭 시에는 숨겨 시각 디자인을 유지하면서 키보드 접근성을 확보합니다.",
          en: ":focus-visible shows focus indicators only for keyboard navigation, hiding them for mouse clicks. This satisfies both design aesthetics and keyboard accessibility.",
        },
      },
    ],
  },

  {
    id: "was-1-4", exam: "was", domain: 1, order: 4, available: false,
    title: { ko: "색상 대비와 시각적 디자인", en: "Color Contrast and Visual Design" },
    summary: { ko: "WCAG AA/AAA 색상 대비 기준과 비텍스트 콘텐츠의 대비 요구사항을 학습합니다.", en: "Learn WCAG AA/AAA color contrast ratios and requirements for non-text content." },
    objectives: { ko: [], en: [] }, content: { ko: [], en: [] }, questions: [],
  },
  {
    id: "was-1-5", exam: "was", domain: 1, order: 5, available: false,
    title: { ko: "폼과 입력 요소 접근성", en: "Form and Input Accessibility" },
    summary: { ko: "레이블 연결, 오류 메시지, 필수 입력 표시, fieldset/legend 사용법을 학습합니다.", en: "Learn label association, error messages, required fields, and fieldset/legend usage." },
    objectives: { ko: [], en: [] }, content: { ko: [], en: [] }, questions: [],
  },
  {
    id: "was-1-6", exam: "was", domain: 1, order: 6, available: false,
    title: { ko: "이미지와 멀티미디어 접근성", en: "Image and Multimedia Accessibility" },
    summary: { ko: "장식 이미지 vs 정보 이미지 구분, 자막, 오디오 설명 제공 방법을 학습합니다.", en: "Learn how to distinguish decorative vs informative images, and provide captions and audio descriptions." },
    objectives: { ko: [], en: [] }, content: { ko: [], en: [] }, questions: [],
  },

  // ── Domain 2 ──────────────────────────────────────────────────────────────
  {
    id: "was-2-1", exam: "was", domain: 2, order: 1, available: false,
    title: { ko: "자동화 접근성 테스트 도구", en: "Automated Accessibility Testing Tools" },
    summary: { ko: "axe, WAVE, Lighthouse 등 자동화 도구의 특징과 한계를 학습합니다.", en: "Learn about automated tools like axe, WAVE, and Lighthouse, and their limitations." },
    objectives: { ko: [], en: [] }, content: { ko: [], en: [] }, questions: [],
  },
  {
    id: "was-2-2", exam: "was", domain: 2, order: 2, available: false,
    title: { ko: "수동 테스트와 보조기술 테스트", en: "Manual Testing and Assistive Technology Testing" },
    summary: { ko: "NVDA, JAWS, VoiceOver를 활용한 보조기술 테스트와 수동 점검 방법론을 학습합니다.", en: "Learn manual testing methods and screen reader testing with NVDA, JAWS, and VoiceOver." },
    objectives: { ko: [], en: [] }, content: { ko: [], en: [] }, questions: [],
  },

  // ── Domain 3 ──────────────────────────────────────────────────────────────
  {
    id: "was-3-1", exam: "was", domain: 3, order: 1, available: false,
    title: { ko: "접근성 이슈 수정 전략", en: "Accessibility Remediation Strategies" },
    summary: { ko: "발견된 접근성 이슈의 우선순위 지정과 효과적인 수정 전략을 학습합니다.", en: "Learn how to prioritize and effectively remediate identified accessibility issues." },
    objectives: { ko: [], en: [] }, content: { ko: [], en: [] }, questions: [],
  },
  {
    id: "was-3-2", exam: "was", domain: 3, order: 2, available: false,
    title: { ko: "개발자 모범 사례", en: "Developer Best Practices" },
    summary: { ko: "접근성을 고려한 개발 워크플로우와 QA 모범 사례를 학습합니다.", en: "Learn development workflows and QA best practices that incorporate accessibility." },
    objectives: { ko: [], en: [] }, content: { ko: [], en: [] }, questions: [],
  },
];

export const wasDomains: DomainGroup[] = [
  {
    domain: 1,
    title: { ko: "접근 가능한 웹 솔루션 구축", en: "Creating Accessible Web Solutions" },
    weight: { ko: "40% (~30문항)", en: "40% (~30 questions)" },
    units: units.filter((u) => u.domain === 1),
  },
  {
    domain: 2,
    title: { ko: "테스트 및 평가", en: "Testing and Evaluation" },
    weight: { ko: "30% (~22문항)", en: "30% (~22 questions)" },
    units: units.filter((u) => u.domain === 2),
  },
  {
    domain: 3,
    title: { ko: "개선 및 모범 사례", en: "Remediation and Best Practices" },
    weight: { ko: "30% (~22문항)", en: "30% (~22 questions)" },
    units: units.filter((u) => u.domain === 3),
  },
];

export const wasUnits = units;

export function getWasUnit(id: string): StudyUnit | undefined {
  return units.find((u) => u.id === id);
}

export function getAllWasUnitIds(): string[] {
  return units.map((u) => u.id);
}
