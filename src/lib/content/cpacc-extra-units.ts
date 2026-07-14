import type { StudyUnit } from "./types";

/**
 * CPACC 신규 단원 확장 지점 — 기존 cpacc-units.ts(1200줄+) 비대화 방지.
 * content/index.ts의 withExtraUnits가 도메인별로 병합 후 order 정렬.
 */
export const cpaccExtraUnits: StudyUnit[] = [
	// ── Domain 1 신규 ─────────────────────────────────────────────────────────
	{
		id: "cpacc-1-6",
		exam: "cpacc",
		domain: 1,
		order: 6,
		available: true,
		title: { ko: "장애 인구통계와 고령화", en: "Disability Demographics and Aging" },
		summary: {
			ko: "전 세계 장애 인구의 규모와 특성, 고령화가 접근성에 갖는 의미, 통계 해석 시 주의점을 학습합니다.",
			en: "Learn the scale and characteristics of the global disability population, what aging means for accessibility, and cautions in interpreting statistics.",
		},
		objectives: {
			ko: [
				"전 세계·주요 국가의 장애 인구 규모를 대략적으로 제시할 수 있다",
				"고령화와 장애 유병률의 관계를 설명할 수 있다",
				"영구적·일시적·상황적 제약의 스펙트럼을 설명할 수 있다",
				"장애 통계가 과소집계되는 이유를 설명할 수 있다",
			],
			en: [
				"State the approximate scale of the disability population globally and in major countries",
				"Explain the relationship between aging and disability prevalence",
				"Describe the spectrum of permanent, temporary, and situational limitations",
				"Explain why disability statistics tend to be undercounted",
			],
		},
		content: { ko: [], en: [] },
		sections: [
			{
				heading: { ko: "장애 인구의 규모", en: "The Scale of the Disability Population" },
				paragraphs: {
					ko: [
						"WHO의 세계 장애 보고서에 따르면 전 세계 인구의 약 16%, 즉 13억 명 이상이 심각한 장애를 경험합니다. 이는 '세계에서 가장 큰 소수자 집단'이라 불릴 만한 규모이며, 어떤 제품·서비스도 무시할 수 없는 사용자층입니다.",
						"주요 국가 통계: 미국 CDC는 성인의 약 4분의 1(27%)이 어떤 형태의 장애를 갖고 있다고 보고합니다. 한국의 등록장애인은 약 260만 명(인구의 약 5%)이지만, 등록 기준이 엄격해 실제 기능 제한 인구는 훨씬 많습니다. 국가 간 수치 차이는 장애의 정의와 조사 방법의 차이에서 비롯됩니다.",
						"장애는 특정 집단만의 문제가 아니라 인간 경험의 보편적 부분입니다. 대부분의 사람은 살면서 일시적으로든 영구적으로든 장애를 경험하며, 특히 수명이 길어질수록 그 확률은 높아집니다.",
					],
					en: [
						"According to the WHO's world disability reporting, about 16% of the global population — more than 1.3 billion people — experience significant disability. This is often called 'the world's largest minority,' a user base no product or service can ignore.",
						"National figures: the US CDC reports that roughly one in four adults (27%) has some form of disability. Korea has about 2.6 million registered disabled people (about 5% of the population), but strict registration criteria mean the actual population with functional limitations is far larger. Cross-country differences stem from differing definitions and survey methods.",
						"Disability is not a niche concern but a universal part of human experience. Most people will experience disability, temporarily or permanently, at some point — and the longer we live, the higher the probability.",
					],
				},
			},
			{
				heading: { ko: "고령화와 접근성", en: "Aging and Accessibility" },
				paragraphs: {
					ko: [
						"장애 유병률은 연령과 함께 급격히 상승합니다. 시력(황반변성, 백내장), 청력(노인성 난청), 운동 능력(관절염, 근력 저하), 인지(기억력 저하, 치매)의 자연스러운 노화가 모두 접근성 요구로 이어집니다. 60세 이상에서는 절반 가까이가 어떤 형태의 기능 제한을 경험합니다.",
						"전 세계가 빠르게 고령화되고 있습니다. UN 추산으로 2050년까지 60세 이상 인구가 21억 명에 이르고, 한국은 세계에서 가장 빠른 속도로 초고령사회(65세 이상 20%+)에 진입했습니다. 접근성은 '장애인 대상 기능'이 아니라 고령 고객 전체를 위한 기본 품질이 됩니다.",
						"고령 사용자는 자신을 '장애인'으로 정체화하지 않는 경우가 많아, 보조기술보다 큰 글꼴·고대비·확대 같은 내장 설정과 잘 설계된 기본 UI에 의존합니다. 이 점이 보편적 설계가 고령화 시대에 특히 중요한 이유입니다.",
					],
					en: [
						"Disability prevalence rises sharply with age. Natural aging of vision (macular degeneration, cataracts), hearing (presbycusis), motor ability (arthritis, reduced strength), and cognition (memory decline, dementia) all translate into accessibility needs. Nearly half of people over 60 experience some functional limitation.",
						"The world is aging fast. The UN projects 2.1 billion people aged 60+ by 2050, and Korea has entered super-aged status (20%+ aged 65+) faster than any other country. Accessibility becomes not a 'disability feature' but baseline quality for the entire older customer base.",
						"Older users often do not identify as 'disabled,' so they rely less on assistive technology and more on built-in settings — larger fonts, high contrast, zoom — and well-designed default UI. This is why Universal Design matters especially in an aging era.",
					],
				},
			},
			{
				heading: { ko: "영구적·일시적·상황적 제약", en: "Permanent, Temporary, and Situational Limitations" },
				paragraphs: {
					ko: [
						"장애는 이분법이 아니라 스펙트럼입니다. Microsoft 포용적 설계 툴킷의 유명한 프레임: 한 팔이 없는 사람(영구적), 팔이 골절된 사람(일시적), 아기를 안은 사람(상황적)은 모두 '한 손 사용'이라는 같은 제약을 공유합니다. 시끄러운 술집의 자막 시청자는 농인과, 눈부신 햇빛 아래의 화면 사용자는 저시력 사용자와 같은 조건에 놓입니다.",
						"이 관점은 접근성의 수혜자를 극적으로 확장합니다. 영구적 장애 인구가 16%라면, 일시적·상황적 제약까지 포함한 수혜자는 사실상 전체 사용자입니다. 통계를 인용할 때 이 세 층위를 함께 제시하는 것이 비즈니스 설득에 효과적입니다.",
					],
					en: [
						"Disability is a spectrum, not a binary. The famous framing from Microsoft's Inclusive Design toolkit: a person with one arm (permanent), a person with a broken arm (temporary), and a parent holding a baby (situational) all share the same 'one-handed' constraint. Someone watching captions in a loud bar shares conditions with Deaf viewers; someone using a screen in glaring sunlight shares them with low-vision users.",
						"This perspective dramatically expands who benefits from accessibility. If 16% have permanent disabilities, adding temporary and situational limitations makes the beneficiary effectively every user. Presenting all three layers together makes statistics far more persuasive in business contexts.",
					],
				},
			},
			{
				heading: { ko: "통계 해석의 주의점", en: "Cautions in Interpreting Statistics" },
				paragraphs: {
					ko: [
						"장애 통계는 대체로 과소집계됩니다. 이유: 낙인에 대한 우려로 자기보고를 꺼리는 경향, 국가·조사마다 다른 장애 정의, 등록·진단 기반 집계의 한계(미진단 인구 누락), 시설 거주자·노숙인 등 조사 사각지대. 인지 장애와 정신 건강 상태는 특히 드러나지 않습니다.",
						"실무 시사점: '우리 사용자 중 장애인은 거의 없다'는 주장은 대개 측정의 부재를 반영할 뿐입니다. 분석 도구는 보조기술 사용을 거의 감지하지 못하고(감지 시도 자체가 프라이버시 문제), 접근 불가능한 서비스는 애초에 장애인 사용자가 유입되지 못하게 만듭니다 — 통계 부재가 수요 부재를 의미하지 않습니다.",
					],
					en: [
						"Disability statistics are generally undercounted. Reasons: reluctance to self-report due to stigma; definitions that vary across countries and surveys; limits of registration- or diagnosis-based counting (missing the undiagnosed); and blind spots such as institutionalized or homeless populations. Cognitive disabilities and mental health conditions are especially invisible.",
						"The practical implication: 'we barely have any disabled users' usually reflects an absence of measurement. Analytics tools rarely detect assistive technology use (and attempting to is itself a privacy problem), and an inaccessible service prevents disabled users from arriving in the first place — absence of statistics is not absence of demand.",
					],
				},
			},
		],
		questions: [
			{
				id: "cpacc-1-6-q1",
				question: {
					ko: "WHO 추산 전 세계에서 심각한 장애를 경험하는 인구 비율은?",
					en: "According to WHO estimates, what share of the global population experiences significant disability?",
				},
				options: {
					a: { ko: "약 3%", en: "About 3%" },
					b: { ko: "약 16%", en: "About 16%" },
					c: { ko: "약 40%", en: "About 40%" },
					d: { ko: "약 60%", en: "About 60%" },
				},
				answer: "b",
				explanation: {
					ko: "WHO는 전 세계 인구의 약 16%(13억 명 이상)가 심각한 장애를 경험한다고 추산합니다. '세계에서 가장 큰 소수자 집단'이라 불리는 규모입니다.",
					en: "The WHO estimates about 16% of the global population — over 1.3 billion people — experience significant disability, often called 'the world's largest minority.'",
				},
			},
			{
				id: "cpacc-1-6-q2",
				question: {
					ko: "'한 팔이 없는 사람 / 팔이 골절된 사람 / 아기를 안은 사람' 프레임이 보여주는 것은?",
					en: "What does the 'one arm / broken arm / holding a baby' framing illustrate?",
				},
				options: {
					a: { ko: "장애의 의료적 분류 체계", en: "A medical classification of disability" },
					b: { ko: "영구적·일시적·상황적 제약의 스펙트럼", en: "The spectrum of permanent, temporary, and situational limitations" },
					c: { ko: "보조기술의 세 가지 유형", en: "Three types of assistive technology" },
					d: { ko: "장애 등록 절차", en: "The disability registration process" },
				},
				answer: "b",
				explanation: {
					ko: "Microsoft 포용적 설계 툴킷의 프레임으로, 세 사람 모두 '한 손 사용'이라는 같은 제약을 공유합니다. 접근성의 수혜자가 영구적 장애인을 넘어 사실상 모든 사용자로 확장됨을 보여줍니다.",
					en: "From Microsoft's Inclusive Design toolkit: all three share the same one-handed constraint, showing that accessibility's beneficiaries extend beyond permanent disability to effectively all users.",
				},
			},
			{
				id: "cpacc-1-6-q3",
				question: {
					ko: "고령 사용자의 접근성 특성으로 가장 적절한 것은?",
					en: "Which best describes the accessibility characteristics of older users?",
				},
				options: {
					a: { ko: "대부분 전문 보조기술(화면낭독기)을 능숙하게 사용한다", en: "Most are proficient with specialized AT like screen readers" },
					b: { ko: "자신을 장애인으로 정체화하지 않는 경우가 많아 내장 설정과 잘 설계된 기본 UI에 의존한다", en: "They often do not identify as disabled and rely on built-in settings and well-designed default UI" },
					c: { ko: "시각에만 기능 저하가 나타난다", en: "Only vision declines with age" },
					d: { ko: "접근성 요구가 없다", en: "They have no accessibility needs" },
				},
				answer: "b",
				explanation: {
					ko: "고령 사용자는 시각·청각·운동·인지에 걸친 복합적 저하를 겪지만 스스로를 장애인으로 여기지 않는 경우가 많아, 큰 글꼴·고대비·확대 같은 내장 설정과 기본 UI 품질에 의존합니다.",
					en: "Older users experience combined declines across vision, hearing, motor, and cognition, but often don't identify as disabled — relying on built-in settings (larger fonts, contrast, zoom) and default UI quality.",
				},
			},
			{
				id: "cpacc-1-6-q4",
				question: {
					ko: "장애 통계가 과소집계되는 이유가 아닌 것은?",
					en: "Which is NOT a reason disability statistics are undercounted?",
				},
				options: {
					a: { ko: "낙인 우려로 인한 자기보고 기피", en: "Reluctance to self-report due to stigma" },
					b: { ko: "국가·조사별로 다른 장애 정의", en: "Differing definitions across countries and surveys" },
					c: { ko: "미진단 인구의 누락", en: "Omission of undiagnosed populations" },
					d: { ko: "장애인의 인터넷 사용률이 100%이기 때문", en: "Because internet use among disabled people is 100%" },
				},
				answer: "d",
				explanation: {
					ko: "과소집계의 원인은 자기보고 기피, 정의 차이, 등록·진단 기반 집계의 한계, 조사 사각지대 등입니다. 인터넷 사용률과 통계 과소집계는 무관하며, 오히려 접근 불가능한 서비스가 장애인 유입 자체를 막아 통계 부재를 만듭니다.",
					en: "Undercounting stems from self-report reluctance, definitional differences, registration/diagnosis-based limits, and survey blind spots. Internet usage rates are unrelated — if anything, inaccessible services block disabled users from arriving, creating the absence of statistics.",
				},
			},
		],
	},

	{
		id: "cpacc-1-7",
		exam: "cpacc",
		domain: 1,
		order: 7,
		available: true,
		title: { ko: "보조기술과 적응 전략 총람", en: "Assistive Technologies and Adaptive Strategies" },
		summary: {
			ko: "장애 유형별 보조기술을 한눈에 정리하고, 기술이 아닌 적응 전략, 그리고 AT 도입의 원칙을 학습합니다.",
			en: "A consolidated map of assistive technologies by disability type, non-technology adaptive strategies, and principles of AT adoption.",
		},
		objectives: {
			ko: [
				"입력·출력 관점에서 보조기술을 분류할 수 있다",
				"장애 유형별 대표 보조기술을 짝지을 수 있다",
				"기술이 아닌 적응 전략의 예를 들 수 있다",
				"보조기술 도입·포기의 주요 요인을 설명할 수 있다",
			],
			en: [
				"Classify assistive technologies by input and output",
				"Match representative AT to each disability type",
				"Give examples of non-technology adaptive strategies",
				"Explain key factors in AT adoption and abandonment",
			],
		},
		content: { ko: [], en: [] },
		sections: [
			{
				heading: { ko: "입력과 출력으로 보는 보조기술", en: "AT Through the Lens of Input and Output" },
				paragraphs: {
					ko: [
						"보조기술(AT)은 장애인이 과업을 수행할 수 있게 돕는 하드웨어·소프트웨어의 총칭입니다. 디지털 AT는 크게 출력(컴퓨터→사람)과 입력(사람→컴퓨터)으로 분류하면 체계가 잡힙니다.",
						"출력 보조기술: 화면낭독기(음성 출력), 갱신형 점자 단말기(촉각 출력), 화면확대기(시각 출력 변형), 자막·경고등(청각 정보의 시각 변환). 입력 보조기술: 대체 키보드, 스위치와 스캐닝, 음성 인식, 시선·머리 추적, 온스크린 키보드, 시프&퍼프.",
						"많은 AT는 표준 인터페이스 위에서 동작합니다 — 화면낭독기는 접근성 API와 시맨틱 마크업을, 스위치는 키보드 인터페이스를 사용합니다. AT가 잘 작동하려면 콘텐츠와 플랫폼이 표준을 지켜야 한다는 것이 CPACC의 반복 주제입니다.",
					],
					en: [
						"Assistive technology (AT) is the umbrella term for hardware and software that helps disabled people perform tasks. Digital AT is best organized by output (computer→person) and input (person→computer).",
						"Output AT: screen readers (speech), refreshable braille displays (tactile), screen magnifiers (transformed visual), captions and alert lights (audio made visual). Input AT: alternative keyboards, switches with scanning, speech recognition, eye and head tracking, on-screen keyboards, sip-and-puff.",
						"Much AT operates on top of standard interfaces — screen readers rely on accessibility APIs and semantic markup; switches use the keyboard interface. A recurring CPACC theme: AT works only as well as the standards-compliance of the content and platform beneath it.",
					],
				},
			},
			{
				heading: { ko: "장애 유형별 대표 보조기술", en: "Representative AT by Disability Type" },
				paragraphs: {
					ko: [
						"시각: 화면낭독기(JAWS, NVDA, VoiceOver, TalkBack), 화면확대기(ZoomText), 점자 단말기, OCR·문서 낭독기. 청각: 보청기, 인공와우, 보조청취장치(히어링 루프·FM), 자막·수어 통역, 진동·시각 알림. 언어: AAC 기기, 음성생성장치(SGD), 그림 기호판.",
						"운동·신체: 스위치와 스캐닝, 음성 인식, 시선·머리 추적, 트랙볼·조이스틱, 키가드, 마우스스틱·헤드완드. 인지: 텍스트 음성 변환, 워드 프레딕션, 마인드맵, 알림·일정 도구, 읽기 지원(리더 모드, 난독증 글꼴).",
						"시험 대비 요령: '어떤 사용자에게 어떤 AT'를 짝짓는 문제가 자주 나옵니다. AT의 이름만 외우기보다 그 기술이 대체·보완하는 감각/능력이 무엇인지로 기억하면 헷갈리지 않습니다(예: 점자 단말기 = 시각 출력의 촉각 대체).",
					],
					en: [
						"Vision: screen readers (JAWS, NVDA, VoiceOver, TalkBack), magnifiers (ZoomText), braille displays, OCR and document readers. Hearing: hearing aids, cochlear implants, assistive listening (hearing loops, FM), captions and sign interpretation, vibration and visual alerts. Speech: AAC devices, speech-generating devices (SGDs), picture boards.",
						"Physical/motor: switches with scanning, speech recognition, eye and head tracking, trackballs and joysticks, keyguards, mouth sticks and head wands. Cognitive: text-to-speech, word prediction, mind mapping, reminder and scheduling tools, reading supports (reader modes, dyslexia fonts).",
						"Exam tip: matching questions ('which AT for which user') are common. Rather than memorizing names, remember which sense or ability each technology replaces or augments (e.g., braille display = tactile replacement for visual output).",
					],
				},
			},
			{
				heading: { ko: "기술이 아닌 적응 전략", en: "Adaptive Strategies Beyond Technology" },
				paragraphs: {
					ko: [
						"모든 적응이 기술은 아닙니다. 적응 전략(adaptive strategies)은 사람들이 과업을 수행하기 위해 사용하는 기법·습관·서비스입니다: 안내견과 흰지팡이, 수어 통역과 문자통역(속기), 활동지원사, 쉬운 언어로 다시 묻기, 자주 쉬어가기, 미리 경로를 학습해두기 등.",
						"디지털 환경에서도 마찬가지입니다: 브라우저 확대와 리더 모드 사용, 자동 완성·비밀번호 관리자 의존, 음성 메모로 기억 보완, 복잡한 절차를 가족에게 대신 요청하기. 설계자는 사용자가 이런 전략을 쓸 수 있도록 막지 않는 것(예: 붙여넣기 차단 금지, 확대 차단 금지)부터 시작해야 합니다.",
					],
					en: [
						"Not every adaptation is technology. Adaptive strategies are the techniques, habits, and services people use to accomplish tasks: guide dogs and white canes, sign language and speech-to-text interpreters, personal assistants, asking for plain-language repetition, taking frequent breaks, learning routes in advance.",
						"The same applies digitally: using browser zoom and reader modes, relying on autofill and password managers, compensating memory with voice memos, delegating complex procedures to family. Designers should start by not blocking these strategies — never disable paste, never block zoom.",
					],
				},
			},
			{
				heading: { ko: "AT 도입과 포기", en: "AT Adoption and Abandonment" },
				paragraphs: {
					ko: [
						"보조기술은 지급된다고 사용되는 것이 아닙니다. 연구들은 AT의 상당 비율(약 3분의 1)이 포기된다고 보고합니다. 주요 요인: 사용자 의견을 반영하지 않은 선정, 훈련·지원 부족, 기기 성능·신뢰성 문제, 낙인감(눈에 띄는 기기 기피), 요구 변화에 대한 미대응.",
						"성공적 도입의 원칙: 사용자를 선정 과정의 중심에 두고(자기결정), 충분한 훈련과 지속적 지원을 제공하며, 환경(가정·직장·학교)과 함께 평가합니다. 디지털 제품 관점에서는 '사용자가 이미 쓰는 AT와 호환되는가'가 곧 접근성 품질의 시험대입니다.",
					],
					en: [
						"Assistive technology isn't used just because it's provided. Research consistently reports that a large share of AT — roughly one third — is abandoned. Key factors: selection without user input, inadequate training and support, device performance and reliability problems, stigma (avoiding conspicuous devices), and failure to adapt to changing needs.",
						"Principles of successful adoption: center the user in selection (self-determination), provide real training and ongoing support, and assess within the person's environments (home, work, school). From a digital product's perspective, 'does it work with the AT users already have' is the test of accessibility quality.",
					],
				},
			},
		],
		questions: [
			{
				id: "cpacc-1-7-q1",
				question: {
					ko: "다음 중 '출력' 보조기술로만 묶인 것은?",
					en: "Which group contains only output assistive technologies?",
				},
				options: {
					a: { ko: "화면낭독기, 점자 단말기, 화면확대기", en: "Screen reader, braille display, screen magnifier" },
					b: { ko: "스위치, 음성 인식, 시선 추적", en: "Switch, speech recognition, eye tracking" },
					c: { ko: "화면낭독기, 스위치, 키가드", en: "Screen reader, switch, keyguard" },
					d: { ko: "온스크린 키보드, 트랙볼, 시프&퍼프", en: "On-screen keyboard, trackball, sip-and-puff" },
				},
				answer: "a",
				explanation: {
					ko: "화면낭독기(음성), 점자 단말기(촉각), 화면확대기(시각 변형)는 컴퓨터→사람 방향의 출력 보조기술입니다. 스위치·음성 인식·시선 추적·트랙볼 등은 입력 보조기술입니다.",
					en: "Screen readers (speech), braille displays (tactile), and magnifiers (transformed visual) are output AT (computer→person). Switches, speech recognition, eye tracking, and trackballs are input AT.",
				},
			},
			{
				id: "cpacc-1-7-q2",
				question: {
					ko: "안내견, 흰지팡이, 수어 통역이 공통적으로 해당하는 범주는?",
					en: "Guide dogs, white canes, and sign language interpreters all belong to which category?",
				},
				options: {
					a: { ko: "디지털 보조기술", en: "Digital assistive technology" },
					b: { ko: "적응 전략 (기술이 아닌 기법·서비스 포함)", en: "Adaptive strategies (techniques and services, not only technology)" },
					c: { ko: "의료 기기", en: "Medical devices" },
					d: { ko: "보편적 설계", en: "Universal Design" },
				},
				answer: "b",
				explanation: {
					ko: "적응 전략은 과업 수행을 위한 기법·습관·서비스 전반을 가리키며, 하이테크 기기뿐 아니라 안내견·흰지팡이 같은 저기술 수단과 통역 같은 인적 서비스도 포함합니다.",
					en: "Adaptive strategies encompass techniques, habits, and services for accomplishing tasks — including low-tech aids like guide dogs and white canes and human services like interpreters, not just high-tech devices.",
				},
			},
			{
				id: "cpacc-1-7-q3",
				question: {
					ko: "보조기술 포기(abandonment)의 주요 원인으로 연구에서 반복 확인된 것은?",
					en: "Which factor is consistently identified in research as a cause of AT abandonment?",
				},
				options: {
					a: { ko: "기기가 너무 저렴해서", en: "Devices being too inexpensive" },
					b: { ko: "선정 과정에서 사용자 의견이 반영되지 않아서", en: "Selection made without the user's input" },
					c: { ko: "기기 수명이 너무 길어서", en: "Devices lasting too long" },
					d: { ko: "정부 보조금이 많아서", en: "Too many government subsidies" },
				},
				answer: "b",
				explanation: {
					ko: "AT 포기의 대표 요인은 사용자 배제 선정, 훈련·지원 부족, 성능 문제, 낙인감, 요구 변화 미대응입니다. 사용자를 선정의 중심에 두는 것(자기결정)이 성공적 도입의 첫 원칙입니다.",
					en: "Leading abandonment factors: selection excluding the user, inadequate training/support, performance problems, stigma, and unadapted changing needs. Centering the user in selection (self-determination) is the first principle of successful adoption.",
				},
			},
			{
				id: "cpacc-1-7-q4",
				question: {
					ko: "마우스스틱(mouth stick)과 헤드완드(head wand)는 주로 어떤 사용자를 위한 것인가?",
					en: "Mouth sticks and head wands primarily serve which users?",
				},
				options: {
					a: { ko: "저시력 사용자", en: "Low-vision users" },
					b: { ko: "손·팔 사용이 어려운 운동 장애 사용자", en: "Users with motor disabilities affecting hand and arm use" },
					c: { ko: "난청 사용자", en: "Hard-of-hearing users" },
					d: { ko: "난독증 사용자", en: "Users with dyslexia" },
				},
				answer: "b",
				explanation: {
					ko: "마우스스틱은 입에 물고, 헤드완드는 머리에 착용하여 키보드·터치스크린을 조작하는 저기술 입력 보조기구로, 손과 팔 사용이 어려운 사용자가 사용합니다.",
					en: "A mouth stick is held in the mouth and a head wand worn on the head to operate keyboards and touchscreens — low-tech input aids for users who cannot use their hands and arms.",
				},
			},
		],
	},

	// ── Domain 2 신규 ─────────────────────────────────────────────────────────
	{
		id: "cpacc-2-4",
		exam: "cpacc",
		domain: 2,
		order: 4,
		available: true,
		title: { ko: "UDL, 사용성, 사용자 중심 설계", en: "UDL, Usability, and User-Centered Design" },
		summary: {
			ko: "보편적 학습 설계(UDL)의 3원칙, 접근성과 사용성의 관계, 사용자 중심 설계 프로세스에 장애인을 포함하는 방법을 학습합니다.",
			en: "Learn the three principles of Universal Design for Learning (UDL), the relationship between accessibility and usability, and how to include disabled people in user-centered design.",
		},
		objectives: {
			ko: [
				"UDL의 3가지 원칙을 나열하고 설명할 수 있다",
				"UDL과 보편적 설계(UD)의 관계를 설명할 수 있다",
				"접근성과 사용성의 관계를 설명할 수 있다",
				"사용자 중심 설계에 장애인을 포함하는 방법을 제시할 수 있다",
			],
			en: [
				"List and explain the three UDL principles",
				"Explain how UDL relates to Universal Design (UD)",
				"Describe the relationship between accessibility and usability",
				"Propose ways to include disabled people in user-centered design",
			],
		},
		content: { ko: [], en: [] },
		sections: [
			{
				heading: { ko: "보편적 학습 설계 (UDL)", en: "Universal Design for Learning (UDL)" },
				paragraphs: {
					ko: [
						"보편적 학습 설계(UDL: Universal Design for Learning)는 보편적 설계 철학을 교육에 적용한 프레임워크로, 비영리 기관 CAST가 개발했습니다. 학습자마다 배우는 방식이 다르므로, 커리큘럼을 처음부터 다양한 학습자에 맞게 설계하자는 접근입니다.",
						"UDL의 3원칙: ① 다양한 참여 수단 제공(Multiple Means of Engagement) — 학습 동기와 흥미를 끄는 '왜(why)'의 다양화 ② 다양한 표상 수단 제공(Multiple Means of Representation) — 정보를 제시하는 '무엇(what)'의 다양화(텍스트+음성+영상+그림) ③ 다양한 행동·표현 수단 제공(Multiple Means of Action & Expression) — 학습자가 아는 것을 보여주는 '어떻게(how)'의 다양화(글·발표·프로젝트 선택).",
						"디지털 학습 환경에서 UDL은 접근성과 자연스럽게 만납니다: 자막 있는 영상과 대본(표상), 키보드로 조작 가능한 활동(행동), 난이도·속도 선택(참여). 이러닝 제품을 다루는 접근성 전문가에게 UDL은 필수 어휘입니다.",
					],
					en: [
						"Universal Design for Learning (UDL) applies the Universal Design philosophy to education. Developed by the nonprofit CAST, it starts from the premise that learners vary — so curricula should be designed for that variety from the outset.",
						"The three UDL principles: ① Multiple Means of Engagement — varying the 'why' of learning, motivation and interest ② Multiple Means of Representation — varying the 'what,' how information is presented (text plus audio plus video plus graphics) ③ Multiple Means of Action & Expression — varying the 'how,' the ways learners demonstrate what they know (choice of writing, presenting, projects).",
						"In digital learning environments, UDL converges naturally with accessibility: captioned video with transcripts (representation), keyboard-operable activities (action), choice of pace and difficulty (engagement). For accessibility professionals working on e-learning, UDL is essential vocabulary.",
					],
				},
			},
			{
				heading: { ko: "접근성과 사용성의 관계", en: "Accessibility and Usability" },
				paragraphs: {
					ko: [
						"사용성(Usability)은 특정 사용자가 특정 맥락에서 목표를 효과적·효율적·만족스럽게 달성할 수 있는 정도입니다(ISO 9241-11). 접근성은 장애인이 그 '특정 사용자'에 포함되도록 보장하는 것으로 볼 수 있습니다 — 접근성은 장애인을 위한 사용성이라는 관점입니다.",
						"둘은 겹치지만 같지 않습니다. 기술적으로 접근 가능(WCAG 적합)해도 사용하기 어려울 수 있고(예: 키보드로 조작은 되지만 47번 탭해야 하는 메뉴), 사용성이 좋아 보여도 특정 집단에게 접근 불가능할 수 있습니다. 목표는 접근 가능한 사용성(usable accessibility) — 기준 충족을 넘어 실제로 잘 쓰이는 경험입니다.",
					],
					en: [
						"Usability is the extent to which specified users can achieve specified goals effectively, efficiently, and with satisfaction in a specified context (ISO 9241-11). Accessibility can be seen as ensuring that disabled people are included among those 'specified users' — accessibility as usability for people with disabilities.",
						"The two overlap but are not identical. Content can be technically accessible (WCAG-conformant) yet hard to use — operable by keyboard but requiring 47 tab presses to reach a menu — and seemingly usable products can be inaccessible to particular groups. The goal is usable accessibility: experiences that work well in practice, beyond meeting criteria.",
					],
				},
			},
			{
				heading: { ko: "사용자 중심 설계와 장애인 포함", en: "User-Centered Design with Disabled Users" },
				paragraphs: {
					ko: [
						"사용자 중심 설계(UCD: User-Centered Design)는 사용자 요구를 조사→설계→평가의 반복 주기 중심에 두는 방법론입니다. 장애인을 포함하려면: 리서치 참가자 모집에 장애인 할당을 두고, 페르소나에 장애·보조기술 사용을 반영하며, 프로토타입 테스트를 보조기술로도 수행하고, 참가자 보상·장소·자료의 접근성을 보장합니다.",
						"'우리 없이 우리에 관한 것은 없다(Nothing About Us Without Us)'는 장애 인권 운동의 원칙은 설계에도 적용됩니다. 장애인을 검수 대상이 아닌 설계 참여자로 초대할 때 — 자문단, 공동 설계 워크숍, 장애인 직원 채용 — 접근성은 사후 수정이 아닌 기본 품질이 됩니다.",
					],
					en: [
						"User-Centered Design (UCD) places user needs at the center of an iterative research→design→evaluate cycle. Including disabled people means: setting recruitment quotas for disabled participants, reflecting disability and AT use in personas, testing prototypes with assistive technologies, and ensuring the accessibility of compensation, venues, and materials.",
						"'Nothing About Us Without Us,' the disability rights principle, applies to design too. When disabled people are invited as design participants rather than inspection subjects — advisory panels, co-design workshops, hiring disabled employees — accessibility becomes baseline quality instead of a retrofit.",
					],
				},
			},
		],
		questions: [
			{
				id: "cpacc-2-4-q1",
				question: {
					ko: "UDL의 3원칙이 아닌 것은?",
					en: "Which is NOT one of the three UDL principles?",
				},
				options: {
					a: { ko: "다양한 참여 수단 제공", en: "Multiple Means of Engagement" },
					b: { ko: "다양한 표상 수단 제공", en: "Multiple Means of Representation" },
					c: { ko: "다양한 행동·표현 수단 제공", en: "Multiple Means of Action & Expression" },
					d: { ko: "다양한 평가 기준 완화", en: "Multiple Means of Lowering Assessment Standards" },
				},
				answer: "d",
				explanation: {
					ko: "UDL 3원칙은 참여(왜)·표상(무엇)·행동과 표현(어떻게)의 다양화입니다. 평가 기준을 낮추는 것이 아니라, 같은 목표에 도달하는 경로를 다양화하는 것입니다.",
					en: "The three UDL principles diversify engagement (why), representation (what), and action & expression (how). UDL varies the paths to the same goal — it does not lower standards.",
				},
			},
			{
				id: "cpacc-2-4-q2",
				question: {
					ko: "접근성과 사용성의 관계로 가장 적절한 것은?",
					en: "Which best describes the relationship between accessibility and usability?",
				},
				options: {
					a: { ko: "WCAG를 충족하면 사용성도 자동으로 보장된다", en: "Meeting WCAG automatically guarantees usability" },
					b: { ko: "겹치지만 같지 않다 — 기술적 적합이 곧 좋은 사용 경험은 아니다", en: "They overlap but differ — technical conformance is not the same as a good experience" },
					c: { ko: "서로 무관한 별개 분야다", en: "They are unrelated fields" },
					d: { ko: "사용성이 좋으면 접근성 검토는 불필요하다", en: "Good usability makes accessibility review unnecessary" },
				},
				answer: "b",
				explanation: {
					ko: "키보드로 조작은 가능하지만 수십 번 탭해야 하는 메뉴처럼, WCAG 적합이 곧 좋은 경험을 뜻하지 않습니다. 목표는 기준 충족을 넘어선 '접근 가능한 사용성'입니다.",
					en: "Like a menu that is keyboard-operable but takes dozens of tab presses, WCAG conformance doesn't equal a good experience. The goal is usable accessibility beyond the criteria.",
				},
			},
			{
				id: "cpacc-2-4-q3",
				question: {
					ko: "'Nothing About Us Without Us' 원칙을 설계 프로세스에 적용한 예로 가장 적절한 것은?",
					en: "Which best applies 'Nothing About Us Without Us' to the design process?",
				},
				options: {
					a: { ko: "출시 직전 자동 검사 도구 실행", en: "Running automated checks just before launch" },
					b: { ko: "장애인을 자문단·공동 설계 워크숍의 참여자로 초대", en: "Inviting disabled people as advisory panel members and co-design participants" },
					c: { ko: "장애인 사용 통계를 추정치로 대체", en: "Replacing disabled-user statistics with estimates" },
					d: { ko: "접근성 성명서 게시", en: "Publishing an accessibility statement" },
				},
				answer: "b",
				explanation: {
					ko: "이 원칙은 장애인이 자신에게 영향을 주는 결정에 참여해야 한다는 장애 인권 운동의 슬로건입니다. 설계에서는 장애인을 검수 대상이 아닌 설계 참여자로 포함하는 것을 의미합니다.",
					en: "The disability-rights slogan demands that disabled people participate in decisions affecting them. In design, that means including disabled people as design participants, not just inspection subjects.",
				},
			},
			{
				id: "cpacc-2-4-q4",
				question: {
					ko: "UDL을 개발한 기관은?",
					en: "Which organization developed UDL?",
				},
				options: {
					a: { ko: "W3C", en: "W3C" },
					b: { ko: "CAST", en: "CAST" },
					c: { ko: "IAAP", en: "IAAP" },
					d: { ko: "WHO", en: "WHO" },
				},
				answer: "b",
				explanation: {
					ko: "UDL은 미국 비영리 교육연구기관 CAST가 개발한 프레임워크입니다. W3C는 WCAG, WHO는 ICF, IAAP는 자격증(CPACC 등)과 관련됩니다.",
					en: "UDL was developed by CAST, a US nonprofit education research organization. W3C makes WCAG; WHO makes the ICF; IAAP runs certifications like CPACC.",
				},
			},
		],
	},

	{
		id: "cpacc-2-5",
		exam: "cpacc",
		domain: 2,
		order: 5,
		available: true,
		title: { ko: "접근성의 혜택과 비즈니스 사례", en: "Benefits of Accessibility and the Business Case" },
		summary: {
			ko: "접근성이 조직에 가져오는 네 가지 혜택 축(시장·혁신·브랜드·법적 위험)과 반론에 대응하는 방법을 학습합니다.",
			en: "Learn the four benefit pillars of accessibility — market reach, innovation, brand, legal risk — and how to answer common objections.",
		},
		objectives: {
			ko: [
				"W3C 비즈니스 사례의 네 가지 축을 나열할 수 있다",
				"접근성에서 출발한 주류 혁신의 예를 들 수 있다",
				"'비용이 너무 크다'는 반론에 대응할 수 있다",
				"장애인 시장의 경제 규모 논거를 제시할 수 있다",
			],
			en: [
				"List the four pillars of the W3C business case",
				"Give examples of mainstream innovations that began as accessibility",
				"Respond to the 'too expensive' objection",
				"Present the economic-scale argument of the disability market",
			],
		},
		content: { ko: [], en: [] },
		sections: [
			{
				heading: { ko: "네 가지 혜택 축", en: "The Four Benefit Pillars" },
				paragraphs: {
					ko: [
						"W3C의 '접근성 비즈니스 사례'는 네 축으로 정리됩니다. ① 시장 확대: 장애인(전 세계 13억+)과 그 가족·지인, 고령자까지 도달 가능한 고객이 늘어납니다. 장애인과 가족의 가처분 소득은 수조 달러 규모로 추산됩니다. ② 혁신 촉진: 접근성 제약이 창의적 해결을 낳고, 그 해결이 모두를 위한 기능이 됩니다.",
						"③ 브랜드 가치: 포용적 브랜드는 평판, 인재 채용, ESG 평가에서 우위를 가집니다. ④ 법적 위험 최소화: ADA 소송, EAA 제재, 인권위 진정 같은 법적·규제 비용을 예방합니다. 네 축을 조직의 우선순위(성장기엔 시장, 상장사엔 위험)에 맞춰 조합하는 것이 설득의 기술입니다.",
					],
					en: [
						"The W3C business case rests on four pillars. ① Market reach: accessible products reach disabled people (1.3B+ worldwide), their families and friends, and older adults. The disposable income of disabled people and their families is estimated in the trillions of dollars. ② Innovation: accessibility constraints drive creative solutions that become features for everyone.",
						"③ Brand enhancement: inclusive brands gain reputation, recruiting, and ESG advantages. ④ Legal risk minimization: preventing the costs of ADA lawsuits, EAA sanctions, and human-rights complaints. The art of persuasion is combining the pillars to match organizational priorities — market for growth companies, risk for public ones.",
					],
				},
			},
			{
				heading: { ko: "접근성에서 나온 주류 혁신", en: "Mainstream Innovations Born from Accessibility" },
				paragraphs: {
					ko: [
						"역사가 증명하는 혁신 축의 사례들: 전화기는 벨이 농인 교육 연구 중에 발명했고, 타자기의 초기 형태는 시각장애인 백작부인을 위해 만들어졌습니다. 문자메시지(SMS)와 이메일은 농인 커뮤니케이션에 뿌리를 두고, 음성 비서·음성 인식은 손을 쓰기 어려운 사용자를 위한 기술에서 출발했습니다.",
						"오디오북, 자동 완성, OCR, 동영상 자막(소음 환경 시청의 표준이 됨), 다크 모드까지 — 접근성 요구를 진지하게 다루는 조직은 미래의 주류 기능을 먼저 발명하는 셈입니다. 이 서사는 접근성을 '비용'에서 'R&D'로 재프레임하는 강력한 도구입니다.",
					],
					en: [
						"History supplies the innovation pillar: Bell invented the telephone while researching Deaf education; an early typewriter was built for a blind countess. SMS and email have roots in Deaf communication, and voice assistants and speech recognition began as technology for people who could not use their hands.",
						"Audiobooks, autocomplete, OCR, video captions (now standard for noisy-environment viewing), even dark mode — organizations that take accessibility seriously effectively invent tomorrow's mainstream features first. This narrative powerfully reframes accessibility from 'cost' to 'R&D.'",
					],
				},
			},
			{
				heading: { ko: "반론에 대응하기", en: "Answering the Objections" },
				paragraphs: {
					ko: [
						"'비용이 너무 크다': 접근성 비용은 시점에 좌우됩니다. 설계 초기에 포함하면 전체 비용의 극히 일부지만, 출시 후 소급 수정(retrofit)은 몇 배의 비용이 듭니다 — Shift Left가 곧 비용 절감 전략입니다. 또한 소송 합의금, 재작업, 이탈 고객이라는 '하지 않은 비용'과 비교해야 공정한 계산입니다.",
						"'우리 고객 중엔 장애인이 없다': 앞 단원의 통계 논거로 답합니다 — 측정 부재는 수요 부재가 아니고, 접근 불가능한 서비스가 유입 자체를 차단하며, 일시적·상황적 제약까지 포함하면 수혜자는 전체 사용자입니다. '나중에 하겠다': 접근성 부채는 기술 부채처럼 복리로 늘어나며, 법적 시한(EAA 2025, ADA Title II 2026~27)은 기다려주지 않습니다.",
					],
					en: [
						"'It costs too much': accessibility cost depends on timing. Built in at design time it is a small fraction of total cost; retrofitting after launch costs multiples — Shift Left is a cost-reduction strategy. A fair calculation also compares the costs of not doing it: settlements, rework, lost customers.",
						"'We have no disabled customers': answer with the statistics unit — absence of measurement is not absence of demand, inaccessible services block arrival in the first place, and counting temporary and situational limitations makes the beneficiary everyone. 'We'll do it later': accessibility debt compounds like technical debt, and legal deadlines (EAA 2025, ADA Title II 2026–27) won't wait.",
					],
				},
			},
		],
		questions: [
			{
				id: "cpacc-2-5-q1",
				question: {
					ko: "W3C 접근성 비즈니스 사례의 네 축이 아닌 것은?",
					en: "Which is NOT one of the four pillars of the W3C business case for accessibility?",
				},
				options: {
					a: { ko: "시장 확대", en: "Market reach" },
					b: { ko: "혁신 촉진", en: "Driving innovation" },
					c: { ko: "브랜드 가치 향상", en: "Brand enhancement" },
					d: { ko: "서버 비용 절감", en: "Server cost reduction" },
				},
				answer: "d",
				explanation: {
					ko: "네 축은 시장 확대, 혁신 촉진, 브랜드 가치 향상, 법적 위험 최소화입니다. 서버 비용은 비즈니스 사례의 축이 아닙니다.",
					en: "The four pillars are market reach, innovation, brand enhancement, and legal risk minimization. Server costs are not one of them.",
				},
			},
			{
				id: "cpacc-2-5-q2",
				question: {
					ko: "접근성에서 출발해 주류 기술이 된 사례로 옳은 것은?",
					en: "Which correctly pairs a mainstream technology with its accessibility origin?",
				},
				options: {
					a: { ko: "전화기 — 벨의 농인 교육 연구", en: "The telephone — Bell's research in Deaf education" },
					b: { ko: "GPS — 시각장애인 내비게이션", en: "GPS — navigation for blind users" },
					c: { ko: "와이파이 — 청각장애인 통신", en: "Wi-Fi — communication for Deaf users" },
					d: { ko: "블루투스 — 지체장애인 입력", en: "Bluetooth — input for physically disabled users" },
				},
				answer: "a",
				explanation: {
					ko: "벨은 농인 교육을 연구하던 중 전화기를 발명했습니다. 그 밖에 타자기(시각장애), SMS·이메일(농인 커뮤니케이션), 음성 인식(운동 장애) 등이 접근성에서 출발한 주류 혁신의 사례입니다.",
					en: "Bell invented the telephone while researching Deaf education. Other examples include the typewriter (blindness), SMS and email (Deaf communication), and speech recognition (motor disabilities).",
				},
			},
			{
				id: "cpacc-2-5-q3",
				question: {
					ko: "'접근성 비용이 너무 크다'는 반론에 대한 가장 효과적인 대응은?",
					en: "What is the most effective response to 'accessibility costs too much'?",
				},
				options: {
					a: { ko: "비용이 전혀 들지 않는다고 주장한다", en: "Claim it costs nothing at all" },
					b: { ko: "초기 설계 포함 시 비용은 극히 일부이며, 소급 수정과 '하지 않은 비용'(소송·재작업·이탈)이 훨씬 크다고 설명한다", en: "Explain that built-in early it's a small fraction, while retrofits and the costs of inaction (lawsuits, rework, churn) are far larger" },
					c: { ko: "법으로 강제되니 무조건 해야 한다고만 말한다", en: "Say only that the law requires it" },
					d: { ko: "경쟁사도 안 하니 미뤄도 된다고 말한다", en: "Say competitors don't do it either, so it can wait" },
				},
				answer: "b",
				explanation: {
					ko: "비용 논쟁의 핵심은 시점입니다. Shift Left(초기 통합)는 비용을 극소화하고, 공정한 계산은 소송 합의금·재작업·이탈 고객 같은 '하지 않은 비용'을 포함해야 합니다.",
					en: "The cost debate hinges on timing: Shift Left minimizes cost, and a fair calculation includes the costs of inaction — settlements, rework, and lost customers.",
				},
			},
			{
				id: "cpacc-2-5-q4",
				question: {
					ko: "장애인 시장의 경제 규모 논거로 적절한 것은?",
					en: "Which is a sound economic-scale argument for the disability market?",
				},
				options: {
					a: { ko: "장애인은 소비 활동을 거의 하지 않는다", en: "Disabled people rarely participate in consumption" },
					b: { ko: "장애인과 그 가족·지인의 가처분 소득은 수조 달러 규모이며, 접근 가능한 서비스로 이동하는 경향이 있다", en: "Disabled people plus family and friends control trillions in disposable income and gravitate toward accessible services" },
					c: { ko: "장애인 시장은 정부 보조금으로만 구성된다", en: "The disability market consists only of government subsidies" },
					d: { ko: "고령자는 디지털 서비스를 사용하지 않는다", en: "Older adults don't use digital services" },
				},
				answer: "b",
				explanation: {
					ko: "장애인 본인뿐 아니라 함께 소비를 결정하는 가족·지인까지 포함하면 수조 달러 규모의 시장입니다. 접근 불가능한 서비스는 이 고객들이 경쟁사로 이동하게 만듭니다.",
					en: "Counting disabled people plus the family and friends who make purchasing decisions with them, the market is worth trillions. Inaccessible services push these customers to competitors.",
				},
			},
		],
	},

	// ── Domain 3 신규 ─────────────────────────────────────────────────────────
	{
		id: "cpacc-3-4",
		exam: "cpacc",
		domain: 3,
		order: 4,
		available: true,
		title: { ko: "조달과 VPAT/ACR 실무", en: "Procurement and VPAT/ACR in Practice" },
		summary: {
			ko: "조달 생애주기에 접근성을 통합하는 방법, ACR을 읽고 검증하는 실무 요령, 계약 조항 설계를 학습합니다.",
			en: "Learn how to integrate accessibility into the procurement lifecycle, practical skills for reading and verifying ACRs, and drafting contract clauses.",
		},
		objectives: {
			ko: [
				"조달 생애주기의 각 단계에 접근성을 통합할 수 있다",
				"ACR 문서를 읽고 신뢰도를 평가할 수 있다",
				"공급업체 주장을 검증하는 방법을 제시할 수 있다",
				"계약에 포함할 접근성 조항의 요소를 나열할 수 있다",
			],
			en: [
				"Integrate accessibility into each stage of the procurement lifecycle",
				"Read an ACR and evaluate its credibility",
				"Propose methods for verifying vendor claims",
				"List elements of accessibility clauses for contracts",
			],
		},
		content: { ko: [], en: [] },
		sections: [
			{
				heading: { ko: "조달 생애주기와 접근성", en: "Accessibility Across the Procurement Lifecycle" },
				paragraphs: {
					ko: [
						"조직이 쓰는 소프트웨어의 대부분은 구매·구독하는 제품입니다. 아무리 자체 개발물이 접근 가능해도, 조달한 HR 시스템·협업 도구·키오스크가 접근 불가능하면 조직의 접근성은 무너집니다. 그래서 조달은 접근성 거버넌스의 핵심 통제 지점입니다.",
						"생애주기별 통합: ① 요구 정의 — RFP(제안요청서)에 접근성 요구사항(예: WCAG 2.2 AA, EN 301 549)과 ACR 제출 의무를 명시 ② 평가 — 접근성을 채점 기준에 배점하고 ACR·데모를 검토 ③ 계약 — 접근성 조항, 결함 시정 일정, 검수 권리를 포함 ④ 도입 후 — 업데이트마다 재검증하고 사용자 피드백 채널을 운영.",
						"Section 508(미국 연방)과 EN 301 549(EU)가 조달 접근성의 양대 기준이며, 한국도 공공 조달에서 접근성 요구가 확산되고 있습니다. 조달 담당자·계약 담당자 교육이 프로그램의 성패를 좌우합니다.",
					],
					en: [
						"Most software an organization uses is bought or subscribed to. However accessible your own builds are, an inaccessible procured HR system, collaboration tool, or kiosk breaks organizational accessibility. Procurement is therefore a key control point of accessibility governance.",
						"Integration across the lifecycle: ① Requirements — state accessibility requirements (e.g., WCAG 2.2 AA, EN 301 549) and mandatory ACR submission in the RFP ② Evaluation — weight accessibility in scoring and review ACRs and demos ③ Contract — include accessibility clauses, remediation timelines, and audit rights ④ Post-deployment — revalidate on updates and run a user feedback channel.",
						"Section 508 (US federal) and EN 301 549 (EU) are the two flagship procurement standards, and accessibility requirements are spreading in Korean public procurement as well. Training procurement and contract officers often determines program success.",
					],
				},
			},
			{
				heading: { ko: "ACR 읽기 — 신뢰도 평가", en: "Reading an ACR — Judging Credibility" },
				paragraphs: {
					ko: [
						"ACR을 받았다면 먼저 메타데이터를 확인합니다: 어떤 VPAT 에디션(508/EU/WCAG/INT)과 버전인지, 평가 대상 제품·버전·범위가 무엇인지, 평가 일자와 평가 방법(자체 평가인지 제3자 평가인지, 어떤 보조기술로 테스트했는지)이 명시되어 있는지.",
						"신뢰도의 신호: 모든 항목이 '지원(Supports)'로만 채워진 문서는 오히려 의심스럽습니다 — 성숙한 공급업체는 '부분 지원'을 구체적 비고(어떤 화면에서 어떤 문제가 있고 언제 고칠 예정인지)와 함께 솔직하게 씁니다. 비고 없이 등급만 나열한 ACR, 오래된 제품 버전 기준의 ACR, 평가 방법이 불명확한 ACR은 재요청 대상입니다.",
					],
					en: [
						"When you receive an ACR, check the metadata first: which VPAT edition (508/EU/WCAG/INT) and version; the evaluated product, version, and scope; the evaluation date; and the method — self-assessment or third-party, and which assistive technologies were used in testing.",
						"Credibility signals: a document showing 'Supports' on every row is itself suspicious — mature vendors write honest 'Partially Supports' entries with specific remarks (which screens, what issues, when fixes are planned). ACRs with ratings but no remarks, ACRs based on outdated product versions, and ACRs with unclear methodology warrant a re-request.",
					],
				},
			},
			{
				heading: { ko: "주장 검증과 계약 조항", en: "Verifying Claims and Contract Clauses" },
				paragraphs: {
					ko: [
						"ACR은 자가 보고 문서이므로 검증이 필요합니다. 실무 방법: 후보 제품의 핵심 과업 3~5개를 골라 키보드 전용·화면낭독기로 샘플 테스트를 수행하고, 공급업체에 보조기술 시연 데모를 요청하며, 필요하면 제3자 감사 보고서를 요구합니다. 평가 단계의 짧은 테스트가 도입 후 발견되는 값비싼 문제를 예방합니다.",
						"계약 조항의 요소: 준수 기준과 버전(WCAG 2.2 AA 등) 명시, 신규 릴리스에 대한 지속 준수 의무, 결함 발견 시 시정 일정(SLA), 시정 실패 시 구제 수단(위약·해지), 접근성 문의 대응 창구, 그리고 갱신 시점의 ACR 재제출 의무. 조항이 없으면 도입 후 발견된 문제의 비용은 구매자가 떠안게 됩니다.",
					],
					en: [
						"Because an ACR is self-reported, verification matters. Practical methods: pick 3–5 core tasks in the candidate product and run sample tests keyboard-only and with a screen reader; request a vendor demo using assistive technology; and where needed, ask for a third-party audit report. A short test at evaluation prevents expensive post-deployment discoveries.",
						"Contract clause elements: the named standard and version (e.g., WCAG 2.2 AA), continued conformance obligations for new releases, remediation timelines (SLAs) for defects, remedies for failure (penalties, termination), an accessibility support contact, and re-submission of ACRs at renewal. Without clauses, the buyer absorbs the cost of problems found after deployment.",
					],
				},
			},
		],
		questions: [
			{
				id: "cpacc-3-4-q1",
				question: {
					ko: "조달이 접근성 거버넌스의 핵심 통제 지점인 이유는?",
					en: "Why is procurement a key control point of accessibility governance?",
				},
				options: {
					a: { ko: "조달 부서가 접근성 감사를 직접 수행하기 때문", en: "Because procurement departments conduct accessibility audits themselves" },
					b: { ko: "조직이 쓰는 소프트웨어 대부분이 구매 제품이라, 조달품이 접근 불가능하면 조직 전체의 접근성이 무너지기 때문", en: "Because most software an organization uses is procured — inaccessible purchases break organizational accessibility" },
					c: { ko: "조달 비용이 가장 크기 때문", en: "Because procurement is the largest expense" },
					d: { ko: "법률이 조달만 규제하기 때문", en: "Because laws regulate only procurement" },
				},
				answer: "b",
				explanation: {
					ko: "자체 개발물이 접근 가능해도 조달한 HR 시스템·협업 도구가 접근 불가능하면 직원과 고객의 실제 경험은 무너집니다. RFP 요구사항 명시부터 계약 조항까지 조달 생애주기 전체에 접근성을 통합해야 합니다.",
					en: "Even with accessible in-house builds, an inaccessible procured HR system or collaboration tool breaks the real experience. Accessibility must be integrated across the procurement lifecycle, from RFP requirements to contract clauses.",
				},
			},
			{
				id: "cpacc-3-4-q2",
				question: {
					ko: "ACR의 신뢰도를 의심해야 하는 신호는?",
					en: "Which is a signal to doubt an ACR's credibility?",
				},
				options: {
					a: { ko: "'부분 지원' 항목에 구체적 비고가 달려 있다", en: "'Partially Supports' entries with specific remarks" },
					b: { ko: "모든 항목이 비고 없이 '지원(Supports)'로만 채워져 있다", en: "Every row rated 'Supports' with no remarks" },
					c: { ko: "평가 방법과 사용 보조기술이 명시되어 있다", en: "The methodology and assistive technologies used are stated" },
					d: { ko: "최신 제품 버전 기준으로 작성되어 있다", en: "It is based on the current product version" },
				},
				answer: "b",
				explanation: {
					ko: "성숙한 공급업체는 '부분 지원'을 구체적 비고와 함께 솔직하게 기재합니다. 비고 없이 전 항목 '지원'인 문서, 평가 방법 불명, 구버전 기준은 재요청·검증 대상입니다.",
					en: "Mature vendors honestly document 'Partially Supports' with specific remarks. All-'Supports' documents without remarks, unclear methodology, and outdated versions warrant re-requests and verification.",
				},
			},
			{
				id: "cpacc-3-4-q3",
				question: {
					ko: "공급업체의 접근성 주장을 검증하는 실무 방법으로 적절하지 않은 것은?",
					en: "Which is NOT an appropriate practical method for verifying vendor accessibility claims?",
				},
				options: {
					a: { ko: "핵심 과업의 키보드·화면낭독기 샘플 테스트", en: "Sample-testing core tasks keyboard-only and with a screen reader" },
					b: { ko: "보조기술 시연 데모 요청", en: "Requesting a demo using assistive technology" },
					c: { ko: "제3자 감사 보고서 요구", en: "Asking for a third-party audit report" },
					d: { ko: "ACR의 등급 표만 믿고 계약 진행", en: "Trusting the ACR rating table alone and proceeding to contract" },
				},
				answer: "d",
				explanation: {
					ko: "ACR은 자가 보고 문서이므로 그것만으로 계약하면 도입 후 값비싼 문제를 떠안게 됩니다. 샘플 테스트·데모·제3자 감사로 검증하고 계약 조항으로 보호해야 합니다.",
					en: "An ACR is self-reported; contracting on it alone means absorbing expensive post-deployment problems. Verify with sample tests, demos, and third-party audits, and protect yourself with contract clauses.",
				},
			},
			{
				id: "cpacc-3-4-q4",
				question: {
					ko: "조달 계약의 접근성 조항에 포함할 요소로 가장 거리가 먼 것은?",
					en: "Which element is LEAST relevant to an accessibility clause in a procurement contract?",
				},
				options: {
					a: { ko: "준수 기준과 버전 명시 (예: WCAG 2.2 AA)", en: "Named standard and version (e.g., WCAG 2.2 AA)" },
					b: { ko: "결함 시정 일정(SLA)과 구제 수단", en: "Remediation timelines (SLAs) and remedies" },
					c: { ko: "신규 릴리스의 지속 준수 의무", en: "Continued conformance for new releases" },
					d: { ko: "공급업체 사옥의 인테리어 기준", en: "Interior design standards for the vendor's office" },
				},
				answer: "d",
				explanation: {
					ko: "접근성 조항의 핵심은 기준·버전 명시, 지속 준수 의무, 시정 SLA와 구제 수단, 지원 창구, ACR 재제출 의무입니다. 공급업체 사옥 인테리어는 무관합니다.",
					en: "Key clause elements: named standard/version, continued conformance, remediation SLAs and remedies, a support contact, and ACR re-submission. The vendor's office interior is irrelevant.",
				},
			},
		],
	},
];
