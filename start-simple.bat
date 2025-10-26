@echo off
echo מתחיל את המערכת...

echo מתחיל סטודיו Sanity...
start "Sanity Studio - localhost:3333" cmd /k "cd studio && npm run dev"

echo ממתין 5 שניות...
timeout /t 5 /nobreak >nul

echo מתחיל אתר Next.js...
start "Next.js Website - localhost:3000" cmd /k "cd website && npm run dev"

echo.
echo המערכת מתחילה!
echo.
echo סטודיו ניהול: http://localhost:3333
echo אתר ציבורי: http://localhost:3000
echo.
pause