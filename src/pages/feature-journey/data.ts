export type EventCategory =
  | 'joins'
  | 'data-types-formats'
  | 'data-lifecycle'
  | 'indexes'
  | 'data-lakes'

export interface FeatureEvent {
  id: string
  year: number
  month: number
  title: string
  summary: string
  details: string
  category: EventCategory
  url?: string
}

export const FEATURE_EVENTS: FeatureEvent[] = [

  // ─── Joins ──────────────────────────────────────────────────────────────────

  {
    id: 'join-lazy-reading-25-12',
    year: 2025, month: 12,
    title: 'Faster Lazy Reading with Join-Style Execution Model',
    summary: 'Deferred data reads during join processing reduce unnecessary I/O and memory consumption for complex joins.',
    details: 'ClickHouse 25.12 introduced a lazy reading model aligned with join-style execution. By deferring certain data reads until they are actually needed during join processing, the engine reduces unnecessary I/O and memory consumption. This significantly improves performance for complex joins that would otherwise materialise more data than required.',
    category: 'joins',
    url: 'https://clickhouse.com/blog/clickhouse-release-25-12#faster-lazy-reading-with-join-style-execution-model'
  },
  {
    id: 'join-reordering-25-12',
    year: 2025, month: 12,
    title: 'Faster Joins with a More Powerful Join Reordering Algorithm',
    summary: 'A global join reordering algorithm evaluates entire join graphs to choose more efficient multi-table execution plans.',
    details: 'This release enhanced the optimiser with a more advanced global join reordering algorithm. It evaluates entire join graphs rather than making local decisions, allowing ClickHouse to choose more efficient execution plans that minimise intermediate result sizes and improve performance for multi-table joins.',
    category: 'joins',
    url: 'https://clickhouse.com/blog/clickhouse-release-25-12#faster-joins-with-a-more-powerful-join-reordering-algorithm'
  },
  {
    id: 'join-pushdown-25-10',
    year: 2025, month: 10,
    title: 'Push-Down of Complex Conditions in JOINs',
    summary: 'Complex OR conditions inside join predicates are now pushed down earlier, reducing rows participating in joins.',
    details: 'ClickHouse 25.10 added support for pushing down complex OR conditions inside join predicates. By applying filters earlier in the execution pipeline, the engine reduces the number of rows participating in joins, lowering memory usage and improving query speed for workloads with disjunctive join logic.',
    category: 'joins',
    url: 'https://clickhouse.com/blog/clickhouse-release-25-10#push-down-of-complex-conditions-in-joins'
  },
  {
    id: 'join-lazy-cols-25-10',
    year: 2025, month: 10,
    title: 'Lazy Columns Replication in JOINs',
    summary: 'Lazy columns replication avoids processing repeated join key values, reducing CPU and memory usage significantly.',
    details: 'This release included a set of join performance improvements, most notably lazy columns replication for JOIN queries. This optimisation reduces CPU and memory usage in joins that produce many duplicate values by avoiding unnecessary processing of repeated values in the join result. This reduces resource usage, which can significantly improve performance in workloads with repetitive join keys.',
    category: 'joins',
    url: 'https://clickhouse.com/blog/clickhouse-release-25-10#lazy-columns-replication-in-joins'
  },
  {
    id: 'join-bloom-filter-25-10',
    year: 2025, month: 10,
    title: 'Bloom Filters in Joins',
    summary: 'Runtime Bloom filter pre-filters on join keys eliminate non-matching rows before the actual join phase.',
    details: 'An important optimisation was added to the parallel hash join pipeline in the form of runtime Bloom filter pre-filters. At execution time, ClickHouse builds a Bloom filter on the join keys of the right-hand side table and applies that filter as an early pre-filter on the left-hand side table before the actual join phase. Rows unlikely to match are excluded early, reducing the number of rows that need to be read and processed. This significantly cuts down I/O and CPU work for join queries, particularly when one side of the join is highly selective.',
    category: 'joins',
    url: 'https://clickhouse.com/blog/clickhouse-release-25-10#bloom-filters-in-joins'
  },
  {
    id: 'join-global-reorder-25-9',
    year: 2025, month: 9,
    title: 'Automatic Global Join Reordering',
    summary: 'The optimiser now determines the best join order for queries with multiple joined tables, improving multi-table performance.',
    details: 'ClickHouse 25.9 introduced automatic global join reordering. This enhancement lets the optimiser determine the best join order for complex queries involving multiple joined tables, improving performance by choosing overall optimal build/probe table arrangements across the whole join graph. Previously, only local (two-table) join reordering was automatic; global join reordering is a powerful step toward faster multi-table joins.',
    category: 'joins',
    url: 'https://clickhouse.com/blog/clickhouse-release-25-09#join-reordering'
  },
  {
    id: 'join-hash-opt-25-7',
    year: 2025, month: 7,
    title: 'Optimisations for Hash Joins',
    summary: 'Low-level optimisations to the parallel hash join improve CPU utilisation and throughput across multiple cores.',
    details: 'ClickHouse 25.07 delivered low-level optimisations to the parallel hash join implementation. These changes improved CPU utilisation and throughput, making large joins more efficient and scalable across multiple cores.',
    category: 'joins',
    url: 'https://clickhouse.com/blog/clickhouse-release-25-07#optimizations-for-joins'
  },
  {
    id: 'join-hash-build-25-2',
    year: 2025, month: 2,
    title: 'Faster Parallel Hash Join — Build Phase',
    summary: 'Improvements to the build phase reduce thread contention and improve scalability for large join workloads.',
    details: 'Improvements to the build phase of the parallel hash join reduced thread contention and improved scalability. These changes allowed better parallelisation across CPU cores, resulting in faster execution for large join workloads.',
    category: 'joins',
    url: 'https://clickhouse.com/blog/clickhouse-release-25-02#faster-parallel-hash-join'
  },
  {
    id: 'join-hash-probe-25-1',
    year: 2025, month: 1,
    title: 'Faster Parallel Hash Join — Probe Phase',
    summary: 'Enhancements to the probe phase and internal hash map structures improve performance consistency and overall join efficiency.',
    details: 'Further enhancements to the probe phase and internal hash map structures improved performance consistency and overall join efficiency. These refinements strengthened the parallel hash join algorithm introduced in earlier versions.',
    category: 'joins',
    url: 'https://clickhouse.com/blog/clickhouse-release-25-01#faster-parallel-hash-join'
  },
  {
    id: 'join-auto-reorder-24-12',
    year: 2024, month: 12,
    title: 'Automatic Join Reordering',
    summary: 'The optimiser now selects better join execution plans automatically, without requiring manual query restructuring.',
    details: 'ClickHouse 24.12 introduced automatic join reordering within the optimiser. This allowed the engine to select better execution plans without requiring manual query restructuring, improving performance for queries involving multiple joins.',
    category: 'joins',
    url: 'https://clickhouse.com/blog/clickhouse-release-24-12#automatic-join-reordering'
  },
  {
    id: 'join-expr-opt-24-12',
    year: 2024, month: 12,
    title: 'Optimisation of JOIN Expressions',
    summary: 'JOIN expressions are automatically optimised and common expressions extracted and simplified algebraically.',
    details: 'Join expressions in 24.12 are automatically optimised and common expressions extracted and simplified algebraically, reducing redundant computation in complex JOIN predicates.',
    category: 'joins',
    url: 'https://clickhouse.com/blog/clickhouse-release-24-12#optimization-of-join-expressions'
  },
  {
    id: 'join-nonequi-24-12',
    year: 2024, month: 12,
    title: 'Non-Equi JOINs Supported by Default',
    summary: 'Non-equal join conditions (experimental since 24.05) are now enabled by default in all deployments.',
    details: 'Since version 24.05, ClickHouse had experimental support for non-equal conditions in the ON clause of JOIN. As of 24.12, this capability is enabled by default, making expressive inequality joins available without any configuration change.',
    category: 'joins',
    url: 'https://clickhouse.com/blog/clickhouse-release-24-12#non-equi-joins-supported-by-default'
  },
  {
    id: 'join-parallel-default-24-11',
    year: 2024, month: 11,
    title: 'Parallel Hash Join Becomes Default',
    summary: 'The parallel hash join algorithm is now the default join strategy, enabling better multi-core utilisation out of the box.',
    details: 'In 24.11, the parallel hash join algorithm became the default join strategy. This change enabled better multi-core utilisation and improved performance for a broad range of join workloads without requiring configuration changes.',
    category: 'joins',
    url: 'https://clickhouse.com/blog/clickhouse-release-24-11#parallel-hash-join-becomes-default'
  },
  {
    id: 'join-improvements-24-8',
    year: 2024, month: 8,
    title: 'JOIN Improvements',
    summary: 'Expanded non-equal JOIN strictness variants and a new OPTIMIZE TABLE for Join-engine tables reduce memory footprint by up to 30%.',
    details: 'ClickHouse 24.8 continued the steady evolution of JOIN performance. Building on experimental non-equal JOIN support from 24.5, this release expanded support for additional JOIN strictness variants — LEFT, RIGHT, SEMI, ANTI, and ANY JOIN with inequality conditions referencing columns from both sides. In addition, 24.8 introduced the ability to run OPTIMIZE TABLE on tables using the Join table engine, improving internal packing and reducing memory footprint by up to 30%.',
    category: 'joins',
    url: 'https://clickhouse.com/blog/clickhouse-release-24-08#join-improvements'
  },
  {
    id: 'join-hash-faster-24-7',
    year: 2024, month: 7,
    title: 'Faster Parallel Hash Join',
    summary: 'Optimised hash table allocation and reuse strategies reduce overhead and improve execution speed for repeated join queries.',
    details: 'ClickHouse 24.7 improved parallel hash join performance by optimising hash table allocation and reuse strategies. This reduced overhead and improved execution speed, particularly for repeated join queries.',
    category: 'joins',
    url: 'https://clickhouse.com/blog/clickhouse-release-24-07#faster-parallel-hash-join'
  },
  {
    id: 'join-asof-merge-24-7',
    year: 2024, month: 7,
    title: 'Merge Join Algorithm for ASOF JOIN',
    summary: 'ASOF JOIN now works with the non-memory-bound full sorting merge join algorithm for large-scale time-series joins.',
    details: 'Since ClickHouse 24.7, ASOF JOIN also works with the non-memory-bound full sorting merge join algorithm. This algorithm requires the joined data to first be sorted in order of the join keys before matches are identified by interleaved linear scans and merges of sorted streams, enabling ASOF JOINs on datasets that exceed available RAM.',
    category: 'joins',
    url: 'https://clickhouse.com/blog/clickhouse-release-24-07#merge-join-algorithm-for-asof-join'
  },
  {
    id: 'join-nonequal-24-5',
    year: 2024, month: 5,
    title: 'Non-Equal JOIN Support',
    summary: 'Support for non-equal join conditions (<, >, <=, >=) enables more expressive analytical queries beyond equi-joins.',
    details: 'Version 24.5 expanded join capabilities by introducing support for non-equal join conditions such as <, >, <=, and >=. This enabled more expressive analytical queries beyond traditional equi-joins.',
    category: 'joins',
    url: 'https://clickhouse.com/blog/clickhouse-release-24-05#non-equal-join'
  },
  {
    id: 'join-cross-24-5',
    year: 2024, month: 5,
    title: 'Cross JOIN Improvements',
    summary: 'Performance and efficiency improvements to cross joins reduce resource usage and make Cartesian joins more practical.',
    details: 'This release improved the performance and efficiency of cross joins, reducing resource usage and making Cartesian joins more practical for applicable workloads.',
    category: 'joins',
    url: 'https://clickhouse.com/blog/clickhouse-release-24-05#cross-join-improvements'
  },
  {
    id: 'join-perf-24-4',
    year: 2024, month: 4,
    title: 'Join Performance Improvements',
    summary: 'General join performance enhancements reduce inefficiencies and improve predicate handling across all join types.',
    details: 'ClickHouse 24.04 included general join performance enhancements that reduced inefficiencies in execution and improved predicate handling. These changes contributed to faster and more scalable join operations overall.',
    category: 'joins',
    url: 'https://clickhouse.com/blog/clickhouse-release-24-04#join-performance-improvements'
  },
  {
    id: 'join-cte-24-4',
    year: 2024, month: 4,
    title: 'Recursive CTE Support',
    summary: 'Recursive common table expressions enable hierarchical and graph-like traversals directly in SQL.',
    details: 'In ClickHouse 24.4, the engine added support for recursive common table expressions (CTEs), enabling SQL queries that can reference their own output to express hierarchical and graph-like traversals. Recursive CTEs allow queries to compute transitive closures and solve hierarchical problems such as tree and graph reachability without external application logic. ClickHouse\'s implementation allows arbitrarily complex recursive definitions within the UNION ALL construct.',
    category: 'joins',
    url: 'https://clickhouse.com/blog/clickhouse-release-24-04#join-performance-improvements'
  },
  {
    id: 'join-paste-23-12',
    year: 2023, month: 12,
    title: 'PASTE JOIN',
    summary: 'PASTE JOIN joins datasets by row number rather than key, useful when equivalent rows across datasets refer to the same item.',
    details: 'ClickHouse 23.12 added support for PASTE JOIN — useful for joining multiple datasets where equivalent rows in each dataset refer to the same item (i.e. row n in the first dataset should join with row n in the second). Datasets can be joined by row number rather than specifying a joining key.',
    category: 'joins',
    url: 'https://clickhouse.com/blog/clickhouse-release-23-12#paste-join'
  },
  {
    id: 'join-grace-hopper-22-12',
    year: 2022, month: 12,
    title: 'Grace Hash JOIN & Reduced Memory for Hash Join',
    summary: 'The Grace Hash join overcomes memory limits of partial merge join, and hash join memory overhead is also reduced.',
    details: 'ClickHouse 22.12 introduced the Grace Hash join — an exciting non-memory-bound addition to the join algorithms that overcomes some of the performance challenges of partial merge. The Grace Hash join partitions data to disk when it exceeds memory limits, allowing large joins to complete reliably. Memory overhead for hash join was also reduced in this release.',
    category: 'joins',
    url: 'https://clickhouse.com/blog/clickhouse-release-22-12'
  },

  // ─── Data Types & Formats ───────────────────────────────────────────────────

  {
    id: 'dt-variant-all-functions-26-1',
    year: 2026, month: 1,
    title: 'Variant Support in All Functions',
    summary: 'Functions that previously did not accept Variant now dispatch appropriately on underlying types, vastly improving Variant usability.',
    details: 'In 26.1, ClickHouse expanded support for the Variant data type across all functions. Functions that previously did not accept Variant will now dispatch appropriately on underlying types, vastly improving the usability of Variant in expressions and functional pipelines.',
    category: 'data-types-formats',
    url: 'https://clickhouse.com/blog/clickhouse-release-26-01'
  },
  {
    id: 'dt-lowcard-distinct-26-1',
    year: 2026, month: 1,
    title: 'LowCardinality DISTINCT Improvements',
    summary: 'DISTINCT over LowCardinality columns now operates directly on dictionary encodings, significantly accelerating those queries.',
    details: 'DISTINCT processing over LowCardinality columns was optimised in 26.1 so that ClickHouse can operate directly on dictionary encodings, significantly accelerating DISTINCT queries on these compressed columns.',
    category: 'data-types-formats',
    url: 'https://clickhouse.com/blog/clickhouse-release-26-01'
  },
  {
    id: 'dt-qbit-beta-26-1',
    year: 2026, month: 1,
    title: 'QBit Promoted to Beta',
    summary: 'QBit — the quantized bit-packed vector type introduced in 25.10 — is promoted to beta status in 26.1.',
    details: 'QBit, a data type for vector embeddings that lets you tune search precision at runtime, was introduced in ClickHouse 25.10. As of ClickHouse 26.1, it has been moved to beta, signalling production readiness for vector search workloads that require adjustable precision.',
    category: 'data-types-formats',
    url: 'https://clickhouse.com/blog/clickhouse-release-26-01#qbit-promoted-to-beta'
  },
  {
    id: 'dt-qbit-25-10',
    year: 2025, month: 10,
    title: 'QBit Data Type for Vector Embeddings',
    summary: 'QBit is a quantized bit-packed vector type that lets users store high-dimensional vectors and choose precision at query time.',
    details: 'ClickHouse 25.10 introduced the QBit data type, a quantized bit-packed vector representation that lets users store and query high-dimensional vectors efficiently while choosing precision at query time for approximate search workloads. This new type augments traditional vector search types and brings finer control over storage vs accuracy.',
    category: 'data-types-formats',
    url: 'https://clickhouse.com/blog/clickhouse-release-25-10'
  },
  {
    id: 'dt-arrow-flight-25-10',
    year: 2025, month: 10,
    title: 'Arrow Flight & Client Service Support',
    summary: 'ClickHouse can now act as an Arrow Flight SQL server, improving high-performance columnar data transport with compatible tooling.',
    details: 'ClickHouse 25.10 continued to improve Arrow Flight support and related ecosystem integration, enabling ClickHouse to act as an Arrow Flight SQL server and improving client interaction patterns for high-performance columnar communication. These enhancements help ClickHouse interoperate with tooling that uses Arrow Flight for analytics and data transport.',
    category: 'data-types-formats',
    url: 'https://clickhouse.com/blog/clickhouse-release-25-10'
  },
  {
    id: 'dt-arrow-flight-25-8',
    year: 2025, month: 8,
    title: 'Arrow Flight and External Format Enhancements',
    summary: 'Strengthened Arrow Flight support improves ClickHouse\'s ability to ingest and output typed data with Arrow IPC ecosystems.',
    details: 'ClickHouse 25.8 strengthened support for Apache Arrow Flight and other columnar interchange formats, improving ClickHouse\'s ability to ingest and output typed data efficiently with ecosystems that speak the Arrow IPC format. This broadens support for typed data transfer across analytics tooling.',
    category: 'data-types-formats',
    url: 'https://clickhouse.com/blog/clickhouse-release-25-08'
  },
  {
    id: 'dt-geospatial-25-7',
    year: 2025, month: 7,
    title: 'Native Geospatial Types and Functions',
    summary: 'Native geospatial data types and richer geospatial functions elevate spatial analytics within ClickHouse\'s type system.',
    details: 'In 25.7, ClickHouse added native support for geospatial data types along with richer geospatial functions, elevating geospatial capabilities within ClickHouse\'s type system. This broadens structured spatial analytics support for location-aware data.',
    category: 'data-types-formats',
    url: 'https://clickhouse.com/blog/clickhouse-release-25-07'
  },
  {
    id: 'dt-json-parquet-time64-25-6',
    year: 2025, month: 6,
    title: 'JSON in Parquet and Time/Time64 Data Types',
    summary: 'JSON in Parquet ingestion and new Time/Time64 types offer finer temporal precision and richer semi-structured data workflows.',
    details: 'ClickHouse 25.6 added support for JSON in Parquet file ingestion, enabling richer semi-structured data workflows without needing transformations, and introduced the Time and Time64 data types, offering finer-grain temporal precision and more expressive temporal analytics.',
    category: 'data-types-formats',
    url: 'https://clickhouse.com/blog/clickhouse-release-25-06'
  },
  {
    id: 'dt-geo-parquet-25-5',
    year: 2025, month: 5,
    title: 'Geospatial Types in Parquet Search',
    summary: 'Improved Parquet geospatial support enables geospatial type handling and search within Parquet data.',
    details: 'In 25.05, ClickHouse improved Parquet geospatial support, enabling geospatial type handling and search within Parquet data, further enhancing ClickHouse\'s ability to work with typed spatial data from external formats.',
    category: 'data-types-formats',
    url: 'https://clickhouse.com/blog/clickhouse-release-25-05'
  },
  {
    id: 'dt-json-ga-25-3',
    year: 2025, month: 3,
    title: 'JSON Data Type Reaches General Availability',
    summary: 'The native JSON data type reaches GA, offering robust production-ready support for semi-structured JSON with efficient storage and querying.',
    details: 'ClickHouse 25.3 marked the general availability of the native JSON data type, offering robust, production-ready support for semi-structured JSON data with efficient storage and querying. This completed a multi-release engineering effort to bring columnar performance to schema-on-read JSON workloads.',
    category: 'data-types-formats',
    url: 'https://clickhouse.com/blog/clickhouse-release-25-03'
  },
  {
    id: 'dt-json-subcolumns-key-24-12',
    year: 2024, month: 12,
    title: 'JSON Subcolumns as Primary Key',
    summary: 'JSON subcolumns can now be used as primary key columns, enabling indexed access patterns on JSON content.',
    details: 'In 24.12, ClickHouse added support for using JSON subcolumns as primary key columns, enabling indexed access patterns on JSON content. This lets ClickHouse physically sort and organise data on disk by JSON path values, enabling faster range scans and index pruning on queries that filter by those subcolumns.',
    category: 'data-types-formats',
    url: 'https://clickhouse.com/blog/clickhouse-release-24-12'
  },
  {
    id: 'dt-enum-usability-24-12',
    year: 2024, month: 12,
    title: 'Enum Usability Improvements',
    summary: 'Improved Enum type usability smooths the developer experience with enumerated types in queries and schema definitions.',
    details: 'ClickHouse 24.12 improved Enum usability, smoothing the developer experience with enumerated types in queries. These changes reduce friction when working with Enum columns in expressions, comparisons, and schema migrations.',
    category: 'data-types-formats',
    url: 'https://clickhouse.com/blog/clickhouse-release-24-12'
  },
  {
    id: 'dt-bfloat16-24-11',
    year: 2024, month: 11,
    title: 'BFloat16 Data Type for Vector Workloads',
    summary: 'The BFloat16 type optimises storage and computation for vector and ML workloads with efficient 16-bit representation.',
    details: 'ClickHouse 24.11 introduced the BFloat16 data type, optimising storage and computation for vector and ML-related workloads by providing efficient 16-bit representations with reduced precision losses for large vectors.',
    category: 'data-types-formats',
    url: 'https://clickhouse.com/blog/clickhouse-release-24-11'
  },
  {
    id: 'dt-variant-schema-24-9',
    year: 2024, month: 9,
    title: 'Variant Types in Schema Inference and JSON Enhancements',
    summary: 'Automatic schema inference can now return Variant types, improving how schemas are derived from JSON and semi-structured sources.',
    details: 'ClickHouse 24.09 introduced the ability for automatic schema inference to return Variant types, improving how schema is derived from JSON and other semi-structured sources. The release also added new aggregate functions to analyse JSON structures.',
    category: 'data-types-formats',
    url: 'https://clickhouse.com/blog/clickhouse-release-24-09'
  },
  {
    id: 'dt-json-experimental-24-8',
    year: 2024, month: 8,
    title: 'Experimental Native JSON Data Type',
    summary: 'The native JSON data type lands experimentally in the 24.08 LTS, enabling semi-structured storage and querying within tables.',
    details: 'ClickHouse 24.08 LTS saw the experimental introduction of the native JSON data type, enabling semi-structured storage and querying within ClickHouse tables. JSON sub-columns are stored in separate columnar files, giving JSON data the same compression and scan speed as explicitly defined columns.',
    category: 'data-types-formats',
    url: 'https://clickhouse.com/blog/clickhouse-release-24-08'
  },
  {
    id: 'dt-dynamic-type-24-5',
    year: 2024, month: 5,
    title: 'Dynamic Data Type and Reading Archives on S3',
    summary: 'The experimental Dynamic type supports flexible semi-structured columns without predefined type lists.',
    details: 'In 24.05, ClickHouse introduced the experimental Dynamic data type for flexible semi-structured columns that do not require predefined type lists, and extended reading from archive files on S3 (e.g. ZIP/TAR), broadening the formats and typed data ingestion supported natively.',
    category: 'data-types-formats',
    url: 'https://clickhouse.com/blog/clickhouse-release-24-05'
  },
  {
    id: 'dt-file-format-detection-24-2',
    year: 2024, month: 2,
    title: 'Automatic Detection of File Format',
    summary: 'When processing files, ClickHouse automatically detects the file type even without a valid extension.',
    details: 'When processing files, ClickHouse will automatically detect the type of the file even if it doesn\'t have a valid extension. For example, a file named "foo" containing data in JSON lines format will be parsed correctly without specifying the format explicitly.',
    category: 'data-types-formats',
    url: 'https://clickhouse.com/blog/clickhouse-release-24-02'
  },
  {
    id: 'dt-int8-opt-24-2',
    year: 2024, month: 2,
    title: 'Optimisation for Int8 Data Type',
    summary: 'Query performance for the Int8 data type is improved in ClickHouse 24.2.',
    details: 'ClickHouse 24.2 included targeted performance improvements for the Int8 data type, reducing the compute cost of operations on byte-width integer columns and improving throughput for workloads with dense Int8 usage.',
    category: 'data-types-formats',
    url: 'https://presentations.clickhouse.com/2024-release-24.2/?full#20'
  },
  {
    id: 'dt-variant-type-24-1',
    year: 2024, month: 1,
    title: 'Variant Type',
    summary: 'The Variant type is a discriminated union of nested column types, forming the foundation of semi-structured column support.',
    details: 'The Variant type forms part of a longer-term project to add semi-structured columns to ClickHouse. This type is a discriminated union of nested columns. For example, Variant(Int8, Array(String)) stores every value as either Int8 or Array(String). It is the building block for the upcoming Dynamic and JSON types.',
    category: 'data-types-formats',
    url: 'https://clickhouse.com/blog/clickhouse-release-24-01#variant-type'
  },
  {
    id: 'dt-archive-reading-23-8',
    year: 2023, month: 8,
    title: 'Archive Reading (ZIP, TAR, 7zip)',
    summary: 'ClickHouse now supports reading ZIP, TAR, and 7zip archives, which can each contain multiple files.',
    details: 'ClickHouse already supported compressed files with formats such as zstd, lz4, snappy, gz, xz, and bz2. Up to 23.8, these compressed files could only contain a single file. With 23.8, support for zip, tar, and 7zip was added — all of which can contain potentially multiple files.',
    category: 'data-types-formats',
    url: 'https://clickhouse.com/blog/clickhouse-release-23-08#files-files-and-more-files'
  },
  {
    id: 'dt-numpy-23-10',
    year: 2023, month: 10,
    title: 'Support for NumPy Arrays in Imports',
    summary: 'Direct ingestion of NumPy arrays enables integration of typed arrays from scientific computing workflows.',
    details: 'ClickHouse 23.10 added support for NumPy array ingestion and handling, enabling direct integration of typed arrays from scientific computing workflows into ClickHouse tables without intermediate conversion.',
    category: 'data-types-formats',
    url: 'https://clickhouse.com/blog/clickhouse-release-23-10'
  },
  {
    id: 'dt-json-gcd-23-9',
    year: 2023, month: 9,
    title: 'Improved JSON Support, GCD Codec, and Type Inference for JSON',
    summary: 'Enhanced JSON data type support, a new GCD codec for better numeric compression, and improved JSON type inference.',
    details: 'ClickHouse 23.09 delivered enhanced JSON data type support, introduced the GCD codec for better compression of numeric types by factoring out the greatest common divisor, and improved type inference for JSON ingestion scenarios.',
    category: 'data-types-formats',
    url: 'https://clickhouse.com/blog/clickhouse-release-23-09'
  },
  {
    id: 'dt-bson-22-12',
    year: 2022, month: 12,
    title: 'BSON Format Support',
    summary: 'BSON support enables efficient parsing and working with binary data from document-oriented systems like MongoDB.',
    details: 'The 22.12 release introduced BSON support, enabling ClickHouse to efficiently parse and work with BSON data (a binary format associated with document-oriented data structures). Supporting BSON enhances ClickHouse\'s ability to work with structured and semi-structured data from systems like MongoDB.',
    category: 'data-types-formats',
    url: 'https://clickhouse.com/blog/clickhouse-release-22-12'
  },
  {
    id: 'dt-sparse-columns-default-23-7',
    year: 2023, month: 7,
    title: 'Sparse Columns Enabled by Default',
    summary: 'Columns with many default values now automatically use sparse serialisation, improving storage efficiency and query performance.',
    details: 'In ClickHouse 23.7, sparse columns were enabled by default for the engine. Columns with many default values will now automatically use sparse serialisation without needing custom settings, improving storage efficiency and query performance on datasets with sparse distributions. This makes sparse encoding a first-class feature in column storage.',
    category: 'data-types-formats',
    url: 'https://clickhouse.com/blog/clickhouse-release-23-07#sparse-columns-enabled-by-default-anton-popov'
  },
  {
    id: 'dt-sparse-encoding-22-1',
    year: 2022, month: 1,
    title: 'Sparse Encoding for Columns',
    summary: 'Columns containing mostly default values can automatically use sparse format, reducing storage and computation costs.',
    details: 'ClickHouse 22.1 introduced sparse encoding for columns. When a column contains mostly default values (e.g. zeros), ClickHouse can automatically choose a sparse format during serialisation, storing only the non-default values. This special column representation is transparent to SQL queries and optimises both storage and computation for sparse data.',
    category: 'data-types-formats',
    url: 'https://clickhouse.com/blog/whats-new-in-clickhouse-22-1#sparse-encoding-for-columns'
  },

  // ─── Data Lifecycle Operations ───────────────────────────────────────────────

  {
    id: 'dl-dedup-async-inserts-26-1',
    year: 2026, month: 1,
    title: 'Deduplication of Asynchronous Inserts with Materialized Views',
    summary: 'Duplicate inserts are now filtered consistently across materialized views in asynchronous insert workflows.',
    details: 'ClickHouse 26.1 introduced deduplication of asynchronous inserts with materialized views, meaning the engine will filter duplicate inserts consistently across tables involved in asynchronous insert workflows, improving correctness and lifecycle of ingest.',
    category: 'data-lifecycle',
    url: 'https://clickhouse.com/blog/clickhouse-release-26-01#deduplication-of-asynchronous-inserts-with-materialized-views'
  },
  {
    id: 'dl-late-mat-secondary-25-10',
    year: 2025, month: 10,
    title: 'Late Materialisation of Secondary Indices',
    summary: 'Settings that delay the materialisation of secondary indices prioritise insert performance over index construction.',
    details: 'The 25.10 release introduced settings that allow delaying the materialisation of secondary indices, prioritising insert performance over index construction. This is particularly useful for high-throughput ingest pipelines where secondary index maintenance overhead would otherwise reduce insert throughput.',
    category: 'data-lifecycle',
    url: 'https://clickhouse.com/blog/clickhouse-release-25-10#late-materialization-of-secondary-indices'
  },
  {
    id: 'dl-lightweight-updates-25-7',
    year: 2025, month: 7,
    title: 'Lightweight Updates and Deletes',
    summary: 'SQL UPDATE uses patch parts and DELETE behaviour marks row removal as small patch parts applied during background merges.',
    details: 'ClickHouse 25.7 brought lightweight SQL UPDATE support using patch parts and featherweight DELETE behaviour where deletes are just small patch parts marking row removal and applied during background merges. This directly affects update/delete performance and semantics, enabling near-instant mutations without the overhead of full part rewrites.',
    category: 'data-lifecycle',
    url: 'https://clickhouse.com/blog/clickhouse-release-25-07#lightweight-updates'
  },
  {
    id: 'dl-snapshot-25-6',
    year: 2025, month: 6,
    title: 'Consistent Snapshot Handling',
    summary: 'Single consistent snapshots across queries ensure SELECTs see the same data view even when inserts or mutations occur concurrently.',
    details: 'ClickHouse 25.06 introduced single consistent snapshots across queries, ensuring that SELECTs see the same data view even when inserts or mutations occur concurrently. This improves logical lifecycle behaviour and correctness for workloads that mix reads and writes.',
    category: 'data-lifecycle',
    url: 'https://clickhouse.com/blog/clickhouse-release-25-06#single-snapshot-for-select'
  },
  {
    id: 'dl-backup-engine-25-2',
    year: 2025, month: 2,
    title: 'Backup Database Engine',
    summary: 'A new Backup database engine allows instantly attaching tables and databases from backups in read-only mode.',
    details: 'ClickHouse 25.2 introduced a Backup database engine. This lets users instantly attach tables and databases from backups in read-only mode, enabling fast inspection of backup contents without a full restore cycle.',
    category: 'data-lifecycle',
    url: 'https://clickhouse.com/blog/clickhouse-release-25-02'
  },
  {
    id: 'dl-merge-tables-25-1',
    year: 2025, month: 1,
    title: 'Better Merge Tables',
    summary: 'From 25.1, Merge table columns are standardised to a common or Variant type rather than adopting the first table\'s structure.',
    details: 'The Merge table engine enables the combination of multiple tables into a single virtual table. Before version 25.1, the function adopted the structure of the first table by default unless another structure was explicitly specified. From version 25.1 onwards, columns are standardised to a common or Variant data type, ensuring more predictable behaviour across heterogeneous table schemas.',
    category: 'data-lifecycle',
    url: 'https://clickhouse.com/blog/clickhouse-release-25-01#better-merge-tables'
  },
  {
    id: 'dl-adaptive-async-inserts-24-2',
    year: 2024, month: 2,
    title: 'Adaptive Asynchronous Inserts',
    summary: 'Buffer flush timeouts now adapt dynamically to insert frequency, reducing latency for infrequent inserts while maintaining throughput.',
    details: 'In ClickHouse 24.2, adaptive asynchronous inserts refined how asynchronous insert batching works. Previously, infrequent insert workloads could suffer high latency because the flush timeout was static. With adaptive asynchronous inserts, the system dynamically adjusts the buffer flush timeout based on insert frequency — for frequent inserts it combines rows into larger parts; for infrequent inserts it shortens the delay. This improves the data ingestion lifecycle by offering both high throughput and lower latency without manual tuning.',
    category: 'data-lifecycle',
    url: 'https://clickhouse.com/blog/clickhouse-release-24-02'
  },
  {
    id: 'dl-lightweight-updates-oss-24-2',
    year: 2024, month: 2,
    title: 'Lightweight Updates Available in Open Source',
    summary: 'Lightweight UPDATE support, previously cloud-only, becomes available in the open-source ClickHouse distribution.',
    details: 'With ClickHouse 24.2, lightweight updates became available in the open-source distribution. Lightweight updates mark changed rows at the metadata level, making the operation near-instant compared with traditional mutations that rewrite entire data parts.',
    category: 'data-lifecycle',
    url: 'https://clickhouse.com/blog/clickhouse-release-24-02'
  },
  {
    id: 'dl-lightweight-deletes-ga-23-3',
    year: 2023, month: 3,
    title: 'Lightweight Deletes Now GA',
    summary: 'Lightweight Deletes reach general availability, enabling efficient row removal via DELETE syntax with background merge semantics.',
    details: 'ClickHouse 23.3 announced that Lightweight Deletes are generally available, enabling more efficient removal of rows via DELETE syntax by marking rows and letting background merges drop them eventually. This directly affects delete semantics and performance, offering a much faster alternative to full mutations for row-level deletes.',
    category: 'data-lifecycle',
    url: 'https://clickhouse.com/blog/clickhouse-release-23-03'
  },
  {
    id: 'dl-insert-retries-22-11',
    year: 2022, month: 11,
    title: 'Retries on INSERT',
    summary: 'Large data migrations and long-running insert jobs can now survive intermittent failures without failing the entire request.',
    details: 'ClickHouse 22.11 added retries on INSERT, so large data migrations and long-running insert jobs could survive intermittent failures without failing the entire request. This improves overall insert reliability and lifecycle robustness for ingest pipelines.',
    category: 'data-lifecycle',
    url: 'https://clickhouse.com/blog/clickhouse-release-22-11'
  },

  // ─── Indexes ────────────────────────────────────────────────────────────────

  {
    id: 'idx-text-improvements-26-1',
    year: 2026, month: 1,
    title: 'Text Index Improvements',
    summary: 'Enhancements to text indexing support make inverted indexes over tokenized strings more robust and efficient for full-text search.',
    details: 'In ClickHouse 26.1, the release included enhancements to text indexing support, building on the experimental text index capabilities introduced in earlier releases. These improvements make text-based skip indexes (inverted indexes over tokenised string data) more robust and efficient for accelerating full-text search queries directly inside ClickHouse, enabling faster filtering of rows based on token presence without full scans.',
    category: 'indexes',
    url: 'https://clickhouse.com/blog/clickhouse-release-26-01#text-index-improvements'
  },
  {
    id: 'idx-text-beta-25-12',
    year: 2025, month: 12,
    title: 'Text Index Moves to Beta',
    summary: 'The full-text skip index feature reaches beta, tokenising text columns so predicates can skip entire non-matching granules.',
    details: 'In ClickHouse 25.12, the text index feature was marked as beta. This new index type tokenises text columns and lets predicate evaluation skip entire data granules that can\'t match the search condition, dramatically cutting scan costs for complex text filters compared with unindexed scans.',
    category: 'indexes',
    url: 'https://clickhouse.com/blog/clickhouse-release-25-12#text-index-is-beta'
  },
  {
    id: 'idx-topn-skipping-25-12',
    year: 2025, month: 12,
    title: 'Faster Top-N Queries with Data Skipping Indexes',
    summary: 'Top-N queries now compare the current threshold against granule-level min/max index metadata to skip irrelevant granules before any data is read.',
    details: 'ClickHouse 25.12 introduced optimisations for Top-N queries that leverage data skipping indexes more aggressively. Rather than scanning all granules before sorting, ClickHouse compares the current Top-N threshold against granule-level min/max skip index metadata and skips entire granules that cannot contribute to the final result. This approach can reduce I/O by orders of magnitude for common ORDER BY … LIMIT queries.',
    category: 'indexes',
    url: 'https://clickhouse.com/blog/clickhouse-release-25-12#faster-top-n-queries-with-data-skipping-indexes'
  },
  {
    id: 'idx-projections-secondary-25-11',
    year: 2025, month: 11,
    title: 'Projections as Secondary Indices',
    summary: 'Projections now store only the sort key plus a part offset pointer, acting as lightweight secondary index structures.',
    details: 'In ClickHouse 25.11, projections were refined to function as true secondary indexes. Projections now behave like lightweight secondary index structures by storing only the sorting key plus a part offset pointer back to the base table. This allows ClickHouse to prune data more effectively for queries that filter on columns not aligned with the primary key, improving scan efficiency without redundant full table copies.',
    category: 'indexes',
    url: 'https://clickhouse.com/blog/clickhouse-release-25-11#projections-as-secondary-indices'
  },
  {
    id: 'idx-distinct-projections-25-11',
    year: 2025, month: 11,
    title: 'Speeding Up DISTINCT with Projections',
    summary: 'Projections aligned with DISTINCT keys reduce data scanned during DISTINCT aggregation, lowering compute and I/O.',
    details: 'In ClickHouse 25.11, projections were used to speed up DISTINCT queries by enabling query plans to leverage projections better aligned with the DISTINCT key. By organising column values in projection sort orders and allowing pruning of irrelevant data early, ClickHouse can significantly lower compute and I/O for high-cardinality DISTINCT operations when a projection matches the DISTINCT key pattern.',
    category: 'indexes',
    url: 'https://clickhouse.com/blog/clickhouse-release-25-11#speed-up-distinct-with-projections'
  },
  {
    id: 'idx-late-mat-25-10',
    year: 2025, month: 10,
    title: 'Late Materialisation of Secondary Indices',
    summary: 'Non-indexed columns are retrieved only after secondary index pruning is applied, reducing unnecessary reads on wide tables.',
    details: 'ClickHouse 25.10 introduced late materialisation support for secondary indices. With this approach, ClickHouse first uses secondary indices to identify relevant row granules or key ranges, and only then pulls in additional non-indexed column data needed for the final output. This reduces unnecessary reads of wide tables and increases the effectiveness of index pruning, leading to faster query execution and lower I/O costs for queries that filter on indexed predicates.',
    category: 'indexes',
    url: 'https://clickhouse.com/blog/clickhouse-release-25-10#late-materialization-of-secondary-indices'
  },
  {
    id: 'idx-streaming-secondary-25-9',
    year: 2025, month: 9,
    title: 'Streaming Secondary Indices',
    summary: 'Columnar data reads and index checks are now interleaved, so the engine can skip granules before data is read and stop early.',
    details: 'In ClickHouse 25.9, streaming for secondary indices was introduced, fundamentally changing how skip indices — MinMax, Set, Bloom filters, vector, and text indices — are applied during query execution. Previously, ClickHouse read the entire secondary index before scanning table data. With streaming, the engine interleaves reading columnar data with index checks, skipping granules before data is read and ceasing scanning as soon as the desired result set is complete. This reduces I/O and speeds up queries dramatically.',
    category: 'indexes',
    url: 'https://clickhouse.com/blog/clickhouse-release-25-09#streaming-for-secondary-indices'
  },
  {
    id: 'idx-new-text-index-25-9',
    year: 2025, month: 9,
    title: 'New Text Index',
    summary: 'A new experimental text index restructures full-text search around skip index granules, delivering order-of-magnitude performance improvements.',
    details: 'In ClickHouse 25.9, a new experimental text index was introduced to accelerate full-text search queries on string columns. The previous FST-based implementation didn\'t align well with skip index granules, limiting performance. The new text index restructures full-text search support around skip index granules so that predicates like hasToken, searchAll, and searchAny can efficiently skip non-matching granules. Early results showed order-of-magnitude performance improvements for text search workloads.',
    category: 'indexes',
    url: 'https://clickhouse.com/blog/clickhouse-release-25-09#a-new-text-index'
  },
  {
    id: 'idx-multi-projections-25-6',
    year: 2025, month: 6,
    title: 'Filtering by Multiple Projections',
    summary: 'ClickHouse can now examine multiple projections\' primary indexes to prune irrelevant parts when a query includes filters aligned with different sort orders.',
    details: 'In ClickHouse 25.6, ClickHouse enhanced how projections act as index-like structures. While a query still reads from a single projection or the base table, the engine can examine the primary indexes of other projections to prune irrelevant parts before reading. This enables more effective data skipping when a query includes multiple filters that align with different sort orders.',
    category: 'indexes',
    url: 'https://clickhouse.com/blog/clickhouse-release-25-06#filtering-by-multiple-projections'
  },
  {
    id: 'idx-bloom-opt-25-6',
    year: 2025, month: 6,
    title: 'Bloom Filter Index Optimisation',
    summary: 'Improvements to Bloom filter index implementation enhance efficiency across all types, reducing false positives and I/O.',
    details: 'In ClickHouse 25.6, improvements were made to Bloom filter indexes — a type of skipping index — to optimise their performance. Bloom filters are probabilistic index structures that quickly rule out rows that definitely do not match a filter condition. The implementation was improved across all Bloom filter index types to enhance efficiency, helping reduce I/O and computation by minimising false positives and refining how indexes prune irrelevant data.',
    category: 'indexes',
    url: 'https://clickhouse.com/blog/clickhouse-release-25-06#optimization-for-bloom-filter-index'
  },
  {
    id: 'idx-lazy-mat-25-4',
    year: 2025, month: 4,
    title: 'Lazy Materialisation Optimisation',
    summary: 'Non-necessary columns are read only after the final result set is known, dramatically cutting I/O for Top-N queries.',
    details: 'In ClickHouse 25.4, lazy materialisation was introduced, delaying reads of non-necessary columns until they are actually needed in the final result. For queries such as Top-N with ORDER BY and LIMIT, ClickHouse reads only the minimum required columns to determine the sort order, then loads other fields only for the final result set. This can cut down I/O, memory usage, and query runtime dramatically when many columns are present but only a few are needed for ranking.',
    category: 'indexes',
    url: 'https://clickhouse.com/blog/clickhouse-release-25-04#lazy-materialization'
  },
  {
    id: 'idx-minmax-25-1',
    year: 2025, month: 1,
    title: 'MinMax Indices at the Table Level',
    summary: 'Table-level MinMax indices record min/max values per granule, allowing the engine to skip entire granules for range predicate queries.',
    details: 'In ClickHouse 25.1, MinMax indices at the table level were introduced, expanding ClickHouse\'s data skipping capabilities. These indices record the minimum and maximum values of columns within each data granule, allowing the query engine to skip entire granules during scans when the predicate range does not intersect the recorded min/max range. Table-level MinMax indices improve range predicate performance without requiring manual skip index definitions.',
    category: 'indexes',
    url: 'https://clickhouse.com/blog/clickhouse-release-25-01#minmax-indices-at-the-table-level'
  },
  {
    id: 'idx-json-primary-key-24-12',
    year: 2024, month: 12,
    title: 'JSON Subcolumns as Table Primary Key',
    summary: 'JSON subcolumns can now be included in ORDER BY primary keys, enabling range scans and index pruning on JSON path values.',
    details: 'In ClickHouse 24.12, support was added for using JSON subcolumns as primary key columns. With the native JSON data type storing each JSON key path as a separate column, you can now include these subcolumns directly in a table\'s ORDER BY primary key. This lets ClickHouse physically sort and organise data on disk by JSON path values, enabling much faster range scans and index pruning on queries that filter by those subcolumns.',
    category: 'indexes',
    url: 'https://clickhouse.com/blog/clickhouse-release-24-12#json-subcolumns-as-table-primary-key'
  },
  {
    id: 'idx-reverse-order-24-12',
    year: 2024, month: 12,
    title: 'Reverse Table Ordering',
    summary: 'Tables can now be sorted in descending direction in ORDER BY, accelerating range scans and ordered queries that want descending results.',
    details: 'In ClickHouse 24.12, reverse table ordering was added, enabling users to define a table\'s sort order in descending direction directly in the ORDER BY clause. The on-disk physical layout can now match descending query patterns without requiring an in-memory sort during query execution, accelerating range scans and ordered queries that naturally want descending order results.',
    category: 'indexes',
    url: 'https://clickhouse.com/blog/clickhouse-release-24-12#reverse-table-ordering'
  },
  {
    id: 'idx-read-in-order-24-7',
    year: 2024, month: 7,
    title: 'Optimise Read-in-Order',
    summary: 'Buffered reads before the final merge step allow parallel reads for ORDER BY queries that align with the table\'s physical sort order.',
    details: 'The release improved optimize_read_in_order behaviour to make ordered scans significantly faster when a query\'s ORDER BY clause aligns with the physical sort order of the table. ClickHouse 24.7 added buffering before the final merge step (via the read_in_order_use_buffering setting), which lets reads be pulled in parallel into a buffer and then merged in order, dramatically speeding up such ordered queries while preserving sort order correctness.',
    category: 'indexes',
    url: 'https://clickhouse.com/blog/clickhouse-release-24-07'
  },
  {
    id: 'idx-optimal-sorting-24-6',
    year: 2024, month: 6,
    title: 'Optimal Table Sorting',
    summary: 'The optimize_row_order setting sorts rows within equal primary key ranges by column cardinality, improving compression by 20–40%.',
    details: 'In ClickHouse 24.6, Optimal Table Sorting was introduced via the optimize_row_order setting. During ingestion, rows within equal primary key ranges are additionally sorted according to the cardinality of remaining columns. This often leads to much better compression ratios — commonly 20–40% improvements — because similar values are co-located in columns, reducing data entropy and speeding up range scans.',
    category: 'indexes',
    url: 'https://clickhouse.com/blog/clickhouse-release-24-06#optimal-table-sorting'
  },
  {
    id: 'idx-primary-key-memory-24-2',
    year: 2024, month: 2,
    title: 'Reduced Memory Usage for Primary Key',
    summary: 'Memory consumption for the in-memory primary key index is reduced in ClickHouse 24.2.',
    details: 'ClickHouse 24.2 reduced memory usage for the primary key index, lowering the resident memory footprint for tables with large or many-column primary keys. This is particularly beneficial for servers with many tables or very large datasets.',
    category: 'indexes',
    url: 'https://presentations.clickhouse.com/2024-release-24.2/?full#17'
  },
  {
    id: 'idx-multistage-prewhere-23-2',
    year: 2023, month: 2,
    title: 'Multi-Stage PREWHERE',
    summary: 'Filters are applied in multiple ordered stages from smallest to largest column size, significantly lowering I/O on wide tables.',
    details: 'In the 23.2 release, ClickHouse introduced multi-stage PREWHERE filtering. Traditionally, PREWHERE applied a single secondary filter stage after primary key granule pruning. In 23.2 this was expanded into multiple ordered stages. Filters are applied in sequence from smallest to largest uncompressed column size, allowing early steps to eliminate many rows and reduce the set of granules scanned by subsequent filters. This staged approach can significantly lower I/O and compute costs on wide tables with selective predicates.',
    category: 'indexes',
    url: 'https://clickhouse.com/blog/clickhouse-release-23-02#multi-stage-prewhere-alexander-gololobov'
  },
  {
    id: 'idx-inverted-23-1',
    year: 2023, month: 1,
    title: 'Inverted Full-Text Indices',
    summary: 'Experimental inverted full-text indices accelerate text search by mapping terms to document positions.',
    details: 'ClickHouse 23.1 introduced experimental inverted full-text indices for full-text search acceleration. Inverted indices differ from traditional row-based indexes by mapping terms to document positions, speeding up text searches on string columns without requiring a full table scan.',
    category: 'indexes',
    url: 'https://clickhouse.com/blog/clickhouse-release-23-01'
  },

  // ─── Data Lakes ─────────────────────────────────────────────────────────────

  {
    id: 'lake-improvements-25-9',
    year: 2025, month: 9,
    title: 'Data Lake Improvements',
    summary: 'ALTER UPDATE and DROP TABLE for Iceberg tables, ORC/Avro format support, Unity catalog on Azure, and distributed INSERT SELECT for data lakes.',
    details: 'ClickHouse 25.9 brought several meaningful enhancements for data lake interoperability and Iceberg table management: support for ALTER UPDATE and DROP TABLE on Apache Iceberg tables; an iceberg_metadata_log system table; support for ORC and Avro file formats for Iceberg data files; the ability to use the Unity catalog on Azure; and distributed INSERT SELECT for data lakes to enable scalable distributed writes into external data lake formats.',
    category: 'data-lakes',
    url: 'https://clickhouse.com/blog/clickhouse-release-25-09#data-lake-improvements'
  },
  {
    id: 'lake-s3-storage-class-25-9',
    year: 2025, month: 9,
    title: 'Storage Class Specification for S3',
    summary: 'Users can now specify the AWS S3 storage class (e.g. INTELLIGENT_TIERING) when creating S3-backed tables.',
    details: 'In ClickHouse 25.9, support was added for specifying the AWS S3 storage class when using the S3 table engine or S3 table functions. This lets users choose storage classes such as INTELLIGENT_TIERING when creating S3-backed tables, allowing tighter cost and access-pattern control for data stored in object storage.',
    category: 'data-lakes',
    url: 'https://clickhouse.com/blog/clickhouse-release-25-09#storage-class-specification-for-s3'
  },
  {
    id: 'lake-parquet-reader-v3-25-8',
    year: 2025, month: 8,
    title: 'New Native Parquet Reader (v3)',
    summary: 'A new faster native Parquet reader parallelises column reads, making Parquet handling significantly faster for large lakehouse datasets.',
    details: 'In 25.8, ClickHouse introduced a new and faster native Parquet reader that optimises reading Parquet files — the foundational storage format for Iceberg and Delta Lake — by parallelising column reads and improving performance on lakehouse workloads. This makes ClickHouse\'s Parquet handling significantly faster and more scalable for large external datasets.',
    category: 'data-lakes',
    url: 'https://clickhouse.com/blog/clickhouse-release-25-08#parquet-reader-v3'
  },
  {
    id: 'lake-datalake-improvements-25-8',
    year: 2025, month: 8,
    title: 'Data Lake DML on Iceberg',
    summary: 'Full INSERT, DELETE, UPDATE, and ALTER SCHEMA on Iceberg tables via IcebergS3, enabling interactive DML without importing to native storage.',
    details: 'In ClickHouse 25.8, the IcebergS3 table engine gained full DML support: INSERT, DELETE, UPDATE, and schema ALTER on Iceberg tables. This makes ClickHouse a more capable query engine and management tool for lakehouse datasets by enabling interactive DML workloads while data remains in open storage formats.',
    category: 'data-lakes',
    url: 'https://clickhouse.com/blog/clickhouse-release-25-08#data-lake-improvements'
  },
  {
    id: 'lake-azure-performance-25-8',
    year: 2025, month: 8,
    title: 'Improved Azure Blob Storage Performance',
    summary: 'Managed identity authentication tokens are now cached and reused, reducing throttling and improving throughput for Azure data lake access.',
    details: 'The 25.8 release brought improved Azure Blob Storage performance for the azureBlobStorage integration used in data lake scenarios. Azure Blob Storage connections now cache and reuse managed identity authentication tokens where possible, reducing throttling and improving throughput for repeated access patterns to remote lakes in Azure.',
    category: 'data-lakes',
    url: 'https://clickhouse.com/blog/clickhouse-release-25-08#improved-azure-blob-storage-performance'
  },
  {
    id: 'lake-geo-parquet-25-7',
    year: 2025, month: 7,
    title: 'Native Support for Geo Parquet Types',
    summary: 'Parquet columns encoded in WKB now map directly to ClickHouse geo types like Point, LineString, and Polygon.',
    details: 'In 25.07, ClickHouse added full support for native geo data types in Parquet files, allowing Parquet columns encoded in Well-Known Binary (WKB) to map directly to ClickHouse geo types like Point, LineString, and Polygon. This enhances interoperability with spatial data in Parquet format stored in data lakes.',
    category: 'data-lakes',
    url: 'https://clickhouse.com/blog/clickhouse-release-25-07#native-support-for-geo-parquet-types'
  },
  {
    id: 'lake-json-parquet-25-6',
    year: 2025, month: 6,
    title: 'JSON in Parquet',
    summary: 'ClickHouse can now read the logical JSON type from Parquet files directly into its native JSON type without extra transformation.',
    details: 'In 25.06, the release improved Parquet handling by enabling ClickHouse to read the logical JSON type from Parquet files directly into its native JSON type. This enhancement broadens support for semi-structured data in lakehouse files and simplifies querying JSON-rich Parquet datasets.',
    category: 'data-lakes',
    url: 'https://clickhouse.com/blog/clickhouse-release-25-06#json-in-parquet'
  },
  {
    id: 'lake-system-tables-25-6',
    year: 2025, month: 6,
    title: 'New System Tables: Codecs and iceberg_history',
    summary: 'New system tables including iceberg_history provide visibility into Iceberg snapshot histories and codec usage.',
    details: 'In 25.06, ClickHouse added new system tables such as system.iceberg_history, which provides visibility into Iceberg table snapshot histories, and updated system views for codecs. These tables help developers and analysts introspect Iceberg metadata and compression behaviour, aiding troubleshooting and understanding of external dataset evolution.',
    category: 'data-lakes',
    url: 'https://clickhouse.com/blog/clickhouse-release-25-06#new-system-tables-codecs-and-iceberg_history'
  },
  {
    id: 'lake-hive-metastore-25-5',
    year: 2025, month: 5,
    title: 'Hive Metastore Catalog for Iceberg',
    summary: 'The DataLakeCatalog engine supports Hive metastore, allowing direct discovery of Iceberg tables registered in an existing metastore.',
    details: 'The 25.05 release introduced support for the Hive metastore catalog via the DataLakeCatalog engine. This allows users to query Iceberg tables registered in an existing Hive metastore directly, enabling metadata-driven discovery and integration with managed lakehouse systems without manual table definitions in ClickHouse.',
    category: 'data-lakes',
    url: 'https://clickhouse.com/blog/clickhouse-release-25-05#hive-metastore-catalog-for-iceberg'
  },
  {
    id: 'lake-geo-parquet-types-25-5',
    year: 2025, month: 5,
    title: 'Geo Types in Parquet',
    summary: 'Improved geospatial interoperability enables better handling of spatial columns stored in Parquet format.',
    details: 'In 25.05, ClickHouse improved geospatial interoperability by adding geo type support in Parquet, enabling better handling of spatial columns stored in Parquet format. This makes queries involving geospatial Parquet data more natural and efficient.',
    category: 'data-lakes',
    url: 'https://clickhouse.com/blog/clickhouse-release-25-05#geo-types-in-parquet'
  },
  {
    id: 'lake-iceberg-time-travel-25-4',
    year: 2025, month: 4,
    title: 'Apache Iceberg Time Travel',
    summary: 'Time travel queries allow users to query historical snapshots of Iceberg datasets, enabling temporal analytics on lakehouse data.',
    details: 'In 25.04, ClickHouse enhanced its Iceberg support with time travel queries, which allow users to query historical snapshots of Iceberg datasets stored in object storage. This feature enables analysis over the evolution of a dataset and simplifies temporal analytics on lakehouse data.',
    category: 'data-lakes',
    url: 'https://clickhouse.com/blog/clickhouse-release-25-04#apache-iceberg-time-travel'
  },
  {
    id: 'lake-glue-unity-25-3',
    year: 2025, month: 3,
    title: 'AWS Glue and Unity Catalogs Integration',
    summary: 'ClickHouse can now discover and query Iceberg and Delta Lake tables registered in AWS Glue Catalog and Unity Catalog.',
    details: 'In 25.03, ClickHouse expanded data lake catalog integration by supporting AWS Glue Catalog and Unity Catalog through the DataLakeCatalog table engine. This lets ClickHouse discover and query Iceberg and Delta Lake tables registered in these catalogs as if they were native databases, greatly improving interoperability with modern lakehouse metadata services.',
    category: 'data-lakes',
    url: 'https://clickhouse.com/blog/clickhouse-release-25-03#aws-glue-and-unity-catalogs'
  },
  {
    id: 'lake-bloom-parquet-25-2',
    year: 2025, month: 2,
    title: 'Writing Bloom Filters for Parquet',
    summary: 'ClickHouse can now write Bloom filters into Parquet files, enabling efficient predicate pushdown during Parquet reads.',
    details: 'In 25.02, ClickHouse introduced the ability to write Bloom filters into Parquet files, enabling more efficient predicate pushdown during Parquet reads. This helps accelerate selective queries over large Parquet datasets commonly found in data lake environments.',
    category: 'data-lakes',
    url: 'https://clickhouse.com/blog/clickhouse-release-25-02#writing-bloom-filters-for-parquet'
  },
  {
    id: 'lake-delta-rust-25-2',
    year: 2025, month: 2,
    title: 'Integration with Delta Rust Kernel',
    summary: 'The Delta Rust kernel integration expands ClickHouse\'s ability to read Delta Lake datasets with robust format support.',
    details: 'In 25.02, the release added integration with the Delta Rust kernel, allowing better compatibility with Delta Lake format files. This expands ClickHouse\'s ability to read Delta Lake datasets stored in object storage with robust format support aligned with the official Delta Lake implementation.',
    category: 'data-lakes',
    url: 'https://clickhouse.com/blog/clickhouse-release-25-02#integration-with-the-delta-rust-kernel'
  },
  {
    id: 'lake-iceberg-rest-24-12',
    year: 2024, month: 12,
    title: 'Iceberg REST Catalog and Schema Evolution Support',
    summary: 'ClickHouse supports Iceberg REST catalog discovery and schema evolution metadata, enabling Unity and Polaris catalog integration.',
    details: 'In 24.12, ClickHouse introduced support for Iceberg REST catalog integrations and schema evolution metadata. This enables discovery and querying of Iceberg tables via REST catalog endpoints (such as Unity or Polaris), with built-in support for schema changes over time.',
    category: 'data-lakes',
    url: 'https://clickhouse.com/blog/clickhouse-release-24-12#iceberg-rest-catalog-and-schema-evolution-support'
  },
  {
    id: 'lake-archives-s3-24-5',
    year: 2024, month: 5,
    title: 'Reading from Archives on S3',
    summary: 'ClickHouse can read files inside ZIP and TAR archives stored on S3 without pre-extracting them.',
    details: 'In 24.05, ClickHouse expanded its external format capabilities by enabling the engine to read files contained inside archive formats (like ZIP and TAR) stored on S3 without pre-extracting them. This makes it easier to query archived datasets stored in data lakes.',
    category: 'data-lakes',
    url: 'https://clickhouse.com/blog/clickhouse-release-24-05#reading-from-archives-on-s3'
  },
  {
    id: 'lake-s3queue-ga-23-11',
    year: 2023, month: 11,
    title: 'S3Queue is Production Ready',
    summary: 'The S3Queue table engine reaches production status, enabling streaming ingestion of files from S3 directly into ClickHouse.',
    details: 'In 23.11, ClickHouse promoted the S3Queue table engine to production status, enabling streaming ingestion of files from S3 (or S3-compatible object storage) directly into ClickHouse. This simplifies building incremental ingestion pipelines from data lake storage without external ETL tooling.',
    category: 'data-lakes',
    url: 'https://clickhouse.com/blog/clickhouse-release-23-11#s3queue-is-production-ready'
  },
  {
    id: 'lake-files-23-8',
    year: 2023, month: 8,
    title: 'Files, Files, and More Files',
    summary: 'Advanced file metadata handling and row group skipping using Parquet file metadata accelerate scans on data lakes.',
    details: 'In 23.08, ClickHouse improved querying of external file formats by enabling more advanced file metadata handling, including virtual columns like _file and row group skipping using file metadata. This helps accelerate Parquet scans on data lakes by skipping irrelevant row groups and filtering data at the file level before expensive reads.',
    category: 'data-lakes',
    url: 'https://clickhouse.com/blog/clickhouse-release-23-08#files-files-and-more-files'
  },
  {
    id: 'lake-parquet-writing-23-7',
    year: 2023, month: 7,
    title: 'Parquet Writing Improvements',
    summary: 'More efficient Parquet file writing improves export performance and enhances interoperability with lakehouse tools.',
    details: 'In 23.07, ClickHouse upgraded its ability to write Parquet files more efficiently, which improves export performance to Parquet format and enhances interoperability with lakehouse tools and storage systems that leverage Parquet as a default format.',
    category: 'data-lakes',
    url: 'https://clickhouse.com/blog/clickhouse-release-23-07#parquet-writing-improvements-michael-kolupaev'
  },
  {
    id: 'lake-azure-function-23-5',
    year: 2023, month: 5,
    title: 'Azure Blob Storage Table Function',
    summary: 'The azureBlobStorage table function enables querying Parquet and other formats stored in Azure Blob Storage directly.',
    details: 'In 23.05, ClickHouse added the azureBlobStorage table function, enabling users to query Parquet (and other supported formats) stored in Azure Blob Storage directly from ClickHouse, expanding its data lake format support beyond S3.',
    category: 'data-lakes',
    url: 'https://clickhouse.com/blog/clickhouse-release-23-05#azure-table-function-alexander-sapin-smita-kulkarni'
  },
  {
    id: 'lake-parquet-faster-23-5',
    year: 2023, month: 5,
    title: 'Parquet Reading Even Faster',
    summary: 'Better parallel reads and format optimisations speed up data lake workloads involving Parquet files.',
    details: 'In 23.05, the release improved Parquet reading performance through better parallel reads and format optimisations, speeding up data lake workloads involving Parquet files and making ClickHouse a faster query engine over externally stored Parquet data.',
    category: 'data-lakes',
    url: 'https://clickhouse.com/blog/clickhouse-release-23-05#parquet-reading-even-faster-michael-kolupaev'
  },
  {
    id: 'lake-parallel-replicas-23-3',
    year: 2023, month: 3,
    title: 'Parallel Replicas',
    summary: 'Queries can now read from multiple replicas in parallel, improving throughput by better utilising all available replicas.',
    details: 'In ClickHouse 23.03, parallel replicas were introduced to allow reading from multiple replicas in parallel when running distributed queries. This enhancement improves throughput and query performance across replicated clusters by better utilising all available replicas instead of serially reading from one at a time.',
    category: 'data-lakes',
    url: 'https://clickhouse.com/blog/clickhouse-release-23-03#parallel-replicas-for-utilizing-the-full-power-of-your-replicas-nikita-mikhailov'
  },
  {
    id: 'lake-parallel-replicas-dynamic-23-3',
    year: 2023, month: 3,
    title: 'Parallel Replicas with Dynamic Shards',
    summary: 'Parallel replicas now support dynamic shard membership, distributing work across evolving cluster topologies without manual reconfiguration.',
    details: 'In 23.03, ClickHouse extended parallel replica behaviour to support dynamic shards, where shard membership can change at runtime without requiring manual reconfiguration. The query planner dynamically distributes work across evolving cluster topologies, enhancing reliability and performance in environments with elastic or variable replica sets.',
    category: 'data-lakes',
    url: 'https://clickhouse.com/blog/clickhouse-release-23-03#parallel-replicas-with-dynamic-shards-antonio-andelic'
  },
  {
    id: 'lake-iceberg-early-23-2',
    year: 2023, month: 2,
    title: 'Support for Apache Iceberg',
    summary: 'Early support for the Apache Iceberg table format enables reading Iceberg tables via table functions with schema and metadata handling.',
    details: 'In ClickHouse 23.02, early support for the Apache Iceberg table format was announced. This included the foundational ability to read Iceberg tables via table functions and enabled early schema and metadata handling for Iceberg in object stores, setting the stage for more advanced lakehouse features in later releases.',
    category: 'data-lakes',
    url: 'https://clickhouse.com/blog/clickhouse-release-23-02#iceberg-right-ahead—support-for-apache-iceberg-ucasfl'
  }
]
