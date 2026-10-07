import { Check } from 'lucide-react'
import type { Dict } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import type { Screen } from './kiosk-app'

export function ProgressSteps({ t, screen }: { t: Dict; screen: Screen }) {
  const current = screen === 'language' ? 0 : screen === 'lookup' ? 1 : 2
  const steps = [t.stepLanguage, t.stepLookup, t.stepResult]

  return (
    <nav aria-label="Progress">
      <ol className="flex items-center gap-3">
        {steps.map((label, i) => {
          const done = i < current
          const active = i === current
          return (
            <li key={label} className="flex flex-1 items-center gap-3">
              <span
                className={cn(
                  'flex size-11 shrink-0 items-center justify-center rounded-full border-4 text-xl font-extrabold',
                  done && 'border-success bg-success text-[#052e16]',
                  active && 'border-primary bg-primary text-primary-foreground',
                  !done && !active && 'border-white/30 text-white/60',
                )}
                aria-current={active ? 'step' : undefined}
              >
                {done ? <Check className="size-6" aria-hidden="true" /> : i + 1}
              </span>
              <span className={cn('text-xl font-bold', active ? 'text-primary' : 'text-white/80')}>{label}</span>
              {i < steps.length - 1 && (
                <span className={cn('h-1.5 flex-1 rounded-full', done ? 'bg-success' : 'bg-white/20')} aria-hidden="true" />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
