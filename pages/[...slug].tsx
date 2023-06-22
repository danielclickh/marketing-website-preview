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
import SupportProgram from '../components/SupportProgram'

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
        slug: slug.join('/'),
        ...commonProps,
        seo: {
          title: page.title,
          type: 'website',
          siteName: 'ClickHouse',
          path: `/${slug.join('/')}`
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
  footerData,
  headerData,
  seo,
  slug
}: RichContentPageProps) {
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      {slug === 'support/program' ? (
        <SupportProgram
          {...{
            title,
            content,
            fullWidthContent,
            leftContent,
            rightContent,
            footerData,
            seo,
            slug
          }}
        />
      ) : (
        <div className='rich-content-page'>
          <SuiTitle
            type='h1'
            className='container mx-auto flex max-w-screen-lg items-center justify-center py-16 px-0 text-center font-bold'>
            {title}
          </SuiTitle>
          <div className='mb-16 px-4 pb-16'>
            <div className='container mx-auto max-w-7xl'>
              {content && (
                <Markdown className='rich-text-content show-anchor'>
                  {content}
                </Markdown>
              )}

              {(leftContent || rightContent) && (
                <div
                  className={
                    leftContent && rightContent
                      ? 'mb-16 flex flex-col items-start justify-center gap-x-[5%] md:grid md:grid-cols-2'
                      : 'mb-16'
                  }>
                  {leftContent && (
                    <Markdown className='rich-text-content show-anchor w-full'>
                      {leftContent}
                    </Markdown>
                  )}
                  {rightContent && (
                    <Markdown className='rich-text-content show-anchor w-full'>
                      {rightContent}
                    </Markdown>
                  )}
                </div>
              )}

              {fullWidthContent && (
                <Markdown className='rich-text-content show-anchor mx-auto my-16'>
                  {fullWidthContent}
                </Markdown>
              )}
            </div>
          </div>
        </div>
      )}
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
