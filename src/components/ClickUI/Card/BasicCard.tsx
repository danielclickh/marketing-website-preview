import Button from '../Button'
import { BasicCardProps } from './types'
import Image from 'next/image'

function BasicCard({
  title,
  children,
  icon,
  className,
  btnType,
  href,
  target = '_self',
  btnChildren
}: BasicCardProps) {
  return (
    <div
      className={`relative flex flex-col items-center justify-between rounded bg-neutral-900/70 p-6 ${className}`}>
      <div className='basic-card-content-container flex flex-col items-center'>
        {icon && (
          <Image
            className='basic-card-icon mb-4'
            src={icon}
            width={64}
            height={64}
            alt={`Image for ${title}`}
          />
        )}
        <div className='basic-card-title text-xl text-neutral-0'>{title}</div>
        <div className='basic-card-description mt-2 text-sm text-neutral-200'>
          {children}
        </div>
      </div>
      {btnChildren && (
        <Button
          type={btnType ?? 'primary'}
          weight='semibold'
          className='basic-card-btn mt-6 w-full'
          linkClass='w-full'
          href={href}
          target={target}>
          {btnChildren}
        </Button>
      )}
    </div>
  )
}

export default BasicCard
