"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useOptionalAuth } from "@/lib/auth/AuthProvider";

export default function CommunityWritePage() {
	const params = useParams();
	const router = useRouter();
	const locale = (params?.locale as string) || "ko";
	const t = useTranslations("community");
	const auth = useOptionalAuth();

	const [category, setCategory] = useState("discussion");
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);

	// 작성 중 새로고침·창 닫기 시 이탈 경고 (제출 중에는 제외)
	const isDirty = (title.trim() !== "" || content.trim() !== "") && !isSubmitting;
	useEffect(() => {
		if (!isDirty) return;
		const handler = (e: BeforeUnloadEvent) => {
			e.preventDefault();
		};
		window.addEventListener("beforeunload", handler);
		return () => window.removeEventListener("beforeunload", handler);
	}, [isDirty]);

	const categories = [
		{ value: "discussion", label: t("discussion") },
		{ value: "question", label: t("question") },
		{ value: "tip", label: t("tip") },
	];

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!auth?.user || isSubmitting) return;

		setIsSubmitting(true);
		setSubmitError(null);

		const res = await fetch("/api/board", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ category, title, content }),
		});

		if (res.ok) {
			router.push(`/${locale}/community`);
		} else {
			const json = await res.json().catch(() => ({}));
			setSubmitError(
				json.error ||
					(t("anErrorOccurredPlease"))
			);
			setIsSubmitting(false);
		}
	};

	if (!auth?.user) {
		return (
			<div className="mx-auto max-w-3xl px-4 py-10">
				<p className="text-sm text-gray-500">
					{t("pleaseSignInTo")}
				</p>
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
			<h1 className="text-2xl font-bold text-gray-900">{t("newPost2")}</h1>

			<form onSubmit={handleSubmit} className="mt-6 space-y-4">
				{/* 오류 메시지 */}
				{submitError && (
					<p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
						{submitError}
					</p>
				)}

				{/* 카테고리 — aria-pressed로 선택 상태 전달 */}
				<fieldset>
					<legend className="text-sm font-medium text-gray-700">
						{t("category")}
					</legend>
					<div className="mt-2 flex gap-2" role="group">
						{categories.map(({ value, label }) => (
							<button
								key={value}
								type="button"
								aria-pressed={category === value}
								onClick={() => setCategory(value)}
								className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
									category === value
										? "bg-blue-100 text-blue-700"
										: "bg-gray-100 text-gray-600 hover:bg-gray-200"
								}`}
							>
								{label}
							</button>
						))}
					</div>
				</fieldset>

				{/* 제목 */}
				<div>
					<label htmlFor="post-title" className="block text-sm font-medium text-gray-700">
						{t("title2")}
					</label>
					<input
						id="post-title"
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
						maxLength={200}
						className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
					/>
				</div>

				{/* 내용 */}
				<div>
					<label htmlFor="post-content" className="block text-sm font-medium text-gray-700">
						{t("content")}
					</label>
					<textarea
						id="post-content"
						value={content}
						onChange={(e) => setContent(e.target.value)}
						required
						maxLength={5000}
						rows={10}
						className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-y"
					/>
				</div>

				{/* 버튼 */}
				<div className="flex justify-end gap-2 pt-2">
					<button
						type="button"
						onClick={() => router.back()}
						className="rounded-lg px-5 py-2.5 text-sm text-gray-500 hover:text-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
					>
						{t("cancel")}
					</button>
					<button
						type="submit"
						disabled={!title.trim() || !content.trim() || isSubmitting}
						className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
					>
						{isSubmitting ? (t("posting")) : t("post")}
					</button>
				</div>
			</form>
		</div>
	);
}
