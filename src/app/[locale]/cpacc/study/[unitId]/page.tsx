import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getCpaccUnit, getAllCpaccUnitIds, cpaccDomains } from "@/lib/content/cpacc-units";
import QuizEngine from "@/components/QuizEngine";
import StudyUnitContent from "@/components/StudyUnitContent";
import UnitCompleteButton from "@/components/UnitCompleteButton";
import StudySidebar from "@/components/study/StudySidebar";
import CommentSection from "@/components/comments/CommentSection";
import StudyNoteEditor from "@/components/notes/StudyNoteEditor";
import ReportButton from "@/components/report/ReportButton";

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

	const allUnits = cpaccDomains.flatMap((d) => d.units).filter((u) => u.available);
	const currentIdx = allUnits.findIndex((u) => u.id === unitId);
	const prevUnit = currentIdx > 0 ? allUnits[currentIdx - 1] : null;
	const nextUnit = currentIdx < allUnits.length - 1 ? allUnits[currentIdx + 1] : null;

	const currentDomain = cpaccDomains.find((d) => d.domain === unit.domain);
	const domainLabel = currentDomain ? (isKo ? currentDomain.title.ko : currentDomain.title.en) : "";

	return (
		<div className="container">
			<div className="app-layout">
				<StudySidebar
					locale={locale}
					exam="cpacc"
					activeUnitId={unitId}
					domains={cpaccDomains}
				/>

				<div>
					{/* Toolbar */}
					<nav className="study-toolbar" aria-label={isKo ? "현재 위치" : "Current location"}>
						<div className="study-toolbar__crumbs">
							<Link href={`/${locale}/cpacc`} style={{ textDecoration: "none", color: "inherit" }}>
								CPACC
							</Link>
							<span aria-hidden="true">›</span>
							<Link href={`/${locale}/cpacc/study`} style={{ textDecoration: "none", color: "inherit" }}>
								{domainLabel}
							</Link>
							<span aria-hidden="true">›</span>
							<strong>{isKo ? unit.title.ko : unit.title.en}</strong>
						</div>
						<div className="study-toolbar__actions">
							<ReportButton locale={locale} targetType="content" targetId={unit.id} />
						</div>
					</nav>

					{/* Bilingual card */}
					<StudyUnitContent
						unit={unit}
						locale={locale}
						prevUnit={prevUnit}
						nextUnit={nextUnit}
						exam="cpacc"
					/>

					{/* Quiz */}
					{unit.questions.length > 0 && (
						<section aria-labelledby="unit-quiz" style={{ marginTop: "var(--space-8)" }}>
							<h2 id="unit-quiz" style={{ fontSize: "var(--fs-md)", fontWeight: 700, marginBottom: "var(--space-2)" }}>
								{isKo ? "단원 퀴즈" : "Unit Quiz"}
							</h2>
							<p style={{ fontSize: "var(--fs-xs)", color: "var(--fg-muted)", marginBottom: "var(--space-4)" }}>
								{isKo
									? `${unit.questions.length}문제 · 오답은 오답노트에 자동 저장됩니다`
									: `${unit.questions.length} questions · Wrong answers are saved automatically`}
							</p>
							<QuizEngine questions={unit.questions} locale={locale} exam="cpacc" showAll />
						</section>
					)}

					{/* Complete button */}
					<div style={{ marginTop: "var(--space-8)", paddingTop: "var(--space-6)", borderTop: "1px solid var(--divider)" }}>
						<UnitCompleteButton unitId={unit.id} locale={locale} exam="cpacc" backHref={`/${locale}/cpacc/study`} />
					</div>

					{/* Study notes */}
					<StudyNoteEditor pagePath={`/cpacc/study/${unitId}`} unitId={unit.id} locale={locale} />

					{/* Comments */}
					<CommentSection pagePath={`/cpacc/study/${unitId}`} locale={locale} />
				</div>
			</div>
		</div>
	);
}
