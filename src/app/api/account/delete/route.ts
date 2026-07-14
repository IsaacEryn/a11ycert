import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * POST /api/account/delete — 본인 회원 탈퇴.
 * auth.users 삭제 → profiles·콘텐츠 CASCADE 정리,
 * profiles BEFORE DELETE 트리거(005)가 user_deleted 활동 로그 기록.
 */
export async function POST() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	let admin;
	try {
		admin = createAdminClient();
	} catch (e) {
		console.error("[POST /api/account/delete]", e);
		return NextResponse.json(
			{ error: "탈퇴 기능이 아직 설정되지 않았습니다. 관리자에게 문의해주세요." },
			{ status: 503 }
		);
	}

	const { error } = await admin.auth.admin.deleteUser(user.id);
	if (error) {
		console.error("[POST /api/account/delete]", error.message);
		return NextResponse.json({ error: "탈퇴 처리에 실패했습니다." }, { status: 500 });
	}

	return NextResponse.json({ ok: true });
}
