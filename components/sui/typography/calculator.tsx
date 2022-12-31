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
      return 'text-white'
    case 'gunmetal':
      return 'text-gunmetal'
    case 'offWhite':
      return 'text-cultured'
    case 'c4-light':
      return 'text-auro_metal_saurus'
    case 'c4-dark':
      return 'text-philippine_silver'
    case 'success':
      return 'text-text-success'
    case 'warning':
      return 'text-text-warning'
    case 'danger':
      return 'text-text-danger'
    case 'info':
      return 'text-text-info'
    default:
      return defaultColor ?? 'text-inherit'
  }
}
