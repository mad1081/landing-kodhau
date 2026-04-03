const supabase = require('../lib/supabase')

module.exports = function(app) {
  // GET current user profile (from JWT)
  app.get('/api/profile', async (req, res) => {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' })
    res.json({ id: req.user.id, email: req.user.email, role: req.user.role })
  })

  // GET all users (admin only) — optionally filter by ?email=
  app.get('/api/users', async (req, res) => {
    if (!req.user || req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' })
    try {
      const { data, error } = await supabase.auth.admin.listUsers()
      if (error) throw error

      let users = (data.users || []).map(u => ({
        id: u.id,
        email: u.email,
        role: u.user_metadata?.role || 'student',
        created_at: u.created_at,
      }))

      if (req.query.email) {
        const q = req.query.email.toLowerCase()
        users = users.filter(u => u.email?.toLowerCase().includes(q))
      }

      res.json(users)
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })

  // PUT update user role (admin only)
  app.put('/api/users/:id', async (req, res) => {
    if (!req.user || req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' })
    try {
      const { role } = req.body
      const { data, error } = await supabase.auth.admin.updateUserById(req.params.id, {
        user_metadata: { role },
      })
      if (error) throw error
      res.json({ id: data.user.id, email: data.user.email, role })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })
}
