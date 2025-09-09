import { Table } from './index'

export default {
  name: 'Performance',
  description: `ClickHouse is engineered for speed. Its vectorized engine, efficient memory use, and columnar compression deliver sub-second queries at scale. Snowflake, while strong for long batch jobs, struggles in real-time or high-concurrency scenarios without costly compute

Public benchmarks, including a join-heavy workload built for Snowflake and Databricks, show ClickHouse not only matching but outperforming on speed and cost. Without tuning or schema changes, it executed multi-billion-row joins in a fraction of the time and cost.`,
  rows: [
    {
      heading: 'Sub-second query latency at scale',
      clickhouse: {
        icon: 'yes',
        label: '**Sub-second latency** at scale (no extra charges)'
      },
      snowflake: {
        icon: 'intermediate',
        label: 'Requires clustering + materialized views (enterprise tier)'
      }
    },
    {
      heading: 'Join performance',
      subHeading: 'Multi-billion rows',
      clickhouse: {
        icon: 'yes',
        label: '**Joins across billions of rows**'
      },
      snowflake: {
        icon: 'yes',
        label: 'Joins across billions of rows'
      }
    },
    {
      heading: 'High concurrency performance',
      clickhouse: {
        icon: 'yes',
        label: '**1,000+ concurrent queries per node**'
      },
      snowflake: {
        icon: 'intermediate',
        label: '8 QPS/warehouse default; needs multi-cluster scaling'
      }
    },
    {
      heading: 'Materialized view support',
      clickhouse: {
        icon: 'yes',
        label: '**Incremental & refreshable** with full SQL support'
      },
      snowflake: {
        icon: 'intermediate',
        label: 'Enterprise-only; refreshable with limited SQL'
      }
    },
    {
      heading: 'Native aggregate optimization',
      subHeading: 'Merge states, projections',
      clickhouse: {
        icon: 'yes',
        label: '**Merge states & projections** for fast aggregates'
      },
      snowflake: {
        icon: 'no',
        label: 'Not supported'
      }
    },
    {
      heading: 'Data compression',
      clickhouse: {
        icon: 'yes',
        label: '**38% better compression** in benchmarks'
      },
      snowflake: {
        icon: 'intermediate',
        label: 'Standard columnar compression'
      }
    },
    {
      heading: 'Dictionaries for dimension table acceleration',
      clickhouse: {
        icon: 'yes',
        label: '**Dictionary acceleration** for dimension tables'
      },
      snowflake: {
        icon: 'no',
        label: 'Not supported'
      }
    }
  ]
} satisfies Table
