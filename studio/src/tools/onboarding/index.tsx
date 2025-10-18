import React, {useMemo, useState} from 'react'
import {definePlugin, useClient} from 'sanity'
import {Button} from '../../components/ui/button'
import {Input} from '../../components/ui/input'

function Section({title, children}: React.PropsWithChildren<{title: string}>) {
  return (
    <section className="mb-6 rounded-lg border p-4">
      <h2 className="mb-3 text-lg font-semibold">{title}</h2>
      {children}
    </section>
  )
}

function OnboardingTool() {
  const client = useClient({apiVersion: '2024-06-01'})
  const [copied, setCopied] = useState<string>('')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<string>('')

  const env = (import.meta as any).env || {}
  const envProjectId = env.SANITY_STUDIO_PROJECT_ID as string | undefined
  const envDataset = env.SANITY_STUDIO_DATASET as string | undefined
  const provisionUrl = env.SANITY_STUDIO_PROVISION_URL as string | undefined

  const status = useMemo(() => {
    const projectId = envProjectId || client.config().projectId
    const dataset = envDataset || client.config().dataset
    return {
      projectId: projectId || '',
      dataset: dataset || '',
      ok: Boolean(projectId && dataset),
    }
  }, [client, envProjectId, envDataset])

  const copy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(''), 1200)
  }

  const manageBase = status.projectId
    ? `https://www.sanity.io/manage/project/${status.projectId}`
    : 'https://www.sanity.io/manage'

  const envLines = `SANITY_STUDIO_PROJECT_ID=${status.projectId || 'yourProjectId'}\nSANITY_STUDIO_DATASET=${status.dataset || 'production'}\n`

  const generateSecret = async () => {
    const secret = (crypto?.getRandomValues?.(new Uint32Array(4)) || [Date.now()])
      .join('-')
      .toString(36)
    const id = 'secrets'
    await client.createIfNotExists({_id: id, _type: 'secrets'})
    await client.patch(id).setIfMissing({previewSecret: secret}).commit({autoGenerateArrayKeys: true})
    alert('נוצר PREVIEW_SECRET (אם לא היה קיים). ניתן לערוך במסמך "סודות חיבור"')
  }

  return (
    <div dir="rtl" lang="he" className="hebrew-rtl mx-auto max-w-3xl p-4 space-y-6">
      <h1 className="text-2xl font-bold">התחלה מהירה ללקוח</h1>
      <p className="text-sm text-muted-foreground">
        כאן ניתן לחבר את הסטודיו לפרויקט Sanity פרטי ולנהל סודות. ברירת המחדל נקראת מתוך קובץ .env בזמן הרצה.
      </p>

      <Section title="מצב חיבור נוכחי">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-muted-foreground mb-1">Project ID</div>
            <Input dir="ltr" value={status.projectId} readOnly />
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Dataset</div>
            <Input dir="ltr" value={status.dataset} readOnly />
          </div>
        </div>
        {!status.ok && (
          <p className="mt-3 text-sm text-destructive">לא הוגדרו projectId/dataset. יש לעדכן את studio/.env ולהריץ מחדש.</p>
        )}
        <div className="mt-3 flex gap-2">
          <Button variant="secondary" onClick={() => copy(envLines, 'env')}>{copied==='env' ? 'הועתק!' : 'העתק .env'}</Button>
          <Button asChild>
            <a href={manageBase} target="_blank" rel="noreferrer">פתח ניהול פרויקט</a>
          </Button>
        </div>
      </Section>

      <Section title="יצירת פרויקט/דאטאסֶט">
        <p className="mb-2 text-sm text-muted-foreground">
          אם אין לך פרויקט, פתח את ניהול Sanity ליצירה. אם צריך דאטאסֶט חדש, הרץ בטרמינל:
        </p>
        <div className="flex items-center gap-2">
          <Input dir="ltr" readOnly value="npx sanity dataset create production" />
          <Button variant="outline" onClick={() => copy('npx sanity dataset create production', 'ds')}>{copied==='ds' ? 'הועתק!' : 'העתק פקודה'}</Button>
        </div>
      </Section>

      <Section title="אוטומציה דרך Management API (מומלץ ללקוח)">
        <p className="mb-3 text-sm text-muted-foreground">
          ניתן לבצע פרוביז׳ן אוטומטי (פרויקט + דאטאסֶט + CORS + טוקן) בעזרת שרות API חיצוני. הגדר את הכתובת ב‑<code>SANITY_STUDIO_PROVISION_URL</code> ב‑.env.
        </p>
        <AutoProvision provisionUrl={provisionUrl} onDone={(info) => setMessage(`נוצר פרויקט ${info.projectId}, דאטאסֶט ${info.dataset}`)} busy={busy} setBusy={setBusy} />
        {message && <p className="mt-3 text-sm text-green-600">{message}</p>}
      </Section>

      <Section title="סודות חיבור (אופציונלי)">
        <p className="mb-2 text-sm text-muted-foreground">אפשר ליצור PREVIEW_SECRET ברירת־מחדל למסמך "סודות חיבור".</p>
        <Button variant="outline" onClick={generateSecret}>צור PREVIEW_SECRET</Button>
      </Section>
    </div>
  )
}

