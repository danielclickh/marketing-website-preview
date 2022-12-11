import React from 'react'
import Markdown from '../../components/Markdown'
import { findAll, getPathsValues } from '../../lib/api/strapi'
import styles from './RichContentPage.module.scss'

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
    <div className={styles.rich_content_page}>
      <div className={styles.hero}>
        <div className='mx-auto container'>
          <h1>{title}</h1>
        </div>
      </div>
      <div className='content_container mb-16'>
        <div className='mx-auto container'>
          {content && (
            <div className='rich_content'>
              <Markdown>{content}</Markdown>
            </div>
          )}

          {(leftContent || rightContent) && (
            <div
              className={
                leftContent && rightContent ? 'two_column_container' : ''
              }>
              {leftContent && (
                <div className='rich_content column_content'>
                  <Markdown>{leftContent}</Markdown>
                </div>
              )}
              {rightContent && (
                <div className='rich_content column_content'>
                  <Markdown>{rightContent}</Markdown>
                </div>
              )}
            </div>
          )}

          {fullWidthContent && (
            <div className='rich_content full_width_content'>
              <Markdown>{fullWidthContent}</Markdown>
            </div>
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
