const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'books.json');
let books = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const users = new Map();

function getBooks() { return books; }
function findBookByISBN(isbn) {
  return books.find((book) => String(book.isbn).toLowerCase() === String(isbn).toLowerCase());
}
function searchByAuthor(author) {
  const q = String(author).toLowerCase();
  return books.filter((book) => String(book.author || '').toLowerCase().includes(q));
}
function searchByTitle(title) {
  const q = String(title).toLowerCase();
  return books.filter((book) => String(book.title || '').toLowerCase().includes(q));
}
function getUsers() { return users; }

module.exports = { getBooks, findBookByISBN, searchByAuthor, searchByTitle, getUsers };