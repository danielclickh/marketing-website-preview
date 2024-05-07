import { CirclePlay } from 'lucide-react'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { findOne } from '../../lib/api/strapi'
import { galaxyOnPage } from '../../lib/galaxy/galaxy'
import { getCommonProps } from '../../lib/utils/getCommonProps'
import { UseCaseCategory, UserStoriesPage } from '../../types/userStories'
import { useRouter } from 'next/router'
import { useSearchParams } from 'next/navigation'
import { PrimeReactProvider } from 'primereact/api'
import { MultiSelect } from 'primereact/multiselect'
import { classNames } from '../../lib/utils/classNames'
import Tailwind from 'primereact/passthrough/tailwind'

const TRANSITIONS = {
  overlay: {
    timeout: 150,
    classNames: {
      enter: 'opacity-0 scale-75',
      enterActive:
        'opacity-100 !scale-100 transition-transform transition-opacity duration-150 ease-in',
      exit: 'opacity-100',
      exitActive: '!opacity-0 transition-opacity duration-150 ease-linear'
    }
  }
}

const Tailwinda = {
  multiselect: {
    root: ({ props }: { props: any }) => ({
      className: classNames(
        'inline-flex cursor-pointer select-none',
        'bg-white dark:bg-gray-900 border border-gray-400 dark:border-blue-900/40  transition-colors duration-200 ease-in-out rounded-md',
        'w-full md:w-80',
        {
          'opacity-60 select-none pointer-events-none cursor-default':
            props.disabled
        }
      )
    }),
    labelContainer: 'overflow-hidden flex flex-auto cursor-pointer',
    label: ({ props }: { props: any }) => ({
      className: classNames(
        'block overflow-hidden whitespace-nowrap cursor-pointer overflow-ellipsis',
        'text-gray-800 dark:text-white/80',
        'p-3 transition duration-200',
        {
          '!p-3':
            props.display !== 'chip' &&
            (props.value == null || props.value == undefined),
          '!py-1.5 px-3': props.display === 'chip' && props.value !== null
        }
      )
    }),
    token: {
      className: classNames(
        'py-1 px-2 mr-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white/80 rounded-full',
        'cursor-default inline-flex items-center'
      )
    },
    removeTokenIcon: 'ml-2',
    trigger: {
      className: classNames(
        'flex items-center justify-center shrink-0',
        'bg-transparent text-gray-600 dark:text-white/70 w-12 rounded-tr-lg rounded-br-lg'
      )
    },
    panel: {
      className: classNames(
        'bg-white dark:bg-gray-900 text-gray-700 dark:text-white/80 border-0 rounded-md shadow-lg'
      )
    },
    header: {
      className: classNames(
        'p-3 border-b border-gray-300 dark:border-blue-900/40 text-gray-700 dark:text-white/80 bg-gray-100 dark:bg-gray-800 rounded-t-lg',
        'flex items-center justify-between'
      )
    },
    headerCheckboxContainer: {
      className: classNames(
        'inline-flex cursor-pointer select-none align-bottom relative',
        'mr-2',
        'w-6 h-6'
      )
    },
    headerCheckbox: {
      root: ({ props }: { props: any }) => ({
        className: classNames(
          'flex items-center justify-center',
          'border-2 w-6 h-6 text-gray-600 dark:text-white/70 rounded-lg transition-colors duration-200',
          'hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]',
          {
            'border-gray-300 dark:border-blue-900/40 bg-white dark:bg-gray-900':
              !props?.checked,
            'border-blue-500 bg-blue-500': props?.checked
          }
        )
      })
    },
    headerCheckboxIcon:
      'w-4 h-4 transition-all duration-200 text-white text-base',
    closeButton: {
      className: classNames(
        'flex items-center justify-center overflow-hidden relative',
        'w-8 h-8 text-gray-500 dark:text-white/70 border-0 bg-transparent rounded-full transition duration-200 ease-in-out mr-2 last:mr-0',
        'hover:text-gray-700 dark:hover:text-white/80 hover:border-transparent hover:bg-gray-200 dark:hover:bg-gray-800/80 ',
        'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]'
      )
    },
    closeIcon: 'w-4 h-4 inline-block',
    wrapper: {
      className: classNames(
        'max-h-[200px] overflow-auto',
        'bg-white text-gray-700 border-0 rounded-md shadow-lg',
        'dark:bg-gray-900 dark:text-white/80'
      )
    },
    list: 'py-3 list-none m-0',
    item: ({ context }: { context: any }) => ({
      className: classNames(
        'cursor-pointer font-normal overflow-hidden relative whitespace-nowrap',
        'm-0 p-3 border-0  transition-shadow duration-200 rounded-none',
        {
          'text-gray-700 hover:text-gray-700 hover:bg-gray-200 dark:text-white/80 dark:hover:bg-gray-800':
            !context.focused && !context.selected,
          'bg-gray-300 text-gray-700 dark:text-white/80 dark:bg-gray-800/90 hover:text-gray-700 hover:bg-gray-200 dark:text-white/80 dark:hover:bg-gray-800':
            context.focused && !context.selected,
          'bg-blue-100 text-blue-700 dark:bg-blue-400 dark:text-white/80':
            context.focused && context.selected,
          'bg-blue-50 text-blue-700 dark:bg-blue-300 dark:text-white/80':
            !context.focused && context.selected
        }
      )
    }),
    checkboxContainer: {
      className: classNames(
        'inline-flex cursor-pointer select-none align-bottom relative',
        'mr-2',
        'w-6 h-6'
      )
    },
    checkbox: ({ context }: { context: any }) => ({
      className: classNames(
        'flex items-center justify-center',
        'border-2 w-6 h-6 text-gray-600 dark:text-white/80 rounded-lg transition-colors duration-200',
        'hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]',
        {
          'border-gray-300 dark:border-blue-900/40  bg-white dark:bg-gray-900':
            !context.selected,
          'border-blue-500 bg-blue-500': context.selected
        }
      )
    }),
    checkboxIcon: 'w-4 h-4 transition-all duration-200 text-white text-base',
    itemGroup: {
      className: classNames(
        'm-0 p-3 text-gray-800 bg-white font-bold',
        'dark:bg-gray-900 dark:text-white/80',
        'cursor-auto'
      )
    },
    filterContainer: 'relative',
    filterInput: {
      root: {
        className: classNames(
          'pr-7 -mr-7',
          'w-full',
          'font-sans text-base text-gray-700 bg-white py-3 px-3 border border-gray-300 transition duration-200 rounded-lg appearance-none',
          'dark:bg-gray-900 dark:border-blue-900/40 dark:hover:border-blue-300 dark:text-white/80',
          'hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]'
        )
      }
    },
    filterIcon: '-mt-2 absolute top-1/2',
    clearIcon: 'text-gray-500 right-12 -mt-2 absolute top-1/2',
    transition: TRANSITIONS.overlay
  }
}

