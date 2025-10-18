import React from 'react'
import '../styles/rtl.css'

export default function RtlLayout(props: {children: React.ReactNode}) {
  return (
    <div dir="rtl" className="hebrew-rtl">
      {props.children}
    </div>
  )
}

