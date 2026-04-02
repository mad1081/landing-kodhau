CREATE TABLE modules (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id   uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title       text NOT NULL,
  order_index integer NOT NULL DEFAULT 0,
  created_at  timestamptz DEFAULT now()
);

ALTER TABLE modules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "authenticated can read modules"
  ON modules FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "authenticated can write modules"
  ON modules FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
