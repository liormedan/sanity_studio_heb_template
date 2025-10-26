import React from 'react'
import '../styles/global.css'

// Layout פשוט - רק RTL בלי שינויים נוספים
export default function SimpleLayout(props: any) {
  return (
    <div dir="rtl" lang="he" className="hebrew-rtl">
      <div className="min-h-screen">
        {props.renderDefault ? props.renderDefault(props) : props.children}
      </div>
    </div>
  )
}