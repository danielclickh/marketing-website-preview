import { Table } from './index'

export default {
  name: 'Architecture',
  description: `### How do the OpenSearch and ClickStack architectures differ?
  
As a fork of Elasticsearch, OpenSearch is a **distributed search engine** built around **inverted indices and a shard-based architecture**. While effective for full-text search, this design introduces **high storage overhead**, **limited query parallelization,** and **heavy contention** between ingest and query workloads.

ClickStack is powered by ClickHouse, a database built on a **columnar, shared-nothing architecture** optimized for analytics. It minimizes storage with **advanced compression, parallelizes queries across all available cores,** and **separates storage from compute** in the cloud to deliver fast, efficient observability at scale. Full SQL support unlocks deep data analysis.`,
  rows: [
    {
      heading: 'Accurate aggregations for high cardinality',
      clickhouse: { icon: 'yes', label: '**Aggregate states for accuracy**' },
      opensearch: {
        icon: 'no',
        label: 'Terms aggregations are estimates and have slower performance'
      }
    },
    {
      heading: 'Object storage for reads and writes in OSS',
      clickhouse: { icon: 'yes', label: '**Native object storage support**' },
      opensearch: {
        icon: 'intermediate',
        label:
          'Remote backed storage supported for replicas only. S3-backed warm storage at lower performance.'
      }
    },
    {
      heading: 'Full columnar storage with high compression',
      clickhouse: {
        icon: 'yes',
        label: '**Columnar storage with high compression**'
      },
      opensearch: {
        icon: 'intermediate',
        label: 'Doc values provide columnar storage, not compressed'
      }
    },
    {
      heading: 'Streaming ingestion support',
      clickhouse: { icon: 'yes', label: '**ClickPipes** for streaming ingest' },
      opensearch: {
        icon: 'intermediate',
        label:
          'Requires Data Prepper/third parties or OpenSearch Ingestion Service for AWS managed instances'
      }
    },
    {
      heading: 'Native JSON support with type preservation',
      clickhouse: { icon: 'yes', label: '**JSON with type fidelity**' },
      opensearch: {
        icon: 'intermediate',
        label: 'First event field determines type, no type preservation'
      }
    },
    {
      heading: 'High query concurrency (1,000+ QPS per node)',
      clickhouse: { icon: 'yes', label: '**1,000+ QPS per node**' },
      opensearch: {
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
      opensearch: {
        icon: 'intermediate',
        label:
          'Limited with accuracy implications for terms aggregations; concurrent segment'
      }
    },
    {
      heading: 'Full join support for correlations',
      clickhouse: { icon: 'yes', label: '**Full join support**' },
      opensearch: { icon: 'intermediate', label: 'Limited Join support' }
    },
    {
      heading: 'Support for roll ups, downsampling and transforms',
      clickhouse: {
        icon: 'yes',
        label: '**Materialized views** (incremental & refreshable)'
      },
      opensearch: {
        icon: 'intermediate',
        label:
          'Limited incremental support; rollups and transforms typically rescan or aggregate large index segments per execution. Star-tree indexes precompute aggregates but support a narrow range of functions and filters.'
      }
    },
    {
      heading: 'SQL support',
      clickhouse: { icon: 'yes', label: '**Full SQL support**' },
      opensearch: { icon: 'intermediate', label: 'Limited syntax coverage' }
    },
    {
      heading: 'Shared-storage architecture with decoupled compute and storage',
      clickhouse: {
        icon: 'yes',
        label: '**Decoupled compute/storage (ClickHouse Cloud)**'
      },
      opensearch: {
        icon: 'intermediate',
        label:
          'AWS Serverless achieves partial decoupling via OCUs. Decoupling read/write paths comes at a high read/write latency (10s)'
      }
    },
    {
      heading: 'Stateless compute nodes with fast warm-up time',
      clickhouse: {
        icon: 'yes',
        label: '**Stateless compute nodes** (ClickHouse Cloud)'
      },
      opensearch: {
        icon: 'intermediate',
        label:
          'AWS OpenSearch Serverless only but compute does not idle. OCUs added in fixed increments depending on data volume.'
      }
    },
    {
      heading: 'Natural language search',
      clickhouse: {
        icon: 'yes',
        label: '**Lucene style search via HyperDX**'
      },
      opensearch: { icon: 'yes', label: 'Lucene search supported' }
    },
    {
      heading: 'Flexible deployment (self-managed & cloud)',
      clickhouse: { icon: 'yes', label: '**Self-managed & cloud**' },
      opensearch: {
        icon: 'yes',
        label: 'Self-managed & AWS OpenSearch + third party providers'
      }
    },
    {
      heading: 'Real-time ingest',
      clickhouse: { icon: 'yes', label: '**Real-time ingest** supported' },
      opensearch: { icon: 'yes', label: 'Real-time ingest supported' }
    },
    {
      heading: 'Micro batch/single row inserts',
      clickhouse: { icon: 'yes', label: '**Async inserts** for small batches' },
      opensearch: { icon: 'yes', label: 'Inserts supported' }
    },
    {
      heading: 'Inverted index support',
      clickhouse: { icon: 'yes', label: '**Inverted index support**' },
      opensearch: { icon: 'yes', label: 'Inverted index supported' }
    },
    {
      heading: 'HTTP REST interface',
      clickhouse: { icon: 'yes', label: '**REST API support**' },
      opensearch: { icon: 'yes', label: 'REST API supported' }
    },
    {
      heading: 'Data transformation at ingest time',
      clickhouse: { icon: 'yes', label: '**Incremental materialized views**' },
      opensearch: {
        icon: 'yes',
        label:
          'Ingest pipelines and AWS OpenSearch Ingestion Service for AWS instances'
      }
    }
  ]
} satisfies Table
