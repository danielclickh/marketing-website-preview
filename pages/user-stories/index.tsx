import { CirclePlay } from 'lucide-react'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { PrimeReactProvider } from 'primereact/api'
import { MultiSelect } from 'primereact/multiselect'
import { useEffect, useRef, useState } from 'react'
import FollowUs from '../../components/FollowUs'
import Layout from '../../components/Layout'
import { SuiSearchField, SuiTitle } from '../../components/sui'
import ClearFilterButton from '../../components/UserStories/ClearFilterButton'
import { findOne } from '../../lib/api/strapi'
import { useGalaxyOnPage } from '../../lib/galaxy/galaxy'
import { getCommonProps } from '../../lib/utils/getCommonProps'
import { Tailwind } from '../../lib/utils/primereact'
import {
  UseCaseCategory,
  UseCaseMigration,
  UseCaseVertical,
  UserStoriesPage
} from '../../types/userStories'

interface MousePosition {
  x: number
  y: number
}

export const getStaticProps: GetStaticProps<UserStoriesPage> =
  async function getStaticProps() {
    const result = await findOne('use-case', {
      populate: ['useCaseItems', 'useCaseItems.darkLogoPng', 'seo', 'seo.image']
    })
    result.seo.path = '/user-stories'

    const userStoriesData = await fetch(
      `${process.env.STRAPI_API_URL}/api/user-stories?populate=User.logo,useCase,migrations,vertical&sort[0]=createdAt:desc`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_KEY}`
        }
      }
    )

    const userStoriesPayload = await userStoriesData.json()

    const userStories = userStoriesPayload.data

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
  useGalaxyOnPage('userStoriesPage')
  const router = useRouter()
  const searchParams = useSearchParams()

  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0
  })
  const [hoveredStoryIndex, setHoveredStoryIndex] = useState<number | null>(
    null
  )

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    const boundingRect = event.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: event.clientX - boundingRect.left,
      y: event.clientY - boundingRect.top
    })
    setHoveredStoryIndex(index)
  }

  const handleMouseLeave = () => {
    setHoveredStoryIndex(null)
  }

  function findByCode<T extends { code: number }>(
    array: T[],
    code: number
  ): T | undefined {
    return array.find((item) => item.code === code)
  }

  const orderByDate = searchParams.get('latest')
    ? searchParams.get('latest') === 'true'
    : false

  const useCaseParam = searchParams.get('useCase')
  const migrationParam = searchParams.get('migration')
  const verticalParam = searchParams.get('vertical')
  const searchParamInput = searchParams.get('search')

  const inputRef = useRef<null | HTMLInputElement>(null)

  const clearSearchField = () => {
    setSearchQuery('')
    if (inputRef.current) inputRef.current.value = ''
  }

  const clearAllFilters = () => {
    clearSearchField()
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
    // If orderByDate is true, sort only by createdAt
    if (orderByDate) {
      const dateA = new Date(a.attributes.createdAt)
      const dateB = new Date(b.attributes.createdAt)
      return dateB.getTime() - dateA.getTime() // Descending order by createdAt
    }

    // First, sort by highlight status
    if (a.attributes.highlight && !b.attributes.highlight) {
      return -1
    } else if (!a.attributes.highlight && b.attributes.highlight) {
      return 1
    }

    // If both have the same highlight status, sort by sortOrder
    const sortOrderA = a.attributes.SortOrder ?? Number.MAX_SAFE_INTEGER
    const sortOrderB = b.attributes.SortOrder ?? Number.MAX_SAFE_INTEGER

    if (sortOrderA !== sortOrderB) {
      return sortOrderA - sortOrderB // Ascending order by sortOrder
    }

    // If both have the same sortOrder, sort by createdAt
    const dateA = new Date(a.attributes.createdAt)
    const dateB = new Date(b.attributes.createdAt)
    return dateB.getTime() - dateA.getTime() // Descending order by createdAt
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
    const dateA = new Date(story.attributes.createdAt)
    const dateB = new Date()
    const latestMatch = orderByDate ? dateA.getTime() <= dateB.getTime() : true

    // Filter by Search Query
    const title = story.attributes.Title.toLowerCase()
    const description = story.attributes.Description?.toLowerCase()
    const user = story.attributes.User.data
      ? story.attributes.User.data.attributes.Name?.toLowerCase()
      : ''
    const searchLowerCase = searchParamInput
      ? searchParamInput.toLowerCase()
      : ''
    const searchMatch =
      title.includes(searchLowerCase) ||
      description?.includes(searchLowerCase) ||
      user?.includes(searchLowerCase)

    return (
      useCaseMatch &&
      migrationMatch &&
      verticalMatch &&
      latestMatch &&
      searchMatch
    )
  })

  useEffect(() => {
    if (searchParamInput) {
      setSearchQuery(searchParamInput)
    }
    //stop flash of unstyled content
    const multiselectTargets = document.querySelectorAll('.multiselect-target')
    multiselectTargets.forEach((item) => {
      item.classList.remove('hidden')
    })
  })

  //Search field
  const [searchQuery, setSearchQuery] = useState('')

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

    //=== Search input ==//
    if (searchParamInput) {
      setSearchQuery(searchParamInput)
    }
    //=== Search input ==//
  }, [useCaseParam, migrationParam, verticalParam])

  // Event handler to update search query
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value)
    router.push(
      {
        query: {
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
                onChange={handleSearchInputChange}
                defaultValue={searchQuery}
                inputRef={inputRef}
              />
            </div>
            <div className='mx-auto max-w-5xl'>
              <div className='filters mb-14 gap-x-4 xl:flex xl:justify-center'>
                <div className='flex flex-col items-center justify-center gap-4 lg:flex-row lg:flex-nowrap'>
                  <button
                    type='button'
                    className={`${
                      orderByDate
                        ? 'bg-primary-300 text-black'
                        : 'border-opacity-[0.3] text-white'
                    } max-h-[36px] w-[162px] rounded-full border border-primary-500 px-4 py-[7px] text-sm font-semibold text-black transition-colors duration-500 ease-in-out hover:border-primary-300 xl:w-auto`}
                    onClick={toggleOrderByDate}>
                    Latest
                  </button>
                  <div className='multiselect-target hidden'>
                    <MultiSelect
                      value={selectedUseCases}
                      itemClassName='multiselect-item'
                      onChange={(e) => {
                        if (searchQuery) {
                          clearSearchField()
                        }
                        setSelectedUseCases(e.value)
                        const selectedValues = e.value
                          .map((option: UseCaseCategory) => option.code)
                          .join(',')
                        router.push(
                          {
                            query: {
                              ...router.query,
                              useCase: selectedValues,
                              search: undefined
                            }
                          },
                          undefined,
                          { shallow: true }
                        )
                      }}
                      options={UseCaseCategories}
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
                      value={selectedMigrations}
                      itemClassName='multiselect-item'
                      onChange={(e) => {
                        if (searchQuery) {
                          clearSearchField()
                        }
                        setSelectedMigrations(e.value)
                        const selectedValues = e.value
                          .map((option: UseCaseMigration) => option.code)
                          .join(',')
                        router.push(
                          {
                            query: {
                              ...router.query,
                              migration: selectedValues,
                              search: undefined
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
                        if (searchQuery) {
                          clearSearchField()
                        }
                        setSelectedVerticals(e.value)
                        const selectedValues = e.value
                          .map((option: UseCaseVertical) => option.code)
                          .join(',')
                        router.push(
                          {
                            query: {
                              ...router.query,
                              vertical: selectedValues,
                              search: undefined
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
                  <ClearFilterButton
                    onClick={clearAllFilters}
                    disabled={
                      useCaseParam ||
                      migrationParam ||
                      searchParamInput ||
                      verticalParam
                        ? false
                        : true
                    }
                  />
                </div>
              </div>
            </div>

            {filteredUserStories.length > 0 ? (
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                {filteredUserStories.map((story, index) => {
                  return (
                    <div
                      key={index}
                      className={`relative flex flex-col shadow-xl shadow-black/25`}
                      onMouseMove={(event) => handleMouseMove(event, index)}
                      onMouseLeave={handleMouseLeave}>
                      <div className='story-header rounded-t-lg bg-primary-300 p-4'>
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
                              priority={true}
                              loading='eager'
                              className='max-h-[35px]'
                            />
                          )}
                        </div>
                      </div>
                      <div
                        className={`${
                          story.attributes.highlight &&
                          'border border-primary-300 bg-neutral-700'
                        } relative flex flex-grow flex-col overflow-hidden rounded-b-lg border border-t-0 border-neutral-700/80 p-6`}>
                        <div className='story-categories font-inconsolata text-primary-300'>
                          {story.attributes.useCase.data &&
                            story.attributes.useCase.data
                              .map((useCase) => {
                                return useCase.attributes.Name
                              })
                              .join(', ')}
                        </div>
                        <div className='story-title py-2 font-basier text-xl font-semibold'>
                          {story.attributes.Title}
                        </div>
                        <div className='story-description flex-grow text-balance'>
                          {story.attributes.Description}
                        </div>
                        {(story.attributes.ReadBlogLink ||
                          story.attributes.ExternalLink ||
                          story.attributes.WatchVideoLink) && (
                          <div className='mt-auto'>
                            <div className='mt-6 flex items-center justify-end gap-x-6 text-primary-300'>
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
                        {hoveredStoryIndex === index && (
                          <div
                            className='blurred-div pointer-events-none absolute -left-40 -top-24 h-full w-full rounded-full bg-white opacity-[4%] blur-2xl'
                            style={{
                              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
                              pointerEvents: 'none',
                              borderRadius: '50%'
                            }}
                          />
                        )}
                      </div>
                      {story.attributes.highlight && (
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
                  onClick={clearAllFilters}
                  disabled={
                    useCaseParam ||
                    migrationParam ||
                    searchParamInput ||
                    verticalParam
                      ? false
                      : true
                  }
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
