import { Table } from './index'

export default {
  name: 'Performance',
  description: `### ### What is the performance of OpenSearch vs ClickStack for Observability?

ClickStack, built on ClickHouse, is engineered for speed. Its **vectorized engine**, **columnar compression**, and efficient memory use deliver **sub-second aggregations on high-cardinality data at petabyte scale** \\- critical for observability workloads. Elastic, **designed for search**, struggles with analytics: aggregations are slow at scale, term aggregations approximate, and indexing competes with queries for resources in open-source.

ClickHouse outperforms Elasticsearch by **10–100x on analytics** with at least **2x better compression**. Without tuning or schema changes, it handles complex aggregations and joins across billions of rows at a fraction of the time and cost.`,
  rows: [
    {
      heading: 'Join performance',
      subHeading: 'Multi-billion rows',
      clickhouse: {
        icon: 'yes',
        label: '**Efficient joins** across billions of rows'
      },
      opensearch: {
        icon: 'intermediate',
        label:
          'Limited SQL joins (inner, left, cross) supported with constraints; query scale and complexity remain limited'
      }
    },
    {
      heading: 'High data compression',
      clickhouse: { icon: 'yes', label: '**High compression** built-in' },
      opensearch: {
        icon: 'intermediate',
        label: 'Limited columnar-style compression'
      }
    },
    {
      heading: 'Support for high cardinality aggregations',
      clickhouse: { icon: 'yes', label: '**Accurate aggregations** at scale' },
      opensearch: { icon: 'intermediate', label: 'Approximate only' }
    },
    {
      heading: 'Support for downsampling and transforms to accelerate queries',
      clickhouse: {
        icon: 'yes',
        label: '**Materialized views** (incremental & refreshable)'
      },
      opensearch: {
        icon: 'intermediate',
        label:
          'Limited incremental support; rollups and transforms typically rescan or aggregate large index segments per execution. Star-tree indexes precompute aggregates but support a narrow range of functions and filters.'
      }
    },
    {
      heading: 'High insert rates',
      clickhouse: { icon: 'yes', label: '**Tens of millions/second**' },
      opensearch: {
        icon: 'intermediate',
        label: 'Millions/sec but requires high resource footprint'
      }
    },
    {
      heading: 'High concurrency performance',
      clickhouse: {
        icon: 'yes',
        label: '**1,000+ concurrent queries per node**'
      },
      opensearch: {
        icon: 'yes',
        label: 'Supported'
      }
    }
  ]
} satisfies Table
