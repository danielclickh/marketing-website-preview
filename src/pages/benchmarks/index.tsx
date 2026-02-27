import chartPerformanceImprovements from './assets/chart-performance-improvements.svg'
import Breadcrumbs from '@/components-cleaned/Breadcrumbs'
import PaginateChildren from '@/components-cleaned/PaginateChildren'
import StrapiBlogPostCard from '@/components-cleaned/StrapiBlogPostCard'
import StrapiImage from '@/components-cleaned/StrapiImage'
import ClearFiltersButton from '@/components/ClearFiltersButton/ClearFiltersButton'
import { CUIButton, CUICard } from '@/components/ClickUI'
import Layout from '@/components/Layout'
import LinkWithArrow from '@/components/LinkWithArrow'
import MarketoForm from '@/components/MarketoForm'
import TiltedText from '@/components/TiltedText'
import { SuiTitle } from '@/components/sui'
import { blogService } from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import imageClickbench from '@/pages/clickhouse/assets/image-clickbench.png'
import { CommonProps } from '@/types/homepage'
import { EntryBlogPost } from '@/types/strapi'
import { ChevronDown } from 'lucide-react'
import { GetStaticProps } from 'next'
import Image, { ImageProps } from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/effect-creative'
import { EffectCoverflow, Mousewheel, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperClass } from 'swiper/types'

type BlogCompetitors =
  | 'Postgres'
  | 'Snowflake'
  | 'MongoDB'
  | 'Databricks'
  | 'Elastic'
  | 'Redshift'
  | 'BigQuery'

type BlogFeatures =
  | 'Joins'
  | 'Inserts / Updates'
  | 'Select'
  | 'Cloud'
  | 'JSON'
  | 'Lakehouse'
type BlogItem = {
  slug: string
  entry: EntryBlogPost
  title?: string
  benchmarkImage?: ImageProps['src']
  featured?: boolean
  competitors?: Array<BlogCompetitors>
  features?: Array<BlogFeatures>
}

const POST_MAP: Array<Omit<BlogItem, 'entry'>> = [
  {
    slug: 'cloud-data-warehouses-cost-performance-comparison',
    featured: true
  },
  {
    slug: 'join-me-if-you-can-clickhouse-vs-databricks-snowflake-part-2',
    featured: true
  },
  {
    slug: 'clickhouse-input-format-matchup-which-is-fastest-most-efficient',
    featured: true
  },
  {
    slug: 'clickhouse-parallel-replicas',
    featured: true
  },
  {
    slug: 'json-bench-clickhouse-vs-mongodb-elasticsearch-duckdb-postgresql',
    featured: true
  },
  {
    slug: 'clickhouse-fully-supports-joins-how-to-choose-the-right-algorithm-part5',
    benchmarkImage: '/uploads/imdb_large_5b5d3f45ee.png',
    features: ['Joins', 'Select']
  },
  {
    slug: 'asynchronous-data-inserts-in-clickhouse',
    benchmarkImage: '/uploads/async_inserts_12_8c2f0816e9.png',
    features: ['Inserts / Updates']
  },
  {
    slug: 'clickhouse-cloud-boosts-performance-with-sharedmergetree-and-lightweight-updates',
    benchmarkImage: '/uploads/smt_16_203c52f971.png',
    features: ['Cloud']
  },
  {
    slug: 'clickhouse-keeper-a-zookeeper-alternative-written-in-cpp',
    benchmarkImage: '/uploads/Keeper_05_ef049cc5e4.png',
    features: ['Cloud']
  },
  {
    slug: 'supercharge-your-clickhouse-data-loads-part2',
    benchmarkImage: '/uploads/large_data_loads_p2_07_357c63e939.png',
    features: ['Inserts / Updates']
  },
  {
    slug: 'clickhouse-input-format-matchup-which-is-fastest-most-efficient',
    benchmarkImage: '/uploads/Blog_Formats_003_93c66d9a7e.png',
    features: ['Inserts / Updates']
  },
  {
    slug: 'accelerating-clickhouse-json-queries-for-fast-bluesky-dashboards',
    benchmarkImage:
      '/uploads/Accelerating_Click_House_queries_on_JSON_data_for_faster_Bluesky_insights_120d449e25.png',
    features: ['Select', 'JSON']
  },
  {
    slug: 'clickhouse-gets-lazier-and-faster-introducing-lazy-materialization',
    benchmarkImage: '/uploads/Blog_LAZY_MATERIALIZATION_001_d7b4526449.png',
    features: ['Select']
  },
  {
    slug: 'clickhouse-and-parquet-a-foundation-for-fast-lakehouse-analytics',
    benchmarkImage: '/uploads/Blog_Formats_Reads_014_22d723e649.png',
    features: ['Select', 'Lakehouse']
  },
  {
    slug: 'building-a-distributed-cache-for-s3',
    benchmarkImage: '/uploads/Blog_caches_002_4142f575eb.png',
    features: ['Select', 'Cloud']
  },
  {
    slug: 'updates-in-clickhouse-3-benchmarks',
    benchmarkImage: '/uploads/Blog_updates_Part_3_004_b700981c01.png',
    features: ['Inserts / Updates']
  },
  {
    slug: 'clickhouse-parallel-replicas',
    benchmarkImage: '/uploads/Parallel_Replicas_004_2e1de3a30e.png',
    features: ['Select', 'Cloud']
  },

  /// Filtered by competitor
  {
    slug: 'clickhouse_vs_elasticsearch_the_billion_row_matchup',
    benchmarkImage:
      '/uploads/Click_House_vs_Elasticsearch_The_Billion_Row_Matchup_6dcd5512b2.png',
    competitors: ['Elastic']
  },
  {
    slug: 'json-bench-clickhouse-vs-mongodb-elasticsearch-duckdb-postgresql',
    benchmarkImage:
      '/uploads/The_billion_docs_JSON_Challenge_Click_House_vs_Mongo_DB_Elasticsearch_and_more_41011801ad.png',
    competitors: ['Elastic', 'MongoDB']
  },
  {
    slug: 'join-me-if-you-can-clickhouse-vs-databricks-snowflake-join-performance',
    benchmarkImage: '/uploads/total_perf_5b_149633e506.png',
    competitors: ['Snowflake', 'Databricks']
  },
  {
    slug: 'join-me-if-you-can-clickhouse-vs-databricks-snowflake-part-2',
    benchmarkImage: '/uploads/image_388111140b.png',
    competitors: ['Snowflake', 'Databricks']
  },
  {
    slug: 'update-performance-clickhouse-vs-postgresql',
    benchmarkImage: '/uploads/Blog_updates_Part_4_001_1ee0bc6501.png',
    competitors: ['Postgres']
  },
  {
    slug: 'cloud-data-warehouses-cost-performance-comparison',
    benchmarkImage: '/uploads/Blog_Costs_009_18d232f919.png',
    competitors: ['Snowflake', 'Databricks', 'Redshift', 'BigQuery']
  }
]

type Props = CommonProps & { blogs: Array<BlogItem> }

export const getStaticProps: GetStaticProps<Props> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()

    const blogPosts = await blogService.findAll({
      filters: {
        slug: {
          $in: POST_MAP.map((p) => p.slug)
        }
      },
      populate: ['thumbnailPng']
    })

    const posts = POST_MAP.map((p) => {
      const entry = blogPosts.find((e) => e.slug === p.slug)
      if (!entry) return null
      return {
        ...p,
        entry
      }
    }).filter(Boolean) as Array<BlogItem>

    return {
      props: {
        seo: {
          title:
            'ClickHouse benchmarks: Performance, cost & scalability compared',
          description:
            'Explore verified ClickHouse benchmarks across performance, scalability, and cloud cost. See how ClickHouse compares to other data platforms at real-world scale.',
          path: '/benchmarks'
        },
        blogs: posts,
        ...commonProps
      }
    }
  }

