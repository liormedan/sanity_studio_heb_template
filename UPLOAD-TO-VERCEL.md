# העלאה ל-Vercel - מדריך מהיר

## שלב 1: הכנה
```bash
# וודא שהכל עובד מקומית
npm run build

# אם יש שגיאות - תקן אותן קודם
```

## שלב 2: GitHub
1. צור repository חדש ב-GitHub
2. העלה את הקבצים:
```bash
git init
git add .
git commit -m "Hebrew website with Sanity CMS"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main
```

## שלב 3: Vercel - סטודיו
1. לך ל-https://vercel.com → "New Project"
2. בחר את הrepository שיצרת
3. **חשוב**: בחר "studio" בתור Root Directory
4. הוסף Environment Variables:
   - `SANITY_STUDIO_PROJECT_ID` = `7kzkwqzg`
   - `SANITY_STUDIO_DATASET` = `production`
5. Deploy!

## שלב 4: Vercel - אתר
1. "New Project" שוב
2. אותו repository
3. **חשוב**: בחר "website" בתור Root Directory  
4. Deploy!

## תוצאה:
- **סטודיו**: https://your-studio.vercel.app
- **אתר**: https://your-website.vercel.app

---

## בדיקה מהירה:
1. פתח סטודיו → צור פוסט
2. פתח אתר → ראה את הפוסט

**זה הכל!** 🚀