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
        $dumpPath = "C:\Users\CM\.gemini\antigravity\brain\08f45910-0cac-482a-be12-388546b60d58\$($sub.name)_full_transcript.md"
        $sb = New-Object System.Text.StringBuilder
        $sb.AppendLine("# Raw Model Responses for $($sub.name) ($($sub.id))") | Out-Null
        $sb.AppendLine() | Out-Null
        
        $count = 0
        foreach ($line in $lines) {
            $obj = ConvertFrom-Json $line -ErrorAction SilentlyContinue
            if ($obj -and $obj.source -eq "MODEL" -and $obj.content) {
                $count++
                $sb.AppendLine("## MODEL RESPONSE $($count)") | Out-Null
                $sb.AppendLine("Type: $($obj.type)") | Out-Null
                $sb.AppendLine("Status: $($obj.status)") | Out-Null
                $sb.AppendLine() | Out-Null
                $sb.AppendLine($obj.content) | Out-Null
                $sb.AppendLine() | Out-Null
                $sb.AppendLine("---") | Out-Null
                $sb.AppendLine() | Out-Null
            }
        }
        $sb.ToString() | Out-File -FilePath $dumpPath -Encoding utf8
        Write-Host "Dumped $($count) responses for $($sub.name) to $dumpPath"
    } else {
        Write-Host "Path not found for $($sub.name)"
    }
}
