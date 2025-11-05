import Breadcrumbs from '@/components-cleaned/Breadcrumbs'
import ScrollToTop from '@/components-cleaned/ScrollToTop'
import SmartBackButton from '@/components-cleaned/SmartBackButton'
import StrapiDynamicBlogModules from '@/components-cleaned/StrapiDynamicBlogModules'
import Avatars from '@/components/Avatars'
import CopyUrlButton from '@/components/CopyUrlButton'
import FollowUs from '@/components/FollowUs'
import HRSeparator from '@/components/HRSeparator'
import Layout from '@/components/Layout'
import Markdown from '@/components/Markdown'
import ReadingProgress from '@/components/ReadingProgress'
import SocialButton from '@/components/SocialButton'
import TableOfContents from '@/components/TableOfContents'
import { SuiText } from '@/components/sui'
import { resourcesController } from '@/lib/api/strapi'
import { convertDateToString } from '@/lib/utils/dateUtils'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { EntryResource } from '@/types/strapi'
import { ArrowLeftIcon } from '@heroicons/react/solid'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React, { useEffect, useRef, useState } from 'react'

export interface Props extends CommonProps {
  resource: EntryResource
}

export const getServerSideProps = (async ({ req, params }) => {
  const categorySlug =
    typeof params?.category === 'string' ? params.category : null

  const resourceSlug = typeof params?.slug === 'string' ? params.slug : null

  if (!categorySlug || !resourceSlug) {
    return {
      notFound: true
    }
  }

  const commonProps = await getCommonProps()
  const resource = await resourcesController.findBySlug(resourceSlug)

  if (!resource || resource.category.slug !== categorySlug) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      ...commonProps,
      resource
    }
  }
}) satisfies GetServerSideProps<Props>

export default function ResourcePage({
  resource,
  ...commonProps
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const contentRef = useRef<null | HTMLDivElement>(null)
  const [hideScrollTopAt, setHideScrollTopAt] = useState<undefined | number>(
    undefined
  )

  useEffect(() => {
    const contentEl = contentRef.current
    if (!contentEl) {
      setHideScrollTopAt(undefined)
      return
    }

    const hideAtHanlder = () => {
      setHideScrollTopAt(contentEl.offsetTop + contentEl.clientHeight)
    }

    const resizeObserver = new ResizeObserver(hideAtHanlder)
    resizeObserver.observe(contentEl)

    return () => resizeObserver.disconnect()
  }, [contentRef.current])

  return (
    <Layout {...commonProps}>
      <ScrollToTop showFrom={600} hideAt={hideScrollTopAt} />
      <div className='relative'>
        <ReadingProgress target={contentRef} />

        <div className='section-container flex flex-col items-start gap-8 py-12 lg:flex-row lg:py-20'>
          <SmartBackButton
            fallbackPath='/resources'
            className='group/backButton -mx-3 -my-1.5 mr-8 inline-flex items-center whitespace-nowrap rounded px-3 py-1.5 text-base font-semibold transition-colors hover:bg-white/5'>
            <ArrowLeftIcon className='mr-2 w-4 transition-transform group-hover/backButton:-translate-x-1' />
            Back
          </SmartBackButton>
          <div className='flex w-full flex-col gap-y-8 lg:grid lg:grid-cols-12 lg:gap-x-6'>
            {/* Meta */}
            <div className='order-1 lg:order-none lg:col-span-11 lg:mb-12 xl:col-span-9'>
              <Breadcrumbs>
                <Breadcrumbs.Link href='/resources'>Resources</Breadcrumbs.Link>
                <Breadcrumbs.Link href={`/resources/${resource.category.slug}`}>
                  {resource.category.name}
                </Breadcrumbs.Link>
              </Breadcrumbs>

              <h1 className='mb-8 mt-6 font-basier text-4xl font-bold text-neutral-100'>
                <span className='leading-snug'>{resource.title}</span>
              </h1>

              {/* Authors */}
              {(resource.author || resource.date) && (
                <div className='flex flex-row items-center space-x-4 pt-2'>
                  {resource.author && (
                    <Avatars avatars={resource.author.avatarPng} />
                  )}
                  <div className='flex flex-col items-start'>
                    {resource.author && (
                      <SuiText size='base' weight='normal'>
                        {resource.author.name}
                      </SuiText>
                    )}
                    {resource.date && (
                      <SuiText size='sm' weight='normal' color='secondary'>
                        {resource.dateLabel ? `${resource.dateLabel}: ` : ''}
                        {convertDateToString(resource.date)}
                      </SuiText>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Blog content */}
            <article className='order-3 lg:order-none lg:col-span-11 xl:col-span-9'>
              <div className='w-full space-y-6' ref={contentRef}>
                {resource.sections &&
                  resource.sections.length > 0 &&
                  resource.sections.map((section, sectionIndex) => {
                    return (
                      <StrapiDynamicBlogModules
                        key={sectionIndex}
                        {...section}
                      />
                    )
                  })}

                {resource.content && (
                  <Markdown
                    className='rich-text-content leading-6'
                    allowHeaderLink={true}>
                    {resource.content}
                  </Markdown>
                )}
              </div>
            </article>

            {/* Blog sidebar */}
            <aside className='order-2 hidden lg:order-none xl:col-span-3 xl:block'>
              <div className='sticky top-30 flex max-h-[calc(100vh_-_9rem)] flex-col gap-6'>
                {resource.tocSelectors && (
                  <TableOfContents
                    contentRef={contentRef}
                    headersSelector={resource.tocSelectors}
                  />
                )}
              </div>
            </aside>

            {/* Blog footer */}
            <div className='order-4 lg:order-none lg:col-span-11 xl:col-span-9'>
              <HRSeparator className='mb-8 !max-w-none' />

              {/* Sharer */}
              <div className='mb-8 flex flex-col items-center justify-between gap-4 md:flex-row'>
                <SuiText size='sm' weight='medium' color='primary'>
                  Share this resource
                </SuiText>
                <div className='flex flex-wrap justify-center gap-4 text-neutral-0'>
                  <CopyUrlButton />
                  <SocialButton type='y_combinator' title={resource.title} />
                  <SocialButton type='twitter' title={resource.title} />
                  <SocialButton type='bluesky' title={resource.title} />
                  <SocialButton type='facebook' title={resource.title} />
                  <SocialButton type='linkedin' title={resource.title} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Socials */}
      <FollowUs />
    </Layout>
  )
}
