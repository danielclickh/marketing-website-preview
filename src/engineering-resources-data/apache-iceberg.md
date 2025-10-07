---
title: 'Apache Iceberg'
slug: 'apache-iceberg'
excerpt: "Apache Iceberg transforms data lakes into robust lakehouse architectures with its high-performance table format. This article explores Iceberg's origins, key features like ACID transactions and schema evolution, and demonstrates how to query Iceberg tables in ClickHouse using both direct and catalog-based approaches."
index: 22
lastUpdated: '2025-05-21'
---
  
[Apache Iceberg](https://iceberg.apache.org/) has emerged as a pivotal innovation in data management, fundamentally transforming the traditional "Data Lake" concept into the more robust ["Lake House"](https://clickhouse.com/engineering-resources/data-lakehouse) architecture. At its core, Iceberg provides a high-performance table format that brings sophisticated table-like semantics to structured data stored in data lakes, addressing many limitations previously constrained by these systems.

As a vendor-agnostic open table format, Iceberg creates an abstraction layer over structured data files (primarily Parquet) that exposes them as tables with advanced capabilities. These include schema evolution, deletes, updates, transactions, and ACID compliance—features traditionally associated with relational databases rather than data lakes. This represents a significant evolution beyond legacy data lake implementations based on technologies like Hadoop and Hive.

One of Iceberg's most valuable attributes is its ability to enable multiple query engines, such as Spark and Trino, to safely work with the same tables concurrently. The format also implements sophisticated partitioning strategies that query planners can leverage to accelerate query performance dramatically.

Iceberg's journey began at Netflix, where it was developed to address the challenges of managing massive datasets in data lakes. As the project gained momentum, the creators established [Tabular](https://www.tabular.io/blog/introducing-tabular/), a company focused on Iceberg's continued development. In a notable industry shift, [Tabular was later acquired by Databricks](https://www.databricks.com/blog/databricks-tabular) - the company behind the competing Delta Lake format - creating an interesting dynamic in the open table format ecosystem.

## Why do we need Apache Iceberg?

[Open table formats](https://clickhouse.com/engineering-resources/open-table-formats) introduce a layer of metadata management on top of your Parquet files. This ensures that all your files follow a consistent schema, even as their data evolves.

Think of it like giving your Parquet files the structure and reliability of a traditional database table. With open table formats, schema consistency is guaranteed, and you can easily evolve your schema without breaking queries or data processing. You interact with the open table format’s API to manage this consistency, rather than modifying the Parquet files directly.

This approach lets you maintain metadata governance and ensure a consistent view of your data, even as you scale and evolve your data lake.

## What are the features of Apache Iceberg?

Open table formats have emerged as a critical innovation in data lake architecture, addressing many limitations plaguing data lakes. These formats provide a structured approach to organizing and managing data while maintaining the flexibility and scalability that make data lakes attractive. Open table formats transform raw data storage into robust, database-like systems by introducing a metadata layer that tracks file locations, schema information, partitioning details, and data statistics.

The key features of open table formats - CRUD operations, ACID transactions, schema evolution, query optimizations, and time travel capabilities - collectively solve the "small files problem," enable concurrent modifications, prevent data corruption, and dramatically improve query performance. These capabilities bridge the gap between data lakes' flexibility and traditional databases' reliability, creating a "lakehouse" architecture.

Apache Iceberg is one of today's most mature and feature-complete open table formats. It has gained widespread adoption across industries for its robust implementation of these critical features.

### CRUD operations

Iceberg fully supports all CRUD operations through its versioned metadata approach. While traditional data lakes only effectively support Create and Read operations, Iceberg enables true Updates and Deletes without rewriting entire datasets. Each table state is represented by a metadata file pointing to the relevant data files, allowing Iceberg to track changes efficiently. When updates or deletes occur, Iceberg creates new metadata that excludes or modifies the affected rows without physically altering the original files, making these operations practical and efficient.

### ACID transactions

Iceberg provides complete ACID transaction support through atomic metadata operations and optimistic concurrency control. This allows multiple writers to work simultaneously without conflicts. Iceberg atomically updates the table metadata when a transaction commits, ensuring readers see a consistent view of the data. If concurrent writers attempt to modify the same data, Iceberg detects the conflict and requires one transaction to retry, maintaining consistency. This approach ensures that tables remain valid and committed changes survive system failures.

### Schema evolution

Iceberg excels at schema evolution by tracking schema changes in the table metadata. This allows older queries to continue working with the schema they expect, while newer queries can use the updated schema. Iceberg supports adding, dropping, and renaming fields, promoting types (e.g., int to long), adjusting required/optional field status, and reordering fields without breaking compatibility. This flexibility enables data models to evolve without disrupting existing processes or requiring costly migrations.

### Partition pruning and query optimizations

Iceberg implements advanced query optimization techniques through its metadata-driven approach. Iceberg stores partition information in metadata. This allows for partition evolution without data migration. Iceberg also stores statistics like min/max values and null counts for columns, enabling data skipping during queries. When a query includes filters, Iceberg uses these statistics to avoid reading files that can't contain matching records, dramatically reducing the amount of data scanned.

### Time travel and data versioning

Iceberg provides robust time travel capabilities by preserving the complete history of table changes. Each modification creates a new snapshot, allowing users to query data at a specific time, access data by snapshot ID, or roll back to previous versions when needed. This feature is invaluable for auditing, reproducing historical analyses, or recovering from errors. Iceberg maintains this history efficiently by tracking the lineage of data changes and reusing unchanged files across snapshots.

Iceberg's comprehensive implementation of these features makes it particularly well-suited for large-scale data lake management where reliability, performance, and flexibility are critical requirements. As organizations continue to build data-driven applications and analytics platforms, Iceberg provides the foundation for scalable, reliable data management that can evolve with changing business needs.

## Clickhouse and Apache Iceberg

ClickHouse has made significant progress in expanding its Iceberg support over the last year, despite the lack of a C++ library implementation. While this limitation has made it challenging to support some of the latest features like deleted rows, ClickHouse now supports partition pruning, schema evolution, and time travel. The team plans to complete support for Iceberg v2 features before moving on to v3.

Let’s look at how to go about querying Iceberg tables in ClickHouse.

### Direct Query Using Table Function/Engine

ClickHouse provides a straightforward way to access Iceberg tables directly through the [`iceberg` table function](https://clickhouse.com/docs/engines/table-engines/integrations/iceberg). This approach allows you to query Iceberg tables stored in S3 or other supported storage systems without requiring an external catalog service:

<pre><code type='click-ui' language='sql'>
SELECT
    round(avg(devices), 2) AS avg_devices,
    arrayMap(m -> round(m / 1000), quantiles(0.5, 0.9, 0.99, 0.999)(avg_d_kbps)) AS download_mbps
FROM iceberg('https://datasets-documentation.s3.eu-west-3.amazonaws.com/ookla/iceberg/');
</code></pre>

### Query via Data Catalog

For organizations that manage their data through metadata catalogs, ClickHouse supports connecting to [services like AWS Glue](https://clickhouse.com/docs/use-cases/data-lake/glue-catalog). This approach integrates with your existing data governance infrastructure and provides a unified way to access tables across your organization:

<pre><code type='click-ui' language='sql'>
CREATE DATABASE glue
ENGINE = DataLakeCatalog
SETTINGS 
    catalog_type = 'glue', 
    region = 'us-west-2', 
    aws_access_key_id = '<access-key>', 
    aws_secret_access_key = '<secret-key>';

SELECT count(*) 
FROM `iceberg-benchmark.hitsiceberg`;
</code></pre>