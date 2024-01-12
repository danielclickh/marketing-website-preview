import Link from 'next/link'
import React, { HTMLAttributes } from 'react'
import { NewsLetterData } from '../../types/homepage'
import CopyUrlButton from '../CopyUrlButton'
import FollowUs from '../FollowUs'
import HRSeparator from '../HRSeparator'
import Markdown from '../Markdown'
import NewsLetterForm from '../NewsLetter/NewsLetterForm'
import SocialButton from '../SocialButton'
import { SuiButton, SuiPanel, SuiText } from '../sui'

export interface SeoPageProps extends HTMLAttributes<any> {
  title: string
  children: string
  newsLetterData: NewsLetterData
  moreLikeThis?: Array<{
    link: string
    title: string
  }>
}

export function SeoPage({
  title,
  children,
  moreLikeThis = [],
  newsLetterData
}: SeoPageProps) {
  return (
    <main>
      <div className='container mx-auto my-20 max-w-6xl px-6 2xl:px-0'>
        <div className='flex-row items-start gap-16 lg:flex'>
          <div className='flex-shrink flex-grow'>
            <h1 className='mb-20 font-basier text-4xl font-bold text-neutral-100'>
              <span className='leading-snug'>{title}</span>
            </h1>
            <Markdown className='rich-text-content leading-6' allowHeaderLink>
              {children}
            </Markdown>
            <HRSeparator className='my-8' />
            <div className='mb-10 flex flex-col items-center justify-between gap-4 md:flex-row'>
              <div className='flex'>
                <SuiText size='sm' weight='medium' color='primary'>
                  Share this resource
                </SuiText>
              </div>
              <div className='flex flex-wrap justify-center gap-4 text-neutral-0'>
                <CopyUrlButton />
                {['y_combinator', 'twitter', 'facebook', 'linkedin'].map(
                  (social) => (
                    <SocialButton key={social} type={social} title={title} />
                  )
                )}
              </div>
            </div>
          </div>
          <aside className='w-full flex-shrink-0 flex-grow-0 align-top lg:max-w-sm'>
            {moreLikeThis?.length > 0 && (
              <div className='mb-8'>
                <h3 className='mb-6 text-lg font-bold'>More like this</h3>
                <Link href='/lexicon' className='mb-4 block w-full'>
                  <SuiButton
                    type='primary'
                    className='font-base block w-full border border-neutral-700 hover:translate-y-0 hover:border-primary-400/40 hover:no-underline'>
                    <div className='flex w-full flex-row items-center gap-6'>
                      <div className='flex-shrink flex-grow basis-0 text-left'>
                        Back to the lexicon
                      </div>
                      <div className='flex-shrink-0 flex-grow-0'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          fill='currentColor'
                          viewBox='0 0 16 16'>
                          <path
                            fillRule='evenodd'
                            d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'
                          />
                        </svg>
                      </div>
                    </div>
                  </SuiButton>
                </Link>
                {moreLikeThis.map((item) => (
                  <Link href={item.link} className='mb-4 block w-full'>
                    <SuiButton
                      type='empty'
                      color='primary'
                      className='font-base block w-full border border-neutral-700 hover:translate-y-0 hover:border-primary-400/40 hover:no-underline'>
                      <div className='flex w-full flex-row items-center gap-6'>
                        <div className='flex-shrink flex-grow basis-0 text-left'>
                          {item.title}
                        </div>
                        <div className='flex-shrink-0 flex-grow-0'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='16'
                            fill='currentColor'
                            viewBox='0 0 16 16'>
                            <path
                              fillRule='evenodd'
                              d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'
                            />
                          </svg>
                        </div>
                      </div>
                    </SuiButton>
                  </Link>
                ))}
                <HRSeparator className='mt-8' />
              </div>
            )}
            <SuiPanel color='bg-c4/10' padding='lg' isRounded className='mt-6'>
              <h3 className='mb-2 text-lg font-bold'>{newsLetterData.title}</h3>
              <SuiText
                size='sm'
                weight='medium'
                color='secondary'
                className='mb-6'>
                {newsLetterData.description}
              </SuiText>
              <NewsLetterForm
                emailLabel={newsLetterData.emailLabel}
                submitButtonLabel={newsLetterData.submitButtonLabel}
              />
            </SuiPanel>
          </aside>
        </div>
      </div>
      <div className='mt-20'>
        <FollowUs />
      </div>
    </main>
  )
}
