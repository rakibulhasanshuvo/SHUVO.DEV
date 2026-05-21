$subagents = @(
    @{ id = "e2c9677b-c388-4554-96ef-6b88b202f3e4"; name = "template_library" },
    @{ id = "ab85f339-477e-49dd-bf6d-055c2b28e6d2"; name = "case_study" },
    @{ id = "f39f3e37-c335-478c-bfb4-cc679d41c75b"; name = "about_tech_stack" },
    @{ id = "d76f8554-3186-4dd0-b6cf-f25ec4621db3"; name = "contact_lead_gen" }
)

foreach ($sub in $subagents) {
    $path = "C:\Users\CM\.gemini\antigravity\brain\$($sub.id)\.system_generated\logs\transcript.jsonl"
    if (Test-Path $path) {
        $lines = Get-Content $path
        Write-Host "--- Tool calls for $($sub.name) ($($sub.id)) ---"
        foreach ($line in $lines) {
            $obj = ConvertFrom-Json $line -ErrorAction SilentlyContinue
            if ($obj -and $obj.tool_calls) {
                foreach ($tc in $obj.tool_calls) {
                    Write-Host "  Tool: $($tc.name)"
                    if ($tc.arguments) {
                        $args = $tc.arguments | Out-String -Width 120
                        Write-Host "    Args: $($args.Trim())"
                    }
                }
            }
        }
    }
}
