import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { checkWriteRateLimit, RATE_LIMIT_MESSAGE } from "@/lib/limits/write-rate-limit";

const MAX_CONTENT_LENGTH = 2000;

/**
 * POST /api/board/[postId]/replies
 * 게시글 댓글 작성 (로그인 필요) — reply_count는 SECURITY DEFINER RPC로 원자 증가
 */
export async function POST(
	request: NextRequest,
	{ params }: { params: Promise<{ postId: string }> }
) {
	const { postId } = await params;
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	// 스팸 방지
	const rate = await checkWriteRateLimit(supabase, "board_replies", user.id, { max: 5 });
	if (!rate.allowed) return NextResponse.json({ error: RATE_LIMIT_MESSAGE }, { status: 429 });

	const body = await request.json();
	const content: string = body.content ?? "";
	const parentId = body.parent_id ?? null;

	if (!content.trim()) {
		return NextResponse.json({ error: "content required" }, { status: 400 });
	}
	if (content.length > MAX_CONTENT_LENGTH) {
		return NextResponse.json(
			{ error: `댓글은 ${MAX_CONTENT_LENGTH}자 이하로 작성해주세요` },
			{ status: 400 }
		);
	}

	const { data, error } = await supabase
		.from("board_replies")
		.insert({
			post_id: postId,
			user_id: user.id,
			content: content.trim(),
			parent_id: parentId,
		})
		.select("id, content, parent_id, created_at, is_deleted")
		.single();

	if (error) {
		console.error("[POST /api/board/[postId]/replies]", error.message);
		return NextResponse.json({ error: "댓글을 저장할 수 없습니다." }, { status: 500 });
	}

	const { error: rpcError } = await supabase.rpc("increment_reply_count", {
		post_id: postId,
	});
	if (rpcError) {
		// 카운트 갱신 실패는 댓글 저장 성공에 영향 없음 — 로깅만
		console.error("[POST /api/board/[postId]/replies] increment_reply_count", rpcError.message);
	}

	return NextResponse.json({ reply: data }, { status: 201 });
}
