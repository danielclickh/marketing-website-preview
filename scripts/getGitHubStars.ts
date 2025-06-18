import fs from 'fs'
import path from 'path'

const REPO = 'ClickHouse/ClickHouse'

function log(message: string) {
  console.log(`[${new Date().toTimeString()}] ${message}`)
}

function warn(message: string) {
  console.warn(`[${new Date().toTimeString()}] ${message}`)
}

function generateFile(data: Record<string, number>) {
  try {
    const outputPath = path.join(
      __dirname,
      '..',
      'public',
      'githubApiData.json'
    )
    fs.writeFileSync(outputPath, JSON.stringify(data))
    log('GitHub data successfully written to file.')
  } catch (error) {
    warn(`Error writing GitHub data to file:  ${JSON.stringify(error)}`)
  }
}

async function getStars(defaultValue: number) {
  let stars = defaultValue

  try {
    const gitHubStars = await fetch(`https://api.github.com/repos/${REPO}`)

    const res = await gitHubStars.json()

    if (res && typeof res.watchers_count === 'number') {
      stars = res.watchers_count
    } else {
      warn('Invalid response from GitHub API, using fallback stars value')
    }
  } catch (error) {
    warn(`Error fetching GitHub stars: ${error}`)
  }

  return stars
}

async function getPullRequests(defaultValue: number) {
  let prs = defaultValue

  try {
    const gitHubStars = await fetch(
      `https://api.github.com/search/issues?q=repo:${REPO}+is:pr`
    )

    const res = await gitHubStars.json()

    if (res && typeof res.total_count === 'number') {
      prs = res.total_count
    } else {
      warn('Invalid response from GitHub API, using fallback PR value')
    }
  } catch (error) {
    warn(`Error fetching GitHub PRs: ${error}`)
  }

  return prs
}

async function getContributorCount(defaultValue: number) {
  let contributors = defaultValue

  try {
    // Limited to 1 per page since we get the count from the number of pages.
    const response = await fetch(
      `https://api.github.com/repos/${REPO}/contributors?per_page=1&anon=true`
    )

    if (response.ok) {
      const linkHeader = response.headers.get('Link')

      // Get the count from the link header
      if (linkHeader) {
        const match = linkHeader.match(/&page=(\d+)>; rel="last"/)
        if (match) {
          contributors = parseInt(match[1], 10)
        }
      }

      // If there's no Link header, there may be only one contributor
      else {
        const data = await response.json()
        contributors = data.length
      }
    } else {
      warn(
        'Invalid response from GitHub API, using fallback contributors value'
      )
    }
  } catch (error) {
    console.error('Failed to get contributor count:', error)
  }

  return contributors
}

async function triggerGitHubFile() {
  log('Starting to build GitHub file')

  const [stars, prs, contributors] = await Promise.all([
    getStars(41243),
    getPullRequests(56995),
    getContributorCount(2440)
  ])

  generateFile({ stars, prs, contributors })
}

triggerGitHubFile()