export const getStaticProps: GetStaticProps<UserStoriesPage> =
  async function getStaticProps() {
    const result = await findOne('use-case', {
      populate: ['useCaseItems', 'useCaseItems.darkLogoPng', 'seo', 'seo.image']
    })
    result.seo.path = '/user-stories'

    const userStoriesData = await fetch(
      `${process.env.STRAPI_API_URL}/api/user-stories?populate=User.logo,useCase,migrations,vertical`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_KEY}`
        }
      }
    )

    const userStoriesPayload = await userStoriesData.json()
    const userStories = userStoriesPayload.data
    //make highlighted stories come first
    userStories.sort(
      (
        a: { attributes: { highlight: boolean } },
        b: { attributes: { highlight: boolean } }
      ) => {
        if (a.attributes.highlight && !b.attributes.highlight) return -1
        if (!a.attributes.highlight && b.attributes.highlight) return 1
        return 0
      }
    )

    //get use cases
    const useCases = await fetch(
      `${process.env.STRAPI_API_URL}/api/user-stories-use-cases?sort=Name`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_KEY}`
        }
      }
    )
    const useCasesPayload = await useCases.json()

    const UseCaseCategories: UseCaseCategory[] = []

    useCasesPayload.data.forEach((item: any) => {
      UseCaseCategories.push({
        code: item.id,
        name: item.attributes.Name
      })
    })

    const commonProps = await getCommonProps()
    return {
      props: {
        ...result,
        userStories,
        UseCaseCategories,
        ...commonProps
      }
    }
  }

