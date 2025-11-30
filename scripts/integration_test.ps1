# Integration tests for RSF demo backend
# Run this script with PowerShell (requires server running on http://localhost:3000)

$apiBase = 'http://localhost:3000'
Write-Host "Testing RSF backend at $apiBase"

function Test-Login([string]$username, [string]$password){
  Write-Host "Logging in as $username ..."
  $body = @{ username = $username; password = $password } | ConvertTo-Json
  $r = Invoke-WebRequest -Uri "$apiBase/api/auth/login" -Body $body -Method Post -ContentType 'application/json' -UseBasicParsing -SessionVariable sv -ErrorAction SilentlyContinue
  if($r -and $r.StatusCode -eq 200){ Write-Host "Login OK"; return @{ ok = $true; resp = ($r.Content | ConvertFrom-Json); session = $sv }
  } else { Write-Host "Login FAILED"; Write-Host $r.Content; return @{ ok = $false } }
}

function Test-Me($session){
  $r = Invoke-WebRequest -Uri "$apiBase/api/auth/me" -Method Get -WebSession $session -UseBasicParsing -ErrorAction SilentlyContinue
  if($r -and $r.StatusCode -eq 200){ Write-Host "Me returned: $(($r.Content | ConvertFrom-Json).username)"; return $true } else { Write-Host "Me check failed"; return $false }
}

function Test-Invoices($session){
  $r = Invoke-WebRequest -Uri "$apiBase/api/invoices" -Method Get -WebSession $session -UseBasicParsing -ErrorAction SilentlyContinue
  if($r -and $r.StatusCode -eq 200){ Write-Host "Invoices: $(($r.Content | ConvertFrom-Json).Count) returned"; return $true } else { Write-Host "Invoices check failed"; return $false }
}

Write-Host "Ensure server is running and accessible (http://localhost:3000)..."
$check = Invoke-WebRequest -Uri "$apiBase/api/ping" -Method Get -UseBasicParsing -ErrorAction SilentlyContinue
if(!$check -or $check.StatusCode -ne 200){ Write-Host "Server not available. Start with: cd server; npm start"; exit 1 }

$login = Test-Login -username 'DUEÑO' -password 'DUEÑO123'
if($login.ok){
  $ok = Test-Me -session $login.session
  $ok2 = Test-Invoices -session $login.session
  if($ok -and $ok2){ Write-Host "Integration test passed for admin login." } else { Write-Host "Integration test partial failure." }
}
else { Write-Host "Cannot continue tests without login." }
