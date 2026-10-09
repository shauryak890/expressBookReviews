const test = require('node:test');
const assert = require('node:assert/strict');
const app = require('../index');
const http = require('http');

test('health endpoint responds with status ok', async (t) => {
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  t.after(() => server.close());
  const response = await fetch(`http://127.0.0.1:${server.address().port}/health`);
  assert.equal(response.status, 200);
  assert.equal((await response.json()).status, 'ok');
});

test('book listing and ISBN lookup work', async (t) => {
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  t.after(() => server.close());
  const base = `http://127.0.0.1:${server.address().port}`;
  const all = await fetch(`${base}/`);
  assert.equal(all.status, 200);
  const books = await all.json();
  assert.ok(Array.isArray(books) && books.length > 0);
  const one = await fetch(`${base}/isbn/9780141036144`);
  assert.equal(one.status, 200);
  assert.equal((await one.json()).isbn, '9780141036144');
});