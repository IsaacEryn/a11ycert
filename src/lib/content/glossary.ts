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
];
