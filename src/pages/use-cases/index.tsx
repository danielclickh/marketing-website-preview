import Accordion from '@/components-cleaned/Accordion'
import { CUIButton, CUICard } from '@/components/ClickUI'
import GetStartedFree from '@/components/GetStartedFree'
import Layout from '@/components/Layout'
import LinkWithArrow from '@/components/LinkWithArrow'
import { StrapiImage, StrapiImageUrl } from '@/components/StrapiElements'
import UseCasesComparisons from '@/components/UseCasesComparisons'
import { SuiTitle } from '@/components/sui'
import { findAll, findOne } from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { Quote, useCasesPageDataProps } from '@/types/useCasesPage'
import { ChevronRightIcon } from '@heroicons/react/solid'
import 'glider-js/glider.min.css'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CSSProperties } from 'react'

export const getStaticProps: GetStaticProps<useCasesPageDataProps> =
  async function getStaticProps() {
    const useCasesPageData = await findOne('use-case-feature', {
      populate: ['ctaButton', 'Industries', 'Industries.icon']
    })

    const individualUseCasesParams = {
      sort: ['id:ASC'],
      populate: [
        'description',
        'shortDescription',
        'ClientsUsingUseCase',
        'ClientsUsingUseCase.*',
        'ClientsUsingUseCase.logo.*',
        'icon'
      ]
    }
    const { data: individualUseCases } = await findAll(
      'individual-use-cases',
      individualUseCasesParams
    )

    const quotesParams = {
      sort: ['id:DESC'],
      populate: ['quotes', 'quotes.*', 'quotes.logo.*', 'id']
    }
    const { data: quotes } = await findAll('use-case-quotes', quotesParams)

    const firstThreeIds = [3, 14, 9] // Specify the IDs you want to keep at the beginning
    quotes.sort((a, b) => {
      const aIndex = firstThreeIds.indexOf(a.id)
      const bIndex = firstThreeIds.indexOf(b.id)

      // If both elements are in the firstThreeIds array, sort them based on their index
      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex
      }

      // If only one of the elements is in the firstThreeIds array, prioritize it
      if (aIndex !== -1) {
        return -1
      }

      if (bIndex !== -1) {
        return 1
      }

      // If neither element is in the firstThreeIds array, maintain their original order
      return 0
    })

    const commonProps = await getCommonProps()
    return {
      props: {
        useCasesPageData,
        individualUseCases,
        quotes,
        seo: {
          title: `${useCasesPageData.Title} | ClickHouse`,
          description: useCasesPageData.Description,
          path: '/use-cases',
          languages: ['en', 'ja']
        },
        ...commonProps
      }
    }
  }

