"use client";

import { createClient } from "@/lib/supabase/client";

/**
 * 학습 데이터 DB 동기화 서비스
 * 로그인 사용자의 오답/저장/완료 데이터를 Supabase DB에 저장
 */

const supabase = createClient();

// ── 오답 ────────────────────────────────────────────────────────────────────

export async function syncWrongAnswerToDB(
	userId: string,
	questionId: string,
	userAnswer: string,
	exam: string
) {
	const { error } = await supabase.from("wrong_answers").upsert(
		{
			user_id: userId,
			question_id: questionId,
			user_answer: userAnswer,
			attempt_count: 1,
			last_attempted_at: new Date().toISOString(),
		},
		{ onConflict: "user_id,question_id" }
	);

	if (error) console.error("[learning-sync] wrong_answer upsert failed:", error.message);
}

export async function removeWrongAnswerFromDB(userId: string, questionId: string) {
	const { error } = await supabase
		.from("wrong_answers")
		.delete()
		.eq("user_id", userId)
		.eq("question_id", questionId);

	if (error) console.error("[learning-sync] wrong_answer delete failed:", error.message);
}

// ── 저장 문제 ───────────────────────────────────────────────────────────────

export async function syncSavedQuestionToDB(userId: string, questionId: string) {
	const { error } = await supabase.from("saved_questions").upsert(
		{
			user_id: userId,
			question_id: questionId,
		},
		{ onConflict: "user_id,question_id" }
	);

	if (error) console.error("[learning-sync] saved_question upsert failed:", error.message);
}

export async function removeSavedQuestionFromDB(userId: string, questionId: string) {
	const { error } = await supabase
		.from("saved_questions")
		.delete()
		.eq("user_id", userId)
		.eq("question_id", questionId);

	if (error) console.error("[learning-sync] saved_question delete failed:", error.message);
}

// ── 완료 단위 ───────────────────────────────────────────────────────────────

export async function syncCompletedUnitToDB(userId: string, unitId: string) {
	const { error } = await supabase.from("completed_units").upsert(
		{
			user_id: userId,
			unit_id: unitId,
		},
		{ onConflict: "user_id,unit_id" }
	);

	if (error) console.error("[learning-sync] completed_unit upsert failed:", error.message);
}

// ── localStorage → DB 전체 마이그레이션 ──────────────────────────────────────

export async function migrateLocalStorageToDB(userId: string) {
	const raw = localStorage.getItem("a11ycert.learning.v2");
	if (!raw) return;

	let parsed: {
		state?: {
			perCert?: Record<string, {
				completedUnits?: string[];
				bookmarks?: string[];
				wrongNotes?: string[];
			}>;
		};
	};
	try {
		parsed = JSON.parse(raw);
	} catch {
		return;
	}

	const perCert = parsed?.state?.perCert;
	if (!perCert) return;

	const promises: Promise<unknown>[] = [];
	const now = new Date().toISOString();

	for (const certData of Object.values(perCert)) {
		// 오답 마이그레이션
		if (certData.wrongNotes?.length) {
			const rows = certData.wrongNotes.map((qid) => ({
				user_id: userId,
				question_id: qid,
				user_answer: "unknown",
				attempt_count: 1,
				last_attempted_at: now,
			}));
			promises.push(
				(async () => {
					const { error } = await supabase
						.from("wrong_answers")
						.upsert(rows, { onConflict: "user_id,question_id", ignoreDuplicates: true });
					if (error) console.error("[migration] wrong_answers:", error.message);
				})()
			);
		}

		// 저장 문제 마이그레이션
		if (certData.bookmarks?.length) {
			const rows = certData.bookmarks.map((qid) => ({ user_id: userId, question_id: qid }));
			promises.push(
				(async () => {
					const { error } = await supabase
						.from("saved_questions")
						.upsert(rows, { onConflict: "user_id,question_id", ignoreDuplicates: true });
					if (error) console.error("[migration] saved_questions:", error.message);
				})()
			);
		}

		// 완료 단위 마이그레이션
		if (certData.completedUnits?.length) {
			const rows = certData.completedUnits.map((uid) => ({ user_id: userId, unit_id: uid }));
			promises.push(
				(async () => {
					const { error } = await supabase
						.from("completed_units")
						.upsert(rows, { onConflict: "user_id,unit_id", ignoreDuplicates: true });
					if (error) console.error("[migration] completed_units:", error.message);
				})()
			);
		}
	}

	await Promise.allSettled(promises);
	console.log("[migration] localStorage → DB migration complete");
}
