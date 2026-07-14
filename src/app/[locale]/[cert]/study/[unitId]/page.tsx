import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { CERTS, isCert, getCertContent } from "@/lib/content";
import { localeAlternates } from "@/lib/seo";
import QuizEngine from "@/components/quiz/QuizEngine";
import StudyUnitContent from "@/components/StudyUnitContent";
import UnitCompleteButton from "@/components/UnitCompleteButton";
import StudySidebar from "@/components/study/StudySidebar";
import CommentSection from "@/components/comments/CommentSection";
import StudyNoteEditor from "@/components/notes/StudyNoteEditor";
import ReportButton from "@/components/report/ReportButton";

export function generateStaticParams() {
	const locales = ["ko", "en"];
	return locales.flatMap((locale) =>
		CERTS.flatMap((cert) =>
			getCertContent(cert)
				.getAllUnitIds()
				.map((unitId) => ({ locale, cert, unitId }))
		)
	);
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string; cert: string; unitId: string }>;
}): Promise<Metadata> {
	const { locale, cert, unitId } = await params;
	if (!isCert(cert)) return {};
	const unit = getCertContent(cert).getUnit(unitId);
	if (!unit) return {};
	return {
		title: locale === "ko" ? unit.title.ko : unit.title.en,
		description: locale === "ko" ? unit.summary.ko : unit.summary.en,
		alternates: localeAlternates(locale, `/${cert}/study/${unitId}`),
	};
}

export default async function CertUnitPage({
	params,
}: {
	params: Promise<{ locale: string; cert: string; unitId: string }>;
}) {
	const { locale, cert, unitId } = await params;
	if (!isCert(cert)) notFound();
	setRequestLocale(locale);
	const { domains } = getCertContent(cert);
	const unit = getCertContent(cert).getUnit(unitId);
	if (!unit) notFound();

	const isKo = locale === "ko";
	const tCert = await getTranslations("cert");

	const allUnits = domains.flatMap((d) => d.units).filter((u) => u.available);
	const currentIdx = allUnits.findIndex((u) => u.id === unitId);
	const prevUnit = currentIdx > 0 ? allUnits[currentIdx - 1] : null;
	const nextUnit = currentIdx < allUnits.length - 1 ? allUnits[currentIdx + 1] : null;

	const currentDomain = domains.find((d) => d.domain === unit.domain);
	const domainLabel = currentDomain ? (isKo ? currentDomain.title.ko : currentDomain.title.en) : "";

	return (
		<div className="container">
			<div className="app-layout">
				<StudySidebar
					locale={locale}
					exam={cert}
					activeUnitId={unitId}
					domains={domains}
				/>

				<div>
					{/* Toolbar */}
					<nav className="study-toolbar" aria-label={tCert("currentLocation")}>
						<div className="study-toolbar__crumbs">
							<Link href={`/${locale}/${cert}`} style={{ textDecoration: "none", color: "inherit" }}>
								{cert.toUpperCase()}
							</Link>
							<span aria-hidden="true">›</span>
							<Link href={`/${locale}/${cert}/study`} style={{ textDecoration: "none", color: "inherit" }}>
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
						exam={cert}
					/>

					{/* Quiz */}
					{unit.questions.length > 0 && (
						<section aria-labelledby="unit-quiz" style={{ marginTop: "var(--space-8)" }}>
							<h2 id="unit-quiz" style={{ fontSize: "var(--fs-md)", fontWeight: 700, marginBottom: "var(--space-2)" }}>
								{tCert("unitQuiz")}
							</h2>
							<p style={{ fontSize: "var(--fs-xs)", color: "var(--fg-muted)", marginBottom: "var(--space-4)" }}>
								{tCert("unitQuizHint", { count: unit.questions.length })}
							</p>
							<QuizEngine questions={unit.questions} locale={locale} exam={cert} showAll />
						</section>
					)}

					{/* Complete button */}
					<div style={{ marginTop: "var(--space-8)", paddingTop: "var(--space-6)", borderTop: "1px solid var(--divider)" }}>
						<UnitCompleteButton unitId={unit.id} locale={locale} exam={cert} backHref={`/${locale}/${cert}/study`} />
					</div>

					{/* Study notes */}
					<StudyNoteEditor pagePath={`/${cert}/study/${unitId}`} unitId={unit.id} locale={locale} />

					{/* Comments */}
					<CommentSection pagePath={`/${cert}/study/${unitId}`} locale={locale} />
				</div>
			</div>
		</div>
	);
}
