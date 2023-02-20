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
  hasShadow?: boolean
  color?: string
}

export function SuiAlternateCard(props: CardProps) {
  const {
    icon,
    title,
    description,
    buttonTitle,
    buttonPath,
    hasBorder,
    hasShadow,
    color
  } = props
  return (
    <SuiPanel
      padding='lg'
      border={hasBorder}
      shadow={hasShadow}
      color={color}
      className='flex hover:shadow-md duration-300'>
      <div className='flex flex-col text-center'>
        <SuiTitle type='h4'>{title}</SuiTitle>
        <div className='bg-c6 h-1.5 w-16 rounded-md flex mx-auto mt-4' />
        <SuiText size='sm' weight='normal' color='secondary'>
          {description}
        </SuiText>
        {buttonTitle && (
          <div className='flex space-x-4 items-end flex-wrap'>
            <div className='flex flex-grow-0'>
              <SuiButton type='empty' color='primary' path={buttonPath}>
                {buttonTitle}
              </SuiButton>
            </div>
          </div>
        )}
        {icon && <div className='flex justify-center mt-4'>{icon}</div>}
      </div>
    </SuiPanel>
  )
}
