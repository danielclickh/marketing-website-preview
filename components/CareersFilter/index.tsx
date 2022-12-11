'use client'
import React, { useMemo, useState } from 'react'
import useSWR from 'swr'
import {
  SuiTextField,
  SuiSpacer,
  SuiTitle,
  SuiText,
  SuiHorizontalDivide
} from '../sui'
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
  offices: [id: number, name: string][]
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

  const filteredDepartments: DepartmentType[] = useMemo(() => {
    if (!data) {
      return []
    }

    const filteredDepartment = selectedDepartment
      ? data.departments.filter(([name, _]) => selectedDepartment === name)
      : data.departments

    return filteredDepartment.map(([name, jobs]) => {
      return [
        name,
        selectedOffice
          ? jobs.filter((job: JobType) =>
              job.offices.includes(Number(selectedOffice))
            )
          : jobs
      ]
    })
  }, [selectedOffice, selectedDepartment, data])

  if (error) {
    return <div>Issue fetching jobs</div>
  }

  if (!data) {
    return <div> Loading</div>
  }
  return (
    <div className='flex flex-col md:flex-row container mx-auto max-w-7xl px-6 justify-between'>
      <div className='flex md:w-64 md:pr-8 pb-8 md:pb-0 flex-col'>
        <SuiTextField placeholder='Search' htmlFor='search' />
        <SuiSpacer size='lg' />
        <SuiTitle size='xxs'>
          <h4>Office</h4>
        </SuiTitle>
        <ul className='mt-4'>
          <li
            className={`left-bar-filter ${
              selectedOffice === null ? 'selected' : ''
            }`}
            onClick={() => setSelectedOffice(null)}>
            All
          </li>
          {data.offices.map(([officeId, officeName]) => (
            <li
              className={`left-bar-filter ${
                selectedOffice === officeId ? 'selected' : ''
              }`}
              key={officeId}
              onClick={() => setSelectedOffice(officeId)}>
              {officeName}
            </li>
          ))}
        </ul>

        <SuiSpacer size='lg' />
        <SuiTitle size='xxs'>
          <h4>Department</h4>
        </SuiTitle>
        <ul className='mt-4'>
          <li
            className={`left-bar-filter ${
              selectedDepartment === null ? 'selected' : ''
            }`}
            onClick={() => setSelectedDepartment(null)}>
            All
          </li>
          {data.departments.map(([name, _]) => (
            <li
              className={`left-bar-filter ${
                selectedDepartment === name ? 'selected' : ''
              }`}
              key={name}
              onClick={() => setSelectedDepartment(name)}>
              {name}
            </li>
          ))}
        </ul>
      </div>
      <div className='flex flex-col md:flex-row md:w-3/4 md:space-x-16 justify-center'>
        <div className='flex flex-col space-y-6 w-full'>
          {filteredDepartments.map(([name, jobs]: [string, JobType[]]) => (
            <React.Fragment key={name}>
              <SuiTitle size='sm'>
                <h4>{name}</h4>
              </SuiTitle>
              {jobs.length === 0 && <div>No results</div>}
              {jobs.map((job: JobType) => (
                <a
                  href={job.url}
                  className='rounded-md pl-4 flex flex-col w-full cursor-pointer hover:bg-cultured hover:dark:bg-onyx transition-all duration-300 ease-in-out transform'
                  key={job.url}>
                  <SuiText size='lg'>
                    <p>
                      {job.title}
                      <span className='text-web-light-c4 dark:text-web-dark-c4 flex'>
                        {job.location}
                      </span>
                    </p>
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
