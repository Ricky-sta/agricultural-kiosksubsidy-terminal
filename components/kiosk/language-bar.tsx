import { Languages } from 'lucide-react'
import { LANGUAGES, type LangCode } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export function LanguageBar({ lang, onSelect }: { lang: LangCode; onSelect: (l: LangCode) => void }) {
  return (
    <div role="group" aria-label="Change language" className="flex flex-wrap items-center gap-3">
      <Languages className="size-9 text-primary" aria-hidden="true" />
      {LANGUAGES.map((l) => (
        <button
          key={l.code}
          type="button"
          lang={l.code}
          onClick={() => onSelect(l.code)}
          aria-pressed={l.code === lang}
          className={cn(
            'min-h-14 rounded-xl border-2 px-5 text-2xl font-bold transition-colors',
            l.code === lang
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-white/30 bg-card text-white hover:border-primary',
          )}
        >
          {l.native}
        </button>
      ))}
    </div>
  )
}
