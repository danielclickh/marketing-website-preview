import type { InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import React, { ChangeEvent, useEffect, useState } from 'react'
import CategorySelector from '../../components/CategorySelector'
import GetStartedFree from '../../components/GetStartedFree'
import Layout from '../../components/Layout'
import { StrapiImage } from '../../components/StrapiElements'
import { SuiSearchField, SuiTitle } from '../../components/sui'
import { fetchAll } from '../../lib/api/strapi'
import { StrapiImageType } from '../../lib/api/strapi/types'
import { getCommonProps } from '../../lib/utils/getCommonProps'
import { REVALIDATE_SECONDS } from '../../lib/utils/revalidationConfig'
import { getCategory } from '../../lib/videos'
import { CommonProps } from '../../types/homepage'
import { CUICard } from '../../components/ClickUI'

interface Integration {
  name: string,
  logo: StrapiImageType,
  logo_dark?: StrapiImageType,
  category: string,
  website?: string
}

interface IntegrationGroup {
  label: string,
  description?: string,
  slug: string,
  integrations: Array<Integration>
}

interface IntegrationsPageProps extends CommonProps {
  title: string,
  integrationGroups: Array<IntegrationGroup>,
}

export async function getStaticProps() {


  const data = await fetchAll('integrations', {
    sort: ['name:ASC', 'date:DESC'],
    populate: ['logo', 'logo_dark'],
    fields: [
      'name',
      'category',
      'website',
    ]
  });

  const integrationGroups: Array<IntegrationGroup> = [
    {
      label: 'Data ingestion',
      description: 'Streamline your data pipelines with ClickHouse! Seamless integrations ensure efficient ingestion, optimizing real-time analytics.',
      slug: 'data-ingestion',
      integrations: data.filter(item => item.category === 'DATA_INGESTION'),
    },
    {
      label: 'Data visualization',
      description: 'Illuminate your data stories! ClickHouse integrations enhance visualization, making insights more vivid & actionable.',
      slug: 'data-visualization',
      integrations: data.filter(item => item.category === 'DATA_VISUALIZATION'),
    },
    {
      label: 'SQL client',
      description: 'Harness the power of SQL with ClickHouse! Integrated clients enable swift queries, delivering instant, precise results.',
      slug: 'sql-client',
      integrations: data.filter(item => item.category === 'SQL_CLIENT'),
    },
    {
      label: 'Language client',
      description: 'Code in your comfort zone! ClickHouse\'s language client integrations make data access fluent across multiple programming languages.',
      slug: 'language-client',
      integrations: data.filter(item => item.category === 'LANGUAGE_CLIENT'),
    },
  ];

  const props: IntegrationsPageProps = {
    title: 'Integrations',
    seo: {
      title: 'ClickHouse Integrations',
      description: '',
      path: '/integrations'
    },
    integrationGroups,
    ...(await getCommonProps())
  };

  return {
    props,
    revalidate: REVALIDATE_SECONDS
  }
}

function DataGripLogo(props: React.SVGProps<any>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='70' height='70' version='1' viewBox='0 0 70 70' {...props}>
      <path fill='#9775F8' d='M65.5 10.9L70 39.5l-17 9.9-3.2-16.2z'></path>
      <linearGradient id='data-grip-logo-a' x1='41.069' x2='46.521' y1='54.357' y2='67.944' gradientTransform='matrix(1 0 0 -1 0 72)' gradientUnits='userSpaceOnUse'>
        <stop offset='0' stopColor='#9775f8'></stop>
        <stop offset='0.952' stopColor='#22d88f'></stop>
      </linearGradient>
      <path fill='url(#data-grip-logo-a)' d='M65.5 10.9L40.5 0 19.4 17.5l30.4 15.7z'></path>
      <linearGradient id='data-grip-logo-b' x1='17.067' x2='24.146' y1='35.739' y2='4.895' gradientTransform='matrix(1 0 0 -1 0 72)' gradientUnits='userSpaceOnUse'>
        <stop offset='0' stopColor='#9775f8'></stop>
        <stop offset='0.214' stopColor='#689cce'></stop>
        <stop offset='0.423' stopColor='#42bdac'></stop>
        <stop offset='0.59' stopColor='#2bd197'></stop>
        <stop offset='0.694' stopColor='#22d88f'></stop>
      </linearGradient>
      <path fill='url(#data-grip-logo-b)' d='M47.3 70L18 30.6l-8.7 5.8L.6 62.5z'></path>
      <linearGradient id='data-grip-logo-c' x1='4.9' x2='66.239' y1='37.969' y2='4.102' gradientTransform='matrix(1 0 0 -1 0 72)' gradientUnits='userSpaceOnUse'>
        <stop offset='0.075' stopColor='#22d88f'></stop>
        <stop offset='0.72' stopColor='#9775f8'></stop>
      </linearGradient>
      <path fill='url(#data-grip-logo-c)' d='M52.8 50.1L32.3 36.6 0 32.3 47.3 70z'></path>
      <linearGradient id='data-grip-logo-d' x1='0' x2='61.646' y1='45.15' y2='45.15' gradientTransform='matrix(1 0 0 -1 0 72)' gradientUnits='userSpaceOnUse'>
        <stop offset='0.075' stopColor='#22d88f'></stop>
        <stop offset='0.266' stopColor='#5ab0b4'></stop>
        <stop offset='0.565' stopColor='#b86cf2'></stop>
        <stop offset='1' stopColor='#ff59e6'></stop>
      </linearGradient>
      <path fill='url(#data-grip-logo-d)' d='M0 .5v31.8l60.8 20.9 4.7-42.3z'></path>
      <path d='M13.4 13.4h43.2v43.2H13.4z'></path>
      <path fill='#FFF' d='M17.8 19h7c5.6 0 9.5 3.9 9.5 8.9v.1c0 5-3.9 8.9-9.5 8.9h-7V19zm3.9 3.6v10.8h3c3.2 0 5.4-2.2 5.4-5.3V28c0-3.2-2.2-5.4-5.4-5.4h-3zM35 28c0-5.1 4-9.3 9.4-9.3 3.2 0 5.2.9 7 2.5l-2.5 3c-1.4-1.2-2.6-1.8-4.7-1.8-2.9 0-5.1 2.5-5.1 5.6 0 3.3 2.2 5.7 5.4 5.7 1.4 0 2.7-.4 3.7-1.1V30h-4v-3.4H52v7.8c-1.8 1.6-4.4 2.8-7.6 2.8-5.6 0-9.4-3.9-9.4-9.2zM17.4 48.5h16.2v2.7H17.4z'></path>
    </svg>
  );
}

