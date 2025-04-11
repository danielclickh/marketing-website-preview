import { TwitterCardProps } from './types'
import Image from 'next/image'

function TwitterCard({
  src,
  children,
  name,
  twitterId,
  className = '',
  ...props
}: TwitterCardProps) {
  return (
    <div
      className={`bg-noised flex flex-col gap-8 rounded border border-rangitoto p-6 pt-4 hover:border-primary hover:shadow-click-twitter ${className}`}
      {...props}>
      <div className='flex w-full items-center gap-4'>
        <Image
          src={src}
          alt={`Avatar for ${twitterId}`}
          className='aspect-square h-16 w-16 rounded-full'
        />
        <div className='flex flex-col overflow-hidden text-ellipsis whitespace-nowrap'>
          <div className='overflow-hidden text-ellipsis' title={name}>
            {name}
          </div>
          <div className='overflow-hidden text-ellipsis' title={twitterId}>
            {twitterId}
          </div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  )
}

export default TwitterCard
