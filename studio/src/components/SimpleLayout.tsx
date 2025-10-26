import React from 'react'
import '../styles/global.css'

// Layout פשוט בלי תפריט צדדי
export default function SimpleLayout(props: any) {
  return (
    <div dir="rtl" lang="he" className="hebrew-rtl">
      <div className="min-h-screen">
        {props.renderDefault ? props.renderDefault(props) : props.children}
      </div>
    </div>
  )
}