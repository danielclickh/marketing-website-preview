import {
  SuiButton,
  SuiPanel,
  SuiSpacer,
  SuiText,
  SuiTitle
} from '../../../components/sui'

import Image from 'next/image'
import { LogoMeetup } from '../../../components/icons/logo_meetup'
import { ArrowRightIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { IconLocation } from '../../../components/icons/icon_location'

export default function News() {
  // @ts-ignore
  const Webinar = ({ version, date }) => {
    return (
      <div className='flex flex-col'>
        <Image
          src={`/news/webinar.png`}
          alt='Release webinar'
          width='328'
          height='214'
          className='cursor-pointer'
        />

        <div className='flex flex-col px-4'>
          <SuiTitle size='xxs' color='primary' dark_color='primary'>
            <h4>Webinar</h4>
          </SuiTitle>
          <SuiSpacer size='xs' />
          <SuiTitle>
            <h3>v{version} Release webinar</h3>
          </SuiTitle>
          <SuiText color='dark' padding_0>
            <p>{date} at 9:00 PST</p>
          </SuiText>
        </div>
      </div>
    )
  }

  // @ts-ignore
  const NewsItem = ({ source, date, title, abstract }) => {
    return (
      <div className='flex flex-col py-4'>
        <SuiTitle size='xxs' color='dark'>
          <h4>
            {source} • {date}
          </h4>
        </SuiTitle>
        <SuiSpacer size='xs' />
        <SuiTitle>
          <h3>{title}</h3>
        </SuiTitle>
        <SuiSpacer size='sm' />
        <SuiText color='dark' padding_0>
          <p>{abstract}</p>
        </SuiText>
        <Link href='#'>
          <div className='flex items-center cursor-pointer'>
            <SuiText
              weight='medium'
              color='primary'
              className='hover:underline'>
              Read more
            </SuiText>
            <ArrowRightIcon className='ml-2 w-4 text-web-light-c6' />
          </div>
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className='bg-web-light-c1 dark:bg-web-dark-c1 bg-cover pt-10'>
        <div className='flex container mx-auto flex-col px-6 2xl:px-0'>
          <div
            className='flex flex-col text-center mx-auto pt-6'
            data-aos='fade-up'>
            <SuiTitle size='web'>
              <h1>News and events</h1>
            </SuiTitle>
            <SuiSpacer size='sm' />
            <div className='max-w-2xl'>
              <SuiText size='lg' color='dark' weight='normal'>
                <p>
                  Get all of the latest ClickHouse news, on-demand webinars, and
                  press releases.
                </p>
              </SuiText>
            </div>
          </div>

          <div className='flex max-w-5xl mx-auto'>
            <SuiPanel
              color='bg-web-light-c2 dark:bg-web-dark-c2'
              shadow
              padding='lg'
              className='my-8'>
              <div className='flex flex-col md:flex-row'>
                <div className='flex flex-col md:w-3/5'>
                  <SuiTitle size='xxs' color='primary' dark_color='primary'>
                    <h4>Upcoming event • Amsterdam</h4>
                  </SuiTitle>
                  <SuiSpacer size='sm' />

                  <SuiTitle>
                    <h3>Meet the ClickHouse Team</h3>
                  </SuiTitle>

                  <SuiText color='dark'>
                    <p>
                      Wed, June 8, 2022 - A significant portion of the
                      ClickHouse team will be in Amsterdam. So we decided to
                      take the opportunity to get together, talk tech, and share
                      some food.
                    </p>
                  </SuiText>
                  <div className='flex'>
                    <SuiButton
                      iconRight
                      path='/clickhouse/'
                      color='empty'
                      textColor='darkest'
                      title='View more details'
                      size='md'
                    />
                  </div>
                </div>
                <div className='flex md:w-2/5 pt-8 md:pt-0 justify-center items-center md:px-20'>
                  <LogoMeetup />
                </div>
              </div>
            </SuiPanel>
          </div>
        </div>
      </div>
      <div className='flex w-full bg-web-light-c1 dark:bg-web-dark-c1 pb-8'>
        <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pt-12 pb-8 px-8 2xl:px-0'>
          <div className='flex justify-between pb-4'>
            <SuiTitle size='lg'>
              <h4>Recent events</h4>
            </SuiTitle>

            <div className='flex'>
              <Link href='/blog/'>
                <div className='flex items-center cursor-pointer hover:underline'>
                  <SuiText weight='medium'>All events</SuiText>
                  <ArrowRightIcon className='ml-2 w-4' />
                </div>
              </Link>
            </div>
          </div>
          <div className='flex flex-col md:flex-row md:space-x-16 space-y-6 md:space-y-0'>
            <Webinar version='22.5' date='May 19, 2022' />
            <Webinar version='22.4' date='April 21, 2022' />
            <Webinar version='22.3' date='Mar 17, 2022' />
          </div>
        </div>
      </div>

      <div className='flex w-full bg-web-light-c2 dark:bg-web-dark-c2 pb-8'>
        <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pt-12 pb-8 px-8 2xl:px-0'>
          <div className='flex flex-col md:flex-row justify-between pb-4 space-x-24'>
            <div className='flex flex-col md:w-1/2'>
              <SuiTitle size='lg'>
                <h4>Latest news</h4>
              </SuiTitle>
              <SuiSpacer />

              <NewsItem
                source='Bloomberg'
                date='Oct 28, 2021'
                title='ClickHouse Valued at $2B after Yandex Spinout'
                abstract='Online analytics startup ClickHouse Inc. has raised $250 million in new funding at a $2 billion valuation. The database management business, which was started...'
              />
              <NewsItem
                source='Business Wire'
                date='Oct 28, 2021'
                title='ClickHouse Raises $250M Series B To Scale Groundbreaking OLAP Database Management System Globally'
                abstract='ClickHouse, Inc., creators of the online analytical processing (OLAP) database management system, announced today that it has raised $250 million in Seri...'
              />
              <NewsItem
                source='Business Wire'
                date='Oct 28, 2021'
                title='ClickHouse, Inc. Announces Incorporation, Along With $50M In Series A Funding'
                abstract='Creators of the online analytical processing (OLAP) database management system ClickHouse have announced their decision to officially incorporate as a comp...'
              />
            </div>
            <div className='flex flex-col md:w-1/2'>
              <SuiTitle size='lg'>
                <h4>Upcoming events</h4>
              </SuiTitle>
              <SuiSpacer />

              <div className='flex space-x-4 pt-4'>
                <div className='flex w-44 items-top justify-start'>
                  <div>
                    <Image
                      src={`/news/logo_meetup_square.png`}
                      alt='Meetup'
                      width='128'
                      height='128'
                      className='cursor-pointer'
                    />
                  </div>
                </div>
                <div className='flex flex-col'>
                  <SuiTitle>
                    <h3>Meet the ClickHouse team</h3>
                  </SuiTitle>
                  <SuiSpacer size='sm' />
                  <SuiText color='dark' padding_0>
                    <p>
                      A significant portion of the ClickHouse team will be in
                      Amsterdam. So we decided to take the opportunity to get
                      together, talk tech, and share some food.
                    </p>
                  </SuiText>
                  <div className='flex items-center space-x-2'>
                    <IconLocation />
                    <div>
                      <SuiText color='dark'>
                        <p>Amsterdam, Netherlands • Wed June 8, 2022</p>
                      </SuiText>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex w-full bg-web-light-c1 dark:bg-web-dark-c1 pb-8'>
        <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pt-12 pb-8 px-8 2xl:px-0'>
          <SuiTitle size='lg'>
            <h4>Press</h4>
          </SuiTitle>
          <SuiSpacer />
          <div className='flex flex-col md:flex-row justify-between pb-4 md:space-x-24'>
            <div className='flex flex-col md:w-1/2'>
              <NewsItem
                source='Business Wire'
                date='Oct 28, 2021'
                title='ClickHouse Raises $250M Series B To Scale Groundbreaking OLAP Database Management System Globally'
                abstract='ClickHouse, Inc., creators of the online analytical processing (OLAP) database management system, announced today that it has raised $250 million in Seri...'
              />
              <NewsItem
                source='Bloomberg'
                date='Oct 28, 2021'
                title='Bloomberg Exclusive'
                abstract='ClickHouse Valued at $2 Billion in Round After Yandex Spinout.'
              />
              <NewsItem
                source='Medium'
                date='Oct 28, 2021'
                title='Lightspeed Perspective'
                abstract='Why Lightspeed invested in ClickHouse: a database built for speed.'
              />
              <NewsItem
                source='Business Wire'
                date='Oct 28, 2021'
                title='ClickHouse, Inc. Announces Incorporation, Along With $50M In Series A Funding'
                abstract='Creators of the online analytical processing (OLAP) database management system ClickHouse have announced their decision to officially incorporate as a comp...'
              />
            </div>
            <div className='flex flex-col md:w-1/2'>
              <NewsItem
                source='Bloomberg'
                date='Oct 28, 2021'
                title='ClickHouse Valued at $2B after Yandex Spinout'
                abstract='Online analytics startup ClickHouse Inc. has raised $250 million in new funding at a $2 billion valuation. The database management business, which was started...'
              />
              <NewsItem
                source='Business Wire'
                date='Oct 28, 2021'
                title='ClickHouse Raises $250M Series B To Scale Groundbreaking OLAP Database Management System Globally'
                abstract='ClickHouse, Inc., creators of the online analytical processing (OLAP) database management system, announced today that it has raised $250 million in Seri...'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
