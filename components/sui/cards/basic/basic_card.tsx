import { SuiTitle, SuiText } from '../../typography'
import { SuiButton } from '../../buttons/button'
import { SuiPanel } from '../../panel'

type CardProps = {
  title: string
  description: string
  icon?: any
  buttonTitle?: string
  buttonPath?: string
  hasBorder?: boolean
  color?: string
}

export function SuiCard(props: CardProps) {
  const {
    icon,
    title,
    description,
    buttonTitle,
    buttonPath,
    hasBorder,
    color
  } = props
  return (
    <SuiPanel
      padding='lg'
      border={hasBorder}
      color={color}
      className='flex hover:shadow-md duration-300'>
      <div className='flex flex-col'>
        {icon && (
          <div className='bg-primary w-12 h-12 p-2 rounded-lg mb-4'>{icon}</div>
        )}
        <SuiTitle type='h4'>{title}</SuiTitle>
        <SuiText size='sm' weight='normal' color='secondary'>
          {description}
        </SuiText>
        {buttonTitle && (
          <div className='flex space-x-4 items-end flex-wrap'>
            <div className='flex flex-grow-0'>
              <SuiButton color='dark' title={buttonTitle} path={buttonPath} />
            </div>
          </div>
        )}
      </div>
    </SuiPanel>
  )
}
