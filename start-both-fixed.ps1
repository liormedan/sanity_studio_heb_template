Write-Host "מתחיל את הסטודיו והאתר..." -ForegroundColor Green

# קבלת הנתיב הנוכחי
$currentPath = Get-Location
Write-Host "נתיב נוכחי: $currentPath" -ForegroundColor Gray

# התחלת הסטודיו
Write-Host "מתחיל סטודיו Sanity..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$currentPath\studio'; Write-Host 'מתחיל סטודיו...' -ForegroundColor Green; npm run dev"

# המתנה
Start-Sleep -Seconds 5

# התחלת האתר
Write-Host "מתחיל אתר Next.js..." -ForegroundColor Yellow  
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$currentPath\website'; Write-Host 'מתחיל אתר...' -ForegroundColor Green; npm run dev"

Write-Host ""
Write-Host "שני הפרויקטים מתחילים..." -ForegroundColor Green
Write-Host "סטודיו Sanity: http://localhost:3333" -ForegroundColor Cyan
Write-Host "אתר Next.js: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "לחץ Enter כדי לסגור..." -ForegroundColor Gray
Read-Host