function IntegrationCard({
  name,
  logo,
  logo_dark,
  website,
}: Integration) {


  const logoElement = (() => {
    const logoClasses = 'w-full h-auto aspect-square object-contain';

    switch (name) {
      case 'DataGrip':
        return <DataGripLogo className={logoClasses} />
      default:
        return <StrapiImage {...(logo_dark || logo)} sizes='medium' alt={name} className={logoClasses} />
    }
  })()

  return (
    <CUICard>
      <CUICard.Body className='relative bg-neutral-700/50'>
        {website && <a href={website} target='_blank' rel='noopener nofollow' className='block absolute inset-0'>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 14 14" className='absolute top-3 right-3'>
            <path stroke="#FAFF69" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.66653 1h3.33337v3.33333M8.33322 5.66667 12.9999 1m-1.3334 7.33331v3.33329c0 .7367-.5966 1.3334-1.3333 1.3334H2.33321c-.73667 0-1.333332-.5967-1.333332-1.3334V3.66665c0-.73667.596662-1.33334 1.333332-1.33334h3.33333" />
          </svg>
        </a>}
        <div
          className="flex flex-col gap-3 items-center justify-center text-center aspect-square rounded-lg">
          <div className="max-w-[64px] w-full aspect-square">
            {logoElement}
          </div>
          <SuiTitle type='h4' className='w-full px-2'>
            {name}
          </SuiTitle>
        </div>
      </CUICard.Body>
    </CUICard>
  )
}

