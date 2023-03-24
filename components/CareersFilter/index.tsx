import React, { ChangeEvent, useMemo, useState } from 'react'
import useSWR from 'swr'
import CategorySelector from '../CategorySelector'
import {
  SuiSearchField,
  SuiTitle,
  SuiText,
  SuiHorizontalDivide,
  SuiLink
} from '../sui/client'
import { JobType, PositionType } from './types'

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
        location: locationList.join(', '),
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
      <div className='flex flex-col md:flex-row container mx-auto max-w-7xl justify-between'>
        <SuiText size='base' weight='normal' className='pl-4'>
          Issue fetching jobs
        </SuiText>
      </div>
    )
  }

  if (!data) {
    return (
      <div className='flex flex-col md:flex-row container mx-auto max-w-7xl justify-between'>
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
    text: name,
    onClick: () => setSelectedDepartment(name),
    selected: selectedDepartment === name
  }))
  departments.unshift({
    text: 'All',
    onClick: () => setSelectedDepartment(null),
    selected: selectedDepartment === null
  })

  return (
    <div className='flex flex-col w-full'>
      <div className='w-full flex flex-col md:flex-row md:justify-between mb-6'>
        <SuiSearchField
          placeholder='Search job'
          htmlFor='search'
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
        />
        <CategorySelector options={departments} />
      </div>
      <div className=''>
        <div className='mt-4'>
          {filteredDepartments.map(([name, jobs]: [string, JobType[]]) => (
            <div
              key={name}
              className='grid grid-cols-1 border-b border-neutral-700 mb-10'>
              <h3 className='font-inter text-xl font-bold mb-8'>{name}</h3>
              {jobs.length === 0 && (
                <SuiText size='base' weight='normal' color='secondary'>
                  No results
                </SuiText>
              )}
              {jobs.map((job: JobType, index: number) => (
                <div
                  key={job.url}
                  className='border-t border-neutral-700 py-6 hover:bg-neutral-725 '>
                  <SuiLink
                    href={job.url}
                    className={`job-${index} md:flex items-center justify-between hover:no-underline`}>
                    <div>
                      <SuiText
                        size='base'
                        weight='normal'
                        className='font-inter text-primary-300 mb-1'>
                        {job.title}
                      </SuiText>
                      <SuiText size='base' weight='normal' color='secondary'>
                        {job.location}
                      </SuiText>
                    </div>
                    <div className='mt-4 md:mt-0 border border-primary-600 rounded py-2 px-6 font-semibold'>
                      Apply --{'>'}
                    </div>
                  </SuiLink>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CareersFilter
