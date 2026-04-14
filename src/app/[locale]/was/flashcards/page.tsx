import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "WAS 플래시카드",
};

export default async function WasFlashcardsPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setRequestLocale(locale);
	const isKo = locale === "ko";

	return (
		<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 text-center">
			<p className="text-4xl" aria-hidden="true">
				🚧
			</p>
			<h1 className="mt-4 text-2xl font-bold text-gray-900">
				{isKo ? "플래시카드 준비 중" : "Flashcards Coming Soon"}
			</h1>
			<p className="mt-3 text-sm text-gray-500">
				{isKo
					? "핵심 용어와 개념을 플래시카드로 복습하는 기능을 준비하고 있습니다."
					: "Flashcard review for key terms and concepts is in development."}
			</p>
			<div className="mt-6 flex justify-center gap-3">
				<Link
					href={`/${locale}/was/study`}
					className="rounded-lg bg-violet-600 px-5 py-2 text-sm font-medium text-white no-underline hover:bg-violet-700"
				>
					{isKo ? "학습 로드맵 보기" : "Go to Study Roadmap"}
				</Link>
				<Link
					href={`/${locale}/was`}
					className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 no-underline hover:bg-gray-50"
				>
					{isKo ? "WAS 개요" : "WAS Overview"}
				</Link>
			</div>
		</div>
	);
}
