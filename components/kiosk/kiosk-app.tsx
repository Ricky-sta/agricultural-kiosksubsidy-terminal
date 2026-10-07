'use client'

import { useCallback, useEffect, useState } from 'react'
import { getDict, type LangCode } from '@/lib/i18n'
import { KioskHeader } from './kiosk-header'
import { LanguageScreen } from './language-screen'
import { LookupScreen } from './lookup-screen'
import { DiagnosticLoading } from './diagnostic-loading'
import { DashboardScreen } from './dashboard-screen'
import { VoiceHelpOverlay } from './voice-help-overlay'
import { ProgressSteps } from './progress-steps'
import { LanguageBar } from './language-bar'

export type Screen = 'language' | 'lookup' | 'loading' | 'dashboard'

const DEFAULT_APP_ID = 'IN-AGRI-2026-8942'

export function KioskApp() {
  const [lang, setLang] = useState<LangCode>('kn')
  const [screen, setScreen] = useState<Screen>('language')
  const [appId, setAppId] = useState(DEFAULT_APP_ID)
  const [voiceOpen, setVoiceOpen] = useState(false)
  const t = getDict(lang)

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  useEffect(() => {
    if (screen !== 'loading') return
    const id = setTimeout(() => setScreen('dashboard'), 2600)
    return () => clearTimeout(id)
  }, [screen])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [screen])

  const handleVoiceDetected = useCallback(
    (detected: LangCode) => {
      setLang(detected)
      setVoiceOpen(false)
      if (screen === 'language') setScreen('lookup')
    },
    [screen],
  )

  const reset = () => {
    setAppId(DEFAULT_APP_ID)
    setScreen('language')
  }

  return (
    <div className="flex min-h-screen flex-col">
      <KioskHeader t={t} onVoiceHelp={() => setVoiceOpen(true)} onHome={reset} />

      <main className="mx-auto flex w-full max-w-[1800px] flex-1 flex-col gap-6 px-6 py-6 lg:px-10">
        <ProgressSteps t={t} screen={screen} />
        {screen !== 'language' && <LanguageBar lang={lang} onSelect={setLang} />}

        <div key={screen} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {screen === 'language' && (
            <LanguageScreen
              t={t}
              lang={lang}
              onSelect={setLang}
              onContinue={() => setScreen('lookup')}
            />
          )}
          {screen === 'lookup' && (
            <LookupScreen
              t={t}
              appId={appId}
              onAppIdChange={setAppId}
              onBack={() => setScreen('language')}
              onRun={() => setScreen('loading')}
            />
          )}
          {screen === 'loading' && <DiagnosticLoading t={t} appId={appId} />}
          {screen === 'dashboard' && (
            <DashboardScreen t={t} lang={lang} appId={appId} onBack={() => setScreen('lookup')} onFinish={reset} />
          )}
        </div>
      </main>

      {voiceOpen && (
        <VoiceHelpOverlay
          t={t}
          currentLang={lang}
          onDetected={handleVoiceDetected}
          onClose={() => setVoiceOpen(false)}
        />
      )}
    </div>
  )
}
