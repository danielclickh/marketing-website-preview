import architecture from './architecture'
import interoperability from './interoperability'
import performance from './performance'
import scalability from './scalability'
import { CellIcons } from '@/components/ComparisonTable'

export type Table = {
  name: string
  description?: string
  rows: Array<{
    heading: string
    subHeading?: null | string
    clickhouse: {
      icon: CellIcons
      label: string
    }
    opensearch: {
      icon: CellIcons
      label: string
    }
  }>
}

// The order of items here defines the tab sequence in the UI
export const tables = [
  architecture,
  scalability,
  performance,
  interoperability
] as Array<Table>

export const faqs: Array<{ question: string; answer: string }> = [
  {
    question:
      'What is ClickStack and how is it different from OpenSearch Observability or the OpenSearch Stack?',
    answer: `ClickStack is a high-performance, open-source observability stack powered by ClickHouse. It unifies logs, metrics, traces, and session replays, delivering lightning-fast queries and efficient storage at any scale.

At a high level, OpenSearch Observability and ClickStack share a familiar shape: both include a data collection layer (Data Prepper and Fluent Bit vs. OpenTelemetry), a storage engine (OpenSearch vs. ClickHouse), and a UI (OpenSearch Dashboards vs. HyperDX). But beneath these similarities, the architectures diverge.

OpenSearch is based on the distributed search engine originally derived from Elasticsearch, built around inverted indices and a shard-based architecture. While effective for full-text search, this design introduces high storage overhead, limited query parallelization, and contention between ingest and query workloads.

ClickStack, powered by ClickHouse, takes a different approach. Its columnar, shared-nothing architecture is optimized for analytics, minimizing storage with advanced compression, parallelizing queries across all available cores, and separating storage from compute in the cloud for consistent, efficient performance. With full SQL support, ClickStack enables deep, real-time analysis across all your observability data while still supporting Lucene-style queries for fast searching.`
  },
  {
    question: 'What are the core components of ClickStack?',
    answer: `The ClickStack consists of three core components:

- ClickHouse – The columnar database powering fast, cost-efficient queries and compression.
- HyperDX – The unified UI for search, dashboards, alerts, and session replays.
- OpenTelemetry – Standardized data collection for logs, metrics, and traces.

Together, they form a single, integrated observability stack optimized for speed, scalability, and simplicity.`
  },
  {
    question:
      'Why is ClickStack faster than OpenSearch Observability workloads?',
    answer: `OpenSearch’s inverted-index architecture was designed for search, not analytics. As data volumes grow, aggregations become slow and memory-intensive, especially for high-cardinality fields. ClickStack uses ClickHouse’s columnar, vectorized engine to parallelize queries across all CPU cores, achieving sub-second analytics at petabyte scale. This typically results in 10× faster queries and more precise aggregations for high-cardinality data, while also supporting inverted indices for fast text search on specific columns when needed.`
  },
  {
    question:
      'How much more cost-effective is ClickStack compared to OpenSearch Observability?',
    answer: `ClickStack reduces infrastructure costs by up to 4x through advanced compression and efficient resource utilization. Its columnar design requires less hardware and storage, while decoupled compute and storage in ClickHouse Cloud lower operational overhead. Users such as Netflix, Shopee, and Didi have reported 50%+ storage reduction and major savings compared to traditional Lucene-based observability stacks.`
  },
  {
    question: 'Can I store logs, traces, and metrics in ClickStack?',
    answer: `Yes. ClickStack is a full observability platform designed to handle logs, traces, and metrics in one place. Built on ClickHouse, it efficiently ingests and stores high-cardinality OpenTelemetry data, automatically correlating events at the database layer for deep, real-time insights.`
  },
  {
    question: 'Is ClickStack compatible with OpenTelemetry?',
    answer: `Yes. ClickStack is built for OpenTelemetry at any scale. It includes a bundled OpenTelemetry Collector and natively ingests OTel events \\- combining logs, metrics, and traces into a unified model. Powered by ClickHouse’s parallel processing and columnar storage, ClickStack scales seamlessly from small deployments to petabytes of telemetry data while maintaining real-time performance.

Although ClickStack is OpenTelemetry-native, it also supports any wide-event format. While OpenTelemetry schemas are provided out of the box, users can bring their own \\- include a timestamp, and the HyperDX UI with ClickHouse delivers the same powerful querying, correlation, and visualization capabilities.`
  },
  {
    question: 'Is ClickStack only compatible with OpenTelemetry?',
    answer: `No. While ClickStack is optimized for the OpenTelemetry schema, making it the fastest way to get started and scale easily, it’s not limited to it. ClickHouse, the database powering ClickStack, can store and query any event schema.

The HyperDX UI requires only a timestamp field to render and visualize events, so you can use your own data formats or custom pipelines. By following a wide-events pattern and including a timestamp, your data becomes immediately usable within ClickStack.`
  },
  {
    question: 'How does ClickStack scale compared to OpenSearch Observability?',
    answer: `OpenSearch’s scalability is limited by its shard-based architecture and JVM heap constraints, which cap shard sizes and force horizontal sprawl as data grows. Queries only parallelize within shard boundaries, and node failures often trigger costly rebalances and performance degradation.

ClickStack, powered by ClickHouse, scales vertically and horizontally without these limits. It supports unlimited shard sizes, executes queries in parallel across all cores and replicas, and separates compute from storage for elastic scaling in the cloud. In ClickHouse Cloud, multiple compute warehouses can share the same data in S3, enabling read/write isolation, independent scaling, and cost-efficient long-term retention.

In short, ClickStack scales to petabytes with consistent performance, while OpenSearch’s architecture struggles beyond terabyte-scale workloads.`
  },
  {
    question: 'Is ClickStack open source?',
    answer: `Yes. ClickStack and its components are fully open source and built on open standards. ClickHouse and the OpenTelemetry Collector are licensed under Apache 2.0, with the HyperDX UI using the MIT license. You can deploy ClickStack anywhere \\- self-hosted, hybrid, or in any cloud, without restrictions.`
  },
  {
    question: 'Is there a hosted version of ClickStack?',
    answer: `Yes. ClickStack is available as a managed service in ClickHouse Cloud. It delivers the same open architecture with elastic scaling and full separation of storage and compute, allowing users to scale resources independently and isolate read and write workloads for consistent performance.

With advanced compression and cost-efficient object storage, data can be retained indefinitely at low cost. ClickHouse Cloud also includes automatic backups and zero operational overhead. The HyperDX UI is fully integrated and available at no additional cost, secured through ClickHouse Cloud authentication, and can be launched on any service.

A fully managed ClickStack offering is also planned for the future.`
  },
  {
    question: 'How does ClickStack differ from ClickHouse itself?',
    answer: `ClickStack is built on ClickHouse but extends it into a full observability platform. While ClickHouse is the high-performance analytical database at its core, ClickStack adds the surrounding ecosystem:

- **Data collection:** OpenTelemetry-native ingestion.

- **Visualization:** The HyperDX UI for log exploration, traces, and dashboards.

- **Prebuilt schema and integrations:** Optimized ClickHouse table engines, views, and storage models for observability data.

- **Deployment options:** Available as both open source (Helm charts) and in ClickHouse Cloud with managed scaling and storage separation.

In short, ClickHouse is the engine while ClickStack is the complete, ready-to-deploy stack built on top of it.`
  },
  {
    question:
      'Can I deploy ClickStack anywhere? How does it compare to OpenSearch in cloud flexibility?',
    answer: `Yes. ClickStack is fully cloud-agnostic and can run in ClickHouse Cloud, on-premises, or in any cloud provider environment. Its open architecture and use of open standards, such as OpenTelemetry and open table formats, ensure full portability without vendor lock-in.

OpenSearch is also open source and can be deployed anywhere, but its managed service, Amazon OpenSearch Service, is tightly integrated with AWS infrastructure and APIs. While convenient for AWS users, this coupling can make cross-cloud or hybrid deployments more complex. ClickStack provides the same managed experience while remaining independent of any specific cloud provider.`
  }
]
