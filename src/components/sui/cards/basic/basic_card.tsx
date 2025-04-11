import SuiButton from '../../SuiButton'
import { SuiPanel } from '../../panel'
import { SuiText } from '../../typography'
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
      className={`hover:shadow-card-3xl flex h-full shadow-card duration-300 ${className}`}>
      <div className='flex h-full flex-col justify-between'>
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
              className={`mb-4 grid h-12 w-12 place-items-center rounded-lg bg-c2 ${line}`}>
              {icon}
            </div>
          )}
          <SuiText size='lg' weight='bold' className={headerAlign}>
            {title}
          </SuiText>
          <div className={`flex h-1 w-16 rounded-md bg-c6 ${line} mb-6 mt-4`} />
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
