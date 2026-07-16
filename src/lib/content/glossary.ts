export interface GlossaryTerm {
  id: string;
  term: { ko: string; en: string };
  definition: { ko: string; en: string };
  certs: ("cpacc" | "was")[];
  /** 검색 매칭 확장용 별칭 (렌더에는 노출 안 함) — 예: 약어, 흔한 표기 변형 */
  aliases?: string[];
}

export const glossaryTerms: GlossaryTerm[] = [
  // A
  {
    id: "ada",
    term: { ko: "ADA (미국 장애인법)", en: "Americans with Disabilities Act (ADA)" },
    definition: {
      ko: "1990년 제정된 미국 연방법. 고용, 공공 서비스, 편의 시설, 통신 분야에서 장애인 차별을 금지합니다.",
      en: "U.S. federal law enacted in 1990 that prohibits discrimination against people with disabilities in employment, public services, accommodations, and telecommunications.",
    },
    certs: ["cpacc"],
  },
  {
    id: "alt-text",
    term: { ko: "대체 텍스트", en: "Alternative Text (alt text)" },
    definition: {
      ko: "이미지의 내용과 기능을 텍스트로 설명하는 HTML alt 속성. 스크린 리더 사용자가 시각 콘텐츠를 이해하도록 돕습니다.",
      en: "HTML alt attribute that describes the content and function of an image. Helps screen reader users understand visual content.",
    },
    certs: ["cpacc", "was"],
    aliases: ["alt", "얼트", "대체텍스트"],
  },
  {
    id: "aria",
    term: { ko: "WAI-ARIA", en: "WAI-ARIA (Accessible Rich Internet Applications)" },
    definition: {
      ko: "W3C가 정의한 역할(role), 속성(property), 상태(state) 명세. HTML만으로 표현하기 어려운 복잡한 UI 컴포넌트의 접근성을 보강합니다.",
      en: "W3C specification defining roles, properties, and states that supplement HTML to improve accessibility of complex UI components.",
    },
    certs: ["was"],
    aliases: ["에어리어", "아리아", "Accessible Rich Internet Applications"],
  },
  {
    id: "assistive-technology",
    term: { ko: "보조 기술", en: "Assistive Technology (AT)" },
    definition: {
      ko: "장애인이 기기·소프트웨어를 사용하도록 돕는 하드웨어 또는 소프트웨어. 스크린 리더, 음성 인식, 점자 단말기 등이 포함됩니다.",
      en: "Hardware or software that helps people with disabilities use devices and software, including screen readers, voice recognition, and braille displays.",
    },
    certs: ["cpacc", "was"],
    aliases: ["AT", "보조공학"],
  },
  {
    id: "axe",
    term: { ko: "axe", en: "axe (automated accessibility testing tool)" },
    definition: {
      ko: "Deque Systems가 개발한 자동 접근성 검사 도구. 브라우저 확장 및 개발 환경에서 WCAG 위반을 탐지합니다.",
      en: "Automated accessibility testing tool by Deque Systems. Detects WCAG violations in browsers and development environments.",
    },
    certs: ["was"],
  },
  // B
  {
    id: "biopsychosocial",
    term: { ko: "생체심리사회 모델", en: "Biopsychosocial Model" },
    definition: {
      ko: "WHO ICF(국제 기능·장애·건강 분류)의 기반이 되는 모델. 장애를 신체·심리·사회적 요인의 복합적 상호작용으로 이해합니다.",
      en: "Model underlying WHO ICF. Understands disability as a complex interaction of biological, psychological, and social factors.",
    },
    certs: ["cpacc"],
  },
  // C
  {
    id: "captions",
    term: { ko: "자막 (캡션)", en: "Captions" },
    definition: {
      ko: "동영상의 대화, 소리 효과, 음악을 텍스트로 표시하는 요소. WCAG 1.2.2(녹화 콘텐츠)와 1.2.4(실시간 콘텐츠)에서 요구됩니다.",
      en: "Text representation of dialogue, sound effects, and music in video. Required by WCAG 1.2.2 (prerecorded) and 1.2.4 (live).",
    },
    certs: ["cpacc", "was"],
  },
  {
    id: "color-contrast",
    term: { ko: "색상 대비", en: "Color Contrast" },
    definition: {
      ko: "전경색과 배경색의 밝기 비율. WCAG AA 기준 일반 텍스트 4.5:1, 큰 텍스트·UI 컴포넌트 3:1 이상을 요구합니다.",
      en: "Luminance ratio between foreground and background colors. WCAG AA requires 4.5:1 for normal text and 3:1 for large text and UI components.",
    },
    certs: ["was"],
    aliases: ["명도 대비", "색 대비"],
  },
  {
    id: "conformance",
    term: { ko: "적합성 수준", en: "Conformance Level (A / AA / AAA)" },
    definition: {
      ko: "WCAG 성공 기준을 충족하는 정도. Level A(최소), Level AA(일반 채택 목표), Level AAA(최고 수준).",
      en: "Degree of meeting WCAG success criteria. Level A (minimum), Level AA (common adoption target), Level AAA (highest).",
    },
    certs: ["cpacc", "was"],
  },
  {
    id: "crpd",
    term: { ko: "UN 장애인권리협약 (CRPD)", en: "UN Convention on the Rights of Persons with Disabilities (CRPD)" },
    definition: {
      ko: "2006년 채택된 국제 인권 조약. 장애인의 디지털·물리적 접근성을 권리로 보장하며 사회적 장벽 제거를 요구합니다.",
      en: "International human rights treaty adopted in 2006. Guarantees accessibility as a right for persons with disabilities and requires removal of social barriers.",
    },
    certs: ["cpacc"],
    aliases: ["UN CRPD", "장애인권리협약"],
  },
  // E
  {
    id: "en-301-549",
    term: { ko: "EN 301 549", en: "EN 301 549 (European Accessibility Standard)" },
    definition: {
      ko: "EU 공공 기관의 ICT 접근성 조달 기준. WCAG 2.1 AA를 포함하며 소프트웨어, 문서, 하드웨어까지 범위를 확장합니다.",
      en: "EU ICT accessibility procurement standard. Incorporates WCAG 2.1 AA and extends scope to software, documents, and hardware.",
    },
    certs: ["cpacc"],
  },
  // F
  {
    id: "focus-management",
    term: { ko: "포커스 관리", en: "Focus Management" },
    definition: {
      ko: "키보드 포커스를 프로그래밍으로 이동시키는 기법. 모달 열기/닫기, SPA 라우팅, 오류 처리 시 사용자가 올바른 요소로 이동하도록 합니다.",
      en: "Programmatically moving keyboard focus. Used when opening/closing modals, SPA routing, and error handling to guide users to the correct element.",
    },
    certs: ["was"],
  },
  {
    id: "focus-order",
    term: { ko: "포커스 순서", en: "Focus Order" },
    definition: {
      ko: "Tab 키로 이동하는 순서. WCAG 2.4.3에서 의미 있는 순서를 요구합니다.",
      en: "Order of navigation via the Tab key. WCAG 2.4.3 requires a meaningful sequence.",
    },
    certs: ["was"],
  },
  // H
  {
    id: "heading",
    term: { ko: "헤딩 구조", en: "Heading Structure" },
    definition: {
      ko: "h1-h6 요소로 콘텐츠 계층을 표현하는 방식. 스크린 리더 사용자가 페이지를 탐색하는 주요 수단입니다.",
      en: "Using h1-h6 elements to express content hierarchy. A primary navigation method for screen reader users.",
    },
    certs: ["was"],
  },
  // I
  {
    id: "icf",
    term: { ko: "WHO ICF", en: "WHO International Classification of Functioning, Disability and Health (ICF)" },
    definition: {
      ko: "WHO가 개발한 장애·건강 분류 체계. 장애를 신체 기능·구조, 활동, 참여, 환경적 요인으로 구분합니다.",
      en: "WHO framework for classifying disability and health. Distinguishes body functions/structures, activities, participation, and environmental factors.",
    },
    certs: ["cpacc"],
  },
  // J
  {
    id: "jaws",
    term: { ko: "JAWS", en: "JAWS (Job Access With Speech)" },
    definition: {
      ko: "Freedom Scientific의 Windows용 스크린 리더. 기업·공공 기관에서 가장 널리 사용되는 보조 기술 중 하나입니다.",
      en: "Windows screen reader by Freedom Scientific. One of the most widely used assistive technologies in enterprise and government.",
    },
    certs: ["cpacc", "was"],
  },
  // K
  {
    id: "keyboard-accessibility",
    term: { ko: "키보드 접근성", en: "Keyboard Accessibility" },
    definition: {
      ko: "마우스 없이 키보드만으로 모든 기능을 사용할 수 있게 하는 원칙. WCAG 2.1.1에서 기본 요구사항으로 규정됩니다.",
      en: "Principle of making all functionality usable with a keyboard alone. Required by WCAG 2.1.1.",
    },
    certs: ["was"],
    aliases: ["키보드 접근", "탭 이동"],
  },
  // L
  {
    id: "landmark",
    term: { ko: "랜드마크", en: "Landmark (ARIA landmark)" },
    definition: {
      ko: "페이지 영역을 구분하는 ARIA 역할. header, main, nav, footer 등 HTML5 섹셔닝 요소나 role 속성으로 지정합니다.",
      en: "ARIA roles that identify page regions. Defined using HTML5 sectioning elements (header, main, nav, footer) or explicit role attributes.",
    },
    certs: ["was"],
  },
  // M
  {
    id: "medical-model",
    term: { ko: "의료 모델", en: "Medical Model of Disability" },
    definition: {
      ko: "장애를 개인의 신체적·정신적 손상으로 보는 관점. 치료나 재활을 통해 '정상'에 가까워지는 것을 목표로 합니다.",
      en: "Views disability as an individual's physical or mental impairment. Aims to bring the individual closer to 'normalcy' through treatment or rehabilitation.",
    },
    certs: ["cpacc"],
  },
  // N
  {
    id: "nvda",
    term: { ko: "NVDA", en: "NVDA (NonVisual Desktop Access)" },
    definition: {
      ko: "NV Access가 개발한 무료 오픈소스 Windows 스크린 리더. 접근성 검수 및 개발 테스트에 널리 사용됩니다.",
      en: "Free, open-source Windows screen reader by NV Access. Widely used for accessibility audits and development testing.",
    },
    certs: ["cpacc", "was"],
  },
  // P
  {
    id: "pour",
    term: { ko: "POUR 원칙", en: "POUR Principles" },
    definition: {
      ko: "WCAG의 4가지 핵심 원칙: 인식 가능(Perceivable), 운용 가능(Operable), 이해 가능(Understandable), 견고성(Robust).",
      en: "Four core WCAG principles: Perceivable, Operable, Understandable, Robust.",
    },
    certs: ["cpacc", "was"],
  },
  // S
  {
    id: "screen-reader",
    term: { ko: "스크린 리더", en: "Screen Reader" },
    definition: {
      ko: "화면의 텍스트와 UI 정보를 음성이나 점자로 출력하는 보조 기술. 시각 장애인과 난독증 사용자가 주로 사용합니다.",
      en: "Assistive technology that outputs screen text and UI information as speech or braille. Primarily used by people with visual impairments and dyslexia.",
    },
    certs: ["cpacc", "was"],
    aliases: ["SR", "스크린리더"],
  },
  {
    id: "section-508",
    term: { ko: "재활법 508조 (Section 508)", en: "Section 508 of the Rehabilitation Act" },
    definition: {
      ko: "미국 연방 기관이 구매·개발하는 전자 정보 기술의 접근성을 의무화하는 법률. 2017년 개정으로 WCAG 2.0 AA를 요구합니다.",
      en: "U.S. law mandating accessibility of electronic and IT developed or procured by federal agencies. 2017 refresh requires WCAG 2.0 AA.",
    },
    certs: ["cpacc"],
  },
  {
    id: "semantic-html",
    term: { ko: "의미론적 HTML", en: "Semantic HTML" },
    definition: {
      ko: "콘텐츠의 의미와 역할을 표현하는 HTML 요소 사용. nav, main, article, button 등은 고유한 접근성 트리 역할을 제공합니다.",
      en: "Using HTML elements that convey meaning and role. Elements like nav, main, article, and button provide built-in accessibility tree roles.",
    },
    certs: ["was"],
  },
  {
    id: "social-model",
    term: { ko: "사회 모델", en: "Social Model of Disability" },
    definition: {
      ko: "장애는 개인이 아닌 사회의 구조적 장벽으로 인해 발생한다는 관점. IAAP CPACC의 핵심 개념입니다.",
      en: "Perspective that disability is caused by social/structural barriers, not the individual. Core concept in IAAP CPACC.",
    },
    certs: ["cpacc"],
  },
  {
    id: "success-criterion",
    term: { ko: "성공 기준", en: "Success Criterion (SC)" },
    definition: {
      ko: "WCAG에서 테스트 가능한 단위 기준. 각 SC는 A, AA, AAA 중 하나의 적합성 수준을 가집니다.",
      en: "Testable unit criterion in WCAG. Each SC has a conformance level of A, AA, or AAA.",
    },
    certs: ["cpacc", "was"],
  },
  // T
  {
    id: "talkback",
    term: { ko: "TalkBack", en: "TalkBack" },
    definition: {
      ko: "Android 기기의 내장 스크린 리더. 손가락 제스처와 탐색 모드를 통해 시각 장애인이 안드로이드 앱을 사용할 수 있도록 합니다.",
      en: "Built-in screen reader for Android devices. Enables people with visual impairments to use Android apps through gestures and navigation modes.",
    },
    certs: ["was"],
  },
  // U
  {
    id: "universal-design",
    term: { ko: "보편적 설계 (유니버설 디자인)", en: "Universal Design" },
    definition: {
      ko: "별도의 조정 없이 가능한 한 많은 사람이 사용할 수 있는 제품·환경·프로그램을 설계하는 방식. 7가지 원칙이 있습니다.",
      en: "Designing products, environments, and programs to be usable by all people to the greatest extent possible, without adaptation. Includes 7 principles.",
    },
    certs: ["cpacc"],
    aliases: ["UD", "유니버설 디자인"],
  },
  // V
  {
    id: "voiceover",
    term: { ko: "VoiceOver", en: "VoiceOver" },
    definition: {
      ko: "Apple macOS, iOS, iPadOS의 내장 스크린 리더. iPhone·Mac 접근성 테스트의 기준이 됩니다.",
      en: "Built-in screen reader for Apple macOS, iOS, and iPadOS. The standard for accessibility testing on iPhone and Mac.",
    },
    certs: ["cpacc", "was"],
  },
  {
    id: "vpat",
    term: { ko: "VPAT (자발적 제품 접근성 템플릿)", en: "VPAT (Voluntary Product Accessibility Template)" },
    definition: {
      ko: "제품이 접근성 표준을 얼마나 준수하는지 설명하는 문서 템플릿. 미국 공공 조달에서 주로 요구됩니다.",
      en: "Document template describing how a product meets accessibility standards. Commonly required in U.S. public sector procurement.",
    },
    certs: ["cpacc"],
    aliases: ["ACR"],
  },
  // W
  {
    id: "wave",
    term: { ko: "WAVE", en: "WAVE (Web Accessibility Evaluation Tool)" },
    definition: {
      ko: "WebAIM이 개발한 웹 접근성 자동 검사 도구. 오류를 시각적으로 표시하며 초보자가 접근성 문제를 이해하기 쉽습니다.",
      en: "Web accessibility evaluation tool by WebAIM. Visually marks errors and is beginner-friendly for understanding accessibility issues.",
    },
    certs: ["was"],
  },
  {
    id: "wcag",
    term: { ko: "WCAG (웹 콘텐츠 접근성 지침)", en: "WCAG (Web Content Accessibility Guidelines)" },
    definition: {
      ko: "W3C WAI가 개발한 웹 접근성 국제 표준. 현재 WCAG 2.2가 최신이며 A, AA, AAA 3단계 적합성 수준을 정의합니다.",
      en: "International web accessibility standard by W3C WAI. WCAG 2.2 is the latest version, defining A, AA, and AAA conformance levels.",
    },
    certs: ["cpacc", "was"],
    aliases: ["웹 콘텐츠 접근성 지침", "더블에이"],
  },
  {
    id: "wcag-em",
    term: { ko: "WCAG-EM (웹 접근성 평가 방법론)", en: "WCAG-EM (Website Accessibility Conformance Evaluation Methodology)" },
    definition: {
      ko: "W3C가 제공하는 5단계 접근성 평가 절차. 범위 설정, 샘플링, 검사, 보고서 작성을 체계적으로 안내합니다.",
      en: "W3C five-step accessibility evaluation procedure. Systematically guides scope definition, sampling, testing, and reporting.",
    },
    certs: ["was"],
  },
  {
    id: "accessibility-tree",
    term: { ko: "접근성 트리", en: "Accessibility Tree" },
    definition: {
      ko: "브라우저가 DOM에서 생성하는 보조기술용 구조. 각 요소의 name, role, state, value를 담아 스크린 리더 등에 전달합니다.",
      en: "A structure browsers derive from the DOM for assistive technologies, exposing each element's name, role, state, and value to screen readers and other AT.",
    },
    certs: ["was"],
  },
  {
    id: "acr",
    term: { ko: "ACR (접근성 적합성 보고서)", en: "ACR (Accessibility Conformance Report)" },
    definition: {
      ko: "VPAT 양식을 작성해 완성한 문서. 제품이 Section 508, WCAG, EN 301 549를 어느 정도 준수하는지 기술하며 조달 평가에 사용됩니다.",
      en: "The completed document produced from a VPAT, describing how a product conforms to Section 508, WCAG, and EN 301 549. Used in procurement evaluations.",
    },
    certs: ["cpacc"],
  },
  {
    id: "aoda",
    term: { ko: "AODA (온타리오 장애인 접근성법)", en: "AODA (Accessibility for Ontarians with Disabilities Act)" },
    definition: {
      ko: "캐나다 온타리오주의 접근성 법률. 공공·민간 조직에 WCAG 2.0 AA 수준의 웹 접근성 준수를 단계적으로 의무화했습니다.",
      en: "Ontario, Canada's accessibility law that phased in mandatory WCAG 2.0 AA web accessibility compliance for public and private organizations.",
    },
    certs: ["cpacc"],
  },
  {
    id: "aria-live",
    term: { ko: "ARIA 라이브 리전", en: "ARIA Live Region" },
    definition: {
      ko: "동적으로 변경되는 콘텐츠를 스크린 리더가 자동으로 낭독하게 하는 영역. aria-live=\"polite\"는 현재 낭독을 마친 뒤, \"assertive\"는 즉시 알립니다.",
      en: "A region whose dynamic content updates are announced automatically by screen readers. aria-live=\"polite\" waits for the current speech to finish; \"assertive\" interrupts immediately.",
    },
    certs: ["was"],
  },
  {
    id: "cognitive-disability",
    term: { ko: "인지 장애", en: "Cognitive Disability" },
    definition: {
      ko: "기억, 주의, 문제 해결, 언어 이해 등에 영향을 주는 장애의 총칭. 단순한 언어, 일관된 내비게이션, 충분한 시간 제공 등이 도움이 됩니다.",
      en: "Disabilities affecting memory, attention, problem-solving, or language comprehension. Plain language, consistent navigation, and sufficient time all help.",
    },
    certs: ["cpacc"],
  },
  {
    id: "eaa",
    term: { ko: "유럽 접근성법 (EAA)", en: "European Accessibility Act (EAA)" },
    definition: {
      ko: "2025년부터 시행된 EU 지침. 전자상거래, 은행, 전자책, 교통 등 민간 제품·서비스에 접근성을 의무화하며 EN 301 549가 적합성 기준으로 쓰입니다.",
      en: "EU directive in force from 2025 requiring accessibility of private-sector products and services — e-commerce, banking, e-books, transport — with EN 301 549 as the presumed conformance standard.",
    },
    certs: ["cpacc"],
  },
  {
    id: "focus-visible",
    term: { ko: "포커스 표시 (Focus Visible)", en: "Focus Visible" },
    definition: {
      ko: "키보드 포커스를 받은 요소가 시각적으로 구별되어야 한다는 요구사항(WCAG 2.4.7). 포커스 아웃라인을 제거하면 키보드 사용자가 위치를 잃습니다.",
      en: "The requirement (WCAG 2.4.7) that keyboard focus be visually apparent. Removing focus outlines leaves keyboard users lost on the page.",
    },
    certs: ["was"],
  },
  {
    id: "keyboard-trap",
    term: { ko: "키보드 트랩", en: "Keyboard Trap" },
    definition: {
      ko: "키보드만으로 특정 영역에 들어간 뒤 빠져나올 수 없는 상태(WCAG 2.1.2 위반). 모달 대화상자 구현 시 흔히 발생합니다.",
      en: "A state where keyboard users can enter a component but cannot leave it (violating WCAG 2.1.2). Commonly occurs in modal dialog implementations.",
    },
    certs: ["was"],
  },
  {
    id: "name-role-value",
    term: { ko: "이름·역할·값 (Name, Role, Value)", en: "Name, Role, Value" },
    definition: {
      ko: "모든 UI 컴포넌트가 보조기술에 노출해야 하는 정보(WCAG 4.1.2). 시맨틱 HTML을 쓰면 자동으로 제공되고, 커스텀 컴포넌트는 ARIA로 보완합니다.",
      en: "Information every UI component must expose to assistive technologies (WCAG 4.1.2). Semantic HTML provides it automatically; custom components need ARIA.",
    },
    certs: ["was"],
  },
  {
    id: "reasonable-accommodation",
    term: { ko: "합리적 편의제공", en: "Reasonable Accommodation" },
    definition: {
      ko: "과도한 부담이 되지 않는 범위에서 장애인에게 필요한 변경과 조정을 제공하는 것. CRPD는 이를 거부하는 것을 차별로 규정합니다.",
      en: "Providing necessary modifications and adjustments for persons with disabilities without imposing an undue burden. Under the CRPD, denial constitutes discrimination.",
    },
    certs: ["cpacc"],
  },
  {
    id: "reflow",
    term: { ko: "리플로우 (Reflow)", en: "Reflow" },
    definition: {
      ko: "400% 확대(320px 폭 상당)에서도 가로 스크롤 없이 콘텐츠를 이용할 수 있어야 한다는 요구사항(WCAG 1.4.10). 반응형 설계로 충족합니다.",
      en: "The requirement (WCAG 1.4.10) that content be usable without horizontal scrolling at 400% zoom (equivalent to 320px width). Met through responsive design.",
    },
    certs: ["was"],
  },
  {
    id: "situational-limitation",
    term: { ko: "상황적 제약", en: "Situational Limitation" },
    definition: {
      ko: "밝은 햇빛 아래의 화면, 한 손에 짐을 든 상태 등 일시적 상황이 만드는 이용 제약. 접근성이 모든 사용자에게 유익함을 보여주는 개념입니다.",
      en: "Constraints created by temporary circumstances — glare on a screen, carrying something in one hand. Illustrates how accessibility benefits everyone.",
    },
    certs: ["cpacc"],
  },
  {
    id: "switch-access",
    term: { ko: "스위치 제어", en: "Switch Access" },
    definition: {
      ko: "버튼(스위치) 하나 이상으로 기기를 조작하는 보조기술. 운동 장애가 있는 사용자가 스캐닝 방식으로 항목을 선택합니다.",
      en: "Assistive technology operated with one or more buttons (switches). Users with motor disabilities select items via scanning.",
    },
    certs: ["cpacc"],
  },
  {
    id: "target-size",
    term: { ko: "타깃 크기", en: "Target Size" },
    definition: {
      ko: "포인터 입력 대상의 최소 크기 요구사항. WCAG 2.2의 2.5.8(AA)은 최소 24×24 CSS 픽셀을 요구합니다.",
      en: "Minimum size requirements for pointer targets. WCAG 2.2's 2.5.8 (AA) requires at least 24×24 CSS pixels.",
    },
    certs: ["was"],
  },
  {
    id: "wai",
    term: { ko: "WAI (웹 접근성 이니셔티브)", en: "WAI (Web Accessibility Initiative)" },
    definition: {
      ko: "W3C 산하에서 웹 접근성 표준과 자료를 개발하는 조직. WCAG, ARIA, ATAG, UAAG 등을 관리합니다.",
      en: "The W3C group developing web accessibility standards and resources, maintaining WCAG, ARIA, ATAG, and UAAG.",
    },
    certs: ["cpacc", "was"],
  },
  {
    id: "udl",
    term: { ko: "보편적 학습 설계 (UDL)", en: "Universal Design for Learning (UDL)" },
    definition: {
      ko: "보편적 설계를 교육에 적용한 프레임워크(CAST 개발). 참여·표상·행동과 표현의 세 영역에서 다양한 수단을 제공해 모든 학습자를 지원합니다.",
      en: "A framework applying Universal Design to education (developed by CAST), supporting all learners through multiple means of engagement, representation, and action & expression.",
    },
    certs: ["cpacc"],
    aliases: ["Universal Design for Learning"],
  },
  {
    id: "user-centered-design",
    term: { ko: "사용자 중심 설계 (UCD)", en: "User-Centered Design (UCD)" },
    definition: {
      ko: "사용자 요구를 조사→설계→평가의 반복 주기 중심에 두는 설계 방법론. 장애인을 리서치와 테스트 참가자로 포함할 때 접근성과 만납니다.",
      en: "A design methodology centering user needs in an iterative research→design→evaluate cycle. It meets accessibility when disabled people are included as research and testing participants.",
    },
    certs: ["cpacc"],
    aliases: ["UCD"],
  },
  {
    id: "curb-cut-effect",
    term: { ko: "연석 경사로 효과", en: "Curb Cut Effect" },
    definition: {
      ko: "특정 집단(휠체어 사용자)을 위한 설계가 유모차·자전거·짐 든 사람 등 모두에게 혜택을 주는 현상. 접근성 설계의 보편적 가치를 보여주는 대표 개념입니다.",
      en: "The phenomenon where design for a specific group (wheelchair users) benefits everyone — strollers, bicycles, people carrying loads. The classic illustration of accessibility's universal value.",
    },
    certs: ["cpacc"],
    aliases: ["curb cut"],
  },
  {
    id: "plain-language",
    term: { ko: "쉬운 언어 (Plain Language)", en: "Plain Language" },
    definition: {
      ko: "짧은 문장, 익숙한 단어, 명확한 구조로 쓰는 글쓰기 방식. 인지 장애 사용자를 포함한 모든 독자의 이해를 돕는 인지 접근성의 핵심 수단입니다.",
      en: "Writing with short sentences, familiar words, and clear structure. A core tool of cognitive accessibility that helps all readers, including those with cognitive disabilities.",
    },
    certs: ["cpacc", "was"],
  },
  {
    id: "cvaa",
    term: { ko: "CVAA (21세기 통신·영상 접근성법)", en: "CVAA (21st Century Communications and Video Accessibility Act)" },
    definition: {
      ko: "2010년 미국 법률. 첨단 통신 서비스(VoIP, 메시징)와 인터넷으로 배포되는 영상 프로그램의 접근성(자막 등)을 요구합니다.",
      en: "A 2010 US law requiring accessibility of advanced communications services (VoIP, messaging) and internet-delivered video programming (e.g., captions).",
    },
    certs: ["cpacc"],
  },
  {
    id: "accessibility-statement",
    term: { ko: "접근성 성명", en: "Accessibility Statement" },
    definition: {
      ko: "사이트·서비스의 접근성 준수 수준, 알려진 한계, 피드백 연락처를 공개하는 문서. EU 공공 부문에서는 법적 의무입니다.",
      en: "A public document disclosing a site's conformance level, known limitations, and a feedback contact. Legally required for the EU public sector.",
    },
    certs: ["cpacc"],
  },
  {
    id: "maturity-model",
    term: { ko: "접근성 성숙도 모델", en: "Accessibility Maturity Model" },
    definition: {
      ko: "조직의 접근성 수준을 단계(초기→계획→관리→정착→최적화)로 진단하고 지속 가능한 프로그램으로 가는 로드맵을 제공하는 평가 틀. W3C도 자체 모델을 발행합니다.",
      en: "An assessment framework diagnosing organizational accessibility in stages (ad hoc→planned→managed→embedded→optimized) and providing a roadmap toward a sustainable program. The W3C publishes its own model.",
    },
    certs: ["cpacc"],
  },
  {
    id: "shift-left",
    term: { ko: "시프트 레프트 (Shift Left)", en: "Shift Left" },
    definition: {
      ko: "접근성을 개발 프로세스의 초기(왼쪽) 단계 — 기획·디자인 — 부터 통합하는 전략. 출시 후 소급 수정 대비 비용을 크게 줄입니다.",
      en: "The strategy of integrating accessibility from the earliest (leftmost) stages — planning and design — dramatically reducing cost compared with post-launch retrofits.",
    },
    certs: ["cpacc", "was"],
  },
  {
    id: "photosensitive-epilepsy",
    term: { ko: "광과민성 발작", en: "Photosensitive Epilepsy" },
    definition: {
      ko: "초당 3회를 초과하는 섬광이나 규칙적 패턴 등 시각 자극으로 발작이 유발되는 뇌전증의 한 형태. WCAG 2.3.1이 콘텐츠의 섬광 임계값을 규정합니다.",
      en: "A form of epilepsy where visual stimuli — flashing over three times per second or regular patterns — trigger seizures. WCAG 2.3.1 sets flash thresholds for content.",
    },
    certs: ["cpacc", "was"],
    aliases: ["seizure", "발작", "photosensitive"],
  },
  {
    id: "deaf-blindness",
    term: { ko: "농맹", en: "Deaf-Blindness" },
    definition: {
      ko: "시각과 청각 손상이 함께 있는 대표적 중복 장애. ICT 접근은 갱신형 점자 디스플레이가 사실상 유일한 통로라 텍스트 기반 콘텐츠와 올바른 마크업이 필수입니다.",
      en: "The canonical multiple disability combining vision and hearing loss. A refreshable braille display is effectively the only ICT channel, making text-based content and correct markup essential.",
    },
    certs: ["cpacc"],
    aliases: ["중복장애", "deafblind"],
  },
  {
    id: "person-first-language",
    term: { ko: "사람 우선 표현", en: "Person-First Language" },
    definition: {
      ko: "'장애가 있는 사람'처럼 사람을 장애보다 먼저 두는 표현 방식. 장애가 그 사람의 전부가 아님을 강조하며, 미국 공식 문서·의료·교육 맥락의 오랜 표준입니다.",
      en: "Language that puts the person before the condition — 'person with a disability' — emphasizing that disability is not the whole person. Long the standard in US official, medical, and educational contexts.",
    },
    certs: ["cpacc"],
    aliases: ["피플 퍼스트"],
  },
  {
    id: "identity-first-language",
    term: { ko: "정체성 우선 표현", en: "Identity-First Language" },
    definition: {
      ko: "'농인', '자폐인'처럼 장애를 정체성의 일부로 앞세우는 표현 방식. 농문화 공동체와 자폐 자기옹호 운동이 선호하는 경향이 뚜렷하며, 원칙은 당사자·공동체의 선호를 따르는 것입니다.",
      en: "Language that leads with disability as identity — 'Deaf person,' 'autistic person.' Preferred by the Deaf culture community and autistic self-advocates; the rule is to follow the person's and community's preference.",
    },
    certs: ["cpacc"],
  },
  {
    id: "atag",
    term: { ko: "ATAG (저작 도구 접근성 지침)", en: "ATAG (Authoring Tool Accessibility Guidelines)" },
    definition: {
      ko: "CMS·편집기 등 저작 도구에 적용되는 W3C 지침. Part A는 도구 UI 자체의 접근성, Part B는 접근 가능한 콘텐츠 생산 지원(alt 프롬프트, 접근 가능한 템플릿, 자동 검사)을 요구합니다.",
      en: "W3C guidelines for authoring tools such as CMSs and editors. Part A requires an accessible tool UI; Part B requires supporting accessible content production (alt prompts, accessible templates, automated checks).",
    },
    certs: ["was", "cpacc"],
    aliases: ["authoring tool", "저작 도구"],
  },
  {
    id: "uaag",
    term: { ko: "UAAG (사용자 에이전트 접근성 지침)", en: "UAAG (User Agent Accessibility Guidelines)" },
    definition: {
      ko: "브라우저·미디어 플레이어 등 사용자 에이전트의 접근성 책임을 다루는 W3C 지침. 사용자 제어(확대·색상 재정의), 키보드 조작, 접근성 API 지원을 요구하며, 2.0은 작업 그룹 노트로 발행되었습니다.",
      en: "W3C guidelines for user agents — browsers, media players. They address user controls (zoom, color overrides), keyboard operability, and accessibility API support; version 2.0 was published as a Working Group Note.",
    },
    certs: ["was", "cpacc"],
    aliases: ["user agent", "사용자 에이전트"],
  },
  {
    id: "act-rules",
    term: { ko: "ACT 규칙", en: "ACT Rules" },
    definition: {
      ko: "W3C의 접근성 적합성 테스트(Accessibility Conformance Testing) 규칙. 적용 대상·기대 결과·통과/실패 예제를 명시해 도구·감사자 간 판정 일관성을 높이며, axe-core 등 주요 도구가 이 형식에 자사 규칙을 매핑합니다.",
      en: "The W3C's Accessibility Conformance Testing rules. Each specifies applicability, expectations, and pass/fail examples to make verdicts consistent across tools and auditors; major tools like axe-core map their rules to this format.",
    },
    certs: ["was"],
    aliases: ["accessibility conformance testing"],
  },
  {
    id: "accessibility-supported",
    term: { ko: "접근성 지원", en: "Accessibility Supported" },
    definition: {
      ko: "WCAG 적합성의 전제 조건 — 콘텐츠가 사용하는 기술의 사용 방식이 사용자의 보조기술·브라우저에서 실제로 작동해야 한다는 요구. 명세에 있어도 지원되지 않는 방식에 의존하면 적합성 주장이 성립하지 않습니다.",
      en: "A precondition of WCAG conformance — the ways content uses technologies must actually work in users' assistive technologies and browsers. Relying on unsupported methods invalidates a conformance claim even if they exist in a spec.",
    },
    certs: ["was"],
  },
  {
    id: "marrakesh-treaty",
    term: { ko: "마라케시 조약", en: "Marrakesh Treaty" },
    definition: {
      ko: "시각 장애인 등 인쇄물 접근 장애인을 위해 저작권 예외를 규정한 WIPO 조약(2013). 접근 가능한 형식의 도서 제작·배포·국가 간 교환을 저작권자 허락 없이 허용해 '책 기근' 문제에 대응합니다.",
      en: "A WIPO treaty (2013) establishing copyright exceptions for blind and print-disabled people, allowing accessible-format books to be made, distributed, and exchanged across borders without rightsholder permission — addressing the 'book famine.'",
    },
    certs: ["cpacc"],
    aliases: ["book famine", "책 기근"],
  },
  {
    id: "invisible-disability",
    term: { ko: "비가시적 장애", en: "Invisible Disability" },
    definition: {
      ko: "심리·정신 장애, 만성 통증, 많은 인지 장애처럼 겉으로 드러나지 않는 장애. 낙인 우려로 공개를 꺼려 통계에 과소 반영되고 접근성 계획에서 간과되기 쉽습니다.",
      en: "Disabilities not outwardly apparent — psychological conditions, chronic pain, many cognitive disabilities. Stigma discourages disclosure, so they are undercounted in statistics and overlooked in accessibility planning.",
    },
    certs: ["cpacc"],
    aliases: ["hidden disability", "숨겨진 장애"],
  },

  // ── WAS 실무 축 확장 (배치 D-8 1차) ──────────────────────────────────────
  {
    id: "text-alternatives",
    term: { ko: "텍스트 대안", en: "Text Alternatives" },
    definition: {
      ko: "이미지·아이콘 등 텍스트 아닌 콘텐츠에 동등한 목적의 텍스트를 제공하라는 원칙(WCAG 1.1.1). alt 속성, aria-label, 인접 텍스트 등이 수단입니다.",
      en: "The principle (WCAG 1.1.1) that non-text content needs text serving the equivalent purpose — via alt attributes, aria-label, or adjacent text.",
    },
    certs: ["was"],
    aliases: ["1.1.1"],
  },
  {
    id: "audio-description",
    term: { ko: "음성 해설", en: "Audio Description" },
    definition: {
      ko: "영상의 시각 정보(장면·동작·자막 외 텍스트)를 말로 설명하는 대체 수단. 사전 녹화 영상에 대해 WCAG 1.2.5(AA)가 요구합니다.",
      en: "Narration describing a video's visual information (scenes, actions, on-screen text). Required for prerecorded video by WCAG 1.2.5 (AA).",
    },
    certs: ["was"],
    aliases: ["AD"],
  },
  {
    id: "info-and-relationships",
    term: { ko: "정보와 관계", en: "Info and Relationships" },
    definition: {
      ko: "시각적으로 표현된 구조·관계(헤딩, 목록, 표, 레이블)를 마크업으로도 프로그램이 인식할 수 있게 하라는 기준(WCAG 1.3.1). 가장 자주 위반되는 기준 중 하나입니다.",
      en: "Structure and relationships conveyed visually (headings, lists, tables, labels) must be programmatically determinable (WCAG 1.3.1) — one of the most commonly failed criteria.",
    },
    certs: ["was"],
    aliases: ["1.3.1"],
  },
  {
    id: "meaningful-sequence",
    term: { ko: "의미 있는 순서", en: "Meaningful Sequence" },
    definition: {
      ko: "콘텐츠의 읽기 순서가 의미에 영향을 줄 때, DOM 순서가 그 의미를 보존해야 한다는 기준(WCAG 1.3.2). CSS로 시각 순서만 바꾸면 스크린 리더 순서와 어긋날 수 있습니다.",
      en: "When reading order affects meaning, the DOM order must preserve it (WCAG 1.3.2). Reordering visually with CSS can desynchronize screen reader order.",
    },
    certs: ["was"],
    aliases: ["1.3.2"],
  },
  {
    id: "use-of-color",
    term: { ko: "색상 사용", en: "Use of Color" },
    definition: {
      ko: "색을 정보 전달의 유일한 수단으로 쓰지 말라는 기준(WCAG 1.4.1). 오류 표시·링크 구분·차트 계열에 패턴·텍스트·아이콘을 병기해야 합니다.",
      en: "Color must not be the only visual means of conveying information (WCAG 1.4.1) — pair it with patterns, text, or icons for errors, links, and chart series.",
    },
    certs: ["was"],
    aliases: ["1.4.1"],
  },
  {
    id: "text-spacing",
    term: { ko: "텍스트 간격", en: "Text Spacing" },
    definition: {
      ko: "사용자가 줄·문단·자간·어간 간격을 지정값까지 늘려도 콘텐츠와 기능이 손실되지 않아야 한다는 기준(WCAG 1.4.12). 고정 높이 컨테이너에서 잘림이 흔한 실패입니다.",
      en: "Content must survive user-increased line, paragraph, letter, and word spacing (WCAG 1.4.12). Clipping in fixed-height containers is the common failure.",
    },
    certs: ["was"],
    aliases: ["1.4.12"],
  },
  {
    id: "pointer-gestures",
    term: { ko: "포인터 제스처", en: "Pointer Gestures" },
    definition: {
      ko: "멀티포인트·경로 기반 제스처(핀치 줌, 스와이프)에는 단일 포인터 대안을 제공하라는 기준(WCAG 2.5.1). 운동 장애·보조기기 사용자를 위한 요구입니다.",
      en: "Multipoint or path-based gestures (pinch, swipe) need single-pointer alternatives (WCAG 2.5.1) — for users with motor disabilities and assistive devices.",
    },
    certs: ["was"],
    aliases: ["2.5.1"],
  },
  {
    id: "label-in-name",
    term: { ko: "이름의 레이블", en: "Label in Name" },
    definition: {
      ko: "보이는 레이블 텍스트가 접근 가능한 이름에 포함되어야 한다는 기준(WCAG 2.5.3). 음성 제어 사용자가 보이는 텍스트를 말해 조작하기 때문입니다.",
      en: "The visible label text must be contained in the accessible name (WCAG 2.5.3), because voice control users speak what they see.",
    },
    certs: ["was"],
    aliases: ["2.5.3"],
  },
  {
    id: "dragging-movements",
    term: { ko: "드래그 동작", en: "Dragging Movements" },
    definition: {
      ko: "드래그로 수행하는 기능에 단일 포인터(클릭 등) 대안을 요구하는 기준(WCAG 2.5.7, 2.2 신설). 정렬·슬라이더에 버튼 대안을 제공합니다.",
      en: "Functions performed by dragging need a single-pointer alternative (WCAG 2.5.7, new in 2.2) — e.g., buttons alongside sortable lists and sliders.",
    },
    certs: ["was"],
    aliases: ["2.5.7"],
  },
  {
    id: "focus-not-obscured",
    term: { ko: "포커스 가림 방지", en: "Focus Not Obscured" },
    definition: {
      ko: "포커스를 받은 요소가 고정 헤더·배너 등에 완전히 가려지지 않아야 한다는 기준(WCAG 2.4.11, 2.2 신설).",
      en: "A focused element must not be entirely hidden by sticky headers or banners (WCAG 2.4.11, new in 2.2).",
    },
    certs: ["was"],
    aliases: ["2.4.11"],
  },
  {
    id: "consistent-navigation",
    term: { ko: "일관된 내비게이션", en: "Consistent Navigation" },
    definition: {
      ko: "여러 페이지에서 반복되는 내비게이션은 같은 상대 순서로 나타나야 한다는 기준(WCAG 3.2.3). 인지 장애 사용자의 예측 가능성을 지킵니다.",
      en: "Repeated navigation must appear in the same relative order across pages (WCAG 3.2.3), preserving predictability for users with cognitive disabilities.",
    },
    certs: ["was"],
    aliases: ["3.2.3"],
  },
  {
    id: "error-suggestion",
    term: { ko: "오류 수정 제안", en: "Error Suggestion" },
    definition: {
      ko: "입력 오류가 감지되고 수정 방법을 알 수 있다면 사용자에게 제안하라는 기준(WCAG 3.3.3). '잘못된 형식'보다 '예: name@example.com'이 낫습니다.",
      en: "When an input error is detected and a fix is known, suggest it (WCAG 3.3.3) — 'e.g., name@example.com' beats 'invalid format'.",
    },
    certs: ["was"],
    aliases: ["3.3.3"],
  },
  {
    id: "accessible-authentication",
    term: { ko: "접근 가능한 인증", en: "Accessible Authentication" },
    definition: {
      ko: "로그인에 인지 기능 테스트(암기·퍼즐 등)를 강요하지 말라는 기준(WCAG 3.3.8, 2.2 신설). 붙여넣기 허용·패스워드 매니저 지원이 대표 대응입니다.",
      en: "Logins must not require a cognitive function test (WCAG 3.3.8, new in 2.2) — allow paste and password managers.",
    },
    certs: ["was"],
    aliases: ["3.3.8"],
  },
  {
    id: "status-messages",
    term: { ko: "상태 메시지", en: "Status Messages" },
    definition: {
      ko: "포커스 이동 없이 나타나는 상태 변화(저장됨, 검색 결과 5건)를 보조기술이 인지하게 하라는 기준(WCAG 4.1.3). role=status/alert, aria-live가 수단입니다.",
      en: "Status changes appearing without focus (saved, 5 results) must reach AT (WCAG 4.1.3) — via role=status/alert and aria-live.",
    },
    certs: ["was"],
    aliases: ["4.1.3"],
  },
  {
    id: "parsing-note",
    term: { ko: "구문 분석 (폐지)", en: "Parsing (obsolete)" },
    definition: {
      ko: "중복 id·잘못된 중첩을 금지하던 WCAG 4.1.1은 2.2에서 폐지되었습니다 — 최신 브라우저가 오류를 일관되게 복구하기 때문입니다.",
      en: "WCAG 4.1.1 (Parsing) was removed in 2.2 — modern browsers recover from markup errors consistently.",
    },
    certs: ["was"],
    aliases: ["4.1.1"],
  },
  {
    id: "aria-label-term",
    term: { ko: "aria-label", en: "aria-label" },
    definition: {
      ko: "요소에 접근 가능한 이름을 문자열로 직접 부여하는 속성. 보이는 텍스트가 없는 컨트롤(아이콘 버튼)에 쓰되, 보이는 레이블이 있으면 그 텍스트를 포함해야 합니다(2.5.3).",
      en: "Supplies an accessible name directly as a string. Use for controls without visible text (icon buttons); when a visible label exists it must be contained in the name (2.5.3).",
    },
    certs: ["was"],
  },
  {
    id: "aria-labelledby",
    term: { ko: "aria-labelledby", en: "aria-labelledby" },
    definition: {
      ko: "다른 요소(들)의 텍스트를 참조해 접근 가능한 이름을 만드는 속성. 이름 계산에서 aria-label보다 우선하며, 여러 id를 나열할 수 있습니다.",
      en: "Builds the accessible name from other elements' text. Wins over aria-label in name computation; accepts multiple ids.",
    },
    certs: ["was"],
  },
  {
    id: "aria-describedby",
    term: { ko: "aria-describedby", en: "aria-describedby" },
    definition: {
      ko: "이름이 아닌 '보조 설명'을 요소에 연결하는 속성. 폼 도움말·오류 메시지 연결의 표준 수단입니다.",
      en: "Attaches supplementary description (not the name) to an element — the standard wiring for form hints and error messages.",
    },
    certs: ["was"],
  },
  {
    id: "aria-expanded",
    term: { ko: "aria-expanded", en: "aria-expanded" },
    definition: {
      ko: "펼침 컨트롤(아코디언·드롭다운)의 열림/닫힘 상태를 보조기술에 알리는 상태 속성. 컨트롤 쪽에 붙이며 JS로 갱신해야 합니다.",
      en: "State attribute announcing open/closed for disclosure controls (accordions, dropdowns). Set on the control and updated via JS.",
    },
    certs: ["was"],
  },
  {
    id: "aria-hidden",
    term: { ko: "aria-hidden", en: "aria-hidden" },
    definition: {
      ko: "서브트리를 접근성 트리에서 제거하는 속성(시각적으로는 보임). 장식 아이콘에 적합하지만, 포커스 가능한 요소를 포함하면 심각한 결함이 됩니다.",
      en: "Removes a subtree from the accessibility tree while it stays visible. Right for decorative icons; a serious defect if the subtree contains focusable elements.",
    },
    certs: ["was"],
  },
  {
    id: "roving-tabindex",
    term: { ko: "로빙 탭인덱스", en: "Roving tabindex" },
    definition: {
      ko: "복합 위젯(탭·툴바·그리드)에서 활성 항목만 tabindex=0, 나머지는 -1로 두고 화살표 키로 이동시키는 키보드 패턴. Tab 한 번으로 위젯 전체를 건너뛸 수 있게 합니다.",
      en: "Keyboard pattern for composite widgets: only the active item has tabindex=0 (others -1), arrows move within — so a single Tab skips past the widget.",
    },
    certs: ["was"],
  },
  {
    id: "landmark-roles",
    term: { ko: "랜드마크 역할", en: "Landmark Roles" },
    definition: {
      ko: "페이지 영역을 구분하는 ARIA 역할군 — banner(머리글), navigation, main, complementary, contentinfo(바닥글), search. 스크린 리더의 영역 점프 탐색을 가능하게 합니다.",
      en: "ARIA roles that segment a page — banner, navigation, main, complementary, contentinfo, search — enabling region-jump navigation in screen readers.",
    },
    certs: ["was"],
    aliases: ["banner", "contentinfo"],
  },
  {
    id: "presentation-role",
    term: { ko: "presentation/none 역할", en: "role=presentation/none" },
    definition: {
      ko: "요소의 암묵적 시맨틱을 제거하는 역할. 레이아웃 목적의 표 등에 쓰이며, 실제 데이터 표에 쓰면 구조 정보가 사라지는 오용이 됩니다.",
      en: "Strips an element's implicit semantics. Used for layout tables; misused on real data tables it erases structural information.",
    },
    certs: ["was"],
  },
  {
    id: "lighthouse",
    term: { ko: "Lighthouse", en: "Lighthouse" },
    definition: {
      ko: "Chrome 내장 감사 도구. 접근성 점수는 axe 규칙 일부를 실행한 결과로, 100점이 접근성 적합을 의미하지 않습니다 — 자동 검사의 한계가 그대로 적용됩니다.",
      en: "Chrome's built-in audit tool. Its accessibility score runs a subset of axe rules — 100 does not mean conformant; automation limits apply.",
    },
    certs: ["was"],
  },
  {
    id: "pa11y",
    term: { ko: "Pa11y", en: "Pa11y" },
    definition: {
      ko: "명령줄·CI에서 실행하는 오픈소스 접근성 자동 검사 도구. HTML_CodeSniffer/axe 엔진을 사용해 페이지를 스캔합니다.",
      en: "An open-source CLI/CI accessibility testing tool that scans pages using the HTML_CodeSniffer or axe engines.",
    },
    certs: ["was"],
  },
  {
    id: "color-contrast-analyzer",
    term: { ko: "색상 대비 분석기 (CCA)", en: "Colour Contrast Analyser (CCA)" },
    definition: {
      ko: "TPGi의 데스크톱 대비 측정 도구. 화면의 임의 색을 스포이드로 찍어 WCAG 대비율을 확인할 수 있어 이미지·그라데이션 검사에 유용합니다.",
      en: "TPGi's desktop contrast tool. Its eyedropper samples any on-screen color for WCAG ratios — handy for images and gradients.",
    },
    certs: ["was"],
    aliases: ["cca"],
  },
  {
    id: "screen-reader-testing",
    term: { ko: "스크린 리더 테스트", en: "Screen Reader Testing" },
    definition: {
      ko: "대표 조합(NVDA+Chrome/Firefox, JAWS+Chrome, VoiceOver+Safari, TalkBack+Chrome)으로 실제 낭독·조작을 검증하는 수동 테스트. 자동 도구가 못 잡는 이름 적절성·순서 문제를 찾습니다.",
      en: "Manual testing with representative pairings (NVDA+Chrome/Firefox, JAWS+Chrome, VoiceOver+Safari, TalkBack+Chrome) to verify real announcements and operation.",
    },
    certs: ["was"],
  },
  {
    id: "keyboard-testing",
    term: { ko: "키보드 테스트", en: "Keyboard Testing" },
    definition: {
      ko: "마우스를 치우고 Tab/Shift+Tab/화살표/Enter/Space/Esc만으로 전 기능을 검증하는 수동 프로토콜. 도달·조작·탈출·가시적 포커스 4가지를 확인합니다.",
      en: "The manual protocol of operating everything with Tab/Shift+Tab/arrows/Enter/Space/Esc only — checking reach, operate, escape, and visible focus.",
    },
    certs: ["was"],
  },
  {
    id: "accessibility-audit",
    term: { ko: "접근성 감사", en: "Accessibility Audit" },
    definition: {
      ko: "표본 페이지에 대해 자동·수동·AT 테스트를 조합해 성공 기준별 적합성을 판정하고 결함을 보고하는 공식 평가. WCAG-EM이 대표 방법론입니다.",
      en: "A formal evaluation combining automated, manual, and AT testing on sampled pages, judging each success criterion — WCAG-EM is the reference methodology.",
    },
    certs: ["was"],
  },
  {
    id: "conformance-claim",
    term: { ko: "적합성 주장", en: "Conformance Claim" },
    definition: {
      ko: "특정 페이지들이 특정 WCAG 버전·수준을 충족한다는 공식 선언. 날짜·버전·수준·적용 페이지·의존 기술을 명시해야 하며, 선택 사항입니다.",
      en: "An optional formal declaration that specific pages meet a given WCAG version and level — stating date, version, level, pages, and relied-upon technologies.",
    },
    certs: ["was"],
  },
  {
    id: "severity-rating",
    term: { ko: "심각도 평가", en: "Severity Rating" },
    definition: {
      ko: "발견 결함을 사용자 영향(차단/심각/보통/경미)과 과업 중요도로 등급화해 수정 우선순위를 정하는 실무 체계. 핵심 과업을 차단하는 결함이 최우선입니다.",
      en: "Grading defects by user impact (blocker/critical/moderate/minor) and task criticality to order fixes — blockers on core tasks come first.",
    },
    certs: ["was"],
  },
  {
    id: "accessibility-overlay",
    term: { ko: "접근성 오버레이", en: "Accessibility Overlay" },
    definition: {
      ko: "스크립트 한 줄로 접근성을 '자동 수정'한다고 주장하는 서드파티 위젯. 근본 결함을 고치지 못하고 사용자 보조기술과 충돌하는 경우가 많아 접근성 커뮤니티가 광범위하게 비판합니다.",
      en: "Third-party widgets claiming to 'auto-fix' accessibility via one script. Widely criticized: they don't fix root defects and often conflict with users' AT.",
    },
    certs: ["was"],
    aliases: ["overlay"],
  },
  {
    id: "skip-link",
    term: { ko: "건너뛰기 링크", en: "Skip Link" },
    definition: {
      ko: "반복 블록(헤더·내비)을 건너뛰고 본문으로 바로 가는 페이지 첫 링크(WCAG 2.4.1 Bypass Blocks의 대표 기법). 포커스 시에만 보여도 됩니다.",
      en: "The first link that jumps past repeated blocks to main content (the classic technique for WCAG 2.4.1). It may be visible only on focus.",
    },
    certs: ["was"],
  },
  {
    id: "visible-focus-indicator",
    term: { ko: "가시적 포커스 표시", en: "Visible Focus Indicator" },
    definition: {
      ko: "키보드 포커스 위치를 시각적으로 드러내는 외곽선·강조(WCAG 2.4.7). outline:none으로 제거만 하는 것이 대표적 실패이며, :focus-visible로 입력 방식별 표시가 가능합니다.",
      en: "The outline or highlight revealing keyboard focus (WCAG 2.4.7). Removing it with outline:none is the classic failure; :focus-visible allows input-aware styling.",
    },
    certs: ["was"],
  },
  {
    id: "touch-target",
    term: { ko: "터치 타깃", en: "Touch Target" },
    definition: {
      ko: "포인터로 조작하는 영역의 크기. WCAG 2.5.8(2.2, AA)은 최소 24×24 CSS픽셀(또는 동등 간격)을, 모바일 지침들은 44px 안팎을 권장합니다.",
      en: "The interactive area for pointer input. WCAG 2.5.8 (2.2, AA) requires at least 24×24 CSS px or equivalent spacing; mobile guidelines suggest ~44px.",
    },
    certs: ["was"],
    aliases: ["target size"],
  },
  {
    id: "prefers-reduced-motion",
    term: { ko: "prefers-reduced-motion", en: "prefers-reduced-motion" },
    definition: {
      ko: "OS의 '동작 줄이기' 설정을 감지하는 CSS 미디어 특성. 전정 장애 사용자를 위해 패럴랙스·대형 전환 애니메이션을 끄거나 대체하는 표준 수단입니다.",
      en: "The CSS media feature detecting the OS reduce-motion setting — the standard way to disable or replace parallax and large transitions for users with vestibular disorders.",
    },
    certs: ["was"],
  },
  {
    id: "focus-trap",
    term: { ko: "포커스 트랩 (의도적)", en: "Focus Trap (intentional)" },
    definition: {
      ko: "모달이 열린 동안 Tab 순환을 모달 내부로 한정하는 의도적 기법. 닫기 수단(ESC·버튼)을 반드시 제공해야 하며, 탈출 불가능하면 키보드 트랩(2.1.2 위반)이 됩니다.",
      en: "Deliberately confining Tab cycling inside an open modal. An escape (ESC, close button) is mandatory — without it, it becomes a keyboard trap (2.1.2 failure).",
    },
    certs: ["was"],
  },
  {
    id: "live-region",
    term: { ko: "라이브 영역", en: "Live Region" },
    definition: {
      ko: "DOM 변경을 보조기술에 자동 통지하는 영역. aria-live=polite(현재 낭독 후), assertive(즉시), role=status/alert 별칭이 있으며, 남용하면 소음이 됩니다.",
      en: "A region whose DOM changes are announced automatically: aria-live=polite (after current speech) or assertive (immediately), with role=status/alert shortcuts. Overuse creates noise.",
    },
    certs: ["was"],
  },
  {
    id: "high-contrast-mode",
    term: { ko: "고대비 모드", en: "High Contrast Mode" },
    definition: {
      ko: "OS·브라우저가 색상을 강제 팔레트로 바꾸는 모드(Windows 대비 테마 등). forced-colors 미디어 특성으로 감지하며, 배경 이미지로만 전달되는 정보가 사라질 수 있습니다.",
      en: "OS/browser modes that override colors with a forced palette (e.g., Windows contrast themes). Detect via the forced-colors media feature; information carried only by background images can vanish.",
    },
    certs: ["was"],
    aliases: ["forced colors"],
  },
  {
    id: "captions-vs-subtitles",
    term: { ko: "폐쇄자막과 개방자막", en: "Closed vs Open Captions" },
    definition: {
      ko: "폐쇄자막(CC)은 켜고 끌 수 있는 자막, 개방자막은 영상에 새겨진 자막입니다. 접근성 자막은 대사 외에 화자 구분·효과음도 담아야 합니다.",
      en: "Closed captions can be toggled; open captions are burned into the video. Accessible captions include speaker identification and sound effects, not just dialogue.",
    },
    certs: ["was"],
    aliases: ["cc"],
  },
  {
    id: "form-autocomplete",
    term: { ko: "autocomplete 속성", en: "autocomplete attribute" },
    definition: {
      ko: "입력 필드의 목적(name, email, tel 등)을 기계가 인식할 값으로 선언하는 속성. WCAG 1.3.5가 요구하며, 자동 채움으로 인지·운동 부담을 줄입니다.",
      en: "Declares an input's purpose (name, email, tel…) machine-readably. Required by WCAG 1.3.5; autofill reduces cognitive and motor load.",
    },
    certs: ["was"],
    aliases: ["1.3.5"],
  },
];
