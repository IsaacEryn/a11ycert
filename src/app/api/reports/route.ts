import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { checkWriteRateLimit, RATE_LIMIT_MESSAGE } from "@/lib/limits/write-rate-limit";

const MAX_TITLE_LENGTH = 200;
const MAX_CONTENT_LENGTH = 5000;
const ALLOWED_TYPES = ["correction", "error", "suggestion"] as const;
const ALLOWED_TARGET_TYPES = ["quiz", "content", "glossary"] as const;

/**
 * POST /api/reports
 * 제보 생성 — reports + board_posts 동시 삽입
 */
export async function POST(request: NextRequest) {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	// 스팸 방지
	const rate = await checkWriteRateLimit(supabase, "reports", user.id, { max: 3 });
	if (!rate.allowed) return NextResponse.json({ error: RATE_LIMIT_MESSAGE }, { status: 429 });

	const body = await request.json();
	const { type, target_type, target_id } = body;
	const title: string = body.title ?? "";
	const content: string = body.content ?? "";

	if (!type || !target_type || !title.trim() || !content.trim()) {
		return NextResponse.json({ error: "필수 필드가 누락되었습니다" }, { status: 400 });
	}
	if (
		!ALLOWED_TYPES.includes(type) ||
		!ALLOWED_TARGET_TYPES.includes(target_type) ||
		(target_id !== undefined && target_id !== null && typeof target_id !== "string")
	) {
		return NextResponse.json({ error: "유효하지 않은 제보 유형입니다" }, { status: 400 });
	}
	if (title.length > MAX_TITLE_LENGTH) {
		return NextResponse.json(
			{ error: `제목은 ${MAX_TITLE_LENGTH}자 이하로 작성해주세요` },
			{ status: 400 }
		);
	}
	if (content.length > MAX_CONTENT_LENGTH) {
		return NextResponse.json(
			{ error: `내용은 ${MAX_CONTENT_LENGTH}자 이하로 작성해주세요` },
			{ status: 400 }
		);
	}

	// 1. board_posts에 먼저 삽입 (제보 게시글)
	const { data: post, error: postError } = await supabase
		.from("board_posts")
		.insert({
			user_id: user.id,
			category: "report",
			title: title.trim(),
			content: content.trim(),
		})
		.select("id")
		.single();

	if (postError) {
		console.error("[POST /api/reports] board_posts insert", postError.message);
		return NextResponse.json({ error: "제보를 저장할 수 없습니다." }, { status: 500 });
	}

	// 2. reports 삽입
	const { data: report, error: reportError } = await supabase
		.from("reports")
		.insert({
			user_id: user.id,
			type,
			target_type,
			target_id: target_id ?? null,
			title: title.trim(),
			content: content.trim(),
			board_post_id: post.id,
		})
		.select("id")
		.single();

	if (reportError) {
		console.error("[POST /api/reports] reports insert", reportError.message);
		// 고아 게시글 방지: 방금 만든 board_post 롤백
		await supabase.from("board_posts").delete().eq("id", post.id).eq("user_id", user.id);
		return NextResponse.json({ error: "제보를 저장할 수 없습니다." }, { status: 500 });
	}

	// 퀴즈 문항 제보면 신고 카운트 증가 (실패해도 제보 저장에는 영향 없음)
	if (target_type === "quiz" && typeof target_id === "string" && target_id) {
		const { error: rpcError } = await supabase.rpc("increment_report_count", {
			question_id: target_id,
		});
		if (rpcError) {
			console.error("[POST /api/reports] increment_report_count", rpcError.message);
		}
	}

	return NextResponse.json({ report, post }, { status: 201 });
}

/**
 * GET /api/reports — 관리자 전용 제보 목록 조회
 */
export async function GET() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	// 관리자 권한 확인 (profiles.role = 'admin')
	const { data: profile } = await supabase
		.from("profiles")
		.select("role")
		.eq("id", user.id)
		.single();

	if (!profile || profile.role !== "admin") {
		return NextResponse.json({ error: "Forbidden" }, { status: 403 });
	}

	const { data, error } = await supabase
		.from("reports")
		.select("*, profiles:user_id(nickname)")
		.order("created_at", { ascending: false })
		.limit(50);

	if (error) {
		console.error("[GET /api/reports]", error.message);
		return NextResponse.json({ error: "목록을 불러올 수 없습니다." }, { status: 500 });
	}

	return NextResponse.json({ reports: data });
}
