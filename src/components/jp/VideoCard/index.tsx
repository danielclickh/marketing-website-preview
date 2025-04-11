import { CUICard } from '../../ClickUI'
import fallbackTumbnail from './fallback.png'
import { Video } from '@/types/videos'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function VideoCard({
  Slug,
  VideoID,
  Title,
  categories,
  IntroText,
  seo
}: Video) {
  const [displayFallback, setDisplayFallback] = useState<boolean>(false)
  let thumbnail = `https://img.youtube.com/vi/${VideoID}/maxresdefault.jpg`

  if (seo?.image) {
    thumbnail = seo.image.url
  }

  return (
    <Link
      href={`/jp/videos/${Slug}`}
      className='hover:scale-102 group transition ease-in-out hover:-translate-y-1 hover:no-underline'>
      <CUICard>
        <CUICard.Body>
          <div className='relative overflow-hidden rounded-t-lg'>
            <div className='absolute h-full w-full bg-black/[0.65] opacity-0 transition group-hover:opacity-100'></div>

            <div className='relative aspect-[774/420] bg-primary-300'>
              <Image
                src={thumbnail}
                alt={Title || ''}
                width={774}
                height={420}
                onError={() => setDisplayFallback(true)}
                className={'absolute z-0 h-full origin-top-left object-cover'}
              />
              <Image
                src={fallbackTumbnail}
                alt={Title || ''}
                width={774}
                height={420}
                className={
                  displayFallback
                    ? 'absolute z-10 h-full object-cover'
                    : 'hidden'
                }
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
