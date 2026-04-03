const supabase = require('../lib/supabase')

module.exports = function(app) {
  // GET groups — teachers see their groups, admins see all, students see their group
  app.get('/api/groups', async (req, res) => {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' })
    try {
      let query = supabase.from('groups').select('id, name, teacher_id')

      if (req.user.role === 'student') {
        // Find groups this student belongs to
        const { data: memberships } = await supabase
          .from('group_members')
          .select('group_id')
          .eq('user_id', req.user.id)
        const groupIds = (memberships || []).map(m => m.group_id)
        if (groupIds.length === 0) return res.json([])
        query = query.in('id', groupIds)
      } else if (req.user.role === 'teacher') {
        query = query.eq('teacher_id', req.user.id)
      }
      // admin sees all

      const { data, error } = await query.order('created_at')
      if (error) throw error
      res.json(data || [])
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })

  // GET group members
  app.get('/api/groups/:id/members', async (req, res) => {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' })
    try {
      const { data, error } = await supabase
        .from('group_members')
        .select('id, user_id, joined_at')
        .eq('group_id', req.params.id)
      if (error) throw error

      // Get emails from auth.users
      const userIds = (data || []).map(m => m.user_id)
      const { data: users } = await supabase
        .from('auth.users')
        .select('id, email')
        .in('id', userIds)

      // Join
      const emailMap = Object.fromEntries((users || []).map(u => [u.id, u.email]))
      const members = (data || []).map(m => ({ ...m, email: emailMap[m.user_id] ?? m.user_id }))

      res.json(members)
    } catch (e) {
      // Fallback without emails
      const { data } = await supabase.from('group_members').select('*').eq('group_id', req.params.id)
      res.json(data || [])
    }
  })

  // POST create group (teacher/admin)
  app.post('/api/groups', async (req, res) => {
    if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'teacher')) {
      return res.status(403).json({ error: 'Forbidden' })
    }
    try {
      const { name } = req.body
      const { data, error } = await supabase
        .from('groups')
        .insert([{ name, teacher_id: req.user.id }])
        .select()
      if (error) throw error
      res.status(201).json(data[0])
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })

  // POST add student to group by email (teacher/admin)
  app.post('/api/groups/:id/members', async (req, res) => {
    if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'teacher')) {
      return res.status(403).json({ error: 'Forbidden' })
    }
    try {
      const { email } = req.body
      // Find user by email
      const { data: users, error: userErr } = await supabase
        .from('auth.users')
        .select('id, email')
        .eq('email', email)
        .limit(1)

      if (userErr || !users?.length) {
        return res.status(404).json({ error: 'User not found' })
      }

      const userId = users[0].id
      const { data, error } = await supabase
        .from('group_members')
        .upsert({ group_id: req.params.id, user_id: userId }, { onConflict: 'group_id,user_id' })
        .select()
      if (error) throw error
      res.status(201).json({ ok: true, user_id: userId, email })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })

  // DELETE remove member
  app.delete('/api/groups/:id/members/:userId', async (req, res) => {
    if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'teacher')) {
      return res.status(403).json({ error: 'Forbidden' })
    }
    try {
      const { error } = await supabase
        .from('group_members')
        .delete()
        .eq('group_id', req.params.id)
        .eq('user_id', req.params.userId)
      if (error) throw error
      res.json({ ok: true })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })

  // DELETE group (admin only)
  app.delete('/api/groups/:id', async (req, res) => {
    if (!req.user || req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' })
    try {
      const { error } = await supabase.from('groups').delete().eq('id', req.params.id)
      if (error) throw error
      res.json({ ok: true })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })
}
