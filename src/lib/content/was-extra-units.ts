import type { StudyUnit } from "./types";

/**
 * WAS 신규 단원 확장 지점 — 기존 was-units.ts 비대화 방지.
 * content/index.ts의 withExtraUnits가 도메인별로 병합 후 order 정렬.
 */
export const wasExtraUnits: StudyUnit[] = [
	{
		id: "was-1-7",
		exam: "was",
		domain: 1,
		order: 7,
		available: true,
		title: { ko: "데이터 테이블과 구조화 콘텐츠", en: "Data Tables and Structured Content" },
		summary: {
			ko: "접근 가능한 데이터 테이블(th·scope·caption), 복잡한 표의 처리, 링크 텍스트와 언어 속성을 학습합니다.",
			en: "Learn accessible data tables (th, scope, caption), handling complex tables, link text, and language attributes.",
		},
		objectives: {
			ko: [
				"데이터 테이블에 th·scope·caption을 올바르게 적용할 수 있다",
				"복잡한 표의 headers/id 연결 방법을 이해한다",
				"레이아웃 테이블과 데이터 테이블의 차이를 설명할 수 있다",
				"의미 있는 링크 텍스트와 lang 속성의 요구사항을 설명할 수 있다",
			],
			en: [
				"Apply th, scope, and caption correctly to data tables",
				"Understand headers/id association for complex tables",
				"Distinguish layout tables from data tables",
				"Explain requirements for meaningful link text and lang attributes",
			],
		},
		content: { ko: [], en: [] },
		sections: [
			{
				heading: { ko: "데이터 테이블의 기본기", en: "Data Table Fundamentals" },
				paragraphs: {
					ko: [
						"데이터 테이블은 행과 열의 관계로 의미가 전달되는 콘텐츠입니다. 스크린리더 사용자는 셀을 이동할 때마다 해당 셀의 행·열 헤더를 함께 들어야 '3분기'의 '매출'이라는 맥락을 잃지 않습니다. 그 연결을 만드는 것이 `<th>` 요소와 scope 속성입니다.",
						'기본 마크업: 헤더 셀은 `<td>`가 아닌 `<th>`로, 열 헤더에는 scope="col", 행 헤더에는 scope="row"를 지정합니다. `<caption>`은 표의 제목을 표와 프로그래밍적으로 연결하는 요소로, 스크린리더가 표 진입 시 낭독합니다 — 표 위의 일반 텍스트 제목은 이 연결을 제공하지 못합니다.',
						"시각적으로 표처럼 보이게 만든 `<div>` 그리드는 행·열 탐색과 헤더 낭독이 전혀 제공되지 않습니다. CSS display 속성이 테이블 시맨틱을 제거할 수도 있으므로(display:block을 table에 적용 시 일부 브라우저), 스타일 변경 후 접근성 트리 확인이 필요합니다.",
					],
					en: [
						"A data table is content whose meaning lives in row–column relationships. As screen reader users move between cells, they must hear the row and column headers with each cell to keep the context — that this is 'Q3' of 'Revenue.' The `<th>` element and scope attribute create that association.",
						'Base markup: header cells are `<th>` (not `<td>`), with scope="col" for column headers and scope="row" for row headers. `<caption>` programmatically ties the table\'s title to the table and is announced on entry — a plain text heading above the table provides no such link.',
						"A `<div>` grid styled to look like a table offers no row/column navigation and no header announcements. Note that CSS display values can strip table semantics in some browsers (display:block on a table), so check the accessibility tree after styling changes.",
					],
				},
			},
			{
				heading: { ko: "복잡한 표 다루기", en: "Handling Complex Tables" },
				paragraphs: {
					ko: [
						"헤더가 두 단계 이상이거나 병합 셀이 있는 복잡한 표에서는 scope만으로 관계를 표현하기 어렵습니다. 이때는 각 헤더 셀에 id를 부여하고 데이터 셀에서 headers=\"id1 id2\"로 명시적으로 연결합니다. 다만 유지보수 부담이 크므로, 첫 번째 선택지는 표를 더 단순한 여러 개의 표로 쪼개는 것입니다.",
						"표 설계의 실무 원칙: 병합 셀(colspan/rowspan)을 최소화하고, 빈 헤더 셀을 만들지 않으며, 정렬 가능한 열에는 aria-sort로 현재 정렬 상태를 알립니다. 표가 화면보다 넓다면 표 자체를 감싸는 컨테이너에 overflow 스크롤을 주되, 키보드로도 스크롤 가능해야 합니다(tabindex=\"0\" + 적절한 role/aria-label).",
					],
					en: [
						"For complex tables — multi-level headers or merged cells — scope alone can't express the relationships. Assign ids to header cells and reference them from data cells with headers=\"id1 id2\". Because maintenance costs are high, the first option should be splitting the table into several simpler ones.",
						"Practical table design: minimize merged cells (colspan/rowspan), never leave empty header cells, and announce sort state on sortable columns with aria-sort. If a table is wider than the viewport, wrap it in a scrollable container that keyboard users can scroll too (tabindex=\"0\" plus an appropriate role/aria-label).",
					],
				},
			},
			{
				heading: { ko: "레이아웃 테이블이라는 유산", en: "The Legacy of Layout Tables" },
				paragraphs: {
					ko: [
						"과거에는 페이지 배치를 위해 표를 쓰는 레이아웃 테이블이 흔했습니다. 오늘날 배치는 CSS(Flexbox·Grid)로 해야 하며, 표는 데이터에만 사용합니다. 불가피하게 레이아웃 목적의 표가 남아 있다면 role=\"presentation\"으로 테이블 시맨틱을 제거해 스크린리더가 '표 3행 2열' 같은 무의미한 정보를 낭독하지 않게 합니다.",
						"구분 기준은 간단합니다: 행·열 헤더가 의미를 갖는가? 갖는다면 데이터 테이블(th·caption 필수), 갖지 않는다면 애초에 표가 아니어야 합니다. 이메일 템플릿처럼 기술 제약으로 표 배치가 불가피한 영역에서만 presentation 처리가 정당화됩니다.",
					],
					en: [
						"Layout tables — using tables for page arrangement — were once common. Today layout belongs to CSS (Flexbox, Grid) and tables to data only. Where a layout table unavoidably remains, strip its semantics with role=\"presentation\" so screen readers don't announce meaningless 'table, 3 rows 2 columns' information.",
						"The test is simple: do row and column headers carry meaning? If yes, it's a data table (th and caption required); if no, it shouldn't be a table at all. Only technically constrained contexts like email templates justify presentation-role tables.",
					],
				},
			},
			{
				heading: { ko: "링크 텍스트와 언어 속성", en: "Link Text and Language Attributes" },
				paragraphs: {
					ko: [
						"링크 텍스트는 링크만 따로 들어도 목적을 알 수 있어야 합니다(WCAG 2.4.4 링크 목적, Level A). 스크린리더 사용자는 링크 목록으로 페이지를 훑는데, '여기를 클릭', '더 보기'가 열 개 나열되면 아무것도 구분할 수 없습니다. 시각적 맥락상 반복이 불가피하면 aria-label이나 sr-only 텍스트로 구체화합니다('더 보기 — 3분기 실적 보고서').",
						"언어 속성: 페이지 기본 언어는 `<html lang>`으로 선언하고(WCAG 3.1.1, Level A), 본문 중 다른 언어 구간은 해당 요소에 lang을 지정합니다(3.1.2 부분 언어, Level AA). 스크린리더는 lang에 따라 발음 엔진을 전환하므로, 한국어 페이지의 영어 인용문에 lang=\"en\"이 없으면 영어를 한국어 음운으로 읽는 문제가 생깁니다.",
					],
					en: [
						"Link text must convey its purpose when heard in isolation (WCAG 2.4.4 Link Purpose, Level A). Screen reader users skim pages via the links list — ten links reading 'click here' or 'read more' are indistinguishable. Where visual context forces repetition, disambiguate with aria-label or sr-only text ('Read more — Q3 earnings report').",
						"Language attributes: declare the page's default language with `<html lang>` (WCAG 3.1.1, Level A) and mark passages in other languages with lang on the element (3.1.2 Language of Parts, Level AA). Screen readers switch pronunciation engines based on lang — an English quotation without lang=\"en\" on a Korean page gets read with Korean phonetics.",
					],
				},
			},
		],
		questions: [
			{
				id: "was-1-7-q1",
				question: {
					ko: "데이터 테이블에서 열 헤더 셀의 올바른 마크업은?",
					en: "What is the correct markup for a column header cell in a data table?",
				},
				options: {
					a: { ko: "<td class=\"header\">", en: "<td class=\"header\">" },
					b: { ko: "<th scope=\"col\">", en: "<th scope=\"col\">" },
					c: { ko: "<th scope=\"row\">", en: "<th scope=\"row\">" },
					d: { ko: "<caption>", en: "<caption>" },
				},
				answer: "b",
				explanation: {
					ko: "열 헤더는 <th scope=\"col\">, 행 헤더는 <th scope=\"row\">입니다. class로 스타일만 입힌 <td>는 헤더 시맨틱이 없어 셀 이동 시 헤더가 낭독되지 않습니다.",
					en: "Column headers are <th scope=\"col\">; row headers are <th scope=\"row\">. A styled <td> has no header semantics, so headers aren't announced when moving between cells.",
				},
			},
			{
				id: "was-1-7-q2",
				question: {
					ko: "<caption> 요소가 표 위의 일반 텍스트 제목보다 나은 이유는?",
					en: "Why is <caption> better than a plain text heading above a table?",
				},
				options: {
					a: { ko: "글자가 더 크게 표시되어서", en: "It renders in larger text" },
					b: { ko: "표와 프로그래밍적으로 연결되어 표 진입 시 스크린리더가 낭독해서", en: "It is programmatically tied to the table and announced when entering it" },
					c: { ko: "검색 엔진 순위가 올라가서", en: "It improves search ranking" },
					d: { ko: "인쇄 시에만 표시되어서", en: "It appears only in print" },
				},
				answer: "b",
				explanation: {
					ko: "<caption>은 표의 접근 가능한 이름으로서 표와 연결됩니다. 표 목록 탐색이나 표 진입 시 함께 낭독되어 '이 표가 무엇인지'를 알려줍니다. 일반 텍스트 제목은 이 연결이 없습니다.",
					en: "<caption> serves as the table's accessible name, announced when navigating table lists or entering the table. A plain text heading provides no such association.",
				},
			},
			{
				id: "was-1-7-q3",
				question: {
					ko: "다단계 헤더를 가진 복잡한 표에서 셀-헤더 관계를 명시하는 방법은?",
					en: "How are cell–header relationships made explicit in complex tables with multi-level headers?",
				},
				options: {
					a: { ko: "각 헤더에 id를 주고 데이터 셀에서 headers 속성으로 참조", en: "Give headers ids and reference them from data cells with the headers attribute" },
					b: { ko: "모든 셀에 aria-label 부여", en: "Put aria-label on every cell" },
					c: { ko: "CSS로 색상 구분", en: "Distinguish with CSS colors" },
					d: { ko: "표를 이미지로 캡처해 alt 제공", en: "Screenshot the table and provide alt" },
				},
				answer: "a",
				explanation: {
					ko: "scope로 부족한 복잡한 표는 headers/id 연결을 사용합니다. 다만 유지보수 부담이 커서, 가능하면 표를 더 단순한 여러 표로 쪼개는 것이 먼저입니다.",
					en: "Where scope can't express the relationships, use headers/id association. Because maintenance is costly, splitting into simpler tables should be considered first.",
				},
			},
			{
				id: "was-1-7-q4",
				question: {
					ko: "'여기를 클릭' 링크 텍스트가 위반하는 WCAG 기준은?",
					en: "Which WCAG criterion does 'click here' link text violate?",
				},
				options: {
					a: { ko: "2.4.4 링크 목적 (문맥상)", en: "2.4.4 Link Purpose (In Context)" },
					b: { ko: "1.4.3 대비(최소)", en: "1.4.3 Contrast (Minimum)" },
					c: { ko: "2.3.1 세 번의 번쩍임", en: "2.3.1 Three Flashes" },
					d: { ko: "1.2.2 자막", en: "1.2.2 Captions" },
				},
				answer: "a",
				explanation: {
					ko: "링크는 그 텍스트(또는 프로그래밍적 문맥)만으로 목적을 알 수 있어야 합니다. 링크 목록으로 훑는 스크린리더 사용자에게 '여기를 클릭' 열 개는 구분 불가능합니다.",
					en: "A link's purpose must be determinable from its text (or programmatic context). Ten 'click here' links are indistinguishable to screen reader users skimming the links list.",
				},
			},
			{
				id: "was-1-7-q5",
				question: {
					ko: "한국어 페이지 안의 영어 인용문에 lang=\"en\"을 지정해야 하는 이유는?",
					en: "Why must an English quotation inside a Korean page carry lang=\"en\"?",
				},
				options: {
					a: { ko: "스크린리더가 발음 엔진을 영어로 전환해 올바르게 읽도록 (WCAG 3.1.2)", en: "So screen readers switch to an English pronunciation engine (WCAG 3.1.2)" },
					b: { ko: "글꼴이 자동으로 바뀌도록", en: "So the font changes automatically" },
					c: { ko: "번역기가 작동하지 않도록", en: "To block machine translation" },
					d: { ko: "SEO 점수를 높이려고", en: "To raise SEO scores" },
				},
				answer: "a",
				explanation: {
					ko: "스크린리더는 lang 속성에 따라 발음 엔진을 전환합니다. 부분 언어(3.1.2, Level AA)가 지정되지 않으면 영어 문장을 한국어 음운으로 읽어 이해할 수 없게 됩니다.",
					en: "Screen readers switch pronunciation engines based on lang. Without Language of Parts (3.1.2, Level AA), English sentences get read with Korean phonetics and become unintelligible.",
				},
			},
		],
	},

	{
		id: "was-1-8",
		exam: "was",
		domain: 1,
		order: 8,
		available: true,
		title: { ko: "커스텀 위젯과 동적 콘텐츠", en: "Custom Widgets and Dynamic Content" },
		summary: {
			ko: "APG 패턴(탭·아코디언·모달·콤보박스)의 접근성 구현과 동적 콘텐츠·무한 스크롤·토스트의 처리를 학습합니다.",
			en: "Learn accessible implementation of APG patterns (tabs, accordions, modals, comboboxes) and handling of dynamic content, infinite scroll, and toasts.",
		},
		objectives: {
			ko: [
				"탭·아코디언 패턴의 역할 구조와 키보드 동작을 설명할 수 있다",
				"모달 다이얼로그의 필수 접근성 요건을 나열할 수 있다",
				"콤보박스·자동완성의 ARIA 패턴을 이해한다",
				"토스트·무한 스크롤 등 동적 콘텐츠의 접근성 처리를 설명할 수 있다",
			],
			en: [
				"Explain the role structure and keyboard behavior of tab and accordion patterns",
				"List the essential accessibility requirements of modal dialogs",
				"Understand the ARIA pattern for comboboxes and autocomplete",
				"Describe accessible handling of dynamic content like toasts and infinite scroll",
			],
		},
		content: { ko: [], en: [] },
		sections: [
			{
				heading: { ko: "탭과 아코디언", en: "Tabs and Accordions" },
				paragraphs: {
					ko: [
						'탭 패턴(APG): 컨테이너는 role="tablist", 각 탭은 role="tab", 패널은 role="tabpanel"입니다. 활성 탭은 aria-selected="true", 탭과 패널은 aria-controls/aria-labelledby로 상호 연결합니다. 키보드: 화살표 키로 탭 간 이동, Tab 키는 탭 목록을 벗어나 활성 패널로 이동합니다(로빙 tabindex — 활성 탭만 tabindex="0", 나머지는 "-1").',
						'아코디언은 더 단순합니다: 각 헤더는 실제 `<button>`으로 만들고 aria-expanded로 열림 상태를, aria-controls로 패널을 연결합니다. 버튼을 제목 요소로 감싸면(`<h3><button>`) 제목 탐색과 위젯 동작을 모두 얻습니다. 두 패턴 모두 상태 변경 시 ARIA 값을 실제로 갱신하는 것이 핵심입니다.',
					],
					en: [
						'The tabs pattern (APG): the container is role="tablist", each tab role="tab", each panel role="tabpanel". The active tab carries aria-selected="true", and tabs and panels are cross-linked with aria-controls/aria-labelledby. Keyboard: arrow keys move between tabs; Tab leaves the tablist into the active panel (roving tabindex — only the active tab has tabindex="0", the rest "-1").',
						'Accordions are simpler: each header is a real `<button>` with aria-expanded for state and aria-controls for its panel. Wrapping the button in a heading (`<h3><button>`) gives both heading navigation and widget behavior. In both patterns, the crux is actually updating ARIA values when state changes.',
					],
				},
			},
			{
				heading: { ko: "모달 다이얼로그", en: "Modal Dialogs" },
				paragraphs: {
					ko: [
						'모달의 필수 요건: role="dialog"와 aria-modal="true", 제목과의 aria-labelledby 연결, 열릴 때 포커스가 모달 안으로 이동, 포커스가 모달 내부에 갇힘(트랩), Esc로 닫기, 닫힐 때 트리거 요소로 포커스 복귀, 배경 콘텐츠의 inert 처리.',
						"네이티브 `<dialog>` 요소의 showModal()은 포커스 트랩·Esc·배경 inert를 상당 부분 기본 제공하므로 우선 검토할 가치가 있습니다. 커스텀 구현이라면 배경을 aria-hidden 처리하는 것만으로는 부족합니다 — 포커스가 여전히 배경으로 나갈 수 있어 실제 트랩 로직이 필요합니다.",
					],
					en: [
						'Modal essentials: role="dialog" with aria-modal="true", an aria-labelledby link to its title, focus moved inside on open, focus contained (trapped) within, Esc to close, focus returned to the trigger on close, and the background made inert.',
						"The native `<dialog>` element's showModal() provides much of this — focus trapping, Esc, background inertness — and deserves first consideration. In custom implementations, aria-hidden on the background is not enough: focus can still escape into it, so real trap logic is required.",
					],
				},
			},
			{
				heading: { ko: "콤보박스와 자동완성", en: "Comboboxes and Autocomplete" },
				paragraphs: {
					ko: [
						'콤보박스(검색 자동완성 포함)는 가장 구현 난도가 높은 패턴 중 하나입니다. 입력에 role="combobox", aria-expanded, 목록과의 aria-controls 연결, 목록은 role="listbox"와 role="option"들, 하이라이트된 옵션은 aria-activedescendant로 알립니다 — 포커스는 입력에 두고 활성 옵션만 갱신하는 방식입니다.',
						"결과 수 변화는 라이브 영역으로 알리고('검색 결과 12건'), 화살표 키로 옵션 탐색, Enter로 선택, Esc로 목록 닫기를 구현합니다. 가능하다면 `<select>`나 `<datalist>` 같은 네이티브 요소로 요구를 충족할 수 있는지 먼저 검토하세요 — 첫 번째 ARIA 규칙은 여기서도 유효합니다.",
					],
					en: [
						'The combobox (including search autocomplete) is among the hardest patterns to implement. The input takes role="combobox" with aria-expanded and aria-controls pointing to the list; the list is role="listbox" containing role="option" items; the highlighted option is conveyed via aria-activedescendant — focus stays on the input while the active option updates.',
						"Announce result-count changes via a live region ('12 results'), and implement arrow-key navigation, Enter to select, Esc to close. Where possible, first check whether native `<select>` or `<datalist>` meets the need — the First Rule of ARIA applies here too.",
					],
				},
			},
			{
				heading: { ko: "토스트, 무한 스크롤, 스켈레톤", en: "Toasts, Infinite Scroll, Skeletons" },
				paragraphs: {
					ko: [
						'토스트 알림은 role="status"(중요 오류는 role="alert") 컨테이너를 페이지 로드 시부터 두고 내용만 갱신해야 안정적으로 낭독됩니다. 자동 소멸 시간은 충분히 길거나 정지 가능해야 하며(WCAG 2.2.1), 토스트 안에 버튼이 있다면 사라지기 전에 도달할 수 있어야 합니다.',
						"무한 스크롤은 키보드 사용자가 푸터에 도달할 수 없게 만들 수 있습니다 — '더 보기' 버튼 방식이 접근성 면에서 우월합니다. 콘텐츠 추가 시 새 항목 수를 라이브 영역으로 알리고, 로딩 스켈레톤에는 aria-hidden을 주되 로딩 상태 자체는 aria-busy나 상태 텍스트로 전달합니다.",
					],
					en: [
						'Toast notifications announce reliably when a role="status" container (role="alert" for critical errors) exists from page load and only its content updates. Auto-dismiss must be long enough or pausable (WCAG 2.2.1), and any button inside a toast must be reachable before it disappears.',
						"Infinite scroll can make the footer unreachable for keyboard users — a 'Load more' button is superior for accessibility. Announce the number of newly added items via a live region, give loading skeletons aria-hidden, and convey the loading state itself with aria-busy or status text.",
					],
				},
			},
		],
		questions: [
			{
				id: "was-1-8-q1",
				question: {
					ko: "APG 탭 패턴에서 탭 간 이동에 사용하는 키는?",
					en: "In the APG tabs pattern, which keys move between tabs?",
				},
				options: {
					a: { ko: "Tab 키", en: "The Tab key" },
					b: { ko: "화살표 키 (Tab은 활성 패널로 이동)", en: "Arrow keys (Tab moves into the active panel)" },
					c: { ko: "Enter 키", en: "The Enter key" },
					d: { ko: "숫자 키", en: "Number keys" },
				},
				answer: "b",
				explanation: {
					ko: "복합 위젯 내부 이동은 화살표 키가 담당하고(로빙 tabindex), Tab 키는 위젯을 벗어나 다음 정지점(활성 패널)으로 이동합니다. 탭마다 Tab을 눌러야 한다면 잘못된 구현입니다.",
					en: "Arrow keys handle movement inside composite widgets (roving tabindex); Tab leaves the widget for the next stop (the active panel). Needing Tab for each tab is an incorrect implementation.",
				},
			},
			{
				id: "was-1-8-q2",
				question: {
					ko: "모달 구현에서 배경을 aria-hidden 처리하는 것만으로 부족한 이유는?",
					en: "Why is aria-hidden on the background insufficient in a modal implementation?",
				},
				options: {
					a: { ko: "포커스가 여전히 배경 요소로 나갈 수 있어 실제 트랩 로직이 필요하기 때문", en: "Focus can still escape into background elements — real trap logic is needed" },
					b: { ko: "aria-hidden은 시각적으로도 숨기기 때문", en: "aria-hidden also hides content visually" },
					c: { ko: "성능이 저하되기 때문", en: "It degrades performance" },
					d: { ko: "모바일에서 동작하지 않기 때문", en: "It doesn't work on mobile" },
				},
				answer: "a",
				explanation: {
					ko: "aria-hidden은 낭독만 막을 뿐 키보드 포커스 이동을 막지 않습니다. 포커스 트랩(또는 네이티브 dialog의 showModal, inert 속성)이 있어야 배경으로의 탈출을 실제로 차단합니다.",
					en: "aria-hidden suppresses announcements but not keyboard focus. A focus trap (or native dialog's showModal / the inert attribute) is what actually blocks escape into the background.",
				},
			},
			{
				id: "was-1-8-q3",
				question: {
					ko: "콤보박스에서 포커스를 입력에 둔 채 하이라이트된 옵션을 알리는 속성은?",
					en: "Which attribute conveys the highlighted option while focus stays on the combobox input?",
				},
				options: {
					a: { ko: "aria-activedescendant", en: "aria-activedescendant" },
					b: { ko: "aria-label", en: "aria-label" },
					c: { ko: "aria-live", en: "aria-live" },
					d: { ko: "tabindex", en: "tabindex" },
				},
				answer: "a",
				explanation: {
					ko: "aria-activedescendant는 실제 DOM 포커스를 옮기지 않고 활성 하위 항목의 id를 가리켜, 입력에 포커스를 유지하면서 옵션 하이라이트를 보조기술에 전달합니다.",
					en: "aria-activedescendant points to the active descendant's id without moving DOM focus, conveying option highlighting to AT while focus remains on the input.",
				},
			},
			{
				id: "was-1-8-q4",
				question: {
					ko: "무한 스크롤 대신 '더 보기' 버튼이 접근성 면에서 우월한 이유는?",
					en: "Why is a 'Load more' button superior to infinite scroll for accessibility?",
				},
				options: {
					a: { ko: "서버 부하가 적어서", en: "It reduces server load" },
					b: { ko: "키보드 사용자가 푸터에 도달할 수 있고, 콘텐츠 추가 시점을 사용자가 제어하기 때문", en: "Keyboard users can reach the footer, and users control when content is added" },
					c: { ko: "디자인이 더 예뻐서", en: "It looks better" },
					d: { ko: "이미지가 더 빨리 로드되어서", en: "Images load faster" },
				},
				answer: "b",
				explanation: {
					ko: "무한 스크롤은 스크롤할 때마다 콘텐츠가 늘어나 키보드 사용자가 푸터 등 이후 콘텐츠에 영영 도달하지 못하게 만들 수 있습니다. '더 보기' 버튼은 추가 시점을 사용자가 제어하고 도달 가능성을 보존합니다.",
					en: "Infinite scroll keeps growing content so keyboard users may never reach the footer. A 'Load more' button preserves reachability and puts users in control of when content is added.",
				},
			},
			{
				id: "was-1-8-q5",
				question: {
					ko: "토스트 알림이 안정적으로 낭독되게 하는 구현 방법은?",
					en: "What implementation makes toast notifications announce reliably?",
				},
				options: {
					a: { ko: "토스트가 뜰 때마다 role=\"status\" 요소를 새로 생성한다", en: "Create a new role=\"status\" element each time a toast appears" },
					b: { ko: "role=\"status\" 컨테이너를 페이지 로드 시부터 두고 내용만 갱신한다", en: "Keep a role=\"status\" container in the DOM from page load and update only its content" },
					c: { ko: "alert() 대화상자를 사용한다", en: "Use alert() dialogs" },
					d: { ko: "토스트에 tabindex=\"1\"을 준다", en: "Give the toast tabindex=\"1\"" },
				},
				answer: "b",
				explanation: {
					ko: "라이브 영역은 DOM에 미리 존재해야 변경이 안정적으로 감지됩니다. 요소 자체를 동적으로 삽입하면 첫 알림이 누락되는 경우가 많습니다.",
					en: "Live regions detect changes reliably only when the container pre-exists in the DOM. Inserting the region element dynamically often drops the first announcement.",
				},
			},
		],
	},

	{
		id: "was-1-9",
		exam: "was",
		domain: 1,
		order: 9,
		available: true,
		title: { ko: "반응형, 모바일, 모션 접근성", en: "Responsive, Mobile, and Motion Accessibility" },
		summary: {
			ko: "리플로우·텍스트 간격·방향, 포인터 제스처와 타깃 크기, 모션 민감성과 prefers-reduced-motion을 학습합니다.",
			en: "Learn reflow, text spacing, orientation, pointer gestures and target size, and motion sensitivity with prefers-reduced-motion.",
		},
		objectives: {
			ko: [
				"리플로우(1.4.10)와 텍스트 간격(1.4.12) 요구사항을 설명할 수 있다",
				"화면 방향(1.3.4) 기준을 이해한다",
				"포인터 제스처·취소·타깃 크기 기준을 구분할 수 있다",
				"모션 민감 사용자를 위한 prefers-reduced-motion 적용을 설명할 수 있다",
			],
			en: [
				"Explain the Reflow (1.4.10) and Text Spacing (1.4.12) requirements",
				"Understand the Orientation criterion (1.3.4)",
				"Distinguish pointer gesture, cancellation, and target size criteria",
				"Describe applying prefers-reduced-motion for motion-sensitive users",
			],
		},
		content: { ko: [], en: [] },
		sections: [
			{
				heading: { ko: "리플로우와 텍스트 간격", en: "Reflow and Text Spacing" },
				paragraphs: {
					ko: [
						"리플로우(WCAG 1.4.10, Level AA): 400% 확대 — 320 CSS픽셀 폭 상당 — 에서 두 방향 스크롤 없이 콘텐츠를 이용할 수 있어야 합니다. 저시력 확대 사용자가 한 줄을 읽으려고 좌우로 스크롤을 반복하는 상황을 막는 기준으로, 반응형 설계로 충족합니다. 데이터 테이블·지도처럼 2차원 배치가 본질인 콘텐츠는 예외입니다.",
						"텍스트 간격(1.4.12, Level AA): 사용자가 줄 간격 1.5배, 문단 간격 2배, 자간 0.12em, 어간 0.16em으로 키워도 콘텐츠와 기능이 손실되지 않아야 합니다. 고정 높이 컨테이너에 텍스트를 가두면 이 기준에서 잘림이 발생합니다 — 높이는 콘텐츠를 따라가게 설계하세요.",
					],
					en: [
						"Reflow (WCAG 1.4.10, Level AA): at 400% zoom — equivalent to 320 CSS pixels width — content must be usable without two-dimensional scrolling. It prevents low-vision zoom users from scrolling sideways for every line, and is met through responsive design. Content that is inherently two-dimensional (data tables, maps) is excepted.",
						"Text Spacing (1.4.12, Level AA): content and functionality must survive user overrides of line height 1.5×, paragraph spacing 2×, letter spacing 0.12em, and word spacing 0.16em. Text locked in fixed-height containers clips under this criterion — let heights follow content.",
					],
				},
			},
			{
				heading: { ko: "화면 방향과 모바일 고려", en: "Orientation and Mobile Considerations" },
				paragraphs: {
					ko: [
						"화면 방향(1.3.4, Level AA): 세로 또는 가로 방향 하나로 표시를 제한하면 안 됩니다. 휠체어에 기기를 고정한 사용자는 방향을 돌릴 수 없습니다 — '가로로 돌려서 보세요' 안내는 이 기준 위반입니다(은행 수표 촬영처럼 방향이 본질적인 경우 예외).",
						"모바일 특유의 점검 항목: 확대 차단 금지(user-scalable=no, maximum-scale=1 설정 금지), 가상 키보드에 맞는 입력 타입(type=\"tel\", inputmode), 화면낭독기 제스처(TalkBack·VoiceOver 스와이프 탐색)와의 호환, 포커스·호버에 기대는 상호작용의 터치 대안.",
					],
					en: [
						"Orientation (1.3.4, Level AA): display must not be restricted to portrait or landscape alone. A user with a device mounted to a wheelchair cannot rotate it — 'please rotate your device' violates this criterion (excepting essential orientations like check deposit capture).",
						"Mobile-specific checks: never block zoom (no user-scalable=no or maximum-scale=1), use input types suited to virtual keyboards (type=\"tel\", inputmode), stay compatible with screen reader gestures (TalkBack/VoiceOver swipe navigation), and provide touch alternatives for hover- and focus-dependent interactions.",
					],
				},
			},
			{
				heading: { ko: "포인터 제스처, 취소, 타깃 크기", en: "Pointer Gestures, Cancellation, and Target Size" },
				paragraphs: {
					ko: [
						"포인터 제스처(2.5.1, Level A): 핀치 줌·두 손가락 스와이프 같은 다중 지점·경로 기반 제스처에는 단일 포인터 대안(+/- 버튼)이 필요합니다. 포인터 취소(2.5.2, Level A): 실행은 눌렀을 때(down)가 아니라 뗄 때(up) 일어나야 잘못 누른 사용자가 밖으로 끌어서 취소할 수 있습니다.",
						"타깃 크기: WCAG 2.2의 2.5.8(Level AA)은 최소 24×24 CSS픽셀(또는 충분한 간격)을, 2.5.5(Level AAA)는 44×44를 요구합니다. 드래그 동작(2.5.7, 2.2 신규 AA)에는 드래그 없는 대안이 필요합니다 — 정렬 리스트라면 위/아래 이동 버튼을 함께 제공합니다.",
					],
					en: [
						"Pointer Gestures (2.5.1, Level A): multipoint and path-based gestures — pinch zoom, two-finger swipes — need single-pointer alternatives (+/- buttons). Pointer Cancellation (2.5.2, Level A): activation should occur on the up-event, not down, so users who mispress can drag away to cancel.",
						"Target size: WCAG 2.2's 2.5.8 (Level AA) requires at least 24×24 CSS pixels (or sufficient spacing); 2.5.5 (Level AAA) requires 44×44. Dragging Movements (2.5.7, new AA in 2.2) requires a non-drag alternative — a sortable list should also offer move up/down buttons.",
					],
				},
			},
			{
				heading: { ko: "모션 민감성과 애니메이션", en: "Motion Sensitivity and Animation" },
				paragraphs: {
					ko: [
						"패럴랙스·확대 전환 같은 모션은 전정 장애가 있는 사용자에게 어지럼증과 구역감을 유발할 수 있습니다. CSS 미디어 쿼리 prefers-reduced-motion: reduce를 감지해 장식적 애니메이션을 끄거나 페이드로 대체하는 것이 표준 대응입니다. WCAG 2.3.3(상호작용에서의 애니메이션, Level AAA)이 이를 직접 다룹니다.",
						"관련 기준: 움직이는 콘텐츠(캐러셀, 자동 스크롤)는 정지·일시정지·숨김 수단이 필요하고(2.2.2, Level A), 기기 흔들기 같은 동작 기반 조작에는 UI 대안과 동작 끄기 옵션이 필요합니다(2.5.4 동작 작동, Level A). 자동 재생 캐러셀은 정지 버튼 없이는 A 수준부터 위반이라는 점이 자주 출제됩니다.",
					],
					en: [
						"Motion like parallax and zoom transitions can trigger dizziness and nausea in users with vestibular disorders. The standard response is honoring the CSS media query prefers-reduced-motion: reduce — disabling decorative animation or replacing it with fades. WCAG 2.3.3 (Animation from Interactions, Level AAA) addresses this directly.",
						"Related criteria: moving content (carousels, auto-scroll) needs pause, stop, or hide controls (2.2.2, Level A), and motion-based operation like shake gestures needs UI alternatives plus a way to disable motion (2.5.4 Motion Actuation, Level A). A frequently tested point: an auto-playing carousel without a pause control fails at Level A.",
					],
				},
			},
		],
		questions: [
			{
				id: "was-1-9-q1",
				question: {
					ko: "고정 높이 컨테이너에 텍스트를 가두는 것이 위반할 수 있는 기준은?",
					en: "Locking text in a fixed-height container can violate which criterion?",
				},
				options: {
					a: { ko: "1.4.12 텍스트 간격 — 간격 확대 시 잘림 발생", en: "1.4.12 Text Spacing — content clips when spacing is increased" },
					b: { ko: "2.1.1 키보드", en: "2.1.1 Keyboard" },
					c: { ko: "1.2.2 자막", en: "1.2.2 Captions" },
					d: { ko: "3.1.1 페이지 언어", en: "3.1.1 Language of Page" },
				},
				answer: "a",
				explanation: {
					ko: "1.4.12는 사용자가 줄·문단·자간·어간을 키워도 콘텐츠가 손실되지 않을 것을 요구합니다. 고정 높이에 가둔 텍스트는 간격 확대 시 잘리므로, 높이는 콘텐츠를 따라가게 설계해야 합니다.",
					en: "1.4.12 requires content to survive user-increased line, paragraph, letter, and word spacing. Fixed-height text clips when spacing grows — let heights follow content.",
				},
			},
			{
				id: "was-1-9-q2",
				question: {
					ko: "'가로로 돌려서 보세요' 안내가 위반하는 기준과 그 이유는?",
					en: "Which criterion does 'please rotate your device' violate, and why?",
				},
				options: {
					a: { ko: "1.3.4 방향 — 휠체어 고정 기기 사용자는 방향을 돌릴 수 없다", en: "1.3.4 Orientation — users with wheelchair-mounted devices cannot rotate" },
					b: { ko: "1.4.3 대비 — 회전하면 색이 바뀐다", en: "1.4.3 Contrast — rotation changes colors" },
					c: { ko: "2.4.1 블록 건너뛰기", en: "2.4.1 Bypass Blocks" },
					d: { ko: "위반이 아니다", en: "It is not a violation" },
				},
				answer: "a",
				explanation: {
					ko: "1.3.4(Level AA)는 표시를 한 방향으로 제한하지 못하게 합니다. 기기를 휠체어 등에 고정한 사용자는 회전이 불가능합니다. 수표 촬영처럼 방향이 본질적인 경우만 예외입니다.",
					en: "1.3.4 (Level AA) forbids restricting display to a single orientation. Users with devices mounted to wheelchairs cannot rotate. Only essential orientations (like check capture) are excepted.",
				},
			},
			{
				id: "was-1-9-q3",
				question: {
					ko: "WCAG 2.2의 2.5.8 타깃 크기(Level AA)가 요구하는 최소 크기는?",
					en: "What minimum size does WCAG 2.2's 2.5.8 Target Size (Level AA) require?",
				},
				options: {
					a: { ko: "16×16 CSS픽셀", en: "16×16 CSS pixels" },
					b: { ko: "24×24 CSS픽셀 (또는 충분한 간격)", en: "24×24 CSS pixels (or sufficient spacing)" },
					c: { ko: "44×44 CSS픽셀", en: "44×44 CSS pixels" },
					d: { ko: "60×60 CSS픽셀", en: "60×60 CSS pixels" },
				},
				answer: "b",
				explanation: {
					ko: "2.5.8(Level AA, WCAG 2.2 신규)은 최소 24×24 CSS픽셀 또는 동등한 간격 확보를 요구합니다. 44×44는 2.5.5(Level AAA)의 기준입니다.",
					en: "2.5.8 (Level AA, new in WCAG 2.2) requires at least 24×24 CSS pixels or equivalent spacing. 44×44 is the 2.5.5 (Level AAA) standard.",
				},
			},
			{
				id: "was-1-9-q4",
				question: {
					ko: "prefers-reduced-motion 미디어 쿼리의 용도는?",
					en: "What is the purpose of the prefers-reduced-motion media query?",
				},
				options: {
					a: { ko: "저사양 기기의 성능 최적화", en: "Performance optimization for low-end devices" },
					b: { ko: "모션 최소화를 설정한 사용자(전정 장애 등)에게 장식적 애니메이션을 끄거나 대체 제공", en: "Disabling or replacing decorative animation for users who set reduced motion (e.g., vestibular disorders)" },
					c: { ko: "다크 모드 감지", en: "Detecting dark mode" },
					d: { ko: "네트워크 속도 감지", en: "Detecting network speed" },
				},
				answer: "b",
				explanation: {
					ko: "전정 장애 사용자에게 패럴랙스·확대 전환은 어지럼증을 유발할 수 있습니다. OS의 '동작 줄이기' 설정을 prefers-reduced-motion으로 감지해 애니메이션을 끄거나 페이드로 대체하는 것이 표준 대응입니다.",
					en: "Parallax and zoom transitions can cause dizziness for users with vestibular disorders. Detecting the OS 'reduce motion' setting via prefers-reduced-motion and disabling or fading animations is the standard response.",
				},
			},
		],
	},
];
