import { BaseLayout } from '../components/layout'
import Image from 'next/image'
import Link from 'next/link'

import {
  ArrowCircleRightIcon,
  CheckCircleIcon,
  StarIcon
} from '@heroicons/react/solid'

import {
  SuiAlternateCard,
  SuiButton,
  SuiCode,
  SuiCodeblock,
  SuiLink,
  SuiSpacer,
  SuiTabs,
  SuiText,
  SuiTitle
} from '../components/sui'
import { GetStarted } from '../components/get_started_area'

const Home = () => {
  return (
    <>
      <BaseLayout title='ClickHouse Database Management Systems'>
        <div className='flex text-center container mx-auto flex-col max-w-7xl bg-grid_background md:bg-no-repeat bg-opacity-10'>
          <div className='w-8/12 mx-auto md:mt-16 flex-col'>
            <SuiTitle size='max'>
              <h1>
                Your database, now{' '}
                <span className='text-transparent bg-clip-text bg-gradient-to-b from-gradientTop to-gradientBottom'>
                  1000x
                </span>{' '}
                faster.
              </h1>
            </SuiTitle>
            <div className='mt-6'>
              <SuiText size='lg' weight='semibold'>
                <p>
                  ClickHouse’s performance exceeds all other column-oriented
                  database management systems. It processes billions of rows and
                  tens of gigabytes of data per server per second. ⚡
                </p>
              </SuiText>
            </div>
            <div className='flex mt-6 justify-center'>
              <div className='w-48'>
                <SuiButton size='lg' title='Get started' />
              </div>
            </div>
          </div>
          <div className='flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-20 pt-20 container w-11/12 mx-auto z-10 max-w-7xl'>
            <SuiAlternateCard
              title='Wildly popular open source technology'
              description='With over 22,500 stars on Github, this is one of the most popular OLAP management systems around.'
              hasBorder
              hasShadow
              color='bg-light-grey1 dark:bg-dark-grey3'
              icon={
                <Image
                  src='/homepage/github_icon.svg'
                  alt='Github logo'
                  width='40'
                  height='40'></Image>
              }
            />
            <SuiAlternateCard
              title='Supercharged real time analytical data'
              description='With blazing fast speeds, ClickHouse is the premier linearly scalable, hardware efficient database management system. '
              hasBorder
              hasShadow
              color='bg-light-grey1 dark:bg-dark-grey3'
              icon={
                <Image
                  src='/homepage/charts_icon.svg'
                  alt='Charts logo'
                  width='40'
                  height='40'></Image>
              }
            />
            <SuiAlternateCard
              title='Deploy in the Cloud in minutes'
              description='Choose between AWS, Google Cloud, or Azure. Have a serverless ClickHouse running in no time. '
              hasBorder
              hasShadow
              color='bg-light-grey1 dark:bg-dark-grey3'
              icon={
                <Image
                  src='/homepage/cloud_icon.svg'
                  alt='cloud logo'
                  width='65'
                  height='45'></Image>
              }
            />
          </div>
        </div>

        <div className='flex bg-light-purple2 -mt-32'>
          <div className='flex-col flex w-full'>
            <div className='flex container mx-auto pt-48 justify-evenly items-center max-w-7xl'>
              <Image
                src='/homepage/company_ebay.svg'
                alt='Ebay logo'
                width='180'
                height='72'
              />
              <Image
                src='/homepage/company_cloudflare.svg'
                alt='CloudFlare logo'
                width='180'
                height='90'
              />
              <Image
                src='/homepage/company_deutschebank.svg'
                alt='Deutsche logo'
                width='274'
                height='52'
              />
              <Image
                src='/homepage/company_spotify.svg'
                alt='Spotify logo'
                width='180'
                height='54'
              />
              <Image
                src='/homepage/company_uber.svg'
                alt='Uber logo'
                width='180'
                height='63'
              />
            </div>
            <div className='w-64 self-center mt-12 mb-12'>
              <SuiButton
                path='/customer-stories/'
                iconRight
                title='Read customer stories'
                color='dark_alt'
                borderColor='border-light-grey5 border-opacity-25'
              />
            </div>
          </div>
        </div>
        <div className='flex bg-light-purple1'>
          <div className='w-full bg-stars_background bg-right bg-no-repeat container mx-auto py-16 max-w-7xl'>
            <div className='md:w-8/12 px-6 md:px-0'>
              <div className='md:w-7/12 pb-4'>
                <SuiTitle size='xxs' uppercase color='primary'>
                  <h4>Why ClickHouse</h4>
                </SuiTitle>
                <SuiSpacer size='sm' />
                <SuiTitle size='xl' color='lightest'>
                  <h3>The fastest OLAP database on Earth.</h3>
                </SuiTitle>
              </div>
              <div className='w-9/12 pb-8'>
                <SuiText size='lg' color='lightest'>
                  <p>
                    ClickHouse is an open source column-orientated database
                    management system capable of real time generation of
                    analytical data reports using SQL queries.{' '}
                  </p>
                </SuiText>
              </div>

              <ul>
                <div className='flex flex-col md:flex-row md:pb-4'>
                  <li className='flex space-x-2 md:w-6/12'>
                    <CheckCircleIcon className='w-6 text-primary' />
                    <SuiText color='lightest'>
                      <p>Industry leading query performance</p>
                    </SuiText>
                  </li>
                  <li className='flex space-x-2'>
                    <CheckCircleIcon className='w-6 text-primary' />
                    <SuiText color='lightest'>
                      <p>Significant reduction in storage requirements</p>
                    </SuiText>
                  </li>
                </div>
                <div className='flex flex-col md:flex-row'>
                  <li className='flex space-x-2 md:w-6/12'>
                    <CheckCircleIcon className='w-6 text-primary' />
                    <SuiText color='lightest'>
                      <p>Enterprise grade security features</p>
                    </SuiText>
                  </li>
                  <li className='flex space-x-2'>
                    <CheckCircleIcon className='w-6 text-primary' />
                    <SuiText color='lightest'>
                      <p>
                        Battle tested in production, linear horizontal
                        scalability
                      </p>
                    </SuiText>
                  </li>
                </div>
              </ul>
              <div className='w-64 self-center mt-12 mb-2'>
                <button className='font-medium text-sm text-center w-full rounded-lg duration-300 bg-primary border border-opacity-25 border-light-grey1 py-3 text-text-darkest'>
                  <div className='flex justify-center'>
                    <span className='flex justify-center pr-2 opacity-80'>
                      Read more about ClickHouse
                    </span>
                    <ArrowCircleRightIcon className='w-4' />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='flex container mx-auto max-w-7xl from-greyGradientLeft w-full bg-cube_background bg-no-repeat bg-opacity-20 bg-minus_left'>
          <div className='container mx-auto justify-end flex'>
            <div className='flex md:w-7/12 py-12 px-6 md:px-0 flex-col'>
              <SuiTitle size='xl' color='darkest'>
                <h3>What the experts say...</h3>
              </SuiTitle>
              <SuiSpacer size='sm' />
              <SuiText weight='medium' size='lg'>
                <p>
                  ClickHouse works{' '}
                  <span className='text-transparent bg-clip-text bg-gradient-to-b from-gradientTop to-gradientBottom'>
                    100-1000x faster
                  </span>{' '}
                  than traditional approaches, exceeding comparable
                  column-oriented database management systems that are available
                  on the market.
                </p>
              </SuiText>
              <SuiSpacer size='md' />
              <SuiTitle size='sm'>
                <h4>Independent benchmarks</h4>
              </SuiTitle>
              <ul className='pt-2'>
                <li className='flex space-x-2'>
                  <StarIcon className='w-6 text-primary' />
                  <SuiText color='darkest' weight='medium'>
                    <p>
                      ClickHouse vs TimescaleDB
                      <span className='text-text-dark pl-4'>GitLab</span>
                    </p>
                  </SuiText>
                </li>

                <li className='flex space-x-2'>
                  <StarIcon className='w-6 text-primary' />
                  <SuiText color='darkest' weight='medium'>
                    <p>
                      1.1 Billion Taxi Rides: 108-core ClickHouse Cluster
                      <span className='text-text-dark pl-4'>
                        Mark Litwintschik
                      </span>
                    </p>
                  </SuiText>
                </li>
                <li className='flex space-x-2'>
                  <StarIcon className='w-6 text-primary' />
                  <SuiText color='darkest' weight='medium'>
                    <p>
                      ClickHouse, Redshift and 2.5 Billion Rows of Time Series
                      Data
                      <span className='text-text-dark pl-4'>
                        Brandon Harris
                      </span>
                    </p>
                  </SuiText>
                </li>
                <li className='flex space-x-2'>
                  <StarIcon className='w-6 text-primary' />
                  <SuiText color='darkest' weight='medium'>
                    <p>
                      ClickHouse vs MariaDB ColumnStore
                      <span className='text-text-dark pl-4'>Percona</span>
                    </p>
                  </SuiText>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <GetStarted />
      </BaseLayout>
    </>
  )
}

export default Home
