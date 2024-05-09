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
import Layout from '../../components/Layout'
import { findOne } from '../../lib/api/strapi'
import { galaxyOnPage } from '../../lib/galaxy/galaxy'
import { getCommonProps } from '../../lib/utils/getCommonProps'
import { UseCaseCategory, UserStoriesPage } from '../../types/userStories'
import { Tailwind } from '../../lib/utils/primereact'

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

  const [selectedUseCases, setselectedUseCases] = useState(null)
  const [useCases, setUseCases] = useState<UseCaseCategory[]>()

  useEffect(() => {
    setUseCases(UseCaseCategories)

    document.querySelector('.multiselect-target')?.classList.remove('hidden')
  }, [UseCaseCategories])

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
                  onChange={(e) => setselectedUseCases(e.value)}
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
                  value={selectedUseCases}
                  onChange={(e) => setselectedUseCases(e.value)}
                  options={useCases}
                  optionLabel='name'
                  placeholder='Use Case'
                  maxSelectedLabels={0}
                  panelHeaderTemplate={<></>}
                  selectedItemsLabel='Use Case ({0})'
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
