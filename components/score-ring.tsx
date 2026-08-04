'use client'

import { useEffect, useState } from 'react'

type ScoreRingProps = {
  score: number
  size?: number
  strokeWidth?: number
}

export function ScoreRing({ score, size = 180, strokeWidth = 14 }: ScoreRingProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setProgress(score))
    return () => cancelAnimationFrame(frame)
  }, [score])

  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  const rating = score >= 85 ? 'Production ready' : score >= 70 ? 'Nearly ready' : 'Needs work'

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`Production readiness score ${score} out of 100`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--muted)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--primary)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.22, 1, 0.36, 1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="flex items-baseline gap-0.5">
          <span className="text-4xl font-bold tabular-nums text-foreground">{score}</span>
          <span className="text-lg font-medium text-muted-foreground">/100</span>
        </div>
        <span className="mt-1 text-xs font-semibold uppercase tracking-wide text-accent">
          {rating}
        </span>
      </div>
    </div>
  )
}
