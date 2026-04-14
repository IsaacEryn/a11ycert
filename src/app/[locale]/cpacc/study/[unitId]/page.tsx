import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getCpaccUnit, getAllCpaccUnitIds } from "@/lib/content/cpacc-units";
import QuizEngine from "@/components/QuizEngine";
import UnitCompleteButton from "@/components/UnitCompleteButton";
import CommentSection from "@/components/comments/CommentSection";
import StudyNoteEditor from "@/components/notes/StudyNoteEditor";

export async function generateStaticParams() {
	const locales = ["ko", "en"];
	const unitIds = getAllCpaccUnitIds();
	return locales.flatMap((locale) => unitIds.map((unitId) => ({ locale, unitId })));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string; unitId: string }>;
}): Promise<Metadata> {
	const { locale, unitId } = await params;
	const unit = getCpaccUnit(unitId);
	if (!unit) return {};
	return {
		title: locale === "ko" ? unit.title.ko : unit.title.en,
		description: locale === "ko" ? unit.summary.ko : unit.summary.en,
	};
}

export default async function CpaccUnitPage({
	params,
}: {
	params: Promise<{ locale: string; unitId: string }>;
}) {
	const { locale, unitId } = await params;
	setRequestLocale(locale);
	const unit = getCpaccUnit(unitId);
	if (!unit) notFound();

	const isKo = locale === "ko";

	return (
		<div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
			{/* Breadcrumb */}
			<nav aria-label={isKo ? "경로" : "Breadcrumb"} className="mb-6 text-xs text-gray-400">
				<ol className="flex items-center gap-1" role="list">
					<li>
						<Link href={`/${locale}/cpacc`} className="hover:text-blue-600 no-underline">
							CPACC
						</Link>
					</li>
					<li aria-hidden="true">/</li>
					<li>
						<Link href={`/${locale}/cpacc/study`} className="hover:text-blue-600 no-underline">
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

			{/* Summary banner */}
			<div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800 leading-relaxed">
				{isKo ? unit.summary.ko : unit.summary.en}
			</div>

			{/* Objectives */}
			<section aria-labelledby="objectives" className="mt-8">
				<h2 id="objectives" className="text-base font-semibold text-gray-900">
					{isKo ? "학습 목표" : "Learning Objectives"}
				</h2>
				<ul className="mt-3 space-y-1.5 text-sm text-gray-700" role="list">
					{(isKo ? unit.objectives.ko : unit.objectives.en).map((obj, i) => (
						<li key={i} className="flex items-start gap-2">
							<span className="mt-0.5 text-blue-500" aria-hidden="true">
								•
							</span>
							<span>{obj}</span>
						</li>
					))}
				</ul>
			</section>

			{/* Content */}
			<section aria-labelledby="content" className="mt-8">
				<h2 id="content" className="text-base font-semibold text-gray-900">
					{isKo ? "학습 내용" : "Study Content"}
				</h2>
				<div className="mt-3 space-y-4 text-sm text-gray-700 leading-relaxed">
					{(isKo ? unit.content.ko : unit.content.en).map((para, i) => (
						<p key={i}>{para}</p>
					))}
				</div>
			</section>

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
						<QuizEngine questions={unit.questions} locale={locale} exam="cpacc" />
					</div>
				</section>
			)}

			{/* Complete button */}
			<div className="mt-8 border-t border-gray-100 pt-6">
				<UnitCompleteButton unitId={unit.id} locale={locale} backHref={`/${locale}/cpacc/study`} />
			</div>

			{/* 학습 메모 */}
			<StudyNoteEditor pagePath={`/cpacc/study/${unitId}`} unitId={unit.id} locale={locale} />

			{/* 댓글 */}
			<CommentSection pagePath={`/cpacc/study/${unitId}`} locale={locale} />
		</div>
	);
}
