# desktop-notification hook — shows a Windows toast when Claude needs input
# Event: Notification | Matcher: .*
# This hook fires whenever Claude Code sends a notification (e.g., when it
# finishes a task and is waiting for input). It pops a Windows balloon-tip
# toast so you notice even if the terminal is in the background.
#
# Claude Code invokes Notification hooks with a JSON object on stdin that
# contains a message field describing what happened.

# Read the full JSON payload that Claude Code pipes to stdin
$StdinInput = [Console]::In.ReadToEnd()

# Parse the JSON to extract the notification message
$Parsed = $StdinInput | ConvertFrom-Json
$Message = $Parsed.message

if (-not $Message) {
    $Message = "Claude Code needs your attention."
}

# Show a Windows balloon-tip notification using .NET Windows Forms
Add-Type -AssemblyName System.Windows.Forms

$Icon = New-Object System.Windows.Forms.NotifyIcon
$Icon.Icon = [System.Drawing.SystemIcons]::Information
$Icon.Visible = $true

$Icon.ShowBalloonTip(5000, "Claude Code", $Message, [System.Windows.Forms.ToolTipIcon]::Info)

# Brief pause so the toast renders before the process exits
Start-Sleep -Milliseconds 500

$Icon.Dispose()

exit 0
