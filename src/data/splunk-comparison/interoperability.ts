import { Table } from './index'

export default {
  name: 'Interoperability',
  description: `Splunk’s closed architecture and proprietary SPL limit interoperability. Though it integrates with OpenTelemetry and Kafka, all data must be ingested and indexed before querying, restricting flexibility with external or historical data. It lacks support for open formats like Parquet or Iceberg, catalog integration, and offers only limited SQL access via SDKs or APIs.

ClickStack embraces open standards across ingestion, query, and storage. It supports streaming and batch ingestion via OpenTelemetry, Kafka, HTTP, and S3, with full SQL and native engines for MySQL, PostgreSQL, MongoDB, and Iceberg. Native Parquet and Iceberg support, external table querying, and standard JDBC/ODBC access enable seamless integration into modern data stacks without lock-in.`,
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
