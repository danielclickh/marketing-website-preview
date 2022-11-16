import Link from 'next/link'
import Image from 'next/image'
import { ArrowRightIcon } from '@heroicons/react/solid'

import { GetStarted } from '../../components/get_started_area'
import { BaseLayout } from '../../components/layout'
import {
  SuiButton,
  SuiSpacer,
  SuiText,
  SuiLink,
  SuiTitle,
  SuiHorizontalDivide,
  SuiPanel,
  SuiTextField
} from '../../components/sui'

export default function Blog() {
  return (
    <BaseLayout title='ClickHouse Docs have a new look and feel! • ClickHouse'>
      <div className='bg-web-light-c1 dark:bg-dark_hero_background pt-10'>
        <div className='flex container mx-auto flex-col px-6 2xl:px-0'>
          <div
            className='flex flex-col text-center mx-auto pt-6 max-w-3xl'
            data-aos='fade-up'>
            <SuiTitle size='sm' color='primary' dark_color='primary'>
              <h4>Product</h4>
            </SuiTitle>
            <SuiTitle size='web'>
              <h1>ClickHouse Docs have a new look and feel!</h1>
            </SuiTitle>

            <SuiSpacer size='lg' />
            <div className='flex flex-row space-x-4 pt-2 justify-center'>
              <div className='flex w-11 h-11'>
                <Image
                  src={`/blog/author_rich.png`}
                  alt='Rich Raposa'
                  width='44'
                  height='44'
                />
              </div>
              <div className='flex'>
                <div className='flex flex-col'>
                  <SuiText padding_0>Rich Raposa</SuiText>
                  <SuiText padding_0 color='dark'>
                    May 4, 2022
                  </SuiText>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='container flex mx-auto px-6 2xl:px-0 max-w-3xl pt-16'>
          <div className='flex flex-col pb-20'>
            <SuiText size='lg'>
              <p>
                ClickHouse is impressively fast, in fact, that is core to our
                engineering ethos and the goals of the project.
              </p>
            </SuiText>
            <SuiText size='lg'>
              <p>
                Understanding ClickHouse (or any new product) and using it
                effectively is a journey. This is why documentation is so
                fundamental to the industry broadly and to us, directly. We’ve
                spent a fair bit of time recently with the documentation, not
                only improving existing but building out an{' '}
                <SuiLink href='#' size='lg' weight='normal'>
                  entire new collection of content
                </SuiLink>{' '}
                to help developers, admins, architects and analysts gain the
                knowledge they need to successfully use ClickHouse.
              </p>
            </SuiText>
            <SuiSpacer />
            <div className='shadow-md mb-6'>
              <Image
                src='/blog/docs-hero.png'
                className='shadow-md'
                alt='Docs hero'
                width='720'
                height='387'
                layout='responsive'
              />
            </div>
            <SuiText size='lg'>
              <p>Here is what you will find in this new version of the docs:</p>
            </SuiText>
            <ul className='list-disc py-8 pl-4'>
              <li className='pb-2'>
                A redesigned{' '}
                <SuiLink href='#' size='lg' weight='normal'>
                  Quick Start and Tutorial
                </SuiLink>{' '}
                to get up and running quickly
              </li>
              <li className='pb-2'>
                A new{' '}
                <SuiLink href='#' size='lg' weight='normal'>
                  Connect a UI
                </SuiLink>{' '}
                section with guides on how to connect popular UI/BI tools to
                ClickHouse like Grafana, Metabase, Superset, and Tableau
              </li>
              <li className='pb-2'>
                A new{' '}
                <SuiLink href='#' size='lg' weight='normal'>
                  Integrations
                </SuiLink>{' '}
                section of guides on how to connect ClickHouse to external
                systems like Kafka, AWS S3, PostgreSQL, MySQL, Airbyte and much
                more
              </li>
              <li className='pb-2'>
                We are particularly excited about the new{' '}
                <SuiLink href='#' size='lg' weight='normal'>
                  User Guides
                </SuiLink>{' '}
                section filled with articles, tutorials and how-to guides
                covering all sorts of fundamental and advanced ClickHouse
                topics. We want users to understand important topics like how to
                choose a primary key, configure the new ClickHouse Keeper,
                improve query performance, and lots of other helpful tips and
                tricks
              </li>
              <li className='pb-2'>
                The historical docs can be found in the new{' '}
                <SuiLink href='#' size='lg' weight='normal'>
                  Reference section
                </SuiLink>
                , where you will find all the technical details like a complete
                ClickHouse SQL reference, an explanation of the various
                ClickHouse data types, instructions on how to build ClickHouse
                from the source code, and much more.
              </li>
            </ul>
            Have you ever wanted to contribute to an open-source project? Are
            you a fan of ClickHouse or on the learning journey yourself?
            Documentation is often a great place to get started.
            <SuiText size='lg'>
              <p>According to the Github Open Source Survey:</p>
            </SuiText>
            <SuiText size='lg'>
              <p>
                <span className='text-web-light-c4 dark:text-web-dark-c4 mt-2 mb-4 flex border-l-4 pl-4 border-x-alerts-success-background'>
                  Incomplete or outdated documentation is a pervasive problem,
                  observed by 93% of respondents, yet 60% of contributors say
                  they rarely or never contribute to documentation.
                </span>{' '}
                We strongly encourage users of ClickHouse and providers of
                integrated platforms to contribute new articles and user guides.
                To contribute, simply create a pull request in the new public
                ClickHouse/clickhouse-docs repo. We chose a user-friendly
                Creative Commons license for the new docs to allow for
                contributions and non-commercial use. (Note: that changes and
                contributions to the historical docs will continue in the
                ClickHouse/ClickHouse repo.)
              </p>
            </SuiText>
            <SuiText size='lg'>
              <p>
                You are all welcome to join us on the journey of documenting!
              </p>
            </SuiText>
            <SuiHorizontalDivide />
            <SuiSpacer />
            <div className='flex justify-between items-center'>
              <div className='flex'>
                <SuiText size='md' color='dark'>
                  Share this post
                </SuiText>
              </div>
              <div className='flex space-x-4'>
                <div className='border border-light-grey4 rounded-lg px-2 hover:bg-light-grey3 cursor-pointer'>
                  <SuiText size='md' color='dark'>
                    Copy link
                  </SuiText>
                </div>
                <div className='border border-light-grey4 rounded-lg p-2 pb-0 hover:bg-light-grey3 cursor-pointer'>
                  <Image
                    src='/blog/blog_twitter.svg'
                    className='shadow-md'
                    alt='Social share'
                    width='24'
                    height='24'
                  />
                </div>
                <div className='border border-light-grey4 rounded-lg p-2 pb-0 hover:bg-light-grey3 cursor-pointer'>
                  <Image
                    src='/blog/blog_facebook.svg'
                    className='shadow-md'
                    alt='Social share'
                    width='24'
                    height='24'
                  />
                </div>
                <div className='border border-light-grey4 rounded-lg p-2 pb-0 hover:bg-light-grey3 cursor-pointer'>
                  <Image
                    src='/blog/blog_linkedin.svg'
                    className='shadow-md'
                    alt='Social share'
                    width='24'
                    height='24'
                  />
                </div>
              </div>
            </div>
            <SuiPanel
              color='bg-web-light-c2 dark:bg-web-dark-c2'
              className='mt-8'
              padding='lg'>
              <div className='flex justify-between'>
                <div className='flex flex-col w-1/2'>
                  <SuiTitle>
                    <h4>Subscribe to our newsletter</h4>
                  </SuiTitle>
                  <SuiText color='dark'>
                    <p>
                      Stay informed on feature releases, product roadmap, future
                      support, and cloud offerings!
                    </p>
                  </SuiText>
                </div>
                <div className='flex align-middle items-center space-x-2'>
                  <SuiTextField htmlFor='email' placeholder='Email address' />
                  <div className='mt-1'>
                    <SuiButton title='Sign up' />
                  </div>
                </div>
              </div>
            </SuiPanel>
          </div>
        </div>
      </div>

      <div className='flex w-full bg-web-light-c2 dark:bg-web-dark-c2 pb-8'>
        <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pt-12 pb-8 px-8 2xl:px-0'>
          <div className='flex justify-between pb-4'>
            <SuiTitle size='md'>
              <h4>Recent posts</h4>
            </SuiTitle>

            <div className='flex'>
              <Link href='/blog/'>
                <div className='flex items-center cursor-pointer hover:underline'>
                  <SuiText weight='medium'>All posts</SuiText>
                  <ArrowRightIcon className='ml-2 w-4' />
                </div>
              </Link>
            </div>
          </div>
          <div className='flex flex-col md:flex-row md:space-x-16 space-y-6 md:space-y-0'>
            <Link href='/blog/'>
              <div className='flex flex-col group md:w-1/3 cursor-pointer'>
                <Image
                  src='/blog/docs-hero.png'
                  className='shadow-lg rounded-lg'
                  alt='Docs hero'
                  width='328'
                  height='162'
                  layout='responsive'
                />
                <SuiSpacer size='md' />
                <SuiTitle color='primary' size='xs'>
                  <h5>Product</h5>
                </SuiTitle>
                <SuiTitle size='sm' className='group-hover:underline'>
                  <h4>ClickHouse Docs have a new look and feel!</h4>
                </SuiTitle>
              </div>
            </Link>

            <Link href='/blog/'>
              <div className='flex flex-col group md:w-1/3 cursor-pointer'>
                <Image
                  src='/blog/blog_post_newsletter.png'
                  className='shadow-lg rounded-lg'
                  alt='Docs hero'
                  width='328'
                  height='162'
                  layout='responsive'
                />
                <SuiSpacer size='md' />
                <SuiTitle color='primary' size='xs'>
                  <h5>Product</h5>
                </SuiTitle>
                <SuiTitle size='sm' className='group-hover:underline'>
                  <h4>ClickHouse Newsletter April 2022: JSON, JSON, JSON</h4>
                </SuiTitle>
              </div>
            </Link>

            <Link href='/blog/'>
              <div className='flex flex-col group md:w-1/3 cursor-pointer'>
                <Image
                  src='/blog/blog_post_copy.png'
                  className='shadow-lg rounded-lg'
                  alt='Docs hero'
                  width='328'
                  height='162'
                  layout='responsive'
                />
                <SuiSpacer size='md' />
                <SuiTitle color='primary' size='xs'>
                  <h5>Product</h5>
                </SuiTitle>
                <SuiTitle size='sm' className='group-hover:underline'>
                  <h4>Building a Paste Service With ClickHouse</h4>
                </SuiTitle>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <GetStarted />
    </BaseLayout>
  )
}
