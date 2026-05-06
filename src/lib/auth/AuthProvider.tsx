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
	tier: string;
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
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(
			async (event: AuthChangeEvent, newSession: Session | null) => {
				setSession(newSession);
				setUser(newSession?.user ?? null);

				if (event === "SIGNED_IN" && newSession?.user) {
					await fetchProfile(newSession.user.id);
					// localStorage → DB 마이그레이션 (비동기, UI 블로킹 없음)
					migrateLocalStorageToDB(newSession.user.id).catch(() => {});
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
