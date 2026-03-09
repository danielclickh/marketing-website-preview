import { CommonProps } from './homepage'
import { StrapiImageType } from '@/lib/api/strapi/types'

export interface ClientUsing {
  logo: StrapiImageType
  clientName: string
  href: string
  icon: StrapiImageType
  id?: string
}

export interface Quote {
  id: number
  quotes: {
    logo: StrapiImageType
    customerName: string
    href: string
    quote: string
  }
}

export interface UseCaseItem {
  id: number
  title: string
  description: string
  ClientsUsingUseCase: Array<ClientUsing>
  icon: StrapiImageType
}

export interface Industry {
  name: string
  description: string
  href: string
  icon: StrapiImageType
}

export interface useCasesPageDataProps extends CommonProps {
  useCasesPageData: {
    Title: string
    Description: string
    ctaButton: {
      text: string
      href: string
    }
    Industries: Array<Industry>
  }
  individualUseCases: Array<UseCaseItem>
  quotes: Array<Quote>
  comparisons?: any
}
