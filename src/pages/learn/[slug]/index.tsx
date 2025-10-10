import iconDuration from '../assets/icon-duration.svg'
import iconLevel from '../assets/icon-level.svg'
import iconModules from '../assets/icon-modules.svg'
import iconTrophy from '../assets/icon-trophy.svg'
import Breadcrumbs from '@/components-cleaned/Breadcrumbs'
import { CUIButton } from '@/components/ClickUI'
import CopyUrlButton from '@/components/CopyUrlButton'
import HRSeparator from '@/components/HRSeparator'
import Layout from '@/components/Layout'
import Markdown from '@/components/Markdown'
import Nbsp from '@/components/Nbsp'
import SocialButton from '@/components/SocialButton'
import { StrapiImageUrl } from '@/components/StrapiElements'
import TiltedText from '@/components/TiltedText'
import { SuiText, SuiTitle } from '@/components/sui'
import { pages, PageItem, Section } from '@/data/learn'
import { findOne } from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { camel } from '@/lib/utils/strings'
import {
  CommonProps,
  HomepageCustomerStories,
  ParamsType
} from '@/types/homepage'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image, { ImageProps } from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

type PageProps = CommonProps &
  PageItem & { customerStories: HomepageCustomerStories }

export async function getStaticPaths() {
  return {
    paths: pages
      .filter((item) => {
        return !item.comingSoon
      })
      .map((item) => ({
        params: {
          slug: item.slug
        }
      })),
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps<PageProps> =
  async function getStaticProps({ params }) {
    const { slug } = params as ParamsType

    const page = pages.find((page) => page.slug === slug)

    if (!page) {
      return {
        notFound: true
      }
    }

    if (page.comingSoon && page.lmsUrl) {
      return {
        redirect: {
          destination: page.lmsUrl,
          permanent: false
        }
      }
    }

    const data = await findOne('homepage', {
      populate: [
        'customerStories',
        'customerStories.*',
        'customerStories.logos.*',
        'customerStories.logos.darkLogoPng'
      ]
    })

    return {
      props: {
        ...(await getCommonProps()),
        ...page,
        ...data,
        seo: {
          title: `${page.title} | ClickHouse Training`,
          description: page.intro,
          path: `/learn/${page.slug}`,
          imageUrl: 'https://clickhouse.com/images/clickhouse-learning-og.png'
        }
      }
    }
  }

export default function Page({
  headerData,
  footerData,
  seo,
  platforms,
  customerStories,
  ...props
}: InferGetStaticPropsType<typeof getStaticProps>) {
  useGalaxyOnPage(`learn${camel(props.slug)}`)

  return (
    <Layout headerData={headerData} footerData={footerData} seo={seo}>
      {/* Hero */}
      <section>
        <div className='section-container my-4 lg:my-16'>
          <div className='rounded-xl bg-primary-300 px-3 pb-6 md:px-10'>
            <div className='flip-selection flex flex-col items-center gap-6 py-11 text-center text-neutral-950'>
              <Breadcrumbs className='!text-inherit'>
                <Breadcrumbs.Link href='/learn'>Training</Breadcrumbs.Link>
                <Breadcrumbs.Item>{props.title}</Breadcrumbs.Item>
              </Breadcrumbs>
              <SuiTitle type='h1' className='max-w-5xl'>
                {props.h1}
              </SuiTitle>
              <SuiText size='lg' className='max-w-lg'>
                {props.intro}
              </SuiText>
              {props.lmsUrl && (
                <CUIButton
                  href={props.lmsUrl}
                  type='primary-dark'
                  size='lg'
                  className='!px-8'>
                  Start learning
                </CUIButton>
              )}
            </div>
          </div>
          <div className='-mt-10 px-4 md:px-10'>
            <div className='mx-auto w-full max-w-4xl rounded-lg border border-neutral-700/80 bg-neutral-800 px-6 py-4'>
              <ul className='grid w-full gap-y-6 sm:grid-cols-2 lg:grid-cols-4'>
                <li className='flex items-center gap-4'>
                  <Image
                    src={iconLevel}
                    alt='Icon'
                    width={36}
                    height={36}
                    className='aspect-square w-9 object-contain object-center'
                  />
                  <div className='flex flex-col'>
                    <span className='text-sm text-neutral-200'>
                      Skill level
                    </span>
                    <span className='text-xl font-bold'>{props.level}</span>
                  </div>
                </li>
                <li className='flex items-center gap-4'>
                  <Image
                    src={iconModules}
                    alt='Icon'
                    width={36}
                    height={36}
                    className='aspect-square w-9 object-contain object-center'
                  />
                  <div className='flex flex-col'>
                    <span className='text-sm text-neutral-200'>Course</span>
                    <span className='text-xl font-bold'>{props.modules}</span>
                  </div>
                </li>
                <li className='flex items-center gap-4'>
                  <Image
                    src={iconDuration}
                    alt='Icon'
                    width={36}
                    height={36}
                    className='aspect-square w-9 object-contain object-center'
                  />
                  <div className='flex flex-col'>
                    <span className='text-sm text-neutral-200'>Duration</span>
                    <span className='text-xl font-bold'>{props.duration}</span>
                  </div>
                </li>
                <li className='flex items-center gap-4'>
                  <Image
                    src={iconTrophy}
                    alt='Icon'
                    width={36}
                    height={36}
                    className='aspect-square w-9 object-contain object-center'
                  />
                  <div className='flex flex-col'>
                    <span className='text-sm text-neutral-200'>
                      Credentials
                    </span>
                    <span className='text-xl font-bold'>
                      {props.credentials}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Items */}
      {props.sections && props.sections.length > 0 && (
        <section className='section-container relative my-16 lg:my-24'>
          {props.sections.map((section, sectionIndex) => {
            return <LearnSection key={sectionIndex} section={section} />
          })}

          {/* Separator */}
          <HRSeparator className='mb-8 mt-16 !max-w-2xl lg:mt-24' />

          {/* Sharer */}
          <div className='mx-auto flex max-w-2xl flex-col items-center justify-between gap-4 md:flex-row'>
            <SuiText size='sm' weight='bold' color='primary'>
              Share this page
            </SuiText>
            <div className='flex flex-wrap justify-center gap-4 text-neutral-0'>
              <CopyUrlButton />
              <SocialButton type='y_combinator' title={props.title} />
              <SocialButton type='twitter' title={props.title} />
              <SocialButton type='bluesky' title={props.title} />
              <SocialButton type='facebook' title={props.title} />
              <SocialButton type='linkedin' title={props.title} />
            </div>
          </div>
        </section>
      )}

      {/* Trusted by */}
      <section className='bg-primary-300 py-20 text-neutral-950'>
        <div className='section-container'>
          <SuiTitle type='h3' className='mb-10 text-center'>
            Trusted by the best developers that work with data{' '}
            <TiltedText type='white-on-black' className='px-1 py-0.5'>
              at scale
            </TiltedText>
          </SuiTitle>
          <div className='mask-logos-carousel opacity-90 brightness-50 grayscale'>
            <div className='pause-hover hide-scrollbar relative flex overflow-hidden'>
              <div className='flex animate-marqueeLeft5 items-center whitespace-nowrap'>
                {customerStories.logos.map((logo, logoIndex) => {
                  return (
                    <div
                      key={logoIndex}
                      className='w-max flex-shrink-0 flex-grow-0 px-6'>
                      <StrapiImageUrl {...logo.darkLogoPng} />
                    </div>
                  )
                })}
              </div>
              <div className='flex animate-marqueeLeft5 items-center whitespace-nowrap'>
                {customerStories.logos.map((logo, logoIndex) => {
                  return (
                    <div
                      key={logoIndex}
                      className='w-max flex-shrink-0 flex-grow-0 px-6'>
                      <StrapiImageUrl {...logo.darkLogoPng} />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

function LearnSection({ section }: { section: Section }) {
  const [timelineCoords, setTimelineCoords] = useState<null | {
    top: number
    right: number
    bottom: number
    left: number
  }>(null)
  const timelineLineRef = useRef<HTMLDivElement | null>(null)
  const timelineDotRefs = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    const calculatePosition = () => {
      const line = timelineLineRef.current
      const container = line?.parentElement
      const first = timelineDotRefs.current[0]
      const last = timelineDotRefs.current[timelineDotRefs.current.length - 1]

      if (line && container && first && last) {
        const containerRect = container.getBoundingClientRect()
        const firstRect = first.getBoundingClientRect()
        const lastRect = last.getBoundingClientRect()

        const round = (value: number) => parseFloat(value.toFixed(2))
        setTimelineCoords({
          top: round(firstRect.top - containerRect.top + firstRect.height / 2),
          left: round(
            firstRect.left - containerRect.left + firstRect.width / 2
          ),
          bottom: round(
            containerRect.bottom - lastRect.bottom + lastRect.height / 2
          ),
          right: round(
            containerRect.right - lastRect.right + lastRect.width / 2
          )
        })
      }
    }

    // Set initial values on mount
    calculatePosition()
    const timer = window.setTimeout(calculatePosition, 500) // Give the page time to adjust

    window.addEventListener('resize', calculatePosition)
    return () => {
      window.removeEventListener('resize', calculatePosition)
      window.clearTimeout(timer)
    }
  }, [timelineLineRef, timelineDotRefs])

  return (
    <div className='relative my-16 lg:my-24'>
      <div
        ref={timelineLineRef}
        className={`bg-gradient-checkered absolute z-0 w-0.5 from-neutral-600 bg-[length:1rem_1rem] transition-opacity ${timelineCoords ? '' : 'opacity-0'}`}
        style={{
          top: timelineCoords?.top || 0,
          right: timelineCoords?.right || 0,
          bottom: timelineCoords?.bottom || 0,
          left: timelineCoords?.left || 0
        }}
      />
      <div className='mx-auto max-w-2xl space-y-6'>
        {section.title && <SuiTitle type='h2'>{section.title}</SuiTitle>}
        {section.description && (
          <Markdown className='rich-text-content text-neutral-200'>
            {section.description}
          </Markdown>
        )}
        {section.items && section.items.length > 0 && (
          <ol className='relative z-10 space-y-14'>
            {section.items.map((item, itemIndex) => {
              return (
                <li
                  key={itemIndex}
                  className='group flex items-start gap-4 md:gap-8'>
                  <div
                    ref={(el: HTMLDivElement) =>
                      (timelineDotRefs.current[itemIndex] = el)
                    }
                    className='flex aspect-square w-10 flex-shrink-0 flex-grow-0 rounded-full border border-neutral-700/80 bg-neutral-900 shadow md:w-14'>
                    <Image
                      alt={item.icon.alt || item.title}
                      width={24}
                      height={24}
                      {...item.icon}
                      className={`m-auto h-auto w-5 md:w-6 ${item.icon?.className || ''}`}
                    />
                  </div>
                  <div className='relative mt-2 flex-1 md:mt-3'>
                    {item.link && (
                      <Link
                        href={item.link}
                        className='absolute -inset-4 rounded-lg transition-colors hover:bg-white/5'>
                        <span className='sr-only'>{item.title}</span>
                      </Link>
                    )}
                    <div className='space-y-6'>
                      {item.title && (
                        <SuiTitle type='h3'>
                          {item.title}
                          {item.badge && (
                            <>
                              {' '}
                              <Nbsp />{' '}
                              <small className='inline-block rounded border border-white/20 bg-white/10 px-2 py-0.5 text-sm font-medium leading-tight text-primary-300'>
                                {item.badge}
                              </small>
                            </>
                          )}
                        </SuiTitle>
                      )}

                      {item.description && (
                        <Markdown className='rich-text-content text-neutral-200'>
                          {item.description}
                        </Markdown>
                      )}
                      {item.panel && (
                        <div className='flex flex-col items-center overflow-hidden rounded bg-neutral-900 md:flex-row'>
                          {item.panel.image && (
                            <Image
                              alt={item.panel.title || item.title}
                              width={640}
                              height={480}
                              {...item.panel.image}
                              className={`aspect-video w-full flex-shrink-0 object-cover object-center md:w-56 ${item.panel.image?.className || ''}`}
                            />
                          )}
                          <div className='px-6 py-4'>
                            {item.panel.title && (
                              <SuiTitle type='h4'>{item.panel.title}</SuiTitle>
                            )}
                            {item.panel.description && (
                              <SuiText size='sm'>
                                {item.panel.description}
                              </SuiText>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        )}
      </div>
    </div>
  )
}
