import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'
import CopyUrlButton from '../../../components/CopyUrlButton'
import FollowUs from '../../../components/FollowUs'
import HRSeparator from '../../../components/HRSeparator'
import Layout from '../../../components/Layout'
import Markdown from '../../../components/Markdown'
import { getNewsLetterData } from '../../../components/NewsLetter/getNewsLetterData'
import NewsLetterForm from '../../../components/NewsLetter/NewsLetterForm'
import SocialButton from '../../../components/SocialButton'
import { SuiButton, SuiPanel, SuiText, SuiTitle } from '../../../components/sui'
import { getCommonProps } from '../../../lib/utils/getCommonProps'
import { REVALIDATE_SECONDS } from '../../../lib/utils/revalidationConfig'
import { getLexicon, getLexicons } from '../../../lib/lexicons'
import { Lexicon } from '../../../lib/lexicons/types'
import { slugify } from '../../../lib/utils/strings'
import { CommonProps, NewsLetterData } from '../../../types/homepage'

type MoreLikeThisItem = {
  link: string
  title: string
}

interface LexiconPageProps extends CommonProps {
  lexicon: Lexicon
  moreLikeThis: Array<MoreLikeThisItem>
  newsLetterData: NewsLetterData
}

interface LexiconPageParams extends ParsedUrlQuery {
  slug: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getLexicons().map((lexicon) => {
      return {
        params: { slug: lexicon.slug }
      }
    }),
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as LexiconPageParams
  const newsLetterData = await getNewsLetterData()

  const lexicon = getLexicon(slug)

  if (lexicon) {
    const moreLikeThis = getLexicons()
      .filter((item) => item.slug !== lexicon.slug)
      .map((item) => {
        return {
          link: `/lexicon/${item.slug}`,
          title: item.title
        } as MoreLikeThisItem
      })
      .slice(0, 3) // Limit number of items to 3

    const props: LexiconPageProps = {
      lexicon,
      moreLikeThis,
      seo: {
        title: `${lexicon.title} | ClickHouse Lexicon`,
        description: lexicon.excerpt,
        path: `/lexicon/${lexicon.slug}`
      },
      newsLetterData,
      ...(await getCommonProps())
    }

    return {
      props,
      revalidate: REVALIDATE_SECONDS
    }
  }

  return {
    notFound: true,
    revalidate: REVALIDATE_SECONDS
  }
}

export default function Page({
  lexicon,
  moreLikeThis,
  seo,
  headerData,
  footerData,
  newsLetterData
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <main className='bg-grid'>
        <div className='container mx-auto max-w-7xl px-6 pt-20 2xl:px-0'>
          <div className='flex-row items-start gap-16 lg:flex'>
            <div className='flex-shrink flex-grow'>
              <h4 className='text-base font-semibold'>
                <Link href='/lexicon' className='text-primary-300'>
                  Lexicon
                </Link>{' '}
                / <strong>{lexicon.title}</strong>
              </h4>
              <SuiTitle type='h1' className='text-balance my-6 md:!text-5xl'>
                {lexicon.title}
              </SuiTitle>
              <Markdown className='rich-text-content leading-6' allowHeaderLink>
                {lexicon.body}
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
                  <SocialButton type='y_combinator' title={lexicon.title} />
                  <SocialButton type='twitter' title={lexicon.title} />
                  <SocialButton type='facebook' title={lexicon.title} />
                  <SocialButton type='linkedin' title={lexicon.title} />
                </div>
              </div>
            </div>
            <aside className='w-full flex-shrink-0 flex-grow-0 align-top lg:sticky lg:top-32 lg:max-w-sm'>
              {moreLikeThis.length > 0 && (
                <div className='mb-8 '>
                  <h3 className='mb-6 text-lg font-bold'>More like this</h3>
                  {(moreLikeThis as LexiconPageProps['moreLikeThis']).map(
                    (item) => (
                      <Link
                        href={item.link}
                        className='mb-4 block w-full'
                        key={item.link}>
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
                    )
                  )}
                  <HRSeparator className='mt-8' />
                </div>
              )}
              <SuiPanel
                color='bg-c4/10'
                padding='lg'
                isRounded
                className='mt-6'>
                <h3 className='mb-2 text-lg font-bold'>
                  {newsLetterData.title}
                </h3>
                <SuiText
                  size='sm'
                  weight='medium'
                  color='secondary'
                  className='mb-6'>
                  {newsLetterData.description}
                </SuiText>
                <NewsLetterForm />
              </SuiPanel>
            </aside>
          </div>
        </div>
        <FollowUs />
      </main>
    </Layout>
  )
}
