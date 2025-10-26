# ✅ מוכן להעלאה ל-Vercel!

## מה יש לך עכשיו:

### 📁 מבנה הפרויקט
```
├── studio/          # סטודיו Sanity (ממשק ניהול)
├── website/         # אתר Next.js (אתר ציבורי)
├── package.json     # ניהול משותף
└── README.md        # הוראות כלליות
```

### ✅ הכל מוכן:
- קבצי .gitignore נכונים
- קבצי vercel.json מוגדרים
- README לכל פרויקט
- קוד נקי ללא node_modules
- Build עובד בשני הפרויקטים

## איך להעלות ל-Vercel:

### שלב 1: GitHub
```bash
git push origin main
```

### שלב 2: Vercel - סטודיו
1. https://vercel.com → "New Project"
2. בחר repository
3. **Root Directory**: `studio`
4. **Environment Variables**:
   - `SANITY_STUDIO_PROJECT_ID` = `7kzkwqzg`
   - `SANITY_STUDIO_DATASET` = `production`
5. Deploy!

### שלב 3: Vercel - אתר
1. "New Project" שוב
2. אותו repository  
3. **Root Directory**: `website`
4. Deploy!

## תוצאה:
- **סטודיו**: https://your-studio.vercel.app
- **אתר**: https://your-website.vercel.app

---

**הכל מוכן! 🚀 פשוט תעלה ל-GitHub ואז ל-Vercel**