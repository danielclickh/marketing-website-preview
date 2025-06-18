export default function formatStat(value: number): string {
  return Intl.NumberFormat('en', {
    notation: 'compact',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  })
    .format(value)
    .toLowerCase()
    .replace(/\.0+/, '')
}
