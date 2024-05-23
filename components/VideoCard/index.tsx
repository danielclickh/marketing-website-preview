import Image from 'next/image'
import Link from 'next/link'
import { convertDateToString } from '../../lib/utils/dateUtils'
import VideoPlayButton from '../../public/images/VideoPlayButton'
import { CUICard } from '../ClickUI'
import { VideoCardProps } from './types'

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <Link
      href={`/videos/${video.slug}`}
      className='hover:scale-102 group transition ease-in-out hover:-translate-y-1 hover:no-underline'>
      <CUICard>
        <CUICard.Body>
          <div className='relative overflow-hidden rounded-t-lg'>
            <div className='absolute h-full w-full bg-black/[0.65] opacity-0 transition group-hover:opacity-100'></div>
            <Image
              src={video.thumbnail}
              alt={video.title}
              width={774}
              height={420}
            />

            <div className='absolute top-0 left-0 flex h-full w-full items-center justify-center'>
              <VideoPlayButton
                invert={true}
                className='transition-all group-hover:scale-125'
              />
            </div>
          </div>

          <div className='p-6 font-basier text-xl font-medium leading-tight  text-neutral-100'>
            <div className='mb-2 font-inconsolata text-base font-medium text-primary-300'>
              {video.categories.join(', ')}
            </div>
            <p>{video.title}</p>
            {video?.subTitle && (
              <p className='whitespace-pre-wrap pt-4 text-sm'>
                {video.subTitle}
              </p>
            )}
          </div>
        </CUICard.Body>
      </CUICard>
    </Link>
  )
}
