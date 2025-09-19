---
title: 'Telemetry data explained'
slug: 'telemetry-data'
excerpt: "In this guide, we'll explore telemetry data - the vital information that helps us understand, monitor, and improve our software systems through the collection of metrics, logs, and traces."
index: 13
lastUpdated: '2025-04-11'
---

Most applications today aren't just programs running on one machine - they're distributed across multiple services, cloud providers, and regions worldwide. When something goes wrong (and it will), figuring out what happened can feel like searching for a needle in a haystack.

This is where telemetry data becomes essential. Think of it like a patient's vital signs in a hospital - heart rate, blood pressure, temperature, and oxygen levels tell doctors about their health. Without these measurements, doctors would have to guess what's wrong. The same applies to software systems - without good telemetry data, you just guess what's happening inside.

Whether running a small web app or managing a sprawling microservices architecture, you must know what's happening inside your systems. This guide will walk you through telemetry data, why you need it, what types exist, and how to collect it. We'll also examine how it fits into the bigger picture of keeping your systems healthy and observable.

## What is telemetry data?

Telemetry data refers to the information generated and collected about how systems operate. This data is essential for optimizing performance, troubleshooting issues, and maintaining system health. Much like how a car's dashboard provides vital information about speed, fuel levels, and engine health, telemetry data gives organizations visibility into their software systems' behavior and performance.

Modern applications, especially those built using microservices or cloud infrastructure, generate vast amounts of telemetry data across their various components. This data comes from multiple sources: application code, infrastructure components, network devices, and third-party services.

By collecting and analyzing this information, organizations can gain deep insights into their systems' behavior, performance patterns, and potential issues.

## Why collect telemetry data?

Telemetry data is crucial in understanding and maintaining healthy operations. By collecting this data, organizations gain valuable insights that help them operate more efficiently and quickly respond to issues. Rather than waiting for problems to surface through user complaints or system failures, telemetry data enables teams to proactively monitor, maintain, and improve their systems.

### Operational Visibility

Telemetry data provides a clear window into how your systems are behaving in real time. Rather than operating in the dark, teams can see exactly what's happening across their services, from individual request patterns to overall system health. This visibility becomes especially valuable in complex, distributed systems where multiple services deliver functionality.

### Problem Detection and Resolution

When issues arise, telemetry data becomes invaluable for troubleshooting. Teams can trace requests across different services to identify bottlenecks, examine logs for specific error patterns, and analyze metrics to understand performance degradation. This data-driven approach significantly reduces the time needed to identify and resolve problems, minimizing service disruptions.

### Deployment Monitoring

New deployments always carry some risk of introducing issues. Telemetry data helps teams quickly identify whether a deployment has caused unexpected behavior by comparing performance metrics, error rates, and request patterns before and after the change. This early warning system allows teams to respond rapidly to issues, potentially rolling back problematic deployments before significantly impacting users.

### Capacity Planning and Scaling

By monitoring trends in service usage and performance metrics, teams can identify demand and resource utilization patterns. This information enables proactive decision-making about infrastructure needs, helping organizations scale efficiently while maintaining performance and managing costs effectively.

### Anomaly Detection

Telemetry data helps identify unusual patterns or behaviors that might indicate problems. Comprehensive telemetry data makes it easier to spot and investigate anomalies before they become critical, whether it's an unexpected spike in error rates, unusual traffic patterns, or performance degradation.

### Compliance and Auditing

Telemetry data, particularly logs, is vital in meeting regulatory requirements and security standards. It provides an audit trail of system access, data modifications, and security events that many industries require for compliance. This historical record becomes crucial during security investigations, compliance audits, or when proving adherence to service level agreements (SLAs).

### Business Intelligence

Beyond technical operations, telemetry data can provide valuable insights into business operations and user behavior. Organizations can make data-driven decisions about product development, resource allocation, and business strategy by analyzing patterns in user interactions, feature usage, and transaction flows. This connection between technical metrics and business outcomes helps bridge the gap between IT operations and business objectives. These capabilities transform telemetry data from simple system measurements into a powerful tool for maintaining reliable, efficient, and cost-effective software systems.

