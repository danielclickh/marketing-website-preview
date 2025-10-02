import { Table } from './index'

export default {
  name: 'Scalability',
  description: `Elastic’s scalability is constrained by shards and the JVM, built for terabyte workloads. Shards are **size-limited**, queries parallelize only within shard boundaries, and **JVM heap caps (~64GB) force horizontal sprawl**. This drives **network overhead**, **costly rebalances** on outages, and resource contention between ingest and queries, often pushing users to sample data.

ClickStack, powered by ClickHouse, scales to petabytes. Queries parallelize across all cores without JVM limits, and vertical scaling reduces reliance on shards. In ClickHouse Cloud, compute and storage scale independently, all nodes share a single S3 copy for cost-efficient retention, and reads/writes can be isolated with elastic warehouses.`,
  rows: [
    {
      heading: 'Unlimited shard sizes',
      clickhouse: {
        icon: 'yes',
        label: '**Unlimited shard sizes** (disk-based)'
      },
      elastic: { icon: 'no', label: '50GB recommended max' }
    },
    {
      heading: 'Distributed query execution across replicas',
      clickhouse: {
        icon: 'yes',
        label: '**Parallel replicas** distribute queries'
      },
      elastic: {
        icon: 'no',
        label: '1 replica of each shard used in query execution'
      }
    },
    {
      heading: 'Vertical scaling to support large machines',
      clickhouse: {
        icon: 'yes',
        label: '**Vertical scaling** to very large machines'
      },
      elastic: {
        icon: 'intermediate',
        label: 'Limited to 64GB JVM; forces horizontal scaling'
      }
    },
    {
      heading: 'High query concurrency per node',
      clickhouse: {
        icon: 'yes',
        label: '**Up to 1,000 concurrent queries per node**'
      },
      elastic: { icon: 'intermediate', label: 'Requires horizontal scaling' }
    },
    {
      heading: 'Horizontal scaling with sharding',
      clickhouse: {
        icon: 'yes',
        label: '**Horizontal scaling** with sharding'
      },
      elastic: { icon: 'yes', label: 'Horizontal scaling supported' }
    },
    {
      heading: 'Read/write isolation',
      clickhouse: {
        icon: 'yes',
        label: '**Read/write isolation** (ClickHouse Cloud)'
      },
      elastic: { icon: 'yes', label: 'Elastic Cloud Serverless' }
    },
    {
      heading: 'Elastic scaling',
      subHeading: 'Up/down with load',
      clickhouse: {
        icon: 'yes',
        label: '**Elastic scaling** with load (ClickHouse Cloud)'
      },
      elastic: { icon: 'yes', label: 'Elastic Cloud Serverless' }
    },
    {
      heading: 'Custom hardware profiles in Cloud offering',
      clickhouse: {
        icon: 'yes',
        label: '**Custom hardware profiles** available'
      },
      elastic: { icon: 'yes', label: 'Profiles available' }
    },
    {
      heading: 'Granular cache control',
      clickhouse: { icon: 'yes', label: '**Granular cache control**' },
      elastic: { icon: 'yes', label: 'Cache controls supported' }
    }
  ]
} satisfies Table
