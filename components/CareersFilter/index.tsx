'use client'
import React, { useMemo, useState } from 'react'
import useSWR from 'swr'
import CategorySelector from '../CategorySelector'
import { SuiTextField, SuiTitle, SuiText, SuiHorizontalDivide } from '../sui'
type JobType = {
  url: string
  location: string
  title: string
  offices: number[]
}

type DepartmentType = [name: string, jobs: JobType[]]
const convertMapToArray = (obj: any) => {
  return Object.entries(Object.fromEntries(obj))
}

const fetcher = async (url: string) => {
  const response = await fetch(url)
  let positions = (await response.json()).jobs
  const departments = new Map<string, JobType[]>()
  const offices = new Map<string, string>()
  positions.forEach((position) => {
    const locationList: string[] = []
    const officesByPositions = position.offices.map((office) => {
      offices.set(office.id, office.name)
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
        selectedOffice
          ? jobs.filter((job: JobType) => {
              const hasOffice = job.offices.includes(Number(selectedOffice))
              if (search.length > 0) {
                return filterJobBySearchContent(job)
              }
              return hasOffice
            })
          : search.length > 0
          ? jobs.filter(filterJobBySearchContent)
          : jobs
      ]
    })
  }, [selectedOffice, selectedDepartment, data, search])

  if (error) {
    return <div>Issue fetching jobs</div>
  }

  if (!data) {
    return <div> Loading</div>
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
    <div className='flex flex-col md:flex-row container mx-auto max-w-7xl px-6 justify-between'>
      <div className='flex md:w-64 md:pr-8 pb-8 md:pb-0 flex-col'>
        <SuiTextField
          placeholder='Search'
          htmlFor='search'
          onChange={(e) => setSearch(e.target.value)}
        />
        <SuiTitle type='h6' className='mt-6'>
          Office
        </SuiTitle>
        <CategorySelector options={offices} />
        <SuiTitle type='h6' className='mt-6'>
          Department
        </SuiTitle>
        <CategorySelector options={departments} />
      </div>
      <div className='flex flex-col md:flex-row md:w-3/4 md:space-x-16 justify-center'>
        <div className='flex flex-col space-y-6 w-full'>
          {filteredDepartments.map(([name, jobs]: [string, JobType[]]) => (
            <React.Fragment key={name}>
              <SuiTitle type='h3'>{name}</SuiTitle>
              {jobs.length === 0 && <div>No results</div>}
              {jobs.map((job: JobType) => (
                <a
                  href={job.url}
                  className='rounded-md pl-4 flex flex-col w-full cursor-pointer hover:bg-c2 transition-all duration-300 ease-in-out transform'
                  key={job.url}>
                  <SuiText size='base' weight='medium'>
                    {job.title}
                  </SuiText>
                  <SuiText size='base' weight='medium' color='secondary'>
                    {job.location}
                  </SuiText>
                  <SuiHorizontalDivide />
                </a>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CareersFilter
