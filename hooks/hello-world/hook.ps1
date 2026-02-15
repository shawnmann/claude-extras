# hello-world hook — logs the JSON input it receives from Claude Code
# Event: PreToolUse | Matcher: .* (all tools)
# This hook does not block anything — it just logs for learning purposes.
#
# Claude Code invokes PreToolUse hooks before each tool call, piping a JSON
# object to stdin that contains session info, the tool name, and its input
# parameters. This script captures that JSON and appends it to a log file
# so you can inspect exactly what Claude Code sends to hooks.
#
# Log location: %TEMP%\claude-hook-hello-world.log

# Read the full JSON payload that Claude Code pipes to stdin
$StdinInput = [Console]::In.ReadToEnd()

# Write to a log file in the user's temp directory
$LogFile = "$env:TEMP\claude-hook-hello-world.log"

# Add a timestamp header to separate each invocation in the log
$Timestamp = Get-Date -Format "o"
$Header = "--- $Timestamp ---"

Add-Content -Path $LogFile -Value $Header

# Pretty-print the JSON if possible, otherwise log it raw
try {
    $Formatted = $StdinInput | ConvertFrom-Json | ConvertTo-Json -Depth 10
    Add-Content -Path $LogFile -Value $Formatted
} catch {
    Add-Content -Path $LogFile -Value $StdinInput
}

Add-Content -Path $LogFile -Value ""

# Exit 0 so the hook never blocks tool execution
exit 0
