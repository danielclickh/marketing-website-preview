import React from 'react'
import Markdown from '../../components/Markdown'
import { SuiTitle } from '../../components/sui'
import { findAll, getPathsValues } from '../../lib/api/strapi'
import { ParamsType } from './types'

interface RichContentPageProps {
  title: string
  content?: null | string
  fullWidthContent?: null | string
  leftContent?: null | string
  rightContent?: null | string
}

async function getData({ slug }: ParamsType) {
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
  const page = data[0] ?? {}
  return {
    title: page.title,
    content: page.content,
    fullWidthContent: page.full_width_content,
    leftContent: page.left_content,
    rightContent: page.right_content
  }
}

export const dynamicParams = false

export default async function RichContentPage({
  params
}: {
  params: ParamsType
}) {
  const {
    title,
    content,
    fullWidthContent,
    leftContent,
    rightContent
  }: RichContentPageProps = await getData(params)

  return (
    <div className='rich-content-page'>
      <SuiTitle
        type='h1'
        className='mx-auto container py-16 px-0 flex items-center justify-center font-bold text-center max-w-screen-lg'>
        {title}
      </SuiTitle>
      <div className='px-4 pb-16 mb-16'>
        <div className='mx-auto container max-w-7xl'>
          {content && (
            <Markdown showHeaderLink className='rich-text-content show-anchor'>
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
                <Markdown
                  showHeaderLink
                  className='w-full rich-text-content show-anchor'>
                  {leftContent}
                </Markdown>
              )}
              {rightContent && (
                <Markdown
                  showHeaderLink
                  className='w-full rich-text-content show-anchor'>
                  {rightContent}
                </Markdown>
              )}
            </div>
          )}

          {fullWidthContent && (
            <Markdown
              showHeaderLink
              className='mx-auto my-16 rich-text-content show-anchor'>
              {fullWidthContent}
            </Markdown>
          )}
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const params = {
    fields: ['url']
  }
  const paths = await getPathsValues('rich-content-pages', params, 'url', true)

  return paths
}
