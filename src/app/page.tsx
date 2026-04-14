"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
	const router = useRouter();

	useEffect(() => {
		// 브라우저 언어 감지 후 로케일 리다이렉트
		const lang = navigator.language.startsWith("ko") ? "ko" : "en";
		router.replace(`/${lang}`);
	}, [router]);

	return null;
}
