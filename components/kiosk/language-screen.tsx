'use client'

import { useState } from 'react'
import { ArrowRight, Check, Fingerprint, Globe, Mic, ScanBarcode } from 'lucide-react'
import { LANGUAGES, MORE_LANGUAGES, type Dict, type LangCode } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { ScanModal, type ScanMode } from './scan-modal'

export function LanguageScreen({
  t,
  lang,
  onSelect,
  onContinue,
}: {
  t: Dict
  lang: LangCode
  onSelect: (lang: LangCode) => void
  onContinue: () => void
}) {
  const [showMore, setShowMore] = useState(false)
  const [moreChoice, setMoreChoice] = useState<string | null>(null)
  const [scanMode, setScanMode] = useState<ScanMode | null>(null)

  return (
    <section aria-labelledby="lang-heading" className="flex flex-col gap-8">
      <div className="flex items-center gap-5 rounded-3xl border-4 border-primary bg-primary/10 px-8 py-6">
        <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary">
          <Mic className="size-9 text-primary-foreground" aria-hidden="true" />
        </span>
        <p className="text-pretty text-2xl font-bold leading-snug text-primary">
          {'Bhashini Voice Auto-Detect: Tap Microphone & Speak in Any Village Dialect / ਆਪਣੀ ਭਾਸ਼ਾ ਵਿੱਚ ਬੋਲੋ / మీ ప్రాంతీయ భాషలో మాట్లాడండి'}
        </p>
      </div>

      <h1 id="lang-heading" className="text-4xl font-extrabold text-white">
        {t.chooseLanguage}
      </h1>

      <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
        {LANGUAGES.map((l) => {
          const selected = l.code === lang && !moreChoice
          return (
            <button
              key={l.code}
              type="button"
              onClick={() => {
                setMoreChoice(null)
                setShowMore(false)
                onSelect(l.code)
              }}
              aria-pressed={selected}
              lang={l.code}
              className={cn(
                'relative flex min-h-36 flex-col items-center justify-center gap-2 rounded-3xl border-4 px-4 py-6 transition-all active:scale-95',
                selected
                  ? 'border-primary bg-primary text-primary-foreground shadow-[0_0_0_6px_rgba(255,193,7,0.3)]'
                  : 'border-white/30 bg-card text-white hover:border-primary',
              )}
            >
              {selected && (
                <span className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-primary-foreground">
                  <Check className="size-6 text-primary" aria-hidden="true" />
                </span>
              )}
              <span className="text-5xl font-bold leading-tight">{l.native}</span>
              <span className={cn('text-xl font-semibold', selected ? 'opacity-80' : 'text-muted-foreground')}>
                {l.english}
              </span>
            </button>
          )
        })}
        <button
          type="button"
          onClick={() => setShowMore((v) => !v)}
          aria-expanded={showMore}
          aria-controls="more-languages"
          className={cn(
            'flex min-h-36 flex-col items-center justify-center gap-3 rounded-3xl border-4 border-dashed px-4 py-6 text-center transition-all active:scale-95',
            showMore || moreChoice ? 'border-primary bg-primary/15 text-primary' : 'border-white/40 bg-card text-white hover:border-primary',
          )}
        >
          <Globe className="size-12" aria-hidden="true" />
          <span className="text-balance text-2xl font-bold leading-tight">{moreChoice ?? t.allLanguages}</span>
        </button>
      </div>

      {showMore && (
        <div
          id="more-languages"
          className="rounded-3xl border-4 border-primary bg-surface p-6 animate-in fade-in slide-in-from-top-2 duration-300"
        >
          <h2 className="mb-1 text-2xl font-bold text-primary">{t.moreLanguagesTitle}</h2>
          <p className="mb-5 text-lg text-muted-foreground">{t.moreLanguagesNote}</p>
          <div className="grid grid-cols-3 gap-4 md:grid-cols-5">
            {MORE_LANGUAGES.map((l) => (
              <button
                key={l.english}
                type="button"
                onClick={() => {
                  setMoreChoice(`${l.native} · ${l.english}`)
                  setShowMore(false)
                  onSelect('en')
                }}
                className="flex min-h-24 flex-col items-center justify-center rounded-2xl border-2 border-white/30 bg-card px-3 py-3 text-white hover:border-primary active:scale-95"
              >
                <span className="text-3xl font-bold">{l.native}</span>
                <span className="text-base text-muted-foreground">{l.english}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-white">{t.noPhone}</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <MobileFreeButton icon={ScanBarcode} label={t.scanBarcode} onClick={() => setScanMode('barcode')} />
          <MobileFreeButton icon={Fingerprint} label={t.biometric} onClick={() => setScanMode('thumb')} />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onContinue}
          className="flex min-h-24 items-center gap-4 rounded-3xl bg-primary px-12 text-3xl font-extrabold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-95"
        >
          {t.continue}
          <ArrowRight className="size-10" aria-hidden="true" />
        </button>
      </div>

      {scanMode && (
        <ScanModal
          t={t}
          mode={scanMode}
          onClose={() => setScanMode(null)}
          onDone={() => {
            setScanMode(null)
            onContinue()
          }}
        />
      )}
    </section>
  )
}

function MobileFreeButton({
  icon: Icon,
  label,
  onClick,
}: {
  icon: typeof ScanBarcode
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-28 items-center gap-6 rounded-3xl bg-white px-8 py-5 text-left text-primary-foreground transition-transform hover:scale-[1.01] active:scale-95"
    >
      <span className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-background">
        <Icon className="size-12 text-primary" aria-hidden="true" />
      </span>
      <span className="text-balance text-3xl font-extrabold leading-tight">{label}</span>
    </button>
  )
}
