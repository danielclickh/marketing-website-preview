import { ExternalLinkIcon } from '@heroicons/react/outline'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { CSSProperties, useEffect, useRef, useState } from 'react'
import { CUIButton, CUICard, CUILink } from '../../components/ClickUI'
import { SuiCodeblock, SuiText, SuiTitle } from '../../components/sui'
import { getCommonProps } from '../../lib/utils/getCommonProps'
import { CommonProps } from '../../types/homepage'
import Layout from '../../components/Layout'
import Image, { ImageProps } from 'next/image'

import iconBook from './icon-book-open-text.svg'
import iconFile from './icon-file-py.svg'
import iconList from './icon-list-magnifying-glass.svg'

import logoBun from './logo-bun.svg'
import logoGo from './logo-go.svg'
import logoNode from './logo-node.svg'
import logoPython from './logo-python.svg'
import logoRust from './logo-rust.svg'

import imageHero from './hero.svg'
import imageDbEngineCli from './db-engine-cli.svg'
import imageDbEngineConnection from './db-engine-connection.svg'
import imageDbEngineProcess from './db-engine-process.svg'
import imageEmbedded from './embedded.svg'
import imageInputOutput from './input-output.svg'
import imageMinimizedCopying from './minimized-copying.svg'

import imageSampleQuery from './sample-query.svg'

import graphPanel from './graph-panel.svg'
import graphLinesChdb from './graph-lines-chdb.svg'
import graphLinesDuckdb from './graph-lines-duckdb.svg'
import graphLinesPandas from './graph-lines-pandas.svg'
import graphLinesPolars from './graph-lines-polars.svg'
import { galaxyOnPage, galaxyOnClick } from '../../lib/galaxy/galaxy'

export const getStaticProps: GetStaticProps<CommonProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()
    return {
      props: {
        seo: {
          title: 'chDB - a fast, reliable, and scalable in-process database',
          description:
            'Experience the power of ClickHouse, in-process. With unparalleled performance, reliability, and scalability for any data-intensive application.',
          path: '/chdb',
          image: [{ url: '/images/chdb-social.png' }]
        },
        ...commonProps
      }
    }
  }

