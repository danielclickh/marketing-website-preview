'use client'

import styles from './styles.module.scss'
import CustomerStoryCard from '@/components/CustomerStoryCard'
import FollowUs from '@/components/FollowUs'
import Layout from '@/components/Layout'
import ClearFilterButton from '@/components/UserStories/ClearFilterButton'
import { SuiSearchField, SuiTitle } from '@/components/sui'
import { fetchAll, findOne } from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { Tailwind } from '@/lib/utils/primereact'
import {
  CloudProvider,
  Migration,
  UseCase,
  UserStoriesPage,
  UserStory,
  Vertical
} from '@/types/userStories'
import { GetStaticProps } from 'next'
import { useSearchParams } from 'next/navigation'
import { PrimeReactProvider } from 'primereact/api'
import { MultiSelect } from 'primereact/multiselect'
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'

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

      if (story.cloudProvider?.length) {
        story.cloudProvider?.forEach((provider) => {
          if (!cloudProviders.hasOwnProperty(provider.slug)) {
            cloudProviders[provider.slug] = provider
          }
        })
      }
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

export default function CustomerStoriesPage({
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

  const [search, setSearch] = useState('')
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

  // Build use cases multi-select options array
  const useCaseOptions = useMemo(() => {
    return Object.entries(categories)
      .map(([id, name]) => {
        return {
          value: Number(id),
          label: name
        }
      })
      .sort((a, b) => {
        return a.value - b.value
      })
  }, [categories])

  // Build migrations multi-select options array
  const migrationOptions = useMemo(() => {
    return Object.entries(migrations)
      .map(([id, name]) => {
        return {
          value: Number(id),
          label: name
        }
      })
      .sort((a, b) => {
        return a.label.localeCompare(b.label)
      })
  }, [migrations])

  // Build verticals multi-select options array
  const verticalOptions = useMemo(() => {
    return Object.entries(verticals)
      .map(([id, name]) => {
        return {
          value: Number(id),
          label: name
        }
      })
      .sort((a, b) => {
        return a.label.localeCompare(b.label)
      })
  }, [verticals])

  // Build cloud providers multi-select options array
  const cloudProvidersOptions = useMemo(() => {
    return Object.entries(cloudProviders)
      .sort(([aSlug, a], [bSlug, b]) => {
        const aHasValidOrder = typeof a.displayOrder === 'number'
        const bHasValidOrder = typeof b.displayOrder === 'number'

        if (aHasValidOrder && bHasValidOrder) {
          return a.displayOrder! - b.displayOrder!
        }

        if (aHasValidOrder) return -1
        if (bHasValidOrder) return 1

        return a.name.localeCompare(b.name)
      })
      .map(([slug, provider]) => {
        return {
          value: slug,
          label: provider.name
        }
      })
  }, [cloudProviders])

  // Flag used for disabling 'Clear filters' button
  const hasFilters =
    search.trim().length ||
    filterByUseCases.length ||
    filterByMigrations.length ||
    filterByVerticals.length ||
    filterByCloudProviders.length

  // Read values from the URL
  useEffect(() => {
    const urlUseCases = (searchParams?.get('useCase')?.split(',') || [])
      .map((value) => Number(value.trim()))
      .filter((value) => useCaseOptions.find((item) => item.value === value))

    const urlMigrations = (searchParams?.get('migration')?.split(',') || [])
      .map((value) => Number(value.trim()))
      .filter((value) => migrationOptions.find((item) => item.value === value))

    const urlVerticals = (searchParams?.get('vertical')?.split(',') || [])
      .map((value) => Number(value.trim()))
      .filter((value) => verticalOptions.find((item) => item.value === value))

    const urlCloudProviders = (
      searchParams?.get('cloudProvider')?.split(',') || []
    )
      .map((value) => value.trim())
      .filter((value) =>
        cloudProvidersOptions.find((item) => item.value === value)
      )

    setOrderByLatest(searchParams?.get('latest') === 'true')
    setSearch(searchParams?.get('search')?.trim() || '')
    setFilterByUseCases(urlUseCases || [])
    setFilterByMigrations(urlMigrations || [])
    setFilterByVerticals(urlVerticals || [])
    setFilterByCloudProviders(urlCloudProviders || [])
  }, [
    searchParams,
    useCaseOptions,
    migrationOptions,
    verticalOptions,
    cloudProvidersOptions
  ])

  // Store values in the URL
  useEffect(() => {
    const newUrl = new URL(window.location.toString())

    if (search.trim().length) {
      newUrl.searchParams.set('search', search.trim())
    } else {
      newUrl.searchParams.delete('search')
    }

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
    search,
    orderByLatest,
    filterByUseCases,
    filterByMigrations,
    filterByVerticals,
    filterByCloudProviders
  ])

  // Handle search input change event
  const handleSearchInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value)
    },
    [setSearch]
  )

  // Handle sorting click event
  const handleLatestClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      setOrderByLatest((old) => !old)
    },
    [setOrderByLatest]
  )

  // Handle clear filters click event
  const handleClearFiltersClick = useCallback(() => {
    setSearch('')
    setFilterByUseCases([])
    setFilterByMigrations([])
    setFilterByVerticals([])
    setFilterByCloudProviders([])
  }, [
    setSearch,
    setFilterByUseCases,
    setFilterByMigrations,
    setFilterByVerticals,
    setFilterByCloudProviders
  ])

  const filteredAndSortedStories = useMemo(() => {
    let modified = [...stories]

    // Filtering
    modified = modified.filter((story) => {
      // Filter by search
      const title = story.Title.toLowerCase()
      const description = story.Description?.toLowerCase()
      const user = story.User.Name?.toLowerCase()
      const searchLowerCase = search.trim().toLocaleLowerCase()
      const searchMatch =
        !searchLowerCase.length ||
        title.includes(searchLowerCase) ||
        description?.includes(searchLowerCase) ||
        user?.includes(searchLowerCase)

      const useCaseMatch =
        !filterByUseCases.length ||
        story.useCase.find((entry) => filterByUseCases.includes(entry.id))

      const verticalMatch =
        !filterByVerticals.length ||
        story.vertical.find((entry) => filterByVerticals.includes(entry.id))

      const migrationMatch =
        !filterByMigrations.length ||
        story.migrations.find((entry) => filterByMigrations.includes(entry.id))

      const cloudProvidersMatch =
        !filterByCloudProviders.length ||
        (story.cloudProvider?.length &&
          story.cloudProvider.find((entry) =>
            filterByCloudProviders.includes(entry.slug)
          ))

      return (
        searchMatch &&
        useCaseMatch &&
        verticalMatch &&
        migrationMatch &&
        cloudProvidersMatch
      )
    })

    // Sorting
    modified.sort((a, b) => {
      // If NOT sorting by latest
      if (!orderByLatest) {
        // Bring highlighted to the top
        if (a.highlight && !b.highlight) {
          return -1
        } else if (!a.highlight && b.highlight) {
          return 1
        }
      }

      // Fall back to latest (decending order)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

    return modified
  }, [
    stories,
    search,
    orderByLatest,
    filterByUseCases,
    filterByVerticals,
    filterByMigrations,
    filterByCloudProviders
  ])

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
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
                onChange={handleSearchInput}
                value={search}
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
                  {useCaseOptions.length > 0 && (
                    <div>
                      <MultiSelect
                        value={filterByUseCases}
                        itemClassName={styles.multiselectItem}
                        onChange={(event) => {
                          setFilterByUseCases(event.value)
                        }}
                        options={useCaseOptions}
                        placeholder='Use case'
                        maxSelectedLabels={0}
                        panelHeaderTemplate={<></>}
                        selectedItemsLabel='Use case ({0})'
                        unstyled
                      />
                    </div>
                  )}
                  {migrationOptions.length > 0 && (
                    <div>
                      <MultiSelect
                        value={filterByMigrations}
                        itemClassName={styles.multiselectItem}
                        onChange={(event) => {
                          setFilterByMigrations(event.value)
                        }}
                        options={migrationOptions}
                        placeholder='Migration'
                        maxSelectedLabels={0}
                        panelHeaderTemplate={<></>}
                        selectedItemsLabel='Migration ({0})'
                        unstyled
                      />
                    </div>
                  )}
                  {verticalOptions.length > 0 && (
                    <div>
                      <MultiSelect
                        value={filterByVerticals}
                        itemClassName={styles.multiselectItem}
                        onChange={(event) => {
                          setFilterByVerticals(event.value)
                        }}
                        options={verticalOptions}
                        placeholder='Vertical'
                        maxSelectedLabels={0}
                        panelHeaderTemplate={<></>}
                        selectedItemsLabel='Vertical ({0})'
                        unstyled
                      />
                    </div>
                  )}
                  {cloudProvidersOptions.length > 0 && (
                    <div>
                      <MultiSelect
                        value={filterByCloudProviders}
                        itemClassName={styles.multiselectItem}
                        onChange={(event) => {
                          setFilterByCloudProviders(event.value)
                        }}
                        options={cloudProvidersOptions}
                        placeholder='Provider'
                        maxSelectedLabels={0}
                        panelHeaderTemplate={<></>}
                        selectedItemsLabel='Provider ({0})'
                        unstyled
                      />
                    </div>
                  )}
                  <ClearFilterButton
                    onClick={handleClearFiltersClick}
                    disabled={!hasFilters}
                  />
                </div>
              </div>
            </div>

            {filteredAndSortedStories.length > 0 ? (
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                {filteredAndSortedStories.map((story, index) => {
                  const hasVerticals =
                    !!story.vertical?.length && story.vertical.length > 0
                  const hasMigrations =
                    !!story.migrations?.length && story.migrations.length > 0
                  const hasProviders =
                    !!story.cloudProvider?.length &&
                    story.cloudProvider?.length > 0
                  return (
                    <Fragment key={index}>
                      <CustomerStoryCard
                        logo={story.User.logo}
                        title={story.Title}
                        description={story.Description}
                        highlight={story.highlight}
                        categories={story.useCase.map((useCase) => {
                          return useCase.Name
                        })}
                        blogLink={story.ReadBlogLink}
                        externalLink={story.ExternalLink}
                        videoLink={story.WatchVideoLink}
                      />
                    </Fragment>
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
                  onClick={handleClearFiltersClick}
                  disabled={!hasFilters}
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
