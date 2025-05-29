import { CUIButton, CUICard } from '@/components/ClickUI'
import Layout from '@/components/Layout'
import LogoCarousel from '@/components/LogoCarousel'
import Certificate from '@/components/icons/Certificate'
import CertificateSquare from '@/components/icons/CertificateSquare'
import DatabasePlus from '@/components/icons/DatabasePlus'
import Eye from '@/components/icons/Eye'
import Stairs from '@/components/icons/Stairs'
import UserList from '@/components/icons/UserList'
import UserListSquare from '@/components/icons/UserListSquare'
import VideoSquare from '@/components/icons/VideoSquare'
import Webcam from '@/components/icons/Webcam'
import { SuiText, SuiTitle } from '@/components/sui'
import { findOne } from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { LearnProps } from '@/types/learn'
import { ClockIcon } from '@heroicons/react/outline'
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

type TrainingCardProps = {
  icon: JSX.Element
  badge?: string
  title: string
  description: string
  perks: Array<string>
  link: string
  button?: string // Defaults to 'Sign up'
}

function TrainingCard(props: TrainingCardProps) {
  return (
    <div className='relative flex h-full flex-col items-center justify-between rounded-lg border border-neutral-700/80 bg-neutral-900 p-6 shadow-card hover:shadow-lg'>
      <div
        className='bg-grid-lines pointer-events-none absolute inset-0 z-0'
        style={{ maskImage: 'radial-gradient(#000 0%, transparent 75%)' }}
      />
      <CUICard.Body className='relative z-10 mb-6'>
        <div className='mb-6 flex h-[46px] items-center text-primary-300'>
          {props.icon}
        </div>
        <SuiTitle type='h3' className='mb-4 flex items-center gap-3'>
          {props.title}
          {props.badge && (
            <span className='inline-block flex-shrink-0 flex-grow-0 rounded-full border border-primary px-3 py-1 text-xs font-normal'>
              {props.badge}
            </span>
          )}
        </SuiTitle>
        <p className='text-sm'>{props.description}</p>
      </CUICard.Body>
      <CUICard.Footer className='relative z-10'>
        {props.perks.map((perk, index) => {
          return (
            <div key={index} className='mt-2 flex items-start gap-2'>
              <Certificate
                style={{ width: '20px', height: 'auto' }}
                className='mt-1 flex-shrink-0 flex-grow-0 text-primary'
              />
              {perk}
            </div>
          )
        })}
        <CUIButton
          type='primary'
          size='lg'
          className='mt-6 w-full'
          href={props.link}>
          {props.button || 'Sign up'}
        </CUIButton>
      </CUICard.Footer>
    </div>
  )
}

type CertificationCardProps = {
  title: string
  description: string
}

function CertificationCard(props: CertificationCardProps) {
  return (
    <div className='h-full rounded border border-white p-6'>
      <svg
        width='32'
        height='32'
        viewBox='0 0 32 32'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M5.33333 4H12C12.736 4 13.3333 4.59733 13.3333 5.33333V12C13.3333 12.736 12.736 13.3333 12 13.3333H5.33333C4.59733 13.3333 4 12.736 4 12V5.33333C4 4.59733 4.59733 4 5.33333 4Z'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M19.9993 4H26.666C27.402 4 27.9993 4.59733 27.9993 5.33333V12C27.9993 12.736 27.402 13.3333 26.666 13.3333H19.9993C19.2633 13.3333 18.666 12.736 18.666 12V5.33333C18.666 4.59733 19.2633 4 19.9993 4Z'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M22.666 21.3332L25.3327 18.6665L27.9993 21.3332'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M25.3327 18.6665V26.6665C25.3327 27.4025 24.7353 27.9998 23.9993 27.9998H18.666'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M5.33333 18.6665H12C12.736 18.6665 13.3333 19.2638 13.3333 19.9998V26.6665C13.3333 27.4025 12.736 27.9998 12 27.9998H5.33333C4.59733 27.9998 4 27.4025 4 26.6665V19.9998C4 19.2638 4.59733 18.6665 5.33333 18.6665Z'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
      <SuiTitle type='h4' className='my-4'>
        {props.title}
      </SuiTitle>
      <p>{props.description}</p>
    </div>
  )
}

type OnDemandCardProps = {
  icon: JSX.Element
  title: string
  duration: string
  thumbnail: string
  description: string
  link: string
  button?: string // Defaults to 'Register now'
}

function OnDemandCard(props: OnDemandCardProps) {
  return (
    <CUICard>
      <CUICard.Body className='p-6 text-center'>
        <div className='inline-block flex h-[60px] items-center justify-center text-primary-300'>
          {props.icon}
        </div>
        <SuiTitle type='h3' className='my-4'>
          {props.title}
        </SuiTitle>
        <div className='flex justify-center gap-2 opacity-75'>
          <ClockIcon width='20' height='20' />
          {props.duration}
        </div>
        <div className='relative my-4 aspect-video overflow-hidden rounded bg-white'>
          <Image
            src={props.thumbnail}
            alt={props.title}
            width={320}
            height={180}
            className='absolute h-full w-full object-cover object-center'
          />
        </div>
        <p className='text-sm'>{props.description}</p>
      </CUICard.Body>
      <CUICard.Footer className='p-6 pt-0'>
        <CUIButton
          type='primary'
          size='lg'
          className='w-full'
          href={props.link}>
          {props.button || 'Register now'}
        </CUIButton>
      </CUICard.Footer>
    </CUICard>
  )
}

