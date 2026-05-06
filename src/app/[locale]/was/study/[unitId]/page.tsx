import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getWasUnit, getAllWasUnitIds } from "@/lib/content/was-units";
import QuizEngine from "@/components/QuizEngine";
import StudyUnitContent from "@/components/StudyUnitContent";
import UnitCompleteButton from "@/components/UnitCompleteButton";
import CommentSection from "@/components/comments/CommentSection";
import StudyNoteEditor from "@/components/notes/StudyNoteEditor";
import ReportButton from "@/components/report/ReportButton";

export async function generateStaticParams() {
	const locales = ["ko", "en"];
	const unitIds = getAllWasUnitIds();
	return locales.flatMap((locale) => unitIds.map((unitId) => ({ locale, unitId })));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string; unitId: string }>;
}): Promise<Metadata> {
	const { locale, unitId } = await params;
	const unit = getWasUnit(unitId);
	if (!unit) return {};
	return {
		title: locale === "ko" ? unit.title.ko : unit.title.en,
		description: locale === "ko" ? unit.summary.ko : unit.summary.en,
	};
}

export default async function WasUnitPage({
	params,
}: {
	params: Promise<{ locale: string; unitId: string }>;
}) {
	const { locale, unitId } = await params;
	setRequestLocale(locale);
	const unit = getWasUnit(unitId);
	if (!unit) notFound();

	const isKo = locale === "ko";

	return (
		<div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
			{/* Breadcrumb */}
			<nav aria-label={isKo ? "경로" : "Breadcrumb"} className="mb-6 text-xs text-gray-400">
				<ol className="flex items-center gap-1" role="list">
					<li>
						<Link href={`/${locale}/was`} className="hover:text-violet-600 no-underline">
							WAS
						</Link>
					</li>
					<li aria-hidden="true">/</li>
					<li>
						<Link href={`/${locale}/was/study`} className="hover:text-violet-600 no-underline">
							{isKo ? "학습 로드맵" : "Study Roadmap"}
						</Link>
					</li>
					<li aria-hidden="true">/</li>
					<li className="text-gray-600" aria-current="page">
						{isKo ? unit.title.ko : unit.title.en}
					</li>
				</ol>
			</nav>

			{/* Title */}
			<h1 className="text-2xl font-bold text-gray-900">{isKo ? unit.title.ko : unit.title.en}</h1>

			<StudyUnitContent unit={unit} locale={locale} accentColor="violet" />

			{/* Quiz */}
			{unit.questions.length > 0 && (
				<section aria-labelledby="quiz" className="mt-10">
					<h2 id="quiz" className="text-base font-semibold text-gray-900">
						{isKo ? "단원 퀴즈" : "Unit Quiz"}
					</h2>
					<p className="mt-1 text-xs text-gray-500">
						{isKo
							? `${unit.questions.length}문제 · 오답은 오답노트에 자동 저장됩니다`
							: `${unit.questions.length} questions · Wrong answers are saved automatically`}
					</p>
					<div className="mt-4">
						<QuizEngine questions={unit.questions} locale={locale} exam="was" />
					</div>
				</section>
			)}

			{/* Report + Complete */}
			<div className="mt-8 border-t border-gray-100 pt-6">
				<div className="mb-4 flex justify-end">
					<ReportButton locale={locale} targetType="content" targetId={unit.id} />
				</div>
				<UnitCompleteButton unitId={unit.id} locale={locale} backHref={`/${locale}/was/study`} />
			</div>

			{/* 학습 메모 */}
			<StudyNoteEditor pagePath={`/was/study/${unitId}`} unitId={unit.id} locale={locale} />

			{/* 댓글 */}
			<CommentSection pagePath={`/was/study/${unitId}`} locale={locale} />
		</div>
	);
}
