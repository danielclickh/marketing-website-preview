---
title: 'Top 10 OpenTelemetry Compatible Platforms for 2025'
slug: 'top-opentelemetry-compatible-platforms'
excerpt: 'Explore the top 10 OpenTelemetry compatible platforms for 2025. Learn how to choose the right backend based on performance, cost at scale, and analytics.'
index: 2
lastUpdated: '2025-11-06'
author: 'Aditya Somani'
authorAvatar: 'https://clickhouse.com/uploads/Image_512x512_224e102422.png'
---

[OpenTelemetry](https://clickhouse.com/engineering-resources/opentelemetry-otel) has decisively won the instrumentation wars, establishing itself as the undisputed open standard for collecting telemetry data. This victory has liberated developers from vendor-locked agents, only to create a new, more pressing challenge: the backend. The sheer volume of logs, metrics, and traces flowing from modern architectures is overwhelming legacy platforms. Teams now face soaring costs, performance bottlenecks, and a painful ["data tax"](https://engineering.uipath.com/scaling-observability-with-opentelemetry-adx-how-we-improve-the-monitoring-with-cost-reduced-42100a99b89a) imposed by ingest-based pricing, forcing them to drop the very data they need for comprehensive observability.

This guide cuts through the noise. We will go beyond a simple list of compatible tools to provide a framework for evaluating an OpenTelemetry backend on what truly matters at scale: performance on high-cardinality data, query speed, cost-efficiency, and a unified architecture. Our goal is to equip you to choose a backend that can analyze all your full-fidelity data without the prohibitive costs and performance trade-offs that undermine modern observability.

## TL;DR

* **The bottleneck problem:** Simple "OpenTelemetry compatibility" is not enough. The key challenge is finding a data engine that can handle massive, high-cardinality telemetry data and perform rapid aggregations over it without crippling performance or your budget.  
* **Evaluate on architecture, not just features:** Judge platforms on four critical factors: performance on high-cardinality data, real-time query speed (standard languages like SQL vs. proprietary DSLs), cost-efficiency (driven by high compression and object storage, enabling infinite retention at low cost), and a unified architecture that avoids data silos.  
* **Legacy platforms have trade-offs:** Many popular platforms force a compromise. Enterprise SaaS vendors like Datadog and Splunk can be prohibitively expensive due to ingest-based pricing. Open source observability platforms like the Grafana stack often use a siloed architecture that makes correlating data difficult.  
* **Columnar databases are architecturally superior:** An open-source columnar database like [**ClickHouse**](https://clickhouse.com) is fundamentally better suited for observability workloads. It is purpose-built to handle high-cardinality data, offers industry-leading data compression to slash costs, and delivers sub-second query performance using standard SQL.  
* **The modern solution is [ClickStack](https://clickhouse.com/use-cases/observability):** For organizations hitting the limits of their current tools, **ClickStack** is the definitive open-source solution for **OpenTelemetry at scale**. It combines a high-performance ClickHouse engine with an OTel-native architecture and a modern UI (HyperDX) to provide a unified, cost-effective platform designed for petabyte-scale workloads.

## **How to choose an OpenTelemetry compatible platform: 4 key considerations**

Here are the four critical factors that separate a merely compatible backend from a truly high-performance one.

### 1. Performance over high-cardinality data

High-cardinality data refers to fields with a large number of unique values. In modern observability, this is the norm, not the exception. Think of identifiers like trace_id, user_id, commit_sha, or container_id. In a distributed microservices environment, the combination of these dimensions can lead to a combinatorial explosion of unique time series.

[Traditional time-series databases](https://clickhouse.com/engineering-resources/what-is-time-series-database) (TSDBs), like Prometheus, struggle with this. While highly optimized for retrieving individual time series, their data models falter when performing aggregations across many high-cardinality dimensions. Each unique combination of labels creates a new time series, leading to a massive increase in memory usage, indexing strain, and slow performance for the broad, exploratory queries needed for root cause analysis.

In contrast, modern columnar databases solve this problem architecturally. The real challenge isn't just storing high-cardinality data, but performing rapid **aggregations** over it across wide time periods: a critical workflow for trend analysis and root cause investigation. By storing data in columns, engines like ClickHouse can scan and aggregate only the necessary high-cardinality fields (user_id, trace_id) without performance degradation, delivering sub-second query times even across petabytes of data. This is a fundamental advantage for debugging complex, system-wide issues.

### 2. Query speed and analytics capability (Standard Languages vs. DSLs)

Storing observability data is useless if you can't ask complex questions and get answers in seconds, especially during a high-pressure incident. The speed and flexibility of your query language are paramount. Many observability vendors have developed proprietary, domain-specific languages (DSLs) for querying. While often powerful for specific tasks, these DSLs create vendor lock-in and require engineers to learn a new, non-transferable skill.

SQL, on the other hand, is the universal language of data analysis. A backend that supports full, standard SQL empowers teams to move beyond canned dashboards and perform deep, exploratory analysis. It allows engineers to join observability data with business or security data, run complex aggregations, and connect to a vast ecosystem of BI and data science tools. This unlocks a practice of "observability science," where the goal is not just to monitor known problems but to uncover "unknown unknowns" by freely exploring the data. The choice between a proprietary DSL and standard SQL is a choice between a limited view and boundless analytical capability.

### 3. Data compression and cost-efficiency at scale

OpenTelemetry can produce petabytes of data, and without an efficient storage engine, costs can quickly spiral out of control. This forces engineering teams into a difficult position: either pay exorbitant storage bills or resort to aggressive sampling and data-dropping, creating critical visibility gaps.

The key to resolving this dilemma lies in the backend's architecture, specifically its ability to decouple storage from compute and leverage low-cost **object storage** (like Amazon S3 or Google Cloud Storage). This is a critical advantage. Legacy platforms often tie expensive compute resources to storage, forcing you to pay a premium for every gigabyte you retain.

In contrast, modern columnar databases like ClickHouse combine two powerful cost-saving mechanisms. First, they achieve [exceptional compression ratios](https://clickhouse.com/blog/optimize-clickhouse-codecs-compression-schema), often 10x or greater, through specialized codecs. Second, they have native support for object storage. This combination fundamentally changes the economic equation of observability. It allows you to store 100% of your telemetry data with virtually **infinite retention**, without retention policies becoming a major component of your overall cost. You no longer have to worry about dropping valuable historical data for trend analysis or compliance. This architectural shift makes it economically feasible to ingest all your telemetry data without breaking the budget.

### 4. Unified architecture vs. siloed systems

The observability market is largely split between two architectural models: unified and siloed. A siloed approach uses separate, specialized backends for different data types, for example, one system for metrics (Mimir), another for logs (Loki), and a third for traces (Tempo). While each component may be best-in-class, this separation creates significant challenges because it forces engineers into a rigid workflow (metrics→traces→logs). Correlating a spike in a metric with the specific logs and traces that caused it becomes a manual, cumbersome process that slows down incident response. This fragmentation is a major source of friction for on-call engineers.

[A unified architecture](https://clickhouse.com/docs/academic_overview), by contrast, uses a single, high-performance datastore for logs, metrics, and traces. This approach eliminates data silos and makes correlation seamless and instantaneous. When all telemetry data resides in one place, you can pivot from a metric to related traces and logs within the same query and context. This not only accelerates troubleshooting but also provides a more holistic understanding of system behavior. By breaking down the barriers between data types, a unified backend enables teams to see the complete picture and resolve issues faster.

## Comparison of the top 10 OpenTelemetry compatible platforms

With the critical evaluation criteria established, we can now analyze the most popular OpenTelemetry monitoring platforms. The following platforms represent the leading solutions in the OpenTelemetry ecosystem. We have summarized their architectural approach and primary strengths based on the four factors outlined previously.

| Platform | Performance on high-cardinality data | Query speed and analytics capability | Cost-Efficiency Model | Architecture (unified vs. siloed) | Best for |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **ClickStack** | **Excellent** (Core architectural strength) | **Excellent** (Sub-second queries with universal SQL) | **Excellent** (High compression, object storage, enabling near-infinite retention) | **Unified** | **Teams adopting OpenTelemetry at scale; SREs needing full-fidelity, exploratory analysis without ingest-based pricing.** |
| Datadog | Good (at a cost) | Good but proprietary (Custom DSL limits deep analysis) | Ingest-based Pricing (Can be prohibitively expensive) | Unified | Enterprise teams valuing a vast integration library where budget is secondary. |
| New Relic | Good | Good but proprietary (NRQL is powerful but creates lock-in) | Medium | Unified | Organizations seeking to consolidate tools with powerful, AI-driven analytics. |
| Splunk Observability | Good | Good but proprietary (SPL is powerful but complex and costly) | Ingest-based Pricing (Can be prohibitively expensive) | Unified | Enterprises already invested in the Splunk ecosystem for security and log analytics. |
| Grafana Cloud | Poor (Known scaling issues in backends) | Limited (Domain-specific DSLs, difficult cross-signal analysis) | Medium (Requires significant management to be efficient) | Siloed by data type | Teams who prioritize best-in-class, customizable visualization in an open-source stack. |
| Elastic Observability | Poor (at scale for analytics) | Fast for search, slow for analytics (Not a columnar database) | Poor (Resource-intensive with low compression) | Unified | Organizations with log analysis workloads that are heavily reliant on full-text search. |
| Lightstep | Excellent | Specialized & proprietary (Powerful for tracing, but not general purpose) | Medium | Unified | Teams focused on service reliability and deep trace analysis in microservices. |
| Jaeger | N/A (Traces only) | Visualization, not a query engine | High (Open-source, self-managed storage) | Siloed (Traces only) | Organizations wanting a best-of-breed, open-source tracing solution. |
| Honeycomb | Excellent | Excellent for debugging, but proprietary (Unique workflow, not universal) | Medium (Event-based pricing can become costly) | Unified | Teams prioritizing deep, exploratory debugging over traditional dashboarding. |
| Prometheus + OTel | Poor (Time-series data model causes "label explosion") | Excellent for metrics, but limited (PromQL is metric-specific) | High (Open-source, but scaling adds operational cost) | Siloed (Metrics only) | Teams with deep expertise focused on metrics in a Kubernetes environment. |

## A deep dive into the top observability platforms

Here is a detailed breakdown of each platform, analyzing its strengths and architectural trade-offs.

### [Datadog](https://www.datadoghq.com/)

* **Description:** A mature, enterprise-grade, all-in-one observability platform known for its extensive integrations and ease of use. It provides a unified solution for monitoring infrastructure, applications, and logs.  
* **Capabilities:** Offers a single platform for logs, metrics, and traces; features over 750 vendor-backed integrations; and provides strong Application Performance Monitoring (APM) and infrastructure monitoring tools.  
* **Architectural considerations & drawbacks:** The platform's primary drawback is its complex pricing model, which can become prohibitively expensive at scale. While it supports OpenTelemetry, some of its advanced features are still optimized for its proprietary agent. While Datadog has introduced limited SQL support for log queries, the primary interface remains a proprietary DSL, which restricts the kind of deep, cross-domain analysis possible with a standard SQL backend. For context, solutions built on analytical databases like [ClickHouse can be up to 42x cheaper](https://clickhouse.com/blog/cost-predictable-logging-with-clickhouse-vs-datadog-elastic-stack) for logging at scale, shifting the focus from budget limitations to data completeness.  
* **Key takeaway:** An excellent turnkey solution for teams where budget is not the primary concern and who value a vast, out-of-the-box integration library.

### [New Relic](https://newrelic.com)

* **Description:** A unified observability platform that has deeply integrated OpenTelemetry and offers a powerful query language and AI-assisted troubleshooting.  
* **Capabilities:** Features unified data correlation across logs, metrics, and traces; its powerful query language (NRQL) is fully compatible with OpenTelemetry data attributes; and it includes AI-assisted anomaly detection to speed up troubleshooting.  
* **Architectural considerations & drawbacks:** The proprietary New Relic Query Language (NRQL), while powerful, presents a learning curve compared to standard SQL. This can slow down adoption for teams accustomed to the universality of SQL for data analysis and limits analysis to the vendor's UI, whereas platforms built on standard SQL can plug into a vast ecosystem of data science and BI tools.  
* **Key takeaway:** A strong contender for organizations seeking to consolidate multiple tools into a single platform with powerful, AI-driven analytics.

### [Dynatrace](https://www.dynatrace.com/)

* **Description:** An observability platform heavily focused on automatic discovery and AI-driven root cause analysis through its proprietary "Davis AI" engine. It excels in highly complex, dynamic cloud environments.  
* **Capabilities:** Provides automated root cause analysis to reduce manual investigation time; features automatic service discovery and topology mapping for a real-time view of application architecture; and includes enterprise-grade security features.  
* **Architectural considerations & drawbacks:** Dynatrace typically carries a higher price point than many competitors. Like other enterprise platforms, some of its most advanced features work best with its proprietary "OneAgent." The reliance on a 'black box' AI for analysis, while powerful, can also limit the ability of engineers to perform deep, exploratory queries to find 'unknown unknowns' that fall outside the AI's pre-defined models.  
* **Key takeaway:** Best suited for large organizations with complex environments that require a high degree of automated analysis and are less price-sensitive.

### [Splunk Observability Cloud](https://www.splunk.com/en_us/products/observability-cloud.html)

* **Description:** This platform leverages Splunk's renowned big data and security expertise to provide a powerful observability solution, now enhanced with AppDynamics' business-centric APM capabilities.  
* **Capabilities:** Features the powerful Search Processing Language (SPL) for deep data investigation; offers strong correlation between security and business metrics; and includes advanced machine learning features for anomaly detection and forecasting.  
* **Architectural considerations & drawbacks:** Splunk's pricing model is notoriously complex and ingest-based, which can lead to unpredictable and escalating costs. This pricing model acts as a data tax, often forcing teams to sample or drop valuable data. In contrast, modern solutions with resource-based pricing and high compression, like ClickStack, enable teams to 'send everything' for a fraction of the cost, as [proven](https://clickhouse.com/blog/how-anthropic-is-using-clickhouse-to-scale-observability-for-ai-era) by customers like Anthropic who use ClickHouse for massive-scale logging.  
* **Key takeaway:** A top choice for enterprises already invested in the Splunk ecosystem, especially those needing to merge security (SIEM) and observability data.

### [Grafana Cloud](https://grafana.com/products/cloud/)

* **Description:** An observability platform built around a philosophy of open standards and composability, using separate, specialized backends for traces (Tempo), metrics (Mimir), and logs (Loki).  
* **Capabilities:** Offers industry-leading visualization and dashboarding capabilities; its open-source core aligns perfectly with the OpenTelemetry philosophy; and it is supported by an extensive plugin ecosystem.  
* **Architectural considerations & drawbacks:** The architecture is intentionally siloed, requiring three separate data stores. This separation means that correlating a spike in a metric with the specific logs and traces that caused it is not seamless. This is a common reason why organizations at petabyte-scale migrate to unified backends, with a common goal to "unify all of our observability data in a single database".  
* **Key takeaway:** An excellent choice for teams that prioritize best-in-class, customizable visualization and are committed to an open-source, multi-backend approach.

### [Elastic Observability](https://www.elastic.co/observability)

* **Description:** Leverages the popular Elasticsearch engine to provide observability with powerful full-text search capabilities, making it a natural choice for log-heavy analysis.  
* **Capabilities:** Excels at text-search-heavy workloads and complex filtering; offers flexible deployment options (cloud or self-hosted); and integrates seamlessly with the broader Elastic Stack.  
* **Architectural considerations & drawbacks:** The platform is built on Lucene, a search index, not a columnar analytics database. While excellent for text search, this architecture becomes a liability for the aggregation-heavy queries common in modern observability. Its reliance on inverted indices for all data leads to significant storage overhead, and its architecture can require lengthy and disruptive data rebalancing if a node fails. Also, analytical queries in Elasticsearch often lead to high JVM memory pressure and slow performance at scale. For workloads that are less about text-search and more about fast analytics, modern columnar databases have a distinct advantage. For example, the global transportation company [Didi saw a 4x query speed improvement and a 30% cost reduction](https://clickhouse.com/blog/didi-migrates-from-elasticsearch-to-clickHouse-for-a-new-generation-log-storage-system) after migrating its logging platform from Elasticsearch to ClickHouse.  
* **Key takeaway:** Ideal for organizations already using the ELK stack that have log analysis workloads with a heavy emphasis on text search and filtering.

### [Lightstep](https://docs.lightstep.com/)

* **Description:** Created by founders of the OpenTelemetry project (now part of ServiceNow), Lightstep offers specialized capabilities for understanding complex system behavior and performance regressions.  
* **Capabilities:** Provides advanced correlation between metrics and traces; its "Change Intelligence" feature automatically identifies the root causes of performance regressions; and it offers deep, intuitive trace analysis.  
* **Architectural considerations & drawbacks:** Lightstep is more specialized, with a primary focus on tracing and APM, rather than being a general-purpose observability platform. While its trace analysis is excellent, true observability requires correlating traces with massive volumes of logs. Specialized tools can struggle here, unlike unified platforms built on analytical engines that can join billions of trace spans with petabytes of log data in seconds.  
* **Key takeaway:** A strong choice for organizations focused primarily on service reliability and deep trace analysis to diagnose performance issues in microservices architectures.

### [Jaeger](https://www.jaegertracing.io/)

* **Description:** A mature, open-source, CNCF-graduated project focused specifically on distributed tracing. It is a foundational tool in the cloud-native observability landscape.  
* **Capabilities:** Purpose-built for tracing with clean visualizations; offers multiple storage backend options, including Elasticsearch and Cassandra; and has an active community with no risk of vendor lock-in.  
* **Architectural considerations & drawbacks:** Jaeger is not a full observability platform; it [only handles tracing](https://www.jaegertracing.io/docs/1.37/architecture/). It requires significant manual setup and integration with other tools for metrics and logs. In contrast, unified solutions provide a production-ready platform out-of-the-box for traces, logs, and metrics, as [demonstrated by Shopee](https://clickhouse.com/blog/seeing-the-big-picture-shopees-journey-to-distributed-tracing-with-clickhouse), who analyzes over 30 billion trace rows in seconds.  
* **Key takeaway:** The best choice for organizations that want a best-of-breed, self-hosted, open-source solution specifically for distributed tracing and are willing to integrate it with other systems.

### [Honeycomb](https://www.honeycomb.io/)

* **Description:** An observability platform designed from the ground up for high-cardinality, high-dimensionality data, with a strong focus on deep, exploratory debugging rather than traditional dashboarding.  
* **Capabilities:** Features the unique "BubbleUp" tool for automatically identifying outlier patterns; its query builder is optimized for intuitive debugging workflows; and it provides strong support for SLOs.  
* **Architectural considerations & drawbacks:** Its event-based pricing model can become costly, and its unique debugging concepts can present a learning curve. While Honeycomb excels at high cardinality, this capability is not unique; open-source databases like ClickHouse were also purpose-built for this challenge, offering similar performance with the added flexibility of standard SQL.  
* **Key takeaway:** Ideal for teams with complex distributed systems who prioritize deep, exploratory analysis and debugging over traditional dashboarding.

### [Prometheus + OpenTelemetry](https://opentelemetry.io/blog/2024/prom-and-otel/)

* **Description:** A highly popular, fully open-source stack that combines OpenTelemetry for broad data collection and Prometheus for best-in-class metric storage and querying.  
* **Capabilities:** Its query language, PromQL, is a powerful and expressive standard for metric analysis; it offers excellent Kubernetes-native monitoring capabilities; and it has zero licensing costs.  
* **Architectural considerations & drawbacks:** Prometheus's time-series data model struggles with [high-cardinality data](https://clickhouse.com/blog/how-tesla-built-quadrillion-scale-observability-platform-on-clickhouse), leading to memory pressure. The common workaround is pre-aggregation using recording rules, which destroys data fidelity and severely limits exploratory analysis. It provides no native support for logs or traces, forcing teams to bolt on and manually correlate data from other systems, and it requires significant operational expertise to scale, often needing additional components like Thanos or Cortex. This is a problem that columnar databases solve by design. Tesla, for instance, [uses ClickHouse](https://clickhouse.com/blog/how-tesla-built-quadrillion-scale-observability-platform-on-clickhouse) as a direct replacement for a standard Prometheus backend to handle high-cardinality metrics at massive scale.  
* **Key takeaway:** A powerful, cost-effective choice for organizations with deep technical expertise focused primarily on metrics within a Kubernetes environment.

## The powerhouse backend: unlocking true scale with ClickHouse

Having established the architectural challenges facing modern observability backends: cost, query speed, and the sheer complexity of high-cardinality data; we can now examine the engine that was purpose-built to solve them. ClickHouse is not just another platform, but a fundamentally different and superior engine for observability. It is an open-source, columnar database built for real-time analytics on massive datasets, representing a step-change in performance, cost-efficiency, and analytical capability.

Instead of simply listing its features, let's look at how its core architecture solves real-world problems.

#### From cardinality explosion to quadrillion-scale metrics at Tesla

High-cardinality data is the Achilles' heel of many observability systems. ClickHouse’s [columnar storage architecture](https://clickhouse.com/docs/academic_overview) fundamentally solves this problem. A prime example is Tesla, which [built its internal observability platform on ClickHouse](https://clickhouse.com/blog/how-tesla-built-quadrillion-scale-observability-platform-on-clickhouse) to handle tens of billions of unique time series, overcoming the scaling limitations of traditional TSDBs. By storing data in columns, it can efficiently process and aggregate high-cardinality dimensions without performance penalties.

#### Unmatched cost-efficiency at scale

The sheer volume of OpenTelemetry data can make storage costs prohibitive. ClickHouse's industry-leading compression is a game-changer, often achieving ratios exceeding 15x. This is further enhanced by its native support for object storage. This allows teams to adopt a strategy of **infinite retention**, storing full-fidelity data for compliance, historical analysis, and model training without retention becoming a significant cost driver. This is what allows teams to store ["14 TiB of logs for < $300 a month."](https://clickhouse.com/blog/cost-predictable-logging-with-clickhouse-vs-datadog-elastic-stack) This efficiency transforms the economic model of observability, making it affordable to store 100% of your data instead of resorting to sampling.

#### Blazing-fast aggregations and query speed

During an incident, query speed is what truly matters. ClickHouse’s vectorized query execution engine delivers sub-second latencies on analytical queries, even across petabytes. The Character.ai engineering team famously [described](https://clickhouse.com/blog/breaking-free-from-rising-observability-costs-with-open-cost-efficient-architectures) query performance as being "...as fast as I could blink," a critical capability when every second counts. This speed unlocks the ability to move from static dashboards to interactive, exploratory analysis.

#### The power of universal SQL

While many platforms offer proprietary DSLs, they create vendor lock-in. ClickHouse uses standard SQL, the most universal and powerful language for data analysis. This immediately makes observability data accessible to a broader range of engineers and data scientists and enables a practice of "observability science," where teams can connect telemetry data to a vast ecosystem of BI tools for deeper investigations. OpenAI leverages this by integrating AI models that can speak SQL directly with their observability stack, creating powerful, automated features.

### Introducing ClickStack: the ClickHouse observability solution

ClickStack is an end-to-end observability platform engineered specifically for **OpenTelemetry at scale**, making the petabyte-level performance of ClickHouse accessible to every organization. It is a production-grade, open-source platform that combines:

* **OpenTelemetry Collector:** For standardized, vendor-neutral data collection.  
* **ClickHouse:** The high-performance engine for storage and real-time analytics.  
* **HyperDX:** A powerful, intuitive UI purpose-built for debugging. Critically for SREs and developers, HyperDX provides a Lucene-style query syntax and natural language search, abstracting the complexity of SQL and enabling the entire team to perform exploratory, search-based debugging.

ClickStack packages the unparalleled performance of ClickHouse into a solution that provides a "Datadog-like experience" [out-of-the-box](https://clickhouse.com/videos/loghouse). For organizations constrained by the cost and performance limitations of their current tools, ClickStack offers a compelling path forward.

## Conclusion: your backend is what matters

Choosing an OpenTelemetry backend is a critical architectural decision that will define the ceiling of your observability practice. The focus must shift from surface-level features to the fundamental architecture of the data engine powering your platform: its ability to handle high-cardinality data at scale, its query speed under pressure, and its cost-efficiency.

This is where ClickHouse distinguishes itself. As an open-source, columnar database, it was engineered specifically for real-time analytics on massive datasets, delivering exceptional data compression and blazing-fast queries. Its architectural design makes it uniquely suited for the demands of modern telemetry, providing robust performance where other systems falter.

For teams that need a production-ready solution without the overhead of building a custom platform, ClickStack offers an end-to-end, OTel-native observability solution built on the power of ClickHouse. It provides a premier user experience on a superior analytical engine, at a fraction of the cost of legacy platforms.

Don't let your backend become a bottleneck for your OpenTelemetry strategy. A truly effective observability practice allows you to retain 100% of your telemetry data and ask any question of it at scale, getting answers in seconds. Ready to see the performance difference? Try ClickStack on [ClickHouse Cloud](https://clickhouse.com/cloud) and experience sub-second queries on your own telemetry data.