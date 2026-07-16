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
		content: { ko: [], en: [] },
		sections: [
			{
				heading: { ko: "시맨틱 HTML이 접근성의 기반인 이유", en: "Why Semantic HTML Is the Foundation" },
				paragraphs: {
					ko: [
						"시맨틱 HTML이란 태그의 시각적 표현이 아닌 의미와 역할에 맞는 HTML 요소를 사용하는 것입니다. 브라우저는 마크업에서 접근성 트리(Accessibility Tree)를 생성해 각 요소의 이름(name), 역할(role), 상태(state), 값(value)을 보조기술에 전달합니다 — 시맨틱 요소를 쓰면 이 정보가 공짜로 제공됩니다.",
						"`<div>`로 만든 버튼과 `<button>`의 차이를 생각해보세요. `<button>`은 키보드 포커스, Enter/Space 활성화, '버튼' 역할 낭독, 폼 제출 동작을 기본 제공합니다. `<div onclick>`은 이 모든 것을 JavaScript와 ARIA로 재구현해야 하고, 하나라도 빠뜨리면 접근성 결함이 됩니다. '기본 요소를 쓸 수 있으면 쓴다'가 WAS 전체를 관통하는 원칙입니다.",
					],
					en: [
						"Semantic HTML means choosing elements by meaning and role, not visual appearance. The browser derives an Accessibility Tree from markup, exposing each element's name, role, state, and value to assistive technologies — semantic elements provide this information for free.",
						"Compare a `<div>` styled as a button with a real `<button>`: the `<button>` gives you keyboard focus, Enter/Space activation, a 'button' role announcement, and form submission behavior out of the box. A `<div onclick>` requires re-implementing all of that with JavaScript and ARIA — and every omission is an accessibility defect. 'Use the native element when you can' is the principle running through all of WAS.",
					],
				},
			},
			{
				heading: { ko: "랜드마크로 페이지 구조 만들기", en: "Structuring Pages with Landmarks" },
				paragraphs: {
					ko: [
						"HTML5 랜드마크 요소는 페이지의 주요 영역을 정의합니다: `<header>`(배너), `<nav>`(내비게이션), `<main>`(주요 콘텐츠, 페이지당 하나), `<article>`(독립 콘텐츠), `<section>`(주제별 그룹), `<aside>`(부가 정보), `<footer>`(콘텐츠 정보). 스크린리더 사용자는 랜드마크 단축키로 영역 간을 빠르게 이동합니다.",
						"실무 요령: 같은 유형의 랜드마크가 여러 개면 aria-label로 구분합니다(예: `<nav aria-label=\"주 메뉴\">`와 `<nav aria-label=\"페이지 내 목차\">`). 모든 콘텐츠는 어떤 랜드마크 안에든 속하는 것이 좋고, `<section>`은 접근 가능한 이름(aria-label/aria-labelledby)이 있을 때만 region 랜드마크로 노출됩니다.",
					],
					en: [
						"HTML5 landmark elements define the page's major regions: `<header>` (banner), `<nav>`, `<main>` (one per page), `<article>`, `<section>`, `<aside>`, and `<footer>` (contentinfo). Screen reader users jump between regions with landmark shortcuts.",
						"Practical tips: when multiple landmarks of the same type exist, distinguish them with aria-label (e.g., `<nav aria-label=\"Main menu\">` vs `<nav aria-label=\"Table of contents\">`). Ideally all content lives inside some landmark, and note that `<section>` is exposed as a region landmark only when it has an accessible name (aria-label/aria-labelledby).",
					],
				},
			},
			{
				heading: { ko: "제목 계층 구조", en: "Heading Hierarchy" },
				paragraphs: {
					ko: [
						"`<h1>`은 페이지당 하나의 주요 제목으로 사용하고, `<h2>`~`<h6>`은 계층 순서대로 사용합니다. 레벨을 건너뛰면 안 됩니다(h1 → h3 금지). 제목은 시각적 크기가 아니라 콘텐츠의 논리적 구조를 나타내야 하며, 크기 조정은 CSS로 합니다.",
						"제목이 중요한 이유: 설문조사에서 스크린리더 사용자가 가장 많이 쓰는 페이지 탐색 방법이 제목 이동(H 키)입니다. 굵은 텍스트를 제목처럼 보이게 스타일링한 가짜 제목은 이 탐색에서 완전히 누락됩니다. 반대로 시각적 강조 목적으로 아무 데나 h 태그를 쓰면 구조가 왜곡됩니다.",
					],
					en: [
						"Use `<h1>` as the single main heading per page, then `<h2>`–`<h6>` in order — never skip levels (no h1 → h3). Headings express the logical structure of content, not visual size; adjust size with CSS.",
						"Why headings matter: surveys consistently find heading navigation (the H key) is screen reader users' most-used way to explore pages. Fake headings — bold text styled to look like headings — are entirely invisible to that navigation. Conversely, using h tags anywhere just for visual emphasis distorts the structure.",
					],
				},
			},
			{
				heading: { ko: "인터랙티브 요소와 리스트", en: "Interactive Elements and Lists" },
				paragraphs: {
					ko: [
						"인터랙티브 요소 선택 기준: 동작 실행은 `<button>`, 페이지·위치 이동은 `<a href>`, 데이터 입력은 `<input>`, 선택 목록은 `<select>`. 링크와 버튼의 구분은 시험 단골입니다 — '어디로 가는가'는 링크, '무엇을 하는가'는 버튼입니다. href 없는 `<a>`는 키보드 포커스를 받지 못한다는 점도 주의하세요.",
						"리스트 요소: 순서 없는 목록 `<ul>`, 순서 있는 목록 `<ol>`, 용어-설명 쌍은 `<dl>`. 스크린리더는 '목록, 3개 항목'처럼 항목 수와 현재 위치를 알려주므로, 시각적으로만 목록처럼 배치한 `<div>` 나열과 실제 목록 마크업은 사용 경험이 완전히 다릅니다.",
					],
					en: [
						"Choosing interactive elements: `<button>` for actions, `<a href>` for navigation, `<input>` for data entry, `<select>` for selection lists. The link-versus-button distinction is a favorite exam topic — 'where does it go' is a link; 'what does it do' is a button. Also note that an `<a>` without href cannot receive keyboard focus.",
						"Lists: `<ul>` for unordered, `<ol>` for ordered, `<dl>` for term–description pairs. Screen readers announce 'list, 3 items' and your position within it — so a stack of `<div>`s that merely looks like a list is a completely different experience from real list markup.",
					],
				},
			},
		],
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
		content: { ko: [], en: [] },
		sections: [
			{
				heading: { ko: "ARIA란 무엇이고 무엇이 아닌가", en: "What ARIA Is — and Isn't" },
				paragraphs: {
					ko: [
						"WAI-ARIA(Accessible Rich Internet Applications)는 시맨틱 HTML만으로 표현하기 어려운 복잡한 UI 패턴(탭, 트리, 콤보박스, 라이브 영역 등)의 의미를 보조기술에 전달하는 W3C 표준입니다. ARIA는 접근성 트리에 노출되는 이름·역할·상태 정보를 바꿉니다.",
						"중요한 한계: ARIA는 의미만 바꿀 뿐 동작을 만들지 않습니다. `role=\"button\"`을 붙여도 키보드 포커스나 Enter/Space 활성화는 생기지 않으며, 개발자가 tabindex와 키 이벤트를 직접 구현해야 합니다. 'ARIA는 약속이다 — 역할을 선언했으면 그 역할답게 동작하게 만들 책임이 따라온다'는 관점이 중요합니다. 잘못 쓴 ARIA는 없느니만 못합니다(No ARIA is better than bad ARIA).",
					],
					en: [
						"WAI-ARIA (Accessible Rich Internet Applications) is the W3C standard for conveying the semantics of complex UI patterns — tabs, trees, comboboxes, live regions — that semantic HTML alone cannot express. ARIA changes the name, role, and state information exposed in the accessibility tree.",
						"A critical limitation: ARIA changes semantics only — it creates no behavior. Adding `role=\"button\"` provides no keyboard focus and no Enter/Space activation; the developer must implement tabindex and key handling. Think of ARIA as a promise: declaring a role obligates you to make the element behave like that role. Badly used ARIA is worse than none — 'No ARIA is better than bad ARIA.'",
					],
				},
			},
			{
				heading: { ko: "역할·속성·상태", en: "Roles, Properties, and States" },
				paragraphs: {
					ko: [
						'ARIA의 3가지 핵심 개념: ① 역할(Roles) — 요소의 용도를 정의합니다(role="button", role="dialog", role="tablist", role="alert"). ② 속성(Properties) — 비교적 고정적인 추가 정보를 제공합니다(aria-label, aria-labelledby, aria-required). ③ 상태(States) — 상호작용에 따라 변하는 현재 조건을 나타냅니다(aria-expanded, aria-checked, aria-selected, aria-disabled).',
						"속성과 상태의 구분 요령: 상태는 사용자 상호작용으로 자주 바뀌고(아코디언 열림/닫힘), 속성은 잘 바뀌지 않습니다(필수 여부). 상태를 선언했다면 JavaScript로 실제 상태 변화에 맞춰 값을 갱신해야 합니다 — aria-expanded를 true로 박아두고 갱신하지 않는 것이 흔한 결함입니다.",
					],
					en: [
						'Three core ARIA concepts: ① Roles define an element\'s purpose (role="button", role="dialog", role="tablist", role="alert"). ② Properties provide relatively fixed additional information (aria-label, aria-labelledby, aria-required). ③ States express current conditions that change with interaction (aria-expanded, aria-checked, aria-selected, aria-disabled).',
						"Telling properties from states: states change frequently through interaction (accordion open/closed); properties rarely change (whether a field is required). If you declare a state, you must update it with JavaScript as the real state changes — hardcoding aria-expanded=\"true\" and never updating it is a classic defect.",
					],
				},
			},
			{
				heading: { ko: "ARIA 사용의 다섯 규칙", en: "The Five Rules of ARIA Use" },
				paragraphs: {
					ko: [
						"W3C가 정리한 ARIA 사용 규칙: ① 시맨틱 HTML로 가능하면 ARIA를 쓰지 않는다(제1규칙 — `<button>` 대신 `<div role=\"button\">` 금지). ② 꼭 필요한 경우가 아니면 기본 시맨틱을 바꾸지 않는다(예: `<h2 role=\"tab\">` 지양, 탭 안에 h2를 넣는 방식 선호). ③ 모든 인터랙티브 ARIA 컨트롤은 키보드로 사용 가능해야 한다.",
						'④ 포커스 가능한 요소에 role="presentation"이나 aria-hidden="true"를 쓰지 않는다 — 포커스는 되는데 아무것도 낭독되지 않는 "유령 요소"가 됩니다. ⑤ 모든 인터랙티브 요소에는 접근 가능한 이름(accessible name)이 있어야 한다. 이 다섯 규칙은 ARIA 결함의 대부분을 예방합니다.',
					],
					en: [
						"The W3C's rules of ARIA use: ① Don't use ARIA if native HTML can do it (the First Rule — `<button>` over `<div role=\"button\">`). ② Don't change native semantics unless you truly must (avoid `<h2 role=\"tab\">`; prefer a heading inside the tab). ③ All interactive ARIA controls must be keyboard-usable.",
						'④ Never put role="presentation" or aria-hidden="true" on a focusable element — you create a \'ghost\': focusable but announcing nothing. ⑤ Every interactive element needs an accessible name. These five rules prevent most ARIA defects.',
					],
				},
			},
			{
				heading: { ko: "이름 계산과 주요 속성", en: "Name Computation and Key Attributes" },
				paragraphs: {
					ko: [
						"접근 가능한 이름(accessible name)은 우선순위에 따라 계산됩니다: aria-labelledby > aria-label > 네이티브 라벨(`<label>`, alt, `<caption>`) > 콘텐츠 텍스트. aria-labelledby는 다른 요소의 텍스트를 참조하고(여러 id 나열 가능), aria-label은 문자열을 직접 제공하며, aria-describedby는 이름이 아닌 보조 설명을 연결합니다.",
						'그 밖의 주요 속성: aria-hidden="true"(보조기술에서 서브트리 숨김 — 시각적으로는 보임), aria-required(필수 입력), aria-invalid(유효성 오류), aria-current(현재 페이지/단계 표시). aria-label은 보이는 텍스트가 없는 아이콘 버튼 등에 쓰되, 보이는 라벨이 있으면 그 라벨을 이름에 포함해야 합니다(WCAG 2.5.3 Label in Name — 음성 제어 사용자).',
					],
					en: [
						"The accessible name is computed by priority: aria-labelledby > aria-label > native labeling (`<label>`, alt, `<caption>`) > content text. aria-labelledby references other elements' text (multiple ids allowed); aria-label supplies a string directly; aria-describedby attaches supplementary description — not the name.",
						'Other key attributes: aria-hidden="true" (hides a subtree from AT while remaining visible), aria-required, aria-invalid, and aria-current (current page/step). Use aria-label for controls with no visible text, such as icon buttons — but when a visible label exists, it must be contained in the name (WCAG 2.5.3 Label in Name, for voice control users).',
					],
				},
				codeExamples: [
					{
						caption: { ko: "아이콘 버튼의 접근 가능한 이름 — 잘못된 예와 올바른 예", en: "Accessible name for an icon button — wrong vs. right" },
						lang: "html",
						code: `<!-- ❌ 이름 없는 아이콘 버튼: 스크린 리더는 "버튼"으로만 읽음 -->
<button><svg aria-hidden="true">…</svg></button>

<!-- ✅ aria-label로 이름 제공 (보이는 라벨이 있으면 그 텍스트를 포함할 것) -->
<button aria-label="검색">
  <svg aria-hidden="true">…</svg>
</button>`,
					},
					{
						caption: { ko: "aria-labelledby로 이름, aria-describedby로 보조 설명 연결", en: "Name via aria-labelledby, supplementary hint via aria-describedby" },
						lang: "html",
						code: `<h2 id="ship-title">배송지 주소</h2>
<p id="ship-hint">도로명 주소를 입력하세요.</p>
<input aria-labelledby="ship-title" aria-describedby="ship-hint">`,
					},
				],
			},
			{
				heading: { ko: "라이브 영역", en: "Live Regions" },
				paragraphs: {
					ko: [
						'aria-live 영역은 동적으로 변경되는 콘텐츠(알림, 오류 메시지, 로딩 상태, 검색 결과 수)를 스크린리더가 자동으로 낭독하게 합니다. aria-live="polite"는 현재 낭독이 끝난 후 알리고, aria-live="assertive"는 즉시 중단하고 알립니다. assertive는 긴급 오류에만 사용하세요.',
						'관련 역할: role="status"는 polite 라이브 영역, role="alert"는 assertive 라이브 영역과 동등합니다. 실무 요령: 라이브 영역은 페이지 로드 시점부터 DOM에 존재해야 안정적으로 동작하며(내용만 갱신), 요소 자체를 동적으로 삽입하면 낭독이 누락될 수 있습니다.',
					],
					en: [
						'aria-live regions make screen readers announce dynamically changing content — notifications, error messages, loading states, result counts. aria-live="polite" waits for current speech to finish; aria-live="assertive" interrupts immediately. Reserve assertive for critical errors.',
						'Related roles: role="status" is equivalent to a polite live region and role="alert" to an assertive one. Practical tip: live regions work reliably when the container exists in the DOM from page load and only its content updates — inserting the region element itself dynamically often drops announcements.',
					],
				},
				codeExamples: [
					{
						caption: { ko: "상태 알림은 polite, 긴급 오류만 alert", en: "Use polite status for updates; reserve alert for urgent errors" },
						lang: "html",
						code: `<!-- 폼 저장 결과 — 현재 낭독을 방해하지 않고 안내 -->
<div role="status" aria-live="polite">저장되었습니다.</div>

<!-- 긴급 오류 — assertive(role=alert)는 꼭 필요할 때만 -->
<div role="alert">세션이 만료되었습니다. 다시 로그인해주세요.</div>`,
					},
				],
			},
		],
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
		content: { ko: [], en: [] },
		sections: [
			{
				heading: { ko: "키보드 접근성의 원칙", en: "Principles of Keyboard Accessibility" },
				paragraphs: {
					ko: [
						"키보드 접근성은 마우스를 사용할 수 없는 사용자(운동 장애, 화면낭독기 사용자, 임시 부상자)에게 필수이며, 스위치·음성 제어 같은 보조기술도 내부적으로 키보드 인터페이스를 사용합니다. 모든 인터랙티브 기능은 키보드로 접근·조작할 수 있어야 하고(WCAG 2.1.1, Level A), 들어간 곳에서 빠져나올 수 있어야 합니다(2.1.2 키보드 트랩 없음).",
						"기본 키 관례: Tab/Shift+Tab으로 컨트롤 간 이동, Enter로 링크·버튼 활성화, Space로 버튼·체크박스 토글, 화살표 키로 라디오 그룹·탭·메뉴 같은 복합 위젯 내부 이동, Esc로 모달·메뉴 닫기. 커스텀 위젯을 만들면 이 관례를 그대로 구현해야 사용자의 기대와 일치합니다.",
					],
					en: [
						"Keyboard accessibility is essential for users who cannot use a mouse — motor disabilities, screen reader users, temporary injuries — and assistive technologies like switches and voice control operate through the keyboard interface internally. All interactive functionality must be keyboard accessible (WCAG 2.1.1, Level A), and users must be able to leave anything they enter (2.1.2 No Keyboard Trap).",
						"Core key conventions: Tab/Shift+Tab move between controls; Enter activates links and buttons; Space toggles buttons and checkboxes; arrow keys move within composite widgets (radio groups, tabs, menus); Esc closes modals and menus. Custom widgets must implement these conventions to match user expectations.",
					],
				},
			},
			{
				heading: { ko: "Tab 순서와 tabindex", en: "Tab Order and tabindex" },
				paragraphs: {
					ko: [
						'Tab 키는 포커스 가능한 요소(링크, 버튼, 입력 필드)를 DOM 순서대로 이동합니다. tabindex="0"은 원래 포커스 불가능한 요소를 자연스러운 DOM 순서에 넣고, tabindex="-1"은 탭 순서에서 제외하되 JavaScript focus()로는 포커스 가능하게 합니다(프로그래밍 포커스 — 모달 진입, SPA 헤딩 포커스 등에 사용).',
						'양수 tabindex는 탭 순서를 DOM과 다르게 강제하므로 피해야 합니다 — 유지보수가 어렵고 예측 불가능한 순서를 만듭니다. 근본 해결은 DOM 순서 자체를 논리적으로 배치하는 것입니다. 포커스 순서는 의미와 조작 순서에 맞아야 한다는 것이 WCAG 2.4.3(포커스 순서)의 요구입니다. CSS로 시각 순서만 바꾸면(flex order 등) 시각과 포커스 순서가 어긋나는 결함이 생깁니다.',
					],
					en: [
						'Tab moves through focusable elements (links, buttons, inputs) in DOM order. tabindex="0" adds a normally unfocusable element into the natural order; tabindex="-1" removes an element from the tab order while allowing programmatic focus() — used for modal entry and SPA heading focus.',
						"Avoid positive tabindex values: they force an order different from the DOM, are hard to maintain, and create unpredictable sequences. The real fix is arranging the DOM logically. WCAG 2.4.3 (Focus Order) requires focus order to match meaning and operation — reordering only visually with CSS (flex order) creates a mismatch defect between visual and focus order.",
					],
				},
			},
			{
				heading: { ko: "포커스 표시와 건너뛰기 링크", en: "Focus Indicators and Skip Links" },
				paragraphs: {
					ko: [
						"포커스된 요소는 시각적으로 명확히 표시되어야 합니다(WCAG 2.4.7 가시적 포커스, Level AA). CSS `outline: none`으로 포커스 표시를 제거하고 대안을 주지 않으면 위반입니다. `:focus-visible` 의사 클래스를 쓰면 키보드 사용 시에만 표시하고 마우스 클릭 시엔 숨길 수 있어 디자인과 접근성을 함께 만족합니다. WCAG 2.2는 포커스된 요소가 다른 콘텐츠에 가려지지 않을 것(2.4.11 포커스 가림 방지)도 요구합니다.",
						"건너뛰기 링크(Skip Link)는 페이지 첫 요소로 '본문으로 바로가기'를 제공해, 키보드 사용자가 반복되는 내비게이션을 건너뛰고 주요 콘텐츠로 즉시 이동하게 합니다(WCAG 2.4.1 블록 건너뛰기, Level A). 평소엔 화면 밖에 숨겼다가 포커스를 받으면 나타나는 패턴이 일반적이며, 대상(`#main-content`)이 tabindex=\"-1\"로 포커스를 받을 수 있어야 완성됩니다.",
					],
					en: [
						"Focused elements must be clearly visible (WCAG 2.4.7 Focus Visible, Level AA). Removing indicators with `outline: none` without an alternative is a violation. The `:focus-visible` pseudo-class shows indicators for keyboard use while hiding them on mouse clicks — satisfying both design and accessibility. WCAG 2.2 adds that the focused element must not be hidden by other content (2.4.11 Focus Not Obscured).",
						"A skip link — 'Skip to main content' as the first element — lets keyboard users bypass repeated navigation (WCAG 2.4.1 Bypass Blocks, Level A). The common pattern hides it off-screen until focused; it's complete only when the target (`#main-content`) can receive focus via tabindex=\"-1\".",
					],
				},
			},
			{
				heading: { ko: "포커스 관리 — 모달과 SPA", en: "Focus Management — Modals and SPAs" },
				paragraphs: {
					ko: [
						"모달 다이얼로그가 열리면: 포커스를 모달 안으로 이동시키고, 포커스가 모달 내부에만 머물게 하며(마지막 요소에서 Tab → 첫 요소로 순환), 배경 콘텐츠는 inert 처리하고, Esc로 닫을 수 있어야 합니다. 모달이 닫히면 모달을 열었던 트리거 요소로 포커스를 되돌립니다. 네이티브 `<dialog>` 요소의 showModal()은 이 중 상당 부분을 기본 제공합니다.",
						"SPA(단일 페이지 앱)에서는 라우트가 바뀌어도 전체 페이지가 새로 로드되지 않아 포커스와 낭독이 이전 상태에 머뭅니다. 라우트 변경 시 새 화면의 주요 제목(h1)에 tabindex=\"-1\"을 주고 포커스를 이동시키거나, 라이브 영역으로 페이지 전환을 알리는 패턴이 필요합니다. 동적으로 나타나는 콘텐츠(알림, 삭제 후 목록)도 포커스가 허공에 남지 않게 관리해야 합니다.",
					],
					en: [
						"When a modal opens: move focus into it, contain focus inside (Tab from the last element wraps to the first), make the background inert, and support Esc to close. When it closes, return focus to the trigger element. The native `<dialog>` element's showModal() provides much of this for free.",
						"In an SPA, route changes don't reload the page, so focus and announcements linger in the previous state. On route change, give the new screen's main heading tabindex=\"-1\" and move focus to it, or announce the transition via a live region. Dynamic content (toasts, lists after deletion) also needs focus management so focus never dangles on removed elements.",
					],
				},
				codeExamples: [
					{
						caption: { ko: "모달 포커스 관리 — 열 때 이동, 닫을 때 반환", en: "Modal focus management — move on open, restore on close" },
						lang: "js",
						code: `// 열기: 트리거를 기억하고 모달 안 첫 포커서블로 이동
const opener = document.activeElement;
dialog.showModal();
dialog.querySelector("button, [href], input")?.focus();

// 닫기: 원래 트리거로 포커스 반환 (사용자가 길을 잃지 않도록)
dialog.addEventListener("close", () => opener.focus());`,
					},
				],
			},
		],
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
		content: { ko: [], en: [] },
		sections: [
			{
				heading: { ko: "텍스트 대비 기준", en: "Text Contrast Requirements" },
				paragraphs: {
					ko: [
						"WCAG 1.4.3(Level AA): 일반 텍스트는 최소 4.5:1, 큰 텍스트는 최소 3:1의 명도 대비가 필요합니다. 큰 텍스트의 정의는 18pt(약 24px) 이상, 또는 14pt(약 18.66px) 이상의 굵은 글씨입니다. WCAG 1.4.6(Level AAA)은 일반 7:1, 큰 텍스트 4.5:1을 요구합니다.",
						"대비 비율은 색상(hue)이 아닌 상대 휘도(relative luminance)로 계산되며 1:1(동일)부터 21:1(흑백)까지입니다. 로고와 비활성 상태의 텍스트, 순수 장식 텍스트는 예외입니다. 배경이 이미지나 그라데이션이면 텍스트가 겹치는 가장 불리한 지점을 기준으로 판단합니다.",
					],
					en: [
						"WCAG 1.4.3 (Level AA): normal text needs at least 4.5:1 luminance contrast; large text at least 3:1. Large text is defined as 18pt (~24px) or larger, or 14pt (~18.66px) or larger when bold. WCAG 1.4.6 (Level AAA) requires 7:1 and 4.5:1 respectively.",
						"Contrast ratio is computed from relative luminance, not hue, and ranges from 1:1 (identical) to 21:1 (black on white). Logos, text in disabled states, and purely decorative text are exempt. Over images or gradients, judge against the worst-case point where the text overlaps.",
					],
				},
			},
			{
				heading: { ko: "비텍스트 대비", en: "Non-text Contrast" },
				paragraphs: {
					ko: [
						"WCAG 1.4.11 비텍스트 대비(Level AA, 2.1 신규): UI 컴포넌트(버튼·입력 필드의 경계, 체크박스, 포커스 표시)와 의미 전달에 필요한 그래픽 요소(차트 선, 아이콘)는 인접 색과 최소 3:1 대비가 필요합니다. 비활성 요소와 순수 장식은 면제됩니다.",
						"자주 걸리는 사례: 옅은 회색 테두리의 입력 필드(어디까지가 입력 영역인지 저시력 사용자가 알 수 없음), 배경과 구분되지 않는 토글 스위치, 컬러 코드에만 의존하는 라인 차트. 상태 변화(선택됨·포커스됨)를 나타내는 시각 표시 자체도 3:1을 충족해야 합니다.",
					],
					en: [
						"WCAG 1.4.11 Non-text Contrast (Level AA, new in 2.1): UI components (button and input boundaries, checkboxes, focus indicators) and graphics required to understand content (chart lines, icons) need at least 3:1 contrast against adjacent colors. Disabled elements and pure decoration are exempt.",
						"Common failures: input fields with pale gray borders (low-vision users can't tell where the field is), toggle switches indistinguishable from the background, and line charts relying on color coding alone. Visual indicators of state (selected, focused) must themselves meet 3:1.",
					],
				},
			},
			{
				heading: { ko: "검사 도구와 실무 팁", en: "Tools and Practical Tips" },
				paragraphs: {
					ko: [
						"대비 검사 도구: WebAIM Contrast Checker(온라인), Colour Contrast Analyser(CCA, 데스크톱 — 스포이드로 화면 어디든 측정), Chrome DevTools 색상 피커(AA/AAA 표시), axe·WAVE 같은 자동화 도구, Figma의 Stark 플러그인. 대비는 자동 검사가 가장 잘 잡는 항목이지만, 이미지 위 텍스트·그라데이션은 수동 확인이 필요합니다.",
						"실무 팁: 흰 배경의 회색 텍스트 #999는 2.85:1로 AA 미달 — 최소 #767676(4.54:1)을 쓰세요. 플레이스홀더 텍스트도 대비 기준 적용 대상입니다. 색상만으로 정보를 전달하지 마세요(WCAG 1.4.1) — 오류를 빨간 테두리로만 표시하지 말고 아이콘·텍스트를 병행합니다. 다크 모드는 별도 팔레트로 다시 검증해야 합니다.",
					],
					en: [
						"Contrast tools: WebAIM Contrast Checker (online), Colour Contrast Analyser (CCA, desktop — eyedropper measures anywhere on screen), Chrome DevTools color picker (AA/AAA indicators), automated tools like axe and WAVE, and the Stark plugin in Figma. Contrast is what automation catches best, but text over images and gradients still needs manual checks.",
						"Practical tips: gray #999 on white is 2.85:1 — an AA failure; use at least #767676 (4.54:1). Placeholder text is subject to contrast requirements too. Never convey information by color alone (WCAG 1.4.1) — pair error states with icons and text, not just a red border. Dark mode is a separate palette that must be re-verified.",
					],
				},
			},
		],
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
		content: { ko: [], en: [] },
		sections: [
			{
				heading: { ko: "레이블 — 폼 접근성의 출발점", en: "Labels — Where Form Accessibility Starts" },
				paragraphs: {
					ko: [
						"모든 폼 입력 요소에는 연결된 레이블이 있어야 합니다. `<label for=\"id\">`로 명시적으로 연결하거나, 입력 요소를 `<label>` 안에 감싸 암시적으로 연결합니다. 명시적 연결이 보조기술 호환성이 더 좋아 권장됩니다. 레이블 연결의 부수 효과로 레이블 클릭 시 입력에 포커스가 가는 큰 터치 영역도 생깁니다.",
						"플레이스홀더만으로는 레이블을 대체할 수 없습니다 — 입력을 시작하면 사라져 참조할 수 없고, 기본 색은 대비 기준에도 미달하기 쉽습니다. 시각적으로 레이블을 숨겨야 하는 디자인이라면(검색창 등) sr-only 클래스나 aria-label을 사용하되, 보이는 텍스트가 있다면 접근 가능한 이름에 포함시켜야 합니다(2.5.3).",
					],
					en: [
						"Every form input needs an associated label. Associate explicitly with `<label for=\"id\">` or implicitly by wrapping the input inside `<label>`. Explicit association has better AT compatibility and is preferred. A bonus: clicking the label focuses the input, creating a larger touch target.",
						"Placeholder text cannot substitute for a label — it disappears when typing begins and its default color often fails contrast. If the design must hide the label visually (e.g., a search box), use an sr-only class or aria-label — and any visible text must be contained in the accessible name (2.5.3).",
					],
				},
				codeExamples: [
					{
						caption: { ko: "placeholder는 레이블이 아니다 — label 연결과 오류 통지", en: "Placeholder is not a label — proper label plus error wiring" },
						lang: "html",
						code: `<!-- ❌ placeholder만 있는 입력: 입력 시작하면 이름이 사라짐 -->
<input type="email" placeholder="이메일">

<!-- ✅ label 연결 + 오류를 aria-describedby·aria-invalid로 -->
<label for="email">이메일</label>
<input id="email" type="email" aria-invalid="true"
       aria-describedby="email-err" autocomplete="email">
<p id="email-err" role="alert">올바른 이메일 형식이 아닙니다.</p>`,
					},
				],
			},
			{
				heading: { ko: "그룹화 — fieldset과 legend", en: "Grouping — fieldset and legend" },
				paragraphs: {
					ko: [
						"관련된 폼 요소는 `<fieldset>`으로 그룹화하고 `<legend>`로 그룹 제목을 제공합니다. 대표 사례: 라디오 버튼 그룹('배송 방법'), 체크박스 그룹, 주소 입력 그룹. 스크린리더는 그룹에 진입할 때 legend를 함께 낭독해, '표준 배송' 라디오가 무엇에 대한 선택지인지 맥락을 제공합니다.",
						"legend 없이 라디오 버튼만 나열하면 각 선택지의 레이블('예', '아니오')만 들리고 질문이 무엇인지 알 수 없습니다 — 폼 접근성에서 가장 흔한 결함 중 하나입니다. 시각적 디자인상 fieldset을 쓰기 어려우면 role=\"group\"과 aria-labelledby로 동등한 의미를 제공할 수 있습니다.",
					],
					en: [
						"Group related form elements with `<fieldset>` and title the group with `<legend>`. Classic cases: radio groups ('Shipping method'), checkbox groups, address field sets. Screen readers announce the legend when entering the group, giving context to what a 'Standard shipping' radio is a choice about.",
						"Radio buttons without a legend leave users hearing only option labels ('Yes', 'No') with no idea what the question is — one of the most common form defects. Where the visual design resists fieldset, role=\"group\" with aria-labelledby provides equivalent semantics.",
					],
				},
			},
			{
				heading: { ko: "오류 처리 패턴", en: "Error Handling Patterns" },
				paragraphs: {
					ko: [
						"유효성 검사 오류의 접근성 패턴: 오류를 필드 근처에 인라인으로 표시하고 aria-describedby로 입력과 연결하며, aria-invalid=\"true\"로 오류 상태를 명시합니다. 제출 시 여러 오류가 있으면 상단에 오류 요약(각 오류로 가는 링크 포함)을 제공하고 요약이나 첫 오류 필드로 포커스를 이동합니다.",
						"오류 메시지는 무엇이 잘못됐고 어떻게 고치는지를 함께 설명해야 합니다(WCAG 3.3.1 오류 식별, 3.3.3 오류 제안). '유효하지 않은 입력'보다 '생년월일은 YYYY-MM-DD 형식으로 입력하세요'가 좋은 메시지입니다. 색상만으로 오류를 표시하지 말고(1.4.1), 오류 발생을 aria-live 영역으로 알리면 스크린리더 사용자가 즉시 인지합니다.",
						"오류 예방도 기준입니다: 법적·금융 거래에서는 제출 전 검토·수정 기회를 제공해야 하고(3.3.4), WCAG 2.2의 3.3.7(중복 입력)은 같은 정보를 다시 입력하게 하지 않도록 요구합니다. autocomplete 속성(1.3.5 입력 목적 식별)은 자동완성을 지원해 인지·운동 장애 사용자의 입력 부담을 줄입니다.",
					],
					en: [
						"The accessible validation pattern: show errors inline near the field, connect them with aria-describedby, and mark the state with aria-invalid=\"true\". When submission produces multiple errors, provide an error summary at the top (with links to each error) and move focus to the summary or the first errored field.",
						"Error messages must say what went wrong and how to fix it (WCAG 3.3.1 Error Identification, 3.3.3 Error Suggestion). 'Enter your date of birth as YYYY-MM-DD' beats 'Invalid input.' Don't mark errors by color alone (1.4.1), and announcing errors via a live region lets screen reader users notice immediately.",
						"Prevention is also required: legal and financial transactions need review-and-correct opportunities before submission (3.3.4), and WCAG 2.2's 3.3.7 (Redundant Entry) forbids making users re-enter the same information. The autocomplete attribute (1.3.5 Identify Input Purpose) enables autofill, reducing input burden for users with cognitive and motor disabilities.",
					],
				},
			},
			{
				heading: { ko: "필수 필드와 도움말", en: "Required Fields and Help Text" },
				paragraphs: {
					ko: [
						"필수 입력은 시각적 표시(별표 등)와 프로그래밍적 표시(required 속성 또는 aria-required=\"true\")를 모두 제공합니다. 한쪽만 있으면 시각 사용자 또는 스크린리더 사용자 중 한쪽이 놓칩니다. 별표(*)의 의미는 폼 상단에서 설명해주는 것이 좋습니다.",
						"형식 안내('비밀번호는 8자 이상')와 도움말은 필드와 aria-describedby로 연결해 스크린리더가 필드 진입 시 함께 낭독하게 합니다. 도움말을 시각적으로만 배치하면 스크린리더 사용자에게는 존재하지 않는 정보가 됩니다.",
					],
					en: [
						"Mark required inputs both visually (asterisk) and programmatically (the required attribute or aria-required=\"true\"). Either alone means one audience misses it — sighted users or screen reader users. Explain what the asterisk means at the top of the form.",
						"Connect format hints ('Password must be at least 8 characters') and help text to the field with aria-describedby so screen readers announce them on entry. Help text placed only visually simply doesn't exist for screen reader users.",
					],
				},
			},
		],
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
		content: { ko: [], en: [] },
		sections: [
			{
				heading: { ko: "alt 텍스트 — 판단 기준", en: "Alt Text — How to Decide" },
				paragraphs: {
					ko: [
						"이미지 접근성의 핵심은 alt 속성입니다(WCAG 1.1.1, Level A). 정보 이미지는 내용과 기능을 간결하게 전달하는 alt를, 장식 이미지는 alt=\"\"(빈 alt)를 제공해 스크린리더가 건너뛰게 합니다. alt 속성 자체를 생략하면 스크린리더가 파일명을 읽습니다 — '빈 alt'와 'alt 없음'은 완전히 다릅니다.",
						"판단 기준은 맥락입니다. 같은 사진이라도 본문이 이미 설명하는 분위기용이면 장식(alt=\"\"), 내용을 전달하면 정보 이미지입니다. 기능 이미지(링크·버튼 안의 아이콘)는 모양이 아니라 기능을 씁니다 — 돋보기 아이콘의 alt는 '돋보기'가 아니라 '검색'입니다. '이미지', '사진' 같은 중복 표현은 넣지 않습니다(스크린리더가 이미 유형을 알림). W3C의 alt 결정 트리(alt Decision Tree)가 실무 판단에 유용합니다.",
					],
					en: [
						"The core of image accessibility is the alt attribute (WCAG 1.1.1, Level A). Informative images get concise alt conveying content and function; decorative images get alt=\"\" (empty alt) so screen readers skip them. Omitting the attribute makes screen readers read the filename — 'empty alt' and 'no alt' are completely different.",
						"Context decides. The same photo is decorative (alt=\"\") when the body text already tells the story, informative when it carries content. Functional images (icons inside links and buttons) describe the function, not the appearance — a magnifier icon's alt is 'Search,' not 'magnifying glass.' Skip redundant phrases like 'image of' (screen readers already announce the type). The W3C alt Decision Tree is a useful practical guide.",
					],
				},
			},
			{
				heading: { ko: "복잡한 이미지와 텍스트 이미지", en: "Complex Images and Images of Text" },
				paragraphs: {
					ko: [
						"차트·그래프·인포그래픽 같은 복잡한 이미지는 짧은 alt로 요약하고, 상세 데이터는 본문 텍스트, 데이터 테이블, 또는 aria-describedby로 연결한 별도 설명으로 제공합니다. '2024년 매출 추이 차트'라는 alt만으로는 데이터가 전달되지 않습니다 — 핵심 경향('3분기에 40% 증가')을 요약하거나 표를 병행하세요.",
						"텍스트를 이미지로 만든 콘텐츠(배너 속 문구 등)는 가능하면 실제 텍스트로 구현해야 합니다(WCAG 1.4.5 텍스트 이미지, Level AA — 로고는 예외). 이미지 속 텍스트는 확대 시 깨지고, 사용자 스타일(글꼴·간격) 적용이 불가능하며, 번역도 되지 않습니다.",
					],
					en: [
						"For complex images — charts, graphs, infographics — provide a short summarizing alt and put the detail in body text, a data table, or a description linked via aria-describedby. Alt reading 'Chart of 2024 revenue' conveys no data — summarize the key trend ('40% growth in Q3') or pair it with a table.",
						"Content rendered as images of text (banner slogans, etc.) should be real text wherever possible (WCAG 1.4.5 Images of Text, Level AA — logos exempt). Text in images pixelates when zoomed, can't receive user styles (font, spacing), and can't be translated.",
					],
				},
			},
			{
				heading: { ko: "미디어 대안 — 기준 레벨 지도", en: "Media Alternatives — The Level Map" },
				paragraphs: {
					ko: [
						"시간 기반 미디어의 WCAG 요구는 레벨별로 외워둘 가치가 있습니다. Level A: 오디오 전용·비디오 전용 콘텐츠의 대안(1.2.1 — 팟캐스트엔 대본), 녹화 비디오의 자막(1.2.2), 녹화 비디오의 오디오 설명 또는 미디어 대안(1.2.3). Level AA: 실시간 자막(1.2.4), 녹화 비디오의 오디오 설명(1.2.5).",
						"오디오 설명(Audio Description)은 대사 사이에 화면에서 일어나는 시각 정보(장면 전환, 표정, 자막 없는 텍스트)를 내레이션으로 설명합니다. 대안으로 처음부터 시각 정보를 대사에 녹여 말하는 통합 설명(integrated description) 기법도 있습니다. 자동 재생 오디오는 3초 이상이면 정지 수단이 필요합니다(1.4.2).",
					],
					en: [
						"The WCAG requirements for time-based media are worth memorizing by level. Level A: alternatives for audio-only and video-only content (1.2.1 — transcripts for podcasts), captions for prerecorded video (1.2.2), audio description or media alternative for prerecorded video (1.2.3). Level AA: live captions (1.2.4) and audio description for prerecorded video (1.2.5).",
						"Audio description narrates visual information between lines of dialogue — scene changes, expressions, on-screen text. An alternative technique is integrated description: scripting the visuals into the dialogue from the start. Auto-playing audio longer than three seconds needs a way to stop it (1.4.2).",
					],
				},
			},
			{
				heading: { ko: "SVG 접근성", en: "SVG Accessibility" },
				paragraphs: {
					ko: [
						"인라인 SVG는 `<svg role=\"img\">`로 이미지 역할을 명시하고, `<title>`로 짧은 설명, 필요 시 `<desc>`로 긴 설명을 제공한 뒤 aria-labelledby로 연결합니다. `<img src=\"*.svg\">`로 삽입하면 일반 이미지처럼 alt 속성을 사용합니다.",
						"장식용 SVG는 aria-hidden=\"true\"(그리고 focusable=\"false\" — 일부 구형 브라우저의 SVG 포커스 방지)로 숨깁니다. 인터랙티브 SVG(차트에 호버·클릭)는 그 자체가 커스텀 위젯이므로 키보드 조작과 상태 낭독까지 별도로 설계해야 합니다.",
					],
					en: [
						"For inline SVG, declare image semantics with `<svg role=\"img\">`, provide a short `<title>` and, when needed, a longer `<desc>`, connected via aria-labelledby. When embedding with `<img src=\"*.svg\">`, use the alt attribute as with any image.",
						"Hide decorative SVGs with aria-hidden=\"true\" (plus focusable=\"false\" to prevent SVG focus in some legacy browsers). Interactive SVGs (hover/click charts) are custom widgets in their own right, requiring keyboard operation and state announcements by design.",
					],
				},
			},
		],
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
		content: { ko: [], en: [] },
		sections: [
			{
				heading: { ko: "도구 지형도", en: "The Tool Landscape" },
				paragraphs: {
					ko: [
						"주요 자동화 도구: axe(Deque Systems)는 업계 표준 엔진으로 브라우저 확장, API, CI 통합을 지원합니다. WAVE(WebAIM)는 페이지 위에 오류를 시각적으로 겹쳐 표시해 교육용으로 좋습니다. Lighthouse(Google)는 Chrome DevTools에 내장되어 접근성 외에 성능·SEO도 점검하며, 내부적으로 axe-core를 사용합니다. Pa11y는 커맨드라인 기반으로 CI/CD 통합에 강합니다.",
						"도구 선택의 관점: 단발 점검엔 브라우저 확장(axe DevTools, WAVE), 회귀 방지엔 CI 통합(axe-core, Pa11y), 대규모 사이트 상시 모니터링엔 크롤링형 플랫폼(Siteimprove, Deque WorldSpace류)이 어울립니다. 어떤 도구든 같은 엔진 계열이면 결과가 비슷하므로, 도구 수를 늘리는 것보다 수동 테스트를 병행하는 것이 커버리지를 실제로 넓힙니다.",
					],
					en: [
						"Major automated tools: axe (Deque Systems) is the industry-standard engine with browser extensions, APIs, and CI integration. WAVE (WebAIM) overlays errors visually on the page — great for education. Lighthouse (Google), built into Chrome DevTools, checks performance and SEO alongside accessibility, and uses axe-core internally. Pa11y is command-line based with strong CI/CD integration.",
						"Choosing tools: browser extensions (axe DevTools, WAVE) suit spot checks; CI integrations (axe-core, Pa11y) suit regression prevention; crawling platforms (Siteimprove, Deque WorldSpace-class) suit continuous monitoring of large sites. Tools sharing the same engine family produce similar results — adding manual testing widens real coverage more than adding tools.",
					],
				},
			},
			{
				heading: { ko: "무엇을 잡고 무엇을 놓치는가", en: "What Automation Catches — and Misses" },
				paragraphs: {
					ko: [
						"자동화 도구는 전체 접근성 이슈의 약 30~40%만 발견합니다. 감지 가능: 누락된 alt 속성, 색상 대비 부족, 빈 링크·버튼, 중복 ID, 누락된 폼 레이블, 잘못된 ARIA 속성 값. 감지 불가: alt 텍스트의 적절성, 키보드 탐색 순서의 논리성, 포커스 관리 품질, 콘텐츠의 이해 가능성, 시각적 읽기 순서와 DOM 순서의 일치.",
						"거짓 양성(false positive)과 거짓 음성도 이해해야 합니다. 도구는 판단이 필요한 항목을 '검토 필요(needs review)'로 표시하는데(예: 배경 이미지 위 텍스트 대비), 이를 무시하면 실제 결함이 숨습니다. 반대로 규칙에 걸리지 않았다고 접근 가능한 것은 아닙니다 — '자동 검사 0건'은 시작점이지 합격증이 아닙니다.",
					],
					en: [
						"Automated tools find only about 30–40% of accessibility issues. Detectable: missing alt attributes, insufficient contrast, empty links and buttons, duplicate IDs, missing form labels, invalid ARIA attribute values. Not detectable: appropriateness of alt text, logical keyboard order, focus management quality, content understandability, and whether visual reading order matches DOM order.",
						"Understand false positives and negatives too. Tools flag judgment-required items as 'needs review' (e.g., text contrast over background images) — ignoring these hides real defects. Conversely, passing the rules doesn't mean accessible: 'zero automated findings' is a starting point, not a pass certificate.",
					],
				},
			},
			{
				heading: { ko: "CI/CD 통합 패턴", en: "CI/CD Integration Patterns" },
				paragraphs: {
					ko: [
						"axe-core를 Jest(jest-axe), Cypress(cypress-axe), Playwright(@axe-core/playwright) 같은 테스트 프레임워크와 통합해 PR마다 자동 검사를 실행합니다. 자동화 테스트는 '게이트키퍼'로서 새 접근성 결함의 유입을 막고, 기존 이슈 발굴은 수동 감사가 담당합니다.",
						"실무 요령: 처음부터 전체 실패를 빌드 차단으로 걸면 기존 부채 때문에 도입이 좌초합니다. 새 코드·변경된 화면에만 엄격 기준을 적용하고 기존 부채는 베이스라인으로 관리하며 점진 상환하는 전략이 현실적입니다. 컴포넌트 단위 테스트(Storybook + axe)는 결함을 가장 이른 단계에서 잡습니다.",
					],
					en: [
						"Integrate axe-core with test frameworks — Jest (jest-axe), Cypress (cypress-axe), Playwright (@axe-core/playwright) — to run checks on every PR. Automation acts as a gatekeeper against new defects, while manual audits surface existing issues.",
						"Practical tip: blocking builds on all failures from day one founders on existing debt. A realistic strategy applies strict rules to new code and changed screens while managing existing debt as a baseline paid down incrementally. Component-level testing (Storybook + axe) catches defects at the earliest possible stage.",
					],
				},
			},
			{
				heading: { ko: "자동화·수동·사용자 테스트의 상호보완", en: "Automated, Manual, and User Testing Together" },
				paragraphs: {
					ko: [
						"자동화 도구는 빠르고 반복 가능한 기술 검사에 강하고, 수동 테스트는 사용자 경험·맥락·의미의 정확성을 평가하며, 사용자 테스트는 실제 과업 수행 가능성을 검증합니다. 최선의 전략은 셋의 병행입니다: 자동화로 기본기를 상시 방어하고, 릴리스 주기마다 수동 감사를 돌리고, 주요 개편에는 장애인 사용자 테스트를 포함합니다.",
					],
					en: [
						"Automation excels at fast, repeatable technical checks; manual testing evaluates experience, context, and semantic accuracy; user testing validates real task completion. The best strategy combines all three: automation defends the basics continuously, manual audits run each release cycle, and major redesigns include testing with disabled users.",
					],
				},
			},
			{
				heading: { ko: "ACT 규칙 — 테스트의 표준화", en: "ACT Rules — Standardizing Tests" },
				paragraphs: {
					ko: [
						"W3C의 ACT(Accessibility Conformance Testing) 규칙은 '무엇을 어떻게 검사하고 어떤 결과를 실패로 판정하는가'를 표준화한 테스트 규칙 형식입니다. 같은 페이지를 놓고 도구·감사자마다 판정이 갈리는 문제를 줄이기 위해, 각 규칙은 적용 대상(applicability), 기대 결과(expectations), 통과·실패 예제를 명시합니다. axe-core 등 주요 도구들이 자사 규칙을 ACT 규칙 형식에 매핑해 일관성을 검증합니다.",
						"실무 의미: 도구 간 결과가 다를 때 ACT 규칙과 그 예제가 중립적 판정 기준이 됩니다. 또한 각 규칙은 특정 성공 기준에 매핑되므로, '이 실패가 어느 SC 위반인가'를 근거 있게 문서화하는 데 유용합니다. 다만 모든 SC가 ACT 규칙으로 커버되는 것은 아니므로 수동 판단은 여전히 필요합니다.",
					],
					en: [
						"The W3C's ACT (Accessibility Conformance Testing) rules standardize what to test, how, and what counts as failure. To reduce divergent verdicts between tools and auditors on the same page, each rule specifies applicability, expectations, and passed/failed examples. Major tools such as axe-core map their rules to the ACT format to validate consistency.",
						"In practice: when tools disagree, ACT rules and their examples serve as a neutral arbiter. Because each rule maps to specific success criteria, they also help document which SC a failure violates. Not every SC is covered by an ACT rule, though — manual judgment remains necessary.",
					],
				},
			},
		],
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
		content: { ko: [], en: [] },
		sections: [
			{
				heading: { ko: "키보드 수동 테스트 프로토콜", en: "The Keyboard Testing Protocol" },
				paragraphs: {
					ko: [
						"수동 테스트의 첫 단계는 마우스를 치우는 것입니다. 점검 항목: Tab으로 모든 인터랙티브 요소에 도달 가능한가, 포커스 순서가 시각적·논리적 순서와 일치하는가, 포커스 표시가 항상 명확히 보이는가, Enter/Space로 버튼·링크가 작동하는가, 복합 위젯 내부는 화살표 키로 이동되는가, Esc로 모달·메뉴가 닫히는가, 키보드 트랩이 없는가.",
						"자주 발견되는 결함 패턴: 마우스 호버로만 열리는 드롭다운(키보드로 열 수 없음), 커스텀 체크박스가 Space에 반응하지 않음, 캐러셀 다음 슬라이드로 포커스가 따라가지 않음, 무한 스크롤 뒤 푸터에 도달 불가. 키보드 테스트는 도구 없이 몇 분 만에 심각한 결함을 드러내는 가장 가성비 높은 검사입니다.",
					],
					en: [
						"Step one of manual testing: put the mouse away. Check that Tab reaches every interactive element, focus order matches the visual and logical order, the focus indicator is always clearly visible, Enter/Space activate buttons and links, arrow keys move within composite widgets, Esc closes modals and menus, and there are no keyboard traps.",
						"Common defect patterns: dropdowns that open only on mouse hover, custom checkboxes ignoring Space, carousels whose focus doesn't follow the next slide, footers unreachable behind infinite scroll. Keyboard testing is the highest-value check there is — minutes, no tools, and it exposes severe defects.",
					],
				},
			},
			{
				heading: { ko: "화면낭독기 테스트", en: "Screen Reader Testing" },
				paragraphs: {
					ko: [
						"주요 조합과 기본 조작: NVDA(Windows, 무료)는 Insert+Space로 탐색/포커스 모드 전환, H로 제목 이동, D로 랜드마크 이동. JAWS(Windows, 유료)는 Insert+F6 제목 목록, Insert+F7 링크 목록. VoiceOver(macOS)는 Cmd+F5로 켜고 VO키(Ctrl+Option)+방향키로 탐색, VO+U로 로터 메뉴. 권장 조합: NVDA+Chrome/Firefox, JAWS+Chrome/Edge, VoiceOver+Safari.",
						"탐색 모드와 포커스 모드의 구분이 중요합니다. 탐색(browse) 모드에서는 H·D·K 같은 단축키가 문서 탐색에 쓰이고, 입력 필드에 들어가면 포커스(forms) 모드로 전환되어 키 입력이 필드로 전달됩니다. 커스텀 위젯이 모드 전환을 방해하면 낭독기 사용자는 입력을 못 하거나 탐색을 못 하게 됩니다.",
						"확인할 것: 모든 정보가 음성으로 전달되는가, 이미지·버튼의 이름이 의미 있는가, 동적 변경(오류, 알림, 결과 갱신)이 낭독되는가, 표는 행·열 헤더와 함께 읽히는가. 첫 화면낭독기 테스트라면 눈을 감거나 화면을 끄고 과업을 수행해보는 것이 가장 배우는 것이 많습니다.",
					],
					en: [
						"Key pairings and basics: NVDA (Windows, free) — Insert+Space toggles browse/focus mode, H moves by heading, D by landmark. JAWS (Windows, commercial) — Insert+F6 headings list, Insert+F7 links list. VoiceOver (macOS) — Cmd+F5 to toggle, VO key (Ctrl+Option)+arrows to navigate, VO+U for the rotor. Recommended pairings: NVDA+Chrome/Firefox, JAWS+Chrome/Edge, VoiceOver+Safari.",
						"The browse-versus-focus mode distinction matters. In browse mode, keys like H, D, and K navigate the document; entering an input switches to focus (forms) mode where keystrokes go to the field. Custom widgets that break mode switching leave users unable to type — or unable to navigate.",
						"Verify: is all information conveyed in speech; do images and buttons have meaningful names; are dynamic changes (errors, notifications, updated results) announced; are tables read with row and column headers? For your first screen reader test, closing your eyes or turning off the display while completing a task teaches the most.",
					],
				},
			},
			{
				heading: { ko: "확대·대비·표시 설정 점검", en: "Zoom, Contrast, and Display Checks" },
				paragraphs: {
					ko: [
						"저시력 관점 수동 점검: 브라우저 확대 200%에서 콘텐츠와 기능이 유지되는가(1.4.4), 400%(320px 폭 상당)에서 가로 스크롤 없이 리플로우되는가(1.4.10), 텍스트 간격을 사용자 스타일로 키워도 잘리지 않는가(1.4.12), OS 고대비 모드에서 UI가 살아있는가.",
						"그 밖의 수동 체크리스트: 이미지 대체 텍스트의 적절성, 제목 계층의 논리성, 폼 레이블 연결, 색상 단독 정보 전달 여부, 자동 재생 콘텐츠 정지 수단, prefers-reduced-motion 반영 여부. 이 항목들이 자동 도구가 놓치는 60~70%의 핵심입니다.",
					],
					en: [
						"Low-vision manual checks: does content survive 200% browser zoom (1.4.4); does it reflow without horizontal scrolling at 400% (equivalent to 320px width, 1.4.10); does text remain intact when user styles increase text spacing (1.4.12); does the UI hold up in OS high-contrast modes?",
						"The rest of the manual checklist: appropriateness of alt text, logical heading hierarchy, form label association, color-only information, means to stop auto-playing content, and honoring prefers-reduced-motion. These items are the heart of the 60–70% that automation misses.",
					],
				},
			},
			{
				heading: { ko: "장애인 사용자 테스트", en: "Testing with Disabled Users" },
				paragraphs: {
					ko: [
						"실제 장애인 사용자가 참여하는 테스트가 가장 가치 있습니다. 시각·청각·운동·인지 등 다양한 장애 유형과 보조기술 사용자를 포함하고, 과업 기반 시나리오(회원가입 완료하기, 상품 결제하기)로 진행합니다. 참가자가 5명 안팎이어도 주요 사용성 문제의 대부분이 드러납니다.",
						"운영 시 유의점: 참가자의 자기 기기·자기 보조기술 사용을 우선하고(익숙한 설정이 실제 사용을 반영), 보상·모집 문서·테스트 장소의 접근성을 보장하며, '사용자를 테스트하는 것이 아니라 제품을 테스트한다'는 점을 명확히 합니다. 발견 사항은 적합성 위반이 아니어도 개선 백로그에 담을 가치가 있습니다.",
					],
					en: [
						"Testing with actual disabled users is the most valuable. Include diverse disability types — visual, auditory, motor, cognitive — and AT users, and run task-based scenarios (complete signup, check out a product). Even around five participants surface most major usability problems.",
						"Operational notes: prefer participants' own devices and assistive technologies (familiar settings reflect real use), ensure the accessibility of compensation, recruitment materials, and venues, and make clear you are testing the product, not the user. Findings deserve a place in the improvement backlog even when they aren't conformance violations.",
					],
				},
			},
		],
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
		content: { ko: [], en: [] },
		sections: [
			{
				heading: { ko: "우선순위 프레임워크", en: "A Prioritization Framework" },
				paragraphs: {
					ko: [
						"감사가 끝나면 보통 수백 건의 발견 사항이 남습니다. 우선순위의 기본 축은 WCAG 적합성 수준(A > AA > AAA)이지만, 그것만으로는 부족합니다. 사용자 영향(과업을 차단하는가), 영향 범위(공용 컴포넌트라 여러 페이지에 반복되는가), 사용 빈도(핵심 사용자 여정에 있는가), 법적 리스크를 함께 매트릭스로 평가합니다.",
						"실무 등급 예시: 차단(blocker) — 특정 사용자 집단이 핵심 과업을 완료할 수 없음(키보드로 결제 불가), 중대(major) — 과업이 심각하게 어려움, 경미(minor) — 불편하지만 우회 가능. 같은 Level A 위반이라도 랜딩 페이지의 결함이 아카이브 페이지의 결함보다 먼저입니다. 우선순위 결과는 백로그 티켓으로 만들어 일반 개발 프로세스에 태웁니다.",
					],
					en: [
						"An audit typically leaves hundreds of findings. WCAG level (A > AA > AAA) is the baseline axis, but not enough alone. Assess a matrix of user impact (does it block tasks), scope (does a shared component repeat it across pages), usage frequency (is it on a critical journey), and legal risk.",
						"A practical severity scale: blocker — a user group cannot complete a core task (checkout impossible by keyboard); major — tasks are severely difficult; minor — inconvenient but avoidable. The same Level A violation matters more on a landing page than in an archive. Turn prioritized findings into backlog tickets that ride the normal development process.",
					],
				},
			},
			{
				heading: { ko: "퀵윈과 임시 대안", en: "Quick Wins and Interim Fixes" },
				paragraphs: {
					ko: [
						"퀵윈(Quick Win)은 적은 노력으로 큰 개선을 주는 수정입니다: 누락 alt 추가, 폼 레이블 연결, 색상 대비 조정, 빈 링크·버튼에 이름 부여, 페이지 lang 속성, 건너뛰기 링크. 프로그램 초기에 퀵윈을 먼저 처리하면 가시적 성과가 조직의 동력을 만듭니다.",
						"근본 수정이 오래 걸릴 때는 임시 대안(interim fix)을 먼저 제공합니다: 접근 불가능한 PDF에 HTML 버전 병행, 차트에 데이터 테이블 추가, 문제를 겪는 사용자를 위한 대체 채널(전화·이메일) 안내. 단, 임시 대안은 근본 수정을 대체하지 않으며, 접근성 성명에 알려진 한계로 공개하는 것이 정직한 운영입니다.",
					],
					en: [
						"Quick wins deliver large improvement for little effort: adding missing alt, connecting form labels, adjusting contrast, naming empty links and buttons, the page lang attribute, skip links. Tackling quick wins first creates visible progress that fuels organizational momentum.",
						"When root fixes take time, ship interim fixes first: an HTML version alongside an inaccessible PDF, data tables next to charts, alternative channels (phone, email) for affected users. Interim fixes never replace permanent remediation — and disclosing them as known limitations in your accessibility statement is the honest practice.",
					],
				},
			},
			{
				heading: { ko: "근본 원인 수정과 비용", en: "Root-Cause Fixes and Cost" },
				paragraphs: {
					ko: [
						"반복되는 결함은 증상이 아니라 근본 원인을 고쳐야 합니다. 100개 페이지의 버튼 대비 미달은 페이지 100번 수정이 아니라 디자인 토큰 1번 수정입니다. 접근 가능한 디자인 시스템과 컴포넌트 라이브러리는 결함의 재발 자체를 막는 가장 효과적인 수정 전략입니다.",
						"비용의 법칙: 초기 설계 단계 통합이 가장 저렴하고(Shift Left), 출시 후 소급 수정은 초기 대비 30배 이상 비쌀 수 있습니다. 개발자·디자이너 교육 투자는 신규 결함 발생률을 낮춰 장기 수정 비용을 줄입니다. 수정 후에는 반드시 재검증(자동+수동)으로 실제 해결을 확인하고 회귀 테스트에 편입시킵니다.",
					],
					en: [
						"Recurring defects call for root-cause fixes, not symptom patches. Sub-par button contrast on 100 pages is one design-token fix, not 100 page fixes. An accessible design system and component library is the most effective remediation strategy because it prevents recurrence itself.",
						"The law of cost: integration at design time is cheapest (Shift Left); post-launch retrofits can cost 30x or more. Investing in developer and designer training lowers the new-defect rate and long-term cost. After fixing, always re-verify (automated plus manual) and fold the case into regression tests.",
					],
				},
			},
		],
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
		content: { ko: [], en: [] },
		sections: [
			{
				heading: { ko: "접근성 코드 리뷰", en: "Accessibility in Code Review" },
				paragraphs: {
					ko: [
						"코드 리뷰 체크 항목: 모든 인터랙티브 요소가 키보드로 접근 가능한가, 시맨틱 HTML을 올바르게 사용했는가, 이미지에 적절한 alt가 있는가, 폼 레이블이 연결되었는가, ARIA가 올바르게 쓰였는가(불필요한 ARIA는 없는가), 색상 대비가 충분한가, 포커스 관리가 적절한가.",
						"리뷰를 지속 가능하게 만드는 장치: 체크리스트를 PR 템플릿에 포함하고, eslint-plugin-jsx-a11y 같은 린터로 기계가 잡을 수 있는 것은 기계에 맡기며, 접근성을 완료 정의(Definition of Done)에 포함시킵니다. '접근성 리뷰 통과 전에는 머지하지 않는다'는 규칙이 리뷰 문화를 만듭니다.",
					],
					en: [
						"Code review checklist: are all interactive elements keyboard-accessible; is semantic HTML used correctly; do images have appropriate alt; are form labels associated; is ARIA used correctly (and none unnecessarily); is contrast sufficient; is focus managed properly?",
						"Making review sustainable: put the checklist in the PR template, let linters like eslint-plugin-jsx-a11y catch what machines can, and include accessibility in the Definition of Done. A 'no merge before accessibility review' rule is what builds the culture.",
					],
				},
			},
			{
				heading: { ko: "APG와 접근 가능한 컴포넌트", en: "The APG and Accessible Components" },
				paragraphs: {
					ko: [
						"커스텀 위젯(탭, 아코디언, 콤보박스, 모달)을 만들 때의 표준 참고서는 WAI-ARIA Authoring Practices Guide(APG)입니다. 각 패턴의 역할 구조, 키보드 상호작용, ARIA 상태 관리를 예제와 함께 제공합니다 — 새 위젯을 만들기 전에 해당 APG 패턴부터 확인하는 습관이 중요합니다.",
						"컴포넌트 설계 원칙: 시맨틱 HTML 기반 위에 구축하고, 상태 변경 시 ARIA 상태를 갱신하며, 터치 타깃을 충분히 크게 유지합니다(WCAG 2.5.5 AAA는 44×44px, 2.2의 2.5.8 AA는 최소 24×24px). 컴포넌트 문서에 접근성 사용법(필수 prop, 키보드 동작)을 포함하면 라이브러리 사용자 전체의 품질이 올라갑니다.",
					],
					en: [
						"The standard reference for custom widgets (tabs, accordions, comboboxes, modals) is the WAI-ARIA Authoring Practices Guide (APG). It provides each pattern's role structure, keyboard interaction, and ARIA state management with examples — check the APG pattern before building any new widget.",
						"Component design principles: build on semantic HTML, update ARIA states on change, and keep touch targets large (WCAG 2.5.5 AAA: 44×44px; 2.2's 2.5.8 AA: at least 24×24px). Documenting accessibility usage (required props, keyboard behavior) in component docs raises quality for every consumer of the library.",
					],
				},
			},
			{
				heading: { ko: "프레임워크별 지원", en: "Framework Support" },
				paragraphs: {
					ko: [
						"React: JSX에서 htmlFor(for 대체), aria-* 속성 직접 사용, Fragment로 불필요한 래퍼 DOM 방지. Next.js: next/image의 alt 필수화, 라우팅 시 접근성 알림 내장. Vue: v-bind로 동적 ARIA 바인딩. Angular: CDK a11y 모듈(FocusTrap, LiveAnnouncer, 고대비 감지).",
						"프레임워크는 도와줄 뿐 보장하지 않습니다. SPA 프레임워크의 기본 라우팅은 포커스·낭독 관리를 스스로 해주지 않는 경우가 많고, 인기 UI 라이브러리도 접근성 품질이 제각각입니다. '라이브러리를 채택하기 전 키보드·낭독기로 샘플 테스트한다'가 실무 원칙입니다.",
					],
					en: [
						"React: htmlFor in JSX (replacing for), direct aria-* attributes, Fragments to avoid wrapper DOM. Next.js: enforced alt on next/image, built-in route announcements. Vue: dynamic ARIA via v-bind. Angular: the CDK a11y module (FocusTrap, LiveAnnouncer, high-contrast detection).",
						"Frameworks help but don't guarantee. SPA routing often doesn't manage focus and announcements by itself, and popular UI libraries vary widely in accessibility quality. The working rule: sample-test any library with keyboard and screen reader before adopting it.",
					],
				},
			},
			{
				heading: { ko: "접근성 성명 작성", en: "Writing the Accessibility Statement" },
				paragraphs: {
					ko: [
						"접근성 성명(Accessibility Statement)의 구성 요소: 목표·준수 표준과 적합성 수준(예: WCAG 2.2 AA), 알려진 제한 사항의 솔직한 공개, 접근성 문의·피드백 연락처, 최근 평가일과 평가 방법, 지속 개선 의지. EU 공공 부문(WAD)에서는 법적 필수이며, W3C가 성명 생성 도구를 제공합니다.",
						"성명은 마케팅 문서가 아니라 책임성 문서입니다. '완벽히 접근 가능합니다'라는 과장은 신뢰를 깎고 법적 리스크를 키웁니다. 알려진 문제와 수정 일정, 우회 방법을 공개하는 것이 사용자와 규제 기관 모두에게 좋은 신호입니다.",
					],
					en: [
						"Elements of an accessibility statement: the target standard and conformance level (e.g., WCAG 2.2 AA), honest disclosure of known limitations, a contact for accessibility feedback, the date and method of the last evaluation, and a commitment to improvement. It's legally required in the EU public sector (WAD), and the W3C offers a statement generator.",
						"A statement is an accountability document, not marketing. Claiming 'fully accessible' erodes trust and increases legal risk. Disclosing known issues, remediation timelines, and workarounds sends the right signal to users and regulators alike.",
					],
				},
			},
		],
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
