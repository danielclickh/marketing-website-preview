import React from 'react'

export default function IntegrationSupportPill({ label }: { label: string }) {
  label = label.trim().toLowerCase()

  const themes: Record<string, string> = {
    experimental: 'bg-amber-600 text-white',
    alpha: 'bg-amber-600 text-white',
    beta: 'bg-amber-800 text-white',
    new: 'bg-primary-500 text-white'
  }

  const colorTheme = themes[label] || 'bg-neutral-700 text-white'

  return (
    <span
      className={`inline-block rounded-full py-1 px-4 text-sm font-medium capitalize leading-none tracking-wide ${colorTheme}`}>
      {label}
    </span>
  )
}
