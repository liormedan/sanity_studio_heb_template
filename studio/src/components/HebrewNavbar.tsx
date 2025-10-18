import React from 'react'
import {Button} from './ui/button'

const linkStyle: React.CSSProperties = {
  color: 'inherit',
  textDecoration: 'none',
  padding: '6px 10px',
  borderRadius: 6,
}

export default function HebrewNavbar(props: any) {
  const projectId = (import.meta as any).env.SANITY_STUDIO_PROJECT_ID as string | undefined
  const manageBase = projectId ? `https://www.sanity.io/manage/project/${projectId}` : 'https://www.sanity.io/manage'

  const goLogout = () => {
    window.location.href = '/logout'
  }

  return (
    <header dir="rtl" lang="he" className="sticky top-0 z-10 border-b bg-background">
      <div className="mx-auto flex items-center justify-between px-3 py-2">
        <div className="flex items-center gap-2">
          <a href="/desk" className="nav-link font-semibold">סטודיו תוכן בעברית</a>
          <a href="/desk" className="nav-link">ניהול תוכן</a>
          <a href="/vision" className="nav-link">שאילתות</a>
        </div>
        <nav className="flex items-center gap-2">
          <a href={manageBase} target="_blank" rel="noreferrer" className="nav-link">ניהול פרויקט</a>
          <a href={`${manageBase}/members`} target="_blank" rel="noreferrer" className="nav-link">חברי צוות</a>
          <a href="/desk;secrets" className="nav-link">סודות חיבור</a>
          <a href="/desk;account" className="nav-link">פרטי חשבון</a>
          <Button variant="outline" onClick={goLogout}>התנתק</Button>
        </nav>
      </div>
    </header>
  )
}
