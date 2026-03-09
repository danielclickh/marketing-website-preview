import { CUIButton } from '../ClickUI'
import { SuiText, SuiTitle } from '../sui'
import byocImage from './assets/image.svg'
import { ChevronRightIcon } from '@heroicons/react/outline'
import Image from 'next/image'

interface BYOCSectionProps {
  loc?: string
}

export function BYOCSection({ loc }: BYOCSectionProps) {
  return (
    <div className='section-container mx-auto mb-24 max-w-[1115px]'>
      <div className='mt-24 flex flex-wrap items-center gap-16 rounded-lg bg-primary-300 p-8 text-neutral-900 lg:flex-nowrap lg:px-16 lg:py-16'>
        <div className='w-full lg:w-1/3'>
          <Image
            width={487}
            height={220}
            src={byocImage}
            alt='Bring Your Own Cloud'
          />
        </div>
        <div className='w-full lg:w-2/3'>
          <div className='flip-selection mb-6 flex flex-wrap items-center gap-8'>
            <SuiTitle type='h2'>Bring Your Own Cloud</SuiTitle>
          </div>
          <div className='flip-selection'>
            <SuiText className='mb-6 leading-relaxed'>
              Do you have strict data residency and compliance requirements that
              make typical SaaS offerings a nonstarter? Our Bring Your Own Cloud
              deployment model allows you to experience the advantages of
              ClickHouse Cloud within your own Virtual Private Cloud (VPC).
            </SuiText>
          </div>

          <CUIButton
            type='primary-dark'
            size='lg'
            className='group mt-8 font-semibold'
            href={`/cloud/bring-your-own-cloud?loc=${loc}`}
            iconRight={
              <ChevronRightIcon
                height='18'
                className='pt-0.5 transition group-hover:translate-x-1/2'
              />
            }>
            Join waitlist
          </CUIButton>
        </div>
      </div>
    </div>
  )
}
