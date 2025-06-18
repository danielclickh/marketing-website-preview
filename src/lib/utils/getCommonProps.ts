import githubApiData from '@/../public/githubApiData.json'
import { getFooterData } from '@/components/Footer/getFooterData'
import { FooterData } from '@/components/Footer/types'
import { getGetStartedData } from '@/components/GetStarted/getStartedData'
import { GettingStartedPlatform } from '@/components/GetStarted/types'
import { HeaderProps } from '@/components/Header/types'

interface Props {
  footerData: FooterData
  platforms: Array<GettingStartedPlatform>
  headerData: HeaderProps
}

export async function getCommonProps(): Promise<Props> {
  const footerData = await getFooterData()
  const getStartedData = await getGetStartedData()

  // Set default fallback
  let stars = 36719
  let contributors = 1300
  let prs = 36000

  if (typeof githubApiData === 'object') {
    if (
      githubApiData.hasOwnProperty('stars') &&
      typeof githubApiData.stars === 'number'
    ) {
      stars = githubApiData.stars
    }
    if (
      githubApiData.hasOwnProperty('contributors') &&
      typeof githubApiData.contributors === 'number'
    ) {
      contributors = githubApiData.contributors
    }
    if (
      githubApiData.hasOwnProperty('prs') &&
      typeof githubApiData.prs === 'number'
    ) {
      prs = githubApiData.prs
    }
  }

  return {
    footerData,
    platforms: getStartedData.platforms,
    headerData: {
      github: {
        stars,
        contributors,
        prs
      }
    }
  }
}
