import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";

/** PATCH /api/admin/users/[userId] — 역할 변경 (자기 자신 금지, 감사 로그 자동) */
export async function PATCH(
	request: NextRequest,
	{ params }: { params: Promise<{ userId: string }> }
) {
	const { userId } = await params;
	const { supabase, errorResponse } = await requireAdmin();
	if (errorResponse) return errorResponse;

	const body = await request.json();
	const role = body.role;
	if (role !== "user" && role !== "admin") {
		return NextResponse.json({ error: "유효하지 않은 역할입니다" }, { status: 400 });
	}

	const { error } = await supabase.rpc("set_user_role", {
		p_target: userId,
		p_new_role: role,
	});

	if (error) {
		console.error("[PATCH /api/admin/users]", error.message);
		const status = error.message.includes("own role") ? 400 : 500;
		return NextResponse.json({ error: error.message }, { status });
	}

	return NextResponse.json({ ok: true });
}
