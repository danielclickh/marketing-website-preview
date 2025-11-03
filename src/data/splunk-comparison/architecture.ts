import { Table } from './index'

export default {
  name: 'Architecture',
  description: `Splunk began as one of the first log aggregation tools, built on a universal forwarder, indexer, and search head architecture from an era when gigabytes were the norm. It has since grown into multiple products with distinct backends and SKUs, with a design that was never intended for fast aggregations or high-cardinality data in the petabyte era.

ClickHouse takes a different approach with a high-performance columnar engine that delivers superior compression and seamless real-time aggregation at any scale. Built on this foundation, ClickStack offers a simpler, faster observability platform powered by OpenTelemetry and HyperDX. ClickHouse Cloud’s separation of compute and storage offers the same sub-second latency with cost-efficient long-term retention.`,
  rows: [
    {
      heading: 'Unified architecture with single engine for all workloads',
      clickhouse: {
        icon: 'yes',
        label:
          'Single columnar engine (ClickHouse) for logs, metrics, traces, and replays'
      },
      splunk: {
        icon: 'no',
        label:
          'Multiple backends (Enterprise, Cloud, Observability Cloud) with separate data stores'
      }
    },
    {
      heading: 'Single binary deployment',
      clickhouse: { icon: 'yes', label: 'One binary, homogeneous cluster' },
      splunk: {
        icon: 'no',
        label: 'Multiple component types (forwarders, indexers, search heads)'
      }
    },
    {
      heading: 'Isolation of inserts and queries',
      clickhouse: {
        icon: 'yes',
        label: 'Complete separation via compute-compute separation'
      },
      splunk: {
        icon: 'no',
        label:
          'Shared resources on indexers; ingest and search contend for CPU/I/O'
      }
    },
    {
      heading: 'Columnar storage engine',
      clickhouse: {
        icon: 'yes',
        label: 'Fully columnar, vectorized execution'
      },
      splunk: { icon: 'no', label: 'Row/event-based index buckets' }
    },
    {
      heading: 'Schema on write',
      clickhouse: {
        icon: 'yes',
        label: 'Supported, efficient columnar layout for semi-structured data'
      },
      splunk: {
        icon: 'no',
        label: 'Not supported; schema defined at query time only'
      }
    },
    {
      heading: 'Open source',
      clickhouse: { icon: 'yes', label: 'MIT / Apache 2.0 licensed' },
      splunk: { icon: 'no', label: 'Proprietary, closed source' }
    },
    {
      heading: 'SQL support',
      clickhouse: {
        icon: 'yes',
        label: 'Standard SQL for analytics and joins'
      },
      splunk: { icon: 'no', label: 'Proprietary SPL only' }
    },
    {
      heading: 'Separation of storage and compute',
      clickhouse: {
        icon: 'yes',
        label:
          'Fully decoupled; object storage for retention, elastic compute for queries'
      },
      splunk: {
        icon: 'intermediate',
        label:
          'SmartStore uses object storage for long-term retention, local disks still for hot'
      }
    },
    {
      heading: 'Inverted index support (true full-text or JSON path)',
      clickhouse: {
        icon: 'yes',
        label: 'Optional secondary inverted indexes for text search'
      },
      splunk: {
        icon: 'intermediate',
        label: 'Proprietary event index; not true full-text inverted index'
      }
    },
    {
      heading: 'Vertical scalability (multi-core parallelism within node)',
      clickhouse: {
        icon: 'yes',
        label: 'Native vectorized parallelism; scales vertically'
      },
      splunk: {
        icon: 'intermediate',
        label:
          'Limited; vertical scaling possible but constrained by indexer thread model'
      }
    },
    {
      heading: 'Natural language search',
      clickhouse: { icon: 'yes', label: 'Supported via HyperDX interface' },
      splunk: {
        icon: 'intermediate',
        label: 'Basic keyword search; SPL required for complex queries'
      }
    },
    {
      heading: 'Schema on read',
      clickhouse: { icon: 'yes', label: 'Supported' },
      splunk: { icon: 'yes', label: 'Supported' }
    },
    {
      heading: 'Horizontal scaling',
      clickhouse: {
        icon: 'yes',
        label: 'Scales elastically across nodes with distributed queries'
      },
      splunk: {
        icon: 'yes',
        label: 'Scales via additional indexers; recommended approach'
      }
    },
    {
      heading: 'Deployment model',
      clickhouse: { icon: 'yes', label: 'Self-hosted or ClickHouse Cloud' },
      splunk: { icon: 'yes', label: 'On-prem or cloud offerings' }
    },
    {
      heading: 'Proprietary query language ',
      clickhouse: { icon: 'no', label: 'Uses standard SQL or Lucene queries' },
      splunk: { icon: 'yes', label: 'SPL (Search Processing Language)' }
    }
  ]
} satisfies Table
