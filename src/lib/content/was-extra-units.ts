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
	// ── Domain 1 신규 (BoK 커버리지 배치 C-3) ─────────────────────────────────
	{
		id: "was-1-10",
		exam: "was",
		domain: 1,
		order: 10,
		available: true,
		title: { ko: "접근성 표준 생태계", en: "The Accessibility Standards Ecosystem" },
		summary: {
			ko: "WCAG를 둘러싼 W3C 표준 가족 — ATAG, UAAG, WAI-ARIA — 과 유럽 표준 EN 301 549, 규범/비규범 문서의 구분, '접근성 지원' 개념을 학습합니다. WAS BoK Domain 1A의 핵심입니다.",
			en: "Learn the W3C standards family around WCAG — ATAG, UAAG, WAI-ARIA — plus the European standard EN 301 549, the normative/non-normative distinction, and the concept of 'accessibility supported.' Core to WAS BoK Domain 1A.",
		},
		objectives: {
			ko: [
				"ATAG의 두 파트(저작 도구 UI 접근성, 접근 가능한 콘텐츠 생산 지원)를 설명할 수 있다",
				"UAAG가 다루는 사용자 에이전트의 책임을 설명할 수 있다",
				"EN 301 549와 WCAG의 관계, 적용 범위 차이를 설명할 수 있다",
				"규범(normative)과 비규범(non-normative) 문서를 구분하고 예를 들 수 있다",
				"'접근성 지원(accessibility supported)' 기술 사용의 의미를 설명할 수 있다",
			],
			en: [
				"Explain ATAG's two parts (accessible authoring tool UI; support for producing accessible content)",
				"Describe the user agent responsibilities UAAG addresses",
				"Explain how EN 301 549 relates to WCAG and how their scopes differ",
				"Distinguish normative from non-normative documents with examples",
				"Explain what 'accessibility supported' use of technologies means",
			],
		},
		content: { ko: [], en: [] },
		sections: [
			{
				heading: { ko: "W3C 표준 가족 한눈에 보기", en: "The W3C Standards Family at a Glance" },
				paragraphs: {
					ko: [
						"W3C WAI의 접근성 표준은 역할별로 나뉩니다. WCAG는 '콘텐츠'의 접근성을, ATAG는 콘텐츠를 만드는 '저작 도구'를, UAAG는 콘텐츠를 소비하는 '사용자 에이전트(브라우저·미디어 플레이어 등)'를 다룹니다. WAI-ARIA는 표준이라기보다 콘텐츠에 시맨틱을 더하는 '기술 명세'로, WCAG 충족의 수단이 됩니다.",
						"세 축이 함께 작동해야 접근성이 완성됩니다: 저작 도구가 접근 가능한 콘텐츠 생산을 돕고(ATAG), 그 콘텐츠가 WCAG를 충족하며, 브라우저와 보조기술이 이를 올바르게 전달(UAAG)하는 구조입니다. 시험에서는 각 표준이 '누구의 책임'을 다루는지 정확히 짝지어야 합니다.",
					],
					en: [
						"W3C WAI's accessibility standards divide by role. WCAG covers the accessibility of content; ATAG covers the authoring tools that create content; UAAG covers the user agents — browsers, media players — that consume it. WAI-ARIA is less a standard than a technical specification adding semantics to content, serving as a means of meeting WCAG.",
						"Accessibility requires all three working together: authoring tools help produce accessible content (ATAG), that content meets WCAG, and browsers plus assistive technologies convey it correctly (UAAG). The exam requires matching each standard to whose responsibility it addresses.",
					],
				},
			},
			{
				heading: { ko: "ATAG — 저작 도구 접근성 지침", en: "ATAG — Authoring Tool Accessibility Guidelines" },
				paragraphs: {
					ko: [
						"ATAG 2.0(2015 W3C 권고안)은 CMS, 위지위그 편집기, 블로그 플랫폼, 코드 편집기, SNS의 글쓰기 UI 등 '콘텐츠를 만들어내는 모든 소프트웨어'에 적용됩니다. 두 파트로 구성됩니다: Part A — 저작 도구의 UI 자체가 장애가 있는 저작자에게 접근 가능할 것, Part B — 도구가 모든 저작자로 하여금 접근 가능한 콘텐츠를 만들도록 지원·유도할 것.",
						"Part B의 예: 이미지 삽입 시 대체 텍스트 입력을 요구하는 프롬프트, 접근 가능한 기본 템플릿 제공, 자동 검사와 수정 제안, 저작자가 입력한 접근성 정보(alt 등)의 보존. 실무 함의: 조직이 CMS를 도입할 때 ATAG 적합성을 평가 기준에 넣으면 콘텐츠 접근성이 구조적으로 개선됩니다.",
					],
					en: [
						"ATAG 2.0 (W3C Recommendation, 2015) applies to any software that produces content — CMSs, WYSIWYG editors, blogging platforms, code editors, social media posting UIs. It has two parts: Part A — the authoring tool's own UI must be accessible to authors with disabilities; Part B — the tool must support and guide all authors in producing accessible content.",
						"Part B examples: prompting for alt text when inserting images, providing accessible default templates, automated checks with repair suggestions, and preserving accessibility information the author entered. The practical implication: putting ATAG conformance in CMS procurement criteria structurally improves content accessibility.",
					],
				},
			},
			{
				heading: { ko: "UAAG — 사용자 에이전트 접근성 지침", en: "UAAG — User Agent Accessibility Guidelines" },
				paragraphs: {
					ko: [
						"UAAG 2.0(2015, W3C 노트)은 브라우저·미디어 플레이어·확장 프로그램 등 사용자 에이전트의 접근성 책임을 다룹니다. 예: 사용자 스타일시트·텍스트 확대·색상 재정의 같은 사용자 제어 제공, 키보드만으로 모든 UI 조작 가능, 콘텐츠의 접근성 정보(대체 텍스트, 캡션)를 사용자에게 전달, 보조기술과의 프로그래밍 인터페이스(접근성 API) 지원.",
						"UAAG 2.0은 권고안(Recommendation)까지 가지 못하고 작업 그룹 노트(Working Group Note)로 발행되었습니다 — 규범적 표준은 아니지만 브라우저 접근성 기능의 사실상 참조 문서입니다. 콘텐츠 제작자 입장에서는 '브라우저가 해줄 일'과 '콘텐츠가 해야 할 일'의 경계를 이해하는 데 유용합니다: 예컨대 텍스트 확대는 브라우저 기능이지만, 확대 시 깨지지 않는 레이아웃(리플로우)은 콘텐츠의 책임입니다.",
					],
					en: [
						"UAAG 2.0 (2015, W3C Note) addresses the accessibility responsibilities of user agents — browsers, media players, extensions. Examples: user controls such as user stylesheets, text zoom, and color overrides; full keyboard operability of the UI; conveying content accessibility information (alt text, captions) to users; and supporting programmatic interfaces (accessibility APIs) for assistive technologies.",
						"UAAG 2.0 was published as a Working Group Note rather than reaching Recommendation — not a normative standard, but the de facto reference for browser accessibility features. For content authors it clarifies the boundary between what the browser does and what content must do: text zoom is a browser feature, but a layout that survives zoom (reflow) is the content's responsibility.",
					],
				},
			},
			{
				heading: { ko: "EN 301 549 — 유럽 ICT 접근성 표준", en: "EN 301 549 — The European ICT Accessibility Standard" },
				paragraphs: {
					ko: [
						"EN 301 549는 유럽 표준화 기구(ETSI·CEN·CENELEC)가 발행하는 ICT 접근성 요구사항 표준입니다. 웹은 물론 소프트웨어, 하드웨어, 문서, 모바일 앱, 지원 서비스까지 포괄하며, 웹 관련 조항(9장)은 WCAG 2.1 Level AA를 그대로 통합합니다. EU 웹 접근성 지침(WAD)과 유럽 접근성법(EAA)의 적합성 추정 기준으로 사용되어 유럽 시장에서 법적 효력을 갖는 참조 표준입니다.",
						"WCAG와의 차이: WCAG는 웹 콘텐츠만 다루지만 EN 301 549는 ICT 전반을 다루며, 웹 밖 영역(하드웨어의 물리적 조작부, 실시간 양방향 통신, 문서)에 고유 요구사항을 둡니다. WAS 시험 관점: 'WCAG를 포함하되 더 넓은 범위'라는 관계, 그리고 EU 공공 조달·EAA 준수에서의 역할을 기억하세요.",
					],
					en: [
						"EN 301 549 is the ICT accessibility requirements standard published by the European standardization organizations (ETSI, CEN, CENELEC). It covers software, hardware, documents, mobile apps, and support services as well as the web; its web clauses (Chapter 9) incorporate WCAG 2.1 Level AA directly. As the presumption-of-conformity standard for the EU Web Accessibility Directive and the European Accessibility Act, it carries legal weight in the European market.",
						"Versus WCAG: WCAG covers web content only, while EN 301 549 spans ICT broadly, with requirements beyond the web (physical hardware controls, real-time two-way communication, documents). For the WAS exam, remember the relationship — 'includes WCAG but broader' — and its role in EU public procurement and EAA compliance.",
					],
				},
			},
			{
				heading: { ko: "규범 vs 비규범, 접근성 지원", en: "Normative vs. Non-Normative, and Accessibility Supported" },
				paragraphs: {
					ko: [
						"규범(normative) 문서는 적합성 판정의 기준이 되는 부분입니다 — WCAG의 성공 기준과 적합성 요구사항이 여기 해당합니다. 비규범(non-normative, informative) 문서는 이해와 구현을 돕는 참고 자료로, Understanding 문서, Techniques(기법), ARIA APG가 대표적입니다. 기법 문서를 그대로 따라도 그것이 적합성을 보장하지 않으며, 반대로 기법 문서에 없는 방법으로도 성공 기준을 충족할 수 있습니다.",
						"'접근성 지원(accessibility supported)'은 WCAG 적합성의 전제 조건입니다: 콘텐츠가 사용하는 웹 기술(HTML, ARIA, JavaScript 등)의 사용 방식이 사용자의 보조기술과 브라우저에서 실제로 작동해야 합니다. 예컨대 최신 ARIA 속성이 명세에 있어도 주요 스크린 리더가 지원하지 않으면 그 방식에 의존한 적합성 주장은 성립하지 않습니다. 그래서 실무에서는 '잘 지원되는 기법 선택'이 성공 기준 암기만큼 중요합니다.",
					],
					en: [
						"Normative documents are what conformance is judged against — WCAG's success criteria and conformance requirements. Non-normative (informative) documents aid understanding and implementation: the Understanding documents, Techniques, and the ARIA APG. Following a technique verbatim does not guarantee conformance, and success criteria can equally be met by methods not in any technique document.",
						"'Accessibility supported' is a precondition of WCAG conformance: the way content uses web technologies (HTML, ARIA, JavaScript) must actually work in users' assistive technologies and browsers. A new ARIA attribute may exist in the spec, but if major screen readers don't support it, a conformance claim relying on it fails. In practice, choosing well-supported techniques matters as much as memorizing success criteria.",
					],
				},
			},
		],
		references: [
			{ label: { ko: "W3C — ATAG 개요", en: "W3C — ATAG at a Glance" }, url: "https://www.w3.org/WAI/standards-guidelines/atag/" },
			{ label: { ko: "W3C — UAAG 개요", en: "W3C — UAAG Overview" }, url: "https://www.w3.org/WAI/standards-guidelines/uaag/" },
			{ label: { ko: "ETSI — EN 301 549", en: "ETSI — EN 301 549" }, url: "https://www.etsi.org/human-factors-accessibility/en-301-549-v3-the-harmonized-european-standard-for-ict-accessibility" },
			{ label: { ko: "WCAG — 접근성 지원 이해하기", en: "WCAG — Understanding Accessibility Support" }, url: "https://www.w3.org/WAI/WCAG22/Understanding/conformance#accessibility-support" },
		],
		questions: [
			{
				id: "was-1-10-q1",
				question: {
					ko: "ATAG Part B가 요구하는 것은?",
					en: "What does ATAG Part B require?",
				},
				options: {
					a: { ko: "저작 도구가 접근 가능한 콘텐츠 생산을 지원·유도할 것", en: "The authoring tool supports and guides production of accessible content" },
					b: { ko: "저작 도구 UI 자체의 접근성", en: "Accessibility of the authoring tool's own UI" },
					c: { ko: "브라우저의 키보드 조작성", en: "Keyboard operability of browsers" },
					d: { ko: "웹 콘텐츠의 색상 대비", en: "Color contrast of web content" },
				},
				answer: "a",
				explanation: {
					ko: "ATAG는 Part A(도구 UI의 접근성)와 Part B(접근 가능한 콘텐츠 생산 지원 — alt 프롬프트, 접근 가능한 템플릿, 자동 검사 등)로 구성됩니다. b는 Part A, c는 UAAG의 영역입니다.",
					en: "ATAG comprises Part A (accessible tool UI) and Part B (supporting accessible content production — alt prompts, accessible templates, automated checks). Option b is Part A; c belongs to UAAG.",
				},
			},
			{
				id: "was-1-10-q2",
				question: {
					ko: "브라우저·미디어 플레이어의 접근성 책임을 다루는 지침은?",
					en: "Which guidelines address the accessibility responsibilities of browsers and media players?",
				},
				options: {
					a: { ko: "WCAG", en: "WCAG" },
					b: { ko: "ATAG", en: "ATAG" },
					c: { ko: "UAAG", en: "UAAG" },
					d: { ko: "WCAG-EM", en: "WCAG-EM" },
				},
				answer: "c",
				explanation: {
					ko: "UAAG(User Agent Accessibility Guidelines)는 브라우저 등 사용자 에이전트의 책임 — 사용자 제어, 키보드 조작, 접근성 API 지원 — 을 다룹니다. WCAG는 콘텐츠, ATAG는 저작 도구입니다.",
					en: "UAAG covers user agents — user controls, keyboard operability, accessibility API support. WCAG covers content; ATAG covers authoring tools.",
				},
			},
			{
				id: "was-1-10-q3",
				question: {
					ko: "EN 301 549와 WCAG의 관계로 옳은 것은?",
					en: "Which correctly describes the relationship between EN 301 549 and WCAG?",
				},
				options: {
					a: { ko: "EN 301 549는 웹 조항에 WCAG를 통합하되 ICT 전반으로 범위가 더 넓다", en: "EN 301 549 incorporates WCAG for its web clauses but spans ICT more broadly" },
					b: { ko: "서로 무관한 경쟁 표준이다", en: "They are unrelated competing standards" },
					c: { ko: "WCAG가 EN 301 549를 포함한다", en: "WCAG includes EN 301 549" },
					d: { ko: "EN 301 549는 웹사이트에만 적용된다", en: "EN 301 549 applies only to websites" },
				},
				answer: "a",
				explanation: {
					ko: "EN 301 549의 9장은 WCAG 2.1 AA를 그대로 통합하며, 그 외 소프트웨어·하드웨어·문서·지원 서비스에 고유 요구사항을 둡니다. EU WAD·EAA의 적합성 추정 기준입니다.",
					en: "Chapter 9 of EN 301 549 incorporates WCAG 2.1 AA directly, adding requirements for software, hardware, documents, and support services. It underpins the EU WAD and EAA.",
				},
			},
			{
				id: "was-1-10-q4",
				question: {
					ko: "WCAG에서 규범(normative) 문서에 해당하는 것은?",
					en: "Which is a normative part of WCAG?",
				},
				options: {
					a: { ko: "Understanding 문서", en: "The Understanding documents" },
					b: { ko: "성공 기준과 적합성 요구사항", en: "The success criteria and conformance requirements" },
					c: { ko: "Techniques 문서", en: "The Techniques documents" },
					d: { ko: "ARIA APG", en: "The ARIA APG" },
				},
				answer: "b",
				explanation: {
					ko: "적합성 판정의 기준이 되는 성공 기준·적합성 요구사항이 규범입니다. Understanding·Techniques·APG는 이해와 구현을 돕는 비규범(informative) 자료로, 따라도 적합성을 보장하지 않습니다.",
					en: "Success criteria and conformance requirements are normative. Understanding, Techniques, and the APG are informative — following them does not guarantee conformance.",
				},
			},
			{
				id: "was-1-10-q5",
				question: {
					ko: "'접근성 지원(accessibility supported)' 조건의 의미로 옳은 것은?",
					en: "What does the 'accessibility supported' condition mean?",
				},
				options: {
					a: { ko: "사용한 기술의 사용 방식이 사용자의 보조기술·브라우저에서 실제로 작동해야 적합성이 성립한다", en: "The way technologies are used must actually work in users' assistive technologies and browsers for conformance to hold" },
					b: { ko: "모든 브라우저에서 픽셀 단위로 동일하게 보여야 한다", en: "Pages must look pixel-identical in all browsers" },
					c: { ko: "명세에 존재하는 속성은 무조건 사용해도 된다", en: "Any attribute in a spec is always safe to rely on" },
					d: { ko: "보조기술 없이도 쓸 수 있어야 한다", en: "Content must be usable without assistive technology" },
				},
				answer: "a",
				explanation: {
					ko: "명세에 있어도 주요 보조기술이 지원하지 않는 방식에 의존하면 적합성 주장이 성립하지 않습니다. 잘 지원되는 기법을 선택하는 것이 WCAG 적합성의 전제 조건입니다.",
					en: "Relying on a technique major assistive technologies don't support invalidates a conformance claim, even if it's in the spec. Choosing well-supported techniques is a precondition of WCAG conformance.",
				},
			},
			{
				id: "was-1-10-q6",
				question: {
					ko: "CMS 도입 시 콘텐츠 접근성을 구조적으로 개선하려면 어떤 표준의 적합성을 평가 기준에 넣어야 하는가?",
					en: "To structurally improve content accessibility when adopting a CMS, conformance to which standard should be an evaluation criterion?",
				},
				options: {
					a: { ko: "UAAG", en: "UAAG" },
					b: { ko: "ATAG", en: "ATAG" },
					c: { ko: "ISO 9001", en: "ISO 9001" },
					d: { ko: "WCAG-EM", en: "WCAG-EM" },
				},
				answer: "b",
				explanation: {
					ko: "CMS는 저작 도구이므로 ATAG가 기준입니다. ATAG 적합 도구는 alt 프롬프트, 접근 가능한 템플릿, 자동 검사 등으로 모든 저작자가 접근 가능한 콘텐츠를 만들도록 돕습니다.",
					en: "A CMS is an authoring tool, so ATAG applies. ATAG-conformant tools guide all authors toward accessible content via alt prompts, accessible templates, and automated checks.",
				},
			},
		],
	},
	{
		id: "was-1-11",
		exam: "was",
		domain: 1,
		order: 11,
		available: true,
		title: { ko: "장애 사용자의 웹 이용 전략", en: "How People with Disabilities Use the Web" },
		summary: {
			ko: "여섯 사용자 그룹 — 전맹, 저시력, 읽기 제한, 인지, 운동, 청각 — 이 실제로 웹을 탐색하는 전략을 학습합니다. WAS BoK Domain 1H로, 기술 결정의 '왜'를 제공하는 토대입니다.",
			en: "Learn the strategies six user groups — blind, low vision, limited reading, cognitive, motor, auditory — actually use to navigate the web. This is WAS BoK Domain 1H, the 'why' behind technical decisions.",
		},
		objectives: {
			ko: [
				"스크린 리더 사용자의 대표 탐색 전략(헤딩·랜드마크·링크 목록)을 설명할 수 있다",
				"저시력 사용자의 확대·고대비·리플로우 의존을 설명할 수 있다",
				"운동 장애 사용자의 키보드·스위치·음성 입력 전략을 설명할 수 있다",
				"인지·읽기 제한·청각 사용자의 대응 전략과 콘텐츠 요구사항을 연결할 수 있다",
				"사용자 선호 방식과 사이트 특정 방식의 차이를 설명할 수 있다",
			],
			en: [
				"Explain screen reader users' primary navigation strategies (headings, landmarks, link lists)",
				"Explain low-vision users' reliance on zoom, high contrast, and reflow",
				"Explain keyboard, switch, and voice input strategies of users with motor disabilities",
				"Connect the coping strategies of cognitive, limited-reading, and auditory users to content requirements",
				"Explain user-preferred methods versus website-specific methods",
			],
		},
		content: { ko: [], en: [] },
		sections: [
			{
				heading: { ko: "전맹 사용자 — 스크린 리더 탐색", en: "Users Without Vision — Screen Reader Navigation" },
				paragraphs: {
					ko: [
						"스크린 리더 사용자는 페이지를 위에서 아래로 다 듣지 않습니다. 대표 전략: 헤딩 단축키(H, 1~6)로 구조를 건너뛰며 훑기, 랜드마크(main, nav 등)로 영역 간 이동, 링크 목록·헤딩 목록 대화상자(예: NVDA 요소 목록, VoiceOver 로터)에서 알파벳 탐색, 첫 글자 내비게이션, 찾기 기능. WebAIM 설문에서 헤딩 탐색은 수년째 압도적 1위 전략입니다.",
						"이 전략들이 작동하려면: 논리적 헤딩 계층, 올바른 랜드마크, 맥락 없이도 이해되는 링크 텍스트('여기를 클릭' 금지), 정확한 폼 레이블이 필요합니다. 또한 스크린 리더는 '가상 버퍼/브라우즈 모드'와 '포커스/폼 모드'를 전환하며 작동하므로, 커스텀 위젯이 role과 키보드 처리를 제대로 구현해야 모드 전환이 자연스럽습니다.",
					],
					en: [
						"Screen reader users don't listen to pages top to bottom. Primary strategies: skimming structure with heading shortcuts (H, 1–6), jumping between regions via landmarks (main, nav), alphabetical browsing in link/heading list dialogs (NVDA's elements list, VoiceOver's rotor), first-letter navigation, and find. In WebAIM's surveys, heading navigation has been the dominant strategy for years.",
						"For these to work you need: a logical heading hierarchy, correct landmarks, link text that makes sense out of context (no 'click here'), and accurate form labels. Screen readers also switch between virtual buffer/browse mode and focus/forms mode, so custom widgets must implement roles and keyboard handling correctly for smooth mode switching.",
					],
				},
			},
			{
				heading: { ko: "저시력·읽기 제한 사용자", en: "Users with Low Vision and Limited Reading" },
				paragraphs: {
					ko: [
						"저시력 사용자의 도구는 다양합니다: 브라우저 확대(200~400%), 화면 확대 프로그램(부분 확대·따라가기), 고대비/색상 반전 모드, 사용자 지정 글꼴·색상, 큰 커서. 핵심 요구: 400% 확대에서 가로 스크롤 없이 읽히는 리플로우(1.4.10), 확대해도 잘리지 않는 콘텐츠, 색에만 의존하지 않는 구분, 충분한 기본 대비. 일부는 스크린 리더를 병행합니다.",
						"읽기 제한(난독증 등) 사용자는 텍스트 음성 변환(TTS)으로 읽기를 보완하고, 읽기 도구(줄 강조, 글꼴 교체, 배경색 변경)를 씁니다. 콘텐츠 요구: 명확한 언어, 짧은 문단, 목록·헤딩으로 구조화, lang 속성의 정확한 지정(TTS 발음 결정), 텍스트를 이미지로 만들지 않기(도구가 조작할 수 없음).",
					],
					en: [
						"Low-vision users employ varied tools: browser zoom (200–400%), screen magnifiers (partial zoom with focus tracking), high-contrast/inverted modes, custom fonts and colors, large cursors. Key requirements: reflow at 400% zoom without horizontal scrolling (1.4.10), content that doesn't clip when enlarged, distinctions not by color alone, and adequate default contrast. Some also run a screen reader alongside.",
						"Users with limited reading (e.g., dyslexia) supplement reading with text-to-speech and reading tools (line highlighting, font swapping, background tinting). Content requirements: clear language, short paragraphs, structure via lists and headings, accurate lang attributes (which drive TTS pronunciation), and never rendering text as images (tools cannot manipulate them).",
					],
				},
			},
			{
				heading: { ko: "운동 장애 사용자 — 키보드·스위치·음성", en: "Users with Motor Disabilities — Keyboard, Switch, Voice" },
				paragraphs: {
					ko: [
						"마우스를 못 쓰거나 정밀 조작이 어려운 사용자의 전략: 키보드 전용 탐색(Tab/Shift+Tab, Enter/Space), 스위치 접근(한두 개의 스위치 + 스캐닝), 음성 제어(Dragon, 음성 컨트롤 — 보이는 레이블을 말해 클릭), 헤드 포인터·시선 추적, 키가드와 대체 키보드. 트랙볼이나 조이스틱으로 마우스를 대신하기도 합니다.",
						"콘텐츠 요구사항: 모든 기능의 키보드 접근(2.1.1)과 보이는 포커스(2.4.7), 논리적 포커스 순서, 건너뛰기 링크, 충분한 타깃 크기(2.5.8), 드래그의 대안(2.5.7), 시간 제한 조절(2.2.1). 음성 제어 사용자를 위해 접근 가능한 이름에 보이는 레이블 텍스트가 포함되어야 합니다(2.5.3 Label in Name) — 화면에 '검색'이라 쓰인 버튼의 접근 가능한 이름이 '찾기'라면 '검색 클릭'이 실패합니다.",
					],
					en: [
						"Users who can't use a mouse or lack fine motor control rely on: keyboard-only navigation (Tab/Shift+Tab, Enter/Space), switch access (one or two switches plus scanning), voice control (Dragon, Voice Control — speaking visible labels to click), head pointers and eye tracking, keyguards and alternative keyboards. Trackballs or joysticks may replace mice.",
						"Content requirements: keyboard access to everything (2.1.1) with visible focus (2.4.7), logical focus order, skip links, adequate target size (2.5.8), alternatives to dragging (2.5.7), adjustable time limits (2.2.1). For voice control users, the accessible name must contain the visible label text (2.5.3 Label in Name) — if a button showing '검색' has an accessible name of '찾기', saying 'click 검색' fails.",
					],
				},
			},
			{
				heading: { ko: "인지·청각 사용자", en: "Users with Cognitive and Auditory Disabilities" },
				paragraphs: {
					ko: [
						"인지 장애 사용자의 전략과 대응: 익숙한 패턴에 의존하므로 일관된 내비게이션(3.2.3)과 예측 가능한 동작(3.2.1~2)이 중요합니다. 주의 분산에 취약하므로 움직임 정지 수단(2.2.2), 시간 연장(2.2.1)이 필요하고, 기억 부담을 줄이는 자동 완성(1.3.5)·로그인 간소화(3.3.8)·오류 복구 안내(3.3.3)가 돕습니다. 일부는 광고 차단기, 리더 모드, 단순화 확장을 사용합니다.",
						"농·난청 사용자의 전략: 자막(라이브는 실시간 자막)과 대본에 의존하고, 일부 농인은 수어가 제1언어라 복잡한 문어 텍스트가 제2언어일 수 있음을 기억해야 합니다. 콘텐츠 요구: 모든 오디오의 자막(1.2.2)·대본, 음성 전용 안내 금지, 소리 알림의 시각적 대응물, 고객 지원의 텍스트 채널(채팅·이메일 — 전화 전용 금지).",
					],
					en: [
						"Cognitive strategies and responses: users rely on familiar patterns, so consistent navigation (3.2.3) and predictable behavior (3.2.1–2) matter. Vulnerable to distraction, they need ways to stop motion (2.2.2) and extend time (2.2.1); autocomplete (1.3.5), simpler logins (3.3.8), and error recovery guidance (3.3.3) reduce memory burden. Some use ad blockers, reader modes, and simplification extensions.",
						"Deaf and hard-of-hearing strategies: reliance on captions (live captions for live content) and transcripts; remember that for some Deaf users sign language is their first language, making complex written text a second language. Content requirements: captions (1.2.2) and transcripts for all audio, no voice-only flows, visual counterparts to sound alerts, and text channels for support (chat, email — never phone-only).",
					],
				},
			},
			{
				heading: { ko: "사용자 선호 방식 vs 사이트 특정 방식", en: "User-Preferred vs. Website-Specific Methods" },
				paragraphs: {
					ko: [
						"BoK가 강조하는 원칙: 사용자는 자신의 보조기술과 몸에 밴 전략(사용자 선호 방식)으로 모든 사이트를 탐색하고 싶어 하며, 사이트마다 다른 특수 장치(사이트 특정 방식 — 자체 접근성 위젯, 독자적 단축키, '접근성 모드' 별도 페이지)를 새로 배우기를 원하지 않습니다. 별도 접근성 오버레이 위젯이 비판받는 이유가 여기 있습니다 — 표준 시맨틱을 올바르게 쓰면 사용자의 기존 도구가 그대로 작동합니다.",
						"실무 결론: 표준 HTML 시맨틱과 WCAG 준수로 '사용자의 방식'을 지원하는 것이 우선이고, 사이트 고유 편의 기능(예: 단축키)은 표준을 보완하는 선택지로만 제공하며 충돌을 피해야 합니다(2.1.4 문자 단축키). 이 관점은 시험 전반 — 커스텀 위젯, 오버레이, 접근성 기능 설계 문항 — 의 판단 기준이 됩니다.",
					],
					en: [
						"The BoK's principle: users want to navigate every site with their own assistive technology and ingrained strategies (user-preferred methods), not to learn a new site-specific apparatus per site (custom accessibility widgets, proprietary shortcuts, separate 'accessibility mode' pages). This is why accessibility overlay widgets draw criticism — correct standard semantics let users' existing tools just work.",
						"The practical conclusion: supporting users' own methods through standard HTML semantics and WCAG conformance comes first; site-specific conveniences (e.g., shortcuts) are optional supplements that must avoid conflicts (2.1.4 Character Key Shortcuts). This perspective is the judgment standard across exam questions on custom widgets, overlays, and accessibility feature design.",
					],
				},
			},
		],
		references: [
			{ label: { ko: "W3C WAI — 사람들이 웹을 사용하는 방법", en: "W3C WAI — How People with Disabilities Use the Web" }, url: "https://www.w3.org/WAI/people-use-web/" },
			{ label: { ko: "WebAIM — 스크린 리더 사용자 설문", en: "WebAIM — Screen Reader User Survey" }, url: "https://webaim.org/projects/screenreadersurvey10/" },
			{ label: { ko: "WCAG 2.5.3 이름의 레이블 — 이해하기", en: "Understanding SC 2.5.3 Label in Name" }, url: "https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html" },
		],
		questions: [
			{
				id: "was-1-11-q1",
				question: {
					ko: "WebAIM 설문에서 스크린 리더 사용자의 압도적 1위 페이지 탐색 전략은?",
					en: "In WebAIM surveys, what is screen reader users' dominant page navigation strategy?",
				},
				options: {
					a: { ko: "헤딩 단위 탐색", en: "Navigating by headings" },
					b: { ko: "페이지 전체를 처음부터 듣기", en: "Listening to the whole page from the top" },
					c: { ko: "마우스 호버", en: "Mouse hovering" },
					d: { ko: "사이트맵 이용", en: "Using sitemaps" },
				},
				answer: "a",
				explanation: {
					ko: "헤딩 단축키로 구조를 훑는 것이 수년째 1위 전략입니다. 논리적 헤딩 계층이 그래서 중요합니다.",
					en: "Skimming structure via heading shortcuts has been the top strategy for years — which is why a logical heading hierarchy matters.",
				},
			},
			{
				id: "was-1-11-q2",
				question: {
					ko: "화면에 '검색'이라 표시된 버튼의 접근 가능한 이름이 '찾기'일 때 발생하는 문제는?",
					en: "A button visibly labeled 'Search' has an accessible name of 'Find.' What problem does this cause?",
				},
				options: {
					a: { ko: "음성 제어 사용자가 '검색 클릭'으로 버튼을 활성화하지 못한다 (2.5.3 위반)", en: "Voice control users can't activate it by saying 'click Search' (violates 2.5.3)" },
					b: { ko: "색상 대비가 낮아진다", en: "Color contrast decreases" },
					c: { ko: "키보드 포커스가 사라진다", en: "Keyboard focus disappears" },
					d: { ko: "아무 문제 없다", en: "No problem at all" },
				},
				answer: "a",
				explanation: {
					ko: "음성 제어 사용자는 보이는 레이블을 말해 조작합니다. 접근 가능한 이름에 보이는 텍스트가 포함되어야 한다는 것이 2.5.3(Label in Name)입니다.",
					en: "Voice control users speak visible labels. SC 2.5.3 (Label in Name) requires the accessible name to contain the visible text.",
				},
			},
			{
				id: "was-1-11-q3",
				question: {
					ko: "스위치 접근(switch access) 사용자의 입력 방식은?",
					en: "How do switch access users provide input?",
				},
				options: {
					a: { ko: "한두 개의 스위치와 스캐닝으로 항목을 순차 선택", en: "One or two switches plus scanning to select items sequentially" },
					b: { ko: "마우스 더블클릭", en: "Double-clicking a mouse" },
					c: { ko: "멀티터치 제스처", en: "Multi-touch gestures" },
					d: { ko: "스타일러스 필기", en: "Stylus handwriting" },
				},
				answer: "a",
				explanation: {
					ko: "스위치 사용자는 하이라이트가 항목을 순회(스캐닝)할 때 스위치를 눌러 선택합니다. 키보드 접근성이 확보된 콘텐츠가 스위치 접근의 전제입니다.",
					en: "Switch users press a switch as a highlight cycles (scans) through items. Keyboard-accessible content is the precondition for switch access.",
				},
			},
			{
				id: "was-1-11-q4",
				question: {
					ko: "일부 농인 사용자에게 복잡한 문어 텍스트가 어려울 수 있는 이유는?",
					en: "Why can complex written text be difficult for some Deaf users?",
				},
				options: {
					a: { ko: "수어가 제1언어이고 문어는 제2언어일 수 있기 때문", en: "Sign language may be their first language, making written text a second language" },
					b: { ko: "화면을 볼 수 없기 때문", en: "They cannot see the screen" },
					c: { ko: "스크린 리더가 텍스트를 읽지 못하기 때문", en: "Screen readers cannot read text" },
					d: { ko: "키보드를 쓸 수 없기 때문", en: "They cannot use keyboards" },
				},
				answer: "a",
				explanation: {
					ko: "수어는 독자적 문법을 가진 언어입니다. 수어가 제1언어인 농인에게 문어는 제2언어일 수 있어, 명확하고 단순한 언어가 청각 장애 대응에서도 중요합니다.",
					en: "Sign languages are full languages with their own grammar. For Deaf users whose first language is sign, written text is a second language — clear, simple language matters for auditory accessibility too.",
				},
			},
			{
				id: "was-1-11-q5",
				question: {
					ko: "접근성 오버레이 위젯이 비판받는 근본 이유는?",
					en: "What is the fundamental criticism of accessibility overlay widgets?",
				},
				options: {
					a: { ko: "사용자는 자신의 보조기술·전략(사용자 선호 방식)을 쓰고 싶어 하는데, 사이트마다 다른 특수 장치를 강요하기 때문", en: "Users want their own AT and strategies (user-preferred methods), but overlays impose a different site-specific apparatus per site" },
					b: { ko: "시각적으로 예쁘지 않기 때문", en: "They are not visually attractive" },
					c: { ko: "로딩 속도가 빨라지기 때문", en: "They make pages load faster" },
					d: { ko: "표준 시맨틱을 과도하게 사용하기 때문", en: "They overuse standard semantics" },
				},
				answer: "a",
				explanation: {
					ko: "표준 시맨틱과 WCAG 준수는 사용자의 기존 도구가 그대로 작동하게 합니다. 오버레이는 사이트 특정 방식을 새로 배우게 하고 기존 보조기술과 충돌하기도 합니다.",
					en: "Standard semantics and WCAG conformance let users' existing tools just work. Overlays force learning site-specific methods and can conflict with existing AT.",
				},
			},
			{
				id: "was-1-11-q6",
				question: {
					ko: "저시력 사용자를 위한 리플로우(1.4.10)의 요구사항은?",
					en: "What does Reflow (1.4.10) require for low-vision users?",
				},
				options: {
					a: { ko: "400% 확대(320px 폭 상당)에서 가로 스크롤 없이 콘텐츠를 읽을 수 있어야 한다", en: "Content readable without horizontal scrolling at 400% zoom (equivalent to 320px width)" },
					b: { ko: "모든 텍스트를 이미지로 제공해야 한다", en: "All text must be provided as images" },
					c: { ko: "확대 기능을 차단해야 한다", en: "Zoom must be disabled" },
					d: { ko: "고정 폭 레이아웃을 사용해야 한다", en: "Fixed-width layouts must be used" },
				},
				answer: "a",
				explanation: {
					ko: "1.4.10은 320 CSS 픽셀 폭(데스크톱 400% 확대 상당)에서 양방향 스크롤 없이 콘텐츠 이용이 가능하도록 요구합니다. 반응형 레이아웃이 표준 해법입니다(표·지도 등 예외 있음).",
					en: "1.4.10 requires content usable without two-dimensional scrolling at 320 CSS pixels (desktop 400% zoom). Responsive layout is the standard solution (with exceptions like tables and maps).",
				},
			},
		],
	},
];
