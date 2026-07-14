import type { StudyUnit, DomainGroup } from "./types";

const units: StudyUnit[] = [
	// ── Domain 1 ──────────────────────────────────────────────────────────────
	{
		id: "cpacc-1-1",
		exam: "cpacc",
		domain: 1,
		order: 1,
		available: true,
		title: {
			ko: "장애 모델",
			en: "Models of Disability",
		},
		summary: {
			ko: "장애를 바라보는 세 가지 관점—의료 모델, 사회 모델, 생체심리사회 모델—과 CPACC 시험에서 핵심적인 사회 모델의 개념을 학습합니다.",
			en: "Explore three perspectives on disability — the Medical, Social, and Biopsychosocial Models — with a focus on the Social Model central to CPACC.",
		},
		objectives: {
			ko: [
				"의료 모델과 사회 모델의 핵심 차이를 설명할 수 있다",
				"생체심리사회 모델과 WHO ICF의 관계를 이해한다",
				"사회 모델 관점에서 '장벽'의 의미를 정의할 수 있다",
				"UN CRPD가 채택한 장애 관점을 설명할 수 있다",
			],
			en: [
				"Explain the key differences between the Medical and Social Models",
				"Understand the relationship between the Biopsychosocial Model and WHO ICF",
				"Define 'barrier' from a Social Model perspective",
				"Describe the disability perspective adopted by the UN CRPD",
			],
		},
		content: { ko: [], en: [] },
		sections: [
			{
				heading: { ko: "관점이 해결책을 결정한다", en: "Perspective Shapes the Solution" },
				paragraphs: {
					ko: [
						"장애를 어떻게 정의하느냐에 따라 문제의 위치와 해결 접근 방식이 크게 달라집니다. 장애를 개인의 결함으로 보면 해결책은 치료가 되고, 사회의 장벽으로 보면 해결책은 환경 개선이 됩니다. CPACC 시험은 여러 장애 모델을 구분하고 각 모델이 이끄는 해결 방식을 이해하는지를 확인합니다.",
						"어떤 모델도 그 자체로 완전하지는 않습니다. 각 모델은 장애의 특정 측면을 조명하는 렌즈이며, 접근성 전문가는 상황에 따라 여러 모델의 강점과 한계를 함께 고려해야 합니다. 다만 접근성 실무의 기본 관점은 사회 모델입니다.",
					],
					en: [
						"How we define disability determines where we locate the problem and how we approach solutions. If disability is a personal deficiency, the solution is treatment; if it is a societal barrier, the solution is changing the environment. The CPACC exam tests whether you can distinguish the models and the solutions each one leads to.",
						"No single model is complete on its own. Each is a lens that illuminates certain aspects of disability, and accessibility professionals should weigh the strengths and limits of several models depending on context. That said, the default perspective of accessibility practice is the Social Model.",
					],
				},
			},
			{
				heading: { ko: "의료 모델과 자선 모델", en: "The Medical and Charity Models" },
				paragraphs: {
					ko: [
						"의료 모델(Medical Model)은 장애를 개인의 신체적·정신적 결함으로 바라봅니다. 이 관점에서 해결책은 치료, 재활, 교정을 통해 개인을 '정상' 상태에 가깝게 만드는 것이며, 장벽 제거의 책임은 주로 개인에게 있습니다. 의료적 개입 자체는 필요하고 유익할 수 있으나, 이 모델만으로는 환경의 책임을 놓치게 됩니다.",
						"자선 모델(Charity Model)은 장애인을 동정과 도움이 필요한 비극적 존재로 바라봅니다. 선의에서 출발하지만 장애인을 수동적 수혜자로 위치시키고, 권리의 주체가 아닌 시혜의 대상으로 취급한다는 비판을 받습니다. 모금 캠페인에서 장애를 극적으로 묘사하는 방식이 대표적 사례입니다.",
						"두 모델의 공통 한계는 문제를 개인 안에 둔다는 점입니다. 개인이 치료되거나 도움을 받기 전까지 사회는 바뀔 필요가 없다는 결론으로 이어지기 쉽습니다.",
					],
					en: [
						"The Medical Model views disability as a personal physical or mental deficiency. The solution is to bring the individual closer to 'normal' through treatment, rehabilitation, or correction, and the responsibility for overcoming barriers rests with the individual. Medical intervention itself can be necessary and beneficial, but this model alone overlooks the environment's responsibility.",
						"The Charity Model sees disabled people as tragic figures deserving pity and help. Though well-intentioned, it is criticized for positioning disabled people as passive recipients — objects of benevolence rather than holders of rights. Fundraising campaigns that dramatize disability are a classic example.",
						"The shared limitation of both models is that they locate the problem inside the person. They easily lead to the conclusion that society need not change until the individual is cured or helped.",
					],
				},
			},
			{
				heading: { ko: "사회 모델 — CPACC의 중심", en: "The Social Model — Central to CPACC" },
				paragraphs: {
					ko: [
						"사회 모델(Social Model)은 CPACC 시험에서 가장 중요한 모델입니다. 이 모델은 장애(disability)가 개인의 손상(impairment) 자체에서 오는 것이 아니라, 접근 불가능한 환경과 사회적 장벽이 만들어내는 것이라고 주장합니다. 손상과 장애를 구분하는 것이 핵심입니다: 손상은 개인의 신체적·정신적 특성이고, 장애는 그 특성을 가진 사람이 사회에 참여하지 못하게 만드는 장벽의 결과입니다.",
						"예를 들어 휠체어 사용자가 계단 때문에 건물에 들어갈 수 없다면, 문제는 신체가 아니라 계단이라는 설계 장벽입니다. 장벽은 물리적 환경(계단, 좁은 통로)뿐 아니라 태도(편견, 낮은 기대), 제도(차별적 정책), 정보·통신(대체 텍스트 없는 이미지, 자막 없는 영상)에도 존재합니다.",
						"유엔 장애인권리협약(CRPD)은 사회 모델과 인권 접근을 채택한 국제 협약으로, 접근성을 시혜가 아닌 권리로 규정합니다. 한국을 포함한 190여 개국이 비준했으며, 합리적 편의제공 거부를 차별로 명시합니다. 접근성 전문가의 일은 사회 모델 관점에서 이러한 장벽을 찾아 제거하는 것입니다.",
					],
					en: [
						"The Social Model is the most important model for the CPACC exam. It argues that disability arises not from impairment itself, but from inaccessible environments and societal barriers. The key is distinguishing impairment from disability: impairment is a characteristic of a person's body or mind; disability is the result of barriers that prevent a person with that characteristic from participating in society.",
						"If a wheelchair user cannot enter a building because of stairs, the problem is the stairs — a design barrier — not the person. Barriers exist not only in the physical environment (stairs, narrow passages) but also in attitudes (prejudice, low expectations), institutions (discriminatory policies), and information and communication (images without alt text, videos without captions).",
						"The UN Convention on the Rights of Persons with Disabilities (CRPD) is the international treaty that adopts the Social Model and a human-rights approach, framing accessibility as a right rather than charity. Ratified by some 190 countries including South Korea, it explicitly defines denial of reasonable accommodation as discrimination. The accessibility professional's job is to identify and remove these barriers from a Social Model perspective.",
					],
				},
			},
			{
				heading: { ko: "생체심리사회 모델과 WHO ICF", en: "The Biopsychosocial Model and the WHO ICF" },
				paragraphs: {
					ko: [
						"생체심리사회 모델(Biopsychosocial Model)은 의료 모델과 사회 모델을 통합하려는 시도로, 생물학적·심리적·사회적 요인이 함께 장애 경험을 형성한다고 봅니다. WHO의 국제기능장애건강분류(ICF: International Classification of Functioning, Disability and Health)가 이 모델을 기반으로 합니다.",
						"ICF는 장애를 신체 기능·구조(body functions and structures), 활동(activities), 참여(participation)의 세 수준에서 파악하고, 여기에 환경적 요인과 개인적 요인이 상호작용한다고 설명합니다. 같은 손상이라도 환경에 따라 참여 제한의 정도가 달라진다는 점에서 사회 모델의 통찰을 수용하면서도, 건강 상태라는 의료적 측면을 함께 다룹니다.",
					],
					en: [
						"The Biopsychosocial Model attempts to integrate the Medical and Social Models, holding that biological, psychological, and social factors together shape the experience of disability. The WHO's International Classification of Functioning, Disability and Health (ICF) is based on this model.",
						"The ICF describes disability at three levels — body functions and structures, activities, and participation — interacting with environmental and personal factors. It embraces the Social Model's insight that the same impairment leads to different participation restrictions depending on the environment, while also addressing the medical dimension of health conditions.",
					],
				},
			},
			{
				heading: { ko: "그 밖의 모델들", en: "Other Models to Know" },
				paragraphs: {
					ko: [
						"경제 모델(Economic Model)은 장애를 노동 능력과 생산성의 관점에서 정의합니다. 복지 급여 자격 판정 등 정책에서 사용되지만, 사람의 가치를 경제적 기여로 축소한다는 비판이 있습니다.",
						"기능적 해결 모델(Functional Solutions Model)은 장애가 야기하는 기능적 제한을 기술과 서비스로 해결하는 실용적 접근입니다. 보조기술 개발이 대표적이며, 접근성 실무와 친화적이지만 근본적인 사회 변화보다 개별 해결에 치우칠 수 있습니다.",
						"사회 정체성/문화 소속 모델(Social Identity/Cultural Affiliation Model)은 장애를 자부심의 원천이자 문화적 정체성으로 봅니다. 수어를 제1언어로 쓰는 농(Deaf) 공동체가 대표적 예로, 자신들을 장애 집단이 아닌 언어적 소수자로 이해합니다. 시험에서는 각 모델의 이름, 관점, 장단점을 짝지을 수 있어야 합니다.",
					],
					en: [
						"The Economic Model defines disability in terms of ability to work and productivity. It underpins policies such as benefit eligibility, but is criticized for reducing a person's worth to economic contribution.",
						"The Functional Solutions Model is a pragmatic approach that addresses the functional limitations caused by disability through technology and services. Assistive technology development is the classic example. It aligns well with accessibility practice, but can favor individual fixes over deeper social change.",
						"The Social Identity/Cultural Affiliation Model views disability as a source of pride and cultural identity. The Deaf community, which uses sign language as its primary language, is the prime example — understanding itself as a linguistic minority rather than a disability group. For the exam, be able to match each model's name, perspective, strengths, and weaknesses.",
					],
				},
			},
		],
		questions: [
			{
				id: "cpacc-1-1-q1",
				question: {
					ko: "사회 모델(Social Model)에 따르면, 장애의 주된 원인은 무엇인가?",
					en: "According to the Social Model, what is the primary cause of disability?",
				},
				options: {
					a: { ko: "개인의 신체적·정신적 결함", en: "Personal physical or mental deficiency" },
					b: {
						ko: "접근 불가능한 환경과 사회적 장벽",
						en: "Inaccessible environments and societal barriers",
					},
					c: { ko: "유전적 요인", en: "Genetic factors" },
					d: { ko: "의료 기술의 부족", en: "Lack of medical technology" },
				},
				answer: "b",
				explanation: {
					ko: "사회 모델은 장애가 개인의 손상이 아닌 환경과 사회의 장벽에 의해 만들어진다고 봅니다. 접근성 전문가는 환경의 장벽을 제거하는 것을 목표로 합니다.",
					en: "The Social Model holds that disability is created by inaccessible environments and societal barriers, not by individual impairment. Accessibility professionals aim to remove those environmental barriers.",
				},
			},
			{
				id: "cpacc-1-1-q2",
				question: {
					ko: "WHO의 ICF(국제기능장애건강분류)는 어떤 장애 모델을 기반으로 하는가?",
					en: "Which disability model is the foundation of the WHO's ICF?",
				},
				options: {
					a: { ko: "의료 모델", en: "Medical Model" },
					b: { ko: "사회 모델", en: "Social Model" },
					c: { ko: "생체심리사회 모델", en: "Biopsychosocial Model" },
					d: { ko: "자선 모델", en: "Charity Model" },
				},
				answer: "c",
				explanation: {
					ko: "ICF는 생물학적, 심리적, 사회적 요인을 모두 통합한 생체심리사회 모델을 기반으로 합니다.",
					en: "The ICF is based on the Biopsychosocial Model, which integrates biological, psychological, and social factors.",
				},
			},
			{
				id: "cpacc-1-1-q3",
				question: {
					ko: "의료 모델(Medical Model)의 특징으로 옳은 것은?",
					en: "Which statement correctly describes the Medical Model?",
				},
				options: {
					a: {
						ko: "사회와 환경이 장벽을 만든다고 본다",
						en: "It views society and environment as creating barriers",
					},
					b: {
						ko: "장애를 개인의 신체적·정신적 결함으로 바라본다",
						en: "It views disability as a personal physical or mental deficiency",
					},
					c: {
						ko: "환경 개선을 통해 장애를 해결하려 한다",
						en: "It addresses disability by improving the environment",
					},
					d: { ko: "UN CRPD의 기반이 되는 모델이다", en: "It is the model adopted by the UN CRPD" },
				},
				answer: "b",
				explanation: {
					ko: "의료 모델은 장애를 개인의 결함으로 보고, 치료와 재활을 통해 개인을 정상 상태로 복귀시키는 것을 목표로 합니다.",
					en: "The Medical Model treats disability as a personal deficiency and aims to restore the individual to a 'normal' state through treatment and rehabilitation.",
				},
			},
			{
				id: "cpacc-1-1-q4",
				question: {
					ko: "UN 장애인권리협약(CRPD)은 어떤 장애 모델 관점을 채택하는가?",
					en: "Which disability model perspective does the UN CRPD adopt?",
				},
				options: {
					a: { ko: "의료 모델", en: "Medical Model" },
					b: { ko: "사회 모델", en: "Social Model" },
					c: { ko: "생체심리사회 모델", en: "Biopsychosocial Model" },
					d: { ko: "자선 모델", en: "Charity Model" },
				},
				answer: "b",
				explanation: {
					ko: "CRPD는 사회 모델 관점을 채택하여 장애인의 인권을 보장하고, 사회적 장벽을 제거할 것을 요구합니다.",
					en: "The CRPD adopts the Social Model, ensuring the human rights of persons with disabilities and requiring the removal of societal barriers.",
				},
			},
		],
	},

	{
		id: "cpacc-1-2",
		exam: "cpacc",
		domain: 1,
		order: 2,
		available: true,
		title: {
			ko: "시각 장애와 보조기술",
			en: "Visual Disabilities and Assistive Technologies",
		},
		summary: {
			ko: "시각 장애의 유형(전맹, 저시력, 색각 이상)과 각 유형에 맞는 보조기술—화면낭독기, 화면확대기, 점자 단말기—을 학습합니다.",
			en: "Learn about visual disability types (blindness, low vision, color blindness) and corresponding assistive technologies: screen readers, magnifiers, and Braille displays.",
		},
		objectives: {
			ko: [
				"전맹, 저시력, 색각 이상의 차이를 설명할 수 있다",
				"주요 화면낭독기 소프트웨어를 나열할 수 있다",
				"화면확대기와 점자 단말기의 용도를 설명할 수 있다",
				"색각 이상 사용자를 위한 설계 원칙을 이해한다",
			],
			en: [
				"Distinguish between blindness, low vision, and color blindness",
				"List major screen reader software products",
				"Explain the uses of screen magnifiers and Braille displays",
				"Understand design principles for users with color blindness",
			],
		},
		content: { ko: [], en: [] },
		sections: [
			{
				heading: { ko: "시각 장애의 스펙트럼", en: "The Spectrum of Visual Disabilities" },
				paragraphs: {
					ko: [
						"시각 장애는 크게 전맹(blindness), 저시력(low vision), 색각 이상(color blindness)으로 구분됩니다. WHO 추산으로 전 세계 약 22억 명이 어떤 형태로든 시각 손상을 갖고 있으며, 대부분은 전맹이 아니라 저시력입니다. 각 유형에 따라 사용하는 보조기술과 필요한 설계 배려가 다릅니다.",
						"전맹은 시각 정보를 전혀 또는 거의 활용할 수 없는 상태로, 화면의 모든 정보가 음성이나 점자 등 비시각적 형태로 제공되어야 합니다. 저시력은 교정 후에도 남는 상당한 시력 저하로, 시야 결손(중심·주변), 흐림, 눈부심 민감 등 양상이 다양합니다. 색각 이상은 특정 색 구분이 어려운 상태로 남성의 약 8%에서 나타나며, 적록 색각 이상이 가장 흔합니다.",
						"고령화도 중요한 맥락입니다. 황반변성, 녹내장, 백내장, 당뇨망막병증 등 주요 시각 질환은 연령과 함께 급증하므로, 시각 접근성은 노인 인구 전체와 직결됩니다.",
					],
					en: [
						"Visual disabilities are broadly divided into blindness, low vision, and color blindness. The WHO estimates about 2.2 billion people worldwide have some form of vision impairment — most with low vision rather than blindness. Each type calls for different assistive technologies and design considerations.",
						"Blindness means little or no usable vision: all on-screen information must be available in non-visual form such as speech or braille. Low vision is significant vision loss remaining after correction, with varied patterns — central or peripheral field loss, blur, glare sensitivity. Color blindness affects the ability to distinguish certain colors; it occurs in roughly 8% of men, with red-green deficiency most common.",
						"Aging is a critical context. Major eye conditions — macular degeneration, glaucoma, cataracts, diabetic retinopathy — rise sharply with age, making visual accessibility directly relevant to the entire older population.",
					],
				},
			},
			{
				heading: { ko: "화면낭독기와 탐색 방식", en: "Screen Readers and How Users Navigate" },
				paragraphs: {
					ko: [
						"화면낭독기(Screen Reader)는 화면의 텍스트와 인터페이스 정보를 음성 또는 점자로 변환하는 소프트웨어입니다. 주요 제품: JAWS(Windows, 유료), NVDA(Windows, 무료 오픈소스), VoiceOver(macOS·iOS, 내장), TalkBack(Android, 내장), Narrator(Windows, 내장).",
						"숙련된 화면낭독기 사용자는 페이지를 처음부터 끝까지 순서대로 듣지 않습니다. 제목(headings) 목록으로 구조를 훑고, 랜드마크로 영역을 건너뛰고, 링크 목록과 첫 글자 탐색으로 원하는 지점에 바로 이동합니다. 그래서 올바른 제목 계층과 랜드마크, 의미 있는 링크 텍스트가 화면낭독기 사용성의 핵심이 됩니다.",
						"화면낭독기는 개발자가 작성한 마크업을 재료로 동작합니다. 대체 텍스트가 없는 이미지는 파일명이 읽히거나 건너뛰어지고, 라벨 없는 입력 필드는 용도를 알 수 없습니다. 보조기술의 품질은 콘텐츠의 품질을 넘어설 수 없다는 점이 CPACC의 중요한 관점입니다.",
					],
					en: [
						"A screen reader converts on-screen text and interface information into speech or braille. Major products: JAWS (Windows, commercial), NVDA (Windows, free/open-source), VoiceOver (macOS/iOS, built-in), TalkBack (Android, built-in), and Narrator (Windows, built-in).",
						"Experienced screen reader users do not listen to a page from top to bottom. They skim structure through the headings list, jump between regions via landmarks, and move directly to targets using link lists and first-letter navigation. Proper heading hierarchy, landmarks, and meaningful link text are therefore central to screen reader usability.",
						"A screen reader can only work with the markup developers provide. Images without alt text are skipped or read as file names; unlabeled inputs give no clue to their purpose. A key CPACC insight: assistive technology can never be better than the content it is given.",
					],
				},
			},
			{
				heading: { ko: "저시력 보조기술", en: "Assistive Technology for Low Vision" },
				paragraphs: {
					ko: [
						"화면확대기(Screen Magnifier)는 화면을 확대하여 저시력 사용자가 콘텐츠를 볼 수 있게 합니다. ZoomText, MAGic이 대표적이며 Windows 돋보기, macOS 줌 기능도 널리 쓰입니다. 확대율은 20배 이상까지 지원되고, 확대와 음성 출력을 결합한 제품(예: ZoomText Fusion)도 있습니다.",
						"확대만이 전부가 아닙니다. 저시력 사용자는 고대비 모드, 색 반전, 큰 글꼴 설정, 커서·포인터 강조 등 운영체제의 다양한 시각 설정을 조합해 사용합니다. 콘텐츠가 200%로 확대해도 깨지지 않고(WCAG 1.4.4), 사용자 설정을 덮어쓰지 않는 것이 중요한 설계 요구사항입니다.",
					],
					en: [
						"Screen magnifiers enlarge on-screen content for users with low vision. ZoomText and MAGic are leading products, and built-in tools such as Windows Magnifier and macOS Zoom are widely used. Magnification can exceed 20x, and some products combine magnification with speech output (e.g., ZoomText Fusion).",
						"Magnification is not the whole story. Low-vision users combine operating-system settings — high contrast modes, color inversion, large fonts, cursor and pointer enhancement. Content must remain usable when enlarged to 200% (WCAG 1.4.4) and must not override user settings — key design requirements.",
					],
				},
			},
			{
				heading: { ko: "점자와 농맹", en: "Braille and DeafBlindness" },
				paragraphs: {
					ko: [
						"점자 단말기(Refreshable Braille Display)는 화면낭독기와 함께 사용되며, 전자적으로 점자 핀을 올리고 내려 텍스트를 실시간 점자로 표시합니다. 음성보다 정밀한 읽기(철자, 코드, 서식)가 필요할 때 특히 유용합니다.",
						"농맹(DeafBlind)은 시각과 청각 손상이 함께 있는 상태로, 음성 출력을 사용할 수 없기 때문에 점자 단말기가 사실상 유일한 디지털 접근 수단인 경우가 많습니다. 텍스트로 제공되지 않는 정보(자막 없는 오디오, 이미지 속 글자)는 농맹 사용자에게 완전히 차단된다는 점을 기억해야 합니다.",
					],
					en: [
						"A refreshable braille display works alongside a screen reader, raising and lowering pins electronically to render text as braille in real time. It is especially valuable when precise reading matters — spelling, code, formatting.",
						"DeafBlindness combines vision and hearing loss. Because speech output is unusable, a braille display is often the only practical means of digital access. Information not available as text — uncaptioned audio, text inside images — is completely blocked for DeafBlind users.",
					],
				},
			},
			{
				heading: { ko: "색각 이상과 설계 원칙", en: "Color Blindness and Design Principles" },
				paragraphs: {
					ko: [
						"색각 이상 사용자를 위한 첫 번째 원칙은 색상만으로 정보를 전달하지 않는 것입니다(WCAG 1.4.1, Level A). '빨간색 필드는 오류'처럼 색상 하나에 의존하면 안 되고, 아이콘·텍스트('오류')·패턴을 함께 제공해야 합니다. 차트에서는 색과 함께 모양이나 직접 라벨을 사용합니다.",
						"두 번째 원칙은 충분한 명도 대비입니다. WCAG AA는 일반 텍스트 4.5:1, 큰 텍스트와 UI 컴포넌트 3:1 이상을 요구합니다. 대비는 색각 이상뿐 아니라 저시력, 밝은 야외 화면 등 상황적 제약에도 함께 도움이 됩니다 — 접근성 개선이 모두를 돕는 전형적인 예입니다.",
					],
					en: [
						"The first principle for color blindness: never convey information through color alone (WCAG 1.4.1, Level A). Do not rely on 'red border means error' — pair color with icons, text ('Error'), or patterns. In charts, use shapes or direct labels alongside color.",
						"The second principle is sufficient luminance contrast. WCAG AA requires at least 4.5:1 for normal text and 3:1 for large text and UI components. Contrast helps not only color-blind users but also low-vision users and everyone facing situational constraints like sunlight glare — a classic example of accessibility benefiting all.",
					],
				},
			},
		],
		questions: [
			{
				id: "cpacc-1-2-q1",
				question: {
					ko: "다음 중 무료 오픈소스 화면낭독기는?",
					en: "Which of the following is a free, open-source screen reader?",
				},
				options: {
					a: { ko: "JAWS", en: "JAWS" },
					b: { ko: "ZoomText", en: "ZoomText" },
					c: { ko: "NVDA", en: "NVDA" },
					d: { ko: "MAGic", en: "MAGic" },
				},
				answer: "c",
				explanation: {
					ko: "NVDA(NonVisual Desktop Access)는 무료 오픈소스 화면낭독기로 Windows에서 사용됩니다. JAWS와 MAGic은 유료, ZoomText는 화면확대기입니다.",
					en: "NVDA (NonVisual Desktop Access) is a free, open-source screen reader for Windows. JAWS and MAGic are commercial. ZoomText is a screen magnifier.",
				},
			},
			{
				id: "cpacc-1-2-q2",
				question: {
					ko: "저시력(low vision) 사용자에게 가장 적합한 보조기술은?",
					en: "Which assistive technology is most appropriate for users with low vision?",
				},
				options: {
					a: { ko: "화면낭독기", en: "Screen reader" },
					b: { ko: "화면확대기", en: "Screen magnifier" },
					c: { ko: "스위치 접근", en: "Switch access" },
					d: { ko: "음성 인식 소프트웨어", en: "Voice recognition software" },
				},
				answer: "b",
				explanation: {
					ko: "저시력 사용자는 화면확대기를 사용해 화면을 확대하여 내용을 볼 수 있습니다. 화면낭독기는 주로 전맹 사용자를 위한 것입니다.",
					en: "Low vision users benefit from screen magnifiers to enlarge content. Screen readers are primarily for users who are blind.",
				},
			},
			{
				id: "cpacc-1-2-q3",
				question: {
					ko: "색각 이상 사용자를 위한 접근성 원칙으로 가장 옳은 것은?",
					en: "Which principle best addresses accessibility for users with color blindness?",
				},
				options: {
					a: { ko: "항상 흑백만 사용한다", en: "Always use only black and white" },
					b: {
						ko: "색상만으로 정보를 전달하지 않는다",
						en: "Never convey information through color alone",
					},
					c: { ko: "빨간색과 초록색 조합만 피한다", en: "Only avoid red and green combinations" },
					d: { ko: "대비를 최대한 높인다", en: "Maximize contrast as much as possible" },
				},
				answer: "b",
				explanation: {
					ko: "색상만으로 정보를 전달하면 색각 이상 사용자는 해당 정보를 인식할 수 없습니다. 색상 외에 텍스트, 아이콘, 패턴 등을 함께 사용해야 합니다.",
					en: "Conveying information through color alone excludes users with color blindness. Always pair color with text, icons, or patterns to ensure the information is accessible.",
				},
			},
		],
	},

	{
		id: "cpacc-1-3",
		exam: "cpacc",
		domain: 1,
		order: 3,
		available: true,
		title: { ko: "청각·언어 장애와 보조기술", en: "Auditory & Speech Disabilities and AT" },
		summary: {
			ko: "청각·언어 장애의 유형과 자막, 수어, 보청기, 인공와우 등의 보조기술을 학습합니다.",
			en: "Learn about auditory and speech disabilities and their assistive technologies.",
		},
		objectives: {
			ko: [
				"농인(Deaf)과 난청(Hard of Hearing)의 차이를 설명할 수 있다",
				"자막(captions)과 자막번역(subtitles)의 차이를 이해한다",
				"보청기와 인공와우의 용도를 설명할 수 있다",
				"언어 장애 사용자를 위한 보조기술을 나열할 수 있다",
			],
			en: [
				"Explain the difference between Deaf and Hard of Hearing",
				"Understand the difference between captions and subtitles",
				"Describe the purposes of hearing aids and cochlear implants",
				"List assistive technologies for users with speech disabilities",
			],
		},
		content: { ko: [], en: [] },
		sections: [
			{
				heading: { ko: "청각 장애의 유형과 농 문화", en: "Types of Hearing Loss and Deaf Culture" },
				paragraphs: {
					ko: [
						"청각 장애는 크게 농(Deaf)과 난청(Hard of Hearing)으로 구분됩니다. 농인은 일상적인 말소리를 들을 수 없는 수준의 청력 손실을 가진 사람으로, 주로 수어를 제1언어로 사용합니다. 난청은 부분적 청력 손실로, 보청기 등의 도움으로 음성을 일부 인식할 수 있습니다.",
						"문화적으로 'Deaf(대문자 D)'는 농인 공동체와 문화적 정체성을 의미합니다. 농 공동체는 스스로를 결핍된 집단이 아니라 고유한 언어(수어)와 문화를 가진 언어적 소수자로 이해합니다 — 1단원에서 배운 사회 정체성 모델의 대표 사례입니다.",
						"수어는 국가별로 다른 독립된 언어라는 점이 자주 출제됩니다. 한국수어(KSL), 미국수어(ASL), 영국수어(BSL)는 서로 다른 문법과 어휘를 가지며, 음성 언어를 손으로 옮긴 것이 아닙니다. 수어를 제1언어로 쓰는 농인에게 문어(글)는 제2언어일 수 있어, 긴 텍스트가 반드시 쉬운 대안이 아닐 수 있습니다.",
					],
					en: [
						"Hearing disabilities are broadly classified as Deaf and Hard of Hearing. Deaf individuals have profound hearing loss and typically use sign language as their primary language. Hard of Hearing refers to partial hearing loss; individuals may benefit from hearing aids.",
						"Culturally, 'Deaf' with a capital D refers to the Deaf community and cultural identity. The Deaf community understands itself not as a deficient group but as a linguistic minority with its own language (sign language) and culture — the prime example of the Social Identity Model from Unit 1.",
						"A frequently tested point: sign languages are independent languages that differ by country. Korean Sign Language (KSL), American Sign Language (ASL), and British Sign Language (BSL) have distinct grammar and vocabulary — they are not spoken language rendered by hand. For Deaf people whose first language is sign, written text can be a second language, so long text is not automatically an easy alternative.",
					],
				},
			},
			{
				heading: { ko: "자막과 대본", en: "Captions and Transcripts" },
				paragraphs: {
					ko: [
						"자막(Captions)은 동영상에서 대화뿐 아니라 효과음, 음악, 화자 식별 등 비음성 정보도 텍스트로 제공합니다. 개방형 자막(Open Captions)은 영상에 새겨져 항상 표시되고, 폐쇄형 자막(Closed Captions)은 사용자가 켜고 끌 수 있습니다. 자막번역(Subtitles)은 주로 다른 언어의 대화를 번역한 것으로 비음성 정보는 포함하지 않습니다.",
						"WCAG 기준: 미리 녹화된(prerecorded) 오디오·영상의 자막은 Level A(1.2.2), 실시간(live) 자막은 Level AA(1.2.4)입니다. 대본(Transcript)은 오디오 전체의 텍스트 기록으로, 팟캐스트 같은 오디오 전용 콘텐츠의 대안이며 검색·훑어읽기가 가능하다는 장점이 있습니다.",
						"자동 자막(ASR)의 품질 한계도 알아두어야 합니다. 자동 생성 자막은 고유명사·전문용어에서 오류가 잦아 그대로는 접근성 요구를 충족하기 어렵고, 사람의 검수·교정이 필요합니다.",
					],
					en: [
						"Captions provide text for dialogue plus non-speech information — sound effects, music, speaker identification. Open captions are burned into the video and always visible; closed captions can be toggled. Subtitles translate dialogue into another language and do not include non-speech information.",
						"WCAG levels: captions for prerecorded audio/video are Level A (1.2.2); captions for live content are Level AA (1.2.4). A transcript is a full text record of the audio — the alternative for audio-only content such as podcasts, with the added benefits of searchability and skimming.",
						"Know the limits of automatic captions (ASR). Auto-generated captions frequently err on proper nouns and technical terms, so they rarely meet accessibility requirements as-is — human review and correction are needed.",
					],
				},
			},
			{
				heading: { ko: "청각 보조기술", en: "Hearing Assistive Technologies" },
				paragraphs: {
					ko: [
						"보청기(Hearing Aid)는 소리를 증폭하여 난청인이 더 잘 들을 수 있게 합니다. 인공와우(Cochlear Implant)는 외과적으로 이식하는 장치로, 소리를 전기 신호로 변환하여 청신경을 직접 자극합니다. 두 기술은 난청의 정도와 원인에 따라 선택됩니다.",
						"보조청취장치(ALD: Assistive Listening Device)는 강연장·극장 같은 공공장소에서 음원을 잡음 없이 직접 전달합니다. 히어링 루프(유도 루프)와 텔레코일(T-coil), FM/적외선 시스템이 대표적이며, 건축 환경 접근성의 일부로 CPACC에 출제됩니다.",
						"통신 중계 서비스(Relay Service)는 농·난청인이 전화를 사용할 수 있게 하는 서비스로, 문자 중계(TRS)와 영상 수어 중계(VRS)가 있습니다. 디지털 서비스에서는 전화 전용 고객 지원 대신 채팅·이메일 등 텍스트 채널을 함께 제공해야 합니다.",
					],
					en: [
						"Hearing aids amplify sound for people who are hard of hearing. Cochlear implants are surgically implanted devices that convert sound into electrical signals and stimulate the auditory nerve directly. The choice depends on the degree and cause of hearing loss.",
						"Assistive Listening Devices (ALDs) deliver audio directly and cleanly in public venues such as lecture halls and theaters. Key examples: hearing (induction) loops with telecoils (T-coils), and FM/infrared systems — tested in CPACC as part of built-environment accessibility.",
						"Relay services enable Deaf and hard-of-hearing people to use the telephone: text relay (TRS) and video relay with sign language interpreters (VRS). Digital services should offer text channels (chat, email) alongside any phone-only support.",
					],
				},
			},
			{
				heading: { ko: "언어 장애와 AAC", en: "Speech Disabilities and AAC" },
				paragraphs: {
					ko: [
						"언어 장애(Speech Disability)는 말을 생성하거나 명확하게 발음하는 데 어려움이 있는 상태로, 말더듬(Stuttering), 실어증(Aphasia), 구음 장애(Dysarthria), 무발화(Mutism) 등이 포함됩니다. 실어증은 뇌 손상으로 언어의 이해·표현에 영향을 주며, 구음 장애는 발음 근육의 조절 문제입니다.",
						"보완대체의사소통(AAC: Augmentative and Alternative Communication)이 핵심 보조기술입니다. 텍스트를 음성으로 변환하는 음성생성장치(SGD), 그림 기호판, 태블릿 기반 AAC 앱 등이 있습니다. 물리학자 스티븐 호킹이 사용한 장치가 SGD의 유명한 예입니다.",
						"설계 시사점: 음성만 요구하는 인터페이스(음성 전용 인증, 전화 전용 접수)는 언어 장애 사용자를 배제합니다. WCAG의 관점에서도 음성 입력의 대안을 항상 제공해야 합니다.",
					],
					en: [
						"Speech disabilities affect producing or clearly articulating speech — including stuttering, aphasia, dysarthria, and mutism. Aphasia, caused by brain injury, affects understanding and expressing language; dysarthria involves control of the speech muscles.",
						"Augmentative and Alternative Communication (AAC) is the key assistive technology: Speech-Generating Devices (SGDs) that convert text to speech, picture symbol boards, and tablet-based AAC apps. The device used by physicist Stephen Hawking is a famous SGD example.",
						"Design implication: interfaces that require speech (voice-only verification, phone-only intake) exclude users with speech disabilities. Always provide alternatives to voice input.",
					],
				},
			},
		],
		questions: [
			{
				id: "cpacc-1-3-q1",
				question: {
					ko: "자막(Captions)과 자막번역(Subtitles)의 차이로 옳은 것은?",
					en: "What is the correct difference between captions and subtitles?",
				},
				options: {
					a: {
						ko: "자막은 대화만 포함하고, 자막번역은 효과음도 포함한다",
						en: "Captions include only dialogue; subtitles include sound effects",
					},
					b: {
						ko: "자막은 효과음·음악 등 비음성 정보도 포함하고, 자막번역은 주로 대화 번역만 포함한다",
						en: "Captions include non-speech information (sound effects, music); subtitles primarily translate dialogue only",
					},
					c: {
						ko: "두 용어는 동일한 의미이다",
						en: "The two terms mean the same thing",
					},
					d: {
						ko: "자막번역이 접근성 관점에서 더 우수하다",
						en: "Subtitles are better for accessibility",
					},
				},
				answer: "b",
				explanation: {
					ko: "자막(Captions)은 대화, 효과음, 음악, 화자 식별 등 모든 청각 정보를 텍스트로 제공합니다. 자막번역(Subtitles)은 주로 언어 번역 목적으로 대화만 포함합니다.",
					en: "Captions provide text for all audio information including dialogue, sound effects, music, and speaker identification. Subtitles primarily translate dialogue for language purposes.",
				},
			},
			{
				id: "cpacc-1-3-q2",
				question: {
					ko: "인공와우(Cochlear Implant)에 대한 설명으로 옳은 것은?",
					en: "Which statement correctly describes a cochlear implant?",
				},
				options: {
					a: {
						ko: "소리를 증폭하는 외부 장치이다",
						en: "It is an external device that amplifies sound",
					},
					b: {
						ko: "소리를 전기 신호로 변환하여 청신경을 직접 자극하는 이식형 장치이다",
						en: "It is a surgically implanted device that converts sound to electrical signals to stimulate the auditory nerve",
					},
					c: {
						ko: "텍스트를 음성으로 변환하는 소프트웨어이다",
						en: "It is software that converts text to speech",
					},
					d: {
						ko: "수어를 자동으로 번역하는 장치이다",
						en: "It is a device that automatically translates sign language",
					},
				},
				answer: "b",
				explanation: {
					ko: "인공와우는 외과적으로 이식하여 소리를 전기 신호로 변환해 청신경을 직접 자극합니다. 보청기(소리 증폭)와는 다른 방식입니다.",
					en: "A cochlear implant is surgically implanted and converts sound into electrical signals to directly stimulate the auditory nerve. It differs from hearing aids, which amplify sound.",
				},
			},
			{
				id: "cpacc-1-3-q3",
				question: {
					ko: "보완대체의사소통(AAC)에 해당하는 것은?",
					en: "Which of the following is an example of Augmentative and Alternative Communication (AAC)?",
				},
				options: {
					a: { ko: "보청기", en: "Hearing aid" },
					b: { ko: "화면낭독기", en: "Screen reader" },
					c: { ko: "음성생성장치(SGD)", en: "Speech-Generating Device (SGD)" },
					d: { ko: "화면확대기", en: "Screen magnifier" },
				},
				answer: "c",
				explanation: {
					ko: "AAC는 말을 보완하거나 대체하는 의사소통 방법으로, 음성생성장치(SGD)가 대표적입니다. 보청기는 청각 보조, 화면낭독기와 화면확대기는 시각 보조 기술입니다.",
					en: "AAC methods supplement or replace speech. SGDs are a primary AAC tool. Hearing aids assist hearing; screen readers and magnifiers assist vision.",
				},
			},
		],
	},
	{
		id: "cpacc-1-4",
		exam: "cpacc",
		domain: 1,
		order: 4,
		available: true,
		title: { ko: "운동·신체 장애와 보조기술", en: "Physical & Motor Disabilities and AT" },
		summary: {
			ko: "운동·신체 장애의 유형과 스위치 접근, 음성 인식, 대체 포인팅 장치 등을 학습합니다.",
			en: "Explore motor disabilities and AT including switch access and voice recognition.",
		},
		objectives: {
			ko: [
				"운동·신체 장애의 주요 유형을 나열할 수 있다",
				"스위치 접근 장치의 용도와 작동 방식을 설명할 수 있다",
				"음성 인식 기술이 운동 장애인에게 도움이 되는 이유를 설명할 수 있다",
				"키보드 접근성이 중요한 이유를 이해한다",
			],
			en: [
				"List the main types of motor and physical disabilities",
				"Explain the purpose and function of switch access devices",
				"Describe how voice recognition technology helps people with motor disabilities",
				"Understand why keyboard accessibility is essential",
			],
		},
		content: { ko: [], en: [] },
		sections: [
			{
				heading: { ko: "운동·신체 장애의 유형", en: "Types of Physical and Motor Disabilities" },
				paragraphs: {
					ko: [
						"운동·신체 장애는 손, 팔, 다리 등 신체 부위의 움직임에 제한이 있는 상태를 말합니다. 사지마비(Quadriplegia/Tetraplegia), 하반신 마비(Paraplegia), 근이영양증(Muscular Dystrophy), 뇌성마비(Cerebral Palsy), 관절염(Arthritis), 파킨슨병(Parkinson's Disease), 절단(Amputation), 반복사용 긴장 손상(RSI) 등이 포함됩니다.",
						"영향의 양상은 다양합니다. 어떤 사용자는 정밀한 조작(작은 버튼 클릭, 드래그)이 어렵고, 어떤 사용자는 떨림(진전) 때문에 의도치 않은 입력이 발생하며, 어떤 사용자는 지구력이 제한되어 긴 입력 과정에서 피로가 누적됩니다. 일시적 손상(팔 골절)과 상황적 제약(아기를 안은 한 손 조작)도 같은 설계 배려의 수혜자입니다.",
						"디지털 인터페이스에서의 함의: 클릭 대상은 충분히 크게(WCAG 2.5.8 타깃 크기, 24×24px 이상), 시간 제한은 조절 가능하게, 드래그 같은 복잡한 제스처에는 단순한 대안을 제공해야 합니다(WCAG 2.5.7).",
					],
					en: [
						"Physical and motor disabilities limit movement of the hands, arms, legs, or other body parts. They include quadriplegia/tetraplegia, paraplegia, muscular dystrophy, cerebral palsy, arthritis, Parkinson's disease, amputation, and repetitive strain injury (RSI).",
						"The effects vary. Some users struggle with precise operations (clicking small buttons, dragging); some experience tremor causing unintended input; others have limited stamina, with fatigue building through long input sequences. Temporary impairments (a broken arm) and situational limitations (one hand holding a baby) benefit from the same design considerations.",
						"Implications for digital interfaces: make click targets large enough (WCAG 2.5.8 Target Size, at least 24×24px), make time limits adjustable, and provide simple alternatives to complex gestures like dragging (WCAG 2.5.7).",
					],
				},
			},
			{
				heading: { ko: "스위치 접근과 스캐닝", en: "Switch Access and Scanning" },
				paragraphs: {
					ko: [
						"스위치 접근(Switch Access)은 하나 또는 소수의 버튼(스위치)만으로 컴퓨터를 조작하는 방법입니다. 화면 위의 항목을 순차적으로 하이라이트하고(스캐닝), 원하는 항목에서 스위치를 누르는 방식입니다. 스위치는 손가락, 머리, 무릎, 입, 눈 깜빡임 등 움직일 수 있는 어떤 신체 부위로든 작동할 수 있습니다.",
						"시프&퍼프(Sip-and-Puff)는 호흡(들이쉬기/내쉬기)으로 작동하는 특수 스위치로, 사지마비 사용자가 널리 사용합니다. 스캐닝 기반 입력은 항목 수가 많을수록 시간이 오래 걸리므로, 논리적인 포커스 순서와 단순한 구조가 스위치 사용자의 효율을 크게 좌우합니다.",
					],
					en: [
						"Switch access allows computer operation with one or a few buttons (switches). Items on screen are highlighted sequentially (scanning), and the user activates the switch when the desired item is highlighted. A switch can be operated by any movable body part — finger, head, knee, mouth, or an eye blink.",
						"A sip-and-puff switch is operated by breathing (inhale/exhale) and is widely used by people with quadriplegia. Because scanning takes longer as the number of items grows, logical focus order and simple structure strongly determine efficiency for switch users.",
					],
				},
			},
			{
				heading: { ko: "음성·시선·머리 제어", en: "Voice, Eye, and Head Control" },
				paragraphs: {
					ko: [
						"음성 인식(Voice/Speech Recognition)은 음성 명령으로 컴퓨터를 조작합니다. Dragon NaturallySpeaking이 대표적이며 운영체제 내장 음성 제어(Windows Voice Access, macOS Voice Control)도 발전했습니다. 타이핑이나 마우스 사용이 어려운 사용자에게 유용합니다.",
						"음성 제어 사용자는 화면에 보이는 라벨을 말해서 컨트롤을 실행합니다. 그래서 보이는 라벨과 접근 가능한 이름(accessible name)이 일치해야 한다는 WCAG 2.5.3(라벨 인 네임) 기준이 이 사용자층과 직결됩니다.",
						"시선 추적(Eye Tracking)은 눈의 움직임으로 커서를 제어하고, 머리 추적(Head Tracking)은 머리 움직임으로 포인터를 움직입니다. 온스크린 키보드, 드웰 클릭(일정 시간 응시로 클릭)과 결합해 손을 전혀 쓰지 않는 조작을 가능하게 합니다.",
					],
					en: [
						"Voice/speech recognition operates the computer through spoken commands. Dragon NaturallySpeaking is the leading product, and built-in OS voice control (Windows Voice Access, macOS Voice Control) has matured. It helps users who find typing or mouse use difficult.",
						"Voice control users activate controls by speaking their visible labels. This is why WCAG 2.5.3 (Label in Name) — the visible label must be contained in the accessible name — directly serves this user group.",
						"Eye tracking controls the cursor with eye movements; head tracking moves the pointer with head movements. Combined with on-screen keyboards and dwell clicking (fixating to click), they enable fully hands-free operation.",
					],
				},
			},
			{
				heading: { ko: "키보드 접근성과 적응형 하드웨어", en: "Keyboard Accessibility and Adaptive Hardware" },
				paragraphs: {
					ko: [
						"키보드 접근성은 운동 장애 사용자에게 특히 중요합니다. 많은 보조기술(스위치, 음성 제어, 대체 키보드)이 내부적으로 키보드 인터페이스를 거쳐 동작하기 때문에, 키보드로 안 되는 기능은 이들 기술로도 사용할 수 없습니다. WCAG 2.1.1(키보드)이 Level A인 이유입니다.",
						"적응형 하드웨어: 큰 키 키보드, 키가드(키 사이 경계판 — 떨림이 있는 사용자의 오타 방지), 한 손 키보드, 트랙볼·조이스틱 마우스, 발 스위치 등이 있습니다. 운영체제의 고정 키(Sticky Keys), 필터 키, 마우스 키 같은 소프트웨어 설정도 함께 알아두세요.",
					],
					en: [
						"Keyboard accessibility matters especially for motor disabilities. Many assistive technologies — switches, voice control, alternative keyboards — operate through the keyboard interface internally, so anything that can't be done with a keyboard can't be done with those technologies either. That is why WCAG 2.1.1 (Keyboard) is Level A.",
						"Adaptive hardware includes large-key keyboards, keyguards (raised borders between keys that prevent stray presses for users with tremor), one-handed keyboards, trackballs and joystick mice, and foot switches. Also know OS software features: Sticky Keys, Filter Keys, and Mouse Keys.",
					],
				},
			},
		],
		questions: [
			{
				id: "cpacc-1-4-q1",
				question: {
					ko: "스위치 접근(Switch Access)에 대한 설명으로 옳은 것은?",
					en: "Which statement correctly describes switch access?",
				},
				options: {
					a: { ko: "반드시 손으로만 조작 가능하다", en: "It can only be operated by hand" },
					b: {
						ko: "화면 항목을 순차적으로 스캔하고, 원하는 항목에서 스위치를 눌러 선택한다",
						en: "It scans screen items sequentially and the user activates the switch to select the desired item",
					},
					c: { ko: "마우스의 대체품이 아니라 보완품이다", en: "It supplements but does not replace a mouse" },
					d: { ko: "시각 장애인을 위한 보조기술이다", en: "It is an assistive technology for people who are blind" },
				},
				answer: "b",
				explanation: {
					ko: "스위치 접근은 화면 항목을 순차적으로 하이라이트(스캔)하고, 사용자가 원하는 항목에서 스위치를 눌러 선택하는 방식입니다. 손뿐 아니라 머리, 입, 눈 등으로도 조작 가능합니다.",
					en: "Switch access sequentially highlights (scans) screen items, and the user activates the switch to select the desired one. It can be operated by any body part, not just hands.",
				},
			},
			{
				id: "cpacc-1-4-q2",
				question: {
					ko: "WCAG 2.1.1 '키보드' 성공 기준의 적합성 수준은?",
					en: "What is the conformance level of WCAG 2.1.1 'Keyboard' success criterion?",
				},
				options: {
					a: { ko: "Level AAA", en: "Level AAA" },
					b: { ko: "Level AA", en: "Level AA" },
					c: { ko: "Level A", en: "Level A" },
					d: { ko: "권고사항이며 필수가 아니다", en: "It is a recommendation, not mandatory" },
				},
				answer: "c",
				explanation: {
					ko: "WCAG 2.1.1 키보드 성공 기준은 Level A로, 가장 기본적인 접근성 요구사항입니다. 모든 기능이 키보드로 작동 가능해야 합니다.",
					en: "WCAG 2.1.1 Keyboard is a Level A success criterion — the most basic accessibility requirement. All functionality must be keyboard-operable.",
				},
			},
			{
				id: "cpacc-1-4-q3",
				question: {
					ko: "시프&퍼프(Sip-and-Puff) 장치는 어떻게 작동하는가?",
					en: "How does a sip-and-puff device work?",
				},
				options: {
					a: { ko: "눈의 움직임으로 제어한다", en: "It is controlled by eye movements" },
					b: { ko: "호흡(들이쉬기/내쉬기)으로 작동한다", en: "It is operated by breathing (inhaling/exhaling)" },
					c: { ko: "머리 움직임으로 마우스를 제어한다", en: "It controls the mouse via head movements" },
					d: { ko: "음성 명령으로 작동한다", en: "It is operated by voice commands" },
				},
				answer: "b",
				explanation: {
					ko: "시프&퍼프는 들이쉬기(sip)와 내쉬기(puff)로 스위치를 작동시키는 장치입니다. 사지마비 등으로 손을 사용할 수 없는 사용자가 주로 사용합니다.",
					en: "A sip-and-puff device uses inhaling (sip) and exhaling (puff) to operate switches. It is primarily used by people with quadriplegia who cannot use their hands.",
				},
			},
		],
	},
	{
		id: "cpacc-1-5",
		exam: "cpacc",
		domain: 1,
		order: 5,
		available: true,
		title: { ko: "인지·신경 장애와 보조기술", en: "Cognitive & Neurological Disabilities and AT" },
		summary: {
			ko: "난독증, ADHD, ASD, 발작 장애 등 인지·신경 장애와 관련 설계 원칙을 학습합니다.",
			en: "Study cognitive and neurological disabilities and related design principles.",
		},
		objectives: {
			ko: [
				"주요 인지 장애 유형을 나열하고 설명할 수 있다",
				"발작 장애와 광과민성 발작의 관계를 이해한다",
				"인지 장애 사용자를 위한 웹 설계 원칙을 설명할 수 있다",
				"WCAG에서 인지 접근성 관련 성공 기준을 이해한다",
			],
			en: [
				"List and explain the main types of cognitive disabilities",
				"Understand the relationship between seizure disorders and photosensitive epilepsy",
				"Describe web design principles for users with cognitive disabilities",
				"Understand WCAG success criteria related to cognitive accessibility",
			],
		},
		content: { ko: [], en: [] },
		sections: [
			{
				heading: { ko: "인지 장애의 유형", en: "Types of Cognitive Disabilities" },
				paragraphs: {
					ko: [
						"인지 장애는 학습, 기억, 주의력, 문제 해결 등 정신적 과정에 영향을 미치는 광범위한 상태를 포함하며, 전 세계에서 가장 흔한 장애 범주입니다. 주요 유형: 지적 장애(Intellectual Disability), 학습 장애 — 난독증(Dyslexia, 읽기), 난산증(Dyscalculia, 수학), 난필증(Dysgraphia, 쓰기) —, ADHD(주의력결핍 과잉행동장애), ASD(자폐 스펙트럼 장애).",
						"기억에 영향을 주는 상태(치매, 뇌 손상 후유증)와 정신 건강 상태(불안, 우울)도 인지 부담과 상호작용합니다. 인지 장애는 겉으로 드러나지 않는 비가시적 장애인 경우가 많아, 설계 단계에서 잊히기 가장 쉬운 사용자층이기도 합니다.",
						"학습 장애는 지능의 문제가 아니라 특정 정보 처리 경로의 차이라는 점이 중요합니다. 난독증이 있는 사람은 듣기로는 동일한 내용을 잘 이해할 수 있습니다 — 대안 형식(음성, 영상)이 강력한 이유입니다.",
					],
					en: [
						"Cognitive disabilities encompass a broad range of conditions affecting learning, memory, attention, and problem-solving — the most common disability category worldwide. Key types: Intellectual Disability; learning disabilities — Dyslexia (reading), Dyscalculia (math), Dysgraphia (writing); ADHD; and Autism Spectrum Disorder (ASD).",
						"Conditions affecting memory (dementia, effects of brain injury) and mental health conditions (anxiety, depression) also interact with cognitive load. Cognitive disabilities are often invisible, making these users the easiest to forget during design.",
						"Learning disabilities are not a matter of intelligence but differences in specific information-processing pathways. A person with dyslexia may understand the same content perfectly well by listening — which is why alternative formats (audio, video) are powerful.",
					],
				},
			},
			{
				heading: { ko: "발작 장애 — 생명과 직결되는 기준", en: "Seizure Disorders — A Life-Critical Criterion" },
				paragraphs: {
					ko: [
						"신경 장애 중 발작 장애(Seizure Disorder/Epilepsy)는 접근성에서 특별한 위치를 갖습니다. 광과민성 발작(Photosensitive Epilepsy)은 특정 패턴의 깜빡이는 빛이나 빠른 시각 변화에 의해 유발될 수 있습니다.",
						"WCAG 2.3.1(세 번의 번쩍임 또는 임계값 이하, Level A)은 1초에 3번을 초과해 번쩍이는 콘텐츠를 금지합니다. 대부분의 접근성 기준이 '사용 가능성'에 관한 것이라면 이 기준은 신체적 해를 예방하는 기준으로, 문자 그대로 생명과 직결됩니다. 애니메이션·비디오·광고 검수에서 반드시 확인해야 합니다.",
					],
					en: [
						"Among neurological disabilities, seizure disorders (epilepsy) hold a special place in accessibility. Photosensitive epilepsy can be triggered by particular patterns of flashing light or rapid visual change.",
						"WCAG 2.3.1 (Three Flashes or Below Threshold, Level A) prohibits content that flashes more than three times per second. While most accessibility criteria concern usability, this one prevents physical harm — it is literally life-critical, and must be checked when reviewing animation, video, and ads.",
					],
				},
			},
			{
				heading: { ko: "인지 접근성 설계 원칙", en: "Design Principles for Cognitive Accessibility" },
				paragraphs: {
					ko: [
						"핵심 원칙: 간단하고 명확한 언어를 사용하고, 일관된 내비게이션과 레이아웃을 유지하며, 충분한 시간을 제공하고(WCAG 2.2.1 시간 조절, Level A), 산만한 요소(자동 재생 동영상, 움직이는 광고)를 최소화하고, 오류 예방과 복구를 쉽게 만듭니다.",
						"WCAG 2.2는 인지 접근성을 강화하는 기준을 추가했습니다: 3.3.8 접근 가능한 인증(퍼즐·암기 없이 로그인), 3.2.6 일관된 도움(도움 수단의 일관된 위치), 3.3.7 중복 입력(같은 정보 재입력 방지). 인지 과부하를 줄이는 방향성이 공통점입니다.",
						"W3C의 COGA(인지 접근성 태스크포스)는 'Making Content Usable' 가이드를 발행해 WCAG 기준 너머의 인지 접근성 지침을 제공합니다. 쉬운 언어(plain language), 명확한 구조, 사용자 통제가 핵심 주제입니다.",
					],
					en: [
						"Core principles: use simple, clear language; keep navigation and layout consistent; provide enough time (WCAG 2.2.1 Timing Adjustable, Level A); minimize distractions (auto-playing video, animated ads); and make error prevention and recovery easy.",
						"WCAG 2.2 added criteria that strengthen cognitive accessibility: 3.3.8 Accessible Authentication (login without puzzles or memorization), 3.2.6 Consistent Help (help found in a consistent place), 3.3.7 Redundant Entry (no re-entering the same information). Their common thread is reducing cognitive load.",
						"The W3C's COGA (Cognitive Accessibility) Task Force publishes 'Making Content Usable,' guidance that goes beyond WCAG criteria — plain language, clear structure, and user control are its central themes.",
					],
				},
			},
			{
				heading: { ko: "보조기술과 지원 도구", en: "Assistive Technologies and Supports" },
				paragraphs: {
					ko: [
						"텍스트 음성 변환(TTS)은 난독증 사용자가 텍스트를 음성으로 들을 수 있게 합니다. 워드 프레딕션은 입력 중 단어를 예측해 타이핑과 철자 부담을 줄입니다. 마인드 맵 소프트웨어는 아이디어를 시각적으로 정리하고, 캘린더·알림 앱은 기억을 보완합니다.",
						"읽기 지원 도구로는 난독증용 글꼴(OpenDyslexic 등), 줄 포커스·리더 모드, 텍스트 간격 조정이 있습니다. 다만 인지 접근성의 대부분은 특수 기술보다 콘텐츠 자체의 명료함 — 짧은 문장, 명확한 제목, 예측 가능한 상호작용 — 에서 나온다는 점이 CPACC의 관점입니다.",
					],
					en: [
						"Text-to-Speech (TTS) lets people with dyslexia hear text read aloud. Word prediction reduces typing and spelling effort by suggesting words during input. Mind-mapping software organizes ideas visually; calendar and reminder apps support memory.",
						"Reading supports include dyslexia-friendly fonts (e.g., OpenDyslexic), line focus and reader modes, and text spacing adjustments. Still, the CPACC perspective is that most cognitive accessibility comes not from special technology but from clarity of the content itself — short sentences, clear headings, predictable interactions.",
					],
				},
			},
		],
		questions: [
			{
				id: "cpacc-1-5-q1",
				question: {
					ko: "WCAG 2.3.1 '세 번의 번쩍임 또는 임계값 이하' 기준의 목적은?",
					en: "What is the purpose of WCAG 2.3.1 'Three Flashes or Below Threshold'?",
				},
				options: {
					a: { ko: "시각적 일관성을 유지하기 위해", en: "To maintain visual consistency" },
					b: {
						ko: "광과민성 발작을 유발할 수 있는 깜빡이는 콘텐츠를 방지하기 위해",
						en: "To prevent flashing content that could trigger photosensitive seizures",
					},
					c: { ko: "페이지 로딩 속도를 개선하기 위해", en: "To improve page loading speed" },
					d: { ko: "색각 이상 사용자를 지원하기 위해", en: "To support users with color blindness" },
				},
				answer: "b",
				explanation: {
					ko: "WCAG 2.3.1은 1초에 3번 이상 번쩍이는 콘텐츠를 금지하여 광과민성 발작을 예방합니다. 이 기준은 생명과 직결되는 중요한 접근성 요구사항입니다.",
					en: "WCAG 2.3.1 prohibits content that flashes more than three times per second to prevent photosensitive seizures. This is a life-critical accessibility requirement.",
				},
			},
			{
				id: "cpacc-1-5-q2",
				question: {
					ko: "난독증(Dyslexia)에 대한 설명으로 옳은 것은?",
					en: "Which statement correctly describes dyslexia?",
				},
				options: {
					a: { ko: "수학 학습에 어려움이 있는 장애", en: "A disability affecting math learning" },
					b: { ko: "쓰기에 어려움이 있는 장애", en: "A disability affecting writing" },
					c: { ko: "읽기에 어려움이 있는 학습 장애", en: "A learning disability affecting reading" },
					d: { ko: "주의력에 문제가 있는 장애", en: "A disability affecting attention" },
				},
				answer: "c",
				explanation: {
					ko: "난독증(Dyslexia)은 읽기 능력에 영향을 미치는 학습 장애입니다. 수학은 난산증(Dyscalculia), 쓰기는 난필증(Dysgraphia), 주의력은 ADHD와 관련됩니다.",
					en: "Dyslexia is a learning disability that affects reading ability. Math difficulties are dyscalculia, writing difficulties are dysgraphia, and attention issues relate to ADHD.",
				},
			},
			{
				id: "cpacc-1-5-q3",
				question: {
					ko: "인지 장애 사용자를 위한 웹 접근성 설계 원칙이 아닌 것은?",
					en: "Which is NOT a web accessibility design principle for users with cognitive disabilities?",
				},
				options: {
					a: { ko: "간단하고 명확한 언어 사용", en: "Use simple, clear language" },
					b: { ko: "일관된 내비게이션 유지", en: "Maintain consistent navigation" },
					c: {
						ko: "가능한 많은 정보를 한 페이지에 표시",
						en: "Display as much information as possible on one page",
					},
					d: { ko: "충분한 시간 제공", en: "Provide enough time" },
				},
				answer: "c",
				explanation: {
					ko: "인지 장애 사용자를 위해서는 정보 과부하를 피하고, 간단한 언어, 일관된 내비게이션, 충분한 시간 제공이 중요합니다. 한 페이지에 너무 많은 정보를 표시하면 인지 부담이 커집니다.",
					en: "For cognitive accessibility, avoid information overload. Use simple language, consistent navigation, and allow enough time. Displaying too much information on one page increases cognitive load.",
				},
			},
		],
	},

	// ── Domain 2 ──────────────────────────────────────────────────────────────
	{
		id: "cpacc-2-1",
		exam: "cpacc",
		domain: 2,
		order: 1,
		available: true,
		title: {
			ko: "보편적 설계 원칙",
			en: "Principles of Universal Design",
		},
		summary: {
			ko: "보편적 설계(Universal Design)의 7가지 원칙을 이해하고, 개별 편의 제공과의 차이를 학습합니다.",
			en: "Understand the 7 Principles of Universal Design and how it differs from individual accommodation.",
		},
		objectives: {
			ko: [
				"보편적 설계 7원칙을 나열하고 설명할 수 있다",
				"보편적 설계와 개별 편의 제공의 차이를 설명할 수 있다",
				"보편적 설계의 실생활 적용 예시를 들 수 있다",
				"Ronald Mace와 보편적 설계의 기원을 설명할 수 있다",
			],
			en: [
				"List and explain the 7 Principles of Universal Design",
				"Distinguish between Universal Design and reasonable accommodation",
				"Give real-world examples of Universal Design",
				"Describe the origin of Universal Design and Ronald Mace's role",
			],
		},
		content: { ko: [], en: [] },
		sections: [
			{
				heading: { ko: "보편적 설계란 무엇인가", en: "What Is Universal Design?" },
				paragraphs: {
					ko: [
						"보편적 설계(Universal Design)란 별도의 개조나 특수 설계 없이, 가능한 한 모든 사람이 사용할 수 있도록 제품과 환경을 처음부터 설계하는 개념입니다. 미국 NC State University의 건축가 Ronald Mace가 제창했으며, 그 자신이 휠체어 사용자였습니다.",
						"'연석 경사로 효과(Curb Cut Effect)'가 이 철학을 잘 보여줍니다. 보도 턱을 깎아 만든 경사로는 휠체어 사용자를 위해 도입됐지만, 유모차·자전거·여행 가방·배달 카트 사용자 모두에게 혜택을 주었습니다. 특정 집단을 위한 설계가 모두의 경험을 개선한다는 것이 보편적 설계의 핵심 통찰입니다.",
					],
					en: [
						"Universal Design is the design of products and environments to be usable by all people, to the greatest extent possible, without the need for adaptation or specialized design. It was pioneered by architect Ronald Mace at NC State University — himself a wheelchair user.",
						"The 'Curb Cut Effect' captures the philosophy. Curb cuts were introduced for wheelchair users, but they benefit everyone with strollers, bicycles, suitcases, and delivery carts. The core insight of Universal Design: designing for a specific group improves the experience for all.",
					],
				},
			},
			{
				heading: { ko: "7원칙 — 앞의 네 가지", en: "The Seven Principles — First Four" },
				paragraphs: {
					ko: [
						"① 공평한 사용(Equitable Use): 다양한 능력의 사용자에게 동일하거나 동등한 사용 방식을 제공하고, 누구도 분리하거나 낙인찍지 않습니다. 예: 모두가 같은 입구로 들어가는 자동문. ② 사용의 유연성(Flexibility in Use): 다양한 취향과 능력을 수용합니다. 예: 왼손·오른손 모두 쓸 수 있는 가위, 속도 조절이 되는 동영상 플레이어.",
						"③ 간단하고 직관적인 사용(Simple and Intuitive Use): 경험, 지식, 언어 능력, 집중도와 관계없이 사용법을 쉽게 이해할 수 있어야 합니다. 예: 그림으로 표시된 조립 설명서. ④ 인지 가능한 정보(Perceptible Information): 주변 조건이나 사용자의 감각 능력과 무관하게 필요한 정보를 효과적으로 전달합니다. 예: 시각+청각+촉각으로 함께 알리는 승강기 도착 신호.",
					],
					en: [
						"① Equitable Use: provide the same or equivalent means of use for people with diverse abilities, segregating or stigmatizing no one. Example: automatic doors everyone enters through. ② Flexibility in Use: accommodate a wide range of preferences and abilities. Examples: scissors usable left- or right-handed; a video player with adjustable speed.",
						"③ Simple and Intuitive Use: easy to understand regardless of experience, knowledge, language skills, or concentration. Example: assembly instructions using pictures. ④ Perceptible Information: communicate necessary information effectively regardless of ambient conditions or the user's sensory abilities. Example: elevator arrival signaled visually, audibly, and tactilely at once.",
					],
				},
			},
			{
				heading: { ko: "7원칙 — 나머지 세 가지", en: "The Seven Principles — Last Three" },
				paragraphs: {
					ko: [
						"⑤ 오류에 대한 관용(Tolerance for Error): 우발적이거나 의도치 않은 행동의 위험과 부정적 결과를 최소화합니다. 예: 실행 취소(Undo), 삭제 전 확인 대화상자, 위험 요소를 가장 멀리 배치하는 배열. ⑥ 낮은 신체적 노력(Low Physical Effort): 효율적이고 편안하게, 최소한의 피로로 사용할 수 있어야 합니다. 예: 레버형 문손잡이, 원터치 수전.",
						"⑦ 접근과 사용을 위한 충분한 크기와 공간(Size and Space for Approach and Use): 사용자의 신체 크기, 자세, 이동성과 무관하게 접근·조작할 수 있는 공간을 제공합니다. 예: 휠체어가 회전할 수 있는 넓은 통로, 앉거나 서서 닿는 조작부 높이. 시험에서는 각 원칙의 이름과 사례를 정확히 짝지을 수 있어야 합니다.",
					],
					en: [
						"⑤ Tolerance for Error: minimize hazards and adverse consequences of accidental or unintended actions. Examples: undo functions, confirmation dialogs before deletion, arranging hazardous elements farthest away. ⑥ Low Physical Effort: usable efficiently and comfortably with minimal fatigue. Examples: lever door handles, single-touch faucets.",
						"⑦ Size and Space for Approach and Use: provide appropriate size and space for approach, reach, and operation regardless of body size, posture, or mobility. Examples: corridors wide enough for a wheelchair to turn; controls reachable seated or standing. For the exam, be able to match each principle's name with its examples precisely.",
					],
				},
			},
			{
				heading: { ko: "보편적 설계 vs 접근성 vs 개별 편의 제공", en: "Universal Design vs Accessibility vs Accommodation" },
				paragraphs: {
					ko: [
						"보편적 설계는 처음부터 모든 사람을 위해 설계하는 사전적(proactive) 접근입니다. 개별 편의 제공(Reasonable Accommodation)은 특정 개인의 필요에 맞춰 사후에 조정하는 사후적(reactive) 접근으로, 시간과 비용이 더 들 수 있습니다. 보편적 설계가 선호되지만 모든 개인의 필요를 예측할 수는 없으므로, 실무에서는 두 접근이 상호 보완적으로 쓰입니다.",
						"접근성(Accessibility)이 장애인의 사용 가능성에 초점을 둔다면, 보편적 설계는 장애를 포함한 모든 다양성(연령, 언어, 상황)을 대상으로 하는 더 넓은 설계 철학입니다. 유사 개념으로 포용적 설계(Inclusive Design)가 있으며, 이는 배제된 사용자로부터 배우고 다양성을 설계 과정에 참여시키는 방법론적 측면을 강조합니다.",
					],
					en: [
						"Universal Design is proactive — designing for everyone from the start. Reasonable Accommodation is reactive — adjusting after the fact for a specific individual, often at greater time and cost. Universal Design is preferred, but no design anticipates every individual need, so in practice the two approaches complement each other.",
						"Where accessibility focuses on usability for people with disabilities, Universal Design is a broader design philosophy addressing all human diversity — age, language, circumstance — including disability. The related concept of Inclusive Design emphasizes methodology: learning from excluded users and involving diverse people in the design process.",
					],
				},
			},
			{
				heading: { ko: "실생활과 디지털의 적용", en: "Applications: Physical and Digital" },
				paragraphs: {
					ko: [
						"물리적 예시: 경사로(계단과 함께 제공), 자동문(유모차·휠체어·짐을 든 사람 모두에게 편리), 큰 글씨 버튼(노인·임시 부상자·모든 사용자에게 유용), 저상 버스, 레버형 손잡이.",
						"디지털 예시: 자막(청각 장애인뿐 아니라 소음 환경·언어 학습자에게도 유용), 음성 비서, 다크 모드와 글자 크기 설정, 자동 완성, 명확한 오류 메시지. 이처럼 보편적 설계는 특정 장애인만을 위한 것이 아니라 모든 사람의 경험을 개선하며, 이것이 접근성의 비즈니스 사례를 구성하는 핵심 논거이기도 합니다.",
					],
					en: [
						"Physical examples: ramps (alongside stairs), automatic doors (convenient for strollers, wheelchairs, anyone carrying loads), large-print buttons (useful for older adults, people with temporary injuries, everyone), low-floor buses, lever handles.",
						"Digital examples: captions (useful not only for hearing loss but in noisy places and for language learners), voice assistants, dark mode and text-size settings, autocomplete, clear error messages. Universal Design improves the experience for all users — which is also a core argument in the business case for accessibility.",
					],
				},
			},
		],
		questions: [
			{
				id: "cpacc-2-1-q1",
				question: {
					ko: "보편적 설계(Universal Design)를 처음 제창한 사람은?",
					en: "Who pioneered the concept of Universal Design?",
				},
				options: {
					a: { ko: "Tim Berners-Lee", en: "Tim Berners-Lee" },
					b: { ko: "Ronald Mace", en: "Ronald Mace" },
					c: { ko: "Gregg Vanderheiden", en: "Gregg Vanderheiden" },
					d: { ko: "Judy Heumann", en: "Judy Heumann" },
				},
				answer: "b",
				explanation: {
					ko: "보편적 설계는 미국 NC State University의 건축가 Ronald Mace가 제창한 개념입니다.",
					en: "Universal Design was pioneered by architect Ronald Mace at NC State University.",
				},
			},
			{
				id: "cpacc-2-1-q2",
				question: {
					ko: "보편적 설계 원칙 중 '다양한 개인 취향과 능력을 수용한다'에 해당하는 원칙은?",
					en: "Which Universal Design principle means 'accommodating a wide range of preferences and abilities'?",
				},
				options: {
					a: { ko: "공평한 사용", en: "Equitable Use" },
					b: { ko: "사용의 유연성", en: "Flexibility in Use" },
					c: { ko: "간단하고 직관적인 사용", en: "Simple and Intuitive Use" },
					d: { ko: "오류에 대한 관용", en: "Tolerance for Error" },
				},
				answer: "b",
				explanation: {
					ko: "사용의 유연성(Flexibility in Use)은 다양한 사용자의 취향과 능력을 수용하는 원칙입니다.",
					en: "Flexibility in Use is the principle that accommodates a wide range of individual preferences and abilities.",
				},
			},
			{
				id: "cpacc-2-1-q3",
				question: {
					ko: "보편적 설계와 개별 편의 제공(Reasonable Accommodation)의 차이로 옳은 것은?",
					en: "Which statement correctly describes the difference between Universal Design and Reasonable Accommodation?",
				},
				options: {
					a: {
						ko: "개별 편의 제공이 항상 보편적 설계보다 선호된다",
						en: "Reasonable Accommodation is always preferred over Universal Design",
					},
					b: {
						ko: "보편적 설계는 처음부터 모든 사람을 위해 설계하고, 개별 편의 제공은 사후에 특정 개인을 위해 제공한다",
						en: "Universal Design is proactive design for all; Reasonable Accommodation is reactive adjustment for a specific individual",
					},
					c: { ko: "두 개념은 동일한 의미다", en: "The two concepts mean the same thing" },
					d: {
						ko: "보편적 설계는 장애인만을 위한 것이다",
						en: "Universal Design is only for people with disabilities",
					},
				},
				answer: "b",
				explanation: {
					ko: "보편적 설계는 처음부터 모든 사람을 위해 설계하는 사전적 접근이고, 개별 편의 제공은 특정 개인을 위해 사후에 조정하는 사후적 접근입니다.",
					en: "Universal Design is a proactive approach that designs for everyone from the start. Reasonable Accommodation is a reactive adjustment made for a specific individual after the fact.",
				},
			},
		],
	},

	{
		id: "cpacc-2-2",
		exam: "cpacc",
		domain: 2,
		order: 2,
		available: true,
		title: { ko: "WCAG 개요 및 POUR 원칙", en: "WCAG Overview and POUR Principles" },
		summary: {
			ko: "WCAG 2.1/2.2의 4가지 POUR 원칙과 구조를 학습합니다.",
			en: "Study the POUR principles and structure of WCAG 2.1/2.2.",
		},
		objectives: {
			ko: [
				"WCAG의 목적과 W3C/WAI의 역할을 설명할 수 있다",
				"POUR 4원칙을 나열하고 각각을 설명할 수 있다",
				"WCAG의 계층 구조(원칙→지침→성공 기준→기법)를 이해한다",
				"WCAG 2.0, 2.1, 2.2의 발전 과정을 설명할 수 있다",
			],
			en: [
				"Explain the purpose of WCAG and the role of W3C/WAI",
				"List and describe the four POUR principles",
				"Understand the WCAG hierarchy: Principles → Guidelines → Success Criteria → Techniques",
				"Describe the evolution from WCAG 2.0 to 2.1 to 2.2",
			],
		},
		content: { ko: [], en: [] },
		sections: [
			{
				heading: { ko: "WCAG의 위상과 역사", en: "What WCAG Is and Where It Came From" },
				paragraphs: {
					ko: [
						"WCAG(Web Content Accessibility Guidelines)는 W3C의 WAI(Web Accessibility Initiative)에서 개발한 웹 접근성 국제 표준으로, 웹 콘텐츠를 장애인이 사용할 수 있게 하는 기술적 기준을 제공합니다. WCAG 1.0(1999)에서 출발해 2.0(2008), 2.1(2018), 2.2(2023)로 발전했으며, 각 버전은 이전 버전과 하위 호환됩니다.",
						"WCAG 2.0은 ISO/IEC 40500 국제 표준으로도 채택되어, 전 세계 접근성 법률과 표준(Section 508, EN 301 549, KWCAG 등)의 공통 기반이 되었습니다. '웹' 지침이지만 원칙과 다수 기준은 문서·모바일 앱 등 비웹 ICT에도 준용됩니다(WCAG2ICT).",
					],
					en: [
						"WCAG (Web Content Accessibility Guidelines) is the international web accessibility standard developed by the W3C's Web Accessibility Initiative (WAI), providing technical criteria for making web content accessible to people with disabilities. Starting from WCAG 1.0 (1999), it evolved through 2.0 (2008), 2.1 (2018), and 2.2 (2023), each backward-compatible.",
						"WCAG 2.0 was also adopted as international standard ISO/IEC 40500, making it the common foundation of accessibility laws and standards worldwide — Section 508, EN 301 549, KWCAG, and more. Though written for the web, its principles and many criteria are applied to non-web ICT such as documents and mobile apps (WCAG2ICT).",
					],
				},
			},
			{
				heading: { ko: "POUR — 인식 가능과 운용 가능", en: "POUR — Perceivable and Operable" },
				paragraphs: {
					ko: [
						"① 인식 가능(Perceivable): 정보와 UI 구성요소는 사용자가 인식할 수 있는 방식으로 제공되어야 합니다. 어떤 감각으로도 닿을 수 없는 정보는 존재하지 않는 것과 같습니다. 텍스트 대안(1.1), 시간 기반 미디어의 자막·대본(1.2), 적응 가능한 구조(1.3), 색상 대비와 구별 가능성(1.4)이 여기에 속합니다.",
						"② 운용 가능(Operable): UI 구성요소와 내비게이션은 조작 가능해야 합니다. 사용자가 수행할 수 없는 상호작용을 요구하면 안 됩니다. 키보드 접근(2.1), 충분한 시간(2.2), 발작 예방(2.3), 탐색 가능성(2.4), 다양한 입력 방식(2.5)이 포함됩니다.",
					],
					en: [
						"① Perceivable: information and UI components must be presentable in ways users can perceive — information no sense can reach might as well not exist. This covers text alternatives (1.1), captions and transcripts for time-based media (1.2), adaptable structure (1.3), and contrast and distinguishability (1.4).",
						"② Operable: UI components and navigation must be operable — the interface cannot require an interaction the user cannot perform. This covers keyboard access (2.1), enough time (2.2), seizure prevention (2.3), navigability (2.4), and input modalities (2.5).",
					],
				},
			},
			{
				heading: { ko: "POUR — 이해 가능과 견고", en: "POUR — Understandable and Robust" },
				paragraphs: {
					ko: [
						"③ 이해 가능(Understandable): 정보와 UI의 조작 방법을 이해할 수 있어야 합니다. 읽기 쉬움과 언어 명시(3.1), 예측 가능한 동작(3.2), 입력 도움과 오류 처리(3.3)가 해당됩니다. 콘텐츠가 인식·조작 가능해도 이해할 수 없다면 사용할 수 없습니다.",
						"④ 견고(Robust): 콘텐츠는 보조기술을 포함한 다양한 사용자 에이전트가 신뢰성 있게 해석할 수 있어야 합니다. 올바른 HTML 마크업과 name/role/value 노출(4.1)이 핵심이며, 기술이 발전해도 콘텐츠가 계속 접근 가능하도록 하는 미래 호환성의 원칙입니다.",
					],
					en: [
						"③ Understandable: information and the operation of the UI must be understandable — readability and language declaration (3.1), predictable behavior (3.2), input assistance and error handling (3.3). Content that can be perceived and operated but not understood is still unusable.",
						"④ Robust: content must be reliably interpretable by a wide variety of user agents, including assistive technologies. Proper HTML markup and exposing name/role/value (4.1) are central — a forward-compatibility principle keeping content accessible as technology evolves.",
					],
				},
			},
			{
				heading: { ko: "계층 구조와 버전별 변화", en: "The Hierarchy and What Each Version Added" },
				paragraphs: {
					ko: [
						"WCAG의 계층 구조: 4개 원칙(POUR) → 13개 지침(Guidelines) → 성공 기준(Success Criteria, A/AA/AAA 등급) → 충분 기법과 참고 기법. 성공 기준은 테스트 가능한 구체적 요구사항이고, 기법은 이를 달성하는 방법 예시(규범이 아닌 정보성)입니다. WCAG 2.2 기준 총 87개(2.0의 61개 + 2.1의 17개 + 2.2의 9개)이며, 2.2에서 4.1.1 구문 분석이 제거되었습니다.",
						"버전별 초점: 2.1은 모바일, 저시력, 인지 장애 사용자를 위한 기준을 추가했고(예: 리플로우, 텍스트 간격, 포인터 제스처), 2.2는 인지 접근성과 운동 접근성을 더 강화했습니다(예: 접근 가능한 인증, 포커스 가림 방지, 드래그 대안, 타깃 크기). 차기 WCAG 3(Silver)는 등급 체계 자체를 바꾸는 큰 개편으로 개발 중입니다.",
					],
					en: [
						"WCAG's hierarchy: 4 Principles (POUR) → 13 Guidelines → Success Criteria (graded A/AA/AAA) → Sufficient and Advisory Techniques. Success criteria are specific, testable requirements; techniques are informative (non-normative) examples of how to meet them. WCAG 2.2 totals 87 criteria (61 from 2.0 + 17 from 2.1 + 9 from 2.2), with 4.1.1 Parsing removed in 2.2.",
						"Version focus: 2.1 added criteria for mobile, low-vision, and cognitive users (e.g., Reflow, Text Spacing, Pointer Gestures); 2.2 further strengthened cognitive and motor accessibility (e.g., Accessible Authentication, Focus Not Obscured, Dragging Movements, Target Size). WCAG 3 (Silver), a major overhaul rethinking the grading system itself, is under development.",
					],
				},
			},
		],
		questions: [
			{
				id: "cpacc-2-2-q1",
				question: {
					ko: "POUR 원칙에서 '키보드 접근성'은 어떤 원칙에 해당하는가?",
					en: "Under which POUR principle does 'keyboard accessibility' fall?",
				},
				options: {
					a: { ko: "인식 가능(Perceivable)", en: "Perceivable" },
					b: { ko: "운용 가능(Operable)", en: "Operable" },
					c: { ko: "이해 가능(Understandable)", en: "Understandable" },
					d: { ko: "견고(Robust)", en: "Robust" },
				},
				answer: "b",
				explanation: {
					ko: "키보드 접근성은 UI 구성요소의 조작과 관련되므로 '운용 가능(Operable)' 원칙에 해당합니다.",
					en: "Keyboard accessibility relates to operating UI components, so it falls under the 'Operable' principle.",
				},
			},
			{
				id: "cpacc-2-2-q2",
				question: {
					ko: "WCAG를 개발하는 조직은?",
					en: "Which organization develops WCAG?",
				},
				options: {
					a: { ko: "IAAP", en: "IAAP" },
					b: { ko: "ISO", en: "ISO" },
					c: { ko: "W3C WAI", en: "W3C WAI" },
					d: { ko: "UN", en: "UN" },
				},
				answer: "c",
				explanation: {
					ko: "WCAG는 W3C(World Wide Web Consortium)의 WAI(Web Accessibility Initiative)에서 개발합니다.",
					en: "WCAG is developed by the W3C's Web Accessibility Initiative (WAI).",
				},
			},
			{
				id: "cpacc-2-2-q3",
				question: {
					ko: "POUR에서 '올바른 HTML 마크업과 ARIA 사용'은 어떤 원칙에 해당하는가?",
					en: "Under which POUR principle does 'proper HTML markup and ARIA usage' fall?",
				},
				options: {
					a: { ko: "인식 가능(Perceivable)", en: "Perceivable" },
					b: { ko: "운용 가능(Operable)", en: "Operable" },
					c: { ko: "이해 가능(Understandable)", en: "Understandable" },
					d: { ko: "견고(Robust)", en: "Robust" },
				},
				answer: "d",
				explanation: {
					ko: "견고(Robust) 원칙은 다양한 사용자 에이전트와 보조기술에서 콘텐츠가 안정적으로 해석되도록 요구합니다. 올바른 마크업과 ARIA가 핵심입니다.",
					en: "The Robust principle requires content to be reliably interpreted by diverse user agents and assistive technologies. Proper markup and ARIA are key.",
				},
			},
		],
	},
	{
		id: "cpacc-2-3",
		exam: "cpacc",
		domain: 2,
		order: 3,
		available: true,
		title: { ko: "적합성 수준과 성공 기준", en: "Conformance Levels and Success Criteria" },
		summary: {
			ko: "WCAG A, AA, AAA 수준의 차이와 각 수준의 성공 기준을 학습합니다.",
			en: "Learn the differences between WCAG A, AA, and AAA conformance levels.",
		},
		objectives: {
			ko: [
				"Level A, AA, AAA의 차이를 설명할 수 있다",
				"법적으로 가장 많이 요구되는 적합성 수준을 알고 있다",
				"주요 성공 기준의 수준을 구분할 수 있다",
				"적합성 선언의 조건을 이해한다",
			],
			en: [
				"Explain the differences between Level A, AA, and AAA",
				"Know which conformance level is most commonly legally required",
				"Classify key success criteria by their level",
				"Understand conformance claim conditions",
			],
		},
		content: { ko: [], en: [] },
		sections: [
			{
				heading: { ko: "세 가지 적합성 수준", en: "The Three Conformance Levels" },
				paragraphs: {
					ko: [
						"WCAG는 세 가지 적합성 수준을 정의합니다. Level A는 가장 기본적인 접근성으로, 충족하지 않으면 일부 장애인이 콘텐츠를 전혀 사용할 수 없는 수준입니다. 예: 텍스트 대안(1.1.1), 키보드 접근(2.1.1), 세 번의 번쩍임 방지(2.3.1).",
						"Level AA는 대부분의 법률과 정책이 요구하는 사실상의 표준입니다. 예: 색상 대비 4.5:1(1.4.3), 텍스트 크기 조절(1.4.4), 가시적 포커스(2.4.7), 일관된 내비게이션(3.2.3). Level AAA는 가장 높은 수준으로 색상 대비 7:1(1.4.6), 수어 제공(1.2.6) 등이 있으며, W3C는 일부 콘텐츠에는 AAA 기준을 적용할 수 없어 사이트 전체 AAA 요구를 권장하지 않습니다.",
						"수준은 누적적입니다. Level AA 적합은 모든 Level A 기준의 충족을 포함하고, Level AAA는 A와 AA를 모두 포함합니다. 'AA만 하고 A는 건너뛴다'는 것은 성립하지 않습니다.",
					],
					en: [
						"WCAG defines three conformance levels. Level A is the most basic — failing it means some people with disabilities cannot use the content at all. Examples: text alternatives (1.1.1), keyboard access (2.1.1), three-flashes prevention (2.3.1).",
						"Level AA is the de facto standard required by most laws and policies. Examples: 4.5:1 color contrast (1.4.3), text resize (1.4.4), visible focus (2.4.7), consistent navigation (3.2.3). Level AAA is the highest — 7:1 contrast (1.4.6), sign language (1.2.6) — and the W3C does not recommend requiring AAA site-wide because some content cannot satisfy all AAA criteria.",
						"Levels are cumulative: AA conformance includes meeting every Level A criterion, and AAA includes both A and AA. 'AA without A' is not a thing.",
					],
				},
			},
			{
				heading: { ko: "법률이 요구하는 수준", en: "What the Law Requires" },
				paragraphs: {
					ko: [
						"실무에서 가장 중요한 수준은 Level AA입니다. 미국 ADA Title II 규칙(2024)과 Section 508, EU 웹접근성 지침과 EN 301 549, 한국 장애인차별금지법 등 대부분의 법률·정책이 WCAG 2.0 또는 2.1 Level AA를 기준으로 삼습니다.",
						"법률이 참조하는 WCAG 버전은 제정 시점에 따라 다릅니다(508은 2.0, EU와 ADA Title II는 2.1). 하위 호환 덕분에 최신 버전(2.2) AA를 충족하면 이전 버전 요구도 자동으로 충족됩니다 — 신규 프로젝트가 2.2 AA를 목표로 삼는 이유입니다.",
					],
					en: [
						"In practice, Level AA is what matters. The US ADA Title II rule (2024) and Section 508, the EU Web Accessibility Directive and EN 301 549, and Korea's Anti-Discrimination Act all reference WCAG 2.0 or 2.1 Level AA.",
						"The referenced WCAG version varies by when each law was written (508 uses 2.0; the EU and ADA Title II use 2.1). Thanks to backward compatibility, meeting the latest version (2.2) at AA automatically satisfies earlier requirements — which is why new projects target 2.2 AA.",
					],
				},
			},
			{
				heading: { ko: "적합성 선언의 다섯 가지 조건", en: "The Five Conformance Requirements" },
				paragraphs: {
					ko: [
						"적합성을 선언하려면 다섯 조건을 만족해야 합니다: ① 적합성 수준 명시 ② 전체 페이지 단위 적용(페이지 일부만 적합하다고 선언할 수 없음) ③ 여러 페이지로 이어지는 프로세스(예: 결제 흐름)는 모든 페이지가 적합해야 함 ④ 접근성 지원(accessibility-supported) 방식의 기술 사용만 인정 ⑤ 비간섭(non-interference) — 부적합 콘텐츠가 나머지 페이지의 사용을 방해하면 안 됨.",
						"'접근성 지원'이란 해당 기술이 사용자의 보조기술 및 브라우저와 실제로 호환되게 동작한다는 의미입니다. 이론상 접근 가능해도 실제 보조기술이 지원하지 않는 방식이면 적합성에 기여할 수 없습니다.",
						"완전한 적합이 어려운 경우 '부분 적합 선언(Statement of Partial Conformance)'이 있습니다 — 제3자 콘텐츠(사용자 댓글, 외부 위젯) 때문에 적합하지 못할 때, 해당 콘텐츠를 제외하면 적합함을 밝히는 방식입니다.",
					],
					en: [
						"A conformance claim must satisfy five requirements: ① the level is stated ② it applies to full pages (you cannot claim conformance for part of a page) ③ in a multi-page process (e.g., checkout), every page in the process conforms ④ only accessibility-supported ways of using technologies are relied upon ⑤ non-interference — non-conforming content must not block use of the rest of the page.",
						"'Accessibility supported' means the technology actually works with users' assistive technologies and browsers. A technique that is accessible in theory but unsupported by real AT cannot be relied on for conformance.",
						"When full conformance is impossible, a Statement of Partial Conformance exists — for pages that would conform except for third-party content (user comments, external widgets), you may state conformance excluding that content.",
					],
				},
			},
		],
		questions: [
			{
				id: "cpacc-2-3-q1",
				question: {
					ko: "대부분의 법률에서 요구하는 WCAG 적합성 수준은?",
					en: "Which WCAG conformance level is most commonly required by law?",
				},
				options: {
					a: { ko: "Level A", en: "Level A" },
					b: { ko: "Level AA", en: "Level AA" },
					c: { ko: "Level AAA", en: "Level AAA" },
					d: { ko: "법률마다 달라 정해진 것이 없다", en: "It varies by law with no standard" },
				},
				answer: "b",
				explanation: {
					ko: "미국 ADA, EU WAD, 한국 장애인차별금지법 등 대부분의 법률에서 WCAG 2.1 Level AA를 요구합니다.",
					en: "Most laws, including the US ADA, EU WAD, and Korea's Anti-Discrimination Act, require WCAG 2.1 Level AA.",
				},
			},
			{
				id: "cpacc-2-3-q2",
				question: {
					ko: "WCAG 적합성 선언에 대한 설명으로 옳은 것은?",
					en: "Which statement about WCAG conformance claims is correct?",
				},
				options: {
					a: { ko: "페이지의 일부분만 적합해도 선언할 수 있다", en: "A claim can be made for a partial page" },
					b: {
						ko: "전체 페이지에 대해 적합성을 충족해야 선언 가능하다",
						en: "Conformance must be met for the entire page",
					},
					c: { ko: "Level AAA 충족 없이 Level AA를 건너뛸 수 있다", en: "Level AA can be skipped to claim Level AAA" },
					d: { ko: "비적합 콘텐츠는 페이지에 포함할 수 없다", en: "Non-conforming content cannot be on the page at all" },
				},
				answer: "b",
				explanation: {
					ko: "WCAG 적합성은 전체 페이지에 적용됩니다. 페이지 일부만 적합하다고 선언할 수 없으며, 비적합 콘텐츠는 나머지 페이지 접근성을 방해하지 않아야 합니다.",
					en: "WCAG conformance applies to entire pages. Partial page claims are not allowed. Non-conforming content must not interfere with the rest of the page's accessibility.",
				},
			},
			{
				id: "cpacc-2-3-q3",
				question: {
					ko: "WCAG 성공 기준 1.4.3 '색상 대비'의 최소 대비 비율과 적합성 수준은?",
					en: "What is the minimum contrast ratio and conformance level of WCAG 1.4.3 'Contrast'?",
				},
				options: {
					a: { ko: "3:1, Level A", en: "3:1, Level A" },
					b: { ko: "4.5:1, Level AA", en: "4.5:1, Level AA" },
					c: { ko: "7:1, Level AAA", en: "7:1, Level AAA" },
					d: { ko: "4.5:1, Level A", en: "4.5:1, Level A" },
				},
				answer: "b",
				explanation: {
					ko: "WCAG 1.4.3은 일반 텍스트에 대해 4.5:1의 최소 대비 비율을 요구하며, Level AA 성공 기준입니다. 7:1은 Level AAA(1.4.6)입니다.",
					en: "WCAG 1.4.3 requires a minimum 4.5:1 contrast ratio for normal text and is a Level AA criterion. 7:1 is Level AAA (1.4.6).",
				},
			},
		],
	},

	// ── Domain 3 ──────────────────────────────────────────────────────────────
	{
		id: "cpacc-3-1",
		exam: "cpacc",
		domain: 3,
		order: 1,
		available: true,
		title: { ko: "국제 협약 및 미국 법률", en: "International Standards and US Laws" },
		summary: {
			ko: "UN CRPD, 미국 ADA, 재활법 508조를 학습합니다.",
			en: "Study the UN CRPD, US ADA, and Section 508 of the Rehabilitation Act.",
		},
		objectives: {
			ko: [
				"UN CRPD의 목적과 주요 원칙을 설명할 수 있다",
				"미국 ADA의 적용 범위와 접근성 관련 조항을 이해한다",
				"재활법 508조의 의미와 적용 대상을 설명할 수 있다",
				"ATAG, UAAG 등 W3C 접근성 표준의 역할을 안다",
			],
			en: [
				"Explain the purpose and key principles of the UN CRPD",
				"Understand the scope and accessibility provisions of the US ADA",
				"Describe Section 508 and its applicability",
				"Know the roles of W3C standards like ATAG and UAAG",
			],
		},
		content: { ko: [], en: [] },
		sections: [
			{
				heading: { ko: "세계인권선언 (UDHR)", en: "The Universal Declaration of Human Rights (UDHR)" },
				paragraphs: {
					ko: [
						"세계인권선언(UDHR, 1948)은 UN 총회가 채택한 최초의 보편적 인권 문서로, 모든 국제 인권 규범의 뿌리입니다. '모든 사람은 태어날 때부터 자유롭고 존엄과 권리에 있어 평등하다'(제1조)는 선언은 장애 유무와 무관하게 적용됩니다. 다만 장애를 명시적으로 다루지는 않으며, 법적 구속력이 없는 선언(declaration)이라는 한계가 있습니다.",
						"시험 관점의 핵심: UDHR은 '선언'(구속력 없음, 도덕적·정치적 권위), CRPD는 '협약/조약'(비준국에 법적 의무 발생)이라는 문서 유형의 차이를 구분해야 합니다. UDHR이 놓은 보편적 인권의 토대 위에서, 장애를 명시적으로 다루는 CRPD가 58년 뒤에 만들어졌습니다.",
					],
					en: [
						"The Universal Declaration of Human Rights (UDHR, 1948), adopted by the UN General Assembly, is the first universal human rights document and the root of all international human rights norms. 'All human beings are born free and equal in dignity and rights' (Article 1) applies regardless of disability. However, it does not explicitly address disability, and as a declaration it is not legally binding.",
						"The key exam distinction: the UDHR is a declaration (non-binding, moral and political authority), while the CRPD is a convention/treaty (creating legal obligations for ratifying states). On the universal foundation the UDHR laid, the disability-specific CRPD followed 58 years later.",
					],
				},
			},
			{
				heading: { ko: "UN 장애인권리협약 (CRPD)", en: "The UN CRPD" },
				paragraphs: {
					ko: [
						"UN 장애인권리협약(CRPD, 2006)은 장애인의 인권을 보장하는 최초의 포괄적 국제 인권 조약입니다. 사회 모델과 인권 접근을 채택하며, 접근성(제9조)을 핵심 원칙으로 포함합니다. 주요 원칙: 존엄성 존중, 비차별, 완전하고 효과적인 사회 참여, 차이에 대한 존중, 기회의 평등, 접근성.",
						"한국(2008)과 EU를 포함해 180개 이상의 국가·기구가 비준했으며, 미국은 서명했으나 비준하지 않았습니다. 제2조는 '합리적 편의제공'을 정의하고 그 거부를 장애를 이유로 한 차별로 명시합니다. 선택의정서를 비준한 국가에서는 개인이 권리 침해를 UN 위원회에 직접 진정할 수 있습니다. CRPD는 직접 처벌하는 법이 아니라 각국이 국내법으로 이행해야 하는 국제 규범 틀이라는 점을 기억하세요.",
					],
					en: [
						"The UN Convention on the Rights of Persons with Disabilities (CRPD, 2006) is the first comprehensive international human rights treaty on disability. It adopts the Social Model and a human-rights approach, with accessibility (Article 9) as a core principle. Key principles: respect for dignity, non-discrimination, full and effective participation, respect for difference, equality of opportunity, and accessibility.",
						"Over 180 states and bodies have ratified it, including South Korea (2008) and the EU; the US signed but never ratified. Article 2 defines 'reasonable accommodation' and declares its denial to be disability-based discrimination. Where the Optional Protocol is ratified, individuals can petition the UN committee directly. Remember: the CRPD is not directly enforceable law but an international framework each state implements through national legislation.",
					],
				},
			},
			{
				heading: { ko: "마라케시 조약", en: "The Marrakesh Treaty" },
				paragraphs: {
					ko: [
						"마라케시 조약(Marrakesh Treaty, 2013 채택·2016 발효)은 시각 장애인과 그 밖의 인쇄물 접근 장애인(print disabilities)을 위해 저작권의 예외를 규정하는 WIPO(세계지식재산기구) 조약입니다. 배경은 '책 기근(book famine)' — 출판물 중 접근 가능한 형식(점자, 대활자, 오디오, 접근 가능한 전자책)으로 제작되는 비율이 극히 낮은 문제입니다.",
						"핵심 내용: 비준국은 저작권자의 허락 없이 접근 가능한 형식의 복제본을 제작·배포할 수 있는 저작권 예외를 국내법에 도입해야 하며, 승인된 기관(authorized entities)을 통한 접근 가능 복제본의 국가 간 교환도 허용됩니다. 한국은 2015년 비준했습니다. 시험 포인트: 마라케시 조약은 '저작권 예외를 통한 읽기 자료 접근'이라는 특정 목적의 조약이라는 점에서, 포괄적 인권 조약인 CRPD와 구별됩니다.",
					],
					en: [
						"The Marrakesh Treaty (adopted 2013, in force 2016) is a WIPO (World Intellectual Property Organization) treaty establishing copyright exceptions for people who are blind, visually impaired, or otherwise print-disabled. Its background is the 'book famine' — only a tiny share of published works ever becomes available in accessible formats (braille, large print, audio, accessible e-books).",
						"Core provisions: ratifying states must adopt copyright exceptions allowing accessible-format copies to be made and distributed without the rightsholder's permission, and cross-border exchange of accessible copies through authorized entities is permitted. Korea ratified in 2015. Exam point: the Marrakesh Treaty is a purpose-specific treaty — access to reading materials via copyright exceptions — distinguishing it from the comprehensive human rights treaty CRPD.",
					],
				},
			},
			{
				heading: { ko: "미국 장애인법 (ADA)", en: "The Americans with Disabilities Act (ADA)" },
				paragraphs: {
					ko: [
						"미국 장애인법(ADA, 1990)은 장애인에 대한 차별을 금지하는 민권법입니다. Title I(고용), Title II(주·지방 정부), Title III(공공 편의시설 — 민간 사업장)로 구성됩니다. 1990년 제정 당시 웹은 언급되지 않았지만, 법원 판례(예: 도미노 피자 사건)를 통해 웹사이트·앱도 적용 대상으로 해석되어 왔습니다.",
						"2024년 4월 발효된 Title II 최종 규칙은 주·지방 정부의 웹 콘텐츠와 모바일 앱에 WCAG 2.1 Level AA를 명시적으로 요구합니다(규모에 따라 2026~2027년까지 준수). 민간(Title III)에는 아직 명시적 기술 기준이 없어 소송을 통한 집행이 계속되고 있으며, 미국 내 디지털 접근성 소송의 대부분이 ADA에 근거합니다.",
					],
					en: [
						"The Americans with Disabilities Act (ADA, 1990) is a civil rights law prohibiting disability discrimination. It comprises Title I (employment), Title II (state and local government), and Title III (public accommodations — private businesses). The 1990 text never mentioned the web, but courts (e.g., the Domino's Pizza case) have interpreted websites and apps as covered.",
						"The Title II final rule effective April 2024 explicitly requires WCAG 2.1 Level AA for state and local government web content and mobile apps (compliance by 2026–2027 depending on entity size). Title III still has no explicit technical standard, so enforcement continues through litigation — most US digital accessibility lawsuits are ADA-based.",
					],
				},
			},
			{
				heading: { ko: "Section 508과 그 밖의 미국 법률", en: "Section 508 and Other US Laws" },
				paragraphs: {
					ko: [
						"재활법(Rehabilitation Act) 508조는 연방 정부 기관이 개발·구매·유지·사용하는 전자정보기술(ICT)이 장애인에게 접근 가능해야 한다고 요구합니다. 2017년 개정(508 Refresh)에서 WCAG 2.0 Level AA를 직접 참조하도록 갱신되었고, 연방 정부와 계약하는 민간 기업의 납품물에도 적용됩니다. 조달 시장이 크기 때문에 VPAT/ACR 문서 관행을 만들어낸 법이기도 합니다.",
						"함께 알아둘 법률: CVAA(21세기 통신·영상 접근성법, 2010)는 첨단 통신 서비스와 인터넷 영상 프로그램의 접근성(자막 등)을 요구합니다. ACAA(항공운송접근법)는 항공사 웹사이트·키오스크에 접근성을 요구합니다. 재활법 504조는 연방 재정 지원을 받는 프로그램의 차별을 금지하는 상위 원칙 조항입니다.",
					],
					en: [
						"Section 508 of the Rehabilitation Act requires that electronic and information technology (ICT) developed, procured, maintained, or used by federal agencies be accessible. The 2017 Refresh updated it to directly reference WCAG 2.0 Level AA, and deliverables from federal contractors are covered too. Because the procurement market is huge, 508 effectively created the VPAT/ACR documentation practice.",
						"Also know: the CVAA (21st Century Communications and Video Accessibility Act, 2010) requires accessibility of advanced communications and internet video programming (e.g., captions). The ACAA (Air Carrier Access Act) requires accessible airline websites and kiosks. Section 504 of the Rehabilitation Act is the broader provision prohibiting discrimination in federally funded programs.",
					],
				},
			},
			{
				heading: { ko: "W3C 접근성 표준 생태계", en: "The W3C Accessibility Standards Ecosystem" },
				paragraphs: {
					ko: [
						"WCAG만으로 웹 접근성 생태계가 완성되지 않습니다. ATAG(저작 도구 접근성 지침)는 CMS·에디터 같은 저작 도구가 (A) 도구 자체로 접근 가능하고 (B) 접근 가능한 콘텐츠 생산을 돕도록 안내합니다. UAAG(사용자 에이전트 접근성 지침)는 브라우저·미디어 플레이어의 접근성 기준입니다.",
						"WAI-ARIA는 동적 웹 콘텐츠와 커스텀 위젯의 역할(role)·속성·상태를 보조기술에 전달하는 기술 사양입니다. 세 표준의 관계: 저작 도구(ATAG)로 만든 콘텐츠(WCAG)를 사용자 에이전트(UAAG)가 보조기술과 함께 렌더링하는 사슬 전체가 접근 가능해야 완전한 접근성이 이루어집니다.",
					],
					en: [
						"WCAG alone does not complete the web accessibility ecosystem. ATAG (Authoring Tool Accessibility Guidelines) guides authoring tools such as CMSs and editors to be (A) accessible themselves and (B) supportive of producing accessible content. UAAG (User Agent Accessibility Guidelines) covers browsers and media players.",
						"WAI-ARIA is the technical specification that conveys roles, properties, and states of dynamic content and custom widgets to assistive technologies. The three standards form a chain: content (WCAG) created with authoring tools (ATAG) is rendered by user agents (UAAG) together with AT — full accessibility requires the whole chain.",
					],
				},
			},
		],
		questions: [
			{
				id: "cpacc-3-1-q1",
				question: {
					ko: "미국 재활법 508조의 적용 대상은?",
					en: "Who does Section 508 of the Rehabilitation Act apply to?",
				},
				options: {
					a: { ko: "모든 미국 민간 기업", en: "All US private companies" },
					b: { ko: "미국 연방 정부 기관 및 연방 계약 업체", en: "US federal agencies and federal contractors" },
					c: { ko: "미국 주 정부만", en: "Only US state governments" },
					d: { ko: "전 세계 모든 정부 기관", en: "All government agencies worldwide" },
				},
				answer: "b",
				explanation: {
					ko: "508조는 미국 연방 정부 기관이 개발·구매하는 ICT에 적용되며, 연방 정부와 계약하는 민간 기업도 대상입니다.",
					en: "Section 508 applies to ICT developed or procured by US federal agencies, and private companies contracting with the federal government are also covered.",
				},
			},
			{
				id: "cpacc-3-1-q2",
				question: {
					ko: "UN CRPD에서 접근성을 다루는 조항은?",
					en: "Which article of the UN CRPD addresses accessibility?",
				},
				options: {
					a: { ko: "제1조", en: "Article 1" },
					b: { ko: "제5조", en: "Article 5" },
					c: { ko: "제9조", en: "Article 9" },
					d: { ko: "제21조", en: "Article 21" },
				},
				answer: "c",
				explanation: {
					ko: "UN CRPD 제9조(Accessibility)는 장애인이 물리적 환경, 교통, ICT 등에 동등하게 접근할 수 있도록 요구합니다.",
					en: "Article 9 (Accessibility) of the UN CRPD requires that persons with disabilities have equal access to the physical environment, transportation, ICT, and more.",
				},
			},
			{
				id: "cpacc-3-1-q3",
				question: {
					ko: "ATAG(Authoring Tool Accessibility Guidelines)의 주요 목적은?",
					en: "What is the primary purpose of ATAG?",
				},
				options: {
					a: { ko: "브라우저의 접근성을 개선한다", en: "Improve browser accessibility" },
					b: {
						ko: "웹 저작 도구가 접근 가능한 콘텐츠를 생성하도록 안내한다",
						en: "Guide authoring tools to produce accessible content",
					},
					c: { ko: "동적 웹 콘텐츠의 역할을 정의한다", en: "Define roles for dynamic web content" },
					d: { ko: "모바일 앱의 접근성 기준을 제공한다", en: "Provide accessibility standards for mobile apps" },
				},
				answer: "b",
				explanation: {
					ko: "ATAG는 CMS, 위지윅 에디터 등 웹 저작 도구가 접근 가능한 콘텐츠를 생성할 수 있도록 가이드하는 W3C 표준입니다.",
					en: "ATAG is a W3C standard that guides web authoring tools like CMS and WYSIWYG editors to produce accessible content.",
				},
			},
		],
	},
	{
		id: "cpacc-3-2",
		exam: "cpacc",
		domain: 3,
		order: 2,
		available: true,
		title: { ko: "유럽 및 한국 법률", en: "European and Korean Laws" },
		summary: {
			ko: "EU 웹접근성 지침(WAD), EN 301 549, 한국 장애인차별금지법을 학습합니다.",
			en: "Study the EU Web Accessibility Directive, EN 301 549, and Korea's Anti-Discrimination Act.",
		},
		objectives: {
			ko: [
				"EU 웹접근성 지침(WAD)의 적용 범위를 설명할 수 있다",
				"EN 301 549와 WCAG의 관계를 이해한다",
				"유럽 접근성법(EAA)의 확대된 적용 범위를 설명할 수 있다",
				"한국 장애인차별금지법과 한국형 웹접근성 지침(KWCAG)을 이해한다",
			],
			en: [
				"Explain the scope of the EU Web Accessibility Directive (WAD)",
				"Understand the relationship between EN 301 549 and WCAG",
				"Describe the expanded scope of the European Accessibility Act (EAA)",
				"Understand Korea's Anti-Discrimination Act and KWCAG",
			],
		},
		content: { ko: [], en: [] },
		sections: [
			{
				heading: { ko: "EU 웹접근성 지침 (WAD)", en: "The EU Web Accessibility Directive (WAD)" },
				paragraphs: {
					ko: [
						"EU 웹접근성 지침(WAD, 2016)은 EU 회원국의 공공 부문 웹사이트와 모바일 앱이 WCAG 2.1 Level AA(EN 301 549 경유)를 준수하도록 요구합니다. 2019년 신규 웹사이트, 2020년 기존 웹사이트, 2021년 모바일 앱 순으로 적용되었고, 회원국은 각자의 국내법으로 지침을 이행해야 합니다.",
						"WAD의 특징적 요구 두 가지: 공공 기관은 접근성 성명(Accessibility Statement)을 게시해 준수 상태와 피드백 경로를 공개해야 하고, 회원국은 주기적 모니터링과 보고 체계를 운영해야 합니다. '지침(Directive)'은 회원국이 국내법으로 옮겨야 효력이 생기는 EU 입법 형식이라는 점도 기억하세요.",
					],
					en: [
						"The EU Web Accessibility Directive (WAD, 2016) requires public sector websites and mobile apps in member states to comply with WCAG 2.1 Level AA (via EN 301 549). It applied to new websites from 2019, existing websites from 2020, and mobile apps from 2021; member states implement it through national law.",
						"Two distinctive WAD requirements: public bodies must publish an Accessibility Statement disclosing compliance status and a feedback channel, and member states must run periodic monitoring and reporting. Also remember that a 'Directive' is an EU legislative form that takes effect only once transposed into national law.",
					],
				},
			},
			{
				heading: { ko: "EN 301 549 — 유럽 ICT 접근성 표준", en: "EN 301 549 — The European ICT Standard" },
				paragraphs: {
					ko: [
						"EN 301 549는 ICT 제품·서비스의 접근성 요구사항을 정의하는 유럽 표준입니다. WCAG 2.1 Level AA 성공 기준을 직접 참조하면서, 웹을 넘어 소프트웨어, 하드웨어, 전자문서, 지원 서비스, 생체인식 등 폭넓은 ICT를 포괄합니다.",
						"이 표준은 EU 공공 조달의 접근성 기준이자, WAD와 EAA의 '적합성 추정' 기준으로 사용됩니다 — EN 301 549를 충족하면 해당 법률의 접근성 요구를 충족한 것으로 추정됩니다. 미국 Section 508이 연방 조달 기준이라면, EN 301 549는 유럽의 대응물이라고 이해하면 됩니다.",
					],
					en: [
						"EN 301 549 is the European Standard defining accessibility requirements for ICT products and services. It directly references WCAG 2.1 Level AA and extends beyond the web to software, hardware, electronic documents, support services, and biometrics.",
						"It serves as the accessibility criterion in EU public procurement and as the 'presumption of conformity' standard for both the WAD and the EAA — meeting EN 301 549 is presumed to satisfy those laws' accessibility requirements. Think of it as Europe's counterpart to the US Section 508 procurement standard.",
					],
				},
			},
			{
				heading: { ko: "유럽 접근성법 (EAA)", en: "The European Accessibility Act (EAA)" },
				paragraphs: {
					ko: [
						"유럽 접근성법(EAA, 2019)은 접근성 의무를 공공을 넘어 민간 부문으로 확대한 지침입니다. 2025년 6월 28일부터 시행되어 전자상거래, 소비자 은행 서비스, 전자책과 전용 단말기, 교통 티켓팅·체크인, 스마트폰·컴퓨터 운영체제, ATM·키오스크 등이 적용 대상입니다.",
						"소규모 기업(10인 미만이면서 연매출·자산 200만 유로 미만)은 서비스 의무에서 면제되고, '불균형한 부담'을 입증하면 일부 의무를 완화받을 수 있습니다. EU 밖 기업이라도 EU 시장에 제품·서비스를 제공하면 적용 대상이므로, 한국 기업에게도 실무적 의미가 큽니다.",
					],
					en: [
						"The European Accessibility Act (EAA, 2019) extends accessibility obligations beyond the public sector into the private market. In force from June 28, 2025, it covers e-commerce, consumer banking, e-books and e-readers, transport ticketing and check-in, smartphones and computer operating systems, ATMs, and kiosks.",
						"Microenterprises (fewer than 10 employees and under €2 million turnover/assets) are exempt from the service obligations, and a proven 'disproportionate burden' can relax some duties. Companies outside the EU are covered when they offer products or services in the EU market — making the EAA practically significant for Korean businesses too.",
					],
				},
			},
			{
				heading: { ko: "한국의 법률과 표준", en: "Korean Laws and Standards" },
				paragraphs: {
					ko: [
						"한국 장애인차별금지법(장애인차별금지 및 권리구제 등에 관한 법률, 2008)은 장애를 이유로 한 차별을 금지하고, 전자정보 접근에서의 정당한 편의 제공을 요구합니다. 웹 접근성 의무의 법적 근거이며, 위반 시 국가인권위원회 진정과 법원 구제가 가능합니다. 지능정보화 기본법도 공공 부문의 정보 접근성 책무를 규정합니다.",
						"한국형 웹 콘텐츠 접근성 지침(KWCAG 2.2)은 WCAG 2.1을 기반으로 한국 상황에 맞게 조정한 국내 표준(KS X OT0003)입니다. 공공기관은 준수 의무가 있고 민간은 단계적으로 적용됩니다. 과학기술정보통신부 지정 인증기관들이 웹 접근성 품질인증 마크를 심사·발급하며, 이 인증은 법적 의무가 아닌 임의 인증입니다.",
					],
					en: [
						"Korea's Anti-Discrimination Against and Remedies for Persons with Disabilities Act (2008) prohibits disability-based discrimination and requires reasonable accommodation in access to electronic information — the legal basis for web accessibility obligations, enforceable via the National Human Rights Commission and the courts. The Framework Act on Intelligent Informatization also assigns public-sector information accessibility duties.",
						"KWCAG 2.2, Korea's national standard (KS X OT0003), is based on WCAG 2.1 and adapted to the Korean context. Compliance is mandatory for public institutions and being phased in for the private sector. Certification bodies designated by the Ministry of Science and ICT review and issue the Web Accessibility Quality Certification Mark — a voluntary certification, not a legal requirement.",
					],
				},
			},
			{
				heading: { ko: "그 밖의 주요 국가", en: "Other Notable Jurisdictions" },
				paragraphs: {
					ko: [
						"캐나다 온타리오주의 AODA는 공공·민간 조직에 WCAG 2.0 AA 준수를 단계적으로 의무화한 선구적 법률이고, 연방 차원의 접근성 캐나다법(ACA, 2019)도 있습니다. 영국은 평등법(Equality Act 2010), 호주는 장애차별금지법(DDA 1992)이 디지털 접근성의 근거가 됩니다. 시험에서는 각 법률의 관할(국제/국가/지역), 적용 대상(공공/민간), 참조 표준을 구분하는 것이 핵심입니다.",
					],
					en: [
						"Ontario's AODA pioneered phased mandatory WCAG 2.0 AA compliance for public and private organizations, complemented federally by the Accessible Canada Act (ACA, 2019). The UK's Equality Act 2010 and Australia's Disability Discrimination Act 1992 ground digital accessibility in those countries. For the exam, focus on distinguishing each law's jurisdiction (international/national/regional), covered sector (public/private), and referenced standard.",
					],
				},
			},
			{
				heading: { ko: "지역 인권 협약", en: "Regional Human Rights Instruments" },
				paragraphs: {
					ko: [
						"국제 조약(UN)과 국가법 사이에는 대륙·지역 단위의 인권 협약이 있습니다. EU 기본권 헌장(Charter of Fundamental Rights of the EU, 2000 선포·2009 리스본 조약으로 법적 구속력)은 제21조에서 장애를 이유로 한 차별을 금지하고, 제26조에서 장애인의 자립·사회 통합·참여 권리를 명시합니다. EU 기관과 회원국의 EU법 이행에 적용됩니다.",
						"아프리카 인권 헌장(African Charter on Human and Peoples' Rights, 1981 — 반줄 헌장)은 아프리카연합 회원국에 적용되는 인권 조약으로, 제18조에서 장애인이 특별 보호 조치를 받을 권리를 규정합니다. 2018년에는 장애인 권리에 관한 별도 의정서가 채택되었습니다.",
						"미주 장애인 차별 철폐 협약(Inter-American Convention on the Elimination of All Forms of Discrimination Against Persons with Disabilities, 1999)은 미주기구(OAS) 회원국의 협약으로, 장애를 이유로 한 차별의 정의와 철폐 조치를 규정한 세계 최초의 장애 특화 지역 인권 협약입니다. 시험 포인트: 세 문서의 지역(유럽/아프리카/미주)과 성격을 짝지을 수 있어야 합니다.",
					],
					en: [
						"Between international (UN) treaties and national laws sit continental and regional human rights instruments. The Charter of Fundamental Rights of the EU (proclaimed 2000, legally binding since the 2009 Lisbon Treaty) prohibits discrimination on grounds of disability (Article 21) and recognizes the rights of disabled people to independence, integration, and participation (Article 26). It applies to EU institutions and member states implementing EU law.",
						"The African Charter on Human and Peoples' Rights (1981, the Banjul Charter) is the human rights treaty of African Union member states; Article 18 provides that disabled people have the right to special measures of protection. A dedicated Protocol on the rights of persons with disabilities followed in 2018.",
						"The Inter-American Convention on the Elimination of All Forms of Discrimination Against Persons with Disabilities (1999), under the Organization of American States (OAS), was the world's first disability-specific regional human rights convention, defining disability discrimination and measures to eliminate it. Exam point: be able to match each instrument to its region (Europe/Africa/Americas) and character.",
					],
				},
			},
		],
		questions: [
			{
				id: "cpacc-3-2-q1",
				question: {
					ko: "EU 웹접근성 지침(WAD)의 주요 적용 대상은?",
					en: "What is the primary scope of the EU Web Accessibility Directive (WAD)?",
				},
				options: {
					a: { ko: "모든 민간 기업의 웹사이트", en: "All private company websites" },
					b: { ko: "공공 부문 웹사이트와 모바일 앱", en: "Public sector websites and mobile apps" },
					c: { ko: "소셜 미디어 플랫폼만", en: "Social media platforms only" },
					d: { ko: "전자상거래 사이트만", en: "E-commerce sites only" },
				},
				answer: "b",
				explanation: {
					ko: "WAD는 EU 회원국의 공공 부문 웹사이트와 모바일 앱에 WCAG 2.1 Level AA 준수를 요구합니다. 민간 부문 확대는 EAA(유럽 접근성법)에서 다룹니다.",
					en: "WAD requires public sector websites and mobile apps in EU member states to comply with WCAG 2.1 Level AA. Private sector expansion is addressed by the EAA.",
				},
			},
			{
				id: "cpacc-3-2-q2",
				question: {
					ko: "EN 301 549에 대한 설명으로 옳은 것은?",
					en: "Which statement about EN 301 549 is correct?",
				},
				options: {
					a: { ko: "웹사이트만 다루는 표준이다", en: "It only covers websites" },
					b: {
						ko: "웹, 소프트웨어, 하드웨어 등 폭넓은 ICT를 포괄하는 유럽 표준이다",
						en: "It is a European standard covering web, software, hardware, and other ICT",
					},
					c: { ko: "미국에서만 사용되는 표준이다", en: "It is used only in the US" },
					d: { ko: "WCAG와 관련이 없는 별도의 기준이다", en: "It is separate from WCAG" },
				},
				answer: "b",
				explanation: {
					ko: "EN 301 549는 WCAG 2.1 Level AA를 참조하면서, 웹뿐 아니라 소프트웨어, 하드웨어, 문서 등 폭넓은 ICT의 접근성을 다루는 유럽 표준입니다.",
					en: "EN 301 549 references WCAG 2.1 Level AA and covers accessibility for a wide range of ICT including web, software, hardware, and documents.",
				},
			},
			{
				id: "cpacc-3-2-q3",
				question: {
					ko: "한국형 웹 콘텐츠 접근성 지침(KWCAG)의 기반이 되는 국제 표준은?",
					en: "Which international standard is KWCAG based on?",
				},
				options: {
					a: { ko: "EN 301 549", en: "EN 301 549" },
					b: { ko: "WCAG 2.1", en: "WCAG 2.1" },
					c: { ko: "Section 508", en: "Section 508" },
					d: { ko: "ISO 9241", en: "ISO 9241" },
				},
				answer: "b",
				explanation: {
					ko: "KWCAG 2.2는 WCAG 2.1을 기반으로 한국 상황에 맞게 조정한 국내 표준(KS X OT0003)입니다.",
					en: "KWCAG 2.2 is Korea's national standard (KS X OT0003), based on WCAG 2.1 and adapted for the Korean context.",
				},
			},
		],
	},
	{
		id: "cpacc-3-3",
		exam: "cpacc",
		domain: 3,
		order: 3,
		available: true,
		title: { ko: "접근성 관리 전략", en: "Accessibility Management Strategies" },
		summary: {
			ko: "조직 내 접근성 프로그램 구축과 관리 전략을 학습합니다.",
			en: "Learn how to build and manage organizational accessibility programs.",
		},
		objectives: {
			ko: [
				"접근성 성숙도 모델의 단계를 설명할 수 있다",
				"VPAT/ACR의 역할과 중요성을 이해한다",
				"접근성 감사의 유형과 도구를 나열할 수 있다",
				"조직 내 접근성 문화 구축 전략을 설명할 수 있다",
			],
			en: [
				"Explain the stages of accessibility maturity models",
				"Understand the role and importance of VPAT/ACR",
				"List types and tools for accessibility auditing",
				"Describe strategies for building an accessibility culture within an organization",
			],
		},
		content: { ko: [], en: [] },
		sections: [
			{
				heading: { ko: "접근성 성숙도 모델", en: "Accessibility Maturity Models" },
				paragraphs: {
					ko: [
						"접근성 성숙도 모델은 조직의 접근성 수준을 단계적으로 평가하고 다음 단계로의 로드맵을 제공합니다. 일반적 단계: 초기(Ad hoc) — 체계 없이 개별 대응 → 계획(Planned) — 정책·목표 수립 시작 → 관리(Managed) — 프로세스 통합과 모니터링 → 정착(Embedded) — 조직 문화의 일부 → 최적화(Optimized) — 지속적 개선과 혁신.",
						"W3C도 접근성 성숙도 모델(Accessibility Maturity Model)을 발행해 커뮤니케이션, 지식·역량, 지원, 인사, 조달, 문화 등 차원별로 성숙도를 진단하게 합니다. 성숙도 평가의 목적은 등급 매기기가 아니라, 일회성 프로젝트에서 지속 가능한 프로그램으로 옮겨가는 경로를 설계하는 것입니다.",
					],
					en: [
						"Accessibility maturity models assess an organization's accessibility level in stages and provide a roadmap forward. Typical stages: Ad hoc — unsystematic, case-by-case reactions → Planned — policies and goals emerging → Managed — integrated into processes with monitoring → Embedded — part of organizational culture → Optimized — continuous improvement and innovation.",
						"The W3C also publishes an Accessibility Maturity Model that assesses dimensions such as communications, knowledge and skills, support, personnel, procurement, and culture. The point of maturity assessment is not grading but designing the path from one-off projects to a sustainable program.",
					],
				},
			},
			{
				heading: { ko: "정책과 거버넌스", en: "Policy and Governance" },
				paragraphs: {
					ko: [
						"효과적인 접근성 프로그램은 경영진의 후원(sponsorship)에서 출발합니다. 접근성 정책에는 적용 범위, 목표 표준(예: WCAG 2.2 AA), 역할과 책임, 예외 처리 절차, 검토 주기가 명시되어야 합니다. 정책 없이 개인의 선의에 의존하는 접근성은 담당자가 떠나면 함께 사라집니다.",
						"접근성 성명(Accessibility Statement)은 사이트의 준수 수준, 알려진 한계, 피드백 연락처를 공개하는 문서로, EU 공공 부문에서는 법적 의무이고 그 외에도 신뢰와 책임성의 표지로 널리 권장됩니다. 조직 규모가 커지면 접근성 사무국(Accessibility Office)이나 전담 리더(예: Chief Accessibility Officer)를 두어 거버넌스를 중앙화합니다.",
					],
					en: [
						"An effective accessibility program starts with executive sponsorship. An accessibility policy should specify scope, target standard (e.g., WCAG 2.2 AA), roles and responsibilities, exception procedures, and review cycles. Accessibility that relies on individual goodwill without policy disappears when that person leaves.",
						"An Accessibility Statement publicly discloses a site's conformance level, known limitations, and a feedback contact — legally required for the EU public sector and widely recommended elsewhere as a marker of trust and accountability. As organizations grow, an Accessibility Office or dedicated leader (e.g., a Chief Accessibility Officer) centralizes governance.",
					],
				},
			},
			{
				heading: { ko: "조달과 VPAT/ACR", en: "Procurement and VPAT/ACR" },
				paragraphs: {
					ko: [
						"조직이 사용하는 ICT의 상당수는 직접 만들지 않고 구매합니다. 그래서 조달 단계의 접근성 검증이 중요합니다. VPAT(Voluntary Product Accessibility Template)는 공급업체가 자사 제품의 접근성 적합성을 기준 항목별로 자가 보고하는 표준 양식이고, 작성 완료된 문서를 ACR(Accessibility Conformance Report)이라 부릅니다.",
						"VPAT에는 참조 표준에 따라 508, EU(EN 301 549), WCAG, 통합(INT) 네 가지 에디션이 있습니다. 각 기준을 '지원(Supports)', '부분 지원(Partially Supports)', '미지원(Does Not Support)', '해당 없음(Not Applicable)'으로 평가하며, 솔직하고 구체적인 비고가 문서의 신뢰도를 결정합니다. 조달 담당자는 ACR을 요구하고, 주장 검증(데모·샘플 테스트)과 계약상 접근성 조항으로 보완해야 합니다.",
					],
					en: [
						"Much of an organization's ICT is bought, not built — which makes accessibility verification at procurement critical. The VPAT (Voluntary Product Accessibility Template) is the standard form vendors use to self-report their product's conformance criterion by criterion; the completed document is an ACR (Accessibility Conformance Report).",
						"VPAT comes in four editions by reference standard: 508, EU (EN 301 549), WCAG, and INT (combined). Each criterion is rated 'Supports', 'Partially Supports', 'Does Not Support', or 'Not Applicable' — honest, specific remarks determine the document's credibility. Procurement officers should require ACRs and supplement them with verification (demos, sample testing) and contractual accessibility clauses.",
					],
				},
			},
			{
				heading: { ko: "감사와 모니터링", en: "Auditing and Monitoring" },
				paragraphs: {
					ko: [
						"접근성 감사에는 세 축이 있습니다. 자동화 테스트(axe, WAVE, Lighthouse)는 빠르고 반복 가능하지만 전체 이슈의 약 30~40%만 감지합니다. 수동 테스트(키보드 탐색, 화면낭독기, 확대·대비 점검)는 자동화가 놓치는 문제를 찾습니다. 장애인 사용자 테스트는 실제 과업 수행 가능성과 사용성을 검증합니다. 최선의 접근은 세 가지의 병행입니다.",
						"감사는 일회성 이벤트가 아니라 주기적 모니터링으로 운영되어야 합니다. 릴리스 파이프라인에 자동 검사를 통합하고(회귀 조기 차단), 주요 사용자 여정에 대해 정기 수동 감사를 수행하며, 발견 이슈는 심각도(차단/중대/경미)와 사용자 영향 기준으로 우선순위를 정해 백로그로 관리합니다.",
					],
					en: [
						"Accessibility auditing has three pillars. Automated testing (axe, WAVE, Lighthouse) is fast and repeatable but detects only about 30–40% of issues. Manual testing (keyboard navigation, screen readers, zoom and contrast checks) finds what automation misses. Testing with disabled users validates real task completion and usability. The best approach combines all three.",
						"Auditing should be periodic monitoring, not a one-off event: integrate automated checks into the release pipeline (catching regressions early), run scheduled manual audits of key user journeys, and manage findings in a backlog prioritized by severity (blocker/major/minor) and user impact.",
					],
				},
			},
			{
				heading: { ko: "접근성 문화 만들기", en: "Building an Accessibility Culture" },
				paragraphs: {
					ko: [
						"지속 가능한 접근성은 문화에서 나옵니다. 핵심 전략: 팀마다 접근성 챔피언을 두어 지식을 분산시키고, 디자인·개발·QA 각 단계에 접근성을 통합하며(Shift Left — 초기 단계로 앞당기기), 역할별 맞춤 교육(디자이너에겐 대비·포커스, 개발자에겐 시맨틱·ARIA)을 정기적으로 실시합니다.",
						"장애인 사용자 관점의 페르소나와 실제 사용자 참여는 공감을 넘어 요구사항을 구체화합니다. 채용·인사에서도 장애인 고용과 접근 가능한 사내 도구가 문화의 일부입니다. 마지막으로, 접근성을 품질의 정의(Definition of Done)에 포함시키는 것 — '접근성 검수 전에는 완료가 아니다' — 이 문화 정착의 가장 실질적인 장치입니다.",
					],
					en: [
						"Sustainable accessibility comes from culture. Key strategies: place accessibility champions on each team to distribute knowledge; integrate accessibility into design, development, and QA (Shift Left — moving it earlier); and run role-specific training regularly (contrast and focus for designers, semantics and ARIA for developers).",
						"Personas representing disabled users — and better, real user participation — turn empathy into concrete requirements. Hiring people with disabilities and providing accessible internal tools are part of the culture too. Finally, the most practical lever: include accessibility in the Definition of Done — 'not done until it passes accessibility review.'",
					],
				},
			},
		],
		questions: [
			{
				id: "cpacc-3-3-q1",
				question: {
					ko: "자동화 접근성 테스트 도구가 발견할 수 있는 이슈의 비율은 대략?",
					en: "Approximately what percentage of accessibility issues can automated testing tools detect?",
				},
				options: {
					a: { ko: "약 10%", en: "About 10%" },
					b: { ko: "약 30~40%", en: "About 30-40%" },
					c: { ko: "약 70~80%", en: "About 70-80%" },
					d: { ko: "거의 100%", en: "Nearly 100%" },
				},
				answer: "b",
				explanation: {
					ko: "자동화 도구는 전체 접근성 이슈의 약 30~40%만 감지합니다. 나머지는 수동 테스트와 사용자 테스트를 통해 발견해야 합니다.",
					en: "Automated tools detect only about 30-40% of accessibility issues. The rest must be found through manual testing and user testing.",
				},
			},
			{
				id: "cpacc-3-3-q2",
				question: {
					ko: "VPAT/ACR의 주요 용도는?",
					en: "What is the primary purpose of VPAT/ACR?",
				},
				options: {
					a: { ko: "웹사이트의 성능을 측정한다", en: "Measure website performance" },
					b: { ko: "보안 취약점을 보고한다", en: "Report security vulnerabilities" },
					c: {
						ko: "ICT 제품의 접근성 적합성 수준을 문서화한다",
						en: "Document the accessibility conformance level of ICT products",
					},
					d: { ko: "개발자 교육 자료로 사용한다", en: "Use as developer training material" },
				},
				answer: "c",
				explanation: {
					ko: "VPAT/ACR은 ICT 제품이 WCAG 성공 기준을 얼마나 충족하는지 문서화하여, 조달 담당자가 접근성을 평가할 수 있게 합니다.",
					en: "VPAT/ACR documents how well ICT products meet WCAG success criteria, enabling procurement officers to evaluate accessibility.",
				},
			},
			{
				id: "cpacc-3-3-q3",
				question: {
					ko: "접근성 'Shift Left' 접근법이란?",
					en: "What does the 'Shift Left' approach to accessibility mean?",
				},
				options: {
					a: {
						ko: "출시 후 접근성 문제를 수정한다",
						en: "Fix accessibility issues after launch",
					},
					b: {
						ko: "디자인·개발 초기 단계부터 접근성을 통합한다",
						en: "Integrate accessibility from the earliest design and development stages",
					},
					c: { ko: "왼쪽 정렬을 사용하여 가독성을 높인다", en: "Use left alignment to improve readability" },
					d: { ko: "자동화 도구에만 의존한다", en: "Rely solely on automated tools" },
				},
				answer: "b",
				explanation: {
					ko: "Shift Left는 개발 프로세스의 초기(왼쪽) 단계부터 접근성을 통합하여, 나중에 수정하는 비용을 줄이는 전략입니다.",
					en: "Shift Left means integrating accessibility from the earliest (leftmost) stages of the development process, reducing the cost of later fixes.",
				},
			},
		],
	},
];

export const cpaccDomains: DomainGroup[] = [
	{
		domain: 1,
		title: {
			ko: "장애, 도전, 보조기술",
			en: "Disabilities, Challenges, and Assistive Technologies",
		},
		weight: { ko: "40문항 (40%)", en: "40 questions (40%)" },
		units: units.filter((u) => u.domain === 1),
	},
	{
		domain: 2,
		title: { ko: "접근성 및 보편적 설계", en: "Accessibility and Universal Design" },
		weight: { ko: "40문항 (40%)", en: "40 questions (40%)" },
		units: units.filter((u) => u.domain === 2),
	},
	{
		domain: 3,
		title: { ko: "표준, 법률, 관리 전략", en: "Standards, Laws, and Management Strategies" },
		weight: { ko: "20문항 (20%)", en: "20 questions (20%)" },
		units: units.filter((u) => u.domain === 3),
	},
];

export const cpaccUnits = units;

export function getCpaccUnit(id: string): StudyUnit | undefined {
	return units.find((u) => u.id === id);
}

export function getAllCpaccUnitIds(): string[] {
	return units.map((u) => u.id);
}
