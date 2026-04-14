import { createBrowserClient } from "@supabase/ssr";

let client: ReturnType<typeof createBrowserClient> | null = null;

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    // 환경 변수 미설정 시 — 개발 환경에서 Supabase 미연결 상태
    // Proxy 객체로 모든 호출을 안전하게 무시
    return createDummyClient();
  }

  if (!client) {
    client = createBrowserClient(url, key);
  }
  return client;
}

/** Supabase 미연결 시 에러 없이 동작하는 더미 클라이언트 */
function createDummyClient() {
  const noop = () => ({ data: null, error: null });
  const noopAsync = async () => ({ data: null, error: null });

  const authMethods = {
    getSession: noopAsync,
    getUser: noopAsync,
    signInWithOAuth: noopAsync,
    signOut: noopAsync,
    exchangeCodeForSession: noopAsync,
    onAuthStateChange: (_event: string, _callback: unknown) => ({
      data: { subscription: { unsubscribe: () => {} } },
    }),
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
  } as unknown as ReturnType<typeof createBrowserClient>;
}
