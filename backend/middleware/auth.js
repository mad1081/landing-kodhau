// JWT verification middleware
module.exports = function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    req.user = null
    return next()
  }

  try {
    // Decode JWT (basic, without verification for now)
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
    req.user = {
      id: payload.sub,
      email: payload.email,
      role: payload.user_metadata?.role || 'student',
    }
  } catch (e) {
    req.user = null
  }

  next()
}
