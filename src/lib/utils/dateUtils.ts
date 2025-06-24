export function convertDateToString(value: string): string {
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
