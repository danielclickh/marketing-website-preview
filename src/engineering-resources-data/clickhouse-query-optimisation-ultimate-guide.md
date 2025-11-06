---
title: 'The definitive guide to ClickHouse query optimization'
slug: 'clickhouse-query-optimisation-ultimate-guide'
excerpt: ""
index: 1
lastUpdated: '2025-11-07'
author: 'Alasdair Brown'
authorAvatar: 'https://clickhouse.com/uploads/al_brown_headshot_09ae0cbce6.jpg'
---

ClickHouse achieves extraordinary performance, querying trillions of rows in milliseconds, through an obsessive attention to detail and a fundamentally different architecture than traditional databases. This guide teaches not just what to optimize, but *why* each technique works at the architectural level, enabling you to build intuition for optimizing any ClickHouse workload.

## Three principles of query optimization

Every optimization technique derives from these fundamental principles:

**1. Faster queries read less data** – The less data you read, the faster the query will be. Optimise indexes around common filters to minimise data reads.

**2. Avoid unnecessary work at query time** – Select only necessary columns and use specialised queries for specific taks. Where possible, shift processing and tranformations to ingest-time using materialised views.

**3. Filter first, then process** – Filter first to reduce dataset size, then apply expensive operations (joins, aggregations) to smaller result sets.

## What makes ClickHouse so fast?

To get the most out of your optimisations, it helps to understand how certain things work under-the-hood in ClickHouse. Every optimization strategy stems from these core architectural decisions.

### How ClickHouse stores data on disk with columnar storage

