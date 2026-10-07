'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2, Fingerprint, ScanBarcode, X } from 'lucide-react'
import type { Dict } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export type ScanMode = 'barcode' | 'thumb'

export function ScanModal({
  t,
  mode,
  onClose,
  onDone,
}: {
  t: Dict
  mode: ScanMode
  onClose: () => void
  onDone: () => void
}) {
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const a = setTimeout(() => setSuccess(true), 2400)
    const b = setTimeout(onDone, 3600)
    return () => {
      clearTimeout(a)
      clearTimeout(b)
    }
  }, [onDone])

  const Icon = mode === 'barcode' ? ScanBarcode : Fingerprint

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="scan-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-6 animate-in fade-in duration-300"
    >
      <div className="relative w-full max-w-2xl rounded-3xl border-4 border-primary bg-surface p-10 text-center">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 flex size-14 items-center justify-center rounded-full bg-white text-primary-foreground"
          aria-label={t.close}
        >
          <X className="size-8" aria-hidden="true" />
        </button>

        <div
          className={cn(
            'relative mx-auto mb-8 flex size-56 items-center justify-center overflow-hidden rounded-3xl border-4',
            success ? 'border-success bg-success/15' : 'border-primary bg-black/30',
          )}
        >
          {success ? (
            <CheckCircle2 className="size-28 text-success" aria-hidden="true" />
          ) : (
            <>
              <Icon className="size-28 text-white" aria-hidden="true" />
              <span className="animate-scan-line absolute inset-x-4 h-1.5 rounded-full bg-primary shadow-[0_0_16px_4px_rgba(255,193,7,0.7)]" />
            </>
          )}
        </div>

        <h2 id="scan-title" className="text-balance text-3xl font-extrabold text-white" aria-live="polite">
          {success ? t.scanSuccess : mode === 'barcode' ? t.scanningBarcode : t.scanningThumb}
        </h2>
      </div>
    </div>
  )
}
