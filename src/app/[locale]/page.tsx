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

	const features: Array<{
		id: "bilingual" | "flashcard" | "quiz";
		gradient: string;
		iconBg: string;
		iconColor: string;
		icon: React.ReactNode;
	}> = [
		{
			id: "bilingual",
			gradient: "from-blue-500 to-indigo-600",
			iconBg: "bg-blue-50",
			iconColor: "text-blue-600",
			icon: (
				<svg
					aria-hidden="true"
					width="22"
					height="22"
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
			id: "flashcard",
			gradient: "from-indigo-500 to-violet-600",
			iconBg: "bg-indigo-50",
			iconColor: "text-indigo-600",
			icon: (
				<svg
					aria-hidden="true"
					width="22"
					height="22"
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
			id: "quiz",
			gradient: "from-violet-500 to-purple-600",
			iconBg: "bg-violet-50",
			iconColor: "text-violet-600",
			icon: (
				<svg
					aria-hidden="true"
					width="22"
					height="22"
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

	const stats = locale === "ko"
		? [
				{ value: "175+", label: "학습 문항" },
				{ value: "2", label: "자격증 과정" },
				{ value: "무료", label: "이용 가능" },
			]
		: [
				{ value: "175+", label: "Practice Questions" },
				{ value: "2", label: "Certification Paths" },
				{ value: "Free", label: "to use" },
			];

	return (
		<>
			{/* ── Hero ─────────────────────────────────────────── */}
			<section
				aria-labelledby="hero-heading"
				className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 px-4 py-24 text-center sm:py-36"
			>
				{/* Dot pattern overlay */}
				<div aria-hidden="true" className="hero-dot-pattern absolute inset-0 opacity-20" />

				{/* Glow accents */}
				<div
					aria-hidden="true"
					className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/20 blur-3xl"
				/>
				<div
					aria-hidden="true"
					className="absolute bottom-0 right-1/4 h-64 w-64 translate-y-1/2 rounded-full bg-indigo-600/20 blur-3xl"
				/>

				<div className="relative mx-auto max-w-3xl">
					{/* Badge */}
					<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-400/10 px-4 py-1.5 text-sm font-medium text-indigo-300">
						<span aria-hidden="true" className="h-2 w-2 animate-pulse rounded-full bg-indigo-400" />
						{locale === "ko" ? "IAAP 공인 자격증 준비 플랫폼" : "IAAP Certification Prep Platform"}
					</div>

					<h1
						id="hero-heading"
						className="text-4xl font-bold tracking-tight text-white sm:text-6xl sm:leading-tight"
					>
						{t("hero.title")}
					</h1>

					<p className="mt-6 text-lg leading-relaxed text-slate-300 sm:text-xl">
						{t("hero.subtitle")}
					</p>

					{/* Stats */}
					<dl className="mt-10 flex flex-wrap justify-center gap-x-12 gap-y-5">
						{stats.map(({ value, label }) => (
							<div key={label} className="flex flex-col items-center">
								<dd className="text-3xl font-bold text-white">{value}</dd>
								<dt className="mt-0.5 text-sm text-slate-400">{label}</dt>
							</div>
						))}
					</dl>

					{/* CTAs */}
					<div className="mt-10 flex flex-wrap justify-center gap-4">
						<Link
							href={`/${locale}/cpacc`}
							className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white no-underline shadow-lg shadow-blue-900/40 transition-all hover:bg-blue-500 hover:shadow-blue-500/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
						>
							{t("hero.startCpacc")}
							<span aria-hidden="true">→</span>
						</Link>
						<Link
							href={`/${locale}/was`}
							className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white no-underline backdrop-blur-sm transition-all hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
						>
							{t("hero.startWas")}
							<span aria-hidden="true">→</span>
						</Link>
					</div>
				</div>
			</section>

			{/* ── 학습 기능 소개 ────────────────────────────────── */}
			<section aria-labelledby="features-heading" className="bg-white px-4 py-20">
				<div className="mx-auto max-w-5xl">
					<div className="text-center">
						<h2
							id="features-heading"
							className="text-2xl font-bold text-gray-900 sm:text-3xl"
						>
							{locale === "ko" ? "주요 학습 기능" : "Key Learning Features"}
						</h2>
						<p className="mt-2 text-base text-gray-500 sm:text-lg">
							{tCommon("siteDescription")}
						</p>
					</div>

					<ul className="mt-12 grid gap-6 sm:grid-cols-3" role="list">
						{features.map(({ id, gradient, iconBg, iconColor, icon }) => (
							<li
								key={id}
								className="group flex flex-col gap-4 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-transparent hover:shadow-md"
							>
								{/* Gradient top bar */}
								<div
									aria-hidden="true"
									className={`h-1 bg-gradient-to-r ${gradient}`}
								/>
								<div className="flex flex-col gap-3 px-6 pb-6">
									<span
										className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}
									>
										{icon}
									</span>
									<h3 className="font-semibold text-gray-900">
										{t(`features.${id}.title`)}
									</h3>
									<p className="text-sm leading-relaxed text-gray-500">
										{t(`features.${id}.description`)}
									</p>
								</div>
							</li>
						))}
					</ul>
				</div>
			</section>

			{/* ── 시험 카드 ─────────────────────────────────────── */}
			<section aria-labelledby="exams-heading" className="bg-slate-50 px-4 py-20">
				<div className="mx-auto max-w-5xl">
					<h2
						id="exams-heading"
						className="text-2xl font-bold text-gray-900 sm:text-3xl"
					>
						{locale === "ko" ? "자격증별 학습 과정" : "Certification Study Paths"}
					</h2>
					<p className="mt-2 text-gray-500">
						{locale === "ko"
							? "목표 자격증을 선택해 학습을 시작하세요."
							: "Choose your target certification to begin."}
					</p>

					<ul className="mt-8 grid gap-6 sm:grid-cols-2" role="list">
						{/* CPACC */}
						<li className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-md hover:ring-blue-200">
							<div className="bg-gradient-to-br from-blue-600 to-indigo-700 px-6 py-6">
								<p className="text-xs font-bold uppercase tracking-widest text-white">
									CPACC
								</p>
								<h3 className="mt-1 text-xl font-bold text-white">
									{tCpacc("title")}
								</h3>
							</div>
							<div className="p-6">
								<p className="text-sm text-gray-500">{tCpacc("overview")}</p>
								<dl className="mt-5 space-y-2.5">
									{(
										[
											["questions", tCpacc("examInfo.questions")],
											["passingScore", tCpacc("examInfo.passing")],
											["timeLimit", tCpacc("examInfo.time")],
										] as const
									).map(([field, val]) => (
										<div key={field} className="flex items-start gap-2 text-sm">
											<dt className="min-w-max shrink-0 text-gray-500">
												{tCommon(`exam.${field}`)}
											</dt>
											<dd className="font-medium text-gray-800">{val}</dd>
										</div>
									))}
								</dl>
								<Link
									href={`/${locale}/cpacc`}
									className="mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white no-underline transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
									aria-label={`CPACC ${tCommon("exam.startQuiz")}`}
								>
									{tCommon("exam.startQuiz")}
									<span aria-hidden="true">→</span>
								</Link>
							</div>
						</li>

						{/* WAS */}
						<li className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-md hover:ring-violet-200">
							<div className="bg-gradient-to-br from-violet-600 to-purple-700 px-6 py-6">
								<p className="text-xs font-bold uppercase tracking-widest text-white">
									WAS
								</p>
								<h3 className="mt-1 text-xl font-bold text-white">
									{tWas("title")}
								</h3>
							</div>
							<div className="p-6">
								<p className="text-sm text-gray-500">{tWas("overview")}</p>
								<dl className="mt-5 space-y-2.5">
									{(
										[
											["questions", tWas("examInfo.questions")],
											["passingScore", tWas("examInfo.passing")],
											["timeLimit", tWas("examInfo.time")],
										] as const
									).map(([field, val]) => (
										<div key={field} className="flex items-start gap-2 text-sm">
											<dt className="min-w-max shrink-0 text-gray-500">
												{tCommon(`exam.${field}`)}
											</dt>
											<dd className="font-medium text-gray-800">{val}</dd>
										</div>
									))}
								</dl>
								<Link
									href={`/${locale}/was`}
									className="mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white no-underline transition-colors hover:bg-violet-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
									aria-label={`WAS ${tCommon("exam.startQuiz")}`}
								>
									{tCommon("exam.startQuiz")}
									<span aria-hidden="true">→</span>
								</Link>
							</div>
						</li>
					</ul>
				</div>
			</section>

			{/* ── 하단 CTA 배너 ─────────────────────────────────── */}
			<section
				aria-labelledby="cta-heading"
				className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-16 text-center"
			>
				<div className="mx-auto max-w-2xl">
					<h2
						id="cta-heading"
						className="text-2xl font-bold text-white sm:text-3xl"
					>
						{locale === "ko" ? "지금 바로 시작하세요" : "Start Learning Today"}
					</h2>
					<p className="mt-3 text-white">
						{locale === "ko"
							? "무료로 제공되는 학습 콘텐츠로 IAAP 자격증을 준비하세요."
							: "Prepare for your IAAP certification with free study materials."}
					</p>
					<div className="mt-8 flex flex-wrap justify-center gap-4">
						<Link
							href={`/${locale}/cpacc`}
							className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-700 no-underline transition-colors hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
						>
							{t("hero.startCpacc")}
						</Link>
						<Link
							href={`/${locale}/was`}
							className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white no-underline transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
						>
							{t("hero.startWas")}
						</Link>
					</div>
				</div>
			</section>
		</>
	);
}
