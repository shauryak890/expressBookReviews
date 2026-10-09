 HEAD
# Express Book Review API

A Node.js/Express REST API for a book catalogue, ISBN/author/title searches, user registration/login, and review management. The assignment helper `general.js` uses Axios with async/await.

> **Important dataset note:** `data/books.json` contains sample books so the project can run immediately. The assignment grader may supply a specific JSON file. Replace `data/books.json` with the provided dataset, preserving its field names and structure. The loader expects an array of book objects with at least `isbn`, `title`, and `author`; it adds/uses a `reviews` object.

## Requirements

- Node.js 18+
- npm
- Git and a GitHub account

## Install and run

```bash
npm install
npm start
```

Server defaults to `http://localhost:5000`. Optional environment variables: `PORT`, `SESSION_SECRET`.

Health check:

```bash
curl http://localhost:5000/health
```

## Routes

| Method | Route | Purpose |
|---|---|---|
| GET | `/` | List all books |
| GET | `/isbn/:isbn` | Find one book by ISBN |
| GET | `/author/:author` | Search author (case-insensitive partial match) |
| GET | `/title/:title` | Search title (case-insensitive partial match) |
| GET | `/review/:isbn` | Get reviews for a book |
| POST | `/register` | Register `{ "username": "...", "password": "..." }` |
| POST | `/login` | Login and receive a session cookie |
| POST | `/logout` | End current session |
| PUT | `/review/:isbn` | Add/update signed-in user's review `{ "review": "..." }` |
| DELETE | `/review/:isbn` | Delete signed-in user's review |

Reviews are keyed by username. Only a logged-in user can add, update, or delete their own review. User passwords are stored as bcrypt hashes. This learning project stores users and reviews in memory, so they reset when the server restarts; use a database for production.

## cURL examples

Use a second terminal while the server is running. These examples are for Git Bash on Windows, macOS, or Linux.

```bash
# Get all books
curl -s http://localhost:5000/

# Search by ISBN
curl -s http://localhost:5000/isbn/9780141036144

# Search by author
curl -s http://localhost:5000/author/Khaled%20Hosseini

# Search by title
curl -s http://localhost:5000/title/Alchemist

# Get a book's reviews
curl -s http://localhost:5000/review/9780141036144

# Register a user (choose a unique username)
curl -i -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{"username":"student01","password":"study12345"}'

# Login and save the session cookie
curl -i -c cookies.txt -X POST http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"student01","password":"study12345"}'

# Add or update a review using the saved session cookie
curl -i -b cookies.txt -X PUT http://localhost:5000/review/9780141036144 \
  -H "Content-Type: application/json" \
  -d '{"review":"A thoughtful and memorable book."}'

# Read the review
curl -s http://localhost:5000/review/9780141036144

# Delete your review
curl -i -b cookies.txt -X DELETE http://localhost:5000/review/9780141036144
```

## Generate the assignment evidence files

The `evidence/` folder includes `capture-evidence.sh` and `capture-evidence.ps1`. Start the server first, then run the script in another terminal. The scripts save each actual cURL command and response to files named for the assignment tasks. Register/login/review steps use a fresh timestamped username and cookie jar.

GitHub fork evidence (`githubrepo`) is intentionally not fabricated. Follow the GitHub fork steps below and then capture the real repository response.

## Important: fork the required starter repository

Task 1 specifically asks for proof that your repository is forked from `ibm-developer-skills-network/expressBookReview`. A new repository you create from scratch does **not** satisfy that requirement.

1. Sign in to GitHub.
2. Open https://github.com/ibm-developer-skills-network/expressBookReview
3. Click **Fork** (upper-right area).
4. Choose your personal GitHub account, e.g. `shauryak890`, and create the fork. Keep the repository name `expressBookReview` unless GitHub requires otherwise.
5. Open your fork and confirm its page says it was forked from `ibm-developer-skills-network/expressBookReview`.
6. Clone your fork locally, or update the remote in your working copy to point to it. To clone:
   ```bash
   git clone https://github.com/YOUR-USERNAME/expressBookReview.git
   cd expressBookReview
   ```
7. Copy this project's implementation files into that cloned fork (preserve the starter repository's provided JSON file), then commit and push:
   ```bash
   git add .
   git commit -m "Complete Express Book Review API"
   git push origin main
   ```
   If the default branch is `master`, use `git push origin master` instead.
8. The fork URL should look like `https://github.com/YOUR-USERNAME/expressBookReview`.

If GitHub says you cannot fork or the repository is unavailable, check that you're signed in and ask your course platform/instructor whether the starter repository is accessible to your account.

## Task 11 URL

After pushing `general.js`, submit:
`https://github.com/YOUR-USERNAME/expressBookReview/blob/main/general.js`

Replace `YOUR-USERNAME` with your actual username and change `main` to `master` if that is the fork's default branch.

## Notes about evidence

The capture scripts save real command/response pairs from your running API. Review the output files before uploading them to the course platform. Do not submit placeholder output as if it came from your GitHub repository. `githubrepo` should be captured from your real fork's GitHub API response.

# coding-project-template
fa6bb07442d70a4ea72d26c6731d8ff57ed4f9d6
