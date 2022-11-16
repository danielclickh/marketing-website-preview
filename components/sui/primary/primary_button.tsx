import { forwardRef } from 'react'
import Link from 'next/link'
import { RefreshIcon } from '@heroicons/react/outline'
type ButtonProps = {
  title: string
  icon?: boolean
  iconType?: string
  path?: any
  onClick?: any
  bgColour?: string
  disabled?: boolean
}

export function PrimaryButton(props: ButtonProps) {
  const bgColour = props.bgColour ? props.bgColour : 'bg-primary'
  const ButtonContent = () => {
    const opacityLevel = props.disabled ? 'opacity-60' : 'opacity-100'
    const hoverEffects = props.disabled
      ? 'cursor-default'
      : 'hover:bg-primary_muted hover:transition-all hover:-translate-y-px'

    return (
      <>
        <Link href={props.path} passHref>
          <button
            onClick={props.onClick}
            disabled={props.disabled ? true : false}
            className={`${bgColour} ${opacityLevel} ${hoverEffects} text-sm font-medium text-center text-white dark:text-gray-800 p-2 w-full rounded-md mt-4 duration-300`}>
            <span className='flex justify-center'>
              {props.icon && <RefreshIcon className='w-4 mr-2' />}
              {props.title}
            </span>
          </button>
        </Link>
      </>
    )
  }

  return (
    <>
      <ButtonContent />
    </>
  )
}
