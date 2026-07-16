import type { QuizQuestion } from "../types";

/**
 * 시나리오형(사례 적용) 문항 — 실제 시험의 판단형 유형 대비.
 * id 규칙: `<unitId>-s<n>` (기존 -q/-x와 충돌 없음), difficulty: "hard".
 * index.ts의 withExtraQuestions로 단원에 병합된다.
 */
export const cpaccScenarioQuestions: Record<string, QuizQuestion[]> = {
	"cpacc-1-2": [
		{
			id: "cpacc-1-2-s1",
			difficulty: "hard",
			question: {
				ko: "은행 앱의 자산 그래프가 수익은 초록, 손실은 빨강으로만 구분됩니다. 색각 이상 사용자를 포함해 문제를 해소하는 가장 적절한 조치는?",
				en: "A banking app's chart shows gains in green and losses in red only. What best resolves this for users with color vision deficiencies?",
			},
			options: {
				a: { ko: "색을 더 선명한 초록·빨강으로 교체한다", en: "Use more saturated green and red" },
				b: { ko: "색에 더해 패턴·아이콘·텍스트 레이블을 병기한다", en: "Add patterns, icons, or text labels alongside color" },
				c: { ko: "그래프를 흑백으로 바꾼다", en: "Make the chart grayscale" },
				d: { ko: "색각 이상 사용자용 별도 앱을 만든다", en: "Build a separate app for color-blind users" },
			},
			answer: "b",
			explanation: {
				ko: "색만으로 정보를 전달하면 안 됩니다(WCAG 1.4.1). 색은 유지하되 패턴·아이콘·텍스트 등 색 외의 구분 수단을 병기하는 것이 모두에게 작동하는 해법입니다. 채도 조정은 적록 색각 이상에 도움이 되지 않고, 흑백 전환·별도 앱은 분리 설계입니다.",
				en: "Information must not rely on color alone (WCAG 1.4.1). Keep the colors but add non-color cues — patterns, icons, labels. Saturation doesn't help red-green CVD; grayscale or a separate app is segregated design.",
			},
		},
	],
	"cpacc-1-3": [
		{
			id: "cpacc-1-3-s1",
			difficulty: "hard",
			question: {
				ko: "내일 열리는 실시간 웨비나에 농인 참가자가 접근 편의를 요청했습니다. 가장 적절한 대응은?",
				en: "A Deaf participant requests accommodation for tomorrow's live webinar. What is the most appropriate response?",
			},
			options: {
				a: { ko: "녹화본을 나중에 자막과 함께 제공하겠다고 안내한다", en: "Offer a captioned recording afterward" },
				b: { ko: "실시간 속기 자막(CART) 또는 수어 통역을 준비하고 선호를 확인한다", en: "Arrange live captioning (CART) or sign interpretation, confirming their preference" },
				c: { ko: "발표 자료 PDF를 미리 보내준다", en: "Send the slide PDF in advance" },
				d: { ko: "자동 음성 인식 자막이면 충분하다고 판단한다", en: "Assume automatic speech recognition captions suffice" },
			},
			answer: "b",
			explanation: {
				ko: "실시간 행사에는 실시간 편의가 필요합니다. CART나 수어 통역이 표준 대응이며, 당사자의 선호(수어가 제1언어인지 등)를 확인하는 것이 에티켓입니다. 사후 녹화·자료 제공은 실시간 참여를 대체하지 못하고, 자동 자막은 정확도 한계로 단독으로는 부족할 수 있습니다.",
				en: "Live events need live accommodations — CART or sign interpretation, with the person's preference confirmed. Recordings and slides don't replace live participation; ASR captions alone can be too inaccurate.",
			},
		},
	],
	"cpacc-1-5": [
		{
			id: "cpacc-1-5-s1",
			difficulty: "hard",
			question: {
				ko: "공공 민원 사이트에서 20분 세션 만료 때문에 긴 양식을 작성하던 민원인들이 반복적으로 실패한다는 접수가 늘고 있습니다. 인지 장애 사용자까지 고려한 우선 조치는?",
				en: "Citizens keep losing long form submissions to a 20-minute session timeout on a government site. Considering users with cognitive disabilities, what is the priority fix?",
			},
			options: {
				a: { ko: "만료 전 경고와 함께 시간 연장 수단을 제공하고 입력을 자동 저장한다", en: "Warn before expiry with an option to extend, and auto-save progress" },
				b: { ko: "양식을 더 작은 글씨로 한 페이지에 압축한다", en: "Compress the form into one page with smaller text" },
				c: { ko: "세션을 10분으로 줄여 보안을 강화한다", en: "Shorten the session to 10 minutes for security" },
				d: { ko: "전화 접수로만 안내한다", en: "Direct users to phone-only submission" },
			},
			answer: "a",
			explanation: {
				ko: "WCAG 2.2.1(시간 조절 가능)은 시간 제한의 해제·연장 수단을 요구합니다. 입력 자동 저장은 인지 부담과 실패 비용을 함께 줄입니다. 압축은 인지 부담을 키우고, 전화 전용은 청각·언어 장애 사용자를 배제합니다.",
				en: "WCAG 2.2.1 (Timing Adjustable) requires a way to extend or disable limits; auto-saving reduces cognitive load and the cost of failure. Compression increases load; phone-only excludes deaf and speech-disabled users.",
			},
		},
	],
	"cpacc-2-1": [
		{
			id: "cpacc-2-1-s1",
			difficulty: "hard",
			question: {
				ko: "신청사 설계안 A는 정문에 완만한 통합 경사 진입로를, 설계안 B는 정문 계단 옆 후문에 휠체어 전용 리프트를 둡니다. 보편적 설계 관점에서 A를 선택해야 하는 핵심 근거는?",
				en: "Design A gives the new building one gently sloped main entrance for everyone; Design B adds a wheelchair lift at a rear door beside the main stairs. From a Universal Design view, why choose A?",
			},
			options: {
				a: { ko: "공평한 사용 — 분리나 낙인 없이 모든 사용자가 같은 방식으로 이용", en: "Equitable Use — the same means of use for all, without segregation or stigma" },
				b: { ko: "리프트가 경사로보다 비싸기 때문", en: "Lifts cost more than ramps" },
				c: { ko: "후문이 방범에 취약하기 때문", en: "Rear doors are a security risk" },
				d: { ko: "법이 리프트를 금지하기 때문", en: "The law bans lifts" },
			},
			answer: "a",
			explanation: {
				ko: "UD 1원칙 '공평한 사용'은 동일한 이용 수단을 제공하고 분리·낙인을 피하라고 요구합니다. 별도 후문·전용 설비는 접근은 가능하게 하지만 분리된 경험을 만듭니다. 비용·방범은 부차적 논거이고 리프트가 금지된 것도 아닙니다.",
				en: "UD Principle 1, Equitable Use: identical means of use, avoiding segregation and stigma. A rear lift provides access but a separate experience. Cost and security are secondary; lifts aren't prohibited.",
			},
		},
	],
	"cpacc-2-2": [
		{
			id: "cpacc-2-2-s1",
			difficulty: "hard",
			question: {
				ko: "온라인 쇼핑몰의 메가 메뉴가 마우스 호버로만 열리고 키보드로는 열 수 없습니다. POUR 중 어떤 원칙 위반이며 왜인가?",
				en: "A store's mega menu opens only on mouse hover and cannot be opened by keyboard. Which POUR principle is violated, and why?",
			},
			options: {
				a: { ko: "운용 가능(Operable) — 모든 기능이 키보드로 조작 가능해야 하므로", en: "Operable — all functionality must be available from a keyboard" },
				b: { ko: "인식 가능(Perceivable) — 메뉴가 보이지 않으므로", en: "Perceivable — the menu is invisible" },
				c: { ko: "이해 가능(Understandable) — 메뉴 구조가 복잡하므로", en: "Understandable — the menu is complex" },
				d: { ko: "견고(Robust) — 최신 브라우저가 필요하므로", en: "Robust — it needs a modern browser" },
			},
			answer: "a",
			explanation: {
				ko: "입력 방식과 무관하게 기능을 조작할 수 있어야 한다는 것은 운용 가능(Operable) 원칙, 구체적으로 2.1.1 키보드입니다. 메뉴가 시각적으로 보이므로 인식 가능 문제가 아니고, 구조 복잡성·브라우저 요건은 이 시나리오의 쟁점이 아닙니다.",
				en: "Operating functionality regardless of input method is Operable — specifically 2.1.1 Keyboard. The menu is visible, so it isn't a Perceivable issue; complexity and browser requirements aren't the point here.",
			},
		},
	],
	"cpacc-2-4": [
		{
			id: "cpacc-2-4-s1",
			difficulty: "hard",
			question: {
				ko: "온라인 강좌가 모든 개념을 영상 강의로만 전달합니다. UDL 관점에서 가장 적절한 개선은?",
				en: "An online course teaches every concept through video lectures only. What is the best improvement from a UDL perspective?",
			},
			options: {
				a: { ko: "같은 내용을 텍스트·도해 등 여러 표상 수단으로도 제공한다", en: "Offer the same content through multiple means of representation — text, diagrams" },
				b: { ko: "영상 화질을 4K로 올린다", en: "Upgrade videos to 4K" },
				c: { ko: "영상 길이를 두 배로 늘려 자세히 설명한다", en: "Double video length for more detail" },
				d: { ko: "수강 전 시력 검사를 요구한다", en: "Require a vision test before enrollment" },
			},
			answer: "a",
			explanation: {
				ko: "UDL의 첫 축은 '다양한 표상 수단 제공'입니다. 단일 매체(영상) 의존은 감각·인지 특성이 다른 학습자를 배제합니다. 화질·길이는 표상의 다양성과 무관합니다.",
				en: "UDL's first pillar is multiple means of representation. Relying on one medium excludes learners with different sensory and cognitive profiles. Resolution and length don't diversify representation.",
			},
		},
	],
	"cpacc-2-5": [
		{
			id: "cpacc-2-5-s1",
			difficulty: "hard",
			question: {
				ko: "경영진이 '접근성은 비용'이라며 투자를 미룹니다. 설득 논거로 가장 효과적인 구성은?",
				en: "Leadership delays investment, calling accessibility 'a cost.' Which argument set is most effective?",
			},
			options: {
				a: { ko: "장애·고령 시장 규모 + 법적 리스크 + SEO·품질 부수 효과를 함께 제시", en: "Combine the disability/aging market size, legal risk, and SEO/quality side benefits" },
				b: { ko: "도덕적 의무만 강조한다", en: "Stress moral duty alone" },
				c: { ko: "경쟁사도 안 하므로 서두를 필요 없다고 인정한다", en: "Concede competitors don't do it either" },
				d: { ko: "소송을 당한 뒤 대응하면 된다고 설명한다", en: "Explain you can react after a lawsuit" },
			},
			answer: "a",
			explanation: {
				ko: "W3C 비즈니스 사례가 권하는 접근: 시장 확대(전 세계 16%+고령층), 법적 리스크 감소, 혁신·SEO·품질 개선을 묶어 제시하는 것입니다. 단일 논거(도덕)만으로는 예산 결정을 움직이기 어렵고, 사후 대응은 소급 수정 비용이 훨씬 큽니다.",
				en: "The W3C business case combines market reach (16% + aging users), reduced legal risk, and innovation/SEO/quality gains. A single moral argument rarely moves budgets; reacting after lawsuits costs far more.",
			},
		},
	],
	"cpacc-1-8": [
		{
			id: "cpacc-1-8-s1",
			difficulty: "hard",
			question: {
				ko: "이벤트 페이지 기획안에 초당 5회 깜빡이는 대형 배너가 포함됐습니다. 검토자로서 가장 우선해야 할 판단은?",
				en: "A campaign page design includes a large banner flashing five times per second. As reviewer, what is your first call?",
			},
			options: {
				a: { ko: "광과민성 발작 위험 — WCAG 2.3.1 위반으로 출시 전 반드시 수정", en: "Photosensitive seizure risk — a WCAG 2.3.1 violation that must be fixed before launch" },
				b: { ko: "취향의 문제이므로 디자이너 재량에 맡긴다", en: "A matter of taste — leave it to the designer" },
				c: { ko: "이용 약관에 경고 문구를 추가한다", en: "Add a warning to the terms of service" },
				d: { ko: "야간에만 배너를 노출한다", en: "Show the banner only at night" },
			},
			answer: "a",
			explanation: {
				ko: "초당 3회 초과 섬광은 발작을 유발할 수 있는 안전 문제로, 2.3.1은 Level A 기준입니다. 발작은 예고 없이 일어나므로 경고 문구나 노출 시간 조정은 대책이 되지 못합니다 — 콘텐츠 자체를 수정해야 합니다.",
				en: "Flashing over three times per second is a safety issue that can trigger seizures — 2.3.1 is Level A. Seizures give no warning, so disclaimers or scheduling aren't mitigations; the content itself must change.",
			},
		},
	],
	"cpacc-3-1": [
		{
			id: "cpacc-3-1-s1",
			difficulty: "hard",
			question: {
				ko: "미국의 한 주(state) 정부가 민원 웹사이트를 개편합니다. 2024년 이후 명시적으로 적용되는 기술 기준은?",
				en: "A US state government is rebuilding its services website. What technical standard explicitly applies after 2024?",
			},
			options: {
				a: { ko: "ADA Title II 최종 규칙에 따른 WCAG 2.1 Level AA", en: "WCAG 2.1 Level AA under the ADA Title II final rule" },
				b: { ko: "Section 508 — 주정부도 연방기관이므로", en: "Section 508, since states are federal agencies" },
				c: { ko: "EN 301 549 — 국제 표준이므로", en: "EN 301 549, as an international standard" },
				d: { ko: "명시 기준 없음 — 소송 판례만 적용", en: "No explicit standard — only case law" },
			},
			answer: "a",
			explanation: {
				ko: "2024년 ADA Title II 최종 규칙이 주·지방 정부의 웹과 모바일 앱에 WCAG 2.1 AA를 명시했습니다. Section 508은 연방기관 대상이고(주정부는 연방기관이 아님), EN 301 549는 유럽 기준입니다.",
				en: "The 2024 ADA Title II final rule explicitly requires WCAG 2.1 AA for state and local government web and mobile apps. Section 508 covers federal agencies (states aren't); EN 301 549 is European.",
			},
		},
	],
	"cpacc-3-2": [
		{
			id: "cpacc-3-2-s1",
			difficulty: "hard",
			question: {
				ko: "한국 기업이 EU 소비자에게 전자책 서비스를 판매합니다. 유럽 접근성법(EAA)에 대한 올바른 판단은?",
				en: "A Korean company sells an e-book service to EU consumers. What is the correct judgment about the EAA?",
			},
			options: {
				a: { ko: "EU 시장에 서비스를 제공하므로 역외 기업이어도 적용 대상이다", en: "It applies — offering services in the EU market covers non-EU companies too" },
				b: { ko: "EU 밖 기업이므로 적용되지 않는다", en: "It doesn't apply to non-EU companies" },
				c: { ko: "전자책은 EAA 적용 품목이 아니다", en: "E-books aren't covered by the EAA" },
				d: { ko: "공공기관이 아니므로 무관하다", en: "Irrelevant since it's not a public body" },
			},
			answer: "a",
			explanation: {
				ko: "EAA는 EU 시장에 제품·서비스를 제공하는 기업에 적용되며 본사 소재지는 무관합니다. 전자책·전자상거래는 명시된 적용 대상이고, EAA는 공공이 아닌 민간 시장을 겨냥한 법입니다.",
				en: "The EAA covers companies offering products or services in the EU market regardless of headquarters. E-books and e-commerce are explicitly in scope, and the EAA targets the private sector.",
			},
		},
	],
	"cpacc-3-3": [
		{
			id: "cpacc-3-3-s1",
			difficulty: "hard",
			question: {
				ko: "조직에서 처음으로 접근성 프로그램을 시작하려 합니다. 성숙도 모델 관점에서 가장 먼저 확보해야 할 것은?",
				en: "An organization is starting its first accessibility program. Per maturity models, what should be secured first?",
			},
			options: {
				a: { ko: "경영진의 공식 후원과 접근성 정책 수립", en: "Executive sponsorship and a formal accessibility policy" },
				b: { ko: "전 페이지 일괄 자동 검사 도구 구매", en: "Buying an automated scanner for every page" },
				c: { ko: "홈페이지 접근성 배지 부착", en: "Adding an accessibility badge to the homepage" },
				d: { ko: "전 직원 동시 교육", en: "Training every employee at once" },
			},
			answer: "a",
			explanation: {
				ko: "성숙도 모델의 초기→계획 단계 전환은 경영진 후원과 정책·책임 소재 확립이 핵심입니다. 챔피언과 정책 없이는 도구·교육 투자도 지속되지 않습니다. 배지는 실질 없는 신호에 그칠 수 있습니다.",
				en: "Moving from ad hoc to planned requires executive sponsorship and a policy with ownership. Without champions and policy, tools and training don't stick; a badge alone is an empty signal.",
			},
		},
	],
	"cpacc-3-4": [
		{
			id: "cpacc-3-4-s1",
			difficulty: "hard",
			question: {
				ko: "LMS 도입 심사에서 후보 A의 ACR은 전 항목 'Supports'이고 비고가 없으며, 후보 B는 일부 'Partially Supports'에 구체적 실패 내용과 수정 로드맵이 적혀 있습니다. 조달 담당자의 합리적 판단은?",
				en: "Vendor A's ACR marks everything 'Supports' with no remarks; Vendor B admits some 'Partially Supports' with specific failures and a fix roadmap. What is the sound procurement judgment?",
			},
			options: {
				a: { ko: "B의 문서가 더 신뢰할 만하며, 두 후보 모두 핵심 시나리오를 자체 검증한다", en: "B's report is more credible; independently verify key scenarios on both" },
				b: { ko: "A가 완벽하므로 즉시 A를 선정한다", en: "Pick A immediately — it's perfect" },
				c: { ko: "B는 결함을 인정했으므로 탈락시킨다", en: "Disqualify B for admitting defects" },
				d: { ko: "ACR은 참고용이 아니므로 무시한다", en: "Ignore ACRs entirely" },
			},
			answer: "a",
			explanation: {
				ko: "현실의 제품이 전 항목을 완벽 지원하는 경우는 드물어, 비고 없는 전부 'Supports'는 신뢰성 경고 신호입니다. 구체적 실패와 로드맵을 정직하게 기재한 문서가 오히려 신뢰할 수 있으며, 어느 쪽이든 ACR 주장은 자체 표본 테스트로 검증해야 합니다.",
				en: "Blanket 'Supports' with no remarks is a red flag — real products rarely support everything. Honest, specific reporting with a roadmap is more credible, and ACR claims should be spot-checked by your own testing either way.",
			},
		},
	],
};

