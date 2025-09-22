import { Table } from './index'

export default {
  name: 'Use cases',
  description: `**ClickHouse shines in real-time, high-frequency workloads**, powering external dashboards, product analytics, and customer-facing apps with **sub-second responses**. Its **native support for logs, metrics, and traces (via ClickStack)** makes it a natural fit for observability, while efficient streaming keeps costs low even at scale. With optimizations like projections, dictionaries, and fine-grained caching, ClickHouse is also ideal for **GenAI agentic and vector workloads** demanding fast, high-volume queries.

**BigQuery is well-suited for internal analytics and periodic workloads**, benefiting from its managed environment and straightforward scaling. However, use cases requiring **low-latency, high-concurrency reads**—such as real-time product analytics, observability, or GenAI agentic interactions—can face challenges due to **baseline query delays** and **higher costs for continuous ingestion and data writes**. Basic caching and limited support for materialized view SQL further shape it towards batch or moderately interactive scenarios.`,
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
        label: '**Approximate & exact vector search**'
      },
      bigquery: {
        icon: 'yes',
        label: 'Vector search supported'
      }
    }
  ]
} satisfies Table