function CustomerStoriesPage({
  seo,
  userStories,
  headerData,
  footerData,
  UseCaseCategories
}: UserStoriesPage) {
  galaxyOnPage('userStoriesPage')
  const router = useRouter()
  const searchParams = useSearchParams()

  const orderByDate = searchParams.get('latest')
    ? searchParams.get('latest') === 'true'
    : true

  const toggleOrderByDate = () => {
    router.push(
      {
        query: {
          ...router.query,
          latest: !orderByDate
        }
      },
      undefined,
      { shallow: true }
    )
  }
  const sortedUserStories = userStories.slice().sort((a, b) => {
    const dateA = new Date(a.attributes.publishedAt)
    const dateB = new Date(b.attributes.publishedAt)

    if (orderByDate) {
      return dateA.getTime() - dateB.getTime() // Ascending order
    } else {
      return dateB.getTime() - dateA.getTime() // Descending order
    }
  })

  const [selectedCities, setSelectedCities] = useState(null)
  const [useCases, setUseCases] = useState<UseCaseCategory[]>()

  useEffect(() => {
    setUseCases(UseCaseCategories)
  }, [UseCaseCategories])

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <PrimeReactProvider
        value={{
          unstyled: true,
          pt: Tailwind
        }}>
        <div className='pt-10'>
          <div className='container mx-auto flex max-w-7xl flex-col px-4 md:px-8 2xl:px-0'>
            <div className='mx-auto flex max-w-screen-sm flex-col pt-6 text-center'>
              <h1 className='font-basier text-5.5xl font-semibold'>
                User stories
              </h1>
            </div>
            <p className='pt-6 text-center'>
              Discover how companies are using ClickHouse to speed up their
              workloads and lower costs.
            </p>
          </div>
          <div className='my-24 mx-auto max-w-7xl px-8 2xl:px-0'>
            <div className='filters mb-6 flex items-center gap-x-4'>
              <div className='search'>search</div>
              <button
                type='button'
                className={`${
                  orderByDate
                    ? 'bg-primary-300 text-black'
                    : 'border-opacity-[0.3] text-white'
                } rounded-full border border-primary-500 py-2 px-3 text-sm font-semibold text-black`}
                onClick={toggleOrderByDate}>
                Latest
              </button>
              <div className=''>
                <MultiSelect
                  value={selectedCities}
                  onChange={(e) => setSelectedCities(e.value)}
                  options={useCases}
                  optionLabel='name'
                  placeholder='Use Case'
                  maxSelectedLabels={0}
                  panelHeaderTemplate={<></>}
                  unstyled
                />
              </div>
            </div>

            <div className='grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3'>
              {sortedUserStories &&
                sortedUserStories.map((story, index) => {
                  return (
                    <div
                      key={index}
                      className={`${
                        story.attributes.highlight
                          ? 'border-primary-300 bg-neutral-700'
                          : 'overflow-hidden border-neutral-700/80'
                      }  relative min-h-[400px] rounded-[4px] border`}>
                      <div className='story-header bg-primary-300 p-4'>
                        <div className='flex h-[40px] items-center justify-center'>
                          {story.attributes.User.data && (
                            <Image
                              src={
                                story.attributes.User.data.attributes.logo.data
                                  .attributes.url
                              }
                              width={
                                story.attributes.User.data.attributes.logo.data
                                  .attributes.width
                              }
                              height={
                                story.attributes.User.data.attributes.logo.data
                                  .attributes.height
                              }
                              alt={
                                story.attributes.User.data.attributes.logo.data
                                  .attributes.alternativeText
                                  ? story.attributes.User.data.attributes.logo
                                      .data.attributes.alternativeText
                                  : 'Logo'
                              }
                            />
                          )}
                        </div>
                      </div>
                      <div className={` p-6`}>
                        <div className='story-categories font-inconsolata text-primary-300'>
                          {story.attributes.useCase.data &&
                            story.attributes.useCase.data.map(
                              (useCase, index) => {
                                return (
                                  <span key={index}>
                                    {useCase.attributes.Name}
                                  </span>
                                )
                              }
                            )}
                        </div>
                        <div className='story-title py-2 font-basier text-xl font-semibold'>
                          {story.attributes.Title}
                        </div>
                        <div className='story-description'>
                          {story.attributes.Description}
                        </div>
                        {(story.attributes.ReadBlogLink ||
                          story.attributes.ExternalLink ||
                          story.attributes.WatchVideoLink) && (
                          <div className='absolute bottom-6 right-6'>
                            <div className='flex items-center gap-x-6 text-primary-300'>
                              {story.attributes.ReadBlogLink && (
                                <Link
                                  href={story.attributes.ReadBlogLink}
                                  target='_blank'>
                                  Read blog
                                </Link>
                              )}
                              {story.attributes.ExternalLink && (
                                <Link
                                  href={story.attributes.ExternalLink}
                                  target='_blank'>
                                  Read blog
                                </Link>
                              )}
                              {story.attributes.WatchVideoLink && (
                                <Link
                                  href={story.attributes.WatchVideoLink}
                                  target='_blank'
                                  className='flex items-center gap-x-3'>
                                  <CirclePlay
                                    strokeWidth={1.5}
                                    className='h-5 w-5'
                                  />
                                  Watch video
                                </Link>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      {story.attributes.highlight && (
                        <div className='absolute left-1/2 -bottom-2 z-50 -translate-x-1/2 transform bg-half-highlight px-1 text-xs font-bold uppercase'>
                          Highlight
                        </div>
                      )}
                    </div>
                  )
                })}
            </div>
            <div className='mt-20 whitespace-pre'>
              {JSON.stringify(userStories, null, 2)}
            </div>
          </div>
        </div>
      </PrimeReactProvider>
    </Layout>
  )
}

export default CustomerStoriesPage
