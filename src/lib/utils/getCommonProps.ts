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
  const github: HeaderProps['github'] = {
    stars: 36719,
    contributors: 1300,
    prs: 36000,
    releases: 700
  }

  if (typeof githubApiData === 'object') {
    ;(Object.keys(github) as Array<keyof typeof github>).forEach((key) => {
      if (
        githubApiData.hasOwnProperty(key) &&
        typeof githubApiData[key] === 'number'
      ) {
        github[key] = githubApiData[key]
      }
    })
  }

  return {
    footerData,
    platforms: getStartedData.platforms,
    headerData: {
      github
    }
  }
}
