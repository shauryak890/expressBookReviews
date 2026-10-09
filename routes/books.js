const express = require('express');
const { getBooks, findBookByISBN, searchByAuthor, searchByTitle } = require('../data/store');

const router = express.Router();

// Task 1/2: all books
router.get('/', (_req, res) => res.json(getBooks()));

// Search by ISBN
router.get('/isbn/:isbn', (req, res) => {
  const book = findBookByISBN(req.params.isbn);
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
});

// Search by author name (case-insensitive partial match)
router.get('/author/:author', (req, res) => {
  const results = searchByAuthor(req.params.author);
  if (!results.length) return res.status(404).json({ error: 'No books found for this author' });
  res.json(results);
});

// Search by title (case-insensitive partial match)
router.get('/title/:title', (req, res) => {
  const results = searchByTitle(req.params.title);
  if (!results.length) return res.status(404).json({ error: 'No books found for this title' });
  res.json(results);
});

// Reviews for a specific book
router.get('/review/:isbn', (req, res) => {
  const book = findBookByISBN(req.params.isbn);
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json({ isbn: book.isbn, title: book.title, reviews: book.reviews || {} });
});

module.exports = router;