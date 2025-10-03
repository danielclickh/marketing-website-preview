---
title: 'Open table formats'
slug: 'open-table-formats'
excerpt: "In this guide, we'll explore the Iceberg, Delta Lake, and Hudi open table formats."
index: 19
lastUpdated: '2025-05-09'
---

Data lakes are popular for storing [structured, semi-structured, or unstructured data](https://clickhouse.com/engineering-resources/structured-unstructured-semi-structured-data). Parquet files, which can handle large volumes efficiently, are often used to store this data. 

Each Parquet file can have its own schema, which provides much flexibility, but it becomes problematic when you query multiple files. If the schema of one file doesn’t match another, your queries can fail, making it difficult to analyze or pull insights from data spread across the lake.

Data evolves, and you might need to update or change the schema as your data grows. However, changing the schema in one file can break things at query time. If your query engine reads one file first and infers a schema, it will fail if it encounters a file with a different schema.

So, how do we handle this? The answer lies in open table formats.

## What are open table formats?

Open table formats introduce a layer of metadata management on top of your Parquet files. This ensures that all your files follow a consistent schema, even as their data evolves.

Think of it like giving your Parquet files the structure and reliability of a traditional database table. With open table formats, schema consistency is guaranteed, and you can easily evolve your schema without breaking queries or data processing. You interact with the open table format’s API to manage this consistency, rather than modifying the Parquet files directly.

This approach lets you maintain metadata governance and ensure a consistent view of your data, even as you scale and evolve your data lake.

## Which are the main open table formats?

Key players in open table formats include Iceberg, Hudi, and Delta Lake. Different companies developed these formats to solve similar problems with data lakes, which is why we now have multiple competing options.

### Iceberg

Netflix initially developed [Iceberg](https://clickhouse.com/engineering-resources/apache-iceberg) to address the challenges of managing large datasets in data lakes. As the project gained traction, the creators spun out a company called [Tabular](https://www.tabular.io/blog/introducing-tabular/) to continue its development. Eventually, [Tabular was acquired by Databricks](https://www.databricks.com/blog/databricks-tabular), which also develops the Delta Lake format. So while Iceberg started at Netflix, Databricks now plays a role in both formats.

### Delta Lake

[Delta Lake](https://delta.io/) is an open-source project developed by Databricks. Like Iceberg, it provides a way to manage large-scale data and ensure ACID transactions and schema evolution. Delta Lake is widely used in the Databricks ecosystem and helps users achieve reliability and consistency in their data lakes, especially when working with Parquet files.

### Hudi

Hudi [was developed at Uber](https://www.uber.com/en-GB/blog/hoodie/) to handle large-scale datasets with the ability to manage updates and deletes efficiently. Hudi is also open-source and provides features to streamline data ingestion and ensure consistency across large datasets. While it's less commonly used than Iceberg or Delta Lake, it's still a strong contender, especially for use cases requiring complex updates. 

## What features do open table formats provide?

Open table formats bring several powerful features to data lakes, addressing the limitations of working directly with immutable Parquet files.

### CRUD operations

In a typical database, we can apply CRUD (Create, Read, Update, and Delete) operations. However, data stored in a data lake is typically immutable, meaning you can’t easily update or delete it. 

To make changes, you'd have to write a new version of a file. When querying the data, we’d need to remember which version of the file to query. This limitation means you can only perform Create and Read operations (C and R) on your data.

Open table formats change this by enabling efficient updates and data deletion, enabling the U and D in CRUD.

### ACID transactions

Another benefit of open table formats is support for ACID transactions (Atomicity, Consistency, Isolation, Durability). This enables multiple updates to the data to be made concurrently without conflicts, ensuring that your data remains consistent even as it evolves. With ACID support, open table formats make data lakes more reliable, allowing for complex, concurrent data operations without the risk of data corruption or inconsistencies.

### Schema evolution

Open table formats allow for seamless schema evolution. This means you can change your data schema without breaking existing queries or applications that depend on the data. Whether adding new fields, changing data types, or making other adjustments, the format ensures your data can evolve without disrupting processes.

### Partition pruning and query optimizations

Optimizing queries to avoid scanning every file in your data lake is essential when working with large datasets. Open table formats support partition pruning, which allows the query engine to skip irrelevant partitions and only scan the necessary data. This drastically improves query performance and reduces costs.

In addition to partition pruning, other optimizations, such as predicate pushdown and indexing, can speed up queries by processing data more efficiently at the storage layer.

### Time travel and data versioning

Some open table formats support time travel and data versioning. This allows you to query historical versions of your data or revert to a previous state if something goes wrong. Time travel makes it easy to track changes over time, compare different versions of your data, or recover from mistakes by returning to a known good state.

## Writing open table formats

Writing data to open table formats is typically done using **Apache Spark**, a powerful tool for distributed data processing. Spark integrates well with Iceberg, Delta Lake, and Hudi.

The real advantage of using Spark to write data to open table formats is scalability. Spark enables you to process and write massive datasets in parallel, which is crucial when working with data lakes that store petabytes of information. 

The [**PyIceberg**](https://py.iceberg.apache.org/) library is [becoming increasingly popular for writing to Iceberg](https://clickpy.clickhouse.com/dashboard/pyiceberg). The library provides an easy-to-use interface for interacting with Iceberg tables, allowing users to write and manage data efficiently. 

## Querying open table formats

**Spark** is still one of the most commonly used engines for querying data in open table formats, particularly for large-scale, distributed data processing. 
However, progress has been made, and now other distributed query engines and real-time analytical databases can query open table formats.

### Distributed Query Engines

**Trino** (formerly known as Presto) is a powerful distributed query engine that can directly query open table formats. 
It can handle large datasets across multiple storage systems and work with data in formats like Iceberg, Hudi, and Delta Lake. 
Trino allows users to query data with high performance and low latency, making it an excellent choice for interactive analytics.

### Real-Time Analytical Databases

**ClickHouse** also supports [querying open table formats](https://clickhouse.com/blog/climbing-the-iceberg-with-clickhouse). 
This allows for fast, low-latency queries across massive datasets stored in these formats, combining the power of open table formats with the speed of real-time analytics.

Below is an example of querying an Iceberg table from ClickHouse:

<pre><code type='click-ui' language='sql'>
SELECT
    round(avg(devices), 2) AS avg_devices,
    arrayMap(m -> round(m / 1000), quantiles(0.5, 0.9, 0.99, 0.999)(avg_d_kbps)) AS download_mbps
FROM iceberg('https://datasets-documentation.s3.eu-west-3.amazonaws.com/ookla/iceberg/');
</code></pre>
