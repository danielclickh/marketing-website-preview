import { Table } from './index'

export default {
  name: 'Scalability',
  description: `Splunk’s scalability is limited by an architecture that couples indexing and search on the same nodes. Each indexer must balance ingest and query workloads, reducing throughput under heavy load. Scaling requires manually adding indexers, with no native elasticity or automation. Pre-aggregations like Data Model Acceleration use scheduled jobs, delaying data availability. SmartStore adds storage flexibility, but compute scaling remains static and performance tuning depends heavily on I/O and pipeline configuration.

With ClickHouse, ClickStack scales efficiently in every direction - vertically through vectorized execution that fully exploits modern CPUs, and horizontally across distributed shards. Compute and storage are decoupled, enabling independent scaling of ingest and query workloads for predictable performance. Materialized views update incrementally, preserving real-time accuracy and fidelity. In ClickHouse Cloud, compute scales dynamically to absorb bursts, maintaining consistent sub-second performance at petabyte scale.`,
  rows: [
    {
      heading: 'Read and write isolation',
      clickhouse: {
        icon: 'yes',
        label:
          'Decoupled storage and compute allow independent scaling of ingest and query nodes.'
      },
      splunk: {
        icon: 'no',
        label:
          'Ingest and search share indexer resources. Partial separation only via searchable vs non-searchable replicas.'
      }
    },
    {
      heading: 'Dynamic scaling to handle bursts',
      clickhouse: { icon: 'yes', label: 'Compute scaled dynamically in Cloud' },
      splunk: { icon: 'no', label: 'No native support. Scaling manual.' }
    },
    {
      heading: 'Pre-aggregations',
      clickhouse: {
        icon: 'yes',
        label:
          'Materialized views execute incrementally on inserts. No loss of fidelity, all functions supported.'
      },
      splunk: {
        icon: 'intermediate',
        label:
          'Supports Data Model Acceleration and Report Acceleration. Updates are not incremental per event - there’s a delay before new data appears in summaries.'
      }
    },
    {
      heading: 'Query execution model',
      clickhouse: {
        icon: 'yes',
        label:
          'Fully parallelized, vectorized execution across CPU cores and cluster nodes.'
      },
      splunk: {
        icon: 'intermediate',
        label:
          'MapReduce-style search pipeline. The search head distributes subsearches (“map”) to indexers, which process and reduce results before aggregation (“reduce”). Parallelism exists per search pipeline but is not vectorized.'
      }
    },
    {
      heading: 'Insert throughput per node',
      clickhouse: { icon: 'yes', label: '~1TB per core/day uncompressed' },
      splunk: {
        icon: 'intermediate',
        label: '300 GB per day per 12 vCPU indexer'
      }
    },
    {
      heading: 'Elastic scaling',
      clickhouse: {
        icon: 'yes',
        label:
          'Scale query compute up and dynamically independent of storage in Cloud'
      },
      splunk: {
        icon: 'intermediate',
        label:
          'Scale by adding or removing indexers. No native separation of storage from compute for hot data.'
      }
    },
    {
      heading: 'Vertical scaling',
      clickhouse: {
        icon: 'yes',
        label: 'Efficient use of large multi-core nodes due to vectorization.'
      },
      splunk: {
        icon: 'intermediate',
        label:
          'Supported but requires tuning and can be limited by I/O and pipeline configuration. '
      }
    },
    {
      heading: 'Storage and compute separation',
      clickhouse: {
        icon: 'yes',
        label:
          'Fully decoupled in ClickHouse Cloud. Object storage for long retention with intelligent caching.'
      },
      splunk: {
        icon: 'intermediate',
        label:
          'SmartStore uses object storage but hot buckets still rely on local disks'
      }
    },
    {
      heading: 'Data skipping and secondary indexes',
      clickhouse: {
        icon: 'yes',
        label: 'Data skipping indexes on primary keys, plus optional inverted.'
      },
      splunk: {
        icon: 'intermediate',
        label: 'Proprietary event index with metadata lookups.'
      }
    },
    {
      heading: 'Horizontal scaling',
      clickhouse: {
        icon: 'yes',
        label: 'Native distributed queries over many shards.'
      },
      splunk: {
        icon: 'yes',
        label: 'Add indexers to distribute ingest and search. '
      }
    }
  ]
} satisfies Table
