import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

const MAX_TITLE_LENGTH = 200;
const MAX_CONTENT_LENGTH = 10000;
// DB 스키마·커뮤니티 UI와 동일한 카테고리 체계
const ALLOWED_CATEGORIES = ["report", "discussion", "question", "tip"] as const;
type AllowedCategory = typeof ALLOWED_CATEGORIES[number];
// report(제보)는 /api/reports 경유로만 생성 가능
const USER_POSTABLE_CATEGORIES: AllowedCategory[] = ["discussion", "question", "tip"];

/**
 * GET /api/board?category=all&page=1&limit=20
 * 게시글 목록 조회 (공개)
 */
export async function GET(request: NextRequest) {
	const { searchParams } = request.nextUrl;
	const category = searchParams.get("category") ?? "all";
	const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
	const limit = Math.min(50, parseInt(searchParams.get("limit") ?? "20"));
	const offset = (page - 1) * limit;

	const supabase = await createClient();

	let query = supabase
		.from("board_posts")
		.select(
			`
      id, category, title, view_count, reply_count, is_pinned, created_at,
      profiles:user_id ( nickname, avatar_url )
    `,
			{ count: "exact" }
		)
		.eq("is_deleted", false)
		.order("is_pinned", { ascending: false })
		.order("created_at", { ascending: false })
		.range(offset, offset + limit - 1);

	if (category !== "all") {
		if (!ALLOWED_CATEGORIES.includes(category as AllowedCategory)) {
			return NextResponse.json({ error: "Invalid category" }, { status: 400 });
		}
		query = query.eq("category", category);
	}

	const { data, error, count } = await query;

	if (error) {
		console.error("[GET /api/board]", error.message);
		return NextResponse.json({ error: "게시글을 불러올 수 없습니다." }, { status: 500 });
	}

	return NextResponse.json({
		posts: data,
		total: count ?? 0,
		page,
		totalPages: Math.ceil((count ?? 0) / limit),
	});
}

/**
 * POST /api/board
 * 새 게시글 작성 (로그인 필요)
 */
export async function POST(request: NextRequest) {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	const body = await request.json();
	const category: string = body.category ?? "";
	const title: string = body.title ?? "";
	const content: string = body.content ?? "";

	if (!category || !title.trim() || !content.trim()) {
		return NextResponse.json({ error: "category, title, content 필수" }, { status: 400 });
	}
	if (!USER_POSTABLE_CATEGORIES.includes(category as AllowedCategory)) {
		return NextResponse.json(
			{ error: category === "report" ? "제보는 /api/reports를 사용해주세요" : "Invalid category" },
			{ status: 400 }
		);
	}
	if (title.length > MAX_TITLE_LENGTH) {
		return NextResponse.json(
			{ error: `제목은 ${MAX_TITLE_LENGTH}자 이하로 작성해주세요` },
			{ status: 400 }
		);
	}
	if (content.length > MAX_CONTENT_LENGTH) {
		return NextResponse.json(
			{ error: `본문은 ${MAX_CONTENT_LENGTH}자 이하로 작성해주세요` },
			{ status: 400 }
		);
	}

	const { data, error } = await supabase
		.from("board_posts")
		.insert({
			user_id: user.id,
			category,
			title: title.trim(),
			content: content.trim(),
		})
		.select("id, category, title, created_at")
		.single();

	if (error) {
		console.error("[POST /api/board]", error.message);
		return NextResponse.json({ error: "게시글을 저장할 수 없습니다." }, { status: 500 });
	}

	return NextResponse.json({ post: data }, { status: 201 });
}
