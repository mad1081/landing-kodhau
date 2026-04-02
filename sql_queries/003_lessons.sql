CREATE TABLE lessons (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id   uuid NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  title       text NOT NULL,
  theory_md   text,
  order_index integer NOT NULL DEFAULT 0,
  created_at  timestamptz DEFAULT now()
);

ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "authenticated can read lessons"
  ON lessons FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "authenticated can write lessons"
  ON lessons FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
