import { CirclePlay, CircleXIcon } from 'lucide-react'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { PrimeReactProvider } from 'primereact/api'
import { MultiSelect } from 'primereact/multiselect'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import FollowUs from '../../components/FollowUs'
import Layout from '../../components/Layout'
import { SuiSearchField } from '../../components/sui'
import { findOne } from '../../lib/api/strapi'
import { galaxyOnPage } from '../../lib/galaxy/galaxy'
import { getCommonProps } from '../../lib/utils/getCommonProps'
import { Tailwind } from '../../lib/utils/primereact'
import {
  UseCaseCategory,
  UseCaseMigration,
  UseCaseVertical,
  UserStoriesPage
} from '../../types/userStories'

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
      // Check if the category is used in any user story
      const isUsed = userStories.some(
        (story: { attributes: { useCase: { data: { id: number }[] } } }) =>
          story.attributes.useCase.data.some(
            (useCase) => useCase.id === item.id
          )
      )
      if (isUsed) {
        UseCaseCategories.push({
          code: item.id,
          name: item.attributes.Name
        })
      }
    })

    //get migrations
    const migrations = await fetch(
      `${process.env.STRAPI_API_URL}/api/user-stories-migrations?sort=Name`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_KEY}`
        }
      }
    )
    const migrationsPayload = await migrations.json()
    const UseCaseMigrations: UseCaseMigration[] = []

    migrationsPayload.data.forEach(
      (item: { id: number; attributes: { Name: string } }) => {
        // Check if the migration is used in any user story
        const isUsed = userStories.some(
          (story: { attributes: { migrations: { data: { id: number }[] } } }) =>
            story.attributes.migrations.data.some(
              (migration: { id: number }) => migration.id === item.id
            )
        )
        if (isUsed) {
          UseCaseMigrations.push({
            code: item.id,
            name: item.attributes.Name
          })
        }
      }
    )

    //get verticals
    const verticals = await fetch(
      `${process.env.STRAPI_API_URL}/api/user-stories-verticals?sort=Name`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_KEY}`
        }
      }
    )
    const verticalsPayload = await verticals.json()
    const UseCaseVerticals: UseCaseVertical[] = []

    verticalsPayload.data.forEach(
      (item: { id: number; attributes: { Name: string } }) => {
        // Check if the vertical is used in any user story
        const isUsed = userStories.some(
          (story: { attributes: { vertical: { data: { id: number }[] } } }) =>
            story.attributes.vertical.data.some(
              (vertical: { id: number }) => vertical.id === item.id
            )
        )
        if (isUsed) {
          UseCaseVerticals.push({
            code: item.id,
            name: item.attributes.Name
          })
        }
      }
    )

    const commonProps = await getCommonProps()
    return {
      props: {
        ...result,
        userStories,
        UseCaseCategories,
        UseCaseMigrations,
        UseCaseVerticals,
        ...commonProps
      }
    }
  }

