"use client";

import { useState, useEffect, useRef } from "react";
import { useOptionalAuth } from "@/lib/auth/AuthProvider";

interface ReportModalProps {
	locale: string;
	targetType: "quiz" | "content" | "glossary";
	targetId?: string;
	onClose: () => void;
}

const FOCUSABLE =
	'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function ReportModal({ locale, targetType, targetId, onClose }: ReportModalProps) {
	const [type, setType] = useState<"correction" | "error" | "suggestion">("error");
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const auth = useOptionalAuth();
	const isKo = locale === "ko";
	const dialogRef = useRef<HTMLDivElement>(null);
	// 모달 열기 전 포커스 요소 저장 → 닫힐 때 반환
	const previousFocusRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		previousFocusRef.current = document.activeElement as HTMLElement;

		// 첫 번째 포커스 가능한 요소로 포커스 이동
		requestAnimationFrame(() => {
			const first = dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE);
			first?.focus();
		});

		// 포커스 트랩 + Escape 처리
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose();
				return;
			}
			if (e.key !== "Tab") return;

			const elements = Array.from(
				dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []
			);
			if (elements.length === 0) return;

			const first = elements[0];
			const last = elements[elements.length - 1];

			if (e.shiftKey) {
				if (document.activeElement === first) {
					e.preventDefault();
					last.focus();
				}
			} else {
				if (document.activeElement === last) {
					e.preventDefault();
					first.focus();
				}
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			// 모달 닫힐 때 이전 포커스 요소로 반환
			previousFocusRef.current?.focus();
		};
	}, [onClose]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!auth?.user) return;

		setIsSubmitting(true);
		setSubmitError(null);

		const res = await fetch("/api/reports", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				type,
				target_type: targetType,
				target_id: targetId || null,
				title,
				content,
			}),
		});

		if (res.ok) {
			setSubmitted(true);
		} else {
			const json = await res.json().catch(() => ({}));
			setSubmitError(
				json.error || (isKo ? "제출 중 오류가 발생했습니다." : "An error occurred. Please try again.")
			);
		}
		setIsSubmitting(false);
	};

	const typeOptions = [
		{ value: "error" as const, label: isKo ? "오류 제보" : "Report Error" },
		{ value: "correction" as const, label: isKo ? "수정 요청" : "Correction Request" },
		{ value: "suggestion" as const, label: isKo ? "제안" : "Suggestion" },
	];

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
			onClick={(e) => {
				if (e.target === e.currentTarget) onClose();
			}}
			role="presentation"
		>
			<div
				ref={dialogRef}
				role="dialog"
				aria-modal="true"
				aria-labelledby="report-title"
				className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
			>
				{submitted ? (
					<div className="text-center py-4">
						<p className="text-lg font-semibold text-green-600" role="status">
							{isKo ? "제보가 접수되었습니다!" : "Report submitted!"}
						</p>
						<p className="mt-2 text-sm text-gray-500">
							{isKo
								? "커뮤니티 게시판에서 토론에 참여할 수 있습니다."
								: "You can join the discussion in the community board."}
						</p>
						<button
							onClick={onClose}
							className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
						>
							{isKo ? "닫기" : "Close"}
						</button>
					</div>
				) : !auth?.user ? (
					<div className="text-center py-4">
						<p className="text-sm text-gray-500">
							{isKo ? "제보하려면 로그인이 필요합니다." : "Please sign in to submit a report."}
						</p>
						<button
							onClick={onClose}
							className="mt-4 text-sm text-blue-600 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 rounded"
						>
							{isKo ? "닫기" : "Close"}
						</button>
					</div>
				) : (
					<form onSubmit={handleSubmit}>
						<h2 id="report-title" className="text-base font-semibold text-gray-900">
							{isKo ? "정보 수정 요청 / 오류 제보" : "Report Issue"}
						</h2>

						{/* 유형 선택 — aria-pressed로 선택 상태 전달 */}
						<fieldset className="mt-4">
							<legend className="text-xs font-medium text-gray-600">
								{isKo ? "유형" : "Type"}
							</legend>
							<div className="mt-1.5 flex gap-2" role="group">
								{typeOptions.map(({ value, label }) => (
									<button
										key={value}
										type="button"
										aria-pressed={type === value}
										onClick={() => setType(value)}
										className={`rounded-full px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
											type === value
												? "bg-blue-100 text-blue-700"
												: "bg-gray-100 text-gray-600 hover:bg-gray-200"
										}`}
									>
										{label}
									</button>
								))}
							</div>
						</fieldset>

						{/* 오류 메시지 */}
						{submitError && (
							<p role="alert" className="mt-3 text-sm text-red-600">
								{submitError}
							</p>
						)}

						{/* 제목 */}
						<label className="mt-4 block">
							<span className="text-xs font-medium text-gray-600">{isKo ? "제목" : "Title"}</span>
							<input
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								required
								maxLength={100}
								className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
							/>
						</label>

						{/* 내용 */}
						<label className="mt-3 block">
							<span className="text-xs font-medium text-gray-600">{isKo ? "내용" : "Details"}</span>
							<textarea
								value={content}
								onChange={(e) => setContent(e.target.value)}
								required
								maxLength={2000}
								rows={4}
								className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
							/>
						</label>

						{/* 버튼 */}
						<div className="mt-4 flex justify-end gap-2">
							<button
								type="button"
								onClick={onClose}
								className="rounded-lg px-4 py-2 text-sm text-gray-500 hover:text-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
							>
								{isKo ? "취소" : "Cancel"}
							</button>
							<button
								type="submit"
								disabled={!title.trim() || !content.trim() || isSubmitting}
								className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
							>
								{isSubmitting
									? isKo
										? "제출 중..."
										: "Submitting..."
									: isKo
										? "제보하기"
										: "Submit"}
							</button>
						</div>
					</form>
				)}
			</div>
		</div>
	);
}
