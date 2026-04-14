import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침",
};

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PrivacyContent />;
}

function PrivacyContent() {
  const t = useTranslations("privacy");

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
      <div className="mt-6 space-y-6 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-gray-900">수집하는 정보</h2>
          <p className="mt-2">
            이 사이트는 별도의 회원가입 없이 이용할 수 있습니다. 학습 진도 및 오답 노트는
            사용자 기기의 localStorage에만 저장되며 서버로 전송되지 않습니다.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900">광고 및 분석 서비스</h2>
          <p className="mt-2">
            Google AdSense 및 Google Analytics를 사용합니다. 이 서비스들은 사용자의 브라우저에
            쿠키를 저장하고 익명화된 방문 데이터를 수집합니다. 자세한 내용은
            Google 개인정보처리방침을 참고하세요.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900">쿠키</h2>
          <p className="mt-2">
            이 사이트는 광고 서비스 제공을 위해 제3자 쿠키를 사용합니다.
            브라우저 설정에서 쿠키를 비활성화할 수 있습니다.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900">문의</h2>
          <p className="mt-2">
            개인정보 관련 문의는 GitHub Issues를 통해 남겨주세요.
          </p>
        </section>
      </div>
    </div>
  );
}
