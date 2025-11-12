import { EventPropsOf } from '@/types/global'

export interface VideoPlayButtonProps extends EventPropsOf<'button'> {
  loading?: boolean
  eyebrow?: string
  label?: string
  className?: string
}

export default function VideoPlayButton({
  loading,
  eyebrow,
  label,
  className = '',
  ...props
}: VideoPlayButtonProps) {
  return (
    <button
      className={`group/playButton w-max cursor-pointer rounded-full p-0.5 shadow-lg backdrop-blur-lg backdrop-brightness-150 transition-shadow duration-300 hover:shadow-xl ${className}`}
      {...props}>
      <span className='flex items-center rounded-full bg-neutral-750/95 transition-colors duration-300 group-hover/playButton:bg-neutral-750'>
        <span className='flex aspect-square w-20 flex-shrink-0 flex-grow-0 items-center justify-center text-primary-300'>
          {!loading && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='25'
              height='28'
              fill='none'
              className='ml-1'>
              <path
                fill='currentColor'
                d='M24 12.27a2 2 0 0 1 0 3.46L3.75 27.43a2 2 0 0 1-3-1.74V2.31a2 2 0 0 1 3-1.73L24 12.27Z'
              />
            </svg>
          )}
          {loading && (
            <div className='m-auto aspect-square w-10 animate-spin rounded-full border-4 border-primary-300/20 border-t-primary-300' />
          )}
        </span>
        {label && (
          <span className='flex flex-shrink-0 flex-grow-0 flex-col items-start pr-8'>
            {eyebrow && (
              <span className='text-sm text-neutral-200 md:text-base'>
                {eyebrow}
              </span>
            )}
            <span className='font-bold text-white md:text-lg'>{label}</span>
          </span>
        )}
      </span>
    </button>
  )
}
