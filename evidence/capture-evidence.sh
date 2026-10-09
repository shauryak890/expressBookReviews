#!/usr/bin/env bash
# Run with the API running in another terminal: bash evidence/capture-evidence.sh
set -euo pipefail
mkdir -p evidence/output
OUT="evidence/output"
BASE="${BOOK_API_URL:-http://localhost:5000}"
USER="student_$(date +%s)"
PASS="study12345"
ISBN="9780141036144"
COOKIE="$OUT/cookies.txt"

capture() {
  local name="$1"; shift
  {
    printf '$'
    printf ' %q' "$@"
    printf '\n\n'
    "$@"
    printf '\n'
  } > "$OUT/$name"
}

capture getallbooks curl -sS "$BASE/"
capture getbooksbyISBN curl -sS "$BASE/isbn/$ISBN"
capture getbooksbyauthor curl -sS "$BASE/author/Khaled%20Hosseini"
capture getbooksbytitle curl -sS "$BASE/title/Alchemist"
capture getbookreview curl -sS "$BASE/review/$ISBN"

capture register curl -sS -X POST "$BASE/register" -H 'Content-Type: application/json' -d "{\"username\":\"$USER\",\"password\":\"$PASS\"}"
curl -sS -c "$COOKIE" -X POST "$BASE/login" -H 'Content-Type: application/json' -d "{\"username\":\"$USER\",\"password\":\"$PASS\"}" > "$OUT/login-response.json"
{
  printf '$ curl -sS -c %q -X POST %q -H %q -d %q\n\n' "$COOKIE" "$BASE/login" 'Content-Type: application/json' "{\"username\":\"$USER\",\"password\":\"$PASS\"}"
  cat "$OUT/login-response.json"
  printf '\n'
} > "$OUT/login"

curl -sS -b "$COOKIE" -X PUT "$BASE/review/$ISBN" -H 'Content-Type: application/json' -d '{"review":"A thoughtful and memorable book."}' > "$OUT/reviewadded-response.json"
{
  printf '$ curl -sS -b %q -X PUT %q -H %q -d %q\n\n' "$COOKIE" "$BASE/review/$ISBN" 'Content-Type: application/json' '{"review":"A thoughtful and memorable book."}'
  cat "$OUT/reviewadded-response.json"
  printf '\n'
} > "$OUT/reviewadded"

{
  printf '$ curl -sS %q\n\n' "$BASE/review/$ISBN"
  curl -sS "$BASE/review/$ISBN"
  printf '\n'
} > "$OUT/getbookreview-after-add"

curl -sS -b "$COOKIE" -X DELETE "$BASE/review/$ISBN" > "$OUT/deletereview-response.json"
{
  printf '$ curl -sS -b %q -X DELETE %q\n\n' "$COOKIE" "$BASE/review/$ISBN"
  cat "$OUT/deletereview-response.json"
  printf '\n'
} > "$OUT/deletereview"

echo "Evidence files created in $OUT."
echo "Capture githubrepo separately after forking the required GitHub repository."
