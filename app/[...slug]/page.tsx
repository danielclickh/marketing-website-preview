import React from 'react'
import { findAll, getPathsValues } from '../../lib/api/strapi'
import '../../styles/RichContentPage.module.scss'
interface RichContentPageProps {
  title: string
  content?: null | string
  fullWidthContent?: null | string
  leftContent?: null | string
  rightContent?: null | string
}

async function getData({ slug }: { slug: string[] }) {
  const { data } = await findAll('rich-content-pages', {
    filters: {
      url: {
        $eq: `/${slug.join('/')}`
      }
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

export default async function RichContentPage({ params }) {
  const {
    title,
    content,
    fullWidthContent,
    leftContent,
    rightContent
  }: RichContentPageProps = await getData(params)
  return (
    <div className='rich_content_page'>
      <div className='hero'>
        <div className='container'>
          <div className='title'>{title}</div>
        </div>
      </div>
      <div className='content_container'>
        <div className='container'>
          {content && (
            <div
              className='rich_content'
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}

          {(leftContent || rightContent) && (
            <div
              className={
                leftContent && rightContent ? 'two_column_container' : ''
              }>
              {leftContent && (
                <div
                  className='rich_content column_content'
                  dangerouslySetInnerHTML={{ __html: leftContent }}
                />
              )}
              {rightContent && (
                <div
                  className='rich_content column_content'
                  dangerouslySetInnerHTML={{ __html: rightContent }}
                />
              )}
            </div>
          )}

          {fullWidthContent && (
            <div
              className='rich_content full_width_content'
              dangerouslySetInnerHTML={{ __html: fullWidthContent }}
            />
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
  const paths = await getPathsValues('rich-content-pages', params, 'slug')

  return paths
}
