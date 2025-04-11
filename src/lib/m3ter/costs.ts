// TODO: Check this logic is correct. It is based on the quoted prices on https://clickhouse.com/pricing

// Storage unit price is per minute so we need the number of minutes in a month,
// using 30.41 as the average number of days per month.
const AVG_DAYS_PER_MONTH = 30.41
const MINUTES_PER_MONTH = AVG_DAYS_PER_MONTH * 24 * 60

export const calculateStorageCost = (
  unitPrice: number,
  storage: number
): number => storage * MINUTES_PER_MONTH * unitPrice

export const calculateComputeCost = (
  unitPrice: number,
  memory: number,
  hours: number
) => {
  // Unit price is based on units (memory / 8) per minute.
  const minutesConsumed = hours * 60 * AVG_DAYS_PER_MONTH
  return (memory / 8) * minutesConsumed * unitPrice
}
