import { createClient } from "@/lib/supabase/client";
import { cpaccUnits } from "@/lib/content/cpacc-units";
import { wasUnits } from "@/lib/content/was-units";
import type { QuizQuestion } from "@/lib/content/types";

// DB에서 퀴즈를 가져오는 서비스
// Supabase 미연결/빈 결과 시 로컬 TypeScript 파일로 fallback

/** DB 행 → QuizQuestion 변환 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function dbToQuizQuestion(row: any): QuizQuestion {
	return {
		id: row.id,
		question: { ko: row.question_ko, en: row.question_en },
		options: {
			a: { ko: row.option_a_ko, en: row.option_a_en },
			b: { ko: row.option_b_ko, en: row.option_b_en },
			c: { ko: row.option_c_ko, en: row.option_c_en },
			d: { ko: row.option_d_ko, en: row.option_d_en },
		},
		answer: row.answer,
		explanation: { ko: row.explanation_ko, en: row.explanation_en },
	};
}

const allLocalUnits = [...cpaccUnits, ...wasUnits];

export async function getQuizzesByUnit(unitId: string): Promise<QuizQuestion[]> {
	try {
		const supabase = createClient();
		const { data, error } = await supabase
			.from("quiz_questions")
			.select("*")
			.eq("unit_id", unitId)
			.eq("is_active", true)
			.order("created_at");

		if (!error && data && data.length > 0) return data.map(dbToQuizQuestion);
	} catch {
		/* fallback */
	}

	return allLocalUnits.find((u) => u.id === unitId)?.questions ?? [];
}

export async function getQuizzesByExam(exam: "cpacc" | "was"): Promise<QuizQuestion[]> {
	try {
		const supabase = createClient();
		const { data, error } = await supabase
			.from("quiz_questions")
			.select("*")
			.eq("exam", exam)
			.eq("is_active", true)
			.order("domain")
			.order("unit_id");

		if (!error && data && data.length > 0) return data.map(dbToQuizQuestion);
	} catch {
		/* fallback */
	}

	return allLocalUnits.filter((u) => u.exam === exam).flatMap((u) => u.questions);
}

export async function getQuizzesByDomain(
	exam: "cpacc" | "was",
	domain: number
): Promise<QuizQuestion[]> {
	try {
		const supabase = createClient();
		const { data, error } = await supabase
			.from("quiz_questions")
			.select("*")
			.eq("exam", exam)
			.eq("domain", domain)
			.eq("is_active", true)
			.order("unit_id");

		if (!error && data && data.length > 0) return data.map(dbToQuizQuestion);
	} catch {
		/* fallback */
	}

	return allLocalUnits
		.filter((u) => u.exam === exam && u.domain === domain)
		.flatMap((u) => u.questions);
}

/** ID 목록으로 퀴즈 조회 (오답노트, 저장 퀴즈) */
export async function getQuizzesByIds(ids: string[]): Promise<QuizQuestion[]> {
	if (ids.length === 0) return [];

	try {
		const supabase = createClient();
		const { data, error } = await supabase
			.from("quiz_questions")
			.select("*")
			.in("id", ids)
			.eq("is_active", true);

		if (!error && data && data.length > 0) return data.map(dbToQuizQuestion);
	} catch {
		/* fallback */
	}

	return allLocalUnits.flatMap((u) => u.questions).filter((q) => ids.includes(q.id));
}
