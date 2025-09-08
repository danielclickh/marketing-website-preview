import { Table } from './index'

export default {
  name: 'Performance',
  description: `ClickHouse is engineered for speed. Its vectorized execution engine, efficient memory usage, and native support for columnar compression deliver sub-second query performance - even at scale. Snowflake, while strong for long-running batch queries, often struggles to keep pace in real-time scenarios or under high concurrency without expensive compute configurations.

Recent benchmark results, including a public, join-heavy workload originally designed for Snowflake and Databricks - show that ClickHouse not only keeps up but outperforms Snowflake in speed and cost. With no tuning, schema changes, or query rewrites, ClickHouse completed complex multi-billion-row joins in a fraction of the time - and at a fraction of the cost.`,
  rows: [
    {
      heading: 'Vectorized query execution',
      clickhouse: {
        value: true,
        label: '**Vectorized execution engine**'
      },
      snowflake: {
        value: true,
        label: 'Vectorized execution supported'
      }
    },
    {
      heading: 'Sub-second query latency at scale',
      clickhouse: {
        value: true,
        label: '**Sub-second latency** at scale (no extra charges)'
      },
      snowflake: {
        value: false,
        label: 'Requires clustering + materialized views (enterprise tier)'
      }
    },
    {
      heading: 'Join performance',
      subHeading: 'Multi-billion rows',
      clickhouse: {
        value: true,
        label: '**Joins across billions of rows**'
      },
      snowflake: {
        value: true,
        label: 'Joins across billions of rows'
      }
    },
    {
      heading: 'High concurrency performance',
      clickhouse: {
        value: true,
        label: '**1,000+ concurrent queries per node**'
      },
      snowflake: {
        value: false,
        label: '8 QPS/warehouse default; needs multi-cluster scaling'
      }
    },
    {
      heading: 'Materialized view support',
      clickhouse: {
        value: true,
        label: '**Incremental & refreshable** with full SQL support'
      },
      snowflake: {
        value: false,
        label: 'Enterprise-only; refreshable with limited SQL'
      }
    },
    {
      heading: 'Native aggregate optimization',
      subHeading: 'Merge states, projections',
      clickhouse: {
        value: true,
        label: '**Merge states & projections** for fast aggregates'
      },
      snowflake: {
        value: false,
        label: 'Not supported'
      }
    },
    {
      heading: 'Compression efficiency',
      clickhouse: {
        value: true,
        label: '**38% better compression** in benchmarks'
      },
      snowflake: {
        value: false,
        label: 'Standard columnar compression'
      }
    },
    {
      heading: 'Dictionaries for dimension table acceleration',
      clickhouse: {
        value: true,
        label: '**Dictionary acceleration** for dimension tables'
      },
      snowflake: {
        value: false,
        label: 'Not supported'
      }
    }
  ]
} satisfies Table