## Types of telemetry data

Organizations need to collect and analyze different types of telemetry data to achieve these benefits, each serving distinct but complementary purposes. There are three main types of telemetry data: metrics, traces, and logs.

### Metrics

Metrics are numerical measurements that provide ongoing insights into system performance and health. They are typically collected at regular intervals and are designed to be aggregated over time. Unlike logs or traces, metrics focus on quantitative values that can be tracked and compared.

Common metrics you might collect include resource utilization (CPU, memory, disk usage), request rates and throughput, error rates and counts, response times and latency, queue lengths and processing times, and business metrics like active users or transaction values.

Let’s have a look at an example:

```json
{
  "timestamp": "2024-01-31T14:20:00Z",
  "metric_name": "api_response_time",
  "value": 247.5,
  "unit": "milliseconds",
  "service": "payment_api",
  "endpoint": "/process-payment",
  "tags": {
    "environment": "production",
    "region": "us-west-2"
  }
}
```

This metric captures API response time, a crucial performance indicator. What makes metrics unique is their numerical nature and suitability for statistical analysis. You can easily calculate averages, percentiles, and trends over time. The tags allow for dimensional analysis, enabling you to break down performance by environment, region, or other attributes.

### Traces

Traces document the journey of requests as they move through different parts of a system. Unlike metrics, which are point-in-time measurements, or logs, which are discrete events, traces show the relationships between various operations and their timing.

You'll commonly see traces for HTTP request flows, database query execution paths, message queue processing chains, authentication flows, API gateway requests, and service mesh communications.

It’s time for an example:

```json
{
  "trace_id": "abc123xyz789",
  "name": "checkout_process",
  "start_time": "2024-01-31T14:20:00.000Z",
  "duration": 1250,
  "spans": [
    {
      "span_id": "span1",
      "name": "validate_cart",
      "start_time": "2024-01-31T14:20:00.000Z",
      "duration": 50,
      "service": "cart_service"
    },
    {
      "span_id": "span2",
      "name": "process_payment",
      "start_time": "2024-01-31T14:20:00.050Z",
      "duration": 1000,
      "service": "payment_service"
    },
    {
      "span_id": "span3",
      "name": "send_confirmation",
      "start_time": "2024-01-31T14:20:01.050Z",
      "duration": 200,
      "service": "notification_service"
    }
  ]
}
```

This trace shows how a single checkout process moves through multiple services. The hierarchical nature of traces, with spans representing individual operations, makes them ideal for understanding service dependencies and identifying bottlenecks in distributed systems. The `trace_id` allows you to follow a single request across your entire system, something neither metrics nor logs can easily provide.

### Logs

