import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

const MAX_NOTE_LENGTH = 5000;

/**
 * GET /api/notes?path=/cpacc/study/cpacc-1-1
 * 특정 페이지의 내 메모 조회
 * GET /api/notes (path 없음) → 내 전체 메모 목록
 */
export async function GET(request: NextRequest) {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	const pagePath = request.nextUrl.searchParams.get("path");

	if (pagePath) {
		// 특정 페이지 메모
		const { data, error } = await supabase
			.from("study_notes")
			.select("id, content, page_path, unit_id, updated_at")
			.eq("user_id", user.id)
			.eq("page_path", pagePath)
			.maybeSingle();

		if (error) return NextResponse.json({ error: error.message }, { status: 500 });
		return NextResponse.json({ note: data });
	}

	// 전체 메모 목록
	const { data, error } = await supabase
		.from("study_notes")
		.select("id, content, page_path, unit_id, updated_at")
		.eq("user_id", user.id)
		.order("updated_at", { ascending: false });

	if (error) return NextResponse.json({ error: error.message }, { status: 500 });
	return NextResponse.json({ notes: data ?? [] });
}

/**
 * POST /api/notes
 * 메모 저장 (upsert: page_path + user_id 기준)
 */
export async function POST(request: NextRequest) {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	const body = await request.json();
	const { page_path, unit_id } = body;
	const content: string = body.content ?? "";

	if (!page_path || !unit_id) {
		return NextResponse.json({ error: "page_path, unit_id 필수" }, { status: 400 });
	}
	if (content.length > MAX_NOTE_LENGTH) {
		return NextResponse.json(
			{ error: `메모는 ${MAX_NOTE_LENGTH}자 이하로 작성해주세요` },
			{ status: 400 }
		);
	}

	// 내용이 비어있으면 삭제
	if (!content.trim()) {
		await supabase.from("study_notes").delete().eq("user_id", user.id).eq("page_path", page_path);
		return NextResponse.json({ deleted: true });
	}

	const { data, error } = await supabase
		.from("study_notes")
		.upsert(
			{
				user_id: user.id,
				page_path,
				unit_id,
				content: content.trim(),
				updated_at: new Date().toISOString(),
			},
			{ onConflict: "user_id,page_path" }
		)
		.select("id, content, updated_at")
		.single();

	if (error) return NextResponse.json({ error: error.message }, { status: 400 });

	return NextResponse.json({ note: data });
}

/**
 * DELETE /api/notes?path=/cpacc/study/cpacc-1-1
 * 메모 삭제
 */
export async function DELETE(request: NextRequest) {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	const pagePath = request.nextUrl.searchParams.get("path");
	if (!pagePath) return NextResponse.json({ error: "path required" }, { status: 400 });

	const { error } = await supabase
		.from("study_notes")
		.delete()
		.eq("user_id", user.id)
		.eq("page_path", pagePath);

	if (error) return NextResponse.json({ error: error.message }, { status: 400 });

	return NextResponse.json({ success: true });
}
