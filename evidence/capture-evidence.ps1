# Run in PowerShell while the API is running: .\evidence\capture-evidence.ps1
$ErrorActionPreference = "Stop"
$Base = if ($env:BOOK_API_URL) { $env:BOOK_API_URL } else { "http://localhost:5000" }
$Out = "evidence/output"
New-Item -ItemType Directory -Force -Path $Out | Out-Null
$User = "student_$([DateTimeOffset]::UtcNow.ToUnixTimeSeconds())"
$Pass = "study12345"
$Isbn = "9780141036144"
$Cookie = Join-Path $Out "cookies.txt"

function Save-Capture($Name, $CommandText, $Body) {
  @("$ $CommandText", "", $Body) | Set-Content -Encoding utf8 (Join-Path $Out $Name)
}

$all = curl.exe -sS "$Base/"
Save-Capture "getallbooks" "curl -sS $Base/" ($all -join "`n")
$isbn = curl.exe -sS "$Base/isbn/$Isbn"
Save-Capture "getbooksbyISBN" "curl -sS $Base/isbn/$Isbn" ($isbn -join "`n")
$author = curl.exe -sS "$Base/author/Khaled%20Hosseini"
Save-Capture "getbooksbyauthor" "curl -sS $Base/author/Khaled%20Hosseini" ($author -join "`n")
$title = curl.exe -sS "$Base/title/Alchemist"
Save-Capture "getbooksbytitle" "curl -sS $Base/title/Alchemist" ($title -join "`n")
$reviews = curl.exe -sS "$Base/review/$Isbn"
Save-Capture "getbookreview" "curl -sS $Base/review/$Isbn" ($reviews -join "`n")

$regBody = @{ username = $User; password = $Pass } | ConvertTo-Json -Compress
$reg = curl.exe -sS -X POST "$Base/register" -H "Content-Type: application/json" -d $regBody
Save-Capture "register" "curl -sS -X POST $Base/register -H Content-Type:application/json -d <registration-json>" ($reg -join "`n")

$login = curl.exe -sS -c $Cookie -X POST "$Base/login" -H "Content-Type: application/json" -d $regBody
Save-Capture "login" "curl -sS -c cookies.txt -X POST $Base/login -H Content-Type:application/json -d <login-json>" ($login -join "`n")

$reviewBody = '{"review":"A thoughtful and memorable book."}'
$added = curl.exe -sS -b $Cookie -X PUT "$Base/review/$Isbn" -H "Content-Type: application/json" -d $reviewBody
Save-Capture "reviewadded" "curl -sS -b cookies.txt -X PUT $Base/review/$Isbn -d <review-json>" ($added -join "`n")

$deleted = curl.exe -sS -b $Cookie -X DELETE "$Base/review/$Isbn"
Save-Capture "deletereview" "curl -sS -b cookies.txt -X DELETE $Base/review/$Isbn" ($deleted -join "`n")
Write-Host "Evidence files created in $Out. Capture githubrepo separately from your real GitHub fork."