const trainingCards: Array<TrainingCardProps> = [
  {
    icon: <UserList />,
    badge: 'Free',
    title: 'Free on-demand training',
    button: 'Browse catalog',
    description:
      'Learn at your own pace. ClickHouse Academy provides free, on-demand, self-paced training.',
    perks: ['Start learning right now', 'Hands-on lab activities'],
    link: 'https://learn.clickhouse.com/visitor_class_catalog'
  },
  {
    icon: <Webcam />,
    badge: 'Free',
    title: 'Free live training',
    description:
      'Learn from ClickHouse experts by attending one of our virtual training sessions. Instructors deliver the content live.',
    perks: ['Hands-on lab activities', 'Live Q&A and engaging interactions'],
    link: '/company/events?category=Free+Training#upcoming-events',
    button: 'See upcoming training'
  },
  {
    icon: <Certificate />,
    title: 'Certification',
    button: 'Learn more',
    description:
      'Showcase your ClickHouse expertise and set yourself apart professionally by becoming ClickHouse certified.',
    perks: [
      'Official ClickHouse certification',
      'Validate your knowledge and skills'
    ],
    link: '/learn/certification'
  }
]

const certificationCards: Array<CertificationCardProps> = [
  {
    title: 'Career growth',
    description: 'Let companies know you can provide a competitive advantage.'
  },
  {
    title: 'Industry recognition',
    description:
      'Passing one of our hands-on, performance-based exams proves you not only understand ClickHouse, but also have the skills to build real-world solutions with ClickHouse.'
  },
  {
    title: 'Improved results',
    description:
      'ClickHouse is simple to get started, but the deeper you dive into it the more you realize how powerful and complex it is. The more you understand about ClickHouse, the more you will get out of ClickHouse!'
  }
]

