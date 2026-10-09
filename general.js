// Assignment helper: fetch books and search by ISBN, author, or title with Axios.
// Start the API first (npm start). Run: node general.js
const axios = require('axios');

const BASE_URL = process.env.BOOK_API_URL || 'http://localhost:5000';

async function getAllBooks() {
  const response = await axios.get(`${BASE_URL}/`);
  return response.data;
}
async function getBookByISBN(isbn) {
  const response = await axios.get(`${BASE_URL}/isbn/${encodeURIComponent(isbn)}`);
  return response.data;
}
async function getBooksByAuthor(author) {
  const response = await axios.get(`${BASE_URL}/author/${encodeURIComponent(author)}`);
  return response.data;
}
async function getBooksByTitle(title) {
  const response = await axios.get(`${BASE_URL}/title/${encodeURIComponent(title)}`);
  return response.data;
}

async function main() {
  try {
    console.log('ALL BOOKS');
    console.dir(await getAllBooks(), { depth: null });
    console.log('\\nSEARCH BY ISBN');
    console.dir(await getBookByISBN('9780141036144'), { depth: null });
    console.log('\\nSEARCH BY AUTHOR');
    console.dir(await getBooksByAuthor('Khaled Hosseini'), { depth: null });
    console.log('\\nSEARCH BY TITLE');
    console.dir(await getBooksByTitle('Alchemist'), { depth: null });
  } catch (error) {
    console.error('Request failed:', error.response?.status, error.response?.data || error.message);
    process.exitCode = 1;
  }
}

if (require.main === module) main();

module.exports = { getAllBooks, getBookByISBN, getBooksByAuthor, getBooksByTitle };