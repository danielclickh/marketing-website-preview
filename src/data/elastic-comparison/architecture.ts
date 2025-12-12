import { Table } from './index'

export default {
  name: 'Architecture',
  description: `### How do the Elastic Observability and ClickStack architectures differ?
  
Elasticsearch is a **distributed search engine** built around **inverted indices and a shard-based architecture**. While effective for full-text search, this design introduces **high storage overhead**, **limited query parallelization,** and **heavy contention** between ingest and query workloads.

ClickStack is powered by ClickHouse, a database built on a **columnar, shared-nothing architecture** optimized for analytics. It minimizes storage with **advanced compression, parallelizes queries across all available cores,** and **separates storage from compute** in the cloud to deliver fast, efficient observability at scale. Full SQL support unlocks deep data analysis.`,
  rows: [
    {
      heading: 'Object storage for reads and writes in OSS',
      clickhouse: { icon: 'yes', label: '**Native object storage support**' },
      elastic: { icon: 'no', label: 'Paid, Elastic Cloud Serverless only' }
    },
    {
      heading: 'Accurate aggregations for high cardinality',
      clickhouse: { icon: 'yes', label: '**Aggregate states for accuracy**' },
      elastic: { icon: 'no', label: 'Terms aggregations are estimates' }
    },
    {
      heading: 'Full columnar storage with high compression',
      clickhouse: {
        icon: 'yes',
        label: '**Columnar storage with high compression**'
      },
      elastic: {
        icon: 'intermediate',
        label: 'Doc values provide columnar storage, not compressed'
      }
    },
    {
      heading: 'Streaming ingestion support',
      clickhouse: { icon: 'yes', label: '**ClickPipes** for streaming ingest' },
      elastic: {
        icon: 'intermediate',
        label: 'Requires Logstash/third parties, no hosted ingestion'
      }
    },
    {
      heading: 'Native JSON support with type preservation',
      clickhouse: { icon: 'yes', label: '**JSON with type fidelity**' },
      elastic: {
        icon: 'intermediate',
        label: 'First event field determines type'
      }
    },
    {
      heading: 'High query concurrency (1,000+ QPS per node)',
      clickhouse: { icon: 'yes', label: '**1,000+ QPS per node**' },
      elastic: {
        icon: 'intermediate',
        label: 'Requires horizontal scaling/replicas'
      }
    },
    {
      heading: 'Parallelized query execution',
      clickhouse: {
        icon: 'yes',
        label: '**Full parallelization** within & across shards'
      },
      elastic: {
        icon: 'intermediate',
        label:
          'Limited with accuracy implications for terms aggregations; concurrent segment'
      }
    },
    {
      heading: 'Full join support for correlations',
      clickhouse: { icon: 'yes', label: '**Full join support**' },
      elastic: { icon: 'intermediate', label: 'LOOKUP JOIN only' }
    },
    {
      heading: 'Support for roll ups, downsampling and transforms',
      clickhouse: {
        icon: 'yes',
        label: '**Materialized views** (incremental & refreshable)'
      },
      elastic: {
        icon: 'intermediate',
        label: 'Limited types; requires full scans'
      }
    },
    {
      heading: 'SQL support',
      clickhouse: { icon: 'yes', label: '**Full SQL support**' },
      elastic: { icon: 'intermediate', label: 'Limited syntax coverage' }
    },
    {
      heading: 'Natural language search',
      clickhouse: {
        icon: 'yes',
        label: '**Lucene style search via HyperDX**'
      },
      elastic: { icon: 'yes', label: 'Lucene search supported' }
    },
    {
      heading: 'Flexible deployment (self-managed & cloud)',
      clickhouse: { icon: 'yes', label: '**Self-managed & cloud**' },
      elastic: { icon: 'yes', label: 'Self-managed & Elastic Cloud' }
    },
    {
      heading: 'Shared-storage architecture with decoupled compute and storage',
      clickhouse: {
        icon: 'yes',
        label: '**Decoupled compute/storage (ClickHouse Cloud)**'
      },
      elastic: { icon: 'yes', label: 'Elastic Cloud Serverless' }
    },
    {
      heading: 'Stateless compute nodes with fast warm-up time',
      clickhouse: {
        icon: 'yes',
        label: '**Stateless compute nodes** (ClickHouse Cloud)'
      },
      elastic: { icon: 'yes', label: 'Elastic Cloud Serverless' }
    },
    {
      heading: 'Real-time ingest',
      clickhouse: { icon: 'yes', label: '**Real-time ingest** supported' },
      elastic: { icon: 'yes', label: 'Real-time ingest supported' }
    },
    {
      heading: 'Micro batch/single row inserts',
      clickhouse: { icon: 'yes', label: '**Async inserts** for small batches' },
      elastic: { icon: 'yes', label: 'Inserts supported' }
    },
    {
      heading: 'Inverted index support',
      clickhouse: { icon: 'yes', label: '**Inverted index support**' },
      elastic: { icon: 'yes', label: 'Inverted index supported' }
    },
    {
      heading: 'HTTP REST interface',
      clickhouse: { icon: 'yes', label: '**REST API support**' },
      elastic: { icon: 'yes', label: 'REST API supported' }
    },
    {
      heading: 'Data transformation at ingest time',
      clickhouse: { icon: 'yes', label: '**Incremental materialized views**' },
      elastic: { icon: 'yes', label: 'Ingest pipelines' }
    }
  ]
} satisfies Table
