export interface GlossaryTerm {
  id: string;
  term: { ko: string; en: string };
  definition: { ko: string; en: string };
  certs: ("cpacc" | "was")[];
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
  },
  {
    id: "aria",
    term: { ko: "WAI-ARIA", en: "WAI-ARIA (Accessible Rich Internet Applications)" },
    definition: {
      ko: "W3C가 정의한 역할(role), 속성(property), 상태(state) 명세. HTML만으로 표현하기 어려운 복잡한 UI 컴포넌트의 접근성을 보강합니다.",
      en: "W3C specification defining roles, properties, and states that supplement HTML to improve accessibility of complex UI components.",
    },
    certs: ["was"],
  },
  {
    id: "assistive-technology",
    term: { ko: "보조 기술", en: "Assistive Technology (AT)" },
    definition: {
      ko: "장애인이 기기·소프트웨어를 사용하도록 돕는 하드웨어 또는 소프트웨어. 스크린 리더, 음성 인식, 점자 단말기 등이 포함됩니다.",
      en: "Hardware or software that helps people with disabilities use devices and software, including screen readers, voice recognition, and braille displays.",
    },
    certs: ["cpacc", "was"],
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
];
