import {
  SuiButton,
  SuiHorizontalDivide,
  SuiSpacer,
  SuiText,
  SuiTitle
} from '../../../components/sui'
import Image from 'next/image'
import Link from 'next/link'
import { Person } from '../../../components/person_area'

export default function OurStoryPage() {
  // @ts-ignore
  const Milestone = ({ year, description }) => {
    return (
      <div className='flex flex-col md:flex-row items-center'>
        <div className='flex md:w-2/12 lg:w-1/12'>
          <div className='h-16 w-16 bg-web-light-c2 dark:bg-web-dark-c2 rounded-full text-center items-center justify-center flex'>
            <SuiTitle size='sm'>
              <h5>{year}</h5>
            </SuiTitle>
          </div>
        </div>
        <div className='flex md:w-8/12 text-center md:text-left'>
          <SuiText size='lg'>
            <p>{description}</p>
          </SuiText>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className='bg-web-light-c1 dark:bg-dark_hero_background bg-cover pt-10'>
        <div className='flex container mx-auto flex-col px-6 2xl:px-0'>
          <div
            className='flex flex-col text-center mx-auto pt-6'
            data-aos='fade-up'>
            <SuiTitle size='web'>
              <h1>Our story</h1>
            </SuiTitle>
            <SuiSpacer size='sm' />
            <div className='max-w-xl'>
              <SuiText size='lg' color='dark' weight='normal'>
                <p>
                  Find out about our leadership, history, and the culture
                  we&lsquo;re building, a little at a time.
                </p>
              </SuiText>
            </div>
          </div>
          <div className='flex flex-col mx-auto py-8'>
            <Image
              src={`/our-story/world_map.svg`}
              alt='ClickHouse around the world'
              width='1088'
              height='488'
            />
            <div
              className='flex justify-center mt-8 md:space-x-32'
              data-aos='fade-up'>
              <div className='flex flex-col w-44'>
                <Image
                  src={`/our-story/us-flag.svg`}
                  alt='US flag'
                  width='32'
                  height='32'
                />
                <div className='flex text-center justify-center'>
                  <SuiText weight='semibold'>
                    <p>Americas HQ</p>
                    <span className='text-web-light-c4 dark:text-web-dark-c4 font-normal'>
                      Bay Area, California
                    </span>
                  </SuiText>
                </div>
              </div>
              <div className='flex flex-col w-44'>
                <Image
                  src={`/our-story/dutch-flag.svg`}
                  alt='Dutch flag'
                  width='32'
                  height='32'
                />
                <div className='flex text-center justify-center'>
                  <SuiText weight='semibold'>
                    <p>European HQ</p>
                    <span className='text-web-light-c4 dark:text-web-dark-c4 font-normal'>
                      Amsterdam, Netherlands
                    </span>
                  </SuiText>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-web-light-c2 dark:bg-web-dark-c2 w-full pt-16 pb-12'>
        <div className='flex flex-col md:flex-row container mx-auto max-w-7xl px-6 md:space-x-16 mb-12'>
          <div className='flex flex-col md:w-3/5'>
            <SuiTitle size='xl'>
              <h2>About us</h2>
            </SuiTitle>
            <div className='pt-2 max-w-4xl '>
              <SuiText size='lg' color='dark'>
                <p>
                  At ClickHouse, we understand that data grows in real time. We
                  believe in results at the speed of change.
                </p>
              </SuiText>
            </div>
            <div className='pt-2 max-w-5xl'>
              <SuiText size='lg'>
                <p>
                  We are the creators of the popular open-source column-oriented
                  DBMS (columnar database management system) for online
                  analytical processing (OLAP) which allows users to generate
                  analytical reports using SQL queries in real-time.
                </p>
              </SuiText>
              <SuiText size='lg'>
                <p>
                  ClickHouse works 100-1000x faster than traditional database
                  management systems, and processes hundreds of millions to over
                  a billion rows and tens of gigabytes of data per server per
                  second. With a widespread user base around the globe, our
                  technology has received praise for its reliability, ease of
                  use, and fault tolerance.
                </p>
              </SuiText>
            </div>
          </div>
          <div className='flex flex-col md:w-2/5 mt-6 md:mt-12'>
            <Image
              src={`/our-story/california-meetup.png`}
              alt='Bay area hub'
              width='500'
              height='283'
            />
          </div>
        </div>

        <div className='flex flex-col-reverse md:flex-row container mx-auto max-w-7xl px-6 md:space-x-16 mb-12'>
          <div className='flex flex-col md:w-2/5'>
            <div>
              <Image
                src={`/our-story/amsterdam-meetup.png`}
                alt='Amsterdam hub'
                width='500'
                height='283'
              />
            </div>
          </div>
          <div className='flex flex-col md:w-3/5 mb-6'>
            <SuiTitle size='lg'>
              <h2>Distributed and diverse by design</h2>
            </SuiTitle>
            <div className='pt-2 max-w-4xl '>
              <SuiText size='lg'>
                <p>
                  ClickHouse&lsquo;s global HQ is in the San Francisco Bay Area
                  with a European HQ in Amsterdam, The Netherlands. We are proud
                  to be the authors of an open-source project with contributors
                  from over the world.
                </p>
              </SuiText>
            </div>
            <div className='pt-2 max-w-5xl'>
              <SuiText size='lg'>
                <p>
                  We believe in the power of distributed organizations, so many
                  of our employees work from home in the United States, the
                  Netherlands, Serbia, Germany, Spain, Portugal, the United
                  Kingdom, France, Croatia, Israel, and Australia.
                </p>
              </SuiText>
              <SuiText size='lg'>
                <p>
                  Some take advantage of our Amsterdam office or choose to meet
                  up in local hubs and workspaces.
                </p>
              </SuiText>
              <SuiText size='lg'>
                <p>
                  We prioritize gathering together when global circumstances
                  allow so that we can plan and build together, have fun
                  together, and volunteer for the good of our community.
                </p>
              </SuiText>
              <SuiText size='lg'>
                <p>
                  ClickHouse understands that diverse and inclusive environments
                  are both an essential advantage and a moral imperative.
                  Approximately 40% of our leadership team consists of women,
                  and we are proud to have a diverse group of investors, board
                  members, and advisors.
                </p>
              </SuiText>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full pt-16 pb-24 bg-web-light-c1 dark:bg-web-dark-c1'>
        <div className='flex container mx-auto flex-col max-w-7xl px-6'>
          <SuiTitle size='xl'>
            <h2>Our history</h2>
          </SuiTitle>
          <SuiSpacer size='xl' />

          <div className='flex flex-col space-y-12'>
            <Milestone
              year='2022'
              description='ClickHouse&lsquo;s European offices open in Amsterdam. The
                  company launches an early access program for its
                  much-anticipated cloud service.'
            />
            <Milestone
              year='2021'
              description='ClickHouse, Inc. incorporates in Delaware, with our headquarters in the San Francisco Bay Area. The company receives an initial $50M investment from Index Ventures and Benchmark Capital in September. In October, a subsequent Series B funding round totals $250M and establishes a $2B valuation from Coatue Management, Altimeter Capital, Lightspeed, Redpoint, and other investors.'
            />
            <Milestone
              year='2016'
              description='ClickHouse releases as an open-source project under the Apache 2 license.'
            />
            <Milestone
              year='2012'
              description='After three years of development, ClickHouse launches to power the second-largest web analytics platform in the world.'
            />
            <Milestone
              year='2009'
              description='Alexey Milovidov and team start an experimental project determined to generate analytical reports in real-time from non-aggregated data which also grows in real-time.'
            />
          </div>
        </div>
      </div>

      <div className='bg-web-light-c2 dark:bg-web-dark-c2 w-full'>
        <div className='flex container mx-auto flex-col px-6 2xl:px-0'>
          <div className='flex flex-col text-center mx-auto pt-16'>
            <SuiTitle size='xl'>
              <h1>We&lsquo;re hiring! </h1>
            </SuiTitle>
            <SuiSpacer size='sm' />
            <div className='max-w-3xl'>
              <SuiText size='lg' color='dark' weight='normal'>
                <p>
                  If you are looking for a place to build something new, be an
                  agent of change, and have an opportunity to have a significant
                  impact on the company’s success, this is the place for you.
                </p>
              </SuiText>

              <div className='flex justify-center pt-6 pb-14'>
                <div>
                  <Link href='/company/careers/'>
                    <SuiButton title='Open positions' />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-web-light-c1 dark:bg-web-dark-c1 w-full pt-16 pb-24'>
        <div className='flex container mx-auto flex-col max-w-7xl px-6'>
          <SuiTitle size='lg'>
            <h2>Our founding team</h2>
          </SuiTitle>

          <SuiSpacer size='xl' />

          <div className='flex flex-col md:flex-row space-y-8 md:space-y-0 justify-evenly'>
            <Person
              avatar='yury.png'
              name='Yury Izrailevsky'
              job='Co-Founder &amp; President, Product and Engineering'
            />
            <Person
              avatar='aaron.png'
              name='Aaron Katz'
              job='Co-Founder &amp; CEO'
            />
            <Person
              avatar='alexey.png'
              name='Alexey Milovidov'
              job='Co-Founder &amp; CTO'
            />
          </div>
          <div className='w-96 pt-8 pb-12 self-center'>
            <SuiHorizontalDivide />
          </div>

          <SuiTitle size='lg'>
            <h2>Our investors</h2>
          </SuiTitle>

          <SuiSpacer size='xl' />

          <div className='flex justify-evenly'>
            <Person
              avatar='inv-mike.png'
              name='Mike Volpi'
              job='Board member'
              small
            />
            <Person
              avatar='inv-peter.png'
              name='Peter Fenton'
              job='Board member'
              small
            />
            <Person avatar='inv-caryn.png' name='Caryn Marooney' small />
            <Person avatar='inv-kevin.png' name='Kevin Wang' small />
          </div>

          <div className='flex justify-evenly pt-12'>
            <div>
              <Image
                src='/our-story/logo_index_ventures.svg'
                alt='investor'
                width='255'
                height='90'
              />
            </div>
            <div>
              <Image
                src='/our-story/logo_benchmark.svg'
                alt='investor'
                width='255'
                height='90'
              />
            </div>
            <div>
              <Image
                src='/our-story/logo_coatue.svg'
                alt='investor'
                width='255'
                height='90'
              />
            </div>
            <div>
              <Image
                src='/our-story/logo_altimeter.svg'
                alt='investor'
                width='255'
                height='90'
              />
            </div>
          </div>

          <div className='flex justify-evenly pt-6'>
            <div>
              <Image
                src='/our-story/logo_lightspeed.svg'
                alt='investor'
                width='255'
                height='90'
              />
            </div>
            <div>
              <Image
                src='/our-story/logo_redpoint.svg'
                alt='investor'
                width='255'
                height='90'
              />
            </div>
            <div>
              <Image
                src='/our-story/logo_almaz.svg'
                alt='investor'
                width='255'
                height='90'
              />
            </div>
            <div>
              <Image
                src='/our-story/logo_firstmark.svg'
                alt='investor'
                width='255'
                height='90'
              />
            </div>
          </div>

          <div className='flex justify-evenly pt-6'>
            <div>
              <Image
                src='/our-story/logo_leadedge.svg'
                alt='investor'
                width='255'
                height='90'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
