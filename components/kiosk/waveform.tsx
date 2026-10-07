import { cn } from '@/lib/utils'

const BAR_HEIGHTS = [40, 70, 55, 90, 65, 100, 75, 50, 85, 60, 95, 45, 80, 55, 70, 40, 90, 60, 75, 50]

export function Waveform({
  active,
  bars = BAR_HEIGHTS.length,
  className,
  barClassName,
}: {
  active: boolean
  bars?: number
  className?: string
  barClassName?: string
}) {
  return (
    <div className={cn('flex h-16 items-center gap-1.5', className)} aria-hidden="true">
      {BAR_HEIGHTS.slice(0, bars).map((h, i) => (
        <span
          key={i}
          className={cn(
            'w-2 rounded-full bg-primary transition-all',
            active ? 'animate-wave-bar' : 'opacity-40',
            barClassName,
          )}
          style={{
            height: `${active ? h : 18}%`,
            animationDelay: `${(i % 7) * 0.11}s`,
          }}
        />
      ))}
    </div>
  )
}
