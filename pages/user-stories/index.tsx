import { CirclePlay } from 'lucide-react'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { PrimeReactProvider } from 'primereact/api'
import { MultiSelect } from 'primereact/multiselect'
import { useCallback, useEffect, useMemo, useState } from 'react'
import FollowUs from '../../components/FollowUs'
import Layout from '../../components/Layout'
import { StrapiImage } from '../../components/StrapiElements'
import { SuiSearchField, SuiTitle } from '../../components/sui'
import ClearFilterButton from '../../components/UserStories/ClearFilterButton'
import { fetchAll, findOne } from '../../lib/api/strapi'
import { useGalaxyOnPage } from '../../lib/galaxy/galaxy'
import { getCommonProps } from '../../lib/utils/getCommonProps'
import { Tailwind } from '../../lib/utils/primereact'
import {
  CloudProvider,
  Migration,
  UseCase,
  UserStoriesPage,
  UserStory,
  Vertical
} from '../../types/userStories'

export const getStaticProps: GetStaticProps<UserStoriesPage> =
  async function getStaticProps() {
    const pagePromise = findOne('use-case', {
      populate: ['useCaseItems', 'useCaseItems.darkLogoPng', 'seo', 'seo.image']
    })

    const storiesPromise: Promise<Array<UserStory>> = fetchAll('user-stories', {
      populate: [
        'User.logo',
        'useCase',
        'migrations',
        'vertical',
        'cloudProvider'
      ],
      sort: ['createdAt:desc']
    })

    const [page, stories] = await Promise.all([pagePromise, storiesPromise])

    const categories: UserStoriesPage['categories'] = {}
    const migrations: UserStoriesPage['migrations'] = {}
    const verticals: UserStoriesPage['verticals'] = {}
    const cloudProviders: UserStoriesPage['cloudProviders'] = {}

    // Build filters
    stories.forEach((story) => {
      story.useCase?.forEach((useCase) => {
        if (!categories.hasOwnProperty(useCase.id)) {
          categories[useCase.id] = useCase.Name
        }
      })

      story.migrations?.forEach((migration) => {
        if (!migrations.hasOwnProperty(migration.id)) {
          migrations[migration.id] = migration.Name
        }
      })

      story.vertical?.forEach((vertical) => {
        if (!verticals.hasOwnProperty(vertical.id)) {
          verticals[vertical.id] = vertical.Name
        }
      })

      story.cloudProvider?.forEach((cloudProvider) => {
        if (!cloudProviders.hasOwnProperty(cloudProvider.slug)) {
          cloudProviders[cloudProvider.slug] = cloudProvider.name
        }
      })
    })

    page.seo.path = '/user-stories'

    const commonProps = await getCommonProps()
    return {
      props: {
        ...page,
        stories,
        categories,
        migrations,
        verticals,
        cloudProviders,
        ...commonProps
      }
    }
  }

