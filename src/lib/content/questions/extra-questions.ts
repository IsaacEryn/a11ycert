import type { QuizQuestion } from "../types";

/**
 * 단원 파일(cpacc-units.ts / was-units.ts)이 비대해지는 것을 막기 위한
 * 추가 문항 확장 지점. 신규 문항은 여기에 단원 id별로 추가한다.
 * src/lib/content/index.ts가 로딩 시 단원 questions에 병합한다.
 * id 규칙: "<unitId>-x<n>" (기존 인라인 문항의 -q<n>과 충돌 방지)
 */

export const cpaccExtraQuestions: Record<string, QuizQuestion[]> = {
	// ── Domain 2: 접근성 및 보편적 설계 ──────────────────────────────────────
	"cpacc-2-1": [
		{
			id: "cpacc-2-1-x1",
			question: {
				ko: "유니버설 디자인 7원칙 중 '오류에 대한 관용(Tolerance for Error)'의 예로 가장 적절한 것은?",
				en: "Which is the best example of the Universal Design principle 'Tolerance for Error'?",
			},
			options: {
				a: { ko: "실행 취소(Undo) 기능과 삭제 전 확인 대화상자 제공", en: "Providing an undo feature and a confirmation dialog before deletion" },
				b: { ko: "왼손잡이와 오른손잡이 모두 사용할 수 있는 가위", en: "Scissors usable by both left- and right-handed people" },
				c: { ko: "그림과 텍스트를 함께 쓰는 안내 표지판", en: "Signage that combines pictograms and text" },
				d: { ko: "적은 힘으로 열리는 자동문", en: "Automatic doors that open with little effort" },
			},
			answer: "a",
			explanation: {
				ko: "오류에 대한 관용은 실수의 위험과 부정적 결과를 최소화하는 설계입니다. 실행 취소와 확인 대화상자는 사용자의 실수를 되돌릴 수 있게 하는 대표적 적용입니다. b는 공평한 사용, c는 인지 가능한 정보, d는 적은 신체적 노력에 해당합니다.",
				en: "Tolerance for Error minimizes hazards and adverse consequences of mistakes. Undo and confirmation dialogs let users recover from errors. Option b is Equitable Use, c is Perceptible Information, and d is Low Physical Effort.",
			},
		},
		{
			id: "cpacc-2-1-x2",
			question: {
				ko: "유니버설 디자인(Universal Design)과 접근성(Accessibility)의 관계에 대한 설명으로 가장 정확한 것은?",
				en: "Which statement best describes the relationship between Universal Design and accessibility?",
			},
			options: {
				a: { ko: "유니버설 디자인은 장애인만을 위한 별도의 설계 방식이다", en: "Universal Design is a separate design approach only for people with disabilities" },
				b: { ko: "유니버설 디자인은 처음부터 가능한 한 많은 사람이 사용할 수 있게 설계하는 것으로, 접근성을 포괄하는 더 넓은 개념이다", en: "Universal Design aims to make products usable by as many people as possible from the start, a broader concept that encompasses accessibility" },
				c: { ko: "접근성은 유니버설 디자인이 완료된 후에만 검토할 수 있다", en: "Accessibility can only be considered after Universal Design is complete" },
				d: { ko: "두 개념은 서로 무관하다", en: "The two concepts are unrelated" },
			},
			answer: "b",
			explanation: {
				ko: "유니버설 디자인은 별도 개조나 특수 설계 없이 가능한 한 모든 사람이 사용할 수 있도록 처음부터 설계하는 철학입니다. 장애인을 포함한 폭넓은 사용자를 대상으로 하므로 접근성을 포괄하는 상위 개념으로 볼 수 있습니다.",
				en: "Universal Design is the philosophy of designing for use by all people, to the greatest extent possible, without adaptation or specialized design. Because it targets the broadest range of users including people with disabilities, it encompasses accessibility.",
			},
		},
	],
	"cpacc-2-2": [
		{
			id: "cpacc-2-2-x1",
			question: {
				ko: "WCAG의 4대 원칙(POUR) 중 '견고성(Robust)'이 의미하는 것은?",
				en: "In WCAG's four principles (POUR), what does 'Robust' mean?",
			},
			options: {
				a: { ko: "콘텐츠가 시각적으로 견고한 디자인을 가져야 한다", en: "Content must have a visually solid design" },
				b: { ko: "서버가 장애 없이 안정적으로 운영되어야 한다", en: "Servers must operate reliably without downtime" },
				c: { ko: "콘텐츠가 보조기술을 포함한 다양한 사용자 에이전트에서 신뢰성 있게 해석될 수 있어야 한다", en: "Content must be reliably interpreted by a wide variety of user agents, including assistive technologies" },
				d: { ko: "암호화가 적용되어 보안이 견고해야 한다", en: "Encryption must be applied for strong security" },
			},
			answer: "c",
			explanation: {
				ko: "견고성은 현재와 미래의 다양한 사용자 에이전트(브라우저, 스크린 리더 등 보조기술)가 콘텐츠를 신뢰성 있게 해석할 수 있어야 한다는 원칙입니다. 유효한 마크업과 name/role/value 제공이 대표적 요구사항입니다.",
				en: "Robust means content must be reliably interpretable by current and future user agents, including assistive technologies. Valid markup and exposing name/role/value are key requirements.",
			},
		},
		{
			id: "cpacc-2-2-x2",
			question: {
				ko: "WCAG 적합성 수준 A, AA, AAA에 대한 설명으로 옳은 것은?",
				en: "Which statement about WCAG conformance levels A, AA, and AAA is correct?",
			},
			options: {
				a: { ko: "AAA가 최소 수준이고 A가 최고 수준이다", en: "AAA is the minimum level and A is the highest" },
				b: { ko: "대부분의 법률과 정책은 AA 수준을 요구하며, AAA는 전체 사이트에 일괄 요구하기 어렵다", en: "Most laws and policies require level AA; AAA is generally not required for entire sites" },
				c: { ko: "AA를 만족하려면 A 기준은 무시해도 된다", en: "Meeting AA does not require meeting A criteria" },
				d: { ko: "적합성 수준은 페이지 일부만 만족해도 주장할 수 있다", en: "Conformance can be claimed if only part of a page satisfies the criteria" },
			},
			answer: "b",
			explanation: {
				ko: "AA는 상위 수준(A 포함)을 만족해야 하며, 미국 Section 508, EN 301 549 등 대부분의 규정이 AA를 기준으로 합니다. W3C는 일부 콘텐츠에 AAA를 적용할 수 없는 경우가 있어 사이트 전체에 AAA를 요구하지 않도록 권고합니다. 적합성은 페이지 전체 기준입니다.",
				en: "Level AA conformance includes meeting all Level A criteria, and most regulations (Section 508, EN 301 549) reference AA. W3C does not recommend requiring AAA for entire sites because some content cannot satisfy all AAA criteria. Conformance applies to full pages.",
			},
		},
	],
	"cpacc-2-3": [
		{
			id: "cpacc-2-3-x1",
			question: {
				ko: "접근 가능한 조달(Accessible Procurement)에서 VPAT가 하는 역할은?",
				en: "What role does a VPAT play in accessible procurement?",
			},
			options: {
				a: { ko: "제품의 접근성 적합성 정보를 표준 양식으로 문서화해 구매 결정에 활용하게 한다", en: "It documents a product's accessibility conformance in a standard format to inform purchasing decisions" },
				b: { ko: "제품의 보안 취약점을 인증한다", en: "It certifies a product's security vulnerabilities" },
				c: { ko: "정부가 발행하는 접근성 인증서다", en: "It is an accessibility certificate issued by the government" },
				d: { ko: "개발자의 접근성 교육 이수를 증명한다", en: "It proves a developer completed accessibility training" },
			},
			answer: "a",
			explanation: {
				ko: "VPAT(Voluntary Product Accessibility Template)는 공급업체가 자사 제품의 Section 508·WCAG·EN 301 549 적합성 정도를 자발적으로 기술하는 표준 문서 양식입니다. 완성된 문서는 ACR(Accessibility Conformance Report)이라 하며 조달 평가에 활용됩니다.",
				en: "A VPAT (Voluntary Product Accessibility Template) is a standard form vendors use to self-report how their product conforms to Section 508, WCAG, and EN 301 549. The completed document is an Accessibility Conformance Report (ACR) used in procurement evaluations.",
			},
		},
		{
			id: "cpacc-2-3-x2",
			question: {
				ko: "조직의 접근성 성숙도 모델(Accessibility Maturity Model)에서 가장 성숙한 단계의 특징은?",
				en: "In an accessibility maturity model, what characterizes the most mature stage?",
			},
			options: {
				a: { ko: "접근성 문제가 발견될 때마다 개별적으로 대응한다", en: "Reacting to accessibility issues individually as they are found" },
				b: { ko: "법적 위험 회피만을 목적으로 최소한의 준수를 한다", en: "Complying minimally only to avoid legal risk" },
				c: { ko: "접근성이 조직 문화와 모든 업무 프로세스에 내재화되어 지속적으로 최적화된다", en: "Accessibility is embedded in organizational culture and all processes, and is continuously optimized" },
				d: { ko: "접근성 업무를 외부 컨설턴트에게 전적으로 위임한다", en: "Fully outsourcing accessibility work to external consultants" },
			},
			answer: "c",
			explanation: {
				ko: "성숙도 모델의 최고 단계에서는 접근성이 별도 활동이 아니라 조직 문화·거버넌스·설계/개발/QA 프로세스 전반에 내재화되고, 측정과 개선이 지속적으로 이뤄집니다. 개별 대응(a)이나 최소 준수(b)는 낮은 성숙도의 특징입니다.",
				en: "At the highest maturity level, accessibility is embedded in culture, governance, and every design/development/QA process, with continuous measurement and optimization. Ad-hoc reaction (a) and minimal compliance (b) characterize low maturity.",
			},
		},
	],
	// ── Domain 3: 표준, 법률, 관리 전략 ──────────────────────────────────────
	"cpacc-3-1": [
		{
			id: "cpacc-3-1-x1",
			question: {
				ko: "UN 장애인권리협약(CRPD)에서 '합리적 편의제공(Reasonable Accommodation)'의 정의로 옳은 것은?",
				en: "How does the UN CRPD define 'reasonable accommodation'?",
			},
			options: {
				a: { ko: "모든 요구를 비용과 무관하게 수용하는 것", en: "Accepting all requests regardless of cost" },
				b: { ko: "불균형하거나 과도한 부담을 지우지 않는 범위에서, 특정 경우에 필요한 적절한 변경과 조정", en: "Necessary and appropriate modification and adjustments not imposing a disproportionate or undue burden, where needed in a particular case" },
				c: { ko: "장애인 전용 시설을 별도로 건설하는 것", en: "Building separate facilities exclusively for persons with disabilities" },
				d: { ko: "국가가 제공하는 재정 보조금", en: "Financial subsidies provided by the state" },
			},
			answer: "b",
			explanation: {
				ko: "CRPD 제2조는 합리적 편의제공을 '불균형하거나 과도한 부담을 지우지 않으면서, 특정한 경우에 필요한 적절한 변경과 조정'으로 정의하며, 이를 거부하는 것을 장애를 이유로 한 차별로 명시합니다.",
				en: "CRPD Article 2 defines reasonable accommodation as 'necessary and appropriate modification and adjustments not imposing a disproportionate or undue burden, where needed in a particular case,' and denial of reasonable accommodation constitutes discrimination on the basis of disability.",
			},
		},
		{
			id: "cpacc-3-1-x2",
			question: {
				ko: "유럽의 EN 301 549 표준에 대한 설명으로 옳은 것은?",
				en: "Which statement about the European standard EN 301 549 is correct?",
			},
			options: {
				a: { ko: "웹사이트에만 적용되는 표준이다", en: "It applies only to websites" },
				b: { ko: "미국 연방정부 조달에 사용되는 표준이다", en: "It is the standard used for U.S. federal procurement" },
				c: { ko: "ICT 제품·서비스 전반의 접근성 요구사항을 정의하며 WCAG를 참조한다", en: "It defines accessibility requirements for ICT products and services broadly, and references WCAG" },
				d: { ko: "법적 구속력이 없는 민간 가이드라인이다", en: "It is a non-binding private guideline" },
			},
			answer: "c",
			explanation: {
				ko: "EN 301 549는 웹뿐 아니라 소프트웨어, 하드웨어, 문서, 지원 서비스 등 ICT 전반의 접근성 요구사항을 정의하는 유럽 표준으로, 웹 관련 요구사항은 WCAG를 참조합니다. EU 웹 접근성 지침과 유럽 접근성법(EAA)의 적합성 추정 기준으로 사용됩니다.",
				en: "EN 301 549 is the European standard defining accessibility requirements for ICT broadly — software, hardware, documents, and support services as well as the web — referencing WCAG for web requirements. It underpins the EU Web Accessibility Directive and the European Accessibility Act.",
			},
		},
	],
	"cpacc-3-2": [
		{
			id: "cpacc-3-2-x1",
			question: {
				ko: "미국 재활법 Section 508의 적용 대상은?",
				en: "Who is covered by Section 508 of the U.S. Rehabilitation Act?",
			},
			options: {
				a: { ko: "미국 내 모든 민간 기업", en: "All private companies in the U.S." },
				b: { ko: "연방정부 기관이 개발·조달·유지·사용하는 전자 및 정보 기술", en: "Electronic and information technology developed, procured, maintained, or used by federal agencies" },
				c: { ko: "미국 내 모든 교육 기관", en: "All educational institutions in the U.S." },
				d: { ko: "항공사 웹사이트만", en: "Airline websites only" },
			},
			answer: "b",
			explanation: {
				ko: "Section 508은 연방정부 기관이 개발·조달·유지·사용하는 ICT가 장애인에게 접근 가능해야 한다고 요구합니다. 2017년 개정(Refresh)으로 WCAG 2.0 AA가 기준으로 통합되었습니다. 민간 기업 일반에는 ADA가, 항공사에는 ACAA가 적용됩니다.",
				en: "Section 508 requires ICT developed, procured, maintained, or used by federal agencies to be accessible. The 2017 Refresh incorporated WCAG 2.0 AA as the standard. Private businesses fall under the ADA; airlines under the ACAA.",
			},
		},
		{
			id: "cpacc-3-2-x2",
			question: {
				ko: "한국의 웹 접근성 관련 법·제도에 대한 설명으로 옳은 것은?",
				en: "Which statement about Korea's web accessibility laws and standards is correct?",
			},
			options: {
				a: { ko: "장애인차별금지법은 웹 접근성과 무관하다", en: "The Anti-Discrimination Act is unrelated to web accessibility" },
				b: { ko: "장애인차별금지법이 전자정보 접근에서의 정당한 편의제공을 요구하며, KWCAG가 국가 표준 지침이다", en: "The Act on the Prohibition of Discrimination against Persons with Disabilities requires reasonable accommodation in access to electronic information, and KWCAG is the national standard" },
				c: { ko: "KWCAG는 WCAG와 무관하게 독자적으로 개발되었다", en: "KWCAG was developed independently of WCAG" },
				d: { ko: "웹 접근성 인증마크는 법적 의무 사항이다", en: "The web accessibility certification mark is legally mandatory" },
			},
			answer: "b",
			explanation: {
				ko: "한국은 장애인차별금지 및 권리구제 등에 관한 법률(장차법)이 전자정보 접근성에 대한 정당한 편의제공을 요구하고, 국가 표준으로 한국형 웹 콘텐츠 접근성 지침(KWCAG)을 둡니다. KWCAG는 WCAG를 기반으로 국내 환경에 맞게 조정된 지침이며, 인증마크는 임의 인증입니다.",
				en: "Korea's Anti-Discrimination Act requires reasonable accommodation for access to electronic information, with KWCAG as the national standard. KWCAG is based on WCAG and adapted for the Korean context; the certification mark is voluntary.",
			},
		},
	],
	"cpacc-3-3": [
		{
			id: "cpacc-3-3-x1",
			question: {
				ko: "조직에서 접근성 정책을 수립할 때 가장 먼저 해야 할 일로 적절한 것은?",
				en: "When establishing an organizational accessibility policy, what is the most appropriate first step?",
			},
			options: {
				a: { ko: "모든 직원에게 스크린 리더 사용법을 교육한다", en: "Train all employees to use screen readers" },
				b: { ko: "경영진의 지원을 확보하고 적용 범위·준수 기준(예: WCAG 2.2 AA)·책임 주체를 정의한다", en: "Secure executive support and define scope, conformance target (e.g., WCAG 2.2 AA), and responsibilities" },
				c: { ko: "외부 감사를 즉시 실시한다", en: "Immediately conduct an external audit" },
				d: { ko: "접근성 오버레이 도구를 도입한다", en: "Deploy an accessibility overlay tool" },
			},
			answer: "b",
			explanation: {
				ko: "효과적인 접근성 정책의 출발점은 경영진의 지원(sponsorship) 확보와 정책의 범위, 준수 목표 표준, 역할과 책임의 명확한 정의입니다. 교육·감사·도구는 정책 프레임 위에서 우선순위에 따라 실행됩니다. 오버레이 도구는 근본적 해결책이 아닙니다.",
				en: "An effective policy starts with executive sponsorship and clear definition of scope, target standard, and responsibilities. Training, audits, and tooling follow within that framework. Overlay tools are not a substantive solution.",
			},
		},
		{
			id: "cpacc-3-3-x2",
			question: {
				ko: "접근성의 비즈니스 사례(Business Case)를 구성하는 요소로 가장 거리가 먼 것은?",
				en: "Which is LEAST relevant to the business case for accessibility?",
			},
			options: {
				a: { ko: "시장 확대 — 장애인·고령자 등 더 많은 고객 도달", en: "Market reach — serving more customers including people with disabilities and older adults" },
				b: { ko: "법적 위험 감소 — 소송과 규제 제재 예방", en: "Reduced legal risk — avoiding litigation and regulatory penalties" },
				c: { ko: "혁신 촉진 — 접근성 해결책이 모두에게 유용한 기능으로 발전", en: "Driving innovation — accessibility solutions becoming features useful to everyone" },
				d: { ko: "접근성 기능은 개발 비용을 항상 증가시키므로 예산 확대의 근거가 된다", en: "Accessibility always increases development costs, justifying bigger budgets" },
			},
			answer: "d",
			explanation: {
				ko: "비즈니스 사례는 시장 확대, 혁신 촉진, 브랜드 가치 향상, 법적 위험 감소의 네 축으로 설명됩니다(W3C). 접근성을 초기부터 설계에 포함하면 사후 수정보다 비용이 크게 절감되므로 '항상 비용을 증가시킨다'는 주장은 사실이 아니며 비즈니스 사례의 요소도 아닙니다.",
				en: "The business case rests on market reach, innovation, brand enhancement, and legal risk reduction (W3C). Building accessibility in from the start costs far less than retrofitting, so 'always increases costs' is both false and not part of the business case.",
			},
		},
	],
};

