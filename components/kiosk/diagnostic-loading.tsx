'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import type { Dict } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export function DiagnosticLoading({ t, appId }: { t: Dict; appId: string }) {
  const [done, setDone] = useState(0)
  const checks = [t.checkLand, t.checkBank, t.checkScheme]

  useEffect(() => {
    const id = setInterval(() => setDone((d) => Math.min(d + 1, checks.length)), 750)
    return () => clearInterval(id)
  }, [checks.length])

  return (
    <section
      aria-live="polite"
      aria-busy="true"
      className="mx-auto flex w-full max-w-3xl flex-col items-center gap-8 rounded-3xl border-4 border-primary bg-card px-10 py-14 text-center"
    >
      <Loader2 className="size-28 animate-spin text-primary" aria-hidden="true" />
      <div>
        <h1 className="text-balance text-4xl font-extrabold text-white">{t.checking}</h1>
        <p className="mt-2 font-mono text-2xl font-bold text-primary">{appId}</p>
      </div>
      <ul className="flex w-full flex-col gap-4 text-left">
        {checks.map((label, i) => {
          const complete = i < done
          return (
            <li
              key={label}
              className={cn(
                'flex items-center gap-4 rounded-2xl px-6 py-4 text-2xl font-bold transition-colors',
                complete ? 'bg-success/20 text-white' : 'bg-surface text-white/60',
              )}
            >
              {complete ? (
                <CheckCircle2 className="size-9 shrink-0 text-success" aria-hidden="true" />
              ) : (
                <Loader2 className="size-9 shrink-0 animate-spin text-white/50" aria-hidden="true" />
              )}
              {label}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
