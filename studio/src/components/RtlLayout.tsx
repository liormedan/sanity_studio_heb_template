import React from 'react'
import '../styles/global.css'
import AppSidebar from './AppSidebar'

// Global layout: keep RTL, but place a persistent left sidebar
export default function RtlLayout(props: any) {
  return (
    <div dir="rtl" lang="he" className="hebrew-rtl">
      {/* ב-RTL, flex-row מציב את הפריט הראשון בצד ימין */}
      <div className="flex min-h-screen flex-row">
        <AppSidebar />
        <div className="flex-1 min-w-0">
          {props.renderDefault ? props.renderDefault(props) : props.children}
        </div>
      </div>
    </div>
  )
}
