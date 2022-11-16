import { BaseLayout } from '../components/layout'
import Image from 'next/image'

import {
  SuiButton,
  SuiLink,
  SuiPanel,
  SuiSpacer,
  SuiText,
  SuiTitle
} from '../components/sui'
import { GetStarted } from '../components/get_started_area'
import { FeatureItem } from '../components/feature_item'
import { CompanyCard } from '../components/company_card'
import { IconFast } from '../components/icons/icon_fast'
import { IconLinear } from '../components/icons/icon_linear'
import { IconEfficient } from '../components/icons/icon_efficient'
import { IconReliable } from '../components/icons/icon_reliable'
import { IconRich } from '../components/icons/icon_rich'
import { IconTolerant } from '../components/icons/icon_tolerant'
import { IconMoustache } from '../components/icons/icon_moustache'
import { LogoEbay } from '../components/icons/logo_ebay'
import { LogoUber } from '../components/icons/logo_uber'
import { LogoSpotify } from '../components/icons/logo_spotify'
import { LogoCloudflare } from '../components/icons/logo_cloudflare'
import { LogoDeutche } from '../components/icons/logo_deutche_bank'
import { IconGraduation } from '../components/icons/icon_graduation'

const Home = () => {
  return (
    <>
      <BaseLayout title='ClickHouse Database Management Systems'>
        <div className='bg-hero_background dark:bg-dark_hero_background bg-cover pt-10'>
          <div className='md:bg-no-repeat bg-mountain_background dark:bg-dark_mountain_background bg-right bg-opacity-100'>
            <div className='flex container mx-auto flex-col max-w-7xl pb-60 px-8 2xl:px-0'>
              <div data-aos='fade-up' className='flex'>
                <div className='mx-auto md:mt-8 flex-col text-center'>
                  <SuiTitle size='max' color='darkest'>
                    <h1>
                      Your database, now <br />
                      <span className='text-transparent bg-clip-text bg-gradient-to-b from-gradientTop to-gradientBottom'>
                        1000x
                      </span>{' '}
                      faster.
                    </h1>
                  </SuiTitle>

                  <div className='mt-6 max-w-3xl flex flex-col justify-center self-center'>
                    <SuiText size='lg' color='dark' weight='normal'>
                      <p>
                        The performance of ClickHouse exceeds all other
                        column-oriented database management systems. It
                        processes billions of rows and tens of gigabytes of data
                        per server per second.
                      </p>
                    </SuiText>

                    <div className='flex mt-6 justify-center md:justify-start space-x-4'>
                      <div className='flex self-center mx-auto'>
                        <div className='w-36'>
                          <SuiButton
                            size='md'
                            path='/clickhouse/'
                            title='Learn more'
                          />
                        </div>
                        <div className='w-36'>
                          <SuiButton
                            path='https://clickhouse.com/docs'
                            size='md'
                            color='empty'
                            textColor='dark'
                            title='View the docs'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full flex flex-col bg-web-light-c3 dark:bg-web-dark-c3'>
          <div className='flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-8 lg:space-x-20 -mt-32 container mx-auto justify-evenly max-w-7xl px-8 2xl:px-0'>
            <SuiPanel
              className='md:w-80 hover:bg-light-grey2 duration-300 ease-in-out hover:shadow-xl'
              color='bg-web-light-c2 dark:bg-web-dark-c2'
              shadow
              border
              padding='lg'>
              <div className='flex flex-col text-center'>
                <SuiTitle size='md'>
                  <h3>Wildly popular open source technology</h3>
                </SuiTitle>
                <div className='bg-primary h-1 w-16 rounded-md flex mx-auto my-4' />
                <SuiText>
                  <p>
                    With over 23,500 stars on Github, ClickHouse is a leader
                    among the most popular open source database systems around.{' '}
                  </p>
                </SuiText>
                <SuiSpacer />
                <div>
                  <SuiButton
                    iconRight
                    path='/clickhouse/'
                    color='empty'
                    title='Learn more'
                    size='md'
                  />
                </div>
              </div>
            </SuiPanel>
            <SuiPanel
              className='md:w-80 hover:bg-light-grey2 duration-300 ease-in-out hover:shadow-xl'
              color='bg-web-light-c2 dark:bg-web-dark-c2'
              shadow
              border
              padding='lg'>
              <div className='flex flex-col text-center'>
                <SuiTitle size='md'>
                  <h3>Supercharged real time analytical data</h3>
                </SuiTitle>
                <div className='bg-primary h-1 w-16 rounded-md flex mx-auto my-4' />
                <SuiText>
                  <p>
                    Boost your applications with real time analytical data that
                    is universally recognized as the fastest in the industry.
                  </p>
                </SuiText>
                <SuiSpacer />
                <div>
                  <SuiButton
                    iconRight
                    path='/clickhouse/'
                    color='empty'
                    title='Learn more'
                    size='md'
                  />
                </div>
              </div>
            </SuiPanel>
            <SuiPanel
              className='md:w-80 hover:bg-light-grey2 duration-300 ease-in-out hover:shadow-xl'
              color='bg-web-light-c2 dark:bg-web-dark-c2'
              shadow
              border
              padding='lg'>
              <div className='flex flex-col text-center'>
                <SuiTitle size='md'>
                  <h3>
                    ClickHouse Cloud is
                    <br /> coming soon
                  </h3>
                </SuiTitle>
                <div className='bg-primary h-1 w-16 rounded-md flex mx-auto my-4' />
                <SuiText>
                  <p>
                    Fast, stable, and secure, introducing ClickHouse Cloud,
                    built by the creators and maintainers of the fastest OLAP
                    database on earth.
                  </p>
                </SuiText>
                <SuiSpacer />
                <div>
                  <SuiButton
                    iconRight
                    path='/clickhouse-cloud/'
                    color='empty'
                    title='Learn more'
                    size='md'
                  />
                </div>
              </div>
            </SuiPanel>
          </div>
          <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat pb-8 px-8 2xl:px-0 pt-16'>
            <SuiTitle size='sm' color='primary' dark_color='primary'>
              Features
            </SuiTitle>

            <SuiSpacer size='lg' />
            <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row'>
              <FeatureItem
                icon={<IconFast />}
                title='Blazing fast'
                description='Exceeds all other column-oriented database management systems'
                delay={100}
                invert
              />

              <FeatureItem
                icon={<IconLinear />}
                title='Linearly scalable'
                description='Incredible scaling both horizontally and vertically'
                delay={200}
                invert
              />

              <FeatureItem
                icon={<IconTolerant />}
                title='Fault tolerant'
                description='Supports async replication and can be deployed across multiple datacenters'
                delay={300}
                invert
              />
            </div>

            <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row pt-4 md:pt-16'>
              <FeatureItem
                icon={<IconEfficient />}
                title='Hardware efficient'
                description='Processes analytical queries faster than traditional row-oriented systems'
                delay={400}
                invert
              />

              <FeatureItem
                icon={<IconReliable />}
                title='Highly reliable'
                description='Purely distributed system, including enterprise-grade security'
                delay={500}
                invert
              />

              <FeatureItem
                icon={<IconRich />}
                title='Feature rich'
                description='User-friendly SQL query dialect, built-in analytics capabilities, and more'
                delay={600}
                invert
              />
            </div>

            <div className='flex text-center justify-center pt-16'>
              <div>
                <SuiButton
                  iconRight
                  path='/clickhouse/'
                  color='dark'
                  title='See all features'
                  size='lg'
                />
              </div>
            </div>
          </div>
        </div>

        <div className='flex w-full bg-web-light-c2 dark:bg-web-dark-c2'>
          <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pt-16 pb-8 text-center px-8 xl:px-0'>
            <SuiTitle size='xl'>
              <h3>Trusted across many industries</h3>
            </SuiTitle>
            <SuiText size='lg' color='dark' weight='normal'>
              <p>
                ClickHouse is trusted and used by companies of all sizes across
                many industries to provide solutions to many different problems.
              </p>
            </SuiText>

            <div className='pt-12 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 self-center'>
              <CompanyCard path='/customer-stories/' image={<LogoEbay />} />
              <CompanyCard path='/customer-stories/' image={<LogoUber />} />
              <CompanyCard path='/customer-stories/' image={<LogoSpotify />} />
              <CompanyCard
                path='/customer-stories/'
                image={<LogoCloudflare />}
              />
              <CompanyCard path='/customer-stories/' image={<LogoDeutche />} />
            </div>

            <div className='flex text-center justify-center pt-16'>
              <div>
                <SuiButton
                  iconRight
                  path='/clickhouse/'
                  color='empty'
                  textColor='darkest'
                  title='Read customer stories'
                  size='lg'
                />
              </div>
            </div>
          </div>
        </div>

        <div className='flex w-full bg-web-light-c1 dark:bg-web-dark-c1 pb-20'>
          <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pt-20 pb-8 text-center px-8 2xl:px-0'>
            <SuiTitle size='sm' color='primary' dark_color='primary'>
              Private preview
            </SuiTitle>
            <SuiSpacer size='sm' />
            <SuiTitle size='xl'>
              <h3>ClickHouse Cloud</h3>
            </SuiTitle>

            <div className='max-w-5xl flex self-center mt-2'>
              <SuiText size='lg' color='dark' weight='normal'>
                <p>
                  Build fast applications even faster with ClickHouse Cloud. We
                  automatically replicate, tier, and scale your changing
                  workloads and charge only for the queries you run to achieve
                  the best possible price performance ratio for your apps.
                </p>
              </SuiText>
            </div>

            <div className='flex flex-col md:flex-row pt-16 justify-between self-center max-w-screen-xl'>
              <div className='flex flex-col text-center md:text-left md:w-2/5 pb-4 md:pb-0'>
                <SuiTitle size='lg'>Instant onboarding</SuiTitle>
                <SuiSpacer size='md' />
                <SuiText size='lg' color='dark'>
                  <p>
                    All the speed and power that you expect from ClickHouse is
                    now available in a cloud offering.
                  </p>
                </SuiText>
                <SuiSpacer size='md' />
                <div className='pl-10 md:pl-0'>
                  <div className='flex space-x-4 pb-2'>
                    <Image
                      src='/homepage/new/icon_check.svg'
                      alt='ClickHouse is fast'
                      width='32'
                      height='32'
                    />
                    <SuiText size='lg' color='dark'>
                      <p>Start for free</p>
                    </SuiText>
                  </div>
                  <div className='flex space-x-4 pb-2'>
                    <Image
                      src='/homepage/new/icon_check.svg'
                      alt='ClickHouse is fast'
                      width='32'
                      height='32'
                    />
                    <SuiText size='lg' color='dark'>
                      <p>No upfront sizing</p>
                    </SuiText>
                  </div>
                  <div className='flex space-x-4 pb-2'>
                    <Image
                      src='/homepage/new/icon_check.svg'
                      alt='ClickHouse is fast'
                      width='32'
                      height='32'
                    />
                    <SuiText size='lg' color='dark'>
                      <p>No manual replication setup</p>
                    </SuiText>
                  </div>
                  <div className='flex space-x-4'>
                    <Image
                      src='/homepage/new/icon_check.svg'
                      alt='ClickHouse is fast'
                      width='32'
                      height='32'
                    />
                    <SuiText size='lg' color='dark'>
                      <p>No manual data sharding</p>
                    </SuiText>
                  </div>
                </div>
              </div>
              <div className='flex md:w-1/2 justify-center pt-4'>
                <Image
                  src='/homepage/new/image_cloud.png'
                  alt='ClickHouse Cloud is coming'
                  width='611'
                  height='366'
                />
              </div>
            </div>

            <div className='flex flex-col md:flex-row pt-12 justify-between'>
              <div className='flex md:w-1/2'>
                <div>
                  <Image
                    src='/cloud/image_backups.png'
                    alt='ClickHouse Cloud is coming'
                    width='611'
                    height='366'
                  />
                </div>
              </div>
              <div className='flex flex-col md:text-left md:w-2/5 pb-4 md:pb-0'>
                <SuiTitle size='lg'>Uncompromising reliability</SuiTitle>
                <SuiSpacer size='md' />
                <SuiText size='lg' color='dark'>
                  <p>
                    We take care of running the most reliable service for you,
                    so you can focus on developing great applications.
                  </p>
                </SuiText>
                <SuiSpacer size='md' />
                <div className='pl-10 md:pl-0'>
                  <div className='flex space-x-4 pb-2'>
                    <Image
                      src='/homepage/new/icon_check.svg'
                      alt='ClickHouse is fast'
                      width='32'
                      height='32'
                    />
                    <SuiText size='lg' color='dark'>
                      <p>Highly available</p>
                    </SuiText>
                  </div>
                  <div className='flex space-x-4 pb-2'>
                    <Image
                      src='/homepage/new/icon_check.svg'
                      alt='ClickHouse is fast'
                      width='32'
                      height='32'
                    />
                    <SuiText size='lg' color='dark'>
                      <p>Zero downtime upgrades</p>
                    </SuiText>
                  </div>
                  <div className='flex space-x-4 pb-2'>
                    <Image
                      src='/homepage/new/icon_check.svg'
                      alt='ClickHouse is fast'
                      width='32'
                      height='32'
                    />
                    <SuiText size='lg' color='dark'>
                      <p>Automated backups</p>
                    </SuiText>
                  </div>
                  <div className='flex space-x-4'>
                    <Image
                      src='/homepage/new/icon_check.svg'
                      alt='ClickHouse is fast'
                      width='32'
                      height='32'
                    />
                    <SuiText size='lg' color='dark'>
                      <p>Disaster recovery</p>
                    </SuiText>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-4 md:flex-row md:space-x-8 justify-center pt-16'>
              <div className='w-full md:w-48'>
                <SuiButton
                  color='primary'
                  textColor='text-text-lightest'
                  borderColor='border-primary'
                  title='Get early access'
                  path='https://clickhouse.com/docs/en/quick-start/'
                />
              </div>
              <div className='w-full md:w-48'>
                <SuiButton
                  color='warning'
                  textColor='text-text-darkest'
                  title='Learn more'
                  path='/clickhouse-cloud/'
                />
              </div>
            </div>
          </div>
        </div>

        <div className='flex w-full bg-web-light-c2 dark:bg-web-dark-c2'>
          <div className='flex container mx-auto flex-col max-w-4xl md:bg-no-repeat bg-opacity-10 pt-16 pb-8 text-center px-8 2xl:px-0'>
            <SuiTitle size='sm' color='primary'>
              <h5>Independent benchmarks</h5>
            </SuiTitle>
            <SuiSpacer size='sm' />
            <SuiTitle size='xl'>
              <h3>What the experts say</h3>
            </SuiTitle>
            <SuiSpacer size='sm' />
            <SuiText size='lg' color='dark'>
              <p>
                Get a 360 view into your ClickHouse service. See how much data
                is being ingested, how many of your queries are successful, or
                even which queries are the heaviest.
              </p>
            </SuiText>
            <SuiSpacer size='md' />
            <div className='flex justify-center'>
              <IconGraduation />
            </div>
            <SuiSpacer size='md' />
            <SuiText size='md' weight='medium' color='dark'>
              <p>
                <SuiLink href='#' size='lg' color='darkest'>
                  ClickHouse vs TimescaleDB
                </SuiLink>
                <br />
                Gitlab
              </p>
            </SuiText>

            <SuiSpacer size='md' />
            <SuiText size='md' weight='medium' color='dark'>
              <p>
                <SuiLink href='#' size='lg' color='darkest'>
                  1.1 Billion Taxi Rides: 108-core ClickHouse Cluster
                </SuiLink>
                <br />
                Mark Litwintschik
              </p>
            </SuiText>

            <SuiSpacer size='md' />
            <SuiText size='md' weight='medium' color='dark'>
              <p>
                <SuiLink href='#' size='lg' color='darkest'>
                  ClickHouse, Redshift and 2.5 Billion Rows of Time Series Data
                </SuiLink>
                <br />
                Brandon Harris
              </p>
            </SuiText>

            <SuiSpacer size='md' />
            <SuiText size='md' weight='medium' color='dark'>
              <p>
                <SuiLink href='#' size='lg' color='darkest'>
                  ClickHouse vs MariaDB ColumnStore
                </SuiLink>
                <br />
                Percona
              </p>
            </SuiText>
            <SuiSpacer size='md' />
            <Image
              src='/homepage/new/icon_star.svg'
              alt='Experts'
              width='32'
              height='32'
            />
          </div>
        </div>

        <GetStarted />
      </BaseLayout>
    </>
  )
}

export default Home
