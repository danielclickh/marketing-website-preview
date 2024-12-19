import { findOne } from '../../../lib/api/strapi'
import { FooterData } from './types'

let footerData: FooterData | null = null

export async function fetchFooterData(): Promise<FooterData> {
  footerData = await findOne('footer', {
    populate: [
      'logoSvg',
      'topLevelFooterMenu',
      'topLevelFooterMenu.items',
      'newsletterForm',
      'socialLinks',
      'socialLinks.socialLinkItems',
      'socialLinks.socialLinkItems.iconSvg',
      'bottomLinks'
    ]
  })
  return footerData as FooterData
}

export async function getFooterData(): Promise<FooterData> {
  if (footerData) {
    return footerData
  }

  return await fetchFooterData()
}
