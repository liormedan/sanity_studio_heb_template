Write-Host "מתחיל את הסטודיو והאתר..." -ForegroundColor Green

# התחלת הסטודיו בחלון נפרד
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\studio'; npm run dev" -WindowStyle Normal

# המתנה קצרה
Start-Sleep -Seconds 3

# התחלת האתר בחלון נפרד  
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\website'; npm run dev" -WindowStyle Normal

Write-Host ""
Write-Host "שני הפרויקטים מתחילים..." -ForegroundColor Yellow
Write-Host "סטודיו Sanity: http://localhost:3333" -ForegroundColor Cyan
Write-Host "אתר Next.js: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "לחץ Enter כדי לסגור..." -ForegroundColor Gray
Read-Host