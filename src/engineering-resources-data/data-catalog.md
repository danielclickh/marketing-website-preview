---
title: 'Data catalog'
slug: 'data-catalog'
excerpt: "In this guide, we'll explore data catalogs for open table formats like Iceberg, Delta Lake, and Hudi, explaining how these metadata systems make modern data lakes more powerful and accessible."
index: 20
lastUpdated: '2025-05-09'
---

Data catalogs are essential for modern data architectures, but they're often misunderstood or overlooked. Let's explore what data catalogs are, why they matter for open table formats, and how they enable powerful analytical capabilities.

## What is a data catalog?

A data catalog is a centralized repository that stores metadata about an organization's data assets. It serves as an index or inventory system for data, making data assets discoverable, understandable, and manageable. 

Fundamentally, a data catalog is an architectural component rather than a standalone product \- it's a system that tracks where data and metadata reside without necessarily storing the actual data itself.       

In this article, we will focus on data catalogs for [open table formats](https://clickhouse.com/engineering-resources/open-table-formats) \- a specialized type of catalog designed to work with modern analytical data stored in columnar file formats like Apache Parquet and managed through table frameworks such as Apache Iceberg, Delta Lake, or Apache Hudi. These specialized catalogs address the unique requirements of data lakehouse architectures, where performance, scalability, and transactional capabilities are paramount.

Unlike general-purpose data catalogs that might cover a wide range of data assets (from traditional databases to unstructured documents), open table format catalogs are optimized for tracking table states, schema versions, and optimization metadata specifically for analytical data workloads. They function as the critical lookup system for query engines to locate and process data stored across distributed storage systems efficiently. They provide the technical metadata for operations like partition pruning, predicate pushdown, and time travel queries.

These catalogs enable multiple processing engines to consistently access the same datasets with transactional guarantees, even as the underlying data evolves through updates, schema changes, and optimization operations.

## What are the characteristics of a data catalog?

Now we know what a data catalog is, let’s learn about some of its characteristics.

### Metadata repository

Its function as a metadata repository is at the core of any data catalog. For open table formats, this repository stores specialized metadata about table assets, including their current version, schema definitions, and file locations, without containing the data itself. The metadata is typically structured hierarchically, organized into elements such as databases or schemas, tables, and columns. In open table catalogs, this structure often includes additional technical metadata like partition specifications, file manifests, and statistics that enable efficient query planning. This structure provides a single source of truth about all table assets within an organization, allowing query engines to understand what data exists and how to access it efficiently.

### Data discovery and classification

Data catalogs for open table formats provide mechanisms for data discovery and classification tailored to analytical workloads. While they may include automated discovery tools that scan data sources, these catalogs often work with explicit table registrations rather than general-purpose crawlers. In open table ecosystems, the focus shifts from general classification to tracking specific table properties like format version, optimization status, and transaction history. Search functionality still allows users to find relevant tables across the organization, but with additional technical context specific to analytical processing needs.

### Schema management

Schema management is particularly critical for open table format catalogs. They track current schemas and maintain a history of schema evolution, enabling time travel queries and ensuring backward compatibility. Open table catalogs specialize in handling the complex schema evolution patterns supported by formats like Iceberg, Delta Lake, and Hudi, including column additions, removals, and type changes. While these catalogs primarily focus on structured data in columnar formats like Parquet and ORC, they provide sophisticated versioning capabilities that ensure consistent data access even as schemas evolve.

### Access control and security

Security remains paramount in open table format catalogs, which implement access control mechanisms for analytical workloads. They define and enforce permission models that determine who can access specific tables and operations, often integrating with data governance frameworks like Apache Ranger or AWS Lake Formation. For open table formats, these controls may extend to specific operations like compaction, schema evolution, or time travel queries. These integrate with organizational identity systems to ensure consistent security policies across the data lakehouse ecosystem.

### Lineage and governance

Open table format catalogs maintain specialized lineage information, tracking data origins and the sequence of transactions and operations performed on tables. This capability is essential for features like time travel, where users need to access specific historical versions of data. For open table formats, governance features focus on ensuring data integrity, tracking optimization operations, and maintaining audit trails of schema and data changes. This technical lineage information complements broader data governance initiatives by providing a detailed operational history.

### Integration capabilities

A key strength of open table format catalogs is their ability to integrate with diverse query engines and processing frameworks. They provide consistent interfaces that allow engines like Spark, Flink, Trino, and ClickHouse to access the same table definitions and metadata. This engine-agnostic approach ensures that different tools can work with the same data without inconsistencies. Open table catalogs typically offer standardized APIs based on specifications like the Iceberg API or Delta Protocol, enabling interoperability across the modern data stack. This integration capability is essential for building flexible data architectures that avoid vendor lock-in.

## What are some common data catalogs?

Several data catalog implementations have emerged to support open table formats, each with different strengths, integration capabilities, and deployment models. Below, we describe some of the most common data catalogs.

### Apache Hive Metastore

The [Apache Hive Metastore](https://hive.apache.org/) is the original and most widely supported catalog for big data ecosystems. Despite being developed before modern open table formats, it remains a common choice due to its universal compatibility with data processing engines. However, it lacks native features specifically designed for the advanced capabilities of open table formats.

### AWS Glue Data Catalog

[AWS Glue Data Catalog](https://docs.aws.amazon.com/glue/latest/dg/manage-catalog.html) is a fully managed, serverless catalog service that has added native support for open table formats. It integrates deeply with AWS services like Athena, EMR, and Redshift, providing a zero-maintenance option for organizations already operating in the AWS ecosystem.

### Databricks Unity Catalog

[Unity Catalog](https://www.databricks.com/product/unity-catalog) is Databricks' metadata management solution designed primarily for Delta Lake but expanding to support other formats. It offers unified governance across data, AI models, and notebooks with multi-cloud support spanning AWS, Azure, and GCP.

### Project Nessie

[Project Nessie](https://projectnessie.org/) is an open-source catalog specifically designed for open table formats. It focuses on Git-like versioning semantics and enables Git-inspired operations like branches and commits for data, making it particularly suitable for collaborative data engineering workflows.

## Querying data catalogs with ClickHouse

ClickHouse offers seamless integration with popular data catalogs, allowing you to directly leverage existing metadata repositories and query open table formats. This capability transforms ClickHouse from a standalone analytical database into a powerful query engine that can work with your existing data lake infrastructure.       

### Querying Unity Catalog with ClickHouse

ClickHouse can connect directly to [Unity Catalog](https://clickhouse.com/docs/use-cases/data-lake/unity-catalog), enabling you to query Delta Lake and Iceberg tables without data duplication. For Delta Lake tables, the configuration is straightforward:

<pre><code type='click-ui' language='sql'>
CREATE DATABASE unity
ENGINE = DataLakeCatalog('https://<workspace-id>.cloud.databricks.com/api/2.1/unity-catalog')
SETTINGS   
  warehouse = 'CATALOG_NAME',   
  catalog_credential = '<PAT>',   
  catalog_type = 'unity';
</code></pre>

ClickHouse also supports Iceberg tables through Unity Catalog's REST interface, offering more flexibility with OAuth authentication:       

<pre><code type='click-ui' language='sql'>
CREATE DATABASE unity
ENGINE = DataLakeCatalog('https://<workspace-id>.cloud.databricks.com/api/2.1/unity-catalog/iceberg')
SETTINGS   
  catalog_type = 'rest',   
  catalog_credential = '<client-id>:<client-secret>',   
  warehouse = 'workspace', 
  oauth_server_uri = 'https://<workspace-id>.cloud.databricks.com/oidc/v1/token',   
  auth_scope = 'all-apis,sql';
</code></pre>

Once configured, you can query the underlying tables using standard SQL syntax, just as you would with native ClickHouse tables. The catalog abstraction makes the experience seamless:

<pre><code type='click-ui' language='sql'>
SELECT count(*)
FROM `uniform.delta_hits`;
</code></pre>

Behind the scenes, ClickHouse leverages Unity Catalog's metadata to locate the data files, optimize query planning, and apply predicate pushdown where possible, delivering impressive performance even on large datasets.       

### Querying AWS Glue Catalog with ClickHouse

ClickHouse integrates with the [AWS Glue Catalog](https://clickhouse.com/docs/use-cases/data-lake/glue-catalog) to provide direct access to tables defined in your AWS environment. Setting up the connection requires AWS credentials and region information:

<pre><code type='click-ui' language='sql'>
CREATE DATABASE glue
ENGINE = DataLakeCatalog
SETTINGS
   catalog_type = 'glue',
   region = 'us-west-2',
   aws_access_key_id = '<access-key>',
   aws_secret_access_key = '<secret-key>';
</code></pre>

You can also use IAM roles instead of hardcoded credentials for enhanced security in production environments, particularly when running ClickHouse on EC2 instances or EKS clusters with appropriate IAM permissions.

After establishing the connection, you can query Iceberg tables registered in the Glue Catalog:

<pre><code type='click-ui' language='sql'>
SELECT count(*) FROM `iceberg-benchmark.hitsiceberg`;
</code></pre>

This integration is compelling for AWS-centric architectures, allowing you to maintain a single source of truth in the Glue Catalog while enabling ClickHouse to serve as a high-performance query engine for interactive analytics.       
