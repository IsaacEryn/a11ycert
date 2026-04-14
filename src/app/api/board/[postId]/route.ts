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
 * GET /api/board/[postId]
 * 게시글 상세 + 조회수 증가
 */
export async function GET(
	_request: NextRequest,
	{ params }: { params: Promise<{ postId: string }> }
) {
	const { postId } = await params;
	const cookieStore = await cookies();
	const supabase = makeSupabase(cookieStore);

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

	// 조회수 증가 (실패해도 무시)
	await supabase
		.from("board_posts")
		.update({ view_count: (post.view_count ?? 0) + 1 })
		.eq("id", postId);

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
	const cookieStore = await cookies();
	const supabase = makeSupabase(cookieStore);

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	const { title, content } = await request.json();

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

	if (error) return NextResponse.json({ error: error.message }, { status: 400 });
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
	const cookieStore = await cookies();
	const supabase = makeSupabase(cookieStore);

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	const { error } = await supabase
		.from("board_posts")
		.update({ is_deleted: true })
		.eq("id", postId)
		.eq("user_id", user.id);

	if (error) return NextResponse.json({ error: error.message }, { status: 400 });

	return NextResponse.json({ success: true });
}
