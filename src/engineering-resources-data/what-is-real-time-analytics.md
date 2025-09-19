---
title: 'What is real-time analytics?'
slug: 'what-is-real-time-analytics'
excerpt: "In this guide, we'll learn all about real-time analytics - how does it compare to batch analytics, what are its main characteristics, use cases, and more."
index: 3
lastUpdated: '2025-04-11'
---

Real-time analytics refers to data processing that delivers insights to end users and customers as soon as the data is generated. It differs from traditional or batch analytics, where data is collected in batches and processed, often a long time after it was generated.

Real-time analytics systems are built on top of event streams, which consist of a series of events ordered in time. An event is something that’s already happened. It could be the addition of an item to the shopping cart on an e-commerce website, the emission of a reading from an Internet of Things (IoT) sensor, or a shot on goal in a football (soccer) match.

An example of an event (from an imaginary IoT sensor) is the following:

```json
{
  "deviceId": "sensor-001",
  "timestamp": "2023-10-05T14:30:00Z",
  "eventType": "temperatureAlert",
  "data": {
    "temperature": 28.5,
    "unit": "Celsius",
    "thresholdExceeded": true
  }
}
```

Organizations can discover insights about their customers by aggregating and analyzing events like this. This has traditionally been done using batch analytics, and in the next section, we’ll compare batch and real-time analytics.

## Real-Time Analytics vs Batch Analytics

The diagram below shows what a typical batch analytics system would look like from the perspective of an individual event:

![](/images/engineering-resources/0_rta.png)

You can see that there’s quite a big gap from when the event happens until we process and gain some insight from it. Traditionally, this was the only means of data analysis, and we’d need to create artificial time boundaries to process the data in batches. For example, we might process all the data collected at the end of a day. This worked for many use cases, but for others, it’s sub-optimal because we’re working with stale data, and it doesn’t allow us to react to the data quickly enough.

By contrast, in real-time analytics systems, we react to an event as soon as it happens, as shown in the following diagram:

![](/images/engineering-resources/1_rta.png)

We can now derive insights from events almost as soon as they’re generated. But why is this useful?

## Benefits of real-time analytics

In today's fast-paced world, organizations rely on real-time analytics to stay agile and responsive to ever-changing conditions. A real-time analytics system can benefit a business in many ways.

### Better decision-making

Decision-making can be improved by having access to actionable insights via real-time analytics. When business operators can see events as they’re happening, it makes it much easier to make timely interventions.

For example, if we make changes to an application and want to know whether it’s having a detrimental effect on the user experience, we want to know this as quickly as possible so that we can revert the changes if necessary. With a less real-time approach, we might have to wait until the next day to do this analysis, by which type we’ll have a lot of unhappy users.

### New products and revenue streams

Real-time analytics can help businesses generate new revenue streams. Organizations can develop new data-centered products and services that give users access to analytical querying capabilities. These products are often compelling enough for users to pay for access.

In addition, existing applications can be made stickier, increasing user engagement and retention. This will result in more application use, creating more revenue for the organization.

### Improved customer experience

With real-time analytics, businesses can gain instant insights into customer behavior, preferences, and needs. This lets businesses offer timely assistance, personalize interactions, and create more engaging experiences that keep customers returning.

## Real-time analytics use cases

The actual value of real-time analytics becomes evident when we consider its practical applications. Let’s examine some of them.

### Fraud detection

Fraud detection is about detecting fraudulent patterns, ranging from fake accounts to payment fraud. We want to detect this fraud as quickly as possible, flagging suspicious activities, blocking transactions, and disabling accounts when necessary.

This use case stretches across industries: healthcare, digital banking, financial services, retail, and more.

