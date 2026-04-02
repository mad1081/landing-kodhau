-- Remove hardcoded counters — will be computed from actual lessons/progress data
ALTER TABLE courses DROP COLUMN IF EXISTS total_lessons;
ALTER TABLE courses DROP COLUMN IF EXISTS completed_lessons;
