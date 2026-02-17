export function convertDateToString(value: string | Date): string {
  return new Date(value).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC'
  })
}

export function convertTimeToString(
  value: string,
  timeZone: string = 'UTC'
): string {
  return new Date(value).toLocaleString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZoneName: 'short',
    timeZone
  })
}

export function startOfToday() {
  const startOfToday = new Date()
  startOfToday.setHours(0, 0, 0, 0)
  return startOfToday
}

export function endOfToday() {
  const endOfToday = new Date()
  endOfToday.setHours(23, 59, 59, 999)
  return endOfToday
}

/**
 * Calculate the number of days between two dates
 * @param targetDate - The target date to compare
 * @param fromDate - The base date to compare from (defaults to today)
 * @returns The number of days difference (positive for future, negative for past)
 */
export function getDaysDifference(
  targetDate: Date | string,
  fromDate: Date = new Date()
): number {
  const baseDate = new Date(fromDate)
  baseDate.setHours(0, 0, 0, 0)

  const target = new Date(targetDate)
  target.setHours(0, 0, 0, 0)

  return Math.floor(
    (target.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24)
  )
}

/**
 * Get a relative date status text based on the days difference
 * @param targetDate - The target date to get status for
 * @returns A string like "Coming soon", "Tomorrow", "In 2 days", or "Available"
 */
export function getRelativeDateStatus(targetDate: Date | string): string {
  const daysDiff = getDaysDifference(targetDate)

  if (daysDiff === 0) {
    return 'Coming soon'
  } else if (daysDiff === 1) {
    return 'Tomorrow'
  } else if (daysDiff > 1) {
    return `In ${daysDiff} days`
  } else {
    return 'Available'
  }
}
