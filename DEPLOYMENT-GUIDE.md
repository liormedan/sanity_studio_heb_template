# מדריך העלאה ל-Vercel

## אסטרטגיה: 2 פרויקטים נפרדים

### שלב 1: הכנת הפרויקטים

#### A. הכנת הסטודיו להעלאה
```bash
cd studio
npm run build
```

#### B. הכנת האתר להעלאה  
```bash
cd website
npm run build
```

### שלב 2: העלאה ל-Vercel

#### A. העלאת הסטודיו
1. פתח https://vercel.com
2. לחץ "New Project"
3. בחר את התיקייה `studio`
4. הגדר:
   - **Framework**: Other
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. הוסף משתני סביבה:
   ```
   SANITY_STUDIO_PROJECT_ID=7kzkwqzg
   SANITY_STUDIO_DATASET=production
   ```

#### B. העלאת האתר
1. לחץ "New Project" שוב
2. בחר את התיקייה `website`  
3. הגדר:
   - **Framework**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### שלב 3: קישור בין הפרויקטים

עדכן את קובץ `website/src/lib/sanity.ts`:
```typescript
export const client = createClient({
  projectId: '7kzkwqzg',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
  // הוסף את זה לפרודקשן:
  token: process.env.SANITY_API_TOKEN, // אופציונלי לתוכן פרטי
})
```

### שלב 4: תוצאה סופית

תקבל 2 כתובות:
- **סטודיו**: `https://your-studio.vercel.app`
- **אתר**: `https://your-website.vercel.app`

### יתרונות הגישה הזו:
✅ פשוט להעלות  
✅ עדכונים נפרדים  
✅ ביצועים טובים  
✅ קל לניהול  
✅ אין בעיות עם node_modules  

### חיסרונות:
❌ 2 כתובות נפרדות  
❌ צריך לנהל 2 פרויקטים  

---

## אלטרנטיבה: דומיין משותף

אם אתה רוצה שהכל יהיה תחת דומיין אחד:
- האתר: `https://mysite.com`
- הסטודיו: `https://mysite.com/studio`

זה דורש הגדרה מתקדמת יותר עם Vercel Rewrites.