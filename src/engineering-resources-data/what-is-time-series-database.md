---
title: 'An intro to time-series databases'
slug: 'what-is-time-series-database'
excerpt: 'In this guide, we’ll learn all about time-series data and its use cases, time-series databases, and how to query time-series data.'
index: 4
---

Time-series data is everywhere in modern systems - from IoT sensors and financial markets to application monitoring and user analytics. As organizations collect more temporal data, they need efficient ways to store, process, and analyze it.

This article explores time-series databases, their use cases, and how different database solutions handle time-based data. Whether you're dealing with millions of sensor readings, tracking user behavior, or monitoring system performance, understanding your options for time-series data storage is crucial for building effective data systems.

<iframe width="768" height="432" src="https://www.youtube.com/embed/ddk2qOdulWY?si=Vj50gfj01vEbDaZq" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<br />

To get a taste of time-series analysis in action, here’s a sample query that looks at average yearly precipitation across the UK, France, and the US using weather station data from NOAA. It's a simple example, but it shows how powerful time-based queries can be for uncovering trends over time.

<pre><code
  run='false'   type='click-ui'   language='sql'   runnable='true'   clickhouse_settings='{"enable_parallel_replicas": 0}'   play_link='https://sql.clickhouse.com?query=U0VMRUNUIHllYXIsCiAgICAgICBhdmcoYHByZWNpcGl0YXRpb25gKSBBUyBgYXZnX3ByZWNpcGl0YXRpb25gLAogICAgICAgZGljdEdldChgY291bnRyeWAuYGNvdW50cnlfaXNvX2NvZGVzYCwgJ25hbWUnLCBjb2RlKSBhcyBjb3VudHJ5CkZST00gYG5vYWFgLmBub2FhX3YyYApXSEVSRSBkYXRlID4gJzE5OTAtMDEtMDEnIEFORCBjb2RlIElOICgnVUsnLCAnRlInLCAnVVMnKQpHUk9VUCBCWSB0b1N0YXJ0T2ZZZWFyKGBkYXRlYCkgQVMgYHllYXJgLAogICAgICAgICBzdWJzdHJpbmcoc3RhdGlvbl9pZCwgMSwgMikgYXMgY29kZQpIQVZJTkcgYXZnX3ByZWNpcGl0YXRpb24gPiAwICAgICAgICAgCk9SREVSIEJZIGNvdW50cnksIHllYXIgQVNDCkxJTUlUIDEwMDAwMA&chart=eyJ0eXBlIjoibGluZSIsImNvbmZpZyI6eyJ4YXhpcyI6InllYXIiLCJ5YXhpcyI6ImF2Z19wcmVjaXBpdGF0aW9uIiwic2VyaWVzIjoiY291bnRyeSJ9fQ'   show_statistics='true' view='chart'
  chart_config='eyJ0eXBlIjoibGluZSIsImNvbmZpZyI6eyJ4YXhpcyI6InllYXIiLCJ5YXhpcyI6ImF2Z19wcmVjaXBpdGF0aW9uIiwic2VyaWVzIjoiY291bnRyeSJ9fQ'
>
SELECT year,
       avg(`precipitation`) AS `avg_precipitation`,
       dictGet(`country`.`country_iso_codes`, 'name', code) as country
FROM `noaa`.`noaa_v2`
WHERE date > '1990-01-01' AND code IN ('UK', 'FR', 'US')
GROUP BY toStartOfYear(`date`) AS `year`,
         substring(station_id, 1, 2) as code
HAVING avg_precipitation > 0         
ORDER BY country, year ASC
LIMIT 100000;
</code></pre>

