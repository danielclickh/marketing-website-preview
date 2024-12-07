import Markdown from '../Markdown'
import { StrapiImageProps } from './types'

const strapiApiUrl =
  process.env.STRAPI_API_URL ?? 'https://cms.clickhouse.com:1337'

export default function StrapiSvg({
  id,
  url,
  className = '',
  width,
  height,
  svgText = ''
}: StrapiImageProps) {
  try {
    // Create a mutable svg string
    let svgString = svgText

    // Get all ID values from the svg
    const matches = svgString.matchAll(/\s+id="([^"]+)"/gi)

    // Replace all id references with a new preifxed value
    // @ts-ignore
    for (const match of matches) {
      const fullMatch = match[0] // id="circle"
      const idMatch = match[1] // circle
      const newId = `svg-id-${id}-${idMatch}` // svg-id-123-circle

      const idRegex = new RegExp(`#${idMatch}([^-_a-zA-Z0-9])`, 'g')
      svgString = svgString.replaceAll(fullMatch, ` id="${newId}"`)
      svgString = svgString.replaceAll(idRegex, `#${newId}$1`)
    }

    return (
      <Markdown
        encloseByDiv={false}
        components={{
          svg: ({ node, ...params }) => {
            return (
              <svg
                {...params}
                className={` ${className}`}
                width={width ?? undefined}
                height={height ?? undefined}
              />
            )
          }
        }}>
        {svgString}
      </Markdown>
    )
  } catch (e) {
    console.log('Error fetching svg', `${strapiApiUrl}${url}`)
    console.error(e)
    return null
  }
}
