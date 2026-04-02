CREATE TABLE tasks (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id       uuid NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  title           text NOT NULL,
  description     text,
  language        text NOT NULL DEFAULT 'javascript',
  starter_code    text,
  solution_code   text,
  -- Option A validation: test cases as JSON array [{input: [...args], expected: any}]
  test_cases      jsonb,
  -- PostgreSQL-specific validation
  setup_sql       text,
  validation_sql  text,
  expected_result jsonb,
  order_index     integer NOT NULL DEFAULT 0,
  created_at      timestamptz DEFAULT now()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "authenticated can read tasks"
  ON tasks FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "authenticated can write tasks"
  ON tasks FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
