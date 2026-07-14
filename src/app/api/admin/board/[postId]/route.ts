import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";

/** PATCH /api/admin/board/[postId] — 게시글 고정/숨김 (NULL 아닌 필드만, 감사 로그 자동) */
export async function PATCH(
	request: NextRequest,
	{ params }: { params: Promise<{ postId: string }> }
) {
	const { postId } = await params;
	const { supabase, errorResponse } = await requireAdmin();
	if (errorResponse) return errorResponse;

	const body = await request.json();
	const isPinned = typeof body.is_pinned === "boolean" ? body.is_pinned : null;
	const isDeleted = typeof body.is_deleted === "boolean" ? body.is_deleted : null;
	if (isPinned === null && isDeleted === null) {
		return NextResponse.json({ error: "is_pinned 또는 is_deleted 필요" }, { status: 400 });
	}

	const { error } = await supabase.rpc("admin_set_post_state", {
		p_post_id: postId,
		p_pinned: isPinned,
		p_deleted: isDeleted,
	});

	if (error) {
		console.error("[PATCH /api/admin/board]", error.message);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json({ ok: true });
}
