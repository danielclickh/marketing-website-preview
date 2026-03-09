import { CUIButton } from '../../ClickUI'
import { SuiText, SuiTitle } from '../../sui'
import { ChevronRightIcon } from '@heroicons/react/solid'

type Props = {
  href: string
  textBefore?: string
  textSlanted?: string
  textAfter?: string
  textDescription?: string
}

export default function GetStartedFree({
  href,
  textBefore = '無料で始めましょう',
  textSlanted,
  textAfter,
  textDescription = '30日間のトライアルと$300分のクレジットをご提供します。ご自身のペースでご利用ください。'
}: Props) {
  return (
    <div className='flip-selection w-full rounded-lg bg-primary-300 px-4 py-16 text-neutral-0'>
      <div className='container mx-auto flex flex-col 2xl:px-0'>
        <div className='mx-auto flex flex-col text-center'>
          <SuiTitle type='h2' color='text-default' className='mb-6'>
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
              target='_blank'
              className='group mx-auto mt-8'
              href={href}
              iconRight={
                <ChevronRightIcon
                  height='18'
                  className='pt-0.5 transition group-hover:translate-x-1/2'
                />
              }>
              無料アカウントを作成する
            </CUIButton>
          </div>
        </div>
      </div>
    </div>
  )
}
