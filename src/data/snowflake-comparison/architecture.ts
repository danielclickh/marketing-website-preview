import { Table } from './index'

export default {
  name: 'Architecture',
  description: `Snowflake is a proprietary cloud-native data warehouse designed around a hybrid architecture that combines elements of shared-disk and shared-nothing systems. It uses object storage as a central data layer, accessible by stateless compute clusters (“warehouses”) that can scale horizontally.

ClickHouse’s self-managed, open-source deployment uses a shared-nothing architecture, giving you full control over distribution and scaling. In contrast, ClickHouse Cloud, similar to Snowflake, adopts a shared storage architecture with separate storage and compute for greater elasticity and simplicity. However, it takes this further by elastically scaling compute over a single copy of data in object storage. Combined with high-throughput local caches and massively parallel execution, this design delivers lower latency and better cost efficiency.`,
  rows: [
    {
      heading: 'High query concurrency',
      subHeading: '1,000+ QPS per node',
      clickhouse: {
        value: true,
        label: 'Handles **1,000+ QPS per node** natively'
      },
      snowflake: {
        value: false,
        label: 'Needs multi-cluster setup with extra cost'
      }
    },
    {
      heading: 'Flexible deployment',
      clickhouse: {
        value: true,
        label: 'Available on both **self-managed** and **ClickHouse Cloud**'
      },
      snowflake: {
        value: false,
        label: 'Cloud only option, no self-managed'
      }
    },
    {
      heading: 'Shared-storage architecture with decoupled compute and storage',
      clickhouse: {
        value: true,
        label: '**Separation of storage and compute** by design'
      },
      snowflake: {
        value: true,
        label: 'Supports separation of compute and storage'
      }
    },
    {
      heading: 'Stateless compute nodes with fast warm-up time',
      clickhouse: {
        value: true,
        label: 'Compute can be **added/removed instantly**'
      },
      snowflake: {
        value: true,
        label: 'Supports stateless compute clusters'
      }
    },
    {
      heading: 'Control over data ordering and co-location',
      clickhouse: {
        value: true,
        label: 'Full control over **sorting and partitioning**'
      },
      snowflake: {
        value: true,
        label: 'Clustering available, but incurs extra charges'
      }
    },
    {
      heading: 'Distributes query execution across nodes',
      clickhouse: {
        value: true,
        label: '**Parallel replicas** distribute workloads'
      },
      snowflake: {
        value: true,
        label: 'Queries distributed across clusters'
      }
    },
    {
      heading: 'Distributed cache for data reuse',
      clickhouse: {
        value: true,
        label: '**Distributed cache** built-in'
      },
      snowflake: {
        value: true,
        label: 'Cache layer available in compute clusters'
      }
    },
    {
      heading: 'Query result cache for sub-second interactivity',
      clickhouse: {
        value: true,
        label: '**Result cache** for repeated queries'
      },
      snowflake: {
        value: true,
        label: 'Query result cache supported'
      }
    },
    {
      heading: 'Streaming ingestion support',
      clickhouse: {
        value: true,
        label: 'Native streaming via **ClickPipes**'
      },
      snowflake: {
        value: true,
        label: 'Streaming via Snowpipe'
      }
    },
    {
      heading: 'Real-time ingest',
      clickhouse: {
        value: true,
        label: '**<1s latency** for streaming data'
      },
      snowflake: {
        value: false,
        label: '5–10s latency with Snowpipe Streaming'
      }
    },
    {
      heading: 'Native semi-structured data type with type preservation',
      clickhouse: {
        value: true,
        label: '**JSON with type fidelity**'
      },
      snowflake: {
        value: false,
        label: 'Semi-structured data but no type preservation'
      }
    },
    {
      heading: 'Lightweight updates / row-level mutation',
      clickhouse: {
        value: true,
        label: 'Efficient **row-level updates** supported'
      },
      snowflake: {
        value: true,
        label: 'Row-level updates supported'
      }
    },
    {
      heading: 'Micro batch/single row inserts',
      clickhouse: {
        value: true,
        label: '**Async inserts** optimized for small batches'
      },
      snowflake: {
        value: true,
        label: 'Small batch inserts supported'
      }
    }
  ]
} satisfies Table
