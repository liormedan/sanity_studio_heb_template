import React, {useEffect, useMemo, useState} from 'react'
import {Sidebar, SidebarGroup, SidebarButton, SidebarLabel} from './ui/sidebar'
import {FileText, Layers, ListTree, Settings, Users, Search, ChevronDown, ChevronRight, LogOut, ExternalLink} from 'lucide-react'
import {Input} from './ui/input'

function useActivePath() {
  const [path, setPath] = useState<string>(location.pathname + location.search + location.hash)
  useEffect(() => {
    const onPop = () => setPath(location.pathname + location.search + location.hash)
    window.addEventListener('popstate', onPop)
    const id = setInterval(onPop, 500)
    return () => {
      window.removeEventListener('popstate', onPop)
      clearInterval(id)
    }
  }, [])
  return path
}

export default function AppSidebar() {
  const active = useActivePath()
  const [q, setQ] = useState('')
  const [open, setOpen] = useState({content: true, account: true, globals: true})
  const projectId = (import.meta as any).env.SANITY_STUDIO_PROJECT_ID as string | undefined
  const manageBase = projectId ? `https://www.sanity.io/manage/project/${projectId}` : 'https://www.sanity.io/manage'

  const items = useMemo(
    () => [
      {group: 'content', title: 'תוכן', links: [
        {href: '/desk', icon: ListTree, label: 'ראשי (Desk)'},
        {href: '/desk;page', icon: FileText, label: 'דפים'},
        {href: '/desk;post', icon: Layers, label: 'פוסטים'},
        {href: '/desk;category', icon: ListTree, label: 'קטגוריות'},
        {href: '/desk;author', icon: Users, label: 'מחברים'},
      ]},
      {group: 'account', title: 'חשבון', links: [
        {href: '/desk/intent/edit/id=account;type=account', icon: Settings, label: 'פרטי חשבון'},
        {href: '/desk/intent/edit/id=secrets;type=secrets', icon: Settings, label: 'סודות חיבור'},
      ]},
      {group: 'globals', title: 'גלובלים', links: [
        {href: '/desk/intent/edit/id=siteSettings;type=siteSettings', icon: Settings, label: 'הגדרות אתר'},
      ]},
    ],
    []
  )

  const filter = (label: string) => label.toLowerCase().includes(q.trim().toLowerCase())

  return (
    <Sidebar className="bg-blue-800 text-blue-50 border-blue-900">
      <div className="relative mb-2">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-100" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="חיפוש..."
          className="pl-8 bg-white/10 placeholder-blue-100 text-blue-50 border-white/20 focus-visible:ring-white/40"
        />
      </div>
      <SidebarButton href="/onboarding" active={active.includes('/onboarding')}>
        <ListTree size={16} />
        <SidebarLabel>התחלה מהירה</SidebarLabel>
      </SidebarButton>

      {items.map((section) => (
        <div key={section.group} className="mb-2">
          <button
            type="button"
            onClick={() => setOpen((s) => ({...s, [section.group]: !s[section.group as keyof typeof s]}))}
            className="flex w-full items-center justify-between rounded-md px-3 py-2 hover:bg-accent"
          >
            <span className="font-medium">{section.title}</span>
            {open[section.group as keyof typeof open] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          {open[section.group as keyof typeof open] && (
            <SidebarGroup>
              {section.links
                .filter((l) => !q || filter(l.label))
                .map((l) => (
                  <SidebarButton key={l.href} href={l.href} active={active.includes(l.href)}>
                    <l.icon size={16} />
                    <SidebarLabel>{l.label}</SidebarLabel>
                  </SidebarButton>
                ))}
            </SidebarGroup>
          )}
        </div>
      ))}

      <div className="mt-auto pt-3 border-t">
        <SidebarGroup title="פעולות" >
          <SidebarButton href={manageBase} target="_blank" rel="noreferrer">
            <ExternalLink size={16} />
            <SidebarLabel>ניהול פרויקט</SidebarLabel>
          </SidebarButton>
          <SidebarButton href={`${manageBase}/members`} target="_blank" rel="noreferrer">
            <ExternalLink size={16} />
            <SidebarLabel>חברי צוות</SidebarLabel>
          </SidebarButton>
          <SidebarButton href="/desk;secrets">
            <Settings size={16} />
            <SidebarLabel>סודות חיבור</SidebarLabel>
          </SidebarButton>
          <SidebarButton href="/desk;account">
            <Settings size={16} />
            <SidebarLabel>פרטי חשבון</SidebarLabel>
          </SidebarButton>
          <SidebarButton href="/logout">
            <LogOut size={16} />
            <SidebarLabel>התנתק</SidebarLabel>
          </SidebarButton>
        </SidebarGroup>
      </div>
    </Sidebar>
  )
}
