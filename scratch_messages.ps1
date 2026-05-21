$parentTranscript = "C:\Users\CM\.gemini\antigravity\brain\08f45910-0cac-482a-be12-388546b60d58\.system_generated\logs\transcript.jsonl"
$subagents = @(
    @{ id = "e2c9677b-c388-4554-96ef-6b88b202f3e4"; name = "template_library" },
    @{ id = "ab85f339-477e-49dd-bf6d-055c2b28e6d2"; name = "case_study" },
    @{ id = "f39f3e37-c335-478c-bfb4-cc679d41c75b"; name = "about_tech_stack" },
    @{ id = "d76f8554-3186-4dd0-b6cf-f25ec4621db3"; name = "contact_lead_gen" }
)

if (Test-Path $parentTranscript) {
    $lines = Get-Content $parentTranscript
    foreach ($sub in $subagents) {
        Write-Host "Searching messages for $($sub.name) ($($sub.id))..."
        $count = 0
        foreach ($line in $lines) {
            if ($line -like "*$($sub.id)*") {
                $obj = ConvertFrom-Json $line -ErrorAction SilentlyContinue
                if ($obj) {
                    $count++
                    # Let's inspect the object fields
                    Write-Host "  Match $($count) - Type: $($obj.type) Source: $($obj.source) Status: $($obj.status)"
                    if ($obj.content -and $obj.content.Length -gt 100) {
                        $dest = "C:\Users\CM\.gemini\antigravity\brain\08f45910-0cac-482a-be12-388546b60d58\$($sub.name)_received_msg_$($count).md"
                        $obj.content | Out-File -FilePath $dest -Encoding utf8
                        Write-Host "    Saved content to $dest"
                    }
                }
            }
        }
    }
} else {
    Write-Host "Parent transcript not found"
}
