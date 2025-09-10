import { Table } from './index'

export default {
  name: 'Interoperability',
  description: `ClickHouse, with fully managed CDC via ClickPipes, streams changes from databases like Postgres or MySQL for real-time analytics. With support for **70+ file formats, catalogs like Hive and Glue, lakehouse formats such as Iceberg**, and external engines to query sources like Postgres, MongoDB, or S3 directly, ClickHouse offers unmatched interoperability.

Snowflake typically requires staging data in internal tables or external stages before querying. It offers fewer direct query options and no built-in engines for joins against external systems. External tables mainly target data lakes (e.g., S3) and still rely on materialized metadata.`,
  rows: [
    {
      heading: 'Support for third-party catalogs',
      clickhouse: {
        icon: 'yes',
        label: '**Third-party catalogs supported**'
      },
      snowflake: {
        icon: 'no',
        label: 'Third-party catalogs supported'
      }
    },
    {
      heading: 'File format support',
      clickhouse: {
        icon: 'yes',
        label: '**70+ formats** including Parquet, ORC, Avro, JSON, CSV'
      },
      snowflake: {
        icon: 'intermediate',
        label: 'Limited to common formats (e.g. Parquet, CSV)'
      }
    },
    {
      heading: 'External table engines',
      clickhouse: {
        icon: 'yes',
        label: '**Connect to Postgres, MongoDB, MySQL, S3, Kafka, and more**'
      },
      snowflake: {
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
      snowflake: {
        icon: 'intermediate',
        label: 'Requires ingestion or external functions'
      }
    },
    {
      heading: 'Change Data Capture (CDC)',
      clickhouse: {
        icon: 'yes',
        label: '**ClickPipes CDC** for MySQL and Postgres'
      },
      snowflake: {
        icon: 'yes',
        label: 'CDC supported'
      }
    },
    {
      heading: 'Support for open table and file formats',
      subHeading: 'e.g. Iceberg, Parquet, ORC',
      clickhouse: {
        icon: 'yes',
        label: '**Open format support**'
      },
      snowflake: {
        icon: 'yes',
        label: 'Open format support'
      }
    }
  ]
} satisfies Table
