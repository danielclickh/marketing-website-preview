// Stack layers for the Data Lifecycle Operations panel.
// Sorted oldest → newest — this is the order they stack bottom to top.
// Each layer gets a uniform height (value: 1); the chart recalculates the
// gradient so the topmost visible layer is always the brightest yellow.

export interface LifecycleStackLayer {
  id: string
  name: string   // short label shown inside the stack segment
  year: number
  month: number
  value: number  // relative segment height — keep uniform unless you want weighted segments
}

export const DATA_LIFECYCLE_STACK: LifecycleStackLayer[] = [
  { id: 'dl-insert-retries-22-11',         name: 'Insert Retries',               year: 2022, month: 11, value: 1 },
  { id: 'dl-lightweight-deletes-ga-23-3',  name: 'Lightweight Deletes GA',       year: 2023, month:  3, value: 1 },
  { id: 'dl-adaptive-async-inserts-24-2',  name: 'Adaptive Async Inserts',       year: 2024, month:  2, value: 1 },
  { id: 'dl-lightweight-updates-oss-24-2', name: 'Lightweight Updates OSS',      year: 2024, month:  2, value: 1 },
  { id: 'dl-merge-tables-25-1',            name: 'Better Merge Tables',          year: 2025, month:  1, value: 1 },
  { id: 'dl-backup-engine-25-2',           name: 'Backup Engine',                year: 2025, month:  2, value: 1 },
  { id: 'dl-snapshot-25-6',               name: 'Consistent Snapshots',         year: 2025, month:  6, value: 1 },
  { id: 'dl-lightweight-updates-25-7',    name: 'Lightweight Updates & Deletes', year: 2025, month:  7, value: 1 },
  { id: 'dl-late-mat-secondary-25-10',    name: 'Late Materialisation',         year: 2025, month: 10, value: 1 },
  { id: 'dl-dedup-async-26-1',            name: 'Async Insert Deduplication',   year: 2026, month:  1, value: 1 },
]
