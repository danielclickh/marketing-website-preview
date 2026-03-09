export interface Office {
  id: number
  name: string
}

export type JobType = {
  url: string
  location: string
  title: string
  offices: number[]
}

export interface Department {
  name: string
}

export interface PositionType {
  offices: Office[]
  departments: Department[]
  location: { name: string }
  absolute_url: string
  title: string
}
