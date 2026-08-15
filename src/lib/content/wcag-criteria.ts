/**
 * WCAG 2.2 성공기준(Success Criteria) — Level A·AA 55개
 *
 * 학습 단원이 "주제별"로 콘텐츠를 묶는다면, 이 파일은 같은 지식을 "성공기준 번호"로
 * 색인한다. 검색으로 "1.4.3"을 찾아 들어온 사람에게 요약을 주고 관련 단원으로 보낸다.
 *
 * 주의 — 클라이언트 컴포넌트에서 이 모듈을 값 import 하지 말 것.
 * 서버 컴포넌트에서 props로 주입하거나 동적 import를 쓴다 (search-index.ts 참고).
 *
 * summary는 W3C 문서의 번역이 아니라 자체 서술이다. 원문 확인은 understandingUrl로 보낸다.
 */

export type WcagLevel = "A" | "AA";

/** KWCAG 2.2 검사항목 매핑 — 하나의 SC가 여러 항목에 걸칠 수 있다 (예: 1.3.1 → 3개) */
export interface KwcagRef {
	/** KWCAG 2.2 검사항목 번호 — 원칙별 접두어(5 인식 / 6 운용 / 7 이해 / 8 견고성) */
	num: string;
	name: { ko: string; en: string };
}

export interface WcagCriterion {
	/**
	 * W3C Understanding 문서 slug. id 겸 URL 세그먼트 겸 SRS 카드 id로 쓰인다.
	 * 배포 후 변경 금지 — URL·사용자 학습 기록이 여기 묶인다.
	 */
	id: string;
	/** SC 번호 "1.4.3" — 첫 자리가 POUR 원칙 */
	num: string;
	level: WcagLevel;
	title: { ko: string; en: string };
	/** 2~3문장 자체 서술 */
	summary: { ko: string; en: string };
	/** 흔한 실패 사례 1~2개 */
	commonFailures: { ko: string; en: string }[];
	/** 관련 학습 단원 id — 수동 지정 (validate:content가 고아 id 검사) */
	relatedUnits: string[];
	/** 대응하는 KWCAG 2.2 항목이 없으면 생략 (KWCAG는 33항목이라 전수 대응하지 않음) */
	kwcag?: KwcagRef[];
}

/** POUR 원칙 번호 — 1 인식의 용이성 / 2 운용의 용이성 / 3 이해의 용이성 / 4 견고성 */
export function principleOf(c: WcagCriterion): 1 | 2 | 3 | 4 {
	return Number(c.num.split(".")[0]) as 1 | 2 | 3 | 4;
}

export function understandingUrl(c: WcagCriterion): string {
	return `https://www.w3.org/WAI/WCAG22/Understanding/${c.id}.html`;
}

export function getCriterion(id: string): WcagCriterion | undefined {
	return wcagCriteria.find((c) => c.id === id);
}

