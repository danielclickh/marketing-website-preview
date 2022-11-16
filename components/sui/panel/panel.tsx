type PanelProps = {
  color?: string
  shadow?: boolean
  border?: boolean
  padding?: string
  className?: string
  children: any
}

export function SuiPanel(props: PanelProps) {
  const className = props.className
  const bgColour = props.color
    ? props.color
    : 'bg-light-grey2 dark:bg-dark-grey4'
  const shadow = props.shadow ? 'shadow-lg' : ''
  const border = props.border
    ? 'border border-light-grey4 dark:border-dark-grey4'
    : ''

  const paddingCalculator = (padding: string | undefined) => {
    switch (padding) {
      case 'none':
        return 'p-0'
      case 'sm':
        return 'px-4 py-2'
      case 'md':
        return 'p-4'
      case 'lg':
        return 'p-6'
      case 'xl':
        return 'p-8'
      default:
        return 'p-4'
    }
  }

  return (
    <>
      <div
        className={`${bgColour} ${shadow} ${border} ${className} w-full ${paddingCalculator(
          props.padding
        )} rounded-lg`}>
        {props.children}
      </div>
    </>
  )
}
