import { CUICard } from '../ClickUI'
import YouTubeThumbnail from '@/components-cleaned/YouTubeThumbnail'
import { Video } from '@/types/videos'
import Link from 'next/link'

export default function VideoCard({
  Slug,
  VideoID,
  Title,
  categories,
  IntroText,
  language,
  seo
}: Video) {
  const isJapanese = language === 'Japanese'
  return (
    <Link
      href={isJapanese ? `/jp/videos/${Slug}` : `/videos/${Slug}`}
      className='hover:scale-102 group transition ease-in-out hover:-translate-y-1 hover:no-underline'>
      <CUICard>
        <CUICard.Body>
          <div className='relative overflow-hidden rounded-t-lg'>
            <div className='absolute h-full w-full bg-black/[0.65] opacity-0 transition group-hover:opacity-100'></div>
            <div className='relative aspect-[774/420] bg-primary-300'>
              <YouTubeThumbnail
                videoId={VideoID}
                className='absolute z-0 h-full origin-top-left object-cover'
              />
            </div>
          </div>

          <div className='p-6 font-basier text-xl font-medium leading-tight text-neutral-100'>
            {categories && (
              <div className='mb-2 font-inconsolata text-base font-medium text-primary-300'>
                {categories.map((cat) => cat.CategoryName).join(', ')}
              </div>
            )}
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
