import { Table } from './index'

export default {
  name: 'Scalability',
  description: `### How do OpenSearch and ClickStack scale?

OpenSearch’s scalability is constrained by its **shard-based architecture and JVM limits**. Each shard is a Lucene index that scales horizontally but **struggles vertically beyond tens of gigabytes**. Query execution remains **bounded by shard and heap limits (\\~64 GB)**, creating network overhead, costly rebalances, and contention between ingest and queries \\- often forcing data sampling at scale.

ClickStack, powered by ClickHouse, **scales to petabytes**. Queries parallelize across all cores without JVM limits, and vertical scaling reduces reliance on shards. In ClickHouse Cloud, compute and storage scale independently, all nodes share a single S3 copy for cost-efficient retention, and reads/writes can be isolated with elastic warehouses.`,
  rows: [
    {
      heading: 'Unlimited shard sizes',
      clickhouse: {
        icon: 'yes',
        label: '**Unlimited shard sizes** (disk-based)'
      },
      opensearch: { icon: 'no', label: 'Recommended ≤ 50 GB per shard' }
    },
    {
      heading: 'Distributed query execution across replicas',
      clickhouse: {
        icon: 'yes',
        label: '**Parallel replicas** distribute queries'
      },
      opensearch: {
        icon: 'no',
        label:
          'Replicas handle queries independently but do not parallelize a single query across replicas'
      }
    },
    {
      heading: 'Vertical scaling to support large machines',
      clickhouse: {
        icon: 'yes',
        label: '**Vertical scaling** to very large machines'
      },
      opensearch: {
        icon: 'intermediate',
        label:
          'Limited to <32GB GB JVM; forces horizontal scaling with associated network overhead'
      }
    },
    {
      heading: 'High query concurrency per node',
      clickhouse: {
        icon: 'yes',
        label: '**Up to 1,000 concurrent queries per node**'
      },
      opensearch: {
        icon: 'intermediate',
        label:
          'Requires horizontal scaling. Search threads tied to the number of CPUs.'
      }
    },
    {
      heading: 'Granular cache control',
      clickhouse: { icon: 'yes', label: '**Granular cache control**' },
      opensearch: {
        icon: 'yes',
        label: 'Cache controls supported'
      }
    },
    {
      heading: 'Horizontal scaling with sharding',
      clickhouse: {
        icon: 'yes',
        label: '**Horizontal scaling** with sharding'
      },
      opensearch: { icon: 'yes', label: 'Horizontal scaling supported' }
    },
    {
      heading: 'Read/write isolation',
      clickhouse: {
        icon: 'yes',
        label: '**Read/write isolation** (ClickHouse Cloud)'
      },
      opensearch: { icon: 'yes', label: 'Available in AWS Serverless' }
    },
    {
      heading: 'Elastic scaling',
      subHeading: 'Up/down with load',
      clickhouse: {
        icon: 'yes',
        label: '**Elastic scaling** with load (ClickHouse Cloud)'
      },
      opensearch: { icon: 'yes', label: 'Available in AWS Serverless' }
    },
    {
      heading: 'Custom hardware profiles in Cloud offering',
      clickhouse: {
        icon: 'yes',
        label: '**Custom hardware profiles** available'
      },
      opensearch: { icon: 'yes', label: 'Profiles available' }
    }
  ]
} satisfies Table
