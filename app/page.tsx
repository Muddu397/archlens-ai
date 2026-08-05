'use client'

import { useRef, useState } from 'react'
import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { AnalysisForm } from '@/components/analysis-form'
import { ResultsSection } from '@/components/results-section'
import { Loader2 } from 'lucide-react'
import type { ReviewResponse } from '@/lib/types'

export default function Page() {
  const [projectName, setProjectName] = useState('')
  const [description, setDescription] = useState('')
  const [requirements, setRequirements] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const [hasResults, setHasResults] = useState(false)

  const [review, setReview] = useState<ReviewResponse | null>(null)

  const formRef = useRef<HTMLDivElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  function scrollToForm() {
    formRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  async function handleAnalyze() {
    try {
      setIsLoading(true)
      setHasResults(false)
      setReview(null)

      const response = await fetch('/api/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectName,
          architecture: description,
          businessRequirements: requirements,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to analyze architecture.')
      }

      const data: ReviewResponse = await response.json()

      console.log('Review Response:', data)

      setReview(data)
      setHasResults(true)

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }, 100)
    } catch (error) {
      console.error(error)
      alert('Unable to analyze architecture.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />

      <Hero onAnalyze={scrollToForm} />

      <section
        id="analyze"
        ref={formRef}
        className="mx-auto max-w-3xl px-4 py-16 sm:px-6"
      >
        <AnalysisForm
          projectName={projectName}
          description={description}
          requirements={requirements}
          isLoading={isLoading}
          onProjectNameChange={setProjectName}
          onDescriptionChange={setDescription}
          onRequirementsChange={setRequirements}
          onSubmit={handleAnalyze}
        />
      </section>

      {isLoading && (
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 pb-24 text-center sm:px-6">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15">
            <Loader2
              className="h-7 w-7 animate-spin text-primary"
              aria-hidden="true"
            />
          </span>

          <div>
            <p className="text-lg font-semibold text-foreground">
              Reviewing your architecture
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Amazon Bedrock is evaluating security, scalability,
              reliability, cost optimization and production readiness...
            </p>
          </div>
        </div>
      )}

      {hasResults && review && (
        <div
          ref={resultsRef}
          className="scroll-mt-16"
        >
          <ResultsSection
            projectName={projectName}
            review={review}
          />
        </div>
      )}

      <footer className="border-t border-border bg-secondary/40">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <p>
            <span className="font-semibold text-foreground">
              ArchLens AI
            </span>{' '}
            — AWS Architecture Review Assistant
          </p>

          <p>Powered by Amazon Bedrock</p>
        </div>
      </footer>
    </main>
  )
}