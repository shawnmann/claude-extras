# hello-world hook — logs the JSON input it receives from Claude Code
# Event: PreToolUse | Matcher: .* (all tools)
# This hook does not block anything — it just logs for learning purposes.

$StdinInput = [Console]::In.ReadToEnd()

$LogFile = "$env:TEMP\claude-hook-hello-world.log"

$Timestamp = Get-Date -Format "o"
$Header = "--- $Timestamp ---"

Add-Content -Path $LogFile -Value $Header

try {
    $Formatted = $StdinInput | ConvertFrom-Json | ConvertTo-Json -Depth 10
    Add-Content -Path $LogFile -Value $Formatted
} catch {
    Add-Content -Path $LogFile -Value $StdinInput
}

Add-Content -Path $LogFile -Value ""

exit 0
