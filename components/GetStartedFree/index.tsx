import { CUIButton, CUICard } from '../../components/ClickUI'
import { SuiText, SuiTitle } from '../../components/sui'
import { ChevronRightIcon } from '@heroicons/react/solid'

type Props = {
  href: string
}

export default function GetStartedFree({ href }: Props) {
  return (
    <div className='flip-selection w-full rounded-lg bg-primary-300 py-16 px-4 text-neutral-0'>
      <div className='container mx-auto flex flex-col 2xl:px-0'>
        <div className='mx-auto flex flex-col text-center'>
          <SuiTitle type='h2' color='text-default' className='mb-6 '>
            Get started for free
          </SuiTitle>
          <div className='max-w-3xl'>
            <SuiText size='base' color='text-default' weight='normal'>
              We’ll get you started on a 30 day trial and $300 credits to spend
              at your own pace.
            </SuiText>

            <CUIButton
              type='primary-dark'
              size='lg'
              className='group mx-auto mt-8'
              href={href}
              iconRight={
                <ChevronRightIcon
                  height='18'
                  className='pt-0.5 transition group-hover:translate-x-1/2'
                />
              }
              segmentEvent={{
                label: 'Create a free acount',
                category: 'website-cloudpage-lower-hero'
              }}>
              Create a free acount
            </CUIButton>
          </div>
        </div>
      </div>
    </div>
  )
}
