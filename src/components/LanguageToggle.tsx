"use client";

import { usePathname, useRouter } from "next/navigation";

interface LanguageToggleProps {
	currentLocale: string;
}

export default function LanguageToggle({ currentLocale }: LanguageToggleProps) {
	const pathname = usePathname();
	const router = useRouter();

	function switchLocale(targetLocale: string) {
		// /ko/cpacc → /en/cpacc
		const segments = pathname.split("/");
		segments[1] = targetLocale;
		router.push(segments.join("/") || "/");
	}

	return (
		<div role="group" aria-label="언어 선택">
			{(["ko", "en"] as const).map((locale) => (
				<button
					key={locale}
					onClick={() => switchLocale(locale)}
					aria-pressed={currentLocale === locale}
					aria-label={locale === "ko" ? "한국어로 전환" : "Switch to English"}
					className={[
						"px-3 py-1 text-sm font-medium rounded transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
						currentLocale === locale
							? "bg-blue-600 text-white focus-visible:outline-white"
							: "text-gray-600 hover:bg-gray-100 focus-visible:outline-blue-600",
					].join(" ")}
				>
					{locale === "ko" ? "한국어" : "EN"}
				</button>
			))}
		</div>
	);
}