export default function IntegrationsPage({
  title,
  integrationGroups,
  seo,
  headerData,
  footerData
}: InferGetStaticPropsType<typeof getStaticProps>) {

  const router = useRouter()

  const [category, setCategory] = useState<string|null>(null)
  const [search, setSearch] = useState<string|null>(null)

  const searchChange = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)

  const groups = (() => {
    let categoryGroups = structuredClone(integrationGroups);

    // Filter groups by category
    if (category) {
      categoryGroups = categoryGroups.filter(group => {
        return group.slug === category
      })
    }

    // Filter integrations by search term
    if (search) {
      categoryGroups = categoryGroups.map(group => {
        group.integrations = group.integrations.filter(integration => {
          return integration.name.toLowerCase().includes(search.trim().toLowerCase())
        })
        return group
      })
    }

    // Remove groups that have no integrations
    return categoryGroups.filter(group => {
      return group.integrations.length;
    })
  })()

  const categoryList = [
    {
      text: 'All',
      selected: !category,
      onClick() {
        setCategory(null)
      }
    },
    ...integrationGroups.map(group => {
      return {
        text: group.label,
        selected: group.slug === category,
        onClick() {
          setCategory(group.slug)
        }
      }
    })
  ]

  const getCategory = (categorySlug: string): IntegrationGroup|undefined  => {
    return integrationGroups.find(group => group.slug === categorySlug)
  }

  // Load values from query string
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const urlCategory = queryParams.get('category')
    const urlSearch = queryParams.get('search')

    // Check the url category is valid using the `getCategory` function
    if (urlCategory && String(urlCategory).trim().length && getCategory(String(urlCategory).trim())) {
      setCategory(urlCategory)
    }

    // Check the search query is not empty
    if (urlSearch && String(urlSearch).trim().length) {
      setSearch(urlSearch)
    }
  }, [router])

  // Update query string values
  useEffect(() => {
    const queryParams = [];

    if (category && getCategory(category)) {
      queryParams.push(`category=${encodeURIComponent(category)}`);
    }

    if (search) {
      queryParams.push(`search=${encodeURIComponent(search)}`);
    }

    if (queryParams.length) {
      router.push('/integrations?' + queryParams.join('&'), undefined, { shallow: true })
    } else {
      router.push('/integrations', undefined, { shallow: true })
    }
  }, [category, search]);

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='bg-grid text-center py-10 md:py-16 lg:py-20 text-neutral-100'>
        <div className='max-w-7xl container mx-auto px-8 2xl:px-0'>
          <SuiTitle type='h1'>
            {title}
          </SuiTitle>
          <p className='text-lg mt-6'>Connect the tools and services that you love with ClickHouse.</p>
        </div>
      </div>

      <div className='max-w-7xl container mx-auto px-8 2xl:px-0 space-y-20 mb-20'>
        <div className='flex-col lg:flex lg:flex-row lg:justify-between items-center lg:space-x-24'>
          <SuiSearchField
            placeholder='Search by integration...'
            htmlFor='search'
            className='lg:flex-1 mb-6 lg:mb-0'
            value={search || ''}
            onChange={searchChange} />
          <CategorySelector options={categoryList} />
        </div>

        {groups.map(group => {
          return (
            <div key={group.slug}>
              <SuiTitle type='h3' className='mb-3'>
                {group.label}
              </SuiTitle>
              {group.description && <p className="text-sm">{group.description}</p>}
              <div
                className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 justify-center gap-3 mt-6'>
                {group.integrations.map(integration => <IntegrationCard {...integration} />)}
              </div>
            </div>
          )
        })}

        {!groups.length && (
          <p className='text-center w-full mt-12 mb-20'>
            {search ? `No search results for "${search}"` : 'No results'}
            {category && getCategory(category) ? ` in ${getCategory(category)?.label}` : ''}
          </p>
        )}

        <GetStartedFree
          href='https://clickhouse.cloud/signUp?loc=integrations'
          textBefore='Get started with ClickHouse'
          textSlanted='Cloud'
          textAfter='for free' />

      </div>

    </Layout>
  )
}
