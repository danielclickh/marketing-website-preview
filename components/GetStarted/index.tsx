import { ReactNode } from 'react'
import Markdown from '../Markdown'
import { SuiButton, SuiCodeblock, SuiTabs, SuiText, SuiTitle } from '../sui'
import styles from './GetStarted.module.scss'
import { GettingStartedData } from './types'
interface Props extends GettingStartedData {
  customHeader?: ReactNode
}

export default function FetchGetStarted({
  customHeader,
  pretitle,
  title,
  descriptionRichText,
  quickStartButton,
  cloudButton,
  platforms,
  bottomText
}: Props) {
  const osTabs = platforms.map((platform) => ({
    name: platform.name,
    content: (
      <SuiCodeblock bgColor='bg-transparent'>
        <Markdown ignoreAnchor>{platform.instructions}</Markdown>
      </SuiCodeblock>
    )
  }))

  return (
    <div className='flex bg-c3 text-c1-light' id='getting_started'>
      <div className='container mx-auto justify-center py-12 px-8 2xl:px-0  flex flex-col w-full max-w-7xl'>
        <div className='flex flex-col text-center md:w-5/12 mx-auto '>
          {customHeader ? (
            <SuiTitle type='h2' className='text-4xl' color='white'>
              {customHeader}
            </SuiTitle>
          ) : (
            <>
              <SuiTitle type='h4' color='c6' className='mb-3'>
                {pretitle}
              </SuiTitle>
              <SuiTitle
                type='h2'
                color='white'
                className='!text-4xl mb-4'
                weight='bold'>
                {title}
              </SuiTitle>
              <SuiText size='base' weight='medium' color='c4-dark'>
                <Markdown className={`${styles.description} anchor-c6`}>
                  {descriptionRichText}
                </Markdown>
              </SuiText>
            </>
          )}
          <div className='flex flex-col-reverse gap-4 md:flex-row md:gap-x-8 justify-center mt-8'>
            <div className='w-full md:w-60'>
              {quickStartButton && (
                <SuiButton
                  type='secondary'
                  className='w-full'
                  path={quickStartButton.href}
                  target={quickStartButton.target}>
                  {quickStartButton.text}
                </SuiButton>
              )}
              <div className='mt-3 overflow-hidden inline-block'>
                <div className='h-9 w-12 bg-c2-dark rotate-45 transform border border-c5-light origin-bottom-left'></div>
              </div>
            </div>
            <div className='w-full md:w-60'>
              {cloudButton && (
                <div className='w-full md:w-60'>
                  <SuiButton
                    type='primary'
                    className='w-full'
                    path={cloudButton.href}
                    target={cloudButton.target}>
                    {cloudButton.text}
                  </SuiButton>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='bg-c2-dark w-11/12 md:w-full self-center border border-c5-light rounded-lg p-2 px-6 overflow-hidden -mt-2 mb-1'>
          <SuiTabs
            tabs={osTabs}
            color='offWhite'
            activeColor='white'
            borderColor='border-c3'
            hoverColor='white'
            hoverBorderColor='border-c2-dark'
          />
        </div>
        <SuiText
          size='sm'
          weight='medium'
          color='white'
          className='px-6 md:px-0 mt-6'>
          <Markdown className='anchor-c6'>{bottomText}</Markdown>
        </SuiText>
      </div>
    </div>
  )
}
