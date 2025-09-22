import { Table } from './index'

export default {
  name: 'Architecture',
  description: `BigQuery and ClickHouse differ sharply in architecture, pricing, and focus. BigQuery’s **unpredictable costs**, charging for both reads and writes, make it less suited for workloads with continuous streaming data and fluctuating query or insert volumes. Its architecture relies on shared slots and orchestrators that add latency and limit concurrency under load, with caching focused on identical query reuse.

ClickHouse, by contrast, is designed for **real-time analytics and high concurrency**, using distributed caches and local execution to avoid centralized slot funnels. It handles thousands of simultaneous queries per node without orchestration delays, with **predictable resource-based pricing** and support for on-prem and multi-cloud deployments. This makes it ideal for dynamic, low-latency, high-ingest workloads with high query concurrency.`,
  rows: [
    {
      heading: 'Flexible deployment',
      clickhouse: {
        icon: 'yes',
        label: '**OSS self-managed + ClickHouse Cloud** on GCP, AWS & Azure'
      },
      bigquery: {
        icon: 'no',
        label: 'GCP only'
      }
    },
    {
      heading: 'Distributed cache for data reuse',
      clickhouse: {
        icon: 'yes',
        label: '**Distributed cache with predicate support**'
      },
      bigquery: {
        icon: 'intermediate',
        label:
          'No predicate cache; limited to exact queries; disabled with column-based security'
      }
    },
    {
      heading: 'Query result cache for sub-second interactivity',
      clickhouse: {
        icon: 'yes',
        label: '**Query result cache** for interactive queries'
      },
      bigquery: {
        icon: 'intermediate',
        label: 'Not used with streaming ingest'
      }
    },
    {
      heading: 'Real-time ingest',
      clickhouse: {
        icon: 'yes',
        label: '**<1s latency** for streaming data'
      },
      bigquery: {
        icon: 'intermediate',
        label: '~1s latency with extra charges; not compatible with query cache'
      }
    },
    {
      heading: 'Lightweight updates / row-level mutation',
      clickhouse: {
        icon: 'yes',
        label: '**Efficient row-level updates**'
      },
      bigquery: {
        icon: 'intermediate',
        label:
          'Extra charges for changes; recently streamed data can’t be modified'
      }
    },
    {
      heading: 'High query concurrency',
      subHeading: '1,000+ QPS per node',
      clickhouse: {
        icon: 'yes',
        label: '**1,000+ QPS per node**'
      },
      bigquery: {
        icon: 'yes',
        label: 'Depends on slot allocation; queries may queue or be rejected'
      }
    },
    {
      heading: 'Shared-storage architecture with decoupled compute and storage',
      clickhouse: {
        icon: 'yes',
        label: '**Separation of compute and storage**'
      },
      bigquery: {
        icon: 'yes',
        label: 'Compute/storage separation'
      }
    },
    {
      heading: 'Stateless compute nodes',
      clickhouse: {
        icon: 'yes',
        label: '**Stateless compute nodes** for fast scaling'
      },
      bigquery: {
        icon: 'yes',
        label: 'Stateless compute supported'
      }
    },
    {
      heading: 'Control over data ordering and co-location',
      clickhouse: {
        icon: 'yes',
        label: '**Full control** over ordering & co-location'
      },
      bigquery: {
        icon: 'yes',
        label: 'Stores data sorted by clustering columns'
      }
    },
    {
      heading: 'Allows partitioning of data for data skipping',
      clickhouse: {
        icon: 'yes',
        label: '**Partitioning for data skipping**'
      },
      bigquery: {
        icon: 'yes',
        label: 'Partitioning supported'
      }
    },
    {
      heading: 'Distributes query execution across nodes',
      clickhouse: {
        icon: 'yes',
        label: '**Parallel replicas** distribute workloads'
      },
      bigquery: {
        icon: 'yes',
        label: 'Shuffling across compute slots'
      }
    },
    {
      heading: 'Streaming ingestion support',
      clickhouse: {
        icon: 'yes',
        label: '**Native streaming ingestion**'
      },
      bigquery: {
        icon: 'yes',
        label: 'Streaming supported (with extra charges)'
      }
    },
    {
      heading: 'Native semi-structured data type with type preservation',
      clickhouse: {
        icon: 'yes',
        label: '**JSON with type fidelity**'
      },
      bigquery: {
        icon: 'yes',
        label: 'JSON supported (but no row-level policies on JSON columns)'
      }
    },
    {
      heading: 'Row-level ingestion',
      clickhouse: {
        icon: 'yes',
        label: '**Async inserts** for small batches'
      },
      bigquery: {
        icon: 'yes',
        label: 'Inserts supported (but invalidate query cache)'
      }
    }
  ]
} satisfies Table
