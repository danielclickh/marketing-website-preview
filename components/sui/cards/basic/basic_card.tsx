import { SuiText } from '../../typography'
import SuiButton from '../../SuiButton'
import { SuiPanel } from '../../panel'
import { ArrowRightIcon } from '@heroicons/react/solid'
import { ReactNode } from 'react'

type CardProps = {
  title: string
  pretitle?: string
  description: string
  icon?: any
  buttonTitle?: string
  buttonTarget?: string
  buttonPath?: string
  color?: string
  className?: string
  direction?: 'left' | 'right'
  children?: ReactNode
}

export function SuiCard(props: CardProps) {
  const {
    icon,
    title,
    description,
    buttonTitle,
    buttonPath,
    buttonTarget,
    color,
    className,
    direction,
    pretitle,
    children
  } = props

  const line =
    direction === 'left'
      ? 'mr-auto'
      : direction === 'right'
      ? 'ml-auto'
      : 'mx-auto'
  const headerAlign =
    direction === 'left'
      ? 'text-left'
      : direction === 'right'
      ? 'text-right'
      : 'text-center'
  return (
    <SuiPanel
      padding='lg'
      color={color}
      isRounded
      className={`flex h-full shadow-card hover:shadow-card-3xl duration-300 ${className}`}>
      <div className='flex flex-col justify-between h-full'>
        <div>
          {pretitle && (
            <SuiText
              size='xs'
              weight='bold'
              color='secondary'
              className='mb-6 uppercase'>
              {pretitle}
            </SuiText>
          )}
          {icon && (
            <div
              className={`bg-c2 w-12 h-12 grid place-items-center rounded-lg mb-4 ${line}`}>
              {icon}
            </div>
          )}
          <SuiText size='lg' weight='bold' className={headerAlign}>
            {title}
          </SuiText>
          <div className={`bg-c6 h-1 w-16 rounded-md flex ${line} mt-4 mb-6`} />
          <SuiText size='sm' weight='normal' color='secondary'>
            {description}
          </SuiText>
        </div>
        {children}
        {buttonTitle && (
          <SuiButton
            type='empty'
            color='primary'
            path={buttonPath}
            className='mx-auto w-full'
            target={buttonTarget}>
            {buttonTitle}
            <ArrowRightIcon height='16' />
          </SuiButton>
        )}
      </div>
    </SuiPanel>
  )
}
