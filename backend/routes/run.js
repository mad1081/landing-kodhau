const WANDBOX_URL = 'https://wandbox.org/api/compile.json'

const WANDBOX_COMPILERS = {
  javascript: 'nodejs-20.17.0',
  python: 'cpython-3.12.7',
}

module.exports = function(app) {
  app.post('/api/run', async (req, res) => {
    const { language, files } = req.body
    const code = files?.[0]?.content
    const compiler = WANDBOX_COMPILERS[language]

    if (!compiler) return res.status(400).json({ error: `Unsupported language: ${language}` })
    if (!code) return res.status(400).json({ error: 'No source code provided' })

    try {
      const response = await fetch(WANDBOX_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, compiler }),
      })

      const data = await response.json()
      if (!response.ok) return res.status(response.status).json({ error: data.error ?? 'Wandbox error' })

      res.json({
        run: {
          stdout: data.program_output ?? '',
          stderr: data.compiler_error ?? data.program_error ?? '',
        }
      })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })
}
