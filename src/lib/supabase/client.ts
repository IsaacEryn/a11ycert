import { createBrowserClient } from "@supabase/ssr";

let client: ReturnType<typeof createBrowserClient> | null = null;

function isValidUrl(url: string | undefined): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!isValidUrl(url) || !key) {
    // 환경 변수 미설정 또는 유효하지 않은 URL — 더미 클라이언트 반환
    return createDummyClient();
  }

  if (!client) {
    client = createBrowserClient(url!, key);
  }
  return client;
}

/** Supabase 미연결 시 에러 없이 동작하는 더미 클라이언트 */
function createDummyClient() {
  const noop = () => ({ data: null, error: null });
  const noopAsync = async () => ({ data: null, error: null });

  const authMethods = {
    getSession: async () => ({ data: { session: null }, error: null }),
    getUser: async () => ({ data: { user: null }, error: null }),
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
