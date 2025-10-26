# איך להעלות ל-Vercel - מדריך פשוט

## מה אתה צריך:
1. חשבון ב-Vercel (חינם)
2. חשבון GitHub (חינם)

## שלב 1: העלה לGitHub

### A. צור repository חדש ב-GitHub
1. לך ל-https://github.com
2. לחץ "New repository"
3. קרא לו `my-hebrew-website`
4. לחץ "Create repository"

### B. העלה את הקבצים
```bash
# בתיקייה הראשית
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/USERNAME/my-hebrew-website.git
git push -u origin main
```

## שלב 2: חבר ל-Vercel

### A. העלאת הסטודיו
1. לך ל-https://vercel.com
2. התחבר עם GitHub
3. לחץ "New Project"
4. בחר את הrepository שיצרת
5. **חשוב**: בחר את התיקייה `studio`
6. הוסף משתני סביבה:
   - `SANITY_STUDIO_PROJECT_ID` = `7kzkwqzg`
   - `SANITY_STUDIO_DATASET` = `production`
7. לחץ "Deploy"

### B. העלאת האתר
1. לחץ "New Project" שוב
2. בחר את אותו repository
3. **חשוב**: בחר את התיקייה `website`
4. לחץ "Deploy"

## שלב 3: תוצאה

תקבל 2 כתובות:
- **סטודיו**: `https://my-studio-abc123.vercel.app`
- **אתר**: `https://my-website-def456.vercel.app`

## שלב 4: בדיקה

1. פתח את הסטודיו → צור תוכן
2. פתח את האתר → ראה את התוכן

---

## אם יש בעיות:

### הסטודיו לא עובד?
- בדוק שהמשתני סביבה נכונים
- וודא שבחרת את התיקייה `studio`

### האתר לא מציג תוכן?
- וודא שיש תוכן בסטודיו
- בדוק שהפוסטים פורסמו (יש תאריך)

### שגיאות build?
- בדוק את הlogs ב-Vercel
- וודא שהפרויקט עובד מקומית

---

**זה הכל!** המערכת שלך תהיה זמינה באינטרנט 🎉