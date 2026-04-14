import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "소개",
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutContent />;
}

function AboutContent() {
  const t = useTranslations("about");

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
      <div className="mt-6 space-y-4 text-gray-700 leading-relaxed">
        <p>{t("description")}</p>
        <p>
          이 사이트의 모든 학습 콘텐츠는 IAAP 공식 Body of Knowledge(BoK)를 기반으로 작성되었으며,
          비공식 학습 자료임을 명시합니다. 시험 응시 전 반드시 공식 자료를 함께 참고하세요.
        </p>
        <p>
          콘텐츠 오류 제보 및 문의는 GitHub Issues를 통해 남겨주세요.
        </p>
      </div>
    </div>
  );
}
