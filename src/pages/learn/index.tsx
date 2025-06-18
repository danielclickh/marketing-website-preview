import iconContributors from './assets/icon-contributors.svg'
import iconDevelopers from './assets/icon-developers.svg'
import iconOnDemand from './assets/icon-on-demand.svg'
import iconPrs from './assets/icon-prs.svg'
import iconStars from './assets/icon-stars.svg'
import LearningPathCard from '@/components-cleaned/LearningPathCard'
import YouTubeVideo from '@/components-cleaned/YouTubeVideo'
import { CUIButton } from '@/components/ClickUI'
import Layout from '@/components/Layout'
import LinkWithArrow from '@/components/LinkWithArrow'
import { SuiText, SuiTitle } from '@/components/sui'
import { findOne } from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import formatStat from '@/lib/utils/numbers'
import { LearnProps } from '@/types/learn'
import { GetStaticProps } from 'next'
import Image from 'next/image'

export const getStaticProps: GetStaticProps<LearnProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()
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
        seo: {
          title:
            'ClickHouse Training | How to Use ClickHouse | Database Tutorial',
          description:
            'Master the art of data analysis with ClickHouse. Our seamless, easy to use database management platform can help you to unlock powerful insights. Try for free.',
          path: '/learn',
          imageUrl: 'https://clickhouse.com/images/clickhouse-learning-og.png'
        },
        ...data,
        ...commonProps
      }
    }
  }

export default function LearnPage({
  footerData,
  headerData,
  customerStories,
  seo
}: LearnProps) {
  useGalaxyOnPage('learnPage')

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      {/* Hero */}
      <section className='bg-grid py-24'>
        <div className='section-container flex items-center gap-16'>
          <div className='space-y-4'>
            <SuiTitle type='h1'>ClickHouse training</SuiTitle>
            <SuiText size='lg' className='text-neutral-200'>
              Master ClickHouse with expert-led training designed for every
              skill level and delivered through self-paced paths, live sessions,
              or certification.
            </SuiText>
            <div className='!my-8 flex gap-4'>
              <CUIButton
                href='#on-demand'
                type='primary'
                size='lg'
                className='px-8'>
                On-demand training
              </CUIButton>
              <CUIButton
                href='#live'
                type='secondary-dark'
                size='lg'
                className='px-8'>
                Live training
              </CUIButton>
            </div>
            <LinkWithArrow
              href='/learn/certification'
              className='font-bold text-primary-300 hover:underline'>
              Get ClickHouse Certified
            </LinkWithArrow>
          </div>
          <div className='w-full max-w-xl'>
            <YouTubeVideo
              id='V6C6zyR4rq0'
              thumbnail='/images/clickhouse-learning-og.png'
              playButtonEyebrow='New to ClickHouse?'
              playButtonLabel='Watch the introduction'
            />
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className='bg-white/10 py-8'>
        <div className='section-container'>
          <ul className='flex items-center justify-between text-xl font-bold'>
            <li className='flex items-center gap-4'>
              <Image
                src={iconDevelopers}
                alt='Developers'
                width={32}
                height={32}
              />
              100k+ developers
            </li>
            <li className='flex items-center gap-4'>
              <Image src={iconStars} alt='Stars' width={32} height={32} />
              40k+ GitHub stars
            </li>
            <li className='flex items-center gap-4'>
              <Image
                src={iconContributors}
                alt='Contributors'
                width={32}
                height={32}
              />
              2k+ contributors
            </li>
            <li className='flex items-center gap-4'>
              <Image src={iconPrs} alt='PRs' width={32} height={32} />
              36k+ PRs
            </li>
          </ul>
        </div>
      </section>

      {/* On-demand */}
      <section id='on-demand' className='my-24'>
        <div className='section-container'>
          <div className='mx-auto mb-24 max-w-xl space-y-4 text-center'>
            <Image
              src={iconOnDemand}
              width={72}
              height={72}
              alt='On demand'
              className='inline-block'
            />
            <SuiTitle type='h2'>Choose a learning path</SuiTitle>
            <SuiText className='opacity-70'>
              Build real-world skills with curated learning paths aligned to
              your goals. Self-paced and beginner-friendly.
            </SuiText>
          </div>
          <div className='grid grid-cols-4 gap-8'>
            <LearningPathCard
              icon={iconOnDemand}
              title='Real-time analytics'
              description='Learn how to power real-time dashboards, alerts, and event-driven apps with ClickHouse.'
              href='/learn/real-time-analytics'
              duration='1hr'
              modules='1 module'
            />
            <LearningPathCard
              icon={iconOnDemand}
              title='ML and GenAI'
              description='Use ClickHouse to prepare data, feed models, and support GenAI workflows at scale.'
              href='/learn/machine-learning-and-data-science'
              duration='1hr'
              modules='1 module'
            />
            <LearningPathCard
              icon={iconOnDemand}
              title='Data warehousing'
              description='Design, build, and optimize modern data warehouses using ClickHouse.'
              href='/learn/data-warehousing'
              duration='1hr'
              modules='1 module'
            />
            <LearningPathCard
              icon={iconOnDemand}
              title='Observability'
              description='Ingest logs, metrics, and traces to monitor systems and power observability dashboards.'
              href='/learn/observability'
              duration='1hr'
              modules='1 module'
            />
          </div>
        </div>
      </section>
    </Layout>
  )
}
