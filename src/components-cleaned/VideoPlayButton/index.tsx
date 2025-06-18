import { EventPropsOf } from '@/types/global'

export interface VideoPlayButtonProps extends EventPropsOf<'button'> {
  loading?: boolean
  eyebrow?: string
  label?: string
}

export default function VideoPlayButton({
  loading,
  eyebrow,
  label,
  ...props
}: VideoPlayButtonProps) {
  return (
    <button
      className='flex h-20 w-max cursor-pointer items-center rounded-full bg-neutral-750/95 shadow-lg backdrop-blur transition hover:bg-neutral-750 hover:shadow-xl'
      {...props}>
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
          {eyebrow && <span className='text-neutral-200'>{eyebrow}</span>}
          <span className='text-lg font-bold'>{label}</span>
        </span>
      )}
    </button>
  )
}
