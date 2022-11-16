export type SpacerProps = {
  size?: string
}

// @ts-ignore
export const SuiSpacer = ({ ...SpacerProps }) => {
  const { size } = SpacerProps

  const sizeCalculator = (size: string) => {
    switch (size) {
      case 'xs':
        return 'h-1' // 4px
      case 'sm':
        return 'h-2' // 8px
      case 'md':
        return 'h-4' // 16px
      case 'lg':
        return 'h-8' // 24px
      case 'xl':
        return 'h-12' // 32px
      default:
        return 'h-4'
    }
  }

  return <div className={`flex w-full ${sizeCalculator(size)}`} />
}
