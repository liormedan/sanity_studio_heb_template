import React from 'react'
import {definePlugin} from 'sanity'
import AppSidebar from '../../components/AppSidebar'

export function SideMenuTool() {
  return (
    <div dir="rtl" lang="he" className="hebrew-rtl flex h-full">
      <AppSidebar />
      <main className="flex-1 overflow-auto p-6">
        <h1 className="mb-4 text-2xl font-semibold">תפריט צד מותאם (Sidebar‑08 style)</h1>
        <p className="text-sm text-muted-foreground">בחר פריט בצד כדי לנווט בתוכן.</p>
      </main>
    </div>
  )
}

export default definePlugin({
  name: 'hebrew-side-menu',
  tools: [
    {
      name: 'sideMenu',
      title: 'תפריט צד',
      component: SideMenuTool,
    },
  ],
})
