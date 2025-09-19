---
title: 'OLTP vs OLAP'
slug: 'oltp-vs-olap'
image: '/images/engineering-resources/oltp_vs_olap.png'
excerpt: 'Explore the differences between OLTP (Online Transaction Processing) and OLAP (Online Analytical Processing) systems, examining how they serve unique purposes, the challenges of implementing OLAP, and guidelines for selecting the right system for various use cases. Real-world examples will illustrate when and why each system excels, providing practical insights for application.'
index: 1
lastUpdated: '2025-04-11'
---

## Introduction

Data processing systems for managing data can be categorized as either Online Transaction Processing (OLTP) or Online Analytical Processing (OLAP). While both have different purposes, they are equally critical for handling day-to-day operations and deriving actionable insights for businesses.

OLTP systems are designed for real-time transaction management, ensuring that data from critical operational tasks such as sales, order processing, and customer interactions is captured, stored, and processed with speed and accuracy. In contrast, OLAP systems focus on complex queries and analyzing large volumes of historical data, offering businesses valuable insights to drive decision-making and strategic planning. Modern OLAP systems, however, have evolved beyond traditional limitations. They now power real-time analytical applications and dashboards, supporting the higher query concurrency needed for user-facing scenarios. These real-time OLAP databases also address historical constraints by enabling higher write throughputs and reducing data availability latency to mere seconds. When combined, OLTP and OLAP allow businesses to maximize the value of their data for both operational efficiency and strategic insights.

In this guide, we explore the differences and similarities of these two approaches to data processing in detail, with use case examples to illustrate when each is appropriate. We aim to provide the reader with enough insights to decide when to use OLTP vs. when to use OLAP. Finally, we’ll describe how fast and efficient CDC allows to bridge the gap between the two paradigms.

> While not all OLTP or OLAP systems are strictly databases, most databases can typically be categorized as OLTP or OLAP based on their primary function. We thus focus on the differences between these systems, using databases as examples where appropriate.

![oltp_olap_uses](/images/engineering-resources/oltp_olap_uses.png)

## What is OLTP?

Online Transaction Processing (OLTP) refers to a system designed to manage and execute large volumes of real-time transactions from multiple concurrent users. These systems are used to power the day-to-day operations across various industries, handling tasks such as ATM withdrawals, online banking, e-commerce purchases, and in-store transactions. OLTP systems allow the insertion, updating, or deletion of datasets in real time. With multiple users accessing the same data simultaneously, OLTP systems focus on data consistency and the fast retrieval of a small number of records e.g. a bank transaction, typically identified through a unique key or set of filters.

OLTP systems that support SQL often express this as a simple SELECT with a WHERE condition.

```sql
SELECT
    addr1,
    addr2,
    street,
    locality,
    town,
    district,
    price
FROM uk.uk_price_paid
WHERE (postcode1 = 'BB1') AND (postcode2 = '6NP')
```

