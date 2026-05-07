import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthProvider from "@/lib/auth/AuthProvider";
import { PrefsProvider } from "@/lib/prefs/PrefsContext";
import "../globals.css";

export const metadata: Metadata = {
	title: {
		default: "A11yCert — IAAP 자격증 한국어 학습",
		template: "%s | A11yCert",
	},
	description: "IAAP CPACC & WAS 자격증 시험을 한국어와 영어로 준비하는 이중 언어 학습 플랫폼",
	metadataBase: new URL("https://a11ycert.com"),
	openGraph: {
		siteName: "A11yCert",
		type: "website",
	},
};

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;

	if (!routing.locales.includes(locale as "ko" | "en")) {
		notFound();
	}

	setRequestLocale(locale);

	const messages = (await import(`../../../messages/${locale}.json`)).default;

	return (
		<html lang={locale} className="h-full" suppressHydrationWarning>
			<body className="flex min-h-full flex-col">
				<NextIntlClientProvider locale={locale} messages={messages}>
					<AuthProvider>
						<PrefsProvider>
							<a href="#main-content" className="skip-link">
								{locale === "ko" ? "본문으로 바로가기" : "Skip to main content"}
							</a>

							<Header locale={locale} />

							<main id="main-content" className="flex flex-col flex-1" tabIndex={-1}>
								{children}
							</main>

							<Footer locale={locale} />
						</PrefsProvider>
					</AuthProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
