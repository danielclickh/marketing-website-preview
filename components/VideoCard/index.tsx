import Image from 'next/image'
import Link from 'next/link'
import VideoPlayButton from '../../public/images/VideoPlayButton'
import { Video } from '../../types/videos'
import { CUICard } from '../ClickUI'

export default function VideoCard({
  Slug,
  VideoID,
  Title,
  categories,
  IntroText,
  seo
}: Video) {
  let thumbnail = `https://img.youtube.com/vi/${VideoID}/maxresdefault.jpg`

  if (seo?.image) {
    thumbnail = seo.image.url
  }

  return (
    <Link
      href={`/videos/${Slug}`}
      className='hover:scale-102 group transition ease-in-out hover:-translate-y-1 hover:no-underline'>
      <CUICard>
        <CUICard.Body>
          <div className='relative overflow-hidden rounded-t-lg'>
            <div className='absolute h-full w-full bg-black/[0.65] opacity-0 transition group-hover:opacity-100'></div>
            <Image
              src={thumbnail}
              alt={Title || ''}
              width={774}
              height={420}
              className='flex items-center justify-center bg-primary-300 text-lg font-black text-primary-900'
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
              {categories.map((cat) => cat.CategoryName).join(', ')}
            </div>
            <p>{Title}</p>
            {IntroText && (
              <p className='whitespace-pre-wrap pt-4 text-sm'>{IntroText}</p>
            )}
          </div>
        </CUICard.Body>
      </CUICard>
    </Link>
  )
}
