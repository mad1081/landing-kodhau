const supabase = require('../lib/supabase')

module.exports = function(app) {
  app.get('/api/courses/:courseId/modules', async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('modules')
        .select('*')
        .eq('course_id', req.params.courseId)
        .order('order_index')

      if (error) throw error
      res.json(data || [])
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })

  app.post('/api/modules', async (req, res) => {
    try {
      if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'teacher')) {
        return res.status(403).json({ error: 'Forbidden' })
      }

      const { course_id, title, order_index } = req.body
      const { data, error } = await supabase
        .from('modules')
        .insert([{ course_id, title, order_index: order_index || 0 }])
        .select()

      if (error) throw error
      res.status(201).json(data[0])
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })

  app.put('/api/modules/:id', async (req, res) => {
    try {
      if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'teacher')) {
        return res.status(403).json({ error: 'Forbidden' })
      }

      const { title, order_index } = req.body
      const { data, error } = await supabase
        .from('modules')
        .update({ title, order_index })
        .eq('id', req.params.id)
        .select()

      if (error) throw error
      res.json(data[0])
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })

  app.delete('/api/modules/:id', async (req, res) => {
    try {
      if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden' })
      }

      const { error } = await supabase
        .from('modules')
        .delete()
        .eq('id', req.params.id)

      if (error) throw error
      res.json({ ok: true })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })
}
