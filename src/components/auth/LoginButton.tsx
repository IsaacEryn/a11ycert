"use client";

import { useOptionalAuth } from "@/lib/auth/AuthProvider";
import GoogleLogo from "./GoogleLogo";

interface LoginButtonProps {
	locale: string;
}

export default function LoginButton({ locale }: LoginButtonProps) {
	const auth = useOptionalAuth();
	const isKo = locale === "ko";

	if (!auth || auth.isLoading || auth.user) return null;

	return (
		<button
			onClick={() => auth.signInWithGoogle()}
			className="btn btn--sm"
			aria-label={isKo ? "Google 계정으로 로그인" : "Sign in with Google"}
		>
			<GoogleLogo />
			Google
		</button>
	);
}
