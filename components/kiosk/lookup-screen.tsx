import { ArrowLeft, Search, Sprout, UserRound } from 'lucide-react'
import type { Dict } from '@/lib/i18n'

export function LookupScreen({
  t,
  appId,
  onAppIdChange,
  onBack,
  onRun,
}: {
  t: Dict
  appId: string
  onAppIdChange: (v: string) => void
  onBack: () => void
  onRun: () => void
}) {
  return (
    <section aria-labelledby="lookup-heading" className="mx-auto flex w-full max-w-5xl flex-col gap-8">
      <div>
        <h1 id="lookup-heading" className="text-4xl font-extrabold text-white">
          {t.lookupTitle}
        </h1>
        <p className="mt-3 text-pretty text-2xl text-muted-foreground">{t.lookupHint}</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          onRun()
        }}
        className="flex flex-col gap-8 rounded-3xl border-4 border-white/25 bg-card p-8"
      >
        <div className="flex flex-col gap-3">
          <label htmlFor="app-id" className="text-2xl font-bold text-primary">
            {t.appIdLabel}
          </label>
          <input
            id="app-id"
            value={appId}
            onChange={(e) => onAppIdChange(e.target.value.toUpperCase())}
            inputMode="text"
            autoComplete="off"
            spellCheck={false}
            className="h-24 rounded-2xl border-4 border-primary bg-white px-6 font-mono text-4xl font-bold tracking-wider text-primary-foreground outline-none"
          />
        </div>

        <dl className="grid gap-5 md:grid-cols-2">
          <InfoRow icon={UserRound} label={t.farmerLabel} value={t.farmerName} />
          <InfoRow icon={Sprout} label={t.schemeLabel} value={t.schemeName} />
        </dl>

        <button
          type="submit"
          disabled={!appId.trim()}
          className="flex min-h-28 items-center justify-center gap-5 rounded-3xl border-4 border-white bg-success px-8 text-3xl font-extrabold text-[#052e16] transition-transform hover:scale-[1.01] active:scale-95 disabled:opacity-50"
        >
          <Search className="size-12" aria-hidden="true" />
          {t.runDiagnostic}
        </button>
      </form>

      <button
        type="button"
        onClick={onBack}
        className="flex min-h-20 w-fit items-center gap-3 rounded-2xl border-4 border-white/40 px-8 text-2xl font-bold text-white hover:border-white"
      >
        <ArrowLeft className="size-8" aria-hidden="true" />
        {t.back}
      </button>
    </section>
  )
}

function InfoRow({ icon: Icon, label, value }: { icon: typeof Sprout; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-surface p-5">
      <Icon className="size-10 shrink-0 text-primary" aria-hidden="true" />
      <div>
        <dt className="text-lg font-medium text-muted-foreground">{label}</dt>
        <dd className="text-2xl font-bold text-white">{value}</dd>
      </div>
    </div>
  )
}
