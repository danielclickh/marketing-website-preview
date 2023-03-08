import { GetStaticProps } from 'next'
import React from 'react'
import Layout from '../components/Layout'
import Markdown from '../components/Markdown'
import { SuiTitle } from '../components/sui'
import { findAll, getPathsValues } from '../lib/api/strapi'
import {
  NOT_FOUND_FALLBACK,
  REVALIDATE_SECONDS
} from '../lib/utils/revalidationConfig'
import { getCommonProps } from '../lib/utils/getCommonProps'
import { CatAllParamsType, RichContentPageProps } from '../types/homepage'

export const getStaticProps: GetStaticProps<RichContentPageProps> =
  async function getStaticProps({ params }) {
    const { slug } = params as CatAllParamsType
    const { data } = await findAll('rich-content-pages', {
      filters: {
        $or: [
          {
            url: {
              $eq: `/${slug.join('/')}`
            }
          },
          {
            url: {
              $eq: `/${slug.join('/')}/`
            }
          }
        ]
      }
    })
    const page = data[0]

    if (!page) {
      return {
        notFound: true,
        revalidate: REVALIDATE_SECONDS
      }
    }

    const commonProps = await getCommonProps()
    return {
      props: {
        title: page.title,
        content: page.content,
        fullWidthContent: page.full_width_content,
        leftContent: page.left_content,
        rightContent: page.right_content,
        ...commonProps,
        seo: {
          title: page.title,
          type: 'website',
          siteName: 'ClickHouse'
        }
      },
      revalidate: REVALIDATE_SECONDS
    }
  }

export default function RichContentPage({
  title,
  content,
  fullWidthContent,
  leftContent,
  rightContent,
  headerData,
  footerData,
  seo
}: RichContentPageProps) {
  return (
    <Layout headerData={headerData} footerData={footerData} seo={seo}>
      <div className='rich-content-page'>
        <SuiTitle
          type='h1'
          className='mx-auto container py-16 px-0 flex items-center justify-center font-bold text-center max-w-screen-lg'>
          {title}
        </SuiTitle>
        <div className='px-4 pb-16 mb-16'>
          <div className='mx-auto container max-w-7xl'>
            {content && (
              <Markdown className='rich-text-content show-anchor'>
                {content}
              </Markdown>
            )}

            {(leftContent || rightContent) && (
              <div
                className={
                  leftContent && rightContent
                    ? 'mb-16 flex flex-col items-start justify-center md:grid md:grid-cols-2 gap-x-[5%]'
                    : 'mb-16'
                }>
                {leftContent && (
                  <Markdown className='w-full rich-text-content show-anchor'>
                    {leftContent}
                  </Markdown>
                )}
                {rightContent && (
                  <Markdown className='w-full rich-text-content show-anchor'>
                    {rightContent}
                  </Markdown>
                )}
              </div>
            )}

            {fullWidthContent && (
              <Markdown className='mx-auto my-16 rich-text-content show-anchor'>
                {fullWidthContent}
              </Markdown>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const params = {
    fields: ['url']
  }
  const paths = await getPathsValues('rich-content-pages', params, 'url', true)

  return {
    paths,
    fallback: NOT_FOUND_FALLBACK
  }
}