function AutoProvision({provisionUrl, onDone, busy, setBusy}: {provisionUrl?: string; onDone: (r: any) => void; busy: boolean; setBusy: (b: boolean) => void}) {
  const [userToken, setUserToken] = useState('')
  const [displayName, setDisplayName] = useState('Hebrew Content Project')
  const [dataset, setDataset] = useState('production')
  const [origins, setOrigins] = useState<string>(location.origin)

  const canRun = Boolean(provisionUrl && userToken && displayName && dataset)

  const run = async () => {
    if (!provisionUrl) {
      alert('לא הוגדרה כתובת SANITY_STUDIO_PROVISION_URL בקובץ .env')
      return
    }
    setBusy(true)
    try {
      const res = await fetch(provisionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({displayName, dataset, corsOrigins: origins.split(',').map((s) => s.trim()).filter(Boolean)}),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || JSON.stringify(data))
      onDone?.(data)
      // הצג למשתמש ערכי env לעדכון
      const envText = `SANITY_STUDIO_PROJECT_ID=${data.projectId}\nSANITY_STUDIO_DATASET=${data.dataset}\n`
      await navigator.clipboard.writeText(envText)
      alert('העתקתי ללוח את ה-.env החדש. הדבק ל-studio/.env והפעל מחדש.')
    } catch (err: any) {
      alert(`שגיאה בפרוביז׳ן: ${err.message || err}`)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <div className="text-xs text-muted-foreground mb-1">User Token (חד‑פעמי)</div>
          <Input dir="ltr" value={userToken} onChange={(e) => setUserToken(e.target.value)} placeholder="דביקת טוקן משתמש" />
        </div>
        <div>
          <div className="text-xs text-muted-foreground mb-1">שם פרויקט</div>
          <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        </div>
        <div>
          <div className="text-xs text-muted-foreground mb-1">Dataset</div>
          <Input dir="ltr" value={dataset} onChange={(e) => setDataset(e.target.value)} />
        </div>
        <div className="col-span-2">
          <div className="text-xs text-muted-foreground mb-1">CORS Origins (מופרד בפסיקים)</div>
          <Input dir="ltr" value={origins} onChange={(e) => setOrigins(e.target.value)} />
        </div>
      </div>
      <div className="flex gap-2">
        <Button disabled={!canRun || busy} onClick={run}>{busy ? 'יוצר…' : 'צור לי פרויקט'}</Button>
        {!provisionUrl && <span className="text-xs text-destructive">יש להגדיר SANITY_STUDIO_PROVISION_URL בקובץ .env</span>}
      </div>
    </div>
  )
}

export default definePlugin({
  name: 'onboarding-tool',
  tools: [
    {
      name: 'onboarding',
      title: 'התחלה מהירה',
      component: OnboardingTool,
    },
  ],
})
