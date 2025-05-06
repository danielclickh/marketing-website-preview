export default function IntegrationSupportPill({ label }: { label: string }) {
  label = label.trim().toLowerCase()

  const themes: Record<string, string> = {
    experimental: 'bg-amber-600 text-white',
    alpha: 'bg-amber-600 text-white',
    beta: 'bg-amber-800 text-white',
    new: 'bg-primary-300 text-primary-900'
  }

  const colorTheme = themes[label] || 'bg-neutral-700 text-white'

  return (
    <span
      className={`inline-block rounded-full px-4 py-1 text-sm font-medium capitalize leading-none tracking-wide ${colorTheme}`}>
      {label}
    </span>
  )
}
