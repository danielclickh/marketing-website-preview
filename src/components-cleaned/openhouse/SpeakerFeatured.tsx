import photoTexture from './assets/photo-texture.svg'
import StrapiImage from '@/components-cleaned/StrapiImage'
import FontSohneBreit from '@/components/FontSohneBreit'
import { EntryImage } from '@/types/strapi'

export interface OpenhouseSpeakerFeaturedProps {
  name: string
  title: string
  headshot: EntryImage
  logo: null | EntryImage
}

export default function OpenhouseSpeakerFeatured({
  name,
  title,
  headshot,
  logo
}: OpenhouseSpeakerFeaturedProps) {
  return (
    <div className='group/speaker col-span-3 bg-white ring-1 ring-black md-mid:col-span-6 lg:grid lg:grid-cols-subgrid'>
      <div className='relative bg-neutral-50 ring-1 ring-black lg:col-span-2'>
        <div
          className='absolute inset-0 z-10 opacity-55 mix-blend-screen'
          style={{
            backgroundImage: `url('${photoTexture.src}')`
          }}
        />
        <StrapiImage
          entry={headshot}
          width={400}
          height={400}
          unoptimized={false}
          className='aspect-square object-cover grayscale transition group-hover/speaker:grayscale-0'
        />
      </div>
      <div className='col-span-4 flex flex-col p-3 pt-2 lg:p-6 lg:pt-5'>
        <FontSohneBreit as='h3' className='font-black lg:text-xl'>
          {name}
        </FontSohneBreit>
        <p className='text-sm opacity-70 lg:text-base'>{title}</p>
        {logo && (
          <StrapiImage
            entry={logo}
            className='mt-auto hidden lg:inline-block'
          />
        )}
      </div>
    </div>
  )
}
