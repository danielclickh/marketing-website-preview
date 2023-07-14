import { ChevronRightIcon } from '@heroicons/react/solid'
import { CUIButton } from '../../components/ClickUI'
import { SuiText, SuiTitle } from '../../components/sui'

type Props = {
  href: string
  textBefore?: string
  textSlanted?: string
  textAfter?: string
  textDescription?: string
}

export default function GetStartedFree({
  href,
  textBefore = 'Get started for free',
  textSlanted,
  textAfter,
  textDescription = "We'll get you started on a 30 day trial and $300 credits to spend at your own pace."
}: Props) {
  return (
    <div className='flip-selection w-full rounded-lg bg-primary-300 py-16 px-4 text-neutral-0'>
      <div className='container mx-auto flex flex-col 2xl:px-0'>
        <div className='mx-auto flex flex-col text-center'>
          <SuiTitle type='h2' color='text-default' className='mb-6 '>
            {textBefore}
            {textSlanted && (
              <>
                {' '}
                <span className='tilted tilted-black'>
                  <span className='tilted-content'>{textSlanted}</span>
                </span>{' '}
              </>
            )}
            {textAfter && textAfter}
          </SuiTitle>
          <div className='max-w-3xl'>
            <SuiText size='base' color='text-default' weight='normal'>
              {textDescription}
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
              Create a free account
            </CUIButton>
          </div>
        </div>
      </div>
    </div>
  )
}
