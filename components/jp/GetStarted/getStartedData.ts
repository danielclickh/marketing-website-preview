import { findOne } from '../../../lib/api/strapi'
import { GettingStartedData } from './types'

let getStarted: GettingStartedData | null = null

export async function fetchGetStartedData(): Promise<GettingStartedData> {
  getStarted = await findOne('getting-started', {
    populate: ['cloudButton', 'platforms', 'quickStartButton']
  })
  return getStarted as GettingStartedData
}

export async function getGetStartedData(): Promise<GettingStartedData> {
  if (getStarted) {
    return getStarted
  }

  return await fetchGetStartedData()
}
