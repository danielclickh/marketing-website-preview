import features from './features.json'
import replacements from './replacements.json'
import TickItem from '@/components-cleaned/TickItem'
import GetStarted from '@/components/GetStarted'
import Layout from '@/components/Layout'
import { SuiText } from '@/components/sui'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { KeeperData } from '@/types/keeper'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const getStaticProps: GetStaticProps<KeeperData> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()
    return {
      props: {
        ...commonProps
      }
    }
  }

export default function KeeperPage({
  headerData,
  footerData,
  platforms
}: KeeperData) {
  useGalaxyOnPage('keeperPage')

  const seoData = {
    path: '/clickhouse/keeper',
    title: 'ClickHouse Keeper - Open-source coordination that scales',
    description:
      'ClickHouse Keeper solves the well-known drawbacks of ZooKeeper and makes many additional improvements. Join us in building the future of distributed consensus.',
    image: [{ url: '/images/keeper-social-image.png' }]
  }
  return (
    <>
      <Layout footerData={footerData} seo={seoData} headerData={headerData}>
        <div className='bg-neutral-800 bg-contain bg-center bg-no-repeat pt-10'>
          <div className='relative overflow-x-hidden'>
            <div className='container mx-auto flex max-w-7xl flex-col bg-opacity-10 px-4 pb-16 md:bg-no-repeat md:px-8 md:pb-24 2xl:px-0'>
              <div className='flex flex-col lg:flex-row lg:items-center'>
                <div className='flex-col text-center md:mt-16 lg:w-1/2 lg:text-left'>
                  <h1 className='mb-4 font-basier text-4xl font-semibold leading-tight md:text-5.5xl'>
                    ClickHouse{' '}
                    <span className='tilted tilted-yellow'>
                      <span className='tilted-content'>Keeper</span>
                    </span>{' '}
                  </h1>
                  <h2 className='font-basier text-2xl font-semibold'>
                    Open-source coordination that scales
                  </h2>
                  <SuiText
                    size='base'
                    color='secondary'
                    className='mt-8 md:pr-4 lg:max-w-xl'>
                    ClickHouse Keeper solves the well-known drawbacks of
                    ZooKeeper and makes many additional improvements.
                    <br />
                    <br />
                    Join us in building the future of distributed consensus.
                  </SuiText>
                  <div className='mt-12 flex items-center justify-center gap-8 lg:justify-start'>
                    <a
                      href='https://github.com/ClickHouse/ClickHouse?utm_source=clickhouse&utm_medium=website&utm_campaign=clickhouse-keeper'
                      target='_blank'
                      className='flex items-center gap-2 rounded-md bg-primary-300 px-8 py-3 hover:cursor-pointer hover:bg-primary-400 hover:shadow-xl'>
                      <Image
                        alt='Twitter icon'
                        src='/images/github-logo.svg'
                        width={16}
                        height={16}
                        className='h-[20px] w-[20px]'
                      />
                      <p className='text-sm font-semibold text-black'>
                        Join us
                      </p>
                    </a>
                    <Link
                      href='/blog/clickhouse-keeper-a-zookeeper-alternative-written-in-cpp?loc=keeper-hero'
                      target='_self'
                      className='flex items-center gap-2 rounded-md border border-primary-600 bg-transparent px-8 py-3 text-neutral-0 hover:cursor-pointer hover:border-primary-500 hover:bg-neutral-725 hover:bg-opacity-80 hover:shadow-xl'>
                      <p className='text-sm font-semibold text-neutral-0'>
                        Read the blog
                      </p>
                    </Link>
                  </div>
                </div>
                <div className='mt-12 w-full lg:mt-0 lg:block lg:w-1/2'>
                  <Image
                    src='/images/clickhouse-keeper-hero.svg'
                    alt='ClickHouse Keeper'
                    loading='eager'
                    width={672}
                    height={486}
                    className='h-auto w-full'
                    priority={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-neutral-700 px-4 pb-24 pt-16 text-neutral-0 sm:px-8 md:px-8 2xl:px-0'>
          <div className='container mx-auto flex max-w-5xl flex-col'>
            <Image
              src='/images/coordination-icon.svg'
              width={72}
              height={72}
              alt='Coordination'
              className='mx-auto mb-6'
            />
            <h2 className='mb-6 text-center font-basier text-4xl font-semibold'>
              Coordination without the drawbacks
            </h2>
            <p className='mx-auto mb-8 text-center text-base lg:max-w-3xl'>
              In order to overcome some shortcomings of ZooKeeper, we started
              building a ClickHouse native Keeper from scratch based on our own
              requirements, optimized for usage in ClickHouse.
            </p>
            <div className='grid gap-5 rounded-md border border-primary-300 bg-neutral-900 p-8 md:grid-cols-2 lg:grid-cols-3'>
              {features.map((feature, index: number) => (
                <TickItem key={index}>
                  <h4 className='font-semibold'>{feature.title}</h4>
                </TickItem>
              ))}
            </div>
          </div>
        </div>

        <div className='bg-neutral-750 px-4 pb-24 pt-16 text-neutral-0 sm:px-8 md:px-8 2xl:px-0'>
          <div className='container mx-auto flex max-w-5xl flex-col'>
            <Image
              src='/images/question-icon.svg'
              width={72}
              height={72}
              alt='Coordination'
              className='mx-auto mb-6'
            />
            <h2 className='mb-6 text-center font-basier text-4xl font-semibold'>
              A replacement for ZooKeeper?
            </h2>
            <p className='mx-auto mb-8 text-center text-base lg:max-w-3xl'>
              Keeper is a drop-in replacement for ZooKeeper written in C++, with
              a fully compatible client protocol and the same data model, and
              features these improvements
            </p>
            <div className='mx-auto max-w-3xl'>
              <div className='flex flex-col gap-y-3'>
                {replacements.map((replacement, index: number) => (
                  <div key={index} className='flex items-center gap-4'>
                    <Image
                      src='/images/arrow-right.svg'
                      width={24}
                      height={24}
                      alt='Icon'
                    />
                    <h4>{replacement.title}</h4>
                  </div>
                ))}
              </div>
            </div>
            <div className='pb-24 pt-16'>
              <div className='flex flex-col gap-8 md:flex-row'>
                <div className='rounded-lg bg-primary-300 p-8 pb-12 pt-6 text-black md:w-1/2'>
                  <Image
                    src='/images/icon-checkmark-circle.svg'
                    width={48}
                    height={48}
                    alt='Coordination'
                    className='mx-auto mb-4'
                  />
                  <h2 className='mb-6 text-center font-basier text-2xl font-semibold'>
                    When to use ClickHouse Keeper?
                  </h2>
                  <ul className='ml-10 flex list-disc flex-col gap-y-3'>
                    <li>Most of your request are writes</li>
                    <li>Efficient memory utilization matters</li>
                    <li>Your project isn’t part of the Java ecosystem</li>
                    <li>You are managing a ClickHouse cluster</li>
                  </ul>
                </div>
                <div className='rounded-lg bg-neutral-700 p-8 pt-6 text-white md:w-1/2'>
                  <Image
                    src='/images/icon-delete.svg'
                    width={48}
                    height={48}
                    alt='Coordination'
                    className='mx-auto mb-4'
                  />
                  <h2 className='mb-6 text-center font-basier text-2xl font-semibold'>
                    When NOT to use ClickHouse Keeper?
                  </h2>
                  <ul className='ml-10 flex list-disc flex-col gap-y-3'>
                    <li>Most of your request are reads</li>
                    <li>You require scalability with a read-heavy workload</li>
                    <li>Java-based components are important to you</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-neutral-750'>
          <div className='clip-inverted-triangle'>
            <div className='section-container mx-auto max-w-5xl lg:mt-0'>
              <div className='relative flex flex-col rounded-lg border-t-4 border-neutral-700/80 border-primary-300 bg-neutral-900 text-left text-neutral-0 shadow-lg'>
                <div className='p-16'>
                  <Image
                    src='/images/cpp-raft.svg'
                    width={274}
                    height={88}
                    alt='C++ + RAFT'
                    className='mx-auto mb-6'
                  />
                  <h2 className='mb-6 text-center font-basier text-3xl font-semibold'>
                    Keep your system afloat with RAFT
                  </h2>
                  <div className='mx-auto mt-10 flex flex-col gap-10 md:flex-row md:gap-16'>
                    <div className='md:w-1/2'>
                      <h3 className='mb-4 font-inconsolata text-lg text-primary-300'>
                        ZooKeeper implementation
                      </h3>
                      <p className='text-base'>
                        ZooKeeper is implemented in Java and its coordination
                        algorithm, ZooKeeper Atomic Broadcast (ZAB), doesn't
                        provide linearizability guarantees for reads.
                      </p>
                    </div>
                    <div className='md:w-1/2'>
                      <h3 className='mb-4 font-inconsolata text-lg text-primary-300'>
                        ClickHouse Keeper implementation
                      </h3>
                      <p className='text-base'>
                        Unlike ZooKeeper, ClickHouse Keeper is written in C++
                        and uses the RAFT algorithm implementation. This
                        algorithm allows linearizability for reads and writes,
                        and has several open-source implementations in different
                        languages.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='-mt-2 bg-primary-300 py-8 pb-10'></div>
        <div className='pt-16 md:px-8 2xl:px-0'>
          <GetStarted platforms={platforms} />
        </div>
        <div className='mx-auto max-w-7xl pb-24 text-center text-sm'>
          Apache, Apache ZooKeeper and the ZooKeeper logo are trademarks of the
          Apache Software Foundation.
        </div>
      </Layout>
    </>
  )
}
