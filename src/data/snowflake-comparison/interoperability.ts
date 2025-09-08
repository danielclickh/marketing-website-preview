import { Table } from './index'

export default {
  name: 'Interoperability',
  description: `With fully-managed CDC via ClickPipes, ClickHouse makes it easy to stream changes from operational databases like Postgres or MySQL, enabling real-time analytics with minimal lag. Users benefit from unmatched interoperability, with support for over 70 file formats, external catalogs like Hive and Glue, and lakehouse formats such as Iceberg. External table engines let you query systems like Postgres, MongoDB, or S3 directly.

By contrast, Snowflake generally requires data to be staged in internal tables or external stages before it can be queried, with fewer direct “in-place” query options and no built-in engines to transparently join data from live transactional systems. While Snowflake does support external tables, these primarily target data lakes (e.g., in S3) and still typically rely on materialized metadata. `,
  rows: [
    {
      heading: 'File format support',
      clickhouse: {
        value: true,
        label: '**70+ formats** including Parquet, ORC, Avro, JSON, CSV'
      },
      snowflake: {
        value: false,
        label: 'Limited to common formats (e.g. Parquet, CSV)'
      }
    },
    {
      heading: 'External table engines',
      clickhouse: {
        value: true,
        label: '**Connect to Postgres, MongoDB, MySQL, S3, Kafka, and more**'
      },
      snowflake: {
        value: false,
        label: 'Object stores only'
      }
    },
    {
      heading: 'Query external data in-place',
      clickhouse: {
        value: true,
        label: '**Query in-place** via table engines (e.g. Postgres, S3)'
      },
      snowflake: {
        value: false,
        label: 'Requires ingestion or external functions'
      }
    },
    {
      heading: 'Change Data Capture (CDC)',
      clickhouse: {
        value: true,
        label: '**ClickPipes CDC** for MySQL and Postgres'
      },
      snowflake: {
        value: true,
        label: 'CDC supported'
      }
    },
    {
      heading: 'Support for open table and file formats',
      subHeading: 'e.g. Iceberg, Parquet, ORC',
      clickhouse: {
        value: true,
        label: '**Open format support**'
      },
      snowflake: {
        value: true,
        label: 'Open format support'
      }
    },
    {
      heading: 'Support for third-party catalogs',
      clickhouse: {
        value: true,
        label: '**Third-party catalogs supported**'
      },
      snowflake: {
        value: false,
        label: 'Third-party catalogs supported'
      }
    }
  ]
} satisfies Table
