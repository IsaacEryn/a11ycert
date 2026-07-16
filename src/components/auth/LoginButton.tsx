"use client";

import { useOptionalAuth } from "@/lib/auth/AuthProvider";
import { useTranslations } from "next-intl";
import GoogleLogo from "./GoogleLogo";

export default function LoginButton() {
	const auth = useOptionalAuth();
	const t = useTranslations("auth");

	if (!auth || auth.isLoading || auth.user) return null;

	return (
		<button
			onClick={() => auth.signInWithGoogle()}
			className="btn btn--sm"
			aria-label={t("signInWithGoogle")}
		>
			<GoogleLogo />
			Google
		</button>
	);
}
