import { StrapiImageProps } from './types'
import Markdown from '../Markdown'

const strapiApiUrl =
  process.env.STRAPI_API_URL ?? 'https://cms.clickhouse.com:1337'

export default function StrapiSvg({
  url,
  className = '',
  width,
  height,
  svgText = ''
}: StrapiImageProps) {
  try {
    return (
      <Markdown
        encloseByDiv={false}
        components={{
          svg: ({ node, ...params }) => {
            return (
              <svg
                {...params}
                className={`fill-current ${className}`}
                width={width ?? undefined}
                height={height ?? undefined}
              />
            )
          }
        }}>
        {svgText}
      </Markdown>
    )
  } catch (e) {
    console.log('Error fetching svg', `${strapiApiUrl}${url}`)
    console.error(e)
    return null
  }
}
