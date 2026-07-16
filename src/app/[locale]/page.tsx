import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import HomeHero from "@/components/home/HomeHero";
import HomeCerts from "@/components/home/HomeCerts";
import HomeFeatures from "@/components/home/HomeFeatures";
import HomePath from "@/components/home/HomePath";
import HomeCtaStrip from "@/components/home/HomeCtaStrip";

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "homeUi" });
	setRequestLocale(locale);
	const isKo = locale === "ko";

	return (
		<>
			<HomeHero locale={locale} isKo={isKo} />

			<section className="section section--alt" aria-labelledby="certs-title">
				<div className="container">
					<div className="section__head">
						<div>
							<h2 id="certs-title" className="section__title">
								{t("chooseYourCertification")}
							</h2>
							<p className="section__sub">
								{t("compareScopeAndDifficulty")}
							</p>
						</div>
					</div>
					<HomeCerts locale={locale} isKo={isKo} />
				</div>
			</section>

			<HomeFeatures locale={locale} isKo={isKo} />

			<HomePath locale={locale} isKo={isKo} />

			<section className="section" aria-labelledby="cta-title">
				<div className="container">
					<HomeCtaStrip locale={locale} isKo={isKo} />
				</div>
			</section>
		</>
	);
}
