import type { Cert } from "./index";

/** 자격증 개요 페이지 표시 데이터 (구 cpacc/page.tsx·was/page.tsx 하드코딩 통합) */
export interface CertOverview {
	certNo: string; // "01" | "02"
	lede: { ko: string; en: string };
	metaTitle: { ko: string; en: string };
	metaDescription: { ko: string; en: string };
	totalQuestionsLabel: { ko: string; en: string };
	domains: {
		domainNum: string;
		weightPct: number;
		topics: { mark: string; title: { ko: string; en: string }; sub: { ko: string; en: string } }[];
	}[];
}

export const certOverviews: Record<Cert, CertOverview> = {
	cpacc: {
		certNo: "01",
		lede: {
			ko: "접근성 핵심 역량 전문가 자격증. 장애 인식, 보조기술, WCAG·법률 표준, 보편적 설계 전략을 폭넓게 다루는 IAAP 공인 기초 자격증입니다.",
			en: "IAAP entry-level certification covering disability awareness, assistive technologies, WCAG standards, accessibility law, and universal design strategy.",
		},
		metaTitle: { ko: "CPACC 시험 준비", en: "CPACC Exam Prep" },
		metaDescription: {
			ko: "IAAP CPACC(Certified Professional in Accessibility Core Competencies) 자격증 시험 정보, 도메인별 학습 가이드, 모의 퀴즈, 플래시카드를 한국어로 제공합니다.",
			en: "IAAP CPACC (Certified Professional in Accessibility Core Competencies) exam info, domain study guides, mock quizzes, and flashcards — in Korean and English.",
		},
		totalQuestionsLabel: { ko: "3개 도메인, 총 100문항", en: "3 domains · 100 questions total" },
		domains: [
			{
				domainNum: "01",
				weightPct: 40,
				topics: [
					{ mark: "01", title: { ko: "장애의 정의와 모델", en: "Definitions and Models of Disability" }, sub: { ko: "의료적·사회적·인권 기반 모델 비교", en: "Medical, social, and rights-based models" } },
					{ mark: "02", title: { ko: "시각·청각·운동 장애", en: "Visual, Auditory, and Motor Disabilities" }, sub: { ko: "유형별 특성과 영향", en: "Characteristics and impact by type" } },
					{ mark: "03", title: { ko: "인지·학습·심리 장애", en: "Cognitive, Learning, and Psychological Disabilities" }, sub: { ko: "디지털 환경에서의 어려움", en: "Barriers in digital environments" } },
					{ mark: "04", title: { ko: "스크린 리더와 입력 보조 기술", en: "Screen Readers and Input Assistive Technology" }, sub: { ko: "JAWS, NVDA, VoiceOver, 스위치 컨트롤", en: "JAWS, NVDA, VoiceOver, switch control" } },
					{ mark: "05", title: { ko: "인구 통계와 노화", en: "Demographics and Aging" }, sub: { ko: "접근성의 비즈니스 가치", en: "The business value of accessibility" } },
					{ mark: "06", title: { ko: "유니버설 디자인", en: "Universal Design" }, sub: { ko: "7가지 원칙과 적용", en: "The seven principles in practice" } },
				],
			},
			{
				domainNum: "02",
				weightPct: 40,
				topics: [
					{ mark: "07", title: { ko: "WCAG 2.x", en: "WCAG 2.x" }, sub: { ko: "POUR 원칙, A/AA/AAA", en: "POUR principles, A/AA/AAA levels" } },
					{ mark: "08", title: { ko: "ADA · Section 508 · EN 301 549", en: "ADA · Section 508 · EN 301 549" }, sub: { ko: "국가별 접근성 법률", en: "Accessibility law by country" } },
					{ mark: "09", title: { ko: "유엔 장애인권리협약(CRPD)", en: "UN CRPD" }, sub: { ko: "국제 인권 프레임워크", en: "International human-rights framework" } },
					{ mark: "10", title: { ko: "조직 차원의 접근성", en: "Organizational Accessibility" }, sub: { ko: "정책, 거버넌스, 성숙도 모델", en: "Policy, governance, maturity models" } },
					{ mark: "11", title: { ko: "접근성 사업 사례", en: "The Business Case" }, sub: { ko: "ROI와 위험 관리", en: "ROI and risk management" } },
					{ mark: "12", title: { ko: "VPAT · 적합성 보고서", en: "VPAT and Conformance Reports" }, sub: { ko: "평가 문서 작성 기초", en: "Evaluation documentation basics" } },
				],
			},
			{
				domainNum: "03",
				weightPct: 20,
				topics: [
					{ mark: "13", title: { ko: "디지털 콘텐츠 접근성", en: "Digital Content Accessibility" }, sub: { ko: "웹·모바일·문서", en: "Web, mobile, and documents" } },
					{ mark: "14", title: { ko: "건축 환경 접근성", en: "Built Environment Accessibility" }, sub: { ko: "물리적 공간 설계", en: "Physical space design" } },
					{ mark: "15", title: { ko: "제품 · 서비스 접근성", en: "Product and Service Accessibility" }, sub: { ko: "하드웨어와 고객 서비스", en: "Hardware and customer service" } },
					{ mark: "16", title: { ko: "접근성 사용자 테스트", en: "Accessibility User Testing" }, sub: { ko: "참여형 평가 방법", en: "Participatory evaluation methods" } },
				],
			},
		],
	},
	was: {
		certNo: "02",
		lede: {
			ko: "웹 개발자·QA 대상 기술 자격증. WCAG 적용, ARIA, 코드 검증, 보조기술 기반 실제 검수 능력을 평가하는 IAAP 전문가 자격증입니다.",
			en: "Technical IAAP certification for web developers and QA professionals. Tests WCAG application, ARIA, code validation, and real-world audit skills.",
		},
		metaTitle: { ko: "WAS 시험 준비", en: "WAS Exam Prep" },
		metaDescription: {
			ko: "IAAP WAS(Web Accessibility Specialist) 자격증 시험 정보, 도메인별 학습 가이드, 모의 퀴즈, 플래시카드를 한국어로 제공합니다.",
			en: "IAAP WAS (Web Accessibility Specialist) exam info, domain study guides, mock quizzes, and flashcards — in Korean and English.",
		},
		totalQuestionsLabel: { ko: "3개 도메인, 총 75문항", en: "3 domains · 75 questions total" },
		domains: [
			{
				domainNum: "01",
				weightPct: 40,
				topics: [
					{ mark: "01", title: { ko: "의미론적 HTML", en: "Semantic HTML" }, sub: { ko: "랜드마크, 헤딩, 폼", en: "Landmarks, headings, forms" } },
					{ mark: "02", title: { ko: "대체 텍스트와 미디어", en: "Text Alternatives and Media" }, sub: { ko: "alt, caption, transcript", en: "alt, captions, transcripts" } },
					{ mark: "03", title: { ko: "색상과 대비", en: "Color and Contrast" }, sub: { ko: "4.5:1, 3:1 비대비 요건", en: "4.5:1 and 3:1 contrast requirements" } },
					{ mark: "04", title: { ko: "키보드 접근성", en: "Keyboard Accessibility" }, sub: { ko: "포커스 순서, 트랩", en: "Focus order and traps" } },
					{ mark: "05", title: { ko: "ARIA 1.x", en: "ARIA 1.x" }, sub: { ko: "역할·속성·상태, 5가지 규칙", en: "Roles, properties, states, five rules" } },
					{ mark: "06", title: { ko: "반응형·줌·텍스트 간격", en: "Responsive, Zoom, Text Spacing" }, sub: { ko: "200% 확대 요건", en: "200% zoom requirement" } },
				],
			},
			{
				domainNum: "02",
				weightPct: 30,
				topics: [
					{ mark: "07", title: { ko: "자동 검사 도구", en: "Automated Testing Tools" }, sub: { ko: "axe, WAVE, Lighthouse 한계", en: "axe, WAVE, Lighthouse limits" } },
					{ mark: "08", title: { ko: "수동 검수 절차", en: "Manual Audit Procedures" }, sub: { ko: "키보드·확대·색상 점검", en: "Keyboard, zoom, color checks" } },
					{ mark: "09", title: { ko: "스크린 리더 검수", en: "Screen Reader Testing" }, sub: { ko: "NVDA, JAWS, VoiceOver", en: "NVDA, JAWS, VoiceOver" } },
					{ mark: "10", title: { ko: "모바일 앱 검수", en: "Mobile App Testing" }, sub: { ko: "TalkBack, VoiceOver iOS", en: "TalkBack, VoiceOver on iOS" } },
					{ mark: "11", title: { ko: "WCAG 적합성 판정", en: "WCAG Conformance Evaluation" }, sub: { ko: "충족·실패·해당없음", en: "Pass, fail, not applicable" } },
					{ mark: "12", title: { ko: "결함 보고서 작성", en: "Defect Reporting" }, sub: { ko: "우선순위와 권고안", en: "Prioritization and recommendations" } },
				],
			},
			{
				domainNum: "03",
				weightPct: 30,
				topics: [
					{ mark: "13", title: { ko: "테스트 범위 결정", en: "Test Scoping" }, sub: { ko: "샘플링 전략", en: "Sampling strategies" } },
					{ mark: "14", title: { ko: "WCAG-EM 평가 방법론", en: "WCAG-EM Methodology" }, sub: { ko: "5단계 절차", en: "Five-step procedure" } },
					{ mark: "15", title: { ko: "장애인 사용자 테스트", en: "Testing with Disabled Users" }, sub: { ko: "참여형 검증", en: "Participatory validation" } },
					{ mark: "16", title: { ko: "지속적 통합과 회귀", en: "CI and Regression" }, sub: { ko: "CI 파이프라인 통합", en: "CI pipeline integration" } },
				],
			},
		],
	},
};
