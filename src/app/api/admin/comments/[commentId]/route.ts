import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";

/** PATCH /api/admin/comments/[commentId] — 댓글 숨김/복원 (감사 로그 자동) */
export async function PATCH(
	request: NextRequest,
	{ params }: { params: Promise<{ commentId: string }> }
) {
	const { commentId } = await params;
	const { supabase, errorResponse } = await requireAdmin();
	if (errorResponse) return errorResponse;

	const body = await request.json();
	if (typeof body.is_deleted !== "boolean") {
		return NextResponse.json({ error: "is_deleted(boolean) 필요" }, { status: 400 });
	}

	const { error } = await supabase.rpc("admin_set_comment_deleted", {
		p_comment_id: commentId,
		p_deleted: body.is_deleted,
	});

	if (error) {
		console.error("[PATCH /api/admin/comments]", error.message);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json({ ok: true });
}
