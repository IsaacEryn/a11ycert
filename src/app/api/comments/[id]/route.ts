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
 * PATCH /api/comments/[id]
 * 댓글 수정 (본인만)
 */
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const cookieStore = await cookies();
	const supabase = makeSupabase(cookieStore);

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	const { content } = await request.json();
	if (!content?.trim()) return NextResponse.json({ error: "content required" }, { status: 400 });

	const { data, error } = await supabase
		.from("comments")
		.update({ content: content.trim(), updated_at: new Date().toISOString() })
		.eq("id", id)
		.eq("user_id", user.id) // RLS + 추가 보호
		.select("id, content, updated_at")
		.single();

	if (error) return NextResponse.json({ error: error.message }, { status: 400 });
	if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });

	return NextResponse.json({ comment: data });
}

/**
 * DELETE /api/comments/[id]
 * 댓글 소프트 삭제 (본인만)
 */
export async function DELETE(
	_request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params;
	const cookieStore = await cookies();
	const supabase = makeSupabase(cookieStore);

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	const { error } = await supabase
		.from("comments")
		.update({ is_deleted: true })
		.eq("id", id)
		.eq("user_id", user.id);

	if (error) return NextResponse.json({ error: error.message }, { status: 400 });

	return NextResponse.json({ success: true });
}