const onDemandCards: Array<OnDemandCardProps> = [
  {
    icon: <Stairs />,
    title: 'Getting Started',
    duration: '60 minutes',
    thumbnail: '/images/learn/od-getting-started.jpg',
    description:
      'Get up and running quickly with ClickHouse! In this course, you’ll learn how to create a new service, how primary keys work in ClickHouse, how to define a table, how to insert data, and how to run queries on your table.',
    link: 'https://learn.clickhouse.com/visitor_catalog_class/show/1328489'
  },
  {
    icon: <DatabasePlus />,
    title: 'Data Ingestion',
    duration: '60 minutes',
    thumbnail: '/images/learn/od-data-ingestion.jpg',
    description:
      'In this course, you’ll learn techniques for getting data into your ClickHouse service, including how to insert a CSV/TSV file, how to insert data from another database, and how to use the various functions and table engines for ingesting data.',
    link: 'https://learn.clickhouse.com/visitor_catalog_class/show/1328910'
  },
  {
    icon: <Eye />,
    title: 'Materialized Views',
    duration: '60 minutes',
    thumbnail: '/images/learn/od-materialized-views.jpg',
    description:
      'Creating views is an important step in optimizing your OLAP applications. In this course, you’ll learn how to define materialized views, including views that use the SummingMergeTree and AggregatingMergeTree table engines.',
    link: 'https://learn.clickhouse.com/visitor_catalog_class/show/1328927'
  }
]

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
      <div className='relative bg-grid py-16 text-center md:py-20'>
        <SuiTitle type='h1' color='white' className='mb-6 md:!text-6xl'>
          ClickHouse training
        </SuiTitle>
        <SuiText color='secondary'>
          Become a ClickHouse expert with our free official ClickHouse training.
        </SuiText>
      </div>

      {/* Training cards */}
      <div className='relative bg-grid'>
        <div className='clip-inverted-triangle-simplified absolute inset-0 top-[100px] z-0 bg-primary-300' />
        <div className='section-container relative z-10'>
          <div className='flex flex-wrap justify-center gap-y-4'>
            {trainingCards.map((card, index) => {
              return (
                <div className='w-full px-2 md:w-1/2 lg:w-1/3' key={index}>
                  <TrainingCard {...card} />
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Instructor-led training */}
      <div className='bg-primary-300 py-12 text-primary-800 md:py-24'>
        <div className='section-container flex max-w-5xl items-center justify-between'>
          {/* Content column */}
          <div className='max-w-lg px-2'>
            <UserListSquare />
            <SuiTitle type='h2' className='my-6'>
              Free instructor-led training
            </SuiTitle>
            <p className='my-6'>
              Our live, online training events are a great way to get started on
              your path to becoming a subject matter expert in ClickHouse.
            </p>
            {[
              'Delivered by Rich Raposa, our head of training at ClickHouse',
              'Support engineers are on hand to help answer questions',
              'Hands-on labs',
              'Accelerate your career with ClickHouse Certification!',
              'We start at the beginning, then dive deep into ClickHouse'
            ].map((item, index) => {
              return (
                <div className='mt-2 flex items-start gap-2' key={index}>
                  <Certificate
                    style={{ width: '20px', height: 'auto' }}
                    className='mt-1 flex-shrink-0 flex-grow-0'
                  />
                  {item}
                </div>
              )
            })}
            <CUIButton
              type='primary-dark'
              size='lg'
              className='mt-6 !px-12'
              linkClass='inline-block'
              href='/company/events/clickhouse-fundamentals'>
              Register now
            </CUIButton>
          </div>

          {/* Image column */}
          <div className='-mb-24 hidden lg:block'>
            <Image
              src='/images/learn/instructor-led-training.png'
              alt='Instructor-led training'
              width={910}
              height={1272}
            />
          </div>
        </div>
      </div>

      {/* Certification */}
      <div className='bg-neutral-600 py-12 text-white md:py-24'>
        <div className='section-container relative'>
          {/* Badge */}
          <Image
            src='/images/learn/certified-developer-badge.png'
            alt={'ClickHouse Certified Developer'}
            width={417}
            height={363}
            className='pointer-events-none absolute -top-20 right-0 max-w-[130px] rotate-[15deg] md:-top-40 md:max-w-[210px]'
          />

          {/* Intro */}
          <div className='mx-auto max-w-2xl text-center'>
            <CertificateSquare className='inline-block' />
            <SuiTitle type='h2' className='my-6'>
              ClickHouse Certification
            </SuiTitle>
            <p className='my-6'>
              Become a recognized ClickHouse expert by validating your skills
              with our official ClickHouse Certification.
            </p>
            <CUIButton
              type='primary'
              className='mt-6 !px-8 shadow-lg'
              linkClass='inline-block'
              href='/learn/certification'>
              Check our certification page
            </CUIButton>
          </div>

          {/* Cards */}
          <div className='mt-12 flex flex-wrap justify-center gap-y-4'>
            {certificationCards.map((card, index) => {
              return (
                <div className='w-full px-2 md:w-1/2 xl:w-1/4' key={index}>
                  <CertificationCard {...card} />
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* On demand */}
      <div className='py-12 md:py-24'>
        <div className='section-container'>
          {/* Intro */}
          <div className='mx-auto max-w-2xl text-center'>
            <CertificateSquare className='inline-block text-primary-300' />
            <SuiTitle type='h2' className='my-6'>
              On-demand
            </SuiTitle>
            <p className='mt-6'>Check out some of our popular free courses.</p>
          </div>

          {/* Cards */}
          <div className='mt-12 flex flex-wrap justify-center gap-y-4'>
            {onDemandCards.map((card, index) => {
              return (
                <div key={index} className='w-full px-2 md:w-1/2 lg:w-1/3'>
                  <OnDemandCard {...card} />
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Events */}
      <div className='bg-white/10 py-12 md:py-24'>
        <div className='section-container'>
          <div className='mx-auto max-w-3xl text-center'>
            <VideoSquare className='inline-block text-primary-300' />
            <SuiTitle type='h2' className='my-6'>
              Upcoming live events
            </SuiTitle>
            <p className='my-6'>
              Join our community and attend our events to learn more about
              ClickHouse! Our team is always happy to support and answer any
              questions you may have about ClickHouse development. You can also
              access our list of older events hosted by us.
            </p>
            <CUIButton
              type='primary-dark'
              size='lg'
              linkClass='inline-block'
              className='!border-primary-800 md:!px-20'
              href='/company/events'>
              Check our calendar
            </CUIButton>
          </div>
        </div>
      </div>

      {/* Logo carousel */}
      <div className='relative bg-white/10'>
        <div className='clip-inverted-triangle-simplified absolute inset-0 z-0 bg-primary-300 md:-top-20' />
        <div className='section-container relative z-10 pb-6 pt-28 text-primary-800 md:pb-20 md:pt-24'>
          <SuiTitle type='h3' className='mb-6 text-center'>
            Trusted by the best developers that work with data{' '}
            <span className='tilted tilted-black'>
              <span className='tilted-content text-white'>at scale</span>
            </span>
          </SuiTitle>
          <div className='section-container relative z-10 flex max-w-5xl flex-wrap place-items-center items-center justify-center gap-6 self-center md:gap-x-14'>
            <div className='absolute left-0 z-10 h-full bg-homepageFadeLeftLogos p-10 lg:pr-20'></div>
            <div className='absolute right-0 z-10 h-full bg-homepageFadeRightLogos p-10 lg:pl-20'></div>
            <LogoCarousel
              logos={customerStories.logos.slice(
                0,
                Math.ceil(customerStories.logos.length / 2)
              )}
              speedClass1='animate-marqueeLeft'
              speedClass2='animate-marqueeLeft2'
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}
