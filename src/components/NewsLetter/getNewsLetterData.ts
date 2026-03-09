import { findOne } from '@/lib/api/strapi'
import { NewsLetterData } from '@/types/homepage'

let newsLetterData: NewsLetterData | null = null

export async function fetchNewsLetterData(): Promise<NewsLetterData> {
  newsLetterData = await findOne('newsletter-form', {
    populate: '*'
  })

  return newsLetterData as NewsLetterData
}

export async function getNewsLetterData(): Promise<NewsLetterData> {
  if (newsLetterData) {
    return newsLetterData
  }

  return await fetchNewsLetterData()
}
