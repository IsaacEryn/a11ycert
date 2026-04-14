import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "개인정보처리방침 | Privacy Policy",
};

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	setRequestLocale(locale);
	return <PrivacyContent />;
}

function PrivacyContent() {
	const t = useTranslations("privacy");

	const sections = [
		{ id: "collected", titleKey: "collected.title", bodyKey: "collected.body" },
		{ id: "cookies", titleKey: "cookies.title", bodyKey: "cookies.body" },
		{ id: "rights", titleKey: "rights.title", bodyKey: "rights.body" },
	] as const;

	return (
		<div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
			<h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
			<p className="mt-2 text-sm text-gray-400">{t("lastUpdated")}</p>
			<p className="mt-4 text-gray-700 leading-relaxed">{t("intro")}</p>

			<div className="mt-10 space-y-8 text-gray-700">
				{sections.map(({ id, titleKey, bodyKey }) => (
					<section key={id} aria-labelledby={`privacy-${id}`}>
						<h2 id={`privacy-${id}`} className="text-xl font-semibold text-gray-900">
							{t(titleKey)}
						</h2>
						<p className="mt-3 leading-relaxed">{t(bodyKey)}</p>
					</section>
				))}

				{/* 광고 및 분석 — 목록 형태 */}
				<section aria-labelledby="privacy-thirdparty">
					<h2 id="privacy-thirdparty" className="text-xl font-semibold text-gray-900">
						{t("thirdParty.title")}
					</h2>
					<ul className="mt-3 space-y-2 leading-relaxed list-disc list-inside">
						<li>{t("thirdParty.adsense")}</li>
						<li>{t("thirdParty.analytics")}</li>
					</ul>
					<p className="mt-3 text-sm text-gray-500">{t("thirdParty.moreInfo")}</p>
				</section>

				{/* 문의 */}
				<section aria-labelledby="privacy-contact">
					<h2 id="privacy-contact" className="text-xl font-semibold text-gray-900">
						{t("contact.title")}
					</h2>
					<p className="mt-3 leading-relaxed">{t("contact.body")}</p>
					<a
						href="https://www.codeslog.com"
						target="_blank"
						rel="noopener noreferrer"
						className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
					>
						codeslog.com <span aria-hidden="true">↗</span>
					</a>
				</section>
			</div>
		</div>
	);
}
