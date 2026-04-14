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
  questions: QuizQuestion[];
}

export interface DomainGroup {
  domain: 1 | 2 | 3;
  title: { ko: string; en: string };
  weight: { ko: string; en: string };
  units: StudyUnit[];
}