_OLTP query retrieving a house prices by id from the [UK based on price paid data](https://clickhouse.com/docs/en/getting-started/example-datasets/uk-price-paid)_

Data is inserted into OLTP systems with[ transactional guarantees](https://en.wikipedia.org/wiki/Database_transaction), ensuring that all operations within a transaction—whether inserting, updating, or deleting—are executed reliably and consistently. Transactions in these systems follow the[ ACID](https://en.wikipedia.org/wiki/ACID)<span style="text-decoration:underline;"> </span>(**Atomicity**, Consistency, Isolation, Durability) properties, which safeguard data integrity. **Atomicity** ensures that every transaction is completed in full or not at all, meaning if a transaction fails, the database reverts to its previous state, leaving the data unaffected. **Consistency** guarantees that any changes made within a transaction adhere to the database’s constraints and rules, maintaining the overall structure and accuracy. **Isolation** ensures that transactions run independently of one another, preventing interference or data corruption when multiple processes access the database concurrently. **Durability** ensures that once a transaction is successfully committed, the changes are permanently saved, even in cases of system failure. This framework ensures that even if an update transaction fails, existing data remains intact, and any incomplete or erroneous changes are discarded, maintaining the database’s reliability.

While the data read or inserted per request is typically small with OLTP systems (&lt;5%), the total data size can still be substantial - occasionally in the TB range. These systems do require significant expertise in horizontal scaling, with techniques such as sharding requiring extensions and/or careful data distribution.

In OLTP systems, databases like[ PostgreSQL](https://www.postgresql.org/) are often used as a classic example due to their robustness, scalability, and strong ACID compliance. PostgreSQL excels at handling high volumes of short, fast queries required in use cases such as financial transactions. The relational structure of PostgreSQL allows for efficient indexing and querying, enabling real-time read and write operations by multiple users. Transactional guarantees ensure data integrity with a Postgres transaction either completing fully or being rolled back if an error occurs, thus safeguarding the database from inconsistencies. Features like row-level locking and support for multiple isolation levels further enhance its reliability, making PostgreSQL a preferred choice for OLTP applications across a range of industries.

## What is OLAP?

Online Analytical Processing (OLAP) refers to systems designed to perform complex queries on large datasets for the purpose of data analysis, reporting, and business intelligence. Unlike OLTP systems, which focus on real-time transaction processing, OLAP systems are built to analyze aggregated historical data from various sources, including but not limited to OLTP systems. This enables businesses to process multidimensional data quickly and uncover insights like year-over-year performance, market trends, or customer behavior patterns.
OLAP systems are essential for decision-making processes across various industries, powering applications such as financial analysis, budgeting, forecasting, and sales optimization. These systems typically store massive datasets, often ranging from terabytes (TB) to even petabytes (PB). Queries tend to be complex, aggregating and joining data across multiple dimensions to summarize a large number of data points. This invariably means OLAP systems prioritize efficient data reads over a large number of rows, making them invaluable for tasks that require in-depth analysis rather than real-time transactional updates.

```sql
SELECT
    town,
    district,
    count() AS c,
    round(avg(price)) AS price,
    bar(price, 0, 5000000, 100)
FROM uk_price_paid
WHERE date >= '2020-01-01'
GROUP BY
    town,
    district
HAVING c >= 100
ORDER BY price DESC
LIMIT 100
```

_OLAP query identifying the most expensive towns and districts in the [UK based on price paid data](https://clickhouse.com/docs/en/getting-started/example-datasets/uk-price-paid)_

> Data warehouses are OLAP systems that often rely on OLAP databases to power them, but they provide broader functionalities for managing, cleaning, and preparing data for analysis across the organization. This includes features like data integration, ETL (Extract, Transform, Load) processes, and long-term data storage from multiple sources. A data warehouse serves as a comprehensive platform for centralized analysis and reporting, typically incorporating data governance, security, and auditing capabilities.

Traditionally, OLAP systems would require data to be loaded in large batches, often with updates scheduled at periodic intervals, e.g. daily, depending on the organization’s needs. This batch processing allows for the aggregation of vast amounts of data before analysis, but it also introduces delays in data availability. However, with the emergence of real-time OLAP databases like ClickHouse, this limitation is being removed. While data is still loaded in batches, the latency between data capture and availability for analysis has been reduced to mere seconds through techniques such as [Real-Time Change Capture Control (CDC)](#oltp-to--olap-with-change-data-capture). This near-real-time capability allows businesses to make decisions based on fresher data. This evolution towards real-time analytics is transforming how organizations use OLAP systems, enabling faster, more data-driven decision-making.

Furthermore, OLAP databases have traditionally relied on users modeling data using snowflake or star schemas to optimize complex queries across multiple dimensions. While these models are still prevalent, there is an increasing trend towards denormalizing data, a technique commonly used in OLTP systems. This shift is driven by the need to reduce query time joins, especially in cases where query latency is critical. To support this, modern real-time OLAP databases, such as ClickHouse, employ [dictionary lookup capabilities](https://clickhouse.com/blog/faster-queries-dictionaries-clickhouse) while encouraging [denormalization](https://clickhouse.com/docs/en/migrations/postgresql/data-modeling-techniques) (but still support joins), enabling faster query execution.

This trend correlates with the growing demand for sub-second query times (&lt;1s) in [real-time analytics use cases](https://clickhouse.com/engineering-resources/what-is-real-time-analytics). These [use cases](https://clickhouse.com/user-stories?useCase=1&search=) expose analytics in highly interactive applications, where they typically serve a greater number of users than historically seen in OLAP systems. These applications require the faster execution times offered by real-time OLAP databases.

## Key differences between OLAP and OLTP

The reader can observe some clear distinctions based on the descriptions provided, while other differences stem from the specific workloads and types of data each system handles. In the case of databases, the nature of the workload often dictates fundamental differences in design—OLTP systems are optimized to retrieve small, targeted sets of rows. In contrast, OLAP systems are built to summarize and aggregate data across a large percentage of the dataset.

| **Dimension**          | **OLTP (Online Transaction Processing)**                                    | **OLAP (Online Analytical Processing)**                                                                                                                         |
| ---------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Purpose                | Real-time transaction management (e.g., sales, updates)                     | Complex data analysis and reporting                                                                                                                             |
| Data Source            | Current, operational data from live transactions                            | Aggregated historical data from multiple sources including but not limited to OLTP systems                                                                      |
| Data Model             | Normalized (3NF) for data efficiency and integrity                          | star/snowflake schemas or denormalized for query performance                                                                                                    |
| Data Volume            | Smaller datasets (GB to TB)                                                 | Large datasets (TB to PB)                                                                                                                                       |
| Query Types            | Typically simple, with a filter on primary key or indexed values            | Complex SELECT queries with aggregations and possibly joins                                                                                                     |
| Operations             | Frequent, short updates for real-time data                                  | Historically updates via scheduled batch jobs, but increasingly batches in closer to second frequency.                                                          |
| Response Time          | Milliseconds for most operations                                            | Historically seconds to hours depending on query complexity. Increasingly sub second when analytics are exposed in applications.                                |
| Data Loading & Updates | Small inserts with updates in real time                                     | Historically periodic data refreshes through batch jobs but                                                                                                     |
| Database Design\*      | Row-based, normalized for fast transaction updates                          | Columnar, denormalized for efficient querying                                                                                                                   |
| Data Architecture      | Optimized for fast reads and small writes                                   | Optimized for read-heavy, complex queries with batch writes                                                                                                     |
| Data View              | Snapshot of real-time business transactions                                 | Multi-dimensional view of historical and aggregated data                                                                                                        |
| Data integrity         | Must maintain data integrity constraint                                     | Less critical as it can typically be restored from backups and doesn’t impact operational ability. Note: higher if powering real-time user-facing applications. |
| Backup and Recovery    | Frequent backups to ensure business continuity for mission critical systems | Less frequent backups; data can be restored from OLTP sources in many cases.                                                                                    |
| Types of Users         | Operational users                                                           | Analysts, data scientists & engineers, business managers, and executives                                                                                        |
| Consistency Guarantees | Transactional with ACID compliance                                          | Typically eventually consistent, although transactional features emerging                                                                                       |
| Number of users        | Thousands concurrently                                                      | Historically 10s, but increasingly hundreds and thousands with real-time workloads                                                                              |

## OLTP to OLAP with Change Data Capture

In essence, OLTP systems have traditionally supported the operational side of a business, enabling day-to-day functions, while OLAP systems focus on the informational aspect, helping organizations gain insights and understand their overall performance. This is manifested in the backup and recovery strategies, with OLTP systems critical to the business being able to operate and thus needing frequent backups and well tested recovery procedures. Conversely, OLAP systems, while essential to providing insights and competitive advantage, are typically subject to less strict SLAs and can, in many cases, be restored from OLTP sources.

<blockquote style="font-size:16px">"Our experience with Postgres identified a requirement for high-throughput ingest, coupled with a need for low-latency analytical queries originating from charts and statistics presented to the user. This naturally led us to believe we needed an OLAP/real-time analytical database."<p style="font-weight:bold"><a href="https://clickhouse.com/blog/langchain-why-we-choose-clickhouse-to-power-langchain">Ankush Gola, co-founder of LangChain</a></p>
</blockquote>

## Similarities between OLAP and OLTP

Despite their distinct purposes, OLTP and OLAP share several core similarities, particularly in their reliance on SQL databases to store and manage data. Both systems play critical roles in an organization's data ecosystem, enabling the capture, storage, and retrieval of data in structured formats. 

OLTP and OLAP systems will often be powered by a database which will expose a SQL interface through which most users will interact and query data. Although there can be differences in the "flavor of SQL" (complete ANSI-SQL compliance is rare), this provides a common language with which most users will be familiar - allowing a simple transition between the systems.

Finally, both OLTP and OLAP systems are evolving with technological advancements. Real-time OLAP databases, such as ClickHouse, are blurring the lines between traditional OLTP and OLAP by reducing the latency of data availability, enabling faster insights and decisions. Both systems continue to adapt to increasing data volumes and user demands, underscoring their shared goal of leveraging data for improved business outcomes.

## Challenges of OLAP

The benefits mentioned above don’t come without challenges. While recent advancements have helped address some issues, users still commonly face several key challenges, including:

- **Complexity in setup and maintenance:** OLAP systems require skilled professionals for implementation and management due to complex data modeling and architecture. The rise of cloud data warehouses, led by platforms like Snowflake, BigQuery, and Redshift, has helped modernize data warehousing by outsourcing many of the operational challenges of running a warehouse and offering scalability, convenience, and flexibility. However, this shift has also led to the temptation to position cloud data warehouses as a “one-size-fits-all” solution, blurring the lines between data warehousing and other use cases, such as user-facing analytics and machine learning. This approach has sometimes resulted in performance bottlenecks, increased operational complexity, and rising costs, highlighting the need for more[ specialized solutions and architectures](https://clickhouse.com/blog/the-unbundling-of-the-cloud-data-warehouse).

- **Data latency and freshness:** Traditionally, OLAP systems rely on pre-aggregated data updated in scheduled batches, which introduces delays in data availability and makes real-time analytics difficult. While incremental updates and frequent refreshes can help, they often add complexity to the system. However, modern real-time OLAP databases have increasingly tackled this issue by supporting high write throughputs and providing direct connections to source systems. With features like Kafka and Postgres integration via Change Data Capture (CDC), these systems enable near real-time data ingestion, reducing data latency significantly. This shift ensures fresher data for analytics and paves the way for more interactive, real-time, data-driven applications. Furthermore, while materialized views have historically been used to deliver fast query performance, these require computationally expensive periodic refreshes. OLAP databases increasingly address this challenge[ with incremental materialized views](https://clickhouse.com/docs/en/materialized-view), which are updated and maintained as data is inserted.

![materialized_view](/images/engineering-resources/materialized_view.png)

- **High costs:** Cloud-based OLAP warehouses initially mitigated some of the traditional costs associated with large-scale data processing by separating storage and compute resources, allowing businesses to only pay for the compute power they use. However, as organizations expanded their real-time analytics needs, new challenges arose, such as performance degradation, escalating costs, and low query concurrency. Handling the high data traffic required for interactive, data-driven applications often led to inefficiencies and further increased operational expenses. Modern real-time OLAP databases address these scalability and cost issues by optimizing for large-scale analytics workloads with improved query performance and support for higher concurrency.

<blockquote style="font-size:16px">"At Coinhall, managing vast amounts of blockchain data efficiently is crucial for our consumer-facing trading platform. Initially, we used BigQuery, but as our data grew, so did its costs and performance issues. After exploring several alternatives, we found ClickHouse to be the clear winner. ClickHouse significantly outperformed other databases we tested like Snowflake, Rockset, and SingleStore, and delivered at 40x cost savings."<p style="font-weight:bold"><a href="https://clickhouse.com/blog/trade-secrets-how-coinhall-uses-clickhouse-to-power-its-blockchain-data-platform">CTO Aaron Choo</a></p>
</blockquote>

- **Data quality and complexity:** Real-time data often presents challenges such as errors, duplicates, and inconsistencies, making it crucial to ensure high data quality before analysis. This requires robust data cleansing, validation, and governance frameworks to maintain accuracy and reliability. Moreover, OLAP systems must handle diverse and complex data formats - structured, semi-structured, and sometimes unstructured - which can complicate data modeling and analysis. Increasingly, systems these challenges with flexible architectures, which [support a wide range of data formats](https://clickhouse.com/docs/en/interfaces/formats) and seamlessly integrate with various data pipelines.

- **Scalability and performance:** As data volumes grow, OLAP systems must scale to handle increasing data traffic and complex queries. Maintaining performance while processing large datasets often requires strategies like data partitioning, compression, and distributed architectures. Scaling compute resources horizontally in a distributed self-managed OLAP environment can add significant complexity and management overhead. This is where cloud-based OLAP solutions, designed for horizontal scalability, excel. These efficiently manage petabytes of data by separating storage and compute through the use of object storage. This architecture ensures that users can scale storage independently while optimizing compute resources to meet the demands of high-query concurrency and large-scale data processing. With built-in caching layers and advanced compression techniques, these systems can deliver high performance on vast datasets.

![separation_storage_compute](/images/engineering-resources/separation_storage_compute.png)

The above shows how the separation of storage and compute is typically achieved through the use of object storage, such as S3 and GCS, for data persistence. This allows compute nodes to be scaled vertically i.e. more CPU and RAM per node, as their local disk is used purely as a cache. These nodes can thus be resized independent of storage. Furthermore, nodes can be easily added, enabling horizontal scaling. The choice of scaling depends on the workload being serviced e.g. more nodes will usually enable greater query concurrency to be achieved.

- **Query concurrency:** Traditionally, OLAP systems have struggled with handling high query concurrency, particularly for interactive applications that needed to serve hundreds or even thousands of users simultaneously i.e. user-facing analytics. This often leads to bottlenecks and degraded performance under heavy workloads. However, these limitations are being addressed with the emergence of real-time OLAP databases. Built to handle high query concurrency using features such as[ Incremental Materialized Views](https://clickhouse.com/docs/en/materialized-view), these databases are well-suited for applications requiring real-time data access by large numbers of users. These systems can efficiently support concurrent workloads without performance degradation, making them ideal for use cases like marketing analytics, observability platforms, and SaaS services where fast, interactive query performance is critical.

<blockquote style="font-size:16px">"With Snowflake, we were using the standard plan, small compute, which cost nearly six times more than ClickHouse Cloud. We got several seconds query time and no materialized views. With ClickHouse Cloud’s production instance, we are getting sub-second query time along with materialized views. The decision to switch was a no-brainer for us."<p style="font-weight:bold"><a href="https://clickhouse.com/blog/adgreetz-processes-millions-of-daily-ad-impressions">Noor Thabit, Senior Software Engineer@AdGreetz</a></p>
</blockquote>

- **Lack of open data standards and vendor lock-in:** - OLAP systems, particularly older cloud-based solutions, often use proprietary formats and closed ecosystems, leading to vendor lock-in and limiting flexibility for organizations. This makes it difficult to integrate with other tools or migrate to new platforms without incurring significant costs. Additionally, proprietary storage options can drive up long-term costs for data storage. OLAP databases have addressed these challenges by embracing open data standards and [supporting integration with data lakes using formats like Iceberg](https://clickhouse.com/blog/exploring-global-internet-speeds-with-apache-iceberg-clickhouse) and Delta lake. By adhering to open standards, interoperability with other systems is ensured, reducing the risk of vendor lock-in. Furthermore, the ability to leverage cheaper storage options, such as object stores in data lakes, lowers long-term storage costs while allowing businesses to retain flexibility in how they manage and access their data.

- **Data Security:** OLAP systems often handle sensitive information, making data security a top priority. Protecting this data from unauthorized access and breaches demands robust encryption, multi-factor authentication, and strict adherence to data protection standards like GDPR and HIPAA. Achieving strong security while maintaining high performance is a significant challenge - one that cloud data warehouses address with advanced security features integrated into scalable architectures. These solutions enable organizations to safeguard data effectively without compromising the speed and efficiency needed for complex analytical tasks.

## Use cases and applications

### OLTP systems

OLTP systems are designed to handle large volumes of short, real-time transactions, making them a cornerstone of modern business operations. These systems excel in environments where high consistency and immediate "read-after-write" guarantees are critical. In OLTP databases,[ ACID (Atomicity, Consistency, Isolation, Durability) transactions](https://en.wikipedia.org/wiki/ACID) ensure that once a transaction—such as an insert, update, or delete—is committed, any subsequent read will reflect the most recent changes. This transactional integrity is key for ensuring that businesses can rely on accurate, up-to-date information. With OLTP systems, users can perform frequent updates across multiple concurrent transactions while still maintaining strong consistency guarantees, ensuring that any read operation retrieves the most current data immediately after a write operation. This is essential for operational tasks like financial transactions, order management, and customer interactions, where data accuracy and timeliness are paramount.

One typical example of OLTP use is in retail environments, where real-time updates to inventory levels, sales transactions, and customer account management are critical. Each retail store connects to a central OLTP database, ensuring that stock levels and sales data are updated instantly as transactions occur. This setup is also used to manage customer loyalty programs, track payments, and process returns in real-time. OLTP also powers online banking, where customers perform transactions like fund transfers, bill payments, and account updates with instant feedback and secure processing.

OLTP databases underpin services such as vacation bookings, meal deliveries, and text messaging in consumer-facing applications. These services rely on OLTP’s ability to provide real-time availability checks, secure payment processing, and seamless user experiences. As a result, consumers benefit from quick and reliable services built on the foundation of OLTP technology.

#### Example: OpenMeter and Usage-Based Billing

A real-world example of OLTP in action comes from OpenMeter, a company specializing in real-time, usage-based billing solutions for AI and cloud companies. OpenMeter leverages Postgres to store and manage transactional data securely and efficiently, ensuring accurate and real-time tracking of customer usage. Read more [here](https://clickhouse.com/blog/openmeter-real-time-usage-based-billing-powered-by-clickhouse-cloud).

### OLAP systems

OLAP systems are crucial for analyzing large datasets and extracting valuable insights, empowering businesses to make informed, data-driven decisions. Unlike OLTP, which focuses on real-time transaction processing, OLAP systems excel at performing complex queries such as aggregations and joins, helping businesses across industries gain insights from historical trends, patterns, and performance metrics. Whether it's financial forecasting, market analysis, or customer behavior studies, OLAP systems provide the backbone for deep analytical tasks that inform long-term strategy and optimization.

Industries such as healthcare, manufacturing, and advertising leverage OLAP systems to drive decision-making processes. For example, in healthcare, OLAP enables providers to perform in-depth analyses of patient outcomes, uncovering insights from various dimensions like length of stay, diagnosis, or demographics. Manufacturing companies use OLAP for supply and demand forecasting, production optimization, and profitability analysis by segmenting data based on customer, product, or region. In advertising, OLAP tools help companies analyze customer engagement and behavior, improving campaign targeting and customer lifetime value through deep data segmentation.

#### Example: OpenMeter

OpenMeter[ provides a real-world example](https://clickhouse.com/blog/openmeter-real-time-usage-based-billing-powered-by-clickhouse-cloud) of how OLAP powers advanced analytics. Using Postgres for storing transactional data from their metering system, OpenMeter needed an OLAP system to handle the high-throughput requirements of analyzing millions of billable events per second.

<blockquote style="font-size:16px">"With the growing adoption of AI and usage-based pricing models, metering has become crucial for powering billing, cost, and revenue operations"<p style="font-weight:bold"><a href="https://clickhouse.com/blog/openmeter-real-time-usage-based-billing-powered-by-clickhouse-cloud">Peter Marton, CEO and Co-Founder of OpenMeter</a></p>
</blockquote>

By using the OLAP database ClickHouse, OpenMeter built a robust, scalable system that aggregates real-time data for usage-based billing.

<blockquote style="font-size:16px">"We developed a scalable, robust metering system capable of handling millions of billable events per second, built on top of ClickHouse Cloud"<p style="font-weight:bold"><a href="https://clickhouse.com/blog/openmeter-real-time-usage-based-billing-powered-by-clickhouse-cloud">Peter Marton, CEO and Co-Founder of OpenMeter</a></p>
</blockquote>

[ClickHouse allows OpenMeter](https://clickhouse.com/blog/openmeter-real-time-usage-based-billing-powered-by-clickhouse-cloud) to collect, cleanse, and analyze vast volumes of metering data in real-time, critical for businesses offering usage-based pricing models. With its OLAP capabilities, OpenMeter delivers actionable insights through customer-facing dashboards, enabling businesses to monitor real-time usage and costs effectively.

#### Example: LangChain

LangChain leverages OLAP in its platform LangSmith, which provides observability and evaluation for LLM (Large Language Model) applications. Initially relying on Postgres for application bootstrapping, LangChain switched to ClickHouse as its analytical database to manage high-throughput data ingestion and support low-latency queries. 

<blockquote style="font-size:16px">"Ultimately, it was clear that we needed to add another database to complement Postgres for our use case and to unlock real-time insights for our users"<p style="font-weight:bold"><a href="https://clickhouse.com/blog/langchain-why-we-choose-clickhouse-to-power-langchain">Ankush Gola, co-founder of LangChain</a></p>
</blockquote>

ClickHouse powers real-time analytics for LangSmith, allowing developers to track key metrics, evaluate changes in models, and visualize traces of LLM applications. This transition enabled LangChain to handle large volumes of logs and traces while delivering fast, interactive experiences for users, significantly improving the developer workflow.

#### Example: Instacart

Instacart uses OLAP to combat fraud on its platform through a real-time fraud detection system called Yoda. The system relies on ClickHouse to store and analyze vast amounts of real-time data generated from transactions and events. The Instacart team explained:

<blockquote style="font-size:16px">"ClickHouse is designed and optimized explicitly for analytical queries. This fits perfectly with the needs of applications where data is continuously analyzed for patterns that might indicate fraud"<p style="font-weight:bold"><a href="https://tech.instacart.com/real-time-fraud-detection-with-yoda-and-clickhouse-bd08e9dbe3f4">Read more here</a></p>
</blockquote>

## When to use OLAP and OLTP

Choosing between OLAP and OLTP depends on your business needs, particularly the type of data you’re handling, the operations you perform, and how you interact with the data. OLTP systems are ideal for real-time transaction processing, where immediate data updates and accuracy are critical. In contrast, OLAP systems excel in situations requiring complex queries, aggregating historical data, and generating insights for strategic decision-making.

In many cases, businesses benefit from using both systems in tandem. OLTP systems can capture day-to-day transactions and update data instantly, while OLAP systems can process this data for deeper analysis and reporting. The decision to use OLAP or OLTP - or both - should be guided by query complexity, required response times, and scalability considerations. 

Rarely is this a binary decision process where compromises have to be made. OLAP promises faster query performance on queries involving complex aggregations and joins and will often be preferred in cases where datasets are large (e.g., multi-TB). However, this requires the user to make several compromises. Use cases rarely are perfectly categorized but require users to decide based on the most important properties of their workload.

![when_to_use_olap_oltp](/images/engineering-resources/when_to_use_olap_oltp.png)

If you need to handle high volumes of **short, fast transactions**—such as sales orders, payments, or customer interactions—then OLTP will be the best fit. It ensures **immediate consistency** and up-to-date data for operational tasks. If you expect larger data volumes and you’re able to relax these requirements and accept **eventual consistency** semantics you likely move more towards an OLAP system. Additionally, if you have many small updates which must be updated transactionally and available within milliseconds the workload is a natural OLTP workload but can be achieved with OLAP if seconds can be tolerated.

For tasks that involve analyzing **large volumes of data** (i.e. > 1TB), such as generating reports, identifying trends, or conducting financial forecasting, OLAP systems provide the capabilities needed to handle complex, multidimensional queries. If, in addition, you need **fast responses for analytical queries**, particularly in scenarios involving real-time analytics or dashboards, modern real-time OLAP databases, like ClickHouse, are designed to provide low-latency performance even on large datasets. These also deliver the ability to handle high write throughput performance with the ability to make data available within seconds.

## OLTP to OLAP with Change Data Capture

In many modern business architectures, it is crucial to have both OLTP and OLAP systems working together seamlessly. OLTP systems serve as the authoritative source of operational data, where real-time transactions are processed, and data is constantly updated. However, analytical workloads, which involve complex queries on large datasets, are best handled by OLAP systems. 

![oltp_to_olap](/images/engineering-resources/oltp_to_olap.png)

As a result organizations increasingly look to deploy both systems as a "default data stack". However, this requires each system to have a consistent view of the data, with the OLTP providing the authoritative view with heavy analytical queries offloaded to the OLAP system. Bridging this gap requires the two systems to be kept in sync, with updates to the OLTP system being reflected in the OLAP system as soon as possible. This problem is addressed through a process known as Change Data Capture (CDC).

> Note that users used to OLTP systems often need to familiarize themselves with[ slightly different data modeling challenges](https://clickhouse.com/blog/postgres-to-clickhouse-data-modeling-tips) when adopting an OLAP system. OLAP vendors, such as ClickHouse, increasingly provide guides to assist[ with this process](https://clickhouse.com/docs/en/migrations/postgresql/dataset).

### What is Change Data Capture (CDC)?

Modern CDC solutions enable businesses to synchronize data between their OLTP and OLAP systems in near real-time, ensuring that analytical queries are based on the latest available data. These capture changes from the OLTP system, such as inserts, updates, and deletes, before efficiently sending these to the OLAP system. The objective here is to both minimize the latency of data delivery while avoiding the heavy burden of full data loads and high resource overhead on the source OLTP system. This continuous synchronization is crucial in ensuring that decision-makers and analytical systems have access to the freshest data without adding excessive load to the OLTP system.

![oltp_olap_query_time](/images/engineering-resources/oltp_olap_query_time.png)

Traditional data capture methods, such as batch processing, move large volumes of data from the OLTP system to the OLAP system at fixed intervals. However, this method introduces several challenges, including high latency, inefficient processing of unchanged data, and added load on the source system. These drawbacks make batch processing unsuitable for modern applications that demand real-time insights.

CDC addresses these limitations by monitoring and capturing only the changes made to the data in real-time. This event-driven approach ensures that only the modified data is transferred to the OLAP system, significantly reducing the amount of data processed and ensuring minimal latency. Additionally, CDC ensures that intermediate changes are recorded, meaning every state change is captured rather than just the final state, which is often missed in batch processing.

### Implementing CDC between OLTP and OLAP systems

There are several ways to implement CDC, depending on the specific requirements of the systems involved, the complexity of the data, and the use case.

#### Pull-based CDC

![pull_based_cdc](/images/engineering-resources/pull_based_cdc.png)

In a pull-based approach, the OLAP system periodically pulls changes from the OLTP system. This is often implemented using timestamps or monotonically increasing IDs, where the OLAP system queries for changes made since the last update. This approach is generally simpler but can introduce delays due to the periodic nature of the data fetching. It is suitable for workloads where near-real-time data is sufficient.

For example, a simple cron-scheduled PostgreSQL function might pull data periodically from an OLTP database and send it to ClickHouse, using timestamps to identify changes.

However, pull-based CDC can increase the load on the OLTP system, especially if queries for changes are frequent, and it requires direct access to the source database, which may not be ideal for production environments.

#### Push-Based CDC via real-time event streaming

![push_based_cdc](/images/engineering-resources/push_based_cdc.png)

In a push-based CDC approach, the OLTP system actively sends data changes to the OLAP system, often in real-time, as soon as they occur. This ensures that the OLAP system is almost always synchronized with the latest data from the OLTP system. To achieve reliable data delivery, this method typically involves event streaming platforms such as Apache Kafka.

In this model, every change made in the OLTP system (e.g., inserts, updates, deletes) is captured and pushed to the OLAP system through a message queue, ensuring minimal delay. The event stream is then consumed by the OLAP system, which processes these changes in near real-time.

This method offers high scalability and is well-suited for use cases that require near-instantaneous updates between OLTP and OLAP systems. Kafka, for example, ensures that messages (i.e., data changes) are delivered reliably, and if any issue occurs in the OLAP system, the message queue retains the data until it can be processed.

#### Real-time CDC for OLAP database systems

Real-time OLAP databases, such as ClickHouse, are specifically designed to handle high-throughput data ingestion, making them ideal for integrating with CDC pipelines. CDC enables a constant flow of updates from OLTP systems to OLAP systems, ensuring that analytical queries are performed on the most recent data available. However, while integrating CDC with Kafka offers reliable end-to-end delivery guarantees and buffering, it can introduce additional latency and architectural complexity, which may not be ideal for applications that demand near-instant data updates.

For scenarios requiring faster, more optimized delivery systems, [tools like PeerDB](https://www.peerdb.io/) offer a more streamlined approach for real-time data capture, particularly between PostgreSQL and ClickHouse. PeerDB focuses on minimizing latency by offering blazing-fast snapshots, reducing typical Postgres to ClickHouse transfer times from hours to minutes, without placing heavy loads on the source system. This is particularly critical in larger use cases where Postgres has TB datasets which need to be synced efficiently. By carefully managing query costs, schema evolution, and resynchronization, PeerDB ensures that the Change Data Capture process remains non-invasive to the critical OLTP database.

<blockquote style="font-size:16px">"We have already reduced our Postgres to ClickHouse snapshot times from 10+ hours down to 15 minutes with PeerDB. Combining ClickHouse’s powerful analytics natively with PeerDB’s real-time data capture capabilities will greatly simplify our data processing workflows"<p style="font-weight:bold"><a href="https://clickhouse.com/blog/clickhouse-acquires-peerdb-to-boost-real-time-analytics-with-postgres-cdc-integration">Javier Erro Garcia, Cloud Architecture Manager at Vueling Airlines
</a></p>
</blockquote>

In contrast to systems relying on Kafka for data streaming, PeerDB’s direct integration with ClickHouse allows for a more optimized data pipeline with significantly reduced latency. This is crucial for businesses that need real-time insights without the delays often introduced by traditional buffering systems.

By offering an efficient CDC integration, PeerDB and ClickHouse enable businesses to seamlessly blend OLTP’s transactional integrity with OLAP’s analytical power, ensuring that critical data flows quickly and efficiently from operational systems to analytical platforms. This integration allows organizations to make timely, data-driven decisions with minimal delays.
