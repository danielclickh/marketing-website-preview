import { Table } from './index'

export default {
  name: 'Performance',
  description: `ClickStack, built on ClickHouse, is engineered for speed. Its **vectorized engine**, **columnar compression**, and efficient memory use deliver **sub-second aggregations on high-cardinality data at petabyte scale** - critical for observability workloads. Elastic, **designed for search**, struggles with analytics: aggregations are slow at scale, term aggregations approximate, and indexing competes with queries for resources in open-source.

[Benchmarks](/blog/json-bench-clickhouse-vs-mongodb-elasticsearch-duckdb-postgresql) and [user reports](/videos/netflix-july-1) show ClickHouse outperforming Elasticsearch by 1**0–100x on analytics** with at least **2x better compression**. Without tuning or schema changes, it handles complex aggregations and joins across billions of rows at a fraction of the time and cost.`,
  rows: [
    {
      heading: 'Join performance',
      subHeading: 'Multi-billion rows',
      clickhouse: {
        icon: 'yes',
        label: '**Efficient joins** across billions of rows'
      },
      elastic: { icon: 'no', label: 'Not supported' }
    },
    {
      heading: 'High data compression',
      clickhouse: { icon: 'yes', label: '**High compression** built-in' },
      elastic: { icon: 'intermediate', label: 'Only source is compressed' }
    },
    {
      heading: 'Support for high cardinality aggregations',
      clickhouse: { icon: 'yes', label: '**Accurate aggregations** at scale' },
      elastic: { icon: 'intermediate', label: 'Approximate only' }
    },
    {
      heading: 'High concurrency performance',
      clickhouse: {
        icon: 'yes',
        label: '**1,000+ concurrent queries per node**'
      },
      elastic: {
        icon: 'yes',
        label: 'Supported'
      }
    },
    {
      heading: 'Support for downsampling and transforms to accelerate queries',
      clickhouse: {
        icon: 'yes',
        label: '**Materialized views** (incremental & refreshable)'
      },
      elastic: {
        icon: 'intermediate',
        label:
          'Supported with limited aggregation types and full scans required to update'
      }
    },
    {
      heading: 'High insert rates',
      clickhouse: { icon: 'yes', label: '**Tens of millions/second**' },
      elastic: {
        icon: 'intermediate',
        label: 'Millions/sec but requires high resource footprint'
      }
    }
  ]
} satisfies Table
