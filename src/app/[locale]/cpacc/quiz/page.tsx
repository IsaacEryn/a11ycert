import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CPACC 모의 퀴즈",
};

export default async function CpaccQuizPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isKo = locale === "ko";

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 text-center">
      <p className="text-4xl" aria-hidden="true">🚧</p>
      <h1 className="mt-4 text-2xl font-bold text-gray-900">
        {isKo ? "모의 퀴즈 준비 중" : "Mock Quiz Coming Soon"}
      </h1>
      <p className="mt-3 text-sm text-gray-500">
        {isKo
          ? "전체 도메인을 아우르는 모의 시험 기능을 준비하고 있습니다."
          : "A full-domain mock exam is in development."}
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Link
          href={`/${locale}/cpacc/study`}
          className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white no-underline hover:bg-blue-700"
        >
          {isKo ? "학습 로드맵 보기" : "Go to Study Roadmap"}
        </Link>
        <Link
          href={`/${locale}/cpacc`}
          className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 no-underline hover:bg-gray-50"
        >
          {isKo ? "CPACC 개요" : "CPACC Overview"}
        </Link>
      </div>
    </div>
  );
}
