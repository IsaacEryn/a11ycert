"use client";

import { useState, useId } from "react";

interface CommentFormProps {
	onSubmit: (content: string) => Promise<void>;
	onCancel?: () => void;
	locale: string;
	initialValue?: string;
	placeholder?: string;
	submitLabel?: string;
	/** 시각적으로 숨겨진 label 텍스트 (스크린리더용) */
	labelText?: string;
}

export default function CommentForm({
	onSubmit,
	onCancel,
	locale,
	initialValue = "",
	placeholder,
	submitLabel,
	labelText,
}: CommentFormProps) {
	const [content, setContent] = useState(initialValue);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const isKo = locale === "ko";
	const textareaId = useId();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!content.trim() || isSubmitting) return;

		setIsSubmitting(true);
		await onSubmit(content.trim());
		setContent("");
		setIsSubmitting(false);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-2">
			<label htmlFor={textareaId} className="sr-only">
				{labelText || (isKo ? "댓글 입력" : "Write a comment")}
			</label>
			<textarea
				id={textareaId}
				value={content}
				onChange={(e) => setContent(e.target.value)}
				placeholder={placeholder || (isKo ? "댓글을 입력하세요..." : "Write a comment...")}
				className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
				rows={3}
				maxLength={2000}
			/>
			<div className="flex items-center justify-end gap-2">
				{onCancel && (
					<button
						type="button"
						onClick={onCancel}
						className="rounded-md px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
					>
						{isKo ? "취소" : "Cancel"}
					</button>
				)}
				<button
					type="submit"
					disabled={!content.trim() || isSubmitting}
					className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
				>
					{isSubmitting
						? isKo
							? "등록 중..."
							: "Posting..."
						: submitLabel || (isKo ? "댓글 등록" : "Post Comment")}
				</button>
			</div>
		</form>
	);
}
