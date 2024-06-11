import { CommonProps } from './homepage'

export interface UserStoriesPage extends CommonProps {
  userStories: UserStory[]
  UseCaseCategories: UseCaseCategory[]
  UseCaseMigrations: UseCaseMigration[]
  UseCaseVerticals: UseCaseVertical[]
}

export interface UseCaseCategory {
  code: number
  name: string
}

export interface UseCaseMigration {
  code: number
  name: string
}

export interface UseCaseVertical {
  code: number
  name: string
}

export interface UserStory {
  id: number
  attributes: {
    Title: string
    highlight: boolean
    Description: string | null
    ReadBlogLink: string | null
    ExternalLink: string | null
    WatchVideoLink: string | null
    createdAt: string
    updatedAt: string
    publishedAt: string
    SortOrder: number
    User: {
      data: UserData
    }
    useCase: {
      data: UseCase[]
    }
    migrations: {
      data: Migration[]
    }
    vertical: {
      data: Vertical[]
    }
  }
}

interface UserData {
  id: number
  attributes: {
    Name: string
    createdAt: string
    updatedAt: string
    logo: {
      data: LogoData
    }
  }
}

interface LogoData {
  id: number
  attributes: {
    name: string
    alternativeText: string | null
    caption: string | null
    width: number
    height: number
    formats: any
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl: string | null
    provider: string
    provider_metadata: any
    createdAt: string
    updatedAt: string
  }
}

export interface UseCase {
  id: number
  attributes: {
    Name: string
    createdAt: string
    updatedAt: string
  }
}

export interface Migration {
  id: number
  attributes: {
    Name: string
    createdAt: string
    updatedAt: string
  }
}

export interface Vertical {
  id: number
  attributes: {
    Name: string
    createdAt: string
    updatedAt: string
  }
}
