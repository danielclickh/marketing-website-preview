import { Table } from './index'

export default {
  name: 'Use cases',
  description: `ClickHouse is a high-performance analytics database used for real-time dashboards, product analytics, and observability - natively supported via [ClickStack](/use-cases/observability). With support for wide events, high compression, and fast aggregations, it delivers low-latency queries at scale and excels in high-concurrency scenarios, including agentic workflows.

Snowflake is built for batch analytics and BI. Strong for reporting, it lacks the cost efficiency, latency, and flexibility needed for real-time, agentic, or observability use cases.`,
  rows: [
    {
      heading: 'Real-time analytics ',
      subHeading:
        'External dashboards, product analytics, customer-facing applications',
      clickhouse: {
        icon: 'yes',
        label: '**Real-time analytics** with low latency'
      },
      snowflake: {
        icon: 'intermediate',
        label: 'Limited by latency and cost'
      }
    },
    {
      heading: 'Internal analytics and operational dashboards',
      clickhouse: {
        icon: 'yes',
        label: '**Internal dashboards** supported'
      },
      snowflake: {
        icon: 'yes',
        label: 'Best for batch workloads'
      }
    },
    {
      heading: 'Observability',
      subHeading: 'Logs, metrics, traces',
      clickhouse: {
        icon: 'yes',
        label: '**Native support via ClickStack**'
      },
      snowflake: {
        icon: 'no',
        label: 'No viable solution; cost prohibitive'
      }
    },
    {
      heading: 'Streaming / continuous data ingestion',
      clickhouse: {
        icon: 'yes',
        label: '**Continuous ingestion** at scale'
      },
      snowflake: {
        icon: 'intermediate',
        label: 'Expensive at scale'
      }
    },
    {
      heading: 'GenAI / LLM agentic workloads',
      clickhouse: {
        icon: 'yes',
        label: '**Low-latency SQL over vectors + events**'
      },
      snowflake: {
        icon: 'intermediate',
        label: 'High-concurrency workloads not recommended'
      }
    }
  ]
} satisfies Table
