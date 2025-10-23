import React from 'react'
import {definePlugin} from 'sanity'
import {Button} from '../../components/ui/button'
import {Input} from '../../components/ui/input'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import startMd from '../../../docs/start.md?raw'
import connectMd from '../../../docs/connect.md?raw'
import contentMd from '../../../docs/content.md?raw'
import settingsMd from '../../../docs/settings.md?raw'
import secretsMd from '../../../docs/secrets.md?raw'
import sidebarMd from '../../../docs/sidebar.md?raw'
import typesMd from '../../../docs/types.md?raw'
import previewMd from '../../../docs/preview.md?raw'
import deployMd from '../../../docs/deploy.md?raw'
import shortcutsMd from '../../../docs/shortcuts.md?raw'

function Section({id, title, children}: {id: string; title: string; children: React.ReactNode}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="mb-2 text-xl font-semibold">{title}</h2>
      <div className="prose max-w-none text-sm leading-6 prose-invert">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{String(children)}</ReactMarkdown>
      </div>
    </section>
  )
}

function TocLink({href, children}: {href: string; children: React.ReactNode}) {
  return (
    <a className="block rounded-md px-2 py-1 text-sm hover:bg-accent" href={href}>
      {children}
    </a>
  )
}

export function DocsTool() {
  const env = (import.meta as any).env || {}
  const projectId = env.SANITY_STUDIO_PROJECT_ID as string | undefined
  const dataset = env.SANITY_STUDIO_DATASET as string | undefined

  const envExample = `SANITY_STUDIO_PROJECT_ID=${projectId || 'yourProjectId'}\nSANITY_STUDIO_DATASET=${dataset || 'production'}\n`

  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text)
    alert('הועתק ללוח')
  }

  return (
    <div dir="rtl" lang="he" className="hebrew-rtl grid grid-cols-12 gap-6 p-6">
      <aside className="col-span-3 xl:col-span-2 sticky top-16 self-start">
        <div className="mb-3 text-sm text-muted-foreground">תוכן עניינים</div>
        <nav className="space-y-1">
          <TocLink href="#start">קדימה לעבודה</TocLink>
          <TocLink href="#connect">חיבור ל‑Sanity</TocLink>
          <TocLink href="#content">ניהול תוכן</TocLink>
          <TocLink href="#settings">הגדרות אתר</TocLink>
          <TocLink href="#secrets">סודות חיבור</TocLink>
          <TocLink href="#sidebar">תפריט צד וממשק</TocLink>
          <TocLink href="#types">סוגי תוכן נוספים</TocLink>
          <TocLink href="#preview">פריוויו</TocLink>
          <TocLink href="#deploy">פריסה</TocLink>
          <TocLink href="#shortcuts">קיצורים</TocLink>
        </nav>
      </aside>
      <main className="col-span-9 xl:col-span-10 space-y-8">
        <header className="mb-2">
          <h1 className="text-2xl font-bold">תיעוד ושימוש בסטודיו</h1>
          <p className="mt-1 text-sm text-muted-foreground">מדריך קצר לניהול התוכן בעברית.</p>
        </header>

        <Section id="start" title="קדימה לעבודה">{startMd}</Section>

        <Section id="connect" title="חיבור ל‑Sanity">{connectMd}</Section>
        <div className="mt-2 flex items-center gap-2">
          <Input readOnly dir="ltr" value={envExample} />
          <Button variant="outline" onClick={() => copy(envExample)}>העתק .env</Button>
        </div>

        <Section id="content" title="ניהול תוכן">{contentMd}</Section>

        <Section id="settings" title="הגדרות אתר (Singleton)">{settingsMd}</Section>

        <Section id="secrets" title="סודות חיבור">{secretsMd}</Section>

        <Section id="sidebar" title="תפריט צד וממשק">{sidebarMd}</Section>

        <Section id="types" title="הוספת סוגי תוכן">{typesMd}</Section>

        <Section id="preview" title="פריוויו באתר">{previewMd}</Section>

        <Section id="deploy" title="פריסה (Deploy)">{deployMd}</Section>

        <Section id="shortcuts" title="קיצורים שימושיים">{shortcutsMd}</Section>
      </main>
    </div>
  )
}

export default definePlugin({
  name: 'docs-tool',
  tools: [
    {
      name: 'docs',
      title: 'תיעוד',
      component: DocsTool,
    },
  ],
})
