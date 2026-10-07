'use client'

import { useEffect } from 'react'
import { AlertTriangle, FileText, Landmark, Pause, Users, Volume2 } from 'lucide-react'
import { getLanguage, type Dict, type LangCode } from '@/lib/i18n'
import { useSpeech } from '@/lib/use-speech'
import { cn } from '@/lib/utils'
import { Waveform } from '../waveform'

export function StalledCard({ t, lang }: { t: Dict; lang: LangCode }) {
  const { speaking, speak, stop } = useSpeech()
  const language = getLanguage(lang)

  useEffect(() => {
    stop()
  }, [lang, stop])

  const toggle = () => (speaking ? stop() : speak(t.voiceScript, language.speechLang))

  const icons = [
    { Icon: FileText, label: t.iconLand },
    { Icon: Users, label: t.iconJoint },
    { Icon: Landmark, label: t.iconBank },
  ]

  return (
    <article
      aria-labelledby="stalled-title"
      className="flex h-full flex-col gap-6 rounded-3xl border-4 border-[#ff6b6b] bg-alert p-7 text-alert-foreground"
    >
      <div className="flex items-start gap-5">
        <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-white">
          <AlertTriangle className="size-10 text-alert" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-lg font-bold uppercase tracking-wide text-white/85">{t.stalledTag}</p>
          <h2 id="stalled-title" className="text-balance text-3xl font-extrabold leading-tight">
            {t.stalledTitle}
          </h2>
        </div>
      </div>

      <ul className="grid grid-cols-3 gap-4">
        {icons.map(({ Icon, label }) => (
          <li key={label} className="flex flex-col items-center gap-2 rounded-2xl bg-black/20 px-3 py-5 text-center">
            <Icon className="size-14" aria-hidden="true" />
            <span className="text-xl font-bold">{label}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={toggle}
        aria-pressed={speaking}
        className={cn(
          'flex flex-1 flex-col gap-5 rounded-3xl border-4 p-6 text-left transition-colors',
          speaking ? 'border-primary bg-[#2a0a0b]' : 'border-white/50 bg-black/25 hover:border-primary',
        )}
      >
        <span className="flex items-center gap-4">
          <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary">
            {speaking ? (
              <Pause className="size-9 text-primary-foreground" aria-hidden="true" />
            ) : (
              <Volume2 className="size-9 text-primary-foreground" aria-hidden="true" />
            )}
          </span>
          <span className="text-2xl font-extrabold text-primary">{speaking ? t.playing : t.listen}</span>
        </span>
        <Waveform active={speaking} className="h-20 w-full justify-between" barClassName="w-2.5" />
        <span lang={lang} className="text-pretty text-2xl font-semibold leading-relaxed text-white" aria-live="polite">
          {`"${t.voiceScript}"`}
        </span>
      </button>
    </article>
  )
}
