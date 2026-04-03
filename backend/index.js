require('dotenv').config()
const express = require('express')
const cors = require('cors')
const auth = require('./middleware/auth')

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(auth)

// Routes
require('./routes/courses')(app)
require('./routes/modules')(app)
require('./routes/lessons')(app)
require('./routes/tasks')(app)
require('./routes/users')(app)
require('./routes/run')(app)
require('./routes/progress')(app)
require('./routes/groups')(app)

// Health check
app.get('/health', (req, res) => {
  res.json({ ok: true })
})

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' })
})

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
