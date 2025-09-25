import { Table } from './index'

export default {
  name: 'Interoperability',
  description: `ClickStack is **OpenTelemetry-native** but not exclusive, supporting OTel out of the box while also accommodating wide events and other flexible models. Elastic, by contrast, appends OTel support to its stack, with historical agents still migrating. 

Beyond instrumentation, ClickStack inherits ClickHouse’s broad interoperability. Native table engines read directly from Postgres, MongoDB, or object storage, with Parquet and Iceberg supported natively and external catalogs like Hive and Glue queryable in place, allowing teams to build observability on **open standards without lock-in** or costly data duplication and transport. C lickPipes extends this in the cloud with **hosted ingestion from S3 and Kafka**, eliminating the need to manage external components.`,
  rows: [
    {
      heading: 'Query external data in-place',
      clickhouse: {
        icon: 'yes',
        label: '**Query in-place** via table engines (e.g. Postgres, S3)'
      },
      elastic: { icon: 'no', label: 'Not supported' }
    },
    {
      heading: 'Hosted Ingest to read from Kafka and S3',
      clickhouse: { icon: 'yes', label: '**Hosted ingest** from Kafka & S3' },
      elastic: { icon: 'no', label: 'Not supported' }
    },
    {
      heading: 'Support for open table and file formats',
      subHeading: 'e.g. Iceberg, Parquet, ORC',
      clickhouse: { icon: 'yes', label: '**Open format support**' },
      elastic: { icon: 'no', label: 'Not supported' }
    },
    {
      heading: 'Support for third-party catalogs',
      clickhouse: { icon: 'yes', label: '**Third-party catalog support**' },
      elastic: { icon: 'no', label: 'Not supported' }
    },
    {
      heading: 'File format support',
      clickhouse: {
        icon: 'yes',
        label: '**70+ formats** including Parquet, ORC, Avro, JSON, CSV'
      },
      elastic: { icon: 'intermediate', label: 'Limited to JSON/CSV' }
    },
    {
      heading: 'External table engines',
      clickhouse: {
        icon: 'yes',
        label: '**Connect to Postgres, MongoDB, MySQL, S3, Kafka, and more**'
      },
      elastic: { icon: 'intermediate', label: 'Object stores only' }
    }
  ]
} satisfies Table
