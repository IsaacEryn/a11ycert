"use client";

import {
	createContext,
	useContext,
	useEffect,
	useState,
	useCallback,
	useRef,
	type ReactNode,
} from "react";
import { createClient } from "@/lib/supabase/client";
import { migrateLocalStorageToDB } from "@/lib/store/learning-sync";
import type { User, Session, AuthChangeEvent } from "@supabase/supabase-js";

interface Profile {
	id: string;
	nickname: string;
	avatar_url: string | null;
	provider: string | null;
	tier: "free" | "premium";
	role: "user" | "admin";
	created_at: string;
}

interface AuthContextType {
	user: User | null;
	profile: Profile | null;
	session: Session | null;
	isLoading: boolean;
	signInWithGoogle: (redirectTo?: string) => Promise<void>;
	signInWithGitHub: (redirectTo?: string) => Promise<void>;
	signOut: () => Promise<void>;
	refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) {
		throw new Error("useAuth()는 AuthProvider 내부에서만 사용 가능합니다");
	}
	return ctx;
}

/** 로그인하지 않은 상태에서도 에러 없이 사용 (null 반환) */
export function useOptionalAuth() {
	return useContext(AuthContext);
}

export default function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [profile, setProfile] = useState<Profile | null>(null);
	const [session, setSession] = useState<Session | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	// createClient()는 싱글톤이지만 매 렌더마다 새 참조를 반환하므로
	// useRef로 고정해 useCallback/useEffect 의존성 배열 재실행 방지
	const supabaseRef = useRef(createClient());
	const supabase = supabaseRef.current;

	const fetchProfile = useCallback(
		async (userId: string) => {
			const { data } = await supabase.from("profiles").select("*").eq("id", userId).single();
			setProfile(data);
		},
		[supabase]
	);

	const refreshProfile = useCallback(async () => {
		if (user) {
			await fetchProfile(user.id);
		}
	}, [user, fetchProfile]);

	useEffect(() => {
		// 초기 세션 확인
		const initSession = async () => {
			const {
				data: { session: currentSession },
			} = await supabase.auth.getSession();

			setSession(currentSession);
			setUser(currentSession?.user ?? null);

			if (currentSession?.user) {
				await fetchProfile(currentSession.user.id);
			}

			setIsLoading(false);
		};

		initSession();

		// 인증 상태 변경 리스너
		// 주의: 콜백 안에서 다른 Supabase 호출을 await하면 auth 내부 락과 데드락이
		// 발생해 로그인 지연·상태 튐이 생김 (Supabase 공식 문서의 알려진 함정).
		// 콜백은 동기로 유지하고 후속 작업은 setTimeout으로 락 밖에서 실행한다.
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(
			(event: AuthChangeEvent, newSession: Session | null) => {
				setSession(newSession);
				setUser(newSession?.user ?? null);

				if (event === "SIGNED_IN" && newSession?.user) {
					const userId = newSession.user.id;
					const provider = newSession.user.app_metadata?.provider ?? null;
					setTimeout(() => {
						fetchProfile(userId).catch(() => {});
						// localStorage → DB 마이그레이션 (비동기, UI 블로킹 없음)
						migrateLocalStorageToDB(userId).catch(() => {});
						// 로그인 활동 로그 — 서버 콜백이 실행되지 않는 흐름
						// (Redirect URL 미허용 시 클라이언트 코드 교환)도 커버.
						// RPC 내부 1분 dedupe로 서버 로그와 중복되지 않음.
						void (async () => {
							const { error } = await supabase.rpc("log_user_login", {
								p_provider: provider,
								p_ip: null,
							});
							if (error) console.error("[AuthProvider] log_user_login:", error.message);
						})();
					}, 0);
				}

				if (event === "SIGNED_OUT") {
					setProfile(null);
				}
			}
		);

		return () => {
			subscription.unsubscribe();
		};
	}, [supabase, fetchProfile]);

	const signInWithGoogle = async (redirectTo?: string) => {
		const callbackUrl = `${window.location.origin}/auth/callback${
			redirectTo ? `?next=${encodeURIComponent(redirectTo)}` : ""
		}`;

		await supabase.auth.signInWithOAuth({
			provider: "google",
			options: { redirectTo: callbackUrl },
		});
	};

	const signInWithGitHub = async (redirectTo?: string) => {
		const callbackUrl = `${window.location.origin}/auth/callback${
			redirectTo ? `?next=${encodeURIComponent(redirectTo)}` : ""
		}`;

		await supabase.auth.signInWithOAuth({
			provider: "github",
			options: { redirectTo: callbackUrl },
		});
	};

	const signOut = async () => {
		await supabase.auth.signOut();
		setUser(null);
		setProfile(null);
		setSession(null);
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				profile,
				session,
				isLoading,
				signInWithGoogle,
				signInWithGitHub,
				signOut,
				refreshProfile,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
