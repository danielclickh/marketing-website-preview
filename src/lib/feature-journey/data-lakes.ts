// Word cloud configuration for the Data Lakes category panel.
// Each release entry lists the terms that become visible from that release onward.
// size: 1 (smallest) → 10 (largest). Terms accumulate — once added they persist.

export interface DataLakeTerm {
  word: string
  size: number // 1–10
}

export interface DataLakesRelease {
  year: number
  month: number
  terms: DataLakeTerm[]
}

// Terms are additive: the word cloud shows all terms whose release date ≤ the active month.
export const DATA_LAKES_RELEASES: DataLakesRelease[] = [
  // ── Baseline: initial lake storage & format support present from the start ──
  {
    year: 2022,
    month: 1,
    terms: [
      { word: 'S3',        size: 9 },
      { word: 'Parquet',   size: 8 },
      { word: 'HDFS',      size: 7 },
      { word: 'ORC',       size: 6 },
      { word: 'Arrow',     size: 5 },
      { word: 'Avro',      size: 4 },
      { word: 'GCS',       size: 5 },
      { word: 'HIVE',      size: 3 },
      { word: 'CSV',       size: 2 },
      { word: 'TSV',       size: 2 },
    ],
  },

  // ── 2023/2: Support for Apache Iceberg ──
  {
    year: 2023,
    month: 2,
    terms: [
      { word: 'Iceberg',       size: 10 },
      { word: 'Catalog',       size:  6 },
      { word: 'Snapshots',     size:  4 },
    ],
  },

  // ── 2023/3: Parallel Replicas ──
  {
    year: 2023,
    month: 3,
    terms: [
      { word: 'Parallel Replicas', size: 7 },
      { word: 'Distributed Reads', size: 5 },
      { word: 'Dynamic Shards',    size: 4 },
    ],
  },

  // ── 2023/5: Azure Blob Storage + Parquet Reading ──
  {
    year: 2023,
    month: 5,
    terms: [
      { word: 'Azure Blob',      size: 8 },
      { word: 'Table Functions', size: 5 },
      { word: 'Vectorized Reads', size: 4 },
    ],
  },

  // ── 2023/7: Parquet Writing ──
  {
    year: 2023,
    month: 7,
    terms: [
      { word: 'Column Pruning', size: 5 },
      { word: 'Compression',    size: 4 },
      { word: 'Row Groups',     size: 3 },
    ],
  },

  // ── 2023/8: Files, Files, and More Files ──
  {
    year: 2023,
    month: 8,
    terms: [
      { word: 'Glob Patterns', size: 5 },
      { word: 'S3 Paths',      size: 4 },
      { word: 'Remote Files',  size: 3 },
    ],
  },

  // ── 2023/11: S3Queue Production Ready ──
  {
    year: 2023,
    month: 11,
    terms: [
      { word: 'S3Queue',    size: 8 },
      { word: 'Streaming',  size: 6 },
      { word: 'Event-driven', size: 4 },
    ],
  },

  // ── 2024/5: Reading from Archives on S3 ──
  {
    year: 2024,
    month: 5,
    terms: [
      { word: 'Archives', size: 5 },
      { word: 'ZIP',      size: 3 },
      { word: 'TAR',      size: 3 },
    ],
  },

  // ── 2024/12: Iceberg REST Catalog + Schema Evolution ──
  {
    year: 2024,
    month: 12,
    terms: [
      { word: 'REST Catalog',    size: 8 },
      { word: 'Schema Evolution', size: 7 },
      { word: 'Iceberg v2',      size: 6 },
    ],
  },

  // ── 2025/2: Bloom Filters for Parquet + Delta Rust Kernel ──
  {
    year: 2025,
    month: 2,
    terms: [
      { word: 'Delta Lake',   size: 9 },
      { word: 'Delta Kernel', size: 6 },
      { word: 'Bloom Filters', size: 5 },
    ],
  },

  // ── 2025/3: AWS Glue + Unity Catalog ──
  {
    year: 2025,
    month: 3,
    terms: [
      { word: 'AWS Glue',     size: 7 },
      { word: 'Unity Catalog', size: 7 },
      { word: 'Databricks',   size: 5 },
    ],
  },

  // ── 2025/4: Apache Iceberg Time Travel ──
  {
    year: 2025,
    month: 4,
    terms: [
      { word: 'Time Travel',    size: 8 },
      { word: 'Version History', size: 5 },
    ],
  },

  // ── 2025/5: Hive Metastore Catalog + Geo Types in Parquet ──
  {
    year: 2025,
    month: 5,
    terms: [
      { word: 'Hive Metastore', size: 7 },
      { word: 'Geo Types',      size: 5 },
      { word: 'GeoParquet',     size: 5 },
    ],
  },

  // ── 2025/6: JSON in Parquet + iceberg_history system table ──
  {
    year: 2025,
    month: 6,
    terms: [
      { word: 'JSON Parquet',   size: 5 },
      { word: 'iceberg_history', size: 4 },
      { word: 'System Tables',  size: 3 },
    ],
  },

  // ── 2025/7: Native Geo Parquet Types ──
  {
    year: 2025,
    month: 7,
    terms: [
      { word: 'GeoArrow',    size: 5 },
      { word: 'WKB',         size: 3 },
      { word: 'Spatial Data', size: 4 },
    ],
  },

  // ── 2025/8: Parquet Reader v3 + Iceberg DML + Azure Performance ──
  {
    year: 2025,
    month: 8,
    terms: [
      { word: 'Parquet v3',     size: 7 },
      { word: 'DML Operations', size: 7 },
      { word: 'INSERT SELECT',  size: 4 },
      { word: 'Azure CDN',      size: 4 },
    ],
  },

  // ── 2025/9: S3 Storage Class Specification ──
  {
    year: 2025,
    month: 9,
    terms: [
      { word: 'Storage Classes',         size: 6 },
      { word: 'Intelligent-Tiering',     size: 4 },
      { word: 'Cold Storage',            size: 3 },
    ],
  },
]