export default function ChdbPage({ headerData, footerData, seo }: CommonProps) {
  galaxyOnPage('chdbPage')

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      {/* Hero */}
      <div className='relative my-10 lg:mb-20'>
        <div className='absolute bottom-0 left-0 z-0 aspect-[1512/524] w-full bg-contain bg-center bg-no-repeat lg:bg-speed-lines' />
        <div className='section-container relative z-10 lg:py-20'>
          <div className='flex flex-col items-center gap-10 lg:flex-row'>
            <div className='flex-1 space-y-6'>
              <SuiTitle type='h1' className='lg:!text-5xl'>
                chDB - fast, reliable, and scalable in-process database
              </SuiTitle>
              <SuiText className='text-balance'>
                Experience the power of ClickHouse, in-process. With
                unparalleled performance, reliability, and scalability for any
                data-intensive application.
              </SuiText>
              <TickItem>Blazing fast SQL engine</TickItem>
              <TickItem>Seamless data integration</TickItem>
              <TickItem>Supports 80+ data formats</TickItem>
              <CUIButton
                type='primary'
                size='lg'
                weight='semibold'
                className='mt-6 !px-8'
                href='https://github.com/chdb-io/chdb'
                target='_blank'
                onClick={galaxyOnClick('chdbPage.heroCta.tryItSelect')}>
                Try it today
              </CUIButton>
            </div>
            <div className='hidden flex-shrink-0 flex-grow-0 lg:block lg:w-1/2 xl:w-auto'>
              <Image src={imageHero} width={573} height={344} alt='hero' />
            </div>
          </div>
        </div>
      </div>

      {/* Ecosystem */}
      <div className='bg-neutral-725 py-20'>
        <div className='section-container'>
          <div className='mx-auto mb-10 max-w-3xl space-y-6 text-center'>
            <SuiTitle type='h2'>chDB and the ClickHouse ecosystem</SuiTitle>
            <SuiText className='opacity-70'>
              Whether you're developing locally, running in-process analytics
              embedded in your app, or scaling production workloads, ClickHouse
              has you covered.
            </SuiText>
          </div>
          <div className='mx-auto grid max-w-4xl grid-cols-1 lg:grid-cols-3'>
            <div>
              <Image
                src={imageDbEngineConnection}
                width={271}
                height={168}
                alt=''
                className='mx-auto aspect-[4/3] w-full max-w-72 object-scale-down object-center'
              />
              <SuiText size='lg' className='text-center font-mono'>
                ClickHouse
              </SuiText>
            </div>
            <div>
              <Image
                src={imageDbEngineProcess}
                width={253}
                height={177}
                alt=''
                className='mx-auto aspect-[4/3] w-full max-w-72 object-scale-down object-center'
              />
              <SuiText size='lg' className='text-center font-mono'>
                chDB: ClickHouse In-Process
              </SuiText>
            </div>
            <div>
              <Image
                src={imageDbEngineCli}
                width={231}
                height={155}
                alt=''
                className='mx-auto aspect-[4/3] w-full max-w-72 object-scale-down object-center'
              />
              <SuiText size='lg' className='text-center font-mono'>
                ClickHouse Local
              </SuiText>
            </div>
          </div>
        </div>
      </div>

      {/* Install */}
      <div className='section-container my-20'>
        <div className='rounded-xl border border-neutral-700/80 bg-neutral-900/50 bg-click-grid bg-[length:547px_360px] bg-right bg-no-repeat p-6 md:p-10 lg:p-12 xl:p-16'>
          <div className='flex flex-col text-center'>
            <SuiTitle type='h2' color='white'>
              Start using{' '}
              <span className='tilted tilted-yellow'>
                <span className='tilted-content'>chDB</span>
              </span>{' '}
              in minutes
            </SuiTitle>
            <div className='mt-6 text-center text-neutral-300'>
              Install chDB for macOS and Linux
            </div>
          </div>
          <div className='relative mx-auto mt-8 w-full max-w-4xl space-y-4'>
            <SuiCodeblock
              className='show-copy-paste overflow-auto text-wrap'
              galaxyEvent='chdbPage.startUsingChdb.pipInstallCopy'>
              <>
                pip install <span className='text-primary-300'>chdb</span>
              </>
            </SuiCodeblock>
            <SuiCodeblock
              className='show-copy-paste overflow-auto text-wrap'
              galaxyEvent='chdbPage.startUsingChdb.sampleQueryCopy'>
              <>
                query = "
                <span className='text-[#90BDF2]'>
                  select count() FROM
                  s3('s3://datasets-documentation/hackernews/hacknernews.json.gz')
                </span>
                "<br />
                chdb.query(query,
                <span className='text-[#90BDF2]'>'DataFrame'</span>)
              </>
            </SuiCodeblock>
            <Image
              src={imageSampleQuery}
              width={185}
              height={32}
              alt='Sample Query'
              className='pointer-events-none absolute -right-6 bottom-0 -rotate-[14deg]'
            />
          </div>
        </div>
      </div>

      {/* Bindings */}
      <div className='border-t-2 border-primary-300 bg-neutral-725 py-20'>
        <div className='section-container'>
          <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
            <IconCard
              icon={{
                src: iconBook,
                width: 32,
                height: 33,
                alt: 'Book icon'
              }}>
              <SuiTitle type='h3' className='!text-2xl'>
                Open-source
                <br />
                library
              </SuiTitle>
              <SuiText size='sm' className='text-balance opacity-70'>
                chDB is an open-source library, allowing you to customize and
                extend your database to fit your needs. Benefit from a vibrant
                community that keeps you updated with the latest innovations and
                security practices.
              </SuiText>
            </IconCard>
            <IconCard
              icon={{
                src: iconList,
                width: 32,
                height: 33,
                alt: 'List icon'
              }}>
              <SuiTitle type='h3' className='!text-2xl'>
                Query objects
                <br />
                directly
              </SuiTitle>
              <SuiText size='sm' className='text-balance opacity-70'>
                With chDB, you can query native objects in the programming
                language of choice directly. This direct access reduces latency
                and simplifies data processing, enabling faster operations.
              </SuiText>
            </IconCard>
            <IconCard
              icon={{
                src: iconFile,
                width: 32,
                height: 33,
                alt: 'File icon'
              }}>
              <SuiTitle type='h3' className='!text-2xl'>
                Supports Python
                <br />
                DB API 2.0
              </SuiTitle>
              <SuiText size='sm' className='text-balance opacity-70'>
                chDB supports Python DB API 2.0, ensuring seamless integration
                with your Python applications. Enjoy consistency, reliability,
                and ease of use with familiar libraries and tools.
              </SuiText>
            </IconCard>
          </div>
          <div className='mt-20'>
            <SuiText size='sm' className='mb-8 text-center opacity-70'>
              chDB supports bindings for many programming languages, including:
            </SuiText>
            <div className='flex flex-wrap items-center justify-center gap-x-12 gap-y-8'>
              <Image src={logoBun} width={56} height={50} alt='Bun' />
              <Image src={logoNode} width={81} height={50} alt='node' />
              <Image src={logoRust} width={96} height={37} alt='Rust' />
              <Image src={logoGo} width={73} height={28} alt='GO' />
              <Image src={logoPython} width={50} height={51} alt='Python' />
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div
        className='bg-shadow-element yellow-shadow shadow-circle my-24 lg:my-48'
        style={
          {
            '--top-side': '0',
            '--right-side': '50%',
            '--left-side': 'auto'
          } as CSSProperties
        }>
        <div className='section-container space-y-24 lg:space-y-48'>
          <FeatureSection
            image={{
              src: imageEmbedded,
              width: 435,
              height: 230,
              alt: 'Embedded'
            }}>
            <SuiTitle type='h3' className='mb-8 !text-4xl' weight='semibold'>
              Embedded. No need to install or run ClickHouse services
            </SuiTitle>
            <TickItem>Streamline deployment with no additional setup</TickItem>
            <TickItem>Reduce system complexity and resource usage</TickItem>
            <TickItem>Ideal for lightweight and embedded applications</TickItem>
          </FeatureSection>
          <FeatureSection
            flip={true}
            image={{
              src: imageMinimizedCopying,
              width: 400,
              height: 194,
              alt: 'Minimized Copying'
            }}>
            <SuiTitle type='h3' className='mb-8 !text-4xl' weight='semibold'>
              Minimized data copying from
              <br /> C++ to Python
            </SuiTitle>
            <TickItem>Enhance performance with direct memory access</TickItem>
            <TickItem>Reduce overhead and latency in data processing</TickItem>
            <TickItem>Achieve faster data handling and analysis</TickItem>
          </FeatureSection>
          <FeatureSection
            image={{
              src: imageInputOutput,
              width: 357,
              height: 160,
              alt: 'Input Output'
            }}>
            <SuiTitle type='h3' className='mb-8 !text-4xl' weight='semibold'>
              Input and output support
              <br /> Parquet, CSV, JSON, Arrow,
              <br /> ORC and 80+ more formats
            </SuiTitle>
            <TickItem>Easily integrate with diverse data sources</TickItem>
            <TickItem>Simplify data interchange and interoperability</TickItem>
            <TickItem>
              Ensure compatibility with a wide range of data formats
            </TickItem>
          </FeatureSection>
        </div>
      </div>

      <div className='section-container my-24 lg:my-48'>
        <div className='mx-auto max-w-3xl space-y-6 text-center'>
          <SuiTitle type='h2'>
            chDB regularly outperforms DuckDB,
            <br className='hidden lg:block' /> Pandas, and Polars in benchmark
            queries
          </SuiTitle>
          <SuiText className='opacity-70'>
            With chDB, you have the benefit of ClickHouse's blazing speed,
            in-process.
          </SuiText>
        </div>
        <BenchmarkGraph />
        <div>
          <SuiText className='text-center'>
            For more details, check out our{' '}
            <Link
              href='https://benchmark.clickhouse.com/'
              target='_blank'
              className='text-primary-300 hover:underline'
              onClick={galaxyOnClick(
                'chdbPage.comparionsTable.benchmarkSelect'
              )}>
              full benchmark results
            </Link>
            .
          </SuiText>
        </div>
      </div>

      {/* FAQs */}
      <div
        className='bg-shadow-element relative mx-auto mb-20 max-w-7xl px-4 md:px-8 lg:flex lg:items-center lg:justify-between lg:gap-x-12 2xl:px-0'
        style={
          {
            '--top-side': '224px'
          } as CSSProperties
        }>
        <div className='pb-10 text-center lg:text-left'>
          <Image
            src='/faq-icon.svg'
            alt='FAQ Icon'
            width={72}
            height={72}
            className='mx-auto lg:mx-0'
          />
          <SuiTitle type='h2' className='my-6'>
            What is chDB used for?
          </SuiTitle>
          <div className='mx-auto max-w-md text-neutral-200'>
            Wherever you need us, we’re there. We love to engage in thoughtful
            conversation with the ClickHouse community and are always on-hand to
            answer your questions.
          </div>
          <CUILink
            href='/slack'
            target='_self'
            className='mt-6 flex items-center justify-center gap-4 text-primary lg:justify-start'>
            <span>Ask us anything</span>{' '}
            <ExternalLinkIcon className='h-4 w-4' />
          </CUILink>
        </div>
        <div className='flex w-full flex-col gap-6 rounded-2xl lg:max-w-screen-sm'>
          <FaqAccordion
            number='01'
            question='Testing your queries in CI without having to spin up a CH server'
          />
          <FaqAccordion
            number='02'
            question='Building self-contained prototypes/PoCs'
          />
          <FaqAccordion
            number='03'
            question='Jupyter notebooks without a CH Server running'
          />
        </div>
      </div>

      {/* Get started */}
      <div className='section-container pb-16 md:px-8 2xl:px-0'>
        <div className='space-y-6 rounded-lg bg-primary-300 px-4 py-16 text-center'>
          <SuiTitle type='h2' color='text-default'>
            Looking for a hosted solution?
            <br />
            Get started with ClickHouse Cloud
          </SuiTitle>
          <SuiText size='base' color='text-default' weight='normal'>
            30 day free trial and $300 in credits to spend at your own pace.
          </SuiText>
          <CUIButton
            type='primary-dark'
            size='lg'
            className='group mx-auto mt-8'
            target='_blank'
            href='https://clickhouse.cloud/signUp?loc=chdbPageFooterCta'
            onClick={galaxyOnClick(
              'chdbPage.footerCta.createFreeAccountSelect'
            )}>
            Create a free account
          </CUIButton>
        </div>
      </div>
    </Layout>
  )
}

