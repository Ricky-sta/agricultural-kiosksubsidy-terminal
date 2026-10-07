import { Fragment } from 'react'
import { ArrowDown, ArrowRight, Building2, FileText, Landmark } from 'lucide-react'
import type { Dict } from '@/lib/i18n'

export function RoadmapCard({ t }: { t: Dict }) {
  const steps = [
    { Icon: Building2, label: t.step1Label, text: t.step1 },
    { Icon: FileText, label: t.step2Label, text: t.step2 },
    { Icon: Landmark, label: t.step3Label, text: t.step3 },
  ]

  return (
    <article aria-labelledby="roadmap-title" className="flex flex-col gap-6 rounded-3xl border-4 border-success bg-[#0b6b3e] p-7">
      <div>
        <p className="text-lg font-bold uppercase tracking-wide text-white/85">{t.roadmapTag}</p>
        <h2 id="roadmap-title" className="text-3xl font-extrabold text-white">
          {t.roadmapTitle}
        </h2>
      </div>

      <ol className="flex flex-col items-stretch gap-4 lg:flex-row lg:items-center">
        {steps.map(({ Icon, label, text }, i) => (
          <Fragment key={label}>
            <li className="flex flex-1 flex-col items-center gap-4 rounded-3xl bg-white p-6 text-center text-primary-foreground">
              <div className="flex items-center gap-4">
                <span className="flex size-16 items-center justify-center rounded-full bg-primary text-4xl font-extrabold">
                  {i + 1}
                </span>
                <span className="flex size-20 items-center justify-center rounded-2xl bg-background">
                  <Icon className="size-12 text-primary" aria-hidden="true" />
                </span>
              </div>
              <p className="text-lg font-bold uppercase tracking-wide text-[#0b6b3e]">{label}</p>
              <p className="text-balance text-2xl font-extrabold leading-snug">{text}</p>
            </li>
            {i < steps.length - 1 && (
              <li aria-hidden="true" className="flex shrink-0 justify-center">
                <ArrowRight className="animate-arrow-nudge hidden size-16 text-primary drop-shadow-[0_0_12px_rgba(255,193,7,0.9)] lg:block" strokeWidth={3} />
                <ArrowDown className="size-14 text-primary drop-shadow-[0_0_12px_rgba(255,193,7,0.9)] lg:hidden" strokeWidth={3} />
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </article>
  )
}
