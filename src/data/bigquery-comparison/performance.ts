import { Table } from './index'

export default {
  name: 'Performance',
  description: `ClickHouse is built for ultra-fast analytics at scale, delivering sub-second query latency on multi-billion-row datasets through vectorized execution, native aggregate optimizations, and dictionary acceleration. Its highly efficient compression reduces I/O by up to 60%, while incremental, fully flexible materialized views and granular cache controls keep hot data instantly accessible, ensuring consistent speed for demanding workloads.

BigQuery’s serverless model simplifies infrastructure but relies on reserved slots for concurrency, often requiring upfront commitments to handle high query volumes. While it supports large joins and vectorized execution, typical latencies start at 1–2 seconds. Its materialized views have notable SQL constraints, and caching is coarse, primarily skipping broad data segments without fine predicate-level tuning, making it more suited to batch and moderately interactive analytics.`,
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
      subHeading: 'merge states, projections',
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
        label: '**Vectorized execution engine**'
      },
      bigquery: {
        icon: 'yes',
        label: 'Vectorized execution supported'
      }
    },
    {
      heading: 'Join performance',
      subHeading: 'multi-billion rows',
      clickhouse: {
        icon: 'yes',
        label: '**Efficient joins** across billions of rows'
      },
      bigquery: {
        icon: 'yes',
        label: 'Joins supported at scale'
      }
    }
  ]
} satisfies Table
