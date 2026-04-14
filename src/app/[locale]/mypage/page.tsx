"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth/AuthProvider";
import ProfileEditor from "@/components/mypage/ProfileEditor";

export default function MyPage() {
  const { user, profile, isLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const isKo = locale === "ko";

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(`/${locale}`);
    }
  }, [isLoading, user, router, locale]);

  if (isLoading || !user) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center text-sm text-gray-400">
        {isKo ? "불러오는 중..." : "Loading..."}
      </div>
    );
  }

  const providerLabel = {
    google: "Google",
    github: "GitHub",
    kakao: "Kakao",
  }[profile?.provider ?? ""] ?? (isKo ? "소셜 로그인" : "Social Login");

  const joinedAt = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString(
        locale === "ko" ? "ko-KR" : "en-US",
        { year: "numeric", month: "long", day: "numeric" }
      )
    : "";

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold text-gray-900">
        {isKo ? "나의 정보" : "My Profile"}
      </h1>

      {/* 프로필 카드 */}
      <section aria-labelledby="profile-info" className="mt-6 rounded-xl border border-gray-200 p-6">
        <h2 id="profile-info" className="text-sm font-semibold text-gray-700">
          {isKo ? "계정 정보" : "Account Information"}
        </h2>

        <div className="mt-4 flex items-center gap-4">
          {profile?.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt=""
              className="h-14 w-14 rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-600">
              {(profile?.nickname || user.email || "U").charAt(0).toUpperCase()}
            </span>
          )}
          <div>
            <p className="font-semibold text-gray-900">{profile?.nickname || (isKo ? "닉네임 없음" : "No nickname")}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-xs text-gray-400 mt-0.5">
              {providerLabel} · {isKo ? "가입일" : "Joined"} {joinedAt}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xs font-medium text-gray-600 mb-2">
            {isKo ? "닉네임 변경" : "Change Nickname"}
          </p>
          <ProfileEditor locale={locale} />
        </div>
      </section>

      {/* 나의 시험장 바로가기 */}
      <section aria-labelledby="exam-room-link" className="mt-6">
        <h2 id="exam-room-link" className="text-sm font-semibold text-gray-700 mb-3">
          {isKo ? "학습 현황" : "Study Status"}
        </h2>
        <Link
          href={`/${locale}/mypage/exam-room`}
          className="flex items-center justify-between rounded-xl border border-gray-200 px-5 py-4 no-underline transition-colors hover:border-blue-300 hover:bg-blue-50"
        >
          <div>
            <p className="text-sm font-medium text-gray-900">
              {isKo ? "나의 시험장" : "My Exam Room"}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {isKo ? "오답 노트, 저장한 문제, 학습 메모 모아보기" : "Wrong answers, saved questions, and study notes"}
            </p>
          </div>
          <span aria-hidden="true" className="text-gray-400">→</span>
        </Link>
      </section>

      {/* 로그아웃 */}
      <div className="mt-8 border-t border-gray-100 pt-6">
        <Link
          href={`/${locale}/cpacc`}
          className="text-sm text-gray-500 no-underline hover:text-gray-700 mr-4"
        >
          ← {isKo ? "CPACC 학습으로" : "Back to CPACC"}
        </Link>
      </div>
    </div>
  );
}
