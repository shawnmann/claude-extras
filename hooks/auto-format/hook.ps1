# auto-format hook — runs Prettier on files Claude edits
# Event: PostToolUse | Matcher: Edit|Write
# This hook automatically formats files after Claude Code writes or edits them,
# keeping code style consistent without Claude needing to think about formatting.
#
# Claude Code invokes PostToolUse hooks after each tool call, piping a JSON
# object to stdin that contains the tool name and its input parameters.
# This script checks whether the target file has a Prettier-supported extension
# and runs Prettier on it if so.

# Read the full JSON payload that Claude Code pipes to stdin
$StdinInput = [Console]::In.ReadToEnd()

# Parse the JSON to extract the tool input
$Parsed = $StdinInput | ConvertFrom-Json

# Get the file path from the tool input (Edit and Write both use file_path)
$FilePath = $Parsed.tool_input.file_path

if (-not $FilePath) {
    exit 0
}

# Check if the file has a Prettier-supported extension
$SupportedExtensions = @('.js', '.ts', '.jsx', '.tsx', '.css', '.scss', '.html', '.json', '.md', '.yaml', '.yml')
$Extension = [System.IO.Path]::GetExtension($FilePath)

if ($Extension -and $SupportedExtensions -contains $Extension) {
    try {
        $Output = npx prettier --write $FilePath 2>&1
        if ($LASTEXITCODE -eq 0) {
            [Console]::Error.WriteLine("Formatted $FilePath with Prettier.")
        }
    } catch {
        # Fail silently — formatting is nice-to-have, not critical
    }
}

exit 0
