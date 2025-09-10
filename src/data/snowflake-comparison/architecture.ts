import { Table } from './index'

export default {
  name: 'Architecture',
  description: `Snowflake is a proprietary cloud data warehouse built on a hybrid of shared-disk and shared-nothing designs. It stores data in object storage, accessed by stateless compute clusters (“warehouses”) that scale horizontally. 
  
ClickHouse’s self-managed, open-source deployment uses a shared-nothing architecture, giving you full control over distribution and scaling. In contrast, ClickHouse Cloud uses a shared storage architecture with full separation of storage and compute, scaling elastically over a single copy of data in object storage.`,
  rows: [
    {
      heading: 'Flexible deployment',
      clickhouse: {
        icon: 'yes',
        label: 'Available on both **self-managed** and **ClickHouse Cloud**'
      },
      snowflake: {
        icon: 'no',
        label: 'Cloud only option, no self-managed'
      }
    },
    {
      heading: 'High query concurrency',
      subHeading: '1,000+ QPS per node',
      clickhouse: {
        icon: 'yes',
        label: 'Handles **1,000+ QPS per node** natively'
      },
      snowflake: {
        icon: 'intermediate',
        label: 'Needs multi-cluster setup with extra cost'
      }
    },
    {
      heading: 'Real-time ingest',
      clickhouse: {
        icon: 'yes',
        label: '**<1s latency** for streaming data'
      },
      snowflake: {
        icon: 'intermediate',
        label: '5–10s latency with Snowpipe Streaming'
      }
    },
    {
      heading: 'Native semi-structured data type with type preservation',
      clickhouse: {
        icon: 'yes',
        label: '**JSON with type fidelity**'
      },
      snowflake: {
        icon: 'intermediate',
        label: 'Semi-structured data but no type preservation'
      }
    },
    {
      heading: 'Shared-storage architecture with decoupled compute and storage',
      clickhouse: {
        icon: 'yes',
        label: '**Separation of storage and compute** by design'
      },
      snowflake: {
        icon: 'yes',
        label: 'Supports separation of compute and storage'
      }
    },
    {
      heading: 'Stateless compute nodes with fast warm-up time',
      clickhouse: {
        icon: 'yes',
        label: 'Compute can be **added/removed instantly**'
      },
      snowflake: {
        icon: 'yes',
        label: 'Supports stateless compute clusters'
      }
    },
    {
      heading: 'Control over data ordering and co-location',
      clickhouse: {
        icon: 'yes',
        label: 'Full control over **sorting and partitioning**'
      },
      snowflake: {
        icon: 'yes',
        label: 'Clustering available, but incurs extra charges'
      }
    },
    {
      heading: 'Streaming ingestion support',
      clickhouse: {
        icon: 'yes',
        label: 'Native streaming via **ClickPipes**'
      },
      snowflake: {
        icon: 'yes',
        label: 'Streaming via Snowpipe'
      }
    },
    {
      heading: 'Lightweight updates / row-level mutation',
      clickhouse: {
        icon: 'yes',
        label: 'Efficient **row-level updates** supported'
      },
      snowflake: {
        icon: 'yes',
        label: 'Row-level updates supported'
      }
    },
    {
      heading: 'Micro batch/single row inserts',
      clickhouse: {
        icon: 'yes',
        label: '**Async inserts** optimized for small batches'
      },
      snowflake: {
        icon: 'yes',
        label: 'Small batch inserts supported'
      }
    }
  ]
} satisfies Table
