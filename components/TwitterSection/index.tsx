import React from 'react'
import TwitterCard from '../ClickUI/Card/TwitterCard'
import Link from '../ClickUI/Link'
import { SuiTitle } from '../sui'
import avatar from '../../public/avatar.png'

const twitterList = [
  {
    name: 'Talan Dorwart',
    id: '@talan_d',
    src: avatar,
    content: (
      <>
        <Link href='https://clickhouse.cloud' className='text-primary'>
          ClickHouse Cloud
        </Link>{' '}
        has made it absolutely effortless to use ClickHouse for data analysis
        while not having to spend any time managing cluster shards/replicas or
        worrying about provisioning on the storage or cpu side.
      </>
    )
  },
  {
    name: 'Chao Wang',
    id: '@chao_chao',
    src: avatar,
    content: (
      <>
        At Instabug we rely on ClickHouse to help power our real-time
        observability solutions that developers rely on. ClickHouse Cloud will
        reduce our operational overhead and cost of managing ClickHouse
        ourselves allowing us to focus on our users.
      </>
    )
  },
  {
    name: 'Sudeep Kumar',
    id: '@sudeep_eee_doo',
    src: avatar,
    content: (
      <>
        eBay adopted ClickHouse for their real time OLAP events (Logs + Metrics)
        infrastructure. The simplified architecture with ClickHouse allowed them
        to reduce their DevOps activity and troubleshooting, reduced the overall
        infrastructure by 90%, and they saw a stronger integration with Grafana
        and ClickHouse for visualization and alerting.
      </>
    )
  },
  {
    name: 'Ava Smith',
    id: '@ava-1st-of-my-name',
    src: avatar,
    content: (
      <>
        Rokt has been an eager partner of ClickHouse as we modernize our
        analytics stack. By offloading operations to the experts our developers
        are focused on delivering the best experience possible while the
        business scales. We're thrilled to see the path ClickHouse is forging.
      </>
    )
  },
  {
    name: 'James Savage',
    id: '@savage_bird',
    src: avatar,
    content: (
      <>
        Airtory needed a fast, scalable and affordable data engine to power our
        dynamic creatives, and ClickHouse was the perfect solution for this. The
        ease of the ClickHouse Cloud helped us ramp up quickly and offer
        powerful insights for our clients into their marketing campaigns giving
        them a great ROI.
      </>
    )
  },
  {
    name: 'Sebastian Wagner',
    id: '@waaaagner',
    src: avatar,
    content: (
      <>
        Darwinium chose Clickhouse as its database engine of choice because it
        is fast, flexible, rich in capabilities and cloud-ready. It provides the
        functionality we need to support real time user journey orchestration
        for fraud and security teams in global digital businesses.
      </>
    )
  },
  {
    name: 'Priyanka Akhtar',
    id: '@priya-i-see-ya',
    src: avatar,
    content: (
      <>
        Being able to analyze logs in near-real time proves very effective for
        debugging online systems and identifying interesting patterns to improve
        product quality. Based on the user experience so far, we believe this is
        an effective platform to fulfill the extensive log analytic needs at
        Uber. And ClickHouse is indeed a very powerful analytics engine, which
        we’d like to keep exploring.
      </>
    )
  },
  {
    name: 'Tatiana Curtis',
    id: '@tanya_c',
    src: avatar,
    content: (
      <>
        Amazing to have been one of the first users of{' '}
        <Link href='https://clickhouse.cloud' className='text-primary'>
          ClickHouse Serverless Cloud.
        </Link>{' '}
        It's scalable and blazingly fast ClickHouse in the cloud with simple
        onboarding and excellent support. Great experience.
      </>
    )
  }
]

function TwitterSection() {
  return (
    <div className='flex flex-col items-center py-16 px-8'>
      <SuiTitle type='h2'>
        Join the{' '}
        <span className='tilted tilted-yellow'>
          <span className='tilted-content'>100k+</span>
        </span>{' '}
        developers using ClickHouse today
      </SuiTitle>
      <div className='flex gap-6 my-16'>
        <div className='w-16 h-16 bg-noised rounded'></div>
        <div className='w-16 h-16 bg-noised rounded'></div>
        <div className='w-16 h-16 bg-noised rounded'></div>
        <div className='w-16 h-16 bg-noised rounded'></div>
      </div>
      <div className='max-w-7xl mx-auto columns-1 sm:columns-2 md:columns-3 lg:columns-4 space-y-8 gap-x-6'>
        {twitterList.map((twitter) => (
          <TwitterCard
            name={twitter.name}
            twitterId={twitter.id}
            src={twitter.src}
            className='break-inside-avoid'
            key={twitter.id}>
            {twitter.content}
          </TwitterCard>
        ))}
      </div>
    </div>
  )
}

export default TwitterSection
