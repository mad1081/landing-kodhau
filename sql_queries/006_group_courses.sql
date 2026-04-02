-- M2M: one group can be assigned to many courses
CREATE TABLE group_courses (
  group_id    uuid NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  course_id   uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  assigned_at timestamptz DEFAULT now(),
  PRIMARY KEY (group_id, course_id)
);

ALTER TABLE group_courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "authenticated can read group_courses"
  ON group_courses FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "authenticated can write group_courses"
  ON group_courses FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
