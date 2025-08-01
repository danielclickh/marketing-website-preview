export interface OpenhouseDateRangeProps {
  start: Date
  end: Date
}

export default function OpenhouseDateRange({
  start,
  end
}: OpenhouseDateRangeProps) {
  const startDay = start.toLocaleString('en-US', {
    day: 'numeric',
    timeZone: 'UTC'
  })
  const endDay = end.toLocaleString('en-US', {
    day: 'numeric',
    timeZone: 'UTC'
  })
  const startMonth = start.toLocaleString('en-US', {
    month: 'short',
    timeZone: 'UTC'
  })
  const endMonth = end.toLocaleString('en-US', {
    month: 'short',
    timeZone: 'UTC'
  })
  const startYear = start.toLocaleString('en-US', {
    year: 'numeric',
    timeZone: 'UTC'
  })
  const endYear = end.toLocaleString('en-US', {
    year: 'numeric',
    timeZone: 'UTC'
  })

  if (startDay === endDay && startMonth === endMonth && startYear === endYear) {
    return (
      <>
        {startMonth} {startDay} {startYear}
      </>
    )
  }

  if (startDay !== endDay && startMonth === endMonth && startYear === endYear) {
    return (
      <>
        {startMonth} {startDay}
        {'-'}
        {endDay} {startYear}
      </>
    )
  }

  if (startDay !== endDay && startMonth !== endMonth && startYear === endYear) {
    return (
      <>
        {startMonth} {startDay}
        {'-'}
        {endMonth} {endDay} {startYear}
      </>
    )
  }

  return (
    <>
      {startMonth} {startDay} {startYear}
      {'-'}
      {endMonth} {endDay} {endYear}
    </>
  )
}
