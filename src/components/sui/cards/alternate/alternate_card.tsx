import { SuiPanel } from '../../panel'
import SuiButton from '../../SuiButton'
import { SuiText, SuiTitle } from '../../typography'

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
      className='flex duration-300 hover:shadow-md'>
      <div className='flex flex-col text-center'>
        <SuiTitle type='h4'>{title}</SuiTitle>
        <div className='mx-auto mt-4 flex h-1.5 w-16 rounded-md bg-c6' />
        <SuiText size='sm' weight='normal' color='secondary'>
          {description}
        </SuiText>
        {buttonTitle && (
          <div className='flex flex-wrap items-end space-x-4'>
            <div className='flex flex-grow-0'>
              <SuiButton type='empty' color='primary' path={buttonPath}>
                {buttonTitle}
              </SuiButton>
            </div>
          </div>
        )}
        {icon && <div className='mt-4 flex justify-center'>{icon}</div>}
      </div>
    </SuiPanel>
  )
}
