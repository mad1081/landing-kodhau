module.exports = function(app) {
  app.post('/api/run', async (req, res) => {
    try {
      const response = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      })
      const data = await response.json()
      res.status(response.status).json(data)
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })
}
