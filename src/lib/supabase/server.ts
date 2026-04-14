import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    // 환경 변수 미설정 시 — 더미 클라이언트 반환
    return createDummyServerClient();
  }

  const cookieStore = await cookies();

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Server Component에서 호출 시 set 불가 — 무시
          // middleware.ts에서 세션 갱신 처리
        }
      },
    },
  });
}

/** Supabase 미연결 시 에러 없이 동작하는 더미 서버 클라이언트 */
function createDummyServerClient() {
  const noopAsync = async () => ({ data: null, error: null });

  const authMethods = {
    getSession: noopAsync,
    getUser: noopAsync,
    exchangeCodeForSession: noopAsync,
  };

  const queryBuilder = {
    select: () => queryBuilder,
    eq: () => queryBuilder,
    neq: () => queryBuilder,
    single: noopAsync,
    order: () => queryBuilder,
    limit: () => queryBuilder,
    range: () => queryBuilder,
    insert: noopAsync,
    update: noopAsync,
    upsert: noopAsync,
    delete: noopAsync,
    then: (resolve: (val: { data: null; error: null }) => void) =>
      resolve({ data: null, error: null }),
  };

  return {
    auth: authMethods,
    from: () => queryBuilder,
  } as unknown as ReturnType<typeof createServerClient>;
}