export const wasScenarioQuestions: Record<string, QuizQuestion[]> = {
	"was-1-1": [
		{
			id: "was-1-1-s1",
			difficulty: "hard",
			question: {
				ko: "코드 리뷰에서 `<div onclick=\"submit()\">제출</div>`을 발견했습니다. 가장 올바른 수정은?",
				en: "Code review finds `<div onclick=\"submit()\">Submit</div>`. What is the correct fix?",
			},
			options: {
				a: { ko: "`<button type=\"submit\">`으로 교체한다", en: "Replace it with `<button type=\"submit\">`" },
				b: { ko: "div에 tabindex와 role만 추가한다", en: "Just add tabindex and role to the div" },
				c: { ko: "aria-label을 붙인다", en: "Add an aria-label" },
				d: { ko: "hover 스타일을 추가해 클릭 가능함을 알린다", en: "Add hover styles to signal clickability" },
			},
			answer: "a",
			explanation: {
				ko: "ARIA 1규칙: 네이티브 요소로 가능하면 네이티브를 쓰라. button은 역할·포커스·키보드(Enter/Space) 처리를 기본 제공합니다. div에 role·tabindex를 붙여도 키 이벤트 처리를 직접 구현해야 하며 누락되기 쉽습니다.",
				en: "ARIA rule #1: use native elements when possible. A button provides role, focusability, and Enter/Space handling for free; patching a div still requires manual key handling that's easy to get wrong.",
			},
		},
	],
	"was-1-2": [
		{
			id: "was-1-2-s1",
			difficulty: "hard",
			question: {
				ko: "개발자가 커스텀 토글에 `role=\"switch\"`와 `aria-checked`를 붙였지만 스크린 리더 사용자가 '조작이 안 된다'고 제보했습니다. 가장 가능성 높은 원인은?",
				en: "A developer added role=\"switch\" and aria-checked to a custom toggle, but a screen reader user reports it 'can't be operated.' Most likely cause?",
			},
			options: {
				a: { ko: "키보드 이벤트 처리와 tabindex가 없다 — ARIA는 시맨틱만 바꿀 뿐 동작을 만들지 않는다", en: "No keyboard handling or tabindex — ARIA changes semantics, not behavior" },
				b: { ko: "role 이름의 철자가 틀렸다", en: "The role name is misspelled" },
				c: { ko: "스크린 리더가 switch를 지원하지 않는다", en: "Screen readers don't support switch" },
				d: { ko: "색상 대비가 부족하다", en: "Insufficient color contrast" },
			},
			answer: "a",
			explanation: {
				ko: "ARIA는 보조기술에 '무엇인지'를 알릴 뿐 포커스 가능성이나 키 동작을 부여하지 않습니다. tabindex=\"0\"과 Enter/Space 핸들러가 없으면 역할이 완벽해도 조작 불가입니다 — 'No ARIA is better than bad ARIA'의 전형적 사례입니다.",
				en: "ARIA tells AT what something is; it grants no focusability or key behavior. Without tabindex=\"0\" and Enter/Space handlers the control is inoperable despite perfect roles — the classic 'no ARIA is better than bad ARIA' case.",
			},
		},
	],
	"was-1-3": [
		{
			id: "was-1-3-s1",
			difficulty: "hard",
			question: {
				ko: "삭제 확인 모달을 닫으면 포커스가 문서 최상단으로 튀어 키보드 사용자가 목록 위치를 잃습니다. 올바른 수정은?",
				en: "Closing a delete-confirmation modal throws focus to the top of the document, so keyboard users lose their place in the list. Correct fix?",
			},
			options: {
				a: { ko: "모달을 연 트리거(삭제 버튼)로 포커스를 반환한다", en: "Return focus to the triggering delete button" },
				b: { ko: "포커스를 body에 남겨둔다", en: "Leave focus on the body" },
				c: { ko: "모달을 없애고 confirm()을 쓴다", en: "Replace the modal with confirm()" },
				d: { ko: "페이지를 새로고침한다", en: "Reload the page" },
			},
			answer: "a",
			explanation: {
				ko: "모달 포커스 관리의 표준: 열 때 모달 안으로, 닫을 때 트리거로 반환입니다. 삭제로 트리거가 사라진 경우엔 인접 항목 등 논리적 위치로 보냅니다. body 방치·새로고침은 맥락을 파괴합니다.",
				en: "Standard modal focus management: into the modal on open, back to the trigger on close (or a logical neighbor if the trigger was deleted). Leaving focus on body or reloading destroys context.",
			},
		},
	],
	"was-1-5": [
		{
			id: "was-1-5-s1",
			difficulty: "hard",
			question: {
				ko: "제출 실패 시 오류 필드에 빨간 테두리만 표시되고, 스크린 리더 사용자는 무엇이 잘못됐는지 알 수 없습니다. 우선 수정 조합은?",
				en: "On failed submit, error fields only get a red border; screen reader users can't tell what went wrong. What combination fixes it first?",
			},
			options: {
				a: { ko: "텍스트 오류 메시지를 aria-describedby로 필드에 연결하고 aria-invalid를 설정한다", en: "Add text error messages linked via aria-describedby and set aria-invalid" },
				b: { ko: "테두리를 더 굵은 빨강으로 바꾼다", en: "Make the border thicker red" },
				c: { ko: "오류 시 경고음을 재생한다", en: "Play an alert sound on error" },
				d: { ko: "성공할 때까지 제출 버튼을 숨긴다", en: "Hide the submit button until valid" },
			},
			answer: "a",
			explanation: {
				ko: "WCAG 3.3.1(오류 식별)은 오류를 텍스트로 식별하라고 요구합니다. 색(테두리)만으로는 1.4.1 위반이기도 합니다. 텍스트 메시지 + aria-describedby 연결 + aria-invalid가 표준 배선이며, 소리 단독은 농인에게 전달되지 않습니다.",
				en: "3.3.1 requires errors identified in text; border color alone also fails 1.4.1. Text message + aria-describedby + aria-invalid is the standard wiring. Sound alone excludes deaf users.",
			},
		},
	],
	"was-1-8": [
		{
			id: "was-1-8-s1",
			difficulty: "hard",
			question: {
				ko: "커스텀 드롭다운을 열어도 스크린 리더가 아무것도 읽지 않습니다. 진단을 시작할 가장 효율적인 지점은?",
				en: "Opening a custom dropdown announces nothing in a screen reader. Where do you start diagnosing most efficiently?",
			},
			options: {
				a: { ko: "브라우저 개발자 도구의 접근성 트리에서 이름·역할·상태가 노출되는지 확인", en: "Inspect the browser's accessibility tree for name, role, and state" },
				b: { ko: "CSS z-index를 확인", en: "Check CSS z-index" },
				c: { ko: "네트워크 탭에서 API 응답 확인", en: "Check API responses in the network tab" },
				d: { ko: "다른 스크린 리더를 설치해본다", en: "Install a different screen reader" },
			},
			answer: "a",
			explanation: {
				ko: "스크린 리더는 접근성 트리를 읽습니다. 트리에 이름·역할·상태(4.1.2)가 없으면 어떤 스크린 리더도 읽을 수 없으므로, 개발자 도구의 접근성 패널이 가장 빠른 1차 진단 지점입니다. 시각 레이어(z-index)·데이터 문제와는 별개입니다.",
				en: "Screen readers consume the accessibility tree. If name/role/state (4.1.2) are missing there, no screen reader can announce it — so the dev tools accessibility panel is the fastest first check.",
			},
		},
	],
	"was-1-9": [
		{
			id: "was-1-9-s1",
			difficulty: "hard",
			question: {
				ko: "저시력 사용자가 400% 확대 시 본문을 읽으려면 좌우 스크롤을 반복해야 한다고 제보했습니다. 해당 성공 기준과 표준 해법은?",
				en: "A low-vision user reports having to scroll horizontally repeatedly to read text at 400% zoom. Which SC applies, and what is the standard fix?",
			},
			options: {
				a: { ko: "1.4.10 리플로우 — 고정 폭 레이아웃을 반응형으로 전환해 한 방향 스크롤만 남긴다", en: "1.4.10 Reflow — convert fixed-width layout to responsive so content flows in one direction" },
				b: { ko: "1.4.3 대비 — 글자색을 진하게 한다", en: "1.4.3 Contrast — darken the text" },
				c: { ko: "확대 기능을 200%로 제한한다", en: "Cap zoom at 200%" },
				d: { ko: "모바일 전용 앱을 안내한다", en: "Point users to the mobile app" },
			},
			answer: "a",
			explanation: {
				ko: "320 CSS픽셀 폭(400% 확대 상당)에서 양방향 스크롤 없이 읽혀야 한다는 것이 1.4.10입니다. 반응형 리플로우가 표준 해법이며, 확대 제한은 그 자체가 위반(1.4.4)입니다.",
				en: "1.4.10 requires content usable without two-dimensional scrolling at 320 CSS px (≈400% zoom). Responsive reflow is the fix; capping zoom itself violates 1.4.4.",
			},
		},
	],
	"was-1-10": [
		{
			id: "was-1-10-s1",
			difficulty: "hard",
			question: {
				ko: "사내 블로그 플랫폼을 교체하면서 '작성자들이 실수로 접근성 결함을 만들지 않게' 하고 싶습니다. 후보 평가에 추가할 가장 적절한 기준은?",
				en: "Replacing the company blogging platform, you want authors to stop accidentally creating accessibility defects. What criterion should be added to vendor evaluation?",
			},
			options: {
				a: { ko: "ATAG Part B 적합성 — alt 프롬프트·접근 가능한 템플릿·자동 검사 지원 여부", en: "ATAG Part B conformance — alt prompts, accessible templates, built-in checks" },
				b: { ko: "UAAG 적합성", en: "UAAG conformance" },
				c: { ko: "서버 응답 속도", en: "Server response time" },
				d: { ko: "테마 개수", en: "Number of themes" },
			},
			answer: "a",
			explanation: {
				ko: "저작 도구가 접근 가능한 콘텐츠 생산을 돕도록 요구하는 것이 ATAG Part B입니다. UAAG는 브라우저 등 사용자 에이전트 대상이라 저작 플랫폼 평가 기준으로는 부적절합니다.",
				en: "ATAG Part B requires authoring tools to support accessible content production. UAAG targets user agents (browsers), not authoring platforms.",
			},
		},
	],
	"was-1-11": [
		{
			id: "was-1-11-s1",
			difficulty: "hard",
			question: {
				ko: "음성 제어 사용자가 화면의 '다음' 버튼을 향해 \"다음 클릭\"이라고 말해도 반응이 없습니다. 코드에서 가장 먼저 확인할 것은?",
				en: "A voice control user says \"click Next\" at the visible Next button and nothing happens. What do you check first in the code?",
			},
			options: {
				a: { ko: "접근 가능한 이름에 보이는 텍스트 '다음'이 포함되는지 (2.5.3 Label in Name)", en: "Whether the accessible name contains the visible text 'Next' (2.5.3 Label in Name)" },
				b: { ko: "버튼의 배경색", en: "The button's background color" },
				c: { ko: "마이크 권한", en: "Microphone permissions" },
				d: { ko: "버튼의 애니메이션", en: "The button's animation" },
			},
			answer: "a",
			explanation: {
				ko: "음성 제어는 보이는 레이블을 명령어로 씁니다. aria-label이 '계속 진행'처럼 보이는 텍스트와 다르면 \"다음 클릭\"이 실패합니다 — 접근 가능한 이름에 보이는 텍스트를 포함해야 합니다(2.5.3).",
				en: "Voice control matches spoken commands to visible labels. If aria-label says 'Continue' while the button shows 'Next', \"click Next\" fails — the accessible name must contain the visible text (2.5.3).",
			},
		},
	],
	"was-2-1": [
		{
			id: "was-2-1-s1",
			difficulty: "hard",
			question: {
				ko: "axe 자동 검사에서 위반 0건인 페이지에 대해 스크린 리더 사용자 민원이 접수됐습니다. 올바른 해석과 다음 단계는?",
				en: "A page passes axe with zero violations, yet a screen reader user files a complaint. What is the right interpretation and next step?",
			},
			options: {
				a: { ko: "자동 도구는 기준의 일부만 검출한다 — 키보드·스크린 리더 수동 테스트로 과업 흐름을 검증한다", en: "Automated tools catch only a subset — run manual keyboard and screen reader testing on the task flow" },
				b: { ko: "민원이 잘못됐다고 회신한다", en: "Reply that the complaint is mistaken" },
				c: { ko: "다른 자동 도구를 하나 더 돌린다", en: "Run one more automated tool" },
				d: { ko: "위반 0건 보고서를 근거로 종결한다", en: "Close the case citing the zero-violation report" },
			},
			answer: "a",
			explanation: {
				ko: "자동 검사는 전체 접근성 문제의 일부(통상 30~50% 수준)만 잡습니다. 초점 순서의 논리성, 대체 텍스트의 적절성, 실제 과업 완수 가능성은 수동·AT 테스트가 필요합니다. 자동 결과로 민원을 반박하는 것은 도구의 한계를 오해한 것입니다.",
				en: "Automation catches only a fraction of issues (commonly cited around 30–50%). Logical focus order, alt-text appropriateness, and real task completion require manual and AT testing. Rebutting a complaint with a clean automated report misunderstands the tool.",
			},
		},
	],
	"was-2-3": [
		{
			id: "was-2-3-s1",
			difficulty: "hard",
			question: {
				ko: "감사 중 서드파티 지도 위젯에서 키보드 트랩을 발견했습니다. 페이지 적합성 판정과 우선순위는?",
				en: "An audit finds a keyboard trap inside a third-party map widget. What is the conformance verdict and priority?",
			},
			options: {
				a: { ko: "페이지 부적합 + 최우선 수정 — 전체 페이지 요구사항과 비간섭 요구를 모두 위반하는 차단성 결함", en: "Page fails, top priority — it violates full-page conformance and non-interference, a blocking defect" },
				b: { ko: "서드파티 코드이므로 평가에서 제외한다", en: "Exclude it — third-party code" },
				c: { ko: "위젯 외 영역이 적합하므로 페이지는 통과", en: "The page passes since everything else conforms" },
				d: { ko: "낮은 우선순위로 백로그에 넣는다", en: "Backlog it at low priority" },
			},
			answer: "a",
			explanation: {
				ko: "적합성은 페이지 전체 단위이며(부분 적합 불가), 키보드 트랩(2.1.2)은 비간섭 요구사항 위반으로 나머지 콘텐츠 이용까지 차단합니다. 사용자가 페이지에 갇히는 결함은 심각도 최상 — 벤더 수정 요구와 임시 우회(위젯 격리)를 즉시 진행합니다.",
				en: "Conformance is judged per full page, and a keyboard trap (2.1.2) violates non-interference, blocking the rest of the page. A defect that strands users is maximum severity — demand a vendor fix and isolate the widget meanwhile.",
			},
		},
	],
	"was-3-1": [
		{
			id: "was-3-1-s1",
			difficulty: "hard",
			question: {
				ko: "릴리스 이틀 전 발견된 세 이슈 중 무엇을 먼저 고쳐야 하는가: ①결제 버튼 키보드 접근 불가 ②푸터 장식 아이콘 alt 누락 ③FAQ 페이지 헤딩 레벨 건너뜀",
				en: "Two days before release, three issues surface: ① checkout button not keyboard-accessible, ② missing alt on a decorative footer icon, ③ skipped heading level on the FAQ page. What comes first?",
			},
			options: {
				a: { ko: "① — 핵심 과업(결제)을 차단하는 결함이 최우선", en: "① — a defect blocking the core task (checkout) is top priority" },
				b: { ko: "② — 가장 고치기 쉬우므로", en: "② — it's the easiest fix" },
				c: { ko: "③ — 페이지 수가 많으므로", en: "③ — it affects many pages" },
				d: { ko: "셋 다 릴리스 후로 미룬다", en: "Defer all three past release" },
			},
			answer: "a",
			explanation: {
				ko: "우선순위는 '사용자 영향 × 과업 중요도'로 판정합니다. 결제 차단은 키보드 사용자가 서비스 목적 자체를 달성할 수 없게 하는 차단성 결함입니다. 장식 아이콘은 alt=\"\"로 사소하고, 헤딩 건너뜀은 불편이지만 차단은 아닙니다. 쉬운 것 먼저는 우선순위 전략이 아닙니다.",
				en: "Prioritize by user impact × task criticality. A blocked checkout stops keyboard users from achieving the site's core purpose. The decorative icon is trivial (alt=\"\"), and a skipped heading is a hindrance, not a blocker. 'Easiest first' is not triage.",
			},
		},
	],
	"was-3-3": [
		{
			id: "was-3-3-s1",
			difficulty: "hard",
			question: {
				ko: "도입 검토 중인 위젯의 ACR이 3년 전 버전(v2.1) 기준인데 현재 판매 버전은 v4입니다. 올바른 조치는?",
				en: "A widget's ACR covers v2.1 from three years ago; the current product is v4. What is the right move?",
			},
			options: {
				a: { ko: "현행 버전 기준의 갱신된 ACR을 요구하고, 핵심 시나리오를 자체 테스트로 검증한다", en: "Request an updated ACR for the current version and verify key scenarios yourself" },
				b: { ko: "버전이 올라갔으니 더 좋아졌다고 가정한다", en: "Assume newer means better" },
				c: { ko: "옛 ACR로 충분하다고 판단한다", en: "Accept the old ACR as sufficient" },
				d: { ko: "ACR이 있다는 사실만으로 통과시킨다", en: "Pass it for merely having an ACR" },
			},
			answer: "a",
			explanation: {
				ko: "ACR은 특정 버전·환경의 스냅샷입니다. 메이저 버전이 두 번 바뀌었으면 문서는 현재 제품을 대변하지 못합니다 — 갱신 요구와 자체 표본 검증이 표준 절차이며, 개선됐을 것이라는 가정은 근거가 없습니다.",
				en: "An ACR is a snapshot of a specific version and environment. Two major versions later, it no longer represents the product — request an update and spot-check yourself; assuming improvement is baseless.",
			},
		},
	],
};
