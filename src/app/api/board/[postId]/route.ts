import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

const MAX_TITLE_LENGTH = 200;
const MAX_CONTENT_LENGTH = 10000;

/**
 * GET /api/board/[postId]
 * 게시글 상세 + 조회수 증가
 */
export async function GET(
	_request: NextRequest,
	{ params }: { params: Promise<{ postId: string }> }
) {
	const { postId } = await params;
	const supabase = await createClient();

	// 게시글 조회
	const { data: post, error } = await supabase
		.from("board_posts")
		.select(
			`
      id, category, title, content, view_count, reply_count, is_pinned, created_at, updated_at,
      profiles:user_id ( id, nickname, avatar_url )
    `
		)
		.eq("id", postId)
		.eq("is_deleted", false)
		.single();

	if (error || !post) {
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	}

	// 조회수 증가 — rpc로 atomic increment (레이스 컨디션 방지)
	await supabase.rpc("increment_view_count", { post_id: postId }).catch(() => {
		// rpc 미설치 시 fallback (실패해도 무시)
		supabase
			.from("board_posts")
			.update({ view_count: (post.view_count ?? 0) + 1 })
			.eq("id", postId);
	});

	// 댓글 조회
	const { data: replies } = await supabase
		.from("board_replies")
		.select(
			`
      id, content, parent_id, created_at,
      profiles:user_id ( id, nickname, avatar_url )
    `
		)
		.eq("post_id", postId)
		.eq("is_deleted", false)
		.order("created_at", { ascending: true });

	return NextResponse.json({ post, replies: replies ?? [] });
}

/**
 * PATCH /api/board/[postId]
 * 게시글 수정 (본인만)
 */
export async function PATCH(
	request: NextRequest,
	{ params }: { params: Promise<{ postId: string }> }
) {
	const { postId } = await params;
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	const body = await request.json();
	const title: string | undefined = body.title;
	const content: string | undefined = body.content;

	if (title !== undefined && title.length > MAX_TITLE_LENGTH) {
		return NextResponse.json(
			{ error: `제목은 ${MAX_TITLE_LENGTH}자 이하로 작성해주세요` },
			{ status: 400 }
		);
	}
	if (content !== undefined && content.length > MAX_CONTENT_LENGTH) {
		return NextResponse.json(
			{ error: `본문은 ${MAX_CONTENT_LENGTH}자 이하로 작성해주세요` },
			{ status: 400 }
		);
	}

	const { data, error } = await supabase
		.from("board_posts")
		.update({
			...(title && { title: title.trim() }),
			...(content && { content: content.trim() }),
			updated_at: new Date().toISOString(),
		})
		.eq("id", postId)
		.eq("user_id", user.id)
		.select("id, title, updated_at")
		.single();

	if (error) {
		console.error("[PATCH /api/board]", error.message);
		return NextResponse.json({ error: "게시글을 수정할 수 없습니다." }, { status: 500 });
	}
	if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });

	return NextResponse.json({ post: data });
}

/**
 * DELETE /api/board/[postId]
 * 게시글 소프트 삭제 (본인만)
 */
export async function DELETE(
	_request: NextRequest,
	{ params }: { params: Promise<{ postId: string }> }
) {
	const { postId } = await params;
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	const { error } = await supabase
		.from("board_posts")
		.update({ is_deleted: true })
		.eq("id", postId)
		.eq("user_id", user.id);

	if (error) {
		console.error("[DELETE /api/board]", error.message);
		return NextResponse.json({ error: "게시글을 삭제할 수 없습니다." }, { status: 500 });
	}

	return NextResponse.json({ success: true });
}