function CustomerStoriesPage({
  seo,
  userStories,
  headerData,
  footerData,
  UseCaseCategories,
  UseCaseMigrations,
  UseCaseVerticals
}: UserStoriesPage) {
  galaxyOnPage('userStoriesPage')
  const router = useRouter()
  const searchParams = useSearchParams()

  function findByCode<T extends { code: number }>(
    array: T[],
    code: number
  ): T | undefined {
    return array.find((item) => item.code === code)
  }

  const orderByDate = searchParams.get('latest')
    ? searchParams.get('latest') === 'true'
    : true

  const useCaseParam = searchParams.get('useCase')
  const migrationParam = searchParams.get('migration')
  const verticalParam = searchParams.get('vertical')
  const searchParamInput = searchParams.get('search')

  const clearAllFilters = () => {
    setSearchQuery('')
    router.push(
      {
        query: null
      },
      undefined,
      { shallow: true }
    )
  }

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

  //state to hold user selected values
  const [selectedUseCases, setSelectedUseCases] = useState<UseCaseCategory[]>(
    []
  )
  const [selectedMigrations, setSelectedMigrations] = useState<
    UseCaseMigration[]
  >([])
  const [selectedVerticals, setSelectedVerticals] = useState<UseCaseVertical[]>(
    []
  )

  // Filter userStories based on selected parameters
  const filteredUserStories = sortedUserStories.filter((story) => {
    // Filter by Use Case
    const useCaseCodes = selectedUseCases.map((useCase) => useCase.code)
    const storyUseCaseCodes = story.attributes.useCase.data.map(
      (useCase) => useCase.id
    )
    const useCaseMatch =
      useCaseCodes.some((code) => storyUseCaseCodes.includes(code)) ||
      !useCaseCodes.length

    // Filter by Migration
    const migrationCodes = selectedMigrations.map((migration) => migration.code)
    const storyMigrationCodes = story.attributes.migrations.data.map(
      (migration) => migration.id
    )
    const migrationMatch =
      migrationCodes.some((code) => storyMigrationCodes.includes(code)) ||
      !migrationCodes.length

    // Filter by Vertical
    const verticalCodes = selectedVerticals.map((vertical) => vertical.code)
    const storyVerticalCodes = story.attributes.vertical.data.map(
      (vertical) => vertical.id
    )
    const verticalMatch =
      verticalCodes.some((code) => storyVerticalCodes.includes(code)) ||
      !verticalCodes.length

    // Filter by Latest
    const dateA = new Date(story.attributes.publishedAt)
    const dateB = new Date()
    const latestMatch = orderByDate ? dateA.getTime() <= dateB.getTime() : true

    // Filter by Search Query
    const title = story.attributes.Title.toLowerCase()
    const description = story.attributes.Description?.toLowerCase()
    const searchLowerCase = searchParamInput
      ? searchParamInput.toLowerCase()
      : ''
    const searchMatch =
      title.includes(searchLowerCase) || description?.includes(searchLowerCase)

    return (
      useCaseMatch &&
      migrationMatch &&
      verticalMatch &&
      latestMatch &&
      searchMatch
    )
  })

  useEffect(() => {
    //stop flash of unstyled content
    const multiselectTargets = document.querySelectorAll('.multiselect-target')
    multiselectTargets.forEach((item) => {
      item.classList.remove('hidden')
    })
  })

  //manage
  useEffect(() => {
    //=== Use Cases ==//
    const useCaseCodes = useCaseParam
      ?.split(',')
      .map((code) => parseInt(code.trim(), 10))
    const selectedUseCaseObjects = useCaseCodes
      ? useCaseCodes
          .map((code) => findByCode(UseCaseCategories, code))
          .filter((item): item is UseCaseCategory => item !== undefined)
      : []
    // Set the selected use cases
    setSelectedUseCases(selectedUseCaseObjects)
    //=== Use Cases ==//

    //=== Migrations ==//
    const migrationsCodes = migrationParam
      ?.split(',')
      .map((code) => parseInt(code.trim(), 10))
    const selectedMigrationsObject = migrationsCodes
      ? migrationsCodes
          .map((code) => findByCode(UseCaseMigrations, code))
          .filter((item): item is UseCaseMigration => item !== undefined)
      : []
    // Set the selected use cases
    setSelectedMigrations(selectedMigrationsObject)
    //=== Migrations ==//

    //=== vertical ==//
    const verticalCodes = verticalParam
      ?.split(',')
      .map((code) => parseInt(code.trim(), 10))
    const selectedVerticalsObject = verticalCodes
      ? verticalCodes
          .map((code) => findByCode(UseCaseVerticals, code))
          .filter((item): item is UseCaseVertical => item !== undefined)
      : []
    // Set the selected use cases
    setSelectedVerticals(selectedVerticalsObject)
    //=== vertical ==//

    //=== search ==//
  }, [useCaseParam, migrationParam, verticalParam, searchParamInput])

  //Search field
  const [searchQuery, setSearchQuery] = useState('')

  // Event handler to update search query
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value)
    router.push(
      {
        query: {
          ...router.query,
          search: event.target.value
        }
      },
      undefined,
      { shallow: true }
    )
  }

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
            <div className='filters mb-6 gap-x-4 xl:flex xl:justify-between'>
              <SuiSearchField
                placeholder='Search by company or keyword...'
                htmlFor='search'
                className='mb-6 xl:mb-0 xl:min-w-[447px]'
                onChange={handleSearchInputChange}
                value={searchQuery}
              />
              <div className='flex flex-col items-center justify-center gap-4 xl:flex-row xl:flex-nowrap'>
                <button
                  type='button'
                  className={`${
                    orderByDate
                      ? 'bg-primary-300 text-black'
                      : 'border-opacity-[0.3] text-white'
                  } max-h-[42px] w-[162px] rounded-full border border-primary-500 py-2.5 px-4 text-sm font-semibold text-black xl:w-auto`}
                  onClick={toggleOrderByDate}>
                  Latest
                </button>
                <div className='multiselect-target hidden'>
                  <MultiSelect
                    value={selectedUseCases}
                    itemClassName='multiselect-item'
                    onChange={(e) => {
                      setSelectedUseCases(e.value)
                      const selectedValues = e.value
                        .map((option: UseCaseCategory) => option.code)
                        .join(',')
                      router.push(
                        {
                          query: {
                            ...router.query,
                            useCase: selectedValues
                          }
                        },
                        undefined,
                        { shallow: true }
                      )
                    }}
                    options={UseCaseCategories}
                    optionLabel='name'
                    placeholder='Use Case'
                    maxSelectedLabels={0}
                    panelHeaderTemplate={<></>}
                    selectedItemsLabel='Use Case ({0})'
                    unstyled
                  />
                </div>
                <div className='multiselect-target hidden'>
                  <MultiSelect
                    value={selectedMigrations}
                    itemClassName='multiselect-item'
                    onChange={(e) => {
                      setSelectedMigrations(e.value)
                      const selectedValues = e.value
                        .map((option: UseCaseMigration) => option.code)
                        .join(',')
                      router.push(
                        {
                          query: {
                            ...router.query,
                            migration: selectedValues
                          }
                        },
                        undefined,
                        { shallow: true }
                      )
                    }}
                    options={UseCaseMigrations}
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
                    value={selectedVerticals}
                    itemClassName='multiselect-item'
                    onChange={(e) => {
                      setSelectedVerticals(e.value)
                      const selectedValues = e.value
                        .map((option: UseCaseVertical) => option.code)
                        .join(',')
                      router.push(
                        {
                          query: {
                            ...router.query,
                            vertical: selectedValues
                          }
                        },
                        undefined,
                        { shallow: true }
                      )
                    }}
                    options={UseCaseVerticals}
                    optionLabel='name'
                    placeholder='Vertical'
                    maxSelectedLabels={0}
                    panelHeaderTemplate={<></>}
                    selectedItemsLabel='Vertical ({0})'
                    unstyled
                  />
                </div>
                <button
                  type='button'
                  disabled={
                    useCaseParam ||
                    migrationParam ||
                    searchParamInput ||
                    verticalParam
                      ? false
                      : true
                  }
                  className={`${
                    useCaseParam ||
                    migrationParam ||
                    searchParamInput ||
                    verticalParam
                      ? 'text-whte'
                      : 'text-neutral-500'
                  } flex transform items-center gap-x-2 rounded-full py-2.5 text-sm font-semibold transition-colors duration-500 ease-in-out`}
                  onClick={clearAllFilters}>
                  Clear filters
                  <CircleXIcon strokeWidth={1.25} />
                </button>
              </div>
            </div>

            <div className='grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3'>
              {filteredUserStories.map((story, index) => {
                return (
                  <div
                    key={index}
                    className={`${
                      story.attributes.highlight
                        ? 'border-primary-300 bg-neutral-700'
                        : 'overflow-hidden border-neutral-700/80'
                    }  relative min-h-[440px] rounded-[4px] border md:min-h-[400px]`}>
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
                    <div className={`p-6`}>
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
                        <div className='absolute bottom-6 right-6 mt-auto'>
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
          </div>
          <FollowUs />
        </div>
      </PrimeReactProvider>
    </Layout>
  )
}

export default CustomerStoriesPage
