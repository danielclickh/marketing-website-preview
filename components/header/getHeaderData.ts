import { findOne } from '../../lib/api/strapi'
import { HeaderData } from './types'

let headerData: HeaderData | null = null

export async function fetchHeaderData(): Promise<HeaderData> {
  headerData = await findOne('header', {
    populate: [
      'logoIcon',
      'ctaButton',
      'ctaSecondaryButton',
      'href',
      'target',
      'menuItems.menuItems',
      'menuItems.menuItems.icon'
    ]
  })
  return headerData as HeaderData
}

export async function getHeaderData(): Promise<HeaderData> {
  if (headerData) {
    return headerData
  }

  return await fetchHeaderData()
}
