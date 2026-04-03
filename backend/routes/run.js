const JUDGE0_URL = 'https://judge0-ce.p.rapidapi.com/submissions'

// Judge0 language IDs
const LANGUAGE_IDS = {
  javascript: 63,  // Node.js 12.14.0
  python: 71,      // Python 3.8.1
}

module.exports = function(app) {
  app.post('/api/run', async (req, res) => {
    const apiKey = process.env.RAPIDAPI_KEY
    if (!apiKey) return res.status(500).json({ error: 'RAPIDAPI_KEY not set on server' })

    const { language, files } = req.body
    const source_code = files?.[0]?.content
    const language_id = LANGUAGE_IDS[language]

    if (!language_id) return res.status(400).json({ error: `Unsupported language: ${language}` })
    if (!source_code) return res.status(400).json({ error: 'No source code provided' })

    try {
      // Submit and wait for result
      const response = await fetch(`${JUDGE0_URL}?base64_encoded=false&wait=true`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        },
        body: JSON.stringify({ source_code, language_id, stdin: '' }),
      })

      const data = await response.json()
      if (!response.ok) return res.status(response.status).json({ error: data.message ?? 'Judge0 error' })

      // Normalize to Piston-like shape so frontend doesn't need changes
      res.json({
        run: {
          stdout: data.stdout ?? '',
          stderr: data.stderr ?? data.compile_output ?? '',
        }
      })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })
}
