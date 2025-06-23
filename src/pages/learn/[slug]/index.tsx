import iconDataWarehousing from '../assets/icon-data-warehousing.svg'
import iconDuration from '../assets/icon-duration.svg'
import iconLevel from '../assets/icon-level.svg'
import iconMlGenAi from '../assets/icon-ml-genai.svg'
import iconModule from '../assets/icon-module.svg'
import iconModules from '../assets/icon-modules.svg'
import iconObservability from '../assets/icon-observability.svg'
import iconQuiz from '../assets/icon-quiz.svg'
import iconQuizzes from '../assets/icon-quizzes.svg'
import iconRealTimeAnalytics from '../assets/icon-real-time-analytics.svg'
import DebugTailwindBreakpoints from '@/components-cleaned/DebugTailwindBreakpoints'
import { CUIButton, CUICard } from '@/components/ClickUI'
import CopyUrlButton from '@/components/CopyUrlButton'
import HRSeparator from '@/components/HRSeparator'
import Layout from '@/components/Layout'
import SocialButton from '@/components/SocialButton'
import { StrapiImageUrl } from '@/components/StrapiElements'
import TiltedText from '@/components/TiltedText'
import { SuiText, SuiTitle } from '@/components/sui'
import { findOne } from '@/lib/api/strapi'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import videoThumbnail from '@/pages/learn/assets/video-thumbnail.png'
import {
  CommonProps,
  HomepageCustomerStories,
  ParamsType
} from '@/types/homepage'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image, { ImageProps } from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

type ItemTypes = 'module' | 'quiz'

interface PageItem {
  title: string
  slug: string
  icon: ImageProps['src']
  h1: string
  intro: string
  level: string
  modules: string
  quizzes: string
  duration: string
  items?: Array<{
    type: ItemTypes
    title: string
    description: string
    link?: string
    panel?: {
      image: ImageProps['src']
      title: string
      description: string
    }
  }>
}

type PageProps = CommonProps &
  PageItem & { customerStories: HomepageCustomerStories }

const itemIcons: Record<ItemTypes, ImageProps['src']> = {
  module: iconModule,
  quiz: iconQuiz
}

