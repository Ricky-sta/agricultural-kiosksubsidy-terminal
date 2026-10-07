'use client'

import { useState } from 'react'
import { Camera, CheckCircle2, Lock, RotateCcw, ScanFace } from 'lucide-react'
import type { Dict } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export function CameraCard({ t }: { t: Dict }) {
  const [captured, setCaptured] = useState<string | null>(null)
  const [flashKey, setFlashKey] = useState(0)

  const snap = () => {
    setFlashKey((k) => k + 1)
    setCaptured(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
  }

  return (
    <article aria-labelledby="camera-title" className="flex h-full flex-col gap-5 rounded-3xl border-4 border-white/30 bg-card p-7">
      <div>
        <p className="flex items-center gap-2 text-lg font-bold uppercase tracking-wide text-success">
          <span className="size-3 animate-pulse rounded-full bg-[#ef4444]" aria-hidden="true" />
          {t.cameraTag}
        </p>
        <h2 id="camera-title" className="text-3xl font-extrabold text-white">
          {t.cameraTitle}
        </h2>
      </div>

      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[radial-gradient(ellipse_at_center,#1d3b2c_0%,#06140d_75%)]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={cn(
              'relative flex h-3/4 w-3/5 items-center justify-center rounded-2xl border-4',
              captured ? 'border-success bg-success/10' : 'border-success/90',
            )}
          >
            {(['left-0 top-0 border-l-8 border-t-8', 'right-0 top-0 border-r-8 border-t-8', 'bottom-0 left-0 border-b-8 border-l-8', 'bottom-0 right-0 border-b-8 border-r-8'] as const).map(
              (pos) => (
                <span key={pos} className={cn('absolute -m-1 size-8 rounded-sm border-success', pos)} aria-hidden="true" />
              ),
            )}
            {captured ? (
              <CheckCircle2 className="size-20 text-success" aria-hidden="true" />
            ) : (
              <>
                <ScanFace className="size-20 text-white/40" aria-hidden="true" />
                <span className="animate-scan-line absolute inset-x-2 h-1 rounded-full bg-success shadow-[0_0_12px_3px_rgba(34,197,94,0.7)]" aria-hidden="true" />
              </>
            )}
          </div>
        </div>
        <span className="absolute left-3 top-3 rounded-md bg-black/60 px-2 py-1 font-mono text-sm font-bold text-white">
          {'CAM-01 · REC'}
        </span>
        {flashKey > 0 && <span key={flashKey} className="animate-flash absolute inset-0 bg-white" aria-hidden="true" />}
        <p className="absolute inset-x-0 bottom-0 bg-black/60 px-3 py-2 text-center text-lg font-semibold text-white" aria-live="polite">
          {captured ? `${t.captured} · ${captured}` : t.alignHint}
        </p>
      </div>

      <button
        type="button"
        onClick={captured ? () => setCaptured(null) : snap}
        className={cn(
          'flex min-h-20 items-center justify-center gap-3 rounded-2xl px-5 text-2xl font-extrabold transition-transform active:scale-95',
          captured ? 'border-4 border-white bg-transparent text-white' : 'bg-primary text-primary-foreground',
        )}
      >
        {captured ? <RotateCcw className="size-8" aria-hidden="true" /> : <Camera className="size-8" aria-hidden="true" />}
        {captured ? t.retake : t.snap}
      </button>

      <p className="flex items-start gap-3 rounded-2xl bg-surface p-4 text-lg font-semibold leading-snug text-muted-foreground">
        <Lock className="mt-0.5 size-6 shrink-0 text-primary" aria-hidden="true" />
        {t.securityNote}
      </p>
    </article>
  )
}
