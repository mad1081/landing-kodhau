const GLOT_URL = 'https://glot.io/api/run'

const GLOT_LANGUAGES = {
  javascript: 'javascript',
  python: 'python',
}

module.exports = function(app) {
  app.post('/api/run', async (req, res) => {
    const { language, files } = req.body
    const source_code = files?.[0]?.content
    const glotLang = GLOT_LANGUAGES[language]

    if (!glotLang) return res.status(400).json({ error: `Unsupported language: ${language}` })
    if (!source_code) return res.status(400).json({ error: 'No source code provided' })

    try {
      const response = await fetch(`${GLOT_URL}/${glotLang}/latest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          files: [{ name: language === 'python' ? 'main.py' : 'main.js', content: source_code }]
        }),
      })

      const data = await response.json()
      if (!response.ok) return res.status(response.status).json({ error: data.message ?? 'Glot error' })

      res.json({
        run: {
          stdout: data.stdout ?? '',
          stderr: data.stderr ?? data.error ?? '',
        }
      })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })
}
