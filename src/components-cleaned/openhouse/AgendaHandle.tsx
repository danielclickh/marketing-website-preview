import OpenhouseTime from '@/components-cleaned/openhouse/Time'
import { StrapiImageUrl } from '@/components/StrapiElements'
import { StrapiImageType } from '@/lib/api/strapi/types'

export interface OpenhouseAgendaHandleProps {
  title: string
  time?: string | null
  speakers?: Array<StrapiImageType>
}

export default function OpenhouseAgendaHandle({
  title,
  time,
  speakers
}: OpenhouseAgendaHandleProps) {
  return (
    <div className='mr-6 flex items-center'>
      <span className='mr-auto font-bold'>
        {time && (
          <span className='block font-normal opacity-70'>
            <OpenhouseTime time={time} />
          </span>
        )}
        {title}
      </span>

      {speakers &&
        speakers.map((speaker, speakerIndex) => {
          return (
            <span
              className='relative -mr-3 hidden h-11 w-11 overflow-hidden rounded-full border-2 border-black bg-white lg:block'
              title={speaker.name}
              style={{
                zIndex: speakers.length - speakerIndex
              }}>
              <StrapiImageUrl
                key={speakerIndex}
                {...speaker}
                width={44}
                height={44}
                unoptimized={false}
                className='absolute inset-0 h-full w-full max-w-none object-contain object-center saturate-0'
              />
            </span>
          )
        })}
    </div>
  )
}
