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

export function getOrdinal(value: number) {
  const suffixes = ['th', 'st', 'nd', 'rd']
  const remainder = value % 100

  return suffixes[(remainder - 20) % 10] || suffixes[remainder] || suffixes[0]
}