export default function Page({ seo, headerData, blogs }: Props) {
  useGalaxyOnPage(`benchmarksHubPage`)
  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)
  return (
    <Layout headerData={headerData} seo={seo}>
      {/* Hero */}
      <section className='bg-grid py-16 lg:py-24'>
        <div className='section-container flex flex-col items-center gap-x-20 gap-y-12 lg:flex-row'>
          <div className='space-y-6'>
            <Breadcrumbs>
              <Breadcrumbs.Item>ClickHouse benchmark hub</Breadcrumbs.Item>
            </Breadcrumbs>
            <h1 className='text-4xl font-bold'>
              Fast at scale. Efficient by design.
              <br />
              Second to none in <span className='text-primary-300'>
                cost
              </span>{' '}
              and <span className='text-primary-300'>performance</span>.
            </h1>
            <p className='max-w-xl text-lg text-neutral-200'>
              ClickHouse is built for real-world, at-scale workloads, and we
              publish the data to prove it.
            </p>
            <p className='max-w-xl text-lg text-neutral-200'>
              Explore our benchmarks across engine internals and head-to-head
              performance & cost comparison against other cloud data platforms.
            </p>
            <p>
              <LinkWithArrow
                className='font-bold text-primary-300'
                href='/blog/cloud-data-warehouses-cost-performance-comparison?loc=benchmarks-hub#interactive-benchmark-explorer'>
                Don't believe us? Try it yourself
              </LinkWithArrow>
            </p>
          </div>
          <div className='flex-shrink-0 space-y-6'>
            <SuiTitle type='h3' className='text-center'>
              100B-row analytical workload
            </SuiTitle>
            <GlowingCostMap />
          </div>
        </div>
      </section>

      {/* Featured benchmarks */}
      <section className='bg-neutral-725 py-16 lg:py-24'>
        <div className='section-container mx-auto max-w-4xl space-y-6 text-center'>
          <SuiTitle type='h2'>Our latest results</SuiTitle>
          <p className='text-lg text-neutral-200'>
            Every benchmark is repeatable and has clear setup details, so you
            can trust what you see.
          </p>
        </div>
        <div className='mx-auto mt-16 max-w-screen-2xl'>
          <BlogCoverFlow blogs={blogs.filter((blog) => blog.featured)} />
        </div>
      </section>

      {/* Benchmarks finder */}
      <section className='bg-black/20 py-16 lg:py-24'>
        <div className='section-container'>
          <div className='mx-auto mb-16 max-w-4xl space-y-6 text-center'>
            <SuiTitle type='h2'>
              Cost and performance you can{' '}
              <TiltedText type='black-on-yellow' className='px-2'>
                verify
              </TiltedText>
            </SuiTitle>
          </div>
          <BlogFinder blogs={blogs.filter((blog) => !blog.featured)} />
        </div>
      </section>

      {/* Performance charts */}
      <section className='section-container my-16 lg:my-24'>
        <div className='mb-16 space-y-6 text-center'>
          <SuiTitle type='h2'>
            ClickHouse keeps getting faster, and we're not done yet.
          </SuiTitle>
        </div>
        <div className='mx-auto max-w-5xl space-y-4'>
          <SuiTitle type='h3' className='text-center'>
            Query time is 2.24&times; faster than in 2018
          </SuiTitle>
          <Image
            src={chartPerformanceImprovements}
            width={1090}
            height={533}
            className='mx-auto h-auto w-full -translate-x-[3%]'
            alt='Performance improvements over time'
          />
          <div className='lg:px-8'>
            <SuiTitle type='h3'>Combination of four benchmarks:</SuiTitle>
            <div className='mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2'>
              {[
                {
                  title: 'Queries per benchmark',
                  values: [
                    { label: 'ClickBench', value: '42', width: 100 },
                    { label: 'MgBench', value: '15', width: 51 },
                    { label: 'Star Schema', value: '13', width: 44 },
                    { label: 'NYC Taxi Rides', value: '4', width: 15 }
                  ]
                },
                {
                  title: 'Rows per benchmark (log scale)',
                  values: [
                    { label: 'ClickBench', value: '100M', width: 100 },
                    { label: 'MgBench', value: '200M', width: 51 },
                    { label: 'Star Schema', value: '600M', width: 44 },
                    { label: 'NYC Taxi Rides', value: '3.4B', width: 15 }
                  ]
                }
              ].map((group, groupIndex) => {
                return (
                  <div
                    key={groupIndex}
                    className='rounded-lg border border-neutral-700 bg-neutral-725 p-6'>
                    <SuiTitle type='h4'>{group.title}</SuiTitle>
                    <ul className='mt-6 grid grid-cols-[auto_1fr_auto] space-y-4'>
                      {group.values.map((value, valueIndex) => {
                        return (
                          <li
                            key={valueIndex}
                            className='col-span-full grid grid-cols-subgrid gap-x-4'>
                            <div>{value.label}</div>
                            <div>
                              <div
                                style={{ width: `${value.width}%` }}
                                className='h-6 rounded-sm bg-primary-300'
                              />
                            </div>
                            <div>{value.value}</div>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )
              })}
            </div>
            <p className='mt-4 text-sm text-neutral-200'>
              <sup>*</sup>
              <Link
                href='https://benchmark.clickhouse.com/versions/'
                className='italic underline hover:decoration-2'>
                VersionBench
              </Link>{' '}
              benchmark is run when a new release is published to check its
              performance and identify regressions.
            </p>
          </div>
        </div>
      </section>

      {/* ClickBench */}
      <section className='section-container my-16 lg:my-24'>
        <div className='rounded-lg bg-primary-300 p-4 text-neutral-900 md:p-8 lg:p-16'>
          <div className='mx-auto max-w-3xl space-y-6 text-center'>
            <SuiTitle type='h2'>
              All proven by benchmarks that can be reproduced by{' '}
              <TiltedText type='white-on-black' className='px-2'>
                anyone
              </TiltedText>
              .
            </SuiTitle>
            <p className='text-neutral-700'>
              At ClickHouse, we measure performance relentlessly - believing
              every millisecond matters. We continually push to make queries
              faster.
            </p>
          </div>
          <Image
            src={imageClickbench}
            width={2282 / 3}
            height={1515 / 3}
            alt='Screenshot of benchmarks'
            className='mx-auto my-8 block lg:my-12'
          />
          <div className='mx-auto max-w-3xl space-y-6 text-center'>
            <p className='text-neutral-700'>
              We back up our claims with public, reproducible benchmarks like{' '}
              <Link
                href='https://benchmark.clickhouse.com/'
                className='underline hover:decoration-2'>
                ClickBench
              </Link>{' '}
              and{' '}
              <Link
                href='https://jsonbench.com/'
                className='underline hover:decoration-2'>
                JSONBench
              </Link>
              . You can explore our results directly and compare ClickHouse
              against other technologies before deciding how to power your
              analytics.
            </p>
            <CUIButton
              href='https://benchmark.clickhouse.com/'
              type='secondary'
              size='lg'
              linkClass='block md:inline-block'
              className='group w-full !border-neutral-800 !bg-neutral-800 !text-white hover:!bg-neutral-725 md:mx-auto md:w-auto md:!px-10'>
              View our benchmarks
            </CUIButton>
          </div>
        </div>
      </section>
      <section className='section-container my-16 lg:my-24'>
        <div className='section-container bg-shadow-element red-shadow align-shadow-left container mx-auto flex flex-col items-center'>
          <Image
            src='/images/migration.svg'
            height={72}
            width={72}
            alt='Migrations'
            className='mb-4 fill-none'
          />
          <SuiTitle type='h2' className='mb-12 text-center lg:mb-16'>
            Talk to us about your use case
          </SuiTitle>
          <div className='mx-auto max-w-lg'>
            <>
              {!formSuccess && (
                <MarketoForm
                  formId={'1124'}
                  clearbitTracking={true}
                  onLoad={() => {
                    setFormLoaded(true)
                  }}
                  onSuccess={() => {
                    setFormSuccess(true)
                    // Delay needed to allow the ref to update before scrolling
                    setTimeout(() => {
                      formSuccessRef.current?.scrollIntoView()
                    }, 10)

                    return false // Stops page from reloading
                  }}
                />
              )}

              {!formLoaded && (
                <div className='text-center'>Loading form...</div>
              )}

              {formSuccess && (
                <div ref={formSuccessRef}>
                  <CUICard className='px-4 py-16 sm:px-16'>
                    <h3 className='text-center text-2xl font-bold'>
                      Thank you for your submission!
                    </h3>
                    <p className='mt-2 text-center text-neutral-200'>
                      We will be in touch soon.
                    </p>
                  </CUICard>
                </div>
              )}
            </>
          </div>
        </div>
      </section>
    </Layout>
  )
}

function GlowingCostMap() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='456'
      height='416'
      viewBox='0 0 456 416'
      className='h-auto w-full max-w-max'>
      <path
        fill='#2d2d2c'
        d='M28.09.36H238.8v190.62H28.09zm0 194.53H238.8v190.62H28.09zm217.2 0H456v190.62H245.29z'
      />
      <rect
        width='209.71'
        height='189.62'
        x='245.79'
        y='.86'
        fill='#434138'
        stroke='#faff69'
        rx='3.5'
      />
      <path
        fill='#787878'
        d='M86.26 399.51q-.07-.6-.55-.94a2 2 0 0 0-1.23-.34q-.54 0-.92.17-.4.15-.59.43a1.1 1.1 0 0 0-.07 1.15q.13.2.37.37.24.15.52.25l.58.17.89.22q.53.13 1.03.34.49.21.89.53t.62.78q.24.45.23 1.07a2.6 2.6 0 0 1-1.65 2.45 5 5 0 0 1-1.93.35q-1.11 0-1.92-.34a3 3 0 0 1-1.26-1q-.45-.66-.5-1.6h1.7c0 .61.41 1.15 1 1.32q.42.16.96.16.56 0 .98-.17.43-.17.67-.47t.24-.71a1 1 0 0 0-.21-.61 2 2 0 0 0-.6-.4 6 6 0 0 0-.89-.3l-1.07-.28a4.4 4.4 0 0 1-1.85-.9 2.1 2.1 0 0 1-.67-1.64q0-.83.45-1.46a3 3 0 0 1 1.24-.98 4 4 0 0 1 1.78-.35q1 0 1.76.36.75.35 1.2.96.44.6.45 1.41zm4.9-2.6v9.46h-1.67v-9.46zm4.81 9.6q-1.03 0-1.8-.46-.76-.45-1.18-1.28a4 4 0 0 1-.42-1.92q0-1.1.42-1.93a3 3 0 0 1 1.18-1.28 3.5 3.5 0 0 1 1.8-.45q1.05 0 1.8.45.76.45 1.18 1.29.42.83.42 1.92 0 1.1-.42 1.92-.42.83-1.18 1.28-.75.46-1.8.46m.01-1.34q.57 0 .94-.31.37-.32.57-.84a4 4 0 0 0-.01-2.35 2 2 0 0 0-.56-.85 1.4 1.4 0 0 0-.94-.31q-.57 0-.96.31-.37.32-.57.85a4 4 0 0 0-.18 1.18q0 .64.18 1.17.2.53.57.84.39.3.96.3m6.08 1.2-2-7.1h1.7l1.25 5h.06l1.28-5h1.68l1.28 4.97h.07l1.22-4.96h1.71l-2 7.09h-1.75l-1.33-4.8h-.1l-1.32 4.8zm12.37.14q-1.07 0-1.84-.45a3 3 0 0 1-1.19-1.26 4 4 0 0 1-.42-1.94q0-1.1.42-1.92a3.1 3.1 0 0 1 2.94-1.75q.66 0 1.24.2.58.22 1.03.65.45.45.71 1.12.27.68.26 1.6v.52h-5.81v-1.13h4.21q0-.48-.2-.85a1.5 1.5 0 0 0-.58-.6 1.6 1.6 0 0 0-.84-.21q-.51 0-.9.25-.37.25-.6.64a2 2 0 0 0-.22.88v.98q0 .6.23 1.06.23.45.63.67.4.24.95.23.38 0 .66-.1.3-.1.52-.3.21-.2.32-.5l1.56.17a2.5 2.5 0 0 1-1.61 1.78q-.65.26-1.47.26m4.57-.14v-7.1h1.62v1.19h.07c.22-.78.94-1.3 1.75-1.28q.3 0 .6.04v1.54l-.34-.06q-.23-.04-.44-.04-.45 0-.82.2t-.56.54q-.21.35-.21.8v4.17zm-76.3-4.26c-.3.3-.3.77 0 1.06l4.77 4.78a.75.75 0 1 0 1.06-1.06l-4.25-4.25 4.25-4.24a.75.75 0 0 0-1.06-1.06zm.52.53v.75h24.91v-1.5h-24.9z'
      />
      <path
        fill='#fff'
        d='M223.72 398.61v-1.65h7.76v1.65h-2.9v7.8h-1.97v-7.8zm9 7.8v-7.08h1.97v7.09zm1-8q-.45 0-.76-.29a.94.94 0 0 1 0-1.4q.3-.3.75-.3t.75.3q.32.3.32.7t-.32.7-.75.3m2.55 8v-7.08h1.87v1.25h.09q.23-.63.74-.98a2 2 0 0 1 1.23-.37q.73 0 1.25.37.5.36.68.98h.07q.22-.6.79-.97t1.35-.37q1 0 1.61.63.63.63.62 1.78v4.77h-1.96v-4.38q0-.6-.31-.89a1 1 0 0 0-.79-.3q-.53 0-.83.35-.3.33-.3.89v4.33h-1.9V402q0-.53-.31-.83-.3-.3-.78-.31c-.43 0-.81.24-1 .62q-.15.3-.15.68v4.26zm15.09.15a4 4 0 0 1-1.88-.45q-.8-.45-1.21-1.26a4 4 0 0 1-.43-1.95q0-1.08.43-1.91.42-.85 1.2-1.3.75-.45 1.81-.45.7 0 1.3.22c.84.3 1.5.96 1.78 1.8q.25.67.25 1.58v.54h-5.98v-1.22h4.13q0-.43-.18-.76-.2-.32-.51-.5a1.6 1.6 0 0 0-1.56.01q-.33.2-.53.55-.2.34-.2.76v1.16a2 2 0 0 0 .2.91q.2.38.56.6.36.2.85.2.33 0 .6-.1.27-.09.47-.27t.3-.45l1.81.12a2.6 2.6 0 0 1-1.66 1.9q-.68.27-1.55.27'
      />
      <path
        fill='#787878'
        d='M371.62 406.37v-9.46h6.06v1.44h-4.35v2.57h3.93v1.43h-3.93v4.02zm9.52.14q-.67 0-1.21-.24t-.85-.72q-.3-.48-.31-1.17a2 2 0 0 1 .22-1q.23-.38.6-.62.39-.24.87-.36.5-.12 1-.18l1.01-.11q.4-.06.56-.17a.4.4 0 0 0 .18-.36v-.02q0-.53-.3-.81-.3-.3-.9-.29-.6 0-.97.27-.36.28-.48.63l-1.56-.22a2.5 2.5 0 0 1 1.65-1.73q.6-.23 1.35-.23.53 0 1.02.13.51.1.93.4a2 2 0 0 1 .68.74q.25.46.25 1.17v4.75h-1.6v-.98h-.06a2 2 0 0 1-1.11.97q-.42.15-.97.15m.44-1.23q.5 0 .87-.2.36-.19.56-.53.2-.33.2-.73V403a1 1 0 0 1-.26.12q-.18.06-.41.1l-.46.07-.4.06a2 2 0 0 0-.66.16q-.3.12-.47.32a.8.8 0 0 0-.17.53q0 .46.34.7.33.23.85.23m10.59-4.13-1.52.17a1.2 1.2 0 0 0-.65-.76q-.27-.13-.66-.13-.52 0-.88.23-.35.22-.34.58 0 .32.22.5.24.2.78.33l1.2.25q1.02.22 1.5.7.5.46.5 1.23 0 .66-.39 1.18-.38.5-1.07.79-.68.3-1.57.29-1.29 0-2.1-.55a2.2 2.2 0 0 1-.94-1.53l1.63-.15q.1.48.47.72.36.25.94.25.6 0 .95-.25.37-.24.37-.6 0-.3-.24-.5a2 2 0 0 0-.72-.31l-1.2-.25a3 3 0 0 1-1.51-.72 1.8 1.8 0 0 1-.49-1.28q0-.66.36-1.14t1-.75a4 4 0 0 1 1.5-.26q1.26 0 1.97.53.72.53.89 1.43m5.07-1.87v1.29h-4.07v-1.3zm-3.07-1.7h1.67v6.66q0 .34.1.51.12.18.28.24.17.07.38.07a2 2 0 0 0 .49-.07l.28 1.3a4 4 0 0 1-.98.17q-.63.01-1.13-.18-.5-.22-.8-.66t-.29-1.1zm7.53 8.93q-1.05 0-1.84-.45a3 3 0 0 1-1.18-1.26 4 4 0 0 1-.42-1.94q0-1.1.42-1.92a3.1 3.1 0 0 1 2.94-1.75q.64 0 1.23.2a2.9 2.9 0 0 1 1.74 1.77q.27.68.27 1.6v.52h-5.81v-1.13h4.2q0-.48-.2-.85a1.5 1.5 0 0 0-1.41-.81q-.51 0-.9.25t-.6.64q-.2.39-.22.88v.98q0 .6.22 1.06.24.45.64.67.4.24.95.23.36 0 .66-.1a1.3 1.3 0 0 0 .84-.8l1.56.17q-.15.6-.56 1.08-.42.45-1.06.7-.65.26-1.47.26m4.57-.14v-7.1h1.62v1.19h.08a1.8 1.8 0 0 1 1.75-1.28q.3 0 .6.04v1.54l-.34-.06q-.23-.04-.44-.04-.45 0-.82.2a1.5 1.5 0 0 0-.78 1.34v4.17zm36.62-3.21c.3-.3.3-.77 0-1.07l-4.77-4.77a.75.75 0 0 0-1.06 1.06l4.24 4.25-4.24 4.24a.75.75 0 0 0 1.06 1.06zm-25.44-.54v.75h24.91v-1.5h-24.9zM15.2 311.87H6.47v-1.58h3.7v-4.05h-3.7v-1.58h8.73v1.58h-3.71v4.05h3.7zm0-8.87H8.65v-1.54h6.55zm-7.48-.77a1 1 0 0 1-.24.63.8.8 0 0 1-.6.26.8.8 0 0 1-.59-.26 1 1 0 0 1-.24-.63 1 1 0 0 1 .24-.63.8.8 0 0 1 .6-.27q.34 0 .59.27.24.25.24.63m10.07-5.2a4 4 0 0 1-.23 1.43q-.22.6-.6.96-.37.35-.83.5l-.33-1.4q.18-.08.38-.26t.31-.49q.13-.3.13-.77 0-.65-.32-1.08t-1.04-.43h-1.24v.07q.24.12.49.35t.42.6.17.94q0 .75-.35 1.36-.36.6-1.07.98-.71.35-1.78.35t-1.82-.35a2.5 2.5 0 0 1-1.32-3.29q.19-.37.47-.6.26-.22.5-.34v-.08H8.65v-1.52h6.65q.84 0 1.4.4.54.4.81 1.1.28.69.28 1.57m-3.9-.01q0-.49-.24-.84t-.68-.52a3 3 0 0 0-1.08-.18 3 3 0 0 0-1.08.18q-.46.17-.72.52-.26.33-.26.84t.27.86q.26.34.74.52.46.17 1.05.17t1.06-.17.7-.53.24-.85m-2.53-6.19h3.84v1.54H6.47v-1.5h3.3v-.08a2 2 0 0 1-.88-.71 2 2 0 0 1-.33-1.24q0-.68.29-1.19.3-.51.84-.78.55-.27 1.34-.28h4.17v1.54h-3.93q-.67 0-1.03.34-.37.33-.37.95 0 .4.18.73t.5.5q.35.18.81.18m3.96-8.71q0 .98-.4 1.7-.42.7-1.17 1.1-.75.38-1.79.38a4 4 0 0 1-1.77-.39 2.9 2.9 0 0 1-1.63-2.71q0-.6.2-1.14a2.7 2.7 0 0 1 1.63-1.62q.6-.23 1.48-.23h.47v5.36H11.3v-3.89q-.44 0-.78.2-.36.2-.55.52a1.6 1.6 0 0 0 .03 1.61q.22.35.6.56.35.2.8.2h.9q.59 0 .99-.21t.62-.59.21-.87q0-.34-.1-.62a1.4 1.4 0 0 0-.28-.47 1 1 0 0 0-.46-.3l.16-1.44q.57.13 1 .52.42.38.65.97.23.6.23 1.36m-.12-4.22H8.65v-1.5h1.1v-.06a1.64 1.64 0 0 1-1.2-1.62l.05-.55h1.42l-.06.3-.03.41q0 .42.18.76c.23.47.72.75 1.24.72h3.85zm.12-10.6q0 1-.43 1.7-.42.7-1.19 1.07-.76.37-1.75.37-1 0-1.76-.38-.75-.37-1.2-1.08a3 3 0 0 1-.43-1.66q0-.8.3-1.41a2.4 2.4 0 0 1 2.06-1.4v1.47q-.47.09-.8.42-.3.35-.31.9a1.4 1.4 0 0 0 .98 1.38q.48.2 1.13.2t1.15-.2.74-.55q.24-.34.26-.83 0-.35-.13-.61a1 1 0 0 0-.38-.46q-.25-.18-.6-.25v-1.48q.69.06 1.23.41.53.36.83.97.3.6.3 1.43m0-6.92q0 .97-.42 1.66-.42.7-1.18 1.1-.76.38-1.77.38a4 4 0 0 1-1.78-.39q-.76-.38-1.18-1.09a3 3 0 0 1-.43-1.66q0-.97.43-1.66.42-.7 1.18-1.09.76-.38 1.78-.38 1 0 1.77.38.76.39 1.18 1.09t.42 1.66m-1.23 0q0-.52-.29-.88-.3-.34-.77-.52a3 3 0 0 0-1.09-.17q-.6 0-1.08.17-.5.19-.78.52-.3.36-.3.87 0 .54.3.89t.78.52 1.08.17 1.09-.17.77-.52.29-.89m-3.71-9.62.15 1.4q-.49.14-.7.6-.12.26-.11.61 0 .5.2.81t.55.32a.6.6 0 0 0 .46-.2q.18-.23.3-.72l.23-1.12q.2-.93.64-1.38.44-.46 1.14-.46.6 0 1.09.36.45.36.73.99.26.63.26 1.45 0 1.2-.5 1.93-.5.74-1.41.87l-.15-1.5q.45-.1.67-.44.23-.32.23-.86 0-.55-.23-.88-.22-.34-.55-.34a.6.6 0 0 0-.47.22q-.18.21-.28.66l-.23 1.12a3 3 0 0 1-.66 1.4q-.47.45-1.19.44-.6 0-1.05-.33t-.69-.93-.25-1.38q0-1.16.5-1.82.48-.66 1.32-.82m-1.73-4.68h1.2v3.76h-1.2zm-1.57 2.83v-1.54h6.15a1 1 0 0 0 .47-.1.5.5 0 0 0 .23-.25q.06-.15.06-.35a2 2 0 0 0-.06-.45l1.2-.26q.15.45.15.9.03.6-.17 1.05-.2.47-.6.74a2 2 0 0 1-1.03.26z'
      />
      <path
        fill='#fff'
        d='M8.74 196.22v1.73a2 2 0 0 0-1.32.77q-.23.3-.35.67t-.12.8q0 .78.4 1.37.37.6 1.12.94t1.8.33q1.1 0 1.83-.34.75-.33 1.12-.93t.37-1.36q0-.42-.1-.8a2.2 2.2 0 0 0-.9-1.17 2 2 0 0 0-.73-.28l.01-1.73c.9.13 1.71.57 2.3 1.26a4 4 0 0 1 .96 2.74q0 1.26-.58 2.23a4 4 0 0 1-1.66 1.54q-1.1.56-2.62.56a5.6 5.6 0 0 1-2.61-.56 4.1 4.1 0 0 1-2.24-3.77q0-.78.22-1.46a3.6 3.6 0 0 1 1.69-2.09q.62-.34 1.4-.45m6.4-4.59q0 1.05-.46 1.8-.45.75-1.28 1.19a4 4 0 0 1-1.92.41q-1.1 0-1.92-.41a3 3 0 0 1-1.29-1.19q-.45-.75-.45-1.8 0-1.04.45-1.8.46-.76 1.29-1.18a4 4 0 0 1 1.92-.41q1.1 0 1.92.41.83.42 1.28 1.18t.46 1.8m-1.34 0q0-.57-.31-.95-.3-.38-.84-.56a4 4 0 0 0-1.17-.19q-.66 0-1.18.19-.52.18-.84.56t-.32.94q0 .58.32.96.3.39.84.57.52.2 1.18.19.65 0 1.17-.19.52-.18.84-.57.3-.37.31-.96M9.78 181.2l.17 1.53q-.52.16-.76.65-.13.26-.13.65 0 .52.23.88.23.35.59.34.3 0 .5-.22.19-.24.32-.78l.26-1.2q.21-1.02.68-1.5.48-.5 1.24-.5.66 0 1.18.4.5.37.8 1.06.27.68.28 1.57 0 1.3-.55 2.1-.54.8-1.52.94l-.16-1.63q.48-.1.72-.47.25-.36.25-.94 0-.6-.25-.95-.24-.37-.6-.37-.3 0-.5.24t-.3.72l-.26 1.2a3 3 0 0 1-.72 1.52q-.5.48-1.28.48-.66 0-1.14-.35a2.3 2.3 0 0 1-.75-1.02 4 4 0 0 1-.26-1.5q0-1.24.53-1.96t1.43-.89m-1.87-5.07h1.3v4.08H7.9zm-1.7 3.07v-1.67h6.66q.35 0 .51-.1.18-.11.24-.28a1 1 0 0 0 .07-.38 2 2 0 0 0-.07-.49l1.31-.28a4 4 0 0 1 .17.98q0 .63-.2 1.13t-.65.8-1.1.29z'
      />
      <path
        fill='#787878'
        d='M15.2 128.6H6.47v-1.58h7.4v-3.85h1.33zm.12-9.59q0 .97-.42 1.66-.42.7-1.18 1.1-.76.38-1.77.38a4 4 0 0 1-1.78-.39q-.76-.38-1.18-1.09a3 3 0 0 1-.43-1.66q0-.97.43-1.66.42-.7 1.18-1.09t1.78-.39 1.77.4 1.18 1.08.42 1.66m-1.23 0q0-.52-.29-.88-.3-.34-.77-.52a3 3 0 0 0-1.09-.17q-.6 0-1.08.17-.5.2-.78.52-.3.36-.3.87 0 .54.3.89t.78.52q.48.18 1.08.17t1.09-.17q.48-.17.77-.52.3-.36.29-.89m1.1-5.62-6.54 1.85v-1.57l4.6-1.15v-.06l-4.6-1.18v-1.56l4.58-1.17v-.06l-4.58-1.14v-1.57l6.55 1.85v1.6l-4.43 1.23v.1l4.43 1.22zm.13-11.42q0 1-.4 1.7-.42.72-1.17 1.1t-1.79.38a4 4 0 0 1-1.77-.38 2.9 2.9 0 0 1-1.63-2.71q0-.6.2-1.15.2-.53.6-.95t1.03-.66q.6-.24 1.48-.24h.47v5.37H11.3v-3.89q-.44 0-.78.2-.36.2-.55.52a1.6 1.6 0 0 0 .03 1.6q.22.36.6.56.35.2.8.2h.9q.59 0 .99-.2t.62-.59q.21-.37.21-.88 0-.33-.1-.6a1.4 1.4 0 0 0-.28-.48 1 1 0 0 0-.46-.3l.16-1.44q.57.13 1 .52.42.37.65.97t.23 1.35m-.12-4.21H8.65v-1.5h1.1v-.07a1.6 1.6 0 0 1-1.2-1.61l.05-.55h1.42l-.06.3-.03.41q0 .42.18.76c.23.47.72.75 1.24.72h3.85zm.12-10.6q0 .99-.43 1.69a3 3 0 0 1-1.19 1.08q-.76.37-1.75.37-1 0-1.76-.38-.75-.39-1.2-1.08a3 3 0 0 1-.43-1.66q0-.8.3-1.42a2.4 2.4 0 0 1 2.06-1.4v1.48q-.47.09-.8.42-.3.33-.31.9 0 .45.25.82t.73.56 1.13.2q.67 0 1.15-.2t.74-.55.26-.84q0-.34-.13-.6a1 1 0 0 0-.38-.46q-.25-.18-.6-.25v-1.48q.69.06 1.23.41.53.36.83.96t.3 1.44m0-6.92q0 .97-.42 1.66-.42.7-1.18 1.1-.76.38-1.77.38a4 4 0 0 1-1.78-.39Q9.42 82.6 9 81.9a3 3 0 0 1-.43-1.66q0-.97.43-1.66.42-.7 1.18-1.09.75-.39 1.78-.39 1.02 0 1.77.4.75.37 1.18 1.08.42.7.42 1.66m-1.23 0q0-.53-.29-.88-.3-.34-.77-.52a3 3 0 0 0-1.09-.17q-.6 0-1.08.17-.5.19-.78.52-.3.34-.3.87 0 .54.3.89t.78.52 1.08.17 1.09-.17.77-.52.29-.89m-3.71-9.62.15 1.4q-.49.14-.7.6-.12.25-.11.61 0 .5.2.81t.55.32a.6.6 0 0 0 .46-.2q.18-.23.3-.72l.23-1.12q.2-.93.64-1.38t1.14-.46q.6 0 1.09.36.45.36.73.99.26.63.26 1.44 0 1.2-.5 1.94a2 2 0 0 1-1.41.87l-.15-1.5q.45-.1.67-.44t.23-.86q0-.55-.23-.88-.22-.34-.55-.34a.6.6 0 0 0-.47.22q-.18.21-.28.66l-.23 1.12a3 3 0 0 1-.66 1.4q-.47.45-1.19.44-.6 0-1.05-.33t-.69-.93-.25-1.39q0-1.16.5-1.8.48-.67 1.32-.83m-1.73-4.68h1.2v3.76h-1.2zm-1.57 2.83v-1.54h6.15q.3 0 .47-.1a.5.5 0 0 0 .23-.25q.06-.15.06-.35a2 2 0 0 0-.06-.45l1.2-.26q.15.45.15.9.03.6-.17 1.05-.2.47-.6.74a2 2 0 0 1-1.03.26zm5.04-29.83a.75.75 0 0 0-1.06 0L6.3 43.7a.75.75 0 0 0 1.06 1.06l4.24-4.24 4.24 4.24a.75.75 0 0 0 1.06-1.06zm-.53 19.36h.75V39.46h-1.5v18.83zm-.53 278.11c.3.3.77.3 1.06 0l4.77-4.77a.75.75 0 0 0-1.06-1.06l-4.24 4.24-4.24-4.25a.75.75 0 1 0-1.06 1.07zm.53-.53h.75v-18.83h-1.5v18.83z'
      />
      <path
        fill='#faff69'
        d='M299.38 167.86h7.44v1.9h-5.26v2.4h4.4v1.9h-4.4v2.66h5.26v1.9h-7.44zm12.66-.12v1.72l-.54-.01c-.66 0-1 .2-1 .97v.32h1.53v1.75h-1.53v6.14h-2.1v-6.14h-1.07v-1.75h1.07v-.44c0-1.66.9-2.6 2.83-2.6.3 0 .48 0 .81.04m5.06 0v1.72l-.54-.01c-.66 0-1 .2-1 .97v.32h1.52v1.75h-1.53v6.14h-2.1v-6.14h-1.06v-1.75h1.06v-.44c0-1.66.9-2.6 2.84-2.6.3 0 .48 0 .8.04m.92 2.07v-1.95h2.14v1.95zm2.13.93v7.89h-2.1v-7.9zm3.34 3.94c0 1.49.74 2.34 1.84 2.34.88 0 1.4-.6 1.6-1.4l1.81.8c-.36 1.3-1.59 2.37-3.42 2.37-2.3 0-3.92-1.66-3.92-4.1s1.63-4.1 3.92-4.1c1.81 0 3.01 1.05 3.39 2.32l-1.78.84c-.2-.8-.73-1.4-1.6-1.4-1.1 0-1.84.86-1.84 2.33m6.23-4.87v-1.95h2.15v1.95zm2.13.93v7.89h-2.1v-7.9zm5.18 8.05c-2.33 0-3.92-1.66-3.92-4.1 0-2.33 1.6-4.1 3.84-4.1 2.34 0 3.6 1.74 3.6 3.94v.62h-5.43c.15 1.2.89 1.92 1.92 1.92.81 0 1.46-.4 1.7-1.16l1.77.63a3.6 3.6 0 0 1-3.48 2.25m-.1-6.52c-.83 0-1.48.5-1.73 1.45h3.27c-.02-.78-.51-1.45-1.53-1.45m4.87 6.36v-7.9h2.1v.82a2.8 2.8 0 0 1 2.16-.96c1.64 0 2.65 1.12 2.65 2.83v5.2h-2.1v-4.6c0-.88-.36-1.51-1.26-1.51-.74 0-1.46.52-1.46 1.56v4.56zm10.21-3.95c0 1.49.74 2.34 1.85 2.34.87 0 1.4-.6 1.59-1.4l1.81.8c-.36 1.3-1.58 2.37-3.41 2.37-2.3 0-3.92-1.66-3.92-4.1s1.62-4.1 3.92-4.1c1.81 0 3.01 1.05 3.38 2.32l-1.78.84c-.2-.8-.72-1.4-1.59-1.4-1.11 0-1.85.86-1.85 2.33m10.05 4.4c-.51 1.4-1.23 2.3-2.97 2.3-.4 0-.56-.02-.83-.05v-1.7c.23.02.36.03.6.03.56 0 .86-.15 1.08-.72l.26-.63-2.84-7.57h2.18l1.78 5.19 1.74-5.2h2.12zm15.23-2.36v1.9h-8.52v-1.67l5.66-7.19h-5.61v-1.9h8.41v1.68l-5.62 7.18zm8.33-2.04c0 2.46-1.59 4.11-3.87 4.11s-3.87-1.65-3.87-4.1 1.6-4.1 3.87-4.1 3.87 1.65 3.87 4.1m-5.65 0c0 1.5.69 2.37 1.78 2.37 1.1 0 1.77-.87 1.77-2.37 0-1.48-.67-2.35-1.77-2.35s-1.78.87-1.78 2.35m6.93 3.95v-7.9h2.1v.82a2.8 2.8 0 0 1 2.16-.96c1.65 0 2.66 1.12 2.66 2.83v5.2h-2.1v-4.6c0-.88-.36-1.51-1.26-1.51-.74 0-1.46.52-1.46 1.56v4.56zm12.05.16c-2.32 0-3.91-1.66-3.91-4.1 0-2.33 1.6-4.1 3.84-4.1 2.34 0 3.6 1.74 3.6 3.94v.62h-5.43c.15 1.2.88 1.92 1.92 1.92.8 0 1.45-.4 1.7-1.16l1.76.63a3.6 3.6 0 0 1-3.48 2.25m-.09-6.52c-.84 0-1.48.5-1.74 1.45h3.27c-.01-.78-.5-1.45-1.53-1.45m-110.33-121c0 3.1 1.68 5.14 4.04 5.14 1.68 0 2.9-1.02 3.34-2.7l2.4.82a5.7 5.7 0 0 1-5.74 4.14c-3.82 0-6.6-3.04-6.6-7.4s2.78-7.4 6.6-7.4c2.9 0 4.9 1.6 5.74 4.14l-2.4.82c-.44-1.68-1.66-2.7-3.34-2.7-2.36 0-4.04 2.04-4.04 5.14m13.82-7.18v14.36h-2.4V44.1zm2.49 2.46V44.1h2.48v2.46zm2.44 1.4v10.5h-2.4v-10.5zm4.26 5.26c0 2.14 1.12 3.38 2.76 3.38 1.28 0 2.06-.84 2.36-2l2.06 1.04a4.45 4.45 0 0 1-4.42 3.04c-3 0-5.16-2.22-5.16-5.46s2.16-5.46 5.16-5.46c2.26 0 3.82 1.28 4.38 2.96l-2.02 1.1c-.3-1.14-1.08-2-2.36-2-1.64 0-2.76 1.26-2.76 3.4m11.03-9.12v8.28l4.04-4.42h2.94l-3.96 4.08 4.28 6.42h-2.78l-3.14-4.74-1.38 1.4v3.34h-2.4V44.1zm18.06 0h2.56v14.36h-2.56v-6.28h-6.88v6.28h-2.56V44.1h2.56v5.84h6.88zm14.65 9.12c0 3.26-2.1 5.46-5.06 5.46s-5.06-2.2-5.06-5.46 2.1-5.46 5.06-5.46 5.06 2.2 5.06 5.46m-7.7 0c0 2.14 1.02 3.44 2.64 3.44s2.64-1.3 2.64-3.44-1.02-3.44-2.64-3.44-2.64 1.3-2.64 3.44m18.3-5.26v10.5h-2.4v-1.12c-.6.7-1.5 1.34-2.85 1.34-2.2 0-3.56-1.5-3.56-3.76v-6.96h2.4v6.44c0 1.28.56 2.1 1.86 2.1 1.08 0 2.16-.8 2.16-2.3v-6.24zm1.44 8.5 1.8-1.44a3.6 3.6 0 0 0 3.04 1.7c1.02 0 1.96-.36 1.96-1.3 0-.9-.88-1-2.54-1.34s-3.56-.76-3.56-3c0-1.92 1.68-3.32 4.1-3.32 1.84 0 3.48.82 4.24 1.98l-1.62 1.46a3.2 3.2 0 0 0-2.76-1.48c-.98 0-1.62.44-1.62 1.14 0 .76.76.9 2.08 1.18 1.78.38 4.02.76 4.02 3.16 0 2.12-1.94 3.48-4.32 3.48-1.94 0-3.88-.78-4.82-2.22m15.42 2.22c-3 0-5.1-2.22-5.1-5.46 0-3.08 2.08-5.46 5-5.46 3.04 0 4.66 2.3 4.66 5.18v.8h-7.36c.18 1.8 1.26 2.9 2.8 2.9 1.18 0 2.12-.6 2.44-1.68l2.06.78a4.6 4.6 0 0 1-4.5 2.94m-.12-8.9c-1.24 0-2.2.74-2.56 2.16h4.82c-.02-1.16-.74-2.16-2.26-2.16'
      />
      <g fill='#faff69' transform='translate(400.89 36.53)'>
        <ellipse cx='14.18' cy='14.17' rx='14.18' ry='14.17' />
      </g>
      <ellipse
        fill='#faff69'
        cx='415.07'
        cy='50.71'
        rx='14.18'
        ry='14.17'
        className='origin-center scale-125 animate-fadeInOut blur-sm [transform-box:fill-box]'
      />
      <path
        fill='#feaa0c'
        d='M86.4 253.03v2.78h-1.27v-7.18H88c1.6 0 2.6.75 2.6 2.2 0 1.13-.62 1.85-1.67 2.1l1.85 2.88h-1.46l-1.75-2.78zm0-1.1h1.53c.92 0 1.4-.4 1.4-1.1q0-1.08-1.4-1.1H86.4zm7.33 3.99c-1.5 0-2.55-1.11-2.55-2.73 0-1.54 1.04-2.73 2.5-2.73 1.52 0 2.33 1.15 2.33 2.59v.4h-3.68c.1.9.63 1.45 1.4 1.45.6 0 1.06-.3 1.22-.84l1.03.39a2.3 2.3 0 0 1-2.25 1.47m-.06-4.45c-.62 0-1.1.37-1.28 1.08h2.41c0-.58-.37-1.08-1.13-1.08m5.22 4.45c-1.47 0-2.3-1.24-2.3-2.73 0-1.5.83-2.73 2.3-2.73.68 0 1.18.27 1.51.66v-2.5h1.2v7.19h-1.2v-.55a1.9 1.9 0 0 1-1.5.66m1.54-2.88c0-1-.56-1.53-1.3-1.53-.87 0-1.34.68-1.34 1.68s.47 1.68 1.34 1.68c.74 0 1.3-.55 1.3-1.52zm1.88 1.77.9-.72c.31.5.91.85 1.52.85.51 0 .98-.18.98-.65 0-.45-.44-.5-1.27-.67s-1.78-.38-1.78-1.5c0-.96.84-1.66 2.05-1.66.92 0 1.74.4 2.12.99l-.8.73a1.6 1.6 0 0 0-1.39-.74c-.49 0-.8.22-.8.57 0 .38.37.45 1.03.59.9.19 2.01.38 2.01 1.58 0 1.06-.97 1.74-2.16 1.74-.97 0-1.94-.4-2.4-1.11m5.5 1v-7.18h1.2v2.49c.3-.35.77-.66 1.44-.66 1.1 0 1.77.76 1.77 1.89v3.46h-1.2v-3.11c0-.65-.27-1.12-.92-1.12-.54 0-1.1.4-1.1 1.15v3.08zm5.61-5.95v-1.23h1.24v1.23zm1.22.7v5.25h-1.2v-5.25zm3.7-2.03v1.05l-.37-.01c-.47 0-.73.14-.73.74v.25h1.07v1.02h-1.07v4.23h-1.2v-4.23h-.73v-1.02h.73v-.34c0-1.1.61-1.7 1.8-1.7zm.96 5.96v-2.91h-.73v-1.02h.73v-1.54h1.18v1.54h1.1v1.02h-1.1v2.72c0 .47.27.52.7.52.2 0 .31-.01.5-.03v1a4 4 0 0 1-.84.08c-1 0-1.54-.31-1.54-1.38'
      />
      <circle cx='139.14' cy='251.05' r='8.31' fill='#feaa0c' />
      <path
        fill='#fe4234'
        d='M102.2 281.22v-7.18h2.4c2.23 0 3.61 1.4 3.61 3.6 0 2.18-1.38 3.58-3.6 3.58zm1.25-1.1h1.15c1.48 0 2.35-.98 2.35-2.49s-.87-2.49-2.36-2.49h-1.14zm7.1 1.2c-1 0-1.77-.62-1.77-1.56 0-1 .75-1.44 1.76-1.65l1.45-.3v-.09c0-.5-.26-.8-.9-.8-.57 0-.87.25-1 .76l-1.14-.26a2.2 2.2 0 0 1 2.2-1.55c1.25 0 2.01.6 2.01 1.81v2.26q-.02.44.46.35v.93c-.87.1-1.33-.07-1.5-.5-.34.37-.89.6-1.57.6m1.44-1.95v-.64l-1.13.24c-.5.11-.89.27-.89.74 0 .41.3.64.76.64.64 0 1.26-.34 1.26-.98m2.6.53V277h-.73v-1.03h.73v-1.54h1.18v1.54h1.1V277h-1.1v2.72c0 .47.27.52.7.52.2 0 .3 0 .49-.03v1.01q-.35.06-.83.07c-1 0-1.54-.3-1.54-1.38m4.66 1.41c-1 0-1.77-.6-1.77-1.55 0-1 .75-1.44 1.76-1.65l1.45-.3v-.09c0-.5-.26-.8-.9-.8-.57 0-.87.25-1.01.76l-1.13-.26a2.2 2.2 0 0 1 2.19-1.55c1.26 0 2.02.6 2.02 1.81v2.26q-.02.44.46.35v.93c-.87.1-1.33-.07-1.51-.5-.33.37-.88.6-1.56.6m1.44-1.94v-.64l-1.13.24c-.51.11-.9.27-.9.74 0 .41.3.64.77.64.64 0 1.26-.34 1.26-.98m5.2 1.96a1.9 1.9 0 0 1-1.52-.66v.55h-1.2v-7.18h1.2v2.5a1.9 1.9 0 0 1 1.51-.67c1.47 0 2.31 1.24 2.31 2.73 0 1.5-.84 2.73-2.3 2.73m-1.55-2.88v.31c0 .97.56 1.52 1.3 1.52.87 0 1.34-.68 1.34-1.68s-.47-1.68-1.34-1.68c-.74 0-1.3.54-1.3 1.53m7.76-2.49v1.2l-.44-.03c-.76 0-1.34.5-1.34 1.33v2.76h-1.2v-5.25h1.2v.78c.23-.49.77-.8 1.44-.8zm.8-.69v-1.23h1.25v1.23zm1.23.7v5.25h-1.2v-5.25zm2.13 2.63c0 1.07.56 1.7 1.38 1.7.64 0 1.03-.43 1.18-1l1.03.51a2.2 2.2 0 0 1-2.2 1.52c-1.5 0-2.59-1.1-2.59-2.73s1.08-2.73 2.58-2.73c1.13 0 1.91.64 2.2 1.48l-1.02.55c-.15-.57-.54-1-1.18-1-.82 0-1.38.63-1.38 1.7m5.52-4.56v4.14l2.02-2.2h1.47l-1.98 2.03 2.14 3.21h-1.4l-1.56-2.37-.7.7v1.67h-1.2v-7.18zm3.61 6.18.9-.72c.31.51.91.85 1.52.85.51 0 .98-.18.98-.65 0-.45-.44-.5-1.27-.67s-1.78-.38-1.78-1.5c0-.96.84-1.66 2.05-1.66.92 0 1.74.41 2.12 1l-.81.72a1.6 1.6 0 0 0-1.38-.74c-.49 0-.81.22-.81.57 0 .38.38.45 1.04.6.89.18 2.01.37 2.01 1.57 0 1.06-.97 1.74-2.16 1.74-.97 0-1.94-.39-2.41-1.1'
      />
      <circle cx='167.15' cy='277.49' r='8.31' fill='#fe4234' />
      <path
        fill='#3a7af4'
        d='M99.02 310.55v-7.18h2.85c1.54 0 2.36.67 2.36 1.89 0 .89-.52 1.35-1.02 1.55.75.24 1.25.86 1.25 1.74 0 1.26-.93 2-2.41 2zm1.23-4.21h1.5c.82 0 1.27-.32 1.27-.95s-.45-.94-1.27-.94h-1.5zm0 1.08v2.05h1.73c.81 0 1.25-.42 1.25-1.03 0-.6-.44-1.02-1.25-1.02zm5.09-2.82v-1.23h1.24v1.23zm1.22.7v5.25h-1.2v-5.25zm5.93 4.72c0 1.55-1.06 2.44-2.56 2.44-1.21 0-2.06-.51-2.4-1.53l1.13-.4c.16.59.6.96 1.27.96.8 0 1.36-.4 1.36-1.36v-.37c-.28.37-.81.66-1.48.66-1.44 0-2.3-1.17-2.3-2.61s.86-2.61 2.3-2.61c.66 0 1.2.29 1.48.66v-.56h1.2zm-1.18-2.26c0-.96-.52-1.51-1.27-1.51-.83 0-1.32.58-1.32 1.56 0 .97.49 1.56 1.32 1.56.75 0 1.27-.55 1.27-1.5zm2.13-.8c0-2.18 1.4-3.7 3.34-3.7s3.34 1.52 3.34 3.7c0 1.34-.53 2.43-1.4 3.08.3.38.79.67 1.36.8l-.74.92a3 3 0 0 1-1.63-1.23q-.44.13-.93.13c-1.94 0-3.34-1.52-3.34-3.7m5.4 0c0-1.56-.85-2.57-2.06-2.57s-2.06 1-2.06 2.57.85 2.57 2.06 2.57c1.2 0 2.06-1.01 2.06-2.57m6.6-1.66v5.25h-1.2v-.56c-.3.35-.76.67-1.44.67-1.1 0-1.78-.75-1.78-1.88v-3.48h1.2v3.22c0 .64.28 1.05.93 1.05.54 0 1.08-.4 1.08-1.15v-3.12zm3.48 5.36c-1.5 0-2.55-1.11-2.55-2.73 0-1.54 1.04-2.73 2.5-2.73 1.52 0 2.33 1.15 2.33 2.59v.4h-3.68c.09.9.63 1.45 1.4 1.45.59 0 1.06-.3 1.22-.84l1.03.39a2.3 2.3 0 0 1-2.25 1.47m-.06-4.45c-.62 0-1.1.37-1.28 1.08h2.4c0-.58-.36-1.08-1.12-1.08m6.22-.92v1.2l-.44-.03c-.76 0-1.34.49-1.34 1.33v2.76h-1.2v-5.25h1.2v.78c.23-.5.77-.81 1.44-.81q.2 0 .34.02m3.2 5.75c-.3.8-.75 1.35-1.84 1.35-.25 0-.32-.01-.5-.03v-1.01c.17.02.26.03.4.03.4 0 .6-.11.77-.53l.2-.5-1.91-5.05h1.26l1.29 3.68 1.26-3.68h1.24z'
      />
      <circle cx='156.43' cy='306.84' r='8.31' fill='#3a7af4' />
      <path
        fill='#26aee4'
        d='m123.92 345.32.98-.81c.5.78 1.25 1.23 2.07 1.23s1.42-.37 1.42-1.06c0-.73-.75-.83-1.82-1.1-1.08-.25-2.24-.57-2.24-1.97 0-1.33 1.14-2.18 2.59-2.18 1.23 0 2.19.58 2.67 1.33l-.94.8c-.4-.61-.93-1.04-1.77-1.04-.77 0-1.3.39-1.3.96 0 .63.55.76 1.52.98 1.16.26 2.55.53 2.55 2.09 0 1.4-1.24 2.28-2.72 2.28a3.6 3.6 0 0 1-3.01-1.51m6.58 1.4v-5.25h1.2v.56c.3-.35.77-.66 1.45-.66 1.1 0 1.76.76 1.76 1.89v3.46h-1.2v-3.11c0-.65-.26-1.12-.92-1.12-.54 0-1.1.4-1.1 1.15v3.08zm10.37-2.62c0 1.63-1.06 2.73-2.53 2.73-1.49 0-2.53-1.1-2.53-2.73s1.04-2.73 2.53-2.73c1.47 0 2.53 1.1 2.53 2.73m-3.86 0c0 1.07.52 1.72 1.33 1.72.8 0 1.31-.65 1.31-1.72s-.5-1.72-1.31-1.72-1.33.65-1.33 1.72m7.2-2.63h.98l.94 3.48.93-3.48h1.2l-1.59 5.25h-1.04l-.96-3.44-.96 3.44h-1.04l-1.58-5.25h1.23l.95 3.48zm7.32-2.03v1.05l-.36-.01c-.47 0-.73.14-.73.74v.25h1.07v1.02h-1.07v4.23h-1.2v-4.23h-.73v-1.02h.73v-.34c0-1.1.6-1.7 1.79-1.7zm1.86.1v7.18h-1.2v-7.18zm2.66 7.27c-1 0-1.78-.61-1.78-1.55 0-1 .75-1.44 1.76-1.65l1.46-.3v-.1c0-.5-.27-.8-.9-.8-.58 0-.87.26-1.02.77l-1.12-.26a2.2 2.2 0 0 1 2.19-1.55c1.26 0 2.02.6 2.02 1.8v2.27q-.02.43.46.35v.93c-.87.1-1.34-.07-1.52-.5-.32.37-.87.59-1.56.59m1.44-1.94v-.64l-1.14.24c-.5.1-.88.27-.88.74 0 .4.3.64.75.64.65 0 1.27-.34 1.27-.98m3.68-5.33v4.14l2.02-2.21h1.47l-1.98 2.04 2.14 3.2h-1.4l-1.56-2.36-.7.7v1.67h-1.2v-7.18zm6.22 7.29c-1.5 0-2.55-1.11-2.55-2.73 0-1.54 1.04-2.73 2.5-2.73 1.52 0 2.33 1.15 2.33 2.59v.4H166c.1.9.63 1.45 1.4 1.45.6 0 1.06-.3 1.22-.84l1.03.39a2.3 2.3 0 0 1-2.25 1.47m-.06-4.45c-.62 0-1.1.37-1.28 1.08h2.41c0-.58-.37-1.08-1.13-1.08'
      />
      <circle cx='185.52' cy='342.98' r='8.31' fill='#26aee4' />
      <path
        fill='#fff'
        d='m93.31 16.93 1.14-1.27c.61.8 1.48 1.21 2.33 1.21.76 0 1.3-.3 1.3-.9 0-.63-.67-.71-1.87-.98-1.17-.25-2.44-.64-2.44-2.22 0-1.55 1.34-2.52 3.02-2.52 1.36 0 2.44.58 3.03 1.32l-1.12 1.21a2.4 2.4 0 0 0-1.96-1.01c-.7 0-1.18.3-1.18.81 0 .55.54.66 1.55.88 1.24.27 2.78.58 2.78 2.32 0 1.65-1.44 2.61-3.19 2.61-1.3 0-2.74-.56-3.39-1.46m9.08-6.56v7.9h-1.76v-7.9zm6.64 5c0 1.81-1.2 3.02-2.9 3.02-1.72 0-2.91-1.21-2.91-3.01s1.19-3.03 2.9-3.03c1.7 0 2.9 1.22 2.9 3.03m-4.06 0c0 1.02.45 1.59 1.15 1.59s1.16-.57 1.16-1.58-.45-1.59-1.16-1.59c-.7 0-1.15.57-1.15 1.59m7.7-2.9h1.31l.88 3.4.9-3.4h1.71l-1.76 5.8h-1.5l-.92-3.21-.91 3.2h-1.5l-1.77-5.79h1.77l.92 3.4zm12.95 1.43 1.63.28a5 5 0 0 1-1.03 2.47l1.64 1.62h-2.22l-.58-.56a4.3 4.3 0 0 1-2.36.68c-1.64 0-2.85-.84-2.85-2.21 0-.97.54-1.6 1.5-2.13-.43-.47-.76-.96-.76-1.63 0-1.27 1.08-2.17 2.53-2.17s2.38.9 2.38 1.96c0 .93-.53 1.45-1.7 2.03l1.3 1.3q.41-.73.52-1.64m-3.33-1.6c0 .4.24.67.6 1.04.79-.35 1.04-.58 1.04-1.08 0-.38-.3-.76-.8-.76s-.84.35-.84.8m-.67 3.67c0 .65.54 1.02 1.23 1.02q.65 0 1.17-.3l-1.75-1.72c-.4.23-.65.52-.65 1m8.8 2.3v-7.9h1.83v6.33h3.53v1.57zm11.5-2.9c0 1.81-1.2 3.02-2.9 3.02-1.71 0-2.9-1.21-2.9-3.01s1.19-3.03 2.9-3.03c1.7 0 2.9 1.22 2.9 3.03m-4.05 0c0 1.02.45 1.59 1.15 1.59s1.16-.57 1.16-1.58-.45-1.59-1.16-1.59c-.7 0-1.15.57-1.15 1.59m7.7-2.9h1.31l.88 3.4.9-3.4h1.71l-1.76 5.8h-1.5l-.92-3.21-.91 3.2h-1.51L142 12.51h1.77l.91 3.4zm5.1 3.37v-1.59h3.26v1.59zm5.9-1.52c0 1.5.78 2.48 1.89 2.48.8 0 1.4-.52 1.58-1.36l1.73.57a3.3 3.3 0 0 1-3.3 2.38c-2.17 0-3.73-1.68-3.73-4.07s1.56-4.07 3.73-4.07a3.3 3.3 0 0 1 3.3 2.38l-1.73.57c-.19-.84-.77-1.35-1.58-1.35-1.1 0-1.89.96-1.89 2.47m11.4 1.06c0 1.8-1.2 3.01-2.9 3.01-1.72 0-2.9-1.21-2.9-3.01s1.18-3.03 2.9-3.03c1.7 0 2.9 1.22 2.9 3.03m-4.06 0c0 1 .45 1.58 1.16 1.58.7 0 1.15-.57 1.15-1.58s-.45-1.59-1.16-1.59c-.7 0-1.15.57-1.15 1.59m4.36 2.04.91-1.19c.47.52 1.22.83 1.85.83.46 0 .85-.15.85-.46 0-.39-.39-.43-1.31-.6-.96-.18-1.98-.44-1.98-1.7 0-1.17 1.04-1.95 2.47-1.95 1.05 0 1.97.4 2.46.93l-.88 1.13a2.2 2.2 0 0 0-1.59-.72c-.43 0-.7.17-.7.43 0 .32.34.37 1.04.5 1.05.2 2.21.46 2.21 1.77 0 1.26-1.16 2-2.64 2-1 0-2.15-.34-2.7-.97m6.3-.7v-2.8h-.74v-1.45h.74v-1.6h1.74v1.6h1.13v1.45h-1.13v2.35c0 .48.25.57.7.57.2 0 .3-.01.5-.03v1.44q-.45.06-1.06.07c-1.25 0-1.88-.41-1.88-1.6m136.51 1.51h-1.8v-7.9h5.53v1.57h-3.73v1.8h3.1v1.54h-3.1zm5.65.1c-1.17 0-2-.7-2-1.72 0-1.2 1-1.68 2.23-1.86l1.3-.22v-.1c0-.43-.24-.7-.8-.7-.51 0-.78.22-.89.7l-1.68-.26c.25-1.02 1.17-1.86 2.64-1.86 1.52 0 2.45.7 2.45 2.05v2.23c0 .3.11.39.45.34v1.3c-1 .16-1.7-.02-1.99-.52q-.58.6-1.71.63m1.53-2.18v-.48l-1.02.18c-.46.08-.8.23-.8.64 0 .36.27.56.7.56.58 0 1.12-.3 1.12-.9m2.44 1.23.92-1.19c.47.52 1.22.83 1.85.83.46 0 .84-.15.84-.46 0-.39-.38-.43-1.3-.6-.96-.18-1.99-.44-1.99-1.7 0-1.17 1.05-1.95 2.48-1.95 1.04 0 1.97.4 2.45.93l-.88 1.13a2.2 2.2 0 0 0-1.58-.72c-.43 0-.7.17-.7.43 0 .32.34.37 1.04.5 1.04.2 2.21.46 2.21 1.77 0 1.26-1.17 2-2.64 2-1.01 0-2.16-.34-2.7-.97m6.3-.7v-2.8h-.73v-1.45h.74v-1.6h1.74v1.6h1.13v1.45h-1.13v2.35c0 .48.25.57.69.57.2 0 .3-.01.5-.03v1.44a9 9 0 0 1-1.05.07c-1.26 0-1.88-.41-1.88-1.6m11.37-2.82 1.63.28a5 5 0 0 1-1.04 2.47l1.64 1.62h-2.22l-.57-.56q-1 .66-2.37.68c-1.64 0-2.85-.84-2.85-2.21 0-.97.54-1.6 1.5-2.13-.43-.47-.76-.96-.76-1.63 0-1.27 1.09-2.17 2.53-2.17 1.45 0 2.39.9 2.39 1.96 0 .93-.53 1.45-1.7 2.03l1.29 1.3a5 5 0 0 0 .53-1.64M335 12.3c0 .4.25.67.6 1.04.79-.35 1.04-.58 1.04-1.08 0-.38-.3-.76-.8-.76s-.84.35-.84.8m-.67 3.67c0 .65.54 1.02 1.24 1.02q.64 0 1.16-.3L335 14.96c-.4.23-.65.52-.65 1m8.8 2.3v-7.9h1.83v6.33h3.53v1.57zm11.5-2.9c0 1.81-1.2 3.02-2.9 3.02-1.71 0-2.9-1.21-2.9-3.01s1.19-3.03 2.9-3.03c1.7 0 2.9 1.22 2.9 3.03m-4.05 0c0 1.02.45 1.59 1.15 1.59s1.16-.57 1.16-1.58-.45-1.59-1.16-1.59c-.7 0-1.15.57-1.15 1.59m7.7-2.9h1.32l.88 3.4.89-3.4h1.71l-1.76 5.8h-1.5l-.92-3.21-.91 3.2h-1.5l-1.77-5.79h1.77l.92 3.4zm5.1 3.37v-1.59h3.26v1.59zm5.9-1.52c0 1.5.79 2.48 1.89 2.48.81 0 1.4-.52 1.58-1.36l1.73.57a3.3 3.3 0 0 1-3.3 2.38c-2.17 0-3.73-1.68-3.73-4.07s1.56-4.07 3.73-4.07c1.7 0 2.81.94 3.3 2.38l-1.73.57c-.19-.84-.77-1.35-1.58-1.35-1.1 0-1.88.96-1.88 2.47m11.4 1.06c0 1.8-1.2 3.01-2.9 3.01-1.72 0-2.9-1.21-2.9-3.01s1.18-3.03 2.9-3.03c1.7 0 2.9 1.22 2.9 3.03m-4.06 0c0 1 .45 1.58 1.16 1.58.7 0 1.15-.57 1.15-1.58s-.45-1.59-1.15-1.59-1.16.57-1.16 1.59m4.36 2.04.91-1.19c.48.52 1.23.83 1.85.83.46 0 .85-.15.85-.46 0-.39-.39-.43-1.3-.6-.97-.18-1.99-.44-1.99-1.7 0-1.17 1.05-1.95 2.48-1.95 1.04 0 1.96.4 2.45.93l-.88 1.13a2.2 2.2 0 0 0-1.59-.72c-.42 0-.7.17-.7.43 0 .32.34.37 1.05.5 1.04.2 2.2.46 2.2 1.77 0 1.26-1.16 2-2.63 2-1.01 0-2.16-.34-2.7-.97m6.3-.7v-2.8h-.73v-1.45h.73v-1.6h1.74v1.6h1.14v1.45h-1.14v2.35c0 .48.26.57.7.57.2 0 .3-.01.5-.03v1.44q-.45.06-1.06.07c-1.25 0-1.88-.41-1.88-1.6M91.45 213.4l1.13-1.26c.62.8 1.49 1.21 2.34 1.21.75 0 1.3-.3 1.3-.9 0-.62-.68-.71-1.88-.98-1.16-.25-2.44-.63-2.44-2.22 0-1.55 1.34-2.52 3.03-2.52 1.36 0 2.44.59 3.02 1.32l-1.11 1.21a2.4 2.4 0 0 0-1.97-1.01c-.7 0-1.18.3-1.18.81 0 .55.54.66 1.56.88 1.24.27 2.78.59 2.78 2.32 0 1.66-1.44 2.61-3.2 2.61-1.3 0-2.73-.56-3.38-1.46m9.07-6.55v7.9h-1.76v-7.9zm6.64 5c0 1.81-1.2 3.02-2.9 3.02-1.72 0-2.9-1.2-2.9-3.01s1.18-3.03 2.9-3.03c1.7 0 2.9 1.22 2.9 3.03m-4.06 0c0 1.02.46 1.6 1.16 1.6s1.15-.58 1.15-1.6c0-1-.45-1.58-1.15-1.58s-1.16.58-1.16 1.59m7.7-2.9h1.32l.88 3.4.9-3.4h1.7l-1.75 5.8h-1.51l-.91-3.21-.92 3.21h-1.5l-1.76-5.8h1.77l.91 3.4zm12.96 1.43 1.63.28a5 5 0 0 1-1.04 2.47l1.64 1.62h-2.22l-.57-.56q-.99.66-2.37.68c-1.64 0-2.84-.83-2.84-2.2 0-.98.53-1.6 1.5-2.14-.44-.47-.77-.96-.77-1.63 0-1.27 1.1-2.17 2.53-2.17 1.45 0 2.39.9 2.39 1.96 0 .94-.53 1.45-1.7 2.03l1.3 1.3q.4-.73.52-1.64m-3.33-1.6c0 .4.24.67.6 1.04.78-.35 1.04-.58 1.04-1.07a.77.77 0 0 0-.8-.76c-.49 0-.84.34-.84.8m-.67 3.67c0 .65.53 1.03 1.23 1.03q.65 0 1.16-.31l-1.75-1.72c-.4.23-.64.52-.64 1m13.83-5.6h1.84v7.9h-1.84v-3.25h-3.2v3.25h-1.84v-7.9h1.83v3.08h3.22zm3.03 1.51v-1.5h1.8v1.5zm1.78.6v5.8h-1.77V209zm6.7 5.1c0 1.8-1.27 2.75-3.06 2.75-1.44 0-2.45-.6-2.76-1.73l1.68-.4c.14.5.56.8 1.14.8.71 0 1.22-.37 1.22-1.22v-.38c-.28.39-.87.68-1.56.68-1.59 0-2.5-1.27-2.5-2.86s.91-2.87 2.5-2.87c.7 0 1.28.31 1.56.7v-.58h1.77zm-1.76-2.44c0-.86-.47-1.34-1.13-1.34-.75 0-1.16.56-1.16 1.41 0 .86.41 1.42 1.16 1.42.66 0 1.13-.47 1.13-1.32zm2.91 3.13v-7.9h1.76v2.69c.32-.38.86-.7 1.6-.7 1.18 0 1.93.82 1.93 2.08v3.83h-1.76v-3.32c0-.58-.24-1.01-.81-1.01-.49 0-.96.34-.96 1.02v3.31zm6.28-2.43v-1.58h3.26v1.58zm5.9-1.52c0 1.5.79 2.48 1.89 2.48.81 0 1.4-.52 1.58-1.36l1.73.58a3.3 3.3 0 0 1-3.3 2.37c-2.17 0-3.73-1.68-3.73-4.07s1.56-4.07 3.73-4.07c1.7 0 2.82.94 3.3 2.38l-1.73.57c-.18-.84-.77-1.35-1.58-1.35-1.1 0-1.88.96-1.88 2.47m11.4 1.06c0 1.8-1.2 3.01-2.9 3.01-1.72 0-2.9-1.2-2.9-3.01s1.18-3.03 2.9-3.03c1.7 0 2.9 1.22 2.9 3.03m-4.06 0c0 1.01.45 1.58 1.16 1.58.7 0 1.15-.57 1.15-1.58s-.45-1.59-1.15-1.59-1.16.58-1.16 1.59m4.36 2.04.92-1.18c.47.51 1.22.82 1.84.82.47 0 .85-.15.85-.46 0-.39-.38-.43-1.3-.6-.97-.18-1.99-.44-1.99-1.69 0-1.18 1.05-1.96 2.48-1.96 1.04 0 1.97.4 2.45.93l-.88 1.13a2.2 2.2 0 0 0-1.58-.71c-.43 0-.7.16-.7.42 0 .32.33.37 1.04.5 1.04.2 2.2.46 2.2 1.77 0 1.26-1.16 2-2.63 2-1.01 0-2.16-.34-2.7-.97m6.3-.7v-2.8h-.73v-1.45h.74v-1.6h1.73v1.6h1.14v1.46h-1.14v2.34c0 .48.26.57.7.57.2 0 .3-.01.5-.03v1.44q-.44.07-1.05.08c-1.26 0-1.88-.42-1.88-1.61m132.75.53h-1.8v-7.9h5.53v1.58h-3.73v1.8h3.1v1.53h-3.1zm5.64.11c-1.16 0-2-.7-2-1.72 0-1.2 1.01-1.69 2.23-1.86l1.3-.22v-.1c0-.43-.23-.7-.8-.7q-.73 0-.88.69l-1.69-.25c.26-1.03 1.17-1.86 2.64-1.86 1.52 0 2.46.69 2.46 2.04v2.23c0 .3.1.39.45.35v1.3q-1.53.23-2-.52-.57.6-1.7.62m1.53-2.19v-.48l-1.01.19c-.46.07-.8.23-.8.64 0 .36.27.56.69.56.58 0 1.12-.31 1.12-.9m2.45 1.24.91-1.2c.48.53 1.22.83 1.85.83.46 0 .85-.15.85-.46 0-.38-.39-.43-1.31-.6-.96-.18-1.98-.43-1.98-1.69 0-1.17 1.05-1.95 2.48-1.95 1.04 0 1.96.4 2.45.92l-.88 1.13a2.2 2.2 0 0 0-1.59-.71c-.43 0-.7.16-.7.43 0 .32.34.36 1.05.5 1.04.2 2.2.45 2.2 1.76 0 1.27-1.16 2-2.63 2-1.02 0-2.16-.34-2.7-.96m6.3-.7v-2.8h-.73v-1.45h.73v-1.6h1.74v1.6H328v1.45h-1.13v2.34c0 .49.25.57.7.57.2 0 .3 0 .5-.03v1.44q-.45.08-1.06.08c-1.25 0-1.88-.42-1.88-1.6m11.36-2.82 1.63.27a5 5 0 0 1-1.03 2.48l1.64 1.61h-2.23l-.57-.56c-.66.43-1.45.69-2.36.69-1.64 0-2.85-.84-2.85-2.22 0-.96.54-1.6 1.5-2.13-.44-.46-.76-.96-.76-1.63 0-1.26 1.08-2.16 2.53-2.16s2.38.89 2.38 1.95c0 .94-.53 1.45-1.7 2.04l1.3 1.3q.41-.75.52-1.64m-3.33-1.6c0 .4.24.66.6 1.04.79-.36 1.04-.59 1.04-1.08 0-.39-.3-.76-.8-.76s-.84.34-.84.8m-.67 3.66c0 .65.54 1.03 1.23 1.03q.64 0 1.17-.31l-1.75-1.72c-.4.24-.65.52-.65 1m13.84-5.6h1.83v7.9h-1.83v-3.25h-3.21v3.25h-1.84v-7.9h1.84v3.09h3.2zm3.03 1.51v-1.5h1.79v1.5zm1.77.6v5.8h-1.76v-5.8zm6.7 5.1c0 1.8-1.27 2.75-3.05 2.75-1.44 0-2.46-.6-2.76-1.73l1.67-.4c.14.5.56.8 1.14.8.72 0 1.22-.36 1.22-1.22v-.37c-.27.38-.87.68-1.56.68-1.58 0-2.5-1.28-2.5-2.86 0-1.59.92-2.87 2.5-2.87.7 0 1.29.3 1.56.69v-.57h1.77zm-1.75-2.44c0-.86-.48-1.33-1.14-1.33-.75 0-1.15.55-1.15 1.4 0 .86.4 1.42 1.15 1.42.66 0 1.13-.47 1.13-1.31zm2.9 3.13v-7.9h1.76v2.69c.32-.37.86-.7 1.6-.7 1.19 0 1.94.82 1.94 2.09v3.82h-1.76v-3.32c0-.58-.25-1.01-.82-1.01-.48 0-.96.34-.96 1.02v3.31zm6.29-2.43v-1.58h3.25v1.58zm5.9-1.52c0 1.51.78 2.48 1.88 2.48.82 0 1.4-.52 1.59-1.35l1.72.57a3.3 3.3 0 0 1-3.3 2.38c-2.16 0-3.73-1.69-3.73-4.08 0-2.38 1.57-4.06 3.73-4.06 1.7 0 2.82.93 3.3 2.37l-1.72.57c-.2-.83-.77-1.35-1.59-1.35-1.1 0-1.88.97-1.88 2.47m11.4 1.06c0 1.8-1.2 3.02-2.9 3.02-1.72 0-2.91-1.22-2.91-3.02s1.19-3.02 2.9-3.02c1.7 0 2.9 1.22 2.9 3.02m-4.06 0c0 1.01.45 1.59 1.15 1.59s1.16-.58 1.16-1.59-.45-1.58-1.16-1.58c-.7 0-1.15.57-1.15 1.58m4.36 2.05.9-1.2c.48.53 1.23.83 1.86.83.46 0 .84-.15.84-.46 0-.38-.38-.43-1.3-.6-.96-.18-1.99-.43-1.99-1.69 0-1.17 1.05-1.95 2.48-1.95 1.05 0 1.97.4 2.45.92l-.88 1.13a2.2 2.2 0 0 0-1.58-.71c-.43 0-.7.16-.7.43 0 .32.34.36 1.04.5 1.04.2 2.21.45 2.21 1.76 0 1.27-1.17 2-2.64 2-1.01 0-2.16-.34-2.7-.96m6.3-.7v-2.8h-.74v-1.45h.74v-1.6h1.74v1.6h1.13v1.45h-1.13v2.34c0 .49.25.57.69.57.2 0 .3 0 .5-.03v1.44q-.44.08-1.05.08c-1.25 0-1.88-.42-1.88-1.6'
      />
    </svg>
  )
}

function BlogItemImage({
  item,
  className = ''
}: {
  item: BlogItem
  className?: string
}) {
  return (
    <div className={`relative aspect-thumbnail overflow-hidden ${className}`}>
      {item.benchmarkImage ? (
        <div className='absolute inset-0 z-10 bg-neutral'>
          <Image
            src={item.benchmarkImage}
            alt={item.entry.title}
            width={400}
            height={600}
            className='absolute inset-0 h-full w-full max-w-none scale-125 object-cover object-center opacity-15 blur-lg'
          />
          <Image
            src={item.benchmarkImage}
            alt={item.entry.title}
            width={400}
            height={600}
            className='absolute inset-0 h-full w-full max-w-none object-contain object-center'
          />
        </div>
      ) : (
        <StrapiImage
          entry={item.entry.thumbnailPng}
          alt={item.entry.title}
          width={400}
          height={600}
          className='absolute inset-0 w-full max-w-none object-cover object-center'
        />
      )}
    </div>
  )
}

function BlogCoverFlow({ blogs }: { blogs: Array<BlogItem> }) {
  const swiperRef = useRef<null | SwiperClass>(null)
  const [navReady, setNavReady] = useState<boolean>(false)
  const prevRef = useRef<null | HTMLButtonElement>(null)
  const nextRef = useRef<null | HTMLButtonElement>(null)
  useEffect(() => {
    setNavReady(!!prevRef.current && !!nextRef.current)
  }, [prevRef.current, nextRef.current])
  return (
    <div className='relative'>
      <button
        type='button'
        ref={prevRef}
        className='absolute left-0 top-1/2 z-10 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full backdrop-blur-lg transition-colors hover:bg-white/10 lg:left-12 lg:flex 2xl:left-0'>
        <span className='sr-only'>Prev</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='23'
          height='15'
          fill='none'
          viewBox='0 0 23 15'>
          <path
            fill='#fff'
            d='m7.15 14.32 1.65-1.65-4.32-4.31h17.85v-2.4H4.47L8.8 1.62 7.15 0 0 7.16z'
          />
        </svg>
      </button>
      <button
        type='button'
        ref={nextRef}
        className='absolute right-0 top-1/2 z-10 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full backdrop-blur-lg transition-colors hover:bg-white/10 lg:right-12 lg:flex 2xl:right-0'>
        <span className='sr-only'>Next</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='23'
          height='15'
          fill='none'
          viewBox='0 0 23 15'>
          <path
            fill='#fff'
            d='m15.18 14.32-1.65-1.65 4.32-4.31H0v-2.4h17.86l-4.33-4.34L15.18 0l7.15 7.16z'
          />
        </svg>
      </button>
      <Swiper
        key={navReady ? 'with-nav' : 'no-nav'}
        modules={[Mousewheel, EffectCoverflow, Navigation]}
        navigation={{
          enabled: true,
          prevEl: prevRef.current,
          nextEl: nextRef.current
        }}
        mousewheel={{
          enabled: true,
          forceToAxis: true,
          releaseOnEdges: true,
          sensitivity: 0.5
        }}
        effect='coverflow'
        coverflowEffect={{
          rotate: 0, // no tilt
          depth: 0, // no 3D depth
          stretch: 60, // negative to pull sides under center
          scale: 0.8, // scale side slides down
          modifier: 1,
          slideShadows: false
        }}
        onAfterInit={(swiper) => {
          swiperRef.current = swiper
        }}
        slidesPerView={1.25}
        simulateTouch={false}
        slideToClickedSlide={true}
        centeredSlides={true}
        loop={true}
        breakpoints={{
          1024: {
            slidesPerView: 2.85
          }
        }}>
        {blogs.map((blogItem, blogIndex) => {
          return (
            <SwiperSlide
              key={blogIndex}
              className='select-none [&:not(.swiper-slide-active)]:cursor-pointer'
              onClick={() => {
                const swiper = swiperRef.current
                if (!swiper) return
                const isGt = blogIndex > swiper.realIndex
                const isLt = blogIndex < swiper.realIndex
                const isLoopStart =
                  swiper.realIndex === 0 &&
                  blogIndex === swiper.slides.length - 1
                const isLoopEnd =
                  swiper.realIndex === swiper.slides.length - 1 &&
                  blogIndex === 0
                if ((isGt && !isLoopStart) || isLoopEnd) {
                  swiper.slideNext()
                } else if ((isLt && !isLoopEnd) || isLoopStart) {
                  swiper.slidePrev()
                }
              }}>
              {({ isActive, isVisible }) => (
                <div
                  className={`relative my-6 transition-opacity ${isVisible || isActive ? '' : 'opacity-0'} ${isActive ? '' : 'pointer-events-none opacity-50'}`}>
                  <div
                    className={`absolute inset-0 z-0 bg-primary-300 blur transition-opacity ${isActive ? '' : 'opacity-0'}`}
                  />
                  <Link
                    href={`/blog/${blogItem.entry.slug}`}
                    className='group relative z-10'>
                    <BlogItemImage item={blogItem} className='rounded-xl' />
                  </Link>
                </div>
              )}
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

function BlogFinder({ blogs }: { blogs: Array<BlogItem> }) {
  const [competitorsOpen, setCompetitorsOpen] = useState<boolean>(false)
  const [featuresOpen, setFeaturesOpen] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [filterCompetitor, setFilterCompetitor] =
    useState<null | BlogCompetitors>(null)
  const [filterFeature, setFilterFeature] = useState<null | BlogFeatures>(null)

  const filtered = blogs.filter((item) => {
    const matchesCompetitor =
      !filterCompetitor ||
      (item.competitors && item.competitors.includes(filterCompetitor))
    const matchesFeature =
      !filterFeature || (item.features && item.features.includes(filterFeature))
    return matchesCompetitor && matchesFeature
  })

  // Sort entries by date DESC
  filtered.sort((a, b) => {
    return new Date(b.entry.date).getTime() - new Date(a.entry.date).getTime()
  })

  const handleLatestToggle = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
  }

  const handleCopetitorsToggle = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    setFeaturesOpen(false)
    setCompetitorsOpen((old) => !old)
  }

  const handleFeaturesToggle = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    setCompetitorsOpen(false)
    setFeaturesOpen((old) => !old)
  }

  const handleCopetitorFilter = (competitor: BlogCompetitors) => {
    return (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault()
      setFilterFeature(null)
      setFilterCompetitor((old) => {
        if (old === competitor) return null
        return competitor
      })
    }
  }

  const handleFeatureFilter = (feature: BlogFeatures) => {
    return (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault()
      setFilterCompetitor(null)
      setFilterFeature((old) => {
        if (old === feature) return null
        return feature
      })
    }
  }

  const handleClearFilters = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    // Reset pagination
    setPage(1)

    // Remove filters
    setFilterCompetitor(null)
    setFilterFeature(null)

    // Close UIs
    setCompetitorsOpen(false)
    setFeaturesOpen(false)
  }

  return (
    <>
      <div className='mx-auto flex flex-col flex-wrap justify-center gap-4 lg:max-w-4xl lg:flex-row'>
        <CUIButton
          type={competitorsOpen ? 'primary-dark' : 'secondary'}
          className='!rounded-full'
          iconRight={
            <ChevronDown
              className={`size-4 transition-transform ${competitorsOpen ? '-rotate-180' : ''}`}
            />
          }
          onClick={handleCopetitorsToggle}>
          ClickHouse vs Competition
        </CUIButton>
        {competitorsOpen && (
          <div className='flex flex-col flex-wrap justify-center gap-4 px-6 lg:order-last lg:flex-row lg:px-0'>
            {(
              [
                'Postgres',
                'Snowflake',
                'MongoDB',
                'Databricks',
                'Elastic',
                'Redshift',
                'BigQuery'
              ] satisfies Array<BlogCompetitors>
            ).map((competitor, competitorIndex) => {
              return (
                <CUIButton
                  key={competitorIndex}
                  type={
                    filterCompetitor === competitor ? 'primary' : 'secondary'
                  }
                  className='!rounded-full'
                  onClick={handleCopetitorFilter(competitor)}>
                  {competitor}
                </CUIButton>
              )
            })}
          </div>
        )}
        <CUIButton
          type={featuresOpen ? 'primary-dark' : 'secondary'}
          className='!rounded-full'
          iconRight={
            <ChevronDown
              className={`size-4 transition-transform ${featuresOpen ? '-rotate-180' : ''}`}
            />
          }
          onClick={handleFeaturesToggle}>
          Why is ClickHouse so fast
        </CUIButton>
        {featuresOpen && (
          <div className='flex flex-col flex-wrap justify-center gap-4 px-6 lg:order-last lg:flex-row lg:px-0'>
            {(
              [
                'Joins',
                'Inserts / Updates',
                'Select',
                'Cloud',
                'JSON',
                'Lakehouse'
              ] satisfies Array<BlogFeatures>
            ).map((feature, featureIndex) => {
              return (
                <CUIButton
                  key={featureIndex}
                  type={filterFeature === feature ? 'primary' : 'secondary'}
                  className='!rounded-full'
                  onClick={handleFeatureFilter(feature)}>
                  {feature}
                </CUIButton>
              )
            })}
          </div>
        )}
        <ClearFiltersButton
          onClick={handleClearFilters}
          className='mx-auto lg:mx-0'
          disabled={!filterCompetitor && !filterFeature}
        />
      </div>
      <PaginateChildren
        perPage={9}
        mode='loadMore'
        page={page}
        onPageChange={setPage}>
        <div className='mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          <PaginateChildren.Items>
            {filtered.map((blogItem, blogIndex) => {
              return (
                <CUICard
                  key={blogIndex}
                  className='group relative overflow-hidden transition-transform hover:-translate-y-1'>
                  <CUICard.Header>
                    <BlogItemImage item={blogItem} />
                  </CUICard.Header>
                  <CUICard.Body className='mb-auto p-6'>
                    <SuiTitle type='h3'>
                      <Link
                        href={
                          blogItem.entry.category === 'Japanese'
                            ? `/jp/blog/${blogItem.entry.slug}`
                            : `/blog/${blogItem.entry.slug}`
                        }
                        className='text-neutral-100'>
                        <span className='absolute inset-0 z-10' />
                        {blogItem.title || blogItem.entry.title}
                      </Link>
                    </SuiTitle>
                  </CUICard.Body>
                </CUICard>
              )
            })}
          </PaginateChildren.Items>
        </div>
        <PaginateChildren.NextButton className='mx-auto mt-6 flex items-center justify-center gap-1 rounded border border-primary-600 bg-transparent px-6 py-2 text-sm text-neutral-0 hover:border-primary-500 hover:bg-neutral-725 hover:bg-opacity-80 hover:shadow-xl active:border-primary-500 active:bg-neutral-725 active:bg-opacity-80 active:shadow-xl disabled:hidden'>
          Load more
        </PaginateChildren.NextButton>
      </PaginateChildren>
    </>
  )
}
