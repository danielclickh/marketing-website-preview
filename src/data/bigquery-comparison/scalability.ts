import { Table } from './index'

export default {
  name: 'Scalability',
  description: `Both BigQuery and ClickHouse scale effectively, but with different levels of control exposed to the user. ClickHouse offers precise control over scaling with workload quotas, manual and automatic vertical and horizontal scaling, custom hardware profiles, and rapid resume from idle. It supports up to 1,000 concurrent queries per node providing granular cache control down to predicate-level reuse - ideal for high-concurrency, low-latency analytics.

Conversely, BigQuery excels at elastic scaling for large, batch-style analytical jobs by dynamically allocating slots. However, this comes with less transparency and control: concurrency is tied to slot reservations, there’s no vertical tuning or custom hardware selection, with caching primarily aiding data skipping without fine predicate reuse. This makes BigQuery’s scalability well-suited to high-throughput, large-scale workloads, but less tailored for workloads needing consistent high concurrency and predictable performance.`,
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
      subHeading: 'up/down with load',
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
