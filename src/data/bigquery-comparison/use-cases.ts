import { Table } from './index'

export default {
  name: 'Use cases',
  description: `ClickHouse shines at real-time, **high-frequency workloads,** powering **dashboards**, product **analytics**, and **customer apps** with **sub-second responses**. Native support for logs, metrics, and traces (via ClickStack) makes it a **strong fit for observability** Optimizations like projections, dictionaries, and fine-grained caching also make it ideal for **GenAI agentic and vector workloads** needing fast, high-volume queries.

BigQuery fits internal analytics and operational dashboards, with managed scaling for periodic workloads. But low-latency, high-concurrency use cases, like product analytics, observability, or GenAI agents will struggle with baseline query delays and costly continuous ingestion. Basic caching and SQL-limited materialized views further orient it toward batch scenarios.`,
  rows: [
    {
      heading: 'Real-time analytics',
      subHeading:
        'External dashboards, product analytics, customer-facing applications',
      clickhouse: {
        icon: 'yes',
        label: '**Real-time analytics** with low latency'
      },
      bigquery: {
        icon: 'intermediate',
        label: 'Limited by minimum latency and cost'
      }
    },
    {
      heading: 'Observability',
      subHeading: 'Logs, metrics, traces',
      clickhouse: {
        icon: 'yes',
        label: '**Native support via ClickStack**'
      },
      bigquery: {
        icon: 'intermediate',
        label: 'Charges for data writes make this expensive'
      }
    },
    {
      heading: 'Streaming / continuous data ingestion',
      clickhouse: {
        icon: 'yes',
        label: '**Continuous ingestion** at scale'
      },
      bigquery: {
        icon: 'intermediate',
        label: 'Expensive at scale'
      }
    },
    {
      heading: 'GenAI / LLM agentic workloads',
      clickhouse: {
        icon: 'yes',
        label: '**Low-latency SQL over events**'
      },
      bigquery: {
        icon: 'intermediate',
        label: 'Minimum latency slows agentic responses'
      }
    },
    {
      heading: 'Internal analytics and operational dashboards',
      clickhouse: {
        icon: 'yes',
        label: '**Internal dashboards** supported'
      },
      bigquery: {
        icon: 'yes',
        label: 'Internal dashboards supported'
      }
    },
    {
      heading: 'Vector search',
      clickhouse: {
        icon: 'yes',
        label: '**Vector search supported**'
      },
      bigquery: {
        icon: 'yes',
        label: 'Vector search supported'
      }
    }
  ]
} satisfies Table
