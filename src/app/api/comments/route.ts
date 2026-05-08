import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

const MAX_CONTENT_LENGTH = 2000;

/**
 * GET /api/comments?path=/cpacc/study/cpacc-1-1
 * 페이지별 댓글 조회
 */
export async function GET(request: NextRequest) {
	const pagePath = request.nextUrl.searchParams.get("path");
	if (!pagePath) return NextResponse.json({ error: "path required" }, { status: 400 });

	const supabase = await createClient();

	const { data, error } = await supabase
		.from("comments")
		.select(
			`
      id, content, parent_id, created_at, updated_at, is_deleted,
      profiles:user_id ( id, nickname, avatar_url )
    `
		)
		.eq("page_path", pagePath)
		.order("created_at", { ascending: true });

	if (error) {
		console.error("[GET /api/comments]", error.message);
		return NextResponse.json({ error: "댓글을 불러올 수 없습니다." }, { status: 500 });
	}

	return NextResponse.json({ comments: data });
}

/**
 * POST /api/comments
 * 새 댓글 작성 (로그인 필요)
 */
export async function POST(request: NextRequest) {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	const body = await request.json();
	const { page_path, parent_id } = body;
	const content: string = body.content ?? "";

	if (!page_path || !content.trim()) {
		return NextResponse.json({ error: "page_path and content required" }, { status: 400 });
	}
	if (content.length > MAX_CONTENT_LENGTH) {
		return NextResponse.json(
			{ error: `댓글은 ${MAX_CONTENT_LENGTH}자 이하로 작성해주세요` },
			{ status: 400 }
		);
	}

	const { data, error } = await supabase
		.from("comments")
		.insert({
			user_id: user.id,
			page_path,
			content: content.trim(),
			parent_id: parent_id ?? null,
		})
		.select(
			`
      id, content, parent_id, created_at, updated_at, is_deleted,
      profiles:user_id ( id, nickname, avatar_url )
    `
		)
		.single();

	if (error) {
		console.error("[POST /api/comments]", error.message);
		return NextResponse.json({ error: "댓글을 저장할 수 없습니다." }, { status: 500 });
	}

	return NextResponse.json({ comment: data }, { status: 201 });
}