function Checkbox({
  color,
  checked = false,
  onChange = (checked) => {},
  children
}: {
  color: CSSProperties['backgroundColor']
  checked: boolean
  onChange: (checked: boolean) => void
  children: React.ReactNode
}) {
  const mountedRef = useRef<boolean>(false)
  const [isChecked, setIsChecked] = useState<boolean>(checked)

  useEffect(() => {
    if (mountedRef.current) {
      onChange(isChecked)
    }
  }, [isChecked])

  useEffect(() => {
    mountedRef.current = true
  }, [])
  return (
    <button
      className='group/checkbox flex items-center gap-4'
      onClick={() => setIsChecked((old) => !old)}>
      <span
        className='relative aspect-square w-6 flex-shrink-0 flex-grow-0'
        style={{ backgroundColor: color }}>
        <span
          className={`absolute inset-1 flex items-center justify-center rounded border transition-colors ${
            isChecked ? 'border-black bg-black' : 'border-[#B3B6BD] bg-white'
          }`}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='8'
            height='7'
            fill='none'
            viewBox='0 0 8 7'>
            <path
              stroke='#fff'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M6.67 1.8 3 5.48 1.33 3.81'
            />
          </svg>
        </span>
      </span>
      <span className='-my-0.5 -ml-2 rounded px-2 py-0.5 transition-colors group-hover/checkbox:bg-white/10'>
        {children}
      </span>
    </button>
  )
}

