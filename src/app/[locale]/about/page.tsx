import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "소개 | About",
	description:
		"A11yCert 소개 — IAAP CPACC & WAS 자격증 한국어 학습 플랫폼을 만든 사람과 목적을 소개합니다.",
};

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations({ locale, namespace: "about" });
	const isKo = locale === "ko";

	return (
		<div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
			<h1 style={{ fontSize: "var(--fs-2xl)", fontWeight: 700, color: "var(--fg)" }}>{t("title")}</h1>
			<p style={{ marginTop: "var(--space-3)", fontSize: "var(--fs-md)", color: "var(--fg-muted)", lineHeight: "var(--lh-normal)" }}>
				{t("subtitle")}
			</p>

			<div style={{ marginTop: "var(--space-10)", display: "flex", flexDirection: "column", gap: "var(--space-10)" }}>
				{/* 사이트 목적 */}
				<section aria-labelledby="about-purpose">
					<h2 id="about-purpose" style={{ fontSize: "var(--fs-lg)", fontWeight: 600, color: "var(--fg)" }}>
						{t("purpose.title")}
					</h2>
					<p style={{ marginTop: "var(--space-3)", color: "var(--fg-muted)", lineHeight: "var(--lh-normal)" }}>
						{t("purpose.body")}
					</p>
				</section>

				{/* 만든 사람 */}
				<section
					aria-labelledby="about-creator"
					style={{
						borderRadius: "var(--radius-lg)",
						border: "1px solid var(--border)",
						padding: "var(--space-6)",
					}}
				>
					<h2 id="about-creator" style={{ fontSize: "var(--fs-lg)", fontWeight: 600, color: "var(--fg)" }}>
						{t("creator.title")}
					</h2>
					<div style={{ marginTop: "var(--space-4)", display: "flex", alignItems: "flex-start", gap: "var(--space-4)" }}>
						<div
							aria-hidden="true"
							style={{
								flexShrink: 0,
								width: 48,
								height: 48,
								borderRadius: "50%",
								background: "var(--accent-soft)",
								color: "var(--accent-soft-fg)",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								fontWeight: 700,
								fontSize: "var(--fs-lg)",
							}}
						>
							I
						</div>
						<div>
							<p style={{ fontWeight: 600, color: "var(--fg)" }}>{t("creator.name")}</p>
							<p style={{ marginTop: "var(--space-1)", fontSize: "var(--fs-sm)", color: "var(--fg-muted)", lineHeight: "var(--lh-normal)" }}>
								{t("creator.intro")}
							</p>
							<a
								href="https://www.codeslog.com"
								target="_blank"
								rel="noopener noreferrer"
								style={{ marginTop: "var(--space-2)", display: "inline-flex", alignItems: "center", gap: "var(--space-1)", fontSize: "var(--fs-sm)", fontWeight: 500, color: "var(--accent)" }}
							>
								{isKo ? "블로그 방문하기" : "Visit blog"}
								<span aria-hidden="true">↗</span>
							</a>
						</div>
					</div>
				</section>

				{/* 콘텐츠 출처 */}
				<section aria-labelledby="about-source">
					<h2 id="about-source" style={{ fontSize: "var(--fs-lg)", fontWeight: 600, color: "var(--fg)" }}>
						{t("source.title")}
					</h2>
					<p style={{ marginTop: "var(--space-3)", color: "var(--fg-muted)", lineHeight: "var(--lh-normal)" }}>
						{t("source.body")}
					</p>
				</section>

				{/* 문의 */}
				<section aria-labelledby="about-contact">
					<h2 id="about-contact" style={{ fontSize: "var(--fs-lg)", fontWeight: 600, color: "var(--fg)" }}>
						{isKo ? "문의 및 오류 제보" : "Contact & Issue Reports"}
					</h2>
					<p style={{ marginTop: "var(--space-3)", color: "var(--fg-muted)", lineHeight: "var(--lh-normal)" }}>
						{isKo
							? "콘텐츠 오류, 수정 요청, 기타 문의는 아래 이메일로 보내주세요."
							: "For content errors, correction requests, or general inquiries, please send an email to:"}
					</p>
					<a
						href="mailto:contact@a11ycert.com"
						style={{ marginTop: "var(--space-2)", display: "inline-flex", alignItems: "center", gap: "var(--space-1)", fontSize: "var(--fs-sm)", fontWeight: 500, color: "var(--accent)" }}
					>
						contact@a11ycert.com
					</a>
				</section>

				{/* 면책 조항 */}
				<section
					aria-labelledby="about-disclaimer"
					style={{
						borderRadius: "var(--radius)",
						background: "var(--warning-soft)",
						border: "1px solid color-mix(in oklab, var(--warning) 30%, transparent)",
						padding: "var(--space-4) var(--space-5)",
					}}
				>
					<h2 id="about-disclaimer" style={{ fontSize: "var(--fs-base)", fontWeight: 600, color: "var(--warning)" }}>
						{t("disclaimer.title")}
					</h2>
					<p style={{ marginTop: "var(--space-2)", fontSize: "var(--fs-sm)", color: "var(--warning)", lineHeight: "var(--lh-normal)" }}>
						{t("disclaimer.body")}
					</p>
				</section>
			</div>
		</div>
	);
}
