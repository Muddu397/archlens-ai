export type Severity = "good" | "review" | "critical" | "info"

export interface ReviewItem {
  title: string
  severity: Severity
  description: string
}

export interface ArchitecturePattern {
  name: string
  confidence: number
  reason: string
}

export interface ReviewResponse {
  production_readiness_score: number

  architecture_summary: string

  architecture_pattern: ArchitecturePattern

  strengths: string[]

  security_review: ReviewItem[]

  scalability_analysis: ReviewItem[]

  reliability_assessment: ReviewItem[]

  cost_optimization: ReviewItem[]

  missing_aws_services: ReviewItem[]

  potential_risks: ReviewItem[]

  recommendations: ReviewItem[]
}