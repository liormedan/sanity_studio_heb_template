import * as React from 'react'
import {cn} from '../../lib/utils'

export function Sidebar({className, children}: React.PropsWithChildren<{className?: string}>) {
  return (
    <aside
      className={cn(
        // Brand blue sidebar on the right
        'flex h-full w-72 shrink-0 flex-col gap-2 border-l bg-blue-800 text-blue-50 p-3 backdrop-blur border-blue-900',
        className
      )}
    >
      {children}
    </aside>
  )
}

export function SidebarGroup({title, children}: React.PropsWithChildren<{title?: string}>) {
  return (
    <div>
      {title ? (
        <div className="px-2 pb-1 text-xs font-medium tracking-wide text-muted-foreground">{title}</div>
      ) : null}
      <div className="space-y-1">{children}</div>
    </div>
  )
}

export function SidebarButton({
  active,
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLAnchorElement> & {active?: boolean}) {
  return (
    <a
      {...(props as any)}
      className={cn(
        'flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-white/10',
        active && 'bg-white/20',
        className
      )}
    >
      {children}
    </a>
  )
}

export function SidebarLabel({children}: {children: React.ReactNode}) {
  return <span className="truncate">{children}</span>
}
