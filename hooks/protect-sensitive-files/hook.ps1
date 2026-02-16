# protect-sensitive-files hook — blocks edits to .env files
# Event: PreToolUse | Matcher: Edit|Write
# This hook prevents Claude Code from modifying sensitive environment files
# like .env, .env.local, .env.production, etc.
#
# Claude Code invokes PreToolUse hooks before each tool call, piping a JSON
# object to stdin that contains the tool name and its input parameters.
# This script checks whether the target file matches a .env pattern and
# exits 2 to block the action, or exits 0 to allow it.

# Read the full JSON payload that Claude Code pipes to stdin
$StdinInput = [Console]::In.ReadToEnd()

# Parse the JSON to extract the tool input
$Parsed = $StdinInput | ConvertFrom-Json

# Get the file path from the tool input (Edit and Write both use file_path)
$FilePath = $Parsed.tool_input.file_path

# Check if the file path ends with a .env pattern (.env, .env.local, .env.production, etc.)
if ($FilePath -match '\.env($|\..+)') {
    # Write the reason to stderr — Claude Code shows this as feedback
    [Console]::Error.WriteLine("Blocked: editing '$FilePath' is not allowed. Files matching .env patterns are protected by the protect-sensitive-files hook.")
    exit 2
}

# Not a sensitive file — allow the tool call to proceed
exit 0
