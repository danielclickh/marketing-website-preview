import { CUIButton, CUICard } from '../ClickUI'
import { SuiText, SuiTitle } from '../sui'
import illustration from './illustration.svg'
import Image from 'next/image'
import Link from 'next/link'

export default function ByocPricingCard() {
  return (
    <div className='mt-12 px-6'>
      <CUICard className='relative overflow-hidden bg-neutral-900/50 shadow-card-xl'>
        <div className='absolute left-0 right-0 top-0 h-1 bg-primary' />
        <div className='flex flex-col lg:grid lg:grid-cols-3 lg:gap-12'>
          <div className='flex flex-col items-center gap-10 px-6 pt-8 md:flex-row lg:col-span-2 lg:px-0 lg:pb-8'>
            <Image src={illustration} width={233} height={100} alt='AWS' />
            <div>
              <SuiTitle
                type='h3'
                className='mb-3 flex flex-col gap-3 !text-2.75xl font-semibold sm:block'>
                Bring your own cloud
              </SuiTitle>
              <SuiText size='sm' className='leading-relaxed'>
                Do you have strict data residency and compliance requirements
                that make typical SaaS offerings a nonstarter? Our Bring Your
                Own Cloud deployment model allows you to experience the
                advantages of ClickHouse Cloud within your own Virtual Private
                Cloud (VPC).{' '}
                <Link
                  href='/cloud/bring-your-own-cloud?loc=pricing-page-component'
                  className='text-primary-300 hover:underline'>
                  Learn&nbsp;more
                </Link>
              </SuiText>
            </div>
          </div>
          <div className='flex flex-col p-6'>
            <CUIButton
              href={'/cloud/bring-your-own-cloud?loc=pricing-page-component'}
              weight='medium'
              className='w-full'
              linkClass='my-auto'
              type='secondary'>
              Contact us
            </CUIButton>
          </div>
        </div>
      </CUICard>
    </div>
  )
}
