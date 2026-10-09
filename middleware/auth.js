function requireLogin(req, res, next) {
  if (!req.session || !req.session.username) {
    return res.status(401).json({ error: 'Please log in to manage reviews.' });
  }
  next();
}
module.exports = { requireLogin };