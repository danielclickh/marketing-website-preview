import { ReactNode } from 'react'
import { findOne } from '../../lib/api/strapi'
import { StrapiButton } from '../../lib/api/strapi/types'
import Markdown from '../Markdown'
import { SuiButton, SuiCodeblock, SuiTabs, SuiText, SuiTitle } from '../sui'
import styles from './GetStarted.module.scss'
interface Props {
  customHeader?: ReactNode
}

interface GettingStartedPlatform {
  id: number
  name: string
  instructions: string
}

interface GettingStartedData {
  pretitle: string
  title: string
  description: string
  descriptionRichText: string
  quickStartButton: StrapiButton
  cloudButton: StrapiButton
  platforms: Array<GettingStartedPlatform>
  bottomText: string
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
  }: GettingStartedData = await findOne('getting-started', {
    populate: ['cloudButton', 'platforms', 'quickStartButton']
  })

  const osTabs = platforms.map((platform) => ({
    name: platform.name,
    content: (
      <SuiCodeblock bgColor='bg-transparent'>
        <Markdown>{platform.instructions}</Markdown>
      </SuiCodeblock>
    )
  }))

  return (
    <div className='flex bg-c3 text-c1-light'>
      <div className='container mx-auto justify-center py-12 px-8 2xl:px-0  flex flex-col w-full max-w-7xl'>
        <div className='flex flex-col text-center md:w-5/12 mx-auto '>
          {customHeader ? (
            <SuiTitle type='h2' className='text-4xl' color='white'>
              {customHeader}
            </SuiTitle>
          ) : (
            <>
              <SuiTitle type='h4' color='c6' className='mb-4'>
                {pretitle}
              </SuiTitle>
              <SuiTitle
                type='h2'
                size='4xl'
                color='white'
                className='text-4xl mb-4'>
                {title}
              </SuiTitle>
              <SuiText size='base' weight='medium' color='c4-dark'>
                <Markdown className={styles.description}>
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
              <div className='mt-8 overflow-hidden inline-block'>
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
          <Markdown>{bottomText}</Markdown>
        </SuiText>
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
