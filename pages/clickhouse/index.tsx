import { useState } from 'react'
import { BaseLayout } from '../../components/layout'
import { SuiButton, SuiSpacer, SuiText, SuiTitle } from '../../components/sui'
import { FeatureItem } from '../../components/feature_item'
import Link from 'next/link'
import Image from 'next/image'
import { FeatureItemLarge } from '../../components/feature_item_large/feature_item_large'
import { GetStarted } from '../../components/get_started_area'
import { IconFast } from '../../components/icons/icon_fast'
import { IconLinear } from '../../components/icons/icon_linear'
import { IconTolerant } from '../../components/icons/icon_tolerant'
import { IconEfficient } from '../../components/icons/icon_efficient'
import { IconReliable } from '../../components/icons/icon_reliable'
import { IconRich } from '../../components/icons/icon_rich'
import { IconLinearLarge } from '../../components/icons/icon_linear_large'
import { IconScaleLarge } from '../../components/icons/icon_scale_large'
import { IconHeart } from '../../components/icons/icon_heart'
import { IconGitHub } from '../../components/icons/icon_github'

export default function Cloud() {
  return (
    <BaseLayout title='ClickHouse Cloud'>
      <div className='bg-hero_background dark:bg-dark_hero_background bg-cover pt-10'>
        <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pb-20 px-4 sm:px-8 2xl:px-0'>
          <div data-aos='fade-up' className='flex'>
            <div className='md:w-6/12 md:mt-16 flex-col text-center md:text-left'>
              <SuiTitle size='web'>
                <h1>
                  The{' '}
                  <span className='text-transparent bg-clip-text bg-gradient-to-b from-gradientTop to-gradientBottom'>
                    Open Source
                  </span>{' '}
                  OLAP
                  <br /> database management system.
                </h1>
              </SuiTitle>
              <div className='mt-6'>
                <SuiText size='lg' color='dark' weight='normal'>
                  <p className='md:pr-16'>
                    It is column-oriented and allows to generate analytical
                    reports using SQL queries in real-time.
                  </p>
                </SuiText>
              </div>
              <div className='flex mt-6 justify-center md:justify-start space-x-4'>
                <SuiButton size='md' path='#earlyaccess' title='Quick start' />
                <a
                  href='https://github.com/ClickHouse/ClickHouse'
                  target='_blank'
                  rel='noopener noreferrer'>
                  <div className='flex bg-web-light-c1 dark:bg-web-dark-c1 rounded-md shadow-md cursor-pointer hover:underline hover:transition-all hover:-translate-y-0.5'>
                    <div className='bg-web-light-c2 dark:bg-web-dark-c2 rounded-l-md flex justify-center items-center px-3 w-12 h-10'>
                      <IconGitHub />
                    </div>
                    <div className='flex px-4 justify-center items-center'>
                      <SuiText weight='medium'>
                        <p>23k+ stars</p>
                      </SuiText>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div className='hidden md:flex w-6/12 justify-center'>
              <div>
                <div className='mx-auto flex px-8 mt-12'>
                  <Image
                    src='/clickhouse/illustration.png'
                    alt='ClickHouse is fast'
                    width='471'
                    height='360'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full mx-auto bg-strain_background bg-cover h-24 md:h-40 -mt-12 bg-no-repeat 2xl:h-52' />
      </div>
      <div className='bg-web-light-c1 dark:bg-web-dark-c1'>
        <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pb-24 px-4 sm:px-8 2xl:px-0 pt-16'>
          <SuiTitle size='sm' color='primary' dark_color='primary'>
            Features
          </SuiTitle>

          <SuiSpacer size='lg' />
          <div className='flex flex-col space-y-8 md:space-y-0 md:flex-row'>
            <FeatureItem
              icon={<IconFast />}
              title='Blazing fast'
              description='Exceeds all other column-oriented database management systems'
              delay={100}
            />

            <FeatureItem
              icon={<IconLinear />}
              title='Linearly scalable'
              description='Incredible scaling both horizontally and vertically'
              delay={200}
            />

            <FeatureItem
              icon={<IconTolerant />}
              title='Fault tolerant'
              description='Supports async replication and can be deployed across multiple datacenters'
              delay={300}
            />
          </div>

          <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row pt-4 md:pt-16'>
            <FeatureItem
              icon={<IconEfficient />}
              title='Hardware efficient'
              description='Processes analytical queries faster than traditional row-oriented systems'
              delay={400}
            />

            <FeatureItem
              icon={<IconReliable />}
              title='Highly reliable'
              description='Purely distributed system, including enterprise-grade security'
              delay={500}
            />

            <FeatureItem
              icon={<IconRich />}
              title='Feature rich'
              description='User-friendly SQL query dialect, built-in analytics capabilities, and more'
              delay={600}
            />
          </div>
        </div>
      </div>
      <div className='flex w-full bg-web-light-c2 dark:bg-web-dark-c2 pb-20'>
        <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pt-20 pb-8 text-center px-8 2xl:px-0'>
          <SuiTitle size='xs' color='primary' dark_color='primary'>
            <h3>Features</h3>
          </SuiTitle>
          <SuiSpacer size='sm' />
          <SuiTitle size='xl'>
            <h3>Why choose ClickHouse?</h3>
          </SuiTitle>

          <SuiSpacer size='xl' />

          <div className='flex flex-col md:flex-row space-y-8 md:space-y-0 justify-between md:space-x-20'>
            <FeatureItemLarge
              icon={<IconFast />}
              title='Blazing fast'
              description='ClickHouse uses all available hardware to its full potential
                  to process each query as fast as possible. Peak processing
                  performance for a single query stands at more than 2 terabytes
                  per second (after decompression, only used columns). In
                  distributed setup reads are automatically balanced among
                  healthy replicas to avoid increasing latency.'
            />
            <FeatureItemLarge
              icon={<IconTolerant />}
              title='Fault-tolerant'
              description='ClickHouse uses all available hardware to its full potential
                  to process each query as fast as possible. Peak processing
                  performance for a single query stands at more than 2 terabytes
                  per second (after decompression, only used columns). In
                  distributed setup reads are automatically balanced among
                  healthy replicas to avoid increasing latency.'
            />
          </div>

          <div className='flex flex-col md:flex-row space-y-8 md:space-y-0 justify-between mt-8 md:mt-16 md:space-x-24'>
            <FeatureItemLarge
              icon={<IconHeart />}
              title='Easy to use'
              description='ClickHouse is simple and works out-of-the-box. It streamlines all your data processing: ingest all your structured data into the system and it becomes instantly available for building reports. SQL dialect allows expressing the desired result without involving any custom non-standard API that could be found in some DBMS.'
            />
            <FeatureItemLarge
              icon={<IconReliable />}
              title='Highly reliable'
              description='ClickHouse can be configured as a purely distributed system located on independent nodes, without any single points of failure. It also includes a lot of enterprise-grade security features and fail-safe mechanisms against human errors.'
            />
          </div>
        </div>
      </div>

      <div className='flex w-full bg-web-light-c1 dark:bg-web-dark-c1 pb-20'>
        <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pt-20 pb-8 px-8 2xl:px-0'>
          <SuiTitle size='xs' color='primary' dark_color='primary'>
            <h3>Features</h3>
          </SuiTitle>
          <SuiSpacer size='sm' />
          <SuiTitle size='xl'>
            <h3>Hardware efficient</h3>
          </SuiTitle>

          <div className='flex flex-col md:flex-row items-center'>
            <div className='pt-4 md:pt-0 md:w-3/5'>
              <SuiText size='lg'>
                ClickHouse processes typical analytical queries two to three
                orders of magnitude faster than traditional row-oriented systems
                with the same available I/O throughput and CPU capacity.
                Columnar storage format allows fitting more hot data in RAM,
                which leads to shorter typical response times.
                <br />
                <br /> Total cost of ownership could be further lowered by using
                commodity hardware with rotating disk drives instead of
                enterprise grade NVMe or SSD without significant sacrifices in
                latency for most kinds of queries.
              </SuiText>
            </div>
            <div className='pt-4 md:pt-0 w-2/5 justify-center flex'>
              <IconScaleLarge />
            </div>
          </div>

          <div className='flex flex-col md:flex-row md:space-x-12 pt-16'>
            <div className='md:w-1/3'>
              <SuiTitle>
                <h4>Strives for CPU efficiency</h4>
              </SuiTitle>
              <SuiText color='dark' size='lg'>
                <p>
                  Vectorized query execution involves relevant SIMD processor
                  instructions and runtime code generation. Processing data in
                  columns increases CPU line cache hit rate.
                </p>
              </SuiText>
            </div>

            <div className='md:w-1/3 pt-4 md:pt-0'>
              <SuiTitle>
                <h4>Optimizes disk drive access</h4>
              </SuiTitle>
              <SuiText color='dark' size='lg'>
                <p>
                  ClickHouse minimizes the number of seeks for range queries,
                  which increases the efficiency of using rotational disk
                  drives, as it maintains locality of reference for continually
                  stored data.
                </p>
              </SuiText>
            </div>

            <div className='md:w-1/3 pt-4 md:pt-0'>
              <SuiTitle>
                <h4>Minimizes data transfers</h4>
              </SuiTitle>
              <SuiText color='dark' size='lg'>
                <p>
                  ClickHouse enables companies to manage their data and create
                  reports without using specialized networks that are aimed at
                  high-performance computing.
                </p>
              </SuiText>
            </div>
          </div>
        </div>
      </div>

      <div className='flex w-full bg-web-light-c2 dark:bg-web-dark-c2 pb-20'>
        <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pt-20 pb-8 px-8 2xl:px-0'>
          <SuiTitle size='xs' color='primary' dark_color='primary'>
            <h3>Features</h3>
          </SuiTitle>
          <SuiSpacer size='sm' />
          <SuiTitle size='xl'>
            <h3>Feature-rich</h3>
          </SuiTitle>

          <div className='flex flex-col md:flex-row md:space-x-12 pt-8'>
            <div className='md:w-1/2 md:pr-24'>
              <SuiTitle>
                <h4>User-friendly SQL dialect</h4>
              </SuiTitle>
              <SuiText color='dark' size='lg'>
                <p>
                  ClickHouse features a user-friendly SQL query dialect with a
                  number of built-in analytics capabilities. In addition to
                  common functions that could be found in most DBMS, ClickHouse
                  comes with a lot of domain-specific functions and features out
                  of the box.
                </p>
              </SuiText>
            </div>

            <div className='md:w-1/2 md:pr-24 pt-4 md:pt-0'>
              <SuiTitle>
                <h4>Efficient managing of denormalized data</h4>
              </SuiTitle>
              <SuiText color='dark' size='lg'>
                <p>
                  Column-oriented nature of ClickHouse allows having hundreds or
                  thousands of columns per table without slowing down SELECT
                  queries. It&lsquo;s possible to pack even more data in by
                  leveraging wide range data organizing options, such as arrays,
                  tuples and nested data structures.
                </p>
              </SuiText>
            </div>
          </div>

          <div className='flex flex-col md:flex-row md:space-x-12 pt-2 md:pt-16'>
            <div className='md:w-1/2 md:pr-24 pt-4 md:pt-0'>
              <SuiTitle>
                <h4>Join distributed or co-located data</h4>
              </SuiTitle>
              <SuiText color='dark' size='lg'>
                <p>
                  ClickHouse provides various options for joining tables. Joins
                  could be either cluster local, they can also access data
                  stored in external systems. There&lsquo;s also an external
                  dictionaries support that provides an alternative more simple
                  syntax for accessing data from an outside source.
                </p>
              </SuiText>
            </div>

            <div className='md:w-1/2 md:pr-24 pt-4 md:pt-0'>
              <SuiTitle>
                <h4>Approximate query processing</h4>
              </SuiTitle>
              <SuiText color='dark' size='lg'>
                <p>
                  ClickHouse minimizes the number of seeks for range queries,
                  which increases the efficiency of using rotational disk
                  drives, as it maintains locality of reference for continually
                  stored data.
                </p>
              </SuiText>
            </div>
          </div>
        </div>
      </div>

      <div className='flex w-full bg-web-light-c1 dark:bg-web-dark-c1 pb-20'>
        <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pt-20 pb-8 px-8 2xl:px-0'>
          <div className='flex flex-col md:flex-row items-center'>
            <div className='md:w-2/5 justify-center flex'>
              <IconLinearLarge />
            </div>

            <div className='md:w-3/5'>
              <SuiTitle size='xs' color='primary'>
                <h3>Features</h3>
              </SuiTitle>
              <SuiSpacer size='sm' />
              <SuiTitle size='xl'>
                <h3>Linearly scalable</h3>
              </SuiTitle>
              <SuiText size='lg'>
                ClickHouse scales well both vertically and horizontally.
                ClickHouse is easily adaptable to perform either on a cluster
                with hundreds or thousands of nodes or on a single server or
                even on a tiny virtual machine. Currently, there are
                installations with more multiple trillion rows or hundreds of
                terabytes of data per single node.
                <br />
                <br /> There are many ClickHouse clusters consisting of multiple
                hundred nodes, including few clusters of Yandex Metrica, while
                the largest known ClickHouse cluster is well over a thousand
                nodes.
              </SuiText>
            </div>
          </div>

          <div className='flex pt-16 flex-col'>
            <SuiTitle size='lg'>
              <h4>Use ClickHouse when</h4>
            </SuiTitle>
            <SuiText color='dark' size='lg'>
              <p className='max-w-3xl '>
                For analytics over a stream of clean, well structured and
                immutable events or logs. It is recommended to put each such
                stream into a single wide fact table with pre-joined dimensions.
              </p>
            </SuiText>

            <div className='flex flex-col md:flex-row pt-4'>
              <div className='md:w-1/3 flex-col flex'>
                <div className='flex space-x-4 pb-2'>
                  <Image
                    src='/homepage/new/icon_check.svg'
                    alt='ClickHouse is fast'
                    width='32'
                    height='32'
                  />
                  <SuiText size='lg'>
                    <p>Web and App analytics</p>
                  </SuiText>
                </div>
                <div className='flex space-x-4 pb-2'>
                  <Image
                    src='/homepage/new/icon_check.svg'
                    alt='ClickHouse is fast'
                    width='32'
                    height='32'
                  />
                  <SuiText size='lg'>
                    <p>Advertising networks and RTB</p>
                  </SuiText>
                </div>
                <div className='flex space-x-4 pb-2'>
                  <Image
                    src='/homepage/new/icon_check.svg'
                    alt='ClickHouse is fast'
                    width='32'
                    height='32'
                  />
                  <SuiText size='lg'>
                    <p>Telecommunications</p>
                  </SuiText>
                </div>
                <div className='flex space-x-4 pb-2'>
                  <Image
                    src='/homepage/new/icon_check.svg'
                    alt='ClickHouse is fast'
                    width='32'
                    height='32'
                  />
                  <SuiText size='lg'>
                    <p>Internet of Things</p>
                  </SuiText>
                </div>
              </div>

              <div className='md:w-1/3 flex-col flex'>
                <div className='flex space-x-4 pb-2'>
                  <Image
                    src='/homepage/new/icon_check.svg'
                    alt='ClickHouse is fast'
                    width='32'
                    height='32'
                  />
                  <SuiText size='lg'>
                    <p>E-commerce and finance</p>
                  </SuiText>
                </div>
                <div className='flex space-x-4 pb-2'>
                  <Image
                    src='/homepage/new/icon_check.svg'
                    alt='ClickHouse is fast'
                    width='32'
                    height='32'
                  />
                  <SuiText size='lg'>
                    <p>Information security</p>
                  </SuiText>
                </div>
                <div className='flex space-x-4 pb-2'>
                  <Image
                    src='/homepage/new/icon_check.svg'
                    alt='ClickHouse is fast'
                    width='32'
                    height='32'
                  />
                  <SuiText size='lg'>
                    <p>Monitoring and telemetry</p>
                  </SuiText>
                </div>
              </div>

              <div className='md:w-1/3 flex-col flex'>
                <div className='flex space-x-4 pb-2'>
                  <Image
                    src='/homepage/new/icon_check.svg'
                    alt='ClickHouse is fast'
                    width='32'
                    height='32'
                  />
                  <SuiText size='lg'>
                    <p>Time series</p>
                  </SuiText>
                </div>
                <div className='flex space-x-4 pb-2'>
                  <Image
                    src='/homepage/new/icon_check.svg'
                    alt='ClickHouse is fast'
                    width='32'
                    height='32'
                  />
                  <SuiText size='lg'>
                    <p>Business intelligence</p>
                  </SuiText>
                </div>
                <div className='flex space-x-4 pb-2'>
                  <Image
                    src='/homepage/new/icon_check.svg'
                    alt='ClickHouse is fast'
                    width='32'
                    height='32'
                  />
                  <SuiText size='lg'>
                    <p>Online games</p>
                  </SuiText>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <GetStarted />
    </BaseLayout>
  )
}
