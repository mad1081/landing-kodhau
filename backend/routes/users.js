const supabase = require('../lib/supabase')

module.exports = function(app) {
  // GET current user profile
  app.get('/api/profile', async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' })
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', req.user.id)
        .single()

      if (error) throw error
      res.json(data)
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })

  // GET all users (admin only)
  app.get('/api/users', async (req, res) => {
    try {
      if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden' })
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at')

      if (error) throw error
      res.json(data || [])
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })

  // GET user by id (admin only)
  app.get('/api/users/:id', async (req, res) => {
    try {
      if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden' })
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', req.params.id)
        .single()

      if (error) throw error
      res.json(data)
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })

  // PUT update user role (admin only)
  app.put('/api/users/:id', async (req, res) => {
    try {
      if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden' })
      }

      const { role } = req.body
      const { data, error } = await supabase
        .from('profiles')
        .update({ role })
        .eq('id', req.params.id)
        .select()

      if (error) throw error
      res.json(data[0])
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })
}
