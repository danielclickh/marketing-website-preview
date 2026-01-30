import { CUIButton } from '../ClickUI'
import { SuiLink, SuiSearchField, SuiText } from '../sui/client'
import { JobType, PositionType } from './types'
import PillFilters, { Filter } from '@/components-cleaned/PillFilters'
import LinkWithArrow from '@/components/LinkWithArrow'
import { ChevronRightIcon } from '@heroicons/react/solid'
import { ChangeEvent, useMemo, useState } from 'react'
import useSWR from 'swr'

type DepartmentType = [name: string, jobs: JobType[]]
const convertMapToArray = (obj: any) => {
  return Object.entries(Object.fromEntries(obj))
}

const fetcher = async (url: string) => {
  const response = await fetch(url)
  let positions: PositionType[] = (await response.json()).jobs
  const departments = new Map<string, JobType[]>()
  const offices = new Map<string, string>()
  positions.forEach((position) => {
    const locationList: string[] = []
    const officesByPositions = position.offices.map((office) => {
      offices.set(office.id.toString(), office.name)
      locationList.push(office.name)
      return office.id
    })
    position.departments.forEach((department) => {
      const jobs = departments.get(department.name) ?? []
      jobs.push({
        url: position.absolute_url,
        location: position.location.name,
        title: position.title,
        offices: officesByPositions
      })
      departments.set(department.name, jobs)
    })
  })

  return {
    departments: convertMapToArray(departments),
    offices: convertMapToArray(offices)
  }
}

type DataContent = null | {
  departments: DepartmentType[]
  offices: [id: string, name: string][]
}

function CareersFilter() {
  const { data, error } = useSWR<DataContent>(
    'https://boards-api.greenhouse.io/v1/boards/clickhouse/jobs?content=true',
    fetcher
  )

  const [selectedOffice, setSelectedOffice] = useState<string | null>(null)
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  )
  const [search, setSearch] = useState<string>('')

  const filteredDepartments: DepartmentType[] = useMemo(() => {
    if (!data) {
      return []
    }

    const filteredDepartment = selectedDepartment
      ? data.departments.filter(([name, _]) => selectedDepartment === name)
      : data.departments

    const filterJobBySearchContent = (job: JobType) => {
      const foundMatches = search
        .toLowerCase()
        .trim()
        .split(' ')
        .every((keyword) => {
          return (
            job.title.toLowerCase().includes(keyword) ||
            job.location.toLowerCase().includes(keyword)
          )
        })
      return foundMatches
    }

    return filteredDepartment.map(([name, jobs]) => {
      return [
        name,
        search.length > 0 ? jobs.filter(filterJobBySearchContent) : jobs
      ]
    })
  }, [selectedDepartment, data, search])

  if (error) {
    return (
      <div className='container mx-auto flex max-w-7xl flex-col justify-between md:flex-row'>
        <SuiText size='base' weight='normal' className='pl-4'>
          Issue fetching jobs
        </SuiText>
      </div>
    )
  }

  if (!data) {
    return (
      <div className='container mx-auto flex max-w-7xl flex-col justify-between md:flex-row'>
        <SuiText size='base' weight='normal' className='pl-4'>
          Loading
        </SuiText>
      </div>
    )
  }

  const offices = data.offices.map(([officeId, officeName]) => ({
    text: officeName,
    onClick: () => setSelectedOffice(officeId),
    selected: selectedOffice === officeId
  }))
  offices.unshift({
    text: 'All',
    onClick: () => setSelectedOffice(null),
    selected: selectedOffice === null
  })

  const departments = data.departments.map(([name, _]) => ({
    kind: 'button',
    label: name,
    onClick(event) {
      event.preventDefault()
      setSelectedDepartment(name)
    },
    active: selectedDepartment === name
  })) satisfies Array<Filter>
  departments.unshift({
    kind: 'button',
    label: 'All',
    onClick(event) {
      event.preventDefault()
      setSelectedDepartment(null)
    },
    active: selectedDepartment === null
  })

  return (
    <div className='flex w-full flex-col'>
      <div className='flex-col items-start pb-8'>
        <SuiSearchField
          placeholder='Search jobs...'
          htmlFor='search'
          className='mb-6'
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
        />
        <PillFilters options={departments} />
      </div>
      <div className='rounded-lg bg-neutral-725 p-4 text-center text-sm text-neutral-200'>
        <p>
          Langfuse is now part of the ClickHouse team, and they're hiring in
          Berlin and San Francisco.{' '}
          <LinkWithArrow
            href='https://jobs.ashbyhq.com/langfuse'
            target='_blank'
            className='text-primary-300 hover:underline'>
            Check out their openings here
          </LinkWithArrow>
        </p>
      </div>
      <div>
        <div className='mt-4'>
          {filteredDepartments.every(([name, jobs]) => jobs.length === 0) && (
            <h3>No results matching your search</h3>
          )}
          {filteredDepartments.map(([name, jobs]: [string, JobType[]]) => (
            <div key={name}>
              {jobs.length > 0 && (
                <div className='mb-16 grid grid-cols-1 border-b border-neutral-700'>
                  <h3 className='mb-8 font-inter text-xl font-bold'>{name}</h3>
                  {jobs.map((job: JobType, index: number) => (
                    <div
                      key={job.url}
                      className='border-t border-neutral-700 px-4 py-6 hover:bg-neutral-725'>
                      <SuiLink
                        href={job.url}
                        className={`job-${index} items-center justify-between hover:no-underline md:flex`}>
                        <div>
                          <SuiText
                            size='base'
                            weight='normal'
                            className='mb-1 font-inter text-primary-300'>
                            {job.title}
                          </SuiText>
                          <SuiText
                            size='base'
                            weight='normal'
                            color='secondary'>
                            {job.location}
                          </SuiText>
                        </div>
                        <CUIButton
                          type='secondary'
                          className='group mt-4 w-auto md:mt-0'
                          target='_blank'
                          iconRight={
                            <ChevronRightIcon
                              height='18'
                              className='pt-0.5 transition group-hover:translate-x-1/2'
                            />
                          }>
                          Apply
                        </CUIButton>
                      </SuiLink>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CareersFilter
