'use client'

import { useEffect, useState } from 'react'

export function LiveClock() {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const time = now
    ? now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })
    : '--:--:--'
  const date = now
    ? now.toLocaleDateString('en-IN', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })
    : '—'

  return (
    <div className="flex flex-col items-end leading-tight" aria-live="off">
      <time className="font-mono text-3xl font-bold tabular-nums text-white" dateTime={now?.toISOString()}>
        {time}
      </time>
      <span className="text-base font-medium text-muted-foreground">{date} · IST</span>
    </div>
  )
}