export const wasExtraQuestions: Record<string, QuizQuestion[]> = {
	// ── Domain 2: 테스트와 평가 ──────────────────────────────────────────────
	"was-2-1": [
		{
			id: "was-2-1-x1",
			question: {
				ko: "자동 접근성 검사 도구(axe, WAVE 등)의 한계에 대한 설명으로 옳은 것은?",
				en: "Which statement about the limitations of automated accessibility testing tools (axe, WAVE, etc.) is correct?",
			},
			options: {
				a: { ko: "WCAG 이슈의 100%를 검출할 수 있다", en: "They can detect 100% of WCAG issues" },
				b: { ko: "일반적으로 WCAG 이슈의 일부(약 30~50%)만 자동 검출 가능하며, 대체 텍스트의 '적절성' 같은 판단은 사람이 해야 한다", en: "They typically detect only a portion (~30–50%) of WCAG issues automatically; judgments like whether alt text is 'appropriate' require human review" },
				c: { ko: "자동 도구가 통과하면 수동 검수는 불필요하다", en: "If automated tools pass, manual testing is unnecessary" },
				d: { ko: "자동 도구는 색상 대비를 검사할 수 없다", en: "Automated tools cannot check color contrast" },
			},
			answer: "b",
			explanation: {
				ko: "자동 도구는 alt 속성의 존재 여부는 검출해도 그 내용의 적절성, 논리적 포커스 순서, 스크린 리더 사용성 등은 판단하지 못합니다. 자동 검사는 전체 이슈의 일부만 찾아내므로 수동 검수와 병행해야 합니다. 색상 대비는 자동 검사가 잘 되는 항목입니다.",
				en: "Automated tools can detect a missing alt attribute but not whether its content is appropriate, nor logical focus order or screen reader usability. They find only a portion of issues, so manual testing is essential. Color contrast is actually well covered by automation.",
			},
		},
		{
			id: "was-2-1-x2",
			question: {
				ko: "키보드 접근성 수동 검수 시 확인해야 할 항목이 아닌 것은?",
				en: "Which is NOT something to check during manual keyboard accessibility testing?",
			},
			options: {
				a: { ko: "모든 인터랙티브 요소에 Tab으로 도달할 수 있는가", en: "Can all interactive elements be reached with Tab?" },
				b: { ko: "포커스 표시가 눈에 보이는가", en: "Is the focus indicator visible?" },
				c: { ko: "모달 안에 포커스가 갇혀 빠져나올 수 없는 구간(키보드 트랩)이 없는가", en: "Are there no keyboard traps where focus gets stuck?" },
				d: { ko: "이미지 파일의 용량이 최적화되어 있는가", en: "Are image file sizes optimized?" },
			},
			answer: "d",
			explanation: {
				ko: "키보드 검수의 핵심은 도달 가능성(2.1.1), 트랩 부재(2.1.2), 가시적 포커스(2.4.7), 논리적 포커스 순서(2.4.3)입니다. 이미지 용량 최적화는 성능 이슈로 키보드 접근성과 무관합니다.",
				en: "Keyboard testing focuses on reachability (2.1.1), no traps (2.1.2), visible focus (2.4.7), and logical focus order (2.4.3). Image file size is a performance concern, not keyboard accessibility.",
			},
		},
		{
			id: "was-2-1-x3",
			question: {
				ko: "WCAG 적합성 판정에서 성공 기준이 '해당 없음(Not Applicable)'이 되는 경우는?",
				en: "When is a WCAG success criterion judged 'Not Applicable'?",
			},
			options: {
				a: { ko: "페이지에 해당 기준이 다루는 콘텐츠 유형이 존재하지 않을 때 (예: 오디오가 없는 페이지의 1.4.2)", en: "When the page contains no content of the type the criterion addresses (e.g., 1.4.2 on a page with no audio)" },
				b: { ko: "기준을 만족하기 너무 어려울 때", en: "When the criterion is too difficult to meet" },
				c: { ko: "개발 일정이 부족할 때", en: "When the development schedule is tight" },
				d: { ko: "자동 도구가 검출하지 못할 때", en: "When automated tools cannot detect it" },
			},
			answer: "a",
			explanation: {
				ko: "'해당 없음'은 평가 대상에 그 기준이 적용될 콘텐츠 자체가 없는 경우에만 사용합니다. 예를 들어 오디오 콘텐츠가 전혀 없는 페이지에서는 1.4.2(오디오 제어)가 해당 없음이 됩니다. 난이도나 일정은 판정 근거가 될 수 없습니다.",
				en: "'Not Applicable' applies only when the evaluated content contains nothing the criterion addresses — e.g., 1.4.2 (Audio Control) on a page with no audio. Difficulty or schedule is never a basis for the judgment.",
			},
		},
	],
	"was-2-2": [
		{
			id: "was-2-2-x1",
			question: {
				ko: "스크린 리더 검수 시 브라우저·스크린 리더 조합으로 가장 일반적으로 권장되는 것은?",
				en: "Which browser and screen reader pairings are most commonly recommended for testing?",
			},
			options: {
				a: { ko: "NVDA+Chrome/Firefox, JAWS+Chrome/Edge, VoiceOver+Safari", en: "NVDA with Chrome/Firefox, JAWS with Chrome/Edge, VoiceOver with Safari" },
				b: { ko: "모든 스크린 리더를 Internet Explorer와 조합", en: "All screen readers paired with Internet Explorer" },
				c: { ko: "VoiceOver+Windows, NVDA+macOS", en: "VoiceOver on Windows, NVDA on macOS" },
				d: { ko: "조합은 결과에 영향을 주지 않는다", en: "Pairings do not affect results" },
			},
			answer: "a",
			explanation: {
				ko: "스크린 리더는 브라우저와의 조합에 따라 동작이 달라집니다. NVDA는 Chrome/Firefox, JAWS는 Chrome/Edge, VoiceOver는 macOS/iOS의 Safari와 조합하는 것이 실사용 환경과 검수 신뢰성 면에서 권장됩니다. VoiceOver는 Apple 플랫폼 전용, NVDA/JAWS는 Windows 전용입니다.",
				en: "Screen reader behavior varies by browser pairing. NVDA is best tested with Chrome/Firefox, JAWS with Chrome/Edge, and VoiceOver with Safari on Apple platforms — matching real-world usage. VoiceOver is Apple-only; NVDA and JAWS are Windows-only.",
			},
		},
		{
			id: "was-2-2-x2",
			question: {
				ko: "접근성 결함 보고서 작성 시 포함해야 할 요소로 가장 완전한 조합은?",
				en: "Which combination is most complete for an accessibility defect report?",
			},
			options: {
				a: { ko: "문제 요약만", en: "Only a summary of the problem" },
				b: { ko: "위반 WCAG 기준, 재현 절차, 사용자 영향, 심각도, 개선 권고안", en: "Violated WCAG criterion, reproduction steps, user impact, severity, and remediation recommendation" },
				c: { ko: "스크린샷과 개발자 이름", en: "A screenshot and the developer's name" },
				d: { ko: "사용한 도구의 라이선스 정보", en: "License information for the tools used" },
			},
			answer: "b",
			explanation: {
				ko: "실행 가능한 결함 보고서는 어떤 WCAG 기준을 위반했는지, 어떤 환경에서 어떻게 재현되는지, 어떤 사용자에게 어떤 영향을 주는지, 심각도(우선순위), 그리고 구체적인 개선 방법을 담아야 개발팀이 바로 조치할 수 있습니다.",
				en: "An actionable report states the violated criterion, how to reproduce it in which environment, who is affected and how, the severity/priority, and a concrete fix so the team can act immediately.",
			},
		},
		{
			id: "was-2-2-x3",
			question: {
				ko: "모바일 앱 접근성 검수에서 iOS와 Android의 기본 스크린 리더는 각각 무엇인가?",
				en: "What are the built-in screen readers for iOS and Android used in mobile app testing?",
			},
			options: {
				a: { ko: "iOS: TalkBack, Android: VoiceOver", en: "iOS: TalkBack, Android: VoiceOver" },
				b: { ko: "iOS: VoiceOver, Android: TalkBack", en: "iOS: VoiceOver, Android: TalkBack" },
				c: { ko: "둘 다 NVDA", en: "Both use NVDA" },
				d: { ko: "둘 다 JAWS", en: "Both use JAWS" },
			},
			answer: "b",
			explanation: {
				ko: "iOS의 내장 스크린 리더는 VoiceOver, Android는 TalkBack입니다. 모바일 검수에서는 제스처 기반 탐색, 터치 타깃 크기, 화면 회전, 확대 기능 등도 함께 확인해야 합니다.",
				en: "iOS ships with VoiceOver and Android with TalkBack. Mobile testing also covers gesture navigation, touch target size, orientation, and zoom features.",
			},
		},
	],
	// ── Domain 3: 개선과 모범 사례 ───────────────────────────────────────────
	"was-3-1": [
		{
			id: "was-3-1-x1",
			question: {
				ko: "WCAG-EM(웹 접근성 평가 방법론)의 5단계 순서로 옳은 것은?",
				en: "What is the correct order of the five steps in WCAG-EM (Website Accessibility Conformance Evaluation Methodology)?",
			},
			options: {
				a: { ko: "평가 범위 정의 → 웹사이트 탐색 → 대표 샘플 선정 → 샘플 평가 → 결과 보고", en: "Define scope → Explore the website → Select representative sample → Audit the sample → Report findings" },
				b: { ko: "샘플 선정 → 범위 정의 → 보고 → 평가 → 탐색", en: "Select sample → Define scope → Report → Audit → Explore" },
				c: { ko: "자동 검사 → 수동 검사 → 보고", en: "Automated scan → Manual check → Report" },
				d: { ko: "보고 → 평가 → 샘플 선정 → 탐색 → 범위 정의", en: "Report → Audit → Sample → Explore → Scope" },
			},
			answer: "a",
			explanation: {
				ko: "WCAG-EM은 ① 평가 범위 정의(적합성 목표 포함) ② 웹사이트 탐색(주요 기능·페이지 유형 파악) ③ 대표 샘플 선정 ④ 샘플 평가 ⑤ 결과 보고의 순서로 진행합니다.",
				en: "WCAG-EM proceeds: ① define the evaluation scope (including conformance target), ② explore the website to identify key functionality and page types, ③ select a representative sample, ④ audit the sample, ⑤ report the findings.",
			},
		},
		{
			id: "was-3-1-x2",
			question: {
				ko: "대규모 사이트 평가에서 대표 샘플을 선정할 때 포함해야 할 페이지로 가장 거리가 먼 것은?",
				en: "When selecting a representative sample for a large site evaluation, which page is LEAST necessary to include?",
			},
			options: {
				a: { ko: "홈페이지와 주요 진입 페이지", en: "The home page and key entry pages" },
				b: { ko: "로그인·검색·결제 등 핵심 기능 페이지", en: "Pages with essential functionality like login, search, and checkout" },
				c: { ko: "서로 다른 템플릿·콘텐츠 유형을 대표하는 페이지", en: "Pages representing distinct templates and content types" },
				d: { ko: "동일 템플릿의 모든 상품 상세 페이지 전수", en: "Every single product detail page sharing the same template" },
			},
			answer: "d",
			explanation: {
				ko: "샘플링의 목적은 전수 조사 없이 사이트 전체를 대표하는 것입니다. 동일 템플릿 페이지는 대표 1~2개만 포함하면 되고, 홈·핵심 기능·상이한 템플릿·무작위 샘플을 포함하는 것이 WCAG-EM의 권고입니다.",
				en: "Sampling exists to represent the whole site without auditing every page. One or two representatives of a shared template suffice; WCAG-EM recommends including the home page, essential functionality, distinct templates, and a random sample.",
			},
		},
		{
			id: "was-3-1-x3",
			question: {
				ko: "접근성 이슈의 개선 우선순위를 정할 때 가장 중요한 기준은?",
				en: "What is the most important criterion when prioritizing accessibility remediation?",
			},
			options: {
				a: { ko: "수정하기 쉬운 순서", en: "Whatever is easiest to fix" },
				b: { ko: "사용자 영향(과업 차단 여부)과 발생 빈도·핵심 경로 여부", en: "User impact (whether it blocks tasks), frequency, and presence on critical paths" },
				c: { ko: "발견된 순서", en: "The order issues were found" },
				d: { ko: "디자인 개선 효과", en: "Visual design improvement" },
			},
			answer: "b",
			explanation: {
				ko: "우선순위는 사용자가 핵심 과업을 완료할 수 없게 만드는 차단(blocker) 이슈, 여러 페이지에 반복되는 이슈, 핵심 사용자 경로의 이슈를 먼저 해결하는 것이 원칙입니다. 수정 난이도는 부차적 고려사항입니다.",
				en: "Prioritize blockers that prevent users from completing key tasks, issues repeated across many pages, and issues on critical user paths. Ease of fixing is a secondary consideration.",
			},
		},
	],
	"was-3-2": [
		{
			id: "was-3-2-x1",
			question: {
				ko: "CI/CD 파이프라인에 접근성 검사를 통합하는 방법으로 가장 효과적인 것은?",
				en: "What is the most effective way to integrate accessibility testing into a CI/CD pipeline?",
			},
			options: {
				a: { ko: "배포 후 1년에 한 번 전체 감사만 실시", en: "Only a full audit once a year after deployment" },
				b: { ko: "axe-core 등 자동 검사를 PR 단계에서 실행해 회귀를 조기 차단하고, 수동 검수는 릴리스 주기로 병행", en: "Run automated checks (e.g., axe-core) at the PR stage to catch regressions early, complemented by periodic manual testing per release cycle" },
				c: { ko: "자동 검사만으로 모든 검수를 대체", en: "Replace all testing with automated checks" },
				d: { ko: "접근성 검사는 CI에 통합할 수 없다", en: "Accessibility testing cannot be integrated into CI" },
			},
			answer: "b",
			explanation: {
				ko: "자동 검사를 PR/빌드 단계에 넣으면 새 코드가 유발하는 회귀를 배포 전에 차단할 수 있습니다. 다만 자동 검사는 이슈의 일부만 찾으므로 스크린 리더·키보드 수동 검수를 릴리스 주기에 병행하는 하이브리드 접근이 모범 사례입니다.",
				en: "Automated checks in the PR/build stage block regressions before deployment. Because automation finds only a portion of issues, the best practice is a hybrid approach with manual screen reader and keyboard testing each release cycle.",
			},
		},
		{
			id: "was-3-2-x2",
			question: {
				ko: "장애인 사용자 참여 테스트(usability testing with people with disabilities)에 대한 설명으로 옳은 것은?",
				en: "Which statement about usability testing with people with disabilities is correct?",
			},
			options: {
				a: { ko: "WCAG 적합성 검사를 완전히 대체한다", en: "It completely replaces WCAG conformance testing" },
				b: { ko: "전문가 검수로는 찾기 어려운 실제 사용 맥락의 문제를 발견하며, 적합성 검사를 보완한다", en: "It uncovers real-world usage problems expert review misses, complementing conformance testing" },
				c: { ko: "스크린 리더 사용자 1명이면 모든 장애 유형을 대표할 수 있다", en: "One screen reader user can represent all disability types" },
				d: { ko: "비용이 들므로 하지 않는 것이 좋다", en: "It is best avoided because it costs money" },
			},
			answer: "b",
			explanation: {
				ko: "적합성 검사는 기준 충족 여부를, 사용자 테스트는 실제 과업 수행 가능성과 사용성을 검증합니다. 서로 다른 문제를 발견하므로 상호 보완적입니다. 장애 유형·보조기술이 다양하므로 여러 참가자 유형을 포함해야 합니다.",
				en: "Conformance testing verifies criteria; user testing validates whether real tasks can be completed. They surface different problems and complement each other. Because disabilities and AT vary widely, multiple participant profiles are needed.",
			},
		},
		{
			id: "was-3-2-x3",
			question: {
				ko: "접근성 회귀(regression)를 예방하는 조직적 방법으로 가장 거리가 먼 것은?",
				en: "Which is LEAST effective for preventing accessibility regressions organizationally?",
			},
			options: {
				a: { ko: "디자인 시스템 컴포넌트에 접근성을 내재화", en: "Building accessibility into design system components" },
				b: { ko: "코드 리뷰 체크리스트에 접근성 항목 포함", en: "Including accessibility items in code review checklists" },
				c: { ko: "자동 테스트를 CI에 통합", en: "Integrating automated tests into CI" },
				d: { ko: "출시 직전에만 일회성 검사 실시", en: "A single one-off check just before launch" },
			},
			answer: "d",
			explanation: {
				ko: "회귀 예방은 지속적 장치(접근 가능한 공용 컴포넌트, 리뷰 체크리스트, CI 자동 검사)를 개발 흐름에 심는 것이 핵심입니다. 출시 직전 일회성 검사는 문제를 늦게 발견해 수정 비용이 크고 회귀를 막지 못합니다.",
				en: "Preventing regressions requires continuous mechanisms embedded in the workflow — accessible shared components, review checklists, CI automation. A one-off pre-launch check finds problems too late and prevents nothing.",
			},
		},
	],
};
