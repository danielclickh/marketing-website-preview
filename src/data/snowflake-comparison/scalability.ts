import { Table } from './index'

export default {
  name: 'Scalability',
  description: `Snowflake and ClickHouse take different approaches to scaling - one rigid, one dynamic. Snowflake relies on fixed-size “warehouses” that must be manually configured and resized. Handling concurrency requires multi-cluster warehouses, driving up costs.

ClickHouse Cloud, by contrast, scales elastically. Resources expand or contract automatically within user-defined limits - vertically for heavier queries and horizontally for high concurrency. The result is better performance under load, simpler operations, and more predictable pricing.`,
  rows: [
    {
      heading: 'Elastic scaling',
      subHeading: 'Up/down with load',
      clickhouse: {
        icon: 'yes',
        label: '**Auto-scales** vertically & horizontally'
      },
      snowflake: {
        icon: 'no',
        label: 'Manual warehouse sizing (t-shirt sizes)'
      }
    },
    {
      heading: 'High query concurrency per node',
      clickhouse: {
        icon: 'yes',
        label: 'Up to **1,000 concurrent queries per node**'
      },
      snowflake: {
        icon: 'no',
        label: 'Default 8 queries per warehouse'
      }
    },
    {
      heading: 'Compute compute separation',
      clickhouse: {
        icon: 'yes',
        label: '**Separation of compute and storage**'
      },
      snowflake: {
        icon: 'yes',
        label: 'Separation of compute and storage'
      }
    },
    {
      heading: 'Vertical and horizontal scaling',
      clickhouse: {
        icon: 'yes',
        label: 'Includes **vertical scaling** for high-memory queries'
      },
      snowflake: {
        icon: 'no',
        label: 'Horizontal only, nodes are fixed size'
      }
    },
    {
      heading: 'Custom hardware profiles',
      clickhouse: {
        icon: 'yes',
        label: '**Custom hardware profiles** supported'
      },
      snowflake: {
        icon: 'no',
        label: 'Fixed sizes only'
      }
    },
    {
      heading: 'Distributed cache across warehouse',
      clickhouse: {
        icon: 'yes',
        label: '**Distributed cache** across nodes'
      },
      snowflake: {
        icon: 'yes',
        label: 'Distributed cache supported'
      }
    },
    {
      heading: 'Granular cache control',
      clickhouse: {
        icon: 'yes',
        label: '**Query-predicate-level controls** on cache'
      },
      snowflake: {
        icon: 'no',
        label: 'Cache layer shared across warehouses'
      }
    },
    {
      heading: 'Distributes query execution across nodes',
      clickhouse: {
        icon: 'yes',
        label: 'Yes, via parallel replicas'
      },
      snowflake: {
        icon: 'no',
        label: 'Not supported'
      }
    }
  ]
} satisfies Table
