import { Table } from './index'

export default {
  name: 'Use cases',
  rows: [
    {
      heading: 'Real-time analytics ',
      subHeading:
        'External dashboards, product analytics, customer-facing applications',
      clickhouse: {
        value: true,
        label: '**Real-time analytics** with low latency'
      },
      snowflake: {
        value: false,
        label: 'Limited by latency and cost'
      }
    },
    {
      heading: 'Internal analytics and operational dashboards',
      clickhouse: {
        value: true,
        label: '**Internal dashboards** supported'
      },
      snowflake: {
        value: true,
        label: 'Best for batch workloads'
      }
    },
    {
      heading: 'Observability',
      subHeading: 'Logs, metrics, traces',
      clickhouse: {
        value: true,
        label: '**Native support via ClickStack**'
      },
      snowflake: {
        value: false,
        label: 'No viable solution; cost prohibitive'
      }
    },
    {
      heading: 'Streaming / continuous data ingestion',
      clickhouse: {
        value: true,
        label: '**Continuous ingestion** at scale'
      },
      snowflake: {
        value: true,
        label: 'Expensive at scale'
      }
    },
    {
      heading: 'GenAI / LLM agentic workloads',
      clickhouse: {
        value: true,
        label: '**Low-latency SQL over vectors + events**'
      },
      snowflake: {
        value: false,
        label: 'High-concurrency workloads not recommended'
      }
    }
  ]
} satisfies Table
