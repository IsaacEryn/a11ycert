import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export default async function GlossaryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <GlossaryContent />;
}

function GlossaryContent() {
  const t = useTranslations("common.nav");

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-gray-900">{t("glossary")}</h1>
      <p className="mt-12 rounded-lg bg-gray-50 px-5 py-4 text-sm text-gray-500">
        한영 용어집을 준비 중입니다.
      </p>
    </div>
  );
}
