import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "소개 | About",
	description:
		"A11yCert 소개 — IAAP CPACC & WAS 자격증 한국어 학습 플랫폼을 만든 사람과 목적을 소개합니다.",
};

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	setRequestLocale(locale);
	return <AboutContent />;
}

function AboutContent() {
	const t = useTranslations("about");

	return (
		<div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
			<h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
			<p className="mt-3 text-lg text-gray-600 leading-relaxed">{t("subtitle")}</p>

			<div className="mt-10 space-y-10">
				{/* 사이트 목적 */}
				<section aria-labelledby="about-purpose">
					<h2 id="about-purpose" className="text-xl font-semibold text-gray-900">
						{t("purpose.title")}
					</h2>
					<p className="mt-3 text-gray-700 leading-relaxed">{t("purpose.body")}</p>
				</section>

				{/* 만든 사람 */}
				<section aria-labelledby="about-creator" className="rounded-xl border border-gray-200 p-6">
					<h2 id="about-creator" className="text-xl font-semibold text-gray-900">
						{t("creator.title")}
					</h2>
					<div className="mt-4 flex items-start gap-4">
						<div
							aria-hidden="true"
							className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-lg"
						>
							I
						</div>
						<div>
							<p className="font-semibold text-gray-900">{t("creator.name")}</p>
							<p className="mt-1 text-sm text-gray-600 leading-relaxed">{t("creator.intro")}</p>
							<a
								href={t("creator.blogUrl")}
								target="_blank"
								rel="noopener noreferrer"
								className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
							>
								{t("creator.blogLabel")}
								<span aria-hidden="true">↗</span>
							</a>
						</div>
					</div>
				</section>

				{/* 콘텐츠 출처 */}
				<section aria-labelledby="about-source">
					<h2 id="about-source" className="text-xl font-semibold text-gray-900">
						{t("source.title")}
					</h2>
					<p className="mt-3 text-gray-700 leading-relaxed">{t("source.body")}</p>
				</section>

				{/* 면책 조항 */}
				<section
					aria-labelledby="about-disclaimer"
					className="rounded-lg bg-amber-50 border border-amber-200 px-5 py-4"
				>
					<h2 id="about-disclaimer" className="text-base font-semibold text-amber-800">
						{t("disclaimer.title")}
					</h2>
					<p className="mt-2 text-sm text-amber-700 leading-relaxed">{t("disclaimer.body")}</p>
				</section>
			</div>
		</div>
	);
}
