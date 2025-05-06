type PanelProps = {
  color?: string
  shadow?: boolean
  isRounded?: boolean
  border?: boolean
  padding?: string
  className?: string
  children: any
}

export function SuiPanel(props: PanelProps) {
  const className = props.className
  const bgColour = props.color ? props.color : 'bg-c1'
  const shadow = props.shadow ? 'shadow-card' : ''
  const border = props.border ? 'border border-c4/10' : ''

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
        className={`${bgColour} ${shadow} ${border} w-full ${paddingCalculator(
          props.padding
        )} duration-300 ease-in-out ${
          props.isRounded ? 'rounded-lg' : 'rounded-none'
        } ${className}`}>
        {props.children}
      </div>
    </>
  )
}