You can see more queries like this in the [Is ClickHouse a time-series database?](/engineering-resources/what-is-time-series-database#clickhouse-times-series) section.

## What is time-series data?

Let’s start by defining time-series data. It describes datasets where observations are captured along a timeline, and a key feature is a **timestamp**. These data points are collected at **regular intervals**—like every second, minute, or day—or **irregular intervals** when events occur unpredictably.

For example, while a weather sensor might collect readings at fixed intervals (e.g., every 10 seconds), an error log in a server system records data only when an error event happens, which can be at any time. Both are forms of time-series data because they represent data that changes over time, whether those changes are **periodic** or **sporadic**.

Let’s look at the methods of data collection in a little more detail:

- **Fixed interval sampling:** This method captures data at consistent time points, providing a predictable and continuous stream of information. Examples include weather sensors, heart rate monitors, and energy meters. Since the points are evenly distributed, this data is beneficial for seeing trends over specific periods.
- **Event-driven data:** Time-series data can also be captured irregularly, triggered by specific occurrences. For instance, a server logs data each time a particular error occurs, which could happen multiple times in one hour or not for several hours. Other examples include clickstream data from websites (where clicks happen unpredictably) or social media posts, which depend entirely on user activity.

When analyzing time series data, we often **slice or** **group** it by different time periods to understand how it changes over time. This ability to analyze changes across **time** defines time series data—any data that changes in any way over time belongs to this category.

Below is an example of a message that a weather sensor might generate:

```javascript
{
  "device_id": "sensor-12345",
  "timestamp": "2024-12-04T10:15:00Z",
  "location": {
    "latitude": 40.7128,
    "longitude": -74.0060,
    "altitude": 15.5
  },
  "metrics": {
    "temperature": 23.5,
    "humidity": 60,
    "pressure": 1013.25,
    "battery_level": 85,
    "signal_strength": -70
  },
  "status": {
    "operational": true,
    "last_maintenance": "2024-11-20T08:00:00Z"
  }
}
```

In this example, several **metrics,** such as `temperature`, `humidity`, and `pressure` are captured. These metrics continuously change, often at high frequency. Additionally, we have **metadata** like the `device_id` and `location`, which provide context for where and what is being measured but change much more frequently than metrics and perhaps not at all. There is also **status information**, which includes details like `operational` status and `last_maintenance` date.

Finally, each data point is associated with a **timestamp**, representing when the observation was taken. This timestamp is crucial for understanding how the metrics evolve, allowing us to detect patterns or trends.

## Use cases for time-series data

Time-series databases can support a wide range of applications, each benefiting from the ability to store and analyze data as it changes over time. Let's explore some common use cases and the types of questions they help organizations answer.

### Product analytics

Product analytics generates rich time-series data through user interactions, system events, and transactions. Every click, page view, feature interaction, and purchase is timestamped, creating a detailed record of user behavior over time. This temporal data enables teams to answer crucial questions about their product: How do users navigate it? What paths lead to successful conversion? Which behaviors indicate potential churn? When do users typically discover and adopt new features?

The power of time-series analysis in product analytics lies in understanding not just what users do but when and in what sequence they do it. Teams can track user journeys through onboarding, measure time-to-conversion, analyze retention patterns, and identify features that drive engagement. By correlating these behaviors with other metrics like performance data, organizations can build a complete picture of their product's effectiveness and make data-driven decisions about product development.

➡️ Read more about [building product analytics with ClickHouse](https://clickhouse.com/blog/building-product-analytics-with-clickhouse)

### Financial Markets and Trading

Financial markets, from traditional stock exchanges to cryptocurrency trading platforms, generate massive volumes of time-series data. Every price change, trade, and order book update must be captured and analyzed in real-time. This data is crucial for generating trading signals, performing technical analysis, and identifying market opportunities.

Time-series analysis is particularly important for creating standard trading tools like candlestick charts showing price movements over specific time intervals. These charts require rapid price data aggregation (open, high, low, close) over various time windows, from minutes to months. Traders also need to analyze market liquidity, calculate technical indicators, and simultaneously detect patterns across multiple assets or trading venues. Processing this data quickly is crucial \- even small delays can mean missed trading opportunities or increased risk.

For example, cryptocurrency trading platforms must aggregate data from multiple blockchain networks and decentralized exchanges, processing millions of price updates daily while maintaining sub-second query response times. This enables traders to spot arbitrage opportunities, track market trends, and make real-time trading decisions.

➡️ Read more about how [Coinhall uses ClickHouse to power its blockchain data platform](https://clickhouse.com/blog/trade-secrets-how-coinhall-uses-clickhouse-to-power-its-blockchain-data-platform)

### System and Application Observability

Modern applications generate vast amounts of operational data that must be monitored in real time. From server metrics to user behavior, organizations need to track everything from system health to user experience. This observability data typically includes system metrics (CPU, memory, network), application telemetry (response times, error rates), and user interaction data.

Time-series analysis enables teams to visualize this data through real-time dashboards, track performance trends, and quickly identify issues. For example, teams can monitor application performance across different regions, track user engagement metrics, and analyze experiment results from A/B tests. The ability to correlate various metrics \- from infrastructure health to user behavior \- helps organizations understand how system performance impacts user experience and business outcomes.

By storing this data in a time-series database, teams can not only monitor the current system state but also analyze historical patterns, establish baselines, and detect anomalies that might indicate potential problems. This comprehensive view of system behavior is essential for maintaining reliable services and optimizing user experience.

➡️ Learn how [Skool uses ClickHouse to visualize real-time observability and monitor user behavior.](https://clickhouse.com/blog/how-skool-uses-clickhouse-for-observability-behavioral-analytics)

## What is a time-series database?

Now that we've defined time-series data and seen some examples, what does storing this data take? A time-series database (TSDB) is a database that can efficiently store, manage, and analyze time-series data.

Such a database will need to have the following characteristics:

1. **Data volume** \- Time-series data grows rapidly due to the high frequency of measurements, such as sensor readings every second. Traditional databases can struggle to maintain performance when millions of data points are generated in short periods. Instead, we need a database that is optimized for appending new data.
2. **Write and query performance** \- Time-series data involves frequent writes (inserting new data points continuously) and complex queries for analysis (e.g., aggregations over time). Our database needs efficient time-based indexing or the ability to sort data by timestamp during ingestion.
3. **Efficient storage and compression**—Since time series data often contains many repeated or very similar values, storing it efficiently is crucial. Column-based storage is an advantage here since values in the same column are stored next to each other. We’ll also want to use codecs that allow us to store deltas between values rather than the raw values each time. Delta encoding is one such codec that’s often used when storing timestamps.
4. **Time-based aggregations**—Time-series analysis typically involves time-based queries, such as calculating daily averages or summing metrics over weeks. We need to be able to run these types of queries over large volumes of data while also being able to filter by time period.

Many of these characteristics are the same as those required for [real-time analytics databases](/engineering-resources/what-is-real-time-analytics#characteristics-of-a-real-time-analytics-system).

## Examples of time-series databases

Time-series databases can be categorized into three main types: purpose-built time-series databases, extensions of other databases, and real-time analytics/column-based databases. Here are some popular examples:

### Purpose-built time-series databases

Specialized databases engineered from the ground up to efficiently handle time-stamped data, offering optimized temporal data storage and query mechanisms, including as of joins, specialized maths functions, downsampling, grouped gap filling, and more. Some examples are described below:

- [InfluxDB](https://github.com/influxdata/influxdb) \- Specifically designed for time-series data, InfluxDB handles high write loads and provides features like downsampling and data retention policies, making it great for IoT, DevOps metrics, and real-time monitoring.
- [QuestDB](https://github.com/questdb/questdb) \- A high-performance open-source time-series database that excels at fast SQL queries and high-throughput ingestion.
- [Prometheus](https://github.com/prometheus/prometheus) \- An open-source monitoring system primarily designed for system and service monitoring. Prometheus excels at scraping metrics from various endpoints, storing them efficiently, and enabling alerting based on those metrics. It’s well-suited for use cases like server health monitoring and application performance metrics.

### Extensions of relational databases

Traditional relational databases can enhanced with time-series capabilities, combining the familiarity and flexibility of SQL with specialized temporal features.

[TimescaleDB](https://github.com/timescale/timescaledb) is an extension of PostgreSQL. TimescaleDB adds time-based features like automatic partitioning and time-based indexing. It's perfect for scenarios where you want to blend relational data with time-series data, such as in business intelligence or IoT.

### Real-Time analytics / column-based Databases

Systems optimized for rapid large-scale data analysis, using [columnar storage](/engineering-resources/what-is-columnar-database) to enable fast aggregations and real-time processing of time-series information. Some examples are described below:

- [Apache Pinot](https://github.com/apache/pinot) \- Designed for real-time, low-latency analytics, Pinot is well-suited for applications like user-facing dashboards or clickstream analysis, offering sub-second query response times.
- [ClickHouse](https://github.com/ClickHouse/ClickHouse) \- That’d be us\! ClickHouse was initially designed to keep records of all clicks by people from all over the Internet but is now used for various time-centric datasets, with a particular focus on observability.

## Querying time-series data

Time-series databases offer specialized query capabilities designed to handle temporal data efficiently. While many modern time-series databases use SQL with extensions, some have developed their own query languages optimized for time-series operations.

Most time-series databases extend standard SQL with specialized functions for temporal analysis. These extensions typically include:

- Time-based window functions for analyzing data over specific time intervals
- Gap filling to handle missing data points
- Interpolation functions to estimate values between known data points
- Time bucket operations for grouping data into regular time intervals
- Specialized mathematical functions for time-series analysis

Prometheus uses a domain-specific query language called [PromQL](https://prometheus.io/docs/prometheus/latest/querying/basics/), specifically designed for time-series analysis and monitoring use cases. PromQL has built-in support for rate calculations and aggregations over time, native handling of labels and label matching, and vector and range vector selectors. It's particularly well-suited for monitoring scenarios where you must analyze metrics over time windows and create alerting rules.

InfluxDB initially used a query language called InfluxQL, which was SQL-like but explicitly designed for time-series operations. With InfluxDB 2.0, they introduced Flux, a more powerful SQL-based language, before adding SQL support to make the platform more accessible to users familiar with traditional database querying.

## Is ClickHouse a time-series database? {#clickhouse-times-series}

While ClickHouse isn't specifically designed as a time-series database, it excels at handling time-series workloads as part of its broader analytical capabilities.

As a columnar OLAP database, ClickHouse provides the performance and features needed for efficient time-series analysis without the limitations of a specialized solution.

ClickHouse's strengths in handling time-series data come from several key capabilities.

### Real-time querying of large datasets

ClickHouse enables the analysis of historical and current data at a large scale through its innovative dual-layer architecture. The system processes billions of rows per second on standard hardware through:

- Isolated concurrent operations: Data is organized into "table parts" that allow inserts and selects to operate independently without blocking each other
- Vectorized query execution: Processes data in batches rather than row-by-row, utilizing CPU caches efficiently and applying SIMD instructions
- Parallel processing: Automatically distributes query execution across multiple CPU cores and can scale horizontally across nodes in a cluster
- Merge-time computation: Shifts computational work from query time to background merge processes, making queries significantly faster
- Specialized algorithms and data structures: As noted by CMU Professor Andy Pavlo, ClickHouse has "20 versions of a hash table" and other specialized components optimized for different query patterns

> You can read more in the [Why is ClickHouse fast? Developer guide](https://clickhouse.com/docs/concepts/why-clickhouse-is-so-fast).

These architectural advantages enable organizations to maintain years of historical time-series data while providing sub-second query responses for real-time dashboards and deep historical analysis.

The following query analyzes New York City taxi data that contains over 3 billion records. For January 1, 2014, it groups rides by hour and cab type to show the number of rides, average trip distance, and average fare for each hourly period and taxi category.

<pre><code
  run='false'   type='click-ui'   language='sql'   runnable='true'   clickhouse_settings='{"enable_parallel_replicas": 0}'   play_link='https://sql.clickhouse.com?query=U0VMRUNUIAogICAgdG9TdGFydE9mSG91cihwaWNrdXBfZGF0ZXRpbWUpIEFTIGhvdXIsCiAgICBjYWJfdHlwZSwKICAgIGNvdW50KCopIEFTIHJpZGVzLAogICAgcm91bmQoYXZnKHRyaXBfZGlzdGFuY2UpLCAyKSBBUyBhdmdfZGlzdGFuY2UsCiAgICByb3VuZChhdmcodG90YWxfYW1vdW50KSwgMikgQVMgYXZnX2ZhcmUKRlJPTSBueWNfdGF4aS50cmlwcwpXSEVSRSBwaWNrdXBfZGF0ZSA9ICcyMDE0LTAxLTAxJwpHUk9VUCBCWSAxLCAyCk9SREVSIEJZIDEsIDI&chart=eyJ0eXBlIjoiYmFyIiwiY29uZmlnIjp7InRpdGxlIjoiTmV3IFlvcmsgdGF4aSByaWRlcyBvbiAxc3QgSmFudWFyeSAyMDE0IiwieGF4aXMiOiJob3VyIiwieWF4aXMiOiJyaWRlcyIsInNlcmllcyI6ImNhYl90eXBlIiwic3RhY2siOnRydWV9fQ'   show_statistics='true' view='chart'
  chart_config='eyJ0eXBlIjoiYmFyIiwiY29uZmlnIjp7InRpdGxlIjoiTmV3IFlvcmsgdGF4aSByaWRlcyBvbiAxc3QgSmFudWFyeSAyMDE0IiwieGF4aXMiOiJob3VyIiwieWF4aXMiOiJyaWRlcyIsInNlcmllcyI6ImNhYl90eXBlIiwic3RhY2siOnRydWV9fQ'
>
SELECT 
    toStartOfHour(pickup_datetime) AS hour,
    cab_type,
    count(*) AS rides,
    round(avg(trip_distance), 2) AS avg_distance,
    round(avg(total_amount), 2) AS avg_fare
FROM nyc_taxi.trips
WHERE pickup_date = '2014-01-01'
GROUP BY 1, 2
ORDER BY 1, 2
</code></pre>

### Comprehensive date/time type support

ClickHouse provides [robust support for time-series data through specialized date and time data types](https://clickhouse.com/docs/use-cases/time-series/date-time-data-types) that balance storage efficiency with precision requirements:

- **Versatile date types**:
  - `Date`: Compact 2-byte storage covering `[1970-01-01, 2149-06-06]`, sufficient for most use cases
  - `Date32`: Extended 4-byte storage covering a wider range `[1900-01-01, 2299-12-31]`
- **Flexible timestamp types**:
  - `DateTime`: 4-byte storage with second precision, range of `[1970-01-01 00:00:00, 2106-02-07 06:28:15]`
  - `DateTime64`: 8-byte storage with configurable sub-second precision (up to nanoseconds), range of `[1900-01-01 00:00:00, 2299-12-31 23:59:59.99999999]`
- **Time zone awareness:**
  - Built-in support for time zones in both `DateTime('TimeZone')` and `DateTime64('TimeZone')`
  - Automatic time zone conversion during queries
  - Support for different time zones within the same table
- **Type conversion functions**:
  - Seamless conversion between temporal types with functions like [`toDate`](https://clickhouse.com/docs/sql-reference/functions/type-conversion-functions#todate), [`toDateTime`](https://clickhouse.com/docs/sql-reference/functions/type-conversion-functions#todatetime), and [`toDateTime64`](https://clickhouse.com/docs/sql-reference/functions/type-conversion-functions#todatetime64)
  - Precision control when converting between different temporal resolutions

These comprehensive date/time capabilities provide the foundation for sophisticated time-series analysis, enabling precise temporal storage and manipulation across massive datasets while optimizing storage efficiency and query performance.

The following query aggregates total daily hits from the Wiki dataset, using the `toDate` function to convert `DateTime` values to `Date`:

<pre><code
  run='false'   type='click-ui'   language='sql'   runnable='true'   clickhouse_settings='{"enable_parallel_replicas": 0}'   play_link='https://sql.clickhouse.com/?query_id=4RNIAAXZVWK2YLFFVGEC1O'   show_statistics='true'
>
SELECT
    sum(hits) AS h,
    toDate(time) AS d
FROM wiki.wikistat_small
GROUP BY d
ORDER BY d
LIMIT 5;</code></pre>

### Rich set of temporal functions

ClickHouse offers a comprehensive suite of temporal functions that can be used for time-series analysis:

- Time-based aggregations: Functions like [`toStartOfHour`](https://clickhouse.com/docs/sql-reference/functions/date-time-functions#tostartofhour), [`toStartOfMonth`](https://clickhouse.com/docs/sql-reference/functions/date-time-functions#tostartofmonth), and [`toStartOfInterval`](https://clickhouse.com/docs/sql-reference/functions/date-time-functions#tostartofinterval) enable efficient grouping of time-series data into regular intervals
- Date and time arithmetic: Functions for adding or subtracting intervals from timestamps with [`addDays`](https://clickhouse.com/docs/sql-reference/functions/date-time-functions#adddays), [`addHours`](https://clickhouse.com/docs/sql-reference/functions/date-time-functions#addhours), and more.
- Date/time formatting: Flexible formatting options with [`formatDateTime`](https://clickhouse.com/docs/sql-reference/functions/date-time-functions#formatdatetime) and [`parseDateTime`](https://clickhouse.com/docs/sql-reference/functions/type-conversion-functions#parsedatetime) for input/output operations
- Time difference calculations: Functions like [`dateDiff`](https://clickhouse.com/docs/sql-reference/functions/date-time-functions#date_diff) for measuring intervals between timestamps.
- Time zone handling: Comprehensive support for time zone conversions with functions like [`toTimeZone`](https://clickhouse.com/docs/sql-reference/functions/date-time-functions#totimezone) and automatic time zone awareness
- Standard window functions: Full support for SQL window functions, including:
  - Row numbering with [`row_number`](https://clickhouse.com/docs/sql-reference/window-functions/row_number)
  - Ranking with [`rank`](https://clickhouse.com/docs/sql-reference/window-functions/rank), [`dense_rank`](https://clickhouse.com/docs/sql-reference/window-functions/dense_rank), and [`percent_rank`](https://clickhouse.com/docs/sql-reference/window-functions/percent_rank)
  - Value access with [`first_value`](https://clickhouse.com/docs/sql-reference/window-functions/first_value), [`last_value`](https://clickhouse.com/docs/sql-reference/window-functions/last_value), and [`nth_value`](https://clickhouse.com/docs/sql-reference/window-functions/nth_value)
  - Frame navigation with [`lagInFrame`](https://clickhouse.com/docs/sql-reference/window-functions/lagInFrame) and [`leadInFrame`](https://clickhouse.com/docs/sql-reference/window-functions/leadInFrame)

These temporal functions allow analysts to perform sophisticated time-series analyses with concise, readable SQL queries. With ClickHouse's query performance, these functions enable complex time-based aggregations, pattern detection, and anomaly identification across massive datasets with minimal latency.

Let’s have a look at a couple of examples.

The following query computes the yearly average precipitation in the UK, France, and the US from 1990 onwards.

<pre><code
  run='false'   type='click-ui'   language='sql'   runnable='true'   clickhouse_settings='{"enable_parallel_replicas": 0}'   play_link='https://sql.clickhouse.com?query=U0VMRUNUIHllYXIsCiAgICAgICBhdmcoYHByZWNpcGl0YXRpb25gKSBBUyBgYXZnX3ByZWNpcGl0YXRpb25gLAogICAgICAgZGljdEdldChgY291bnRyeWAuYGNvdW50cnlfaXNvX2NvZGVzYCwgJ25hbWUnLCBjb2RlKSBhcyBjb3VudHJ5CkZST00gYG5vYWFgLmBub2FhX3YyYApXSEVSRSBkYXRlID4gJzE5OTAtMDEtMDEnIEFORCBjb2RlIElOICgnVUsnLCAnRlInLCAnVVMnKQpHUk9VUCBCWSB0b1N0YXJ0T2ZZZWFyKGBkYXRlYCkgQVMgYHllYXJgLAogICAgICAgICBzdWJzdHJpbmcoc3RhdGlvbl9pZCwgMSwgMikgYXMgY29kZQpIQVZJTkcgYXZnX3ByZWNpcGl0YXRpb24gPiAwICAgICAgICAgCk9SREVSIEJZIGNvdW50cnksIHllYXIgQVNDCkxJTUlUIDEwMDAwMA&chart=eyJ0eXBlIjoibGluZSIsImNvbmZpZyI6eyJ4YXhpcyI6InllYXIiLCJ5YXhpcyI6ImF2Z19wcmVjaXBpdGF0aW9uIiwic2VyaWVzIjoiY291bnRyeSJ9fQ'   show_statistics='true' view='chart'
  chart_config='eyJ0eXBlIjoibGluZSIsImNvbmZpZyI6eyJ4YXhpcyI6InllYXIiLCJ5YXhpcyI6ImF2Z19wcmVjaXBpdGF0aW9uIiwic2VyaWVzIjoiY291bnRyeSJ9fQ'
>
SELECT year,
       avg(`precipitation`) AS `avg_precipitation`,
       dictGet(`country`.`country_iso_codes`, 'name', code) as country
FROM `noaa`.`noaa_v2`
WHERE date > '1990-01-01' AND code IN ('UK', 'FR', 'US')
GROUP BY toStartOfYear(`date`) AS `year`,
         substring(station_id, 1, 2) as code
HAVING avg_precipitation > 0         
ORDER BY country, year ASC
LIMIT 100000;
</code></pre>

The following query uses a window function to calculate the cumulative stars of the `deepseek-ai/DeepSeek-R1` repository:

<pre><code
  run='false'   type='click-ui'   language='sql'   runnable='true'   clickhouse_settings='{"enable_parallel_replicas": 0}'   play_link='https://sql.clickhouse.com?query=U0VMRUNUIHRvRGF0ZShjcmVhdGVkX2F0KSBBUyBkYXksIAogICAgICAgY291bnQoKSBBUyBkYWlseUNvdW50LAogICAgICAgc3VtKGRhaWx5Q291bnQpIE9WRVIgKE9SREVSIEJZIGRheSBBU0MpIEFTIGN1bFN0YXJzCkZST00gZ2l0aHViLmV2ZW50cyAKV0hFUkUgZXZlbnRfdHlwZSA9ICdXYXRjaEV2ZW50JyBBTkQgcmVwb19uYW1lID0gJ2RlZXBzZWVrLWFpL0RlZXBTZWVrLVIxJwpHUk9VUCBCWSBBTEwKT1JERVIgQlkgZGF5OwoK&chart=eyJ0eXBlIjoibGluZSIsImNvbmZpZyI6eyJ4YXhpcyI6ImRheSIsInlheGlzIjoiY3VsU3RhcnMifX0'   show_statistics='true'
>
SELECT toDate(created_at) AS day, 
       count() AS dailyCount,
       sum(dailyCount) OVER (ORDER BY day ASC) AS culStars
FROM github.events 
WHERE event_type = 'WatchEvent' AND repo_name = 'deepseek-ai/DeepSeek-R1'
GROUP BY ALL
ORDER BY day;
</code></pre>

Additionally, ClickHouse offers features that are particularly valuable for long-term time-series data management:

- [Materialized views](https://clickhouse.com/docs/en/materialized-view) for maintaining pre-aggregated data efficiently
- Support for [aggregate states](https://clickhouse.com/blog/aggregate-functions-combinators-in-clickhouse-for-arrays-maps-and-states#working-with-aggregation-states) that enable flexible roll-up strategies
- [Time-to-live (TTL) functionality](https://clickhouse.com/docs/en/guides/developer/ttl) that can automatically manage data retention and aggregation levels

These capabilities mean you can implement sophisticated time-series storage strategies, such as keeping recent data at full granularity while automatically rolling up older data to save space. This approach provides both detailed recent data for operational needs and efficient storage of historical data for long-term analysis.

ClickHouse also expands its time-series capabilities with experimental features like the [Time Series table engine](https://clickhouse.com/docs/en/engines/table-engines/special/time_series), which can be a backing store for Prometheus data. This allows organizations to leverage ClickHouse's analytical capabilities while maintaining compatibility with popular time-series monitoring tools.

Rather than being limited to time-series-specific functionality, ClickHouse allows you to handle time-series workloads alongside other analytical queries, providing a more versatile solution for organizations with diverse data analysis needs.

➡️ Read more in [Can I use ClickHouse as a Time-Series Database?](https://clickhouse.com/docs/en/faq/use-cases/time-series) and [Working with Time Series Data in ClickHouse](https://clickhouse.com/blog/working-with-time-series-data-and-functions-ClickHouse).
