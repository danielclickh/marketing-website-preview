import fs from 'fs'
import path from 'path'

function log(message: string) {
  console.log(`[${new Date().toTimeString()}] ${message}`)
}

function warn(message: string) {
  console.warn(`[${new Date().toTimeString()}] ${message}`)
}

function generateStars(stars: number) {
  const starsJSON = `${JSON.stringify({ stars: stars })}`
  try {
    const outputPath = path.join(__dirname, 'public', 'githubStars.json')
    fs.writeFileSync(outputPath, starsJSON)
    log('GitHub stars successfully written to file.')
  } catch (error) {
    warn(`Error writing GitHub Stars to file:  ${JSON.stringify(error)}`)
  }
}

async function triggerGitHubFile() {
  log('Starting to build GitHub file')

  let stars = 320177

  const gitHubStars = await fetch(
    'https://api.github.com/repos/ClickHouse/ClickHouse'
  )

  const res = await gitHubStars.json()

  // We generate the JSON pricing file with the pricings data
  generateStars(res.watchers_count)
}

triggerGitHubFile()
