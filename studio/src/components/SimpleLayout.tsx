import React from 'react'
import '../styles/global.css'

// Layout פשוט עם קישור לאתר
export default function SimpleLayout(props: any) {
  return (
    <div dir="rtl" lang="he" className="hebrew-rtl">
      {/* כפתור קישור לאתר */}
      <div className="fixed top-4 left-4 z-50">
        <a 
          href="https://sanity-studio-heb-template-website.vercel.app/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors flex items-center gap-2 text-sm font-medium"
        >
          🌐 צפה באתר
        </a>
      </div>
      
      <div className="min-h-screen">
        {props.renderDefault ? props.renderDefault(props) : props.children}
      </div>
    </div>
  )
}