@echo off
echo מתחיל את הסטודיו והאתר...

REM פתיחת חלון חדש לסטודיו
start "Sanity Studio" cmd /k "cd /d %~dp0studio && npm run dev"

REM המתנה של 3 שניות
timeout /t 3 /nobreak >nul

REM פתיחת חלון חדש לאתר
start "Next.js Website" cmd /k "cd /d %~dp0website && npm run dev"

echo שני הפרויקטים מתחילים...
echo סטודיו: http://localhost:3333
echo אתר: http://localhost:3000
pause