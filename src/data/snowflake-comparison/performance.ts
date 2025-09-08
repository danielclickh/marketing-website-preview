import { Table } from './index'

export default {
  name: 'Performance',
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
