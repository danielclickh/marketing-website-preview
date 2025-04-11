---
title: 'An intro to time-series databases'
slug: 'what-is-time-series-database'
excerpt: "In this guide, we’ll learn all about time-series data and its use cases, time-series databases, and how to query time-series data."
index: 4
---

Time-series data is everywhere in modern systems - from IoT sensors and financial markets to application monitoring and user analytics. As organizations collect more temporal data, they need efficient ways to store, process, and analyze it. 

This article explores time-series databases, their use cases, and how different database solutions handle time-based data. Whether you're dealing with millions of sensor readings, tracking user behavior, or monitoring system performance, understanding your options for time-series data storage is crucial for building effective data systems.

## What is time-series data?

Let’s start by defining time-series data. It describes datasets where observations are captured along a timeline, and a key feature is a **timestamp**. These data points are collected at **regular intervals**—like every second, minute, or day—or **irregular intervals** when events occur unpredictably.

For example, while a weather sensor might collect readings at fixed intervals (e.g., every 10 seconds), an error log in a server system records data only when an error event happens, which can be at any time. Both are forms of time-series data because they represent data that changes over time, whether those changes are **periodic** or **sporadic**.

Let’s look at the methods of data collection in a little more detail:

* **Fixed interval sampling:** This method captures data at consistent time points, providing a predictable and continuous stream of information. Examples include weather sensors, heart rate monitors, and energy meters. Since the points are evenly distributed, this data is beneficial for seeing trends over specific periods.  
* **Event-driven data:** Time-series data can also be captured irregularly, triggered by specific occurrences. For instance, a server logs data each time a particular error occurs, which could happen multiple times in one hour or not for several hours. Other examples include clickstream data from websites (where clicks happen unpredictably) or social media posts, which depend entirely on user activity.

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

* [InfluxDB](https://github.com/influxdata/influxdb) \- Specifically designed for time-series data, InfluxDB handles high write loads and provides features like downsampling and data retention policies, making it great for IoT, DevOps metrics, and real-time monitoring.  
* [QuestDB](https://github.com/questdb/questdb) \- A high-performance open-source time-series database that excels at fast SQL queries and high-throughput ingestion.  
* [Prometheus](https://github.com/prometheus/prometheus) \- An open-source monitoring system primarily designed for system and service monitoring. Prometheus excels at scraping metrics from various endpoints, storing them efficiently, and enabling alerting based on those metrics. It’s well-suited for use cases like server health monitoring and application performance metrics.

### Extensions of relational databases

Traditional relational databases can enhanced with time-series capabilities, combining the familiarity and flexibility of SQL with specialized temporal features.

[TimescaleDB](https://github.com/timescale/timescaledb) is an extension of PostgreSQL. TimescaleDB adds time-based features like automatic partitioning and time-based indexing. It's perfect for scenarios where you want to blend relational data with time-series data, such as in business intelligence or IoT.

### Real-Time analytics / column-based Databases

Systems optimized for rapid large-scale data analysis, using [columnar storage](/engineering-resources/what-is-columnar-database) to enable fast aggregations and real-time processing of time-series information. Some examples are described below:

* [Apache Pinot](https://github.com/apache/pinot) \- Designed for real-time, low-latency analytics, Pinot is well-suited for applications like user-facing dashboards or clickstream analysis, offering sub-second query response times.  
* [ClickHouse](https://github.com/ClickHouse/ClickHouse) \- That’d be us\! ClickHouse was initially designed to keep records of all clicks by people from all over the Internet but is now used for various time-centric datasets, with a particular focus on observability.

## Querying time-series data

Time-series databases offer specialized query capabilities designed to handle temporal data efficiently. While many modern time-series databases use SQL with extensions, some have developed their own query languages optimized for time-series operations.

Most time-series databases extend standard SQL with specialized functions for temporal analysis. These extensions typically include:

* Time-based window functions for analyzing data over specific time intervals  
* Gap filling to handle missing data points  
* Interpolation functions to estimate values between known data points  
* Time bucket operations for grouping data into regular time intervals  
* Specialized mathematical functions for time-series analysis

Prometheus uses a domain-specific query language called [PromQL](https://prometheus.io/docs/prometheus/latest/querying/basics/), specifically designed for time-series analysis and monitoring use cases. PromQL has built-in support for rate calculations and aggregations over time, native handling of labels and label matching, and vector and range vector selectors. It's particularly well-suited for monitoring scenarios where you must analyze metrics over time windows and create alerting rules.

InfluxDB initially used a query language called InfluxQL, which was SQL-like but explicitly designed for time-series operations. With InfluxDB 2.0, they introduced Flux, a more powerful SQL-based language, before adding SQL support to make the platform more accessible to users familiar with traditional database querying.

## Is ClickHouse a time-series database?

While ClickHouse isn't specifically designed as a time-series database, it excels at handling time-series workloads as part of its broader analytical capabilities. 

As a columnar OLAP database, ClickHouse provides the performance and features needed for efficient time-series analysis without the limitations of a specialized solution.

ClickHouse's strengths in handling time-series data come from several key capabilities:

* Real-time querying of large datasets, enabling analysis of historical and current data at scale  
* Support for [high-precision timestamps](https://clickhouse.com/docs/en/sql-reference/data-types/datetime64) and date-time operations  
* Rich set of temporal functions for [time-based aggregations](https://clickhouse.com/docs/en/sql-reference/functions/date-time-functions), [window operations](https://clickhouse.com/docs/en/sql-reference/window-functions), and more.

Additionally, ClickHouse offers features that are particularly valuable for long-term time-series data management:

* [Materialized views](https://clickhouse.com/docs/en/materialized-view) for maintaining pre-aggregated data efficiently  
* Support for [aggregate states](https://clickhouse.com/blog/aggregate-functions-combinators-in-clickhouse-for-arrays-maps-and-states#working-with-aggregation-states) that enable flexible roll-up strategies  
* [Time-to-live (TTL) functionality](https://clickhouse.com/docs/en/guides/developer/ttl) that can automatically manage data retention and aggregation levels


These capabilities mean you can implement sophisticated time-series storage strategies, such as keeping recent data at full granularity while automatically rolling up older data to save space. This approach provides both detailed recent data for operational needs and efficient storage of historical data for long-term analysis.

ClickHouse also expands its time-series capabilities with experimental features like the [Time Series table engine](https://clickhouse.com/docs/en/engines/table-engines/special/time_series), which can be a backing store for Prometheus data. This allows organizations to leverage ClickHouse's analytical capabilities while maintaining compatibility with popular time-series monitoring tools.

Rather than being limited to time-series-specific functionality, ClickHouse allows you to handle time-series workloads alongside other analytical queries, providing a more versatile solution for organizations with diverse data analysis needs.

➡️ Read more in [Can I use ClickHouse as a Time-Series Database?](https://clickhouse.com/docs/en/faq/use-cases/time-series) and [Working with Time Series Data in ClickHouse](https://clickhouse.com/blog/working-with-time-series-data-and-functions-ClickHouse).  