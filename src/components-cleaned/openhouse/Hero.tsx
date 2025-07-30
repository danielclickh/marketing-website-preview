import heroGradientBottom from './assets/hero-gradient-bottom.png'
import ContentTicker from '@/components-cleaned/ContentTicker'
import Parallax from '@/components/Parallax'
import { StrapiImageUrl } from '@/components/StrapiElements'
import { getProxiedMediaUrl } from '@/lib/api/strapi'
import { StrapiImageType, StrapiVideoType } from '@/lib/api/strapi/types'
import { shuffleArraySeeded } from '@/lib/utils/arrays'

export interface OpenhouseHeroProps {
  gallery: Array<StrapiImageType | StrapiVideoType>
  children: React.ReactNode
  pause?: boolean
}

export default function Hero({
  gallery,
  children,
  pause = false
}: OpenhouseHeroProps) {
  return (
    <section className='relative h-dvh max-h-[600px] min-h-[450px] overflow-hidden lg:max-h-[900px] lg:min-h-[600px]'>
      <div
        className='absolute inset-x-0 bottom-0 z-10 h-72 bg-contain lg:h-96'
        style={{ backgroundImage: `url(${heroGradientBottom.src})` }}
      />

      {/* Images */}
      <Parallax
        speed={3}
        className='absolute inset-0 z-0 flex flex-col gap-1.5'>
        <ContentTicker
          gap='0.375rem'
          pixelsPerSecond={20}
          direction='ltr'
          className='-translate-y-16 lg:-translate-y-28'
          pause={pause}>
          {shuffleArraySeeded(gallery, 2 + gallery.length).map(
            (item, itemIndex) => {
              return <Slide key={itemIndex} item={item} />
            }
          )}
        </ContentTicker>
        <ContentTicker
          gap='0.375rem'
          pixelsPerSecond={15}
          className='-translate-y-16 lg:-translate-y-28'
          pause={pause}>
          {gallery.map((item, itemIndex) => {
            return <Slide key={itemIndex} item={item} />
          })}
        </ContentTicker>
        <ContentTicker
          gap='0.375rem'
          pixelsPerSecond={12}
          direction='ltr'
          className='-translate-y-16 lg:-translate-y-28'
          pause={pause}>
          {shuffleArraySeeded(gallery, 3 + gallery.length).map(
            (item, itemIndex) => {
              return <Slide key={itemIndex} item={item} />
            }
          )}
        </ContentTicker>
      </Parallax>

      {/* Content */}
      <div className='relative z-20 flex h-full items-end pb-8'>{children}</div>
    </section>
  )
}

function Slide({ item }: { item: any }) {
  return item.mime.startsWith('video/') ? (
    <video
      src={getProxiedMediaUrl(item.url)}
      autoPlay={true}
      muted={true}
      loop={true}
      controls={false}
      className='h-full max-h-44 w-auto max-w-none lg:max-h-72'
    />
  ) : (
    <StrapiImageUrl
      {...item}
      height={176}
      width={704}
      unoptimized={false}
      priority={true}
      loading='eager'
      className='h-full max-h-44 w-auto max-w-none lg:max-h-72'
    />
  )
}
