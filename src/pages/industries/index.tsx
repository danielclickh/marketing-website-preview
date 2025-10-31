import { CUIButton, CUICard } from '@/components/ClickUI'
import Layout from '@/components/Layout'
import { SuiText, SuiTitle } from '@/components/sui'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { GetStaticProps } from 'next'
import Image, { ImageProps } from 'next/image'
import { LinkProps } from 'next/link'
import React from 'react'

export const getStaticProps: GetStaticProps<CommonProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()

    return {
      props: {
        seo: {
          path: '/industries',
          title: '',
          description: '',
          keywords: ''
        },
        ...commonProps
      }
    }
  }

export default function IndustriesPage({
  seo,
  headerData,
  footerData
}: CommonProps) {
  useGalaxyOnPage('industriesPage')
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      {/* Hero */}
      <section className='bg-grid py-16 lg:py-24'>
        <div className='section-container flex flex-col items-center gap-16 lg:flex-row'>
          <div className='space-y-4 text-center lg:mx-auto lg:w-2/3 lg:text-center'>
            <SuiTitle type='h1'>
              Built for real-time analytics. Trusted across industries.
            </SuiTitle>
            <SuiText size='lg' className='text-neutral-200'>
              ClickHouse powers real-time analytics and applications where speed
              matters most, from gaming to energy, cybersecurity to retail. Find
              out how companies use ClickHouse to deliver instant insights,
              reduce costs, and move faster than ever.
            </SuiText>
            <div className='!my-8 flex flex-wrap justify-center gap-4'>
              <CUIButton
                href='https://console.clickhouse.cloud/signUp?loc=industries-hero'
                type='primary'
                size='lg'
                className='!px-8'>
                Start your free Cloud trial
              </CUIButton>
            </div>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className='relative bg-grid'>
        <div className='clip-inverted-triangle-simplified absolute bottom-0 left-0 right-0 top-20 bg-primary-300' />
        <div className='relative z-10'>
          <div className='section-container pb-16 lg:pb-24'>
            <CUICard className='!bg-neutral-900'>
              <CUICard.Body className='grid grid-cols-1 rounded-lg lg:grid-cols-2'>
                <IndustryCell
                  position='top-left'
                  link='/industries/cybersecurity'
                  title='Cybersecurity'
                  description='Learn how ClickHouse empowers real-time threat detection and security analytics'
                  quote='I knew a managed product built by engineers, whose goal in life is to transform bits from Postgres into ClickHouse, would be better than anything we could do ourselves.'
                />
                <IndustryCell
                  position='top-right'
                  link='/industries/energy'
                  title='Energy'
                  description='Discover how ClickHouse optimizes energy management and smart grid operations'
                  quote='Our primary business requirement for any database/store was that we own and control the data we store -- no vendor lock-in and no walled gardens. Going with ClickHouse Cloud on AWS was an easy decision because it allows us to focus on our primary work without having to worry about maintenance, upgrades, backups, and so on.'
                />
                <IndustryCell
                  position='middle-left'
                  link='/industries/gaming'
                  title='Gaming and entertainment'
                  description='Explore how ClickHouse enhances player experiences and game analytics'
                  quote='The main benefit is saving employee time, which can now be spent on more exciting and strategic tasks. One of our administrators has about 60% of their time freed up, and our ETL engineer now saves 40% of their time.'
                />
                <IndustryCell
                  position='middle-right'
                  link='/industries/retail'
                  title='E-commerce and retail'
                  description='See how ClickHouse drives real-time inventory, sales, and customer insights'
                  quote='ClickHouse enables the business users to make smart business decisions based on huge volume of data in a matter of seconds'
                />
                <IndustryCell
                  position='bottom-left'
                  link='/industries/automotive'
                  title='Automotive'
                  description='Learn how ClickHouse powers connected car data and autonomous driving insights'
                  quote='Data in ClickHouse is better than data anywhere else. No other system lets you slice and dice your data, ask interesting questions, and get answers in an acceptable amount of time.'
                />
                <Cell position='bottom-right'>
                  <SuiTitle type='h3'>And more!</SuiTitle>
                  <SuiText size='sm' className='text-neutral-200'>
                    <p>
                      Powering analytics, ML, GenAI, warehousing, and
                      observability.
                    </p>
                  </SuiText>
                </Cell>
              </CUICard.Body>
            </CUICard>
          </div>
        </div>
      </section>
    </Layout>
  )
}

type CellPositions =
  | 'top-left'
  | 'top-right'
  | 'middle-left'
  | 'middle-right'
  | 'bottom-left'
  | 'bottom-right'

function Cell({
  position,
  children,
  className = ''
}: {
  position: CellPositions
  children: React.ReactNode
  className?: string
}) {
  const borderClasses: Record<CellPositions, string> = {
    'top-left': 'border-b lg:border-r',
    'top-right': 'border-b',
    'middle-left': 'border-b lg:border-r',
    'middle-right': 'border-b',
    'bottom-left': 'border-b lg:border-b-0 lg:border-r',
    'bottom-right': ''
  }
  return (
    <div
      className={`border-b border-r border-neutral-700/80 p-6 ${borderClasses[position]} ${className}`}>
      {children}
    </div>
  )
}

function IndustryCell({
  icon,
  title,
  description,
  quote,
  quoteLogo,
  link,
  position
}: {
  icon?: ImageProps['src']
  title: string
  description: string
  quote: string
  quoteLogo?: ImageProps['src']
  link: LinkProps['href']
  position: CellPositions
}) {
  return (
    <Cell position={position} className='relative flex flex-col gap-4'>
      <div className='flex items-center'>
        <SuiTitle type='h3'>{title}</SuiTitle>
        <CUIButton type='secondary' size='sm' linkClass='ml-auto' href={link}>
          <span className='absolute inset-0' />
          Learn more -&gt;
        </CUIButton>
      </div>
      <SuiText size='sm' className='text-neutral-200'>
        <p>{description}</p>
      </SuiText>
      <blockquote className='flex-1 rounded bg-neutral-750 p-4'>
        <Image
          src='/images/Quote.svg'
          width={37}
          height={28}
          alt='Quote'
          className='mb-4'
        />
        <SuiText size='sm' className='text-neutral-200'>
          <p className='italic'>{quote}</p>
        </SuiText>
      </blockquote>
    </Cell>
  )
}
