import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";

export default async function WasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <WasContent locale={locale} />;
}

function WasContent({ locale }: { locale: string }) {
  const t = useTranslations("was");
  const tNav = useTranslations("common.nav");

  const subLinks = [
    { href: `/${locale}/was/study`, label: tNav("study") },
    { href: `/${locale}/was/quiz`, label: tNav("quiz") },
    { href: `/${locale}/was/flashcards`, label: tNav("flashcards") },
    { href: `/${locale}/was/wrong-answers`, label: tNav("wrongAnswers") },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
      <p className="mt-2 text-gray-500 italic">{t("overview")}</p>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {subLinks.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="flex items-center gap-3 rounded-xl border border-gray-200 px-5 py-4 text-sm font-medium text-gray-700 no-underline transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-12 rounded-lg bg-gray-50 px-5 py-4 text-sm text-gray-500">
        콘텐츠 준비 중입니다.
      </p>
    </div>
  );
}
