const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

module.exports = function(app) {
  // GET all courses
  app.get('/api/courses', async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at')

      if (error) throw error
      res.json(data || [])
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })

  // GET single course
  app.get('/api/courses/:id', async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', req.params.id)
        .single()

      if (error) throw error
      res.json(data)
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })

  // POST create course
  app.post('/api/courses', async (req, res) => {
    try {
      if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'teacher')) {
        return res.status(403).json({ error: 'Forbidden' })
      }

      const { title, slug, description, icon, color } = req.body
      const { data, error } = await supabase
        .from('courses')
        .insert([{ title, slug, description, icon, color }])
        .select()

      if (error) throw error
      res.status(201).json(data[0])
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })

  // PUT update course
  app.put('/api/courses/:id', async (req, res) => {
    try {
      if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'teacher')) {
        return res.status(403).json({ error: 'Forbidden' })
      }

      const { title, slug, description, icon, color } = req.body
      const { data, error } = await supabase
        .from('courses')
        .update({ title, slug, description, icon, color })
        .eq('id', req.params.id)
        .select()

      if (error) throw error
      res.json(data[0])
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })

  // DELETE course
  app.delete('/api/courses/:id', async (req, res) => {
    try {
      if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden' })
      }

      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', req.params.id)

      if (error) throw error
      res.json({ ok: true })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })
}
