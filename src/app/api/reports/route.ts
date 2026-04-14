import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

const MAX_TITLE_LENGTH = 200;
const MAX_CONTENT_LENGTH = 5000;

/**
 * POST /api/reports
 * 제보 생성 — reports + board_posts 동시 삽입
 */
export async function POST(request: NextRequest) {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	const body = await request.json();
	const { type, target_type, target_id } = body;
	const title: string = body.title ?? "";
	const content: string = body.content ?? "";

	if (!type || !target_type || !title.trim() || !content.trim()) {
		return NextResponse.json({ error: "필수 필드가 누락되었습니다" }, { status: 400 });
	}
	if (title.length > MAX_TITLE_LENGTH) {
		return NextResponse.json(
			{ error: `제목은 ${MAX_TITLE_LENGTH}자 이하로 작성해주세요` },
			{ status: 400 }
		);
	}
	if (content.length > MAX_CONTENT_LENGTH) {
		return NextResponse.json(
			{ error: `내용은 ${MAX_CONTENT_LENGTH}자 이하로 작성해주세요` },
			{ status: 400 }
		);
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
 * GET /api/reports — 관리자 전용 제보 목록 조회
 */
export async function GET() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	// 관리자 권한 확인 (profiles.role = 'admin')
	const { data: profile } = await supabase
		.from("profiles")
		.select("role")
		.eq("id", user.id)
		.single();

	if (profile?.role !== "admin") {
		return NextResponse.json({ error: "Forbidden" }, { status: 403 });
	}

	const { data, error } = await supabase
		.from("reports")
		.select("*, profiles:user_id(nickname)")
		.order("created_at", { ascending: false })
		.limit(50);

	if (error) return NextResponse.json({ error: error.message }, { status: 500 });

	return NextResponse.json({ reports: data });
}
