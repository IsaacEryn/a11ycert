import { useTranslations } from "next-intl";
import Link from "next/link";

interface FooterProps {
	locale: string;
}

export default function Footer({ locale }: FooterProps) {
	const t = useTranslations("common.nav");

	const cpaccLinks = [
		{ href: `/${locale}/cpacc`, label: t("overview") },
		{ href: `/${locale}/cpacc/study`, label: t("study") },
		{ href: `/${locale}/cpacc/quiz`, label: t("quiz") },
		{ href: `/${locale}/cpacc/flashcards`, label: t("flashcards") },
	];

	const wasLinks = [
		{ href: `/${locale}/was`, label: t("overview") },
		{ href: `/${locale}/was/study`, label: t("study") },
		{ href: `/${locale}/was/quiz`, label: t("quiz") },
		{ href: `/${locale}/was/flashcards`, label: t("flashcards") },
	];

	const otherLinks = [
		{ href: `/${locale}/glossary`, label: t("glossary") },
		{ href: `/${locale}/community`, label: t("community") },
		{ href: `/${locale}/about`, label: t("about") },
		{ href: `/${locale}/privacy`, label: t("privacy") },
	];

	return (
		<footer className="border-t border-gray-200 bg-gray-950 text-gray-400">
			<div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
				<div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
					{/* 브랜드 */}
					<div className="col-span-2 sm:col-span-1">
						<Link
							href={`/${locale}`}
							className="inline-flex items-center gap-1.5 no-underline"
							aria-label={locale === "ko" ? "A11yCert 홈으로 이동" : "Go to A11yCert home"}
						>
							<span className="rounded-lg bg-blue-600 px-1.5 py-0.5 text-sm font-black tracking-tight text-white">
								A11Y
							</span>
							<span className="text-base font-bold text-white">Cert</span>
						</Link>
						<p className="mt-3 text-xs leading-relaxed text-gray-500 max-w-[180px]">
							{locale === "ko"
								? "IAAP BoK 기반 비공식 한국어 학습 플랫폼"
								: "Unofficial study platform based on IAAP Body of Knowledge."}
						</p>
					</div>

					{/* CPACC */}
					<nav aria-label={locale === "ko" ? "CPACC 메뉴" : "CPACC navigation"}>
						<p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
							CPACC
						</p>
						<ul className="space-y-2" role="list">
							{cpaccLinks.map(({ href, label }) => (
								<li key={href}>
									<Link
										href={href}
										className="text-sm text-gray-400 no-underline transition-colors hover:text-white"
									>
										{label}
									</Link>
								</li>
							))}
						</ul>
					</nav>

					{/* WAS */}
					<nav aria-label={locale === "ko" ? "WAS 메뉴" : "WAS navigation"}>
						<p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
							WAS
						</p>
						<ul className="space-y-2" role="list">
							{wasLinks.map(({ href, label }) => (
								<li key={href}>
									<Link
										href={href}
										className="text-sm text-gray-400 no-underline transition-colors hover:text-white"
									>
										{label}
									</Link>
								</li>
							))}
						</ul>
					</nav>

					{/* 기타 */}
					<nav aria-label={locale === "ko" ? "사이트 메뉴" : "Site menu"}>
						<p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
							{locale === "ko" ? "사이트" : "Site"}
						</p>
						<ul className="space-y-2" role="list">
							{otherLinks.map(({ href, label }) => (
								<li key={href}>
									<Link
										href={href}
										className="text-sm text-gray-400 no-underline transition-colors hover:text-white"
									>
										{label}
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</div>

				<div className="mt-10 flex flex-col gap-1 border-t border-gray-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
					<p className="text-xs text-gray-400">
						© {new Date().getFullYear()} A11yCert.{" "}
						{locale === "ko"
							? "IAAP와 무관한 독립 운영 사이트."
							: "Independent site, not affiliated with IAAP."}
					</p>
					<p className="text-xs text-gray-400">
						{locale === "ko"
							? "오류 제보: GitHub Issues"
							: "Report issues via GitHub Issues"}
					</p>
				</div>
			</div>
		</footer>
	);
}
