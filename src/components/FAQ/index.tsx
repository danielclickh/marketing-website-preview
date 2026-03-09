import { SuiTitle } from '../sui'
import Accordion from '@/components-cleaned/Accordion'
import { useGalaxyOnClick } from '@/lib/galaxy/galaxy'
import { ExternalLinkIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import Link from 'next/link'
import { CSSProperties } from 'react'

const style = {
  '--top-side': '224px'
} as CSSProperties

export default function FAQ() {
  return (
    <div
      className='bg-shadow-element relative mx-auto mb-20 max-w-7xl px-4 md:px-8 lg:flex lg:justify-between lg:gap-x-12 2xl:px-0'
      style={style}>
      <div className='mx-auto max-w-md pb-10 text-center lg:mx-0 lg:text-left'>
        <Image
          src='/faq-icon.svg'
          alt='FAQ Icon'
          width={72}
          height={72}
          className='mx-auto lg:mx-0'
        />
        <SuiTitle type='h2' className='my-6 lg:text-left'>
          FAQs
        </SuiTitle>
        <div className='text-neutral-200 lg:text-left'>
          Wherever you need us, we’re there. We love to engage in thoughtful
          conversation with the ClickHouse community and are always on-hand to
          answer your questions.{' '}
        </div>
        <Link
          href='/support/program/'
          target='_self'
          className='mt-6 inline-flex items-center justify-center gap-4 text-primary-300 hover:underline lg:justify-start'
          onClick={useGalaxyOnClick('homePage.faqSection.askAnythingSelect')}>
          Ask us anything <ExternalLinkIcon className='h-4 w-4' />
        </Link>
      </div>
      <Accordion
        className='mx-auto w-full max-w-2xl lg:mr-0'
        items={[
          {
            onOpen: useGalaxyOnClick('homePage.faqSection.whyClickhouseExpand'),
            handle: 'Why should I use ClickHouse vs. X database?',
            content: (
              <p>
                ClickHouse is faster than most traditional data warehouses and
                databases and is most often used when real-time queries on large
                datasets are necessary at an affordable cost. However,
                developers also often use ClickHouse on top of their CDWH or
                OLTP databases to act as a “speed layer” within their existing
                infrastructure.
              </p>
            )
          },
          {
            onOpen: useGalaxyOnClick('homePage.faqSection.olapOverviewExpand'),
            handle: 'What is OLAP?',
            content: (
              <p>
                OLAP stands for “online analytical processing” which contrasts
                from OLTP, or “online transaction processing.” As the name
                suggests, OLAP databases perform significantly better compared
                to OLTP databases for analytical workloads common with large
                datasets.
              </p>
            )
          },
          {
            onOpen: useGalaxyOnClick('homePage.faqSection.largeDataExpand'),
            handle: 'How does ClickHouse handle large amounts of data?',
            content: (
              <p>
                In order to easily process large amounts of data, ClickHouse
                uses highly optimized compression techniques and vectorized
                query execution to maximize CPU efficiency.
              </p>
            )
          },
          {
            onOpen: useGalaxyOnClick('homePage.faqSection.'),
            handle:
              'How does ClickHouse support data visualization and analysis?',
            content: (
              <p>
                ClickHouse supports connectors to many clients and drivers,
                including common BI and data analysis tools. Please see{' '}
                <Link
                  href='https://clickhouse.com/docs/en/integrations'
                  className='text-primary-300 hover:underline'>
                  this page
                </Link>{' '}
                for a complete list of supported integrations.
              </p>
            )
          },
          {
            onOpen: useGalaxyOnClick(
              'homePage.faqSection.clickhouseCostExpand'
            ),
            handle: 'How much does ClickHouse cost?',
            content: (
              <p>
                Self-managed ClickHouse is dependent on the cost of your compute
                and data storage resources, as well as headcount necessary to
                manage the ClickHouse deployment. For the most affordable way to
                run ClickHouse, use{' '}
                <Link
                  href='https://console.clickhouse.cloud/signUp?loc=homepage-faq-accordion'
                  className='text-primary-300 hover:underline'>
                  ClickHouse Cloud
                </Link>
                , which starts at $50/month.
              </p>
            )
          }
        ]}
      />
    </div>
  )
}
