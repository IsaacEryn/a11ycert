-- ============================================================================
-- A11yCert v2 — 전체 DB 스키마
-- Supabase Dashboard → SQL Editor에서 실행
-- 작성일: 2026-04-15
-- ============================================================================

-- ── 1. profiles (사용자 프로필) ─────────────────────────────────────────────
-- Auth 가입 시 트리거로 자동 생성
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nickname TEXT NOT NULL DEFAULT '',
  avatar_url TEXT,
  provider TEXT,                       -- 'google' | 'github' | 'kakao'
  tier TEXT NOT NULL DEFAULT 'free',   -- 'free' | 'premium' (Phase 7용)
  daily_quiz_count INT NOT NULL DEFAULT 0,
  daily_quiz_reset_at TIMESTAMPTZ,
  daily_page_count INT NOT NULL DEFAULT 0,
  daily_page_reset_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 누구나 닉네임/아바타 읽기 가능 (댓글 표시용)
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

-- 자기 프로필만 수정 가능
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Auth 회원가입 시 profiles 자동 생성 트리거
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, nickname, avatar_url, provider)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'user_name', '학습자'),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture', ''),
    COALESCE(NEW.raw_app_meta_data->>'provider', 'email')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();


-- ── 2. quiz_questions (퀴즈 문항) ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS quiz_questions (
  id TEXT PRIMARY KEY,                 -- 'cpacc-1-1-q1' 형식
  exam TEXT NOT NULL,                  -- 'cpacc' | 'was'
  domain INT NOT NULL,                 -- 1, 2, 3
  unit_id TEXT NOT NULL,               -- 'cpacc-1-1'
  difficulty TEXT NOT NULL DEFAULT 'medium',  -- 'easy' | 'medium' | 'hard'
  question_ko TEXT NOT NULL,
  question_en TEXT NOT NULL,
  option_a_ko TEXT NOT NULL,
  option_a_en TEXT NOT NULL,
  option_b_ko TEXT NOT NULL,
  option_b_en TEXT NOT NULL,
  option_c_ko TEXT NOT NULL,
  option_c_en TEXT NOT NULL,
  option_d_ko TEXT NOT NULL,
  option_d_en TEXT NOT NULL,
  answer TEXT NOT NULL,                -- 'a' | 'b' | 'c' | 'd'
  explanation_ko TEXT NOT NULL,
  explanation_en TEXT NOT NULL,
  report_count INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active questions"
  ON quiz_questions FOR SELECT
  USING (is_active = true);

CREATE INDEX IF NOT EXISTS idx_quiz_exam_domain
  ON quiz_questions(exam, domain);

CREATE INDEX IF NOT EXISTS idx_quiz_unit
  ON quiz_questions(unit_id);


-- ── 3. comments (학습 페이지 댓글) ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  page_path TEXT NOT NULL,             -- '/cpacc/study/cpacc-1-1' 등
  content TEXT NOT NULL,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,  -- 대댓글
  is_deleted BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read comments"
  ON comments FOR SELECT
  USING (true);

CREATE POLICY "Auth users can create comments"
  ON comments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own comments"
  ON comments FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments"
  ON comments FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_comments_page
  ON comments(page_path, created_at DESC);


-- ── 4. reports (정보 수정 요청/제보) ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,                   -- 'correction' | 'error' | 'suggestion'
  target_type TEXT NOT NULL,            -- 'quiz' | 'content' | 'glossary'
  target_id TEXT,                       -- 퀴즈 ID 또는 페이지 경로
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open',  -- 'open' | 'in_review' | 'resolved' | 'rejected'
  board_post_id UUID,                   -- 자동 생성된 게시판 글 참조
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read reports"
  ON reports FOR SELECT
  USING (true);

CREATE POLICY "Auth users can create reports"
  ON reports FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reports"
  ON reports FOR UPDATE
  USING (auth.uid() = user_id);


-- ── 5. board_posts (커뮤니티 게시판) ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS board_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  category TEXT NOT NULL,              -- 'report' | 'discussion' | 'question' | 'tip'
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  report_id UUID REFERENCES reports(id),  -- 제보에서 자동 생성된 경우
  view_count INT NOT NULL DEFAULT 0,
  reply_count INT NOT NULL DEFAULT 0,
  is_pinned BOOLEAN NOT NULL DEFAULT false,
  is_deleted BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE board_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read board posts"
  ON board_posts FOR SELECT
  USING (is_deleted = false);

CREATE POLICY "Auth users can create posts"
  ON board_posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own posts"
  ON board_posts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own posts"
  ON board_posts FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_board_category
  ON board_posts(category, created_at DESC);

-- reports ↔ board_posts 상호 참조
ALTER TABLE reports
  ADD CONSTRAINT fk_reports_board_post
  FOREIGN KEY (board_post_id) REFERENCES board_posts(id);


-- ── 6. board_replies (게시판 댓글) ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS board_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES board_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  parent_id UUID REFERENCES board_replies(id) ON DELETE CASCADE,
  is_deleted BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE board_replies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read board replies"
  ON board_replies FOR SELECT
  USING (true);

CREATE POLICY "Auth users can create replies"
  ON board_replies FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own replies"
  ON board_replies FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own replies"
  ON board_replies FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_board_replies_post
  ON board_replies(post_id, created_at);


-- ── 7. study_notes (학습 메모) ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS study_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  page_path TEXT NOT NULL,             -- '/cpacc/study/cpacc-1-1'
  unit_id TEXT NOT NULL,               -- 'cpacc-1-1'
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, page_path)           -- 페이지당 1개 메모
);

ALTER TABLE study_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own notes"
  ON study_notes FOR ALL
  USING (auth.uid() = user_id);


-- ── 8. saved_questions (저장된 퀴즈/북마크) ────────────────────────────────
CREATE TABLE IF NOT EXISTS saved_questions (
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  question_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, question_id)
);

ALTER TABLE saved_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own saved questions"
  ON saved_questions FOR ALL
  USING (auth.uid() = user_id);


-- ── 9. wrong_answers (오답 노트) ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS wrong_answers (
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  question_id TEXT NOT NULL,
  user_answer TEXT NOT NULL,           -- 'a' | 'b' | 'c' | 'd'
  attempt_count INT NOT NULL DEFAULT 1,
  last_attempted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, question_id)
);

ALTER TABLE wrong_answers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own wrong answers"
  ON wrong_answers FOR ALL
  USING (auth.uid() = user_id);


-- ── 10. completed_units (완료한 학습 단위) ─────────────────────────────────
CREATE TABLE IF NOT EXISTS completed_units (
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  unit_id TEXT NOT NULL,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, unit_id)
);

ALTER TABLE completed_units ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own completed units"
  ON completed_units FOR ALL
  USING (auth.uid() = user_id);


-- ── updated_at 자동 갱신 트리거 ───────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON quiz_questions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON reports
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON board_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON study_notes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
