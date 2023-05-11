import { CommonProps } from './homepage'
import { StrapiButton, StrapiImageType } from '../lib/api/strapi/types'

export interface ClientUsing {
  logo: StrapiImageType
  clientName: string
  href: string
  icon: StrapiImageType
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
  title: string
  description: string
  ClientsUsingUseCase: Array<ClientUsing>
}

export interface useCasesPageDataProps extends CommonProps {
  useCasesPageData: {
    Title: string
    Description: string
    ctaButton: {
      text: string
      href: string
    }
  }
  individualUseCases: Array<UseCaseItem>
  quotes: Array<Quote>
}
