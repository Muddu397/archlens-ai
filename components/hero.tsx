import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'

const highlights = ['Security', 'Scalability', 'Reliability', 'Cost', 'Production readiness']

export function Hero({ onAnalyze }: { onAnalyze?: () => void }) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,153,0,0.10),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-28">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3.5 py-1.5 text-xs font-semibold text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
          Review before you deploy
        </span>

        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight text-foreground text-balance sm:text-6xl">
          ArchLens AI
        </h1>
        <p className="mx-auto mt-4 text-lg font-medium text-accent sm:text-xl">
          AI-powered AWS Architecture Review Assistant
        </p>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty">
          Get a structured review of your AWS architecture with security, scalability, reliability,
          cost optimization, and production readiness insights powered by Amazon Bedrock.
        </p>

        <div className="mt-8 flex items-center justify-center">
          <Button
            size="lg"
            onClick={onAnalyze}
            className="h-12 gap-2 rounded-xl px-7 text-base font-semibold"
          >
            Analyze Architecture
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-muted-foreground">
          {highlights.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
