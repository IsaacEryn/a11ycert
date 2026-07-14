import type { UnitReference } from "./types";

/**
 * 단원별 외부 참고 자료 링크 — unitId 키로 index.ts에서 단원에 병합됨.
 * 규칙: https URL 필수, 공식/권위 자료 우선(W3C·WAI·WHO·UN·정부·WebAIM 등),
 * 단원당 2~5개. 섹션 단위 링크가 필요하면 콘텐츠 파일의 sections[].references 사용.
 */
export const unitReferences: Record<string, UnitReference[]> = {
	// ── CPACC Domain 1 ─────────────────────────────────────────────────────────
	"cpacc-1-1": [
		{ label: { ko: "W3C WAI — 접근성 기초 (Accessibility Fundamentals)", en: "W3C WAI — Accessibility Fundamentals" }, url: "https://www.w3.org/WAI/fundamentals/" },
		{ label: { ko: "WHO — 장애와 건강 팩트시트", en: "WHO — Disability and Health fact sheet" }, url: "https://www.who.int/news-room/fact-sheets/detail/disability-and-health" },
		{ label: { ko: "UN 장애인권리협약 (CRPD)", en: "UN Convention on the Rights of Persons with Disabilities (CRPD)" }, url: "https://social.desa.un.org/issues/disability/crpd/convention-on-the-rights-of-persons-with-disabilities-crpd" },
	],
	"cpacc-1-2": [
		{ label: { ko: "W3C WAI — 사람들이 웹을 사용하는 방법", en: "W3C WAI — How People with Disabilities Use the Web" }, url: "https://www.w3.org/WAI/people-use-web/" },
		{ label: { ko: "WHO — 실명과 시각 손상 팩트시트", en: "WHO — Blindness and Vision Impairment fact sheet" }, url: "https://www.who.int/news-room/fact-sheets/detail/blindness-and-visual-impairment" },
		{ label: { ko: "WebAIM — 시각 장애 개요", en: "WebAIM — Visual Disabilities" }, url: "https://webaim.org/articles/visual/" },
	],
	"cpacc-1-3": [
		{ label: { ko: "WHO — 난청과 청력 손실 팩트시트", en: "WHO — Deafness and Hearing Loss fact sheet" }, url: "https://www.who.int/news-room/fact-sheets/detail/deafness-and-hearing-loss" },
		{ label: { ko: "WebAIM — 청각 장애 개요", en: "WebAIM — Auditory Disabilities" }, url: "https://webaim.org/articles/auditory/" },
		{ label: { ko: "W3C WAI — 접근 가능한 오디오·비디오 제작", en: "W3C WAI — Making Audio and Video Media Accessible" }, url: "https://www.w3.org/WAI/media/av/" },
	],
	"cpacc-1-4": [
		{ label: { ko: "WebAIM — 운동 장애 개요", en: "WebAIM — Motor Disabilities" }, url: "https://webaim.org/articles/motor/" },
		{ label: { ko: "W3C WAI — 다양한 능력과 장벽", en: "W3C WAI — Diverse Abilities and Barriers" }, url: "https://www.w3.org/WAI/people-use-web/abilities-barriers/" },
	],
	"cpacc-1-5": [
		{ label: { ko: "WebAIM — 인지 장애 개요", en: "WebAIM — Cognitive Disabilities" }, url: "https://webaim.org/articles/cognitive/" },
		{ label: { ko: "W3C — 인지·학습 장애 사용자를 위한 콘텐츠 (COGA)", en: "W3C — Making Content Usable for People with Cognitive and Learning Disabilities" }, url: "https://www.w3.org/TR/coga-usable/" },
		{ label: { ko: "W3C WAI — 인지 접근성", en: "W3C WAI — Cognitive Accessibility at W3C" }, url: "https://www.w3.org/WAI/cognitive/" },
	],
	"cpacc-1-6": [
		{ label: { ko: "WHO — 세계 장애 보고서", en: "WHO — World Report on Disability" }, url: "https://www.who.int/teams/noncommunicable-diseases/sensory-functions-disability-and-rehabilitation/world-report-on-disability" },
		{ label: { ko: "W3C WAI — 고령 사용자와 웹 접근성", en: "W3C WAI — Older Users and Web Accessibility" }, url: "https://www.w3.org/WAI/older-users/" },
		{ label: { ko: "WHO — 장애와 건강 팩트시트 (통계)", en: "WHO — Disability and Health fact sheet (statistics)" }, url: "https://www.who.int/news-room/fact-sheets/detail/disability-and-health" },
	],
	"cpacc-1-7": [
		{ label: { ko: "W3C WAI — 웹 탐색 도구와 기법", en: "W3C WAI — Tools and Techniques (How People Use the Web)" }, url: "https://www.w3.org/WAI/people-use-web/tools-techniques/" },
		{ label: { ko: "ATIA — 보조기술이란 무엇인가", en: "ATIA — What is Assistive Technology?" }, url: "https://www.atia.org/home/at-resources/what-is-at/" },
	],
	// ── CPACC Domain 2 ─────────────────────────────────────────────────────────
	"cpacc-2-1": [
		{ label: { ko: "CEUD — 보편적 설계 7원칙", en: "CEUD — The 7 Principles of Universal Design" }, url: "https://universaldesign.ie/about-universal-design/the-7-principles" },
		{ label: { ko: "DO-IT — 보편적 설계란", en: "DO-IT — What is Universal Design?" }, url: "https://www.washington.edu/doit/what-universal-design-0" },
	],
	"cpacc-2-2": [
		{ label: { ko: "W3C WAI — WCAG 2 개요", en: "W3C WAI — WCAG 2 Overview" }, url: "https://www.w3.org/WAI/standards-guidelines/wcag/" },
		{ label: { ko: "W3C WAI — 접근성 원칙 (POUR)", en: "W3C WAI — Accessibility Principles" }, url: "https://www.w3.org/WAI/fundamentals/accessibility-principles/" },
	],
	"cpacc-2-3": [
		{ label: { ko: "WCAG 2.2 명세 (W3C 권고안)", en: "WCAG 2.2 Specification (W3C Recommendation)" }, url: "https://www.w3.org/TR/WCAG22/" },
		{ label: { ko: "WCAG 2.2 빠른 참조 (How to Meet)", en: "How to Meet WCAG 2.2 (Quick Reference)" }, url: "https://www.w3.org/WAI/WCAG22/quickref/" },
		{ label: { ko: "WCAG 2.2 이해하기 문서 모음", en: "Understanding WCAG 2.2 (all documents)" }, url: "https://www.w3.org/WAI/WCAG22/Understanding/" },
	],
	"cpacc-2-4": [
		{ label: { ko: "CAST — UDL 가이드라인", en: "CAST — Universal Design for Learning Guidelines" }, url: "https://udlguidelines.cast.org/" },
		{ label: { ko: "NN/g — 사용성 101", en: "Nielsen Norman Group — Usability 101" }, url: "https://www.nngroup.com/articles/usability-101-introduction-to-usability/" },
		{ label: { ko: "W3C WAI — 접근성·사용성·포용의 관계", en: "W3C WAI — Accessibility, Usability, and Inclusion" }, url: "https://www.w3.org/WAI/fundamentals/accessibility-usability-inclusion/" },
	],
	"cpacc-2-5": [
		{ label: { ko: "W3C WAI — 디지털 접근성의 비즈니스 사례", en: "W3C WAI — The Business Case for Digital Accessibility" }, url: "https://www.w3.org/WAI/business-case/" },
	],
	// ── CPACC Domain 3 ─────────────────────────────────────────────────────────
	"cpacc-3-1": [
		{ label: { ko: "UN 장애인권리협약 (CRPD)", en: "UN Convention on the Rights of Persons with Disabilities (CRPD)" }, url: "https://social.desa.un.org/issues/disability/crpd/convention-on-the-rights-of-persons-with-disabilities-crpd" },
		{ label: { ko: "ADA.gov — 미국 장애인법", en: "ADA.gov — Americans with Disabilities Act" }, url: "https://www.ada.gov/" },
		{ label: { ko: "Section508.gov — 미국 재활법 508조", en: "Section508.gov — Rehabilitation Act Section 508" }, url: "https://www.section508.gov/" },
	],
	"cpacc-3-2": [
		{ label: { ko: "W3C WAI — 세계 각국의 웹 접근성 법·정책", en: "W3C WAI — Web Accessibility Laws & Policies" }, url: "https://www.w3.org/WAI/policies/" },
		{ label: { ko: "유럽집행위원회 — 유럽 접근성법 (EAA)", en: "European Commission — European Accessibility Act (EAA)" }, url: "https://employment-social-affairs.ec.europa.eu/policies-and-activities/social-protection-social-inclusion/persons-disabilities/union-equality-strategy-rights-persons-disabilities-2021-2030/european-accessibility-act_en" },
		{ label: { ko: "ETSI — EN 301 549 (유럽 ICT 접근성 표준)", en: "ETSI — EN 301 549 (European ICT accessibility standard)" }, url: "https://www.etsi.org/human-factors-accessibility/en-301-549-v3-the-harmonized-european-standard-for-ict-accessibility" },
	],
	"cpacc-3-3": [
		{ label: { ko: "W3C — 접근성 성숙도 모델", en: "W3C — Accessibility Maturity Model" }, url: "https://www.w3.org/TR/maturity-model/" },
		{ label: { ko: "W3C WAI — 접근성 계획·관리", en: "W3C WAI — Planning and Managing Web Accessibility" }, url: "https://www.w3.org/WAI/planning-and-managing/" },
	],
	"cpacc-3-4": [
		{ label: { ko: "Section508.gov — VPAT 안내 (판매자용)", en: "Section508.gov — Vendor VPAT guidance" }, url: "https://www.section508.gov/sell/vpat/" },
		{ label: { ko: "ITI — VPAT 공식 양식", en: "ITI — Official VPAT templates" }, url: "https://www.itic.org/policy/accessibility/vpat" },
	],
	// ── WAS Domain 1 ───────────────────────────────────────────────────────────
	"was-1-1": [
		{ label: { ko: "W3C WAI 튜토리얼 — 페이지 구조", en: "W3C WAI Tutorials — Page Structure" }, url: "https://www.w3.org/WAI/tutorials/page-structure/" },
		{ label: { ko: "WebAIM — 시맨틱 구조", en: "WebAIM — Semantic Structure" }, url: "https://webaim.org/techniques/semanticstructure/" },
		{ label: { ko: "MDN — 웹 접근성", en: "MDN — Web Accessibility" }, url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility" },
	],
	"was-1-2": [
		{ label: { ko: "WAI-ARIA 1.2 명세", en: "WAI-ARIA 1.2 Specification" }, url: "https://www.w3.org/TR/wai-aria-1.2/" },
		{ label: { ko: "W3C — ARIA 저작 실무 가이드 (APG)", en: "W3C — ARIA Authoring Practices Guide (APG)" }, url: "https://www.w3.org/WAI/ARIA/apg/" },
		{ label: { ko: "W3C — ARIA 올바르게 사용하기 (Using ARIA)", en: "W3C — Using ARIA" }, url: "https://www.w3.org/TR/using-aria/" },
	],
	"was-1-3": [
		{ label: { ko: "WCAG 2.1.1 키보드 — 이해하기", en: "Understanding SC 2.1.1 Keyboard" }, url: "https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html" },
		{ label: { ko: "WCAG 2.4.7 포커스 표시 — 이해하기", en: "Understanding SC 2.4.7 Focus Visible" }, url: "https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html" },
		{ label: { ko: "WebAIM — 키보드 접근성", en: "WebAIM — Keyboard Accessibility" }, url: "https://webaim.org/techniques/keyboard/" },
	],
	"was-1-4": [
		{ label: { ko: "WCAG 1.4.3 대비(최소) — 이해하기", en: "Understanding SC 1.4.3 Contrast (Minimum)" }, url: "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html" },
		{ label: { ko: "WCAG 1.4.1 색상 사용 — 이해하기", en: "Understanding SC 1.4.1 Use of Color" }, url: "https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html" },
		{ label: { ko: "WebAIM — 명도 대비 검사기", en: "WebAIM — Contrast Checker" }, url: "https://webaim.org/resources/contrastchecker/" },
	],
	"was-1-5": [
		{ label: { ko: "W3C WAI 튜토리얼 — 폼", en: "W3C WAI Tutorials — Forms" }, url: "https://www.w3.org/WAI/tutorials/forms/" },
		{ label: { ko: "WCAG 3.3.1 오류 식별 — 이해하기", en: "Understanding SC 3.3.1 Error Identification" }, url: "https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html" },
		{ label: { ko: "WebAIM — 접근 가능한 폼 만들기", en: "WebAIM — Creating Accessible Forms" }, url: "https://webaim.org/techniques/forms/" },
	],
	"was-1-6": [
		{ label: { ko: "W3C WAI 튜토리얼 — 이미지", en: "W3C WAI Tutorials — Images" }, url: "https://www.w3.org/WAI/tutorials/images/" },
		{ label: { ko: "W3C WAI — 접근 가능한 오디오·비디오 제작", en: "W3C WAI — Making Audio and Video Media Accessible" }, url: "https://www.w3.org/WAI/media/av/" },
		{ label: { ko: "WCAG 1.1.1 텍스트 아닌 콘텐츠 — 이해하기", en: "Understanding SC 1.1.1 Non-text Content" }, url: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html" },
	],
	"was-1-7": [
		{ label: { ko: "W3C WAI 튜토리얼 — 표", en: "W3C WAI Tutorials — Tables" }, url: "https://www.w3.org/WAI/tutorials/tables/" },
		{ label: { ko: "WCAG 1.3.1 정보와 관계 — 이해하기", en: "Understanding SC 1.3.1 Info and Relationships" }, url: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html" },
	],
	"was-1-8": [
		{ label: { ko: "W3C APG — 위젯 패턴 모음", en: "W3C APG — Widget Patterns" }, url: "https://www.w3.org/WAI/ARIA/apg/patterns/" },
		{ label: { ko: "WCAG 4.1.2 이름·역할·값 — 이해하기", en: "Understanding SC 4.1.2 Name, Role, Value" }, url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html" },
		{ label: { ko: "WCAG 4.1.3 상태 메시지 — 이해하기", en: "Understanding SC 4.1.3 Status Messages" }, url: "https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html" },
	],
	"was-1-9": [
		{ label: { ko: "WCAG 1.4.10 리플로우 — 이해하기", en: "Understanding SC 1.4.10 Reflow" }, url: "https://www.w3.org/WAI/WCAG22/Understanding/reflow.html" },
		{ label: { ko: "WCAG 1.3.4 방향 — 이해하기", en: "Understanding SC 1.3.4 Orientation" }, url: "https://www.w3.org/WAI/WCAG22/Understanding/orientation.html" },
		{ label: { ko: "WCAG 2.3.3 상호작용 애니메이션 — 이해하기", en: "Understanding SC 2.3.3 Animation from Interactions" }, url: "https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html" },
		{ label: { ko: "W3C WAI — 모바일 접근성 개요", en: "W3C WAI — Mobile Accessibility at W3C" }, url: "https://www.w3.org/WAI/standards-guidelines/mobile/" },
	],
	// ── WAS Domain 2 ───────────────────────────────────────────────────────────
	"was-2-1": [
		{ label: { ko: "W3C WAI — 접근성 평가 도구 목록", en: "W3C WAI — Web Accessibility Evaluation Tools List" }, url: "https://www.w3.org/WAI/test-evaluate/tools/list/" },
		{ label: { ko: "Deque — axe 접근성 테스트 도구", en: "Deque — axe accessibility testing tools" }, url: "https://www.deque.com/axe/" },
		{ label: { ko: "WebAIM — WAVE 평가 도구", en: "WebAIM — WAVE evaluation tool" }, url: "https://wave.webaim.org/" },
	],
	"was-2-2": [
		{ label: { ko: "W3C WAI — 접근성 평가 개요", en: "W3C WAI — Evaluating Web Accessibility Overview" }, url: "https://www.w3.org/WAI/test-evaluate/" },
		{ label: { ko: "W3C — WCAG 평가 방법론 (WCAG-EM)", en: "W3C — WCAG Evaluation Methodology (WCAG-EM)" }, url: "https://www.w3.org/TR/WCAG-EM/" },
		{ label: { ko: "WebAIM — 스크린리더 테스트", en: "WebAIM — Testing with Screen Readers" }, url: "https://webaim.org/articles/screenreader_testing/" },
	],
	// ── WAS Domain 3 ───────────────────────────────────────────────────────────
	"was-3-1": [
		{ label: { ko: "W3C WAI — 임시 수리 접근법 (Interim Repairs)", en: "W3C WAI — Approaches for Interim Repairs" }, url: "https://www.w3.org/WAI/planning/interim-repairs/" },
		{ label: { ko: "WCAG 2.2 빠른 참조 (기법·실패 사례)", en: "How to Meet WCAG 2.2 (techniques & failures)" }, url: "https://www.w3.org/WAI/WCAG22/quickref/" },
	],
	"was-3-2": [
		{ label: { ko: "W3C WAI — 개발자를 위한 접근성 팁", en: "W3C WAI — Developing for Web Accessibility (Tips)" }, url: "https://www.w3.org/WAI/tips/developing/" },
		{ label: { ko: "web.dev — 접근성 학습 과정", en: "web.dev — Learn Accessibility" }, url: "https://web.dev/learn/accessibility" },
	],
};
