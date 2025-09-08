import { Table } from './index'

export default {
  name: 'Scalability',
  description: `ClickHouse and Snowflake take fundamentally different approaches to scaling - one dynamic, one rigid. Snowflake’s model is based on static, pre-sized “warehouses” that must be manually configured and scaled. Scaling concurrency in Snowflake requires enabling multi-cluster warehouses, which adds complexity and further inflates costs.

ClickHouse Cloud, by contrast, is built to scale elastically. Resources scale up and down automatically based on actual demand within user-defined limits - vertically to handle heavier queries, or horizontally to accommodate high concurrency. This means better performance under load, simpler operations, and predictable pricing.`,
  rows: [
    {
      heading: 'Elastic scaling',
      subHeading: 'Up/down with load',
      clickhouse: {
        value: true,
        label: '**Auto-scales** vertically & horizontally'
      },
      snowflake: {
        value: false,
        label: 'Manual warehouse sizing (t-shirt sizes)'
      }
    },
    {
      heading: 'High query concurrency per node',
      clickhouse: {
        value: true,
        label: 'Up to **1,000 concurrent queries per node**'
      },
      snowflake: {
        value: false,
        label: 'Default 8 queries per warehouse'
      }
    },
    {
      heading: 'Auto-resume from idle',
      clickhouse: {
        value: true,
        label: '**Seconds**'
      },
      snowflake: {
        value: true,
        label: 'Seconds'
      }
    },
    {
      heading: 'Compute compute separation',
      clickhouse: {
        value: true,
        label: '**Separation of compute and storage**'
      },
      snowflake: {
        value: true,
        label: 'Separation of compute and storage'
      }
    },
    {
      heading: 'Vertical and horizontal scaling',
      clickhouse: {
        value: true,
        label: 'Includes **vertical scaling** for high-memory queries'
      },
      snowflake: {
        value: false,
        label: 'Horizontal only, nodes are fixed size'
      }
    },
    {
      heading: 'Custom hardware profiles',
      clickhouse: {
        value: true,
        label: '**Custom hardware profiles** supported'
      },
      snowflake: {
        value: false,
        label: 'Fixed sizes only'
      }
    },
    {
      heading: 'Manual resizing',
      clickhouse: {
        value: true,
        label: '**Manual resize** supported'
      },
      snowflake: {
        value: true,
        label: 'Manual resize supported'
      }
    },
    {
      heading: 'Distributed cache across warehouse',
      clickhouse: {
        value: true,
        label: '**Distributed cache** across nodes'
      },
      snowflake: {
        value: true,
        label: 'Distributed cache supported'
      }
    },
    {
      heading: 'Granular cache control',
      clickhouse: {
        value: true,
        label: '**Query-predicate-level controls** on cache'
      },
      snowflake: {
        value: false,
        label: 'Cache layer shared across warehouses'
      }
    }
  ]
} satisfies Table