function BenchmarkGraph() {
  const [isChdb, setIsChdb] = useState(true)
  const [isDuckdb, setIsDuckdb] = useState(false)
  const [isPandas, setIsPandas] = useState(true)
  const [isPolars, setIsPolars] = useState(false)
  return (
    <div className='relative mx-auto my-6 max-w-[1080px]'>
      <div className='z-20 mb-6 flex flex-wrap justify-center gap-4 lg:absolute lg:-top-8 lg:right-6 lg:block lg:space-y-3'>
        <Checkbox
          color='#FCFF74'
          checked={isChdb}
          onChange={(val) => {
            setIsChdb(val)
            if (val) {
              galaxyOnClick('chdbPage.comparionsTable.chdbCheck')()
            } else {
              galaxyOnClick('chdbPage.comparionsTable.chdbUncheck')()
            }
          }}>
          chDB
        </Checkbox>
        <Checkbox
          color='#636EFA'
          checked={isDuckdb}
          onChange={(val) => {
            setIsDuckdb(val)
            if (val) {
              galaxyOnClick('chdbPage.comparionsTable.duckDbCheck')()
            } else {
              galaxyOnClick('chdbPage.comparionsTable.duckDbUncheck')()
            }
          }}>
          DuckDB
        </Checkbox>
        <Checkbox
          color='#00CC96'
          checked={isPandas}
          onChange={(val) => {
            setIsPandas(val)
            if (val) {
              galaxyOnClick('chdbPage.comparionsTable.pandasCheck')()
            } else {
              galaxyOnClick('chdbPage.comparionsTable.pandasUncheck')()
            }
          }}>
          Pandas
        </Checkbox>
        <Checkbox
          color='#AB63FA'
          checked={isPolars}
          onChange={(val) => {
            setIsPolars(val)
            if (val) {
              galaxyOnClick('chdbPage.comparionsTable.polarsCheck')()
            } else {
              galaxyOnClick('chdbPage.comparionsTable.polarsUncheck')()
            }
          }}>
          Polars
        </Checkbox>
      </div>
      <div className='relative aspect-[1080/408]'>
        <Image
          src={graphPanel}
          width={1080}
          height={408}
          alt='Graph panel'
          className='absolute inset-0'
        />
        <Image
          src={graphLinesChdb}
          width={926}
          height={197}
          alt='Graph chDB'
          className={`absolute bottom-[10.75%] left-[9.97%] h-[48.28%] w-[85.74%] object-cover transition-all ${
            !isChdb ? '!h-0' : ''
          }`}
        />
        <Image
          src={graphLinesDuckdb}
          width={926}
          height={203}
          alt='Graph DuckDB'
          className={`absolute bottom-[10.75%] left-[10.27%] h-[49.75%] w-[85.74%] object-cover transition-all ${
            !isDuckdb ? '!h-0' : ''
          }`}
        />
        <Image
          src={graphLinesPandas}
          width={926}
          height={286}
          alt='Graph Pandas'
          className={`absolute bottom-[10.75%] left-[10.64%] h-[70.09%] w-[85.74%] object-cover transition-all ${
            !isPandas ? '!h-0' : ''
          }`}
        />
        <Image
          src={graphLinesPolars}
          width={926}
          height={272}
          alt='Graph Polars'
          className={`absolute bottom-[10.75%] left-[11.01%] h-[66.66%] w-[85.74%] object-cover transition-all ${
            !isPolars ? '!h-0' : ''
          }`}
        />
      </div>
    </div>
  )
}

