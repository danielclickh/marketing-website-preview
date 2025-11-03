import { Table } from './index'

export default {
  name: 'Performance',
  description: `Splunk’s performance is limited by its event-based indexing model, where ingest and search share the same compute resources. Large queries often span multiple indexers and require full bucket scans, leading to multi-minute latencies unless pre-aggregations are scheduled in advance. Concurrency and join performance degrade as indexer load increases, and query speed depends heavily on data locality within hot buckets.

ClickStack with ClickHouse delivers consistent sub-second performance through a columnar engine with vectorized, fully parallel execution across cores and nodes. Built-in data skipping, advanced compression, and real-time materialized views minimize scan volumes while maintaining full fidelity. The result is high-throughput ingestion, fast searches, and predictable performance even at petabyte scale.`,
  rows: [
    {
      heading: 'Latency guidance',
      clickhouse: {
        icon: 'yes',
        label: '< 1s for aggregations due to columnar execution and skipping.'
      },
      splunk: { icon: 'no', label: 'Multi-minute long queries common' }
    },
    {
      heading: 'Data skipping and pruning',
      clickhouse: {
        icon: 'yes',
        label:
          'Built-in skipping indexes + optional inverted indices reduce scan volumes dramatically.'
      },
      splunk: {
        icon: 'no',
        label:
          'Must scan relevant time buckets in full; no native range-pruning or skipping indexes.'
      }
    },
    {
      heading: 'Insert throughput',
      clickhouse: {
        icon: 'yes',
        label:
          'Extremely high insert rates — typically tens of MB/sec per core (≈1 TB/day per core uncompressed)'
      },
      splunk: {
        icon: 'intermediate',
        label:
          '~300 GB/day per 12 vCPU indexer with search load. Throughput limited by indexing and search contention.'
      }
    },
    {
      heading: 'High-concurrency search at scale',
      clickhouse: {
        icon: 'yes',
        label:
          'Designed for many concurrent analytical queries on large ranges.'
      },
      splunk: {
        icon: 'intermediate',
        label: 'Concurrency is sensitive to indexer load. '
      }
    },
    {
      heading: 'Parallel execution model',
      clickhouse: {
        icon: 'yes',
        label: 'Fully parallelized across cores and nodes'
      },
      splunk: {
        icon: 'intermediate',
        label:
          'MapReduce-style search distributes work across indexers but lacks vectorization and fine-grained parallelism.'
      }
    },
    {
      heading: 'Pre-aggregation behavior',
      clickhouse: {
        icon: 'yes',
        label:
          'Materialized views and projections allow real-time aggregation without pre-computation delays.'
      },
      splunk: {
        icon: 'intermediate',
        label:
          'Data Model and Report Acceleration rely on scheduled jobs; results delayed until summarization completes.'
      }
    },
    {
      heading: 'Compression efficiency',
      clickhouse: { icon: 'yes', label: '10x–30x' },
      splunk: { icon: 'intermediate', label: '2x - 4x' }
    },
    {
      heading: 'Join and aggregation performance',
      clickhouse: {
        icon: 'yes',
        label:
          'Optimized for real-time analytical joins and aggregations with full JOINs supported.'
      },
      splunk: {
        icon: 'intermediate',
        label: 'Joins and sub-searches in SPL are slow'
      }
    },
    {
      heading: 'Tiered performance',
      clickhouse: {
        icon: 'yes',
        label:
          'Uniformly high performance across hot, warm, and cold tiers due to intelligent caching.'
      },
      splunk: {
        icon: 'intermediate',
        label:
          'Hot buckets perform best; warm/cold buckets stored in SmartStore add network latency.'
      }
    }
  ]
} satisfies Table
