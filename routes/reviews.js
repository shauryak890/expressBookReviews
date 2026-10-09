const express = require('express');
const { findBookByISBN } = require('../data/store');
const { requireLogin } = require('../middleware/auth');

const router = express.Router();

// Create or replace the signed-in user's review for a book.
router.put('/review/:isbn', requireLogin, (req, res) => {
  const book = findBookByISBN(req.params.isbn);
  if (!book) return res.status(404).json({ error: 'Book not found' });
  const review = String((req.body || {}).review || '').trim();
  if (!review) return res.status(400).json({ error: 'review is required' });
  if (!book.reviews) book.reviews = {};
  book.reviews[req.session.username] = review;
  res.json({ message: 'Review added/updated successfully', isbn: book.isbn, username: req.session.username, review, reviews: book.reviews });
});

// Delete the signed-in user's own review.
router.delete('/review/:isbn', requireLogin, (req, res) => {
  const book = findBookByISBN(req.params.isbn);
  if (!book) return res.status(404).json({ error: 'Book not found' });
  if (!book.reviews || !Object.prototype.hasOwnProperty.call(book.reviews, req.session.username)) {
    return res.status(404).json({ error: 'No review found for this user and book' });
  }
  delete book.reviews[req.session.username];
  res.json({ message: 'Review deleted successfully', isbn: book.isbn, reviews: book.reviews });
});

module.exports = router;