function FaqAccordion({
  number,
  question,
  children,
  open = false
}: {
  number: string | number
  question?: string | React.ReactNode
  children?: React.ReactNode
  open?: boolean
}) {
  const [isOpen, setIsOpen] = useState(open)
  return (
    <div className='relative rounded border border-jet bg-neutral-900/50 transition-colors hover:bg-neutral-750 hover:bg-opacity-40'>
      <div
        className={`text-md flex w-full px-6 py-4 text-left transition-colors ${
          isOpen ? 'text-white' : 'text-white/80 hover:text-white'
        }`}
        onClick={() => setIsOpen((old) => !old)}>
        <span className='-ml-6 mr-6 flex w-12 flex-shrink-0 flex-grow-0 items-center justify-center self-stretch border-r border-neutral-700/80 text-center text-neutral-300/60'>
          <span>{number}</span>
        </span>
        <span className='flex-1'>{question}</span>
        {children && (
          <span className='relative my-auto ml-auto block h-4 w-4 flex-shrink-0 flex-grow-0'>
            <span
              className={`absolute left-0 top-1/2 block h-0.5 w-full -translate-y-1/2 rounded bg-white transition-all duration-300 ${
                isOpen ? '-rotate-90 opacity-0' : ''
              }`}></span>
            <span
              className={`absolute left-0 top-1/2 block h-0.5 w-full -translate-y-1/2 rounded bg-white transition-all duration-300 ${
                isOpen ? '' : 'rotate-90'
              }`}></span>
          </span>
        )}
      </div>
      {children && (
        <div className='-ml-px'>
          <div
            className={`-mt-4 mb-4 ml-12 border-l border-neutral-700/80 px-6 pt-4 text-sm text-neutral-200 ${
              isOpen ? 'block' : 'hidden'
            }`}>
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

function IconCard({
  icon,
  children
}: {
  icon: ImageProps
  children: React.ReactNode
}) {
  return (
    <CUICard className='relative space-y-4 overflow-hidden p-8 text-center lg:p-14'>
      <div className='absolute left-0 right-0 top-0 h-1 bg-primary-300' />
      <Image
        {...icon}
        className='mx-auto aspect-square w-[72px] rounded border border-jet bg-black/40 object-scale-down object-center shadow-sm'
      />
      {children}
    </CUICard>
  )
}

function FeatureSection({
  image,
  children,
  flip = false
}: {
  image: ImageProps
  children: React.ReactNode
  flip?: boolean
}) {
  return (
    <div
      className={`flex flex-col items-center gap-x-24 ${
        flip ? 'md:flex-row-reverse' : 'md:flex-row'
      } justify-center`}>
      <div className='mb-12 flex flex-col md:mb-0 md:w-1/2 md:text-left'>
        <div className='space-y-4 border-yellow-200 md:border-l-4 md:pl-8'>
          {children}
        </div>
      </div>
      <div className='flex items-center justify-center md:w-1/2'>
        <Image {...image} />
      </div>
    </div>
  )
}

function TickItem({
  children,
  className = ''
}: {
  children: React.ReactNode
  className?: React.HTMLProps<HTMLDivElement>['className']
}) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className='flex-shrink-0 flex-grow-0'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='25'
          height='18'
          fill='none'
          viewBox='0 0 25 18'>
          <path
            stroke='#FCFF74'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M23.32 1.67 8.65 16.33 2 9.67'
          />
        </svg>
      </div>
      <div className='flex-1'>{children}</div>
    </div>
  )
}
