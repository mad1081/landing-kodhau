const PISTON_URL = 'https://emkc.org/api/v2/piston/execute'

const LANGUAGE_VERSIONS = {
  javascript: '18.15.0',
  python: '3.10.0',
}

module.exports = function(app) {
  app.post('/api/run', async (req, res) => {
    try {
      const { language, files } = req.body
      const version = LANGUAGE_VERSIONS[language] ?? '*'
      const response = await fetch(PISTON_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language, version, files }),
      })
      const data = await response.json()
      res.status(response.status).json(data)
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })
}
