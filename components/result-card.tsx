import { Check, AlertTriangle, XCircle, Info } from 'lucide-react'
import type { ReviewSection, Severity } from '@/lib/review-data'

const severityConfig: Record<
  Severity,
  { icon: typeof Check; dot: string; label: string; badge: string }
> = {
  good: {
    icon: Check,
    dot: 'text-[#59ba00]',
    label: 'Good',
    badge: 'bg-[#59ba00]/10 text-[#3d7d00]',
  },
  warning: {
    icon: AlertTriangle,
    dot: 'text-primary',
    label: 'Review',
    badge: 'bg-primary/15 text-[#9a5b00]',
  },
  critical: {
    icon: XCircle,
    dot: 'text-destructive',
    label: 'Critical',
    badge: 'bg-destructive/10 text-destructive',
  },
  info: {
    icon: Info,
    dot: 'text-accent',
    label: 'Info',
    badge: 'bg-accent/10 text-accent',
  },
}

export function ResultCard({ section }: { section: ReviewSection }) {
  const Icon = section.icon

  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-[#9a5b00]">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <h3 className="text-lg font-semibold text-card-foreground text-balance">{section.title}</h3>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{section.summary}</p>

      <ul className="mt-5 flex flex-col gap-3 border-t border-border pt-5">
        {section.findings.map((finding) => {
          const config = severityConfig[finding.severity]
          const FindingIcon = config.icon
          return (
            <li key={finding.label} className="flex gap-3">
              <FindingIcon className={`mt-0.5 h-4 w-4 shrink-0 ${config.dot}`} aria-hidden="true" />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-card-foreground">{finding.label}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${config.badge}`}
                  >
                    {config.label}
                  </span>
                </div>
                <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                  {finding.detail}
                </p>
              </div>
            </li>
          )
        })}
      </ul>
    </article>
  )
}
