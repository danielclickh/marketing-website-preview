export const sizeCalculator = (size?: string, weight?: string) => {
  switch (size) {
    case 'lg':
      return `text-lg font-${weight}`
    case 'base':
      return `text-base font-${weight === 'bold' ? 'semibold' : weight}`
    case 'sm':
      return `text-sm font-${weight === 'bold' ? 'semibold' : weight}`
    case 'xs':
      return `text-xs font-${weight === 'bold' ? 'semibold' : weight}`
    default:
      return 'text-base font-normal'
  }
}

export const colorCalculator = (color: string, defaultColor?: string) => {
  switch (color) {
    case 'secondary':
      return 'text-neutral-200'
    case 'primary':
      return 'text-neutral-0'
    case 'white':
      return 'text-neutral-0'
    case 'text-default':
      return 'text-neutral-900'
    case 'text-muted':
      return 'text-neutral-200'
    case 'text-accent':
      return 'text-primary'
    case 'success':
      return 'text-alerts-success-text'
    case 'warning':
      return 'text-alerts-warning-text'
    case 'danger':
      return 'text-alerts-danger-text'
    case 'info':
      return 'text-alerts-info-text'
    default:
      return defaultColor ?? 'text-inherit'
  }
}
