---
title: 'Database compression'
slug: 'database-compression'
excerpt: "Learn how databases compress data, the trade-offs between row and column storage, and why ClickHouse delivers industry-leading compression ratios."
index: 32
lastUpdated: '2025-09-17'
---

Modern applications generate staggering amounts of data: logs, metrics, events, transactions, user activity, telemetry. Storing and querying all of it at scale quickly becomes expensive and slow if the database simply writes every byte as-is. That’s why compression is a cornerstone of database design. By reducing how much space data consumes on disk and in memory, compression lowers storage costs, improves query performance, and enables use cases that would otherwise be impractical.  

In this article, we’ll explore why databases compress data, the main techniques used (row-based and [column-based](https://clickhouse.com/engineering-resources/what-is-columnar-database)), the trade-offs between compression ratio and performance, and which systems achieve the best results. Along the way, we’ll see why columnar databases — and ClickHouse in particular — stand out for delivering both high compression ratios and fast analytical queries at scale.  

## Why do databases compress data?

Data arrives in a database from all sorts of sources: application logs, metrics, transactions, events, and so on. 
Some data arrives already in a compact form, while other sources are far more verbose. 
Once that data enters the database, the challenge is figuring out how to store it in the most efficient way possible.

In 2025, storage volumes can easily run into terabytes or petabytes. 
Without compression, those datasets quickly become expensive to manage and slow to query. 

This is where compression comes to the rescue.
At the most fundamental level, compression reduces the number of bytes stored on disk. 
But the benefits ripple much further, as shown in the table below:

| Benefit | Why it matters |
|---------|----------------|
| Lower storage costs | Disk space is not free. Whether you manage your own hardware or use cloud storage, fewer bytes means a smaller bill. |
| Faster queries | Reading less data from disk or network reduces I/O time. In analytical workloads, I/O is often the bottleneck. |
| Better cache utilization | More rows can fit into memory or CPU caches when compressed, leading to higher hit rates and faster repeated queries. |
| Cheaper data movement | Compression reduces the size of data replicated across nodes or shipped to backups. |
| CPU vs I/O trade-off | Decompression does use CPU, but in many real-world workloads the CPU cost is far outweighed by I/O savings. |

Compressed data not only saves money but also makes queries faster and enables use cases that wouldn’t be practical otherwise.

For a system like ClickHouse, which thrives on scanning and aggregating massive datasets, getting compression right is one of the most important levers for both performance and cost efficiency.

## What types of compression exist in databases?

When people talk about database compression, they usually mean one of two approaches: compressing data row by row or compressing it column by column.

### Row-based compression  

Row-oriented databases (like traditional Postgres, MySQL, or SQL Server) store all the fields of a row together on disk. 
In practice, these rows are grouped into fixed-size pages (for example, 8 KB in PostgreSQL or 16 KB in InnoDB), which act as the basic unit of storage.

Compression in such systems usually happens at the page level:

* A page contains multiple rows, all stored in a row-oriented layout.
* The database compresses the entire page as a block, rather than compressing each row individually.
* Algorithms may look for redundancy within the data on that page - for example, prefix compression for strings or a general-purpose codec like zlib.

Because each page contains rows with many different types of fields side by side (numbers, text, dates, etc.), there’s less redundancy for the compression algorithm to exploit.

It’s also important to note that in relational systems, indexes are compressed too. 
Indexes can make up a significant share of total storage - sometimes as much as the data itself - so compressing them is critical for reducing footprint. MySQL’s InnoDB engine, for example, [applies zlib compression to both table data and indexes](https://dev.mysql.com/doc/refman/8.4/en/innodb-compression-internals.html).

Row-based compression helps save space, but ratios are often modest compared to column-oriented approaches. This is because each row is a mix of different data types, which reduces the redundancy that compression algorithms thrive on.

To see this in practice, [the ClickBench benchmark compared storage sizes across formats](https://benchmark.clickhouse.com/#system=+%E2%98%81w%7CgQ&type=-&machine=-a2l%7Cg4e%7C6ax%7Cae-l%7C6ale%7C3al%7Cg-l%7Co%E2%98%818&cluster_size=+1&opensource=-&tuned=+n&metric=size&queries=-). PostgreSQL, a row-based system, required far more space than ClickHouse for the same dataset of 100 million records:

![](/images/engineering-resources/0_datacompression.png)

ClickHouse stores the dataset in just 9.26 GiB, while PostgreSQL needs nearly 100 GiB - more than 10× larger. This stark difference highlights why columnar storage, combined with specialized compression, is such an advantage for large-scale analytics.  

### Column-based compression  

Column-oriented databases (like ClickHouse, Snowflake, or BigQuery) take a very different approach: they store values from the same column together. This design has two major advantages:  

- Efficient storage: identical or similar values are placed side by side, which makes them compress extremely well.  
- Faster analytics: less data to scan means queries over large datasets return results more quickly.  

Because each column is homogeneous, the database can apply encodings that exploit data patterns:  

| Compression type | Description |
|------------------|-------------|
| Dictionary encoding | Replaces repeated string values with integer IDs, dramatically reducing storage for columns with low cardinality. |
| Run length encoding (RLE) | Compresses sequences of repeated values by storing the value and its count. For example, `AAAABBBCC` becomes `(A,4)(B,3)(C,2)`. |
| Bit packing | Uses the minimum number of bits required to represent integers in a given range, which is particularly effective for columns with a limited range of values. |
| Delta encoding | Stores the difference between consecutive values instead of the raw values themselves. Highly effective for monotonic sequences like IDs or timestamps. |
| General-purpose compression | Algorithms like ZSTD, LZ4, and GZIP can be layered on top of these encodings for additional savings. |

Imagine a column storing country codes. Instead of storing `"USA"` or `"CAN"` thousands of times, dictionary encoding can replace them with compact identifiers like `1` and `2`. If many consecutive rows share the same value (`"USA"`), run length encoding can further compress this into `(1,1000)`, meaning `"USA"` repeated 1000 times.  

Or, how about, a column of timestamps, such as log event times. Instead of storing full values like `2025-09-16 10:00:00`, `2025-09-16 10:00:01`, `2025-09-16 10:00:02`, delta encoding can store just the initial timestamp plus the differences between consecutive entries: `[2025-09-16 10:00:00, +1s, +1s]`. If the intervals themselves change predictably, double delta encoding can capture the change in the differences, providing even tighter compression for time-series data.  

The benefits extend well beyond storage savings. Less data on disk means reduced I/O, faster scans, and better cache utilization. Although decompression requires CPU cycles, the cost is usually far outweighed by the reduction in I/O, especially for analytical workloads that read far more than they write.  

This ability to tailor compression per column is a key reason column stores like ClickHouse achieve such high compression ratios and deliver fast query performance at scale.

## Does data compression affect data accuracy?

In databases, compression is almost always lossless. 
That means the data can be decompressed back into exactly the same values that were originally stored - no information is lost. 
Whether you’re using dictionary encoding, delta encoding, or a general-purpose codec like LZ4 or ZSTD, the database guarantees that queries return the true underlying values.  

That said, there are situations where you might deliberately trade accuracy for space or speed. These are not compression algorithms in the strict sense, but rather storage strategies that reduce precision or store less data:  

- Sampling: instead of storing every row, you only keep a representative subset of the data.  
- Approximate or aggregated storage: systems like ClickHouse let you store [aggregation states](https://clickhouse.com/blog/aggregate-functions-combinators-in-clickhouse-for-arrays-maps-and-states) rather than raw values.  
- Reduced precision: numeric or timestamp fields can be truncated (for example, storing seconds instead of microseconds).  

The distinction is easier to see side by side:  

| Type of compression | What it means | Examples in databases | Trade-offs |
|---------------------|---------------|-----------------------|------------|
| Lossless | Data can be fully decompressed back to its exact original form. No information is lost. | Dictionary encoding, run-length encoding, delta encoding, general-purpose codecs (LZ4, ZSTD, GZIP). | Guarantees accuracy; storage savings depend on data redundancy. |
| Lossy | Data is stored in a reduced or approximate form. Some detail is lost permanently. | Sampling (store a subset of rows), storing aggregation states, reduced-precision types (e.g. rounding timestamps). | Saves more space or speeds up queries, but you cannot reconstruct the original raw data. |

## What are best practices for database compression?

Across systems, some common principles help maximize compression:  

- Choose appropriate data types: Smaller integer or floating-point types reduce uncompressed size and make columns more compressible.
- Optimize categorical data: Strings with limited unique values (like country codes or status fields) compress much better if stored as enums.
- Don’t store unnecessary precision: Truncate timestamps or floats if the extra detail isn’t required - this reduces storage and helps compression algorithms find patterns.
- Match codecs to data patterns: Use delta encoding for time or sequence columns, run-length encoding for repeated values, and dictionary encoding for low-cardinality strings.
- Measure and iterate: Compression results vary by dataset. Always measure per column - many systems provide tools or system tables to check compressed vs. uncompressed size.

We applied these best practices when optimizing a large NOAA weather dataset:

- Narrowing integer types from `Int64` to `Int16` where appropriate.
- Converting string columns like weather type into `Enum8`.
- Reducing float precision for latitude/longitude from `Float64` to `Float32`.
- Using codecs like Delta + ZSTD on time-series columns.

These changes cut the dataset’s compressed size dramatically - showing how much schema design and codec choice matter.

You can [read the full write-up](https://clickhouse.com/blog/optimize-clickhouse-codecs-compression-schema).  

## What are the best high data compression databases?

Not all databases are equally efficient when it comes to storage. To see the difference, we can look at results from the [ClickBench](https://benchmark.clickhouse.com/#system=+%E2%98%81w%7CDcD%7Cltrc%7CgQ%7CtR%7Cm%E2%98%81&type=-&machine=-a2l%7C6t%7Cg4e%7C6ax%7Cae-l%7C6ale%7C3al%7Cg-l%7Co%E2%98%818%7Ci4P%7CT6%20C&cluster_size=+1&opensource=-&tuned=+n&metric=size&queries=-) benchmark, which compares several popular systems on the same dataset.  

![ClickBench storage comparison](/images/engineering-resources/1_datacompression.png)

The results are striking. ClickHouse stores the dataset in just 9.26 GiB, while PostgreSQL requires almost 100 GiB - more than ten times larger. Other systems, including Elasticsearch and Timescale, fall somewhere in between but still lag significantly. Even highly optimized formats like Parquet or compressed CSV/TSV files can’t match ClickHouse.

This outcome isn’t surprising given what we discussed earlier: ClickHouse’s columnar layout, per-column codecs, and ordering-aware compression allow it to shrink data much more aggressively than row-based systems or general-purpose file formats.

And these gains aren’t limited to benchmarks. Real-world users see the same results in production:

Character.AI, which ingests massive streams of observability data from thousands of GPUs, relies on ClickHouse to keep storage under control:

> *“I was genuinely impressed by the compression we achieved with ClickHouse. Some columns gave us 10x, others 20x - even up to 50x in some cases. On average, we're seeing 15–20x compression!”*  
> — [Character.AI](https://clickhouse.com/blog/scaling-observabilty-for-thousands-of-gpus-at-character-ai)  

Seemplicity, a security analytics platform processing tens of billions of updates per month, found that compression was a key factor in scaling beyond Postgres:  

> *“Compression has also been a major win. Seemplicity’s ClickHouse footprint sits at around 10 terabytes - a fraction of their Postgres instance. I’d guess Postgres is 5 to 6 times bigger. That space efficiency, plus the ability to stream tens of billions of updates per month, gives them room to grow without worrying about bloat or system strain.”*  
> — [Seemplicity](https://clickhouse.com/blog/seemplicity-scaled-real-time-security-analytics-with-postgres-cdc-and-clickhouse)  

Together, the benchmark and these customer experiences make one thing clear: if you’re looking for the best high data compression database available today, ClickHouse stands out from the pack.