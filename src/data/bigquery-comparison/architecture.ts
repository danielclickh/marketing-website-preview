import { Table } from './index'

export default {
  name: 'Architecture',
  description: `ClickHouse Cloud gives users precise scaling control with workload quotas, **vertical and horizontal scaling** (manual or automatic), **custom hardware profiles**, and fast resume from idle. Users benefit from ClickHouse being **open source**, making it ideal for **hybrid and multi-cloud deployments.**

BigQuery, by contrast, shines at **elastic scaling for large batch jobs** through dynamic slot allocation. But this limits transparency and control: **concurrency depends on slot reservations**, there’s no vertical tuning or custom hardware choice, and caching mainly aids data skipping. It works well for **high-throughput batch workloads**, but less so for use cases demanding consistent concurrency and predictable performance.`,
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
        label: 'Separation of compute and storage'
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
        label: '**Partitioning supported**'
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
