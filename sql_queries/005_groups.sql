CREATE TABLE groups (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text NOT NULL,
  teacher_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE groups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "authenticated can read groups"
  ON groups FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "authenticated can write groups"
  ON groups FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
