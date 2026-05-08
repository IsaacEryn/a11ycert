import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * GET /api/quiz?exam=cpacc&domain=1&unit_id=cpacc-1-1
 * 퀴즈 문항 조회 (공개)
 */
export async function GET(request: NextRequest) {
	const { searchParams } = request.nextUrl;
	const exam = searchParams.get("exam");
	const domain = searchParams.get("domain");
	const unitId = searchParams.get("unit_id");

	const cookieStore = await cookies();
	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					return cookieStore.getAll();
				},
				setAll() {},
			},
		}
	);

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

/**
 * POST /api/quiz — 퀴즈 문항 추가 (관리자 전용)
 * 향후 관리자 권한 체크 추가 예정
 */
export async function POST(request: NextRequest) {
	const cookieStore = await cookies();
	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					return cookieStore.getAll();
				},
				setAll(cs) {
					cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
				},
			},
		}
	);

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

	const { data, error } = await supabase.from("quiz_questions").insert(body).select().single();

	if (error) {
		console.error("[POST /api/quiz]", error.message);
		return NextResponse.json({ error: "문항을 저장할 수 없습니다." }, { status: 400 });
	}

	return NextResponse.json({ question: data }, { status: 201 });
}
