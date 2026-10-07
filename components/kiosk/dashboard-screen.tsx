import { ArrowLeft, RotateCcw } from 'lucide-react'
import type { Dict, LangCode } from '@/lib/i18n'
import { StalledCard } from './cards/stalled-card'
import { CameraCard } from './cards/camera-card'
import { AdvisoryCard } from './cards/advisory-card'
import { RoadmapCard } from './cards/roadmap-card'
import { RoutingPanel } from './cards/routing-panel'

export function DashboardScreen({
  t,
  lang,
  appId,
  onBack,
  onFinish,
}: {
  t: Dict
  lang: LangCode
  appId: string
  onBack: () => void
  onFinish: () => void
}) {
  return (
    <section aria-label={t.stepResult} className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-2xl font-bold text-white">
          {t.appIdLabel}: <span className="font-mono text-primary">{appId}</span>
          <span className="ml-4 text-muted-foreground">· {t.farmerName}</span>
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <StalledCard t={t} lang={lang} />
        </div>
        <div className="xl:col-span-4">
          <CameraCard t={t} />
        </div>
        <div className="xl:col-span-12">
          <AdvisoryCard t={t} />
        </div>
        <div className="xl:col-span-12">
          <RoadmapCard t={t} />
        </div>
        <div className="xl:col-span-12">
          <RoutingPanel t={t} />
        </div>
      </div>

      <div className="flex flex-wrap justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex min-h-20 items-center gap-3 rounded-2xl border-4 border-white/40 px-8 text-2xl font-bold text-white hover:border-white"
        >
          <ArrowLeft className="size-8" aria-hidden="true" />
          {t.back}
        </button>
        <button
          type="button"
          onClick={onFinish}
          className="flex min-h-20 items-center gap-3 rounded-2xl bg-white px-8 text-2xl font-extrabold text-primary-foreground active:scale-95"
        >
          <RotateCcw className="size-8" aria-hidden="true" />
          {t.newSession}
        </button>
      </div>
    </section>
  )
}
