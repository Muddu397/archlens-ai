'use client'

import type { FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2, Play } from 'lucide-react'

type AnalysisFormProps = {
  projectName: string
  description: string
  requirements: string
  isLoading: boolean
  onProjectNameChange: (value: string) => void
  onDescriptionChange: (value: string) => void
  onRequirementsChange: (value: string) => void
  onSubmit: () => void
}

const fieldClass =
  'w-full rounded-xl border border-input bg-card px-4 py-3 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30'

export function AnalysisForm({
  projectName,
  description,
  requirements,
  isLoading,
  onProjectNameChange,
  onDescriptionChange,
  onRequirementsChange,
  onSubmit,
}: AnalysisFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit()
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight text-card-foreground">
          Describe your architecture
        </h2>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          Provide context about your AWS setup and business goals. ArchLens AI returns a structured,
          multi-dimensional review.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="project-name" className="text-sm font-medium text-card-foreground">
            Project Name
          </label>
          <input
            id="project-name"
            type="text"
            value={projectName}
            onChange={(e) => onProjectNameChange(e.target.value)}
            placeholder="e.g. Orders Platform — Production"
            className={fieldClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-sm font-medium text-card-foreground">
            Architecture Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            rows={5}
            placeholder="Describe your services, data stores, networking, and how components connect (e.g. CloudFront → API Gateway → Lambda → RDS)."
            className={`${fieldClass} resize-y`}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="requirements" className="text-sm font-medium text-card-foreground">
            Business Requirements
          </label>
          <textarea
            id="requirements"
            value={requirements}
            onChange={(e) => onRequirementsChange(e.target.value)}
            rows={4}
            placeholder="Expected traffic, availability targets (e.g. 99.95%), compliance needs, and budget constraints."
            className={`${fieldClass} resize-y`}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={isLoading}
          className="mt-1 h-12 gap-2 rounded-xl text-base font-semibold"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Analyzing architecture…
            </>
          ) : (
            <>
              <Play className="h-4 w-4" aria-hidden="true" />
              Analyze Architecture
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