export const PAGES: Array<PageItem> = [
  {
    title: 'Real-time analytics',
    slug: 'real-time-analytics',
    icon: iconRealTimeAnalytics,
    h1: 'Master real-time analytics with ClickHouse',
    intro:
      'Learn how to power real-time dashboards, alerts, and event-driven apps with ClickHouse.',
    level: 'Beginner',
    modules: '3 modules',
    quizzes: '2',
    duration: '2.5 hours',
    items: [
      {
        type: 'module',
        title: 'Module 1: Getting started',
        link: '#example',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel pharetra tortor. Quisque interdum leo in velit accumsan, id pellentesque.',
        panel: {
          image: videoThumbnail,
          title: 'Lorem ipsum dolor sit amet',
          description:
            'Quisque in arcu tellus. Ut accumsan at odio a volutpat. Fusce pulvinar dictum lacus vitae euismod non viverra odio.'
        }
      },
      {
        type: 'quiz',
        title: 'Quiz 1: Getting started: What did you learn?',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel pharetra tortor. Quisque interdum leo in velit accumsan, id pellentesque.'
      },
      {
        type: 'module',
        title: 'Module 2: Building dashboards',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel pharetra tortor. Quisque interdum leo in velit accumsan, id pellentesque.',
        panel: {
          image: videoThumbnail,
          title: 'Lorem ipsum dolor sit amet',
          description:
            'Quisque in arcu tellus. Ut accumsan at odio a volutpat. Fusce pulvinar dictum lacus vitae euismod non viverra odio.'
        }
      },
      {
        type: 'module',
        title: 'Module 3: Optimizing queries',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel pharetra tortor. Quisque interdum leo in velit accumsan, id pellentesque.',
        panel: {
          image: videoThumbnail,
          title: 'Lorem ipsum dolor sit amet',
          description:
            'Quisque in arcu tellus. Ut accumsan at odio a volutpat. Fusce pulvinar dictum lacus vitae euismod non viverra odio.'
        }
      },
      {
        type: 'quiz',
        title: 'Quiz 2: Put your skills to the test',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel pharetra tortor. Quisque interdum leo in velit accumsan, id pellentesque.'
      }
    ]
  },
  {
    title: 'ML and GenAI',
    slug: 'machine-learning-and-data-science',
    icon: iconMlGenAi,
    h1: 'Master machine learning and GenAI with ClickHouse',
    intro:
      'Use ClickHouse to prepare data, feed models, and support GenAI workflows at scale.',
    level: 'Beginner',
    modules: '3 modules',
    quizzes: '1',
    duration: '1 hour',
    items: [
      {
        type: 'module',
        title: 'Module 1: Getting started',
        link: '#example',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel pharetra tortor. Quisque interdum leo in velit accumsan, id pellentesque.',
        panel: {
          image: videoThumbnail,
          title: 'Lorem ipsum dolor sit amet',
          description:
            'Quisque in arcu tellus. Ut accumsan at odio a volutpat. Fusce pulvinar dictum lacus vitae euismod non viverra odio.'
        }
      },
      {
        type: 'quiz',
        title: 'Quiz 1: Getting started: What did you learn?',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel pharetra tortor. Quisque interdum leo in velit accumsan, id pellentesque.'
      },
      {
        type: 'module',
        title: 'Module 2: Building dashboards',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel pharetra tortor. Quisque interdum leo in velit accumsan, id pellentesque.',
        panel: {
          image: videoThumbnail,
          title: 'Lorem ipsum dolor sit amet',
          description:
            'Quisque in arcu tellus. Ut accumsan at odio a volutpat. Fusce pulvinar dictum lacus vitae euismod non viverra odio.'
        }
      },
      {
        type: 'module',
        title: 'Module 3: Optimizing queries',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel pharetra tortor. Quisque interdum leo in velit accumsan, id pellentesque.',
        panel: {
          image: videoThumbnail,
          title: 'Lorem ipsum dolor sit amet',
          description:
            'Quisque in arcu tellus. Ut accumsan at odio a volutpat. Fusce pulvinar dictum lacus vitae euismod non viverra odio.'
        }
      },
      {
        type: 'quiz',
        title: 'Quiz 2: Put your skills to the test',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel pharetra tortor. Quisque interdum leo in velit accumsan, id pellentesque.'
      }
    ]
  },
  {
    title: 'Data warehousing',
    slug: 'data-warehousing',
    icon: iconDataWarehousing,
    h1: 'Master data warehousing with ClickHouse',
    intro:
      'Design, build, and optimize modern data warehouses using ClickHouse.',
    level: 'Beginner',
    modules: '6 modules',
    quizzes: '3',
    duration: '4.5 hours',
    items: [
      {
        type: 'module',
        title: 'Module 1: Getting started',
        link: '#example',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel pharetra tortor. Quisque interdum leo in velit accumsan, id pellentesque.',
        panel: {
          image: videoThumbnail,
          title: 'Lorem ipsum dolor sit amet',
          description:
            'Quisque in arcu tellus. Ut accumsan at odio a volutpat. Fusce pulvinar dictum lacus vitae euismod non viverra odio.'
        }
      },
      {
        type: 'quiz',
        title: 'Quiz 1: Getting started: What did you learn?',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel pharetra tortor. Quisque interdum leo in velit accumsan, id pellentesque.'
      },
      {
        type: 'module',
        title: 'Module 2: Building dashboards',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel pharetra tortor. Quisque interdum leo in velit accumsan, id pellentesque.',
        panel: {
          image: videoThumbnail,
          title: 'Lorem ipsum dolor sit amet',
          description:
            'Quisque in arcu tellus. Ut accumsan at odio a volutpat. Fusce pulvinar dictum lacus vitae euismod non viverra odio.'
        }
      },
      {
        type: 'module',
        title: 'Module 3: Optimizing queries',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel pharetra tortor. Quisque interdum leo in velit accumsan, id pellentesque.',
        panel: {
          image: videoThumbnail,
          title: 'Lorem ipsum dolor sit amet',
          description:
            'Quisque in arcu tellus. Ut accumsan at odio a volutpat. Fusce pulvinar dictum lacus vitae euismod non viverra odio.'
        }
      },
      {
        type: 'quiz',
        title: 'Quiz 2: Put your skills to the test',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel pharetra tortor. Quisque interdum leo in velit accumsan, id pellentesque.'
      }
    ]
  },
  {
    title: 'Observability',
    slug: 'observability',
    icon: iconObservability,
    h1: 'Master observability with ClickHouse',
    intro:
      'Ingest logs, metrics, and traces to monitor systems and power observability dashboards.',
    level: 'Beginner',
    modules: '4 modules',
    quizzes: '1',
    duration: '2.5 hours',
    items: [
      {
        type: 'module',
        title: 'Module 1: Getting started',
        link: '#example',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel pharetra tortor. Quisque interdum leo in velit accumsan, id pellentesque.',
        panel: {
          image: videoThumbnail,
          title: 'Lorem ipsum dolor sit amet',
          description:
            'Quisque in arcu tellus. Ut accumsan at odio a volutpat. Fusce pulvinar dictum lacus vitae euismod non viverra odio.'
        }
      },
      {
        type: 'quiz',
        title: 'Quiz 1: Getting started: What did you learn?',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel pharetra tortor. Quisque interdum leo in velit accumsan, id pellentesque.'
      },
      {
        type: 'module',
        title: 'Module 2: Building dashboards',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel pharetra tortor. Quisque interdum leo in velit accumsan, id pellentesque.',
        panel: {
          image: videoThumbnail,
          title: 'Lorem ipsum dolor sit amet',
          description:
            'Quisque in arcu tellus. Ut accumsan at odio a volutpat. Fusce pulvinar dictum lacus vitae euismod non viverra odio.'
        }
      },
      {
        type: 'module',
        title: 'Module 3: Optimizing queries',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel pharetra tortor. Quisque interdum leo in velit accumsan, id pellentesque.',
        panel: {
          image: videoThumbnail,
          title: 'Lorem ipsum dolor sit amet',
          description:
            'Quisque in arcu tellus. Ut accumsan at odio a volutpat. Fusce pulvinar dictum lacus vitae euismod non viverra odio.'
        }
      },
      {
        type: 'quiz',
        title: 'Quiz 2: Put your skills to the test',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel pharetra tortor. Quisque interdum leo in velit accumsan, id pellentesque.'
      }
    ]
  }
]

