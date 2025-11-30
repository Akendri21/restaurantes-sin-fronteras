# Integration tests for RSF demo backend
# Run this script with PowerShell (requires server running on http://localhost:3000)
# Usage:
#  - To run with environment vars (recommended for CI):
#      $env:RSF_ADMIN_USER='DUEÑO'; $env:RSF_ADMIN_PASSWORD='DUEÑO123'; powershell -File .\scripts\integration_test.ps1
#  - Otherwise the script will prompt interactively for credentials or fall back to a demo default user.

param(
  [switch]$NonInteractive,
  [switch]$AllowDemoFallback,
  [string]$DemoUser = 'DUEÑO',
  [System.Security.SecureString]$DemoPassword
)

$apiBase = 'http://localhost:3000'
Write-Host "Testing RSF backend at $apiBase"

function Test-Login([System.Management.Automation.PSCredential]$Credential){
  $username = $Credential.UserName
  $password = $Credential.GetNetworkCredential().Password
  Write-Host "Logging in as $username ..."
  $body = @{ username = $username; password = $password }
  try{
    $ws = New-Object Microsoft.PowerShell.Commands.WebRequestSession
    $r = Invoke-RestMethod -Uri "$apiBase/api/auth/login" -Method Post -Body ($body | ConvertTo-Json) -ContentType 'application/json' -WebSession $ws -ErrorAction Stop
    Write-Host "Login OK"
    return @{ ok = $true; resp = $r; session = $ws }
  } catch {
    Write-Host "Login FAILED"; Write-Host $_.Exception.Message; return @{ ok = $false }
  }
}

function Test-Me($session){
  try{
    $r = Invoke-RestMethod -Uri "$apiBase/api/auth/me" -Method Get -WebSession $session -ErrorAction Stop
    Write-Host "Me returned: $($r.username)"; return $true
  } catch { Write-Host "Me check failed"; return $false }
}

function Test-Invoices($session){
  try{
    $r = Invoke-RestMethod -Uri "$apiBase/api/invoices" -Method Get -WebSession $session -ErrorAction Stop
    $count = if ($r -is [System.Collections.ICollection]) { $r.Count } else { ($r | Measure-Object).Count }
    Write-Host "Invoices: $count returned"; return $true
  } catch { Write-Host "Invoices check failed"; return $false }
}

Write-Host "Ensure server is running and accessible (http://localhost:3000)..."
$check = Invoke-WebRequest -Uri "$apiBase/api/ping" -Method Get -UseBasicParsing -ErrorAction SilentlyContinue
if(!$check -or $check.StatusCode -ne 200){ Write-Host "Server not available. Start with: cd server; npm start"; exit 1 }

# Credentials: prefer environment variables (RSF_ADMIN_USER and RSF_ADMIN_PASSWORD),
# otherwise prompt interactively (if available), else fall back to the demo default.
if ($env:RSF_ADMIN_USER -and $env:RSF_ADMIN_PASSWORD) {
  $securePwd = ConvertTo-SecureString $env:RSF_ADMIN_PASSWORD -AsPlainText -Force
  $cred = New-Object System.Management.Automation.PSCredential($env:RSF_ADMIN_USER, $securePwd)
} else {
  # If running interactively, prompt the user to enter credentials.
  if ($Host.Name -like '*ConsoleHost*' -and -not $NonInteractive) {
    Write-Host "No RSF_ADMIN_USER / RSF_ADMIN_PASSWORD env vars found: prompting for credentials (press Enter to reuse the demo defaults)"
    try {
      $userCred = Get-Credential -UserName 'DUEÑO' -Message 'Enter admin username/password (or cancel to use default)'
      if ($userCred) { $cred = $userCred }
    } catch {
      # If credential prompt cancelled or unavailable, fallback to defaults below
    }
  }
  if (-not $cred) {
    if ($NonInteractive -and -not $AllowDemoFallback) {
      Write-Host "No credentials provided and NonInteractive is set. Failing (set RSF_ADMIN_USER/RSF_ADMIN_PASSWORD or use -AllowDemoFallback to allow demo defaults).";
      exit 4
    }
    if ($AllowDemoFallback) {
      if (-not $DemoPassword) {
        if ($NonInteractive) {
          Write-Host "Demo fallback requested but no DemoPassword provided. Set -DemoPassword or use env var RSF_ADMIN_PASSWORD."; exit 6
        }
        Write-Host "Demo fallback requested; please enter demo password:";
        $DemoPassword = Read-Host -AsSecureString 'Demo Password'
      }
      $securePwd = $DemoPassword
      $adminUser = $DemoUser
      $cred = New-Object System.Management.Automation.PSCredential($adminUser, $securePwd)
      Write-Host "Using demo admin user: $adminUser (demo fallback enabled)"
    } else {
      Write-Host "No credentials provided; please set RSF_ADMIN_USER/RSF_ADMIN_PASSWORD or run interactively to provide credentials.";
      exit 5
    }
  }
}

$login = Test-Login -Credential $cred
if($login.ok){
  $ok = Test-Me -session $login.session
  $ok2 = Test-Invoices -session $login.session
  if($ok -and $ok2){ Write-Host "Integration test passed for admin login."; exit 0 } else { Write-Host "Integration test partial failure."; exit 2 }
}
else { Write-Host "Cannot continue tests without login."; exit 3 }
