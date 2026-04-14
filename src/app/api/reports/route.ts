import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

function makeSupabase(cookieStore: Awaited<ReturnType<typeof cookies>>) {
	return createServerClient(
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
}

/**
 * POST /api/reports
 * 제보 생성 — reports + board_posts 동시 삽입
 */
export async function POST(request: NextRequest) {
	const cookieStore = await cookies();
	const supabase = makeSupabase(cookieStore);

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	const { type, target_type, target_id, title, content } = await request.json();

	if (!type || !target_type || !title?.trim() || !content?.trim()) {
		return NextResponse.json({ error: "필수 필드가 누락되었습니다" }, { status: 400 });
	}

	// 1. board_posts에 먼저 삽입 (제보 게시글)
	const { data: post, error: postError } = await supabase
		.from("board_posts")
		.insert({
			user_id: user.id,
			category: "report",
			title: title.trim(),
			content: content.trim(),
		})
		.select("id")
		.single();

	if (postError) {
		return NextResponse.json({ error: postError.message }, { status: 400 });
	}

	// 2. reports 삽입
	const { data: report, error: reportError } = await supabase
		.from("reports")
		.insert({
			user_id: user.id,
			type,
			target_type,
			target_id: target_id ?? null,
			title: title.trim(),
			content: content.trim(),
			board_post_id: post.id,
		})
		.select("id")
		.single();

	if (reportError) {
		return NextResponse.json({ error: reportError.message }, { status: 400 });
	}

	return NextResponse.json({ report, post }, { status: 201 });
}

/**
 * GET /api/reports — 관리자용 제보 목록 조회 (향후 권한 추가)
 */
export async function GET() {
	const cookieStore = await cookies();
	const supabase = makeSupabase(cookieStore);

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	const { data, error } = await supabase
		.from("reports")
		.select("*, profiles:user_id(nickname)")
		.order("created_at", { ascending: false })
		.limit(50);

	if (error) return NextResponse.json({ error: error.message }, { status: 500 });

	return NextResponse.json({ reports: data });
}
