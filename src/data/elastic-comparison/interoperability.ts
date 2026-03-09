import { Table } from './index'

export default {
  name: 'Interoperability',
  description: `### How do Elastic Observability and ClickStack integrate with the observability ecosystem?

ClickStack is **OpenTelemetry-native** but not exclusive, supporting OTel out of the box while also accommodating wide events and other flexible models. Elastic Observability, by contrast, appends OTel support to its stack, with historical agents still migrating. 

Native table engines **read directly from Postgres, MongoDB, and object storage**, with **Parquet and Lake formats** supported natively with **external catalogs like Hive and Glue** for querying data in place \\- so teams can build observability on open standards without lock-in or data duplication. ClickPipes extends this with hosted ingestion from S3 and Kafka, removing the need to manage pipelines.`,
  rows: [
    {
      heading: 'File format support for querying in place',
      clickhouse: {
        icon: 'yes',
        label: '**70+ formats** including Parquet, ORC, Avro, JSON, CSV'
      },
      elastic: {
        icon: 'no',
        label: 'Not supported'
      }
    },
    {
      heading: 'File format support for data load',
      clickhouse: {
        icon: 'yes',
        label: '**70+ formats** including Parquet, ORC, Avro, JSON, CSV'
      },
      elastic: { icon: 'no', label: 'Limited to JSON/CSV, relies on Logstash.' }
    },
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
      heading: 'External table engines',
      clickhouse: {
        icon: 'yes',
        label: '**Connect to Postgres, MongoDB, MySQL, S3, Kafka, and more**'
      },
      elastic: { icon: 'intermediate', label: 'Requires Logstash' }
    },
    {
      heading: 'Support for Open Telemetry',
      clickhouse: {
        icon: 'yes',
        label: 'Supported'
      },
      elastic: { icon: 'yes', label: 'Supported' }
    }
  ]
} satisfies Table
