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
					b: {
						ko: "랜드마크 요소(header, nav, main 등)",
						en: "Landmark elements (header, nav, main, etc.)",
					},
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
				'ARIA의 3가지 핵심 개념: ① 역할(Roles) - 요소의 용도를 정의합니다. 예: role="button", role="dialog", role="tablist", role="alert" ② 속성(Properties) - 요소에 대한 추가 정보를 제공합니다. 예: aria-label="닫기", aria-labelledby="title-id", aria-required="true" ③ 상태(States) - 요소의 현재 상태를 나타냅니다. 예: aria-expanded="true", aria-checked="false", aria-disabled="true"',
				"ARIA 사용의 첫 번째 규칙(First Rule of ARIA Use): '시맨틱 HTML이 동일한 역할을 할 수 있다면 ARIA를 사용하지 않는다.' 예를 들어 `<button>`을 사용할 수 있다면 `<div role=\"button\">`을 사용하지 않아야 합니다.",
				"주요 aria 속성: aria-label(레이블 직접 제공), aria-labelledby(다른 요소의 텍스트를 레이블로 참조), aria-describedby(추가 설명 제공), aria-hidden(보조기술에서 요소 숨기기), aria-required(필수 입력 표시), aria-invalid(유효성 검사 오류 표시).",
				'aria-live 영역: 동적으로 변경되는 콘텐츠(알림, 오류 메시지, 로딩 상태 등)에 사용합니다. aria-live="polite"는 현재 읽기가 끝난 후 알리고, aria-live="assertive"는 현재 읽기를 중단하고 즉시 알립니다. assertive는 중요한 오류나 긴급 알림에만 사용해야 합니다.',
			],
			en: [
				"WAI-ARIA (Web Accessibility Initiative – Accessible Rich Internet Applications) is a W3C standard that supplements semantic HTML to make complex UI patterns accessible.",
				'Three core ARIA concepts: ① Roles – define the purpose of an element (e.g., role="button", role="dialog") ② Properties – provide additional information about an element (e.g., aria-label, aria-required) ③ States – communicate the current condition of an element (e.g., aria-expanded, aria-checked, aria-disabled).',
				"First Rule of ARIA Use: 'If you can use a native HTML element with the semantics you need, don't use ARIA.' For example, use `<button>` instead of `<div role=\"button\">`.",
				"Key aria attributes: aria-label (provide a label directly), aria-labelledby (reference another element as label), aria-describedby (provide additional description), aria-hidden (hide from assistive tech), aria-required (mark required fields), aria-invalid (mark validation errors).",
				'aria-live regions: Used for dynamically updated content (notifications, errors, loading states). aria-live="polite" announces updates after the current speech finishes. aria-live="assertive" interrupts immediately. Use assertive only for critical errors or urgent alerts.',
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
					a: {
						ko: "모든 인터랙티브 요소에 ARIA role을 추가한다",
						en: "Add ARIA roles to all interactive elements",
					},
					b: {
						ko: "시맨틱 HTML이 가능한 경우 ARIA를 사용하지 않는다",
						en: "Do not use ARIA if a native HTML element can provide the same semantics",
					},
					c: {
						ko: "ARIA role은 반드시 div에만 사용한다",
						en: "ARIA roles must only be used on div elements",
					},
					d: {
						ko: "aria-label은 모든 요소에 필수다",
						en: "aria-label is required on all elements",
					},
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
					ko: 'aria-live="polite"는 현재 읽기를 방해하지 않고 끝난 후 알립니다. assertive는 현재 읽기를 중단하고 즉시 알리므로, 긴급 오류에만 사용해야 합니다.',
					en: 'aria-live="polite" waits until the current speech finishes before announcing the update. assertive interrupts immediately and should only be used for critical alerts.',
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
				'Tab 순서와 tabindex: Tab 키로 포커스 가능한 요소(링크, 버튼, 입력 필드)를 순서대로 이동합니다. tabindex="0"은 자연스러운 DOM 순서대로 포커스됩니다. tabindex="-1"은 탭 순서에서 제외되지만, JavaScript로 focus()를 호출하면 포커스 가능합니다(프로그래밍 포커스). tabindex="양수"는 탭 순서를 강제 조정하므로 사용을 피해야 합니다.',
				"포커스 표시(Focus Indicator): 포커스된 요소는 시각적으로 명확하게 표시되어야 합니다(WCAG 2.4.7). CSS `outline: none`으로 포커스 표시를 완전히 제거하면 WCAG 위반입니다. `:focus-visible` 의사 클래스를 사용하면 키보드 사용 시에만 포커스 표시를 보여주고, 마우스 클릭 시에는 숨길 수 있어 시각 디자인과 접근성을 모두 만족합니다.",
				"건너뛰기 링크(Skip Link): 페이지 첫 번째 요소로 '본문으로 바로가기' 링크를 제공합니다. 키보드 사용자가 매번 긴 내비게이션을 Tab으로 거치지 않고 바로 주요 콘텐츠로 이동할 수 있습니다. 일반적으로 평소에는 화면 밖에 숨겼다가 Tab을 누르면 화면에 나타납니다.",
				"포커스 트랩(Focus Trap): 모달 다이얼로그가 열리면 포커스가 모달 내부에만 머물러야 합니다(모달 마지막 요소에서 Tab → 모달 첫 요소로). 모달이 닫히면 모달을 열었던 요소(예: 모달 열기 버튼)로 포커스를 되돌려야 합니다. SPA에서는 라우트 변경 시 포커스를 새 페이지의 주요 제목으로 이동해야 합니다.",
			],
			en: [
				"Keyboard accessibility is essential for users who cannot use a mouse — people with motor disabilities, screen reader users, or those with temporary injuries. All interactive functionality must be accessible and operable via keyboard.",
				'Tab order and tabindex: Tab navigates through focusable elements (links, buttons, inputs) in DOM order. tabindex="0" makes an element focusable in natural DOM order. tabindex="-1" removes from tab order but allows programmatic focus via JavaScript\'s focus() method. Positive tabindex values force a specific tab order and should be avoided.',
				"Focus Indicator: Focused elements must be visually distinguishable (WCAG 2.4.7). Removing focus indicators with `outline: none` violates WCAG. Use `:focus-visible` to show focus indicators only for keyboard users while hiding them for mouse users, satisfying both design and accessibility needs.",
				"Skip Link: Provide a 'Skip to main content' link as the first element on the page. This allows keyboard users to bypass repeated navigation and jump directly to main content. Skip links are typically hidden off-screen and appear on Tab press.",
				"Focus Trap: When a modal dialog opens, focus must be contained within it (Tab from last modal element wraps to first modal element). When the modal closes, focus must return to the element that triggered it (e.g., the button that opened the modal). In SPAs, focus should move to the new page's main heading on route changes.",
			],
		},
		questions: [
			{
				id: "was-1-3-q1",
				question: {
					ko: 'tabindex="-1"의 의미는?',
					en: 'What does tabindex="-1" mean?',
				},
				options: {
					a: {
						ko: "탭 순서에서 제외되고 포커스 자체가 불가능하다",
						en: "Excluded from tab order and cannot receive focus at all",
					},
					b: {
						ko: "탭 순서에서 제외되지만 JavaScript로 포커스 가능하다",
						en: "Excluded from tab order but can receive focus programmatically via JavaScript",
					},
					c: {
						ko: "탭 순서의 첫 번째 요소가 된다",
						en: "Becomes the first element in the tab order",
					},
					d: {
						ko: "탭 순서에서 가장 마지막 요소가 된다",
						en: "Becomes the last element in the tab order",
					},
				},
				answer: "b",
				explanation: {
					ko: 'tabindex="-1"은 Tab 키 탐색에서는 제외되지만, JavaScript의 element.focus()로 프로그래밍 방식으로 포커스할 수 있습니다. 모달의 첫 번째 요소나 동적으로 추가된 콘텐츠에 포커스를 이동할 때 사용합니다.',
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
					a: {
						ko: "모달 뒤의 콘텐츠도 자유롭게 탐색하게 한다",
						en: "Allow navigation to content behind the modal",
					},
					b: {
						ko: "포커스를 모달 내부에 가두어 사용자가 모달에 집중하게 한다",
						en: "Contain focus within the modal so users stay focused on its content",
					},
					c: {
						ko: "모달이 열릴 때 포커스를 페이지 상단으로 이동시킨다",
						en: "Move focus to the top of the page when the modal opens",
					},
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
		id: "was-1-4",
		exam: "was",
		domain: 1,
		order: 4,
		available: true,
		title: { ko: "색상 대비와 시각적 디자인", en: "Color Contrast and Visual Design" },
		summary: {
			ko: "WCAG AA/AAA 색상 대비 기준과 비텍스트 콘텐츠의 대비 요구사항을 학습합니다.",
			en: "Learn WCAG AA/AAA color contrast ratios and requirements for non-text content.",
		},
		objectives: {
			ko: [
				"WCAG Level AA와 AAA의 텍스트 대비 비율을 구분할 수 있다",
				"큰 텍스트의 정의와 대비 기준 차이를 설명할 수 있다",
				"비텍스트 대비(UI 컴포넌트, 그래픽) 요구사항을 이해한다",
				"색상 대비 검사 도구를 나열할 수 있다",
			],
			en: [
				"Distinguish WCAG Level AA and AAA text contrast ratios",
				"Explain the definition of large text and its contrast requirements",
				"Understand non-text contrast requirements for UI components and graphics",
				"List color contrast checking tools",
			],
		},
		content: {
			ko: [
				"WCAG 1.4.3(Level AA) 텍스트 대비 기준: 일반 텍스트는 최소 4.5:1, 큰 텍스트(18pt 이상 또는 14pt 굵은 글씨)는 최소 3:1의 대비 비율이 필요합니다. WCAG 1.4.6(Level AAA)은 일반 텍스트 7:1, 큰 텍스트 4.5:1을 요구합니다.",
				"WCAG 1.4.11 비텍스트 대비(Level AA, WCAG 2.1 신규): UI 컴포넌트(버튼 테두리, 입력 필드, 체크박스 등)와 의미 있는 그래픽 요소(차트, 아이콘 등)는 배경 대비 최소 3:1을 충족해야 합니다. 비활성(disabled) 요소와 순수 장식 요소는 면제됩니다.",
				"색상 대비 검사 도구: WebAIM Contrast Checker(온라인), Colour Contrast Analyser(CCA, 데스크톱), 브라우저 개발자 도구(Chrome DevTools의 색상 피커), axe/WAVE 등 자동화 도구도 대비 검사를 지원합니다. Figma에서는 Stark 플러그인이 널리 사용됩니다.",
				"실무 팁: 회색 텍스트(#999)를 흰 배경(#fff)에 사용하면 대비 비율은 2.85:1로 AA 미달입니다. 최소 #767676(4.54:1) 이상을 사용해야 합니다. 플레이스홀더 텍스트도 대비 기준을 충족해야 하며, 색상만으로 정보를 전달하지 않아야 합니다(WCAG 1.4.1, Use of Color).",
			],
			en: [
				"WCAG 1.4.3 (Level AA) text contrast: Normal text requires at least 4.5:1; large text (18pt+ or 14pt bold) requires at least 3:1. WCAG 1.4.6 (Level AAA) requires 7:1 for normal text and 4.5:1 for large text.",
				"WCAG 1.4.11 Non-text Contrast (Level AA, new in WCAG 2.1): UI components (button borders, input fields, checkboxes) and meaningful graphical objects (charts, icons) need at least 3:1 contrast against their background. Disabled elements and purely decorative elements are exempt.",
				"Contrast checking tools: WebAIM Contrast Checker (online), Colour Contrast Analyser (CCA, desktop), browser DevTools (Chrome's color picker), and automated tools like axe/WAVE also support contrast checking. In Figma, the Stark plugin is widely used.",
				"Practical tip: Gray text (#999) on a white background (#fff) yields only 2.85:1 contrast ratio — failing AA. Use at least #767676 (4.54:1). Placeholder text must also meet contrast requirements. Never convey information through color alone (WCAG 1.4.1, Use of Color).",
			],
		},
		questions: [
			{
				id: "was-1-4-q1",
				question: {
					ko: "WCAG Level AA에서 일반 텍스트의 최소 색상 대비 비율은?",
					en: "What is the minimum color contrast ratio for normal text at WCAG Level AA?",
				},
				options: {
					a: { ko: "3:1", en: "3:1" },
					b: { ko: "4.5:1", en: "4.5:1" },
					c: { ko: "7:1", en: "7:1" },
					d: { ko: "2:1", en: "2:1" },
				},
				answer: "b",
				explanation: {
					ko: "Level AA(1.4.3)에서 일반 텍스트는 4.5:1, 큰 텍스트는 3:1입니다. 7:1은 Level AAA 기준입니다.",
					en: "Level AA (1.4.3) requires 4.5:1 for normal text and 3:1 for large text. 7:1 is the Level AAA standard.",
				},
			},
			{
				id: "was-1-4-q2",
				question: {
					ko: "WCAG 1.4.11 비텍스트 대비 기준에서 면제되는 요소는?",
					en: "Which elements are exempt from WCAG 1.4.11 non-text contrast requirements?",
				},
				options: {
					a: { ko: "버튼 테두리", en: "Button borders" },
					b: { ko: "비활성(disabled) 요소", en: "Disabled elements" },
					c: { ko: "체크박스", en: "Checkboxes" },
					d: { ko: "차트 그래픽", en: "Chart graphics" },
				},
				answer: "b",
				explanation: {
					ko: "비활성(disabled) 요소와 순수 장식 요소는 WCAG 1.4.11 비텍스트 대비 요구사항에서 면제됩니다.",
					en: "Disabled elements and purely decorative elements are exempt from WCAG 1.4.11 non-text contrast requirements.",
				},
			},
			{
				id: "was-1-4-q3",
				question: {
					ko: "큰 텍스트(Large Text)의 WCAG 정의로 옳은 것은?",
					en: "Which is the correct WCAG definition of large text?",
				},
				options: {
					a: { ko: "24pt 이상", en: "24pt or larger" },
					b: { ko: "18pt 이상 또는 14pt 굵은 글씨", en: "18pt or larger, or 14pt bold" },
					c: { ko: "16px 이상", en: "16px or larger" },
					d: { ko: "20pt 이상", en: "20pt or larger" },
				},
				answer: "b",
				explanation: {
					ko: "WCAG에서 큰 텍스트는 18pt(24px) 이상이거나 14pt(약 18.66px) 이상의 굵은(bold) 글씨입니다.",
					en: "In WCAG, large text is defined as 18pt (24px) or larger, or 14pt (approximately 18.66px) or larger when bold.",
				},
			},
		],
	},
	{
		id: "was-1-5",
		exam: "was",
		domain: 1,
		order: 5,
		available: true,
		title: { ko: "폼과 입력 요소 접근성", en: "Form and Input Accessibility" },
		summary: {
			ko: "레이블 연결, 오류 메시지, 필수 입력 표시, fieldset/legend 사용법을 학습합니다.",
			en: "Learn label association, error messages, required fields, and fieldset/legend usage.",
		},
		objectives: {
			ko: [
				"label 요소와 입력 필드를 올바르게 연결할 수 있다",
				"인라인 오류 메시지의 접근성 패턴을 설명할 수 있다",
				"fieldset과 legend의 사용 목적을 이해한다",
				"필수 필드 표시의 접근성 요구사항을 설명할 수 있다",
			],
			en: [
				"Correctly associate label elements with input fields",
				"Explain accessible patterns for inline error messages",
				"Understand the purpose of fieldset and legend",
				"Describe accessibility requirements for marking required fields",
			],
		},
		content: {
			ko: [
				"레이블 연결: 모든 폼 입력 요소에는 연결된 레이블이 있어야 합니다. `<label for=\"id\">`로 명시적 연결하거나, 입력 요소를 `<label>` 안에 감싸는 암시적 연결이 가능합니다. 플레이스홀더만으로는 레이블을 대체할 수 없습니다 — 입력 시작 시 사라지기 때문입니다.",
				"오류 메시지 패턴: 유효성 검사 오류는 오류 필드 근처에 인라인으로 표시하고, aria-describedby로 입력 필드와 연결합니다. aria-invalid=\"true\"로 오류 상태를 명시합니다. 페이지 상단에 오류 요약을 제공하고, 오류 요약이나 첫 오류 필드에 포커스를 이동합니다. 오류 메시지는 문제가 무엇인지와 수정 방법을 모두 설명해야 합니다.",
				"fieldset/legend: 관련된 폼 요소를 그룹화할 때 사용합니다. 대표적 사례: 라디오 버튼 그룹, 체크박스 그룹, 주소 입력 필드 그룹. `<fieldset>`이 그룹 컨테이너, `<legend>`가 그룹의 제목입니다. 스크린리더는 legend 텍스트를 각 입력 필드 앞에 함께 읽어줍니다.",
				"필수 필드: 필수 입력은 시각적 표시(빨간 별표 * 등)와 프로그래밍적 표시(aria-required=\"true\" 또는 required 속성)를 모두 제공해야 합니다. 시각적 표시만 있으면 스크린리더 사용자가 인식할 수 없고, 프로그래밍적 표시만 있으면 시각 사용자가 놓칠 수 있습니다. autocomplete 속성을 사용하면 자동완성을 지원하여 인지 장애 사용자에게 도움됩니다.",
			],
			en: [
				"Label association: Every form input must have an associated label. Use explicit association with `<label for=\"id\">` or implicit association by wrapping the input inside `<label>`. Placeholder text alone cannot substitute for a label — it disappears when typing begins.",
				"Error message patterns: Validation errors should be displayed inline near the error field and connected via aria-describedby. Use aria-invalid=\"true\" to mark the error state. Provide an error summary at the top and move focus to the error summary or first error field. Error messages should explain both what went wrong and how to fix it.",
				"fieldset/legend: Used to group related form elements. Common use cases: radio button groups, checkbox groups, and address field groups. `<fieldset>` is the group container; `<legend>` is the group title. Screen readers read the legend text before each input field within the group.",
				"Required fields: Required inputs need both visual indication (red asterisk *, etc.) and programmatic indication (aria-required=\"true\" or the required attribute). Visual-only marking is invisible to screen reader users; programmatic-only marking may be missed by sighted users. The autocomplete attribute supports autofill, helping users with cognitive disabilities.",
			],
		},
		questions: [
			{
				id: "was-1-5-q1",
				question: {
					ko: "폼 입력 필드의 레이블로 플레이스홀더만 사용하면 안 되는 이유는?",
					en: "Why shouldn't placeholder text be used as the only label for a form input?",
				},
				options: {
					a: { ko: "브라우저 호환성이 낮다", en: "Low browser compatibility" },
					b: { ko: "입력을 시작하면 사라져 참조할 수 없다", en: "It disappears when typing begins and cannot be referenced" },
					c: { ko: "스타일링이 어렵다", en: "It is difficult to style" },
					d: { ko: "색상을 변경할 수 없다", en: "Its color cannot be changed" },
				},
				answer: "b",
				explanation: {
					ko: "플레이스홀더 텍스트는 사용자가 입력을 시작하면 사라지므로, 입력 중간에 필드가 무엇인지 확인할 수 없습니다. 항상 `<label>`을 사용해야 합니다.",
					en: "Placeholder text disappears once the user starts typing, making it impossible to reference what the field is for mid-entry. Always use a `<label>` element.",
				},
			},
			{
				id: "was-1-5-q2",
				question: {
					ko: "라디오 버튼 그룹을 접근성 있게 그룹화하는 올바른 방법은?",
					en: "What is the correct accessible way to group radio buttons?",
				},
				options: {
					a: { ko: "`<div>`와 `<span>`으로 감싼다", en: "Wrap with `<div>` and `<span>`" },
					b: { ko: "`<fieldset>`과 `<legend>`로 감싼다", en: "Wrap with `<fieldset>` and `<legend>`" },
					c: { ko: "`<section>`과 `<h2>`로 감싼다", en: "Wrap with `<section>` and `<h2>`" },
					d: { ko: "각 라디오 버튼에 aria-group을 추가한다", en: "Add aria-group to each radio button" },
				},
				answer: "b",
				explanation: {
					ko: "`<fieldset>`으로 그룹을 감싸고 `<legend>`로 그룹 제목을 제공합니다. 스크린리더는 legend 텍스트를 각 라디오 버튼 앞에 읽어줍니다.",
					en: "Use `<fieldset>` to wrap the group and `<legend>` for the group title. Screen readers read the legend text before each radio button.",
				},
			},
			{
				id: "was-1-5-q3",
				question: {
					ko: "오류 메시지를 입력 필드와 프로그래밍적으로 연결하는 ARIA 속성은?",
					en: "Which ARIA attribute programmatically connects an error message to its input field?",
				},
				options: {
					a: { ko: "aria-label", en: "aria-label" },
					b: { ko: "aria-describedby", en: "aria-describedby" },
					c: { ko: "aria-hidden", en: "aria-hidden" },
					d: { ko: "aria-live", en: "aria-live" },
				},
				answer: "b",
				explanation: {
					ko: "aria-describedby는 오류 메시지 요소의 ID를 참조하여 입력 필드에 추가 설명(오류 내용)을 연결합니다.",
					en: "aria-describedby references the ID of the error message element, connecting additional description (error content) to the input field.",
				},
			},
		],
	},
	{
		id: "was-1-6",
		exam: "was",
		domain: 1,
		order: 6,
		available: true,
		title: { ko: "이미지와 멀티미디어 접근성", en: "Image and Multimedia Accessibility" },
		summary: {
			ko: "장식 이미지 vs 정보 이미지 구분, 자막, 오디오 설명 제공 방법을 학습합니다.",
			en: "Learn how to distinguish decorative vs informative images, and provide captions and audio descriptions.",
		},
		objectives: {
			ko: [
				"장식 이미지와 정보 이미지의 alt 텍스트 차이를 설명할 수 있다",
				"복잡한 이미지(차트, 그래프)의 대체 텍스트 제공 방법을 이해한다",
				"자막과 오디오 설명의 WCAG 요구사항을 설명할 수 있다",
				"SVG 접근성 마크업 방법을 이해한다",
			],
			en: [
				"Explain the difference in alt text for decorative vs informative images",
				"Understand how to provide text alternatives for complex images",
				"Describe WCAG requirements for captions and audio descriptions",
				"Understand SVG accessibility markup methods",
			],
		},
		content: {
			ko: [
				"이미지 접근성의 핵심은 alt 속성입니다(WCAG 1.1.1, Level A). 정보 이미지는 내용을 간결하게 전달하는 alt 텍스트를 제공합니다. 장식 이미지(순수 시각 장식)는 alt=\"\"(빈 alt)로 설정하여 스크린리더가 건너뛰도록 합니다. alt 속성 자체를 생략하면 스크린리더가 파일명을 읽어버립니다.",
				"복잡한 이미지(차트, 그래프, 인포그래픽): 짧은 alt로 이미지를 요약하고, 상세한 데이터는 본문 텍스트, 데이터 테이블, 또는 aria-describedby로 연결된 별도 설명을 제공합니다. 텍스트로 된 이미지(로고 제외)는 가능하면 실제 텍스트를 사용해야 합니다.",
				"비디오 자막: 미리 녹화된 비디오는 자막 필수(WCAG 1.2.2, Level A). 실시간 비디오는 자막 필수(WCAG 1.2.4, Level AA). 오디오 설명(Audio Description)은 시각적으로만 전달되는 정보를 음성으로 설명합니다(WCAG 1.2.5, Level AA). 음성 전용 콘텐츠(팟캐스트)는 텍스트 대본(Transcript)이 필요합니다(WCAG 1.2.1, Level A).",
				"SVG 접근성: `<svg>` 요소에 role=\"img\"를 추가하고, `<title>` 요소로 짧은 설명을, `<desc>` 요소로 긴 설명을 제공합니다. aria-labelledby로 title과 desc를 연결합니다. 장식용 SVG는 aria-hidden=\"true\"로 숨깁니다.",
			],
			en: [
				"The key to image accessibility is the alt attribute (WCAG 1.1.1, Level A). Informative images need concise alt text describing their content. Decorative images (pure visual decoration) use alt=\"\" (empty alt) so screen readers skip them. Omitting the alt attribute entirely causes screen readers to read the filename.",
				"Complex images (charts, graphs, infographics): Provide a short alt summarizing the image, and detailed data through body text, data tables, or a separate description connected via aria-describedby. Images of text (except logos) should use actual text whenever possible.",
				"Video captions: Prerecorded video requires captions (WCAG 1.2.2, Level A). Live video requires captions (WCAG 1.2.4, Level AA). Audio descriptions narrate visually-only conveyed information (WCAG 1.2.5, Level AA). Audio-only content (podcasts) requires a text transcript (WCAG 1.2.1, Level A).",
				"SVG accessibility: Add role=\"img\" to the `<svg>` element, provide a short description with `<title>` and a long description with `<desc>`. Connect them using aria-labelledby. Decorative SVGs should use aria-hidden=\"true\".",
			],
		},
		questions: [
			{
				id: "was-1-6-q1",
				question: {
					ko: "장식 이미지의 올바른 alt 속성 값은?",
					en: "What is the correct alt attribute value for a decorative image?",
				},
				options: {
					a: { ko: "alt=\"장식 이미지\"", en: "alt=\"decorative image\"" },
					b: { ko: "alt=\"\" (빈 문자열)", en: "alt=\"\" (empty string)" },
					c: { ko: "alt 속성을 생략한다", en: "Omit the alt attribute" },
					d: { ko: "alt=\"image\"", en: "alt=\"image\"" },
				},
				answer: "b",
				explanation: {
					ko: "장식 이미지는 alt=\"\"(빈 alt)로 설정하여 스크린리더가 건너뛰도록 합니다. alt 속성을 생략하면 파일명을 읽어버립니다.",
					en: "Decorative images use alt=\"\" so screen readers skip them. Omitting the alt attribute entirely causes the filename to be read aloud.",
				},
			},
			{
				id: "was-1-6-q2",
				question: {
					ko: "미리 녹화된 비디오에 자막을 제공하는 것은 어떤 WCAG 수준의 요구사항인가?",
					en: "At what WCAG level is it required to provide captions for prerecorded video?",
				},
				options: {
					a: { ko: "Level AAA", en: "Level AAA" },
					b: { ko: "Level AA", en: "Level AA" },
					c: { ko: "Level A", en: "Level A" },
					d: { ko: "권고사항(필수 아님)", en: "Advisory (not required)" },
				},
				answer: "c",
				explanation: {
					ko: "미리 녹화된 비디오의 자막은 WCAG 1.2.2 Level A 요구사항으로, 가장 기본적인 접근성 기준입니다.",
					en: "Captions for prerecorded video is a WCAG 1.2.2 Level A requirement — the most basic accessibility standard.",
				},
			},
			{
				id: "was-1-6-q3",
				question: {
					ko: "SVG를 접근성 있게 만들기 위해 사용하는 요소 조합은?",
					en: "Which element combination makes an SVG accessible?",
				},
				options: {
					a: { ko: "alt와 longdesc", en: "alt and longdesc" },
					b: { ko: "role=\"img\", <title>, <desc>", en: "role=\"img\", <title>, <desc>" },
					c: { ko: "aria-label만 사용", en: "aria-label only" },
					d: { ko: "figcaption만 사용", en: "figcaption only" },
				},
				answer: "b",
				explanation: {
					ko: "SVG는 role=\"img\"로 이미지 역할을 명시하고, <title>로 짧은 설명, <desc>로 긴 설명을 제공합니다.",
					en: "SVG uses role=\"img\" to declare image semantics, <title> for a short description, and <desc> for a long description.",
				},
			},
		],
	},

	// ── Domain 2 ──────────────────────────────────────────────────────────────
	{
		id: "was-2-1",
		exam: "was",
		domain: 2,
		order: 1,
		available: false,
		title: { ko: "자동화 접근성 테스트 도구", en: "Automated Accessibility Testing Tools" },
		summary: {
			ko: "axe, WAVE, Lighthouse 등 자동화 도구의 특징과 한계를 학습합니다.",
			en: "Learn about automated tools like axe, WAVE, and Lighthouse, and their limitations.",
		},
		objectives: { ko: [], en: [] },
		content: { ko: [], en: [] },
		questions: [],
	},
	{
		id: "was-2-2",
		exam: "was",
		domain: 2,
		order: 2,
		available: false,
		title: {
			ko: "수동 테스트와 보조기술 테스트",
			en: "Manual Testing and Assistive Technology Testing",
		},
		summary: {
			ko: "NVDA, JAWS, VoiceOver를 활용한 보조기술 테스트와 수동 점검 방법론을 학습합니다.",
			en: "Learn manual testing methods and screen reader testing with NVDA, JAWS, and VoiceOver.",
		},
		objectives: { ko: [], en: [] },
		content: { ko: [], en: [] },
		questions: [],
	},

	// ── Domain 3 ──────────────────────────────────────────────────────────────
	{
		id: "was-3-1",
		exam: "was",
		domain: 3,
		order: 1,
		available: false,
		title: { ko: "접근성 이슈 수정 전략", en: "Accessibility Remediation Strategies" },
		summary: {
			ko: "발견된 접근성 이슈의 우선순위 지정과 효과적인 수정 전략을 학습합니다.",
			en: "Learn how to prioritize and effectively remediate identified accessibility issues.",
		},
		objectives: { ko: [], en: [] },
		content: { ko: [], en: [] },
		questions: [],
	},
	{
		id: "was-3-2",
		exam: "was",
		domain: 3,
		order: 2,
		available: false,
		title: { ko: "개발자 모범 사례", en: "Developer Best Practices" },
		summary: {
			ko: "접근성을 고려한 개발 워크플로우와 QA 모범 사례를 학습합니다.",
			en: "Learn development workflows and QA best practices that incorporate accessibility.",
		},
		objectives: { ko: [], en: [] },
		content: { ko: [], en: [] },
		questions: [],
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
