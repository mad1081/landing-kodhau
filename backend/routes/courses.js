const supabase = require('../lib/supabase')

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

  // GET full course plan by slug (nested modules → lessons → tasks)
  app.get('/api/courses/slug/:slug/plan', async (req, res) => {
    try {
      const { data: course, error: courseErr } = await supabase
        .from('courses')
        .select('id, slug, title, description, icon, color')
        .eq('slug', req.params.slug)
        .single()

      if (courseErr || !course) {
        return res.status(404).json({ error: courseErr?.message ?? 'Course not found' })
      }

      const { data: modules, error: modulesErr } = await supabase
        .from('modules')
        .select(`
          id, title, order_index,
          lessons (
            id, title, order_index,
            tasks (id, title, order_index)
          )
        `)
        .eq('course_id', course.id)
        .order('order_index')

      if (modulesErr) return res.status(500).json({ error: modulesErr.message })

      res.json({ course, modules: modules || [] })
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
