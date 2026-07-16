"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useOptionalAuth } from "@/lib/auth/AuthProvider";

interface ReportModalProps {
	targetType: "quiz" | "content" | "glossary";
	targetId?: string;
	onClose: () => void;
}

const FOCUSABLE =
	'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function ReportModal({ targetType, targetId, onClose }: ReportModalProps) {
	const [type, setType] = useState<"correction" | "error" | "suggestion">("error");
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const auth = useOptionalAuth();
	const t = useTranslations("report");
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
				json.error || (t("anErrorOccurredPlease"))
			);
		}
		setIsSubmitting(false);
	};

	const typeOptions = [
		{ value: "error" as const, label: t("reportError") },
		{ value: "correction" as const, label: t("correctionRequest") },
		{ value: "suggestion" as const, label: t("suggestion") },
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
				className="w-full max-w-md rounded-xl p-6 shadow-xl"
				style={{ background: "var(--bg-elev)", color: "var(--fg)", border: "1px solid var(--border)" }}
			>
				{submitted ? (
					<div className="text-center py-4">
						<p className="text-lg font-semibold" style={{ color: "var(--success)" }} role="status">
							{t("reportSubmitted")}
						</p>
						<p className="mt-2 text-sm" style={{ color: "var(--fg-muted)" }}>
							{t("youCanJoinThe")}
						</p>
						<button
							onClick={onClose}
							className="mt-4 rounded-lg px-4 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2"
							style={{ background: "var(--accent)", color: "var(--fg-on-accent)" }}
						>
							{t("close")}
						</button>
					</div>
				) : !auth?.user ? (
					<div className="text-center py-4">
						<p className="text-sm" style={{ color: "var(--fg-muted)" }}>
							{t("pleaseSignInTo")}
						</p>
						<button
							onClick={onClose}
							className="mt-4 text-sm hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 rounded"
							style={{ color: "var(--accent)" }}
						>
							{t("close")}
						</button>
					</div>
				) : (
					<form onSubmit={handleSubmit}>
						<h2 id="report-title" className="text-base font-semibold" style={{ color: "var(--fg)" }}>
							{t("reportIssue")}
						</h2>

						{/* 유형 선택 — aria-pressed로 선택 상태 전달 */}
						<fieldset className="mt-4">
							<legend className="text-xs font-medium" style={{ color: "var(--fg-muted)" }}>
								{t("type")}
							</legend>
							<div className="mt-1.5 flex gap-2" role="group">
								{typeOptions.map(({ value, label }) => (
									<button
										key={value}
										type="button"
										aria-pressed={type === value}
										onClick={() => setType(value)}
										className="rounded-full px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
										style={
											type === value
												? { background: "var(--accent-soft)", color: "var(--accent-soft-fg)" }
												: { background: "var(--bg-muted)", color: "var(--fg-muted)" }
										}
									>
										{label}
									</button>
								))}
							</div>
						</fieldset>

						{/* 오류 메시지 */}
						{submitError && (
							<p id="report-submit-error" role="alert" className="mt-3 text-sm" style={{ color: "var(--danger)" }}>
								{submitError}
							</p>
						)}

						{/* 제목 */}
						<label className="mt-4 block">
							<span className="text-xs font-medium" style={{ color: "var(--fg-muted)" }}>{t("title")}</span>
							<input
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								required
								maxLength={100}
								aria-describedby={submitError ? "report-submit-error" : undefined}
								className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-1"
								style={{ background: "var(--bg)", color: "var(--fg)", borderColor: "var(--border)" }}
							/>
						</label>

						{/* 내용 */}
						<label className="mt-3 block">
							<span className="text-xs font-medium" style={{ color: "var(--fg-muted)" }}>{t("details")}</span>
							<textarea
								value={content}
								onChange={(e) => setContent(e.target.value)}
								required
								maxLength={2000}
								rows={4}
								aria-describedby={submitError ? "report-submit-error" : undefined}
								className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-1 resize-none"
								style={{ background: "var(--bg)", color: "var(--fg)", borderColor: "var(--border)" }}
							/>
						</label>

						{/* 버튼 */}
						<div className="mt-4 flex justify-end gap-2">
							<button
								type="button"
								onClick={onClose}
								className="rounded-lg px-4 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2"
								style={{ color: "var(--fg-muted)" }}
							>
								{t("cancel")}
							</button>
							<button
								type="submit"
								disabled={!title.trim() || !content.trim() || isSubmitting}
								className="rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2"
								style={{ background: "var(--accent)", color: "var(--fg-on-accent)" }}
							>
								{isSubmitting
									? t("submitting")
									: t("submit")}
							</button>
						</div>
					</form>
				)}
			</div>
		</div>
	);
}
