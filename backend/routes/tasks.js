const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

module.exports = function(app) {
  app.get('/api/lessons/:lessonId/tasks', async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('lesson_id', req.params.lessonId)
        .order('order_index')

      if (error) throw error
      res.json(data || [])
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })

  app.get('/api/tasks/:id', async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('id', req.params.id)
        .single()

      if (error) throw error
      res.json(data)
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })

  app.post('/api/tasks', async (req, res) => {
    try {
      if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'teacher')) {
        return res.status(403).json({ error: 'Forbidden' })
      }

      const { lesson_id, title, description, language, starter_code, solution_code, test_cases, order_index } = req.body
      const { data, error } = await supabase
        .from('tasks')
        .insert([{
          lesson_id, title, description: description || null, language: language || 'javascript',
          starter_code: starter_code || null, solution_code: solution_code || null,
          test_cases: test_cases || null, order_index: order_index || 0
        }])
        .select()

      if (error) throw error
      res.status(201).json(data[0])
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })

  app.put('/api/tasks/:id', async (req, res) => {
    try {
      if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'teacher')) {
        return res.status(403).json({ error: 'Forbidden' })
      }

      const { title, description, language, starter_code, solution_code, test_cases, order_index } = req.body
      const { data, error } = await supabase
        .from('tasks')
        .update({ title, description, language, starter_code, solution_code, test_cases, order_index })
        .eq('id', req.params.id)
        .select()

      if (error) throw error
      res.json(data[0])
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })

  app.delete('/api/tasks/:id', async (req, res) => {
    try {
      if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden' })
      }

      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', req.params.id)

      if (error) throw error
      res.json({ ok: true })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })
}
