---
title: 'Columnar databases explained'
slug: 'what-is-columnar-database'
excerpt: 'In this guide, we’ll explore columnar databases. How do they differ from row-based databases? What are they good at?  What are the advantages of using a column store?'
index: 2
---

In this guide, we’ll explore columnar databases, column stores, column-oriented databases, column-wise databases, or “insert your favorite acronym”
How do they differ from row-based databases? What are they good at? What are the advantages of using a column store?

We’ll answer these questions and more, but first, a brief history lesson.

## A brief history of columnar databases

The idea of storing data in columns is not new. In 1985, GP Copeland and SN Khoshafian introduced the concept in a paper titled [A decomposition storage model](https://scholar.google.com/scholar?hl=en&as_sdt=0,5&q=G.+P.+Copeland+and+S.+Khoshafian.+A+Decomposition+Storage+Model.&btnG=) (DSM).

The DSM proposed storing data in binary relations, pairing each attribute value with the record's surrogate, effectively organizing data by columns rather than rows. The authors argued that this approach, while requiring more storage space overall, offered potential advantages in simplicity, generality, and retrieval performance, especially for queries involving a subset of attributes.

By 1999, MonetDB had implemented the ideas from the DSM paper and showcased their efficacy. The paper "[Database architecture optimized for the new bottleneck: Memory access](https://scholar.google.com/citations?view_op=view_citation&hl=en&user=DCIZE1kAAAAJ&cst[…]&sortby=pubdate&citation_for_view=DCIZE1kAAAAJ:u5HHmVD_uO8C)" by Peter A. Boncz, Stefan Manegold, and Martin L. Kersten details their experience building MonetDB and offers insights into their design choices.

The authors emphasized that their early intuitions about the importance of vertical fragmentation in improving memory access were later validated through experimentation and detailed performance modeling. Their work demonstrated that a database architecture meticulously designed around memory access considerations can yield substantial performance improvements, even in the face of a widening gap between CPU and memory speeds.

In the years since then, further innovations, such as [vectorized processing](https://www.cidrdb.org/cidr2005/papers/P19.pdf) and data compression techniques, have made column-based stores even more useful for large-scale analytical processing.

## Row-based vs. column-based

As column stores evolved from theoretical concepts to practical implementations, their fundamental difference from traditional row-based databases became increasingly apparent.

This distinction in data organization is at the core of why column stores excel at specific queries while row-based systems remain preferable for others. Comparing their data layout with traditional row-based databases is essential to understanding the strengths and weaknesses of column stores.

In a row-oriented database, consecutive table rows are stored sequentially, one after the other. This layout allows for quick retrieval of rows, as the column values of each row are stored together.

In a column-oriented database, tables are stored as a collection of columns, i.e., the values of each column are stored sequentially, one after the other. This layout makes it harder to restore single rows (as there are now gaps between the row values), but column operations such as filters or aggregation become much faster than in a row-oriented database.

> In a column store, column operations such as filters or aggregation are faster than in a row-oriented database.

The diagram below shows how some weather data would be stored in a row-based and column-based database:

![](/images/engineering-resources/0_columnstore.png)

In the row-based approach, all the values for a given row are adjacent, whereas in the column-based approach, the values for a given column are adjacent.

The row-based approach works better for single-row lookups. The column-based approach is preferable for executing analytics queries that aggregate or filter a few columns, especially when working with large datasets.

## When should I use a column store?

Use a column store when you want to run queries that aggregate and filter data across a few columns but lots of rows.
These datasets will typically contain a lot of columns, but we’ll only be touching a subset of those columns in each query.

For example, take the [real-world anonymized web analytics dataset](https://clickhouse.com/docs/en/getting-started/example-datasets/metrica) that contains 100 million rows and has the following columns:

```sql
SELECT groupArray(name) AS columns
FROM system.columns
WHERE (database = 'metrica') AND (`table` = 'hits')
FORMAT Vertical;
```

```sql
columns: ['WatchID','JavaEnable','Title','GoodEvent','EventTime','EventDate','CounterID','ClientIP','RegionID','UserID','CounterClass','OS','UserAgent','URL','Referer','Refresh','RefererCategoryID','RefererRegionID','URLCategoryID','URLRegionID','ResolutionWidth','ResolutionHeight','ResolutionDepth','FlashMajor','FlashMinor','FlashMinor2','NetMajor','NetMinor','UserAgentMajor','UserAgentMinor','CookieEnable','JavascriptEnable','IsMobile','MobilePhone','MobilePhoneModel','Params','IPNetworkID','TraficSourceID','SearchEngineID','SearchPhrase','AdvEngineID','IsArtifical','WindowClientWidth','WindowClientHeight','ClientTimeZone','ClientEventTime','SilverlightVersion1','SilverlightVersion2','SilverlightVersion3','SilverlightVersion4','PageCharset','CodeVersion','IsLink','IsDownload','IsNotBounce','FUniqID','OriginalURL','HID','IsOldCounter','IsEvent','IsParameter','DontCountHits','WithHash','HitColor','LocalEventTime','Age','Sex','Income','Interests','Robotness','RemoteIP','WindowName','OpenerName','HistoryLength','BrowserLanguage','BrowserCountry','SocialNetwork','SocialAction','HTTPError','SendTiming','DNSTiming','ConnectTiming','ResponseStartTiming','ResponseEndTiming','FetchTiming','SocialSourceNetworkID','SocialSourcePage','ParamPrice','ParamOrderID','ParamCurrency','ParamCurrencyID','OpenstatServiceName','OpenstatCampaignID','OpenstatAdID','OpenstatSourceID','UTMSource','UTMMedium','UTMCampaign','UTMContent','UTMTerm','FromTag','HasGCLID','RefererHash','URLHash','CLID']
```

This table contains over 100 columns, but we’d usually consider only a few in each query. For example, we could write the following query to find the most popular mobile phone models in July 2013:

```sql
SELECT MobilePhoneModel, COUNT() AS c
FROM metrica.hits
WHERE
      RegionID = 229
  AND EventDate >= '2013-07-01'
  AND EventDate <= '2013-07-31'
  AND MobilePhone != 0
  AND MobilePhoneModel not in ['', 'iPad']
GROUP BY MobilePhoneModel
ORDER BY c DESC
LIMIT 8;
```

This query demonstrates several characteristics that make it ideal for a column store:

1. Selective column access: Despite the table having over 100 columns, the query only needs to read data from `MobilePhoneModel`, `RegionID`, `EventDate`, and `MobilePhone`.
2. Filtering: The `WHERE` clause allows the database to eliminate irrelevant rows quickly.
3. Aggregation: The `COUNT()` function aggregates data across millions of rows.
4. Large-scale processing: The query operates on a dataset of 100 million records, which is the lower bound of where column stores start showing their value for analytical queries.

You can [try this query on the ClickHouse SQL Playground](https://sql.clickhouse.com/?query=U0VMRUNUIE1vYmlsZVBob25lTW9kZWwsIENPVU5UKCkgQVMgYyAKRlJPTSBtZXRyaWNhLmhpdHMgCldIRVJFIAogICAgICBSZWdpb25JRCA9IDIyOSAKICBBTkQgRXZlbnREYXRlID49ICcyMDEzLTA3LTAxJyAKICBBTkQgRXZlbnREYXRlIDw9ICcyMDEzLTA3LTMxJyAKICBBTkQgTW9iaWxlUGhvbmUgIT0gMCAKICBBTkQgTW9iaWxlUGhvbmVNb2RlbCBub3QgaW4gWycnLCAnaVBhZCddIApHUk9VUCBCWSBNb2JpbGVQaG9uZU1vZGVsCk9SREVSIEJZIGMgREVTQyAKTElNSVQgODs&chart=eyJ0eXBlIjoicGllIiwiY29uZmlnIjp7InhheGlzIjoiTW9iaWxlUGhvbmVNb2RlbCIsInlheGlzIjoiYyJ9fQ&run_query=true), hosted at [sql.clickhouse.com](http://sql.clickhouse.com).
The query processes 100 million rows in under 100 milliseconds, and you can explore the results as a table:

![](/images/engineering-resources/1_columnstore.png)

Or as a chart:

![](/images/engineering-resources/2_columnstore.png)

## When should I not use a column store?

While column stores excel in certain scenarios, particularly in analytical workloads involving large datasets, they are not a one-size-fits-all solution. Understanding their limitations is crucial for making informed decisions about database architecture.

Let's explore situations where there might be better choices than column stores.

### Row-based lookups and OLTP Workloads

Column stores are designed for analytics queries that typically aggregate or scan a few columns across many rows. However, they can be suboptimal for row-based lookups, common in [Online Transaction Processing (OLTP) systems](https://clickhouse.com/engineering-resources/oltp-vs-olap).

Consider our web analytics dataset example. If most of your queries resemble this:

```sql
SELECT *
FROM metrica.hits
WHERE WatchID = 8120543446287442873;
```

A column store would need to:

1. Read the `WatchID` column to find the matching row
2. Fetch data from every other column for the matching row
3. Reconstruct the full row(s)

This process can be inefficient, especially if you're fetching many columns. In contrast, a row-based store would have all the data for a single row stored contiguously, making such lookups much faster.

Real-world example: E-commerce platforms often need to retrieve all details of a specific order quickly. This operation is much more efficient in a row-based store.

### Small Datasets

The benefits of column stores often become apparent only at scale. When dealing with smaller datasets (e.g., millions of rows or less), the performance difference between column and row stores for analytical queries might need to be more significant to justify adding another database.

For instance, if you're analyzing sales data for a small business with a few thousand monthly transactions, a well-indexed row-based database might perform satisfactorily without needing a column store.

### Transactions

Most column stores don't support ACID (Atomicity, Consistency, Isolation, Durability) transactions, which are crucial for many business applications. If your use case requires strong transactional guarantees, a traditional row-based RDBMS would be a more suitable choice.

For instance, a banking system processing account transfers must ensure that debits and credits are applied atomically across accounts. This is typically easier to achieve with row-based, transactional databases.

## Advantages of using a column store

Using column stores has two main advantages: query performance on large datasets and efficient data storage.
These benefits are particularly valuable in data warehousing, business intelligence, and large-scale analytics scenarios.
Let’s learn about the techniques used to achieve this.

### Efficient storage

At the start of this article, we learned that column stores store data from the same column next to each other. This means that identical values are often adjacent, which is [perfect for data compression](https://clickhouse.com/docs/en/data-compression/compression-in-clickhouse).

> Column stores are perfect for data compression.

Column stores leverage various encoding and compression techniques:

1. Dictionary encoding: Replaces repeated string values with integer IDs, dramatically reducing storage for columns with low cardinality.
2. Run length encoding (RLE): Compresses sequences of repeated values by storing the value and its count. For example, "AAAABBBCC" becomes "(A,4)(B,3)(C,2)".
3. Bit packing uses the minimum number of bits required to represent integers in a given range, which is particularly effective for columns with a limited range of values.
4. General-purpose compression: For further compression, algorithms like ZSTD, LZ4, and GZIP are applied to these specialized encodings.

For instance, consider a column storing country codes. Instead of repeatedly storing "USA" or "CAN," dictionary encoding might replace these with 1 and 2, respectively. If there are many consecutive "USA" entries, RLE could further compress this to (1, 1000), representing "USA" repeated 1000 times.

The benefits extend beyond mere storage savings. Less data on disk translates to reduced I/O, accelerating queries and data insertions. While decompression does introduce some CPU overhead, the I/O reduction typically far outweighs this cost, especially in I/O-bound analytical workloads.

## Query performance

Column stores truly shine in analytics queries, particularly those involving large datasets. Their performance advantage stems from a couple of factors:

1. Efficient I/O utilization: Column stores can skip vast amounts of irrelevant data by reading only the columns relevant to a query. For instance, in a query like `SELECT AVG(salary) FROM employees WHERE department = 'Sales` , a column store only needs to read the `salary` and `department` columns, potentially ignoring dozens or hundreds of other columns.
2. Vectorized query execution: The columnar data layout aligns perfectly with modern CPU architectures, enabling efficient vectorized processing. Instead of processing data row-by-row, column stores can simultaneously operate on large chunks (vectors) of a single column. This approach maximizes CPU cache usage and allows for SIMD (Single Instruction, Multiple Data) operations, dramatically speeding up calculations.

## Challenges of using a column store

While column stores offer significant advantages for analytical workloads, they also present unique challenges, especially for users accustomed to traditional row-based systems. Understanding these challenges is crucial for effectively implementing and managing a column store database.

### Updates

In row-based stores, updates are straightforward: data is modified in place, and the transaction is complete. However, column stores operate on a fundamentally different paradigm.

Column stores typically organize data into immutable column chunks. This immutability is a double-edged sword: it enables efficient compression and query performance but complicates the update process. The entire process becomes more intricate when a row needs to be updated.

We can’t update a row in place instead, we’ll need to write a new column chunk.

The column store's implementation will determine how the new value is made available to the query engine. The whole column chunk could be replaced, the new chunk could be merged with the existing one, or a lookup table may indicate the appropriate chunk to read for a given row.

This adds complexity to the database internals and means that column stores are generally optimized for inserting or updating records in larger batches rather than making many small updates.

### Denormalization

Historically, column stores were optimized for read-heavy workloads and often lacked efficient join capabilities. This limitation led to a common practice: denormalizing data during ingestion.

Denormalization involves combining data from multiple tables into a single, wide table. While this approach can significantly boost query performance, it comes with trade-offs:

1. Data redundancy: Denormalized data often contains duplicated information, increasing storage requirements.
2. Update complexity: Changes to denormalized data may require updates across multiple rows or columns.
3. Data consistency: Maintaining consistency across denormalized data can be challenging, especially in systems with frequent updates.

Modern column stores have improved their join performance, making extreme denormalization unnecessary. However, for maximum query performance, some level of denormalization is often still beneficial. The challenge lies in finding the right balance between normalization (for data integrity and ease of updates) and denormalization (for query performance).

### Knowing your query patterns

In column stores, the physical organization of data can dramatically impact query performance. Understanding your query patterns before data ingestion is crucial.

Key considerations include:

1. Sort keys: Choosing the right columns to sort by can significantly speed up range queries and joins.
2. Partitioning: Effective data partitioning can enable query engines to skip large chunks of irrelevant data.

For example, sorting data primarily by date could yield substantial performance benefits if most queries filter on date ranges. However, if this isn't considered during initial data loading, achieving optimal performance may require a costly data reorganization process.

## Examples of columnar databases

There are a large number of databases that have column-oriented storage, so we’ll cover just the most popular ones at the time of writing.

As mentioned earlier, MonetDB is the original column store, and it’s still around today. Since then, other column stores have emerged, including SAP IQ, Greenplum DB, Vertica, and more.

Amazon Redshift, Google BigQuery, and Snowflake were released in the early 2010s as cloud data warehouses. They all store data in columns and are predominantly used for internal-facing analytics on large volumes of data.

Apache Pinot, Apache Imply, and ClickHouse emerged in the late 2010s. They can be used for internal-facing analytics but also support [real-time analytics](https://clickhouse.com/engineering-resources/what-is-real-time-analytics), a prerequisite for databases to serve insights to external users and customers.

In addition, row-based stores like Postgres have columnar add-ons via Citus or Timescale.

## Is ClickHouse a column database?

Yes, [ClickHouse is a column database](https://clickhouse.com/docs/en/intro). It is available as [open-source software](https://github.com/ClickHouse/ClickHouse) and a [cloud offering](https://clickhouse.com/cloud) and is the [fastest](https://clickhouse.com/docs/en/concepts/why-clickhouse-is-so-fast) and most resource-efficient real-time data warehouse and open-source database.

ClickHouse Cloud is used by Sony, Lyft, Cisco, GitLab, and many others.

You can learn more about the problems that ClickHouse solves in the [user stories](https://clickhouse.com/user-stories) section.

## Can I use row-based and column-based stores together?

Yes, and this is quite common. A hybrid architecture that used both types of stores might look like this:

### Row-based store for OLTP (Online Transaction Processing)

- Handles day-to-day transactional operations
- Manages real-time data updates and insertions
- Ensures ACID (Atomicity, Consistency, Isolation, Durability) compliance

### Column-based store for OLAP (Online Analytical Processing)

- Manages large-scale data analytics
- Handles analytical queries on historical and real-time data
- Optimizes for read-heavy workloads and aggregations

Many organizations employ change data capture (CDC) techniques to keep these systems in sync. CDC is a set of software design patterns used to determine and track data changes so that action can be taken using the changed data.

In the [OLAP vs OLTP guide](https://clickhouse.com/engineering-resources/oltp-vs-olap#oltp-to--olap-with-change-data-capture), you can read more about using CDC to move data between OLTP and OLAP.
