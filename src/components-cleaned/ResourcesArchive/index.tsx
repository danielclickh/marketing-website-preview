'use client'

import PillFilters from '@/components-cleaned/PillFilters'
import { SuiSearchField, SuiTitle } from '@/components/sui'
import { convertDateToString } from '@/lib/utils/dateUtils'
import { EntryResource, EntryResourceCategory } from '@/types/strapi'
import Link from 'next/link'
import { useMemo, useState } from 'react'

export interface ResourcesArchiveProps {
  resources: Array<EntryResource>
  categories: Array<EntryResourceCategory>
  activeCategory?: EntryResourceCategory
}

export default function ResourcesArchive({
  resources,
  categories,
  activeCategory
}: ResourcesArchiveProps) {
  const [search, setSearch] = useState('')

  const filteredResources = useMemo(() => {
    const searchTerm = search.trim().toLowerCase()

    return resources.filter((resource) => {
      const inTitle = resource.title.toLowerCase().includes(searchTerm)
      const inExcerpt = resource.excerpt.toLowerCase().includes(searchTerm)
      return inTitle || inExcerpt
    })
  }, [search, resources])
  return (
    <>
      <div className='flex-col items-center lg:flex lg:flex-row lg:justify-between lg:space-x-24'>
        <SuiSearchField
          placeholder='Search by title or keyword...'
          htmlFor='search'
          className='mb-6 max-w-sm lg:mb-0 lg:flex-1'
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
        />
        {categories.length > 1 && (
          <nav className='ml-auto'>
            <PillFilters
              options={[
                {
                  kind: 'link',
                  label: 'View all',
                  href: '/resources',
                  active: !activeCategory
                },
                ...categories.map((category) => ({
                  kind: 'link' as const,
                  label: category.name,
                  href: `/resources/${category.slug}`,
                  active: activeCategory && category.id === activeCategory.id
                }))
              ]}
            />
          </nav>
        )}
      </div>

      <hr className='my-6 h-px border-0 bg-white/20' />

      {filteredResources.length > 0 ? (
        <ul className='space-y-10'>
          {filteredResources.map((resource, resourceIndex) => {
            return (
              <li className='relative space-y-4' key={resourceIndex}>
                <SuiTitle type='h2' className='!text-xl'>
                  <Link
                    href={`/resources/${resource.category.slug}/${resource.slug}`}
                    className='text-primary-300 hover:underline'>
                    <span className='absolute inset-0' />
                    {resource.title}
                  </Link>
                </SuiTitle>
                <p className='mt-2 text-neutral-200'>{resource.excerpt}</p>
                {(resource.author || resource.date) && (
                  <p className='text-sm text-neutral-200'>
                    {[
                      resource.author?.name,
                      resource?.date ? convertDateToString(resource.date) : null
                    ]
                      .filter(Boolean)
                      .join(' • ')}
                  </p>
                )}
              </li>
            )
          })}
        </ul>
      ) : (
        <p className='mt-16 text-center'>
          {search && resources.length
            ? `No results found. Try a broader or different search term.`
            : 'No resources available at the moment. Please check back soon.'}
        </p>
      )}
    </>
  )
}
