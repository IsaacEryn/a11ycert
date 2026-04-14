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
 * GET /api/comments?path=/cpacc/study/cpacc-1-1
 * 페이지별 댓글 조회
 */
export async function GET(request: NextRequest) {
	const pagePath = request.nextUrl.searchParams.get("path");
	if (!pagePath) return NextResponse.json({ error: "path required" }, { status: 400 });

	const cookieStore = await cookies();
	const supabase = makeSupabase(cookieStore);

	const { data, error } = await supabase
		.from("comments")
		.select(
			`
      id, content, parent_id, created_at, updated_at, is_deleted,
      profiles:user_id ( id, nickname, avatar_url )
    `
		)
		.eq("page_path", pagePath)
		.order("created_at", { ascending: true });

	if (error) return NextResponse.json({ error: error.message }, { status: 500 });

	return NextResponse.json({ comments: data });
}

/**
 * POST /api/comments
 * 새 댓글 작성 (로그인 필요)
 */
export async function POST(request: NextRequest) {
	const cookieStore = await cookies();
	const supabase = makeSupabase(cookieStore);

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	const { page_path, content, parent_id } = await request.json();
	if (!page_path || !content?.trim()) {
		return NextResponse.json({ error: "page_path and content required" }, { status: 400 });
	}

	const { data, error } = await supabase
		.from("comments")
		.insert({
			user_id: user.id,
			page_path,
			content: content.trim(),
			parent_id: parent_id ?? null,
		})
		.select(
			`
      id, content, parent_id, created_at, updated_at, is_deleted,
      profiles:user_id ( id, nickname, avatar_url )
    `
		)
		.single();

	if (error) return NextResponse.json({ error: error.message }, { status: 400 });

	return NextResponse.json({ comment: data }, { status: 201 });
}