function UseCasesPage({
  seo,
  headerData,
  footerData,
  useCasesPageData,
  individualUseCases,
  quotes
}: useCasesPageDataProps) {
  useGalaxyOnPage('useCasesPage')

  const useCaseOrder = [2, 5, 7, 9]
  const sortedUseCases = useCaseOrder
    .map((id) => individualUseCases.find((useCase) => useCase.id === id))
    .filter((useCase) => useCase)

  const desiredOrderIds = [18, 9, 5, 7, 8, 17, 21, 4, 19, 10, 11, 12, 13] // IDs in the desired order
  const quotesInDesiredOrder: Array<Quote> = []

  // Iterate through the desired order IDs
  desiredOrderIds.forEach((id) => {
    // Find the quote with the current ID
    const quote = quotes.find((quote) => quote.id === id)
    if (quote) {
      // If the quote exists, push it to the quotesInDesiredOrder array
      quotesInDesiredOrder.push(quote)
    }
  })

  // Now, iterate through the original quotes array and push quotes that are not in the desired order
  quotes.forEach((quote) => {
    if (!desiredOrderIds.includes(quote.id)) {
      quotesInDesiredOrder.push(quote)
    }
  })

  const getUseCaseLink = (useCaseTitle: string | undefined | null) => {
    const map: Record<string, string> = {
      'Data warehousing': '/use-cases/data-warehousing',
      Observability: '/use-cases/observability',
      'Machine learning and GenAI':
        '/use-cases/machine-learning-and-data-science',
      'Real-time analytics': '/use-cases/real-time-analytics'
    }

    return useCaseTitle ? map?.[useCaseTitle] || null : null
  }

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='homepage bg-grid'>
        <div className='relative gap-24 px-8 pb-16 pt-16 md:px-0'>
          <div className='mx-auto max-w-3xl'>
            <div className='mx-auto text-center md:mr-0'>
              <h1 className='mb-6 font-basier text-4xl font-semibold text-neutral-200 md:text-5.5xl md:leading-tight'>
                {useCasesPageData.Title}
              </h1>
              <p className='mx-auto mb-12 max-w-2xl text-xl leading-[175%] text-neutral-200'>
                Unlock faster queries and the ability to handle greater
                concurrency. No&nbsp;matter how much data you’re working with.
              </p>
              <p>
                <a
                  href={useCasesPageData.ctaButton.href}
                  target='_blank'
                  className='inline-block rounded border-primary-300 bg-primary-300 px-8 py-3 font-semibold text-neutral-900 hover:cursor-pointer hover:border-primary-400 hover:bg-primary-400'>
                  {useCasesPageData.ctaButton.text}
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className='clip-inverted-triangle-use-cases'>
          <div className='section-container mt-12 flex max-w-6xl flex-col gap-y-6 lg:mt-0'>
            {sortedUseCases.map((useCase, index) => {
              // Limit the number of logos to a maximum of 6
              const useCaseLogos = (useCase?.ClientsUsingUseCase || []).slice(
                0,
                6
              )
              const totalUseCaseLogos = useCaseLogos.length
              const useCaseLink = getUseCaseLink(useCase?.title)
              return (
                <div key={index}>
                  <CUICard>
                    <CUICard.Body className='rounded-lg bg-neutral-900'>
                      <div className='flex flex-col justify-between gap-x-6 lg:flex-row'>
                        <div className='relative p-6 lg:w-[560px]'>
                          {useCaseLink && (
                            <div className='absolute right-6 lg:right-0'>
                              <CUIButton
                                type='secondary'
                                size='sm'
                                className='group mx-auto'
                                href={useCaseLink}
                                iconRight={
                                  <ChevronRightIcon
                                    height='18'
                                    className='pt-0.5 transition group-hover:translate-x-1/2'
                                  />
                                }>
                                Learn more
                              </CUIButton>
                            </div>
                          )}
                          <div className='flex flex-col items-start justify-center gap-4'>
                            <div className='mb-1 flex flex-col gap-y-2 font-inconsolata text-base font-medium text-primary-300'>
                              {useCase?.icon && (
                                <StrapiImage {...useCase.icon} />
                              )}
                            </div>
                            <div className='font-basier text-xl font-medium leading-tight text-neutral-100'>
                              {useCase?.title}
                            </div>
                            <div className='text-neutral-20 whitespace-pre-wrap text-sm'>
                              {useCase?.description}
                            </div>
                          </div>
                        </div>
                        <div
                          className={`-mb-px grid w-full border-t border-t-[#464641] lg:w-[590px] lg:border-t-0 ${
                            totalUseCaseLogos > 3
                              ? 'grid-cols-2 grid-rows-3'
                              : 'grid-cols-2 grid-rows-2'
                          }`}>
                          {useCaseLogos.map((client, index) => {
                            const position = index + 1
                            let cellClasses: string[] = []

                            // 6 items
                            if (totalUseCaseLogos >= 6) {
                              if (position === 2) {
                                cellClasses.push('lg:rounded-tr-lg')
                              }

                              if (position === 5) {
                                cellClasses.push(
                                  'rounded-bl-lg lg:rounded-bl-none'
                                )
                              }

                              if (position === 6) {
                                cellClasses.push('rounded-br-lg')
                              }
                            }

                            // 5 items
                            else if (totalUseCaseLogos === 5) {
                              if (position === 2) {
                                cellClasses.push('lg:rounded-tr-lg')
                              }

                              if (position === 5) {
                                cellClasses.push(
                                  'rounded-b-lg col-span-full lg:rounded-bl-none'
                                )
                              }
                            }

                            // 4 items
                            else if (totalUseCaseLogos === 4) {
                              if (position === 2) {
                                cellClasses.push('lg:rounded-tr-lg row-span-2')
                              }

                              if (position === 4) {
                                cellClasses.push(
                                  'rounded-b-lg col-span-full lg:rounded-bl-none'
                                )
                              }
                            }

                            // 3 items
                            else if (totalUseCaseLogos === 3) {
                              if (position === 2) {
                                cellClasses.push('lg:rounded-tr-lg')
                              }

                              if (position === 3) {
                                cellClasses.push(
                                  'rounded-b-lg col-span-full lg:rounded-bl-none'
                                )
                              }
                            }

                            // 2 items
                            else if (totalUseCaseLogos === 2) {
                              if (position === 1) {
                                cellClasses.push(
                                  'row-span-full rounded-bl-lg lg:rounded-bl-none'
                                )
                              }

                              if (position === 2) {
                                cellClasses.push(
                                  'row-span-full rounded-br-lg lg:rounded-tr-lg'
                                )
                              }
                            }

                            // 1 item
                            else if (totalUseCaseLogos === 1) {
                              cellClasses.push(
                                'row-span-full col-span-full rounded-b-lg lg:rounded-bl-none lg:rounded-tr-lg'
                              )
                            }

                            return (
                              <div
                                key={index}
                                className={`min-h-[86px] w-full border-b border-l border-[#464641] ring-inset transition-all hover:z-10 hover:bg-white/10 hover:ring-[1px] hover:ring-primary-300 ${cellClasses.join(
                                  ' '
                                )}`}>
                                <Link
                                  href={client.href}
                                  className='mx-auto flex min-h-full w-full brightness-0 invert hover:brightness-100 hover:invert-0'>
                                  <StrapiImage
                                    {...client.logo}
                                    className={`${
                                      client.clientName === 'Lyft'
                                        ? 'max-w-[60px] lg:max-h-[44px]'
                                        : client.clientName === 'Contentsquare'
                                          ? 'max-w-[140px] lg:max-w-[160px]'
                                          : client.clientName === 'Highlight.io'
                                            ? 'max-w-[120px] lg:max-w-[160px]'
                                            : client.clientName ===
                                                'Deutsche Bank'
                                              ? 'max-w-[150px] lg:max-w-[200px]'
                                              : client.clientName ===
                                                  'QuickCheck'
                                                ? 'max-w-[150px] lg:max-w-[210px]'
                                                : client.clientName ===
                                                    'Darwinium'
                                                  ? 'max-w-[140px] lg:max-w-[160px]'
                                                  : client.clientName ===
                                                      'RunReveal'
                                                    ? 'max-w-[140px] lg:max-w-[150px]'
                                                    : 'max-h-[64px] max-w-[120px] lg:max-w-[120px]'
                                    } m-auto object-scale-down`}
                                  />
                                </Link>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </CUICard.Body>
                  </CUICard>
                </div>
              )
            })}
            <div className='bg-primary-300 pb-24'></div>
          </div>
        </div>
      </div>

      <UseCasesComparisons />

      <div className='mx-auto max-w-7xl px-4 py-24 md:px-8 2xl:px-0'>
        <div className='gap-6 md:columns-2 lg:columns-3'>
          {quotesInDesiredOrder.map((quote, index) => (
            <div key={index}>
              {quote.quotes.href ? (
                <Link
                  href={quote.quotes.href}
                  target={quote.quotes.href.startsWith('http') ? '_blank' : ''}
                  rel={
                    quote.quotes.href.startsWith('http')
                      ? 'noopener noreferrer'
                      : ''
                  }>
                  <div
                    key={index}
                    className='logos-color-swap animate-fade-in mb-6 w-full break-inside-avoid rounded-lg border border-neutral-700/80 bg-neutral-900/50 object-cover p-4 shadow-card hover:bg-neutral-750'>
                    <Image
                      src='/images/Quote.svg'
                      width={37}
                      height={28}
                      alt='Quote'
                      className='mb-4 block'
                    />
                    <p className='mb-4 pt-1 font-normal text-white'>
                      {quote.quotes.quote}
                    </p>
                    <div>
                      <StrapiImage
                        {...quote.quotes.logo}
                        className='color-swap h-16'
                      />
                    </div>
                  </div>
                </Link>
              ) : (
                <div
                  key={index}
                  className='logos-color-swap animate-fade-in mb-3 w-full break-inside-avoid rounded-lg border border-neutral-700/80 bg-neutral-900/50 object-cover shadow-card hover:bg-neutral-750'>
                  <div>
                    <StrapiImage
                      {...quote.quotes.logo}
                      className='color-swap h-16'
                    />
                  </div>
                  <p className='px-4 pb-6 pt-3 text-sm font-normal text-white'>
                    "{quote.quotes.quote}"
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div
        className='bg-shadow-element yellow-shadow align-shadow-right bg-neutral-900'
        id='industries'>
        <div className='mx-auto max-w-7xl px-4 py-20 md:px-8 2xl:px-0'>
          <div
            className='bg-shadow-element relative mx-auto mb-20 max-w-7xl items-center px-4 md:px-8 lg:flex lg:justify-between lg:gap-x-12 2xl:px-0'
            style={
              {
                '--top-side': '224px'
              } as CSSProperties
            }>
            <div className='space-y-4 pb-10 text-center lg:text-left'>
              <Image
                src='/images/industries-icon.svg'
                alt='Industries Icon'
                width={72}
                height={72}
                className='mx-auto lg:mx-0'
              />
              <SuiTitle type='h2'>Industries</SuiTitle>
              <p className='mx-auto max-w-md text-neutral-200'>
                Learn how leading companies use ClickHouse for real-time
                analytics, machine learning, data warehousing, and observability
                across key industries.
              </p>
              <p>
                <LinkWithArrow
                  href='/industries'
                  className='font-bold text-primary-300'>
                  Explore industries
                </LinkWithArrow>
              </p>
            </div>
            <Accordion
              className='mx-auto w-full max-w-2xl lg:mr-0'
              numbered={false}
              items={useCasesPageData.Industries.map((industry) => {
                return {
                  handle: industry.name,
                  prefix: (
                    <StrapiImageUrl
                      {...industry.icon}
                      alt={industry.name}
                      width={32}
                      height={32}
                      className='-my-1'
                    />
                  ),
                  content: (
                    <p>
                      {industry.description}
                      {industry.href && (
                        <>
                          <br />
                          <LinkWithArrow
                            href={industry.href}
                            className='mt-3 inline-block whitespace-nowrap text-primary-300 hover:underline'>
                            Find out more
                          </LinkWithArrow>
                        </>
                      )}
                    </p>
                  )
                }
              })}
            />
          </div>

          <GetStartedFree href='https://console.clickhouse.cloud/signUp?loc=use-cases-get-started-footer' />
        </div>
      </div>
    </Layout>
  )
}

export default UseCasesPage
