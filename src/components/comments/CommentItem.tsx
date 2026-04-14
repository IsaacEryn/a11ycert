"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { ko, enUS } from "date-fns/locale";
import CommentForm from "./CommentForm";

interface CommentData {
	id: string;
	user_id: string;
	content: string;
	created_at: string;
	updated_at: string;
	profiles: {
		nickname: string;
		avatar_url: string | null;
	} | null;
}

interface CommentItemProps {
	comment: CommentData;
	locale: string;
	currentUserId?: string;
	onEdit: (id: string, content: string) => Promise<void>;
	onDelete: (id: string) => Promise<void>;
	onReply: (content: string, parentId: string) => Promise<void>;
	replies: CommentData[];
}

export default function CommentItem({
	comment,
	locale,
	currentUserId,
	onEdit,
	onDelete,
	onReply,
	replies,
}: CommentItemProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [isReplying, setIsReplying] = useState(false);
	const [confirmingDelete, setConfirmingDelete] = useState(false);
	const isKo = locale === "ko";
	const isOwner = currentUserId === comment.user_id;
	const nickname = comment.profiles?.nickname || (isKo ? "익명" : "Anonymous");
	const avatarUrl = comment.profiles?.avatar_url;

	const timeAgo = formatDistanceToNow(new Date(comment.created_at), {
		addSuffix: true,
		locale: isKo ? ko : enUS,
	});

	return (
		<div className="group">
			<div className="flex gap-3">
				{/* 아바타 */}
				{avatarUrl ? (
					<img
						src={avatarUrl}
						alt=""
						className="h-7 w-7 rounded-full object-cover shrink-0 mt-0.5"
						referrerPolicy="no-referrer"
					/>
				) : (
					<span
						className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-500 shrink-0 mt-0.5"
						aria-hidden="true"
					>
						{nickname.charAt(0).toUpperCase()}
					</span>
				)}

				<div className="flex-1 min-w-0">
					{/* 헤더 */}
					<div className="flex items-center gap-2">
						<span className="text-sm font-medium text-gray-900">{nickname}</span>
						<span className="text-xs text-gray-400">
							<time dateTime={comment.created_at}>{timeAgo}</time>
						</span>
					</div>

					{/* 내용 */}
					{isEditing ? (
						<CommentForm
							onSubmit={async (content) => {
								await onEdit(comment.id, content);
								setIsEditing(false);
							}}
							onCancel={() => setIsEditing(false)}
							locale={locale}
							initialValue={comment.content}
							submitLabel={isKo ? "수정" : "Edit"}
							labelText={isKo ? "댓글 수정" : "Edit comment"}
						/>
					) : (
						<p className="mt-1 text-sm text-gray-700 whitespace-pre-wrap break-words">
							{comment.content}
						</p>
					)}

					{/* 액션 버튼 */}
					{!isEditing && (
						<div className="mt-1.5 flex items-center gap-3 text-xs">
							{currentUserId && (
								<button
									onClick={() => setIsReplying(!isReplying)}
									aria-label={
										isKo
											? `${nickname}의 댓글에 답글 작성`
											: `Reply to ${nickname}'s comment`
									}
									aria-expanded={isReplying}
									className="text-gray-400 hover:text-blue-600 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 rounded"
								>
									{isKo ? "답글" : "Reply"}
								</button>
							)}
							{isOwner && (
								<>
									<button
										onClick={() => setIsEditing(true)}
										aria-label={isKo ? "내 댓글 수정" : "Edit my comment"}
										className="text-gray-400 hover:text-blue-600 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 rounded"
									>
										{isKo ? "수정" : "Edit"}
									</button>

									{/* 인라인 삭제 확인 (native confirm 대신) */}
									{confirmingDelete ? (
										<span className="flex items-center gap-1.5">
											<span className="text-red-600">
												{isKo ? "삭제할까요?" : "Delete?"}
											</span>
											<button
												onClick={() => {
													setConfirmingDelete(false);
													onDelete(comment.id);
												}}
												aria-label={isKo ? "삭제 확인" : "Confirm delete"}
												className="text-red-600 font-medium hover:text-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 rounded"
											>
												{isKo ? "확인" : "Yes"}
											</button>
											<button
												onClick={() => setConfirmingDelete(false)}
												aria-label={isKo ? "삭제 취소" : "Cancel delete"}
												className="text-gray-400 hover:text-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400 rounded"
											>
												{isKo ? "취소" : "No"}
											</button>
										</span>
									) : (
										<button
											onClick={() => setConfirmingDelete(true)}
											aria-label={isKo ? "내 댓글 삭제" : "Delete my comment"}
											className="text-gray-400 hover:text-red-600 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 rounded"
										>
											{isKo ? "삭제" : "Delete"}
										</button>
									)}
								</>
							)}
						</div>
					)}

					{/* 답글 폼 */}
					{isReplying && (
						<div className="mt-3">
							<CommentForm
								onSubmit={async (content) => {
									await onReply(content, comment.id);
									setIsReplying(false);
								}}
								onCancel={() => setIsReplying(false)}
								locale={locale}
								placeholder={isKo ? "답글을 작성해주세요..." : "Write a reply..."}
								labelText={
									isKo ? `${nickname}의 댓글에 답글` : `Reply to ${nickname}`
								}
							/>
						</div>
					)}

					{/* 대댓글 */}
					{replies.length > 0 && (
						<ul className="mt-3 space-y-3 border-l-2 border-gray-100 pl-4" role="list">
							{replies.map((reply) => (
								<li key={reply.id}>
									<CommentItem
										comment={reply}
										locale={locale}
										currentUserId={currentUserId}
										onEdit={onEdit}
										onDelete={onDelete}
										onReply={onReply}
										replies={[]}
									/>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</div>
	);
}
