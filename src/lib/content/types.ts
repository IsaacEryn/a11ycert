export interface QuizQuestion {
	id: string;
	question: { ko: string; en: string };
	options: {
		a: { ko: string; en: string };
		b: { ko: string; en: string };
		c: { ko: string; en: string };
		d: { ko: string; en: string };
	};
	answer: "a" | "b" | "c" | "d";
	explanation: { ko: string; en: string };
	/** 소속 도메인 — 데이터 파일엔 없고 로딩 시 소속 단원에서 주입됨 */
	domain?: 1 | 2 | 3;
	difficulty?: "easy" | "medium" | "hard";
}

/** 외부 참고 자료 링크 — W3C Understanding, WAI 문서 등 (https URL 필수) */
export interface UnitReference {
	label: { ko: string; en: string };
	url: string;
}

/** 코드 예제 — WAS 학습용 스니펫 (caption은 ko/en 쌍, code는 언어 중립) */
export interface CodeExample {
	caption: { ko: string; en: string };
	lang: "html" | "css" | "js";
	code: string;
}

/** 소제목 + 문단 묶음 — 긴 본문을 구조화 (ko/en 문단 배열 길이 일치 필수) */
export interface UnitSection {
	heading: { ko: string; en: string };
	paragraphs: { ko: string[]; en: string[] };
	/** 문단 뒤에 표시할 코드 예제 */
	codeExamples?: CodeExample[];
	/** 섹션 하단에 표시할 참고 링크 */
	references?: UnitReference[];
}

export interface StudyUnit {
	id: string;
	exam: "cpacc" | "was";
	domain: 1 | 2 | 3;
	order: number;
	available: boolean;
	title: { ko: string; en: string };
	summary: { ko: string; en: string };
	objectives: { ko: string[]; en: string[] };
	content: { ko: string[]; en: string[] }; // paragraph arrays
	/** sections가 있으면 content 대신 렌더 — 전환 단원은 content를 빈 배열로 (이중 소스 방지) */
	sections?: UnitSection[];
	/** 단원 하단 '참고 자료' 블록에 표시할 링크 모음 */
	references?: UnitReference[];
	questions: QuizQuestion[];
}

export interface DomainGroup {
	domain: 1 | 2 | 3;
	title: { ko: string; en: string };
	weight: { ko: string; en: string };
	units: StudyUnit[];
}
