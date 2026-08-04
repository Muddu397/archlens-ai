import { ScanEye } from 'lucide-react'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground text-primary">
            <ScanEye className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-lg font-semibold tracking-tight text-foreground">
            ArchLens<span className="text-primary"> AI</span>
          </span>
        </div>
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground sm:flex">
          <a className="transition-colors hover:text-foreground" href="#analyze">
            Analyze
          </a>
          <a className="transition-colors hover:text-foreground" href="#results">
            Results
          </a>
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-muted-foreground">
            Powered by Amazon Bedrock
          </span>
        </nav>
      </div>
    </header>
  )
}
