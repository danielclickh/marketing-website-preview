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
    case 'c1':
      return 'text-c1'
    case 'c2':
      return 'text-c2'
    case 'c3':
      return 'text-c3'
    case 'c4':
    case 'secondary':
      return 'text-c4'
    case 'c4-10':
      return 'text-c4/10'
    case 'c4-20':
      return 'text-c4/20'
    case 'c5':
    case 'primary':
      return 'text-c5'
    case 'c6':
      return 'text-c6'
    case 'c7':
      return 'text-c7'
    case 'white':
      return 'text-c1-light'
    case 'c5-light':
      return 'text-c5-light'
    case 'offWhite':
      return 'text-c2-light'
    case 'c4-light':
      return 'text-c4-light'
    case 'c4-dark':
      return 'text-c4-dark'
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
