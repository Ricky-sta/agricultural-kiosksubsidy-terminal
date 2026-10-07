import { Landmark, Mic } from 'lucide-react'
import type { Dict } from '@/lib/i18n'
import { LiveClock } from './live-clock'

export function KioskHeader({
  t,
  onVoiceHelp,
  onHome,
}: {
  t: Dict
  onVoiceHelp: () => void
  onHome: () => void
}) {
  return (
    <header className="sticky top-0 z-30 border-b-4 border-primary bg-surface">
      <div className="mx-auto flex w-full max-w-[1800px] flex-wrap items-center justify-between gap-6 px-6 py-4 lg:px-10">
        <button
          type="button"
          onClick={onHome}
          className="flex min-w-0 items-center gap-4 rounded-2xl text-left"
          aria-label={`${t.title} — home`}
        >
          <span className="flex size-16 shrink-0 items-center justify-center rounded-full border-4 border-primary bg-primary/10">
            <Landmark className="size-9 text-primary" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block text-balance text-2xl font-extrabold leading-tight text-white xl:text-3xl">
              {t.title}
            </span>
            <span className="block text-lg font-medium text-muted-foreground">{t.subtitle}</span>
          </span>
        </button>

        <div className="flex items-center gap-6">
          <LiveClock />
          <button
            type="button"
            onClick={onVoiceHelp}
            className="group flex min-h-20 items-center gap-4 rounded-2xl bg-primary px-6 py-3 text-left text-primary-foreground shadow-[0_0_0_4px_rgba(255,193,7,0.25)] transition-transform hover:scale-[1.02] active:scale-95"
          >
            <span className="relative flex size-14 items-center justify-center">
              <span className="absolute inset-0 animate-ping rounded-full bg-primary-foreground/30" aria-hidden="true" />
              <span className="relative flex size-14 items-center justify-center rounded-full bg-primary-foreground">
                <Mic className="size-8 text-primary" aria-hidden="true" />
              </span>
            </span>
            <span className="leading-tight">
              <span className="block text-xl font-extrabold">{t.voiceHelp}</span>
              <span className="block text-base font-bold opacity-80">({t.voiceHelpSub})</span>
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}
