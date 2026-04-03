const supabase = require('../lib/supabase')

module.exports = function(app) {
  // GET progress: completed task IDs + lesson/course counts
  app.get('/api/progress', async (req, res) => {
    if (!req.user) return res.json({ taskIds: [], lessonIds: [], courseLessons: {} })
    try {
      const { data, error } = await supabase
        .from('user_task_progress')
        .select('task_id, tasks(lesson_id, lessons(module_id, modules(course_id)))')
        .eq('user_id', req.user.id)
      if (error) throw error

      const taskIds = (data || []).map(r => r.task_id)

      // Unique completed lesson IDs
      const lessonIds = [...new Set(
        (data || []).map(r => r.tasks?.lesson_id).filter(Boolean)
      )]

      // Completed lessons per course_id
      const courseLessons = {}
      for (const row of (data || [])) {
        const courseId = row.tasks?.lessons?.modules?.course_id
        const lessonId = row.tasks?.lesson_id
        if (courseId && lessonId) {
          if (!courseLessons[courseId]) courseLessons[courseId] = new Set()
          courseLessons[courseId].add(lessonId)
        }
      }
      // Convert sets to counts
      for (const key of Object.keys(courseLessons)) {
        courseLessons[key] = courseLessons[key].size
      }

      res.json({ taskIds, lessonIds, courseLessons })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })

  // POST mark task as completed
  app.post('/api/progress/:taskId', async (req, res) => {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' })
    try {
      const { error } = await supabase
        .from('user_task_progress')
        .upsert({ user_id: req.user.id, task_id: req.params.taskId }, { onConflict: 'user_id,task_id' })
      if (error) throw error
      res.json({ ok: true })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })
}
