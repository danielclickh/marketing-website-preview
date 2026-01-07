import StrapiDynamicPageModules from '@/components-cleaned/StrapiDynamicPageModules'
import Layout from '@/components/Layout'
import { pagesService, seoFieldToNextComponentProps } from '@/lib/api/strapi'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { EntryPage } from '@/types/strapi'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import React from 'react'

export interface Props extends CommonProps {
  page: EntryPage
}

export async function getStaticPaths() {
  const pages = await pagesService.findAll({
    fields: ['path'],
    populate: []
  })

  return {
    paths: pages.map((post) => ({
      params: { slug: post.path.split('/') }
    })),
    fallback: 'blocking'
  }
}

export const getStaticProps = (async ({ params }) => {
  const slug = Array.isArray(params?.slug) ? params.slug : null

  if (!slug || !slug.length) {
    return {
      notFound: true
    }
  }

  const commonProps = await getCommonProps()

  const page = await pagesService.findOne({
    filters: {
      path: slug.join('/')
    }
  })

  if (!page) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      ...commonProps,
      page,
      seo: seoFieldToNextComponentProps(page.seo, {
        title: `${page.title} | ClickHouse`,
        path: `/${page.path}`
      })
    }
  }
}) satisfies GetStaticProps<Props>

export default function Page({
  page,
  ...commonProps
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout {...commonProps}>
      {page.sections &&
        page.sections.length > 0 &&
        page.sections.map((section, sectionIndex) => {
          return <StrapiDynamicPageModules key={sectionIndex} {...section} />
        })}
    </Layout>
  )
}
