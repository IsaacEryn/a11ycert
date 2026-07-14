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
	userAnswer: string
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

// ── 플래시카드 SRS ──────────────────────────────────────────────────────────

export async function syncSrsCardToDB(
	userId: string,
	cert: "cpacc" | "was",
	cardId: string,
	box: number,
	dueAt: string
) {
	const { error } = await supabase.from("flashcard_srs").upsert(
		{
			user_id: userId,
			cert,
			card_id: cardId,
			box,
			due_at: dueAt,
			updated_at: new Date().toISOString(),
		},
		{ onConflict: "user_id,cert,card_id" }
	);

	if (error) console.error("[learning-sync] flashcard_srs upsert failed:", error.message);
}

// ── 퀴즈 시도 이력 ──────────────────────────────────────────────────────────

export async function syncAttemptToDB(
	userId: string,
	cert: "cpacc" | "was",
	attempt: {
		mode: "practice" | "mock";
		total: number;
		correct: number;
		durationSeconds: number | null;
		domainStats: Record<string, { total: number; correct: number }>;
		answers?: { qid: string; picked: string; correct: boolean }[];
	}
) {
	const { error } = await supabase.from("quiz_attempts").insert({
		user_id: userId,
		cert,
		mode: attempt.mode,
		total: attempt.total,
		correct: attempt.correct,
		duration_seconds: attempt.durationSeconds,
		domain_stats: attempt.domainStats,
		answers: attempt.answers ?? null,
	});

	if (error) console.error("[learning-sync] quiz_attempt insert failed:", error.message);
}

// ── 나의 사전 ───────────────────────────────────────────────────────────────

export interface DictEntryRow {
	entry_id: string;
	source: "glossary" | "custom";
	word_ko: string | null;
	word_en: string | null;
	meaning_ko: string | null;
	meaning_en: string | null;
	box: number;
	due_at: string;
	created_at?: string;
}

export async function syncDictEntryToDB(
	userId: string,
	entry: Pick<DictEntryRow, "entry_id" | "source" | "word_ko" | "word_en" | "meaning_ko" | "meaning_en">
) {
	const { error } = await supabase.from("dictionary_entries").upsert(
		{ user_id: userId, ...entry },
		{ onConflict: "user_id,entry_id", ignoreDuplicates: true }
	);
	if (error) console.error("[learning-sync] dictionary_entry upsert failed:", error.message);
}

export async function removeDictEntryFromDB(userId: string, entryId: string) {
	const { error } = await supabase
		.from("dictionary_entries")
		.delete()
		.eq("user_id", userId)
		.eq("entry_id", entryId);
	if (error) console.error("[learning-sync] dictionary_entry delete failed:", error.message);
}

export async function syncDictSrsToDB(userId: string, entryId: string, box: number, dueAt: string) {
	const { error } = await supabase
		.from("dictionary_entries")
		.update({ box, due_at: dueAt, updated_at: new Date().toISOString() })
		.eq("user_id", userId)
		.eq("entry_id", entryId);
	if (error) console.error("[learning-sync] dictionary_srs update failed:", error.message);
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
			dictionary?: {
				saved?: string[];
				custom?: {
					id: string;
					word: { ko: string; en: string };
					meaning: { ko: string; en: string };
					createdAt?: string;
				}[];
				srs?: Record<string, { box: number; due: string }>;
			};
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

	// 나의 사전 마이그레이션 (용어집 저장 + 직접 등록 + SRS 상태)
	const dict = parsed?.state?.dictionary;
	if (dict) {
		const srs = dict.srs ?? {};
		const rows: (DictEntryRow & { user_id: string })[] = [
			...(dict.saved ?? []).map((termId) => ({
				user_id: userId,
				entry_id: termId,
				source: "glossary" as const,
				word_ko: null,
				word_en: null,
				meaning_ko: null,
				meaning_en: null,
				box: srs[termId]?.box ?? 1,
				due_at: srs[termId]?.due ?? now,
			})),
			...(dict.custom ?? []).map((c) => ({
				user_id: userId,
				entry_id: c.id,
				source: "custom" as const,
				word_ko: c.word.ko,
				word_en: c.word.en,
				meaning_ko: c.meaning.ko,
				meaning_en: c.meaning.en,
				box: srs[c.id]?.box ?? 1,
				due_at: srs[c.id]?.due ?? now,
			})),
		];
		if (rows.length) {
			promises.push(
				(async () => {
					const { error } = await supabase
						.from("dictionary_entries")
						.upsert(rows, { onConflict: "user_id,entry_id", ignoreDuplicates: true });
					if (error) console.error("[migration] dictionary_entries:", error.message);
				})()
			);
		}
	}

	await Promise.allSettled(promises);
	console.log("[migration] localStorage → DB migration complete");
}
