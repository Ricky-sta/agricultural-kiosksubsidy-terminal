'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2, Mic, X } from 'lucide-react'
import { getLanguage, type Dict, type LangCode } from '@/lib/i18n'
import { Waveform } from './waveform'

export function VoiceHelpOverlay({
  t,
  currentLang,
  onDetected,
  onClose,
}: {
  t: Dict
  currentLang: LangCode
  onDetected: (lang: LangCode) => void
  onClose: () => void
}) {
  const detectedLang: LangCode = currentLang === 'en' ? 'kn' : currentLang
  const [phase, setPhase] = useState<'listening' | 'detected'>('listening')

  useEffect(() => {
    const a = setTimeout(() => setPhase('detected'), 3000)
    const b = setTimeout(() => onDetected(detectedLang), 4600)
    return () => {
      clearTimeout(a)
      clearTimeout(b)
    }
  }, [detectedLang, onDetected])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const language = getLanguage(detectedLang)

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="voice-help-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-6 animate-in fade-in duration-300"
    >
      <div className="relative w-full max-w-3xl rounded-3xl border-4 border-primary bg-surface p-10 text-center">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 flex size-14 items-center justify-center rounded-full bg-white text-primary-foreground"
          aria-label={t.close}
        >
          <X className="size-8" aria-hidden="true" />
        </button>

        <div className="mx-auto mb-6 flex size-32 items-center justify-center rounded-full bg-primary">
          {phase === 'listening' ? (
            <Mic className="size-16 text-primary-foreground" aria-hidden="true" />
          ) : (
            <CheckCircle2 className="size-16 text-primary-foreground" aria-hidden="true" />
          )}
        </div>

        <h2 id="voice-help-title" className="text-balance text-3xl font-extrabold text-white" aria-live="polite">
          {phase === 'listening' ? t.listening : `${t.detected}: ${language.native}`}
        </h2>

        <Waveform active={phase === 'listening'} className="mx-auto mt-8 h-28 justify-center" barClassName="w-3" />
      </div>
    </div>
  )
}
