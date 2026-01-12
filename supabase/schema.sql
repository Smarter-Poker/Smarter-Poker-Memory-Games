-- ============================================
-- MEMORY MATRIX SCHEMA (Orb #5)
-- Deploy to: PokerIQ-Production Supabase
-- ============================================

-- 1. GTO Scenarios Table (Answer Keys)
CREATE TABLE IF NOT EXISTS gto_scenarios (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  solution JSONB NOT NULL,
  difficulty TEXT DEFAULT 'beginner' CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  category TEXT DEFAULT 'preflop',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. User Progress Table (Per-Scenario Tracking)
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  scenario_id TEXT REFERENCES gto_scenarios(id) ON DELETE CASCADE,
  best_score INTEGER DEFAULT 0,
  attempts INTEGER DEFAULT 0,
  last_attempt TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, scenario_id)
);

-- 3. Drill Sessions Table (Detailed History)
CREATE TABLE IF NOT EXISTS drill_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  scenario_id TEXT REFERENCES gto_scenarios(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  time_taken_ms INTEGER,
  mistakes JSONB DEFAULT '[]',
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_user_progress_user ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_drill_sessions_user ON drill_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_drill_sessions_scenario ON drill_sessions(scenario_id);

-- 5. RLS Policies (Row Level Security)
ALTER TABLE gto_scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE drill_sessions ENABLE ROW LEVEL SECURITY;

-- GTO Scenarios: Everyone can read
CREATE POLICY "GTO Scenarios are viewable by everyone"
  ON gto_scenarios FOR SELECT
  USING (true);

-- User Progress: Users can only see their own
CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- Drill Sessions: Users can only see their own
CREATE POLICY "Users can view own drill sessions"
  ON drill_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own drill sessions"
  ON drill_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- SEED DATA: Initial GTO Scenarios
-- ============================================

INSERT INTO gto_scenarios (id, title, description, solution, difficulty, category)
VALUES 
  ('utg-open-100bb', 'UTG RFI (100bb)', 'Select the standard Opening Range from Under the Gun.', 
   '{"AA":"raise","KK":"raise","QQ":"raise","JJ":"raise","TT":"raise","99":"raise","88":"raise","77":"raise","66":"raise","55":"raise","44":"raise","AKs":"raise","AQs":"raise","AJs":"raise","ATs":"raise","A9s":"raise","A8s":"raise","A7s":"raise","A6s":"raise","A5s":"raise","A4s":"raise","A3s":"raise","A2s":"raise","AKo":"raise","AQo":"raise","AJo":"raise","ATo":"raise","KQs":"raise","KJs":"raise","KTs":"raise","K9s":"raise","KQo":"raise","KJo":"raise","QJs":"raise","QTs":"raise","Q9s":"raise","QJo":"raise","JTs":"raise","J9s":"raise","T9s":"raise","87s":"raise","76s":"raise","65s":"raise","54s":"raise"}',
   'beginner', 'preflop'),
  ('btn-vs-open-flat', 'BTN vs UTG Open (Flat Range)', 'Which hands do we just CALL with on the Button vs an EP Open?',
   '{"JJ":"call","TT":"call","99":"call","88":"call","77":"call","66":"call","55":"call","44":"call","33":"call","22":"call","AQs":"call","AJs":"call","ATs":"call","A9s":"call","A8s":"call","A5s":"call","A4s":"call","A3s":"call","A2s":"call","KQs":"call","KJs":"call","KTs":"call","QJs":"call","QTs":"call","JTs":"call","T9s":"call","98s":"call","AQo":"call","KQo":"call"}',
   'beginner', 'preflop')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- VERIFICATION
-- ============================================
-- Run: SELECT * FROM gto_scenarios;
-- Expected: 2 rows (UTG Open, BTN Flat)
