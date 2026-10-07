'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const FALLBACK_DURATION_MS = 7000

export function useSpeech() {
  const [speaking, setSpeaking] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const stop = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = null
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    setSpeaking(false)
  }, [])

  const speak = useCallback(
    (text: string, lang: string) => {
      stop()
      setSpeaking(true)
      // Kiosks may lack a voice for the dialect, so the waveform always runs for a minimum duration.
      timerRef.current = setTimeout(() => setSpeaking(false), FALLBACK_DURATION_MS)
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = lang
      utterance.rate = 0.85
      const voice = window.speechSynthesis.getVoices().find((v) => v.lang === lang)
      if (voice) {
        utterance.voice = voice
        utterance.onend = () => {
          if (timerRef.current) clearTimeout(timerRef.current)
          setSpeaking(false)
        }
      }
      window.speechSynthesis.speak(utterance)
    },
    [stop],
  )

  useEffect(() => stop, [stop])

  return { speaking, speak, stop }
}
