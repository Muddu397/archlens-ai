import type { LucideIcon } from 'lucide-react'
import {
  FileText,
  ShieldCheck,
  TrendingUp,
  Activity,
  DollarSign,
  PackagePlus,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react'

export type Severity = 'good' | 'warning' | 'critical' | 'info'

export type ReviewFinding = {
  label: string
  detail: string
  severity: Severity
}

export type ReviewSection = {
  id: string
  title: string
  icon: LucideIcon
  summary: string
  findings: ReviewFinding[]
}

export const productionReadinessScore = 82

export const reviewSections: ReviewSection[] = [
  {
    id: 'summary',
    title: 'Architecture Summary',
    icon: FileText,
    summary:
      'A three-tier serverless web application fronted by Amazon CloudFront and API Gateway, with AWS Lambda compute and an Amazon RDS PostgreSQL backend across two Availability Zones.',
    findings: [
      {
        label: 'Compute',
        detail: 'AWS Lambda functions behind API Gateway with provisioned concurrency on hot paths.',
        severity: 'info',
      },
      {
        label: 'Data layer',
        detail: 'Amazon RDS PostgreSQL (Multi-AZ) with Amazon ElastiCache for read caching.',
        severity: 'info',
      },
      {
        label: 'Edge & delivery',
        detail: 'Static assets served from Amazon S3 via CloudFront with TLS termination.',
        severity: 'info',
      },
    ],
  },
  {
    id: 'security',
    title: 'Security Review',
    icon: ShieldCheck,
    summary:
      'Overall posture is solid with IAM least-privilege in place, but secrets handling and edge protection need attention before go-live.',
    findings: [
      {
        label: 'IAM roles scoped per function',
        detail: 'Each Lambda uses a dedicated execution role with least-privilege policies.',
        severity: 'good',
      },
      {
        label: 'Secrets stored in environment variables',
        detail: 'Move database credentials to AWS Secrets Manager with automatic rotation.',
        severity: 'warning',
      },
      {
        label: 'No WAF on public endpoints',
        detail: 'Attach AWS WAF to CloudFront and API Gateway to mitigate common web exploits.',
        severity: 'critical',
      },
    ],
  },
  {
    id: 'scalability',
    title: 'Scalability Analysis',
    icon: TrendingUp,
    summary:
      'Serverless compute scales horizontally on demand, but the relational database is a likely bottleneck under spiky write load.',
    findings: [
      {
        label: 'Stateless Lambda tier',
        detail: 'Compute scales automatically with request volume — no manual capacity planning needed.',
        severity: 'good',
      },
      {
        label: 'RDS connection limits',
        detail: 'Introduce Amazon RDS Proxy to pool connections and avoid exhaustion during bursts.',
        severity: 'warning',
      },
      {
        label: 'Single write primary',
        detail: 'Consider Aurora Serverless v2 for elastic write scaling as traffic grows.',
        severity: 'info',
      },
    ],
  },
  {
    id: 'reliability',
    title: 'Reliability Assessment',
    icon: Activity,
    summary:
      'Multi-AZ deployment provides good baseline availability, though the design is not yet resilient to a full regional failure.',
    findings: [
      {
        label: 'Multi-AZ database',
        detail: 'Automatic failover configured across two Availability Zones.',
        severity: 'good',
      },
      {
        label: 'No cross-region DR',
        detail: 'Add cross-region read replicas and an S3 replication strategy for disaster recovery.',
        severity: 'warning',
      },
      {
        label: 'Retries without backoff',
        detail: 'Implement exponential backoff and dead-letter queues on asynchronous invocations.',
        severity: 'warning',
      },
    ],
  },
  {
    id: 'cost',
    title: 'Cost Optimization',
    icon: DollarSign,
    summary:
      'Pay-per-use serverless keeps idle costs low, with a few opportunities to trim spend on always-on resources.',
    findings: [
      {
        label: 'Right-size provisioned concurrency',
        detail: 'Current provisioned concurrency exceeds observed p95 traffic — reduce by ~30%.',
        severity: 'warning',
      },
      {
        label: 'S3 lifecycle policies',
        detail: 'Transition infrequently accessed objects to S3 Intelligent-Tiering.',
        severity: 'info',
      },
      {
        label: 'Savings Plans',
        detail: 'Estimated 22% savings by committing to a 1-year Compute Savings Plan.',
        severity: 'good',
      },
    ],
  },
  {
    id: 'missing-services',
    title: 'Missing AWS Services',
    icon: PackagePlus,
    summary:
      'Several managed services would close observability and security gaps with minimal engineering effort.',
    findings: [
      {
        label: 'AWS WAF',
        detail: 'Protect public endpoints from SQL injection and cross-site scripting.',
        severity: 'critical',
      },
      {
        label: 'Amazon CloudWatch Alarms',
        detail: 'No proactive alerting on error rates or latency thresholds.',
        severity: 'warning',
      },
      {
        label: 'AWS X-Ray',
        detail: 'Enable distributed tracing across API Gateway and Lambda for faster debugging.',
        severity: 'info',
      },
    ],
  },
  {
    id: 'risks',
    title: 'Potential Risks',
    icon: AlertTriangle,
    summary:
      'The most pressing risks concentrate around the data tier and the unprotected public surface area.',
    findings: [
      {
        label: 'Unprotected public API',
        detail: 'Without WAF and rate limiting, the API is exposed to abuse and DDoS.',
        severity: 'critical',
      },
      {
        label: 'Database connection exhaustion',
        detail: 'Traffic spikes can exhaust RDS connections and cause cascading failures.',
        severity: 'warning',
      },
      {
        label: 'Missing backup validation',
        detail: 'Backups are enabled but restores have never been tested end to end.',
        severity: 'warning',
      },
    ],
  },
  {
    id: 'recommendations',
    title: 'Recommendations',
    icon: Lightbulb,
    summary:
      'Prioritized next steps to move the architecture from "good" to "production-grade" before launch.',
    findings: [
      {
        label: 'Attach AWS WAF',
        detail: 'Deploy managed rule groups to CloudFront and API Gateway this sprint.',
        severity: 'critical',
      },
      {
        label: 'Adopt RDS Proxy',
        detail: 'Pool database connections to protect against burst-driven exhaustion.',
        severity: 'good',
      },
      {
        label: 'Add CloudWatch dashboards & alarms',
        detail: 'Instrument error rate, latency, and saturation with actionable alerts.',
        severity: 'good',
      },
    ],
  },
]
