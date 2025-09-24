import { Table } from './index'

export default {
  name: 'Performance',
  description: `ClickHouse delivers **sub-second latency** on **multi-billion-row dataset**s with vectorized execution, native aggregates, and dictionary acceleration. **Efficient compression reduces I/O**, while **flexible materialized views and granular cache controls** keep hot data instantly accessible for demanding workloads.

BigQuery simplifies infrastructure with a serverless model but depends on reserved slots for concurrency and upfront commitments at scale. It supports large joins and vectorized execution, yet typical latencies are 1–2 seconds. Materialized views have SQL limits, and caching is coarse - skipping broad segments rather than fine predicate-levels - making it better for batch and moderately interactive analytics.`,
  rows: [
    {
      heading: 'Dictionaries for dimension table acceleration',
      clickhouse: {
        icon: 'yes',
        label: '**Dictionary acceleration** for dimension tables'
      },
      bigquery: {
        icon: 'no',
        label: 'Not supported'
      }
    },
    {
      heading: 'Sub-second query latency at scale',
      clickhouse: {
        icon: 'yes',
        label: '**Sub-second latency** at scale'
      },
      bigquery: {
        icon: 'intermediate',
        label: 'Hard to achieve; minimal latency typically 1–2s'
      }
    },
    {
      heading: 'High concurrency performance',
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
      heading: 'Materialized view support',
      clickhouse: {
        icon: 'yes',
        label: '**Incremental & refreshable** with full SQL'
      },
      bigquery: {
        icon: 'intermediate',
        label:
          '[Significant SQL limitations](https://cloud.google.com/bigquery/docs/materialized-views-create#supported-mvs)'
      }
    },
    {
      heading: 'Native aggregate optimization',
      subHeading: 'Merge states, projections',
      clickhouse: {
        icon: 'yes',
        label: '**Merge states & projections** for fast aggregates'
      },
      bigquery: {
        icon: 'intermediate',
        label: 'Limited; only via materialized views'
      }
    },
    {
      heading: 'Compression efficiency',
      clickhouse: {
        icon: 'yes',
        label: '**60% better compression** in benchmarks'
      },
      bigquery: {
        icon: 'intermediate',
        label: 'Standard columnar compression'
      }
    },
    {
      heading: 'Vectorized query execution',
      clickhouse: {
        icon: 'yes',
        label: '**Vectorized execution supported**'
      },
      bigquery: {
        icon: 'yes',
        label: 'Vectorized execution supported'
      }
    },
    {
      heading: 'Join performance',
      subHeading: 'Multi-billion rows',
      clickhouse: {
        icon: 'yes',
        label: '**Efficient joins** across billions of rows'
      },
      bigquery: {
        icon: 'yes',
        label: 'Joins supported'
      }
    }
  ]
} satisfies Table
