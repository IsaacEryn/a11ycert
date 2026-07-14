import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";

const ALLOWED_STATUSES = ["open", "in_review", "resolved", "rejected"] as const;

/** PATCH /api/admin/reports/[reportId] — 제보 상태 변경 (감사 로그 자동) */
export async function PATCH(
	request: NextRequest,
	{ params }: { params: Promise<{ reportId: string }> }
) {
	const { reportId } = await params;
	const { supabase, errorResponse } = await requireAdmin();
	if (errorResponse) return errorResponse;

	const body = await request.json();
	const status = body.status;
	if (!ALLOWED_STATUSES.includes(status)) {
		return NextResponse.json({ error: "유효하지 않은 상태입니다" }, { status: 400 });
	}

	const { error } = await supabase.rpc("admin_update_report_status", {
		p_report_id: reportId,
		p_status: status,
	});

	if (error) {
		console.error("[PATCH /api/admin/reports]", error.message);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json({ ok: true });
}
