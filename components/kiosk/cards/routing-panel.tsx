'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2, Clock, Loader2, MapPin, PhoneCall, Printer } from 'lucide-react'
import type { Dict } from '@/lib/i18n'
import { cn } from '@/lib/utils'

type Action = 'print' | 'call'
type Status = { action: Action; phase: 'working' | 'done' } | null

export function RoutingPanel({ t }: { t: Dict }) {
  const [status, setStatus] = useState<Status>(null)

  useEffect(() => {
    if (!status) return
    const id = setTimeout(
      () => (status.phase === 'working' ? setStatus({ ...status, phase: 'done' }) : setStatus(null)),
      status.phase === 'working' ? 2200 : 4000,
    )
    return () => clearTimeout(id)
  }, [status])

  const message = status
    ? status.action === 'print'
      ? status.phase === 'working'
        ? t.printing
        : t.printed
      : status.phase === 'working'
        ? t.calling
        : t.called
    : null

  return (
    <section aria-labelledby="route-title" className="flex flex-col gap-5 rounded-3xl border-4 border-white/30 bg-surface p-7">
      <div className="flex flex-wrap items-center gap-6">
        <span className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-white">
          <MapPin className="size-12 text-alert" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <p id="route-title" className="text-lg font-bold uppercase tracking-wide text-muted-foreground">
            {t.routeLabel}
          </p>
          <p className="text-4xl font-extrabold text-white">{t.routeCenter}</p>
        </div>
        <div className="flex items-center gap-4 rounded-2xl bg-card px-6 py-4">
          <Clock className="size-10 text-primary" aria-hidden="true" />
          <div>
            <p className="text-lg font-semibold text-muted-foreground">{t.waitLabel}</p>
            <p className="flex items-center gap-3 text-3xl font-extrabold text-white">
              {t.waitTime}
              <span className="flex items-center gap-2 rounded-full bg-success px-3 py-1 text-lg text-[#052e16]">
                <span className="size-3 rounded-full bg-[#052e16]" aria-hidden="true" />
                {t.lowQueue}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <ActionButton
          icon={Printer}
          label={t.print}
          sub={t.printSub}
          busy={status?.action === 'print' && status.phase === 'working'}
          onClick={() => setStatus({ action: 'print', phase: 'working' })}
          className="bg-primary text-primary-foreground"
        />
        <ActionButton
          icon={PhoneCall}
          label={t.call}
          sub={t.callSub}
          busy={status?.action === 'call' && status.phase === 'working'}
          onClick={() => setStatus({ action: 'call', phase: 'working' })}
          className="bg-white text-primary-foreground"
        />
      </div>

      <div aria-live="polite" className="min-h-0">
        {message && (
          <p
            className={cn(
              'flex items-center gap-4 rounded-2xl px-6 py-4 text-2xl font-bold animate-in fade-in slide-in-from-bottom-2',
              status?.phase === 'done' ? 'bg-success text-[#052e16]' : 'bg-card text-white',
            )}
          >
            {status?.phase === 'done' ? (
              <CheckCircle2 className="size-9 shrink-0" aria-hidden="true" />
            ) : (
              <Loader2 className="size-9 shrink-0 animate-spin" aria-hidden="true" />
            )}
            {message}
          </p>
        )}
      </div>
    </section>
  )
}

function ActionButton({
  icon: Icon,
  label,
  sub,
  busy,
  onClick,
  className,
}: {
  icon: typeof Printer
  label: string
  sub: string
  busy: boolean
  onClick: () => void
  className: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      className={cn(
        'flex min-h-28 items-center gap-5 rounded-3xl px-7 py-4 text-left transition-transform hover:scale-[1.01] active:scale-95 disabled:opacity-70',
        className,
      )}
    >
      {busy ? <Loader2 className="size-14 shrink-0 animate-spin" aria-hidden="true" /> : <Icon className="size-14 shrink-0" aria-hidden="true" />}
      <span>
        <span className="block text-balance text-3xl font-extrabold leading-tight">{label}</span>
        <span className="block text-xl font-semibold opacity-75">{sub}</span>
      </span>
    </button>
  )
}
