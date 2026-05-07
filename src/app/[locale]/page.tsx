import { setRequestLocale } from "next-intl/server";
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
								{isKo ? "자격증을 선택하세요" : "Choose Your Certification"}
							</h2>
							<p className="section__sub">
								{isKo
									? "두 자격증의 범위와 난이도를 비교해 시작점을 정하세요."
									: "Compare scope and difficulty to find your starting point."}
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
