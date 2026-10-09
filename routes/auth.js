const express = require('express');
const bcrypt = require('bcryptjs');
const { getUsers } = require('../data/store');

const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) {
      return res.status(400).json({ error: 'username and password are required' });
    }
    const normalized = String(username).trim().toLowerCase();
    if (normalized.length < 3) return res.status(400).json({ error: 'username must be at least 3 characters' });
    if (String(password).length < 6) return res.status(400).json({ error: 'password must be at least 6 characters' });
    const users = getUsers();
    if (users.has(normalized)) return res.status(409).json({ error: 'Username already exists' });
    const passwordHash = await bcrypt.hash(String(password), 10);
    users.set(normalized, { username: normalized, passwordHash });
    res.status(201).json({ message: 'User registered successfully', username: normalized });
  } catch (err) { next(err); }
});

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) return res.status(400).json({ error: 'username and password are required' });
    const normalized = String(username).trim().toLowerCase();
    const user = getUsers().get(normalized);
    if (!user || !(await bcrypt.compare(String(password), user.passwordHash))) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    req.session.username = normalized;
    res.json({ message: 'Login successful', username: normalized });
  } catch (err) { next(err); }
});

router.post('/logout', (req, res, next) => {
  if (!req.session) return res.json({ message: 'Logged out' });
  req.session.destroy((err) => {
    if (err) return next(err);
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out successfully' });
  });
});

module.exports = router;