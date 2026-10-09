const express = require('express');
const session = require('express-session');
const path = require('path');
const booksRouter = require('./routes/books');
const authRouter = require('./routes/auth');
const reviewsRouter = require('./routes/reviews');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'development-only-change-this-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: 'lax', secure: false, maxAge: 60 * 60 * 1000 }
}));

app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'Express Book Review API' }));
app.use('/', booksRouter);
app.use('/', authRouter);
app.use('/', reviewsRouter);

app.use((req, res) => res.status(404).json({ error: 'Route not found', path: req.originalUrl }));
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

if (require.main === module) {
  app.listen(PORT, () => console.log(`Book Review API listening on http://localhost:${PORT}`));
}

module.exports = app;