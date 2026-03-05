// Cumulative count of supported data types and formats per release month.
// Edit the `total` values to reflect the actual supported count for each release.
// Entries are newest-first. The x-axis of the chart plots these oldest → newest (left → right).

export interface DataTypesMonthly {
  year: number
  month: number
  // Cumulative total of data types and formats supported in this release
  total: number
}

export const DATA_TYPES_MONTHLY: DataTypesMonthly[] = [
  { year: 2026, month:  2, total: 71 },
  { year: 2026, month:  1, total: 71 },
  { year: 2025, month: 12, total: 67 },
  { year: 2025, month: 11, total: 67 },
  { year: 2025, month: 10, total: 67 },
  { year: 2025, month:  9, total: 64 },
  { year: 2025, month:  8, total: 64 },
  { year: 2025, month:  7, total: 63 },
  { year: 2025, month:  6, total: 62 },
  { year: 2025, month:  5, total: 61 },
  { year: 2025, month:  4, total: 60 },
  { year: 2025, month:  3, total: 60 },
  { year: 2025, month:  2, total: 59 },
  { year: 2025, month:  1, total: 59 },
  { year: 2024, month: 12, total: 59 },
  { year: 2024, month: 11, total: 56 },
  { year: 2024, month: 10, total: 55 },
  { year: 2024, month:  9, total: 55 },
  { year: 2024, month:  8, total: 53 },
  { year: 2024, month:  7, total: 52 },
  { year: 2024, month:  6, total: 52 },
  { year: 2024, month:  5, total: 52 },
  { year: 2024, month:  4, total: 51 },
  { year: 2024, month:  3, total: 51 },
  { year: 2024, month:  2, total: 51 },
  { year: 2024, month:  1, total: 48 },
  { year: 2023, month: 12, total: 46 },
  { year: 2023, month: 11, total: 46 },
  { year: 2023, month: 10, total: 46 },
  { year: 2023, month:  9, total: 45 },
  { year: 2023, month:  8, total: 44 },
  { year: 2023, month:  7, total: 43 },
  { year: 2023, month:  6, total: 42 },
  { year: 2023, month:  5, total: 42 },
  { year: 2023, month:  4, total: 42 },
  { year: 2023, month:  3, total: 42 },
  { year: 2023, month:  2, total: 42 },
  { year: 2023, month:  1, total: 42 },
  { year: 2022, month: 12, total: 42 },
  { year: 2022, month: 11, total: 40 },
  { year: 2022, month: 10, total: 40 },
  { year: 2022, month:  9, total: 40 },
  { year: 2022, month:  8, total: 40 },
  { year: 2022, month:  7, total: 40 },
  { year: 2022, month:  6, total: 40 },
  { year: 2022, month:  5, total: 40 },
  { year: 2022, month:  4, total: 40 },
  { year: 2022, month:  3, total: 40 },
  { year: 2022, month:  2, total: 40 },
  { year: 2022, month:  1, total: 40 },
]