function CustomerStoriesPage({
  seo,
  stories,
  headerData,
  footerData,
  categories,
  migrations,
  verticals,
  cloudProviders
}: UserStoriesPage) {
  useGalaxyOnPage('userStoriesPage')
  const searchParams = useSearchParams()

  const [orderByLatest, setOrderByLatest] = useState(false)
  const [filterByUseCases, setFilterByUseCases] = useState<
    Array<UseCase['id']>
  >([])
  const [filterByMigrations, setFilterByMigrations] = useState<
    Array<Migration['id']>
  >([])
  const [filterByVerticals, setFilterByVerticals] = useState<
    Array<Vertical['id']>
  >([])
  const [filterByCloudProviders, setFilterByCloudProviders] = useState<
    Array<CloudProvider['slug']>
  >([])

  const useCaseOptions = useMemo(() => {
    return Object.entries(categories).map(([id, name]) => {
      return {
        value: id,
        label: name
      }
    })
  }, [categories])

  const migrationOptions = useMemo(() => {
    return Object.entries(migrations).map(([id, name]) => {
      return {
        value: id,
        label: name
      }
    })
  }, [migrations])

  const verticalOptions = useMemo(() => {
    return Object.entries(verticals).map(([id, name]) => {
      return {
        value: id,
        label: name
      }
    })
  }, [verticals])

  const cloudProvidersOptions = useMemo(() => {
    return Object.entries(cloudProviders).map(([slug, name]) => {
      return {
        value: slug,
        label: name
      }
    })
  }, [cloudProviders])

  const filteredAndSortedStories = useMemo(() => {
    return stories
  }, [stories])

  const handleLatestClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      setOrderByLatest((old) => !old)
    },
    [setOrderByLatest]
  )

  useEffect(() => {
    const newUrl = new URL(window.location.toString())

    if (orderByLatest) {
      newUrl.searchParams.set('latest', 'true')
    } else {
      newUrl.searchParams.delete('latest')
    }

    if (filterByUseCases.length) {
      newUrl.searchParams.set('useCase', filterByUseCases.join(','))
    } else {
      newUrl.searchParams.delete('useCase')
    }

    if (filterByMigrations.length) {
      newUrl.searchParams.set('migration', filterByMigrations.join(','))
    } else {
      newUrl.searchParams.delete('migration')
    }

    if (filterByVerticals.length) {
      newUrl.searchParams.set('vertical', filterByVerticals.join(','))
    } else {
      newUrl.searchParams.delete('vertical')
    }

    if (filterByCloudProviders.length) {
      newUrl.searchParams.set('cloudProvider', filterByCloudProviders.join(','))
    } else {
      newUrl.searchParams.delete('cloudProvider')
    }

    // We use the native API because of a bug where the nextjs
    // `router.replace(...)` causes all iframes on the page to reload
    window.history.replaceState(null, '', newUrl.toString())
  }, [
    orderByLatest,
    filterByUseCases,
    filterByMigrations,
    filterByVerticals,
    filterByCloudProviders
  ])

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <pre>{JSON.stringify(useCaseOptions, null, 2)}</pre>
      <PrimeReactProvider
        value={{
          unstyled: true,
          pt: Tailwind,
          zIndex: {
            overlay: 30
          }
        }}>
        <div className='mx-auto mb-10 pt-10 text-center text-neutral-100 lg:pt-20'>
          <SuiTitle type='h1'>User stories</SuiTitle>
          <p className='pt-6 text-center'>
            Discover how companies are using ClickHouse to speed up their
            workloads and lower costs.
          </p>
        </div>
        <div>
          <div className='container mx-auto max-w-7xl px-8 pt-8 2xl:px-0'>
            <div className='mx-auto mb-6 md:max-w-md lg:mb-8'>
              <SuiSearchField
                placeholder='Search by company or keyword...'
                htmlFor='search'
                className='mb-6 xl:mb-0 xl:min-w-[447px]'
                onChange={console.log}
                defaultValue=''
              />
            </div>
            <div className='mx-auto max-w-5xl'>
              <div className='filters mb-14 gap-x-4 xl:flex xl:justify-center'>
                <div className='flex flex-col items-center justify-center gap-4 lg:flex-row lg:flex-nowrap'>
                  <button
                    type='button'
                    className={`${
                      orderByLatest
                        ? 'bg-primary-300 text-black'
                        : 'border-opacity-[0.3] text-white'
                    } max-h-[36px] w-[162px] rounded-full border border-primary-500 px-4 py-[7px] text-sm font-semibold text-black transition-colors duration-500 ease-in-out hover:border-primary-300 xl:w-auto`}
                    onClick={handleLatestClick}>
                    Latest
                  </button>
                  <div className='multiselect-target hidden'>
                    <MultiSelect
                      value={[]}
                      itemClassName='multiselect-item'
                      onChange={console.log}
                      options={useCaseOptions}
                      optionLabel='name'
                      placeholder='Use case'
                      maxSelectedLabels={0}
                      panelHeaderTemplate={<></>}
                      selectedItemsLabel='Use case ({0})'
                      unstyled
                    />
                  </div>
                  <div className='multiselect-target hidden'>
                    <MultiSelect
                      value={null}
                      itemClassName='multiselect-item'
                      onChange={console.log}
                      options={migrationOptions}
                      optionLabel='name'
                      placeholder='Migration'
                      maxSelectedLabels={0}
                      panelHeaderTemplate={<></>}
                      selectedItemsLabel='Migration ({0})'
                      unstyled
                    />
                  </div>
                  <div className='multiselect-target hidden'>
                    <MultiSelect
                      value={null}
                      itemClassName='multiselect-item'
                      onChange={console.log}
                      options={verticalOptions}
                      optionLabel='name'
                      placeholder='Vertical'
                      maxSelectedLabels={0}
                      panelHeaderTemplate={<></>}
                      selectedItemsLabel='Vertical ({0})'
                      unstyled
                    />
                  </div>
                  <ClearFilterButton onClick={console.log} disabled={false} />
                </div>
              </div>
            </div>

            {filteredAndSortedStories.length > 0 ? (
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                {filteredAndSortedStories.map((story, index) => {
                  return (
                    <div
                      key={index}
                      className='relative flex flex-col shadow-xl shadow-black/25'>
                      <div className='story-header rounded-t-lg bg-primary-300 p-4'>
                        <div className='flex h-[40px] items-center justify-center'>
                          {story.User && (
                            <StrapiImage
                              {...story.User.logo}
                              className='max-h-[35px]'
                            />
                          )}
                        </div>
                      </div>
                      <div
                        className={`${
                          story.highlight &&
                          'border border-primary-300 bg-neutral-700'
                        } relative flex flex-grow flex-col overflow-hidden rounded-b-lg border border-t-0 border-neutral-700/80 p-6`}>
                        <div className='story-categories font-inconsolata text-primary-300'>
                          {story.useCase &&
                            story.useCase
                              .map((useCase) => {
                                return useCase.Name
                              })
                              .join(', ')}
                        </div>
                        <div className='story-title py-2 font-basier text-xl font-semibold'>
                          {story.Title}
                        </div>
                        <div className='story-description flex-grow text-balance'>
                          {story.Description}
                        </div>
                        {(story.ReadBlogLink ||
                          story.ExternalLink ||
                          story.WatchVideoLink) && (
                          <div className='mt-auto'>
                            <div className='mt-6 flex items-center justify-end gap-x-6 text-primary-300'>
                              {story.ReadBlogLink && (
                                <Link href={story.ReadBlogLink} target='_blank'>
                                  Read blog
                                </Link>
                              )}
                              {story.ExternalLink && (
                                <Link href={story.ExternalLink} target='_blank'>
                                  Read blog
                                </Link>
                              )}
                              {story.WatchVideoLink && (
                                <Link
                                  href={story.WatchVideoLink}
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
                      {story.highlight && (
                        <div className='absolute -bottom-2 left-1/2 z-50 -translate-x-1/2 transform overflow-visible bg-half-highlight px-1 text-xs font-bold uppercase'>
                          Highlight
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className='flex w-full flex-col items-center rounded-md border border-dashed border-primary-700 p-16 text-center'>
                <div className='flex-grow font-basier text-2xl'>
                  Sorry, no user stories found
                </div>
                <ClearFilterButton
                  className='mt-6 rounded-full border border-primary-600 px-4 py-2.5 text-sm font-semibold hover:border-primary-300'
                  onClick={console.log}
                  disabled={false}
                />
              </div>
            )}
          </div>
          <FollowUs />
        </div>
      </PrimeReactProvider>
    </Layout>
  )
}

export default CustomerStoriesPage
