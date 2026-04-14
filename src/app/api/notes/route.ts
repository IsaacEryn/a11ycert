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
 * GET /api/notes?path=/cpacc/study/cpacc-1-1
 * 특정 페이지의 내 메모 조회
 * GET /api/notes (path 없음) → 내 전체 메모 목록
 */
export async function GET(request: NextRequest) {
	const cookieStore = await cookies();
	const supabase = makeSupabase(cookieStore);

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
	const cookieStore = await cookies();
	const supabase = makeSupabase(cookieStore);

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	const { page_path, unit_id, content } = await request.json();

	if (!page_path || !unit_id) {
		return NextResponse.json({ error: "page_path, unit_id 필수" }, { status: 400 });
	}

	// 내용이 비어있으면 삭제
	if (!content?.trim()) {
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
	const cookieStore = await cookies();
	const supabase = makeSupabase(cookieStore);

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
