export const sizeCalculator = (size: string) => {
  switch (size) {
    case 'sm':
      return 'text-xs leading-6' // 0.75rem / 12px
    case 'base':
      return 'text-sm leading-6' // 0.875rem / 14px
    case 'lg':
      return 'text-base leading-6' // 1rem / 16px
    case 'xl':
      return 'text-lg leading-7' // 1.125rem / 18px
    default:
      return 'text-sm leading-6'
  }
}

export const colourCalculator = (color: string, defaultColor: string) => {
  switch (color) {
    case 'darkest':
      return 'text-gunmetal dark:text-white'
    case 'lightest':
      return 'text-white dark:text-gunmetal'
    case 'white':
      return 'text-white'
    case 'offWhite':
      return 'text-cultured'
    case 'dark':
      return 'text-web-light-c4 dark:text-web-dark-c4'
    case 'neutral':
      return 'text-arsenic dark:text-arsenic'
    case 'purple':
      return 'text-arsenic'
    case 'light_purple':
      return 'text-text-light_purple'
    case 'light':
      return 'text-text-light'
    case 'success':
      return 'text-text-success'
    case 'warning':
      return 'text-text-warning'
    case 'danger':
      return 'text-text-danger'
    case 'info':
      return 'text-text-info'
    case 'primary':
      return 'text-primary'
    case 'none':
      return ''
    default:
      return defaultColor
  }
}
