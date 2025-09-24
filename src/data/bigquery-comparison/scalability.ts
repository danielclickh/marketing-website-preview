import { Table } from './index'

export default {
  name: 'Scalability',
  description: `ClickHouse provides fine-grained scaling control with workload quotas, **vertical and horizontal scaling** (manual or automatic), **custom hardware profiles**, and rapid resume from idle. It supports **1,000+ concurrent queries per node** with predicate-level cache reuse \\- ideal for high-concurrency, low-latency analytics.

BigQuery scales elastically for large batch jobs by dynamically allocating slots, but with less transparency and control. Concurrency depends on slot reservations, there’s no vertical tuning or custom hardware choice, and caching mainly aids data skipping. This suits high-throughput batch workloads, but not workloads needing consistent concurrency and predictable performance.`,
  rows: [
    {
      heading: 'Auto-resume from idle',
      clickhouse: {
        icon: 'yes',
        label: '**Seconds**'
      },
      bigquery: {
        icon: 'no',
        label: 'N/A (no concept of idling)'
      }
    },
    {
      heading: 'Vertical and horizontal scaling',
      clickhouse: {
        icon: 'yes',
        label: 'Includes **vertical scaling** for high-memory queries'
      },
      bigquery: {
        icon: 'no',
        label: 'N/A (slots only; no user visibility)'
      }
    },
    {
      heading: 'Custom hardware profiles for priority workloads',
      clickhouse: {
        icon: 'yes',
        label: '**Custom hardware profiles** supported'
      },
      bigquery: {
        icon: 'no',
        label: 'Not supported'
      }
    },
    {
      heading: 'Manual resizing',
      clickhouse: {
        icon: 'yes',
        label: '**Manual resize** supported'
      },
      bigquery: {
        icon: 'no',
        label: 'N/A'
      }
    },
    {
      heading: 'Granular cache control',
      clickhouse: {
        icon: 'yes',
        label: '**Predicate-level cache control** (node + distributed)'
      },
      bigquery: {
        icon: 'no',
        label: 'Can only skip'
      }
    },
    {
      heading: 'Control over elastic scaling and resources used',
      clickhouse: {
        icon: 'yes',
        label: '**Quotas, scaling limits, workload scheduling**'
      },
      bigquery: {
        icon: 'intermediate',
        label: 'Requires reserved slots'
      }
    },
    {
      heading: 'High query concurrency per node',
      clickhouse: {
        icon: 'yes',
        label: '**Up to 1,000 concurrent queries per node**'
      },
      bigquery: {
        icon: 'intermediate',
        label:
          'Concurrency limited by reserved slots; low without large reservations'
      }
    },
    {
      heading: 'Elastic scaling',
      subHeading: 'Up/down with load',
      clickhouse: {
        icon: 'yes',
        label: '**Elastic scaling** up/down with load'
      },
      bigquery: {
        icon: 'yes',
        label: 'Slots dynamically allocated'
      }
    },
    {
      heading: 'Compute compute separation',
      clickhouse: {
        icon: 'yes',
        label: '**Compute/storage separation**'
      },
      bigquery: {
        icon: 'yes',
        label: 'Compute/storage separation'
      }
    },
    {
      heading: 'Distributed cache across warehouse',
      clickhouse: {
        icon: 'yes',
        label: '**Distributed cache** across nodes'
      },
      bigquery: {
        icon: 'yes',
        label: 'Distributed cache supported'
      }
    }
  ]
} satisfies Table
