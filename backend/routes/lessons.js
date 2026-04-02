const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

module.exports = function(app) {
  app.get('/api/modules/:moduleId/lessons', async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('module_id', req.params.moduleId)
        .order('order_index')

      if (error) throw error
      res.json(data || [])
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })

  app.get('/api/lessons/:id', async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('id', req.params.id)
        .single()

      if (error) throw error
      res.json(data)
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })

  app.post('/api/lessons', async (req, res) => {
    try {
      if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'teacher')) {
        return res.status(403).json({ error: 'Forbidden' })
      }

      const { module_id, title, theory_md, order_index } = req.body
      const { data, error } = await supabase
        .from('lessons')
        .insert([{ module_id, title, theory_md: theory_md || null, order_index: order_index || 0 }])
        .select()

      if (error) throw error
      res.status(201).json(data[0])
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })

  app.put('/api/lessons/:id', async (req, res) => {
    try {
      if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'teacher')) {
        return res.status(403).json({ error: 'Forbidden' })
      }

      const { title, theory_md, order_index } = req.body
      const { data, error } = await supabase
        .from('lessons')
        .update({ title, theory_md, order_index })
        .eq('id', req.params.id)
        .select()

      if (error) throw error
      res.json(data[0])
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })

  app.delete('/api/lessons/:id', async (req, res) => {
    try {
      if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden' })
      }

      const { error } = await supabase
        .from('lessons')
        .delete()
        .eq('id', req.params.id)

      if (error) throw error
      res.json({ ok: true })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })
}