/** num 오름차순. Level AAA는 자격증 범위 밖이라 포함하지 않는다. */
export const wcagCriteria: WcagCriterion[] = [
	// ── 원칙 1. 인식의 용이성 (Perceivable) ──────────────────────────────────────
	{
		id: "non-text-content",
		num: "1.1.1",
		level: "A",
		title: { ko: "비텍스트 콘텐츠", en: "Non-text Content" },
		summary: {
			ko: "이미지·아이콘·차트처럼 텍스트가 아닌 모든 콘텐츠에는 같은 목적을 전달하는 대체 텍스트가 있어야 합니다. 핵심은 '무엇이 보이는가'가 아니라 '이 요소가 무슨 일을 하는가'입니다. 순전히 장식용이라면 보조기술이 건너뛰도록 빈 alt를 주는 것이 올바른 처리입니다.",
			en: "Every non-text element — images, icons, charts — needs a text alternative that serves the same purpose. What matters is the element's function, not its visual appearance. Purely decorative images should carry an empty alt so assistive technology skips them.",
		},
		commonFailures: [
			{
				ko: '파일명을 그대로 넣은 alt (`alt="IMG_2024.png"`)나 의미 없는 `alt="이미지"`',
				en: 'Alt text that repeats the filename (`alt="IMG_2024.png"`) or says nothing useful, like `alt="image"`.',
			},
			{
				ko: "장식용 이미지에 alt 속성을 아예 빠뜨려 스크린리더가 파일 경로를 읽어버리는 경우",
				en: "Omitting the alt attribute entirely on decorative images, so screen readers announce the file path.",
			},
		],
		relatedUnits: ["was-1-6", "was-1-1", "cpacc-2-2"],
		kwcag: [
			{ num: "5.1.1", name: { ko: "적절한 대체 텍스트 제공", en: "Appropriate Alternative Text" } },
		],
	},
	{
		id: "audio-only-and-video-only-prerecorded",
		num: "1.2.1",
		level: "A",
		title: {
			ko: "오디오 전용·비디오 전용(사전 녹화)",
			en: "Audio-only and Video-only (Prerecorded)",
		},
		summary: {
			ko: "소리만 있는 콘텐츠에는 대본을, 소리 없는 영상에는 대본이나 음성 해설을 제공해야 합니다. 한쪽 감각으로만 전달되는 정보를 다른 경로로도 얻을 수 있게 하는 것이 목적입니다. 팟캐스트와 무음 데모 영상이 대표적인 적용 대상입니다.",
			en: "Audio-only content needs a transcript; video-only content needs a transcript or audio description. The goal is to make information available through more than one sensory channel. Podcasts and silent demo videos are the typical cases.",
		},
		commonFailures: [
			{
				ko: "팟캐스트나 녹음 강의를 대본 없이 올려 청각장애 사용자가 내용에 접근할 수 없는 경우",
				en: "Publishing a podcast or recorded lecture with no transcript, leaving deaf users with no way in.",
			},
		],
		relatedUnits: ["was-1-6"],
		kwcag: [{ num: "5.2.1", name: { ko: "자막 제공", en: "Captions" } }],
	},
	{
		id: "captions-prerecorded",
		num: "1.2.2",
		level: "A",
		title: { ko: "자막(사전 녹화)", en: "Captions (Prerecorded)" },
		summary: {
			ko: "녹화된 영상의 음성에는 자막이 있어야 합니다. 자막은 대사뿐 아니라 화자 구분과 의미 있는 소리(효과음·배경음)까지 담아야 합니다. 유튜브 자동 자막은 정확도가 보장되지 않아 그 자체로는 충족 근거가 되지 못합니다.",
			en: "Prerecorded video with audio requires captions. Captions must convey speaker identity and meaningful sounds, not just dialogue. Auto-generated captions are not accurate enough to count as conformance on their own.",
		},
		commonFailures: [
			{
				ko: "검수하지 않은 자동 생성 자막만 붙여 고유명사·전문용어가 틀린 채로 방치하는 경우",
				en: "Shipping unreviewed auto-captions that garble names and technical terms.",
			},
			{
				ko: "대사만 옮기고 화자 전환이나 중요한 효과음을 표기하지 않는 경우",
				en: "Transcribing dialogue only, without marking speaker changes or significant sound effects.",
			},
		],
		relatedUnits: ["was-1-6"],
		kwcag: [{ num: "5.2.1", name: { ko: "자막 제공", en: "Captions" } }],
	},
	{
		id: "audio-description-or-media-alternative-prerecorded",
		num: "1.2.3",
		level: "A",
		title: {
			ko: "음성 해설 또는 미디어 대체 수단(사전 녹화)",
			en: "Audio Description or Media Alternative (Prerecorded)",
		},
		summary: {
			ko: "영상에서 말로 설명되지 않는 시각 정보는 음성 해설이나 전체 대체 텍스트로 제공해야 합니다. 화면에만 뜨는 수치, 자막 없는 텍스트, 말없이 진행되는 시연이 여기 해당합니다. Level A에서는 둘 중 하나를 고를 수 있고, AA(1.2.5)에서는 음성 해설이 요구됩니다.",
			en: "Visual information not conveyed in the soundtrack needs audio description or a full text alternative. Think on-screen figures, unnarrated text, or a silent demonstration. At Level A either option works; Level AA (1.2.5) requires audio description specifically.",
		},
		commonFailures: [
			{
				ko: '"이 버튼을 누르세요"처럼 화면을 봐야만 알 수 있는 설명을 음성 해설 없이 남겨두는 경우',
				en: 'Leaving narration like "click this button" with no audio description of what is on screen.',
			},
		],
		relatedUnits: ["was-1-6", "cpacc-2-3"],
		kwcag: [{ num: "5.2.1", name: { ko: "자막 제공", en: "Captions" } }],
	},
	{
		id: "captions-live",
		num: "1.2.4",
		level: "AA",
		title: { ko: "자막(실시간)", en: "Captions (Live)" },
		summary: {
			ko: "실시간으로 송출되는 영상에도 자막이 있어야 합니다. 생방송·웨비나·실시간 강의가 대상이며, 보통 속기사나 실시간 자막 서비스로 처리합니다. 사후에 자막을 붙이는 것으로는 이 기준을 충족하지 못합니다.",
			en: "Live video needs live captions. This covers broadcasts, webinars, and streamed lectures, usually handled by a stenographer or a real-time captioning service. Adding captions after the fact does not satisfy this criterion.",
		},
		commonFailures: [
			{
				ko: "웨비나를 자막 없이 진행하고 녹화본에만 나중에 자막을 붙이는 경우",
				en: "Running a webinar with no live captions and only captioning the recording afterward.",
			},
		],
		relatedUnits: ["was-1-6"],
	},
	{
		id: "audio-description-prerecorded",
		num: "1.2.5",
		level: "AA",
		title: { ko: "음성 해설(사전 녹화)", en: "Audio Description (Prerecorded)" },
		summary: {
			ko: "AA에서는 녹화 영상의 시각 정보에 반드시 음성 해설을 제공해야 합니다. 1.2.3에서 허용하던 '전체 대체 텍스트' 선택지가 사라지는 것이 핵심 차이입니다. 대사 사이의 자연스러운 빈 구간에 해설을 넣거나, 해설 트랙을 별도로 제공합니다.",
			en: "At Level AA, prerecorded video must carry audio description — the text-alternative option allowed by 1.2.3 is no longer acceptable. Description is fitted into natural gaps in the dialogue, or supplied as a separate described track.",
		},
		commonFailures: [
			{
				ko: "대본만 따로 올려두고 음성 해설 트랙은 제공하지 않아 AA 기준에 미달하는 경우",
				en: "Providing only a transcript and no described audio track, which falls short at Level AA.",
			},
		],
		relatedUnits: ["was-1-6", "cpacc-2-3"],
	},
	{
		id: "info-and-relationships",
		num: "1.3.1",
		level: "A",
		title: { ko: "정보와 관계", en: "Info and Relationships" },
		summary: {
			ko: "시각적으로 드러나는 구조와 관계는 마크업으로도 전달돼야 합니다. 제목처럼 보이게 스타일만 준 div는 스크린리더에게 그냥 문단일 뿐입니다. 제목·목록·표·폼 레이블을 올바른 요소로 작성하는 것이 이 기준의 실질입니다.",
			en: "Structure and relationships conveyed visually must also be available in the markup. A div styled to look like a heading is just a paragraph to a screen reader. In practice this means using real heading, list, table, and label elements.",
		},
		commonFailures: [
			{
				ko: '`<div class="title">`로 제목 모양만 흉내내 스크린리더의 제목 목록 탐색이 불가능한 경우',
				en: 'Faking headings with `<div class="title">`, so screen reader heading navigation finds nothing.',
			},
			{
				ko: "레이아웃 목적으로 표를 쓰거나, 데이터 표에 `<th>`·`scope`를 지정하지 않는 경우",
				en: "Using tables for layout, or omitting `<th>` and `scope` in a real data table.",
			},
		],
		relatedUnits: ["was-1-1", "was-1-7", "was-1-5"],
		kwcag: [
			{ num: "7.3.1", name: { ko: "콘텐츠의 선형구조", en: "Linear Structure of Content" } },
			{ num: "7.3.2", name: { ko: "표의 구성", en: "Table Structure" } },
			{ num: "7.4.1", name: { ko: "레이블 제공", en: "Labels Provided" } },
		],
	},
	{
		id: "meaningful-sequence",
		num: "1.3.2",
		level: "A",
		title: { ko: "의미 있는 순서", en: "Meaningful Sequence" },
		summary: {
			ko: "읽는 순서가 의미에 영향을 준다면 그 순서가 코드에도 반영돼야 합니다. CSS로 시각적 위치만 바꾸면 DOM 순서대로 읽는 스크린리더와 시각 순서가 어긋납니다. flexbox의 order나 grid 배치로 순서를 뒤집을 때 특히 문제가 됩니다.",
			en: "When reading order affects meaning, that order must exist in the code. Rearranging elements visually with CSS leaves screen readers following a DOM order that no longer matches. Flexbox `order` and grid placement are the usual culprits.",
		},
		commonFailures: [
			{
				ko: "`order` 속성으로 시각 순서를 바꿔 키보드 포커스가 화면 위아래를 오가는 경우",
				en: "Reordering visually with `order`, so keyboard focus jumps erratically around the screen.",
			},
		],
		relatedUnits: ["was-1-1", "was-1-3"],
		kwcag: [{ num: "7.3.1", name: { ko: "콘텐츠의 선형구조", en: "Linear Structure of Content" } }],
	},
	{
		id: "sensory-characteristics",
		num: "1.3.3",
		level: "A",
		title: { ko: "감각적 특성", en: "Sensory Characteristics" },
		summary: {
			ko: '조작 안내가 모양·위치·크기·소리 같은 감각 특성에만 의존해서는 안 됩니다. "오른쪽의 둥근 버튼"은 화면을 못 보는 사용자에게 아무 정보도 주지 못합니다. 감각 단서를 쓰더라도 이름이나 레이블을 함께 언급하면 됩니다.',
			en: 'Instructions must not rely solely on shape, position, size, or sound. "The round button on the right" tells a non-visual user nothing. Sensory cues are fine as long as the name or label is given too.',
		},
		commonFailures: [
			{
				ko: '"아래 빨간 상자를 참고하세요"처럼 위치와 색으로만 지시하는 안내 문구',
				en: 'Instructions like "see the red box below" that identify content only by position and color.',
			},
		],
		relatedUnits: ["was-1-11"],
		kwcag: [{ num: "5.3.2", name: { ko: "명확한 지시사항 제공", en: "Clear Instructions" } }],
	},
	{
		id: "orientation",
		num: "1.3.4",
		level: "AA",
		title: { ko: "방향", en: "Orientation" },
		summary: {
			ko: "꼭 필요한 경우가 아니면 세로·가로 한 방향으로만 화면을 고정해서는 안 됩니다. 휠체어에 태블릿을 고정해 쓰는 사용자는 기기를 돌릴 수 없기 때문입니다. 피아노 건반이나 은행 수표 촬영처럼 방향이 본질적인 경우만 예외입니다.",
			en: "Content must not lock to a single orientation unless the orientation is essential. Someone with a tablet mounted to a wheelchair cannot simply rotate the device. Exceptions are narrow — a piano keyboard or check-scanning view, for instance.",
		},
		commonFailures: [
			{
				ko: '모바일 웹에서 세로 모드를 강제하고 가로로 돌리면 "세로로 돌려주세요" 안내만 띄우는 경우',
				en: 'Forcing portrait on mobile and showing only a "please rotate your device" message in landscape.',
			},
		],
		relatedUnits: ["was-1-9"],
	},
	{
		id: "identify-input-purpose",
		num: "1.3.5",
		level: "AA",
		title: { ko: "입력 목적 식별", en: "Identify Input Purpose" },
		summary: {
			ko: "사용자 본인에 관한 입력 필드는 그 용도를 프로그램이 알 수 있게 표시해야 합니다. 실무에서는 `autocomplete` 속성에 정해진 값(name, email, tel 등)을 넣는 것으로 충족합니다. 자동 완성이 동작하면 인지장애 사용자의 입력 부담과 오타가 함께 줄어듭니다.",
			en: "Input fields collecting information about the user must expose their purpose programmatically. In practice this means using the defined `autocomplete` tokens — name, email, tel, and so on. Working autofill reduces both effort and error rates for users with cognitive disabilities.",
		},
		commonFailures: [
			{
				ko: '회원가입 폼에 `autocomplete`를 전혀 지정하지 않거나 `autocomplete="off"`로 막아버리는 경우',
				en: 'Omitting `autocomplete` on a signup form, or disabling it outright with `autocomplete="off"`.',
			},
		],
		relatedUnits: ["was-1-5"],
	},
	{
		id: "use-of-color",
		num: "1.4.1",
		level: "A",
		title: { ko: "색의 사용", en: "Use of Color" },
		summary: {
			ko: "색만으로 정보를 전달하거나 구분을 표시해서는 안 됩니다. 색각 이상 사용자와 흑백 출력에서는 그 구분이 사라지기 때문입니다. 색에 더해 텍스트·아이콘·밑줄·패턴 같은 두 번째 단서를 함께 주면 됩니다.",
			en: "Color must not be the only way information or distinction is conveyed. Users with color vision deficiency — and anyone printing in grayscale — lose that signal entirely. Pair color with a second cue: text, an icon, an underline, or a pattern.",
		},
		commonFailures: [
			{
				ko: "폼 오류를 빨간 테두리로만 표시하고 오류 문구를 함께 주지 않는 경우",
				en: "Marking form errors with a red border only, without an accompanying error message.",
			},
			{
				ko: "본문 속 링크를 색 차이만으로 구분해 밑줄 없이 두는 경우",
				en: "Distinguishing in-text links by color alone, with no underline.",
			},
		],
		relatedUnits: ["was-1-4", "was-1-5"],
		kwcag: [
			{
				num: "5.3.1",
				name: { ko: "색에 무관한 콘텐츠 인식", en: "Content Recognizable Without Color" },
			},
		],
	},
	{
		id: "audio-control",
		num: "1.4.2",
		level: "A",
		title: { ko: "오디오 제어", en: "Audio Control" },
		summary: {
			ko: "3초 넘게 자동 재생되는 소리는 멈추거나 음량을 조절할 수 있어야 합니다. 스크린리더 사용자는 배경음이 깔리면 음성 출력을 알아듣지 못합니다. 가장 안전한 해법은 아예 자동 재생을 하지 않는 것입니다.",
			en: "Audio that plays automatically for more than three seconds must be stoppable or independently adjustable. Background sound drowns out a screen reader's speech output. The safest approach is simply not to autoplay at all.",
		},
		commonFailures: [
			{
				ko: "메인 페이지 진입과 동시에 배경 음악이 재생되고 정지 버튼이 없는 경우",
				en: "Playing background music on page load with no way to stop it.",
			},
		],
		relatedUnits: ["was-1-6"],
		kwcag: [{ num: "5.4.2", name: { ko: "자동 재생 금지", en: "No Autoplay" } }],
	},
	{
		id: "contrast-minimum",
		num: "1.4.3",
		level: "AA",
		title: { ko: "명도 대비(최소)", en: "Contrast (Minimum)" },
		summary: {
			ko: "본문 텍스트는 배경과 4.5:1 이상, 큰 텍스트(18pt 또는 굵은 14pt 이상)는 3:1 이상의 명도 대비가 필요합니다. 저시력 사용자와 밝은 야외 화면에서 읽을 수 있는지가 판단 기준입니다. 로고와 비활성 요소는 예외입니다.",
			en: "Body text needs at least 4.5:1 contrast against its background; large text (18pt, or bold 14pt and up) needs 3:1. The test is whether low-vision users — and anyone on a screen in bright sunlight — can still read it. Logos and disabled controls are exempt.",
		},
		commonFailures: [
			{
				ko: "흰 배경에 연회색 보조 텍스트(`#999` 부근)를 써서 대비가 3:1에도 못 미치는 경우",
				en: "Light gray helper text (around `#999`) on white, landing below even 3:1.",
			},
			{
				ko: "이미지 위에 텍스트를 얹으면서 이미지 밝기에 따라 대비가 달라지는 것을 검증하지 않는 경우",
				en: "Overlaying text on an image without checking contrast across the image's lighter regions.",
			},
		],
		relatedUnits: ["was-1-4"],
		kwcag: [
			{ num: "5.4.1", name: { ko: "텍스트 콘텐츠의 명도 대비", en: "Contrast of Text Content" } },
		],
	},
	{
		id: "resize-text",
		num: "1.4.4",
		level: "AA",
		title: { ko: "텍스트 크기 조정", en: "Resize Text" },
		summary: {
			ko: "텍스트를 200%까지 키워도 내용과 기능이 손실되지 않아야 합니다. 확대 시 글자가 잘리거나 겹치거나 버튼이 화면 밖으로 밀려나면 위반입니다. px 고정 대신 상대 단위를 쓰고 컨테이너 높이를 고정하지 않는 것이 기본 대응입니다.",
			en: "Text must scale to 200% without losing content or functionality. Clipping, overlapping, or controls pushed off-screen at that size are failures. The basic fix is relative units instead of fixed px, and no fixed-height containers around text.",
		},
		commonFailures: [
			{
				ko: "고정 높이 컨테이너 안의 텍스트가 확대 시 잘려 나가는 경우",
				en: "Text clipped inside a fixed-height container once it is enlarged.",
			},
		],
		relatedUnits: ["was-1-9", "was-1-4"],
	},
	{
		id: "images-of-text",
		num: "1.4.5",
		level: "AA",
		title: { ko: "텍스트 이미지", en: "Images of Text" },
		summary: {
			ko: "같은 표현을 실제 텍스트로 낼 수 있다면 텍스트를 이미지로 만들지 않아야 합니다. 이미지 텍스트는 확대하면 깨지고, 사용자가 글꼴·색·간격을 바꿀 수 없습니다. 로고와 브랜드 표기는 예외로 인정됩니다.",
			en: "Do not render text as an image when real text could achieve the same presentation. Text in images pixelates when magnified and cannot be restyled by the user. Logos and brand marks are exempt.",
		},
		commonFailures: [
			{
				ko: "이벤트 배너의 안내 문구 전체를 이미지 한 장으로 만들어 확대·검색·번역이 모두 막히는 경우",
				en: "Baking an entire promotional message into one banner image, blocking zoom, search, and translation.",
			},
		],
		relatedUnits: ["was-1-4", "was-1-6"],
	},
	{
		id: "reflow",
		num: "1.4.10",
		level: "AA",
		title: { ko: "리플로우", en: "Reflow" },
		summary: {
			ko: "화면 너비 320 CSS 픽셀에서 가로 스크롤 없이 콘텐츠를 볼 수 있어야 합니다. 데스크톱을 400% 확대한 상태가 모바일 320px 폭과 같아지기 때문에, 반응형 대응이 곧 확대 대응이 됩니다. 지도나 큰 데이터 표처럼 2차원 배치가 본질적인 콘텐츠는 예외입니다.",
			en: "Content must be usable at a 320 CSS pixel width without horizontal scrolling. Zooming a desktop view to 400% produces the same 320px viewport, so responsive layout and zoom support are the same problem. Content requiring two-dimensional layout, like maps or large data tables, is exempt.",
		},
		commonFailures: [
			{
				ko: "고정 px 너비 레이아웃이라 확대하면 가로 스크롤이 생기는 경우",
				en: "A fixed-px layout that forces horizontal scrolling once zoomed.",
			},
		],
		relatedUnits: ["was-1-9"],
	},
	{
		id: "non-text-contrast",
		num: "1.4.11",
		level: "AA",
		title: { ko: "비텍스트 명도 대비", en: "Non-text Contrast" },
		summary: {
			ko: "UI 컴포넌트의 경계와 의미 있는 그래픽도 인접 색과 3:1 이상 대비를 확보해야 합니다. 텍스트만 검사하고 넘어가기 쉬운 지점으로, 입력 필드 테두리·체크박스·포커스 표시가 자주 걸립니다. 아이콘 중 정보를 전달하는 것도 대상입니다.",
			en: "Interface component boundaries and meaningful graphics need at least 3:1 contrast with adjacent colors. This is easy to miss when only text is checked — input borders, checkboxes, and focus indicators are frequent offenders. Informative icons count too.",
		},
		commonFailures: [
			{
				ko: "입력 필드 테두리를 옅은 회색으로 처리해 필드 경계가 배경과 구분되지 않는 경우",
				en: "Pale gray input borders that do not separate the field from its background.",
			},
			{
				ko: "포커스 링을 얇고 연한 색으로 만들어 대비 3:1을 충족하지 못하는 경우",
				en: "A thin, low-contrast focus ring that fails the 3:1 threshold.",
			},
		],
		relatedUnits: ["was-1-4", "was-1-3"],
	},
	{
		id: "text-spacing",
		num: "1.4.12",
		level: "AA",
		title: { ko: "텍스트 간격", en: "Text Spacing" },
		summary: {
			ko: "사용자가 줄 간격·문단 간격·글자 간격·단어 간격을 늘려도 콘텐츠가 손실되지 않아야 합니다. 난독증 사용자가 가독성을 위해 간격을 넓히는 상황을 전제한 기준입니다. 텍스트를 담는 상자에 높이를 고정하지 않으면 대부분 자연히 충족됩니다.",
			en: "Content must survive user-applied increases to line, paragraph, letter, and word spacing. The criterion assumes readers with dyslexia widening spacing to read more comfortably. Avoiding fixed heights on text containers satisfies it in most cases.",
		},
		commonFailures: [
			{
				ko: "버튼이나 카드의 높이를 px로 고정해 줄 간격을 늘리면 글자가 잘리는 경우",
				en: "Fixed px heights on buttons or cards that clip text once line spacing increases.",
			},
		],
		relatedUnits: ["was-1-9", "was-1-4"],
	},
	{
		id: "content-on-hover-or-focus",
		num: "1.4.13",
		level: "AA",
		title: { ko: "호버·포커스 시 나타나는 콘텐츠", en: "Content on Hover or Focus" },
		summary: {
			ko: "마우스 오버나 포커스로 나타나는 툴팁·팝오버는 세 가지 조건을 지켜야 합니다. 포인터를 그 위로 옮겨도 사라지지 않아야 하고(hoverable), ESC 등으로 닫을 수 있어야 하며(dismissible), 저절로 사라지지 않아야 합니다(persistent). 화면 확대 사용자가 툴팁 내용을 읽으려 포인터를 옮기는 상황이 핵심 시나리오입니다.",
			en: "Tooltips and popovers triggered by hover or focus must be hoverable, dismissible (with Escape, for instance), and persistent until dismissed. The driving scenario is a magnifier user moving the pointer onto the tooltip to read it. Losing the content on that move is the classic failure.",
		},
		commonFailures: [
			{
				ko: "툴팁 위로 마우스를 옮기는 순간 사라져 확대 사용자가 내용을 읽지 못하는 경우",
				en: "A tooltip that vanishes the moment the pointer moves onto it, so magnifier users never finish reading.",
			},
			{
				ko: "몇 초 후 자동으로 닫혀 읽기 느린 사용자가 내용을 놓치는 경우",
				en: "Auto-dismissing after a few seconds, cutting off slower readers.",
			},
		],
		relatedUnits: ["was-1-8"],
	},

	// ── 원칙 2. 운용의 용이성 (Operable) ─────────────────────────────────────────
	{
		id: "keyboard",
		num: "2.1.1",
		level: "A",
		title: { ko: "키보드", en: "Keyboard" },
		summary: {
			ko: "모든 기능을 키보드만으로 사용할 수 있어야 합니다. 마우스를 쓸 수 없는 지체장애 사용자, 스크린리더 사용자, 음성 인식 사용자가 모두 키보드 인터페이스를 거쳐 웹을 조작하기 때문입니다. 네이티브 요소를 쓰면 대부분 저절로 충족되고, 문제는 거의 항상 div로 만든 가짜 버튼에서 생깁니다.",
			en: "All functionality must be operable through a keyboard. Users with motor disabilities, screen reader users, and speech-input users all reach the page through the keyboard interface. Native elements satisfy this for free; failures almost always come from buttons built out of divs.",
		},
		commonFailures: [
			{
				ko: "`<div onclick>`로 만든 버튼이 Tab으로 도달되지 않고 Enter·Space에도 반응하지 않는 경우",
				en: "A `<div onclick>` button that Tab never reaches and that ignores Enter and Space.",
			},
			{
				ko: "드래그 앤 드롭이나 마우스 호버에만 기능을 붙여 키보드 대체 경로를 두지 않는 경우",
				en: "Binding functionality only to drag-and-drop or hover, with no keyboard alternative.",
			},
		],
		relatedUnits: ["was-1-3", "was-1-1"],
		kwcag: [
			{ num: "6.1.1", name: { ko: "키보드 사용 보장", en: "Keyboard Accessibility Guaranteed" } },
		],
	},
	{
		id: "no-keyboard-trap",
		num: "2.1.2",
		level: "A",
		title: { ko: "키보드 함정 없음", en: "No Keyboard Trap" },
		summary: {
			ko: "키보드로 들어간 곳에서는 키보드로 빠져나올 수 있어야 합니다. 갇히면 페이지를 새로 고치는 것 말고는 방법이 없어, 접근성 위반 중에서도 피해가 가장 즉각적입니다. 모달과 임베드된 위젯이 대표적인 발생 지점입니다.",
			en: "If keyboard focus can move into a component, it must be able to move out again. Getting trapped leaves reloading the page as the only escape, which makes this one of the most immediately damaging failures. Modals and embedded widgets are where it usually happens.",
		},
		commonFailures: [
			{
				ko: "모달에 포커스 트랩만 구현하고 ESC 닫기나 닫기 버튼으로의 탈출 경로를 빠뜨린 경우",
				en: "Implementing a modal focus trap without an escape route — no Escape key, no reachable close button.",
			},
		],
		relatedUnits: ["was-1-3", "was-1-8"],
		kwcag: [
			{ num: "6.1.1", name: { ko: "키보드 사용 보장", en: "Keyboard Accessibility Guaranteed" } },
		],
	},
	{
		id: "character-key-shortcuts",
		num: "2.1.4",
		level: "A",
		title: { ko: "문자 키 단축키", en: "Character Key Shortcuts" },
		summary: {
			ko: "문자 하나로 동작하는 단축키를 두려면 끄거나, 다시 지정하거나, 포커스가 있을 때만 동작하도록 해야 합니다. 음성 입력 사용자가 말한 단어가 단축키로 오인되면 의도치 않은 동작이 일어나기 때문입니다. Ctrl·Alt 같은 보조 키를 함께 쓰는 단축키는 대상이 아닙니다.",
			en: "Single-character shortcuts must be switchable off, remappable, or active only on focus. A speech-input user's dictated words can otherwise fire commands they never intended. Shortcuts that require a modifier such as Ctrl or Alt are out of scope.",
		},
		commonFailures: [
			{
				ko: "메일·문서 앱에서 `r`(답장), `a`(전체답장) 같은 단일 문자 단축키를 끌 수 없게 고정한 경우",
				en: "Hard-wiring single-key shortcuts like `r` for reply with no way to disable them.",
			},
		],
		relatedUnits: ["was-1-3"],
		kwcag: [{ num: "6.1.4", name: { ko: "문자 단축키", en: "Character Key Shortcuts" } }],
	},
	{
		id: "timing-adjustable",
		num: "2.2.1",
		level: "A",
		title: { ko: "시간 조절 가능", en: "Timing Adjustable" },
		summary: {
			ko: "제한 시간이 있는 콘텐츠는 시간을 끄거나, 조절하거나, 연장할 수 있어야 합니다. 화면을 읽거나 입력하는 데 더 오래 걸리는 사용자가 아무 잘못 없이 작업을 잃게 되기 때문입니다. 실시간 경매나 시험처럼 시간 제한이 본질적인 경우만 예외입니다.",
			en: "Time limits must be adjustable, extendable, or removable. Otherwise users who read or type more slowly lose their work through no fault of their own. Exceptions are narrow — real-time auctions or timed exams, where the limit is essential.",
		},
		commonFailures: [
			{
				ko: "세션이 경고 없이 만료돼 작성 중이던 폼 내용이 통째로 사라지는 경우",
				en: "Sessions expiring without warning, wiping out a partially completed form.",
			},
			{
				ko: "연장 안내를 띄우면서 응답 시간을 20초처럼 짧게 주는 경우",
				en: "Offering an extension prompt but only allowing a few seconds to respond to it.",
			},
		],
		relatedUnits: ["was-1-8", "was-1-11"],
		kwcag: [{ num: "6.2.1", name: { ko: "응답시간 조절", en: "Adjustable Response Time" } }],
	},
	{
		id: "pause-stop-hide",
		num: "2.2.2",
		level: "A",
		title: { ko: "일시정지·정지·숨김", en: "Pause, Stop, Hide" },
		summary: {
			ko: "5초 넘게 자동으로 움직이거나 깜빡이거나 스크롤되는 콘텐츠는 사용자가 멈출 수 있어야 합니다. 주의력 관련 장애가 있는 사용자에게 끊임없이 움직이는 요소는 본문 읽기를 방해합니다. 자동 넘어가는 캐러셀과 실시간 티커가 가장 흔한 대상입니다.",
			en: "Content that moves, blinks, or scrolls automatically for more than five seconds must be pausable. Perpetual motion makes it hard for users with attention-related disabilities to read anything else on the page. Auto-advancing carousels and live tickers are the usual cases.",
		},
		commonFailures: [
			{
				ko: "메인 배너 캐러셀이 자동으로 넘어가는데 일시정지 버튼이 없는 경우",
				en: "A hero carousel that advances on its own with no pause control.",
			},
		],
		relatedUnits: ["was-1-9"],
		kwcag: [{ num: "6.2.2", name: { ko: "정지 기능 제공", en: "Pause Control Provided" } }],
	},
	{
		id: "three-flashes-or-below-threshold",
		num: "2.3.1",
		level: "A",
		title: { ko: "3회 섬광 또는 임계값 이하", en: "Three Flashes or Below Threshold" },
		summary: {
			ko: "1초에 세 번을 넘는 섬광이 있어서는 안 됩니다. 광과민성 발작을 유발할 수 있어, 위반의 결과가 불편이 아니라 신체적 위해라는 점에서 다른 기준과 성격이 다릅니다. 횟수 기준은 같지만, 포화된 붉은색은 섬광으로 판정되는 기준이 더 민감합니다.",
			en: "Nothing may flash more than three times per second. Unlike most criteria, a failure here risks physical harm — photosensitive seizures — not just inconvenience. The rate threshold is the same for red, but saturated red counts as a flash more readily.",
		},
		commonFailures: [
			{
				ko: "이벤트 페이지의 강조 효과나 자동 재생 영상에 빠른 섬광이 포함된 경우",
				en: "Rapid flashing in a promotional effect or an autoplaying video.",
			},
		],
		relatedUnits: ["cpacc-1-8"],
		kwcag: [
			{ num: "6.3.1", name: { ko: "깜빡임과 번쩍임 사용 제한", en: "Limited Use of Flashing" } },
		],
	},
	{
		id: "bypass-blocks",
		num: "2.4.1",
		level: "A",
		title: { ko: "블록 건너뛰기", en: "Bypass Blocks" },
		summary: {
			ko: "여러 페이지에 반복되는 영역을 건너뛸 수단이 있어야 합니다. 키보드 사용자가 페이지를 옮길 때마다 같은 내비게이션을 수십 번 Tab으로 통과하지 않아도 되게 하는 것이 목적입니다. 건너뛰기 링크가 흔한 해법이지만, 올바른 랜드마크 구조만으로도 충족할 수 있습니다.",
			en: "There must be a way to skip blocks repeated across pages. The point is to spare keyboard users from tabbing through the same navigation on every page load. A skip link is the common solution, though proper landmark structure also satisfies it.",
		},
		commonFailures: [
			{
				ko: "건너뛰기 링크를 넣었지만 포커스를 받아도 보이지 않아 키보드 사용자가 존재를 모르는 경우",
				en: "A skip link that stays invisible even when focused, so keyboard users never know it exists.",
			},
		],
		relatedUnits: ["was-1-1", "was-1-3"],
		kwcag: [{ num: "6.4.1", name: { ko: "반복 영역 건너뛰기", en: "Skip Repetitive Blocks" } }],
	},
	{
		id: "page-titled",
		num: "2.4.2",
		level: "A",
		title: { ko: "페이지 제목", en: "Page Titled" },
		summary: {
			ko: "모든 페이지에 주제나 목적을 설명하는 제목이 있어야 합니다. 스크린리더는 페이지를 열 때 title을 가장 먼저 읽고, 탭을 여러 개 띄운 사용자는 그것만으로 페이지를 구분합니다. 사이트명만 반복하는 제목은 이 역할을 하지 못합니다.",
			en: "Every page needs a title describing its topic or purpose. Screen readers announce the title first on load, and anyone with many tabs open relies on it to tell pages apart. A title that only repeats the site name does not do that job.",
		},
		commonFailures: [
			{
				ko: "모든 페이지의 title이 사이트명으로 동일해 탭 목록에서 구분되지 않는 경우",
				en: "Every page carrying the same site-name title, making tabs indistinguishable.",
			},
			{
				ko: "SPA에서 라우트가 바뀌어도 document.title을 갱신하지 않는 경우",
				en: "A single-page app that never updates document.title on route change.",
			},
		],
		relatedUnits: ["was-1-1"],
		kwcag: [{ num: "6.4.2", name: { ko: "제목 제공", en: "Titles Provided" } }],
	},
	{
		id: "focus-order",
		num: "2.4.3",
		level: "A",
		title: { ko: "초점 순서", en: "Focus Order" },
		summary: {
			ko: "포커스가 이동하는 순서는 의미와 조작 순서에 맞아야 합니다. 순서가 뒤엉키면 화면을 보지 못하는 사용자는 자신이 지금 어디에 있는지 추적할 수 없습니다. DOM 순서를 시각 순서와 일치시키는 것이 가장 확실한 대응입니다.",
			en: "Focus must move in an order that preserves meaning and operability. When the order scrambles, users who cannot see the screen lose track of where they are. Keeping DOM order aligned with visual order is the most reliable fix.",
		},
		commonFailures: [
			{
				ko: "양수 `tabindex`(1 이상)를 써서 문서 전체의 포커스 순서를 헝클어뜨리는 경우",
				en: "Using positive `tabindex` values, which scrambles focus order across the whole document.",
			},
			{
				ko: "모달을 열었는데 포커스가 모달로 옮겨가지 않아 뒤쪽 콘텐츠를 계속 훑는 경우",
				en: "Opening a modal without moving focus into it, leaving the user tabbing through the page behind.",
			},
		],
		relatedUnits: ["was-1-3", "was-1-8"],
		kwcag: [
			{ num: "6.1.2", name: { ko: "초점 이동과 표시", en: "Focus Movement and Indication" } },
		],
	},
	{
		id: "link-purpose-in-context",
		num: "2.4.4",
		level: "A",
		title: { ko: "링크 목적(문맥 내)", en: "Link Purpose (In Context)" },
		summary: {
			ko: '링크의 목적은 링크 텍스트만으로, 또는 링크가 놓인 문맥과 함께 판단할 수 있어야 합니다. 스크린리더 사용자는 링크만 모아 목록으로 훑는 경우가 많아, 그 목록에서 의미가 통해야 합니다. "더보기"가 여러 개 나열되면 어느 것이 무엇인지 알 수 없습니다.',
			en: 'The purpose of each link must be clear from its text, or from its text plus surrounding context. Screen reader users often pull up a list of links in isolation, and the list has to make sense on its own. A page full of "read more" links tells them nothing.',
		},
		commonFailures: [
			{
				ko: '"여기를 클릭"·"더보기"처럼 목적을 알 수 없는 링크 텍스트를 반복해서 쓰는 경우',
				en: 'Repeating opaque link text like "click here" or "read more".',
			},
			{
				ko: "링크 텍스트를 URL 자체로 두어 스크린리더가 주소를 한 글자씩 읽어버리는 경우",
				en: "Using a raw URL as link text, so a screen reader reads the address character by character.",
			},
		],
		relatedUnits: ["was-1-7", "was-1-1"],
		kwcag: [{ num: "6.4.3", name: { ko: "적절한 링크 텍스트", en: "Meaningful Link Text" } }],
	},
	{
		id: "multiple-ways",
		num: "2.4.5",
		level: "AA",
		title: { ko: "여러 방법", en: "Multiple Ways" },
		summary: {
			ko: "사이트 안에서 페이지를 찾는 방법이 둘 이상 있어야 합니다. 내비게이션 메뉴만으로 길을 찾기 어려운 사용자에게 검색·사이트맵·목차 같은 다른 경로를 주자는 취지입니다. 절차의 한 단계처럼 순서가 고정된 페이지는 예외입니다.",
			en: "There must be more than one way to locate a page within a site. Search, a sitemap, or an index gives users an alternative when the navigation menu alone is hard to work through. Pages that are steps in a process are exempt.",
		},
		commonFailures: [
			{
				ko: "드롭다운 내비게이션 하나만 두고 검색이나 사이트맵을 제공하지 않는 경우",
				en: "Offering only a dropdown navigation, with no search and no sitemap.",
			},
		],
		relatedUnits: ["was-1-1"],
	},
	{
		id: "headings-and-labels",
		num: "2.4.6",
		level: "AA",
		title: { ko: "제목과 레이블", en: "Headings and Labels" },
		summary: {
			ko: "제목과 레이블은 주제나 목적을 설명해야 합니다. 2.4.10처럼 제목의 존재를 요구하는 것이 아니라, 이미 있는 제목·레이블의 내용이 쓸모 있는지를 묻는 기준입니다. 스크린리더 사용자가 제목 목록만 훑어 원하는 곳으로 건너뛸 수 있는지가 실질적인 판단 기준입니다.",
			en: "Headings and labels must describe topic or purpose. This is not about whether headings exist, but whether the ones present are actually informative. The practical test is whether a screen reader user can skim the heading list and jump to the right place.",
		},
		commonFailures: [
			{
				ko: '"섹션 1"·"내용"처럼 아무 정보가 없는 제목을 쓰는 경우',
				en: 'Headings like "Section 1" or "Content" that convey nothing.',
			},
			{
				ko: '폼 레이블을 "입력"으로만 두어 무엇을 넣어야 하는지 알 수 없는 경우',
				en: 'Labelling a form field simply "Input", leaving its purpose unclear.',
			},
		],
		relatedUnits: ["was-1-1", "was-1-5"],
	},
	{
		id: "focus-visible",
		num: "2.4.7",
		level: "AA",
		title: { ko: "보이는 초점", en: "Focus Visible" },
		summary: {
			ko: "키보드 포커스를 받은 요소는 시각적으로 드러나야 합니다. 포커스 표시가 없으면 키보드 사용자는 자신이 어디에 있는지 알 수 없어 사실상 페이지를 쓸 수 없습니다. `outline: none`을 대체 표시 없이 넣는 것이 이 기준을 깨는 가장 흔한 방식입니다.",
			en: "The element with keyboard focus must be visibly indicated. Without it, keyboard users cannot tell where they are and the page becomes effectively unusable. Setting `outline: none` with no replacement is the most common way this breaks.",
		},
		commonFailures: [
			{
				ko: "디자인상의 이유로 `outline: none`을 전역에 적용하고 대체 포커스 스타일을 주지 않는 경우",
				en: "Applying a global `outline: none` for aesthetics without providing a replacement focus style.",
			},
		],
		relatedUnits: ["was-1-3", "was-1-4"],
		kwcag: [
			{ num: "6.1.2", name: { ko: "초점 이동과 표시", en: "Focus Movement and Indication" } },
		],
	},
	{
		id: "focus-not-obscured-minimum",
		num: "2.4.11",
		level: "AA",
		title: { ko: "초점 가림 방지(최소)", en: "Focus Not Obscured (Minimum)" },
		summary: {
			ko: "포커스를 받은 요소가 다른 콘텐츠에 완전히 가려져서는 안 됩니다. WCAG 2.2에서 새로 들어온 기준으로, 고정 헤더나 쿠키 배너 뒤로 포커스가 숨는 상황을 겨냥합니다. 포커스 표시가 있어도 화면에서 보이지 않으면 소용이 없다는 문제의식입니다.",
			en: "A focused element must not be entirely hidden behind other content. New in WCAG 2.2, it targets focus disappearing behind sticky headers or cookie banners. A focus indicator that exists but cannot be seen solves nothing.",
		},
		commonFailures: [
			{
				ko: "상단 고정 헤더 때문에 Tab으로 이동한 요소가 헤더 뒤에 완전히 가려지는 경우",
				en: "A sticky header completely covering the element the user just tabbed to.",
			},
		],
		relatedUnits: ["was-1-3"],
		kwcag: [
			{ num: "6.1.2", name: { ko: "초점 이동과 표시", en: "Focus Movement and Indication" } },
		],
	},
	{
		id: "pointer-gestures",
		num: "2.5.1",
		level: "A",
		title: { ko: "포인터 제스처", en: "Pointer Gestures" },
		summary: {
			ko: "여러 손가락을 쓰거나 경로를 그리는 제스처에는 단순한 대체 조작이 있어야 합니다. 손떨림이 있거나 손가락 하나만 쓸 수 있는 사용자, 헤드 포인터 사용자는 그런 제스처를 수행할 수 없습니다. 핀치 줌이나 스와이프에 버튼 대체를 함께 두면 됩니다.",
			en: "Multipoint or path-based gestures need a simple single-pointer alternative. Users with tremor, users who can operate only one finger, and head-pointer users cannot perform them. Pairing pinch-zoom or swipe with buttons resolves it.",
		},
		commonFailures: [
			{
				ko: "지도 확대를 핀치 제스처로만 제공하고 확대·축소 버튼을 두지 않는 경우",
				en: "Offering map zoom only through a pinch gesture, with no zoom buttons.",
			},
			{
				ko: "캐러셀을 스와이프로만 넘길 수 있게 하고 이전·다음 버튼을 생략한 경우",
				en: "A carousel navigable only by swipe, with no previous and next controls.",
			},
		],
		relatedUnits: ["was-1-9"],
		kwcag: [
			{ num: "6.5.1", name: { ko: "단일 포인터 입력 지원", en: "Single Pointer Input Support" } },
		],
	},
	{
		id: "pointer-cancellation",
		num: "2.5.2",
		level: "A",
		title: { ko: "포인터 취소", en: "Pointer Cancellation" },
		summary: {
			ko: "포인터를 누르는 순간이 아니라 떼는 순간에 기능이 실행되어야 합니다. 그래야 잘못 누른 사용자가 손가락을 밖으로 밀어 실행을 취소할 수 있습니다. 운동 조절이 어려운 사용자에게는 이 '되돌릴 여지'가 오조작을 막는 유일한 장치입니다.",
			en: "Functions should fire on the up-event, not the down-event. That lets someone who pressed the wrong control slide off it to cancel. For users with limited motor control, this margin for correction is often the only safeguard against mis-taps.",
		},
		commonFailures: [
			{
				ko: "`mousedown`·`touchstart`에서 바로 삭제나 결제 같은 되돌릴 수 없는 동작을 실행하는 경우",
				en: "Firing irreversible actions like delete or purchase on `mousedown` or `touchstart`.",
			},
		],
		relatedUnits: ["was-1-9"],
		kwcag: [{ num: "6.5.2", name: { ko: "포인터 입력 취소", en: "Pointer Cancellation" } }],
	},
	{
		id: "label-in-name",
		num: "2.5.3",
		level: "A",
		title: { ko: "레이블과 네임", en: "Label in Name" },
		summary: {
			ko: '화면에 보이는 레이블의 텍스트가 접근 가능한 이름에도 들어 있어야 합니다. 음성 인식 사용자가 "검색 버튼 클릭"이라고 말했을 때, 보이는 글자와 프로그램상의 이름이 다르면 명령이 먹히지 않습니다. aria-label을 붙일 때 보이는 텍스트를 지워버리는 것이 전형적인 실수입니다.',
			en: 'The visible label text must be contained in the accessible name. When a speech-input user says "click search", a mismatch between what is displayed and what is exposed makes the command fail. Overwriting visible text with a different aria-label is the classic mistake.',
		},
		commonFailures: [
			{
				ko: '"검색"이라고 보이는 버튼에 `aria-label="submit"`을 붙여 음성 명령이 통하지 않는 경우',
				en: 'A button reading "Search" carrying `aria-label="submit"`, breaking voice commands.',
			},
		],
		relatedUnits: ["was-1-2", "was-1-5"],
		kwcag: [{ num: "6.5.3", name: { ko: "레이블과 네임", en: "Label in Name" } }],
	},
	{
		id: "motion-actuation",
		num: "2.5.4",
		level: "A",
		title: { ko: "동작 기반 작동", en: "Motion Actuation" },
		summary: {
			ko: '기기를 흔들거나 기울여 실행하는 기능에는 일반 UI 대체 수단이 있어야 하고, 그 동작 감지를 끌 수 있어야 합니다. 기기를 고정해 쓰는 사용자는 흔들 수 없고, 떨림이 있는 사용자는 의도치 않게 실행하게 됩니다. "흔들어서 실행 취소"가 대표적인 사례입니다.',
			en: 'Functions triggered by shaking or tilting the device need a conventional UI alternative, and the motion trigger must be switchable off. Users with a mounted device cannot shake it, and users with tremor trigger it by accident. "Shake to undo" is the canonical example.',
		},
		commonFailures: [
			{
				ko: "흔들기로만 실행 취소를 제공하고 화면상의 취소 버튼을 두지 않는 경우",
				en: "Providing undo only through a shake gesture, with no on-screen undo control.",
			},
		],
		relatedUnits: ["was-1-9"],
		kwcag: [{ num: "6.5.4", name: { ko: "동작기반 작동", en: "Motion Actuation" } }],
	},
	{
		id: "dragging-movements",
		num: "2.5.7",
		level: "AA",
		title: { ko: "끌기 동작", en: "Dragging Movements" },
		summary: {
			ko: "끌어서 조작하는 기능에는 끌지 않고도 되는 단순 포인터 대체 수단이 있어야 합니다. WCAG 2.2에서 새로 들어온 기준으로, 누른 채 정확히 이동시키는 동작이 어려운 사용자를 위한 것입니다. 정렬 목록에 위·아래 버튼을 함께 두는 식으로 해결합니다.",
			en: "Anything operated by dragging needs a single-pointer alternative that does not require dragging. New in WCAG 2.2, it addresses users who cannot hold and move a pointer precisely. Adding up and down buttons alongside a sortable list is a typical solution.",
		},
		commonFailures: [
			{
				ko: "칸반 보드의 카드 이동을 드래그 앤 드롭으로만 제공하는 경우",
				en: "A kanban board where cards can only be moved by drag-and-drop.",
			},
			{
				ko: "값 조절 슬라이더를 끌기로만 조작하게 하고 입력란이나 증감 버튼을 두지 않는 경우",
				en: "A slider adjustable only by dragging, with no numeric input or stepper buttons.",
			},
		],
		relatedUnits: ["was-1-9"],
	},
	{
		id: "target-size-minimum",
		num: "2.5.8",
		level: "AA",
		title: { ko: "대상 크기(최소)", en: "Target Size (Minimum)" },
		summary: {
			ko: "포인터로 누르는 대상은 최소 24×24 CSS 픽셀이어야 합니다. WCAG 2.2에서 새로 들어온 기준으로, 손떨림이 있거나 작은 화면을 쓰는 사용자의 오조작을 줄이는 것이 목적입니다. 대상 사이에 충분한 간격이 있거나 같은 기능의 더 큰 대상이 함께 있으면 예외로 인정됩니다.",
			en: "Pointer targets must be at least 24 by 24 CSS pixels. New in WCAG 2.2, it aims to cut mis-taps for users with tremor or small screens. Exceptions apply when targets have sufficient spacing, or when an equivalent larger target exists.",
		},
		commonFailures: [
			{
				ko: "16px 아이콘 버튼들을 여백 없이 촘촘히 배열해 인접 버튼을 잘못 누르게 되는 경우",
				en: "Packing 16px icon buttons together with no spacing, so neighbours get tapped by mistake.",
			},
		],
		relatedUnits: ["was-1-9"],
		kwcag: [{ num: "6.1.3", name: { ko: "조작 가능", en: "Operable Controls" } }],
	},
];
