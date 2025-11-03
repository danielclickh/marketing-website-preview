import { Table } from './index'

export default {
  name: 'Interoperability',
  description: `Splunk’s interoperability is constrained by its closed architecture and reliance on proprietary SPL. While it offers good OpenTelemetry and Kafka integration, it requires data to be ingested and indexed before querying. This limits flexibility for external or historical datasets. It lacks support for open table and file formats such as Parquet or Iceberg, has no catalog integration, and provides only limited SQL connectivity through SDKs or REST APIs.

ClickStack embraces open standards across ingestion, query, and storage. It supports both streaming and batch ingestion via OpenTelemetry, Kafka, HTTP, and S3, while offering full SQL for analytics alongside native engines for MySQL, PostgreSQL, MongoDB, and Iceberg. With native Parquet and Iceberg support, external table querying, and standard JDBC/ODBC access, ClickStack integrates seamlessly into modern data ecosystems without vendor lock-in.`,
  rows: [
    {
      heading: 'Standard query language',
      clickhouse: {
        icon: 'yes',
        label: 'Full SQL with hundreds of analytical and statistical functions.'
      },
      splunk: {
        icon: 'no',
        label: 'Proprietary SPL; limited interoperability with SQL-based tools.'
      }
    },
    {
      heading: 'External data querying (“query in place”)',
      clickhouse: {
        icon: 'yes',
        label:
          'Query external data directly using table engines and functions (e.g., s3, url, hdfs, mysql, postgresql).'
      },
      splunk: {
        icon: 'no',
        label:
          'Must ingest and index before search; no native query-in-place capability.'
      }
    },
    {
      heading: 'Support for open table formats',
      clickhouse: {
        icon: 'yes',
        label:
          'Reads Parquet, Iceberg, and other open formats natively from S3, HDFS, and local storage.'
      },
      splunk: {
        icon: 'no',
        label:
          'No native support for Parquet, Iceberg, or ORC as queryable sources.'
      }
    },
    {
      heading: 'Third-party catalog integration',
      clickhouse: {
        icon: 'yes',
        label:
          'Integrates with catalogs such as **Unity, Nessie, AWS Glue** for open table formats.'
      },
      splunk: { icon: 'no', label: 'No catalog support.' }
    },
    {
      heading: 'External database connectivity',
      clickhouse: {
        icon: 'yes',
        label:
          'Native table engines for PostgreSQL, MySQL, MongoDB, and ODBC/JDBC sources.'
      },
      splunk: {
        icon: 'intermediate',
        label:
          'Limited to Splunk DB Connect app (separate plugin); slower, ETL-style integration.'
      }
    },
    {
      heading: 'Batch and streaming ingestion',
      clickhouse: {
        icon: 'yes',
        label:
          'Supports both: streaming via Kafka/HTTP/OTel, batch via S3, Parquet, and bulk inserts.'
      },
      splunk: {
        icon: 'intermediate',
        label:
          'Primarily streaming via forwarders, HEC, or Kafka Connect; lacks native batch ingestion.'
      }
    },
    {
      heading: 'Interoperability with analytics & BI tools',
      clickhouse: {
        icon: 'yes',
        label:
          'MySQL SQL + JDBC/ODBC drivers allow direct connection from BI and AI platforms.'
      },
      splunk: {
        icon: 'intermediate',
        label:
          'Limited integration via Splunk SDKs or REST API; not natively accessible via SQL clients.'
      }
    },
    {
      heading: 'OpenTelemetry support',
      clickhouse: {
        icon: 'yes',
        label:
          'OpenTelemetry-native. Accepts OTel traces, logs, and metrics directly.'
      },
      splunk: {
        icon: 'yes',
        label:
          'Strong support via Splunk distribution of OTel Collector and Splunk Observability Cloud integrations.'
      }
    },
    {
      heading: 'Kafka ingestion',
      clickhouse: {
        icon: 'yes',
        label:
          'Native Kafka table engine and ClickPipes in Cloud for high-throughput streaming ingest.'
      },
      splunk: {
        icon: 'yes',
        label:
          'Supported via Splunk Connect for Kafka (Kafka Connect sink) feeding HEC; external connector required.'
      }
    },
    {
      heading: 'Support for open file formats (CSV, JSON, Parquet)',
      clickhouse: {
        icon: 'yes',
        label:
          'Reads/writes natively without conversion; schema-on-write or schema-on-read both supported.'
      },
      splunk: { icon: 'yes', label: 'Must parse at ingest' }
    }
  ]
} satisfies Table
