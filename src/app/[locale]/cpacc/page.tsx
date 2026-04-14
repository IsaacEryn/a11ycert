import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "CPACC 시험 준비",
	description:
		"IAAP CPACC(Certified Professional in Accessibility Core Competencies) 자격증 시험 정보, 도메인별 학습 가이드, 모의 퀴즈, 플래시카드를 한국어로 제공합니다.",
};

export default async function CpaccPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	setRequestLocale(locale);
	return <CpaccContent locale={locale} />;
}

function CpaccContent({ locale }: { locale: string }) {
	const t = useTranslations("cpacc");
	const tNav = useTranslations("common.nav");
	const tExam = useTranslations("common.exam");

	const examInfoItems = [
		{ label: tExam("questions"), value: t("examInfo.questions") },
		{ label: tExam("timeLimit"), value: t("examInfo.time") },
		{ label: tExam("passingScore"), value: t("examInfo.passing") },
		{ label: "형식", value: t("examInfo.format") },
	];

	const domains = [
		{
			num: "1",
			desc:
				locale === "ko"
					? "장애 유형(시각·청각·운동·인지·언어·발작)과 각 장애가 ICT 사용에 미치는 영향, 화면낭독기·점자단말기·음성인식 등 보조기술의 종류와 활용법을 학습합니다."
					: "Study disability types (visual, auditory, motor, cognitive, speech, seizure), their impact on ICT use, and assistive technologies such as screen readers, Braille displays, and voice recognition.",
		},
		{
			num: "2",
			desc:
				locale === "ko"
					? "보편적 설계 7원칙, WCAG 2.1/2.2 POUR 원칙(인식 가능·운용 가능·이해 가능·견고성), 적합성 수준 A/AA/AAA의 차이를 학습합니다."
					: "Study the 7 Principles of Universal Design, WCAG 2.1/2.2 POUR principles (Perceivable, Operable, Understandable, Robust), and the difference between conformance levels A, AA, and AAA.",
		},
		{
			num: "3",
			desc:
				locale === "ko"
					? "UN 장애인권리협약(CRPD), 미국 ADA·재활법 508조, EU 웹접근성 지침(WAD), 한국 장애인차별금지법 등 국제·국내 법률과 표준을 학습합니다."
					: "Study international and domestic laws including the UN CRPD, US ADA & Section 508, EU Web Accessibility Directive (WAD), EN 301 549, and Korea's Anti-Discrimination Act.",
		},
	] as const;

	const quickLinks = [
		{ href: `/${locale}/cpacc/study`, label: tNav("study") },
		{ href: `/${locale}/cpacc/quiz`, label: tNav("quiz") },
		{ href: `/${locale}/cpacc/flashcards`, label: tNav("flashcards") },
		{ href: `/${locale}/cpacc/wrong-answers`, label: tNav("wrongAnswers") },
	];

	return (
		<div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
			{/* 헤더 */}
			<div>
				<p className="text-xs font-semibold uppercase tracking-widest text-blue-600">IAAP</p>
				<h1 className="mt-1 text-3xl font-bold text-gray-900">{t("title")}</h1>
				<p className="mt-2 text-gray-500 italic">{t("overview")}</p>
			</div>

			{/* 시험 정보 */}
			<section aria-labelledby="cpacc-examinfo" className="mt-8">
				<h2 id="cpacc-examinfo" className="text-lg font-semibold text-gray-900">
					{locale === "ko" ? "시험 정보" : "Exam Information"}
				</h2>
				<dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
					{examInfoItems.map(({ label, value }) => (
						<div key={label} className="rounded-lg bg-gray-50 px-4 py-3">
							<dt className="text-xs text-gray-500">{label}</dt>
							<dd className="mt-1 font-semibold text-gray-900 text-sm">{value}</dd>
						</div>
					))}
				</dl>
			</section>

			{/* 도메인 */}
			<section aria-labelledby="cpacc-domains" className="mt-10">
				<h2 id="cpacc-domains" className="text-lg font-semibold text-gray-900">
					{locale === "ko" ? "시험 도메인" : "Exam Domains"}
				</h2>
				<ul className="mt-4 space-y-4" role="list">
					{domains.map(({ num, desc }) => (
						<li key={num} className="rounded-xl border border-gray-200 p-5">
							<div className="flex items-start gap-4">
								<span
									aria-hidden="true"
									className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700"
								>
									{num}
								</span>
								<div>
									<h3 className="font-semibold text-gray-900">
										{t(`domains.${num}.title`)}
										<span className="ml-2 text-xs font-normal text-gray-400">
											{t(`domains.${num}.en`)}
										</span>
									</h3>
									<p className="mt-1 text-xs font-medium text-blue-600">
										{t(`domains.${num}.weight`)}
									</p>
									<p className="mt-2 text-sm text-gray-600 leading-relaxed">{desc}</p>
								</div>
							</div>
						</li>
					))}
				</ul>
			</section>

			{/* 빠른 시작 */}
			<section aria-labelledby="cpacc-quicklinks" className="mt-10">
				<h2 id="cpacc-quicklinks" className="text-lg font-semibold text-gray-900">
					{locale === "ko" ? "학습 시작" : "Start Studying"}
				</h2>
				<ul className="mt-4 grid gap-3 sm:grid-cols-2" role="list">
					{quickLinks.map(({ href, label }) => (
						<li key={href}>
							<Link
								href={href}
								className="flex items-center justify-between rounded-xl border border-gray-200 px-5 py-4 text-sm font-medium text-gray-700 no-underline transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
							>
								{label}
								<span aria-hidden="true" className="text-gray-400">
									→
								</span>
							</Link>
						</li>
					))}
				</ul>
			</section>
		</div>
	);
}
