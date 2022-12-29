import { ReactNode } from 'react'
import { findOne } from '../../lib/api/strapi'
import Markdown from '../Markdown'
import { SuiButton, SuiCodeblock, SuiTabs, SuiText, SuiTitle } from '../sui'
interface Props {
  customHeader?: ReactNode
}

async function FetchGetStarted({ customHeader }: Props) {
  const {
    pretitle,
    title,
    descriptionRichText,
    quickStartButton,
    cloudButton,
    platforms,
    bottomText
  } = await findOne('getting-started', {
    populate: ['cloudButton', 'platforms', 'quickStartButton']
  })
  const osTabs = platforms.map((platform) => ({
    name: platform.name,
    content: (
      <SuiCodeblock bgColor='bg-dark-grey5'>
        <Markdown>{platform.instructions}</Markdown>
      </SuiCodeblock>
    )
  }))

  return (
    <div className='flex bg-light-purple2 text-white'>
      <div className='container mx-auto justify-center py-12 px-8 2xl:px-0  flex flex-col w-full max-w-7xl'>
        <div className='flex flex-col text-center md:w-5/12 mx-auto '>
          {customHeader ? (
            <SuiTitle type='h2' size='4xl' color='white'>
              {customHeader}
            </SuiTitle>
          ) : (
            <>
              <SuiTitle type='h5' color='c6' className='mb-4'>
                {pretitle}
              </SuiTitle>
              <SuiTitle type='h2' size='4xl' color='white'>
                {title}
              </SuiTitle>
              <SuiText size='base' weight='medium' color='offWhite'>
                <Markdown>{descriptionRichText}</Markdown>
              </SuiText>
            </>
          )}
          <div className='flex flex-col-reverse gap-4 md:flex-row md:space-x-8 justify-center mt-4'>
            <div className='w-full md:w-60 flex flex-col items-center'>
              {quickStartButton && (
                <SuiButton
                  size='sm'
                  type='secondary'
                  path={quickStartButton.href}
                  target={quickStartButton.target}>
                  {quickStartButton.text}
                </SuiButton>
              )}
              <div className='mt-8 overflow-hidden inline-block'>
                <div className='h-9 w-12 bg-dark-grey5 rotate-45 transform border border-dark-grey3 origin-bottom-left'></div>
              </div>
            </div>
            {cloudButton && (
              <div className='w-full md:w-60'>
                <SuiButton
                  size='sm'
                  type='primary'
                  path={cloudButton.href}
                  target={cloudButton.target}>
                  {cloudButton.text}
                </SuiButton>
              </div>
            )}
          </div>
        </div>
        <div className='bg-dark-grey5 w-11/12 md:w-full self-center border border-dark-grey3 rounded-lg p-2 px-6 overflow-hidden -mt-2 mb-1'>
          <SuiTabs
            tabs={osTabs}
            activeTab={1}
            color='offWhite'
            activeColor='white'
            borderColor='border-arsenic'
            hoverColor='white'
            hoverBorderColor='border-dark-grey5'
          />
        </div>
        <div className='px-6 md:px-0'>
          <SuiText size='sm' weight='medium' color='white'>
            <Markdown>{bottomText}</Markdown>
          </SuiText>
        </div>
      </div>
    </div>
  )
}

export default function GetStarted({ customHeader }: Props) {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <FetchGetStarted customHeader={customHeader} />
    </>
  )
}
