import Breadcrumbs from '@/components-cleaned/Breadcrumbs'
import CopyUrlButton from '@/components/CopyUrlButton'
import FollowUs from '@/components/FollowUs'
import HRSeparator from '@/components/HRSeparator'
import Layout from '@/components/Layout'
import Markdown from '@/components/Markdown'
import Avatars from '@/components/Avatars'
import NewsLetterForm from '@/components/NewsLetter/NewsLetterForm'
import { getNewsLetterData } from '@/components/NewsLetter/getNewsLetterData'
import SocialButton from '@/components/SocialButton'
import TableOfContents from '@/components/TableOfContents'
import { SuiButton, SuiPanel, SuiText, SuiTitle } from '@/components/sui'
import {
  getEngineeringResource,
  getEngineeringResources
} from '@/lib/engineering-resources'
import { EngineeringResource } from '@/lib/engineering-resources/types'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps, NewsLetterData } from '@/types/homepage'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ParsedUrlQuery } from 'querystring'
import { useRef } from 'react'

type MoreLikeThisItem = {
  link: string
  title: string
}

interface EngineeringResourcesPageProps extends CommonProps {
  engResource: EngineeringResource
  moreLikeThis: Array<MoreLikeThisItem>
  newsLetterData: NewsLetterData
}

interface EngineeringResourcesPageParams extends ParsedUrlQuery {
  slug: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getEngineeringResources().map((engResource) => {
      return {
        params: { slug: engResource.slug }
      }
    }),
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as EngineeringResourcesPageParams
  const newsLetterData = await getNewsLetterData()

  const engResource = getEngineeringResource(slug)

  if (engResource) {
    const moreLikeThis = getEngineeringResources()
      .filter((item) => item.slug !== engResource.slug)
      .map((item) => {
        return {
          link: `/engineering-resources/${item.slug}`,
          title: item.title
        } as MoreLikeThisItem
      })
      .slice(0, 3) // Limit number of items to 3

    const props: EngineeringResourcesPageProps = {
      engResource: engResource,
      moreLikeThis,
      seo: {
        title: `${engResource.title} | ClickHouse Engineering Resources`,
        description: engResource.excerpt,
        path: `/engineering-resources/${engResource.slug}`,
        lastModified: engResource.lastUpdated,
        schema: engResource.schema
      },
      newsLetterData,
      ...(await getCommonProps())
    }

    return {
      props
    }
  }

  return {
    notFound: true
  }
}

export default function Page({
  engResource,
  moreLikeThis,
  seo,
  headerData,
  footerData,
  newsLetterData
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const contentRef = useRef<HTMLDivElement>(null)
  const date = new Date(engResource.lastUpdated)

  const authorName = engResource.author || "The ClickHouse Team"
  const authorAvatarUrl = engResource.authorAvatar || "https://clickhouse.com/uploads/neutral_avatar_400804ae96_5c370e757b.png"

  const authorAvatar = {
    id: 1,
    name: "author.png",
    alternativeText: authorName,
    caption: "",
    hash: "author",
    ext: ".png",
    mime: "image/png",
    size: 0,
    url: authorAvatarUrl,
    provider: "local",
    provider_metadata: null
  }

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <main className='bg-grid'>
        <div className='container mx-auto max-w-7xl px-6 pt-20 2xl:px-0'>
          <div className='flex flex-col items-start gap-8 lg:flex-row lg:gap-16'>
            <div className='w-full flex-shrink flex-grow lg:w-auto'>
              <Breadcrumbs className='mb-6'>
                <Breadcrumbs.Link href='/engineering-resources'>
                  Engineering Resources
                </Breadcrumbs.Link>
              </Breadcrumbs>
              <SuiTitle type='h1' className='my-6 text-balance md:!text-5xl'>
                {engResource.title}
              </SuiTitle>

              <div className='flex flex-row items-center space-x-4 pb-5'>
                <Avatars avatars={[authorAvatar]} />
                <div>
                  <div className='text-base'>{authorName}</div>
                  <div className='text-sm text-neutral-300'>
                    Last updated:{' '}
                    {date.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>

              <div ref={contentRef}>
              {engResource.image !== '' && (
                <Image
                  src={engResource.image}
                  alt={engResource.title}
                  width={1200}
                  height={630}
                  className='mb-8 w-full'
                />
              )}
              <Markdown className='rich-text-content leading-6' allowHeaderLink>
                {engResource.body}
              </Markdown>
              </div>
              <HRSeparator className='my-8' />
              <div className='mb-10 flex flex-col items-center justify-between gap-4 md:flex-row'>
                <div className='flex'>
                  <SuiText size='sm' weight='medium' color='primary'>
                    Share this resource
                  </SuiText>
                </div>
                <div className='flex flex-wrap justify-center gap-4 text-neutral-0'>
                  <CopyUrlButton />
                  <SocialButton type='y_combinator' title={engResource.title} />
                  <SocialButton type='twitter' title={engResource.title} />
                  <SocialButton type='facebook' title={engResource.title} />
                  <SocialButton type='linkedin' title={engResource.title} />
                </div>
              </div>
            </div>
            <aside className='hidden w-full flex-shrink-0 flex-grow-0 align-top lg:block lg:sticky lg:top-32 lg:max-w-sm'>
              <div className='mb-8'>
                <TableOfContents
                  contentRef={contentRef}
                  headersSelector={engResource.headersSelector || 'h2'}
                />
              </div>
              {moreLikeThis.length > 0 && (
                <div className='mb-8'>
                  <h3 className='mb-6 text-lg font-bold'>More like this</h3>
                  {(
                    moreLikeThis as EngineeringResourcesPageProps['moreLikeThis']
                  ).map((item) => (
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
                  ))}
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
