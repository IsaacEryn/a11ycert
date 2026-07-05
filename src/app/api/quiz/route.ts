import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * GET /api/quiz?exam=cpacc&domain=1&unit_id=cpacc-1-1
 * 퀴즈 문항 조회 (공개)
 */
export async function GET(request: NextRequest) {
	const { searchParams } = request.nextUrl;
	const exam = searchParams.get("exam");
	const domain = searchParams.get("domain");
	const unitId = searchParams.get("unit_id");

	const supabase = await createClient();

	let query = supabase.from("quiz_questions").select("*").eq("is_active", true);

	if (unitId) query = query.eq("unit_id", unitId);
	else if (exam && domain) query = query.eq("exam", exam).eq("domain", Number(domain));
	else if (exam) query = query.eq("exam", exam);

	const { data, error } = await query.order("created_at");

	if (error) {
		console.error("[GET /api/quiz]", error.message);
		return NextResponse.json({ error: "퀴즈를 불러올 수 없습니다." }, { status: 500 });
	}

	return NextResponse.json({ questions: data });
}

// 삽입 허용 필드 화이트리스트 (mass assignment 방지) — 001_initial_schema.sql 컬럼 기준
const INSERTABLE_FIELDS = [
	"id",
	"exam",
	"domain",
	"unit_id",
	"difficulty",
	"question_ko",
	"question_en",
	"option_a_ko",
	"option_a_en",
	"option_b_ko",
	"option_b_en",
	"option_c_ko",
	"option_c_en",
	"option_d_ko",
	"option_d_en",
	"answer",
	"explanation_ko",
	"explanation_en",
	"is_active",
] as const;

/**
 * POST /api/quiz — 퀴즈 문항 추가 (관리자 전용)
 */
export async function POST(request: NextRequest) {
	const supabase = await createClient();

	// 로그인 확인
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	// 어드민 권한 확인
	const { data: profile } = await supabase
		.from("profiles")
		.select("role")
		.eq("id", user.id)
		.single();
	if (!profile || profile.role !== "admin") {
		return NextResponse.json({ error: "Forbidden" }, { status: 403 });
	}

	const body = await request.json();
	const row = Object.fromEntries(
		INSERTABLE_FIELDS.filter((field) => body[field] !== undefined).map((field) => [
			field,
			body[field],
		])
	);

	const { data, error } = await supabase.from("quiz_questions").insert(row).select().single();

	if (error) {
		console.error("[POST /api/quiz]", error.message);
		return NextResponse.json({ error: "문항을 저장할 수 없습니다." }, { status: 400 });
	}

	return NextResponse.json({ question: data }, { status: 201 });
}