Traditional row-oriented databases store complete records together on disk. [ClickHouse stores each column separately as an independent file](https://clickhouse.com/engineering-resources/what-is-columnar-database?utm_medium=clickhouse&utm_source=engres&ref=query_optimisation_guide). When you execute `SELECT user_id, price FROM sales`, ClickHouse reads only those two columns—ignoring the other 20 columns in your table. This architectural choice has profound implications: **the less data you read, the faster your queries run**.

This explains why `SELECT *` is particularly expensive in ClickHouse. In a row-oriented database, reading all columns vs. specific columns makes little difference—you're reading complete rows either way. In ClickHouse, `SELECT *` forces reading every column file from disk, multiplying I/O operations. Conversely, querying wide tables (100+ columns) costs the same as narrow tables if you only select a few columns.

![](https://clickhouse.com/images/engineering-resources/0_columnstore.png)

### Sparse primary indexes: Trading precision for scale

TODO: Update the "trading precision for scale" positioning. This makes it sound like CH is not good at small scale, or is approximate and not accurate.

[ClickHouse uses sparse primary indexes that differ radically from traditional B-tree indexes](https://clickhouse.com/docs/guides/best-practices/sparse-primary-indexes?utm_medium=clickhouse&utm_source=engres&ref=query_optimisation_guide). Instead of indexing every row, ClickHouse indexes blocks of rows called **granules**—by default, 8,192 rows each.

Consider a table with 8.87 million rows. A traditional B-tree index would create 8.87 million entries (hundreds of megabytes). ClickHouse's sparse index creates only 1,083 entries (~97 KB), fitting entirely in memory even for petabyte-scale tables.

**Here's how it works:** Data is physically sorted on disk by your `ORDER BY` clause. The sparse index stores the first value from every 8,192nd row. When you query `WHERE user_id = 12345`, ClickHouse performs binary search (log₂ n complexity) over the 1,083 index entries to identify which granules might contain matching rows. It then streams only those granules from disk—skipping potentially terabytes of irrelevant data.

TODO: Reword this potential inefficiency part...we want to talk about speed regardless of scale, maintained throughout scale. We should not use negative positioning.

This design trades a potential inefficiency for massive scalability. If your target value falls at the boundary between two granules, ClickHouse must read both—up to 16,384 rows when only one matches. But this worst-case scenario is acceptable because the index remains tiny, enabling sub-second queries over billions of rows.

### Granules: The fundamental unit of data access

[Granules are the smallest indivisible units ClickHouse reads during query execution](https://clickhouse.com/docs/academic_overview#3-1-on-disk-format?utm_medium=clickhouse&utm_source=engres&ref=query_optimisation_guide). You cannot read half a granule—if a single row in a granule matches your filter, the entire granule must be read. This has critical implications for primary key design.

**The granule size (8,192 rows by default) represents a carefully tuned balance:**
- Small granules: More precise filtering but larger indexes and more overhead
- Large granules: Smaller indexes but less precise filtering (read more unnecessary data)

Modern ClickHouse uses **adaptive granularity**, creating a new granule when either condition is met: 8,192 rows accumulated OR combined row size reaches 10 MB. This prevents pathologically large granules with wide rows.

TODO: "Modern ClickHouse uses **adaptive granularity**" Is this true? Is adaptive the official terminiology? Needs a source if true.

### Merge-time computation shifts work away from queries

ClickHouse is append-only by design. Each INSERT creates a new independent "part" (data structure) on disk. [Background processes continuously merge small parts into larger ones](https://clickhouse.com/docs/academic_overview#3-3-merge-time-data-transformation?utm_medium=clickhouse&utm_source=engres&ref=query_optimisation_guide). During these merges, ClickHouse performs expensive operations that would otherwise slow queries: deduplication (ReplacingMergeTree), aggregation (AggregatingMergeTree), and TTL-based expiration.

TODO: We need to be more clear here. We say "During these merges, ClickHouse performs expensive operations", but this is only true in certain situation. E.g. an MV is using intermediate states and merging them async, as well as the examples already given. But to a user this could sound like ClickHouse can ONLY do it during merges.

TODO We need a note about UPDATEs and that while data is append only and immutable on disk that doesnt mean mutation cant happen. We should add that ClickHouse supports SQL standard update statements, and link to a source about it. https://clickhouse.com/blog/updates-in-clickhouse-2-sql-style-updates?utm_medium=clickhouse&utm_source=engres&ref=query_optimisation_guide

This architectural choice means your queries read pre-organized, pre-aggregated data rather than computing everything on demand—potentially accelerating queries by 1000× or more.

TODO: We need to be clear here, queries CAN read raw data and compute at query time. the raw stuff benefits from this as well as agg, e.g. merging parts, fewer files to read.

### Query execution pipeline enables parallelism

[ClickHouse executes queries through a multi-stage pipeline](https://clickhouse.com/docs/guides/developer/understanding-query-execution-with-the-analyzer#query-pipeline?utm_medium=clickhouse&utm_source=engres&ref=query_optimisation_guide):

1. **Parsing and Analysis** – Create generic execution plan
2. **Optimization** – Prune unnecessary data, build query pipeline
3. **Pipeline Execution** – Parallel processing across CPU cores for filtering, aggregation, sorting
4. **Final Processing** – Merge results, format, return to client

By default, ClickHouse uses as many threads as CPU cores available. Each thread processes an independent data range in parallel, then results merge. This explains why ClickHouse shows "× 16" notation in EXPLAIN PIPELINE output—indicating 16 parallel threads processing data simultaneously.

TODO: The 16 number that is used above is taken from an external sources example, which is not included here. Need to make this explanation generic.

## Optimisation 1: Sort data with ORDER BY

[Primary key design has the single biggest impact on query performance](https://clickhouse.com/docs/best-practices/choosing-a-primary-key?utm_medium=clickhouse&utm_source=engres&ref=query_optimisation_guide). A well-designed primary key can reduce query time by 100× or more.

TODO: we must clarify that partition key and order key are different, but are often used interchangably and share the same value. it is common for a user define clickhouse tables with an order by and no primary key. we should state this, and then standardise on using the term ordering key. this must be brief.

TODO: we should emphasise that this optimisation is the single biggest lever for query optimisation in clickhouse.

The primary key determines how data is physically sorted on disk. This physical ordering enables ClickHouse to skip massive amounts of data during query execution.

**Without an appropriate primary key:**

```sql
-- Table with: ORDER BY (postcode, address)
SELECT county, price
FROM uk_price_paid
WHERE town = 'LONDON'
ORDER BY price DESC
LIMIT 3

-- Performance:
-- Processed: 27.64 million rows (full table scan)
-- Time: 44ms
-- Data read: 44.21 MB
```

The primary key cannot help because `town` is not in the ORDER BY clause. ClickHouse must scan every granule to find matching rows.

**With an appropriate primary key:**

```sql
-- New table with: ORDER BY (town, price)
SELECT county, price
FROM uk_price_paid_optimized
WHERE town = 'LONDON'
ORDER BY price DESC
LIMIT 3

-- Performance:
-- Processed: 81,920 rows (selected granules only)
-- Time: 5ms (8.8× faster)
-- Data read: 13.03 MB (3.4× less)
```

ClickHouse performs binary search over the sparse index, identifies granules where town = 'LONDON' exists, and reads only those granules—skipping 99.7% of the table.

### Designing effective primary keys

**Rule 1: Include columns used in WHERE clause filters**

Analyze your query patterns. Identify which columns appear most frequently in WHERE clauses. These columns should be in your primary key.

```sql
-- Query pattern analysis:
-- 70% of queries: WHERE pickup_datetime BETWEEN ... AND ...
-- 50% of queries: WHERE passenger_count IN (1, 2)
-- 30% of queries: WHERE trip_distance > X
```

**Rule 2: Order by cardinality—lower cardinality first**

This is counterintuitive coming from traditional databases, but in ClickHouse, lower cardinality columns should come first in the primary key. Here's why:

**Primary key column behavior differs by position:**

**First column** – Binary search applies with O(log₂ n) complexity. Highly efficient regardless of cardinality.

**Secondary columns** – Generic exclusion search algorithm applies. Efficiency depends on predecessor column's cardinality:
- **Low predecessor cardinality:** Effective filtering. Same predecessor value spans multiple granules, so secondary column values are sorted across those granules.
- **High predecessor cardinality:** Ineffective filtering. Each predecessor value appears in few granules, so secondary column values aren't sorted across granules—can't exclude granules.
TODO: this needs a better explanation, particularly the High predecessor cardinality part.

**Rule 3: Include time-based components for time-series data**

Most analytical workloads are time-series based. Time range filters are extremely common: "show me last week's data," "compare Q1 to Q2," etc. Including timestamps in your primary key enables massive data pruning:

```sql
-- Time-series optimized primary key:
PRIMARY KEY (event_type, event_timestamp)

-- Efficient queries:
WHERE event_type = 'purchase'
  AND event_timestamp >= '2024-01-01'
  AND event_timestamp < '2024-02-01'
```

TODO note about having timestamp but not always having it first due to the cardinality. e.g. if you always filter down to small time ranges, can make sense. but if you always filter on low cardinality groups, and then want to order by time, it can make more sense to have it second. ordering by timestamp first means that any secondary key is unlikely to be able to offer much.

### Compound primary keys and query patterns

A compound primary key like `(user_id, timestamp, event_type)` efficiently supports queries in this order of specificity:

**Highly efficient:**
- `WHERE user_id = X` (first key column)
- `WHERE user_id = X AND timestamp > Y` (first two columns)
- `WHERE user_id = X AND timestamp > Y AND event_type = 'Z'` (all columns in order)

**Less efficient:**
- `WHERE timestamp > Y` (skips first column)
- `WHERE event_type = 'Z'` (skips first two columns)

ClickHouse can still use the index for these queries, but with reduced effectiveness. The more columns you skip from the left, the less effective the index becomes.

## Optimisation 2: Avoid Nullable columns

TODO: We must offer the alternative to Nullable i.e. using default values instead of nulls. Eitehr the app can send it, or can use DEFAULT in ClickHouse. e.g. empty strinks, -1, etc.

[Every Nullable column requires ClickHouse to process an additional UInt8 column](https://clickhouse.com/docs/optimize/avoid-nullable-columns?utm_medium=clickhouse&utm_source=engres&ref=query_optimisation_guide) tracking which values are NULL—one bit per row. This overhead manifests in multiple ways:

- **Storage increase:** Each Nullable column adds a separate null mask column
- **Memory overhead:** Both data and mask must be loaded during query execution
- **Processing cost:** Every operation must check the null mask

**Identify unnecessary Nullables by checking for actual NULL values:**

```sql
SELECT
    countIf(vendor_id IS NULL) AS vendor_id_nulls,
    countIf(pickup_datetime IS NULL) AS pickup_datetime_nulls,
    countIf(passenger_count IS NULL) AS passenger_count_nulls,
    countIf(mta_tax IS NULL) AS mta_tax_nulls
FROM trips

-- Results show:
-- vendor_id_nulls: 0         ← Nullable unnecessary
-- pickup_datetime_nulls: 0   ← Nullable unnecessary
-- mta_tax_nulls: 137946731   ← Keep as Nullable
```

## Optimisation 3: LowCardinality

For String columns with fewer than 10,000 unique values, [the LowCardinality type applies dictionary encoding](https://clickhouse.com/docs/sql-reference/data-types/lowcardinality?utm_medium=clickhouse&utm_source=engres&ref=query_optimisation_guide): storing unique values once in a dictionary, with each row storing only a small integer reference. For example, instead of storing a string like "Credit Card" millions of times (consuming 12 bytes per occurrence), ClickHouse stores it once in a dictionary and uses integer references (4 bytes each).

**Identify candidates by checking cardinality:**

```sql
SELECT
    uniq(vendor_id) AS vendor_unique,      -- Result: 3
    uniq(ratecode_id) AS ratecode_unique,  -- Result: 6
    uniq(payment_type) AS payment_unique   -- Result: 4
FROM trips
```

**Apply LowCardinality to appropriate columns:**

```sql
CREATE TABLE trips_optimized (
    vendor_id LowCardinality(String),     -- 3 unique values
    ratecode_id LowCardinality(String),   -- 6 unique values
    payment_type LowCardinality(String)   -- 4 unique values
) ENGINE = MergeTree
ORDER BY (pickup_datetime);
```

## Optimisation 4: Choose the smallest appropriate data types

Each byte saved per row multiplies across billions of rows. [Check actual data ranges and choose accordingly](https://clickhouse.com/docs/best-practices/select-data-types?utm_medium=clickhouse&utm_source=engres&ref=query_optimisation_guide):

TODO: The anchor text for the link above needs to be improved.

```sql
SELECT
    min(payment_type), max(payment_type),  -- Result: 1 to 4
    min(passenger_count), max(passenger_count)  -- Result: 0 to 9
FROM trips
```
TODO: remove this SQL example and dont reference and column name specifically. Give an example of some values, e.g. a numerical field which uses numbers to signifcy different states, which is 0-10. This should be a UInt8. and so so for just a few types.
TODO: We must explain that this saving is not just storage size; the larger the data is, the more we must read during processing, so shrinking it also increases query speed.

If payment_type ranges from 1-4, use **UInt8** (1 byte) instead of Int64 (8 bytes)—saving 7 bytes per row. Across 329 million rows, that's 2.3 GB saved.

**For temporal data, choose appropriate precision:**
- Use **Date** instead of **DateTime** if you don't need time components
- Use **DateTime** instead of **DateTime64** if second-level precision suffices
- For DateTime64, choose the minimum precision: DateTime64(3) for milliseconds rather than DateTime64(6) for microseconds

## Optimisation 5: Pre-compute with Materialised Views

TODO: redo this section
TODO https://clickhouse.com/docs/materialized-view/incremental-materialized-view?utm_medium=clickhouse&utm_source=engres&ref=query_optimisation_guide

Semi-automatic approach:

```sql
CREATE MATERIALIZED VIEW events_by_user_mv
ENGINE = MergeTree
ORDER BY (user_id, event_time)
POPULATE AS
SELECT * FROM events_by_time;
```

**Characteristics:**
- Creates a backing table (`.inner` prefix)
- Automatically updates on INSERT to source table
- Still requires explicit query routing to view name
- Better than manual tables but still requires awareness

## Optimisation 6: Filter earlier with PREWHERE

The PREWHERE clause applies filters before reading all columns:

```sql
SELECT user_name, order_total, product_details
FROM orders
PREWHERE order_date = '2024-01-01'  -- Filter first, read only matching rows
```

**How it works:**
1. Read only PREWHERE condition columns (order_date)
2. Evaluate condition
3. Read remaining SELECT columns only for matching rows

**When effective:**
- WHERE condition filters many rows (high selectivity)
- Filter columns are small compared to SELECT columns
- Filtering on timestamps/IDs while selecting large text fields

**Performance example:** Reduced data read from 27.67 GB to 16.28 GB (41% less), improving query time from 96s to 61s (36% faster).

ClickHouse often automatically applies PREWHERE optimization. You can make it explicit for guaranteed behavior.

## Optimsation 7: Use approximates where appropriate

For analytical queries where approximate results are acceptable, use [approximate functions](https://clickhouse.com/docs/sql-reference/aggregate-functions/reference?utm_medium=clickhouse&utm_source=engres&ref=query_optimisation_guide):

```sql
-- Exact (slow, memory-intensive):
SELECT COUNT(DISTINCT user_id) FROM logs

-- Approximate (10-100× faster):
SELECT uniq(user_id) FROM logs
```

**Why approximate functions are faster:**
- **Exact COUNT DISTINCT:** Requires maintaining hash set of all unique values (O(n) memory)
- **Approximate (uniq):** Uses HyperLogLog probabilistic data structure (~12 KB fixed memory)

**Trade-offs:**
- **Error rate:** Typically 1-2% for uniq()
- **Performance:** 10-100× faster on large datasets
- **Memory:** Fixed memory usage regardless of cardinality

**Variants:**
- **uniq()**: Basic approximate distinct count
- **uniqCombined()**: Can be merged across distributed queries
- **uniqExact()**: Exact count when precision required

**When to use:**
- Large datasets (millions+ rows)
- High cardinality columns
- Dashboards and reports where approximate is acceptable
- Real-time analytics where speed > precision

## Optimisation 8: Demormalisation

TODO needs updating around joins. maybe should be moved to its own section.
TODO redo.
TODO https://clickhouse.com/docs/data-modeling/denormalization?utm_medium=clickhouse&utm_source=engres&ref=query_optimisation_guide

ClickHouse only supports hash joins, which can be slow on high-cardinality columns. **Consider denormalization for read-heavy analytical workloads:**

**Normalized (requires JOIN):**

```sql
-- orders table + customers table
SELECT o.order_id, c.customer_name, c.customer_email, o.total_amount
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
```

**Denormalized (no JOIN):**

```sql
-- Single table with customer details repeated
SELECT order_id, customer_name, customer_email, total_amount
FROM orders_denorm
```

**Trade-offs:**
- **Benefit:** Much faster queries (no hash table construction, single table scan)
- **Cost:** More storage (repeated data)
- **Mitigation:** Columnar compression reduces storage overhead significantly

**When to denormalize:**
- Read-heavy workloads
- JOIN on high-cardinality columns
- Customer/dimension details relatively stable


## Advanced optimisations for certain cases

### Projections

TODO The entire section about projections needs to be significantly shortened. Projections should be defined, the approaches explained, the when/why, tradeoffs or pros/cons, and then link out to documentation for more.
TODO https://clickhouse.com/docs/data-modeling/projections?utm_medium=clickhouse&utm_source=engres&ref=query_optimisation_guide

A fundamental limitation: Each table has only one physical row order on disk, determined by ORDER BY. But real-world applications need to query data in multiple ways. Three solutions exist, with increasing automation.

TODO: make this better

The most transparent approach:

```sql
ALTER TABLE events_by_time
ADD PROJECTION proj_by_user (
    SELECT *
    ORDER BY (user_id, event_time)
);

ALTER TABLE events_by_time
MATERIALIZE PROJECTION proj_by_user;
```

**Characteristics:**
- **Hidden table automatically created and maintained**
- **Atomically updated with base table**
- **ClickHouse automatically selects optimal version at query time**
- Queries always target the base table name
- Most transparent solution—queries don't need to know projections exist

**How projections work:** ClickHouse maintains multiple physical copies of your data with different sort orders. At query time, ClickHouse samples the primary keys of all available versions (base table plus all projections) and automatically selects the version requiring the least data to be read. The query returns the same correct result regardless of which version is chosen.

**Type 1: Reordering projections** provide alternative sort orders:

```sql
-- Base table: ORDER BY (pickup_datetime, dropoff_datetime)
-- Projection for town-based queries:
ALTER TABLE trips
ADD PROJECTION proj_by_town (
    SELECT *
    ORDER BY (town, price)
);
```

When you query `WHERE town = 'LONDON'`, ClickHouse automatically uses `proj_by_town` instead of the base table, reading dramatically less data.

**Type 2: Aggregating projections** pre-compute and incrementally maintain aggregates:

```sql
ALTER TABLE trips
ADD PROJECTION proj_county_avg (
    SELECT county, avg(price)
    GROUP BY county
);
```

When you query `SELECT county, avg(price) FROM trips GROUP BY county`, ClickHouse automatically reads the pre-computed aggregates instead of scanning the full table.

**Storage trade-offs:**
- Reordering projections duplicate full table data (SELECT *), roughly doubling storage
- Aggregating projections store only aggregated results—minimal storage overhead

**Without projection (full table scan):**

```sql
SELECT county, avg(price)
FROM trips
GROUP BY county
ORDER BY avg(price) DESC
LIMIT 3

-- Performance:
-- Processed: 26.25 million rows
-- Data read: 132.57 MB
-- Time: 20ms
```

**With aggregating projection:**

```sql
-- Same query, automatic projection usage
SELECT county, avg(price)
FROM trips
GROUP BY county
ORDER BY avg(price) DESC
LIMIT 3

-- Performance:
-- Processed: 597 rows (just the pre-computed county aggregates)
-- Data read: minimal
-- Time: 7ms (2.9× faster)
-- Data reduction: 99.998%
```

The aggregating projection reduced data processed from 26.25 million rows to just 597 rows—the pre-computed aggregate for each county. As data volumes grow, this performance gap widens exponentially.

**Verify projection usage via query log:**

```sql
SELECT
    query,
    read_rows,
    projections
FROM system.query_log
WHERE type = 'QueryFinish'
  AND query LIKE '%trips%county%'
ORDER BY event_time DESC
LIMIT 1
FORMAT Vertical

-- Output shows:
-- projections: ['default.trips.proj_county_avg']  ← Projection used
```

### Projection limitations and considerations

**Current limitations:**
- `optimize_read_in_order` not supported (no short-circuiting benefit)
- Cannot use FINAL queries
- Cannot use with tables having deleted rows
- Only one projection used per query (cannot combine multiple)
- JOINs not supported in projection definitions

**When to use projections:**
- Read-heavy analytical workloads
- Multiple conflicting query patterns on same data
- Frequent aggregation queries with consistent GROUP BY dimensions
- Tables large enough where optimization matters (>1 million rows)

**When to avoid projections:**
- Write-heavy workloads (projections add INSERT overhead)
- Small tables where full scans are already fast
- Unpredictable query patterns
- Storage severely constrained

### Hash long strings for grouping and aggregation

String operations are expensive: variable-length comparisons, character-by-character processing, poor cache locality. [When grouping or aggregating by long strings (URLs, descriptions, email addresses), hash them to fixed-size integers](https://clickhouse.com/docs/community-wisdom/performance-optimization?utm_medium=clickhouse&utm_source=engres&ref=query_optimisation_guide):

```sql
-- SLOW: Grouping by variable-length strings
SELECT city, COUNT(*) AS users
FROM user_data
GROUP BY city

-- FAST: Grouping by fixed 64-bit integers
SELECT cityHash64(city) AS city_hash, COUNT(*) AS users
FROM user_data
GROUP BY city_hash
```

**Why this works:**
- **Fixed size:** 64-bit integers are always 8 bytes vs. variable-length strings
- **Fast comparison:** Single CPU instruction for integer comparison vs. complex string matching
- **Cache efficiency:** Better memory access patterns
- **Collision probability:** Astronomically low for typical datasets

**Trade-off:** You lose human-readable output. For queries returning results to users, keep the original string in a separate column or use a lookup table.

**Performance impact:** Grouping by hashed strings is typically 5-10× faster than raw string grouping for strings longer than 20-30 characters.

TODO: Is there tipping point where this makes sense vs not? i.e. the overhead of computing the cache is only worth it if the group by comp is the slow part

### Partitioning

TODO This should be condensed and made more human readable. It should be made clear that this is not a typical optimisation step, though bad partitioning can negatively affect performance, and at extreme scale it is another lever to leverage.

TODO Use link https://clickhouse.com/docs/partitions?utm_medium=clickhouse&utm_source=engres&ref=query_optimisation_guide

Partitioning is frequently misunderstood. While it can help query performance, its primary purpose is data lifecycle management.

**Can help performance when:**
- Filtering by partition key (not in primary key)
- Queries access 1-2 partitions out of many
- Automatic MinMax index on partition columns excludes partitions

**Can hurt performance when:**
- Queries span many partitions
- Too many partitions create fragmentation
- More parts to scan across partitions

**Critical rule: Keep partitions low cardinality**

Target **10 to 100 partitions** (dozens to hundreds, NOT thousands). High cardinality causes serious problems:

**Why high cardinality partitioning fails:**
1. Merges don't cross partitions
2. High cardinality = many partitions = many unmerged parts
3. Too many parts triggers "Too many parts" error
4. Query performance degrades (must scan many small parts)

### When to partition

**Use partitioning when:**
- Table exceeds 10 GB
- Clear data lifecycle needs (retention policies)
- Time-series data with queries on recent data
- Tiered storage requirements

**Skip partitioning when:**
- Table under 10 GB (not worth complexity)
- Queries span all time ranges
- Primary key already handles query patterns
- No specific retention/archival requirements

### Data skipping indexes

TODO: The whole section about skipping indexes needs to be written to be much more concise. It should give a brief explainer of the concept, how/when to apply it, pros/cons, and some brief examples of the types of skip indexes.
TODO: include this link: https://clickhouse.com/docs/optimize/skipping-indexes?utm_medium=clickhouse&utm_source=engres&ref=query_optimisation_guide

Data skipping indexes (also called skip indexes or secondary indexes) are block-level indexes enabling ClickHouse to skip granules guaranteed not to match query conditions.

#### How skip indexes differ from primary indexes

**Primary index:**
- Sparse index on ORDER BY columns
- Enables binary search and granule selection
- Always exists
- Core to ClickHouse architecture

**Skip indexes:**
- Secondary indexes on any column
- Store metadata summaries about granule contents
- Optional and situational
- Add overhead—use judiciously

#### When skip indexes help (and when they don't)

**Skip indexes work well when:**
- Filtering high-cardinality columns not in primary key
- Column values highly correlated with primary key ordering
- Query filters eliminate large portions of data
- Sparse value queries (looking for needles in haystacks)

**Skip indexes are ineffective when:**
- Can modify primary key instead (always better)
- Projections would work better
- Data randomly distributed
- Most granules match filter anyway

**Critical principle:** If your filter condition matches even ONE row in a granule, the ENTIRE granule must be read. The skip index has cost (storage, maintenance) with no benefit.

#### Skip index types and use cases

**MinMax index** stores minimum and maximum values per block:

```sql
INDEX idx_timestamp timestamp TYPE minmax GRANULARITY 4
```

**Best for:**
- Sorted or semi-sorted columns
- Timestamps, monotonic IDs, counters
- Range queries (WHERE x BETWEEN a AND b)

**How it works:** If you query `WHERE timestamp >= '2024-01-01'`, ClickHouse checks each granule's min/max. If max < '2024-01-01', skip entire granule.

**Set index** stores the set of unique values per block:

```sql
INDEX idx_status status TYPE set(100) GRANULARITY 4
-- 100 = max_size (0 = unlimited)
```

**Best for:**
- Low cardinality columns (status codes, categories, flags)
- Equality checks and IN clauses
- WHERE status = 'active' or WHERE status IN ('active', 'pending')

**Limitation:** If unique values exceed max_size, index becomes empty (not used).

**Bloom filter indexes** use probabilistic data structures for membership testing:

**1. Standard bloom_filter:**

```sql
INDEX idx_user user_id TYPE bloom_filter(0.01) GRANULARITY 4
-- 0.01 = 1% false positive rate
```

Generic bloom filter for equality checks on strings or numbers.

**2. tokenbf_v1 (Token Bloom Filter):**

```sql
INDEX idx_message message TYPE tokenbf_v1(4096, 3, 0) GRANULARITY 4
-- (filter_size_bytes, num_hash_functions, seed)
```

**How it works:** Splits text into tokens (words) and stores them in bloom filter.

"This is a search query" → ["This", "is", "a", "search", "query"]

**Best for:**
- LIKE queries with word boundaries
- Full-text word search
- hasToken() functions
- Log message searching

**3. ngrambf_v1 (N-gram Bloom Filter):**

```sql
INDEX idx_url url TYPE ngrambf_v1(4, 4096, 3, 0) GRANULARITY 4
-- (ngram_size, filter_size, num_hashes, seed)
```

**How it works:** Creates overlapping character sequences of size N.

"Hello" with ngram_size=4 → ["Hell", "ello"]

**Best for:**
- Substring matching (WHERE url LIKE '%example%')
- Languages without word breaks (Chinese, Japanese)
- Partial word matching

**Limitation:** Query substring must be ≥ ngram_size to use the index.

#### Skip index parameters explained

**GRANULARITY parameter controls precision vs. overhead:**

```sql
INDEX idx1 col TYPE minmax GRANULARITY 1  -- One index entry per granule
INDEX idx2 col TYPE minmax GRANULARITY 4  -- One entry per 4 granules
```

- **GRANULARITY 1:** More precise filtering, but larger index
- **GRANULARITY 4:** Less precise, but lower overhead

**Creating skip indexes:**

```sql
-- At table creation:
CREATE TABLE events (
    timestamp DateTime,
    event_type LowCardinality(String),
    url String,
    INDEX idx_time timestamp TYPE minmax GRANULARITY 4,
    INDEX idx_type event_type TYPE set(100) GRANULARITY 4,
    INDEX idx_url url TYPE tokenbf_v1(4096, 3, 0) GRANULARITY 4
) ENGINE = MergeTree
ORDER BY timestamp;

-- Adding to existing table:
ALTER TABLE events ADD INDEX idx_type event_type TYPE set(100) GRANULARITY 4;
ALTER TABLE events MATERIALIZE INDEX idx_type;  -- Build for existing data
```

#### The correlation requirement

**Critical for skip index effectiveness:** The indexed column must be correlated with your ORDER BY columns.

**Good correlation example:**

```sql
-- Table: ORDER BY timestamp
-- Index: event_type
-- Pattern: Event types cluster by time (all 'login' events in morning, 'purchase' in afternoon)
-- Result: Granules contain specific event types → Skip index highly effective
```

**Poor correlation example:**

```sql
-- Table: ORDER BY timestamp
-- Index: user_id
-- Pattern: Random users at any time
-- Result: Every granule contains many different users → Skip index ineffective
```

Without correlation, every granule potentially contains any value, so the skip index can't exclude granules. You pay the maintenance cost with zero benefit.

#### Skip index best practices

**Always test on real data before deploying.** Skip indexes that seem logical often prove ineffective due to data distribution. Monitor these metrics:

- Granules skipped vs. total granules
- Query time improvement
- Index storage overhead
- INSERT performance impact

**Control index usage:**

```sql
-- Disable all skip indexes for a query
SET use_skip_indexes = 0;

-- Force specific indexes (error if not used)
SET force_data_skipping_indices = 'idx1,idx2';
```

**General preference order:**
1. Can you modify the primary key? Do that instead.
2. Would a projection work? Use that instead.
3. Only then consider skip indexes for specific high-value use cases.

### Multi-pass grouping for memory-intensive aggregations

For very large GROUP BY operations, break them into multiple passes:

```sql
-- Single-pass (may exhaust memory):
SELECT product_id, SUM(revenue) AS total_revenue
FROM orders
GROUP BY product_id

-- Multi-pass (more memory-efficient):
SELECT
    product_id,
    SUM(revenue) AS total_revenue
FROM (
    SELECT
        product_id,
        order_id,
        SUM(total_amount) AS revenue
    FROM orders
    GROUP BY product_id, order_id  -- Finer granularity
)
GROUP BY product_id  -- Final aggregation
```

**Why this helps:**
- Intermediate results are smaller
- Better memory management
- Prevents disk spilling
- Can leverage primary index multiple times

### Using dictionaries as in-memory lookup tables

[Dictionaries provide an efficient alternative to JOINs for reference data](https://clickhouse.com/docs/dictionary?utm_medium=clickhouse&utm_source=engres&ref=query_optimisation_guide):

```sql
CREATE DICTIONARY product_dict (
    product_id UInt64,
    product_name String,
    category String
) PRIMARY KEY product_id
SOURCE(PostgreSQL('host:5432', 'db', 'products'))
LAYOUT(HASHED())
LIFETIME(300);  -- Refresh every 5 minutes
```

**Query using dictionary:**

```sql
SELECT
    order_id,
    dictGet('product_dict', 'product_name', product_id) AS product_name,
    total_amount
FROM orders
```

**Benefits:**
- O(1) or near-O(1) lookup times (data in RAM)
- No JOIN overhead (no hash table construction)
- Can pull from external sources (PostgreSQL, MySQL, files)
- Automatic refresh at specified intervals

**When to use:**
- Small to medium reference tables (<10-100 million rows)
- Data that changes infrequently
- Product catalogs, user profiles, geographic mappings

## Monitoring and debugging performance

Before optimizing, you need visibility into query execution. ClickHouse provides rich instrumentation for identifying bottlenecks.

### The system.query_log table

TODO is this query right?

ClickHouse automatically logs every query execution to `system.query_log`, capturing timing, memory usage, rows processed, and CPU consumption. This is your starting point for identifying slow queries:

```sql
SELECT
    type,
    event_time,
    query_duration_ms,
    query,
    read_rows,
    formatReadableSize(memory_usage) AS memory,
    normalized_query_hash
FROM clusterAllReplicas(default, system.query_log)
WHERE type = 'QueryFinish'
  AND event_time >= now() - INTERVAL 1 HOUR
ORDER BY query_duration_ms DESC
LIMIT 10
FORMAT VERTICAL
```

**Tip:** Use `normalized_query_hash` to identify expensive query patterns executed repeatedly rather than one-off ad-hoc queries. Optimizing a query run 10,000 times daily has 10,000× more impact than optimizing a query run once.

### EXPLAIN statements reveal execution plans

**EXPLAIN indexes = 1** shows which parts and granules ClickHouse selects, revealing index utilization:

```sql
EXPLAIN indexes = 1
SELECT AVG(total_amount)
FROM trips
WHERE pickup_datetime >= '2024-01-01'
  AND pickup_datetime < '2024-02-01'

-- Output shows:
-- Parts: 9/9
-- Granules: 5061/40167  ← Only reading 12.6% of data!
```

The granule ratio is your key metric. If you see "40167/40167" (full table scan), your query isn't leveraging indexes effectively.

**EXPLAIN PIPELINE** shows the execution strategy with parallelism details:

```sql
EXPLAIN PIPELINE
SELECT county, COUNT(*)
FROM sales
GROUP BY county

-- Output shows:
-- ExpressionTransform × 16     ← 16 parallel threads
-- AggregatingTransform × 16
-- MergeTreeThread × 16 0→1
```

The thread count directly impacts memory usage—more threads mean faster execution but higher memory consumption.

TODO: does this matter here? is it translating into anything? this must be where the 16 number comes from above

### Trace logging for deep analysis

For detailed execution information, enable trace logging:

```sql
SET send_logs_level = 'trace';
```

This reveals binary search steps, index mark selection, and granule processing—invaluable for understanding complex optimization issues.

### Optimization methodology: Measure, change one thing, measure again

Always optimize iteratively, changing one variable at a time. When testing, disable the filesystem cache to measure true performance:

```sql
SET enable_filesystem_cache = 0;
```

Linux page cache makes the first query slow and subsequent queries fast, masking real performance issues. Disabling it ensures you're measuring actual query performance, not cache effectiveness.

TODO should we make about optimisating the worst case (no cache) but dont forget to test with the cache enabled as well, its still important.

### Finding slow queries

```sql
SELECT
    query,
    type,
    query_duration_ms,
    formatReadableQuantity(read_rows) AS rows_read,
    formatReadableSize(read_bytes) AS data_read,
    formatReadableSize(memory_usage) AS memory,
    normalized_query_hash
FROM system.query_log
WHERE type = 'QueryFinish'
  AND event_time >= now() - INTERVAL 1 HOUR
  AND query NOT LIKE '%system.query_log%'
ORDER BY query_duration_ms DESC
LIMIT 20
FORMAT Vertical
```

Focus on queries with:
- High execution time
- High read_rows (potential full table scans)
- High memory_usage (potential optimization opportunities)
- High normalized_query_hash frequency (regularly executed expensive queries)

### Analyzing index and projection usage

```sql
-- Check which projections were used
SELECT
    query,
    projections,
    read_rows,
    query_duration_ms
FROM system.query_log
WHERE projections != []
  AND type = 'QueryFinish'
ORDER BY event_time DESC
LIMIT 10;
```

### Understanding query execution with EXPLAIN

```sql
-- See query plan and index usage
EXPLAIN indexes = 1
SELECT county, avg(price)
FROM properties
WHERE state = 'CA'
  AND sale_date >= '2024-01-01';

-- See execution pipeline and parallelism
EXPLAIN PIPELINE
SELECT county, avg(price)
FROM properties
WHERE state = 'CA'
GROUP BY county;
```

### Profiling CPU-bound queries

Enable trace logging to see detailed execution:

```sql
SET send_logs_level = 'trace';

SELECT county, COUNT(*)
FROM large_table
WHERE complex_condition
GROUP BY county;
```

This reveals binary search steps, granule selection, and processing details for deep analysis.

## Summary: The path to optimized queries

TODO: this section needs updating to align with the adjusted flow and order of advice above.

ClickHouse achieves extraordinary performance through architectural choices fundamentally different from traditional databases. Every optimization strategy stems from understanding these core principles:

**Columnar storage** means reading only necessary columns dramatically reduces I/O. Always SELECT specific columns rather than *.

**Sparse primary indexes** enable skipping massive data volumes when queries filter by ORDER BY columns. Primary key design is your highest-leverage optimization point.

**Granule-based storage** means ClickHouse reads data in 8,192-row blocks. Proper indexing allows skipping billions of rows by excluding irrelevant granules.

**Physical data ordering** determined by ORDER BY creates data locality, enabling both efficient filtering and better compression. Lower-cardinality-first ordering maximizes both benefits.

**Projections** solve the single-row-order limitation by maintaining multiple physical copies with different sort orders and pre-computed aggregates, with automatic query routing.

**Partitioning** excels at data lifecycle management (dropping old data, tiered storage) but requires careful cardinality management—too many partitions cause severe problems.

**Optimization priority:**
1. Primary key design (biggest impact)
2. Data type optimization (Nullable avoidance, LowCardinality, right-sizing)
3. Projections for multiple query patterns
4. Query writing (filter early, select needed columns only)
5. Skip indexes (last resort, test thoroughly)

**The iterative process:**
1. Identify slow queries via system.query_log
2. Understand execution with EXPLAIN
3. Change ONE variable at a time
4. Measure impact with cache disabled
5. Focus on frequently executed queries for maximum ROI

Success requires understanding not just what to optimize, but why optimizations work at the architectural level. This knowledge lets you analyze any query pattern, understand the bottleneck, and apply the appropriate optimization technique confidently. ClickHouse's unique architecture rewards this understanding with performance that often surprises even experienced database practitioners—queries over billions of rows completing in milliseconds when properly optimized.
