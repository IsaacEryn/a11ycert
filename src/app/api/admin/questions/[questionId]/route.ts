import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";

/** PATCH /api/admin/questions/[questionId] — 문항 활성/비활성 (감사 로그 자동) */
export async function PATCH(
	request: NextRequest,
	{ params }: { params: Promise<{ questionId: string }> }
) {
	const { questionId } = await params;
	const { supabase, errorResponse } = await requireAdmin();
	if (errorResponse) return errorResponse;

	const body = await request.json();
	if (typeof body.is_active !== "boolean") {
		return NextResponse.json({ error: "is_active(boolean) 필요" }, { status: 400 });
	}

	const { error } = await supabase.rpc("admin_set_question_active", {
		p_question_id: questionId,
		p_active: body.is_active,
	});

	if (error) {
		console.error("[PATCH /api/admin/questions]", error.message);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json({ ok: true });
}
