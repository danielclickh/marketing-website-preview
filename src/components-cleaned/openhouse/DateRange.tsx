import { getOrdinal } from '@/lib/utils/numbers'

export interface OpenhouseDateRangeProps {
  start: Date
  end: Date
  dayFormat?:
    | Intl.DateTimeFormatOptions['day']
    | 'numeric-ordinal'
    | '2-digit-ordinal'
  monthFormat?: Intl.DateTimeFormatOptions['month']
  yearFormat?: Intl.DateTimeFormatOptions['year']
}

export default function OpenhouseDateRange({
  start,
  end,
  dayFormat = 'numeric',
  monthFormat = 'short',
  yearFormat = 'numeric'
}: OpenhouseDateRangeProps) {
  const ordinal =
    dayFormat === '2-digit-ordinal' || dayFormat === 'numeric-ordinal'

  if (dayFormat === '2-digit-ordinal') dayFormat = '2-digit'
  if (dayFormat === 'numeric-ordinal') dayFormat = 'numeric'

  const startDay = start.toLocaleString('en-US', {
    day: dayFormat,
    timeZone: 'UTC'
  })
  const endDay = end.toLocaleString('en-US', {
    day: dayFormat,
    timeZone: 'UTC'
  })
  const startMonth = start.toLocaleString('en-US', {
    month: monthFormat,
    timeZone: 'UTC'
  })
  const endMonth = end.toLocaleString('en-US', {
    month: monthFormat,
    timeZone: 'UTC'
  })
  const startYear = start.toLocaleString('en-US', {
    year: yearFormat,
    timeZone: 'UTC'
  })
  const endYear = end.toLocaleString('en-US', {
    year: yearFormat,
    timeZone: 'UTC'
  })

  const startOrdinal = ordinal ? getOrdinal(parseInt(startDay)) : null
  const endOrdinal = ordinal ? getOrdinal(parseInt(endDay)) : null

  if (startDay === endDay && startMonth === endMonth && startYear === endYear) {
    return (
      <>
        {startMonth} {startDay}
        {startOrdinal} {startYear}
      </>
    )
  }

  if (startDay !== endDay && startMonth === endMonth && startYear === endYear) {
    return (
      <>
        {startMonth} {startDay}
        {startOrdinal}
        {'-'}
        {endDay}
        {endOrdinal} {startYear}
      </>
    )
  }

  if (startDay !== endDay && startMonth !== endMonth && startYear === endYear) {
    return (
      <>
        {startMonth} {startDay}
        {startOrdinal}
        {'-'}
        {endMonth} {endDay}
        {endOrdinal} {startYear}
      </>
    )
  }

  return (
    <>
      {startMonth} {startDay}
      {startOrdinal} {startYear}
      {'-'}
      {endMonth} {endDay}
      {endOrdinal} {endYear}
    </>
  )
}
