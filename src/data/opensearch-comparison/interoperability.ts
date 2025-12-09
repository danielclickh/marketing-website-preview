import { Table } from './index'

export default {
  name: 'Interoperability',
  description: `### How do OpenSearch and ClickStack integrate with the observability ecosystem?

OpenSearch supports OpenTelemetry via its Observability plugin and Data Prepper pipelines for ingesting logs, metrics, and traces. Through AWS Glue and S3, it can query limited external data in Parquet or lakehouse formats, though these integrations remain connector-based rather than native.

ClickStack is **OpenTelemetry-native** but not exclusive, supporting OTel out of the box while also accommodating wide events. Native ClickHouse table engines **read directly from Postgres, MongoDB, and object storage**, with **Parquet and Lake formats** supported natively with **external catalogs like Hive and Glue** for querying data in place. ClickPipes extends this with hosted ingestion from S3 and Kafka, removing the need to manage pipelines.`,
  rows: [
    {
      heading: 'File format support for querying in place',
      clickhouse: {
        icon: 'yes',
        label: '**70+ formats** including Parquet, ORC, Avro, JSON, CSV'
      },
      opensearch: {
        icon: 'intermediate',
        label:
          'Limited to Parquet via AWS Glue & S3 direct query; no native support'
      }
    },
    {
      heading: 'File format support for data load',
      clickhouse: {
        icon: 'yes',
        label: '**70+ formats** including Parquet, ORC, Avro, JSON, CSV'
      },
      opensearch: {
        icon: 'intermediate',
        label:
          'JSON, CSV, and Parquet supported via Data Prepper and connectors'
      }
    },
    {
      heading: 'Query external data in-place',
      clickhouse: {
        icon: 'yes',
        label: '**Query in-place** via table engines (e.g. Postgres, S3)'
      },
      opensearch: {
        icon: 'intermediate',
        label:
          'Supported via AWS Glue & S3 “direct query”; connector-based and limited to AWS-managed environments'
      }
    },
    {
      heading: 'Support for open table and file formats',
      subHeading: 'e.g. Iceberg, Parquet, ORC',
      clickhouse: { icon: 'yes', label: '**Open format support**' },
      opensearch: {
        icon: 'intermediate',
        label: 'Parquet supported; no native Iceberg or ORC integration'
      }
    },
    {
      heading: 'Support for third-party catalogs',
      clickhouse: { icon: 'yes', label: '**Third-party catalog support**' },
      opensearch: {
        icon: 'intermediate',
        label: 'AWS Glue catalog integration only; no open metadata API'
      }
    },
    {
      heading: 'External table engines',
      clickhouse: {
        icon: 'yes',
        label: '**Connect to Postgres, MongoDB, MySQL, S3, Kafka, and more**'
      },
      opensearch: {
        icon: 'intermediate',
        label:
          'Limited to connectors (S3, Prometheus, Kafka) via Data Prepper; no native federated engines'
      }
    },
    {
      heading: 'Hosted Ingest to read from Kafka and S3',
      clickhouse: { icon: 'yes', label: '**Hosted ingest** from Kafka & S3' },
      opensearch: {
        icon: 'yes',
        label: 'Supported via OpenSearch Ingestion and Data Prepper pipelines'
      }
    },
    {
      heading: 'Support for Open Telemetry',
      clickhouse: {
        icon: 'yes',
        label: 'Supported'
      },
      opensearch: {
        icon: 'yes',
        label: 'Supported via Observability plugin and Data Prepper pipelines'
      }
    }
  ]
} satisfies Table
