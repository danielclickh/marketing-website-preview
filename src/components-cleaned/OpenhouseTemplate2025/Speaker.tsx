import OpenhouseSpeakerName from './SpeakerName'
import photoTexture from './assets/photo-texture.svg'
import StrapiImage from '@/components-cleaned/StrapiImage'
import FontSohneBreit from '@/components/FontSohneBreit'
import { EntryImage } from '@/types/strapi'

export interface OpenhouseSpeakerProps {
  name: string
  title: string
  headshot: EntryImage
}

export default function OpenhouseSpeaker({
  name,
  title,
  headshot
}: OpenhouseSpeakerProps) {
  return (
    <div className='group/speaker flex flex-col overflow-hidden bg-white ring-1 ring-black'>
      <div className='relative bg-neutral-50 ring-1 ring-black'>
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
      <div className='flex flex-col p-3 pt-2 lg:p-4 lg:pt-3'>
        <FontSohneBreit as='h3' className='font-black lg:text-xl'>
          <OpenhouseSpeakerName name={name} />
        </FontSohneBreit>
        <p className='text-sm opacity-70 lg:text-base'>{title}</p>
      </div>
    </div>
  )
}
