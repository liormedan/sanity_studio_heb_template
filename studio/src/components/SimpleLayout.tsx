import React from 'react'
import '../styles/global.css'

// Layout פשוט שמסתיר את התפריט הצדדי אבל משאיר את הפונקציונליות
export default function SimpleLayout(props: any) {
  return (
    <div dir="rtl" lang="he" className="hebrew-rtl">
      <style>{`
        /* הסתרת התפריט הצדדי */
        [data-ui="Pane"]:first-child {
          display: none !important;
        }
        
        /* הרחבת התוכן הראשי */
        [data-ui="Pane"]:last-child {
          width: 100% !important;
          max-width: 100% !important;
        }
        
        /* הסתרת כפתור הפתיחה של התפריט */
        [data-ui="MenuButton"] {
          display: none !important;
        }
      `}</style>
      
      <div className="min-h-screen">
        {props.renderDefault ? props.renderDefault(props) : props.children}
      </div>
    </div>
  )
}