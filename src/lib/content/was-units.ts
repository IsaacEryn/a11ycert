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
		available: true,
		title: { ko: "자동화 접근성 테스트 도구", en: "Automated Accessibility Testing Tools" },
		summary: {
			ko: "axe, WAVE, Lighthouse 등 자동화 도구의 특징과 한계를 학습합니다.",
			en: "Learn about automated tools like axe, WAVE, and Lighthouse, and their limitations.",
		},
		objectives: {
			ko: [
				"주요 자동화 접근성 테스트 도구를 나열할 수 있다",
				"자동화 도구의 한계를 설명할 수 있다",
				"CI/CD 파이프라인에 접근성 테스트를 통합하는 방법을 이해한다",
				"자동화 vs 수동 테스트의 역할 차이를 설명할 수 있다",
			],
			en: [
				"List major automated accessibility testing tools",
				"Explain the limitations of automated tools",
				"Understand how to integrate accessibility testing into CI/CD pipelines",
				"Describe the different roles of automated vs manual testing",
			],
		},
		content: {
			ko: [
				"주요 자동화 도구: axe(Deque Systems) — 브라우저 확장, API, CI 통합 지원. 업계 표준 엔진. WAVE(WebAIM) — 시각적으로 페이지 위에 오류를 표시. 교육적 용도에 적합. Lighthouse(Google) — Chrome DevTools 내장, 접근성 외에 성능·SEO도 점검. Pa11y — 커맨드라인 도구, CI/CD 통합에 강점.",
				"자동화 도구의 한계: 전체 접근성 이슈의 약 30~40%만 발견 가능합니다. 감지 가능: 누락된 alt, 색상 대비 부족, 빈 링크, 중복 ID, 누락 레이블. 감지 불가: alt 텍스트의 적절성, 키보드 탐색 순서의 논리성, 포커스 관리, 콘텐츠의 이해 가능성, 시각적 정보의 논리적 순서.",
				"CI/CD 통합: axe-core를 Jest, Cypress, Playwright 등의 테스트 프레임워크와 통합하여 PR마다 자동 접근성 검사를 실행합니다. 자동화 테스트를 '게이트키퍼'로 사용해 새로운 접근성 문제 유입을 방지하고, 기존 이슈는 수동 감사로 발견합니다.",
				"자동화와 수동 테스트의 상호보완: 자동화 도구는 빠르고 반복 가능한 기술적 검사에 강합니다. 수동 테스트는 사용자 경험, 맥락, 의미론적 정확성을 평가합니다. 최선의 전략은 자동화 → 수동 → 사용자 테스트를 병행하는 것입니다.",
			],
			en: [
				"Major automated tools: axe (Deque Systems) — browser extension, API, CI integration, industry-standard engine. WAVE (WebAIM) — visually overlays errors on the page, great for education. Lighthouse (Google) — built into Chrome DevTools, checks accessibility plus performance and SEO. Pa11y — command-line tool, strong CI/CD integration.",
				"Limitations of automated tools: They can detect only about 30-40% of accessibility issues. Detectable: missing alt, insufficient contrast, empty links, duplicate IDs, missing labels. Not detectable: appropriateness of alt text, logical keyboard navigation order, focus management, content understandability, logical visual reading order.",
				"CI/CD integration: Integrate axe-core with test frameworks like Jest, Cypress, or Playwright to run automated accessibility checks on every PR. Use automated testing as a 'gatekeeper' to prevent new accessibility issues while relying on manual audits for existing ones.",
				"Complementary roles: Automated tools excel at fast, repeatable technical checks. Manual testing evaluates user experience, context, and semantic accuracy. The best strategy combines automated → manual → user testing.",
			],
		},
		questions: [
			{
				id: "was-2-1-q1",
				question: {
					ko: "자동화 접근성 테스트 도구가 감지하기 어려운 것은?",
					en: "What is difficult for automated accessibility testing tools to detect?",
				},
				options: {
					a: { ko: "누락된 alt 속성", en: "Missing alt attributes" },
					b: { ko: "alt 텍스트의 적절성", en: "Appropriateness of alt text" },
					c: { ko: "색상 대비 부족", en: "Insufficient color contrast" },
					d: { ko: "중복 ID", en: "Duplicate IDs" },
				},
				answer: "b",
				explanation: {
					ko: "자동화 도구는 alt 속성의 존재 여부는 확인하지만, 내용이 이미지를 적절히 설명하는지는 판단할 수 없습니다. 이는 수동 검토가 필요합니다.",
					en: "Automated tools can check if alt exists but cannot judge whether the text appropriately describes the image. This requires manual review.",
				},
			},
			{
				id: "was-2-1-q2",
				question: {
					ko: "업계에서 가장 널리 사용되는 접근성 테스트 엔진은?",
					en: "What is the most widely used accessibility testing engine in the industry?",
				},
				options: {
					a: { ko: "WAVE", en: "WAVE" },
					b: { ko: "Pa11y", en: "Pa11y" },
					c: { ko: "axe-core", en: "axe-core" },
					d: { ko: "Lighthouse", en: "Lighthouse" },
				},
				answer: "c",
				explanation: {
					ko: "axe-core(Deque Systems)는 업계 표준 접근성 테스트 엔진으로, 브라우저 확장, API, CI 통합 등 다양한 형태로 사용됩니다. Lighthouse도 내부적으로 axe-core를 사용합니다.",
					en: "axe-core (Deque Systems) is the industry-standard accessibility testing engine, used in browser extensions, APIs, and CI integrations. Lighthouse also uses axe-core internally.",
				},
			},
			{
				id: "was-2-1-q3",
				question: {
					ko: "CI/CD에 접근성 테스트를 통합하는 주요 목적은?",
					en: "What is the main purpose of integrating accessibility testing into CI/CD?",
				},
				options: {
					a: { ko: "배포 속도를 높이기 위해", en: "To increase deployment speed" },
					b: { ko: "새로운 접근성 문제 유입을 방지하기 위해", en: "To prevent new accessibility issues from being introduced" },
					c: { ko: "수동 테스트를 완전히 대체하기 위해", en: "To completely replace manual testing" },
					d: { ko: "사용자 테스트를 자동화하기 위해", en: "To automate user testing" },
				},
				answer: "b",
				explanation: {
					ko: "CI/CD 자동화 테스트는 새로운 코드가 기존 접근성을 해치지 않도록 '게이트키퍼' 역할을 합니다. 수동/사용자 테스트를 대체하지는 않습니다.",
					en: "CI/CD automated testing acts as a 'gatekeeper' to ensure new code doesn't introduce accessibility regressions. It does not replace manual or user testing.",
				},
			},
		],
	},
	{
		id: "was-2-2",
		exam: "was",
		domain: 2,
		order: 2,
		available: true,
		title: { ko: "수동 테스트와 보조기술 테스트", en: "Manual Testing and Assistive Technology Testing" },
		summary: {
			ko: "NVDA, JAWS, VoiceOver를 활용한 보조기술 테스트와 수동 점검 방법론을 학습합니다.",
			en: "Learn manual testing methods and screen reader testing with NVDA, JAWS, and VoiceOver.",
		},
		objectives: {
			ko: [
				"키보드 수동 테스트의 주요 점검 항목을 나열할 수 있다",
				"주요 화면낭독기의 기본 조작법을 이해한다",
				"접근성 수동 테스트 체크리스트를 설명할 수 있다",
				"사용자 테스트의 중요성과 방법을 이해한다",
			],
			en: [
				"List key checkpoints for keyboard manual testing",
				"Understand basic screen reader operation",
				"Describe an accessibility manual testing checklist",
				"Understand the importance and methods of user testing",
			],
		},
		content: {
			ko: [
				"키보드 수동 테스트: Tab으로 모든 인터랙티브 요소에 도달 가능한지, 포커스 순서가 논리적인지, 포커스 표시가 시각적으로 명확한지, Enter/Space로 버튼과 링크가 작동하는지, Esc로 모달/팝업이 닫히는지, 키보드 트랩(빠져나올 수 없는 영역)이 없는지 점검합니다.",
				"화면낭독기 테스트: NVDA(Windows, 무료) — Insert+Space로 탐색/포커스 모드 전환, H로 제목 간 이동, D로 랜드마크 이동. VoiceOver(macOS) — Cmd+F5로 켜기, VO키(Ctrl+Option)+방향키로 탐색. JAWS(Windows, 유료) — Insert+F6으로 제목 목록, Insert+F7로 링크 목록. 테스트 시 모든 정보가 음성으로 전달되는지, 동적 변경 사항이 알림되는지 확인합니다.",
				"수동 테스트 체크리스트(핵심 항목): 모든 이미지에 적절한 대체 텍스트가 있는가, 제목 계층이 논리적인가, 폼 레이블이 올바르게 연결되었는가, 색상만으로 정보를 전달하지 않는가, 확대(200%~400%)해도 콘텐츠가 사용 가능한가, 자동 재생 콘텐츠를 정지할 수 있는가.",
				"사용자 테스트: 실제 장애인 사용자가 참여하는 테스트가 가장 가치 있습니다. 다양한 장애 유형(시각, 청각, 운동, 인지)의 사용자를 포함합니다. 사용자 테스트에서는 자동화/수동 테스트에서 발견할 수 없는 실질적 사용성 문제를 발견할 수 있습니다. 최소 5명 이상의 사용자로 테스트하는 것이 권장됩니다.",
			],
			en: [
				"Keyboard manual testing: Check if Tab reaches all interactive elements, focus order is logical, focus indicators are visually clear, Enter/Space activates buttons and links, Esc closes modals/popups, and there are no keyboard traps (areas users can't escape).",
				"Screen reader testing: NVDA (Windows, free) — Insert+Space toggles browse/focus mode, H for heading navigation, D for landmarks. VoiceOver (macOS) — Cmd+F5 to activate, VO key (Ctrl+Option)+arrows to navigate. JAWS (Windows, commercial) — Insert+F6 for headings, Insert+F7 for links. Verify all information is conveyed via speech and dynamic changes are announced.",
				"Manual testing checklist (key items): All images have appropriate alt text, heading hierarchy is logical, form labels are correctly associated, information is not conveyed by color alone, content remains usable at 200-400% zoom, auto-playing content can be paused.",
				"User testing: Testing with actual users with disabilities is the most valuable approach. Include users with various disability types (visual, auditory, motor, cognitive). User testing reveals real-world usability issues that automated and manual testing cannot find. Testing with at least 5 users is recommended.",
			],
		},
		questions: [
			{
				id: "was-2-2-q1",
				question: {
					ko: "NVDA에서 제목 간 이동에 사용하는 키는?",
					en: "Which key navigates between headings in NVDA?",
				},
				options: {
					a: { ko: "Tab", en: "Tab" },
					b: { ko: "H", en: "H" },
					c: { ko: "D", en: "D" },
					d: { ko: "Enter", en: "Enter" },
				},
				answer: "b",
				explanation: {
					ko: "NVDA 탐색 모드에서 H 키를 누르면 다음 제목으로 이동합니다. D는 랜드마크, Tab은 폼 요소 간 이동입니다.",
					en: "In NVDA browse mode, pressing H moves to the next heading. D navigates to landmarks, and Tab moves between form elements.",
				},
			},
			{
				id: "was-2-2-q2",
				question: {
					ko: "자동화/수동 테스트 외에 사용자 테스트가 중요한 이유는?",
					en: "Why is user testing important beyond automated and manual testing?",
				},
				options: {
					a: { ko: "비용이 가장 저렴하기 때문에", en: "Because it is the cheapest" },
					b: { ko: "실질적 사용성 문제를 발견할 수 있기 때문에", en: "Because it can reveal real-world usability issues" },
					c: { ko: "자동화 도구를 완전히 대체하기 때문에", en: "Because it completely replaces automated tools" },
					d: { ko: "법적으로 필수이기 때문에", en: "Because it is legally required" },
				},
				answer: "b",
				explanation: {
					ko: "사용자 테스트는 실제 장애인 사용자의 관점에서 자동화나 수동 테스트로는 발견할 수 없는 실질적인 사용성 문제를 찾아냅니다.",
					en: "User testing reveals real-world usability issues from the perspective of actual users with disabilities that automated and manual tests cannot find.",
				},
			},
			{
				id: "was-2-2-q3",
				question: {
					ko: "macOS에서 VoiceOver를 켜는 단축키는?",
					en: "What is the keyboard shortcut to activate VoiceOver on macOS?",
				},
				options: {
					a: { ko: "Ctrl+Option+F5", en: "Ctrl+Option+F5" },
					b: { ko: "Cmd+F5", en: "Cmd+F5" },
					c: { ko: "Alt+F5", en: "Alt+F5" },
					d: { ko: "Fn+F5", en: "Fn+F5" },
				},
				answer: "b",
				explanation: {
					ko: "macOS에서 VoiceOver는 Cmd+F5로 켜고 끌 수 있습니다. VoiceOver 실행 후에는 VO키(Ctrl+Option)+방향키로 탐색합니다.",
					en: "VoiceOver on macOS is toggled with Cmd+F5. Once active, navigate using the VO key (Ctrl+Option) combined with arrow keys.",
				},
			},
		],
	},

	// ── Domain 3 ──────────────────────────────────────────────────────────────
	{
		id: "was-3-1",
		exam: "was",
		domain: 3,
		order: 1,
		available: true,
		title: { ko: "접근성 이슈 수정 전략", en: "Accessibility Remediation Strategies" },
		summary: {
			ko: "발견된 접근성 이슈의 우선순위 지정과 효과적인 수정 전략을 학습합니다.",
			en: "Learn how to prioritize and effectively remediate identified accessibility issues.",
		},
		objectives: {
			ko: [
				"접근성 이슈 우선순위 지정 기준을 설명할 수 있다",
				"퀵윈(Quick Win) 수정 항목을 식별할 수 있다",
				"임시 대안(Interim Fix)의 역할을 이해한다",
				"접근성 수정 비용을 줄이는 전략을 설명할 수 있다",
			],
			en: [
				"Explain criteria for prioritizing accessibility issues",
				"Identify Quick Win remediation items",
				"Understand the role of interim fixes",
				"Describe strategies to reduce remediation costs",
			],
		},
		content: {
			ko: [
				"우선순위 지정 기준: WCAG 적합성 수준(A > AA > AAA)이 기본입니다. 영향 범위(많은 사용자에게 영향을 미치는 이슈 우선), 심각도(콘텐츠를 전혀 사용할 수 없는 이슈 우선), 사용 빈도(자주 사용되는 페이지/기능 우선), 법적 리스크(소송 가능성이 높은 이슈 우선)를 종합적으로 고려합니다.",
				"퀵윈(Quick Win) 수정 항목: 누락된 alt 속성 추가, 누락된 폼 레이블 연결, 색상 대비 조정, 빈 링크/버튼에 텍스트 추가, 페이지 언어(lang) 속성 추가, 건너뛰기 링크 추가. 이들은 적은 노력으로 큰 접근성 개선 효과를 얻을 수 있습니다.",
				"임시 대안(Interim Fix): 근본적 수정이 오래 걸리는 경우 임시 대안을 먼저 제공합니다. 예: 접근 불가능한 PDF 대신 접근 가능한 HTML 버전 제공, 접근 불가능한 차트에 데이터 테이블 추가, 접근성 문제를 알리는 연락처 제공. 임시 대안은 근본적 수정을 대체하지 않습니다.",
				"수정 비용 절감 전략: 초기 설계 단계에서 접근성을 고려하면 비용이 가장 적습니다(Shift Left). 출시 후 수정은 초기 대비 30배 이상 비용이 증가할 수 있습니다. 접근 가능한 디자인 시스템과 컴포넌트 라이브러리를 사용하면 반복적 이슈를 방지합니다. 개발자 교육에 투자하면 장기적으로 수정 비용이 감소합니다.",
			],
			en: [
				"Prioritization criteria: WCAG conformance level (A > AA > AAA) is the baseline. Consider impact scope (issues affecting many users first), severity (issues making content completely unusable first), usage frequency (frequently used pages/features first), and legal risk (issues with high litigation potential first).",
				"Quick Win items: Add missing alt attributes, connect missing form labels, adjust color contrast, add text to empty links/buttons, add page language (lang) attribute, add skip links. These provide significant accessibility improvements with minimal effort.",
				"Interim fixes: When fundamental fixes take time, provide temporary alternatives first. Examples: offer an accessible HTML version instead of an inaccessible PDF, add data tables alongside inaccessible charts, provide contact information for accessibility issues. Interim fixes do not replace permanent remediation.",
				"Cost reduction strategies: Considering accessibility from the design stage costs the least (Shift Left). Post-launch fixes can cost 30x more than early-stage integration. Using accessible design systems and component libraries prevents recurring issues. Investing in developer training reduces long-term remediation costs.",
			],
		},
		questions: [
			{
				id: "was-3-1-q1",
				question: {
					ko: "접근성 이슈 우선순위에서 가장 먼저 수정해야 하는 것은?",
					en: "Which accessibility issue should be fixed first?",
				},
				options: {
					a: { ko: "Level AAA 위반", en: "Level AAA violation" },
					b: { ko: "자주 사용되지 않는 페이지의 미미한 이슈", en: "Minor issue on a rarely used page" },
					c: { ko: "주요 기능에서 콘텐츠를 전혀 사용할 수 없는 Level A 위반", en: "Level A violation making core content completely unusable" },
					d: { ko: "시각적으로 불편하지만 기능에는 영향 없는 이슈", en: "Visually inconvenient but functionally unaffected issue" },
				},
				answer: "c",
				explanation: {
					ko: "Level A 위반 중 핵심 기능에서 콘텐츠를 전혀 사용할 수 없게 만드는 이슈가 가장 높은 우선순위입니다.",
					en: "Level A violations that make core content completely unusable have the highest priority.",
				},
			},
			{
				id: "was-3-1-q2",
				question: {
					ko: "접근성 '퀵윈(Quick Win)'에 해당하지 않는 것은?",
					en: "Which is NOT an accessibility Quick Win?",
				},
				options: {
					a: { ko: "누락된 alt 속성 추가", en: "Adding missing alt attributes" },
					b: { ko: "전체 사이트 아키텍처 재설계", en: "Redesigning the entire site architecture" },
					c: { ko: "페이지 lang 속성 추가", en: "Adding page lang attribute" },
					d: { ko: "색상 대비 조정", en: "Adjusting color contrast" },
				},
				answer: "b",
				explanation: {
					ko: "전체 아키텍처 재설계는 대규모 작업입니다. 퀵윈은 alt 추가, 레이블 연결, 대비 조정 등 적은 노력으로 큰 효과를 내는 수정입니다.",
					en: "Full architecture redesign is a major effort. Quick Wins are small-effort, high-impact fixes like adding alt, connecting labels, and adjusting contrast.",
				},
			},
			{
				id: "was-3-1-q3",
				question: {
					ko: "출시 후 접근성 수정 비용은 초기 설계 대비 약 몇 배 증가할 수 있는가?",
					en: "How much more can post-launch accessibility fixes cost compared to early design integration?",
				},
				options: {
					a: { ko: "약 2배", en: "About 2x" },
					b: { ko: "약 5배", en: "About 5x" },
					c: { ko: "약 10배", en: "About 10x" },
					d: { ko: "약 30배 이상", en: "About 30x or more" },
				},
				answer: "d",
				explanation: {
					ko: "출시 후 수정은 초기 설계 단계 대비 30배 이상 비용이 증가할 수 있습니다. Shift Left 전략이 비용 효율적입니다.",
					en: "Post-launch fixes can cost 30x or more compared to early design stage. The Shift Left strategy is the most cost-effective.",
				},
			},
		],
	},
	{
		id: "was-3-2",
		exam: "was",
		domain: 3,
		order: 2,
		available: true,
		title: { ko: "개발자 모범 사례", en: "Developer Best Practices" },
		summary: {
			ko: "접근성을 고려한 개발 워크플로우와 QA 모범 사례를 학습합니다.",
			en: "Learn development workflows and QA best practices that incorporate accessibility.",
		},
		objectives: {
			ko: [
				"접근성을 고려한 코드 리뷰 기준을 설명할 수 있다",
				"접근 가능한 컴포넌트 설계 원칙을 이해한다",
				"프레임워크별 접근성 지원 기능을 나열할 수 있다",
				"접근성 정책 성명서의 구성 요소를 설명할 수 있다",
			],
			en: [
				"Explain accessibility-focused code review criteria",
				"Understand accessible component design principles",
				"List accessibility features in popular frameworks",
				"Describe the components of an accessibility statement",
			],
		},
		content: {
			ko: [
				"접근성 코드 리뷰 기준: 모든 인터랙티브 요소가 키보드로 접근 가능한가, 시맨틱 HTML을 올바르게 사용했는가, 이미지에 적절한 alt가 있는가, 폼 레이블이 연결되었는가, ARIA가 올바르게 사용되었는가(불필요한 ARIA가 없는가), 색상 대비가 충분한가, 포커스 관리가 적절한가를 점검합니다.",
				"접근 가능한 컴포넌트 설계: 시맨틱 HTML을 기반으로 구축합니다. 키보드 상호작용 패턴을 WAI-ARIA Authoring Practices Guide(APG)에 따라 구현합니다. 상태 변경 시 ARIA 상태를 업데이트합니다. 반응형 디자인에서 터치 타겟 크기를 최소 44×44px로 유지합니다(WCAG 2.5.5). 컴포넌트 문서에 접근성 사용법을 포함합니다.",
				"프레임워크 접근성 지원: React — JSX에서 htmlFor(for 대체), aria-* 속성 직접 사용, Fragment로 불필요한 DOM 방지. Next.js — next/image의 alt 필수, next/link의 자동 접근성 처리. Vue — v-bind로 동적 ARIA 속성 바인딩. Angular — CDK a11y 모듈(FocusTrap, LiveAnnouncer). ESLint 플러그인(eslint-plugin-jsx-a11y)으로 정적 분석 강화.",
				"접근성 정책 성명서(Accessibility Statement): WCAG 적합성 수준과 목표를 명시합니다. 알려진 접근성 제한 사항을 솔직하게 공개합니다. 접근성 관련 문의/피드백 연락처를 제공합니다. 최근 접근성 평가일을 명시합니다. 지속적 개선 의지를 표명합니다. EU WAD에서는 접근성 성명서가 법적 필수입니다.",
			],
			en: [
				"Accessibility code review criteria: Are all interactive elements keyboard-accessible? Is semantic HTML used correctly? Do images have appropriate alt? Are form labels connected? Is ARIA used correctly (no unnecessary ARIA)? Is color contrast sufficient? Is focus management proper?",
				"Accessible component design: Build on semantic HTML. Implement keyboard interaction patterns per the WAI-ARIA Authoring Practices Guide (APG). Update ARIA states on state changes. Maintain touch target sizes of at least 44×44px in responsive design (WCAG 2.5.5). Include accessibility usage in component documentation.",
				"Framework accessibility support: React — htmlFor (replacing for in JSX), direct aria-* attributes, Fragment to avoid unnecessary DOM. Next.js — alt required on next/image, automatic accessibility handling in next/link. Vue — v-bind for dynamic ARIA attributes. Angular — CDK a11y module (FocusTrap, LiveAnnouncer). ESLint plugins (eslint-plugin-jsx-a11y) strengthen static analysis.",
				"Accessibility Statement: State the WCAG conformance level and goals. Honestly disclose known accessibility limitations. Provide contact information for accessibility inquiries/feedback. State the date of the last accessibility evaluation. Express commitment to continuous improvement. Under EU WAD, accessibility statements are legally required.",
			],
		},
		questions: [
			{
				id: "was-3-2-q1",
				question: {
					ko: "WAI-ARIA Authoring Practices Guide(APG)의 주요 용도는?",
					en: "What is the primary purpose of the WAI-ARIA Authoring Practices Guide (APG)?",
				},
				options: {
					a: { ko: "HTML 표준을 정의한다", en: "Define HTML standards" },
					b: { ko: "접근 가능한 UI 패턴의 키보드 상호작용과 ARIA 사용법을 안내한다", en: "Guide keyboard interactions and ARIA usage for accessible UI patterns" },
					c: { ko: "브라우저 호환성을 테스트한다", en: "Test browser compatibility" },
					d: { ko: "CSS 스타일 가이드를 제공한다", en: "Provide CSS style guides" },
				},
				answer: "b",
				explanation: {
					ko: "APG는 탭, 아코디언, 모달 등 복잡한 UI 패턴에 대해 올바른 키보드 상호작용과 ARIA 사용법을 제공하는 W3C 가이드입니다.",
					en: "APG is a W3C guide providing correct keyboard interactions and ARIA usage for complex UI patterns like tabs, accordions, and modals.",
				},
			},
			{
				id: "was-3-2-q2",
				question: {
					ko: "WCAG 2.5.5에서 권장하는 최소 터치 타겟 크기는?",
					en: "What is the minimum touch target size recommended by WCAG 2.5.5?",
				},
				options: {
					a: { ko: "24×24px", en: "24×24px" },
					b: { ko: "32×32px", en: "32×32px" },
					c: { ko: "44×44px", en: "44×44px" },
					d: { ko: "48×48px", en: "48×48px" },
				},
				answer: "c",
				explanation: {
					ko: "WCAG 2.5.5(Level AAA)는 터치 타겟 크기를 최소 44×44 CSS 픽셀로 권장합니다. 운동 장애 사용자와 모바일 사용자의 편의를 위해 중요합니다.",
					en: "WCAG 2.5.5 (Level AAA) recommends touch targets of at least 44×44 CSS pixels, important for users with motor disabilities and mobile users.",
				},
			},
			{
				id: "was-3-2-q3",
				question: {
					ko: "접근성 정책 성명서에 반드시 포함해야 하는 항목이 아닌 것은?",
					en: "Which is NOT a required component of an accessibility statement?",
				},
				options: {
					a: { ko: "WCAG 적합성 수준", en: "WCAG conformance level" },
					b: { ko: "접근성 문의 연락처", en: "Contact information for accessibility inquiries" },
					c: { ko: "개발팀의 급여 정보", en: "Development team salary information" },
					d: { ko: "알려진 접근성 제한 사항", en: "Known accessibility limitations" },
				},
				answer: "c",
				explanation: {
					ko: "접근성 성명서에는 적합성 수준, 연락처, 제한 사항, 평가일 등이 포함되지만, 개발팀 급여 정보는 관련이 없습니다.",
					en: "Accessibility statements include conformance level, contact info, limitations, and evaluation date — but development team salary information is irrelevant.",
				},
			},
		],
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