[Instacart](https://www.instacart.com/) is North America's leading online grocery company, with millions of active customers and shoppers. It uses ClickHouse as part of [Yoda, its fraud detection platform](https://tech.instacart.com/real-time-fraud-detection-with-yoda-and-clickhouse-bd08e9dbe3f4). In addition to the general types of fraud described above, it also tries to detect collusion between customers and shoppers.

![](/images/engineering-resources/2_rta.png)

They identified the following characteristics of ClickHouse that enable real-time fraud detection:

> ClickHouse supports LSM-tree based MergeTree family engines. These are optimized for writing which is suitable for ingesting large amounts of data in real-time.

> ClickHouse is designed and optimized explicitly for analytical queries. This fits perfectly with the needs of applications where data is continuously analyzed for patterns that might indicate fraud.

➡️ Learn more about how Instacart use ClickHouse for the [fraud detection use case](https://clickhouse.com/videos/real-time-fraud-detection-with-yoda-and-clickhouse) in the video recording and [blog post](https://tech.instacart.com/real-time-fraud-detection-with-yoda-and-clickhouse-bd08e9dbe3f4).

### Time-sensitive decision making

Time-sensitive decision-making refers to situations where users or organizations need to make informed choices quickly based on the most current information available. Real-time analytics empowers users to make informed choices in dynamic environments, whether they're traders reacting to market fluctuations, consumers making purchasing decisions, or professionals adapting to real-time operational changes.

Coinhall provides its users with real-time insights into price movements over time via a candlestick chart, which shows the open, high, low, and close prices for each trading period. They needed to be able to run these types of queries quickly and with a large number of concurrent users.

![](/images/engineering-resources/3_rta.png)

> In terms of performance, ClickHouse was the clear winner, executing candlestick queries in 20 milliseconds, compared to 400 milliseconds or more for the other databases. It ran latest-price queries in 8 milliseconds, outpacing the next-best performance (SingleStore) which came in at 45 milliseconds. Finally, it handled ASOF JOIN queries in 50 milliseconds, while Snowflake took 20 minutes and Rockset timed out.

➡️ Learn more about how Coinhall uses ClickHouse for the [time-sensitive decision making use case](https://clickhouse.com/blog/trade-secrets-how-coinhall-uses-clickhouse-to-power-its-blockchain-data-platform).

### Observability

Many organizations run online services, and if something goes wrong, they need to be able to solve the problem as quickly as possible. Real-time analytics enables them to debug issues as they happen, using logs, events, and traces. This use case has high insert workloads and the need for low-latency analytical queries.

LangChain is a popular software framework that helps users build applications that use large language models. They have built a commercial product called LangSmith, a unified developer platform for LLM application observability and evaluation that uses ClickHouse under the hood.

LangSmith lets users understand what’s going on in their LLM applications and allows them to debug agentic workflows. It also helps developers detect excessive token use, a costly problem they want to detect as soon as possible.

When working with LLM applications, there are invariably many moving pieces with chained API calls and decision flows. This makes it challenging to understand what's going on under the hood, with users needing to debug infinite agent loops or cases with excessive token use. Seeing an obvious need here, LangSmith started as an observability tool to help developers diagnose and resolve these issues by giving clear visibility and debugging information at each step of an LLM sequence.

> We wanted something that was architecturally simple to deploy and didn’t make our infrastructure more complicated. We looked at Druid and Pinot, but these required dedicated services for ingestion, connected to queuing services such as Kafka, rather than simply accepting INSERT statements. We were keen to avoid this architectural complexity,

➡️ Learn more about how LangChain uses ClickHouse for the [observability user case](https://clickhouse.com/blog/langchain-why-we-choose-clickhouse-to-power-langchain).

There are also many other use cases, including:

- Real-time ad analytics: Give buyers and sellers the ability to slice and dice ad performance data.
- Content recommendation: Show users fresh and interesting content each time they log in, considering the content they typically consume and interact with.
- Anomaly detection: In real-time, identify unusual patterns in data that might indicate a problem that needs addressing.
- [Usage-based pricing](https://clickhouse.com/blog/openmeter-real-time-usage-based-billing-powered-by-clickhouse-cloud): Precise metering through real-time analytics prevents overages and ensures fair charging in dynamic cloud environments.
- [Short-term forecasting](https://clickhouse.com/videos/lyft-user-story): Computing predicted demand using the latest usage data, sliced and diced across multiple dimensions.

## Characteristics of a real-time analytics system

The system we build must have specific characteristics to achieve the benefits and use cases described in the previous two sections.

### Ingestion speed

We’re predominantly working with streaming data, the value of which decreases over time. Therefore, we need a fast data ingestion process to make the data available for querying. We should see a change in the real-time analytics system as soon as it happens.

There will always be some lag between when the data is generated and when it’s available for querying. We need that lag to be as small as possible.

### Query speed

Once the data is ingested, we must ensure it can be queried quickly. We should aim for web page response times, i.e., a query's time to run and return a result should be sub-second and ideally 100 milliseconds or less.

The system must maintain quick query responses at all times. This should hold even during periods of high-volume data ingestion.

### Concurrency

Real-time analytics systems are often user-facing and must handle many concurrent queries. It’s common for these systems to support tens or hundreds of thousands of queries per second.

These characteristics are typically seen in [column databases](https://clickhouse.com/engineering-resources/what-is-columnar-database) like ClickHouse.

## Data sources for real-time analytics

Real-time analytics systems are based on events, typically managed by a streaming data platform. These systems act as the source of truth for event data and can handle a high volume and concurrency of data being produced and consumed. The events are stored durably and consumed by downstream systems.

There are many different providers of streaming data platforms, including Redpanda, Apache Pulsar, and Amazon Kinesis, but the [most popular at the time of writing is Apache Kafka](https://www.ibm.com/blog/apache-kafka-use-cases/).

In addition to working with real-time data, we must support slower-changing data, such as product catalogs, customer profiles, or geographic data. This data might reside in another database, on the file system, or in cloud bucket storage, so we’ll need to ingest it from there.

## What is a real-time analytics database?

At the heart of any real-time analytics system is a database that ingests data quickly and serves low-latency queries at scale. These databases are a subset of [Online Analytics Processing (OLAP) databases](https://clickhouse.com/engineering-resources/oltp-vs-olap) but have some notable differences.

Traditional OLAP databases were designed for batch analytics, which we learned about earlier. They were used for internal-facing use cases where having data refreshed every day or, at best, every hour was sufficient. This approach doesn’t work for user-facing applications with expected sub-second query response time.

Real-time databases must ingest hundreds of thousands or millions of records per second and immediately make this data available to queries, providing users with access to fresh data.

## Why ClickHouse Cloud for real-time analytics?

[ClickHouse Cloud](https://clickhouse.com/cloud) is a real-time data analytics platform. It offers a fully managed, cloud-based version of ClickHouse and also comes with ClickPipes, an integration engine that simplifies continuous data ingestion from various sources, including Amazon S3 and Apache Kafka.

You can see the architecture of ClickHouse Cloud in the following diagram:

![](/images/engineering-resources/4_rta.png)

ClickHouse has the characteristics needed in a real-time analytics system, described earlier in this article.

### Ingestion speed

It can comfortably ingest hundreds of thousands and even millions of records per second. Cloudflare was [ingesting 6 million records per second](https://blog.cloudflare.com/http-analytics-for-6m-requests-per-second-using-clickhouse/) as far back as 2018\. It can also ingest data from an extensive range of sources. ClickPipes provides enterprise-grade support for ingesting data from Confluent Cloud, Amazo S3, Azure EventHubs, and more. In addition, ClickHouse also has [integrations](https://clickhouse.com/docs/en/integrations) with Apache Iceberg, MongoDB, MySQL, AirByte, and more.

### Query latency

[Query performance is a top priority](https://clickhouse.com/docs/en/concepts/why-clickhouse-is-so-fast) during the development of ClickHouse. ClickHouse Cloud customers typically see [second](https://clickhouse.com/blog/data-hive-the-story-of-beehiivs-journey-from-postgres-to-clickhouse) or [sub-second](https://clickhouse.com/blog/lago-using-clickhouse-to-scale-an-events-engine) latency for their queries, even with high data volumes. This is achieved through the way data is stored, how it’s compressed, and the use of data structures to ensure only relevant data is processed.

ClickHouse also uses vectorized query execution and parallelizes query execution across cores and servers. Users can also use materialized views to reduce the number of rows that need to be scanned when query latency is at a premium.

### Concurrency

ClickHouse is designed to handle high concurrency workloads. It is frequently used in applications where organizations want to [provide real-time analytics functionality to their users](https://clickhouse.com/blog/behind-the-scenes-how-clickhouse-helps-vimeo-power-video-analytics-at-scale). It's also used in [real-time dashboards](https://clickhouse.com/blog/how-quickcheck-uses-clickhouse-to-bring-banking-to-the-unbanked), where there are fewer users, but each dashboard refresh spawns multiple queries.

## Getting started with ClickHouse Cloud for real-time analytics

Hopefully, you’re excited to [add real-time analytics functionality to your application](https://clickhouse.com/blog/adding-analytics-to-an-application-with-clickhouse-query-endpoints). Let’s have a look at how to do that.

The first step is to navigate to [clickhouse.cloud](https://console.clickhouse.cloud/) and create an account for your 30-day free trial. Once you’ve done that, create a service in the cloud and region of your choice. Initializing the service will take a few minutes, but then we’re ready to import some data.

You can also watch the following video to see the steps described above:

<iframe width="768" height="432" src="https://www.youtube.com/embed/uWNY0GLUkqc?si=0znNr0i1To7N2ZGb" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen\></iframe>

<p></p>
Once your service is up and running, we need to follow these steps:
<p></p>

1. Ingest data with ClickPipes.
2. Write queries using the ClickHouse Cloud SQL console.
3. Create query endpoints based on those queries.

Let’s go through each of these steps in a bit more detail.

### Ingest data with ClickPipes

ClickPipes is an integration engine that makes ingesting massive volumes of data from diverse sources as simple as clicking a few buttons. It supports a variety of sources, both for streaming and static data.

![](/images/engineering-resources/5_rta.png)

You’ll likely want to use it to ingest data from Confluent Cloud or one of the other streaming data platforms. You’ll have to populate your credentials and select the topic you want to ingest. ClickPipes will then infer a table schema by sampling some of the messages in the chosen topic before creating a table and ingesting the data into it.

### Write queries in the SQL console

Once the data is ingested, you can explore it using the [SQL console](https://clickhouse.com/docs/en/get-started/sql-console). Clicking on a table will show its contents, which you can view and filter.

You can also write queries manually, and the SQL console provides a rich UI for editing queries and even has AI assistance if your SQL is a bit rusty. You can also create visualizations to understand query results better.

### Create query endpoints

Once you’re happy with your query, you can save it and share it with other users in your organization. You can also [create an API endpoint](https://clickhouse.com/docs/en/get-started/query-endpoints) for the query. Query API endpoints create an API endpoint directly from any saved SQL query in the ClickHouse Cloud console. You can then access API endpoints via HTTP to execute your saved queries without connecting to your ClickHouse Cloud service via a native driver.

You can read more about query endpoints in the blog post [Adding Analytics to an Application in under 10 minutes with ClickHouse Cloud Query Endpoints](https://clickhouse.com/blog/adding-analytics-to-an-application-with-clickhouse-query-endpoints)