[Logs](https://clickhouse.com/engineering-resources/log-monitoring) are detailed, timestamped records of specific events. Logs provide rich contextual information about discrete events unlike numerical metrics or traces showing request flows.

Systems typically generate logs for application errors and exceptions, security events like login attempts and access denials, system state changes, audit trails, debug information, configuration changes, and health check results.

An example of a structured log message is shown below:

```json
{
  "timestamp": "2024-01-31T14:20:00.123Z",
  "level": "ERROR",
  "service": "payment_service",
  "transaction_id": "tx_789456",
  "message": "Payment authorization failed",
  "error_code": "AUTH_FAILED_001",
  "details": {
    "user_id": "user_123",
    "payment_method": "credit_card",
    "amount": 99.99,
    "currency": "USD"
  },
  "stack_trace": "Error: Payment authorization failed\n    at PaymentProcessor.authorize (/src/payment.js:123)"
}
```

This log entry captures detailed information about a payment failure. What makes logs distinct is their ability to include rich, structured data about specific events. While traces might show that a payment failed and metrics might count the number of failures, logs provide detailed context about why the failure occurred. Including stack traces and detailed error information makes logs invaluable for debugging and audit purposes.

Together, these three types of telemetry data provide complementary views of system behavior:

- Metrics tell you about system performance and trends over time
- Traces show you how requests flow through your system
- Logs give you detailed information about specific events

Combined, they provide a comprehensive understanding of system behavior, enabling effective monitoring, troubleshooting, and optimization.

## Telemetry instrumentation and collection

There are three fundamental approaches to collecting this telemetry data, each offering different trade-offs between ease of implementation and depth of visibility.

### Manual instrumentation via APIs and SDKs

Manual instrumentation involves directly integrating telemetry collection into application code using language-specific libraries and SDKs. This approach gives developers complete control over what data is collected and when, allowing them to capture application-specific metrics, traces, and logs at precisely defined points in the code.

While manual instrumentation requires more development effort, it provides the highest level of customization and control. Developers can instrument precisely what they need, from business-specific metrics to detailed performance measurements. This makes it particularly valuable for capturing application-specific insights that wouldn't be visible through automated approaches.

The trade-off for this precision is the increased development and maintenance overhead. Each instrumentation point must be deliberately added and maintained as the application evolves. However, this additional effort is often worthwhile for organizations requiring detailed insights into specific business operations or custom workflows.

### Library-based instrumentation

Library-based instrumentation provides a middle ground by leveraging pre-built instrumentation for standard libraries and frameworks. This approach automatically captures telemetry from standard components within your application stack. It's particularly effective for monitoring everyday operations like web requests, database interactions, and message queue processing.  
This method significantly reduces manual effort while maintaining good visibility into application behavior. It works exceptionally well with modern frameworks and libraries that include instrumentation hooks. The main limitation is that it only captures telemetry from supported libraries and may miss application-specific logic.

### Automatic Instrumentation

Automatic instrumentation represents the most hands-off approach to telemetry collection. This method uses agents or runtime modifications to inject telemetry capabilities into applications without requiring code changes. It's particularly valuable for legacy applications, third-party code, or scenarios requiring rapid deployment of observability solutions.  
The primary advantage is the speed and ease of implementation, as it requires minimal development effort. However, this convenience comes at the cost of reduced flexibility and potential performance overhead. Automatic instrumentation might not capture all the specific details that manual instrumentation could provide.

### Selecting an instrumentation tool

Different observability tools support these approaches to varying degrees. [OpenTelemetry](https://clickhouse.com/engineering-resources/opentelemetry-otel) provides comprehensive support across all three approaches, making it a versatile choice for diverse environments. Vector excels at infrastructure-level collection without requiring code changes, while Fluent Bit specializes in efficient automatic log collection.

Organizations should consider their application architecture, available development resources, and specific observability requirements when selecting an approach. The development team's maturity, the application's criticality, and existing tooling also play crucial roles in this decision. Some organizations may benefit from combining multiple approaches, using automatic instrumentation for basic visibility while adding manual instrumentation for critical business operations.

➡️ Read more about telemetry instrumentation tools in [Building an Observability Solution with ClickHouse - Part 1 - Logs](https://clickhouse.com/blog/storing-log-data-in-clickhouse-fluent-bit-vector-open-telemetry#agents) and [Building an Observability Solution with ClickHouse - Part 2 - Traces](https://clickhouse.com/blog/storing-traces-and-spans-open-telemetry-in-clickhouse)

## Telemetry and Observability: The Bigger Picture

Telemetry data forms the foundation of observability in modern systems. While telemetry focuses on collecting data about system behavior, observability is the broader practice of understanding system state and behavior from this external data. You can think of telemetry as the sensor network that feeds into the larger observability system. Without comprehensive telemetry data collection, achieving meaningful observability would be impossible. The metrics, traces, and logs that comprise telemetry data provide the raw material that observability platforms and practices use to:

- Build comprehensive system views
- Create meaningful dashboards
- Enable sophisticated querying and analysis
- Support incident response and debugging
- Drive system improvements

However, collecting telemetry data is just the beginning. The real value comes from how this data is aggregated, analyzed, and acted upon within your observability strategy. Modern observability platforms combine telemetry data from multiple sources, apply advanced analytics, and provide tools for investigation and troubleshooting. This relationship between telemetry and observability highlights why careful consideration of telemetry collection is crucial - the quality and completeness of your telemetry data directly impact your ability to achieve effective observability of your systems.