export async function getStaticPaths() {
  return {
    paths: PAGES.map((item) => ({
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

    const page = PAGES.find((page) => page.slug === slug)

    if (!page) {
      return {
        notFound: true
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
          path: `/learn/${page.slug}`
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
    <Layout headerData={headerData} footerData={footerData} seo={seo}>
      {/* Hero */}
      <section>
        <div className='section-container my-4 lg:my-16'>
          <div className='rounded-xl bg-primary-300 px-3 pb-6 md:px-10'>
            <div className='flip-selection flex flex-col items-center gap-6 py-11 text-center text-neutral-950'>
              <p className='text-base font-bold'>
                <Link href='/learn' className='hover:underline'>
                  Training
                </Link>{' '}
                / <span>{props.title}</span>
              </p>
              <SuiTitle type='h1' className='max-w-4xl'>
                {props.h1}
              </SuiTitle>
              <SuiText size='lg' className='max-w-lg'>
                {props.intro}
              </SuiText>
              <CUIButton type='primary-dark' size='lg' className='px-8'>
                Start learning
              </CUIButton>
            </div>
          </div>
          <DebugTailwindBreakpoints className='fixed bottom-0 left-0 z-[9999]' />
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
                    src={iconQuizzes}
                    alt='Icon'
                    width={36}
                    height={36}
                    className='aspect-square w-9 object-contain object-center'
                  />
                  <div className='flex flex-col'>
                    <span className='text-sm text-neutral-200'>Quizzes</span>
                    <span className='text-xl font-bold'>{props.quizzes}</span>
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
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Items */}
      {props.items && props.items.length > 0 && (
        <section className='section-container relative my-16 lg:my-24'>
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
          <ol className='relative z-10 mx-auto max-w-2xl space-y-14'>
            {props.items.map((item, itemIndex) => {
              return (
                <li key={itemIndex} className='flex items-start gap-4 md:gap-8'>
                  <div
                    ref={(el: HTMLDivElement) =>
                      (timelineDotRefs.current[itemIndex] = el)
                    }
                    className='flex aspect-square w-10 flex-shrink-0 flex-grow-0 rounded-full border border-neutral-700/80 bg-neutral-900 shadow md:w-14'>
                    <Image
                      src={itemIcons[item.type]}
                      alt={item.type}
                      width={24}
                      height={24}
                      className='m-auto h-auto w-5 md:w-6'
                    />
                  </div>
                  <div className='relative mt-2 flex-1 md:mt-3'>
                    {item.link && (
                      <Link
                        href={item.link}
                        target='_blank'
                        className='absolute -inset-4 rounded-lg transition-colors hover:bg-white/5'>
                        <span className='sr-only'>{item.title}</span>
                      </Link>
                    )}
                    <SuiTitle type='h3'>{item.title}</SuiTitle>
                    <SuiText className='text-neutral-200'>
                      {item.description}
                    </SuiText>
                    {item.panel && (
                      <div className='mt-8 flex flex-col items-center overflow-hidden rounded bg-neutral-900 md:flex-row'>
                        <Image
                          src={item.panel.image}
                          alt={item.panel.title}
                          width={640}
                          height={480}
                          className='aspect-video w-full object-cover object-center md:max-w-56'
                        />
                        <div className='px-6 py-4'>
                          <SuiTitle type='h4'>{item.panel.title}</SuiTitle>
                          <SuiText size='sm'>{item.panel.description}</SuiText>
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>

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
