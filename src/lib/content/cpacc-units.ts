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
		content: {
			ko: [
				"장애를 어떻게 정의하느냐에 따라 해결 접근 방식이 크게 달라집니다. CPACC 시험에서는 세 가지 장애 모델이 핵심적으로 다루어집니다.",
				"의료 모델(Medical Model)은 장애를 개인의 신체적·정신적 결함으로 바라봅니다. 이 관점에서 해결책은 치료, 재활, 교정을 통해 개인을 '정상' 상태에 가깝게 만드는 것이며, 장벽 제거의 책임은 주로 개인에게 있습니다.",
				"사회 모델(Social Model)은 CPACC 시험에서 가장 중요한 모델입니다. 이 모델은 장애가 개인의 손상(impairment) 자체에서 오는 것이 아니라, 접근 불가능한 환경과 사회적 장벽이 만들어내는 것이라고 주장합니다. 예를 들어 휠체어 사용자가 계단 때문에 건물에 들어갈 수 없다면, 문제는 신체가 아니라 계단이라는 설계 장벽입니다. 접근성 전문가는 사회 모델 관점에서 환경의 장벽을 제거하는 것을 목표로 합니다.",
				"생체심리사회 모델(Biopsychosocial Model)은 생물학적, 심리적, 사회적 요인을 모두 통합합니다. WHO의 국제기능장애건강분류(ICF: International Classification of Functioning, Disability and Health)가 이 모델을 기반으로 합니다. ICF는 장애를 단순히 손상의 문제가 아니라 개인과 환경의 상호작용으로 봅니다.",
				"유엔 장애인권리협약(CRPD: Convention on the Rights of Persons with Disabilities)은 사회 모델 관점을 채택하며, 장애인의 인권을 보장하기 위한 국제 협약입니다. 한국을 포함한 많은 국가가 이 협약을 비준했습니다.",
			],
			en: [
				"How we define disability shapes our approach to solutions. CPACC focuses on three core models of disability.",
				"The Medical Model views disability as a personal deficiency — a physical or mental impairment to be treated, rehabilitated, or corrected. The responsibility for overcoming barriers lies with the individual.",
				"The Social Model is the most important model for the CPACC exam. It argues that disability arises not from impairment itself, but from inaccessible environments and societal barriers. If a wheelchair user cannot enter a building because of stairs, the problem is the stairs — not the person. Accessibility professionals aim to remove those barriers.",
				"The Biopsychosocial Model integrates biological, psychological, and social factors. The WHO's International Classification of Functioning, Disability and Health (ICF) is based on this model, viewing disability as an interaction between an individual and their environment.",
				"The UN Convention on the Rights of Persons with Disabilities (CRPD) adopts a Social Model perspective and is the key international treaty ensuring the human rights of people with disabilities. Many countries, including South Korea, have ratified it.",
			],
		},
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
		content: {
			ko: [
				"시각 장애는 크게 전맹(blind), 저시력(low vision), 색각 이상(color blindness)으로 구분됩니다. 각 유형에 따라 적합한 보조기술이 다릅니다.",
				"화면낭독기(Screen Reader)는 화면의 텍스트와 인터페이스 정보를 음성 또는 점자로 변환하는 소프트웨어입니다. 주요 제품: JAWS(Windows, 유료), NVDA(Windows, 무료 오픈소스), VoiceOver(macOS·iOS, 내장), TalkBack(Android, 내장), Narrator(Windows, 내장). 화면낭독기 사용자는 제목, 랜드마크, 링크 목록을 통해 페이지를 탐색합니다.",
				"화면확대기(Screen Magnifier)는 화면을 확대하여 저시력 사용자가 콘텐츠를 볼 수 있게 합니다. ZoomText, MAGic이 대표적이며, Windows 돋보기, macOS 줌 기능도 있습니다. 확대율은 최대 20배 이상까지 지원됩니다.",
				"점자 단말기(Braille Display)는 화면낭독기와 함께 사용됩니다. 전자적으로 점자 핀을 올리고 내려 텍스트를 점자로 실시간 표시하는 갱신형(refreshable) 방식입니다. 주로 전맹이거나 청각 장애도 함께 있는 사용자가 사용합니다.",
				"색각 이상 사용자를 위한 설계 원칙: 색상만으로 정보를 전달하지 않아야 합니다. 예를 들어 '빨간색 필드는 오류'처럼 색상만 사용하면 안 되고, 아이콘이나 텍스트('오류')를 함께 제공해야 합니다. WCAG 기준에 따라 충분한 색상 대비도 확보해야 합니다.",
			],
			en: [
				"Visual disabilities include blindness, low vision, and color blindness. Each type requires different assistive technologies.",
				"Screen readers convert on-screen text and interface information into speech or Braille. Major products: JAWS (Windows, commercial), NVDA (Windows, free/open-source), VoiceOver (macOS/iOS, built-in), TalkBack (Android, built-in), Narrator (Windows, built-in). Screen reader users navigate by headings, landmarks, and link lists.",
				"Screen magnifiers enlarge content for users with low vision. Products include ZoomText and MAGic, plus built-in tools like Windows Magnifier and macOS Zoom. Magnification can reach 20x or more.",
				"Braille displays work alongside screen readers to render text as refreshable Braille output in real time using electrically raised pins. They are primarily used by people who are blind or DeafBlind.",
				"Design principle for color blindness: never convey information through color alone. For example, don't rely solely on a red border to indicate an error — always pair color with text or icons ('Error'). Sufficient color contrast per WCAG is also required.",
			],
		},
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
		content: {
			ko: [
				"청각 장애는 크게 농(Deaf)과 난청(Hard of Hearing)으로 구분됩니다. 농인은 일상적인 말소리를 들을 수 없는 수준의 청력 손실을 가진 사람으로, 주로 수어를 제1언어로 사용합니다. 난청은 부분적 청력 손실로, 보청기 등의 도움으로 음성을 일부 인식할 수 있습니다. 문화적으로 'Deaf(대문자 D)'는 농인 공동체와 문화적 정체성을 의미합니다.",
				"자막(Captions)은 동영상 콘텐츠에서 대화뿐 아니라 효과음, 음악, 화자 식별 등의 비음성 정보도 텍스트로 제공합니다. 개방형 자막(Open Captions)은 항상 표시되고, 폐쇄형 자막(Closed Captions)은 사용자가 켜고 끌 수 있습니다. 자막번역(Subtitles)은 주로 다른 언어의 대화를 번역한 것으로, 효과음 등은 포함하지 않습니다. WCAG에서 미리 녹화된(prerecorded) 오디오/영상은 자막이 필수(Level A)입니다.",
				"보청기(Hearing Aid)는 소리를 증폭하여 난청인이 더 잘 들을 수 있게 합니다. 인공와우(Cochlear Implant)는 외과적으로 이식하는 장치로, 소리를 전기 신호로 변환하여 청신경을 직접 자극합니다. 이 두 기술은 난청 정도와 원인에 따라 선택됩니다. 보조청취장치(ALD: Assistive Listening Device)는 텔레코일(T-coil)을 통해 공공장소에서 음성을 직접 보청기로 전달합니다.",
				"언어 장애(Speech Disability)는 말을 생성하거나 명확하게 발음하는 데 어려움이 있는 상태입니다. 말더듬(Stuttering), 실어증(Aphasia), 구음 장애(Dysarthria) 등이 포함됩니다. 보완대체의사소통(AAC: Augmentative and Alternative Communication) 장치가 주요 보조기술로, 텍스트를 음성으로 변환하는 음성생성장치(SGD: Speech-Generating Device)나 그림 기호판 등을 포함합니다. 웹에서는 전화 전용 서비스 대신 텍스트 기반 대안(채팅, 이메일)을 함께 제공해야 합니다.",
			],
			en: [
				"Hearing disabilities are broadly classified as Deaf or Hard of Hearing. Deaf individuals have profound hearing loss and typically use sign language as their primary language. Hard of Hearing refers to partial hearing loss; individuals may benefit from hearing aids. Culturally, 'Deaf' (capital D) refers to the Deaf community and cultural identity.",
				"Captions provide text for dialogue and non-speech information (sound effects, music, speaker identification) in video content. Open captions are always visible; closed captions can be toggled by the user. Subtitles are translations of dialogue into another language and typically don't include non-speech sounds. WCAG requires captions for prerecorded audio/video at Level A.",
				"Hearing aids amplify sound for people who are hard of hearing. Cochlear implants are surgically implanted devices that convert sound into electrical signals to stimulate the auditory nerve directly. Assistive Listening Devices (ALDs) use telecoils (T-coils) to deliver audio directly to hearing aids in public venues.",
				"Speech disabilities affect the ability to produce or clearly articulate speech. They include stuttering, aphasia, and dysarthria. Augmentative and Alternative Communication (AAC) devices are key assistive technologies, including Speech-Generating Devices (SGDs) that convert text to speech and picture symbol boards. Websites should provide text-based alternatives (chat, email) alongside phone-only services.",
			],
		},
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
		content: {
			ko: [
				"운동·신체 장애는 손, 팔, 다리 등 신체 부위의 움직임에 제한이 있는 상태를 말합니다. 사지마비(Quadriplegia/Tetraplegia), 하반신 마비(Paraplegia), 근이영양증(Muscular Dystrophy), 관절염(Arthritis), 파킨슨병(Parkinson's Disease), 절단(Amputation), 반복사용 긴장 손상(RSI: Repetitive Strain Injury) 등이 포함됩니다.",
				"스위치 접근(Switch Access)은 하나 또는 소수의 버튼(스위치)만으로 컴퓨터를 조작하는 방법입니다. 화면 위의 항목을 순차적으로 하이라이트하고(스캐닝), 원하는 항목에서 스위치를 누르는 방식입니다. 스위치는 손가락, 머리, 입, 눈 등 움직일 수 있는 어떤 신체 부위로든 작동 가능합니다. 시프&퍼프(Sip-and-Puff)는 호흡으로 작동하는 특수 스위치입니다.",
				"음성 인식(Voice/Speech Recognition) 기술은 음성 명령으로 컴퓨터를 조작합니다. Dragon NaturallySpeaking이 대표적이며, 타이핑이나 마우스 사용이 어려운 사용자에게 유용합니다. 시선 추적(Eye Tracking/Gaze Tracking)은 눈의 움직임으로 화면 커서를 제어하는 기술로, 사지마비 사용자에게 도움됩니다. 머리 추적(Head Tracking)은 머리 움직임으로 마우스를 제어합니다.",
				"키보드 접근성은 운동 장애 사용자에게 특히 중요합니다. 마우스를 사용할 수 없는 사용자는 키보드만으로 모든 기능에 접근할 수 있어야 합니다. WCAG 2.1.1(키보드)은 Level A 성공 기준으로, 모든 기능이 키보드로 작동 가능해야 합니다. 적응형 키보드(Adaptive Keyboard)는 큰 키, 키가드(키 사이 경계판), 한 손 키보드 등 다양한 형태로 제공됩니다.",
			],
			en: [
				"Motor and physical disabilities affect movement of hands, arms, legs, or other body parts. They include quadriplegia/tetraplegia, paraplegia, muscular dystrophy, arthritis, Parkinson's disease, amputation, and repetitive strain injury (RSI).",
				"Switch access allows computer operation using one or a few buttons (switches). Items on screen are sequentially highlighted (scanning), and the user activates the switch when the desired item is highlighted. Switches can be operated by any movable body part — finger, head, mouth, or eyes. A sip-and-puff switch is operated by breathing.",
				"Voice/speech recognition technology enables computer control through voice commands. Dragon NaturallySpeaking is a leading product. Eye tracking/gaze tracking controls the cursor using eye movements — essential for people with quadriplegia. Head tracking uses head movements to control the mouse cursor.",
				"Keyboard accessibility is crucial for users with motor disabilities. Users who cannot use a mouse must be able to access all functionality via keyboard alone. WCAG 2.1.1 (Keyboard) is a Level A success criterion requiring all functionality to be keyboard-operable. Adaptive keyboards come in various forms including large-key keyboards, keyguards (raised borders between keys), and one-handed keyboards.",
			],
		},
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
		content: {
			ko: [
				"인지 장애는 학습, 기억, 주의력, 문제 해결 등 정신적 과정에 영향을 미치는 광범위한 상태를 포함합니다. 주요 유형: 지적 장애(Intellectual Disability), 학습 장애(Learning Disability) — 난독증(Dyslexia, 읽기), 난산증(Dyscalculia, 수학), 난필증(Dysgraphia, 쓰기), ADHD(주의력결핍 과잉행동장애), ASD(자폐 스펙트럼 장애).",
				"신경 장애로는 발작 장애(Seizure Disorder/Epilepsy)가 중요합니다. 광과민성 발작(Photosensitive Epilepsy)은 특정 패턴의 깜빡이는 빛이나 빠른 시각 변화에 의해 발작이 유발될 수 있습니다. WCAG 2.3.1(세 번의 번쩍임 또는 임계값 이하)은 Level A 기준으로, 1초에 3번 이상 번쩍이는 콘텐츠를 금지합니다. 이 기준은 실제 생명과 직결됩니다.",
				"인지 장애 사용자를 위한 설계 원칙: 간단하고 명확한 언어를 사용합니다. 일관된 내비게이션과 레이아웃을 유지합니다. 충분한 시간을 제공합니다(WCAG 2.2.1 시간 조절, Level A). 산만한 요소(자동 재생 동영상, 깜빡이는 광고)를 최소화합니다. 오류 예방과 복구를 쉽게 합니다. WCAG 2.2에서는 인지 접근성을 강화하는 여러 성공 기준이 추가되었습니다.",
				"보조기술과 지원: 텍스트 음성 변환(TTS: Text-to-Speech)은 난독증 사용자가 텍스트를 음성으로 들을 수 있게 합니다. 워드 프레딕션(Word Prediction)은 입력 중 단어를 예측하여 타이핑 부담을 줄입니다. 마인드 맵 소프트웨어는 아이디어를 시각적으로 정리합니다. 캘린더/알림 앱은 기억 장애를 보완합니다. 읽기 용이한 글꼴(OpenDyslexic 등)은 난독증 사용자를 위해 설계되었습니다.",
			],
			en: [
				"Cognitive disabilities encompass a broad range of conditions affecting learning, memory, attention, and problem-solving. Key types: Intellectual Disability, Learning Disabilities — Dyslexia (reading), Dyscalculia (math), Dysgraphia (writing), ADHD (Attention Deficit Hyperactivity Disorder), and ASD (Autism Spectrum Disorder).",
				"Among neurological disabilities, seizure disorders (epilepsy) are critical. Photosensitive epilepsy can be triggered by specific patterns of flashing light or rapid visual changes. WCAG 2.3.1 (Three Flashes or Below Threshold) is a Level A criterion prohibiting content that flashes more than three times per second. This criterion is literally life-critical.",
				"Design principles for cognitive accessibility: Use simple, clear language. Maintain consistent navigation and layout. Provide enough time (WCAG 2.2.1 Timing Adjustable, Level A). Minimize distractions (auto-playing videos, flashing ads). Make error prevention and recovery easy. WCAG 2.2 added several success criteria specifically strengthening cognitive accessibility.",
				"Assistive technologies and supports: Text-to-Speech (TTS) helps people with dyslexia hear text read aloud. Word prediction reduces typing effort by suggesting words during input. Mind mapping software helps organize ideas visually. Calendar and reminder apps compensate for memory difficulties. Fonts designed for dyslexia (e.g., OpenDyslexic) improve readability.",
			],
		},
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
		content: {
			ko: [
				"보편적 설계(Universal Design)란 장애 여부, 연령, 언어에 관계없이 모든 사람이 사용할 수 있도록 처음부터 설계하는 개념입니다. 미국 NC State University의 Ronald Mace가 제창했습니다.",
				"보편적 설계 7원칙: ① 공평한 사용(Equitable Use) - 모든 능력의 사용자에게 동일하거나 동등한 방식으로 유용함 ② 사용의 유연성(Flexibility in Use) - 다양한 취향과 능력을 수용 ③ 간단하고 직관적인 사용(Simple and Intuitive Use) - 경험, 지식, 언어 능력과 관계없이 사용이 쉬움 ④ 인지 가능한 정보(Perceptible Information) - 필요한 정보를 효과적으로 전달 ⑤ 오류에 대한 관용(Tolerance for Error) - 우발적 행동의 위험 최소화 ⑥ 낮은 신체적 노력(Low Physical Effort) - 효율적이고 편안하게 사용 ⑦ 접근과 사용을 위한 충분한 공간(Size and Space for Approach and Use).",
				"보편적 설계 vs 개별 편의 제공(Reasonable Accommodation): 보편적 설계는 처음부터 모든 사람을 위해 설계하는 것입니다. 개별 편의 제공은 특정 개인의 필요에 맞춰 사후에 제공하는 것으로, 시간과 비용이 더 많이 들 수 있습니다. 보편적 설계가 더 선호되지만, 항상 가능하지는 않습니다.",
				"보편적 설계의 실제 예시: 경사로(계단과 함께 제공), 자막(청각 장애인뿐 아니라 소음 환경에서도 유용), 큰 글씨 버튼(노인, 임시 부상자, 일반 사용자 모두에게 유용), 자동문(유모차, 휠체어, 짐을 든 사람 모두에게 편리). 이처럼 보편적 설계는 특정 장애인만을 위한 것이 아니라 모든 사람의 경험을 개선합니다.",
			],
			en: [
				"Universal Design is the design of products and environments to be usable by all people, to the greatest extent possible, without the need for adaptation. It was pioneered by Ronald Mace at NC State University.",
				"The 7 Principles of Universal Design: ① Equitable Use - useful to people with diverse abilities ② Flexibility in Use - accommodates a wide range of preferences and abilities ③ Simple and Intuitive Use - easy to understand regardless of experience or language ④ Perceptible Information - communicates necessary information effectively ⑤ Tolerance for Error - minimizes hazards and adverse consequences of accidental actions ⑥ Low Physical Effort - efficient and comfortable to use ⑦ Size and Space for Approach and Use - appropriate size and space for approach, reach, and use.",
				"Universal Design vs Reasonable Accommodation: Universal Design means designing for everyone from the start. Reasonable Accommodation means making adjustments for a specific individual after the fact — it can be more costly and time-consuming. Universal Design is preferred but not always achievable.",
				"Real-world examples: ramps (alongside stairs), captions (useful for people with hearing loss and in noisy environments), large buttons (helpful for elderly, people with temporary injuries, and everyone), automatic doors (convenient for wheelchair users, parents with strollers, and anyone carrying loads). Universal Design improves the experience for all users, not just those with disabilities.",
			],
		},
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
		available: false,
		title: { ko: "WCAG 개요 및 POUR 원칙", en: "WCAG Overview and POUR Principles" },
		summary: {
			ko: "WCAG 2.1/2.2의 4가지 POUR 원칙과 구조를 학습합니다.",
			en: "Study the POUR principles and structure of WCAG 2.1/2.2.",
		},
		objectives: { ko: [], en: [] },
		content: { ko: [], en: [] },
		questions: [],
	},
	{
		id: "cpacc-2-3",
		exam: "cpacc",
		domain: 2,
		order: 3,
		available: false,
		title: { ko: "적합성 수준과 성공 기준", en: "Conformance Levels and Success Criteria" },
		summary: {
			ko: "WCAG A, AA, AAA 수준의 차이와 각 수준의 성공 기준을 학습합니다.",
			en: "Learn the differences between WCAG A, AA, and AAA conformance levels.",
		},
		objectives: { ko: [], en: [] },
		content: { ko: [], en: [] },
		questions: [],
	},

	// ── Domain 3 ──────────────────────────────────────────────────────────────
	{
		id: "cpacc-3-1",
		exam: "cpacc",
		domain: 3,
		order: 1,
		available: false,
		title: { ko: "국제 협약 및 미국 법률", en: "International Standards and US Laws" },
		summary: {
			ko: "UN CRPD, 미국 ADA, 재활법 508조를 학습합니다.",
			en: "Study the UN CRPD, US ADA, and Section 508 of the Rehabilitation Act.",
		},
		objectives: { ko: [], en: [] },
		content: { ko: [], en: [] },
		questions: [],
	},
	{
		id: "cpacc-3-2",
		exam: "cpacc",
		domain: 3,
		order: 2,
		available: false,
		title: { ko: "유럽 및 한국 법률", en: "European and Korean Laws" },
		summary: {
			ko: "EU 웹접근성 지침(WAD), EN 301 549, 한국 장애인차별금지법을 학습합니다.",
			en: "Study the EU Web Accessibility Directive, EN 301 549, and Korea's Anti-Discrimination Act.",
		},
		objectives: { ko: [], en: [] },
		content: { ko: [], en: [] },
		questions: [],
	},
	{
		id: "cpacc-3-3",
		exam: "cpacc",
		domain: 3,
		order: 3,
		available: false,
		title: { ko: "접근성 관리 전략", en: "Accessibility Management Strategies" },
		summary: {
			ko: "조직 내 접근성 프로그램 구축과 관리 전략을 학습합니다.",
			en: "Learn how to build and manage organizational accessibility programs.",
		},
		objectives: { ko: [], en: [] },
		content: { ko: [], en: [] },
		questions: [],
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
