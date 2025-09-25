import { Table } from './index'

export default {
  name: 'Performance',
  description: `By being based on ClickHouse, ClickStack is engineered for speed. ClickHouse’s vectorized engine, columnar compression, and efficient memory use deliver the **sub-second aggregation queries** needed for observability, even on **high-cardinality data at petabyte scale**. 

Elastic, by contrast, was **designed for search**: aggregations are slow, term aggregations are approximate, and indexing competes directly with queries for resources in open-source.

Public benchmarks and user reports show **ClickHouse outperforming Elasticsearch by 10–100x on analytical workloads** with **at least 2x greater compression**. Without tuning or schema changes, it executes complex aggregations and joins across billions of rows in a fraction of the time and cost.`,
  rows: [
    {
      heading: 'Join performance (multi-billion rows)',
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
        icon: 'intermediate',
        label: 'Limited; ~8 QPS/warehouse, needs multi-cluster scaling'
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
        label: 'Limited types; full scans required'
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
