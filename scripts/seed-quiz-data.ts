/**
 * scripts/seed-quiz-data.ts
 *
 * 기존 로컬 TypeScript 파일의 퀴즈 데이터를 Supabase DB에 시딩합니다.
 *
 * 실행 방법:
 *   npx ts-node --project tsconfig.json scripts/seed-quiz-data.ts
 *   또는
 *   npx tsx scripts/seed-quiz-data.ts
 *
 * 필요 환경변수 (.env.local):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY
 *   또는 서비스 롤 키 (SUPABASE_SERVICE_ROLE_KEY) 권장
 */

import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

// .env.local 로드
dotenv.config({ path: ".env.local" });

// 타입 정의 (경로 alias 미사용)
interface QuizQuestion {
  id: string;
  question: { ko: string; en: string };
  options: {
    a: { ko: string; en: string };
    b: { ko: string; en: string };
    c: { ko: string; en: string };
    d: { ko: string; en: string };
  };
  answer: "a" | "b" | "c" | "d";
  explanation: { ko: string; en: string };
}

interface StudyUnit {
  id: string;
  exam: "cpacc" | "was";
  domain: 1 | 2 | 3;
  questions: QuizQuestion[];
}

async function seed() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // 시딩은 서비스 롤 키를 우선 사용 (RLS 우회)
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.error("❌ 환경변수 NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY 가 없습니다.");
    process.exit(1);
  }

  const supabase = createClient(url, key);

  // 동적 import (tsconfig paths 없이 실행하므로 상대경로)
  const { cpaccUnits } = await import("../src/lib/content/cpacc-units");
  const { wasUnits } = await import("../src/lib/content/was-units");

  const allUnits: StudyUnit[] = [...cpaccUnits, ...wasUnits];
  const rows = allUnits.flatMap((unit) =>
    unit.questions.map((q) => ({
      id: q.id,
      exam: unit.exam,
      domain: unit.domain,
      unit_id: unit.id,
      difficulty: "medium",
      question_ko: q.question.ko,
      question_en: q.question.en,
      option_a_ko: q.options.a.ko,
      option_a_en: q.options.a.en,
      option_b_ko: q.options.b.ko,
      option_b_en: q.options.b.en,
      option_c_ko: q.options.c.ko,
      option_c_en: q.options.c.en,
      option_d_ko: q.options.d.ko,
      option_d_en: q.options.d.en,
      answer: q.answer,
      explanation_ko: q.explanation.ko,
      explanation_en: q.explanation.en,
      is_active: true,
    }))
  );

  console.log(`📝 시딩할 퀴즈 문항: ${rows.length}개`);

  // upsert: 이미 있으면 업데이트, 없으면 삽입
  const { data, error } = await supabase
    .from("quiz_questions")
    .upsert(rows, { onConflict: "id" })
    .select("id");

  if (error) {
    console.error("❌ 시딩 실패:", error.message);
    process.exit(1);
  }

  console.log(`✅ 시딩 완료: ${data?.length ?? 0}개 처리됨`);
  console.log("시딩된 ID 목록:", data?.map((r: { id: string }) => r.id).join(", "));
}

seed().catch((err) => {
  console.error("예외 발생:", err);
  process.exit(1);
});
