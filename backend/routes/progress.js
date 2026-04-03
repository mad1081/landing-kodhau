const supabase = require('../lib/supabase')

module.exports = function(app) {
  // GET completed task IDs for current user
  app.get('/api/progress', async (req, res) => {
    if (!req.user) return res.json([])
    try {
      const { data, error } = await supabase
        .from('user_task_progress')
        .select('task_id')
        .eq('user_id', req.user.id)
      if (error) throw error
      res.json((data || []).map(r => r.task_id))
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
