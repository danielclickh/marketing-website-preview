import { Table } from './index'

export default {
  name: 'Interoperability',
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
