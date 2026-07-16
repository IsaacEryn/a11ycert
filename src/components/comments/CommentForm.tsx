"use client";

import { useState, useId } from "react";
import { useTranslations } from "next-intl";

interface CommentFormProps {
	onSubmit: (content: string) => Promise<void>;
	onCancel?: () => void;
	initialValue?: string;
	placeholder?: string;
	submitLabel?: string;
	/** 시각적으로 숨겨진 label 텍스트 (스크린리더용) */
	labelText?: string;
}

export default function CommentForm({
	onSubmit,
	onCancel,
		initialValue = "",
	placeholder,
	submitLabel,
	labelText,
}: CommentFormProps) {
	const [content, setContent] = useState(initialValue);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const t = useTranslations("comments");
	const textareaId = useId();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!content.trim() || isSubmitting) return;

		setIsSubmitting(true);
		try {
			await onSubmit(content.trim());
			setContent("");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-2">
			<label htmlFor={textareaId} className="sr-only">
				{labelText || (t("writeAComment2"))}
			</label>
			<textarea
				id={textareaId}
				value={content}
				onChange={(e) => setContent(e.target.value)}
				placeholder={placeholder || (t("writeAComment3"))}
				className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-1 resize-none"
				style={{ background: "var(--bg)", color: "var(--fg)", borderColor: "var(--border)" }}
				rows={3}
				maxLength={2000}
				disabled={isSubmitting}
			/>
			<div className="flex items-center justify-end gap-2">
				{onCancel && (
					<button
						type="button"
						onClick={onCancel}
						className="rounded-md px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
						style={{ color: "var(--fg-muted)" }}
					>
						{t("cancel")}
					</button>
				)}
				<button
					type="submit"
					disabled={!content.trim() || isSubmitting}
					className="rounded-md px-3 py-1.5 text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
					style={{ background: "var(--accent)", color: "var(--fg-on-accent)" }}
				>
					{isSubmitting
						? t("posting")
						: submitLabel || (t("postComment"))}
				</button>
			</div>
		</form>
	);
}
