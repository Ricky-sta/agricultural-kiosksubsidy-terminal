import { CalendarClock, ShieldCheck, Tractor } from 'lucide-react'
import type { Dict } from '@/lib/i18n'

export function AdvisoryCard({ t }: { t: Dict }) {
  return (
    <article
      aria-labelledby="advisory-title"
      className="flex flex-col gap-6 rounded-3xl bg-primary p-7 text-primary-foreground md:flex-row md:items-center"
    >
      <span className="flex size-28 shrink-0 items-center justify-center rounded-3xl bg-primary-foreground">
        <Tractor className="size-16 text-primary" aria-hidden="true" />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <p className="text-lg font-bold uppercase tracking-wide opacity-80">{t.advisoryTag}</p>
        <h2 id="advisory-title" className="text-balance text-3xl font-extrabold leading-tight">
          {t.advisoryTitle}
        </h2>
        <p className="text-pretty text-2xl font-semibold leading-snug">{t.advisorySub}</p>
      </div>
      <div className="flex shrink-0 flex-row gap-3 md:flex-col">
        <span className="flex items-center gap-3 rounded-2xl bg-primary-foreground px-5 py-3 text-xl font-extrabold text-success">
          <ShieldCheck className="size-8" aria-hidden="true" />
          {t.eligible}
        </span>
        <span className="flex items-center gap-3 rounded-2xl border-4 border-primary-foreground px-5 py-3 text-xl font-extrabold">
          <CalendarClock className="size-8" aria-hidden="true" />
          {t.opensIn}
        </span>
      </div>
    </article>
  )
}
