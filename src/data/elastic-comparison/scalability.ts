import { Table } from './index'

export default {
  name: 'Scalability',
  description: `Elastic’s scalability is bound by shards and the JVM and designed for terabyte workloads. Each shard is **limited in size**, queries **parallelize only within shard boundaries**, and JVM constraints for the heap size (capped at ~64GB) force **horizontal sprawl**. This creates **network overhead and costly rebalances** on node outages, while ingest and queries contend for resources, leaving users to either **sample data to restrict what they monitor**.

ClickStack, powered by ClickHouse, scales for petabyte workloads. Queries are fully **parallelized across all cores** without the memory limits of a JVM. **Vertical scaling is encouraged** - reducing the need to spread workloads across shards. ClickHouse Cloud goes further: **compute and storage scale independently**, with all nodes accessing a single data copy on S3 - allowing **long-term cost efficient retention**. Reads and writes can be isolated with warehouses, with each elastically scalable on demand.`,
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
      elastic: { icon: 'no', label: 'Only 1 replica per shard' }
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
