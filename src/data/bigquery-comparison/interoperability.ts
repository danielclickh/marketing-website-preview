import { Table } from './index'

export default {
  name: 'Interoperability',
  description: `With **fully-managed CDC via ClickPipes**, ClickHouse makes it easy to stream changes from operational databases like Postgres or MySQL, enabling **real-time analytics with minimal lag**. Users benefit from **unmatched interoperability**, with support for **70+ file formats**, external catalogs like Hive and Glue, and lakehouse formats such as Iceberg. **External table engines** let you query systems like Postgres, MongoDB, or S3 directly.

**BigQuery focuses interoperability around object stores and standard lake formats**. It supports common formats like Avro, CSV, JSON, ORC, Parquet, and Iceberg, with in-place queries primarily through BigLake on object storage. Catalog integrations are **limited to AWS Glue**. For CDC, it uses **Datastream pipelines**. This positions BigQuery well for classic data warehouse and lakehouse setups but with **less direct multi-system reach**.`,
  rows: [
    {
      heading: 'File format support',
      clickhouse: {
        icon: 'yes',
        label: '**70+ formats** including Parquet, ORC, Avro, JSON, CSV'
      },
      bigquery: {
        icon: 'intermediate',
        label: 'Limited to common formats (Avro, CSV, JSON, ORC, Parquet)'
      }
    },
    {
      heading: 'External table engines',
      clickhouse: {
        icon: 'yes',
        label: '**Connect to Postgres, MongoDB, MySQL, S3, Kafka, and more**'
      },
      bigquery: {
        icon: 'intermediate',
        label: 'Object stores only'
      }
    },
    {
      heading: 'Query external data in-place',
      clickhouse: {
        icon: 'yes',
        label: '**Query in-place** via table engines (e.g. Postgres, S3)'
      },
      bigquery: {
        icon: 'intermediate',
        label:
          'BigLake on object storage only; supports Avro, CSV, Delta Lake, Iceberg, JSON, ORC, Parquet'
      }
    },
    {
      heading: 'Support for third-party catalogs',
      clickhouse: {
        icon: 'yes',
        label: '**Third-party catalogs supported**'
      },
      bigquery: {
        icon: 'intermediate',
        label:
          '[AWS Glue only](https://cloud.google.com/bigquery/docs/glue-federated-datasets)'
      }
    },
    {
      heading: 'Change Data Capture (CDC)',
      clickhouse: {
        icon: 'yes',
        label: '**ClickPipes CDC** for MySQL and Postgres'
      },
      bigquery: {
        icon: 'yes',
        label: 'Via Datastream'
      }
    },
    {
      heading: 'Support for open table formats',
      subHeading: 'e.g. Iceberg, Parquet, ORC',
      clickhouse: {
        icon: 'yes',
        label: '**Open formats supported**'
      },
      bigquery: {
        icon: 'yes',
        label: 'Open formats supported'
      }
    }
  ]
} satisfies Table
