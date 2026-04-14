import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	setRequestLocale(locale);
	return <HomeContent locale={locale} />;
}

function HomeContent({ locale }: { locale: string }) {
	const t = useTranslations("home");
	const tCommon = useTranslations("common");
	const tCpacc = useTranslations("cpacc");
	const tWas = useTranslations("was");

	const exams = [
		{ key: "cpacc" as const, tExam: tCpacc, color: "blue" },
		{ key: "was" as const, tExam: tWas, color: "violet" },
	];

	const features = [
		{
			id: "bilingual" as const,
			icon: (
				<svg
					aria-hidden="true"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M5 8l6 6M4 14l6-6 2-2M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6" />
				</svg>
			),
		},
		{
			id: "flashcard" as const,
			icon: (
				<svg
					aria-hidden="true"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<rect x="2" y="5" width="20" height="14" rx="2" />
					<line x1="2" y1="10" x2="22" y2="10" />
				</svg>
			),
		},
		{
			id: "quiz" as const,
			icon: (
				<svg
					aria-hidden="true"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M9 11l3 3L22 4" />
					<path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
				</svg>
			),
		},
	];

	return (
		<>
			{/* ── Hero ─────────────────────────────────────────── */}
			<section aria-labelledby="hero-heading" className="bg-white px-4 py-20 sm:py-28 text-center">
				<div className="mx-auto max-w-3xl">
					<h1
						id="hero-heading"
						className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl"
					>
						{t("hero.title")}
					</h1>
					<p className="mt-5 text-base sm:text-lg text-gray-600 leading-relaxed">
						{t("hero.subtitle")}
					</p>
					<div className="mt-8 flex flex-wrap justify-center gap-3">
						<Link
							href={`/${locale}/cpacc`}
							className="inline-flex items-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white no-underline transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
						>
							{t("hero.startCpacc")}
						</Link>
						<Link
							href={`/${locale}/was`}
							className="inline-flex items-center rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 no-underline transition-colors hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
						>
							{t("hero.startWas")}
						</Link>
					</div>
				</div>
			</section>

			{/* ── 학습 기능 소개 ────────────────────────────────── */}
			<section aria-labelledby="features-heading" className="bg-gray-50 px-4 py-16">
				<div className="mx-auto max-w-5xl">
					<h2
						id="features-heading"
						className="text-center text-xl font-semibold text-gray-900 sm:text-2xl"
					>
						{tCommon("siteName")}{" "}
						<span className="text-blue-600">{tCommon("siteDescription")}</span>
					</h2>

					<ul className="mt-10 grid gap-6 sm:grid-cols-3" role="list">
						{features.map(({ id, icon }) => (
							<li
								key={id}
								className="flex flex-col gap-3 rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100"
							>
								<span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
									{icon}
								</span>
								<h3 className="font-semibold text-gray-900">{t(`features.${id}.title`)}</h3>
								<p className="text-sm text-gray-600 leading-relaxed">
									{t(`features.${id}.description`)}
								</p>
							</li>
						))}
					</ul>
				</div>
			</section>

			{/* ── 시험 카드 ─────────────────────────────────────── */}
			<section aria-labelledby="exams-heading" className="bg-white px-4 py-16">
				<div className="mx-auto max-w-5xl">
					<h2 id="exams-heading" className="text-xl font-semibold text-gray-900 sm:text-2xl">
						{tCommon("exam.domain")}별 준비
					</h2>

					<ul className="mt-8 grid gap-6 sm:grid-cols-2" role="list">
						{exams.map(({ key, tExam }) => (
							<li key={key} className="rounded-xl border border-gray-200 p-6">
								<p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
									{key}
								</p>
								<h3 className="mt-1 text-lg font-bold text-gray-900">{tExam("title")}</h3>
								<p className="mt-1 text-sm text-gray-500">{tExam("overview")}</p>

								<dl className="mt-4 space-y-1.5 text-sm">
									{([["questions", "passingScore", "timeLimit"]] as const)[0].map((field) => (
										<div key={field} className="flex gap-2">
											<dt className="text-gray-400 shrink-0">{tCommon(`exam.${field}`)}</dt>
											<dd className="font-medium text-gray-800">
												{tExam(
													`examInfo.${field === "questions" ? "questions" : field === "passingScore" ? "passing" : "time"}`
												)}
											</dd>
										</div>
									))}
								</dl>

								<Link
									href={`/${locale}/${key}`}
									className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-blue-600 no-underline hover:underline"
									aria-label={`${key.toUpperCase()} ${tCommon("exam.startQuiz")}`}
								>
									{tCommon("exam.startQuiz")}
									<span aria-hidden="true">→</span>
								</Link>
							</li>
						))}
					</ul>
				</div>
			</section>
		</>
	);
}
