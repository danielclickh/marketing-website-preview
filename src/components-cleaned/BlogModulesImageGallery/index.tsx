'use client'

import styles from './styles.module.scss'
import StrapiImage from '@/components-cleaned/StrapiImage'
import { getProxiedMediaUrl } from '@/lib/api/strapi'
import {
  escapeMarkdownAlt,
  escapeMarkdownBlockquote
} from '@/lib/utils/strings'
import { BlogModuleImageGallery } from '@/types/strapi'
import { useMemo, useRef, useState } from 'react'
import 'swiper/css'
import 'swiper/css/thumbs'
import { Thumbs, FreeMode, Mousewheel, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperClass } from 'swiper/types'

export default function BlogModulesImageGallery({
  images
}: BlogModuleImageGallery) {
  const [thumbs, setThumbs] = useState<null | SwiperClass>(null)
  const nextRef = useRef<null | HTMLButtonElement>(null)
  const prevPref = useRef<null | HTMLButtonElement>(null)

  const navMounted = useMemo(() => {
    return !!prevPref.current && !!nextRef.current
  }, [prevPref.current, nextRef.current])

  return (
    <div className='rounded-lg border border-neutral-700/80 bg-neutral-900/60 shadow'>
      <div className='group/gallery relative p-2'>
        <button
          type='button'
          ref={prevPref}
          className='pointer-events-none absolute inset-y-0 left-0 z-20 flex items-center bg-gradient-to-r from-black/60 to-black/0 px-4 opacity-0 transition-opacity hover:!opacity-100 disabled:hidden group-hover/gallery:pointer-events-auto group-hover/gallery:opacity-60'>
          <span className='sr-only'>Previous slide</span>
          <span className='flex size-10 items-center justify-center rounded-full bg-neutral-900 text-lg font-bold leading-none text-white'>
            &lt;-
          </span>
        </button>
        <button
          type='button'
          ref={nextRef}
          className='pointer-events-none absolute inset-y-0 right-0 z-20 flex items-center bg-gradient-to-l from-black/60 to-black/0 px-4 opacity-0 transition-opacity hover:!opacity-100 disabled:hidden group-hover/gallery:pointer-events-auto group-hover/gallery:opacity-60'>
          <span className='sr-only'>Next slide</span>
          <span className='flex size-10 items-center justify-center rounded-full bg-neutral-900 text-lg font-bold leading-none text-white'>
            -&gt;
          </span>
        </button>
        <Swiper
          key={navMounted ? 'has-nav' : 'no-nav'}
          modules={[Thumbs, Navigation]}
          navigation={{
            enabled: true,
            prevEl: prevPref.current,
            nextEl: nextRef.current
          }}
          thumbs={{ swiper: thumbs && !thumbs.destroyed ? thumbs : null }}
          slidesPerView={1}
          className={`overflow-hidden rounded bg-neutral-950 ${styles.main}`}>
          {images.map((image, imageIndex) => {
            return (
              <SwiperSlide
                key={imageIndex}
                className='group/gallerySlide relative !h-auto'>
                <StrapiImage
                  entry={image}
                  className='relative h-full max-h-[540px] min-h-80 w-full object-contain'
                />
                {image.caption && (
                  <div className='absolute inset-x-0 bottom-0 bg-black/70 px-4 py-3 text-sm text-neutral-200 opacity-0 backdrop-blur-xl transition-opacity group-hover/gallerySlide:opacity-100'>
                    <p>{image.caption}</p>
                  </div>
                )}
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
      <div className='mx-auto w-max max-w-full pb-2'>
        <Swiper
          modules={[FreeMode, Mousewheel]}
          onInit={setThumbs}
          freeMode={true}
          mousewheel={{
            enabled: true,
            forceToAxis: true,
            releaseOnEdges: true,
            sensitivity: 0.5
          }}
          loop={false}
          spaceBetween={10}
          slidesPerView='auto'
          watchSlidesProgress={true}
          className={`!px-2 ${styles.thumbs}`}>
          {images.map((image, imageIndex) => {
            return (
              <SwiperSlide
                key={imageIndex}
                className='aspect-[4/3] !h-16 !w-auto cursor-pointer overflow-hidden rounded border-2 border-transparent transition md:!h-20'>
                <StrapiImage
                  entry={image}
                  width={150}
                  height={100}
                  className='h-full w-full bg-neutral-950 object-cover'
                />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </div>
  )
}

export function blogModulesImageGalleryMarkdown({
  images
}: BlogModuleImageGallery) {
  return images
    .map((image) => {
      const alt = escapeMarkdownAlt(image.alternativeText || '')
      const parts = [`![${alt}](${getProxiedMediaUrl(image.url)})`]
      if (image.caption) {
        parts.push(`> ${escapeMarkdownBlockquote(image.caption)}`)
      }
      return parts.join(`\n`)
    })
    .join(`\n\n`)
}
