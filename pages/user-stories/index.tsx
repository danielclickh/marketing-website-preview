import { CirclePlay } from 'lucide-react'
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
      UseCaseCategories.push({
        code: item.id,
        name: item.attributes.Name
      })
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

    migrationsPayload.data.forEach((item: any) => {
      UseCaseMigrations.push({
        code: item.id,
        name: item.attributes.Name
      })
    })

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

    verticalsPayload.data.forEach((item: any) => {
      UseCaseVerticals.push({
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
  //set the multiselect dropdown values
  const [useCases, setUseCases] = useState<UseCaseCategory[]>()
  const [migrations, setMigrations] = useState<UseCaseMigration[]>()
  const [verticals, setVerticals] = useState<UseCaseVertical[]>()

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

    // Return true only if any selected parameter matches or if no values are selected, and it matches the latest filter
    return useCaseMatch && migrationMatch && verticalMatch && latestMatch
  })

  useEffect(() => {
    setUseCases(UseCaseCategories)
    setMigrations(UseCaseMigrations)
    setVerticals(UseCaseVerticals)

    //stop flash of unstyled content
    const multiselectTargets = document.querySelectorAll('.multiselect-target')
    multiselectTargets.forEach((item) => {
      item.classList.remove('hidden')
    })
  }, [UseCaseCategories, UseCaseMigrations])

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
  }, [useCaseParam, migrationParam, verticalParam])

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <PrimeReactProvider
        value={{
          unstyled: true,
          pt: Tailwind,
          ptOptions: {
            mergeSections: true,
            mergeProps: true,
            classNameMergeFunction: twMerge
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
            <div className='filters mb-6 flex items-center gap-x-4'>
              <div className='search'>search</div>
              <button
                type='button'
                className={`${
                  orderByDate
                    ? 'bg-primary-300 text-black'
                    : 'border-opacity-[0.3] text-white'
                } rounded-full border border-primary-500 py-3 px-4 text-sm font-semibold text-black`}
                onClick={toggleOrderByDate}>
                Latest
              </button>
              <div className='multiselect-target hidden'>
                <MultiSelect
                  value={selectedUseCases}
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
                  options={useCases}
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
                  options={migrations}
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
                  options={verticals}
                  optionLabel='name'
                  placeholder='Vertical'
                  maxSelectedLabels={0}
                  panelHeaderTemplate={<></>}
                  selectedItemsLabel='Vertical ({0})'
                  unstyled
                />
              </div>
            </div>

            <div className='grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3'>
              {sortedUserStories &&
                filteredUserStories.map((story, index) => {
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
          </div>
          <FollowUs />
        </div>
      </PrimeReactProvider>
    </Layout>
  )
}

export default CustomerStoriesPage
